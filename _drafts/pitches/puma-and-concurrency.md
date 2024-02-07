# Concurrency in Ruby - The already solved problems

## Abstract

In this talk we are going to talk about concurrency in Ruby. In 2005, Herb Sutter wrote that amazing article about Moore's Law and the eventual ending of such an observation. The main idea was: the free lunch is over. That is a prediction we have already. That is why manufacturers are in fact adding more and more cores to the processors. To get your application faster, scalable, and with more throughput we would need to use concurrency, use these cores.

Herb Sutter predicted this concurrency revolution and even said something like: developers may not grok concurrency yet so they didn't when OO came in. I think he was correct. Since then we got more languages with better support for concurrency like Kotlin, Go, Elixir maybe.

However, when was the last time you created a concurrent program? You were able to write really scalable Rails application without starting a single Thread. Looks like there is a free lunch for you yet.

Actually, there is a free lunch for you but through some tools like Active Record async queries which make your life easier. I mean, you might not have considered perform a query in another thread, but once it is available to you in a method, it is pretty easy to use. So, PUMa is one of these tools that pay the lunch for you.

So in today's talk we will go like Richard Feynman once wrote. He wrote in his blackboard: "know how to solve every problem that has been solved". So, in today's talk we will go olver how PUMA solves the problem os handling many HTTP calls using a pre-forking approach. We will see the concurrency patterns emerge and discuss all of them.

I like those phrases extracted from Richard Feynman blackboard:

- "What I cannot create, I do not understand"
- "Know how to solve every problem thas has been solved"

## takeaways

- Overview of Rack and Rack-based application servers
- Ruby concurrency building blocks
- Why concurrency matters and how PUMA applies it

## topics

- Processes, Threads, Fibers and Reactors
- Common concurrency patterns
- Rack server
- PUMA architecture
  
## Outline

- A day in the life of a HTTP Request to your Rails app
    - Client/Server design alternatives
    - What is this Rack thing?
- Puma architecture
    - 
    - Cluster mode
        - Where the concurrency thrives
- Why that matters?
    - You might want to do that in your application
    - You might wanna boots your production PUMA server.

[how puma works talk](https://www.youtube.com/watch?v=SquGNt4FhY0)
