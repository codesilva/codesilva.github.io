Debugging

Compile node with `./configure --debug-node  --node-builtin-modules-path "$(pwd)" && make -j4`

`lldb ./node --inspect file.js`

b node_config_file.cc:44
b node_options.cc:1435
b node_options.cc:1256
b node_options-inl.h:297
b node_options-inl.h:382
b node_options-inl.h:447
b inspector_socket_server.cc:386
b node.cc:730
b inspector_io.cc:265
bt -> backtrace
expr 1+1
frame variable myvar



(lldb) expr auto* opts = (node::PerProcessOptions*)0x00000001547045e0
(lldb) p *opts


p *(node::PerProcessOptions*)0x00000001547045e0

```
* thread #1, name = 'MainThread', queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
  * frame #0: 0x000000010052738c node`node::inspector::InspectorIo::InspectorIo(this=0x00006000019f4540, main_thread=std::__1::shared_ptr<node::inspector::MainThreadHandle>::element_type @ 0x0000600000ee5498 strong=4 weak=2, path="hello.js", host_port=std::__1::shared_ptr<node::ExclusiveAccess<node::HostPort, node::MutexBase<node::LibuvMutexTraits> > >::element_type @ 0x0000600000ee4e98 strong=6 weak=1, inspect_publish_uid=0x00006000017f85e8) at inspector_io.cc:265:21
    frame #1: 0x00000001005271d0 node`node::inspector::InspectorIo::InspectorIo(this=0x00006000019f4540, main_thread=std::__1::shared_ptr<node::inspector::MainThreadHandle>::element_type @ 0x0000600000ee5498 strong=4 weak=2, path="hello.js", host_port=std::__1::shared_ptr<node::ExclusiveAccess<node::HostPort, node::MutexBase<node::LibuvMutexTraits> > >::element_type @ 0x0000600000ee4e98 strong=6 weak=1, inspect_publish_uid=0x00006000017f85e8) at inspector_io.cc:264:25
    frame #2: 0x0000000100527114 node`node::inspector::InspectorIo::Start(main_thread=std::__1::shared_ptr<node::inspector::MainThreadHandle>::element_type @ 0x0000600000ee5498 strong=4 weak=2, path="hello.js", host_port=std::__1::shared_ptr<node::ExclusiveAccess<node::HostPort, node::MutexBase<node::LibuvMutexTraits> > >::element_type @ 0x0000600000ee4e98 strong=6 weak=1, inspect_publish_uid=0x00006000017f85e8) at inspector_io.cc:245:11
    frame #3: 0x000000010050fc54 node`node::inspector::Agent::StartIoThread(this=0x00006000017f8580) at inspector_agent.cc:851:9
    frame #4: 0x000000010050f428 node`node::inspector::Agent::Start(this=0x00006000017f8580, path="hello.js", options=0x0000000134026c88, host_port=std::__1::shared_ptr<node::ExclusiveAccess<node::HostPort, node::MutexBase<node::LibuvMutexTraits> > >::element_type @ 0x0000600000ee4e98 strong=6 weak=1, is_main=true) at inspector_agent.cc:830:9
    frame #5: 0x00000001001a801c node`node::Environment::InitializeInspector(this=0x0000000134025c00, parent_handle=nullptr) at node.cc:206:21
    frame #6: 0x0000000100017ec8 node`node::CreateEnvironment(isolate_data=0x0000000134022600, context=Local<v8::Context> @ 0x000000016fdfea70, args=size=2, exec_args=size=1, flags=kDefaultFlags, thread_id=(id = 18446744073709551615), inspector_parent_handle=nullptr) at environment.cc:463:12
    frame #7: 0x00000001002e4360 node`node::NodeMainInstance::CreateMainEnvironment(this=0x000000016fdfecb8, exit_code=0x000000016fdfec04) at node_main_instance.cc:147:9
    frame #8: 0x00000001002e4090 node`node::NodeMainInstance::Run(this=0x000000016fdfecb8) at node_main_instance.cc:96:7
    frame #9: 0x00000001001ac424 node`node::StartInternal(argc=3, argv=0x0000600000be2b50) at node.cc:1538:24
    frame #10: 0x00000001001ac040 node`node::Start(argc=3, argv=0x000000016fdff090) at node.cc:1545:27
    frame #11: 0x00000001016ac1c4 node`main(argc=3, argv=0x000000016fdff090) at node_main.cc:97:10
    frame #12: 0x0000000187b1b154 dyld`start + 2476
```

https://developer.apple.com/library/archive/documentation/General/Conceptual/lldb-guide/chapters/C3-Breakpoints.html

* thread #1, name = 'MainThread', queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
  * frame #0: 0x0000000100579198 node`node::sqlite::DatabaseSync::AuthorizerCallback(user_data=0x00006000028740d0, action_code=21, param1=0x0000000000000000, param2=0x0000000000000000, param3=0x0000000000000000, param4=0x0000000000000000) at node_sqlite.cc:1954:49
    frame #1: 0x0000000101b177d8 node`sqlite3AuthCheck(pParse=0x000000016fdfc5f0, code=21, zArg1=0x0000000000000000, zArg2=0x0000000000000000, zArg3=0x0000000000000000) at sqlite3.c:124289:8 [opt] [inlined]
    frame #2: 0x0000000101b177bc node`sqlite3Select(pParse=0x000000016fdfc5f0, p=0x0000000158207db0, pDest=0x000000016fdfbb20) at sqlite3.c:154419:7 [opt]
    frame #3: 0x0000000101b0e6a8 node`yy_reduce(yypParser=0x000000016fdfbbd0, yyruleno=84, yyLookahead=<unavailable>, yyLookaheadToken=<unavailable>, pParse=<unavailable>) at sqlite3.c:181449:5 [opt]
    frame #4: 0x0000000101a9f3c0 node`sqlite3Parser(yyp=<unavailable>, yymajor=1, yyminor=(z = "", n = 0)) at sqlite3.c:182913:15 [opt]
    frame #5: 0x0000000101a9f398 node`sqlite3RunParser(pParse=<unavailable>, zSql="") at sqlite3.c:184255:5 [opt]
    frame #6: 0x0000000101afcc7c node`sqlite3Prepare(db=<unavailable>, zSql=<unavailable>, nBytes=<unavailable>, prepFlags=<unavailable>, pReprepare=<unavailable>, ppStmt=<unavailable>, pzTail=<unavailable>) at sqlite3.c:146429:5 [opt]
    frame #7: 0x0000000101a9d508 node`sqlite3LockAndPrepare(db=0x000000013ce10230, zSql="SELECT 1", nBytes=-1, prepFlags=128, pOld=0x0000000000000000, ppStmt=0x000000016fdfc930, pzTail=0x0000000000000000) at sqlite3.c:146504:10 [opt]
    frame #8: 0x0000000100574908 node`node::sqlite::DatabaseSync::Prepare(args=0x000000016fdfcde8) at node_sqlite.cc:1152:11


* thread #1, name = 'MainThread', queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
  * frame #0: 0x0000000100579198 node`node::sqlite::DatabaseSync::AuthorizerCallback(user_data=0x00006000003f4000, action_code=21, param1=0x0000000000000000, param2=0x0000000000000000, param3=0x0000000000000000, param4=0x0000000000000000) at node_sqlite.cc:1954:49
    frame #1: 0x0000000101b177d8 node`sqlite3AuthCheck(pParse=0x000000016fdfc6c0, code=21, zArg1=0x0000000000000000, zArg2=0x0000000000000000, zArg3=0x0000000000000000) at sqlite3.c:124289:8 [opt] [inlined]
    frame #2: 0x0000000101b177bc node`sqlite3Select(pParse=0x000000016fdfc6c0, p=0x0000000140117e30, pDest=0x000000016fdfbbf0) at sqlite3.c:154419:7 [opt]
    frame #3: 0x0000000101b0e6a8 node`yy_reduce(yypParser=0x000000016fdfbca0, yyruleno=84, yyLookahead=<unavailable>, yyLookaheadToken=<unavailable>, pParse=<unavailable>) at sqlite3.c:181449:5 [opt]
    frame #4: 0x0000000101a9f3c0 node`sqlite3Parser(yyp=<unavailable>, yymajor=1, yyminor=(z = "", n = 0)) at sqlite3.c:182913:15 [opt]
    frame #5: 0x0000000101a9f398 node`sqlite3RunParser(pParse=<unavailable>, zSql="") at sqlite3.c:184255:5 [opt]
    frame #6: 0x0000000101afcc7c node`sqlite3Prepare(db=<unavailable>, zSql=<unavailable>, nBytes=<unavailable>, prepFlags=<unavailable>, pReprepare=<unavailable>, ppStmt=<unavailable>, pzTail=<unavailable>) at sqlite3.c:146429:5 [opt]
    frame #7: 0x0000000101a9d508 node`sqlite3LockAndPrepare(db=0x000000015b805250, zSql="SELECT 1", nBytes=-1, prepFlags=128, pOld=0x0000000140113b80, ppStmt=0x000000016fdfc958, pzTail=0x0000000000000000) at sqlite3.c:146504:10 [opt]
    frame #8: 0x0000000101a95578 node`sqlite3Reprepare(p=0x0000000140113b80) at sqlite3.c:146542:8 [opt]
    frame #9: 0x0000000101a8f0d4 node`sqlite3_step(pStmt=0x0000000140113b80) at sqlite3.c:93307:10 [opt]
    frame #10: 0x000000010057b324 node`node::sqlite::StatementExecutionHelper::Run(env=0x000000015a83fa00, db=0x00006000003f4000, stmt=0x0000000140113b80, use_big_ints=false) at node_sqlite.cc:2307:3
    frame #11: 0x000000010057c5ac node`node::sqlite::StatementSync::Run(args=0x000000016fdfcde8) at node_sqlite.cc:2506:7
    frame #12: 0x0000000101383238 node`Builtins_CallApiCallbackGeneric + 152
    frame #13: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #14: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #15: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #16: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #17: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #18: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
    frame #19: 0x0000000101494f48 node`Builtins_PromiseConstructor + 1864
    frame #20: 0x000000010137dbec node`Builtins_JSBuiltinsConstructStub + 332
    frame #21: 0x0000000101511b40 node`Builtins_ConstructForwardAllArgsHandler + 800
    frame #22: 0x000000010138158c node`Builtins_InterpreterEntryTrampoline + 268
