# Understanding Libuv and Node.js Event Loop

I have this idea of showing how node js event loops works but with an experiment I never saw before.

I have both libuv and nodejs source code on my computer. I want to change libuv's code, just adding some print
statements in all the phases of the event loop, and then run nodejs with this modified libuv.

I want to experiment with functions like:

- setTimeout
- setImmediate
- process.nextTick
- Promise.resolve().then()

See more at understanding-nodejs-eventloop.md

---
