V8 Reference -> https://v8docs.nodesource.com/node-4.8/dd/d0d/classv8_1_1_function_callback_info.html

```cpp
void DatabaseSync::Backup(const FunctionCallbackInfo<Value>& args) {
  /* args.GetReturnValue().Set( */
  /*     String::NewFromUtf8(args.GetIsolate(), "Backup not implemented yet", NewStringType::kNormal).ToLocalChecked() */
  /*     ); */

  /* std::string fn_name = "progress"; */
  Environment* env = Environment::GetCurrent(args);
  Local<Function> fn = args[0].As<Function>();
  /* Local<Function> fn = options->Get(env->context(), FIXED_ONE_BYTE_STRING(env->isolate(), fn_name)).ToLocalChecked().As<Function>(); */
  Local<Value> argv[] = {String::NewFromUtf8(env->isolate(),
      "This string is defined on C++ land",
      NewStringType::kNormal)
    .ToLocalChecked()};
  /* Local<Value> result = fn->Call(env->context(), Null(env->isolate()), 0, nullptr).ToLocalChecked(); */
  Local<Value> result = fn->Call(env->context(), Null(env->isolate()), 1, argv).ToLocalChecked();

  args.GetReturnValue().Set(result);
}
```

Calling on js

```javascript
const { DatabaseSync } = require('node:sqlite')

const db = new DatabaseSync(':memory:')

db.backup((argFromCpp) => {
    console.log({ argFromCpp })

    return 'This is a callback'
});
```

## I just wanted to know how to do async work no nodejs C++ land

Crypto is a good example. I'm looking into `RandomBytesJob` that's is async being able to dispatch executiont o the libuv thread pool.

```cpp
#include "threadpoolwork-inl.h"
#include <uv.h>

class MyThreadPoolWork : public node::ThreadPoolWork {
public:
  MyThreadPoolWork(node::Environment* env, const char* type, v8::Local<v8::Function> jsFunction)
      : node::ThreadPoolWork(env, type), jsFunction_(env->isolate(), jsFunction), callCount(0) {}

  void DoThreadPoolWork() override {
    timer.data = this;
    uv_timer_init(uv_default_loop(), &timer);
    uv_timer_start(&timer, TimerCallback, 0, 3000); // Start immediately, repeat every 3000ms
  }

  void AfterThreadPoolWork(int status) override {
    // Cleanup if necessary
  }

  static void TimerCallback(uv_timer_t* handle) {
    MyThreadPoolWork* self = static_cast<MyThreadPoolWork*>(handle->data);
    self->CallJSFunction();
    self->callCount++;
    if (self->callCount >= 3) {
      uv_timer_stop(handle);
      uv_close((uv_handle_t*)handle, nullptr);
    }
  }

  void CallJSFunction() {
    v8::Isolate* isolate = env_->isolate();
    v8::HandleScope handle_scope(isolate);
    v8::Local<v8::Function> jsFunction = v8::Local<v8::Function>::New(isolate, jsFunction_);
    jsFunction->Call(isolate->GetCurrentContext(), v8::Null(isolate), 0, nullptr).ToLocalChecked();
  }

private:
  uv_timer_t timer;
  v8::Persistent<v8::Function> jsFunction_;
  int callCount;
};
```

```javascript
const { MyThreadPoolWork } = require('node:sqlite')

const myThreadPoolWork = new MyThreadPoolWork((argFromCpp) => {
    console.log({ argFromCpp })

    return 'This is a callback'
});
```

Basically, I want it to run in the Thread pool to avoid blocking the main thread. I'm not sure if this is the best way
to do it, but it's a start.

I can use this ThreadPollWork to enqueue work to the thread pool and call a JS function when it's done.


This commig show a usage of `ThreadPoolWork` in the `crypto` module. It's a good example to follow.

https://github.com/nodejs/node/commit/6ded4f2bad519d2c201c855b9ba87095bc29d71b#diff-fedb6e73ca5ff8eaed6d0d95d934558e455bb2528ee65d19dd5a5863c69914a1

before it was -> `cb1687241671732e91959c67202efa73139bd1e8`


```cpp

class ThreadPoolWork {
 public:
  explicit inline ThreadPoolWork(Environment* env, const char* type)
      : env_(env), type_(type) {
    CHECK_NOT_NULL(env);
  }
  inline virtual ~ThreadPoolWork() = default;

  inline void ScheduleWork();
  inline int CancelWork();

  virtual void DoThreadPoolWork() = 0;
  virtual void AfterThreadPoolWork(int status) = 0;

  Environment* env() const { return env_; }

 private:
  Environment* env_;
  uv_work_t work_req_;
  const char* type_;
};
```

what ugly syntax
