# Pitch: Architecting the Unconventional: A Case Study in Software Design

Hi there. Welcome to this talk, today we're going to talk about software architecture, software design. We will walk
through a real use case where I could apply and learn about software design.

## State of software design

- I've searched for 'clean architecture' on GitHub. I found a bunch of nice implementations in multiple programming languages. Despite this variety of technologies, the majority of examples are REST API boilerplates.
- Not all applications are web-like applications though, and I believe that due to all these examples we aren't, in fact, learning how to architect software. we are learning how to architect web apis.
- I realized I didn't know architecture when I needed to implement it in a new project, a project that's not a REST API.

## Hermes, the task runner

- I was recently moved to a new team. I saw members of that team struggling to identify a bug that appeared in an application. It was a bug that sould be simple to identify, as well as to fix, but it wasn't due to some reasons which I can tell two: no tests and no clear baoundaries.
- After struggling with stuff like that, our boss decided we had to migrate that. Move that core concern to an isolated application.
- Here's what our journey starts. I had the opportunity to come up with a solution for that. A whole new project.
- it is important to tell you, what I call a task runner is an application that deals with background jobs, that's the terminology we use in the team
- so we started working on a definition. we defintely wanted to have a piece of softwara that works and is correct
- some of my main concerns were to build something that tells what it is about, that scales itself but also scales the team
- so I got my knowledge on architecture pushed to its limits, and they weren't that expanded

## Conventional web application architecture - you believe you know

- Architectural patterns tell you about the organization and boundaries of your application.
- A thing I like in software arcthitecture is that it is like a map. It guides you how you can walk in the application, how you can change it. It scales your team
- So architecting a REST API application would be like
  - We can start thinking of what drives and what is driven by our application
  - In a REST application, HTTP requests drive our app
    - They come in, we do something with that and respond to it
  - The application drives, most likely, a database after processing the request

  ![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/5c26daee-e388-41d9-a195-fb7505b5e8fb)  

- These boundaries are quite clear.

![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/9765d5a0-00e9-4f3b-9e12-612c56bbf703)

### Expanding a little bit

- Now let's wonder what is in the middle. What's the application core?
- it's where the things that really matter lie: your domain, use cases, and service (that support use cases)
  - domain is your business logic, what goes beyond this automation. logic that would still exist if there were no code at all. e.g. Order
  - use case is a unit of work. it the feature itself. it takes entities from your domain to perform the desired operation e.g. CreateOrder


![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/eecbfe3b-170f-4cd9-ad2c-5b01972df74a)

- That's too much
- let me translate it into what we really do in our application, using our favorite tools

![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/2f525b27-b7eb-4a53-bc86-48b0ee7344ed)



### Layers

- That's a high-level representation so let me give you more details about each layer
  - interface handles incoming interactions, which in a web api are http requests. it takes a request, validates it and delegate the rest to application layer, throuh a use case
  - application contains the core of your business
    - domain with business logic
    - use cases, unit of work
    - service contracts, used by use cases
  - infrastructure
    - implements contracts defined in application layer
    - talks to the real world. let's say we have a repository contract in applicatio nlayer, here is where we will do the real implementation e.g. mysqlrespository

## Task runner: how is it different?

we have no controllers neither http requests, just workers and a bunch of jobs coming in - sometimes self-enqued.

## The building blocks

- what drives:w

---
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
