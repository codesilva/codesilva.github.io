---
layout: post
title: "Como usar o Gemini 3 hoje"
date: 2025-11-23
tags: [gemini, ollama, ia, tutorial]
---

O (Gemini 3 Pro)[https://ai.google.dev/gemini-api/docs/gemini-3?thinking=high#javascript_1] é o modelo mais avançado da Google para tarefas complexas, capaz de compreender vastos conjuntos de dados e resolver problemas desafiadores a partir de diferentes fontes de informação, incluindo texto, áudio, imagens, vídeo e repositórios de código completos.

Como qualquer pessoa curiosa você pode querer experimentar o modelo já hoje. Há algumas formas de fazer isso. A primeira
e mais simples é através do [gemini.google.com/app](https://gemini.google.com/app), que é a interface web oficial para
interagir com os modelos Gemini.

[imagem da selecao do modelo Gemini 3 Pro no gemini.google.com/app]

Funciona, mas não sei se de forma consistente, já que no site da própria Google há a informação de que o acesso ao Gemini 3 Pro é limitado.

## Usando na Gemini CLI

O [modelo está disponível](https://github.com/google-gemini/gemini-cli/discussions/13280), mas não para todos ainda. O acesso eimediato está liberado para três categorias principais de usuários:

- Assinantes não comerciais do Google AI Ultra.
- Observação: Isso NÃO inclui, no momento, o Google AI Ultra para Empresas.
- Usuários que têm acesso por meio de uma chave de API Gemini paga.

Se você não se enquantra em nenhuma dessas categorias, pode tentar via lista de espera que aberta para outros usuários interessados em experimentar o Gemini 3 Pro. Você pode se inscrever para acesso antecipado através do Gemini CLI através do [formulário de solicitação de acesso](https://docs.google.com/forms/d/e/1FAIpQLScQBMmnXxIYDnZhPtTP3xr5IwHNzKW4nLomuQ1tGOO-UldMdQ/viewform).

Com o devido acesso, usando a Gemini CLI, basta habilitar o preview de features:

[image of preview features being enabled]

[imagem do modelo disponível no Gemini CLI]

## Usando com a API Key do Vertex

## Usando o Gemini 3 com Ollama

Uma outra alternativa, que eu tenho utilizado, é através do Ollama, que recentemente integrou o Gemini 3 Pro em sua plataforma. Pra isso você também precisa de uma assinatura, nesse caso, do Ollama Cloud.

O time do ollama introduziu esse conceito de "Premium Requests" e dão acesso a esses modelos fechados, como o Gemini 3 Pro, diretamente através do Ollama CLI ou do Ollama Desktop App.

Eu gosto dessa abordagem porque consigo manter todas as minhas integrações e fluxos de trabalho já estabelecidos com o Ollama, sem precisar mudar para o Gemini CLI necessariamente.

O modelo está disponível em: [https://ollama.com/library/gemini-3-pro-preview](https://ollama.com/library/gemini-3-pro-preview)

Tal qual qualquer outro modelo do Ollama, você pode rodar o Gemini 3 Pro diretamente do terminal com o comando:

```bash
ollama run gemini-3-pro-preview
```

## Limitações de uso

A interface é a mesma, mas a cota é muito mais limitada e parece não ser resetada diaramente. Em um simples teste, usando OpenCode, eu atingi o limite de 20 requisições.

[ollama gemini 3 pro limit reached image]


