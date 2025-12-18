Christmas is approaching, along with a new version of Ruby! The first release is available as of 12/12/2024 and here is your gift: a sneak peek at what's new in Ruby 3.4.

# What's new in core classes

### [Ruby::Box](https://github.com/ruby/ruby/blob/v4.0.0-preview3/doc/language/box.md)

This new feature was introduced to provide a way to create isolated context executions within the same Ruby process.

It allows you to run code in a separate "box" that has its own global variables, constants, and class definitions.

Take the following code as an example:

```ruby
# file: greetings.rb
class String
  def shout
    self.upcase + "!"
  end
end

class Greetings
  def self.say_hello(name)
    "Hello, #{name}!".shout
  end
end
```

Now, let's put this into its own box:

```ruby
# file: demo.rb
box = Ruby::Box.new
box.require_relative('greetings')

puts box::Greetings.say_hello "Edy" # Output: HELLO, EDY!

"Hello".shout # This will raise NoMethodError since the String#shout method is not defined in the root box (main context)
```

This feature is still experimental and must be enabled using the `RUBY_BOX=1` environment variable.

A use case that comes to mind is running multiple versions of the same library simultaneously. For example, migrating a Service implementation from v1 to v2 while needing to keep both versions running for a while.

Whether it is a gem or your own code, you can load each version in its own box and use them without conflicts. This blog post from [Xavier Noria](https://gist.github.com/fxn/86ad8584d7813caf03dac9222f8dcf41) has more details about Ruby::Box.

### Ractor

As someone with experience in Erlang, I am happy with the Ractor improvements in this release. It is becoming more ergonomic and easier to use.

Ractor, Ruby's implementation of the Actor Model, works like this:

[actor model image]

This version introduces `Ractor::Port`, which essentially acts as the `mailbox` in the Actor Model. Messages are now sent to and received from ports, representing a significant improvement in data synchronization between Ractors.

Any Ractor can send messages to any port, but only the owner Ractor can receive messages from its own port.

As a result of this change, methods like `Ractor.yield` and `Ractor#take` are no longer necessary and have been removed.

Two other additions to Ractor are `Ractor.shareable_proc` and `Ractor.shareable_lambda`. Sharing procs is necessary and, once again, makes everything more ergonomic.

One of the "Hello World" examples of the Actor Model is the parallel map. Here is how it looks in Ruby 4.0:

```ruby
def pmap(enum, &block)
  raise 'Block must be shareable. (see Ractor.shareable_proc and Ractor.shareable_lambda)' unless Ractor.shareable?(block)

  ports = enum.map do |item|
    p = Ractor::Port.new
    Ractor.new(p,block, item) do |p, block, item|
      p << "[#{Time.now}] Monotonic nanosecond: #{Process.clock_gettime(Process::CLOCK_MONOTONIC, :nanosecond)} | Result: #{block.call(item)}"
    end
    p
  end

  while !ports.empty?
    p, result = Ractor.select(*ports)
    puts "#{p}: #{result}"
    ports.delete p
  end
end

# Example usage
b = Ractor.shareable_proc { |x| x * x }
pmap(1..5, &b)

# Output:

# parallel_map.rb:6: warning: Ractor API is experimental and may change in future versions of Ruby.
# #<Ractor::Port:0x000000011d479708>: [2025-12-18 12:31:54 -0300] Monotonic nanosecond: 434548010104000 | Result: 1
# #<Ractor::Port:0x000000011d479050>: [2025-12-18 12:31:54 -0300] Monotonic nanosecond: 434548009883000 | Result: 4
# #<Ractor::Port:0x000000011d478df8>: [2025-12-18 12:31:54 -0300] Monotonic nanosecond: 434548010104000 | Result: 9
# #<Ractor::Port:0x000000011d478bf0>: [2025-12-18 12:31:54 -0300] Monotonic nanosecond: 434548010437000 | Result: 16
# #<Ractor::Port:0x000000011d4789e8>: [2025-12-18 12:31:54 -0300] Monotonic nanosecond: 434548010449000 | Result: 25
```

We spawn a Ractor for each item in the enumerable, passing a port and a shareable proc as arguments. Each Ractor computes the result and sends it back through its port.

Trying to do this in Ruby 3.x reveals how cumbersome it used to be, requiring message tagging and significant boilerplate code.

It is worth mentioning that Ractor is still experimental and may change in future Ruby versions.

### Kernel

The `Kernel#inspect` method now checks for the existence of `#instance_variables_to_inspect`, allowing control over which instance variables appear in the `#inspect` output:

```ruby
class DatabaseConfig
  def initialize(host, user, password)
    @host = host
    @user = user
    @password = password
  end

  private def instance_variables_to_inspect = [:@host, :@user]
end

conf = DatabaseConfig.new("localhost", "root", "hunter2")
conf.inspect #=> #<DatabaseConfig:0x0000000104def350 @host="localhost", @user="root">
```

### ArgumentError now displays code snippets for caller and callee

This improvement eases debugging by providing more context about the error's location.

```ruby
# file: greetings.rb
class Greetings
  def self.say_hello(name)
    "Hello, #{name}!"
  end
end

# file: demo.rb
require_relative 'greetings'

Greetings.say_hello
```

The code above will raise the following error in Ruby 4.0:

```
~/greetings.rb:2:in 'Greetings.say_hello': wrong number of arguments (given 0, expected 1) (ArgumentError)

    caller: demo.rb:3
    | puts Greetings.say_hello()
                    ^^^^^^^^^^
    callee: ~/greetings.rb:2
    |   def self.say_hello(name)
                ^^^^^^^^^^
        from demo.rb:3:in '<main>'
```

A much more informative error message that helps identify the problem quickly.

### New top-level module: Ruby

`Ruby` is a new top-level module containing Ruby-related constants.

```ruby
%w[
    Ruby::VERSION
    Ruby::RELEASE_DATE
    Ruby::PLATFORM
    Ruby::PATCHLEVEL
    Ruby::REVISION
    Ruby::COPYRIGHT
    Ruby::ENGINE
    Ruby::ENGINE_VERSION
    Ruby::DESCRIPTION
].each do |const_name|
  puts "#{const_name} = #{Ruby.const_get const_name.split("::").last}"
end

# Output:
# Ruby::VERSION = 4.0.0
# Ruby::RELEASE_DATE = 2025-12-17
# Ruby::PLATFORM = arm64-darwin24
# Ruby::PATCHLEVEL = -1
# Ruby::REVISION = 54d3945ee53fa29186c6aa44f673a3a5ec3b38d9
# Ruby::COPYRIGHT = ruby - Copyright (C) 1993-2025 Yukihiro Matsumoto
# Ruby::ENGINE = ruby
# Ruby::ENGINE_VERSION = 4.0.0
# Ruby::DESCRIPTION = ruby 4.0.0dev (2025-12-17T07:16:32Z v4.0.0-preview3 54d3945ee5) +PRISM [arm64-darwin24]
```

# What's new in the language

### [*nil no longer calls `nil.to_a`](https://bugs.ruby-lang.org/issues/21047)

Before Ruby 4.0, every time you splat `nil`, it would call `nil.to_a`, which returns an empty array.

```ruby
class NilClass
    def to_a
        puts "Calling nil.to_a"
        []
    end
end

[*nil]
# Output: Calling nil.to_a
```

Running the same code in Ruby 4.0 will not produce any output, as `nil.to_a` is no longer called.

This subtle change makes the whole splat operation more efficient since it avoids unnecessary array allocations.

### [Boolean operators are now allowed at the beginning of the line](https://bugs.ruby-lang.org/issues/20925)

Previously, multi-line conditional expressions required placing the boolean operator at the end of the preceding line, otherwise, a syntax error would occur.

```ruby
  if request.secret_key_base.present? &&
    request.encrypted_signed_cookie_salt.present? &&
    request.encrypted_cookie_salt.present?
  then
    do_something
  end
```

In this new version of Ruby, you can place the boolean operator at the beginning of the line, which improves readability:

```ruby
  if request.secret_key_base.present?
    && request.encrypted_signed_cookie_salt.present?
    && request.encrypted_cookie_salt.present?
  then
    do_something
  end
```


# What else?

- The `Array` class now includes its own `#find` method, an efficient override of `Enumerable#find`. Additionally, an `#rfind` method has been added as an efficient alternative to `array.reverse_each.find`.
- `ZJIT` is becoming production-ready in Ruby 4.1. While faster than the interpreter, it has not yet surpassed YJIT.
- The Ruby Jit Toolkit ([RJIT][]) has been moved to a separate library.

[RJIT]: https://github.com/ruby/rjit

# Conclusion

This version brings many improvements. Rewriting standard libraries in Ruby offers significant advantages in both performance and maintainability, while also facilitating community contributions.

The language changes are also very welcome. The new `it` reference block parameter is a great addition, making code more readable and less error-prone. Coupled with improved error messages and backtraces, debugging becomes much easier.

Programming in Ruby is enjoyable, and these changes make it even better. I am excited to see what the future holds for Ruby.

Happy coding and [count on Codeminer42](https://www.codeminer42.com/#talk-to-us) if you need help migrating or introducing your team to Ruby 4.0!
