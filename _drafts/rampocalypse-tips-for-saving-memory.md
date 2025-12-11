---
layout: post
title: "The End of Abundant RAM: Optimizing for the AI-Driven Scarcity Era"
date: 2025-12-08
tags: [gemini, ollama, ia, tutorial]
categories: [ia]
---

On December 3rd, Micron Technology announced they are completely [exiting consumer market](https://www.cnbc.com/2025/12/03/micron-stops-selling-memory-to-consumers-demand-spikes-from-ai-chips.html). The reason? AI-driven data centers are creating an unprecedented surge in memory demand.

"The AI-driven growth in the data center has led to a surge in demand for memory and storage," explained Sumit Sadana, Micron's business chief. "Micron has made the difficult decision to exit the Crucial consumer business in order to improve supply and support for our larger, strategic customers in faster-growing segments."

This was iminente with this high demand for AI data centers. This news reminded me of Herb Sutter seminal article the Free Lunch is over where developers would need to watch out for other ways to get more processing powers without just trusting next processor would be twice as fast.

Now you can't just go and buy more RAM, they are becoming expensive. I then looked into some JavaScript codebases out there and got a few bad patterns. Patterns you shouldn't follow if you want to save RAM.

In this post, we'll explore strategies to optimize memory usage in applications to cope with this so-calld RAMpocalypse.

### Avoid work

This is the most important tip of all. It saves not only memory, but also CPU and battery. Let's walk through some situations where we can do less work at different levels.

#### Using correct search methods

> It's always in the last place you look.

This saying makes sense. No one would keep looking after finding what they were looking for. Except for developers who use inefficient search methods.

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

#### Chaining array methods is killing your app

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

It uses spread syntax, we all love it, but it's unnecessarily creating a new array and a new object on each iteration.

Unfortunately, reduce with spread syntax is a very common pattern in React codebases. Developers want to avoid mutating state, but they don't realize this pattern can [lead to significant memory overhead](https://blog.codeminer42.com/codetips7-spread-operator-the-slow-beauty/).

Don't be afraid of mutating objects when it makes sense. In this case, we can simply push to the accumulator array directly:

```javascript
const productsWithNewPrice = products.reduce((acc, item) => {
  if (item.category === 'electronics') {
    acc.push({ ...item, price: item.unitPrice * 1.1 });
  }
  return acc;
}, []);
```

Look, `acc` is our intermediate array, it's safe to mutate directly since we're not touching the original products array. On the other hand, we still create a new object for each item, which is necessary to keep the original items unchanged.

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

![](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/12/10154146/layer-data-transformation.webp)

To avoid leaving intermediate values in memory, we can use `Iterators` and their [helpers](http://https://web.dev/blog/baseline-iterator-helpers "helpers") to process data lazily.

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

### Final Thoughts

The RAMpocalypse might sound dramatic, but it's a reminder that resources we took for should be handled properly. One day you're working on an application that will run on a very abundant environment, in the other, you are working on a mobile app where every megabyte counts.

The good news is that optimizing memory usage doesn't require a complete rewrite of your codebase.

Start by questioning your habits. Do you really need that `filter().map()` chain? Is that spread operator in your reduce callback truly necessary?

The key takeaways are:

1. **Stop early** use `find()` instead of `filter()` when you need a single item
2. **Don't be afraid to mutate** intermediate values in reduce callbacks are safe to modify
3. **Defer work** use iterators to process data lazily and avoid intermediate arrays
4. **Profile your code** use browser devtools to identify memory hotspots

These optimizations aren't just about saving RAM. They often lead to faster code, better battery life on mobile devices, and a smoother user experience overall.
