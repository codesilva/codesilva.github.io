---
layout: post
title: '1. Node.JS BaseObject'
date: 2025-07-13
lang: pt-BR
category: ["nodejs-apocrypha", "node-internals", "boundary-crossing"]
private: true
chapter: 1
---

Base object is the glue between C++ and JS lands.

```cpp
class BufferReader : public BaseObject {
 public:
  BufferReader(Environment* env, Local<Object> object, Local<Uint8Array> buffer)
      : BaseObject(env, object) {
    buffer_.Reset(env->isolate(), buffer);
  }

  void MemoryInfo(MemoryTracker* tracker) const override {}

  const char* MemoryInfoName() const override { return "BufferReader"; }

  size_t SelfSize() const override { return sizeof(*this); }

  static void Read(const v8::FunctionCallbackInfo<v8::Value>& args) {
    BufferReader* buff_reader;
    ASSIGN_OR_RETURN_UNWRAP(&buff_reader, args.This());

    // Read n bytes from the buffer.
    Environment* env = Environment::GetCurrent(args);
    Isolate* isolate = env->isolate();

    if (!args[0]->IsInt32()) {
      THROW_ERR_INVALID_ARG_TYPE(env->isolate(),
                                 "Number of bytes must be an integer");
      return;
    }

    int total_bytes = args[0].As<Int32>()->Value();
    if (total_bytes < 0) {
      THROW_ERR_OUT_OF_RANGE(env, "Number of bytes out of range");
      return;
    }

    auto buffer = buff_reader->get_buffer();
    size_t byteLength = buffer->ByteLength();
    if (buff_reader->position_ + total_bytes > byteLength) {
      total_bytes = byteLength - buff_reader->position_;
    }

    if (total_bytes <= 0) {
      args.GetReturnValue().Set(0);
      return;
    }

    auto array_buffer = buffer->Buffer();
    size_t byte_offset = buffer->ByteOffset();

    // Create a new Uint8Array with the same backing store as the original
    // buffer.
    Local<Uint8Array> result = Uint8Array::New(
        array_buffer, byte_offset + buff_reader->position_, total_bytes);
    // Update the position.
    buff_reader->position_ += total_bytes;
    args.GetReturnValue().Set(result);
  }

  static void Seek(const v8::FunctionCallbackInfo<v8::Value>& args) {
    BufferReader* buff_reader;
    ASSIGN_OR_RETURN_UNWRAP(&buff_reader, args.This());
    Environment* env = Environment::GetCurrent(args);

    if (!args[0]->IsInt32()) {
      THROW_ERR_INVALID_ARG_TYPE(env->isolate(),
                                 "Number of bytes must be an integer");
      return;
    }

    int new_position = args[0].As<Int32>()->Value();
    if (new_position < 0) {
      THROW_ERR_OUT_OF_RANGE(env, "Position out of range");
      return;
    }

    Local<Uint8Array> buffer = buff_reader->get_buffer();
    size_t byteLength = buffer->ByteLength();
    if (new_position > byteLength) {
      new_position = byteLength;
    }

    buff_reader->position_ = new_position;
  }

  static Local<FunctionTemplate> GetConstructorTemplate(Environment* env) {
    Local<FunctionTemplate> tmpl = env->buffer_reader_constructor_template();
    if (tmpl.IsEmpty()) {
      Isolate* isolate = env->isolate();
      tmpl = NewFunctionTemplate(isolate, IllegalConstructor);
      tmpl->SetClassName(FIXED_ONE_BYTE_STRING(isolate, "BufferReader"));
      tmpl->InstanceTemplate()->SetInternalFieldCount(
          BufferReader::kInternalFieldCount);

      SetProtoMethod(isolate, tmpl, "read", BufferReader::Read);
      SetProtoMethod(isolate, tmpl, "seek", BufferReader::Seek);

      env->set_buffer_reader_constructor_template(tmpl);
    }

    return tmpl;
  }

  static BaseObjectPtr<BufferReader> Create(Environment* env,
                                            Local<Uint8Array> buffer) {
    Local<Object> obj;
    if (!GetConstructorTemplate(env)
             ->InstanceTemplate()
             ->NewInstance(env->context())
             .ToLocal(&obj)) {
      return nullptr;
    }

    return MakeBaseObject<BufferReader>(env, obj, buffer);
  }

  void set_position(size_t position) { position_ = position; }

  size_t get_position() { position_; }

  Local<Uint8Array> get_buffer() { return buffer_.Get(env()->isolate()); }

 private:
  size_t position_ = 0;
  v8::Global<Uint8Array> buffer_;
};
```

https://github.com/nodejs/node/blob/main/src/base_object.h
https://github.com/nodejs/node/blob/main/src/base_object-inl.h
https://github.com/nodejs/node/blob/main/src/base_object.cc
https://github.com/nodejs/node/blob/main/src/README.md#baseobject
