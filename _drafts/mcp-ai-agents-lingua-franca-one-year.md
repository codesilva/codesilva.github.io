---
layout: post
title: "MCP: How AI Agents Found Their Lingua Franca in One Year"
date: 2025-11-18
categories: ai, protocols, mcp
tags: model-context-protocol, ai-agents, open-standards
language: en
---

In November 2022, OpenAI released ChatGPT, a groundbreaking AI language model that quickly captured widespread attention for its ability to generate human-like text. This release marked a pivotal moment in artificial intelligence, demonstrating the potential of large language models to assist with a wide range of tasks.

By March 2023, OpenAI expanded ChatGPT's ecosystem with an [API](https://techcrunch.com/2023/03/01/openai-launches-an-api-for-chatgpt-plus-dedicated-capacity-for-enterprise-customers/) and [plugin system](https://openai.com/index/chatgpt-plugins/). These additions enabled developers to integrate ChatGPT's capabilities into their own applications, allowing seamless interaction with live data and third-party services. Competitors like Google quickly followed with their own APIs and integration methods for large language models.

In July 2024, I demonstrated this integration pattern at Google I/O Extended Fortaleza, where I built a chatbot using Vertex AI, Firebase, and the Gemini 1.5 model. The implementation leveraged the `Function Calling` feature, similar to ChatGPT's API, to enable interaction with external data sources.

The demo below show it in action. A chat that based know when to ask for user's actions like post suggestions (texts are in PT-BR).

<iframe width="560" height="315" src="https://www.youtube.com/embed/PvemTFaU53c" title="Keyboard demo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## The Integration Challenge

While **Function Calling/Tools** proved powerful, they revealed a critical limitation as applications scaled: they required writing custom wrappers for every API you want to integrate. With each service having its own unique API, developers faced the daunting task of creating and maintaining bespoke code for each integration.

This challenge called for a standardized approach to connect AI applications with external services and data sources. Almost exactly one year ago, in November 2024, Anthropic introduced the Model Context Protocol (MCP), an open standard designed to address these challenges.

![Image showing comparison between Agents with MCP or without MCP](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/21111256/without_mcp-vs_with_mcp-1024x289.webp)

## MCP Core Concepts

MCP architecture centers on three components: host, client, and server. Here's how they work together:

#### MCP Host

The host is the AI application itself (what we typically call an AI Agent). It integrates one or more MCP clients to interact with various MCP servers, orchestrating the overall workflow with LLM models.

![](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/21111458/mcp-arch-1024x377.webp)

#### MCP Server

An MCP server exposes capabilities through a standardized API. Consider Asana's project management tool: their MCP server (currently in beta) enables AI agents to interact with Asana resources, such as projects and tasks. This enables complete workflow automation, including creating projects, adding tasks, assigning team members, and updating statuses.

The server API consists of three elements:

- **[Prompts](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts)**: Templates for generating messages to send to models
- **[Resources](https://modelcontextprotocol.io/specification/2025-06-18/server/resources)**: Contextual information for LLMs, such as files and database schemas
- **[Tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools)**: Executable functionalities exposed to clients (similar to function calls in ChatGPT's API)

Asana's MCP server provides tools like:
- `asana_create_project`: Create new projects
- `asana_create_task`: Add comments to tasks

Each tool includes a name, description, and parameters, enabling the LLM to determine when and how to invoke it.

#### MCP Client

The agent orchestrates the interaction between servers and LLM models. Claude, for example, contains an MCP client within it, making it both an AI Agent and an MCP host. Integrating with Asana's MCP server requires just one command:

```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

After configuration, typing `/mcp` and selecting `asana` initiates the authentication flow. Once credentials are provided, Claude can interact directly with your Asana workspace.

![](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/21111604/asana-oauth-979x1024.webp)

Projects and tasks can be created simply by asking Claude to do so:

![](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/21121052/claude-session-1-1024x471.webp)

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

MCP's core strength lies in isolating AI agents from tool definitions, providing flexibility, and enabling interoperability. However, MCP is simply a protocol, it doesn't prescribe how to build robust agents. All concerns about building quality AI applications remain your responsibility, often requiring additional abstractions.

While major AI players support MCP, servers introduce security considerations, particularly from the client perspective.

**For MCP clients:** Only connect to trusted MCP servers. Currently, no official registry or certification authority is validating MCP servers—similar to how you shouldn't install random packages, you shouldn't connect to untrusted servers.

**For MCP server implementations:** Expect that clients may send malformed requests or attempt exploits. Proper input validation and sanitization are essential for maintaining security and integrity.
