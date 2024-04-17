---
layout: post
title: '[POST-IT] Debugando no NodeJS'
date: 2023-07-08
lang: pt-BR
tags: ["debugging", "nodejs"]
category: ["post-it", "programacao", "debugging", "nodejs"]
---

Inspirado pelo [surma.dev](https://surma.dev/postits/arm64/) estou iniciando essa nova categoria de posts. Post do tipo
`post-it` são mais uma documentação até pra eu mesmo lembrar de certas coisas. Você pode esperar desses posts algum tipo
de insight, mas não uma estrutura completa presente em um post convencional.

## Chrome inspector

Bom que mais tenho utilizado como debugger é o Chrome Web Tools. É uma ferramenta ligeiramente mais complexa do que
o [debugger do nodejs](https://nodejs.org/api/debugger.html), aquele que você consegue executar no terminal.

Sobretudo em projetos que me sinto perdido, ter um call stack me ajuda muito quando preciso me situar. Debugar
aplicações NodeJS com o Chrome Web Tools é bem simples.

Basta executar sua aplicação/script com `--inspect`; exemplo: `node --inspect app.js`.

Geralmente trabalho em aplicações web, e uso `--inspect` no comando pra startar o servidor web. E vai iniciar o debugger
que você pode acessar no seu browswe Chromium-based. Basta acessar `chrome:inspect`.

[imaem aqui]

Clicando ali em `inspect` a ferramenta de [web dev tools](https://developer.chrome.com/docs/devtools) vai abrir pronta
para debug da sua aplicação.

## Debug das requisições Web

Uma outra coisa legal, e que precisei recentemente, é o debug de requisições feitos pelo NodeJS em si. Basicamente eu
estava trabalhando em uma aplicação que envolvia uns wrappers de chamadas a APIs, onde eu definia somente as
configurações de chamada.

Alguns erros na requisição acontecerem e eu queria entender isso melhor. Até que esbarrei com esse jeito aqui de
debuggar requisições no NodeJS.

De modo geral a variável de ambiente [`NODE_DEBUG`](https://nodejs.org/docs/v20.12.1/api/cli.html#node_debugmodule) permite definir uma lista de módulos que queremos debugar. Para o meu
caso estava interessado nas requisições, assim fiz: 

```bash
NODE_DEBUG=http,http2 node script.js`
```

Isso funciona também com `npm`, exemplo: 


```bash
NODE_DEBUG=http,http2 npm start`
```