# Headline

You Didn't Know You Need node:repl module
Juice Your Project Like A DX Master
Building a Developer Console for Your Node.js Application
Interactive Debugging and Control in Node.js with REPL

# Features and Benefits

| Features | Benefits |
| --- | --- |
| Como estruturas o bootstrap da aplicação | Poder inicializar a aplicação de formas variadas |
| Conhecer o conceito de conrole para aplicacao e o modulo node:repl | Permitir experimentos e debug mais efetivo de forma rápida e objetiva |

# 4U's

- Urgency: Not that urgent. You will want a console whenever you want (1)
- Uniqueness: Very unique. I didn't find a single talk mentioning something like this (4)
- Ultra-specific: Very specific. (4)
- Useful: Very useful. (4)

# Showing a Need

From time to time there's something that only happens in a certain environment, with a certain condition. Something
really hard to put under test.

You wanna have a way to get into the environment, on the fly, and play with it. You want to be able to run some code 
interactively, and see the results.

# Satisfying the Need

The node:repl module is a built-in module that allows you to create a Read-Eval-Print Loop (REPL) in your Node.js. With
a proper application bootstrap, you can use it to run code interactively. It provides history, tab completion, and the
possibility to add custom commands.

A tool like that has proven to be useful in communities like Rails. In Node.js, you can do the same thing!

---

## Description

You probably have faced a situation where you needed to debug something particular in your application. Something in a specific condition. These kinds of situations tend to be poorly handled by us developers.

A common approach is adding a bunch of logs, deploying the code, and waiting for the logs to return. This is a very slow process and can be very frustrating.

It would be much better if you could just get into the environment, while running, execute some code, and see the results. This is where the node:repl module comes in. It allows you to create a Read-Eval-Print Loop (REPL) in your Node.js application.

Inspired by Ruby on Rails, which has a very useful console, I implemented a console in the application I was working on. It was a game changer. Now, we have a way more effective debugging/experimentation process. My team fell in love with it. Now, it's part of the app, as it always has been.

Another good thing is that it was not hard to implement. The node:repl module gives everything. We just need to ensure the application is properly bootstrapped to use the REPL module.

## Benefits to the Ecosystem

After attending this talk, the audience should know:

- what is node:repl module, and how it works;
- the importance of having a proper application bootstrap
- how to set up the application bootstrap to allow for interactive debugging.

This empowers the audience since they will be able to leverage Node.js tools to improve their applications very easily.

Here's the outline of the talk:

- Introduction
    - I start discussing those kinds of situations we face as developers, where we need to debug something in a specific
        condition.
    - I discuss some common approaches to this problem, how they are not effective and how we lack tools to help us
        with that

- Solutions out there
    - I discuss some solutions out there, like the Rails console and how it helps with this problem. I show how it just uses the Ruby REPL module to do that.
    - I discuss how we can do the same thing in Node.js using the node:repl module - here i introduce the capabilities of the module and how it works

- How to get the job done
    - There's a gap between knowing how the module works and using it in your application: I discuss how to bootstrap your application to allow for interactive debugging.

- Conclusion
    - I conclude by sharing some real use-cases where the repl module helped us a lot. I also share some tips on how to use it effectively.
