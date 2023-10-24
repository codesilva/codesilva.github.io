# Recursao e simplicidade

A ideia é que tenhamos o pensamento intuitivo de como resolver problemas decompondo em soluções menores. Isso vai nos
dar o intuitivo necessário, um modelo mental de pensamento.

Um miniframework seria:

- Pense em casos mais triviais, pequenos
- Teste alguns casos e encontre o padrão necessário.

### Exemplo 1 - Torre de Hanoi

Torre de hanoi é um jogo em que temos três torres, a torre A, a torre B e a do meio que é auxiliar. A ideia é mover os
discos da `torre A` para `torre B` de modo que não coloquemos um disco maior em cima de um menor - [torre de hanoi
online](https://www.somatematica.com.br/jogos/hanoi/).

Uma pergunta, difícil de responder a princípio, é: quantos movimentos preciso pra mover `n` discos? Se seguirmos o nosso
framework podemos começar com casos triviais. Então seja `T(n)` uma função que retorna a quantidade de movimentos e `n`
quantidade de discos.

- `T(0) = 0` - para zero discos não temos movimento a fazer.
- `T(1) = 1` - para mover um único disco basta mover de A para B.
- `T(2) = 3` A partir daqui, precisamos mover o disco menor para a torre do meio, o maior para a torre B e o disco que
    estava no meio para a torre B.
- `T(3) = 7`
    - Movemos o disco d1 (menor) para a torre b
    - Movemos o disco d2 (medio) para a torre do meio
    - Movemos o disco `d1` da torre b para a torre do meio
    - Movemos o disco `d3` da torre A para a torre B
    - Movemos o disco `d1` da torre do meio para a torre A `Perceba que a partir daqui temos o caso de mover dois discos
        para a torre B a diferença para o caso T(2) é que os discos estão na torre do meio, mas o processo é o mesmo`
    - Movemos o disco `d2` da torre do meio para a torre B (ficando sobre o disco `d3`)
    - Movemos, finalmente, o disco `d1` para a torre B (ficando sobre o disco `d2`)

Generalizando o que precisamos fazer para mover `n discos` na torre de hanoi é:
    - Mover (n-1) discos para a torre do meio - Isso deixa o disco maior, `dn`, sozinho na torre A
    - Mover o disco `dn` para a torre B
    - Mover (n-1) discos da torre do meio para a torre B

Assim chegamos em: T(n) = T(n-1) + 1 + T(n-2) => `T(n) = 2T(n-1) + 1`.

### Exemplo 2 - Invertendo uma Lista ligada

Para inverter uma lista ligada podemos seguir o mesmo modelo da torre de hanoi. Começamos com o mais trivial. Os casos
mais triviais/simples na inversão de uma lista ligada são:

- uma lista vazia - uma lista ligada vazia tem sua cabeça como `null`, podemos simplesmente retornar `null`;
- uma lista de 1 item - uma lista de um item invertida, é a própria lista, então basta retornar a cabeça;
- uma lista de 2 itens - uma lista de dois itens, podemos então pegar dois a dois fazendo `previous` e `current` ser
    o primeiro e o segundo item.

    Seja a lista `A -> B` teremos a função `reverseTwoNodes(previous, current)`

    Primeira iteracao `reverseTwoNodes(null, A)`. Queremos `newCurrent = A.next` e `A.next = null` então chama
    a proxima iteração passando como primeiro parametro o atual `current` - que na proxima iteração será o `previous`
    e o `newCurrent` que na proxima iteração será o `current`.

    Segunda iteracao `reverseTwoNodes(A, B)` -> `newCurrent = B.next` e `B.next = A`.

    Terceira iteração `reverseTwoNodes(B, null)` -> Encerra, poir current é null

    ```js
    // inicia com reverseTwoNodes(null, head)
    function reverseTwoNodes(previous, current) {
        if (current == null) {
            return previous;
        }

        const newNext = current.next;
        current.next = previous;

        return reverseTwoNodes(current, newNext);
    }
    ```


### Exepmlo 3 - Invertendo uma Árvore binária


`reverseBinaryTree(root)`

Casos triviais:

- Árvore vazia --> `null`
- Árvore de um nó sem filhos --> `retorna o proprio nó (root)`
- Árvore de um nó com filhos --> `inverte os filhos do root e retorna o root`

O código a seguir só inverte os filhos do nó root

```js
function reverseBinaryTree(root) {
  if (root === null) return null;

  const rightSubtree = root.right;

  root.right = root.left;
  root.left = rightSubtree;

  return root;
}
```

Pra funcionar por completo, precisamos atacar as subárvores

```js
// codigo omitido
const rightSubtree = root.right;

root.right = reveserBinaryTree(root.left);
root.left = reverseBinaryTree(rightSubtree);
```

# Programação Dinâmica - Introdução

Programação Dinâmica é uma técnica de algoritmos para a resolução de problemas envolvendo uma sequência de decisções.
A ideia é que consigamos tornar um algoritmo de tempo exponencial em um algoritmo de tempo polinomial - polinomial
`n^c`, onde `c` é constante.

A contrapartida disso é que gastamos espaço. É imprescíndivil para um problema ser resolvido pela técnica de programação
dinâmica que ele tenha uma `subestrutura ótima`. Que em termos simples quer dizer que podemos calcular a solução ótima
de um subproblema e assim compor a solução ótima do problema maior.

Para termos um tempo de execução razoável é importantíssimo tb que tenhamos sobreposição de problemas, pois assim
podemos utilizar as computações já feitas.

DP = recursão + memoização
DP = força bruta com cuidado
DP é bem visualizado em um grafo e quase sempre o problema é resolvido pelo menor caminho.

## Framework para a resolução de problemas envolvendo DP (Dynamic Programming)

- Definição do problema
    Geralmente esse vai ser dado como enunciado do problema, mas enfim, é importante ter essa definição

- Palpite/análise e definição da relação recursiva
    Aqui precisamos analisar o problema e tentar alguns insights, algumas conjecturas. Por exemplo, se estivermos
    lidando com um escolha precisamos compreender o que acontece quando escolhemos `x` e quando não escolhemos `x`.

    A partir disso conseguimos definir a relação recursiva dos subproblemas.

- Casos Base
    Definimos os casos base para que tenhamos condições de parada

- Ordem de resolução
    Definimos a ordem em que os problemas serão resolvidos. Isso é importantíssimo pois é como faremos um melhor uso dos
    recursos e evitaremos um `grafo cíclico` por se tivermos ciclos temos um loop infinito e não teremos uma resolução
    para o problema.

- Resolução do problema original
    Definimos a resolução do problema original, que pode ser usando a relação recursiva do subproblema em si, ou uma combinação dos subproblemas. As vezes queremos somar os subproblemas, por exemplo.

- Análise assintótica
    Analisamos o tempo de execução do algoritmo. Mais simples de ver se usarmos `bottom-up`. Para recursão podemos
    utilizar o `Teorema Mestre`.
 

### Exemplo 1 - Fibonacci

#### Memoização

#### Abordagem bottom-up

### Exemplo 2 - Climbing stairs

## Sequências

- prefixos
- sufixos
- substring

# Definição formal - DPFE (Dynamic Programming Functional Equation)

### Exemplo 3 - Buy Stock

### Exemplo 4 - Buy Stock com mais de uma operação - exemplo de substring

## Reconstruindo soluções

Geralmente problemas pedem um máximo, mínimo... a quantidade de possiblidades, etc. Mas as vezes queremos refazer os
passos que levaram à solução ótima.

Veremos como fazer isso agora.

### Exemplo 5 - Buy Stock com um numero maximo de "k" de operações

## Referencias
- https://github.com/victorhmp/OBI-Prep/blob/master/Programa%C3%A7%C3%A3o-Din%C3%A2mica/Exerc%C3%ADcios.md
- Livro: Dynamic Programming, a computational tool - Art Lew

## Problemas interessantes

- Remover Ilhas
    Nesse problema é data uma matriz `m` por `n`. Essa matriz possui 0s e 1s representando pixels. O problema pede que
    removamos todas as ilhas. Uma ilha é um conjunto de pixels que não toca a borda da imagem.

- Disponibilidade de horarios para reuniao
    Nesse problema são dadas duas sequencias x1 e X2 representando horarios de eventos em calendarios (eg. X1 = [[10:00,
    13:00], [14:00, 14:15]]). O problema pede que processemos ambas as sequencias e devolvamos em que slots as pessoas
    dos respectivos calendatios podem marcar ruenioes.

- Escolha do apartamento (problema 2)
    A sequencia X = [a, b, c, ...] é composta por objetos que indicam quadras de uma grande rua. Cada objeto contém
    informação sobre se naquela quadra há `biblioteca`, `bar` e `quadra de beach tenis` (eg {academia: true, farmacia: false,
    lanhouse: false} exemplo de quadra que possui academia mas nao farmacia nem lan house).

    O problema pede que ce escolha uma das quadras pra morar dado alguns requerimentos. Por exepmlo se o requerimento
    for `bar` voce tem de escolher um apartamento em uma quadra o mais proximo possivel de uma academia.

    O ponto é que os requerimentos são uma lista então podem ser: academia e farmacia, assim a escolha deve considerar
    o lugar mais proximo de farmacia e academia. A distancia entre as quadras é dada pelos indices da sequencia.

- Pair sum
    É dada uma sequencia X e um valor inteiro k. Algoritmo deve dizer é há naquela sequencia algum par que i1, i2 tal
    que i1 + i2 = k;


### Problema 2 - Escolha do apartamento

Bom, podemos tentar aplicar o SORTBT aqui definindo os **S**ubproblemas primeiro.

    > Para cada i queremos computar a distancia necessária para comprir o requerimento rk em R = (r1, r2, r3, ..., rk)
    > Assim sabendo a distancia que é necessária para cumprimos cada requerimento, podemos então pegar o maior e assim
    saberemos o maximo de distancia que precisa pra cumprir todos partindo de i.

    DP[i, r] = distancia de i pra cada requerimento

    > Subproblem: S(i, R, d, DP)

    > Relation: S(i, R, d, DP) = max(S(i-1, R', d + 1, DP[i, r] = min(d, DP[i, r]) para cada r em R - R' se DP[i, r]), S(i+1, R', d + 1, DP[i, R] = min(d, DP[i,r])))
    > Req(i) retorna as keys { r1, r2, ..., rn } dos requerimentos atendidos por i
    > Precisamos do mínimo

    > Base cases: S(i, [], d, DP) = max(DP[i, r] para cada r em DP) - assim retorna o maximo, dizendo então qual
    o maior tamanho pra atingir a todos os requerimentos
    > Base cases: S(-1, R, d, DP) = S(n, R, d, DP) = DP[i, r] = infinity para cada r em R (significa que chegamos no fim
    da lista mas não atingimos toda a lista de requerimentos)
 
    Problema original: min(S(i, R, 0, DP = {})) i = 0, 1, 2, ..., n-1

    Orderm topológica: i = 0, 1, 2, 3, ..., n-1


- Casos base
    - S(i, []) = 0, pois quando não há requerimentos não precisa de uma escolha. Qualquer um serve
    - S(0, R) = S(n, R) = infinity

- original problem: queremos saber qual o bloco `i` ideal pra morar. Assim precisamos checar pra cada i qual tem menor
    distância entre os requerimentos. 

    OriginalProblem(Street, R) = min { S(i, R) | 0 <= i < n }

    Street é a sequencia de blocos
