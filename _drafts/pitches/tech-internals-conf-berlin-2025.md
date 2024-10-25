# Headline

Creating an LSM-Tree Database: The Internals of a Modern Database
Create An LSM-Tree Database And Learn How To Write Optmized Code
Create A Database Today And Learn How To Write Optmized Code

| Features | Benefits |
| --- | --- |
| Segments and Flushing | Learn a technique for optimizing disk operations (Do it later mantrs) |
| Compaction | How to leverage background tasks to optmize space |
| Indexes | Learn how indexes actually work and how they affect right and read operations of your application |

## Showing a Need

Would you like to extract the maximum of your application and use hardware resources efficiently? 

## Satisfying the Need

Writing code that works is not good enough. When your product grows you have to be more creative to avoid wasting
resources. If you attend to this talk you will learn how databases are implemented. And this will teach everything
a developer should know about databases and about writing code that's efficient.

A Database implementation contains all the hot technique for writing optimized code. Think of ScyllaDB that is used on
Discord and efficiently stores Trillions of messages.

## This Talk Will Teach You How

In this talk, you will know how a pice of software like ScyllaDB is made. I'll you get you through the very beginning
implementation of Databases. Starting with simple text files we will go step by step adding layers on top of it and we
will end up with a simple, but functional, LSM-Tree database with indexes, compaction and a binary layout.

You'll learn how to work efficienly with data structures and files. And you will learn a lot about database which you
help you with your daily job as a software developer.


--- 

# Submission

## Title

Create A Database Today And Learn How To Write Optmized Code

## Description

In this talk, I want to empower software engineers. With the knowledge not only about Databases but also about how efficient software is written. So they can make efficient software on their end.

To do this, I will be practical. I'll show how a database is born, and how we can take all the theory from Data Structures and algorithms and make something real.

I'll show the evolution of a database—one I had created before, as a toy project, called AmnesiaDB. I'll construct AmnesiaDB from the primordials. Start reading and writing to a plain text file and evolve until we have a defined binary layout, compression algorithm, and optimization techniques like Memtables (for Buffering) and Indexes.

You might never need or want to write a database. But working with databases is your daily job. You write queries, you create indexes, you partition your tables, and so on.

Knowing the internals will give you a new perspective. Optimizing queries and indexes will be easier. In addition, it will be helpful when debugging any issue.

## Abstract

In this talk, we'll create a Database. By implementing our own database we will learn: database internals and how to write efficient software.

We will go through the database implementation step-by-step taking ScyllaDB as a reference. For that, we'll get some Data Structures and Software Performance Techniques together to bring our own Database to life.

Databases are great. They are present in our daily jobs. Learning how they work empowers you to use them better.

Let's implement an LSM-Tree database - as same as ScyllaDB that stores Trillions of messages at Discord!

## Track

Infrastructure

## Scope of talks

Broad

## Target Audience

Everyone that wants to learn about Databases and about Writing Efficient Code

## Comment for the Program Committee

This talk was created from a Data Structures & Algorithms workshop I led at my company. Writing a Database was the final challenge. We ended up creating the AmnesiaDB (name inspired by Mnesia from Erlang).

Writing this tiny database taught me and the attendees a lot. And I think the TIC attendees will benefit from that too. Because a database implementation gets those concepts of Data Structures we learn at college and some more techniques and produces a piece of software that supports all others.

I'm passionate about atemporal knowledge. I believe that many things we see in a higher level of abstraction are just what is made in lower levels but expanded (e.g. event sourcing can be seen in lower levels for handling hardware interruption).

Link to existing AmnesiaDB implementation: https://github.com/geeksilva97/amnesia-db-ruby.

In the Additional notes, I left an outline.

## Additional Notes

### Takeaways

- See how Data Structures play an important role when you want to write an efficient software
- Learn backpressure techniques examining the relation RAM <-> Disk.
- Understand the Database Internals and be able to make better decisions regard to query and indexes optimizations
- Understand how binary files are parsed
- Study ScyllaDB approach to be able to handle the massive amount of data required by Discord

### Outline

- Introduction
    - A software that works is not enough
    - Databses role in our daily jobs
    - ScyllaDB and Discord: how it stores trillions of messages

    I start this section talking about software and how software that only works is not enough. Then I mention a very
    important piece of software: a Database. I show examples of databases and how they are present in our daily jobs.

    Finally, I show ScyllaDB that is used at Discord to store Trillions of messages.

- Let's implement a database
    - databases are for efficiently storing and reading data
    - what's an lsm-tree?

    It's time to implement the database. As an implementer we should a have different perspective. The challeng is to
    produce a software that stores and retrieves data efficiently. I explain the SSTable concept (in an LSM-Tree
    database data is stored in multiple files called Sorted String Tables); the first of an LSM-Tree we will be seeing.

    I then create the simplest database with SSTables made of plain files.

- Our database is slow

    Even though you don't know much about database internals you may guess they don't use plain files. There should be
    something more.

    At this moment I talk about indexes trade-off. I show how they speed up reads but add some overhead to the writing.
    We will then implement Hash indexes (in RAM)

- Speak the Disk Language

    Indexes make thigs better but we need more. In this section, I propose a simple binary layour for our files so we
    can read and write efficiently, and save disk space.

- Compaction of Segments

    At this moment files are getting out of control and with a bunch of dead data. I'll show how we can use Priority
    Queues to implement a compaction algorithm that gets rid of dead data and saves space.

- What more?
    WAL
    Transactions
    Error recovering

- Conclusion
