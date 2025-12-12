# CFP Proposals for Rails Conference

## Proposal 1: Fine-tuning LLMs for Hotwire Generation (RESEARCH IN PROGRESS)

**Title:** "From Hallucination to Precision: Fine-tuning LLMs to Generate Production-Ready Hotwire Code"

**Category:** Ruby/Rails and AI/ML

**Language:** English (or Portuguese - your choice)

**Abstract:**
Current LLMs struggle with Hotwire-specific patterns, often generating incorrect Turbo Frame structures or misusing Stimulus controllers. In this talk, I'll share my research into why existing models fail at Hotwire development and my systematic approach to building better AI tools. Drawing from developer feedback and real project failures, I'll present a methodology for fine-tuning models that understand Rails' server-first philosophy.

**Detailed Description:**

Hotwire has revolutionized how we build reactive Rails applications, but current LLMs are still stuck in the SPA mindset. They hallucinate JavaScript solutions, generate invalid Turbo Stream syntax, and completely miss the elegance of server-side reactivity. This isn't just annoying—it's costing development teams valuable time and introducing bugs.

Over the past months, I've interviewed dozens of Rails developers and analyzed hundreds of real project failures where AI coding assistants generated incorrect Hotwire code. The patterns are clear: LLMs default to client-side solutions, misunderstand Turbo's update mechanisms, and consistently miss Rails conventions.

In this talk, I'll present my systematic research into this problem and the methodology I'm developing for fine-tuning models that actually understand Hotwire. Rather than presenting completed results, I'll share my research process: from identifying the specific failure patterns through developer interviews, to building a curated dataset from production Rails applications, to designing evaluation metrics that actually matter for Hotwire development.

I'll demonstrate the current state of popular coding assistants with Hotwire, show why they consistently fail, and present my experimental framework for building better models. This is research in progress—real science, not marketing hype.

**Key Takeaways:**
- Why generic LLMs fail at Hotwire generation and how to identify these failures
- Systematic methodology for identifying AI model gaps in domain-specific frameworks
- How to build effective training datasets for Rails-specific patterns
- Experimental framework for fine-tuning models that understand server-first reactivity
- Lessons learned from developer interviews and real project failures

**Current Research Status:**
This is active research being conducted over the next three months. I'll present the most current findings, dataset development process, and preliminary results from the fine-tuning experiments.

**Key Takeaways:**
- Why generic LLMs fail at Hotwire generation and how to identify these failures
- Systematic methodology for identifying AI model gaps in domain-specific frameworks  
- How to build effective training datasets for Rails-specific patterns
- Experimental framework for fine-tuning models that understand server-first reactivity
- Lessons learned from developer interviews and real project failures

**Current Research Status:**
This is active research being conducted over the next three months. I'll present the most current findings, dataset development process, and preliminary results from the fine-tuning experiments.

**Target Audience:**
Rails developers, technical leads, and anyone building reactive Rails applications who wants to leverage AI effectively in their development workflow.

**Technical Level:**
Intermediate (requires basic knowledge of Rails, Hotwire, and general AI concepts)

**Speaker Bio:**
[Add your bio here - emphasize your AI Engineering background and practical Rails experience]

**Previous Speaking Experience:**
[Add any previous presentations, meetups, or technical talks you've given]

---

## Proposal 2: AI-Powered Developer Experience in Rails

**Title:** "Beyond Code Completion: Building AI Tools That Actually Make Rails Developers More Productive"

**Category:** Developer Experience

**Abstract:**
Move beyond basic code generation. I'll demonstrate practical AI tools that solve real Rails developer pain points: intelligent commit message generation, AI-powered code review assistants, and automated testing strategies. Drawing from my experience building production AI tools—including git-ollama-commit—learn which approaches work, which don't, and how to integrate AI meaningfully into your Rails workflow.

**Detailed Description:**

The AI revolution has arrived, but most Rails developers are stuck with basic code completion. What if we could build AI tools that actually understand our workflow, our pain points, and our codebase? In this talk, I'll share real tools I've built and validated in production environments.

Starting with git-ollama-commit, I'll show how AI can generate meaningful commit messages that actually help teammates understand changes. Not generic templates, but context-aware messages that capture intent and impact. Then we'll explore AI-powered code review assistants that catch Rails-specific issues—N+1 queries, missing indexes, security vulnerabilities—before they reach production.

The centerpiece is a case study on automated testing: building an AI agent that suggests comprehensive test cases based on code changes, generates meaningful test data, and even identifies edge cases human developers might miss. I'll share the surprising insights about what works (context-aware suggestions) and what doesn't (trying to replace human testing entirely).

**Key Takeaways:**
- Building git-ollama-commit: lessons learned from production AI tooling
- AI-powered code review for Rails-specific concerns
- Automated test generation that actually improves coverage
- Security considerations when integrating AI into development workflows
- Cost optimization and performance tuning for AI tools

---

## Proposal 3: Rails + AI: Production-Ready Patterns

**Title:** "Production Rails + AI: Patterns, Pitfalls, and Performance at Scale"

**Category:** Ruby/Rails and AI/ML

**Abstract:**
Learn from real implementations of AI features in Rails applications. I'll cover building scalable AI agents for talent matching, implementing secure LLM integrations, handling rate limiting and costs, and architectural patterns for AI-powered features. Discover common pitfalls, security considerations, and performance optimization techniques that actually work in production.

**Detailed Description:**

Everyone wants to add AI to their Rails app, but few talk about what happens when you scale to thousands of users. This talk cuts through the hype to show production-proven patterns for integrating AI into Rails applications.

I'll share the architecture and lessons learned from building an AI-powered talent matching system that processes hundreds of resumes daily. From handling LLM rate limits and managing costs to implementing secure prompt engineering and maintaining response quality at scale, we'll cover the technical challenges that only appear in production.

The talk includes a deep dive into caching strategies for AI responses, implementing fallback mechanisms when external AI services fail, and architectural patterns for maintaining performance while adding AI features. We'll explore real monitoring data, cost optimization techniques, and security considerations that become critical when AI processes sensitive data.

**Key Takeaways:**
- Architectural patterns for AI-powered Rails features at scale
- Production-proven approaches to LLM integration and security
- Performance optimization techniques that actually work
- Cost management and rate limiting strategies
- Real-world monitoring and debugging techniques for AI features

---

## Additional Notes for Selection Committee:

**Why These Talks Matter:**
These proposals address the intersection of AI and Rails development—precisely where the community needs practical guidance. Rather than theoretical AI concepts, these talks offer real implementations, lessons learned, and production-proven patterns that attendees can immediately apply.

**Timeline and Research Status:**
This represents research in progress, with experiments being conducted over the next three months leading up to the conference. I'll present the most current findings, including dataset development, methodology validation, and preliminary fine-tuning results. This ensures attendees get cutting-edge insights rather than outdated information.

**Practical Value:**
Each proposal includes specific technical details, real-world results, and actionable takeaways. Attendees will leave with code examples, implementation strategies, and clear understanding of what works versus what sounds good in theory.

**Speaking Experience:**
[Add information about your experience with technical presentations, blog posts, or community involvement that demonstrates your ability to communicate complex technical concepts effectively]