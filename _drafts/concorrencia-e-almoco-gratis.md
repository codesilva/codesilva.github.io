---
layout: post
title: Concorrência e almoço grátis
date: 2024-02-01
lang: pt-BR
tags: ["programação", "concorrência", "paralelismo", "threads", "erlang"]
category: ["programação", "paralelismo", "concorrência"]
excerpt: Herb Sutter falou em 2005 sobre o fim do almoço gratis.
---

Em 2005 Herb Sutter escreveu esse famoso psot sobre o almoco gratis que existia com a, bastante conhecida, Lei de
Moore. Que nao é uma lei e sim uma observacao feia por Gordon Moore acerca do crescimeno exponencial da capacidade dos
processadores - na verdade ele fala sobre densidade de transitores e bla bla bla, mas para o nosso proposito isso
é demais.

Dessa observação de moore obtemos o corolario de que a _velocidade_ de processamento também aumentaria, assim, de
graçca. Você escreveu uma aplicação e dali a dois anos ano ela já tinha uma performance melhor, sem que você
precisasse necessariamente altera-la. Voce tinha isso de graça.

Estams em 2024 e eu até me surpreendi nas pesquisas, pois depois de 19 anos do post de Herb Sutter, a Lei de moore ainda
continua funcionando.

## O fim da lei de moore

> Does this mean Moore’s Law is over? Interestingly, the answer in general seems to be no. Of course, like all exponential progressions, Moore’s
> Law must end someday, but it does not seem to be in danger for a few more years yet. Despite the wall that chip engineers have hit in juicing
> up raw clock cycles, transistor counts continue to explode and it seems CPUs will continue to follow Moore’s Law-like throughput gains for
> some years to come.

## A Revolucao

> Concurrency is the next major revolution in how we write software. Different experts still have different opinions on whether it will be bigger than OO, but that kind of conversation is best left to pundits. For technologists, the interesting thing is that concurrency is of the same order as OO both in the (expected) scale of the revolution and in the complexity and learning curve of the technology

### As linguagens de programacao

### As ferramentas

## Pra você o almoço é quase grátis

Me deparei com esse [tweet](https://twitter.com/vite_js/status/1753034156156534958) do Vite. Que mostra que concorrencia
tá realmente em todo o lugar, só não é você que faz.

Pelo menos não você que, assim como eu, é um ordinário desenvolvedor de aplicações web. O auge da sua aplicação de
programação concorrente é subir um server nodejs em modo cluster.

## Concorrência que fazem por você no desenvolvimento web

### Threads para I/O no browser e no NodeJS

### Web Servers

## Conclusão

A facilidade que essas ferramentas trazem é o que permite, por exemplo, uma web performática. Assim, nós devs comuns,
não precisamos nos dedicar a tempo as essas coisas que estão mais por debaixo dos panos. 

Mas acredito que é importante entender o funcionamento, e mesmo com essas facilidades, entender que a oportunidade para
melhorar ainda mais. Estudar e entender concorrência te abre uma série de possibilidades.

## Referencias

- [Artigo do Herb Sutter](https://www.cs.utexas.edu/~lin/cs380p/Free_Lunch.pdf)
- [https://en.wikipedia.org/wiki/Moore%27s_law](https://en.wikipedia.org/wiki/Moore%27s_law)
