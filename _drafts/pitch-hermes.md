# Pitch: Architecting the Unconventional: A Case Study in Software Design

Hi there. Welcome to this talk, today we're going to talk about software architecture, software design. We will walk
through a real use case where I could apply and learn about software design.

## State of software design

- I've searched for 'clean architecture' on GitHub. I found a bunch of nice implementations in multiple programming languages. Despite this variety of technologies, the majority of examples are REST API boilerplates.
- Not all applications are web-like applications though, and I believe that due to all these examples we aren't, in fact, learning how to architect software. we are learning how to architect web apis.
- I realized I didn't know architecture when I needed to implement it in a new project, a project that was not a REST API.

## Hermes, the task runner

- I was recently moved to a new team. I saw members of that team struggling to identify a bug that appeared in an application. It was a bug that sould be simple to identify, as well as to fix, but it wasn't due to some reasons which I can tell two: no tests and no clear baoundaries.
- After struggling with stuff like that, our boss decided we had to migrate that. Move that core concern to an isolated application.
- Here's what our journey starts. I had the opportunity to come up with a solution for that. A whole new project.
- it is important to tell you, what I call a task runner is an application that deals with background jobs, that's the terminology we use in the team
- so we started working on a definition. we defintely wanted to have a piece of softwara that works and is correct
- some of my main concerns were to build something that tells what it is about, that scales itself but also scales the team
- so I got my knowledge on architecture pushed to its limits, and they weren't that expanded

## Conventional web application architecture

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

![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/16546d23-a3f5-4438-a391-4d2a095b9c33)


## Task runner: how is it different?

- I was very familiarized with this kinda of architecture
- I had a controller, some services and persistence on a database using some ORM tool
- - I got in trouble in this case, cause I didn't know what to do. We had an exmample of task runner in the team but I could not understand it and one of its authors recommended me not to follow it.
- The task runner deals with Jobs - that are just data -, queues, and workers.
- No big deal, jobs will be enqueued - in a queue - and the workers will process them.
- Even worse, some jobs are enqueued by the task runner itself - like cron jobs, so there is no external call at all to trigger it
- How to apply architecture in such a case?
- To handle this the best way is knowing what we are doing.
- I didn't know at that moment.
- But with some help I could apply some analogy and that helped me to really understand the principles.
- Let's think about it
- In the REST boilerplate, we have anincoming http request. this request contains data that we process and perform some work with it.
- Our data in this case, lies in job data. So let's take job as if it was an http request
- The controller is the component that process this data, the http request. So, as I mentioned, the component that process job is a worker in background kobs
- Hence, workers will act as our controllers.
- Here is our updated high-level diagram

![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/9e4dd051-a8b5-4e6b-991a-915d92d9ebc1)

## How to architect any project?

1. Mastering the principles
2. If you don't master, you can use analogy.
  - Think of what your application is driven by. Some component will have to handle that incoming interaction. Such an interaction intent might carry data or not. You can call it, `interface layer`.
  - You have business logic, isolate them and call it `domain layer`.
  - Your application has features, units of work. You can call it `application layer`.
  - Think of the outcomes of your app. be a external provider calling or database transactions, so it has to have real implementations. You can call it `infrastructure layer`. All the details go here.


- That's a high-level representation so let me give you more details about each layer
  - interface handles incoming interactions, which in a web api are http requests. it takes a request, validates it and delegate the rest to application layer, throuh a use case
  - application contains the core of your business
    - domain with business logic
    - use cases, unit of work
    - service contracts, used by use cases
  - infrastructure
    - implements contracts defined in application layer
    - talks to the real world. let's say we have a repository contract in applicatio nlayer, here is where we will do the real implementation e.g. mysqlrespository

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

- Architectural Patterns
- Design Patterns
- How to use analogy to get leverage of existing examples/implementations

## Takeaways

- Get to know architectural patterns
- Understand how you can architecture any project learning from basics
- A thinking process that will help you where tu put a new component
- Customize the architectural pattern to your necessity

## Outline

- State of software design
    - Talking about how many examples of software architecture are, indeed, REST API boilerplates
    - Establishing the project that is said to be unconventional and how the existing references might not be applied to
        that
    - Telling how our journey starts - from a chaotic situation where it was hard to change software and find simple
        bugs
    - Establishing what is the "task runner"

- Conventional web application architecture
    - Explaining how having a well-defined architecture is good for a project
    - Walking through the components of a web application 
    - Defining layers/boundaries of a good enough architecture for such a conventional project

- Task runner: how is it different?
    - Explaining the difference between the task runner - which deals with background jobs, queues, and workers - and the
        conventional web application
    - Showing how an analogy can help us to identify architectural layers and components even from what is conventional
    - Demonstrating the architecture of the task runner and how me and my team dealt with specific cases like self-enqueued jobs

- Architecting any project
    - Reviewing the talk and defining architectural principles from what we just saw
