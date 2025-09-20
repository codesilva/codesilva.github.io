---
layout: post
title: '1. Node.JS BaseObject'
date: 2025-07-13
lang: pt-BR
category: ["nodejs-apocrypha", "node-internals", "boundary-crossing"]
private: true
chapter: 1
---

A frequently recurring situation is that a JavaScript object and a C++ object need to be tied together. BaseObject is the main abstraction for that in Node.js, and most classes that are associated with JavaScript objects are subclasses of it.

This is what you can see in the [Node.js C++ documentation](https://github.com/nodejs/node/blob/main/src/README.md#baseobject). In simple terms, BaseObject is the glue between C++ and JS lands.

![BaseObject illustrated as a glue between C++ and JS](/assets/images/nodejs-apocrypha/baseobject-illustration.png)

## Class Definition

Looking into [header file](https://github.com/nodejs/node/blob/c7b0dfbd7c564d5aa30f5521f07e2762487d41d1/src/base_object.h#L47), we can get some insights about the class:

```cpp
enum InternalFields { kEmbedderType, kSlot, kInternalFieldCount };
// Associates this object with `object`. It uses the 1st internal field for
// that, and in particular aborts if there is no such field.
// This is the designated constructor.
BaseObject(Realm* realm, v8::Local<v8::Object> object);
// Convenient constructor for constructing BaseObject in the principal realm.
inline BaseObject(Environment* env, v8::Local<v8::Object> object);
~BaseObject() override;

BaseObject() = delete;
```

It has two constructors, one that takes a `Realm*` and another that takes an `Environment*`. The second one is a convenience constructor for constructing `BaseObject` in the principal realm.

The default constructor is deleted, it enforces the use of one of the two constructors above. It makes sense, creating a BaseObject without associating it with a JS object would be pointless.

### Internal Fields

Each [`Object`][] can have a number of internal fields. They can be used to store C++ pointers or other data and are not directly accessible from JavaScript.

It's important to note that the number of internal fields must be set when creating the object template using [`SetInternalFieldCount`][]. If it's not set, the internal fields won't be available.

You can see this when creating objects. If one creates an object on the fly, without an [`ObjectTemplate`][], it won't have any internal fields.

```cpp
v8::Local<v8::Object> obj = v8::Object::New(isolate);
std::cout << "On the Fly object's internal field count: "
        << object_on_thefly->InternalFieldCount() << std::endl;
// Output: On the Fly object's internal field count: 0
```

But if one creates an object from a template that has internal fields set, it will have them.

```cpp
v8::Local<v8::ObjectTemplate> obj_template = v8::ObjectTemplate::New(isolate);
obj_template->SetInternalFieldCount(1); // Set 1 internal field
v8::Local<v8::Object> obj_from_template = obj_template->NewInstance(context).ToLocalChecked();
std::cout << "Template object's internal field count: "
        << obj_from_template->InternalFieldCount() << std::endl;
// Output: Template object's internal field count: 1
```

Once you have an object with internal fields, you can set them using [`SetInternalField`][] and [`SetAlignedPointerInInternalField`][]. The former is used to set a [`Data`][], while the latter is used to set a raw pointer.

```cpp
Local<v8::ObjectTemplate> obj_tmpl = v8::ObjectTemplate::New(isolate);
obj_tmpl->SetInternalFieldCount(2);
auto obj_from_template = obj_tmpl->NewInstance(context).ToLocalChecked();

Local<String> message =
    String::NewFromUtf8(isolate, "InternalField0").ToLocalChecked();

obj_from_template->SetInternalField(0, message);
obj_from_template->SetAlignedPointerInInternalField(
    1, static_cast<void*>(const_cast<char*>("InternalField1")));
```

For retrieving the values, you can use [`GetInternalField`][] and [`GetAlignedPointerFromInternalField`][].

```cpp
auto v = obj_from_template->GetInternalField(0).As<v8::Value>();
std::string value = Utf8Value(isolate, v).ToString(); // This is a Node.js thing, just a helper
// std::string value = *String::Utf8Value(isolate, v); // This would work too; It is using V8 API v8::String::Utf8Value

std::cout << "Value in internal field 0: " << value << std::endl;
std::cout << "Value in internal field 1: "
        << static_cast<const char*>(
                obj_from_template->GetAlignedPointerFromInternalField(1))
        << std::endl;

// Output
// Value in internal field 0: InternalField0
// Value in internal field 1: InternalField1
```

[`Data`]: https://v8docs.nodesource.com/node-24.1/d1/d83/classv8_1_1_data.html
[`GetAlignedPointerFromInternalField`]: https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html#a580ea84afb26c005d6762eeb9e3c308f
[`GetInternalField`]: https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html#a5ec04fa53508e451139ac89ef45c1431
[`Object`]: https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html
[`ObjectTemplate`]: https://v8docs.nodesource.com/node-24.1/db/d5f/classv8_1_1_object_template.html
[`SetInternalField`]: https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html#a9007e0dc23c63cb810530c3b38fedf99
[`SetAlignedPointerInInternalField`]: https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html#ab3c57184263cf29963ef0017bec82281
[`SetInternalFieldCount`]: https://v8docs.nodesource.com/node-24.1/db/d5f/classv8_1_1_object_template.html#a0f3ad8f58cd74a05d35eb3292fe9bd7f

### BaseObject's Internal Fields

_In Progress - More details to be added soon_

---

<!-- `kInternalFieldCount` is the number of internal fields in the object template. This is used to store the pointer to the -->
<!-- C++ object. -->

<!-- it has two internal fields as we can see in the enum below: -->

<!-- ```cpp -->
<!-- enum InternalFields { kEmbedderType, kSlot, kInternalFieldCount }; -->
<!-- ``` -->

<!-- https://github.com/nodejs/node/blob/c7b0dfbd7c564d5aa30f5521f07e2762487d41d1/src/base_object.h#L47 -->

<!-- BaseObjectPtr is an alias: -->

<!-- https://github.com/nodejs/node/blob/c7b0dfbd7c564d5aa30f5521f07e2762487d41d1/src/base_object.h#L315 -->

<!-- it works like a shared_ptr: -->

<!-- ```cpp -->
<!-- class BufferReader : public BaseObject { -->
<!--  public: -->
<!--   BufferReader(Environment* env, Local<Object> object, Local<Uint8Array> buffer) -->
<!--       : BaseObject(env, object) { -->
<!--     buffer_.Reset(env->isolate(), buffer); -->
<!--   } -->

<!--   void MemoryInfo(MemoryTracker* tracker) const override {} -->

<!--   const char* MemoryInfoName() const override { return "BufferReader"; } -->

<!--   size_t SelfSize() const override { return sizeof(*this); } -->

<!--   static void Read(const v8::FunctionCallbackInfo<v8::Value>& args) { -->
<!--     BufferReader* buff_reader; -->
<!--     ASSIGN_OR_RETURN_UNWRAP(&buff_reader, args.This()); -->

<!--     // Read n bytes from the buffer. -->
<!--     Environment* env = Environment::GetCurrent(args); -->
<!--     Isolate* isolate = env->isolate(); -->

<!--     if (!args[0]->IsInt32()) { -->
<!--       THROW_ERR_INVALID_ARG_TYPE(env->isolate(), -->
<!--                                  "Number of bytes must be an integer"); -->
<!--       return; -->
<!--     } -->

<!--     int total_bytes = args[0].As<Int32>()->Value(); -->
<!--     if (total_bytes < 0) { -->
<!--       THROW_ERR_OUT_OF_RANGE(env, "Number of bytes out of range"); -->
<!--       return; -->
<!--     } -->

<!--     auto buffer = buff_reader->get_buffer(); -->
<!--     size_t byteLength = buffer->ByteLength(); -->
<!--     if (buff_reader->position_ + total_bytes > byteLength) { -->
<!--       total_bytes = byteLength - buff_reader->position_; -->
<!--     } -->

<!--     if (total_bytes <= 0) { -->
<!--       args.GetReturnValue().Set(0); -->
<!--       return; -->
<!--     } -->

<!--     auto array_buffer = buffer->Buffer(); -->
<!--     size_t byte_offset = buffer->ByteOffset(); -->

<!--     // Create a new Uint8Array with the same backing store as the original -->
<!--     // buffer. -->
<!--     Local<Uint8Array> result = Uint8Array::New( -->
<!--         array_buffer, byte_offset + buff_reader->position_, total_bytes); -->
<!--     // Update the position. -->
<!--     buff_reader->position_ += total_bytes; -->
<!--     args.GetReturnValue().Set(result); -->
<!--   } -->

<!--   static void Seek(const v8::FunctionCallbackInfo<v8::Value>& args) { -->
<!--     BufferReader* buff_reader; -->
<!--     ASSIGN_OR_RETURN_UNWRAP(&buff_reader, args.This()); -->
<!--     Environment* env = Environment::GetCurrent(args); -->

<!--     if (!args[0]->IsInt32()) { -->
<!--       THROW_ERR_INVALID_ARG_TYPE(env->isolate(), -->
<!--                                  "Number of bytes must be an integer"); -->
<!--       return; -->
<!--     } -->

<!--     int new_position = args[0].As<Int32>()->Value(); -->
<!--     if (new_position < 0) { -->
<!--       THROW_ERR_OUT_OF_RANGE(env, "Position out of range"); -->
<!--       return; -->
<!--     } -->

<!--     Local<Uint8Array> buffer = buff_reader->get_buffer(); -->
<!--     size_t byteLength = buffer->ByteLength(); -->
<!--     if (new_position > byteLength) { -->
<!--       new_position = byteLength; -->
<!--     } -->

<!--     buff_reader->position_ = new_position; -->
<!--   } -->

<!--   static Local<FunctionTemplate> GetConstructorTemplate(Environment* env) { -->
<!--     Local<FunctionTemplate> tmpl = env->buffer_reader_constructor_template(); -->
<!--     if (tmpl.IsEmpty()) { -->
<!--       Isolate* isolate = env->isolate(); -->
<!--       tmpl = NewFunctionTemplate(isolate, IllegalConstructor); -->
<!--       tmpl->SetClassName(FIXED_ONE_BYTE_STRING(isolate, "BufferReader")); -->
<!--       tmpl->InstanceTemplate()->SetInternalFieldCount( -->
<!--           BufferReader::kInternalFieldCount); -->

<!--       SetProtoMethod(isolate, tmpl, "read", BufferReader::Read); -->
<!--       SetProtoMethod(isolate, tmpl, "seek", BufferReader::Seek); -->

<!--       env->set_buffer_reader_constructor_template(tmpl); -->
<!--     } -->

<!--     return tmpl; -->
<!--   } -->

<!--   static BaseObjectPtr<BufferReader> Create(Environment* env, -->
<!--                                             Local<Uint8Array> buffer) { -->
<!--     Local<Object> obj; -->
<!--     if (!GetConstructorTemplate(env) -->
<!--              ->InstanceTemplate() -->
<!--              ->NewInstance(env->context()) -->
<!--              .ToLocal(&obj)) { -->
<!--       return nullptr; -->
<!--     } -->

<!--     return MakeBaseObject<BufferReader>(env, obj, buffer); -->
<!--   } -->

<!--   void set_position(size_t position) { position_ = position; } -->

<!--   size_t get_position() { position_; } -->

<!--   Local<Uint8Array> get_buffer() { return buffer_.Get(env()->isolate()); } -->

<!--  private: -->
<!--   size_t position_ = 0; -->
<!--   v8::Global<Uint8Array> buffer_; -->
<!-- }; -->
<!-- ``` -->

<!-- https://github.com/nodejs/node/blob/main/src/base_object.h -->
<!-- https://github.com/nodejs/node/blob/main/src/base_object-inl.h -->
<!-- https://github.com/nodejs/node/blob/main/src/base_object.cc -->
<!-- https://v8docs.nodesource.com/node-24.1/d8/d83/classv8_1_1_function_template.html -->
<!-- https://v8docs.nodesource.com/node-24.1/db/d5f/classv8_1_1_object_template.html#a0f3ad8f58cd74a05d35eb3292fe9bd7f -->
<!-- https://github.com/nodejs/node/blob/c7b0dfbd7c564d5aa30f5521f07e2762487d41d1/src/base_object.cc#L27 -->
<!-- 1https://v8docs.nodesource.com/node-24.1/db/d85/classv8_1_1_object.html#ab3c57184263cf29963ef0017bec82281 -->


<!-- persistent_object -> https://github.com/nodejs/node/blob/c7b0dfbd7c564d5aa30f5521f07e2762487d41d1/src/base_object.h#L200 -->
