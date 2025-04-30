From Interrupts to Event Loops: A Journey through I/O


1️⃣ Introduction
Set the premise:
“Ever wondered what actually happens when your code ‘waits for a file’ or ‘gets a response from a server’? Let’s crack open the stack — from hardware to high-level abstractions.”

2️⃣ Low-level: Hardware & CPU Interruptions
Briefly explain:

CPU executes instructions sequentially.

I/O devices are way slower.

So devices signal the CPU via interrupts when ready.

Show your MIPS examples:

Polling I/O: program stuck checking a flag.

Interrupt-driven I/O: device triggers an interrupt, CPU jumps to ISR (Interrupt Service Routine), resumes after.

Bonus: quick demo of a MIPS handler printing a char when ready vs polling for a char.

Goal: Audience should get a feel for the latency issue and why we can’t just “wait around.”

3️⃣ Kernel Level: I/O APIs and Strategies
Introduce the problem:
“Modern OS kernels abstract device handling — but how do they let you know when your I/O is ready?”

Walk through:

Blocking I/O: thread waits.

Non-blocking I/O: check if it’s ready, maybe retry.

I/O Multiplexing: monitor multiple FDs.

Async I/O: submit work, get notified later.

Use clear diagrams to show process vs kernel interactions.

Optional: small C snippets of select(), epoll(), io_uring.

4️⃣ Userland: JavaScript & Node.js Event Loop
Connect it to JS:

Single-threaded model — can’t block.

Uses I/O Multiplexing under the hood (libuv).

All I/O is non-blocking → registered with epoll/kqueue.

Event loop monitors FDs.

Callback queue vs microtask queue.

Diagram idea:
Request → libuv → epoll → readiness → JS callback

Maybe show an example of a fs.readFile() call and break it down:

Added to epoll.

Event loop cycles.

Callback enqueued on readiness.

Executed when call stack is empty.

Highlight: “Node.js doesn’t have true Async I/O in the io_uring sense (yet, though people are working on it), it relies on I/O Multiplexing + non-blocking I/O + event loop.”

5️⃣ Closing Thoughts
Bring it full circle:
“From hardware interrupts on a 1990s MIPS CPU to the async abstractions in your modern JS stack — it’s all about letting your code sleep and wake up when it matters.”

Optional provocations:

How WebAssembly could play with this.

Node.js with io_uring projects.

Event loops in other languages (Go, Python’s asyncio, Nginx).

📌 Title ideas:
“When the CPU Listens: A Story of Interrupts and Async I/O”

“From MIPS Interrupts to JavaScript Event Loops”

“How I/O Actually Works: A Practical Walk from Hardware to JavaScript”

“Event Loops, Interrupts, and You”

