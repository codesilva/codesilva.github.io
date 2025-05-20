# Workshop: Como contribuir com o Node.js

## Introdução

### Open Source: os porquês

### Por que Node.js é o melhor projeto para contribuir?

https://codesilva.github.io/nodejs/opensource/2025/01/07/nodejs-e-o-melhor-projeto-opensource-para-contribuir.html#nodejs

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

##### JS Side
##### C++ Side
