---
layout: post
title: 'Configuring OpenCode + Ollama as a Local Alternative to Claude Code'
date: 2025-11-03
lang: pt-BR
category: ["ai", "ollama"]
private: false
---

i've been playing with Claude Code for a while, and there is not doubt that it's a powerful assistant, capable of doing
a lot of things as a coding partner. While it's very capable, it's also a paid service, and depending on your budget, 
it might not be a viable option and you need to explore other alternatives.

There are a few options you can consider. One of them is [OpenCode](https://opencode.ai/), an
open-source coding assistant that can be configured to work with various LLM providers and models, including local ones.

## Your Local Alternative with Ollama

Installing **OpenCode** is straightforward. You can do it by running the following command in your terminal:

`curl -fsSL https://opencode.ai/install | bash`

There are other installation methods available in the [official documentation](https://opencode.ai/docs/#install).

Once it's installed, the command `opencode` should be available in your terminal. Running it will start the TUI
(Terminal User Interface) for OpenCode.

[image of opencode running]

In my installation, the tool came with two free models by default: `big-pickle` and `grok-code`. These models are provided by
the OpenCode team. They are part of a curated list that includes [other models](https://opencode.ai/docs/zen/#models) from different providers.

I'm using [Ollama](https://ollama.com/) to run local models. I was looking to experiment with the `qwen3-coder` model, which I have great expectations for, given my experience with other models in Qwen series.

With a file named `opencode.json` in my home configuration directory (`~/.config/opencode/`), I configured OpenCode to use Ollama as the provider and `qwen3-coder` as the model.

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

The baseURL points to my local Ollama server, which is running on port `11434`. Observe that the model is specified as `ollama/qwen3-coder:480b-cloud`, which indicates that this model is hosted in [Ollama Cloud](https://ollama.com/cloud). That's due to my hardware limitations; I don't have enough resources to run the full model locally.
If you have a powerful machine, you can run the model locally by changing the model name to `ollama/qwen3-coder:480b`, or the smaller one `ollama/qwen3-coder:30b`, [available for local use](https://ollama.com/library/qwen3-coder).

I can, for example, add any other model I have running locally just by adding it to the `models` section of the configuration file.

[image of ollama list]

To add `mistral` model from Ollama, I would add the following entry to the `models` section:

```jsonc
"mistral": {
  "name": "Mistral"
}
```

**NOTE:** The model to be used must support `tools`. You can check model capabilities by running `ollama show <model-name>`.

After configuring, to select the model, type `/models` which will open the model selection menu.

https://opencode.ai/docs/providers/
