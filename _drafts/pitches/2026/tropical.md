## Title

Beyond CRUD: Building Conversational AI Agents in Rails

## Abstract

This talk explores the trend of multimodal interactions with Large Language Models (LLMs), focusing on voice interfaces.

You will see how you can leverage tools like RubyLLM, Stimulus, and Action Cable to build AI voice agents that provide natural and engaging user experiences. 

It covers the building blocks of AI Agents, in-browser vs server-side architectures, transport layers for audio streaming, token optimization strategies, Retrieval-Augmented Generation (RAG), and tools integration.

# Detailed Description

## Pitch

It's 2026, AI agents are everywhere. Understanding how to leverage LLMs for building this kind of application is a must-have skill for developers.

As many providers are developing multimodal models, we can see a trend towards more natural and intuitive ways for users to interact with applications. Voice interfaces are becoming increasingly prevalent, offering hands-free access to information and services.

While working on a software boutique that delivers high-quality software solutions using Rails and AI, I've been involved in a couple of projects that required building AI voice agents.

In this talk, I'll share insights and practical knowledge on how Rails developers can build AI voice agents using the Rails ecosystem.

## Outcomes

After attending this talk, the audience should know:

1. The building blocks of AI agents and how to architect voice agents
2. Ruby and Rails tools available for building AI agents
3. The trade-offs between in-browser and server-side architectures for voice agents

## Outline

### Introduction

- Discuss how AI applications are not a Python-only domain anymore show the difference between AI/Context and ML Engineering
- Review the state of LLMs and their capabilities (e.g., tool calling, instruction-following, multimodal inputs)

### AI Agents Building Blocks

- Go through the basic components of any AI Agent:
    1. Tool/Function Calling
    2. Memory/Context Management
    3. Human-in-the-loop

### Architecting Voice Agents

- Explain the STT (Speech-to-Text) → LLM (Large Language Model) → TTS (Text-to-Speech) pipeline
- Discuss the differences between in-browser and server-side processing
    - depending on the use case, one can even run models directly in the browser using [transformers.js](https://huggingface.co/docs/transformers.js/index)

### Ruby and Rails Tools for Building (Voice) AI Agents

- Introduce RubyLLM for LLM interactions
- Show how to use Stimulus for browser audio capture and playback with Web Speech API
- Explain how to use Action Cable for real-time audio streaming and bi-directional communication

### Conclusion

- Go over security and privacy considerations when building AI Agents
- Discuss challenges of building voice agents
- Share resources for further learning

## Why This Talk Matters

Large Language Models (LLMs) have been around for a while. They are a thing. They are too big to ignore. Developers need to understand how to leverage LLMs to build AI-powered applications.

Within this context, multimodal interactions are trending. It's not a coincidence that more and more providers are working on multimodal models. Voice interfaces are becoming more prevalent as they offer a natural and intuitive way for users to interact with applications.

Combining voice interfaces with LLMs can create powerful and engaging user experiences.
