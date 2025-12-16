## Title

Beyond CRUD: Building Conversational AI Agents in Rails

## Abstract

Text-based chatbots are old news. Users now expect fluid, multimodal voice interactions, but most tutorials still point you to Python.

In this talk, we will break that cycle by building a real-time AI voice agent using the stack you already love: Rails, Action Cable, and Stimulus. We will cover the full pipeline, from browser audio capture to server-side LLM processing, proving that Rails is the perfect home for the next generation of AI interfaces.

# Detailed Description

## Pitch

It’s April 2026. AI agents are everywhere, and the "chatbox in the corner" is no longer enough. As multimodal models become standard, users demand natural, hands-free voice interactions. For many Rails developers, this domain feels inaccessible or requires a complex microservice architecture in Python.

It doesn’t have to be that way.

In the last couple months, I've helped our teams to build and launch a production-grade call center AI agent and a voice-driven product feedback collector. 

For this talk, I apply the concepts learned from those projects to architect a voice-first AI agent entirely within the Ruby on Rails ecosystem.

This talk is a practical deep dive into architecting voice-first agents without leaving the Ruby ecosystem.

## Outcomes

After attending this talk, the audience should know:

1. The building blocks of AI agents and how to architect voice agents
2. Ruby and Rails tools available for building AI agents
3. The trade-offs between in-browser and server-side architectures for voice agents

Handling interruptions and turn-taking (barge-i

## Outline

### Intro: The State of Agents in 2026

- Why "Multimodal" is the new trend.
- The shift from simple "context stuffing" to genuine Agentic workflows (Tool usage, Memory).
- Why Rails (and Ruby) is a great fit for building AI Agents.

### The Anatomy of a Voice Agent

- The Pipeline: Speech-to-Text (STT) → LLM Brain → Text-to-Speech (TTS).
- Why standard HTTP requests fail for voice, and why streaming is non-negotiable.

### Building it in Rails (Code & Architecture)

- The Ears (Stimulus & Web Speech API): Capturing audio in the browser and streaming binary data over WebSockets.
- The Nervous System (Action Cable): Managing bi-directional streams for real-time conversation.
- The Brain (RubyLLM): Hooking into model providers (OpenAI/Anthropic) with tool calling capabilities.

### Case Studies

- A voice agent for helping elderly users, like Gogograndparent, to request services like Uber, medication refills, and grocery deliveries.
- How to handle interruptions and turn-taking (barge-in) in real-time conversations.

### Security, Privacy, and Cost Considerations

- How to sanitize/validate input before processing.
- Discuss the best practices for handling sensitive audio data.

### Conclusion

- Share resources for further learning.
- Encourage experimentation and innovation in the Rails community.

## Why This Talk Matters

Large Language Models (LLMs) have been around for a while and are too big to ignore. Developers need to understand how to leverage LLMs to build AI-powered applications.

Within this context, multimodal interactions are trending. It's not a coincidence that more and more providers are working on multimodal models. Voice interfaces are becoming more prevalent as they offer a natural and intuitive way for users to interact with applications.

Combining voice interfaces with LLMs can create powerful and engaging user experiences.
