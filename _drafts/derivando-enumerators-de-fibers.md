---
layout: post
title: Assemblage of Ruby Enumerator
date: 2023-06-23
lang: pt-BR
category: ["ruby", "enumerator", "design patterns", "from scratch"]
---

i spent some time trying to come up with a good introduction to this post. i would like to start with a great quote or
something like that but i couldn't.

understanding the internals of ruby's enumerator is a great way to learn more complex concepts like fibers and
coroutines using an already fimiliar concept that is an enumerator.

this post is the second in a series of posts about the internals of ruby's enumerator. the first post is about Custom
Enumerators and you can read it [here](https://www.google.com).

## Basic components of an Enumerator

Enumerator has two main classes: `Enumerator` and `Enumerator::Yielder`.

If you don't recall them from the last post, here is a an example so we can identify them:

```ruby
enum = Enumerator.new do |y|
  y << 1
  y << 2
  y << 3
end

enum.each do |x|
  puts x
end
```

In this example, `enum` is an instance of `Enumerator` and `y` is an instance of `Enumerator::Yielder`.

## Control Interleaving (Producer and Consumer)

The essence of Enumerator is to control the interleaving of two different control flows. As you can see in the example
above we have two control flows: the block that is passed to `Enumerator.new` and the block that is passed to `each`.

The block passed to `Enumerator.new` is the producer and the block passed to `each` is the consumer.

Something that may not be clear is that the producer and the consumer are not running at the same time. They are running
in an interleaved way. The producer runs until it yields a value and then the consumer runs until it consumes that value and
then the producer runs again and so on.

The control starts on producer side. Once the consumer is settled - link in the each method - the control is passed to
the consumer side. The consumer runs until it reaches the end of the block or until it calls `yield` or `next` on the
producer.

## Getting Technical

From here on, I will be using the producer term to refer to the Yielder instance and the consumer term to refer to the
block passed to `each`.

Let's look at the `Yielder` implementation to make things clearer. I know this class it harder to infer since we don't
need to care about it, but it simple.

```ruby
class Traversor::Yielder
    def initialize(&yielder_block)
        @yielder_block = yielder_block
    end

    def yield(value)
        @yielder_block.call(value)
    end

    alias << yield
end
```

That's it. It takes a block and every time the method `<<` (_yield_) is called it calls the block with the value passed
as an argument. See the exemple below:

```ruby
yielder = Traversor::Yielder.new do |x|
    puts x
end

yielder << 1
yielder << 2
yielder << 3
```

It looks good! Every time we call `<<` the block is called - and in this case, it prints the value. We can give a name
to this block and make this code closer to the Enumerator implementation:

```ruby
each_block = Proc.new do |x|
    puts x
end

yielder = Traversor::Yielder.new(&each_block)

yielder << 1
yielder << 2
yielder << 3
```

I hope it gives a clue about which block will be executed in which part. But if not yet, no worries. Let's move on. We
are about to connect the pieces.

Let's recall the Enumeratore.new interface. It takes a block and such a block is called with an instance of Yielder.
This tells us that the Enumerator wraps the producer block in a Yielder instance.

```ruby
class Traversor
    def initialize(&block)
        @block = block
    end

    def each(&each_block)
        yielder = Traversor::Yielder.new(&each_block)

        @block.call(yielder)
    end
end
```

Believe me, this works. You just made a simple Enumerator. You can use it like this:

```ruby
enum = Traversor.new do |y|
    y << 1
    y << 2
    y << 3
end

enum.each do |x|
    puts x
end
```

## More useful methods

To prove this is a good-enough Enumerator, let's implement some more methods. Very common methods.

```ruby
class Traversor
    # omitted code

    def map
        return self unless block_given?

        result = []

        each do |x|
            result << yield(x)
        end
    end

    def select
        return self unless block_given?

        result = []

        each do |x|
            result << x if yield(x)
        end
    end
end
```

NOTE: This code claims for an isolation of parts that change and parts that don't. Maybe some metaprogramming can be
useful here.

NOTE: Have you noticed how methods like `map` and `select` are implemented? They are implemented using the `each` method.
That's why it's so simple to implement enumerators using Enumerable module. An `each` method is all you need\*.

## Traversor Limitations

> Note that enumeration sequence by next, next_values, peek and peek_values do not affect other non-external enumeration methods, unless the underlying iteration method itself has side-effect, e.g. IO#each_line.
>
> Moreover, implementation typically uses fibers so performance could be slower and exception stacktraces different than expected.

Our Enumerator is good enough. It covers the most cases. But there are some limitations. We can't have `next` or `rewind` methods on
the consumer side. In summary, we can't have external iterators.

Our Traversor uses blocks to control the interleaving of the producer and the consumer. Thanks to lazy evaluation it's working as expected. For external iterators though, we need to have a way to pause and resume the execution.

To achieve the full Enumerator behavior we need to use some construct that allows us to pause and resume the execution.
We need some concurrency mechanism.

On concurrency mechanisms, we have four options: processes, threads, fibers, and reactors. Let's see which one fits best
for our case.

- Processes: too heavy for this task. Also, IPC is not that trivial.
- Threads: too complex. We need to deal with synchronization. Also, we may face issues since we don't have control over
    scheduling.
- Reactors: too new. Also, it's an actor-model. It's supposed to solve problems that we don't have.
- Fibers: just right. They are lightweight and we have full control over scheduling.

Let's dig into fibers.

## Fibers

Fibers allow us to do cooperative concurrency in a way that's simple and efficient.

Think of a simple way of doing concurrency. Well, Fibers are simpler than that. To get this straight, let's see an example:

```ruby
require 'fiber'

puts "Root fiber: #{Fiber.current}\n\n"

f = Fiber.new do
  puts "Fiber says hello"
  puts "I am fiber #{Fiber.current}"

  Fiber.yield 10 # gets the control back to the caller

  puts "Fiber says goodbye"
end

pp f
value = f.resume # fiber execution starts till the first yield
puts "Value received from Fiber is: #{value}"
pp f

puts "\n------- \n\n"


value = f.resume
pp f
puts "Value received from Fiber is: #{value.inspect}"
```

In this simple script we can see a few things:

- There's a root fiber. It's the main fiber that runs the script. You can see it on `irb`.
- We create a new fiber using `Fiber.new`. The block passed to `Fiber.new` is the fiber's body.
- When `resume` is called on a fiber, it starts running the fiber's body until it reaches a `Fiber.yield`. The control
    is then passed back to the caller.
- A Fiber has states: `created`, `resumed`, `suspended`, and `terminated`. When a fiber is `resumed` it's running. When it's `suspended` it's waiting for a `resume` call. When it's `terminated` it's
    done.
- If `resume` is called and the there's no `Fiber.yield` in the fiber's body, the fiber is `terminated` and `nil` is
    returned to the caller.

The output of this script is:

```
Root fiber: #<Fiber:0x000000014381a0a8 (resumed)>

#<Fiber:0x0000000143819d38 /tmp/fibers.rb:5 (created)>
Fiber says hello
I am fiber #<Fiber:0x0000000143819d38 /tmp/fibers.rb:5 (resumed)>
Value received from Fiber is: 10
#<Fiber:0x0000000143819d38 /tmp/fibers.rb:5 (suspended)>

-------

Fiber says goodbye
#<Fiber:0x0000000143819d38 /tmp/fibers.rb:5 (terminated)>
Value received from Fiber is: nil
```

Very useful for us. We can use fibers to control the interleaving of the producer and the consumer when using
external enumerators. The Yielder will execute inside of a fiber so it produces a value then switches the execution to
the consumer fiber.

## The Complete Enumerator

We will do the following changes to our Enumerator:

- The producer block will be executed inside of a fiber.
- There will be a fiber dedicated to external iteration. This fiber will be (lazily) created when `next` method is called.
- There will be a `rewind` method that will clean up the consumer fiber so the external iteration can start over.

```ruby
require 'fiber'

class Traversor
    def initialize(&block)
        @block = block
    end

    def each(&each_block)
        return self unless block_given?

        yielder = Traversor::Yielder.new(&each_block)

        @block.call(yielder)
    end

    def rewind
        @yielder_fib = nil
    end

    def next
        value = yielder_fib.resume

        raise StopIteration unless value && yielder_fib.alive?

        value
    end

    private

    def yielder_fib
        @yielder_fib ||= start_yielder_fib
    end

    def start_yielder_fib
        @yielder_fib = Fiber.new do
            @block.call(Traversor::Yielder.new)
        end
    end
end
```

## References

- [https://ruby-doc.org/core-3.0.2/Enumerator.html](https://ruby-doc.org/core-3.0.2/Enumerator.html)
- [https://ruby-doc.org/core-3.0.2/Fiber.html](https://ruby-doc.org/core-3.0.2/Fiber.html)
- [https://www.visuality.pl/posts/concurrency-and-parallelism-in-ruby-processes-threads-fibers-and-ractors](https://www.visuality.pl/posts/concurrency-and-parallelism-in-ruby-processes-threads-fibers-and-ractors)
