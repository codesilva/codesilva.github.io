# Testing Claude Code with Opus and GLM 4.7

Ollam just made it possible for you to use their models inside of Claude Code.

https://x.com/ollama/status/2014977150152224786

in this blog post i will share an experiment i've made, comparing GLM 4.7 vs Claude Opus 4.5 and how Ollama made it
possible to use both models inside of Claude Code.

https://blog.codeminer42.com/setting-up-a-free-claude-like-assistant-with-opencode-and-ollama/

# Common Misleadings

- Claude Code is agent, not the model - what you pay for is the model

# How Ollama Made It Possible

The task of doing this is more tedious than difficult. 

Claude Code, as an agent, just make calls to the Anthropic servers to get model's responses. To get this working with
any API it's a matter of implementing a proxy that translates the calls from Claude Code to the target API.

[image showing]

This is what the Ollama team did, implementing an adapter that translates the calls from Claude Code to Ollama's API.

I'm not saying that this work has no value or that anyone could do it. On the contrary, it's a great work that
requires attention and knowledge of both systems. But it's not something that only Ollama could do.

[claude-code-proxy](https://github.com/1rgs/claude-code-proxy) has made the same thing.

https://github.com/ollama/ollama/tree/main/anthropic

# The Experiment

I've been using OpenCode and Claude Code for a while now. I enjoy OpenCode's flexibility and they have a very ergonomic
TUI. Bettern than Claud Code to be honest.

But Claude Code always got me curious. I know the Opus is a great model, every person who tried it for coding tasks
seems to agree on that.

But I was with this idea that Claude Code has part on this greatness. Now that Ollama made it possible it's a gjod
chance to test the Agent isolated from the model.

I then decided to compare Opus 4.5 vs GLM 4.7 inside Claude Code.

## Setup Claude Code with Ollama

With the latest Ollama version it's very simple to setup Claude Code to use Ollama models. You must set two environment
variables: `ANTHROPIC_BASE_URL` and `ANTHROPIC_AUTH_TOKEN`. The first one must point to your local Ollama server,
usually `http://localhost:11434/v1`. The second can be anything actually.

The step by step guide is:

1. Install Ollama
2. Start Ollama server with `ollama serve`
3. Pull the model that you want to use, e.g. `ollama pull glm-4.7:cloud`
4. Start Claude Code with the environment variables set:

   ```bash
   ANTHROPIC_BASE_URL=http://localhost:11434 ANTHROPIC_AUTH_TOKEN=ollama claude --model glm-4.7:cloud
   ```

[image of claude running glm-4.7]

I'm using GLM 4.7 from the cloud because I don't enough hardware to run it locally. If you have a powerful GPU you can
run the `GLM 4.7 Flash` model locally.

## The Task

There's a common misleading. Since people tend to use Claude Code + Claude models, they think they are the same thing.
Well, they aren't. Claude Code is just a frontend that makes calls to an API that make the [model
inference]().

It's a matter of switching the backend while making it compatible with the frontend.

With that in mind, I decided that I wanted to see Claude Code being backed by Gemini 3. But of course, it's 2026, I didn't want to write code. 

I decided that this would be the perfect task to test both models:



# Results

# Conclusion
