---
layout: post
title: Clonando o Jest
date: 2023-06-19
lang: pt-BR
tags: ["intermediario", "javascript", "jest", "testes", "test runner", "spy"]
category: ["javascript", "testes", "TDD"]
---

Nesse artigo implementaremos o `spyOn` do Jest.

```javascript
const spyOn = (obj, functionName) => {
  if (typeof functionName !== 'string') throw `The provided function name must be a string got ${typeof functionName}`;
  if (!obj.hasOwnProperty(functionName) || typeof obj[functionName] !== 'function') throw `There is no function ${functionName} in the object`;

  let numCalls = 0;
  let mockImplementation = null;
  const originalImplementation = obj[functionName];

  const spyObject = {
    numCalls: () => numCalls,
    restore: () => numCalls = 0,
    mockImplementation: (fn) => (mockImplementation = fn, spyObject)
  };

  Object.defineProperty(obj, functionName, {
    value: (...args) => {
      if (mockImplementation) return (++numCalls, mockImplementation.call(null, ...args));
      originalImplementation.call(null, ...args);
      ++numCalls;
    }
  });

  return spyObject;
};
```

Como podemos usar a função acima? Veja:

```javascript
const myObject = {
  myMethod: () => console.log('my method is running')
};

const myMethodSpyWithNoMockImplementation = spyOn(myObject, 'myMethod');

myObject.myMethod();
myObject.myMethod('abc', 'de', 12);

console.log(`\nmyMethod has been caled ${myMethodSpyWithNoMockImplementation.numCalls()} times!!\n\n`);

const spyWithMockImpl = myMethodSpyWithNoMockImplementation
                          .mockImplementation(() => console.log('hello mock implementation'));

myObject.myMethod();
myObject.myMethod('abc', 'de', 12);

console.log(`\nmyMethod has been caled ${myMethodSpyWithNoMockImplementation.numCalls()} times!!\n\n`);

spyWithMockImpl.restore();

console.log(`\nmyMethod has been caled ${myMethodSpyWithNoMockImplementation.numCalls()} times!!\n\n`);
```

Jest uses the following babel package https://babeljs.io/docs/babel-plugin-transform-modules-commonjs. So it turns ES
modules into CommonJS. Having commonjs modules we can take advantage of require.cache.

[EN] "Simplicity is the ultimate sophistication..." said Da Vinci. We can't disagree with him, huh?



I continued the experiments with the test runner (using jest as the reference). Well, the part that intrigues me most is the jest.mock. It kind of intercepts the real module and provides the given implementation.



Doing some research I figured out that, in commonjs, we can use the cache. Every time you load a commonjs module it adds a new entry to require.cache (). We can use it (see the image below).



That's it. Whenever our mock function is called it writes to cache, so when it imports an already mocked file it will indeed receive the mock implementation.



The downside is that we would need to mock a module even before importing it. Otherwise, it will always get the real implementation. If you know Jest you know that's not how it works.



References



- https://nodejs.org/api/modules.html#requirecache

- 
