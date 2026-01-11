# Workshop: Como contribuir com o Node.js

## Introdução


### Open Source: os porquês

Nessa talk entenderemos o os porquês e o como da contribuçao open source. dentre as várias razoes destaco algumas:

- Você ajuda a construir o software que você usa e devolve para a comunidade
- Você melhora suas habilidades de programação
- Isso ajuda a construir seu portfólio

https://edigleyssonsilva.medium.com/why-and-how-to-contribute-to-open-source-projects-3d985d8d8619

### Por que Node.js é o melhor projeto para contribuir?

Gostaria de começar eliminando a principal barreira que impede as pessoas de contribuirem com projetos open source:
o medo de não serem boas o suficiente.


https://codesilva.com/nodejs/opensource/2025/01/07/nodejs-e-o-melhor-projeto-opensource-para-contribuir.html#nodejs

## Conhecendo o Node.js

[diagram com as dependencias principais do Node.js, como libuv, V8]

### Preparando ambiente

- fork do repositorio
- clonar o repositório
- compilar o Node.js
    - requerimentos: git, python3, gcc, g++, make
    - `cd /mynode && ./configure --debug-node  --node-builtin-modules-path "$(pwd)"`
    - `make -j4`
    - `./node -e "console.log('Hello World')"`


### Codebase

#### Pastas principais

- lib/*: todo javascript fica aqui
- src/*: todo C++ fica aqui
- test/*: testes
- dep/*: dependencias (libuv, v8, etc.)
- doc/*: documentação

#### Vamos implementar uma feature no módulo sqlite

A feature que vamos implementar é um buffer reader. Para tal iremos expandir o módulo node:buffer.

##### JS Side

[implementacao do lado javascript]

##### C++ Side

[implementacao do lado C++]

### Interagindo com a comunidade

Screenshot de https://nodejs.org/en/about/get-involved

- Repositório - https://github.com/nodejs/node
    - Issues
    - PR
- Ajuda - https://github.com/nodejs/help
- OpenJs Foundation Slack - https://slack-invite.openjsf.org/
- Reunioes - https://nodejs.org/calendar


## Nate berkopec talk - how puma works

https://www.youtube.com/watch?v=SquGNt4FhY0
https://github.com/zloirock/core-js/blob/master/docs/2023-02-14-so-whats-next.md

> Solution to hero culture in open-source software is probably not to poorly pay the heroes with donations

Distribute contributions across multiple people: lower bus factor (1), motivating, better software, less burnout

(1): what if you are hit by a bus?

OSS: fun, easy, good way to learn

Reasons why people don't do it: experience for new contributors is not great.


https://x.com/fxn/status/1840734401191137432
