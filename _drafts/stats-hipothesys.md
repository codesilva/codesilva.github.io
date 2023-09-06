--
layout: post
title: Hipótese do stats
date: 2023-06-19
lang: pt-BR
tags: ["concorrencia"]
category: ["concorrencia"]
excerpt: O problem do stats e uma possível solução usando concorrência
---

## O problema do stats

A ideia desse texto é discorre como e se podemos aplicar concorrência ao projeto `poynt/stats`. Entre outras coisas
o `stats` é um projeto extremamente frágil. Um simples `await` afeta todo um processo o que faz a aplicação cair.
A hipótese é que aplicando concorrência possamos:

- isolar as partes da aplicação, nesse caso poderíamos ter um processo por topico do kafka;
- utilizar melhor os recursos. hoje temos 5 servers pro stats, acedito que estejamos subutilizando alguns recursos.

### Plano de ação

- Identificar servidores e analisar uso dos recursos de cada server
- Identificar tópicos e separar (acredito que essa separação possa ser feita um tópico por vez)
- Após a implementação aplicar um teste de carga 


### Bonus: Implementação do stats usando elixir
Por que não? Se pá podemos implementar tudo em elixir e parar de sofrer com as coisas.
