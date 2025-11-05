
open code is this alternative to claude (https://opencode.ai/)

How is this different than Claude Code?

    It's very similar to Claude Code in terms of capability. Here are the key differences:

    100% open source
    Not coupled to any provider. Although Anthropic is recommended, OpenCode can be used with OpenAI, Google or even local models. As models evolve the gaps between them will close and pricing will drop so being provider-agnostic is important.
    Out of the box LSP support
    A focus on TUI. OpenCode is built by neovim users and the creators of terminal.shop; we are going to push the limits of what's possible in the terminal.
    A client/server architecture. This for example can allow OpenCode to run on your computer, while you can drive it remotely from a mobile app. Meaning that the TUI frontend is just one of the possible clients.

https://opencode.ai/docs/providers/#ollama

in this link, one can configure ollama models like qwen3-coder

configuration can be either perproject or global

global it should be at: ~/.config/opencode/opencode.json

mine is:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "ollama": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "Ollama (local)",
      "options": {
        "baseURL": "http://localhost:11434/v1"
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

okay it has two kind of agents:
- planning agent
- build agent

https://opencode.ai/docs/modes/
