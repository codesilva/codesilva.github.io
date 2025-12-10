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

### Avoid work

This is the most important tip of all. This saves not only memory, but also cpu and battery. Let's walk through some
situations where we can do less work in different levels.

#### Using incorrect search methods

When searching for something a common saying is:

> it's always in the last place you look.

that makes sense, no one would keep looking after they found what they were looking for. Except for developers, who
often use inefficient search methods.

Consider the following code:

```javascript
const producs = [
  {id: 1, name: 'Fridge', unitPrice: 899.0, category: 'appliances' },
  {id: 2, name: 'Airpods', unitPrice: 199.0, category: 'electronics' },
  { id: 3, name: 'Bag', unitPrice: 49.0, category: 'accessories' },
  // ... potentially thousands of producs
];

const [product] = product.filter(p => p.id === 2);
```

here we are using `filter` to find a user by id. `filter` goes through the entire array and creates a new array with all
matching elements. since we are only interested in the first match, this is wasteful in terms of memory and performance.

Using `Array.prototype.find` is a better approach:

```javascript
const product = cartItems.find(p => p.id === 2);
```

it stops searching as soon as it finds the first match, and it doesn't create a new array, saving memory.

**Extra tip:** when searching in ordered arrays, consider using binary search algorithms to reduce the number of comparisons.

#### Incorrectly chaining array methods

consider the following code:

```javascript
const producstWithNewPrice = products
  .filter(p => p.category === 'electronics')
  .map(p => p.unitPrice * 1.1);
```

it seems fine at first glance, but it creates an intermediate array after the `filter` step, which is then processed by
the `map` step. this can lead to unnecessary memory allocations, especially if the original array is large.

```javascript
const producstWithNewPrice = producst.reduce((acc, item) => {
  if (item.category === 'electronics') {
    return [...acc, { ...item, price: item.unitPrice * 1.1 }];
  }
  return acc;
}, []);
```

### You can do even less

From the previous examples, there are still some opportunities to save even more memory. 

In the `reduce` example, we have this line:

```javascript
return [...acc, { ...item, price: item.unitPrice * 1.1 }];
```

it uses spread syntax, we all love it, but it's unnecessaryly creating a new array and a new object on each iteration.

unfortunately, reduce with spread syntax is a very common pattern in React codebases. people want to avoid mutating
state, but they don't realize that this pattern can lead to significant memory overhead.

https://blog.codeminer42.com/codetips7-spread-operator-the-slow-beauty/

don't be afraid of mutating objects when it makes sense. in this case, we can just push to the accumulator array directly.

```javascript
const producstWithNewPrice = producst.reduce((acc, item) => {
  if (item.category === 'electronics') {
    acc.push({ ...item, price: item.unitPrice * 1.1 });
  }
  return acc;
}, []);
```

look, acc is our intermediate array, it's safe to mutate it directly, we are not mutating the original products array.
on the other hand, we still create a new object for each item, which is necessary if we want to keep the original
items unchanged.

#### Defer computations as much as possible

in real world applications, data processing pipelines can be quite complex, you won't always be able to do everything in
a single pass.

you might have a lot of business rules to apply, using multiple services that transform the data in different ways with
each step leaving intermediate results.

in situations like that, a good strategy to optimize memory usage is to defer computations as much as possible, and only
compute what you need when you need it.

take our reduce for a second look:

```javascript
const producstWithNewPrice = producst.reduce((acc, item) => {
  if (item.category === 'electronics') {
    acc.push({ ...item, price: item.unitPrice * 1.1 });
  }
  return acc;
}, []);
```

in a situation where filter and map are splitted across services and layers, having a single reduce function is not
possible.

[image illustrating multiple steps in a data processing pipeline]

to avoid leaving intermediate values in memory each time, we can use `Iterators` and their helpers to process data
lazily.

Iterator is a protocol that allows us to define a sequence of values that can be iterated over one at a time. with
iterators, we can create data processing pipelines that compute values on demand, without creating intermediate arrays.

With helper methods like `map`, `filter`, and `take`, we can build complex data processing pipelines that are memory
efficient.

````javascript
// layer 1
const productsIterator = producs.values(); // returns an iterator over products

// layer 2
const electronicsIterator = productsIterator.filter(p => p.category === 'electronics');

// layer 3
const producstWithNewPriceIterator = electronicsIterator.map(p => ({ ...p, price: p.unitPrice * 1.1 }));

// layer 4
const producstWithNewPrice = Array.from(producstWithNewPriceIterator);
saveProducts(producstWithNewPrice);
```

In the example above, each layer defines a transformation on the data, but without any processing happening until the
final step where we convert the iterator to an array.

## Final Thoughts



---

the functional style is the biggest offender when it comes to unnecessary memory allocations. this happens because it's
declarative, and we often end up creating new data structures instead of reusing existing ones. and it's very
convenient, and beautiful, to chain multiple array methods together.

not always the pipelines are mounted in a single place. in many cases, multiple functions are composed together, each of
them doing part of the work, and passing the result to the next function.

in situations like that, iterators can help a lot. they allow us to process data lazily, meaning we only compute what we
need when we need it.

and now, since March 2025, iterator helpers ara available in all major browsers and runtimes. you can work on streams of
data without creating intermediate arrays.

https://web.dev/blog/baseline-iterator-helpers

to get a sense of how this can help, let's look at an example.

```javascript
function* fibonacci() {
  let a = 0, b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
```

the function above is a Generator that produces an infinite sequence of fibonacci numbers. we can use it with iterator
helpers to get the first 10 even fibonacci numbers.

```javascript
const result = fibonacci()
    .filter(n => n % 2 === 0)
    .take(10)
```



---

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

## The biggest offensive: functional style

in javascript, people like to use a functional programming style, using methods like `map`, `filter`, and `reduce` to
process arrays.

with time i saw some bad patterns emerging from this style, and worse, these patterns are the default way of doing
things.

### Use Iterators and its helpers

another good way to save memory is to use iterators instead of arrays when possible.


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
