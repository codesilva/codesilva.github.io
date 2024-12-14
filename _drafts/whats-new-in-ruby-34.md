# What's new in Ruby 3.4

Christmas is coming and so is a new Ruby version. The first release candidate is available and here is your gift: a sneak peek at what's new in Ruby 3.4.

# What's new in the language

## [Warning on `frozen_string_literal`](https://bugs.ruby-lang.org/issues/20205)

The plan for Ruby is to make all string literals frozen by default. This is a step in that direction.

```ruby
# filename: frozen_string_literal.rb
name = "John"
name << " Doe"
```

`ruby -W:deprecated frozen_string_literal.rb` will raise the following warning:

> warning: literal string will be frozen in the future (run with --debug-frozen-string-literal for more information)

You can enforce this behavior by running Ruby with the `--enable=frozen-string-literal` flag. With this flag, the above
code will raise a `FrozenError`.

> frozen_string_literal.rb:2:in '<main>': can't modify frozen String: "John" (FrozenError)

## [`it` the new reference block parameter](https://bugs.ruby-lang.org/issues/18980)

`it` is an alternative to the numbered parameter `_1`.

```ruby
[1, 2, 3].map { it ** 2 } # => [1, 4, 9]
```

This makes the code more readable and less error-prone.

## [`**nil` is a valid syntax for keyword splatting](https://bugs.ruby-lang.org/issues/20064)

This one has been around for a while. It's for handling cases like the one below:

```ruby
invitation = { invitation_attributes: params.slice(:inviter_id) } if params.key?(:inviter_id)

User.create(
  email: 'john.doe@ruby.example',
  first_name: 'John',
  first_name: 'Doe',
  **invitation, # when `invitation` is nil, it evaluates to **nil that's now treated as **{}
)
```

Checking if 1 `invitation` is `nil` is no longer necessary.

## Error messages and backtrace have been changed (and they are better)

Take following code.

```ruby
def raise_nested_exceptions
  raise "First error"
rescue
  begin
    raise "Second error"
  rescue
    raise "Third error"
  end
end

raise_nested_exceptions
```

in Ruby 3.3, it raises an error like this:

```
sample.rb:7:in `rescue in rescue in raise_nested_exceptions': Third error (RuntimeError)
        from sample.rb:4:in `rescue in raise_nested_exceptions'
        from sample.rb:1:in `raise_nested_exceptions'
        from sample.rb:11:in `<main>'
sample.rb:5:in `rescue in raise_nested_exceptions': Second error (RuntimeError)
        from sample.rb:1:in `raise_nested_exceptions'
        from sample.rb:11:in `<main>'
sample.rb:2:in `raise_nested_exceptions': First error (RuntimeError)
        from sample.rb:11:in `<main>'
```

In Ruby 3.4 some changes have been made to make it more readable.

1. [Backtick (\`) on the left side was replace with a single quote (').](https://bugs.ruby-lang.org/issues/16495)
2. [Class names are displayed before method names: in a huge code base, potentially with multiple methods with the same name, finding the right was difficult. This change makes it easier to locate the right method.](https://bugs.ruby-lang.org/issues/19117)
3. [Extra frames from `rescue`/`ensure` blocks are removed: this makes the backtrace shorter and easier to read.](https://bugs.ruby-lang.org/issues/20275)

With all these changes, the backtrace now looks like this:

```
sample.rb:7:in 'Object#raise_nested_exceptions': Third error (RuntimeError)
        from sample.rb:11:in '<main>'
sample.rb:5:in 'Object#raise_nested_exceptions': Second error (RuntimeError)
        from sample.rb:11:in '<main>'
sample.rb:2:in 'Object#raise_nested_exceptions': First error (RuntimeError)
        from sample.rb:11:in '<main>'
```

# What's new in core classes

## [Hash.new now accepts a capacity argument](https://bugs.ruby-lang.org/issues/19236)

The reallocation of data structures is expensive. When you know the size of the structure in advance you can save memory roundtrips by preallocating the structure.

That's what `capacity` is for. You can now create a Hash with a predefined capacity.

```ruby
hash = Hash.new(capacity: 10)
```

## [Introduced GC.config](https://bugs.ruby-lang.org/issues/20443)

A new method `GC.config` has been introduced to configure the garbage collector. Along with this, a new configuration
parameter that can turn on/off GC Major executions.

```ruby
GC.config(full_mark: false)
```

This is a useful technique to reduce latency. See [how pausing GC might be useful](https://railsatscale.com/2024-10-23-next-generation-oob-gc/).

# Implementation improvements

### [Default parser is now Prism](https://bugs.ruby-lang.org/issues/20564)

Prism is a handwritten parser with a focus on error-tolerance. It means that it can parse code with syntax errors and still provide a meaningful error message.

In days of VSCode and Langa, this is a great improvement. It makes the development experience better.

#### [Array methods were rewritten in Ruby](https://bugs.ruby-lang.org/issues/20182)

`Array#each`, `Array#map`, and `Array#select` have been rewritten in Ruby.

This allows a Ruby-to-Ruby communication - less expensive than a Ruby-to-C communication. Having these methods in Ruby makes them eligible for JIT optimization making them faster.

A microbenchmark made on `Array#each`, for instance, shows it is **7x faster**.

## What else?

- Alternative Garbage Collector implementations can be loaded at runtime.
- YJIT optimizations reduce memory usage and improve performance.
- An optional `Fiber::Scheduler#blocking_operation_wait` hook allowing blocking operations to be moved out of the event loop.
- `require` can now be used in `Reactors`.

In this article, we covered some of the most important changes in Ruby 3.4. There are a few more that you can check out in the [official release notes](https://www.ruby-lang.org/en/news/2024/12/12/ruby-3-4-0-rc1-released/).

# Conclusion

This version brings many improvements. Having standard libraries rewritten in Ruby is now a great advantage; not only for performance but also for maintainability. Even more, it makes it easier for the community to contribute to Ruby.

Changes in the language were also very welcome. The new `it` reference block parameter is a great addition to the
language. It makes the code more readable and less error-prone. With better error messages and backtraces, debugging
will be easier.

Programming in Ruby is enjoyable and these changes make it even better. I'm excited to see what the future holds for Ruby.

Happy coding and [count on Codeminer42](https://www.codeminer42.com/#talk-to-us) if you need help migrating or introducing your team to Ruby 3.4!
