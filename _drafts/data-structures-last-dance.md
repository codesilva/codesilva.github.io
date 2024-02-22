# A ultima dança

## A nossa busca binária

Bom, ficamos devendo a busca binaria no encontro passado. Aqui está a implementacao:

[mostrar implementacao]

E pra que isso? Como falei, somente para termos esse gancho. De como lidamos com estrturuas no dia a dia.

Hoje vamos revisitar isso. Ver como podemos estruturar dados no frontend de modo que seja eficiente e fácil de
manipular, e por fim, veremos as regras de ouro na hora de lidar com estruturas de dados.


## Estruturas do dia a dia

Me perguntaram: quais estruturas eu devo saber?

A gente viu estruturas variadas aqui, mas no geral a gente utiliza estruturas de sequencias como Arrays e Sets
e estruturas de chave/valor.

Naturalmente, problemas especificos vao requerer estruturas e algoritmos especificos. Como um exemplo, pra memtables
queriamos estrutuas em que pudessemos associar chave/valor, mas que pudessemos fazer range tambe, logo um hash table nao
é adequeado. Uma estrutura de nó como arvore encaixa melhor.

O pareto aqui é rei. Para a maioria dos nossos problemas, essas poucas estruturas vao servir bem. Entao vamos falar um
pouquinho mais sobre o dia a dia mesmo, com normalizacao e com alguns cuidados que devemos ter com essas estruturas.

## Normalizacao de dados

Isso aqui é algo extremamente importante. Sobretudo no frontend porque é onde consumimos os dados. Geralmente o backend
só fala com o banco de dados e manda dados de volta. Boa parte do trabalho de eficiencia com estruturas de dados é feito
pelo proprio banco de dados.

Uma das grandes diferencas entre o trabalho do frontend e do banco de dados é que no front geralmente lidamos mais com
estruturas em memoria. O banco usa tanto estruturas em memoria quanto em disco.

Bom, vamos pra normalizacao, sob os cuidados do pessoal do redux


## Exemplo de iterators

```js
const filter = (fn, iterable) => {
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return  {
        next: () => {
          console.log('next of filtering')
          do {
            var { done, value } = iterator.next()
          } while (!done && !fn(value))

          return {done, value}
        }
      }
    }
  }
};

const map = (fn, iterable) => {
  const iterator = iterable[Symbol.iterator]();

  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const { done, value } = iterator.next();

          return {done, value: done ? undefined : fn(value)};
        }
      };
    }
  };
};

const take = (numberToTake, iterable) => {
  const iterator = iterable[Symbol.iterator]();
  let remainingElements = numberToTake;

  return {
    [Symbol.iterator]() {
      return {
        next: () => {
          const {done, value} = iterator.next();

          const newDone = done || remainingElements-- <= 0;
          const newValue = newDone ? undefined : value;

          return { done: newDone, value: newValue }
        }
      };
    }
  };
};


class Range {
  constructor(from, to) {
    this.from = from;
    this.to = to;
    this.funcs = [];
  }

  filter(fn) {
    this.funcs.push(filter.bind(null, fn));
    return this;
  }

  map(fn) {
    this.funcs.push(map.bind(null, fn));
    return this;
  }

  take(n) {
    this.funcs.push(take.bind(null, n));

    return this;
  }

  evaluate() {
    const [fn, ...funcs] = this.funcs;

    return funcs.reduce((acc, func) => func(acc), fn(this));
  }

  toList() {
    return [...this.evaluate()];
  }

  [Symbol.iterator]() {
    return {
      next: () => {
        const value = this.from;
        const done = value > this.to;
        this.from = value + 1;

        return {done, value};
      }
    }
  }

  iter() {
    return this[Symbol.iterator]();
  }
}
```
