Christmas is approaching, along with a new version of Ruby! The first release is available as of 12/12/2024 and here is your gift: a sneak peek at what's new in Ruby 3.4.

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

### [Boolean operators are now allowed in the beginning of line](https://bugs.ruby-lang.org/issues/20925)

So far, to have a multi-line conditional expression, you had to place the boolean operator at the end of the previous line, otherwise, it would raise a syntax error.

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

# What's new in core classes

### Ruby::Box

### Ractor

### ArgumentError now displays code snippets for caller and callee

This improvement makes debugging easier by providing more context about where the error occurred.

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

# Implementation improvements

# What else?

# Conclusion

This version brings many improvements. Having standard libraries rewritten in Ruby is now a great advantage; not only for performance but also for maintainability. Moreover, it makes it easier for the community to contribute to Ruby.

Changes in the language were also very welcome. The new `it` reference block parameter is a great addition to the language. It makes the code more readable and less prone to errors. With improved error messages and backtraces, debugging will be much easier.

Programming in Ruby is enjoyable and these changes make it even better. I'm excited to see what the future holds for Ruby.

Happy coding and [count on Codeminer42](https://www.codeminer42.com/#talk-to-us) if you need help migrating or introducing your team to Ruby 3.4!
