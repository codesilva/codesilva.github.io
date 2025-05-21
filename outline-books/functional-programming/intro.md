# Introdução

O propósito desse capítulo é introduzir alguns dos building blocks necessários para os próximos encontros.

## As raízes

As raízes da programação funcional estão na matemática. A ideia é que a programação funcional é uma forma de programar
que se baseia em funções matemáticas.

Idealmente queremos funções como na matemática, que são puras, ou seja, que não tem efeitos colaterais. Isso significa
que uma função pura sempre retorna o mesmo valor para a mesma entrada.

Claro, na prática, isso não é possível. Afinal, precisamos de efeitos colaterais para interagir com o mundo real. Mas
a ideia é que a maior parte do nosso código seja composta de funções puras.

## Lambda Calculus (uma linguagem feita só de funções)

[Aqui adicionar um exemplo de algumas estruturas de lambda calculus]

## Declarativo ou imperativo

Isso aqui é mais sobre estilo. Programação imperativa é quando você diz ao computador como fazer algo. Programação
declarativa é quando você diz ao computador o que você quer que ele faça.

É a dualidade `o que` vs `como`. Pense como faria para somar números de uma lista.

Imperativo:

```js
let sum = 0;
for (let i = 0; i < list.length; i++) {
  sum += list[i];
}
```

Declarativo:

```js
let sum = list.reduce((acc, curr) => acc + curr, 0);
```

Um outro exemplo é o SQL. Você diz ao banco de dados o que você quer, e ele se vira para descobrir como fazer isso.

## Funções e Higher Order Functions

Funções são first class citizens em JS e Ruby. Isso significa que são tratadas como qualquer outro valor. Podem passadas
como argumentos para outras funções, podem ser retornadas por outras funções, podem ser atribuídas a variáveis.

Higher Order Functions são funções que recebem outras funções como argumento ou retornam funções.

```js
function apply(f, x) {
  return f(x);
}

function addOne(x) {
  return x + 1;
}

apply(addOne, 1); // 2
```

## Composição

Composição é a ideia de que você pode combinar funções para criar novas funções. Isso é muito poderoso e é uma das
coisas que torna a programação funcional tão interessante.

```js
function compose(f, g) {
  return function(x) {
    return f(g(x));
  }
}

function addOne(x) {
  return x + 1;
}

function double(x) {
  return x * 2;
}

let addOneThenDouble = compose(double, addOne);

addOneThenDouble(1); // 4
```

## Imutabilidade

Imutabilidade é a ideia de que uma vez que um valor é criado, ele não pode ser alterado. Isso é importante para garantir
que funções sejam puras. Se você altera um valor, você está criando um efeito colateral.

Isso é facilita muito as coisas tornando o código mais fácil de entender e de testar. Em Erlang, por exemplo, você não
pode alterar o valor de uma variável. Elas não são variáveis, são constantes.

Em Erlang, não há nem estruturas imperativas de loop como `for` ou `while`. Tudo é feito com recursão. Para tal, Erlang
tem umas otimizações para evitar stack overflow, como a Tail Call Optimization.

Além desse tipo de otimização, Erlant também otimiza a alocação de memória. Em vez de criar um novo valor toda vez que
você altera uma variável, Erlang cria um novo valor apenas quando necessário.

É a imutabilidade que permite, de forma simplificada, a concorrência em Erlang.

JavaScript não é Erlang, mas podemos usar algumas técnicas para tornar o código mais funcional.

## Closures

Closures são funções que capturam variáveis do escopo onde foram definidas. Isso é muito útil para criar funções que se
comportam de forma diferente dependendo do contexto.

```js
function makeAdder(x) {
  return function(y) {
    return x + y;
  }
}

let addOne = makeAdder(1);

addOne(2); // 3
```

## Funções Puras e Side Effects

### Cálculos, ações e dados

Funções puras são funções que não tem efeitos colaterais. Isso significa que elas não alteram o estado do programa, não
fazem requisições de rede, não alteram o banco de dados, etc.

## Estudo de caso: Flux

Como o React mudou a forma como pensamos sobre aplicações web. A ideia de que o estado da aplicação é uma função do
tempo. O Flux é uma arquitetura que tenta formalizar essa ideia. A ideia é que o estado da aplicação é armazenado em um
único lugar, o Store, e que a única forma de alterar o estado é através de Actions.
