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
abstraction_. Dijkstra classifies this the [most vital activity of a competent programmer](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html). Abstraction not as a vague term but as a layer to handle complexity.

While I'm not well-versed to teach or explain abstraction without being too _abstract_ I to point out that
mathmaticians are pretty good at it. Observe some of them and how they solved some [classic problems](https://letstalkscience.ca/educational-resources/backgrounders/gauss-summation). 
It's interesting to see that they have a methodology. They are certain about the data they have, what they are looking for and specially are
very good at recognizing patterns (know where to do a clever substitution or to apply a theorem).

I humbly think a good way to improve your abstraction capability is to mimic this behavior. For that, you need a system
for solving any programming problem. Let's construct one.

# A Problem To Solve

Just givinng you a list is not ideal. It's much better to see the system working while applying it to a problem. So let's get a simple problem to solve.

The problem is that:

> You're a programmer working on a parking system. In the current implementation, users can schedule reservations
> providing a start and an end date. Time is not considered since all dates should be counted as full days. Your job now
> is to add the parking lot restriction since the park has only 5000 spots and the application should not overbook.

# Have A Plan

The easier way to tackle a problem is following a plan. A plan with all steps defined gives you a direction and
allows you to validate each step and, if needed, change the course; all under your control.

The hard part is to come up with a plan. That's where many of us, software developers, fail.

Borrowing principles from the _How To Solve It_ book, by George Polya we have four things to do when solving a problem:
**understand the problem**, **devise the plan**, **carry out the plan**, and **looking back**.

While it's a book about solving math problems I think it works, with some changes, pretty well for software problems - I myself have been doing similar things in my contributions to Node.js codebase.

## Understading The Problem

The first thing is to really understand the problem. It seems obvious, but indeed it's not. Sometimes you are too
mechanic when analyzing a problem and just assume that you understood. It's a bad move. You can trust on your intuition
but you have to confirm.

To get a full understanding, ask yourself the right questions: **what am I trying go find?**, **what do I have?**, and **what are the conditions/restrictions?**

During this phase you can also introduce any notation that you think will be useful.

Take the proposed problem. To avoid overbooking it's needed to check the reservation that's being sheculed against the already existing reservations that might overlap.

- **what we have**: 
    - `reservation` that is attempted to be scheduled. A `reservation` has `start_at` and `end_at` fields, both being `Date`;
    - `reservationList` the list of already existing reservations to match `reservation` against to.
- **restrictions**: 
    - dates ocuppy the full day;
    - the parking spots are limited to 5000.
- **what we have to find**: an algorithm that takes the `reservation` in and determines if it can be scheduled or not;

The introduced notation of `reservation` and `reservationList` makes it a little bit easier to understand what's going on. With this you have a better understanding about what need to be done.

## Devising A Plan

Once you reasoned about about what needs to be done it's time to plan _how_ you're going to do this. For that,  you can:

- observe the multiple parts of the problem, check the data and restrictions again;
- pull from your memory any other problem that looks similar;
- try to restate the original problem to make it simpler;
- drop/relax some conditions/restrictions so get sense of what subproblems are involved.

Analyzing the problems from various perspectives allows you to srhink its complexity, making it to fit in your brain with less effort.

After think a little bit about this problem and its conditions I could restate it, already using the introduced notation in the last step, to:

> Your task is to write a function that takes the `reservationList` and `reservation`, find the overlapping days and
> check if all of them have less than 5000 reservations. If all days in that period have less than 5000, `reservation`
> can be scheduled.

Our plan is then:

1. take the `resevation` and `reservationList` and find the overlapping days;
2. compute how many reservations exist for each day in the overlapping;
3. determine if the `reservation` can be scheduled;

For that we're going to use the reservation object as:

```typescript
type Reservation = {
  start_at: Date;
  end_at: Date;
};
```

## Carrying Out The Plan

Our plan is very simple since we have a simple problem. What we do now is to walk through each step and **ensure all of them are correct**.

### Step 1 - Find Overlapping Days

The first item in our plan is just about receiving data. Let's go to the next one that is about getting the ovelapping.

```typescript
type Tuple = [Date, Date];
type OverlappingDates = Tuple[];

const getOverlapping = (reservationList: Reservation[], reservation: Reservation): OverlappingDates => {
    const overlappingTuples = [];
        for(const r of reservationList) {
            if(r.start_at <= reservation.end_at && r.end_at >= reservation.start_at) {
                overlappingTuples.push([r.start_at, r.end_at]);
            }
        }

    return overlappingTuples;
};
```

Most of the code here will be imperative to make it as clear as possible for everybody.

Ensuring this step is correct is proving this is a valid way to check. Well, this is an already-solved problem and you
can [prove it using DeMorgan's Laws](https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap/325964#325964).

But your job here is to write some tests to ensure it works as expected.

#### Ensuring Step 1 Is Correct

Let's write a couple of tests to ensure everything is working as expected.

```typescript
import assert from 'node:assert';

const reservationList = [
  { start_at: new Date('2025-08-01'), end_at: new Date('2025-08-03') },
  { start_at: new Date('2025-08-01'), end_at: new Date('2025-08-02') },
  { start_at: new Date('2025-08-03'), end_at: new Date('2025-08-04') },
  { start_at: new Date('2025-08-05'), end_at: new Date('2025-08-07') },
];

const overlapping1 = getOverlapping(reservationList, {
  start_at: new Date('2025-08-01'),
  end_at: new Date('2025-08-03')
});

assert.deepStrictEqual(overlapping1, [
  [new Date('2025-08-01'), new Date('2025-08-03')],
  [new Date('2025-08-01'), new Date('2025-08-02')],
  [new Date('2025-08-03'), new Date('2025-08-04')]
]);

const overlapping2 = getOverlapping(reservationList, {
  start_at: new Date('2025-08-08'),
  end_at: new Date('2025-08-10')
});

assert.deepStrictEqual(overlapping2, []); // there is no date overlapping the period from Aug 08 to Aug 10
```

Pretty simple. Notice that all periods used are already normalized, defining only date without time. That's something you have to do in your application. I will bring it in thw **looking back** section.

### Step 2 - Compute How Many Reservations Exist Per Day

Such a function would give us a list of reservations that overlaps with the one I'm trying to schedule. The third step
in our plan asks us to check how many reserveations are per day.

```typescript
const addDay = (original: Date) => {
  const s = new Date(original);
  s.setTime(s.getTime() + 24 * 60 * 60 * 1000);

  return s;
};

const getReservationsCountPerDate = (overlappingDates: OverlappingDates) => {
  const group = {};
  for (const [start_at, end_at] of overlappingDates) {
    let s = start_at;
    while (s <= end_at) {
      const k = s.toISOString().split('T')[0];
      if (s >= start_at && s <= end_at) {
        if (!group[k]) group[k] = 0;
        group[k] += 1;
      }
      s = addDay(s);
    }
  }

  return group;
};
```

Remember to prove this step is correct, with tests.

### Step 3 - Determine `reservation` Can Be Scheduled 

From the two steps you already everything grouped per day. Now is time to check if all the overlapping days are free.

```typescript
const canSchedule = (maxSpots, reservationList, reservation) => {
    const overlappingDates = getOverlapping(reservationList, reservation);
    const totalReservationsByDate = getReservationsCountPerDate(overlappingDates);

    return Object.values(totalReservationsByDate).every(n => n < maxSpots);
};
```

Again... ensure it is correct.

## Looking Back

The job is not done yet. At this moment, you must look back to the whole plan and confirm if you really found
what you were looking for, if all the requirements are fulfilled and if there are ways to simplify the solution.

A simplification can be done in **step 2**, for instance. When grouping it take the ovrlapping periods even though some
dates do not overlap at all. Here's an example to illustrate.:

    Suppose there's reservationList contains a sample that is from Aug 01 to Auth 10. When trying to schedule a reservation
    from Auth 09 to Aug 10. There's no need to count reservationList sapmles from Aug 01 to Aug 08.

    Restating: the reservationList sample overlaps but not necessarily all its days.

Other thing to think about it what happens if there's a single spot left and two clienst try to schedule it concurrently. Does the solution you came up with handle this? If not, what can be done? It's a subproblem, you can apply this same system again and solve it.

### Make This Real

This problem was all handled as date were all in-memory. Well, this doesn't happen quite often. Usually you will be
wrigin code to communicate with a database. How would you turn this into SQL? It should be a lot easier now.

SQL was a dropped condition, we didn't think about it until now. Indeed, a single query can handle steps 1 and 2. How
would you do it? Again you can recurr to the Polya's system to handle this. The [answer is here]() but I recommend you to
try on your end before looking into it.

# Conclusion

This demands _thinking_, that can be hard but as long as you continue doing this, imitating this behaviour, you will get
better at this system and will improve your capacity of analysis and abstraction being capable of solving any
programming problem.
