---
layout: post
title: Implementando enumerators a partir de fibers
date: 2023-06-23
lang: pt-BR
category: ["ruby", "enumerator", "design patterns", "from scratch"]
---

I find Ruby a pretty cool programming language that helps us to write expressive and flexible code. That implementation
of custom enumerators we did in the last post was a simple thing to do - believe me, you don't need a gem for that.

While implementing that code I got intrigued about how magic it is. To get enumerators working Ruby provides two
main classes: Enumerator and Enumerator::Yielder.

NOTE: There are other classes but they can be easily derived from the tow above.

## What I cannot create I do not understand (Why this post is good for you)

This post is about understanding. I mean, really understanding how the Ruby Enumerator is possible. If you are
interested on internal aspects of things you enjoy this post. If you are (or is aiming to be) a Ruby developer you you
enjoy it.

Understanding it is important so you can conceive use cases like that mentioned in the last post, where Enumerator was
used to improve performance. You can also conjecture, for example, how famous libs, like activerecord, work. It empowers
you to create similar things.

## Fibers

## References

- [https://ruby-doc.org/core-3.0.2/Enumerator.html](https://ruby-doc.org/core-3.0.2/Enumerator.html)
