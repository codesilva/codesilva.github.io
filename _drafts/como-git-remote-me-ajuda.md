---
layout: post
title: Uando git-remote para uma mentoria de código efetiva
date: 2025-06-05
lang: pt-BR
category: ["git"]
tags: ["rubem-alves", "schopenhauer"]
private: false
---

Git é uma das peças fundamentais do desenvolvimento moderno. Seja em qual o âmbito você esteja trabalhando, conhecer bem
o git vai tornar seu trabalho mais efetivo. Afinal, nosso trabalho é feito de colaboração.

Em mentoria isso nao é diferente. Por vezes precisamos auxiliar os mentorados examinando e validando suas
implementacoes

# Checando código dos mentorados

Mesmo em um projeto em que todos tenham acesso geralmente temos um servidor central com o código fonte (ex: GitHub, GitLab). Ao clonar esse repositório o que você tem é uma copia local com uma referência ao repositório remoto.

> Importante deixar claro que esse 'remote' se refere a uam referencia externa, podendo ser na sua propria máquina.

Seu projeto clonado já vem com um `remote` chamado `origin`, que é o repositório de onde você clonou. Com o comando `git remote` você pode ver os remotes configurados no seu repositório local

```bash
git remove

# Saída esperada
origin
```

## Como trabalhar com forks

Quando trabalhando com projetos opensource o que temos é um modelo em que há o repositório central e aqueles que querem contribuir fazem um fork do projeto. Fork é uma cópia do repositório original que você pode modificar livremente sem afetar o repositório original.

Você faz entao o clone do seu fork e suas mudancas serao enviadas pra la. Temos o node como exemplo.

O repositorio original fica em git@github.com:nodejs/node.git. Ao fazer fork ele cria um repositório na minha conta, `geeksilva97`, com link git@github.com:geeksilva97/node.git. Depois disso basta fazemos clone do nosso proprio fork, pois é onde temos total controle e liberdade de mudança

```bash
git clone git@github.com:geeksilva97/node.git
```

https://git-scm.com/book/ms/v2/Git-Basics-Working-with-Remotes
[git@github.com:nodejs/node.git]: git@github.com:nodejs/node.git
[git@github.com:geeksilva97/node.git]: git@github.com:geeksilva97/node.git

