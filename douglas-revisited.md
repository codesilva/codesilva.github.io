# 1) Talk Title
**The Hidden Complexity of Time: Lessons from a Failed Migration**

# 2) Abstract (2–4 sentences)
Time seems like a simple primitive until you split it across distributed systems. This session dissects a real-world migration failure where implicit assumptions about time formats caused data corruption and 50-year drifts between a legacy monolith and a modern microservice. We will move beyond "use UTC" and explore architectural patterns for temporal integrity, including defensive contract testing and unambiguous data transfer protocols.

# 3) Description / Detailed Outline

**The Problem: The "False Simplicity" of Time**
We often treat time as just a number or a string. In a monolith, this works because the context is shared. In a distributed architecture, "Time" becomes a protocol that requires strict negotiation. This talk explores what happens when that negotiation fails.

**The Case Study: A Tale of Two Systems**
I will walk through a specific migration scenario involving a Legacy Monolith (User-centric, Timezone-aware) and a New Microservice (Machine-centric, UTC/Unix-based).
*   **The Drift:** How a simple unit mismatch (Seconds vs. Milliseconds) silently threw our data back to 1970.
*   **The Data Loss:** How "naive" string conversion stripped critical timezone context, corrupting user intent.

**Architectural Solutions (The Core)**
We will leave the specific bugs behind and focus on the engineering patterns to prevent them:
*   **Explicit Contracts:** Why `long timestamp` is a bad API signature and how to replace it with strongly-typed ISO-8601 standards (`YYYY-MM-DDTHH:mm:ss.sssZ`).
*   **Defensive Programming at the Boundaries:** Implementing Anti-Corruption Layers (ACL) that validate temporal logic before data enters the core domain.
*   **Contract Testing:** How to write Consumer-Driven Contracts that would have caught the "x1000" factor mismatch during the build phase, rather than in production.

**Demos/Examples:**
*   Code comparison: "Implicit primitives" vs. "Explicit Temporal Objects".
*   A quick look at a Contract Test failure example that catches a time format regression.

# 4) Target Audience
**Level:** Intermediate
**Role:** Backend Developers, Software Architects, and Engineers working on System Migrations.
**Prerequisites:** Basic understanding of REST APIs and the concept of Unix Epoch time.

# 5) Learning Outcomes / Takeaways
1.  Understand why **primitive types** (int, long, string) are dangerous for representing time in public APIs.
2.  Learn how to implement **Anti-Corruption Layers** to sanitize temporal data between legacy and modern systems.
3.  Discover how **Contract Testing** can automate the detection of unit mismatches (seconds vs. millis) before deployment.
4.  Gain a checklist for **Date/Time Migration** to ensure timezone context is preserved, not discarded.

# 6) Relevance (Why TDC?)
TDC is known for practical, "from the trenches" engineering insights. As many companies in the community are currently strangling monoliths into microservices, the risk of data corruption during these migrations is high. This talk transforms a common "facepalm" moment into a rigorous architectural lesson, fitting perfectly into the **Architecture** or **Backend** tracks.
