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
        yielder = Yielder.new(&each_block)

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

Our Enumerator is good enough. It covers the most cases. But there are some limitations. We can't have `next` or `rewind` methods on
the consumer side. We can't have external iterators.

This limitation is due to the fact that the Yielder produces all values at once. The lazyness we have so far is due to
blocks only. We settle blocks but once the run, they run until the end.

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

## The Complete Enumerator

```ruby
require 'fiber'

class Traversor
  def initialize(&block)
    @block = block
  end

  def rewind
    start_fiber
  end

  def lazy
    Traversor::Lazy.new(&@block)
  end

  def each
    return self unless block_given?

    y_fiber = Fiber.new do
      yielder = Yielder.new

      @block.call(yielder)
    end

    loop do
      value = y_fiber.resume

      yield value

      break unless y_fiber.alive?
    end
  end

  # def each(&each_block)
  #   return self unless block_given?

  #   yielder = Traversor::Yielder.new(&each_block)

  #   # TODO: loop till the end of the fiber

  #   @block.call(yielder)

  #   puts "About to start the loop"

  #   loop do
  #     begin
  #       puts "each block executed"
  #       value = @fiber.resume

  #       yield value
  #     rescue StopIteration
  #       break
  #     end
  #   end
  # end

  def next
    start_fiber unless @fiber

    value = @fiber.resume

    raise StopIteration unless value && @fiber.alive?

    value
  end

  def map(&map_block)
    result = []

    each do |item|
      result << map_block.call(item)
    end
  end

  def filter(&filter_block)
    result = []

    each do |item|
      result << item if filter_block.call(item)
    end
  end

  def take(n)
    result = []

    # fica um pingue-pongue entre o Traversor atraves do each e o Traversor::Yielder
    each do |item|
      result << item

      break if result.size == n
    end

    result
  end

  private

  def start_fiber
    @fiber = Fiber.new do
      yielder = Yielder.new

      @block.call(yielder)
    end
  end

  def fiber_yielder
    @fiber_yielder ||= Fiber.new do
      @block.call(self)
    end
  end
end

class Traversor::Yielder
  # def initialize(&yielder_block)
  #   @yielder_block = yielder_block
  # end

  def yield(item)
    # return @yielder_block.call(item) if @yielder_block

    Fiber.yield(item)
  end

  alias << yield

  def next
    Fiber.yield(10)
  end
end

class Traversor::Lazy
  def initialize(&block)
    @block = block
  end

  def each(&each_block)
    traversor = Traversor.new(&@block)
    traversor.each(&each_block)
  end

  def map(&map_block)
    Traversor::Lazy.new do |yielder|
      each do |item|
        yielder << map_block.call(item)
      end
    end
  end

  def filter(&filter_block)
    Traversor::Lazy.new do |yielder|
      each do |item|
        yieldable = filter_block.call(item)

        puts "filter was called for item #{item} :: yieldable #{yieldable}"
        yielder << item if yieldable
      end
    end
  end

  def take(size)
    raise ArgumentError.new('attempt to take a negative size') if size.negative?

    Traversor::Lazy.new do |yielder|
      count = 0

      each do |item|
        puts "take block executed :: count #{count} | size #{size}"

        yielder << item if (size - count).positive?

        count += 1

        # checks again to be efficient, not breaking here cause the whole pipeline to execute again till this step again.
        break if count >= size
      end
    end
  end

  def lazy
    self
  end

  def to_a
    results = []

    each do |item|
      results << item
    end

    results
  end
end


fib = Traversor.new do |yielder|
  a = b = 1
  loop do
    yielder << a
    a, b = b, a + b
  end
end

puts fib.next
puts fib.next
puts fib.next

puts fib.take(10).inspect
```

## References

- [https://ruby-doc.org/core-3.0.2/Enumerator.html](https://ruby-doc.org/core-3.0.2/Enumerator.html)
- [https://ruby-doc.org/core-3.0.2/Fiber.html](https://ruby-doc.org/core-3.0.2/Fiber.html)
- [https://www.visuality.pl/posts/concurrency-and-parallelism-in-ruby-processes-threads-fibers-and-ractors](https://www.visuality.pl/posts/concurrency-and-parallelism-in-ruby-processes-threads-fibers-and-ractors)
