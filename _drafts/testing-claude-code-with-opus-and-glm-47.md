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

> Ollama just implemented an adapter for Claude Code
>
> https://github.com/ollama/ollama/blob/main/anthropic/anthropic.go
>
> It acts as a proxy, requests are sent to Ollama API instead of antrhopic server.
>
> I want you to implement a proxy like this to Vertex API, but it should be in Node.js.
>
>  Make direct calls as in the following curl. Don't install any library for calling Vertex api.
>
>  curl "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-pro-preview:streamGenerateContent?key=YOUR_API_KEY" \
>     -X POST \
>     -H "Content-Type: application/json" \
>     -d '{
>         "contents": [
>             {
>                 "role": "user",
>                 "parts": [
>                     {
>                         "text": "Explain how AI works in a few words"
>                     }
>                 ]
>             }
>         ]
>     }'
>
> I will provide the API key through CLI. It should get a server running. Claude Code will be pointed to it.

This is a simple prompt. I give the reference to the Ollama implementation, the curl to call Vertex API and I just want a Node.js server that acts as a proxy.

A good outcome should give me a working proxy server that could talk to Claude Code. It doesn't need to be perfect, but should be functional.

# Results

From syntax errors to wrong implementations, both models did what I think is a good job for an assistant. One of them however stood out.

Let's see the timeline of both attempts starting with GLM 4.7.

## GLM 4.7

I gave the prompt and one minute later I got an implementation. I get the server running, no programming errors but Claude Code was unable to get a response from the server. I sent a "hello" to it and got no response.

The agent's next step was to debug. It added console logs (as every good Node.js developer does) and I tested again.

Things were looking better - a response was coming back to Claude Code, but it was an error from Vertex API.

```bash
❯ API Error: 400 {"error":{"type":"api_error","message":"Vertex AI returned 
  400: [{\n  \"error\": {\n    \"code\": 400,\n    \"message\": \"Invalid   
  JSON payload received. Unknown name \\\"text\\\" at                       
  'system_instruction.parts[0]': Proto field is not repeating, cannot       
  start list.\\nInvalid JSON payload received. Unknown name \\\"$schema\\\" 
  at 'tools[0].function_declarations[0].parameters': Cannot find            
  field.\\nInvalid JSON payload received. Unknown name                      
  \\\"exclusiveMinimum\\\" at                                               
```
Error was longer than this but you get the idea. 

The issue was found, it was due to a mismatch between the JSON sento to Anthropic and the one expected by Vertex API.

```
⏺ I see the issues. Vertex AI has two main problems:

  1. System instruction format - The parts field structure is different for system instructions
  2. Tool schema conversion - Anthropic uses full JSON Schema (with $schema, exclusiveMinimum, propertyNames) but Vertex AI only supports a subset
```

It claimed it was fixed, I tried again and got a 400 error again. I wanted to help but it was hard to understand the
logs. There was too much information. It was printing a whole JSON payload that was too long.

The model then "improved" it by truncating the logs. It helped. I could see the proxy was making calls using a wrong
model name. It should be using the model name that comes from the request, not a hardcoded one.


```
⏺ Done. The logging is now much cleaner:

  - Truncates long strings (>200 chars) and large objects (>500 chars)
  - Hides tool parameters and schema (just shows tool names)
  - Simplified request logging (just shows method/path)
  - Removed verbose debug logs for headers, body content, and Vertex candidates
```

The error persisted for the next two attempts. It was doind some replace on top of the model that was coming in the request. I have no idea why.

I then suggested it to just use the model from the request.

```
❯ theres no need to replace anything

  just do this

  const model = anthropicReq.model;
```

#### Claude Code uses multiple models

Claude Code makes multiple calls to models when you interact with it and it is clever enough to route requests to differnent models when needed. 

Since in my tests I was sendin a simple "hello" prompt, it was using a smaller model for that. That's great, there's no
need to use a big and expensive model for simple tasks.

#### Back to GLM

It broke again. The proxy was sending requests to Vertext with the model named `claude-haiku-4-5-20251001`.

I requested a mapping from Claude models to Vertex models. The pinpoint continued and by looking at the logs I was
pretty surte everything was fine with the communication to Vertex.

Unfortunately, the model was unable to figure out why I was getting no response inside of Claude Code. 

As a last chance to GLM I asked it to check the implementation Opus had done and see if there was anything different.

It then fixed the issues. I still got an error related to the incompatibility of the JSON schema sent to Vertex. The model then commented it out and sent a minimal payload to Vertex.

And **finally it worked**. I got a response from Vertex inside of Claude Code.

## Claude Opus 4.5

You saw from tha first experiment that Opus was able to implement a functional proxy. The code produced was indeed used
as a reference for GLM to fix its implementation.

I have the prompt to Opus and one minute later I had a first implementation. Also with some issues like:

- model not being taken from the request;
- no response coming to Claude Code;
- wrong endpoint being used (generativelanguage.googleapis.com instead of aiplatform.googleapis.com);
- schema incompatibility;
- claude-haiku being used as model name;
- a syntax error due to a missing parenthesis.

All these issues were similar to the ones GLM faced. Opus however was way more effective at fixing them.

It got in the same situation as GLM - no response coming to Claude Code. I passed the logs to it and it quickly
understood what was going on.

```
⏺ Now I see it. Vertex AI returns a JSON array [{...}, {...}] with
  pretty-printing, not SSE or newline-delimited JSON. I need to collect the full
   response then parse it.
```

And **it worked**. I got a response from Vertex inside of Claude Code.

# Conclusion

Yes, Claude Opus 4.5 is impressive and yes, it outperformed GLM 4.7 in this experiment. But I'm not surprised.

Some takeaways:

- Both models faced similar issues. It's clear that Claude Code agent has a consistent way of prompting the models and
    it's pretty good at it.
- Opus 4.5 was way more effective at overcoming the issues. It required less interactions to get to a working solution.
- Opus 4.5 is much better at debugging. Such a very skill for developers is also present in Opus (I myself used it to
    debug some segmentation faults).
- Opus 4.5 code is cleaner and more idiomatic.

It sounds like GLM 4.7 is useless but that's not true. It got close to find a solution. It however required more
intercations and is not that good at debugging.

I didn't do any other experimentation with GLM on this matter but I theorize that if I give it specs of Claude Code
calls, Vertex API and expected behavior it could do a better job.

Claude Opus 4.5 can be your choice for any coding related tasks. With Codex it's the best coding model out there. Open
weights and open source implementations are great and I have great respect and expectations for all of them, but they
still lag behind closed models when it comes to coding tasks.
