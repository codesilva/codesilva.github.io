---
layout: post
date: 2026-01-08
categories: [tech, ai, business]
---

# How AI cut 80% of Tailwind's Revenue by Disrupting the Traditional Documentation Funnel
# 75% laid off: How LLMs are Killing Tailwind

Tailwind CSS, you probably know what it is. A utility-first CSS framework that has taken the web development world by
storm. It's the default of many frameworks and tools, like Ruby on Rails, Phoenix, and Next.js. 

What you may not know is that Tailwind has a paid service called Tailwind PLUS (formerly Tailwind UI), which offers
premium components and templates for developers.

This service has been a significant revenue stream for the company behind Tailwind CSS and now, it's facing a massive disruption due to the rise of Large Language Models (LLMs).

# The Disruption of Documentation

Do you remember the last time you read the documentation of a library or framework? Be honest.

Even before LLMs, people often turned to alternatives like Stack Overflow to avoid reading documentation. Now we have a powerful tool that can generate code snippets, components, and even entire templates on demand.

It can even synthesize information from multiple sources, making it easier for developers to find what they need without sifting through pages of documentation.

#### What is has to do with Tailwind PLUS?

The way tailwind works is by providing class names that you can use to style your HTML elements. Even though it's close to CSS, it has some differces that require some repetition on the documentation.

In my first experience with Tailwind, I found myself googling a lot for things like "flex tailwind" or "grid tailwind" to find the right classes to use. 

And you need to, because even though most classes are pretty intuitive, there are many edge cases. 

[font style image]

<small>not-italic === font-style: normal</small>

They flow people go to reach Tailwind PLUS is from this traffic:

User -> Google Search -> Tailwind Documentation -> Tailwind PLUS

It turns out this flow has been severely disrupted by LLMs. Now, instead of going through the documentation, developers can simply ask an LLM for the code and explanations they need.

User -> LLM -> Code Snippet

# How Tailwind is affected

Last year, a [PR](https://github.com/tailwindlabs/tailwindcss.com/pull/2388) was opened to the tailwindcss.com repository.

[image of the PR]
> Add /llms.txt endpoint that serves a concatenated, text-only version of all Tailwind CSS documentation pages optimized for Large Language Model consumption.

Only two days ago it got an answer from Adam Wathan, the creator of Tailwind CSS:

[https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3715074726]

People got disappointed with such an anwer. Of course, making it easy to use your library with LLMs is supposed to be a good thing, right?

Unfornunately, not for Tailwind. Getting LLMs in the middle reduces the traffic to their documentation, which in turn reduces the number of people that eventually reach Tailwind PLUS.

Adam is very transparent about the situation:

> 75% of the people on our engineering team lost their jobs here yesterday because of the brutal impact AI has had on our business...

He also reports that traffic to the documentation has dropped by 40% since early 2023 (the beggining of ChatGPT).

The impact on revenue is huge: 80% drop in revenue from Tailwind PLUS.

https://github.com/tailwindlabs/tailwindcss.com/pull/2388#issuecomment-3717222957

# Conclusion

You and me use open source software every day. While free for us, people working on these projects have to make a living. Some projects rely entirely on donations, others have paid services or support plans.

The rise of LLMs is disrupting the traditional ways people interact with documentation, which can have severe consequences for projects that rely on documentation traffic to drive revenue.

Adam finishes the discussion with a hopeful note: `Going to lock this one as it's spiraling a bit. Appreciate the support from everyone ❤️ We'll figure it out!`
