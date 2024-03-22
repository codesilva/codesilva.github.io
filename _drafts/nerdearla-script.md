---
layout: post
title: Script for Nerdearla Chile 2024
date: 2023-06-23
lang: pt-br
tags: ["conference", "talks"]
categoria: ["nerdearla"]
---

## Intro

- Hello everybody. Welcome to this talk.
- My name is Edy, I'm a software developer at CodeMiner42
- Father to a beatufil daughter
- Husband to an adorable wife
- Also a content creator; check my links on beacons scanning this qrcode
- Today we're going to talk about software architecture. I'will shrea an unconventinoal application that I could apply
    an architectural pattern to.
- My main goal is, by sharing my challenges, give you some tips on how to architect any project, even the unconventional
    ones.

## The task runner

1. The application we will ba talking about today is the task runner.
2. It's the core of my team. It basically deals with background tasks, that's why it has this name (nice name!)
3. I had just arrived to the team. I can recall my teammates struggling to find and fix a bug. Actually, they were
   struggling to understand the flow of the application.
4. It was happening because this application, our core, was spreaded through three projects. It had no clear separation
   of concerns and no tests.
5. Sounds bad, right?
6. That's why we decided to rewrite it.
7. I was the responsible for such a project and I decided to have an architecture, an intentional architecture.
8. Whith a clear separation of concerns. I was aiming for an application that could be easy to change in various
   aspects.

## Hands-on

1. one of the basic feature we have in this project is that:
2. we have a cron job, that runs periodically - five minutes let's say
3. this job for fetching shipping releases is triggered and it continues the flow
4. processing shipping releases and so on.

1. In order to apply an architecture you either master it or you make some analogies.
2. This talk exists, which means I didn't master it.
3. So I just searched for some content, also examples because I think that learning from examples is much easier.
4. From these examples, I started mounting the architecture of our project.

## Fundamentals software architecture

1. The essence of the examples I found is: we wanna isolate details from what matters.
2. I mean, your actual application, your business, has nothing to do with any particular database or web framework, for
   example.
3. The fundamental definition of layers/boundaries is like: details that drive, core, and details that are driven.
4. Details that drive are those that allow the outside world to get in touch with the core. eg. http web framework, that
   receives http requests
5. Details that are driven by the core are also tools, they are the outcome. eg. database, payment providers etc.
6. The core can be anything, actually. It's up to you. What I find a lot in this layer are:
    - use cases;
    - domain;
    - services/repositories.
7. A REST API boilerplate is like that then
    - http controller taking http requests
    - delegating to use case
    - use case holding domain objects and services/repositorie to perform the operation
8. from these definitions I started applying to my case
9. The separation would be the same. after all, it is the foundation of architecture. not having such a separation would
   be a mistake
10. The core and the infrastructure are equal.
11. I wanted to have use cases cause they are like that: [show an image with some use cases]
    they are great! looking at this project you could easily say what it deals with
12. The use case takes your domain and service contracts to perform its operation.

13. The infrastructure has the implementation of contracts. So such repository could be something like: [image with
    orderrepository implementation]

14. Interface, however, seemed very different to me. I needed jobs processing, but, different from what I had done before, this application would not have an http request that then enqueues job. it was a cron job, actually.
15. But if we take a moment to think about it we will realize that, jobs are enqueue to an specific queue. jobs are, in
    fact, data. Hmm, queues reeally sound like http endpoints. and jobs sound like http requests
16. hopefully, it's easy to see that, indeed, workers are just like http controllers. since like http controllers, the
    are listening to an specific queue.

## Bootstraping
