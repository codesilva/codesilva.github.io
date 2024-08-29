# Lib UV

## Definicoes

https://github.com/libuv/libuv/blob/v1.x/include/uv.h

libuv works by the user expressing interest in particular events. This is usually done by creating a handle to an I/O device, timer or process. Handles are opaque structs named as uv_TYPE_t where type signifies what the handle is used for.

Ref: [https://docs.libuv.org/en/v1.x/guide/basics.html#handles-and-requests](https://docs.libuv.org/en/v1.x/guide/basics.html#handles-and-requests)

### Opening file

`uv_fs_open`
    `uv__fs_open`

## Lib uv on mac

Book - [libuv](https://docs.libuv.org/en/v1.x/guide/introduction.html)

https://github.com/thoughtbot/gitsh/issues/339

## Sofrendo pra rodar testes no android usando ctest

https://github.com/android/ndk/discussions/1726
https://stackoverflow.com/questions/43503192/googletest-for-android-ndk-c-with-cmake
https://gitlab.xiph.org/xiph/opus/-/merge_requests/28/diffs#9a2aa4db38d3115ed60da621e012c0efc0172aae
https://hub.docker.com/r/reactnativecommunity/react-native-android/dockerfile
https://developer.android.com/studio/run/emulator-commandline#startup-options

Android building
https://developer.android.com/tools/variables
https://github.com/WasmEdge/WasmEdge/issues/2639
https://wasmedge.org/docs/contribute/source/os/android/build/

error codes - https://www.thegeekstuff.com/2010/10/linux-error-codes/
writable emulator - https://stackoverflow.com/questions/42647209/how-to-make-system-partition-in-avd-in-emulator-writable

https://stackoverflow.com/questions/20869067/run-android-emulator-without-gui-headless-android

https://developer.android.com/tools/variables

Android syscalls -> https://android.googlesource.com/platform/bionic/+/7582a9c/libc/arch-x86/syscalls


Where uv strem is created -> https://github.com/libuv/libuv/blob/5cbc82e369817adf963e7ad37f70884a6434fb0a/src/unix/stream.c#L403

Setting timeout to sockfd -> https://github.com/libuv/help/issues/54
