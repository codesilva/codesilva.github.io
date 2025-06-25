Found `/Users/edysilva/projects/contributions/playing-with-node/lib/internal/main/run_main_module.js`. After bootstraping this is called

This function 


```javascript
function wrapSafe(filename, content, cjsModuleInstance, format) {
  assert(format !== 'module', 'ESM should be handled in loadESMFromCJS()');
  const hostDefinedOptionId = vm_dynamic_import_default_internal;
  const importModuleDynamically = vm_dynamic_import_default_internal;
  if (patched) {
    const wrapped = Module.wrap(content);
    const script = makeContextifyScript(
      wrapped,                 // code
      filename,                // filename
      0,                       // lineOffset
      0,                       // columnOffset
      undefined,               // cachedData
      false,                   // produceCachedData
      undefined,               // parsingContext
      hostDefinedOptionId,     // hostDefinedOptionId
      importModuleDynamically, // importModuleDynamically
    );

    // Cache the source map for the module if present.
    const { sourceMapURL, sourceURL } = script;
    if (sourceMapURL) {
      maybeCacheSourceMap(filename, content, cjsModuleInstance, false, sourceURL, sourceMapURL);
    }

    return {
      __proto__: null,
      function: runScriptInThisContext(script, true, false),
      sourceMapURL,
    };
  }

  let shouldDetectModule = false;
  if (format !== 'commonjs') {
    if (cjsModuleInstance?.[kIsMainSymbol]) {
      // For entry points, format detection is used unless explicitly disabled.
      shouldDetectModule = getOptionValue('--experimental-detect-module');
    } else {
      // For modules being loaded by `require()`, if require(esm) is disabled,
      // don't try to reparse to detect format and just throw for ESM syntax.
      shouldDetectModule = getOptionValue('--experimental-require-module');
    }
  }
  const result = compileFunctionForCJSLoader(content, filename, false /* is_sea_main */, shouldDetectModule);

  // Cache the source map for the module if present.
  if (result.sourceMapURL) {
    maybeCacheSourceMap(filename, content, cjsModuleInstance, false, result.sourceURL, result.sourceMapURL);
  }

  return result;
}
```

A contextify is made using `/Users/edysilva/projects/contributions/playing-with-node/src/node_contextify.cc`.

It uses [ScriptCompiler][], a new v8 api for dealing with scripts. Old examples of v8 uses jut [Script][] [1][].

[https://v8.dev/docs/embed][https://v8.dev/docs/embed]

[1]: https://github.com/v8/v8/blob/main/samples/hello-world.cc
[Script]: https://v8docs.nodesource.com/node-22.4/d0/d35/classv8_1_1_script.html
[ScriptCompiler]: https://v8docs.nodesource.com/node-22.4/dd/d7a/classv8_1_1_script_compiler_1_1_source.html

Just realized that nextTick callbacks run all before v8 microtask

nextticks are not parte of v8 micro task. they are executed every tme a makecallback is called (https://github.com/nodejs/node/blob/ac540c03e5e2e5350b93a1da8aa1c56fb7383bc3/src/api/callback.cc#L168).

it basially processes all next ticks and then drains the microtask queue.

MakeCallback calls [InternalCallback][] which calls scope and then... the function that drains next tick and microtask
queue

[InternalCallback]: https://github.com/nodejs/node/blob/ac540c03e5e2e5350b93a1da8aa1c56fb7383bc3/src/api/callback.cc#L180

---

there are other places where the microtask queue is drained

https://github.com/search?q=repo%3Anodejs%2Fnode+%2FPerformCheckpoint%2F+path%3A%2F%5Esrc%5C%2F%2F&type=code

## Belos are All bultins that are loaded


```
 frame #0: 0x00000001001abdbc node`node::StartExecution(env=0x0000000128832600, main_script_id="internal/main/run_main_module") at node.cc:254:28
    frame #1: 0x00000001001abc4c node`node::StartExecution(env=0x0000000128832600, cb=node::StartExecutionCallback @ 0x000000016fdfe818) at node.cc:397:12
    frame #2: 0x0000000100019560 node`node::LoadEnvironment(env=0x0000000128832600, cb=node::StartExecutionCallback @ 0x000000016fdfe8d8, preload=node::EmbedderPreloa
dCallback @ 0x000000016fdfe8b8) at environment.cc:539:10
    frame #3: 0x00000001002e807c node`node::NodeMainInstance::Run(this=0x000000016fdfea18, exit_code=0x000000016fdfe954, env=0x0000000128832600) at node_main_instance
.cc:109:7
    frame #4: 0x00000001002e7ce8 node`node::NodeMainInstance::Run(this=0x000000016fdfea18) at node_main_instance.cc:101:3
    frame #5: 0x00000001001ae9c8 node`node::StartInternal(argc=2, argv=0x000060000310ec30) at node.cc:1532:24
    frame #6: 0x00000001001ae5a4 node`node::Start(argc=2, argv=0x000000016fdfedf0) at node.cc:1539:27
    frame #7: 0x00000001017201d8 node`main(argc=2, argv=0x000000016fdfedf0) at node_main.cc:100:10
```

lldb things

- next (n)
- continue (c)
- step (s)
- breakpoint (b)
- backtrace (bt)
- expression (expr)


```
* frame #0: 0x00000001001fad64 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000135014ec8, context=Local<v8::Context> @ 0x000000016fdfe470, id="internal/main/run_main_module", argc=4, argv=0x000000016fdfe5c8, optional_realm=0x0000000132f052f0) at node_builtins.cc:505:17
    frame #1: 0x00000001001faca4 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000135014ec8, context=Local<v8::Context> @ 0x000000016fdfe5b8, id="internal/main/run_main_module", realm=0x0000000132f052f0) at node_builtins.cc:483:12
    frame #2: 0x00000001003988f8 node`node::Realm::ExecuteBootstrapper(this=0x0000000132f052f0, id="internal/main/run_main_module") at node_realm.cc:181:32
    frame #3: 0x00000001001abdc8 node`node::StartExecution(env=0x0000000135014400, main_script_id="internal/main/run_main_module") at node.cc:254:35
    frame #4: 0x00000001001abc4c node`node::StartExecution(env=0x0000000135014400, cb=node::StartExecutionCallback @ 0x000000016fdfeaa8) at node.cc:397:12
    frame #5: 0x0000000100019560 node`node::LoadEnvironment(env=0x0000000135014400, cb=node::StartExecutionCallback @ 0x000000016fdfeb68, preload=node::EmbedderPreloadCallback @ 0x000000016fdfeb48) at environment.cc:539:10
    frame #6: 0x00000001002e807c node`node::NodeMainInstance::Run(this=0x000000016fdfeca8, exit_code=0x000000016fdfebe4, env=0x0000000135014400) at node_main_instance.cc:109:7
    frame #7: 0x00000001002e7ce8 node`node::NodeMainInstance::Run(this=0x000000016fdfeca8) at node_main_instance.cc:101:3
    frame #8: 0x00000001001ae9c8 node`node::StartInternal(argc=2, argv=0x0000600002efac30) at node.cc:1532:24
    frame #9: 0x00000001001ae5a4 node`node::Start(argc=2, argv=0x000000016fdff080) at node.cc:1539:27
    frame #10: 0x00000001017201d8 node`main(argc=2, argv=0x000000016fdff080) at node_main.cc:100:10
```


* frame #0: 0x00000001001f9a98 node`node::builtins::BuiltinLoader::LookupAndCompileInternal(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe2b0, id="internal/bootstrap/realm", parameters=0x000000016fdfe438, optional_realm=0x0000000155008880) at node_builtins.cc:327:39
    frame #1: 0x00000001001fa81c node`node::builtins::BuiltinLoader::LookupAndCompile(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe470, id="internal/bootstrap/realm", optional_realm=0x0000000155008880) at node_builtins.cc:445:7
    frame #2: 0x00000001001fad44 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe5a0, id="internal/bootstrap/realm", argc=4, argv=0x000000016fdfe718, optional_realm=0x0000000155008880) at node_builtins.cc:503:35
    frame #3: 0x00000001001fab68 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe6e8, id="internal/bootstrap/realm", realm=0x0000000155008880) at node_builtins.cc:471:12
    frame #4: 0x00000001003988f8 node`node::Realm::ExecuteBootstrapper(this=0x0000000155008880, id="internal/bootstrap/realm") at node_realm.cc:181:32
    frame #5: 0x00000001003989cc node`node::Realm::RunBootstrapping(this=0x0000000155008880) at node_realm.cc:202:8
    frame #6: 0x0000000100018884 node`node::CreateEnvironment(isolate_data=0x0000000155829a00, context=Local<v8::Context> @ 0x000000016fdfea50, args=size=2, exec_args=size=0, flags=kDefaultFlags, thread_id=(id = 18446744073709551615), inspector_parent_handle=nullptr) at environment.cc:477:48
    frame #7: 0x00000001002e7f48 node`node::NodeMainInstance::CreateMainEnvironment(this=0x000000016fdfeca8, exit_code=0x000000016fdfebe4) at node_main_instance.cc:151:9
    frame #8: 0x00000001002e7c78 node`node::NodeMainInstance::Run(this=0x000000016fdfeca8) at node_main_instance.cc:97:7
    frame #9: 0x00000001001ae9c8 node`node::StartInternal(argc=2, argv=0x00006000039fc000) at node.cc:1532:24
    frame #10: 0x00000001001ae5a4 node`node::Start(argc=2, argv=0x000000016fdff080) at node.cc:1539:27
    frame #11: 0x00000001017201d8 node`main(argc=2, argv=0x000000016fdff080) at node_main.cc:100:10

---

* frame #0: 0x000000010066cecc node`v8::ScriptCompiler::CompileFunction(v8_context=<unavailable>, source=0x000000016fdfe0d8, arguments_count=<unavailable>, arguments=0x00006000012d4000, context_extension_count=<unavailable>, context_extensions=<unavailable>, options=kNoCompileOptions, no_cache_reason=kNoCacheNoReason) at api.cc:2536:8 [opt]
    frame #1: 0x00000001001f9ad8 node`node::builtins::BuiltinLoader::LookupAndCompileInternal(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe2b0, id="internal/bootstrap/realm", parameters=0x000000016fdfe438, optional_realm=0x0000000155008880) at node_builtins.cc:327:7
    frame #2: 0x00000001001fa81c node`node::builtins::BuiltinLoader::LookupAndCompile(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe470, id="internal/bootstrap/realm", optional_realm=0x0000000155008880) at node_builtins.cc:445:7
    frame #3: 0x00000001001fad44 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe5a0, id="internal/bootstrap/realm", argc=4, argv=0x000000016fdfe718, optional_realm=0x0000000155008880) at node_builtins.cc:503:35
    frame #4: 0x00000001001fab68 node`node::builtins::BuiltinLoader::CompileAndCall(this=0x0000000155839cc8, context=Local<v8::Context> @ 0x000000016fdfe6e8, id="internal/bootstrap/realm", realm=0x0000000155008880) at node_builtins.cc:471:12
    frame #5: 0x00000001003988f8 node`node::Realm::ExecuteBootstrapper(this=0x0000000155008880, id="internal/bootstrap/realm") at node_realm.cc:181:32
    frame #6: 0x00000001003989cc node`node::Realm::RunBootstrapping(this=0x0000000155008880) at node_realm.cc:202:8
    frame #7: 0x0000000100018884 node`node::CreateEnvironment(isolate_data=0x0000000155829a00, context=Local<v8::Context> @ 0x000000016fdfea50, args=size=2, exec_args=size=0, flags=kDefaultFlags, thread_id=(id = 18446744073709551615), inspector_parent_handle=nullptr) at environment.cc:477:48
    frame #8: 0x00000001002e7f48 node`node::NodeMainInstance::CreateMainEnvironment(this=0x000000016fdfeca8, exit_code=0x000000016fdfebe4) at node_main_instance.cc:151:9
    frame #9: 0x00000001002e7c78 node`node::NodeMainInstance::Run(this=0x000000016fdfeca8) at node_main_instance.cc:97:7
    frame #10: 0x00000001001ae9c8 node`node::StartInternal(argc=2, argv=0x00006000039fc000) at node.cc:1532:24
    frame #11: 0x00000001001ae5a4 node`node::Start(argc=2, argv=0x000000016fdff080) at node.cc:1539:27
    frame #12: 0x00000001017201d8 node`main(argc=2, argv=0x000000016fdff080) at node_main.cc:100:10
    frame #13: 0x000000019c957154 dyld`start + 2476
