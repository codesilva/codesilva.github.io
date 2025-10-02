# LLMs for Matching Talent: A Case Study in Candidate–Project Pairing

As a sotware boutique, one of our core services is outsourcing engineering talent to clients. This is not an easy task,
as it involves understanding both the technical requirements of the projects and the skills and experiences of the
candidates.

Luckyly, we have a great team that's always finding the best matches. However, as our pool of candidates and projects
grows, it becomes more more overwhelming to manually sift through all the information.

To tackle this challenge, I experimented with different approaches and ended up building an AI agent that leverages
Large Language Models (LLMs) to assist in matching candidates to projects.

In this article, I'll share the journey of how I built this AI agent, the challenges I faced, and the lessons I learned
along the way.

## The Problem

Matching candidates to projects is a complex problem that involves multiple factors, such as skills, experience,
cultural fit, and availability. It cannot be entirely automated, as human judgment is crucial in making the final
decision.

Yet, there are aspects of the matching process that can be enhanced with software. One of these aspects is the initial
screening of candidates based on their resumes and the project requirements.

As I described in the article [How To Solve Every Programming Problem](https://blog.codeminer42.com/how-to-solve-every-programming-problem/), the first thing you need to do is to **really** understand the problem. For that, you must know what you have and what you want to achieve.

We have candidates' resumes and project descriptions, both in unstructured text format. We want to find the best candidates for a given project.

A question that arises is: what does "best" mean in this context? Let's take a look at an example to illustrate the
problem.

### Example

Project Description: I lead a team that is building tools for sellers on marketplaces. We need a backend developer with
experience in Node.js and AWS to help us build a microservices architecture.

Candidate 1: Full-stack developer with experience in React and Python. Worked on e-commerce platforms and has a good
understanding of web development.

Candidate 2: Experienced backend developer with a strong background in Node.js and AWS. Worked on several projects
involving microservices architecture and cloud computing.

Candidate 3: Junior developer with experience in Java and SQL. Looking to gain more experience in backend development
and cloud technologies.

Just by reading the descriptions, we can see that Candidate 2 has the relevant skills and experience. So, based on text
similarity, we determine what is the "best" fit.

> We can then restate the problem as: rank candidates based on the similarity of their resumes to the project description.

Since we're not replacing humans analysis but rather assisting it, we can focus on finding a good enough solution for ranking candidates not necessarily selecting the absolute best one.

# The Approach

The problem of matching candidates, of course, can be approached in different ways. Each approach has its pros and cons, and the choice depends on various factors, such as the available data, the computational resources, and the desired accuracy.

Since I haven't used AI other thant as consumer, I experimented with different techniques and tools. A good opportunity to get into this huge AI party.

## Vector Space Model

Computer cannot read text as humans do. Instead, for a computer to work effectively with text data, we commonly vectorize it.

Vector Space Model (VSM) is an algebraic model for representing text documents (and any objects, in general) as vectors. Every single document is represented as a vector in a multi-dimensional space, where each dimension corresponds to a term (word or phrase) in the document.

With this representation, we can then compute the similarity between documents using various metrics, one of the most common being cosine similarity.

## Tf-idf

Tf-idf, which stands for term frequency-inverse document frequency, is a statistical measure used to evaluate the importance of a word in a document relative to a collection of documents (corpus).

The tf-idf value increases proportionally to the number of times a word appears in the document but is offset by the frequency of the word in the corpus, which helps to adjust for the fact that some words are generally more common than others.

Using sklearn, we can easily compute the tf-idf vectors and the cosine similarity between them.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

resumes = [
    "Backend developer with 4 years of experience in Node.js and Express. Built microservices architectures for e-commerce platforms. Automated deployments using GitHub Actions and Docker. Strong knowledge of REST APIs, MongoDB, and AWS.",
    "Software engineer with 5 years of experience in backend development using Java and Spring Boot. Designed microservices and deployed them on Kubernetes. Experience with CI/CD pipelines using Jenkins, currently learning GitHub Actions. Solid understanding of relational databases and cloud infrastructure.",
    "Full-stack developer with a focus on backend systems in Python (Django, FastAPI). Worked on marketplace integrations and data processing pipelines. Experience with CI/CD using GitLab CI, basic exposure to GitHub Actions. Comfortable with PostgreSQL and Redis.",
    "Backend + DevOps engineer with experience in Go and Node.js. Built cloud-native services and automated infrastructure deployments. Heavy use of GitHub Actions for testing, builds, and deployments. Skilled with Kubernetes, Terraform, and microservices orchestration.",
    "Junior developer with 1 year of experience in PHP and MySQL. Basic knowledge of backend concepts and REST APIs. No direct experience with Node.js, but eager to learn. Limited exposure to GitHub Actions."
]

project_description = "We are looking for a backend developer to join our team building tools for sellers on marketplaces. Experience with Node.js is highly preferred, but we are open to candidates with strong backend experience in other technologies (e.g., Java, Python, Go). Familiarity with CI/CD pipelines, especially GitHub Actions, will be considered a strong plus. The project involves designing and maintaining microservices, integrating with third-party APIs, and deploying on cloud infrastructure."

vectorizer = TfidfVectorizer()
```
We need to vectorize both the resumes and the project description. To do that, we can fit the vectorizer on the resumes and then transform both the resumes and the project description.

```python
X = vectorizer.fit_transform(resumes + [project_description])

resumes_vector = X[:-1]
project_description_vector = X[-1]
```

Now, we can compute the cosine similarity between the project description and each resume.

```python
similarities = cosine_similarity(resumes_vector, project_description_vector).flatten()
print(similarities)

# Similarities: [0.12567641 0.31466789 0.21045906]
```

With the similarity scores, we can rank the candidates.

```python
print("Ranking of candidates:")
ranked_indices = similarities.argsort()[::-1]
for idx in ranked_indices:
    print(f"Score: {similarities[idx]:.3f} | Desc: {resumes[idx]}")

# Ranking of candidates: 
#
# Candidate 3 | Score: 0.260
# Candidate 5 | Score: 0.232
# Candidate 1 | Score: 0.225
# Candidate 2 | Score: 0.221
# Candidate 4 | Score: 0.217
```

It's done! Now we have a number, a score, that indicates how similar each resume is to the project description.

Notice that the Junior developer scored higher than the full-stack developer. You may think that the "Full-stack developer" should be ranked second. Probably, I don't know. That's where the human feeling and experience comes to play.

Humans can capture nuances, you may guess that a Full-stack developer is more likely to have some experience with backend development than a Junior developer, but our algorithm cannot. That's the nature of tf-idf. It finds patterns in the text, but it cannot understand the meaning of the words.

For example, changing the description of the Full-stack developer a little bit for matching the keywords "backend" and "microservices" would change the ranking:

> "Full-stack developer with experience in React and Python, stronger in backend development. Worked on projects using AWS, including e-commerce platforms with microservices architecture and cloud deployment.",

Luckyly, people way smarter than me adressed this problem developing more advanced techniques. Let's improve our application using them.

## Embeddings

The same thing we discussed about tf-idf applies to embeddings. The main difference is that embeddings also encode semantic meaning, not just the frequency of words.

Embeddings are more complex and come from neural networks, which are trained on large corpora of text to capture the context and relationships between words.

So, in a projetct requirement asking for a "cloud computing" experience, an embedding model would understand that "AWS" and "Azure" are related to "cloud computing", even if the exact words are not present in the text. Of course, that's the general idea, the quality of the embeddings depends on the model used and the training data but that's '

Using `sentence_transformers`, from Hugging Face, we can easily compute the embeddings and the cosine similarity between them.

```python
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("models/all-mpnet-base-v2")
# assume resumes and project_description are defined as for Tf-idf example
embeddings = model.encode(resumes + [project_description], convert_to_tensor=True)
project_embedding = embeddings[-1]
resume_embeddings = embeddings[:-1]

similarities = util.cos_sim(project_embedding, resume_embeddings)

results = sorted(
    list(enumerate(similarities[0])),
    key=lambda x: x[1],
    reverse=True
)

for idx, score in results:
    print(f"Candidate {idx + 1}\n\tScore: {score:.4f} | Desc: {resumes[idx]}")
```

This results in:

```
Candidate 1 | Score: 0.830 (score delta: +0.605)
Candidate 4 | Score: 0.742 (score delta: +0.525)
Candidate 3 | Score: 0.700 (score delta: +0.440)
Candidate 5 | Score: 0.678 (score delta: +0.446)
Candidate 2 | Score: 0.644 (score delta: +0.412)
```

If compared to the tf-idf results, we can notice a few improvements. Firts of all, the scores are higher, indicating a better match, even though the terms are not exactly the same. That's the power of embeddings.

Candidate 1 and Candidate 4 are now ranked higher, which makes sense given their experience. The Junior developer is ranked lower, which also makes sense given the project requirements.

From my perspective, `Candidate 5` should be the last one because of the lack of experience with GitHub Actions or Node.js, but the model doesn't capture that nuance.

This is due to different reasons like the training data, the model architecture, and the specific use case. In this case, specifically, adding more details to the project description like the seniority level required or the specific tools and technologies would help the model to better understand the context.

## LLMs

Finally, let's see how LLMs can help us in this task. LLMs  are trained on massive amounts of text data and can generate human-like text based on the input they receive. In fact, LLMs use embeddings as part of their architecture. Thanks to the Transformer architecture, LLMs can capture long-range dependencies and context in the text, which makes them very powerful for various NLP tasks.

The only application I had written, integrated with LLMs, was a chatbot using Firebase and Gemini. It's been almost a year.

Writing a resource allocator using LLMs was a great opportunity to get back into the game. Since it's like starting from scratch, I looked into a few tools and frameworks to help me build the application.

After reaching out to the Anthropic's article [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) I decided to take their suggestion and go with plain API calls to Claude using the SDK `anthropic`.

```python
import os
import json
import anthropic
import utils
from dotenv import load_dotenv

load_dotenv()

claude_model = 'claude-sonnet-4-5'
client = anthropic.Anthropic(api_key='my-ultra-secret-key')
```

LLM applications, or AI agents, are usually built using a prompt template that guides the model to perform the desired task. The prompt you provide to the model is crucial, as it can significantly impact the quality of the output.

Despite there are some known techniques for writing effective prompts like few-shot, chain-of-thought, and such,
I didn't bikeshed into that. I just wrote a simple prompt to get the job done.

```python
candidate_indices = list(range(len(resumes)))
candidates_text = "\n".join([f"{i + 1}. {resumes[i]}" for i in candidate_indices])

prompt = f"""
Project Requirements:
{project_description}

Candidates:
{candidates_text}

Return ONLY a valid JSON array (no markdown, no code blocks, no explanations).
Each element must have:
- candidate_id: the ID number of the candidate
- rank: ranking from 1 (best) to {len(candidate_indices)} (worst)
- explanation: detailed explanation of why this candidate fits or doesn't fit

Your response must start with [ and end with ]. Nothing else. Don't add stuff like ```json this is not needed
"""
```

There's a simple computation of `candidates_text` to format the candidates' resumes in a numbered list. Also, notice the `Return ONLY a valid JSON array...` instruction. This is neede to enfore the output format. Seems like LLMs were optimized for chatting, so they tend to add extra text like "Here's the JSON you asked for..." or markdown code blocks. We don't want that.

```python
response = client.messages.create(
    model=claude_model,
    max_tokens=2000,
    system="You are a technical recruiter. Rank these candidates for best fit with the project requirements and provide detailed justification.",
    messages=[
        {"role": "user", "content": prompt}
    ]
)

rankings = json.loads(response.content[0].text)

for ranking in rankings:
    candidate_idx = ranking["candidate_id"]
    print(f"Candidate {candidate_idx}\n\tExplanation: {ranking['explanation']}")
```

This results in:

```
Candidate 4
        Explanation: This candidate is the strongest fit for the position. They have direct experience with Node.js, which is the highly preferred technology, plus Go experience demonstra
ting polyglot backend capabilities. Their DevOps background is a significant advantage for microservices architecture and cloud infrastructure management. Heavy use of GitHub Actions dire
ctly matches the 'strong plus' requirement. Their expertise in Kubernetes, Terraform, and microservices orchestration aligns perfectly with the project's need to design, maintain, and dep
loy microservices on cloud infrastructure. This combination of backend development skills and infrastructure automation expertise makes them exceptionally well-suited for the role.

Candidate 1
        Explanation: This candidate is an excellent fit with 4 years of Node.js experience, directly matching the highly preferred technology stack. Their experience building microservice
s for e-commerce platforms is highly relevant to the marketplace tools project. They have hands-on experience with GitHub Actions and Docker for automated deployments, satisfying the stro
ng plus requirement. Knowledge of REST APIs, MongoDB, and AWS aligns well with the third-party API integration and cloud deployment requirements. The only reason they rank second is that 
Candidate 4 brings additional DevOps expertise and infrastructure automation skills that could be valuable for the project's scope.

Candidate 2
        Explanation: This candidate is a solid fit despite not having Node.js experience. Their 5 years of backend experience with Java and Spring Boot demonstrates strong backend fundame
ntals, and the project explicitly states openness to candidates with strong backend experience in other technologies. They have proven microservices design experience and Kubernetes deplo
yment skills, which are crucial for the role. While their CI/CD experience is primarily with Jenkins, they are actively learning GitHub Actions, showing adaptability. Their understanding 
of cloud infrastructure and microservices architecture makes them capable of contributing effectively, though they would need some time to adapt to the Node.js ecosystem if required.

Candidate 3
        Explanation: This candidate has relevant experience with backend systems in Python and specifically worked on marketplace integrations, which is directly aligned with the project 
domain. Their experience with Django and FastAPI shows solid backend capabilities, and the project is open to candidates with strong backend experience in other technologies. However, the
y only have basic exposure to GitHub Actions (primarily using GitLab CI), which is a notable gap given it's listed as a strong plus. Their database experience with PostgreSQL and Redis is
 valuable, but the lack of microservices architecture experience and limited GitHub Actions knowledge places them below candidates with more comprehensive matches to the requirements.

Candidate 5
        Explanation: This candidate is the weakest fit for the position. With only 1 year of junior-level experience in PHP and MySQL, they lack the depth of backend experience needed for
 this role. They have no direct experience with Node.js or any of the other preferred technologies (Java, Python, Go), and their technology stack (PHP) is quite different from what the pr
oject requires. Limited exposure to GitHub Actions and basic knowledge of REST APIs indicates they would require significant training and mentorship. While their eagerness to learn is com
mendable, the gap between their current skill set and the project requirements is substantial. For a project involving microservices design, third-party API integrations, and cloud deploy
ments, a more experienced candidate would be necessary.
```

This is incredibly good. The fact that LLMs kind of have more context make a big difference. The explanation is a great added value that helps the recruiter to understand the reasoning behind the ranking.

## Putting It All Together

Keep in mind this data is small and synthetic. In a real-world scenario, you and me will have to deal with a lot more data, and the quality of the data will vary significantly.

Of course, LLMs overcome many of the limitations of tf-idf and embeddings, but they also come with their own challenges, such as cost, latency, and the need for careful prompt engineering.

The Embeddings approach is a good middle ground, as it captures semantic meaning and is relatively efficient. It still misses the context and nuance that LLMs can provide, but with a good normalization of the data and a well-tuned similarity metric, it can yield satisfactory results.

Tf-idf is the simplest and most efficient approach, but it does not capture the full complexity of the matching problem. It can be a good starting point for small datasets or when computational resources are limited or when keyword matching is sufficient.

# Conclusion

This was just a PoC, but it was a great learning experience. By trying different approaches, I gained a deeper understanding of the strengths and limitations of each technique.

Next step now is to validate it with real data and see how it performs in a real-world scenario. Also, I want to explore other techniques and tools that can further enhance the matching process.

One of the most interesting tools I found is [ActiveGenie](https://activegenie.ai/), which provides a suite of AI modules that can be easily integrated into applications. They have a module called [Ranker](https://activegenie.ai/modules/ranker.html) that seems to be designed for this exact purpose.

I will bring more updates as I progress with this project.

Thanks for reading!

---

https://activegenie.ai/modules/ranker.html

In the article [How To Solve Every Programming Problem](https://blog.codeminer42.com/how-to-solve-every-programming-problem/), I, inspired by George Polya's work, outlined a systematic approach to solving programming problems.

Our problem here is to find the best candidates for a given project. We have the candidates' resumes and the project descriptions.

Both resumes and project descriptions are unstructured text, which makes it challenging to extract relevant information and compare them effectively. A simple keyword search is not sufficient, as it cannot, effectively, capture relevance or context.

## Why Document Similarity?

When it comes to matching candidates to projects, the key is to understand the requirements of the project and the
skills of the candidates. This is where document similarity comes into play.

## Approaches

### TF-IDF

### Embeddings

### LLMs

