I started creating a separate worktree to do my experiments.

cd ~/nodejs
git worktree add ../playing-with-node

This allows me to have a separate worktree to compile node with a different libuv

As far as I could see we can compille node with the option --shared-libuv, but I don't know how to do that yet.
https://github.com/nodejs/node/blob/main/configure.py#L288

Very hard to find some functions inside of libuv

HAd to go to an issue to find uv__run_idle

https://github.com/libuv/libuv/issues/507

main file is under src/unix/core.c

---
oooh, i was unable to find them wioth grep because they are defined as macros

```c
UV_LOOP_WATCHER_DEFINE(prepare, PREPARE)
UV_LOOP_WATCHER_DEFINE(check, CHECK)
UV_LOOP_WATCHER_DEFINE(idle, IDLE)
```

After addinga bunch of printf calls I could compile it with

C code is at `_drafts/pitches/2025/jsnation-sample/main.c`

```bash
gcc -I/Users/edysilva/projects/contributions/libuv/include \
    /Users/edysilva/projects/contributions/libuv/.libs/libuv.a \
    main.c -o main */
```

It's nice we can see if it was properly linked using `otools/otool -L main`

```bash
otool -L ./main
./main:
        /usr/lib/libSystem.B.dylib (compatibility version 1.0.0, current version 1351.0.0)
```

---

I had uninstalled libuv. A hughe mistake since it broke my Neovim

```bash
  playing-with-node git:(playing-with-node) nvim
dyld[18776]: Library not loaded: /opt/homebrew/opt/libuv/lib/libuv.1.dylib
  Referenced from: <C3421887-EEC8-3372-BF45-1F31AD35A479> /opt/homebrew/Cellar/neovim/0.10.3/bin/nvim
  Reason: tried: '/opt/homebrew/opt/libuv/lib/libuv.1.dylib' (no such file), '/System/Volumes/Preboot/Cryptexes/OS/opt/homebrew/opt/libuv/lib/libuv.1.dylib' (no such file), '/opt/homebrew/opt/libuv/lib/libuv.1.dylib' (no such file)
[1]    18776 abort      nvim
```

Installed it again, looks like it worked. I don't know

---

configure node with

```bash
./configure --shared-libuv \
  --shared-libuv-includes=/Users/edysilva/projects/contributions/libuv/include \
  --shared-libuv-libpath=/Users/edysilva/projects/contributions/libuv/.libs
```

compilation fails with

```bash
_adler32_simd.a /Users/edysilva/projects/contributions/playing-with-node/out/Release/libzlib_arm_crc32.a -L/Users/edysilva/projects/contributions/libuv/.libs -luv -framework CoreFoundation -framework Security
dyld[36643]: Symbol not found: _uv_getrusage_thread
  Referenced from: <35B2E54F-3D1E-329A-B495-8AD882598E26> /Users/edysilva/projects/contributions/playing-with-node/out/Release/node_mksnapshot
  Expected in:     <36C60F88-4415-36EC-AD0C-7726667446EF> /usr/local/lib/libuv.1.dylib
/bin/sh: line 1: 36643 Abort trap: 6           "/Users/edysilva/projects/contributions/playing-with-node/out/Release/node_mksnapshot" "/Users/edysilva/projects/contributions/playing-with-node/out/Release/obj/gen/node_snapshot.cc"
make[1]: *** [/Users/edysilva/projects/contributions/playing-with-node/out/Release/obj/gen/node_snapshot.cc] Error 134
rm 08b3e976649f376a534681cc95bb103f9a34532f.intermediate d7627f726e5dfebac684f55b4a14aa8513e54c75.intermediate 7fe870428de58effbb699a27c4c97dd3325be83e.intermediate 5aa3716600e7dae77da5a3ed20653e2f53fa5a5e.intermediate
make: *** [node] Error 2
```

Two things here:

1. node is still looking into /usr/local/lib/libuv.1.dylib where, from my understanding, it should be looking into
/Users/edysilva/projects/contributions/libuv/.libs/libuv.1.dylib
2. the symbol `_uv_getrusage_thread` is not found in the libuv at /usr/local/lib/libuv.1.dylib but it is found in the
   libuv at /Users/edysilva/projects/contributions/libuv/.libs/libuv.1.dylib

Maybe the issue is the libuv version?

```bash
➜  playing-with-node git:(playing-with-node) nm -gU /usr/local/lib/libuv.1.dylib | grep uv_getrusage_thread

➜  playing-with-node git:(playing-with-node) nm -gU /Users/edysilva/projects/contributions/libuv/.libs/libuv.dylib | grep uv_getrusage_thread

0000000000008b54 T _uv_getrusage_thread
```

---

Version looks fine. It installed 1.51.1

/opt/homebrew/Cellar/libuv/1.51.0/lib

If I search for the symbol in `/opt/homebrew/Cellar/libuv/1.51.0/lib/libuv.1.dylib`, I can see it is there

```bash
cd /opt/homebrew/Cellar/libuv/1.51.0/lib
nm -gU libuv.1.dylib | grep uv_getrusage_thread

000000000000ab60 T _uv_getrusage_thread
```

---

I removed the /libuv.1.dylib from /usr/local/lib and now it fails because it could not find the library. I think if
I symlink it to the new libuv it will work

```bash
sudo ln -sfn /opt/homebrew/Cellar/libuv/1.51.0/lib/libuv.1.dylib /usr/local/lib/libuv.1.dylib
```

IOOOOOO IT COMPILED!!!!!!!

but it didn't pick my changes. I think i have to linke my version

It worked!!!!

```bash
sudo ln -sfn /Users/edysilva/projects/contributions/libuv/.libs/libuv.1.dylib /usr/local/lib/libuv.1.dylib
```

---

For some reason seems like more than one loop is started. From my tests: the default and two more.
Node starts at `src/node_main.cc` it then calls the method `int Start(int argc, char** argv) {` at `src/node.cc`.

This calls a internal method which does:

```cpp
NodeMainInstance main_instance(snapshot_data,
        uv_default_loop(),
        per_process::v8_platform.Platform(),
        result->args(),
        result->exec_args());

return main_instance.Run();
```

here is main instance definition: https://github.com/nodejs/node/blob/745f48d9f36b6f5765297e7d6058dc7f51a18ccc/src/node_main_instance.cc#L33

# Boundaries crossing

libuv starts here inside of node js https://github.com/nodejs/node/blob/main/src/env.cc#L1070

Microtask enqueueing

https://github.com/nodejs/node/blob/d08513dfc7d7fe2e1d89bf5f283a30a006b990ff/src/node_task_queue.cc#L140

---

I opened an issue: https://github.com/nodejs/node/issues/58815 to discusso if it was a node problem. I don't know.
I think the "issue" is that my libuv.1.dylib has this content

```bash
otool -D .libs/libuv.1.dylib
.libs/libuv.1.dylib:
/usr/local/lib/libuv.1.dylib
```

I'm pretty sure in node it gets from /usr/local/lib/libuv.1.dylib

```
The otool-classic command displays specified parts of object files or libraries. It is the preferred tool for inspecting Mach-O binaries, especially for
       binaries that are bad, corrupted, or fuzzed. It is also useful in situations when inspecting files with new or "bleeding-edge" Mach-O file format changes.

       For historical reasons, the LLVM-based llvm-objdump(1) tool does support displaying Mach-O information in an "otool-compatibility" mode. For more information
       on using llvm-objdump(1) in this way, see the llvm-otool(1) command-line shim. Note that llvm-objdump(1) is incapable of displaying information in all Mach-O
       files.

       If the -m option is not used the file arguments may be of the form libx.a(foo.o), to request information about only that object file and not the entire
       library.   (Typically this argument must be quoted, ``libx.a(foo.o)'', to get it past the shell.)  Otool-classic understands both Mach-O (Mach object) files
       and universal file formats.  Otool-classic can display the specified information in either its raw (numeric) form (without the -v flag), or in a symbolic
       form using macro names of constants, etc. (with the -v or -V flag).
```

>        -D     Display just the install name of a shared library.  See install_name_tool(1) for more info.



```
INSTALL_NAME_TOOL(1)                                                   General Commands Manual                                                  INSTALL_NAME_TOOL(1)

NAME
       install_name_tool - change dynamic shared library install names

SYNOPSIS
       install_name_tool [-change old new ] ... [-rpath old new ] ... [-add_rpath new ] ... [-delete_rpath new ] ... [-id name] file

DESCRIPTION
       Install_name_tool changes the dynamic shared library install names and or adds, changes or deletes the rpaths recorded in a Mach-O binary.  For this tool to
       work when the install names or rpaths are larger the binary should be built with the ld(1) -headerpad_max_install_names option.

       -change old new
              Changes the dependent shared library install name old to new in the specified Mach-O binary.  More than one of these options can be specified.  If the
              Mach-O binary does not contain the old install name in a specified -change option the option is ignored.

       -id name
              Changes the shared library identification name of a dynamic shared library to name.  If the Mach-O binary is not a dynamic shared library and the -id
              option is specified it is ignored.

       -rpath old new
              Changes the rpath path name old to new in the specified Mach-O binary.  More than one of these options can be specified.  If the Mach-O binary does
              not contain the old rpath path name in a specified -rpath it is an error.

       -add_rpath new
              Adds the rpath path name new in the specified Mach-O binary.  More than one of these options can be specified.  If the Mach-O binary already contains
              the new rpath path name specified in -add_rpath it is an error.

       -delete_rpath old
              deletes the rpath path name old in the specified Mach-O binary.  More than one of these options can be specified.  If the Mach-O binary does not
              contains the old rpath path name specified in -delete_rpath it is an error.

SEE ALSO
       ld(1)

Apple, Inc.
```
