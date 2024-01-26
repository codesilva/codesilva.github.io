---
layout: post
title: Seja um Desenvolvedor de Software Senil
date: 2024-01-22
lang: pt-BR
tags: ["algoritmos", "estrutura de dados e algoritmos", "algoritmos de busca", "busca binária"]
category: ["ciência da computação"]
---

Disclaimes: Esse post é um script para o encontro do workshop de Estrutura de Dados e Algoritmos apresentado no [Canal da
Codeminer42]() no Youtube.

Programação é sobre manipulação de dados. Independentemente do nível em que estamos trabalhando seja mais alto nivel ou
algo em mais baixo nível.

Pensando em baixo nível, von neumman jã descreveu:

A instrucao está na memoria, temos que fazer o fetch, o decode e aí a execução. Entao mesmo no nível microscópico dos
microchips da sua máquina temos busca.

## Buscar pra quê?

Buscar items é uma tarefa de extrema importancia no dia-a-dia. Trazendo mais pra realidade de desenvolvimento web. No
frontend isso é bem forte, porque geralmente temos um estádo ali carregado.

Como exemplo posso citar uma implementação de offline-firts em que tive a oportunidade de fazer - e falhar bastante.
Nessa aplicação tínhamos uma série de entidades presentes offline, porém, a manipulação dos dados variava e as escolhas
feitas não foram das melhores.

Por exemplo, tínhamos uma certa entidade, que no app, era mais propicia a ser buscada num range - e os dados já vinham
ordenados. Outras entidades eram mais propicias a serem buscadas por chave e por aí vai. Ao longo desses últimos dois
encontros vamos falar mais sobre situações como essa.

## Busca binária

Nós já vimos busca binária, lá no início. Hoje vamos menciona-la de novo. Busca binária é uma técnica de busca em que
dividimos a sequência em duas partes e procuramos a chave baseado nesse meio. Tendo assim três casos:

1. o item do meio é exatamente a chave buscada;
2. a chave buscada é maior; nesse caso, efetuamos mais uma busca na metade do array da direita, onde estão os maiores
   valores
3. a chave buscada é menor - nesse caso, efetuamos mais uma busca binária na metade da esquerda.

Para fazer isso usamos dois ponteiros _low_ e _high_. Eles começam com low=0 e high=length(S) - 1. Assim, se cairmos no
caso 2, incrementamos low para o índice do meio mais um. Se for o caso 3, mudamos high para o indice do meio menos um

```
mid = floor((low + high)/2)

caso 2: low = mid + 1
caso 3: high = mid - 1
```


### Interpolation search

Uma tentativa de melhorar a busca binaria. Ao inves de dividir o array ao meio, dividimos em um lugar mais preciso.
Pense em quando você procura uma palavra no dicionario. Se a palavra come~ca com "a" você nao abre no meio, mas sim no
começo. Se começar com z, você abre mais pro final.

Essa  é a ideia.

## Hashes

Hash map é uma estrutura de dados. Nós vimos durante os encontros também. Inclusive, implementamos um HashMap proprio
e não sei se vocês souberam, mas fizemos um banco de dados. 

Bom, na implementação do Amnesia uma das nossas estruturas de indice era a de hash - na verdade acho que foi a única que chegamos a implementar.

E não sei se lembram, mas quando falamos sobre hash map nós mostramos alguns exemplos bem úteis (slide 44). Se um
problema envolve lookup de alguma forma, pensar em hash pode ser uma boa.

Vamos um probleminha legal:

você recebe um array ordenado e seu algoritmo deve determinar quantos pares somam em 0.

## Strings: Matching
