# Programacao funcional para mortais

O paradigma de programacao funcional, como qualquer outro, trata-se da perspectiva utilizada para se resolver
o problema. Em nosso dia-a-dia podemos precisar lidar com múltiplas linguagens de programação que podem ser de
diferentes paradigmas. Mesmo lidando com o pragmatismo de se trabalhar com apenas uma linguagem no dia-a-dia, boa
parte das linguagens que utilizamos é multiparadigma, nos dando a flexibilidade de usar as técnias mais convenientes
para a resolução do problema dado.

O objetivo desse workshop é acrescentar ao portfólio dos miners o conhecimento acerca de programação funcional. Mais
precisamente o conhecimento prático acerca do tema. Ao longos dos tópicos não só conheceremos os conceitos, mas traremos
para a realidade mostrando exemplos práticos e reais, de coisas feitas durante o trabalho em clientes.

Procurei fazer em um poucos tópicos pois é notável a queda de engajamento nos workshops que se estendem por muito tempo
em um único assunto.

## Projeto Final

Gostaria de encerrar esse workshop com algo que aparenta ser menos pragmático, mas que revisa todo o workshop e ainda
nós traz um entendimento mais profundo sobre como as coisas funcionam em bibliotecas como ReactJS. Nesse projeto final
faremos algo semelhante ao que o React faz, só que bem mais simples e bem focado no "funcional" da biblioteca.

Com esse projeto veremos como a imutabilidade simplfica muita coisa (Flux, CQRS, Event sourcing) além de observarmos
o toque de eficiência que um lazying pode trazer.

Em suma, creio que aprenderemos bem sobre ciclo de vidas de componentes nos dando assim uma perspectiva diferente.

### Introdução
    - As raízes
        - Lambda cálculo e Cathegory Theory
    - Declarativo vs imperativo
    - Imutabilidade
    - Funcões e HOFs
    - Side-effects: dados, cálculos e ações

### Currying
    - Entendendo Currying 
    - Entendendo Partial Application
    - Casos de uso para currying
    - Estudo de caso: um gerador de middleware para o Express

### Lazy evaluation
    - Premissas e casos de uso
    - Lazy evaluation no mundo real
        - React lazy: https://react.dev/reference/react/lazy
        - ActiveRecord (e outros frameworks são lazy): https://guides.rubyonrails.org/active_record_querying.html
    - Estudo de caso: O dia em que usamos lazy evalutaion como uma forma de deixar o código mais limpo.

### Streams
    - Streams são `lazy sequences`
    - Estudo de caso: Lidando com listas grandes
    - Estudo de caso: Lidando com arquivos

### Functors
    - Entendendo Functors
    - Functors e pipelines: Maybe
    - Functors e error handling: Either
    - Functors que você usa no dia-a-dia (e nem vê)
    - O que é um monad?

### Lidando com side-effects
    - Services: dados, cálculos e ações (de novo)
    - Um pequeno tour sobre `classes` em Scala
    - Lazy effect (https://jrsinclair.com/articles/2018/how-to-deal-with-dirty-side-effects-in-your-pure-functional-javascript/)

### Um framework React-like
    - Imutabilidade
    - Re-render
    - Lazy evaluation e reducing (com Virtual DOM)
