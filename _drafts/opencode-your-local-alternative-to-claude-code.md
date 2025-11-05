---
layout: post
title: 'Configuring OpenCode + Ollama as a Local Alternative to Claude Code'
date: 2025-11-03
lang: pt-BR
category: ["ai", "ollama"]
private: false
---

I've been experimenting with Claude Code for a while, and there is no doubt that it's a powerful assistant, capable of performing numerous tasks as a coding partner. While it's competent, it's also a paid service, and depending on your budget, it may not be a viable option; therefore, you should explore other alternatives.

There are several options you can consider. One of them is [OpenCode](https://opencode.ai/), an open-source coding assistant that can be configured to work with various LLM providers and models, including local ones.

## Your Local Alternative with Ollama

Installing **OpenCode** is straightforward. You can accomplish this by running the following command in your terminal:

`curl -fsSL https://opencode.ai/install | bash`

Additional installation methods are available in the [official documentation](https://opencode.ai/docs/#install).

Once installed, the command `opencode` should be available in your terminal. Executing it will start the TUI (Terminal User Interface) for OpenCode.

![OpenCode assistant running](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/05154038/opencode1-1024x621.webp)

In my installation, the tool came with two free models by default: `big-pickle` and `grok-code`. These models are provided by the OpenCode team. They are part of a curated list that includes [other models](https://opencode.ai/docs/zen/#models) from different providers.

I'm using [Ollama](https://ollama.com/) to run local models. I was eager to experiment with the `qwen3-coder` model, which I have high expectations for, given my experience with other models in the Qwen series.

With a file named `opencode.json` in my home configuration directory (`~/.config/opencode/`), I configured OpenCode to use Ollama as the provider and `qwen3-coder` as the chosen model.

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen3-coder:480b-cloud", // set default model
  "provider": {
    "ollama": { // provider id
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama",
      "options": {
        "baseURL": "http://localhost:11434/v1"
      },
      "models": {
        "qwen3-coder:480b-cloud": { // configure the model
          "name": "Qwen3 Coder 480B Cloud"
        },
      }
    }
  }
}
```

The baseURL points to my local Ollama server, which is running on port `11434`. Note that the model is specified as `ollama/qwen3-coder:480b-cloud`, which indicates that this model is hosted in [Ollama Cloud](https://ollama.com/cloud). That's due to my hardware limitations; I don't have sufficient resources to run the complete model locally. If you have a powerful machine, you can run the model locally by changing the model name to `ollama/qwen3-coder:480b`, or the smaller one `ollama/qwen3-coder:30b`, [available for local use](https://ollama.com/library/qwen3-coder).

I can, for instance, incorporate any other model I have running locally simply by adding it to the `models` section of the configuration file.

![Listing available models with the command "ollama list"](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/05154110/ollamalist-1024x274.webp)

To incorporate the `mistral` model from Ollama, I would add the following entry to the `models` section:

```jsonc
"mistral": {
  "name": "Mistral"
}
```

**NOTE:** The model to be used must support `tools`. You can check model capabilities by running `ollama show <model-name>`.

After configuring, select the model by typing `/models`, which will open the model selection interface.

![Listing available models on OpenCode](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/05154319/modellist.webp)

That's it! Get your Ollama server up and running with your desired models, configure OpenCode, and start coding with your local AI assistant - no need to be dependent on paid services.

## Connecting To Ollama Cloud Using API Key

When a model is hosted in Ollama Cloud, having a local Ollama server is not required; simply connect to the cloud endpoint.

First, establish the API key by running the command.

```
opencode auth login
```

This command opens a prompt requesting details about the provider. Regarding the version of OpenCode I'm using (1.0.25), Ollama is not listed there. I selected "Other", set the provider ID to `ollama`, and provided the API key.

![](https://d604h6pkko9r0.cloudfront.net/wp-content/uploads/2025/11/05154415/opencode-auth-login-1024x287.webp)

It warns:

> This only stores a credential for ollama - you will need configure it in opencode.json, check the docs for examples.

I needed to modify the configuration file to point to the cloud endpoint:

```jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "model": "ollama/qwen3-coder:480b-cloud",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama",
      "options": {
        "baseURL": "https://ollama.com/v1" // point to cloud endpoint
      },
      "models": {
        "qwen3-coder:480b-cloud": {
          "name": "Qwen3 Coder 480B Cloud"
        }
      }
    }
  }
}
```

Pretty simple. After incorporating the API key, it's just a matter of configuring the baseURL to point to the cloud endpoint.

## Connecting to Claude Models Using API Key

I wanted to test the capabilities of OpenCode compared to Claude Code. The fairest way to do that is to connect OpenCode to the same models used by Claude Code. It turns out that it's possible, and even easier than configuring Ollama.

Using the same command:

```
opencode auth login
```

It is possible to connect to Anthropic models used by Claude Code. In this case, select "Anthropic" as the provider, and provide the API key.

You can try any other [Provider available](https://opencode.ai/docs/providers/). There are a couple of them.

## Final Thoughts

I've just started exploring OpenCode, and so far, I'm impressed with its capabilities and flexibility. Here, I demonstrated how to configure it to work with Ollama and local models, but there are many other possibilities, like agents, MCP, ACP, formatting, and more.

If you're looking for a local alternative to Claude Code, give OpenCode a try. It's open-source, provider-agnostic, and has a growing community. Happy coding!
