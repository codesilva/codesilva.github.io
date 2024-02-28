# Pitch: Applying architecture to a non-conventional web application
Applying architecture to an application that handles async jobs

## Abstract

A bug comes in at a very critical part of our services and team takes a long time to understand what is going on - unders customer's and stakeholders pressure.
Even though the application is not that complex, we have not meaningful logs, no obersvability nor alerts, a small team, and
worse, something that we can really call a LEGACY CODE.

Looking for more scalability, not only for the application, but for the team, the stakeholders decide to create a new
project to handle only that critical part. That is how our journey with architectural paradigms starts. With their
benefits and challenges, since this is not a regular web applicatio with a bunch of endpoints and resource manipulation.

In this talk, we will go through the implantation of an architecture in a non-conventional webish application and the
spectator will be able to see the patterns emerge and then apply to any kind of application.

```
In general we dont talk too much about architecture. I worked in a bunch of JS projects and the vast majority did not
have a defined architecture. In the best, we can see ppl following the framework approach. Moreover, those who apply
some architecture do so in regular web applications with HTTP requests coming to an endpoint and having som persistency
in databases and so on.

Searching for "clean archictecture" in [github](https://github.com/search?q=clean+architecture+language%3ATypeScript&type=repositories&l=TypeScript&p=2) I found a bunch of projects doing that.

In this talk, I am going to talk about a totally different use case. An application that has no enpoint, no self
persistency, but a bunch of service calls and background jobs.

Hopefully, we will be able to go trough this implementation and see the architectural patterns emerge by applying some
analogies to these conventional web applications that apply architecture.
```

## Main Topics

- Architectural paradigms
- Design Patterns
- How to apply patterns to any application
  
## Takeaways

- Get to know some architectural paradigms
- Go beyond with architecture
- Understand that architectures serve you not the contrary, so you are allowed to flex it to your purposes
- Apply architectural patterns to any project

## Outline

- Architectural paradigms (around 5 minutes)
    - Talking about the existing paradigms
    - Drawing a parallel with Desing Patterns and showing how such paradigms come from the same principle

- Architecture in the conventional web apps (around 10 minutes)
    - Showing how a four-layer ach can be implemented in a regular backend application
    - Benefits of a well-defined architecture

- The architecture the task runner (15 min)
    - Establishing what a "task runner" is
    - Comparing a task runner application with a regular application
    - Identify each architectural component and how it can be applied in such a different kind of app
