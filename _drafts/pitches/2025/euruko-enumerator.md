# Enumerator and Enumerable 

Concious Enumeration: What's behind Enumerator and Enumerable

# Features and Benefits

| Features | Benefits |
| --- | --- |
| Know how Enumerator actually works | Use it better and conciously write efficient code |
| Revisit Enumerator faces | Revisit Lazy |

# 4U's

- Urgency: Not that urgent. Devs can do much without knowing the internals of Enumerator (1)
- Uniqueness: It's kinda unique. Never saw a talk or posts mentining (4)
- Ultra-specific: Very specific. It's about internal concepts (4)
- Useful: Very useful. Knowing how Enumerator works can help you write better code (4)

# Showing a Need

You use Enumerator every day. You know the patterns but you are not able to determine if you are using it the right way
or if the gem that implements it is using it the right way.

# Satisfying the Need

This talk will give you the power of knowledge. Next time you use any `.each` method you will know exactly what is going
on.

---

# Abstract

Ruby was made to be simple, elegant and make programmers happy. This is amazing because it allows even a beginner to
write very good applications and tools with it.

But an elegant code might hide some issues. Just using some common modules won't guarantee that your code is efficient.
In this talk, I will show you how Enumerator works and how to use it to write efficient code.

# Pitch

Enumerator is a powerful and elegant core feature in Ruby, forming the backbone of many gems. In this talk, we'll explore how Enumerator and Enumerable work and how to use them efficiently—beyond just iteration—to write cleaner, more thoughtful Ruby code.  It will no longer be a black-box for you.

## Outcomes

After attending this talk, the audience should know:

1. Know how to efficiently use Enumerator
1. Dig into use cases for custom Enumerators
2. Learn how it's so easy to turn any class into an enumerable
3. Understand the difference between lazy and eager enumerables

## Outline

### Intro

I spend a couple of minutes talking about the Ruby way, how the Enumerator pattern is used and why it can be a trap
since developer see such an interface in gems and just use it, without reasoning about it. About the actual
implementation.

- The Ruby way and why it is awesome
- Hidden details: when the Ruby way can be a trap

### What is an Enumerator?

I speak about Enumerator. I know, not that needed, but I want to talk about the building blocks of Enumerator (e.g.
Enumerator::Yielder)

- Components of an Enumerator
- Putting it all together

### Custom Enumerators: when to use?

Knowing the Enumerator building blocks we know how and when to define a custom Enumerator. I will show some examples
of custom Enumerators and when to use them.

- Custom Enumerators on the wild

### It's good to be lazy

Following the performance mantras we will understand how to use lazy enumerators, get to know its components and when to
use them.

- Lazy Enumerators and how they work
- When to use them

### Conclusion

- The Ruby way is awesome, but it can be a trap
- Enumerator is a powerful component; use it correctly to build better code and tools

## Notes

I’ve been a software developer for 10 years now. I worked with a variety of programming languages. In the last three years, I’ve been working with and writing about Ruby (and Rails). Both became my favorite technologies. I even led a workshop where we made a Database from scratch in plain Ruby and as an open-source enthusiast, I’ve been contributing to projects using Ruby (and Rails).

Talk attendees just need to know plain Ruby. That’s good enough to absorb all the outcomes.

https://github.com/ruby/ruby/blob/master/enumerator.c
