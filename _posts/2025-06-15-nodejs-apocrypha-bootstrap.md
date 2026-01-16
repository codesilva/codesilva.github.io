---
layout: book-chapter
title: 'How Node.js Bootstraps'
date: 2025-06-15
lang: pt-BR
tags: ["node-internals", "bootstrap"]
category: ["nodejs-apocrypha", "node-internals"]
private: true
chapter: 1
---

Welcome to Node.js Apocrypha! In this first chapter, we'll trace through the entire startup sequence of Node.js - from the moment you run `node your_script.js` until your JavaScript code actually executes.

Understanding the bootstrap process is fundamental because it reveals how Node.js sets up V8, libuv, and all the internal machinery before your code runs. Let's dive in!

## The Entry Point: `main()`

Everything starts in [`src/node_main.cc`][node_main.cc]. On UNIX systems, the entry point is straightforward:

```cpp
// UNIX
int main(int argc, char* argv[]) {
  return node::Start(argc, argv);
}
```

On Windows, there's additional handling for converting wide character arguments to UTF-8, but the destination is the same: `node::Start()`.

## The Journey Begins: `node::Start()`

The [`node::Start()`][node_start] function in `src/node.cc` is the gateway to Node.js initialization:

```cpp
int Start(int argc, char** argv) {
#ifndef DISABLE_SINGLE_EXECUTABLE_APPLICATION
  std::tie(argc, argv) = sea::FixupArgsForSEA(argc, argv);
#endif
  return static_cast<int>(StartInternal(argc, argv));
}
```

It handles Single Executable Applications (SEA) if needed, then delegates to `StartInternal()`.

## Initialization: `StartInternal()`

[`StartInternal()`][start_internal] is where the real work begins. Here's a simplified view of what happens:

```cpp
static ExitCode StartInternal(int argc, char** argv) {
  // 1. Setup argv for libuv (enables process.title)
  argv = uv_setup_args(argc, argv);

  // 2. Initialize Node.js and V8
  std::shared_ptr<InitializationResultImpl> result =
      InitializeOncePerProcessInternal(
          std::vector<std::string>(argv, argv + argc));

  // 3. Configure the event loop
  uv_loop_configure(uv_default_loop(), UV_METRICS_IDLE_TIME);

  // 4. Create and run the main instance
  NodeMainInstance main_instance(snapshot_data,
                                 uv_default_loop(),
                                 per_process::v8_platform.Platform(),
                                 result->args(),
                                 result->exec_args());
  return main_instance.Run();
}
```

### What `InitializeOncePerProcessInternal()` Does

This function handles all the one-time-per-process initialization:

1. **Platform initialization** (`PlatformInit`) - signal handlers, stdio setup
2. **Command-line argument parsing** - processes flags like `--inspect`, `--experimental-*`
3. **V8 initialization** - starts the V8 JavaScript engine
4. **OpenSSL initialization** - sets up cryptographic facilities
5. **cppgc initialization** - C++ garbage collection for Oilpan (used by some V8 features)

## The NodeMainInstance

The [`NodeMainInstance`][node_main_instance] is the heart of a Node.js process. Its constructor:

1. Creates an `ArrayBufferAllocator` for V8
2. Creates a new V8 `Isolate` (an isolated V8 instance)
3. Creates `IsolateData` to store per-isolate Node.js state

```cpp
NodeMainInstance::NodeMainInstance(...)
    : args_(args),
      exec_args_(exec_args),
      array_buffer_allocator_(ArrayBufferAllocator::Create()),
      isolate_(nullptr),
      platform_(platform),
      isolate_data_(),
      isolate_params_(std::make_unique<Isolate::CreateParams>()),
      snapshot_data_(snapshot_data) {

  isolate_ = NewIsolate(isolate_params_.get(), event_loop, platform, snapshot_data);

  isolate_data_.reset(CreateIsolateData(isolate_, event_loop, platform,
                                        array_buffer_allocator_.get(),
                                        snapshot_data->AsEmbedderWrapper().get()));
}
```

## Running the Instance

When `NodeMainInstance::Run()` is called, here's the sequence:

```cpp
ExitCode NodeMainInstance::Run() {
  Locker locker(isolate_);           // Lock the isolate
  Isolate::Scope isolate_scope(isolate_);
  HandleScope handle_scope(isolate_);

  // Create the environment (V8 context + Node.js state)
  DeleteFnPtr<Environment, FreeEnvironment> env =
      CreateMainEnvironment(&exit_code);

  Context::Scope context_scope(env->context());
  Run(&exit_code, env.get());
  return exit_code;
}
```

## Creating the Environment

[`CreateMainEnvironment()`][create_main_env] creates the V8 context and Node.js `Environment` object. If using a snapshot (the default), it deserializes from the pre-built snapshot. Otherwise, it:

1. Creates a new V8 `Context`
2. Creates an `Environment` object
3. **Runs the bootstrapping scripts**

```cpp
if (!use_snapshot && env->principal_realm()->RunBootstrapping().IsEmpty()) {
  FreeEnvironment(env);
  return nullptr;
}
```

## The Bootstrap Sequence

This is where JavaScript enters the picture! The [`RunBootstrapping()`][run_bootstrapping] function executes a series of internal JavaScript files to set up the Node.js runtime:

```cpp
MaybeLocal<Value> Realm::RunBootstrapping() {
  // First, set up the internal module loaders
  if (!ExecuteBootstrapper("internal/bootstrap/realm").ToLocal(&result) ||
      !BootstrapRealm().ToLocal(&result)) {
    return MaybeLocal<Value>();
  }
  DoneBootstrapping();
  return scope.Escape(result);
}
```

And then `BootstrapRealm()` continues:

```cpp
MaybeLocal<Value> PrincipalRealm::BootstrapRealm() {
  // Set up Node.js core
  if (ExecuteBootstrapper("internal/bootstrap/node").IsEmpty()) {
    return MaybeLocal<Value>();
  }

  // Set up Web APIs (if not --no-browser-globals)
  if (!env_->no_browser_globals()) {
    ExecuteBootstrapper("internal/bootstrap/web/exposed-wildcard");
    ExecuteBootstrapper("internal/bootstrap/web/exposed-window-or-worker");
  }

  // Thread-specific setup
  auto thread_switch_id = env_->is_main_thread()
      ? "internal/bootstrap/switches/is_main_thread"
      : "internal/bootstrap/switches/is_not_main_thread";
  ExecuteBootstrapper(thread_switch_id);

  // Process state setup
  auto process_state_switch_id = env_->owns_process_state()
      ? "internal/bootstrap/switches/does_own_process_state"
      : "internal/bootstrap/switches/does_not_own_process_state";
  ExecuteBootstrapper(process_state_switch_id);

  return v8::True(isolate_);
}
```

### How Bootstrap Scripts Are Compiled

When `ExecuteBootstrapper()` is called, it delegates to [`BuiltinLoader::CompileAndCall()`][builtin_loader], which uses V8's [`ScriptCompiler::CompileFunction`][compile_function] to compile the JavaScript source code into an executable function.

This is the key piece that transforms JavaScript source into something V8 can execute:

```cpp
// From src/node_builtins.cc - LookupAndCompileInternal()
ScriptOrigin origin(filename, 0, 0, true);
ScriptCompiler::Source script_source(source, origin, cached_data_ptr);

// Get the parameters for this type of script
LocalVector<String> parameters(isolate);
auto params_it = BuiltinInfo::parameter_map.find(builtin_source->type);
for (const std::string& param : params_it->second) {
  parameters.push_back(OneByteString(isolate, param));
}

// Compile the source into a function
MaybeLocal<Function> maybe_fun =
    ScriptCompiler::CompileFunction(context,
                                    &script_source,
                                    parameters.size(),
                                    parameters.data(),
                                    0,
                                    nullptr,
                                    options);
```

The parameters passed to each bootstrap script type are defined in [`src/builtin_info.h`][builtin_info]:

```cpp
// Bootstrap realm script parameters
{BuiltinSourceType::kBootstrapRealm,
 {"process", "getLinkedBinding", "getInternalBinding", "primordials"}},

// Regular bootstrap scripts (like internal/bootstrap/node)
{BuiltinSourceType::kBootstrapScript,
 {"process", "require", "internalBinding", "primordials"}},

// Main scripts (like internal/main/run_main_module)
{BuiltinSourceType::kMainScript,
 {"process", "require", "internalBinding", "primordials"}},

// Regular built-in modules (like fs, http, etc.)
{BuiltinSourceType::kFunction,
 {"exports", "require", "module", "process", "internalBinding", "primordials"}},
```

This is why at the top of `internal/bootstrap/realm.js` you see:

```javascript
// This file is compiled as if it's wrapped in a function with arguments
// passed by node::RunBootstrapping()
/* global process, getLinkedBinding, getInternalBinding, primordials */
```

The `ScriptCompiler::CompileFunction` API wraps the source code in a function with the specified parameters, essentially transforming:

```javascript
// Your bootstrap script content
const x = internalBinding('foo');
```

Into:

```javascript
(function(process, require, internalBinding, primordials) {
  // Your bootstrap script content
  const x = internalBinding('foo');
})
```

This compiled function is then called with the actual values for those parameters, which is how the bootstrap scripts get access to `process`, `internalBinding`, and `primordials`.

### Bootstrap Scripts Explained

Using `lldb`, we can trace the exact order of bootstrap scripts:

```
1. internal/bootstrap/realm
2. internal/bootstrap/node
3. internal/bootstrap/web/exposed-wildcard
4. internal/bootstrap/web/exposed-window-or-worker
5. internal/bootstrap/switches/is_main_thread
6. internal/bootstrap/switches/does_own_process_state
7. internal/main/run_main_module  <-- Finally loads your script!
```

Let me explain what each does:

#### 1. `internal/bootstrap/realm`

This is the first JavaScript file to run. It sets up:

- `process.binding()` - the legacy C++ binding loader
- `process._linkedBinding()` - for embedder bindings
- `internalBinding()` - the internal C++ binding loader
- `BuiltinModule` - the internal module system for core modules

```javascript
// From lib/internal/bootstrap/realm.js
let internalBinding;
{
  const bindingObj = { __proto__: null };
  internalBinding = function internalBinding(module) {
    let mod = bindingObj[module];
    if (typeof mod !== 'object') {
      mod = bindingObj[module] = getInternalBinding(module);
      ArrayPrototypePush(moduleLoadList, `Internal Binding ${module}`);
    }
    return mod;
  };
}
```

#### 2. `internal/bootstrap/node`

Sets up the core Node.js environment:

- The `process` object properties (`process.exitCode`, `process.config`, etc.)
- Global proxy setup
- The `Buffer` global

```javascript
// From lib/internal/bootstrap/node.js
setupProcessObject();
setupGlobalProxy();
setupBuffer();
process.domain = null;
```

#### 3. `internal/bootstrap/web/exposed-*`

These set up Web APIs like `TextEncoder`, `TextDecoder`, `URL`, `URLSearchParams`, `fetch`, `crypto`, etc.

#### 4. `internal/bootstrap/switches/*`

Thread-specific and process-state-specific setup. For the main thread, this includes things like signal handling.

## Loading Your Script

After bootstrapping, `LoadEnvironment()` is called, which leads to `StartExecution()`:

```cpp
MaybeLocal<Value> StartExecution(Environment* env, StartExecutionCallback cb) {
  // ... various checks ...

  if (!first_argv.empty() && first_argv != "-") {
    return StartExecution(env, "internal/main/run_main_module");
  }

  // ... other modes (REPL, eval, etc.)
}
```

The [`internal/main/run_main_module`][run_main_module] script is the bridge to your code:

```javascript
// From lib/internal/main/run_main_module.js
const { prepareMainThreadExecution, markBootstrapComplete } =
    require('internal/process/pre_execution');

const mainEntry = prepareMainThreadExecution(!isEntryURL);
markBootstrapComplete();

// Finally, run your script!
require('internal/modules/cjs/loader').Module.runMain(mainEntry);
```

## Tracing with LLDB

You can trace this yourself! Build Node.js with debug symbols and run:

```bash
lldb -o "breakpoint set -n 'node::Realm::ExecuteBootstrapper'" \
     -o "run your_script.js" \
     -- ./out/Release/node
```

Each time you `continue`, you'll see the next bootstrap script being loaded:

```
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/realm")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/node")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/web/exposed-wildcard")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/web/exposed-window-or-worker")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/switches/is_main_thread")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/bootstrap/switches/does_own_process_state")
* frame #0: node::Realm::ExecuteBootstrapper(id="internal/main/run_main_module")
```

## The Complete Call Stack

Here's the full call stack from `main()` to loading your script:

```
main()                              // node_main.cc:97
└── node::Start()                   // node.cc:1585
    └── node::StartInternal()       // node.cc:1522
        ├── uv_setup_args()
        ├── InitializeOncePerProcessInternal()
        └── NodeMainInstance::Run() // node_main_instance.cc:88
            ├── CreateMainEnvironment()
            │   └── CreateEnvironment()
            │       └── Realm::RunBootstrapping()
            │           ├── ExecuteBootstrapper("internal/bootstrap/realm")
            │           └── BootstrapRealm()
            │               ├── ExecuteBootstrapper("internal/bootstrap/node")
            │               ├── ExecuteBootstrapper("internal/bootstrap/web/...")
            │               └── ExecuteBootstrapper("internal/bootstrap/switches/...")
            └── LoadEnvironment()
                └── StartExecution()
                    └── ExecuteBootstrapper("internal/main/run_main_module")
                        └── Module.runMain()  // Your script runs!
```

## About Snapshots

Modern Node.js uses V8 snapshots to speed up startup. The bootstrap scripts are run at build time, and the resulting V8 heap state is serialized into the Node.js binary.

At runtime, instead of executing all the bootstrap scripts, Node.js deserializes this snapshot, which is much faster. You can disable this with `--no-node-snapshot` to see the full bootstrap process.

## Summary

The Node.js bootstrap process is a carefully orchestrated sequence:

1. **C++ initialization**: V8, libuv, OpenSSL
2. **Isolate & Context creation**: V8's JavaScript execution environment
3. **JavaScript bootstrapping**: Internal module loaders, process object, Web APIs
4. **Main script selection**: Based on how Node.js was invoked
5. **User code execution**: Through the CJS or ESM loader

Understanding this process helps when debugging startup issues, contributing to Node.js core, or building custom Node.js distributions.

---

[node_main.cc]: https://github.com/nodejs/node/blob/main/src/node_main.cc
[node_start]: https://github.com/nodejs/node/blob/main/src/node.cc#L1585
[start_internal]: https://github.com/nodejs/node/blob/main/src/node.cc#L1522
[node_main_instance]: https://github.com/nodejs/node/blob/main/src/node_main_instance.cc
[create_main_env]: https://github.com/nodejs/node/blob/main/src/node_main_instance.cc#L118
[run_bootstrapping]: https://github.com/nodejs/node/blob/main/src/node_realm.cc#L195
[run_main_module]: https://github.com/nodejs/node/blob/main/lib/internal/main/run_main_module.js
[builtin_loader]: https://github.com/nodejs/node/blob/main/src/node_builtins.cc#L470
[compile_function]: https://v8docs.nodesource.com/node-22.4/dd/d7a/classv8_1_1_script_compiler.html#a38b9e488b5edb3b8b4858702c75beb04
[builtin_info]: https://github.com/nodejs/node/blob/main/src/builtin_info.h#L29
