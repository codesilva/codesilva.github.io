---
layout: post
title: "How MCPs Became the Lingua Franca of AI Agents: The One-Year Journey from Plugins to Protocol."
date: 2025-11-18
categories: ai, protocols, mcp
tags: model-context-protocol, ai-agents, open-standards
language: en
---

In November 2022, OpenAI released ChatGPT, a groundbreaking AI language model that quickly gained widespread attention
for its ability to generate human-like text based on user prompts. This release marked a significant milestone in the
field of artificial intelligence, showcasing the potential of large language models to assist with a variety of tasks,
from answering questions to generating creative content.

Following the initial release of ChatGPT, OpenAI introduced the [ChatGPT API](https://techcrunch.com/2023/03/01/openai-launches-an-api-for-chatgpt-plus-dedicated-capacity-for-enterprise-customers/) and [plugins](https://openai.com/index/chatgpt-plugins/) in March 2023. 
This allowed companies and developers to leverage the power of ChatGPT within their own applications and services.

Both plugins and the API played a crucial role in expanding the usability and accessibility of ChatGPT allowing the
integration with live data and third-party services.

Other players in the AI space, like Google, quickly followed suit, having their own APIs and integration methods for
their large language models.

On July 2024, I gave a talk at Google I/O Extended Fortaleza talking about a simple chatbot integration using Vertex AI, Firebase and the Gemini 1.5 model. 
In that situation, I used the `Function Calling` feature (the same as the ChatGPT API) to allow the model to interact
with external data sources and provide dynamic responses based on real-time information.

[demo video suggesting posts]

Function Calling/Tools were great but they had a limitation that became apparent as more developers started building
complex applications: tools are tightly coupled to specific model providers. This meant that if a developer wanted to
switch models  they would have to rewrite significant portions of their codebase to accommodate the different APIs and integration methods.

Even in an specific provider ecosystem, to integrate with multiple services, developers had to deal with different APIs
and formats for each service, leading to increased complexity and maintenance overhead.

This situation claimed for a more standardized approach to integrate AI Applications (or Agents) with external services and data sources.
In November 2024, one year ago, Anthropic introduced the Model-Context Protocol (MCP), an open standard designed to
solve these challenges.

[image of with mcp vs without mcp]

## MCP Core Concepts

The MCP Architecture is based on three components: host, client and server. Let's break down each component:

#### MCP Host

The host is the AI application itself. It might have one or more MCP Clients integrated within it to interact with
various MCP Servers and orchestrates the overall workflow with the LLM models.

[image of mcp architecture]

#### MCP Server

This is the easiest to understand. It's just a server that exposes an API to provide access to tha server's
capabilities. For example, think of Asana, the project management tool. It has an MCP Server, in beta version, that
allows AI agents to interact with Asana resources like projects and tasks.

With Asana's MCP Server, the whole workflow of creating projects, adding tasks, assigning them to team members,
and updating their status can be automated through AI agents.

The API of an MCP Server is composed of **resources**, **prompts**, and **tools**.

A [**prompt**](https://modelcontextprotocol.io/specification/2025-06-18/server/prompts) is a template provided by the
server that can be used by the client to generate messages to be sent to the model. 

A [**resource**](https://modelcontextprotocol.io/specification/2025-06-18/server/resources) should be used to provide
contextual information to LLMs such as files, database schemas, and such.

Finally, [**tools**](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) are functionalities that the server exposes to be used by the client. These are similar to function calls in the Function Calling feature of ChatGPT API.

Some of the available tools in [Asana's MCP Server][1] include:

- `asana_create_project`: Create a new project in Asana;
- `asana_create_task`: Add a comment to a task.

Each tool has a name, description, and parameters that define how to use it. Based on this definition, the LLM can
decide when to call a specific tool and with what arguments.
[1]: https://developers.asana.com/docs/using-asanas-mcp-server#available-tools

#### MCP Client

So far I've been saying "the server provides this to the LLM models" or "the LLM can decide to call this tool". This was just to simplify. 

The process of interacting with the server and llm model is orchestrated by the Agent. Claude, for exemple, is an Agent and has within it an MCP Client, which makes it an MCP Host.

Using Claude, I could straightforwardly integrate with Asana's MCP Server:

```bash
claude mcp add --transport sse asana https://mcp.asana.com/sse
```

After starting a session with Claude, I could establish a connection by typing `/mcp` and selecting `asana` in the list. The authentication flow started, and after providing my Asana credentials, I was able to interact with my Asana workspace through Claude.

[oauth asana]

I could create projects and tasks just by asking Claude to do so:

[image of interaction]

## Flow Of Interactions

The flow of interactions in an MCP-based architecture typically follows these steps:

1. The MCP Host (AI application) boots up and initializes its MCP Clients;
2. Each MCP Client connects to its respective MCP Server and fetches the available tools;
3. When the user interacts with the Host, it prompts the LLM model tools and any relevant context;
4. The LLM processes the input and decides whether to call any tools;
5. If a tool is to be called, the Host, through the MCP Client, sends a request to the MCP Server with the necessary
   parameters;
6. The MCP Server processes the request, performs the action, and returns the result to the Host via the MCP Client;
7. The Host then presents the result to the user.

## The Woes and Joys Of MCP

The essense of MCPs is the isolation between the AI Agent and the tool definitions. This brings flexibility and unlocks interoperability. 

MCP is just a protocol, it's does not add much about how you build your agents per si. All the concerns of a google AI application are up to you and you may need some abstractions to make things more robust.

While supported by the great players in this AI landscape, MCPs Servers come with a few security concerns. Especially from the perspective of a client.

When integrating with MCP Servers, the rule of thumb is: only connect to MCP Servers you trust. So far, there is not
an official registry of MCP Servers or a certification authority that validates them. The same way you must not install random
packages from untrusted sources in your system, you should not connect to untrusted MCP Servers.

When implementing MCP Servers, you should be aware that clients may send malformed requests or try to exploit vulnerabilities in your server. Proper validation and sanitization of inputs are essential to ensure the security and integrity of your server.

---

This development
allowed developers to integrate ChatGPT's capabilities into their own applications, enabling a broader range of use
cases and fostering innovation in AI-powered solutions. The API provided access to ChatGPT's functionalities, allowing
for seamless interaction with the model through programmatic means.

chat gpt released in november 2022;
chat gpt api and plugins in march 2023;
https://openai.com/index/openai-api/

first release -> https://openai.com/index/chatgpt/
    https://www.youtube.com/shorts/v1tef33mybI
    https://www.youtube.com/watch?v=e2uvhJ7r1UQ

chatgpt launches an api -> https://techcrunch.com/2023/03/01/openai-launches-an-api-for-chatgpt-plus-dedicated-capacity-for-enterprise-customers/#:~:text=AI-,OpenAI%20launches%20an%20API%20for%20ChatGPT%2C%20plus%20dedicated%20capacity%20for,AM%20PST%20%C2%B7%20March%201%2C%202023
https://blog.codeminer42.com/exploring-the-chatgpt-api/

https://www.youtube.com/shorts/YjS2KAEJCzA
https://www.youtube.com/watch?v=o2M_paJf48I
