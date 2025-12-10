---
layout: post
title: "The End of Abundant RAM: Optimizing for the AI-Driven Scarcity Era"
date: 2025-12-08
tags: [gemini, ollama, ia, tutorial]
categories: [ia]
---

On December 3rd, Micron Technology announced they are leaving the consumer RAM market to focus solely on AI. RAM prices have been rising lately, and this announcement is likely to push them even higher. People are calling this the RAMpocalypse.

In this post, we'll explore strategies to optimize memory usage in applications to cope with the RAM scarcity era. I looked into some JavaScript codebases I've worked on recently and found several optimization opportunities.

### Avoid work

This is the most important tip of all. It saves not only memory, but also CPU and battery. Let's walk through some situations where we can do less work at different levels.

#### Using incorrect search methods

When searching for something, a common saying is:

> It's always in the last place you look.

That makes sense—no one would keep looking after finding what they were looking for. Except for developers, who often use inefficient search methods.

Consider the following code:

```javascript
const products = [
  {id: 1, name: 'Fridge', unitPrice: 899.0, category: 'appliances' },
  {id: 2, name: 'Airpods', unitPrice: 199.0, category: 'electronics' },
  { id: 3, name: 'Bag', unitPrice: 49.0, category: 'accessories' },
  // ... potentially thousands of products
];

const [product] = products.filter(p => p.id === 2);
```

Here we are using `filter` to find a product by id. `filter` goes through the entire array and creates a new array with all matching elements. Since we only need the first match, this is wasteful in terms of both memory and performance.

Using `Array.prototype.find` is a better approach:

```javascript
const product = products.find(p => p.id === 2);
```

It stops searching as soon as it finds the first match and doesn't create a new array, saving memory.

**Extra tip:** when searching in ordered arrays, consider using binary search algorithms to reduce the number of comparisons.

#### Incorrectly chaining array methods

Consider the following code:

```javascript
const productsWithNewPrice = products
  .filter(p => p.category === 'electronics')
  .map(p => p.unitPrice * 1.1);
```

It seems fine at first glance, but it creates an intermediate array after the `filter` step, which is then processed by the `map` step. This can lead to unnecessary memory allocations, especially with large arrays.

```javascript
const productsWithNewPrice = products.reduce((acc, item) => {
  if (item.category === 'electronics') {
    return [...acc, { ...item, price: item.unitPrice * 1.1 }];
  }
  return acc;
}, []);
```

### You can do even less

From the previous examples, there are still opportunities to save even more memory.

In the `reduce` example, we have this line:

```javascript
return [...acc, { ...item, price: item.unitPrice * 1.1 }];
```

It uses spread syntax—we all love it—but it's unnecessarily creating a new array and a new object on each iteration.

Unfortunately, reduce with spread syntax is a very common pattern in React codebases. Developers want to avoid mutating state, but they don't realize this pattern can lead to significant memory overhead.

https://blog.codeminer42.com/codetips7-spread-operator-the-slow-beauty/

Don't be afraid of mutating objects when it makes sense. In this case, we can simply push to the accumulator array directly:

```javascript
const productsWithNewPrice = products.reduce((acc, item) => {
  if (item.category === 'electronics') {
    acc.push({ ...item, price: item.unitPrice * 1.1 });
  }
  return acc;
}, []);
```

Look, `acc` is our intermediate array—it's safe to mutate directly since we're not touching the original products array. On the other hand, we still create a new object for each item, which is necessary to keep the original items unchanged.

#### Defer computations as much as possible

In real-world applications, data processing pipelines can be quite complex. You won't always be able to do everything in a single pass.

You might have many business rules to apply, using multiple services that transform data in different ways, with each step leaving intermediate results.

In situations like this, a good strategy is to defer computations as much as possible and only compute what you need when you need it.

Take our reduce for a second look:

```javascript
const productsWithNewPrice = products.reduce((acc, item) => {
  if (item.category === 'electronics') {
    acc.push({ ...item, price: item.unitPrice * 1.1 });
  }
  return acc;
}, []);
```

When filter and map are split across services and layers, having a single reduce function isn't possible.

[image illustrating multiple steps in a data processing pipeline]

To avoid leaving intermediate values in memory, we can use `Iterators` and their helpers to process data lazily.

Iterator is a protocol that allows us to define a sequence of values that can be iterated over one at a time. With iterators, we can create data processing pipelines that compute values on demand without creating intermediate arrays.

With helper methods like `map`, `filter`, and `take`, we can build complex pipelines that are memory efficient.

```javascript
// layer 1
const productsIterator = products.values(); // returns an iterator over products

// layer 2
const electronicsIterator = productsIterator.filter(p => p.category === 'electronics');

// layer 3
const productsWithNewPriceIterator = electronicsIterator.map(p => ({ ...p, price: p.unitPrice * 1.1 }));

// layer 4
const productsWithNewPrice = Array.from(productsWithNewPriceIterator);
saveProducts(productsWithNewPrice);
```

In the example above, each layer defines a transformation, but no processing happens until the final step where we convert the iterator to an array.

## Final Thoughts

The RAMpocalypse might sound dramatic, but it's a reminder that resources we took for granted are becoming scarce. The good news is that optimizing memory usage doesn't require a complete rewrite of your codebase.

Start by questioning your habits. Do you really need that `filter().map()` chain? Could a simple `find()` replace that `filter()[0]`? Is that spread operator in your reduce callback truly necessary?

The key takeaways are:

1. **Stop early** - use `find()` instead of `filter()` when you need a single item
2. **Don't be afraid to mutate** - intermediate values in reduce callbacks are safe to modify
3. **Defer work** - use iterators to process data lazily and avoid intermediate arrays
4. **Profile your code** - use browser devtools to identify memory hotspots

These optimizations aren't just about saving RAM. They often lead to faster code, better battery life on mobile devices, and a smoother user experience overall.

The functional programming style is beautiful and expressive, but JavaScript wasn't designed for it. Be pragmatic. Write code that's both readable and efficient. Your users (and their devices) will thank you.
