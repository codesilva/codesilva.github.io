# Entrevista, TDD de londres e no que isso afeta o Gremio

## Entrevistas menos praticas

Existe um tipo de entrevista que voce chega e tem de trabalhar em algum algoritmo ou algo assim. Algo como: determine se
um conjunto é subconjunto de outro ou faça um algoritmo que determina se dois números em uma lista somam em 10. Algo
nessa linha.

Esse tipo de entrevista técnica é bem comum nessas empresas famosonas como Google e Netflix. Embora algumas pessoas não
gostem desse tipo de entrevista, eu acho que faz sentido em empresas como essa.

Isso porque ao entrar em um Google da vida você trabalha com muitas coisas. Você não vai ficar só fazendo CRUD para
sempre. Uma versatilidade é necessária. É bem fácil ver isso acompanhando pessoas que produzem conteúdo e trabalham lá.

Com esse tipo de entrevista é possível ver o quão você está disposto a aprender coisas - que num primeiro momento podem parecer pouco práticas.
Aprender ReactJS é fácil, entender o funcionamento de uma estrutura e determinar o melhor uso dela é um pouco mais complicado, pois é um nível de abstração abaixo.

Em suma, acredito que para times multidisciplinares isso faz sentido. Agora, sinceramente, se seu time lida com backend.
Seu negócio é Ruby on Rails. O time faz CRUD o dia todo e é isso. Sério mesmo que você precisa ver o cara implementando
uma busca binária?

Atestar que a pessoa sabe Ruby e sabe Rails já não é o suficiente? (sidenote: na verdade isso depende da posição, pois
no dia a dia o uso de um algoritmo ou outro, uma estrutura de dados ou outra vai ser determinante).

Mas de pleno pra baixo é aceitável não saber disso.

## O salto de abstração

É como caminhar numa via de tres maos. Voce sempre vai na do meio, voce começa ali. Mas voce precisa mudar de via uma
hora ou outra para adquirir uma habilidade novo.

é que nem super mario quando voce vai numa fase específica para pegar o yoshi

## O guia simples de como passar nessas entrevistas de algoritmos e estruturas de dados

O pre-requisito é conhecer algoritmos e estrutura de dados. Como você leu [meu último post](/#blah) sabe que usar
é diferente de conhecer. O exercício é o mesmo. Você realmente sabe como arrays funcionam? Então explique de forma
simples para alguém o seu funcionamento, como é criado, o que acontece quando um item é adicionado etc.

Claro, saber da estruturas e algoritmos não é suficiente sem método. Então eis aqui a lista:

1. fique atento ao caso trivial do seu problema
    1. escute e entenda o problema - sei que aparece obvio; confirme se entendeu corretamente;
    2. rabisque em algum lugar se possível; sobretudo quando lidamos com estruturas de nó isso é útil;
2. faça funcionar primeiro;
3. faça ser certo - remova duplicações, códigos desnecessários etc;
4. faça ser rápido - como essa solução pode ser melhorada?

## Entrevistas praticas

## As regras do jogo

Algumas regras sao implicitas. Só de jogar voce já concorda

# Roteiro brownbag

Esse livro aqui, Concrete Mathematics, é muito bom. Ele me fez lembrar do modelo matemático. Como provas matemáticas.
Provas podem ser de diferentes formas:

- prova direta;
- por inducao;
- por absurdo;

Independentemente da sua escolha, o que importa é que você vai ter que formar bases sólidas de argumentação para validar a sua prova. Você parte de axiomas e a proposição dada e chega numa conclusão, seja que a proposição é falsa ou verdadeira.

E como isso funciona? Bom, para tornar explícito, vamos entender como provaríamos que `para qualquer n inteiro >= 5, 2^n > n^2`.

Pode ser assustador no começo, mas esse é um caso mais simples. Acho que até o chatgpt consegue te explicar isso.

O que temos é a hipótese e começamos validando o caso base dessa hipótese, no caso, n=5.

`2^5 = 32 > 5^2 = 25`

De fato, o caso base funciona. O que vem a seguir é uma série de aplicações de axiomas com o objetivo de mostrar que de
fato a hipótese é verdadeira.

## O que isso tem a ver?

Essa é a pergunta que você se faz nese momento. No dia a dia de um programador eu vejo essa mentalidade como algo
extremamente útil. Mas falando mais sobre uma entrevista técnica envolvendo estruturas de dados algoritmos isso aqui
pode ser um divisor de águas.

Eis um guia interessante para a resolução de problemas envolvendo algoritmo

1. A hipótese e os axiomas;
2. O caso trivial/base
    1. As limitações do problema.

## Treinando 1

`Implemente um algoritmo que recebe uma lista de números e encontra o segundo maior item`

#### Entendendo melhor o problema

### Implementando a solução mais simples

Como encontramos o maior item de um array? Vamos procurando e comparando. Ora, se sabemos encontar o maior item de um
array, podemos fazê-lo, encontrar o maior.

Depois verificar no array de novo o maior item, que é menor que o `maior` que encontramos no passo anterior.

```javascript
// codigo com dois loops seguidos aqui
```

### Melhorando a solução

Sabe o que acontece quando você faz o gol? O aplicador tende a te ajudar mais. Ele vai pedir pra melhorar e geralmente
te dá umas dicas.

Nesse caso te dirão: dá pra fazer isso num loop só.

Daí o que você faz? Agora com a mente mais leve, você volta a pensar em casos triviais. Sim, sempre eles.

O problema tá resolvido, agora é fundir os loops. os dois vao virar um só.

Pense comigo, qual o caso mais trivial aqui? um array de dois elementos. Ora, em um array de dois elementos é simples

```
array = [n1, n2]

maior, segundo_maior = array[0] > array[1] ? array : [array[1], array[0]]
```

Caso base OK

E para arrays maiores? Aumentemos um pouco o caso, se temos 3 items no array. Faremos o processo para os dois, como
fizemos anteriorment. Olhamos entao para o terceiro item. devemos checar entao

se o terceiro item é maior (ou igual) que `maior`.
    ele passa entao a ser o `maior` e o `segundo_maior` passa a ser o antigo `maior`
se o terceiro item é maior que `segundo_maior`
    ele passa entao a ser o `segundo_maior`.

Assim, voltamos para o estado anterior. Se tivéssemos um quarto item faríamos isso de novo. O mesmo para o quinto,
sexto, até o enésimo item do array.

Encontramos então essa relaçã geral, ou seja, nosso algoritmo.

```javascript
const secondLargestNumber = (arr) => {
if (arr.length < 2) {
  return 'Array inválido';
}

let [maior, segundoMaior] = arr;

if (maior < segundoMaior) {
  [maior, segundoMaior] = [segundoMaior, maior];
}

for (let i = 2; i < arr.length; i++) {
  if (arr[i] >= maior) {
    segundoMaior = maior;
    maior = arr[i];
  } else if (arr[i] > segundoMaior) {
    segundoMaior = arr[i];
  }
}

return segundoMaior;
}

console.log(secondLargestNumber([3, 2, 3, 1, 5, 3]));
```

## Expandindo um pouco

1. fique atento ao caso trivial do seu problema
    1. escute e entenda o problema - sei que aparece obvio; confirme se entendeu corretamente;
    2. rabisque em algum lugar se possível; sobretudo quando lidamos com estruturas de nó isso é útil;
2. faça funcionar primeiro;
3. faça ser certo - remova duplicações, códigos desnecessários etc;
4. faça ser rápido - como essa solução pode ser melhorada?

## E o nervosismo?

É preciso praticar e conhecer de fato os conceitos. Conhecer em níveis mais baixos mesmo, porque numa dessas voces
consegue até implementar.

## Treinando 2

`Você recebeu um a lista de números. encontre quantos pares somam em 0 nessa lista`

Sua hipótese? Bom, confesso que não é algo tão claro uma hipótese como a de uma proposição matemática. Por isso que
é hipótese **e** axiomas.

Quais são os axiomas aqui? bom também não dá pra ver muito só por esse statement, então voce pergunta para o aplicador:

- a lista vai estar ordenada? (nao)
- vai haver repetições? (nao)
- uma vez que um número foi usado para contar um par, ele pode ser contado em outro? (nao)

Aqui você tem que encontrar esses axiomas e isso é feito pensando no caso trivial, o mais simples.

### Implementando a solucao mais simples

### Melhorando a solucao

## A prova

```
log2(2^(k + 1)) > log2((k+1)^2)
(k + 1)*log2(2) > 2*log2(k+1)

k + 1 > 2 * log2(k + 1)

k > 2 * log2(k + 1) - 1

k - 2 * log2(k + 1) + 1 > 0
```

Aqui já ficou meio simples de ver que a funcao f(n) = n cresce de forma linear, já g(n) = 2*log2(n) é logarítimica,
interpolada, mas ainda logarítimica e sua ordem de grandeza é menor que a linear.
