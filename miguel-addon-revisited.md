# Session Title
Running LLMs in Node.js: Wrapping GGML for High-Performance AI

# Abstract
Python currently monopolizes the AI landscape, but the heavy lifting is actually done by C++ libraries like **GGML**—the tensor engine behind the revolutionary `llama.cpp`. Node.js developers shouldn't have to spawn Python processes to access this power.

In this talk, we will build a high-performance tensor addon from scratch using **Node-API**. We will wrap the **GGML** C++ library to perform matrix multiplications and tensor operations directly in Node.js, achieving native-speed inference. You will learn how to structure ABI-stable addons, manage memory between V8 and C++, and finally prove that JavaScript is ready for the AI era.

# Description
The "AI Engineering" stack is shifting. It’s no longer just about calling OpenAI APIs; it’s about running efficient, local inference. While Python has `torch` and `numpy`, Node.js has often been left behind—until now.

In this deep-dive session, we will:
1.  **Deconstruct the Problem:** Why is Python "fast" for AI? (Hint: It’s just C++ bindings).
2.  **Meet the Tooling:** Introduction to **GGML** (the library that powers local LLMs) and **Node-API** (the stable interface for V8).
3.  **Live Code the Solution:**
    *   Setting up `node-addon-api` without the "V8 headers" headache.
    *   Wrapping a `ggml` tensor operation (like matrix multiplication).
    *   Benchmarking: JS implementation vs. Python/NumPy vs. Our Node+GGML Addon.
4.  **Advanced Techniques:** Handling heavy computation without blocking the Node.js Event Loop (using `uv_queue_work` or `Napi::AsyncWorker`).

You will walk away with a working pattern to integrate **any** C++ AI library into your Node.js stack, breaking the Python dependency chain.

# Key Outcomes
After attending this talk, audience members will be able to:
1.  Understand the architecture of AI libraries (C++ core + high-level bindings) and replicate it in Node.
2.  Use **Node-API** to wrap the **GGML** tensor library for native-speed matrix operations.
3.  Build performant addons that don't block the Node.js Event Loop.
4.  Create ABI-stable binaries that survive Node.js version upgrades.

# Target Audience
Intermediate to Advanced Node.js engineers. No PhD in Math required—just a curiosity about how to make Node.js go fast and how modern AI libraries work under the hood.

# Speaker Bio
**Edy Silva** is a Software Engineer and technical writer obsessed with performance and internals. With a background in building scalable systems at CodeMiner42 and a history of deep-diving into "black boxes" (from Brainfuck compilers to Git internals), Edy loves demystifying low-level concepts for high-level developers. He is currently exploring the intersection of local AI and web technologies, proving that you don't need Python to run the future of software.

# Additional Details
- **Session format**: Session
- **In-person or virtual**: Virtual
- **Track**: Development
- **Level**: Intermediate
- **Language**: English
