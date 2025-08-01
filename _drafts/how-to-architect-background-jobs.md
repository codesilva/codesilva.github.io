---
layout: post
date: 2025-06-05
title: How To Structure Your Application Like An Artisan
lang: pt-BR
category: ["algorithms"]
private: false
---

title: How To Structure Background Jobs In Your Node.js Application
title: The Handbbok On Architecture You Didn't Know You Need

When defining what a program is, the most fundamental definition you can find is:

+--------+     +-----------+     +--------+
| Input  | --> |  Program  | --> | Output |
+--------+     +-----------+     +--------+

> A program transformas inputs into outputs

Programming is a bit more (difficult)[https://joearms.github.io/published/2014-02-07-why-programming-is-difficult.html] than that. However, I'd like to explore this basic definition further to help you streamline your application organization.

# A Simple Program

One of the first programs I ever wrote was a calculator. In pseudocode, that's how a division software would look.

```bash
n1 = READ_USER_INPUT()
n2 = READ_USER_INPUT()

result = n1 / n2

PRINT 'Result is ' + result
```

This simple division routine does a few things: takes input, validates input, computes the result, and outputs it. From this simple program, you can easily identify the input (`n1` and `n2`) and output (the PRINT command displaying the result); the business logic (n1 / n2) is what is left.

Using subroutines, we could rewrite it to:

```bash
n1, n2 =  GET_INPUTS()
result = PERFORM_BUSINESS_LOGIC(n1, n2)
DISPLAY_RESULT(result)
```

The `PERFORM_BUSINESS_LOGIC` is the most important part of this code. Regardless of how inputs are received or how the output is displayed, the part that matters most is the operation being performed with the inputs.

Carefully examining this code, you think it misses something. You know that you can't blindly trust what the user gives you as input. So you want to validate inputs. Calling a performing a division operation with non-numeric values is pointless, right?

Where to add such a validation?

# Thinking Like An Architect

From this point, you are getting to a problem where you need to think like an architect. Instead of thinking about stuff like small components as subroutines, you think of each part of that diagram as a whole layer.

In the diagram below, I take the opportunity to attribute proper names to the layers.

+-------------+     +----------------------+     +--------------------+
| Input Layer | --> | Business Logic Layer | --> | Side-Effect Layer  |
+-------------+     +----------------------+     +--------------------+

A layer can have multiple components (subroutines). In one of them, we will put the validation. You can start by looking into each one.

We can discard the Side-Effect Layer. If the inputs are invalid, the program would have crashed before reaching it. Business Logic Layer seems a reasonable place to put it. The inputs come in, and an error is raised if they are invalid. 

The downside of this approach is that if I want to use that same logic with different inputs. For example, what if in another place our software accepts binary inputs as text? This requires a different type of validation and transformation. We would start branching in our business logic, complicating everything.

If you leave it as clean and simple as possible, you guarantee the consistency of the core of your app.

Input Layer seems like a good place for it. In this layer, we can take inputs, validate them, and if they are not good, protect the core logic of the app by not even calling it. For the binary data case, the same thing. It could get such inputs, validate them, turn them into numbers that the core logic can interpret, and only then call the core logic.

> Use the Input Layer to "protect" your business logic from the user

And let's be honest, the validation of **inputs** seems like a good fit for the **Input** Layer.

## Zero Breaks Our App

Did you know that, for a long period of history, [zero didn't exist](https://en.wikipedia.org/wiki/0)? Now it exists, is numeric, passes the input validation, and breaks the business logic.

We need one more validation to prevent this issue, but where?

It's not in the Side-Effect Layer for the same already discussed reasons. One can think of it as one more input validation. It could be, it would work until you figure out you need to support `sum` in your application. Well, sum doesn't break with zero, it is a division thing. It is inherent to the business logic of the division.

When looking into the core of the app and performing tests with it, I want it to actually express things correctly, like raising errors if a division by zero is attempted.

> You can protect the core logic from the user inputs, but some errors might happen due to the nature of the business rules

Conclusion: This is a business validation, and as the name suggests, it should be in the Business Logic Layer.

# Web Applications

Once you master the understanding of these three principal layers, you can see them in all places. In web applications, for example, the diagram is like this.

+------------------------------------+     +----------------------+     +--------------------+
| Http Request (Input Layer)         | --> | Business Logic Layer | --> | Side-Effect Layer  |
+------------------------------------+     +----------------------+     +--------------------+

We can translate that into something like below.

```typescript
const httpHandler = (request, response) => {
    const {n1, n2} = request.body;

    if (!isNumeric(n1) || !isNumeric(n2)) {
        return response.status(400).send({ message: 'Are u mad? How can I divide non-numeric stuff?' });
    }

    const result = MathService.divide(n1, n2);

    if (result.error) {
        return response.status(500).send({ message: result.error });
    }

    return response.send({ message: `Result is ${result.value}`});
};


app.post('/divide', httpHandler);
```

Of course, things are a bit different in this environment, but you can notice:

- the protection of business logic; MathService.divide is only called if the inputs are valid;
- the MathService can still return an error - the business logic error.

The handler performs validation, passes the data to the next layer, and gives the information back to the caller (with `response.send`). If pieces are cleverly isolated, with the use of some patterns like [Dependency Injection](), one can easily test every single part of the system individually.

# Background Jobs

When dealing with background jobs, people often miss this sense of isolation. My best guess is that the nature of Background Jobs is not usual for most programmers.

It seems a different thing, but it's indeed quite the same. The diagram would then be

+-------------------------+     +----------------------+     +--------------------+
| Job Data (Input Layer)  | --> | Business Logic Layer | --> | Side-Effect Layer  |
+-------------------------+     +----------------------+     +--------------------+

```typescript
const jobHandler = (job) => {
    const {n1, n2} = job.data;

    if (!isNumeric(n1) || !isNumeric(n2)) {
        return { message: 'Are u mad? How can I divide non-numeric stuff?' };
    }

    const result = MathService.divide(n1, n2);

    if (result.error) {
        return { message: result.error };
    }

    return { message: `Result is ${result.value}`};
};

new Worker('divide', jobHandler);
```

> Have you noticed we can just replace the Input Layer details and everything continues working? This is awesome!


# Side-Effect Layer

For the sake of simplicity and objectivity, I didn't spend much time talking about this layer. The same we discussed for Input Layers can be applied here. Your Business Layer should call the Side-Effect Layer, handling potential errors and returning results.

If you follow the same principles, you should be able to replace Side-Effect details, and everything should be fine.

# Conclusion

Some things don't belong to a single layer but to all. Classic examples are error handling and logging. Both of these concerns are very important and deserve their article. 

For now, practice these concepts in simple apps and see if you can cleanly isolate the layers, connect, and test the pieces. Repeat the process a few times, not only starting from scratch but with projects you already have created. It will make your brain assimilate this as muscle memory.

That's all. See ya!
