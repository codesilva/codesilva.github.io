---
layout: post
title: Como ganhei 100k USD na Rinha de backend
date: 2023-06-19
lang: pt-BR
tags: ["elixir", "erlang", "nifs"]
category: ["paralelismo", "concorrencia"]
---

no dia 10 de marco se encerrou a segunda edicao "rinha de backend", um hackathon muito divertido. Eu pude participar
dessa edição e trago aqui minhas percepções e insights que obtive ao longo do caminho.

nesse posto discutiremos alguns aspectos tecnicos e sobre decisoes tecnicas, além de algumas observacoes sobre
o comportamento da turma que participou

## Desafio da rinha

A rinha é um hackathon como qualquer outro. Um desafio é proposto, voce da sua implementacao e competira com outros
desenvolvedores.

Dessa vez o desafio envolvia muito mais um controle de concorrencia. A ideia era implementar uma aplicacao web que
lidaria com operacoes bancarias. sua api subiria em duas instancias e estaria atras de um load balancer.

Cada cliente desse banco tinha um um limite, mínimo. Assim, operacoes de debito só poderiam ser performadas dentro do
limite.

Sua api deveria export endpoints para credito, debito e extrato.

O que temos aqui é claramente um problema de concorrencia, onde duas chamadas na mesma conta uma de debito e uma de
credito pudessem ser antendidas.

Os critérios para vencer a rinha, ficam pro final.

## Ecossistema Erlang

o que sinto da rinha é que o convite é à experimentacao, entao é uma grande oportunidade para tentar coisas que um dia
voce quis e nao conseguiu.

Eu, mesmo tenho estudado e erlang/elixir por um tempo. Inclusive, tenho me dedicado a contribuir para projetos
open-source nesse ecossitema como Swoosh e cowboy.

Eu não queria usar um mega framework, como um Phoenix da vida, para fazer algo tao simples e que seria só para uma
competicao. Pretendia fazer coisas mais manuais, pra sentir, ver, cas coisas acontecendo. Que nem um oleiro vendo o vaso
tomar forma.

Minha escolha foi toda baseada no ecossistema Erlang. Usei:

- cowboy como servidor web;
- Mnesia como banco de dados.

Além de NGINX como load balancer.

A priori, quis fazer algo simples. Endpoins, usar transacoes no banco de dados e é isso, e seguindo a cartilha de
implementação basica que é:

- fazer funcionar;
- fazer com que seja certo;
- fazer com que seja rápido.

Além da cartilha do Joe Armstrong (Programming Erlang 14.2) sobre desenvolvimento de aplicações distribuídas que é:

- fazer o programa de forma regular, rodando em um único nó;
- executar em dois nós diferentes, mas na mesma máquna;
- executar em duas máquinas diferentes.

Meu objetivo era ter uma estrutura com um cluster Erlang de dois nós, cada nó teria um server rodando, apto a receber
requests.

A requests recebidas pelo endpoint seiam direcionadas ao Mnesia em uma transação. Como o mnesia é distribuído, fazer as
oeprações em uma transacao já garantiria a parte do debito.

## Pensando um pouco sobre o problema

veja que, a despeito das validacoes em id de cliens, tipo de transacao, nosso real problema aqui era só evitar um saldo
menor que seu limite. isso nos diz entao que transacoes de creditos podem ser aceitas indefinidamente, o que temos de
checar é na transacao de credito, checar se nao há um limite menor.

server -> mnesia transaction

## Modelagem do banco de dados

## Multitenancy

## Docker no Mac

### Profiling e código C (blazingly fast)

# Parte 2

## A síndrome do segundo sistema e lei de goodhart

https://en.wikipedia.org/wiki/Goodhart's_law

## Pavonismo

## Resultados

## Conclusão
