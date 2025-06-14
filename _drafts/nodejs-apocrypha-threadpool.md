---
layout: post
title: '1. Dealing With I/O Using The ThreadPool'
date: 2025-06-10
lang: pt-BR
tags: ["node-internals"]
category: ["nodejs-apocrypha", "libuv"]
---

Hello dear contributor. We're about to touch an exicing part of the implementaion of Node.js and libuv. To leverage this
chapter it's important that you know how Node event loop works. You don't not need to have all the order of execution of
`setImmediate`, `setTimeout` and `process.nextTick`. A knowledge about the architectural foundations is good enough.

Let me highlight the needed concepts for you.

## Recap Node.js Event Loop

An envent loop works the same way as we when we go to the supermarket. You have your buy list.

You start picking products, you're focused on them. While picking products from _prateleiras_ you can't do anything else.
That's like the execution of your JS code.

When the main thread is executing code, it can't deal with anything else. See the classical example below:

```js
console.log('Hi')

setTimeout(function a() {
    while(true);
}, 100);

setTimeout(function b() {
    console.log('finish execution')
}, 100);

console.log('How is it going?')
```

Notice that this code has to be parsed and then executed. All this keeps the main thread busy.

It executes all the four instructions In the following sequence:

1. prints `Hi`:
2. schedules function `a` to be executed at a given timeout;
2. schedules function `b` to be executed at a given timeout;
3. prints `How is it going?`.

### What's happens next?

Within at least 100ms the function `a` will be executed and the boom! Our event loop is blocked!

> Remember: The main thread executes JavaScript code and when doing so it can't do anything else

Our function `a` is JavaScript code. The main thread will take care of it and be blocked forever - since it has
a `while(true)`. In this scenario, the functoin `b` will never be executed not matter how much time has passed.

All this happens in a `libuv`. The lib that backs Node.js concurrency model.

[diagram with libuv phases]

## How Node.js keeps Event Loop free

> Not everybody writes infinite loops like that in Node.js and when doing so they take care of it, right?

Most of our application are `I/O-bound` which means: CPU is underused. There's no need to have multiple threads if the
most part of the job is waiting for a `file descriptor`.

> Remember: Threads consume resources

This is the same thing that empowers `NGINX` one of the most performative web servers out there.

Knowing this, Node.js collaborators take care of it for us. The internal modules that need to deal with some I/O
leverage the libuv thread pool.

I/O tasks like sending an HTTP request, receiving an HTTP request, opening a file and such are delegated to another thread.
This keeps the main thread free to execute more JS code.

That's why the majority can produce good enough code using Node.js. They usually rely on native modules.

## ThreadPool class

Node.js has its contructos to empower you when dealing with other threads. One of them is the ThreadPool class. Its
definition can be found at `node_internals.h:289`.

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

Heuristics: when it is all on C++ side.
