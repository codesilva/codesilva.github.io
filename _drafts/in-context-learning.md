the way you ask matters (just like in forums)
i thought prompt engineering was useless but turns out it is not

---

# Beyond the Buzzwords: Testing Prompt Engineering Across Five LLMs
# Do Prompts Really Teach? Testing Prompt Engineering Across Five Large Language Models.

As many people, I was fascinated when this whole LLM thing started. It seems like magic how these models work and how many tasks they can perform.

Hearing more and more about this, I learned the term `prompt engineering`, which sounded like a buzzword. It's empirical to see that a good prompt can improve results. If you give it details about what you want, it tends to perform better. But then more words came into the picture, like "one-shot", "few-shot", and "chain-of-thought".

Well, I was not convinced. If you take traditional ML models, you will see that the only way to bias them is by training data, which will change the weights (parameters) of the model. If you give more words to the input, you provide more data to the model, which is not the same as changing the model itself.

But after some research and experiments, I realized not only that prompt engineering works but also why it works.

## How Are LLMs Conditioned on Prompts?

While this is a phenomenon that is still being actively researched, [Xie et al. (2021)](https://arxiv.org/pdf/2111.02080) provide a hypothesis for why large language models (LLMs) can adapt their behavior based on prompts, even without any parameter updates.

The first thing to note is that LLMs are trained on a massive amount of text with various topics and formats, from Wikipedia pages, academic papers, and Reddit posts to Shakespeare's works. From this diverse training, the model learns a set of concepts.

> A concept is a [latent variable](https://en.wikipedia.org/wiki/Latent_and_observable_variables) that contains various document-level statistics.
> For example, a "news topics" concept describes a distribution of words (news and their topics), a format (the way that news articles are written), a relation between news and topics, and other semantic and syntactic relationships between words.

The hypothesis is that when we provide a prompt with examples of a specific task (e.g., translation, sentiment analysis, etc.), the model only localizes to the relevant concepts. This is because the examples in the prompt provide context that helps the model identify which concepts to focus on.

Xie et al. theorized that in-context learning can be seen as **Bayesian Inference** over these latent concepts. When we provide a prompt with examples, we provide evidence that helps the model update its beliefs about which concepts are relevant to the task.

[demo from paper of inference]

## Experimental Evidence

LLMs can perform in-context learning even on unseen tasks. Reproducing this experiment in different models gives us better understand how this works.

The experiment provides a mapping task, where the model is given a set of input-output pairs and then asked to predict the output for a new input. But instead of giving pairs that have been seen during training, we provide pairs that don't have a transitive relation, so the model has to learn the mapping from the examples in the prompt.

The basic (few-shot) prompt is:

```
fill the blank

beet: sport; golf: animal; horse: plant/vegetable; corn: sport; football: animal; tennis: _
```

Alternatively, I added some 'remembering' instructions to the prompt to see if it helps:

```
fill the blank

beet: sport; golf: animal; horse: plant/vegetable; corn: sport; football: animal; tennis: _

remember to recognize the pattern before giving me an aswer
```

For some models, the chain-of-thought (CoT) prompting had to be used to get a good result:

```
fill the blank

beet: sport; golf: animal; horse: plant/vegetable; corn: sport; football: animal; tennis: _

As far as I could see the mapping is sports are mapped to animal, vegetables/plants are mapped to sport and animals are mapped to plant/vegetables

I can conclude that tennis would be animal just like the other samples like footbal and golf.

based on that, fill the blank

fencing: _
```

Let's call these prompts FS (few-shot), FSR (few-shot + remember), and CoT (chain-of-thought), respectively.

### Qwen3 (8.2B)

Using Qwen3 in Ollama, I got an incorrect result for the FS prompt, classifying tennis as plant/vegetable. It's still interesting to observe the thinking process the model goes through:

```
The user has given a list of words with some categories and wants me to fill in the blank for "tennis: _". Let me try to figure out the pattern here.
```

It looks at the first pair:

```
beet: sport. Wait, beet is a vegetable, but it's categorized under sport? That seems odd. Maybe there's a different connection here. Maybe it's not about the actual category but something else.
```

After analyzing, it got an incorrect pattern but still a logical one:

```
Beet (B) → sport (S)
Golf (G) → animal (A)
Horse (H) → plant (P)
Corn (C) → sport (S)
Football (F) → animal (A)
Tennis (T) → ?

Pattern: S-A-P-S-A-?
```

Based on this, it concludes that tennis should be `plant/vegetable`. The answer was the same for the FSR prompt.

After applying the CoT prompt, the model got the correct answer `animal`, showing that it can learn the mapping when given more guidance.

```
[...] the user is now saying that the mapping is sports → animal, vegetables → sport, animals → plant/vegetable.
So for tennis, which is a sport, it would be mapped to animal. Therefore, the answer would be animal. [...] in the original pairs,
football (sport) is mapped to animal, so that's consistent. So the answer for tennis would be animal.

Now, the user is asking for fencing: _.

So fencing is a sport. Following the pattern, sports are mapped to animal. Therefore, fencing would be mapped to animal. So the answer would be animal.
```

### Gemma 3 (4.3B)

Gemma 3 in ollama got me the answer `game` for the FS prompt, then `ball` for the FSR prompt, and finally `sport` for the CoT prompt.

### Gemini 2.5 Flash

As for Qwen3, I got `plant/vegetable` for both the FS and FSR prompts, but I got the correct answer `animal` only after applying the CoT prompt.

### ChatGPT 5

I got the correct answer on the first try with the FS prompt: `animal`. The thinking process was:

```
It seems like the words are being mapped to different categories in a cycle. Each word belongs to a category (animal, plant/veg, sport), and the mapping follows this sequence: animal -> plant, plant -> sport, and sport -> animal.
```

### Claude

With the FS prompt, Claude almost got the right idea, assuming tennis should be followed by an `animal`, but it gave me the wrong answer: `horse`. Using the FSR prompt, it got the correct answer: `animal`.

## Conclusion

It's excellent that LLMs can be that flexible. Prompt engineering works and is powerful. There are, of course, some caveats:

- the same prompt can yield different results in different models;
- creating prompts that work well is still an art that requires practice and experimentation.

I brought the example of unseen mapping tasks because they are indeed harder than usual. But they show how LLMs can adapt to new tasks just by conditioning on the prompt without any parameter updates.

https://arxiv.org/pdf/2111.02080
https://ai.stanford.edu/blog/understanding-incontext/
https://openreview.net/pdf?id=CbsJ53LdKc
https://openreview.net/pdf?id=rJY0-Kcll
https://www.youtube.com/watch?v=vD0E3EUb8-8
