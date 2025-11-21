---
layout: post
title: "MCP: How AI Agents Found Their Lingua Franca in One Year"
date: 2025-11-18
categories: ai, protocols, mcp
tags: model-context-protocol, ai-agents, open-standards
language: en
---

In November 2022, OpenAI released ChatGPT, a groundbreaking AI language model that quickly captured widespread attention for its ability to generate human-like text. This release marked a pivotal moment in artificial intelligence, demonstrating the potential of large language models to assist with diverse tasks.

By March 2023, OpenAI expanded ChatGPT's ecosystem with an [API](https://techcrunch.com/2023/03/01/openai-launches-an-api-for-chatgpt-plus-dedicated-capacity-for-enterprise-customers/) and [plugin system](https://openai.com/index/chatgpt-plugins/). These additions enabled developers to integrate ChatGPT's capabilities into their own applications, allowing seamless interaction with live data and third-party services. Competitors like Google quickly followed with their own APIs and integration methods for large language models.

In July 2024, I demonstrated this integration pattern at Google I/O Extended Fortaleza, building a chatbot using Vertex AI, Firebase, and the Gemini 1.5 model. The implementation leveraged the `Function Calling` feature—similar to ChatGPT's API—to enable interaction with external data sources.

[demo video suggesting posts]

While Function Calling and Tools proved powerful, they revealed a critical limitation as applications grew more complex: tight coupling to specific model providers. Switching between models required substantial code rewrites to accommodate different APIs and integration methods. Even within a single provider's ecosystem, integrating multiple services meant handling different APIs and formats for each, increasing complexity and maintenance overhead.

This challenge called for a standardized approach to connect AI applications with external services and data sources. In November 2024—exactly one year ago—Anthropic introduced the Model Context Protocol (MCP), an open standard designed to address these challenges.

[image of with mcp vs without mcp]

## MCP Core Concepts

MCP architecture centers on three components: host, client, and server. Here's how they work together:

#### MCP Host

The host is the AI application itself (what we typically call an AI Agent). It integrates one or more MCP clients to interact with various MCP servers, orchestrating the overall workflow with LLM models.

[image of mcp architecture]

#### MCP Server

An MCP server exposes capabilities through a standardized API. Consider Asana's project management tool: their MCP server (currently in beta) allows AI agents to interact with Asana resources like projects and tasks. This enables complete workflow automation—creating projects, adding tasks, assigning team members, and updating statuses.

The server API consists of three elements:

- **[Prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)**: Templates for generating messages to send to models
- **[Resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)**: Contextual information for LLMs such as files and database schemas
- **[Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)**: Executable functionalities exposed to clients (similar to function calls in ChatGPT's API)

Asana's MCP server provides tools like:
- `asana_create_project`: Create new projects
- `asana_create_task`: Add comments to tasks

Each tool includes a name, description, and parameters—enabling the LLM to determine when and how to invoke it.

#### MCP Client

The interaction between servers and LLM models is orchestrated by the agent. Claude, for example, contains an MCP client within it, making it both an AI Agent and an MCP host. Integrating with Asana's MCP server requires just one command:

```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

After configuration, typing `/mcp` and selecting `asana` initiates the authentication flow. Once credentials are provided, Claude can interact directly with your Asana workspace.

[oauth asana]

Projects and tasks can be created simply by asking Claude to do so:

[image of interaction]

## Flow of Interactions

MCP-based architectures typically follow these steps:

1. The MCP host (AI application) boots up and initializes its MCP clients
2. Each MCP client connects to its respective MCP server and fetches available tools
3. When users interact with the host, it prompts the LLM with relevant context
4. The LLM processes input and determines whether to invoke any tools
5. If tool invocation is needed, the host sends requests through the MCP client to the MCP server with appropriate parameters
6. The MCP server processes requests, performs actions, and returns results via the MCP client
7. The host presents results to users

## The Woes and Joys of MCP

MCP's core strength lies in isolating AI agents from tool definitions, providing flexibility and enabling interoperability. However, MCP is simply a protocol—it doesn't prescribe how to build robust agents. All concerns about building quality AI applications remain your responsibility, often requiring additional abstractions.

While major AI players support MCP, servers introduce security considerations, particularly from the client perspective.

**For MCP clients:** Only connect to trusted MCP servers. Currently, there's no official registry or certification authority validating MCP servers—similar to how you shouldn't install random packages, you shouldn't connect to untrusted servers.

**For MCP server implementations:** Expect that clients may send malformed requests or attempt exploits. Proper input validation and sanitization are essential for maintaining security and integrity.
