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
