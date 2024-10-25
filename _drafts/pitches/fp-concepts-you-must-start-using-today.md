# Headline

- Three Functional Programming Concepts To Start Using Today And Make Your Code Better
    - Specially if you don't code in a functional language.

# 4U's

- Urgency: it claims it to start using today. (3)
- Uniqueness: not that unique, but not everyone knows about it. (2)
- Ultra-specific: specific. these are concepts of functional programming specifically. (3)
- Useful: definitely useful; as a dev you want to write better code. (3)

# Takeaways

- Immutability
- Composition (Cathegory Theory)
- Pure Functions (Lambda Calculus)
- Recursion
- Currying

# Copy

When I first heard about Functional Programming I just thought it was about using functions. If it was about using functions I was fine, I used them.

A couple of years ago I was chosen to talk about programming paradigms. To have a perspective I digged into FP paradigm and there's much more than 'just use functions'. There's much math theory surrounding it.

Knowing the theory if defintely good. But you don't need to. At least, you don't need to have a deep knowledge about it.

In this article, I'll present you three or more Functional Programming concepts. The best thing of this article is that it was made specially for people who don't know much about the FP paradigm. Though it's still useful for any developer who wants to write better code.

# The Enough Theory (for now)

We can't start talking about Functional Programming without mentioning Lambda Calculus. It's the foundation and it's where many FP programming languages like Haskell and Clojure bring their inspiration from.

Lambda Calculus is a mathematical system that defines functions and application of functions. It's simple, stateless yet powerful. Anything can be computed with Lambda Calculus. You just need:

- a function: represented by `λ` taking only one argument and returning an expression;
- parentheses: to group expressions;

It's as simple as that. You might be wondering how it's possible to compute anything with such a simple system. Demonstrating this is not the goal of this article, but I will show you a simple example to illustrate how powerful it is.

Lambda Calculus is so powerful that we can redefine some contructions present in programming languages. Constructions like `booleans` and `if` statements can be defined using only functions.

```js
function TRUE(a) {
    return function(b) {
        return a;
    };
}

function FALSE(a) {
    return function(b) {
        return b;
    };
}

function IF(condition) {
    return function(a) {
        return function(b) {
            return condition(a)(b);
        };
    };
}
```

With these definitions, we can now use `IF` to define a conditional statement.

```js
const ifResult = IF(TRUE)('It it true')('It is false');

console.log(ifResult); // It is true
```

Note in this case we turned the `if` into an expression which returns whichever branch is evaluated and we just used
functions that take one argument.

## Not Simple Enough?

I know that at first it might seem a little bit confusing, but bear with me. If you look at the definitions of `TRUE`,
`FALSE` and `IF` you'll see that they are simple to reason about.

- `TRUE` is a function that takes two arguments and returns the first one;
- `FALSE` is a function that takes two arguments and returns the second one;
- `IF` is a function that takes three arguments and returns the result of the first argument if it's `TRUE` or the
    second argument if it's `FALSE`.

Of course, I'm mentioning the functions take two or three arguments, but in reality, they take only one argument and
return another function that takes another argument. This is called `Currying`. Any function that takes `n` arguments
can be turned into a sequence of functions that take only one argument. Take the next example:

```js
function add(a, b) {
    return a + b;
}

function curriedAdd(a) {
    return function(b) {
        return a + b;
    };
}

add(1, 2); // 3
curriedAdd(1)(2); // 3
```

This example is simpler and easier to see. Not how a function that takes two arguments can be turned into a sequence of
two functions that take only one argument.

Currying is a useful concept and has a couple of applications, but they are out of the scope of this article.

## Pure Functions

The definition of a pure function is simple:

- it's a function that given the same input will always return the same output (no variation with local static variables, non-local variables, mutable reference arguments or input streams, i.e., referential transparency);
- it has no side effects (no mutation of local static variables, non-local variables, mutable reference arguments or input/output streams).

From this definition you can see that `TRUE`, for example, is a pure function. It doesn't depend on any external state
to return the same result. It's always the same.

On the other hand, `IF` might be impure. It depends on the arguments - in this case, functions - to return a result. If
the given functions have side effects, then `IF` will have side effects as well.

### Don't Fear Impurity, Handle It

Purity is something people tend to focus on when learning FP. Though it's important and useful, it's just a concept. A software to be useful needs side-effects. You don't want a mailing system that doesn't send emails, right?

You should then isolate the impure parts of your code and make them as small as possible. Eric Normand, in his book `Groking Simplicity`, states three main components of useful software:

- data: the information you are working with;
- calculation: the transformation of data;
- actions: the side effects.

You should isolate the actions from the data and calculations. This way you can reason about your code more easily and test it more effectively.

Rick is a software engineer that works for a company that sells products online. He's working on a feature that sends an email to the customer when the product is shipped. He wants to apply the concepts he learned about FP to make his code more reliable and easier to test.

```js
function composeEmail(product) {
    return {
        to: product.customer.email,
        subject: 'Your product has been shipped',
        body: `Your product ${product.name} has been shipped. It will arrive in ${product.deliveryTime} days.`
    };
}

async function sendEmail(composedEmail) {
    const { to, subject, body } = composedEmail;

    await gmail.send(to, subject, body); // side-effect
}

async function shipProduct(product) {
    const composedEmail = composeEmail(product);

    await sendEmail(composedEmail);
}
```

Even though we don't have domain rules in this example, it's possible to see how Rick's approach isolates what matters from the details (or actions). Note how we can use any provider to actually send the email without touching the function that composes the email.

This is a concept that is mandatory in Domain-Driven Design (DDD) and Architectural Patterns. Knowing how to isolate things will bring you and your team a lot of benefits.

## Composition

`Inheritance vs Composition` is a common topic in Object-Oriented Programming (OOP). You probably heard about it and about the `Composition over Inheritance` principle. This principle states that you should prefer composition over inheritance.

The issue with inheritance is that it's a `Is-A` relationship. It's good for taxonomy. For instance, a `Duck` is a `Bird` so it makes sense to use inheritance. An issue with this approach might arise when the parent class has behaviours defined that will dictate the child class behaviour.

Suppose in the class `Bird` we have a method `fly`. It's a good method for a `Bird`, but not for a `Penguin`. Penguins are birds, but they don't fly. If we use inheritance, we will have to override the `fly` method in the `Penguin` class.

A more clever approach is to isolate the behaviors and just use what you need where you need, isolating what changes from what doesn't.

So the charateristics of a `Bird` that are common to all birds can be in the `Bird` class. The behaviours that are specific to children classes can be isolated and composed where needed. For instance, we can have a `Flyable` interface that has the `fly` method and compose it where needed.

NOTE: There are other approaches to address this problem.

## Composition in FP

The essence of composition is the same as discussed in the last section: compose small pieces to build something new, often, with different traits. In FP, composition is closer to what you learned in Mathematics. You have a function `f` and a function `g`. Composing two functions is applying the result of one function to the other. For instance, if you have `f(x) = x + 1` and `g(x) = x * 2`, then `f(g(x)) = (x * 2) + 1` - read as `f after g`. This can represent a new function `h(x) = (x * 2) + 1 = f(g(x))`.

But we can have a different perspective. Take our code that compose and sends emails. Note that the `shipProduct` is itself a composition. It's easier to see that if we rewrite the function as:

```js
async function shipProduct(product) {
    await sendEmail(composeEmail(product));
}
```

Let's catalogue things. In the function above we have:

- `product`: the data containing product information;
- `a composed email`: the result of the calculation of composing the email;
- `send email result`: the result of the action of sending the email.

To make it simple, let's name these three objects as A, B and C respectively. Functions, in this example, are just mappings between these objects. The function `composeEmail` maps A to B. The function `sendEmail` maps B to C. The function `shipProduct` is a composition of these two functions, mapping A to C.

### Flying Within A Category

Analogously you can also think of `Bird`, `Walkable Bird`, and `Flyable Bird` as objects. With morphisms or arrows - the functions - a bird can be turned into a duck or a penguin with their specific behaviors. The behaviors are the morphisms that compose the objects. See the example below:

```js
function makeBirdFly(bird) {
    return {
        ...bird,
        fly: () => 'I believe I can fly'
    };
}

function makeBirdWalk(bird) {
    return {
        ...bird,
        walk: () => 'I can walk'
    };
}

const duck = makeBirdFly(makeBirdWalk({ name: 'Duck' })); // { name: 'Duck', fly: [Function], walk: [Function] }
const penguin = makeBirdWalk({ name: 'Penguin' }); // { name: 'Penguin', walk: [Function] }
```

These concepts come from Category Theory, a branch of Mathematics that studies categories, objects and morphisms. One more concept present in Category Theory is the `identity morphism` or identity function. It's a function that doesn't change the object. In our example, it would be a function that doesn't change the bird. It's a function that takes an object and returns the same object.

```js
function identity(object) {
    return object;
}
```

I know it sounds useless but it's like zero in Mathematics and in Category Theory it's what allows functors and monads to exist.

## Immutability

You just learned a bit about Category Theory and Lambda Calculus in a practical way. Because that's the thing. You want to use concepts to build something useful, you are a programmer not a mathematician.

In none of the previous examples a mutable state was needed. This is amazing. The code is clear and easy to change and test. Functions are the only constructions you need. Even classical constructions like `loops` can be turned into functions.

```js
for (let i = 0; i < 5; i++) {
    console.log(i);
}
```

How can we reach the same behavior without having to mutate the `i` variable? The answer: functions.

```js
function loop(initialValue, condition, increment, action) {
    if (condition(initialValue)) {
        action(initialValue);

        loop(increment(initialValue), condition, increment, action);
    }
}

loop(
    0,
    (i) => i < 5,
    (i) => i + 1,
    (i) => console.log(i)
);
```

Yes, this is recursion. It allows you to iterate without having to mutate variables. Instead, you just call the function again with the new value. In many FP languages that's the way to loop. Drwaing the calls it would be something like

```
loop(
    0,
    (i) => i < 5,
    (i) => i + 1,
    (i) => console.log(i)
);

loop(
    1,
    ...,
    ...,
    ...
);

loop(
    2,
    ...,
    ...,
    ...
);

...


loop(
    5,
    ...,
    ...,
    ...
);
```

### Be Careful With Immutability In Non-FP Languages

Despite writing imutable code is a good thing, it's not always possible. Imutability on a programming language like Erlang or Elixir is possible because the language was designed to work that way. JavaScript is not meant to be like those languages.

Sometimes you will need to write an imperative code to leverage performance and that's fine. Don't be afraid of using `for` loops if you need. Don't be afraid of reassigning a variable a new value. Just analyze the trade-offs and pick the best approach for your case.

## Bonus: ReactJS Components Lifecycle Is Based On Immutability

https://stackoverflow.com/questions/53729917/react-hooks-whats-happening-under-the-hood
https://pomb.us/build-your-own-react/
https://github.com/pomber/didact/blob/master/didact.js

## Wrap up

- Isolating what matter from what doesn't is the essence of DDD and Architectural Patterns.
- Composition is strong even in OOP. In most cases, it's better to isolate the behaviors and just compose them with what
    you need.
- With immutability, you can reason about your code more easily. It makes it much simpler to test when you can use stubs
    so no monkey patching is needed or excessive mocking.
- The same can be told about pure functions. Even more, they end up leading you to a very famous pattern also present in
    OO: Dependency Injection.

## Outcomes

- Isolation of what matters from implementation details
    - data, calculation and actions.
- Easier to:
    - test;
    - reason about;
    - parallelize or make concurrent.
