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
