# Features and Benefits

| Features | Benefits |
| --- | --- |
| Using Web Speeh API |  |
| Leveraging LLMs for build amazing apps |  |
| Know the building blocks of agent building |  |
| know which ruby tools are available for buildint agents |  |

# 4U's

- Urgency: (1)
- Uniqueness: Very unique! It talks about ai agents on voice using ruby and rails (4)
- Ultra-specific: Rails-centric (3)
- Useful: useful, in this ai age, knowing how to build ai agents is very useful (4)

# Showing a Need

As LLMs become more powerful, users expect more engaging and interactive experiences. Voice interfaces arise as a very
natural way for users to interact with applications, providing hands-free and intuitive access to information and
services.

# Satisfying the Need

With the right tools and techniques, Rails developers can build sophisticated AI voice agents that enhance user
experiences either in-browser or server-side. By leveraging the Rails ecosystem, developers can create seamless voice
interactions without leaving their familiar environment.

## Title

Beyond CRUD: Building Conversational AI Agents in Rails

## Abstract

This talk explores the trend of multimodal interactions with Large Language Models (LLMs), focusing on voice interfaces.

It highlights how Rails developers can leverage tools like RubyLLM, Stimulus, and Action Cable to build AI voice agents that provide natural and engaging user experiences. 

It covers the building blocks of AI Agents, in-browser vs server-side architectures, transport layers for audio streaming, token optimization strategies, Retrieval-Augmented Generation (RAG), function calling, and tool integration.

# Detailed Description

## Pitch

It's 2026, AI agents are everywhere. Unserstading how to leverage LLMs for buildind this kind of application is a must-have skill for developers.

As many providers are developing multimodal models, we can see a trend towards more natural and intuitive ways for users to interact with applications. Voice interfaces are becoming increasingly prevalent, offering hands-free access to information and services.

Working on a software boutique that delivers high-quality software solutions using Rails and AI, I've been involved in a couple of projects that required building AI voice agents.

In this talk, I'll share insights and practical knowledge on how Rails developers can build AI voice agents using the Rails ecosystem.

## Outcomes

After attending this talk, the audience should know:

1. The building blocks of AI agents and how to architect voice agents
2. Ruby and Rails tools available for building AI agents
3. The trade-offs between in-browser and server-side architectures for voice agents

## Outline

### Introduction

- Discuss how AI applications are not a Python-only domain anymore show the difference between AI/Context and ML Engineering
- Review the state of LLMs and their capabilities (e.g., tool calling, intrusction-following, multimodal inputs)

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

---


# RailsConf CFP Proposal: Building AI Voice Agents in the Rails Ecosystem

## Elevator Pitch

Voice AI isn't just for Python developers anymore. In this hands-on session, I'll show Rails developers how to build sophisticated AI voice agents that work completely in the browser or server-side—using familiar Rails tools like RubyLLM, Stimulus, and Action Cable. No black-box platforms, no ecosystem abandonment, just pure Rails magic that transforms how users interact with your applications.

---

## **Talk Title**

Beyond CRUD: Building Conversational AI Agents in Rails

## **Abstract**

The future of human-computer interaction is voice-driven. This talk explores how Rails developers can build sophisticated AI voice agents that work seamlessly both in the browser and on the server. We'll dive into the Rails ecosystem tools—RubyLLM, Stimulus, and Action Cable—to create conversational AI that feels natural and responsive. Drawing from real-world implementations, you'll learn how to architect voice agents that handle everything from customer service to interactive tutorials, all while staying within the familiar Rails conventions you love.

## **Description / Detailed Outline**

### Problem or Gap Being Addressed

Voice AI is transforming user experiences, but Rails developers often feel left behind in a Python/JavaScript-dominated landscape. Most solutions require leaving the Rails ecosystem or accepting black-box platforms that don't integrate well with existing Rails applications. This creates a knowledge gap and practical barrier for Rails teams wanting to implement conversational AI.

### Concepts, Technologies, and Lessons Covered

**Voice Agent Architecture:**
- The STT (Speech-to-Text) → LLM (Large Language Model) → TTS (Text-to-Speech) pipeline
- How to implement this pipeline entirely in Ruby using RubyLLM and browser APIs
- Comparison between browser-based and server-side processing

**Rails Integration:**
- **RubyLLM** for seamless language model interactions
- **Stimulus** for browser audio capture and playback with Web Speech API
- **Action Cable** for real-time audio streaming and bi-directional communication
- **Rails Active Storage** for audio recording management
- **Background jobs** for async processing of long-running audio generations

**Transport Layers:**
- WebRTC vs WebSockets for audio streaming in Rails
- Implementing real-time communication with Action Cable
- Handling latency and connection management

**Token Optimization & Context Management:**
- Smart strategies for summarizing conversation history
- Rails caching patterns for prompt optimization
- Rate limiting and cost management techniques

**RAG (Retrieval-Augmented Generation):**
- Integrating Rails models and databases as knowledge bases
- Using ActiveRecord with vector embeddings
- Building domain-specific agents that know your data

**Function Calling & Tool Integration:**
- Rails-aware tools that allow voice agents to interact with your application
- Creating voice-enabled CRUD operations
- Authentication and authorization in voice interfaces
- Webhook handling for asynchronous tool execution

**Browser vs Server Trade-offs:**
- When to process audio client-side vs server-side
- Performance considerations and benchmarks
- Privacy implications of each approach
- Progressive enhancement strategies

### How the Talk Will Be Delivered

**Live Demo:**
Building a voice-powered Rails assistant that can:
- Answer questions about your codebase
- Create migrations on command ("Create a posts table with title and body")
- Query database records via voice ("How many users signed up today?")
- Trigger background jobs ("Send a welcome email to the last user")

**Code Walkthrough:**
- Stimulus controller handling browser audio capture and Web Speech API integration
- Action Cable channel for real-time audio streaming
- RubyLLM service objects for LLM interactions
- Rails models integrated with RAG for domain knowledge
- Background job workers for processing audio generations

**Architecture Diagrams:**
- Visual explanations of audio flow through Rails applications
- Comparison diagrams: browser-only vs hybrid vs server-only architectures
- Data flow diagrams showing voice requests through the Rails stack

**Performance Metrics:**
- Real benchmarks comparing different approaches
- Latency measurements for various LLM providers
- Cost analysis of different token optimization strategies

## **Target Audience**

Rails developers (intermediate to advanced) who are curious about AI but overwhelmed by the Python-centric ecosystem. This talk is perfect for:
- Teams maintaining existing Rails applications who want to add voice capabilities without a complete rewrite
- Developers interested in the intersection of conversational AI and web frameworks
- Engineers exploring ways to keep Ruby/Rails competitive in the modern AI landscape
- Product managers and architects evaluating voice AI solutions within their Rails infrastructure

## **Learning Outcomes / Takeaways**

1. **Implement a working voice agent** in a Rails application within minutes using RubyLLM and browser APIs
2. **Architect robust audio pipelines** that handle real-time streaming with Action Cable and WebRTC
3. **Optimize costs and latency** through smart context aggregator_pair_id1. The user wants me to 
