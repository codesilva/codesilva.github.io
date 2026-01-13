---
layout: post
title: We killed the generalists, now we need to bring them back
date: 2025-06-05
lang: pt-BR
category: ["aprendendo-a-aprender"]
tags: ["rubem-alves", "schopenhauer"]
private: false
---

A few weeks ago, in an internal study group, my fellows and I discussed generalists and specialists. Focused on the specialization of frontend and backend.

Back in 2012, I was a high school student when I started learning how to code, and I was unaware of this separation. 

For three years, I took programming-related classes: Programming Fundamentals, HTML&CSS, PHP, Java, JavaScript, and MySQL. We also had the other side, where we learned about Computer Architecture, Operating Systems, and Computer Networks.

On the programming side specifically, not all of this content was well taught. We didn't have exciting things in JavaScript classes, for example. On the other hand, HTML&CSS, PHP, MySQL, and Java were pretty good.

I didn't have a computer or internet connection at home, so I had to learn everything at school, following the given roadmap. It was not that bad since I wasn't exposed to things like this separation between frontend and backend. I was entirely focused on learning what was being taught, without worrying about things that come from the outside world.

It's not that hard to see that I believe in generalists. Not the 'jack of all trades, master of none' kind, but one that has a wide range of skills and knowledge, but also deep expertise in some areas.

As human beings, we have a powerful tool in our heads: our brains. Avoiding using it to learn something new because "it's not from our stack" limits us. When we do this, we act as if there were no overlap at all between the frontend and backend, which is not true.

Observe people that you admire, people who are references in their fields. They are not just specialists, they are generalists too. They have a wide range of knowledge and skills that allow them to connect the dots and see the bigger picture. They have a variety of tools that make them creative and innovative.

I'd like to have written about it on my blog. Fortunately, an article that covers it, entitled "The Expert Generalist", was published on Martin Fowler's blog. It does a much better job than I could do. I highly recommend reading it (link to the article is in the first comment).


## The Contrary

There were people in the study group that disagreed with me. That's good because it shows that we are thinking about the topic and not just accepting it as a fact.

One of the arguments was that nowadays, with the complexity of software development, we have to learn much more than before. So, we need to specialize in a specific area to be able to keep up with the pace of change.

Certainly a valid point, but I disagree. I do so because I don't think we have more to learn nowadays. The contrary, we have less. I know it looks like a bold statement, but hear me out.

Look back a bit and see, for example, how people had to think to write code. The guy who created the game Prince of
Persia for the Apple II, Jordan Mechner, has to know everything about the computer he was working on. On a level that he
had to understand memory addresses of that machine.

I know, it looks too extreme. Let's try a closer one. Have you ever tried to write a frontend without all these fancy libs/frameworks? It's painful. You have to take care of a bunch of things like event handling, DOM manipulation, application state, and so on.

> You who uses Tailwind you even know what a selector is?

Nowadays, we have libraries like React, which allows you to create a very poweful frontend application without having to worry about all these low-level details.

- thanks to the React you don't have to worry about the event handling, because it's already taken care of by the library;
- thanks to the React you worry less about performance since they take care of it for you; they even created a compiler that optimizes your code for you;
- thanks to JSX you mix HTML and JavaScript in a way that you don't have to worry about the DOM manipulation;

What about the backend? The same thing.

With all these modern, and powerful frameworks, we barely touch SQL. The ORMs take care of it for us. Concurrency, I myself, have written a single concurrency program in my entire career\*. The tools take care of it for us as well. Do you know how web servers work?

\* While working on the Node.js runtime I had to take care concurrency. Even there I had libuv doing most of the heavy lifting for me.

There's a plethora of abstractions that make our lives easier. All of them solving problems you don't have to think about anymore. This gives you free time to practice, and think about, other things.

These other things can be anything you want. Why not something you're not familiar with? Why not something that is not in your stack? Why not something that is not even related to software development?

I'm pretty sure that it will contribute to your knowledge portfolio. You will be a better specialist on what you're
already working on, and you will be a better generalist as well. 

## This is about us as human beings

In the organizations, maybe it makes sense to have dedicated teams for frontend and backend. But as human beings, we are not made to be specialists. We are made to be generalists. You can, of course, be a backend specialist and never touch anything you qualify as a 'frontend thing'. That's fine.

Even though I mentioned backend and frontend a lot, this is not about it only that. This is about any separation you
think might exist.

Da Vinci was an artist, but he was also a scientist, an engineer, and an inventor. Richard Feynman was a physicist, but he was also a musician, a painter, and a bongo player. They were generalists, and that's what made them so great.

Notice that all of them started somewhere. They focused on their fields, they became experts, but they didn't stop there. They kept learning, exploring, and expanding their knowledge. They were not afraid to step out of their comfort zones and try new things.

If you are just starting your career, you have to become good enough in something. Just don't stop there. Keep learning, keep exploring, and keep expanding your knowledge.

SIDE NOTE: when starting the career you have to focus to be good enough at something. Since I'm talking about professional sofware development, you have to be good enough at delivering value to people. You can do something impressive but still not be good enough to deliver value. This is a topic for another post.

https://martinfowler.com/articles/expert-generalist.html
