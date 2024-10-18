---
layout: post
<!-- title: Do it later: Lazy Enumerators -->
title: Don't do it: Lazy Enumerators
date: 2023-06-23
lang: pt-BR
category: ["ruby", "enumerator", "design patterns", "from scratch"]
---

<!-- A few years ago I worked on a mobile application that was a tool for students. It was a really cool project. I worked on -->
<!-- a task that was to make some features offline-first. We had a couple of entities, most of our features were simple -->
<!-- CRUDs. I remember to work on a feature that was filtering the list of studies by date. Very simple, there was the start -->
<!-- date and the end date and I should filter the list of studies that were between those dates. Even better, the list was -->
<!-- ordered already. -->

<!-- I (naively) did something like this: -->

Below is a method that filters a list of orders by date.

```ruby
def filter_by_date(orders, start_date, end_date)
  orders.select do |order|
    order.date >= start_date && order.date <= end_date
  end
end
```

You task it to make this a paginated list. Pretty simple, huh? You just need to add a limit and an offset to the method.

```ruby
# Ignore the fact that this takes a bunch of arguments - we have bigger problems with this code.
def filter_by_date(orders, start_date, end_date, limit, offset)
  orders.select do |order|
    order.date >= start_date && order.date <= end_date
  end.drop(offset).take(limit)
end
```

That's awesome!

I really like this functional style of coding. It makes the code very easy to read. This style is very common in Ruby,
as we mentioned in the previous posts, but it might hide some issues. In this case, there's a performance issue; it's
doing much work.

To determine how much of work it's doing we can count how many times the block is executed. It may be hard at first to
see that, but if we rewrite the code in a more imperative style, it will be easier to see.

```ruby
def filter_by_date(orders, start_date, end_date, limit, offset)
  result = []
  i = 0

  loop do
    break if i >= orders.size

    order = orders[i]

    if order.date >= start_date && order.date <= end_date
      result << order
    end

    i += 1
  end

  i = 0

  loop do
    break if i < offset

    result.shift
    i += 1
  end

  i = 0

  loop do
    break if i >= limit

    result.pop
    i += 1
  end
end
```

# Don't do it

A code like this violates the first performance mantra: Don't do it.

Now i have a great quote to start this post. it comes from brendan greg books. In the section 2.5.20 of the book
"Systems Performance: Enterprise and the Cloud" he states the performance mantras. I won't mention every single one of
them, but only two:

- Don't do it.
- Do it later.

Doing it later is something you wanna do. It's something your Operating System does to handle I/O operations. Even your
hardware does it (e.g. CPU write-back cache).

## What we already know about laziness

- procs

## How to handle infinite (or huge) sequences?

- don't do it.
- do it later

nota: exemplo de um loop processando coisas que não precisa.

## How can this be implemented?

Since the first post in this series, we've been digging into the Enumerator machinery. In the last post we implemented
our own; we called it `Traversor`. I couldn't finish this series without implementing a lazy enumerator.

### Sequence Generators (again)

Think of an enumerator as a ring where you can consume elements using `each`. As we discussed in the previous post,
there are methods that are used to manipulate those elements.

You can take an enumerator and apply a `map` method to it. Then when you call `each` on the resulting enumerator, it
will apply the block you passed to `map` to each element.

consumer &elt;- map &lt;- enumerator

It does that at once. When doing it lazily it will do it one by one so instead of generating all the values and putting
in the pipe, it will generate one value at a time.

## Why learning about compilers is a great thing (What are files if not sequences?)

