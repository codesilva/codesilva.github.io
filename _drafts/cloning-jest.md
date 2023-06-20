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
