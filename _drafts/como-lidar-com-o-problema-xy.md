---
layout: post
title: Lidando com o problema XY
date: 2024-03-12
lang: pt-BR
tags: ["banco de dados", "database migrations"]
category: ["banco de dados"]
---

eu pensei em um titulo mais chamativo pra esse artigo e não consegui. fiquei pensando um título que pudesse dizer do que
estou falando, mas sem dizer "problema XY", pois pode ser que você não saiba o que é isso.

Você está aqui e isso significa duas coisas:

1. você percebeu que não atingi meu objetivo no que tange ao título do artigo;
2. eu posso aproveitar que você está aqui e discorres sobre o problema xy, além de comentar sobre como lidar com isso.


## Uma memória com problema XY

A última vez que lembro de cair no problema XY, que definiremos logo mais, eu estava trabalhando em uma implementação
que precisava obter um token do nosso servidor de SSO - Single Sign-On usando certificados. Depois de checar algumas docs internas vi que
tinha uma lib Python. Tentei fazer funcionar mas não consegui.

Então eu chego no canal do time e pergunto sobre essa lib, e exponho problemas que eu estava tendo com ela. Até recebi
algumas respostas, mas continuava sem conseguir avançar.

Até que alguém pergunta: porque você precisa de Python? O que está tentando fazer?

Confesso que por um momento pensei: mas não é óbvio? Quero fazer a lib funcionar e usá-la para obter um token. Mas foi
por pouquíssimo tempo, pois em um estalo eu me dei conta de que havia perguntado algo diferente do que era o meu real
problema.

Acontece que havia uma lib JavaScript muito mais simples pro nosso caso - que é um time todo montado em JavaScript e já
com credenciais suficiente pra instalar e utilizar.

## Definição

O problema XY é quando você está tentando resolver o problema X, assim começa a tentar a solução Y. Ao enfrentar alguma
dificuldade, você faz alguma pergunta sobre o problemas que está tendo em Y, que são diferentes do original.

Que nem no exemplo anterior. Meu problema era obter o token do SSO, não instalar um lib python.

## Como lidar com XY?

Da perspectiva de alguém que não quer cair no problema você pode sempre refletir um pouco antes de fazer uma pergunta ou
pesquisa. A pergunta errada pode levar a um investimento de tempo em algo que não vai render frutos e dependendo do
fórum em que você faz isso, pode ficar sem resposta, ou pior, tomar uma resposta passivo-agressiva de algum membro mais
ríspido.

Perguntas do tipo "Alguém aqui já trabalhou com JavaScript?" são exemplos de XY. Ora, a menos que você esteja fazendo
uma pesquisa, sua pergunta não é sobre alguém ter trabalhado com JS ou não. Você deve é focar no problema que quer
resolver.

Já da perspectiva de quem recebeu uma pergunta e sentiu que algo não parece correto, o certo é realmente fazer
perguntas. Perguntas básicas como:

- por que está fazendo isso?
- porque está fazendo desse jeito específico?

Isso induz a pessoa a refletir. Como aconteceu comigo.
