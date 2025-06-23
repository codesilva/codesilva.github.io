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
