---
layout: post
title: Exploring DeepSeek-OCR for Extracting Image Details
date: 2024-03-12
lang: pt-BR
tags: ["banco de dados", "database migrations"]
category: ["ai"]
---

Today I was surprised by the most recent paper made by DeepSeek. With the title ["DeepSeek-OCR: Contexts Optical Compression"](https://arxiv.org/pdf/2510.18234) they present the `DeepSeek-OCR` model, already available on [Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-OCR).

In this post I want to explore this model and see how it performs in extracting details from images the prompts provided in the repository.

# Playing with DeepSeek-OCR

The faster and easiest way to try the model capabilities is going directly on the [Khang Doan's space on Hugginface](https://huggingface.co/spaces/khang119966/DeepSeek-OCR-DEMO).

[image]

With this neat interface you can upload an image (even from clipboard), select the resolution size and the task type. The latter is the most interesting part, as it defines how the model will behave.

The task types come from the examples provided in the [DeepSeek-OCR repository](https://github.com/deepseek-ai/DeepSeek-OCR?tab=readme-ov-file#prompts-examples).

```
# document: <image>\n<|grounding|>Convert the document to markdown.
# without layouts: <image>\nFree OCR.
# figures in document: <image>\nParse the figure.
# rec: <image>\nLocate <|ref|>xxxx<|/ref|> in the image.
# general: <image>\nDescribe this image in detail.
```

# Experiments

## Describing the image in detail

Image: [newspaperimage]
Prompt: `<image>\nDescribe this image in detail.`
Result: `This image displays a newspaper article about the stock market. The article is titled "Nasdaq & AMEX" and it is dated "Tuesday, March 12, 2009". The article is about the stock market performance of the Nasdaq and the American Stock Exchange (AMEX) over the past week. The article states that the Nasdaq is up 52.1% and the AMEX is up 51.7% over the past week. The article also states that the S&P 500 is up 1.2% over the past week. The article is written in a professional and objective tone. The article is written in a font called "Arial". The image is a screenshot of the article.`

image size:  (626, 580)

## Convert to markdown

Using the same image, but changing the prompt to `<image>\n<|grounding|>Convert the document to markdown.`, we get:

```
<|ref|>title<|/ref|><|det|>[[65, 142, 740, 255]]<|/det|>
Nasdaq & AMEX

<|ref|>text<|/ref|><|det|>[[63, 275, 585, 320]]<|/det|>
Stocks in bold rose or fell 5% or more

<|ref|>image<|/ref|><|det|>[[65, 339, 203, 450]]<|/det|>

<|ref|>text<|/ref|><|det|>[[210, 333, 886, 440]]<|/det|>
Track your investments with our continuously updated stocks. Visit us on the web at money.usatoday.com

<|ref|>table<|/ref|><|det|>[[55, 456, 976, 996]]<|/det|>

<table><tr><td colspan="3">52-week</td><td colspan="3">52-week</td><td colspan="3"></td></tr><tr><td>High</td><td>Low</td><td>Stock</td><td>Last Change</td><td>High</td><td>Low</td><td>Stock</td><td>Last Change</td></tr><tr><td></td><td></td><td></td><td></td><td>45.71</td><td>32.50</td><td>Biomet</td><td>36.71 -0.42</td></tr><tr><td></td><td></td><td></td><td></td><td>2.76</td><td>1.20</td><td>Biomira</td><td>1.46 +0.03</td></tr><tr><td></td><td></td><td></td><td></td><td>9.07</td><td>5.13</td><td>BioScrip</td><td>8.05 +0.34</td></tr><tr><td>9.19</td><td>6.89</td><td>ABX Air n</td><td>7.52-0.10</td><td>68.88</td><td>50.65</td><td>Biosite</td><td>50.05 -4.57</td></tr><tr><td>33.25</td><td>12.40</td><td>ACMoore</td><td>13.58-1.57</td><td>212.25</td><td>131.03</td><td>BiotechT</td><td>204.66 -0.84</td></tr><tr><td>31.38</td><td>13.51</td><td>ADA-ES</td><td>20.96+3.16</td><td>8.50</td><td>1.40</td><td>BirchMtf gn</td><td>6.52 -0.45</td></tr><tr><td>27.14</td><td>12.88</td><td>ADC Tel rs</td><td>23.21+0.13</td><td>18.21</td><td>10.73</td><td>Bickboud</td><td>17.90 +0.70</td></tr><tr><td>30.40</td><td>16.70</td><td>ADECP</td><td>27.32+0.73</td><td>52.73</td><td>13.86</td><td>BluCoat</td><td>41.29 +1.30</td></tr><tr><td>16.45</td><td>10.47</td><td>AFC Ent s</td><td>15.40-0.14</td><td>44.35</td><td>24.15</td><td>BlueNile</td><td>40.30 -1.10</td></tr><tr><td>8.37</td><td>4.50</td><td>ASE Tst</td><td>7.76+0.40</td><td>26.45</td><td>19.91</td><td>BobEvn</td><td>22.99</td></tr><tr><td>19.25</td><td>12.75</td><td>ASM Intl</td><td>17.65-0.03</td><td>15.94</td><td>6.12</td><td>Bodisen n</td><td>15.45 +0.45</td></tr><tr><td>20.92</td><td>13.94</td><td>ASML Hid</td><td>21.24+0.46</td><td>6.21</td><td>1.56</td><td>Bookham</td><td>5.94 +0.06</td></tr><tr><td>27.38</td><td>16.39</td><td>ASV Inc s</td><td>26.76+0.14</td><td>11.80</td><td>4.99</td><td>Borland</td><td>6.68 +0.14</td></tr><tr><td>19.82</td><td>10.47</td><td>ATI Tech</td><td>17.89+0.68</td><td>31.90</td><td>21.10</td><td>BostPrv</td><td>31.18 -0.07</td></tr><tr><td>33.62</td><td>20.53</td><td>ATMI Inc</td><td>29.95+1.29</td><td>18.62</td><td>10.01</td><td>BftmlnT</td><td>11.53 +0.20</td></tr><tr><td>39.20</td><td>16.76</td><td>ATP O&G</td><td>38.40-0.59</td><td>14.68</td><td>7.10</td><td>BrigExp</td><td>12.10 -0.23</td></tr><tr><td>4.24</td><td>1.99</td><td>AVI Bio</td><td>3.62-0.02</td><td>46.72</td><td>26.65</td><td>BrightHrz s</td><td>38.90 -0.80</td></tr></table>
==================================================
image size:  (626, 580)
```

## Free OCR

Image: [image of a receipt]
Prompt: `<image>\nFree OCR.`
Result:

I tried another sample with the following image: [anotherimage] and got an unexpected result:

```
<｜begin▁of▁sentence｜># 3.1.1.1.1.1.1.1.1.1.1.2.1.1.1.1.1.1.1.1.1.3.1.1.1.1.1.1.1.1.1

# 3.1.1.1.1.1.1.1.1

## 3.1.1.1.1.1.1.1.1.2

### 3.1.1.1.1.1.1.1.1.3

### 3.1.1.1.1.1.1.1.2.1

### 3.1.1.1.1.1.1.1.3.1

...
```

It was probably due to the size. I reduced it to `Small` and retried, getting:

```
<｜begin▁of▁sentence｜>"""
    Banco Santander, S.A.
    Instituto de Banca Múltiple
    Grupo Financiero Santander

2408:7002801
"""
```

Seems like a free ocr only works well if the image itself has a certain structure/quality.

## Figures in document

Image: [piechart]
Prompt: `<image>\nParse the figure.`
Result:

## Locate reference in image

Image [lenna]
Prompt = `<image>\nLocate <|ref|>the hat<|/ref|> in the image.`

Result:


<|ref|>the hat<|/ref|><|det|>[[220, 80, 820, 744]]<|/det|>

Result imahe: [lenna-detected]

# Conclusion

The DeepSeek-OCR model is quite versatile and can handle a variety of tasks related to extracting information from images. It's interesting how it joins the capabilities of OCR with contextual understanding to provide more than just raw text extraction.

Why this is very useful the real thing behind `DeepSeek-OCR` is not just OCR. It's in fact a step towards compression of text information using visual modality, since a document image can represent rich information using way less tokens than the text itself.

This opens up a possibility for bigger context windows. Let's see how this field evolves!
