# What's New in Node.JS 24.0.0


Node.js has reached its 24th major version, and with it comes a host of new features and improvements. This release will
be the `Current` release for the next six months becoming LTS in October 2024. Let's delve into the highlights of this
release.


## Upgrade to V8 to 13.4

With this upgrade to the dependency that allows Node.js to run JavaScript, we now have access to a couple of new
features for writing more secure and efficient code.

### [Error.isError][]

`Error.isError` is a static method that checks if a given value is an instance of the `Error` regardless of its [realm][]. 

You problably fell (or know someone who have) in the trap of using `instanceof` to check if an error is an instance of `Error` and got surprised
when an object that you were sure was an `Error` instance was returned as `false`. An example like the following:

```javascript
const vm = require('node:vm');

function logError(err) {
  if (err instanceof Error) {
    console.error('Caught an error:', err);
  } else {
    console.error('You must provide an Error instance');
  }
}

const context = vm.createContext();

try {
  vm.runInContext(`
    throw new Error("Something went wrong in another realm");
  `, context);
} catch (err) {
  logError(err); // This will now work correctly. Output will be: You must provide an Error instance
}
```

This is the nature of JavaScript. It was complicated to have, for example, a centralized error handling system that
could catch errors from different realms. Everything is simplified with this new method.

Change the `logError` function, replacing the `instanceof` check with `Error.isError` and it will work as expected.

```javascript
function logError(err) {
  if (Error.isError(err)) {
    console.error('Caught an error:', err);
  } else {
    console.error('You must provide an Error instance');
  }
}
```

### [Explicit Resource Management (using, using await)][]

Explicit Resource Management introduces new syntax and semantics to JavaScript, aiming to provide a standardized way to manage the lifecycle of resources like file handles, network connections, or database cursors. This is particularly useful for ensuring that such resources are properly released, even in the presence of errors or early exits.

With this new feature, you can use the `using` statement to declare a resource that should be automatically released
when it goes out of scope. This is similar to the `try-with-resources` statement in Java or the `using` statement in C#.

Instead of doing something like this:

```javascript
function someFunction() {
  const handle = someResource.open();
  try {
    ... // ok to use `handle`
  }
  finally {
    handle.close();
  }
}
```

You can now do this:

```javascript
function someFunction() {
  using handle = someResource.open();
  ... // ok to use `handle`
} // handle is automatically closed when it goes out of scope
```

`handle` will be disposable if it has a `Symbol.dispose` method. If the dispose is `async` it must be defined as
a `Symbol.asyncDispose` method. 

If it is an async dispose you must use `using await` instead of `using`.

This is a great improvement for writing cleaner and more maintainable code. It also helps to avoid resource leaks and
other issues that can arise from not properly managing resources.

### [Atomic.pause][]

`Atomic.pause` allows you to hint the CPU that the current thread is waiting for a resource to become available i.e. in
a [spinlock][]. This can help the CPU to optimize its power usage and performance.

```javascript
// Imagine another thread also has access to this shared memory
const sab = new SharedArrayBuffer(1024);
const i32 = new Int32Array(sab);

// Fast path: spin the CPU for a short while
let spin = 0;
do {
  if (acquiredSharedResourceLock()) {
    break;
  }
  Atomics.pause();
  spin++;
} while (spin < 10);

// Slow path: wait for the lock
// This can only be called in a worker thread,
// because the main thread cannot be blocked
Atomics.wait(i32, 0, 1);
```

### [WebAssembly support to 64-bit memory][]

This increases the WebAssembly memory size limit from 4GB to 16 exabytes. This is a huge increase in the amount of
memory that can be allocated for WebAssembly modules. This is particularly useful for applications that require large 
amounts of memory.

## [Permission][] is stable

The Node.js Permission Model is a mechanism for restricting access to specific resources during execution. The API exists behind a flag `--permission` which when enabled, will restrict access to all available permissions.

It has a runtime API you can use to check which permission your application has.

```javascript
// filename: index.js
process.permission.has('fs.write'); // true
process.permission.has('fs.write', '/home/codeminer42/writeonly'); // true
process.permission.has('fs.write', '/home/codeminer42/readonly'); // false

process.permission.has('fs.read'); // true
process.permission.has('fs.read', '/home/codeminer42/writeonly'); // false
process.permission.has('fs.read', '/home/codeminer42/readonly'); // true
```

Executing the script above with `node --permission --allow-fs-read=/home/codeminer42/readonly --allow-fs-write=/home/codeminer42/writeonly index.js`.

### [URLPattern][] as global

API is now exposed on the global object, making it easier to use without explicit imports. This API provides a powerful pattern matching system for URLs,
similar to how regular expressions work for strings.

```javascript
const pattern = new URLPattern({ pathname: "/books/:id" });
console.log(pattern.test("https://example.com/books/123")); // true
console.log(pattern.exec("https://example.com/books/123").pathname.groups); // { id: "123" }
```

Very useful for validating and parsing URLs in a more structured way. Now you can write your own router.

## Other dependency upgrades

### Upgrade Undici to 7.0.0
### Upgrade npm to 11.0.0

[Atomic.pause]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics/pause
[Error.isError]: https://chromestatus.com/feature/5106098833719296
[Explicit Resource Management (using, using await)]: https://github.com/tc39/proposal-explicit-resource-management
[WebAssembly support to 64-bit memory]: https://github.com/WebAssembly/memory64/blob/main/proposals/memory64/Overview.md#motivation
[URL Pattern]: https://chromestatus.com/feature/5106098833719296
[spinlock]: https://en.wikipedia.org/wiki/Spinlock
[realm]: https://tc39.es/ecma262/#realm
[URLPattern]: https://developer.mozilla.org/en-US/docs/Web/API/URLPattern
[Permission]: https://nodejs.org/api/permissions.html
