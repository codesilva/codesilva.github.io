---
layout: post
title: "The End of Abundant RAM: Optimizing for the AI-Driven Scarcity Era"
date: 2025-12-08
tags: [gemini, ollama, ia, tutorial]
categories: [ia]
---

on december 3rd, Micron Technology announced they are leaving the consumer RAM market and focusing solely on the AI
market.

RAM prices have been rising these days and this announcement is likely to make them rise even more. people are calling
this the RAMpocalypse.

in this post, we'll explore some strategies to optimize memory usage in applications to cope with the RAM scarcity era.

i looked in to some javascript codebases i've worked on recently and found some memory optimization opportunities.

## The biggest offensive: functional style

in javascript, people like to use a functional programming style, using methods like `map`, `filter`, and `reduce` to
process arrays.

with time i saw some bad patterns emerging from this style, and worse, these patterns are the default way of doing
things.

### Use Iterators and its helpers

another good way to save memory is to use iterators instead of arrays when possible.

### Using incorrect search methods

using filter when you just need an element.

using filter on ordered data when you can have a binary search.

### Incorrectly chaining array methods

consider the following code:

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evensSquared = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * n);
```

it seems a good idea. we filter the numbers to get only the even ones, then we map them to get their squares.

there's a problem with this approach: each method creates a new array in memory. so we have three arrays in memory at
the same time: the original `numbers` array, the filtered array of even numbers, and the final array of squared numbers.

every time you think of a filter.map chain, it probably should be replaced with a single `reduce` call, where you can do
both filtering and mapping in one pass, creating only one new array.

```javascript
const evensSquared = numbers.reduce((acc, n) => {
  if (n % 2 === 0) {
    acc.push(n * n);
  }
  return acc;
}, []);
```

now the next example is a bit more complex.

this code is a modified version of a real-world example. it builds a list of query options based on some cards and
rules.

```typescript
const ruleDefinitions = cards.reduce(
  (acc, { definitionId, payload }) => {
    const rule = rules[definitionId];

    if (!rule || !rule.api) {
      return acc;
    }

    const {
        makeQueryOptions
    } = rule.api;

    // TanStack Query options
    const queryOptions = makeQueryOptions();
    const queryIndex = acc.queryOptionsList.length - 1;

    return {
      queryOptionsList: [
        ...acc.queryOptionsList,
        queryOptions
      ],
      definitionIds: {
        ...acc.definitionIds,
        [definitionId]: queryIndex + 1
      }
    }
  },
  {
    queryOptionsList: [],
    definitionIds: {}
  }
);
```

looking into it for a bit you get the idea of what it's doing.

the problem is that every time we do `...acc.queryOptionsList` and `...acc.definitionIds`, we are creating new copies
of those data structures in memory. this can lead to a lot of unnecessary memory allocations, especially if the `cards`
array is large.

and this is totally unnecessary. we can just mutate the accumulator object directly, since it's not used anywhere else.

remember, javascript is not a pure functional language, it's not optmized for doing things you would in OCaml or
Haskell. don't be affraid of mutating objects when it makes sense.

---

tips:

- use abort signals to cancel requests when the user navigates away
- be as lazy as possible when loading data
- use pagination or infinite scroll to load data in chunks
- cache data in memory or local storage to avoid re-fetching
- optimize data structures to reduce memory usage
- use web workers to offload heavy computations from the main thread
- monitor memory usage and identify memory leaks
- use memory profiling tools to analyze memory usage patterns
