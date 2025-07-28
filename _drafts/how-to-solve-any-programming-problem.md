---
layout: post
title: How To Solve Any Programming Problem
date: 2025-06-05
lang: pt-BR
category: ["algorithms"]
private: false
---

If I had to summarize the programmers' job in a few words I would say we are 'problem solvers'. But of course, it's not
that simple. Some problems are easy, some are hard and in both cases an specific set of skills is required.

When approaching programming problems there's a skill that is (or should be) always present: _the capacity of
abstraction_. Dijkstra classifies this the [most vital activities of a competent programmer](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html). Abstraction not as a vague term but as a layer to handle complexity.

While I'm not well-versed to teach or explain abstraction without being _abstract_ I'd like to point out that
mathmaticians are pretty good at it. Observe some of them and how they solved some [classic problems](https://letstalkscience.ca/educational-resources/backgrounders/gauss-summation). It's interesting to
see that they have a methodology. They are certain about the data they have, what they are looking for and specially are
very good at recognizing patterns (know where to do a clever substitution or to apply a theorem).

I humbly think a good way to improve your abstraction capability is to mimic this behavior. For that, you need a system
for solving any programming problem. Let's construct one.

# A Problem To Solve

Just givinng you a list is not ideal. It's much better to see it applied to a problem. So let's get a problem to solve.

The problem is that:

You're a programmer working on a parking system implemented in Node.JS with PostgreSQL. In the current implementation users can schedule reservations
providing a start and an end date. Time is not considered since all dates should be counted as full days. You job now
is to add the parking lot restriction since the park has only 5000 spots and the system should not overbook.

# The Methodology

The principles here are borrowed from _How To Solve It_ book, the classical work written by George Polya. I've been
using something similar while solving problems in my contributions to Node.js. While it's a book about solving mathmatics problem I think it works, with some changes,
pretty well for software problems.

## Understading The Problem

The first thing is to really understand the problem. It seems obvius but I've seen many people no paying attentiong to
this part and failing the come up with a sulution that actually solves the proposed problem.

Questions you have to ask yourself: **what am I trying to find?**, **what do I have?** and **what are the
conditions/restrictions?**

Take a moment to reason about this. For this problem, for example, we need to come up with an algorithm that is fed with
`start_at` and `end_at` and it should determine whether that reservation can be scheduled.

Isolate the conditions. It's to write them down somewhere. For this problem we have:

- 5000 spots is the limit;
- PostgreSQL is a tool we have to take in consideration.

### Introducing a Notation

Introducing a notation can be useful for solving a the problem. I, personally, like to separate the parts of the problem
in _Data,_ _Calculation_ and _Action_.

## Devising A Plan

Once you reasoned about about what needs to be done it's time to plan _how_ you're going to do this. Pull from your
memory any other problem that looks similar or try to restate the problem to make it simpler.

Sometimes it's still hard to see how to solve the whole problem. Look then for the smaller problem related and/or drop
some requirements.

> To determine if a reservation can be scheduled we need to check if all days in that period are available. A day for
> being available has to have less than 5000 reservations.

Or, we need the overlapping with the period that we're atrying to schedule, then look into all those days and test if
all of them have less than 5000 reservations scheduled

### First small problem: find the overlapping

### What if the parking lot had a single spot?

## Carrying Out The Plan

## Looking Back

https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap/325964#325964
