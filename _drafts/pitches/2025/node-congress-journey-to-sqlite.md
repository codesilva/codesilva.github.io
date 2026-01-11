# SQLite in Node.js from inside out

# Features and Benefits

| Features | Benefits |
| --- | --- |
| Get to know node:sqlite module | |
| SQLite is having a comeback | |

# 4U's

- Urgency: 
- Uniqueness: 
- Ultra-specific: 
- Useful: 

# Showing a Need

You want to write an application with zero-dependencies with a simple storage solution. You may not know it yet, but
SQLite is the perfect solution for you.

# Satisfying the Need

Node.js already has an experimental module for SQLite. You can use it today. It brings a lot of features that go beyond
the basics like user defined functions, backup, and more.


https://www.bmpi.dev/en/dev/renaissance-sqlite/
https://turso.tech/


---

## Short Summary

SQLite is having its Renaissance. It's being used in many projects and companies. Bun runtime has its implementation of
sqlite, Turso is a product on top of SQLite, and the Ruby on Rails framework dropped all its dependency on Redis in
favor o SQLite for things like Caching and Queues.

Node.js version 22.5.0 introduced the `node:sqlite` module. It's an experimental module that allows you to use SQLite in
a very Node.js way, without any external dependency.

In this talk, you will learn how to use SQLite in Node.js. We will explore the current `node:sqlite` features and how to
use them. We will also explore the future of SQLite in Node.js.

## Previous Talks

Nerdearla 2024: Architecting the unconventinal

In this talk I showcase an architecture I made on a project. This architecture was for a project using TypeScript, NodeJS and BullMQ.

  - Recording: https://www.youtube.com/watch?v=TMsPC6oskCg
  - Slides: https://docs.google.com/presentation/d/1sMEhBqycXWgFTut750sU9QXz7crkH6NLPsmQE6OfJD0/edit?usp=sharing

Google I/O Extended Fortaleza 2024: 

In this talk I showed how to set up Gemini with Firebase using JavaScript SDK

  - Slides (PT-BR): https://docs.google.com/presentation/d/1lzwdDXjuSrtYCoaFPhYRVqXkS-nq0s2heCXZih1oYso/edit?usp=drive_link

GURU-CE: How to avoid memory crashes

In this talk I brought a performance where we reduced RAM comsuption in 90%.

  - Slides (PT-BR): https://docs.google.com/presentation/d/1OlLCa5sX08x8TZNdlX-fqNDrH9wWxaZHlSwNIhgxGGM/edit?usp=sharing

More on https://codesilva.com/talks/

## Talk long description

Since last year I've contributing to NodeJS (https://github.com/nodejs/node/pulls?q=is%3Apr+author%3Ageeksilva97+). In
the past few months I've been working on the `node:sqlite` where I could implement features like `backup`. I'm still
focused on the `node:sqlite` module, bringing new features and improvements. That's why I want to share with you what
I've learned and what I'm working on. The state and the future of SQLite in Node.js.

This talk is for anyone interested in learning more about what's new in Node.js and how to use SQLite in Node.js.

### Outcomes

- See good use cases for SQLite
- Learn Node.js SQLite module and what it can do
- Explore the future of SQLite in Node.js
- Discover how you can help the SQLite development in Node.js

### Outline

#### Intro

- The SQLite Renaissance: 

#### The node:sqlite module

- The Basics: I explain and give examples of queries like SELECT, INSERT, UPDATE, DELETE through the node:sqlite module
- Working with Sessions: I show how to use sessions with real-world examples
- User defined functions: I discuss the whys and hows of user defined functions
- Database backup: I show how to backup a database and monitor its progress

#### The future of SQLite in Node.js

- Async API: there's a proposal to add an async API to the node:sqlite module as well as a promise-based APIs in fs (https://github.com/nodejs/node/issues/54307).
Here I discuss the benefits and what to expect from this async API.
- Aggregates: I've been working on an implementation of aggregates for the node:sqlite module (https://github.com/nodejs/node/pull/56600). I show how it works and
    how you can use it. I also discuss the benefits of using aggregates in SQLite.

## Short Bio

Since last year I've contributing to NodeJS (https://github.com/nodejs/node/pulls?q=is%3Apr+author%3Ageeksilva97+), and it has been an amazing experience! I fell in love with the community and, even more, with JavaScript.

I also like to write about tech and philosophy as well as recreating famous projects (e.g. JVM compiler) just to learn
how things work under the hood.
