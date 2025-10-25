# Using Atlas Browser's Agent Mode For Solving LeetCode Problems

OpenAI dropped a new product called [Atlas Browser](https://openai.com/index/introducing-chatgpt-atlas/), which is fully integrated with ChatGPT. In essence, it's one more Chromium based browser with a sidebar that allows you to interact with ChatGPT while browsing the web. Such a sidebar allows you to ask questions about the content of the web pages you are visiting, and get answers in real time.

The most interesting feature is the "Agent Mode", available for Plus, Pro, and Business users. With agent mode enabled, you can ask ChatGPT to perform more complex tasks such as navigating multiple web pages, extracting information, and synthesizing it to provide comprehensive answers.

As an experiment, I used Atlas Browser Agent Mode to solve multiple LeetCode problems. We know that LLMs are pretty good at solving these classic algorithmic problems. With the Atlas it was not different. It reached 100% correctness on the first try.

## Entering Agent Mode

[atlas]

By clicking on the "Agent Mode" button, ChatGPT switches to a mode where it can interact with the web pages you visit. In this mode you can either be `Logged In` or `Logged Out`. Of course, being logged in allows the browser to, if it _thinks_ it's necessary, to open new tabs with your credentials, and access content that is behind a login wall. It's risky and the browser warns you about it.

[browser-logged-inout-warning]

I started with logged out mode, and could solve a problem without any issues.

Prompt: Read and understand this leetcode problem. After this, write the solution code in the field for it, test and submit the solution.

[solved-two-sum]

### Solving Multiple Problems At Once

First, I asked it to solve three problems at once. Suggesting it could use multiple tabs if necessary.

Prompt: `Pick at least three different unsolved problems from this list and solve them. For efficiency, you can open each of them in a different tab. On each tab, read the problem solve and submit`

At firt, I got an issue. It indeed used some kind of tabs, but it doesn't open them as browser tabs. It's some internal tab system. When executing other tabs it could not submit the solution, because it was logged out.

So for these intenal tabs it will only carry the login session if you are logged in. My hypothesis is that it clear cookies and any other session data when logged out.

Since it's just leetcode, I changed it to logged in and retried. This time it worked perfectly. I used the following prompt: `Pick at least three different unsolved problems from this list and solve them. For efficiency, you can open each of them in a different tab. On each tab, read the problem solve and submit`.

It didn't work in parallel, but it prepared all the tabs first, and then started solving them one by one. It solved all three problems correctly in the first try in two minutes.

#### Stressing It Further

I tried different prompts asking it to solve 100 problemas, but it refused, saying it was too many. I then asked it to solve 20 problems, it refused again but then I changed the prompt a bit and it started working.

The prompt that worked was `From this page, take at least 20 unsolved problems. For each problem, read, understand, test and submit. You don't need to do them at once, you can do one after the other. Step by step.`

Even though it accepted the prompt, after seven minutes, it only solved 7 problems. I didn't expect it to solve all, I assumed there was some limitation in place to avoid overloading the system.

[seven problems image]

I wanted to see what was the magic number that it would solve. So I tried again with 10 problems.

```
From this page, take at least 10 unsolved hard problems. For each problem, read, understand, test and submit. You don't need to to them at once, you can do one after the other. Step by step.

if you get into the challenge's page and it says "Accepted" or "Solved" just go to another one.
```

It worked for more **six minutes** and solved six problems. Resending the same prompt caused it to refuse again. It was probably some rate limiting in place.

Changing the prompt to 5 problems worked again, and it **solved all five problems** in **six minutes**. There's a pattern here. Would the agent be limited to work for six to seven minutes?

## Formulating a Solution

I solved about 22 problems in total, more than 50% of them being hard problems. The agent mode worked flawlessly, and I could see it navigating the pages, reading the problem statements, writing code, testing, and submitting code.

In LeetCode, users can publish their solutions after submission. They put an explanation of their approach and the code itself. As a last experiment, I asked the agent to publish a solution for one of the problems it solved.

Prompt: `In this page there is the "solutions" tab where users can post. I want you to post this solution, explaining each peace othe code. don't use emojis or too rare english words. i want you to sound natural`

It only meesed with tabs. I sent this prompt while I was seeing the [Wildcard Matching](https://leetcode.com/problems/wildcard-matching/description/) problem, but it posted the solution for the N-Queens problem instead. Other than that, the solution was well written and

The solution is at: [https://leetcode.com/problems/n-queens/solutions/7298948/n-queens-solution-using-backtracking-wit-5svl/](https://leetcode.com/problems/n-queens/solutions/7298948/n-queens-solution-using-backtracking-wit-5svl/)

## Conclusion

ChatGPT Atlas doesn't have a very good browsing experience. For many times I just wanted to open a new tab and search for something like the "Node.js SQLite documentation", but I just opened a new chat with the LLM. I don't like this experience.

[image node search]

In essence, it's just like the experience of using ChatGPT but it renders web pages.

Agent Mode is very interesting, and it worked flawlessly for solving LeetCode problems. It could navigate the pages, read the problem statements, write code, test it, and submit it. During the execution you can see the browser navigating and can even interrupt it if necessary. The internal tab system is a bit confusing, and it would be better if it used real browser tabs instead.

Another aspect you have to consider is the privacy and security implications of using such a tool. Wether you are in agent mode or not, the "Ask GPT" sidebar can read the content of the web pages you visit. This can potentially turn the whole [browser vulnerable to prompt injection attacks](https://brave.com/blog/unseeable-prompt-injections/).

This whole experiment was educational, having a so good agent can be very useful for tasks involving web navigation and data extraction.

Worth saying, if you are studying algorithms and data structures, using Atlas Browser Agent Mode (or any other similar tool) to solve LeetCode problems is not recommended, as it defeats the purpose of learning. 
