---
layout: post
title: "Google Antigravity Must Be Contained"
date: 2025-11-25
tags: [security, llms, software-development]
category: [llms, security]
---

one of the most secure operating systems out there is Temple OS. they it solves most security issues by simply not having any networking capabilities nor drivers for external storage devices.

temple os, as a software product, is not that different from the applications we build everyday. it turns out that to make something useful, you have to take risks. you have to open up your application to the outside world, you have to let users in, add their data, and let them interact with it. this is where the security issues start to arise.

in llm-based applications, the situation is no different. it's even worse, given the nature of the technology, the variety of places where they are used, and the the fascination around it.

Coding agents, for example, are supposed to help developers write code faster. for that, they need access to the filesystem, (usually) internet, and other resources. this is a huge attack surface, and if not handled properly, it can lead to catastrophic consequences.

## Google Antigravity Erased The User's Disk

One week ago, a user reported on Reddit that Google Antigravity, the new VSCode-like IDE with AI integrated in the wild, had erased their entire disk. it's something very hard to believe, but then they dropped a [video](https://www.youtube.com/watch?v=kpBK1vYAVlA) showing the IDE files and the conversation with the AI assistant. It seems legit.

Regardless of the veracity of this report specifically, AI agents can be very dangerous if not handled properly.

They have access to **your private data** and can run commands on your machine. They can **communicate with the outside world**, which means they can be exposed to **untrusted content**.

These three characteristics, coined by Samon Willison as the [lethal trifecta](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/), make AI agents a potential security nightmare.

[lethal trifecta image]

They have this lifecycle where it takes input from the user, processes it with an LLM, and then takes actions (tool calls).

![Agentic Architecture from Martin Fowler](https://martinfowler.com/articles/agentic-ai-security/agentic-llm.svg)

## How to avoid diasters when using AI Agents?

Coding agents have all the characteristics of the lethal trifecta. if you are building an application that uses them, you need to be very careful.

The Simon Willison's recommendation is to avoid the lethal trifecta combination altogether. For that, you must:

- **sandbox the agent** - run agents in a sandboxed environment with limited access to the system file and network; Use virtual machines,
    containers, or provided [sandboxing tools as in Claude Code](https://code.claude.com/docs/en/sandboxing).
- **avoid exposing the agent to untrusted content** - validate and sanitize inputs before concatenating them into
    prompts and **do not** trust every MCP server out there.

The **isolation** will solve most of the problems since the agent will be in constrained environment. There are other concerns, like branch protection, access to secrets, and so on. For this, refer to [this amazing gist](https://gist.github.com/nateberkopec/fd00106cbcb24c4691b338cd98911da7) by Nate Berkopec where he shares his takeaways on LLM security while coding.
