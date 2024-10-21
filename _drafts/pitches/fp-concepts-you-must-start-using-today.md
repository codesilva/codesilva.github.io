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
const TRUE = a => b => a;
const FALSE = a => b => b;
const IF = p => a => b => p(a)(b);
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
const add = (a, b) => a + b;

const curriedAdd = a => b => a + b;

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

function sendEmail(to, subject, body) {
    // Some side effect here to send the email
}

function shipProduct(product) {
    const { to, subject, body } = composeEmail(product);
    sendEmail(to, subject, body);
}
```

## Composition

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
