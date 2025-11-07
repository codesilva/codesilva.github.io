# JSNation Script: Interactive Debugging and Control in Node.js with REPL

we're almost every day bombarded with a information about good practices, architectures, patterns and so on. you should
build a whole foundation based on abstractions and layers to make everything testable, maintainable and scalable.

that's great, and we definitely should follow those practices. what i miss with all that literature is that they miss
a very important part: when things get real.

you cannot build a useful application only with abstractions, at some point you need to get real implementation, for
that interfaces need to be implemented, databases need to be connected, external services need to be called.

while i know this is left apart because there's no need to be rigid about it, no one want to rule how you should
organize your code. and this becomes a problem. we don't give too much attention to the _bootstrapping_ phase of our
applications, and this is where things get messy, and hard to test, specially when in non-local environments.

> some errors only arise in production, and when they do, we need to be able to inspect and fix them quickly.

> is there anything better for experimenting tha the local environment? you add logs, breakpoints, and try to reproduce
> the issue locally. but what if the issue is not reproducible locally? what if the issue only arises in production?

a very common approach when bootstrapping a regular web applicatin is to have a main file that does all the setup, like
connecting to the database, setting up the web server, loading configurations, and so on. Evertything is tied up, making
it easier to perform experiments without too much ceremony.

i have seen people adding temporary endpoints (or even logs) to their applications to perform experiments, like testing a database
connection, or checking the status of an external service. while this works, it's not ideal, as it exposes potentially
sensitive operations to the outside world, and requires redeploying the application.

The Ruby on Rails framework solves this problem by providing a console that allows you to interact with your application
in a live environment. This console is essentially a REPL (Read-Eval-Print Loop) that gives you access to your
application's models, configurations, and other components.

> hermes was a case, it has an endpoint to track all the jobs processed for an specific entity

I was looking for a similar tool for a Node.js application I worked on, and I found that Node.js has a built-in REPL
module that can be used to create an interactive console for your application.

> Node.js has a couple of modules that are very greate for building tools that will improve your team's DX but for some
> reason they are overlooked.

https://chatgpt.com/share/690e3ae6-7360-800c-8d05-86b9a2f4e863
