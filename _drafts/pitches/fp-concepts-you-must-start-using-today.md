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

# Copy

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

## Do you think it's simple?

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

Purity is something people tend to focus on when learning FP. Though it's important and useful, it's just a concept.
A software to be useful needs side-effects. You don't want a mailing system that doesn't send emails, right?

You should then isolate the impure parts of your code and make them as small as possible. Eric Normand, in his book
`Groking Simplicity`, states three main components of useful software:

- data: the information you are working with;
- calculation: the transformation of data;
- actions: the side effects.

You should isolate the actions from the data and calculations. This way you can reason about your code more easily and
test it more effectively.

Rick is a software engineer that works for a company that sells products online. He's working on a feature that sends an
email to the customer when the product is shipped. He wants to apply the concepts he learned about FP to make his code
more reliable and easier to test.

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

`Inheritance vs Composition` is a common topic in Object-Oriented Programming (OOP). You probably heard about it and
about the `Composition over Inheritance` principle. This principle states that you should prefer composition over
inheritance.

The issue with inheritance is that it's a `Is-A` relationship. It's good for taxonomy. For instance, a `Duck` is a `Bird` so it makes sense to
use inheritance. An issue with this approach might arise when the parent class has behaviours defined that will dictate
the child class behaviour.

Suppose in the class `Bird` we have a method `fly`. It's a good method for a `Bird`, but not for a `Penguin`. Penguins are birds, but they don't fly. If we use inheritance, we will have to override the `fly` method in the `Penguin` class.

A more clever approach is to isolate the behaviors and just use what you need where you need, isolating what changes from what doesn't.

So the charateristics of a `Bird` that are common to all birds can be in the `Bird` class. The behaviours that are specific to children classes can be isolated and composed where needed. For instance, we can have a `Flyable` interface that has the `fly` method and compose it where needed.

NOTE: There are other approaches to address this problem.

## Composition in FP

The essence of composition is the same as discussed in the last section. Compose small pieces to build something new, with different traits.

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
