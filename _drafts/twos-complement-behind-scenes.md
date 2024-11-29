Até a alguns anos atrás eu gostava de fazer umas performances de mágica. As vezes para uma plateia mínima, as vezes só
pra mim mesmo, só pra ver o truque acontecendo. Conseguia fazer truques espertos com baralho e moedas. O interessante
é que comecei literalmente copiando o básico de vídeos do youtube e cheguei a bolar algumas variantes usando técnicas
básicas de corte de baralho, por exemplo.

Ver um truque de mágica acontecendo é intrigrante. Ser você o mágico é ainda mais. Isso me lembra esse post do Talysson
que fala sobre a revelação de truques de mágica em uma bela analogia com a nossa área onde os truques de mágica são as
ferramentas ou mesmo jargoes existentes.

Revelaremos hoje dois truques muito bons que vão te dar um conhecimento mais aprofundado sobre como um computador
funciona. O primero truqe é diretamente ligado à eletrônica. Descobriremos como em nome de Deus uma operação matemática
pode ser feita com circuitos, com eletricidade. Para tal usaremos o mecanismo do Complemento de dois.

Para completarmos o serviço vamos ver também como o complemento de dois é possível, só para sentirmos o poder.

# Afinal como uma soma pode ser feita usando sinais elétricos?

O ano era 1937 e `George Stibitz`, na mesa da sua cozinha, usando circuitos simples criou um circuito que somava números
de um bit. Recebia os inputs, sejam `n1` e `n2`, e gerava duas saídas, `carry` e `out`. Isso, mais tarde ficou conhecido como um
circuito _Half-adder_.

`out` continha sempre a soma entre bits e `carry` o bit a ser carregado para a próxima casa. Isso pode parecer abstrato
mas é exatamente como fazemos, como aprendemos quando criança.

## Como fazemos soma?

Sem enrolar muito com a historia de sistemas numericos, o sistema numerico que utilizamos atualmente é o indu-arabico.
Com dez símbolos, de 0 a 9, é um sistema posicional onde o valor do dígito varia de acordo com sua posição - duh.

É muito fácil ver ver isso quando escrevemos um número por extenso. Pegue o número 3456. Três mil, quatrocentos
e cinquenta e seis.

Então na composição do número o que temos é:

- mais a direita quantidade de unidades, por exemplo: 6 uns
- caminhando para a esquerda temos a quantidade de dezenas: 5 dezes
- temos então a quantidade de cens: 4 cens
- finalmente, 3 milhares

Trazendo para um lado mais matemático, cada dígito vai a uma potencia de 10. Começando da direita pra esquerda começando
no expoente 0.

Então temos:
- 6 x 10<sup>0</sup>
- 5 x 10<sup>1</sup>
- 4 x 10<sup>2</sup>
- 3 x 10<sup>3</sup>

### O símbolo 10

O detalhe interessante desse sistema posicional é que não há um símbolo para o `dez` tal qual no sistema romando (que era
o `X`).

O que acontece no sistema indu-arabico é que contamos as unidades onde posso ter no mínimo zero e no máximo 9. Se chego
em 9 e adiciono mais uma unidade, o campo das unidades zera e então uma dezena é adicionada. Cada posição tem o seu
ciclo e quando tem esse "estouro", 1 é adicionado à posição seguinte - lembrando que olhamos o número da esquerda para
a direita.

E acabamos de ver como a soma é feita. Na escola a professora desenhava, M C D U para Milhar, Centena, Dezena, Unidade,
quando estoura o máximo, "vai um para a próxima casa" (carry).

Assim, 99 + 1, somamos 9 unidades com 1 unidade, o que nos dá uma nova dezena. Pegamos essa nova dezena e somamos com as
nove dezenas já existentes, o que nos dá uma centena. Ao fim da operação temos 0 uns, 0 dezes e 1 cem.

### Alternativas ao sistema decimal - outras formas de 10s

O sistema decimal é conveniente pra gente, pois a maioria de nós tem, ou pelo menos prefereria ter, 10 dedos. Assim foi
construido todo um sistema numérico em torno dessa conveniência.

A verdade é que se vivêssemos no mundo do Mickey Mouse nosso sistema númerico provavelmente envolveria a conveniência de
termos 4 dedos em cada mão.

Assim, reutilizando os símbolos teríamos 0, 1, 2, 3, 4, 5, 6, 7. O símbolo 9, nem mesmo o 8, seriam necessários. O curioso agora
é pensar: o que vem depois do 7 - no mundo do Mickey?

Bom, revisitando as seções anteriores temos que:

- o sistema é posicional
- quanto "estoura" o limite de uma posição, 1 é carregado para a posição mais significativa
- os símbolos descrevem quanto de cada posição temos.

Assim, para o mundo dos desenhos on o sistema tem 8 símbolos (de 0 a 7), 7 + 1 é na verdade igual a 10. 10, nesse
cenário, nos diz que esse número contem um 8 e zero 1s.

O meso vale para 77 + 1. 7 + 1 = 10, assim carregamos 1 para o proximo nível, resultando em 7 + 1 também, e mais uma vez
carregamos para o proximo nível. Assim, 77 + 1 = 100.

- 0 x 8<sup>0</sup>
- 0 x 8<sup>1</sup>
- 1 x 8<sup>2</sup>

Homer Simpson e o Mickey têm na verdade 10 dedos nas mãos. Acredite

### O Golfinho e suas 10 barbatanas

De modo semelhante ao que fizemos com os seres de desenho animado podemos pensar como seria nosso sistema se fôssemos
golfinhos. Com duas barbatanas só precisamos de dois símbolos em nosso sistema: 0 e 1.

E você conhece, esse sistema é o binário e toda a explicação anterior foi pra clarear o porquê 1 + 1 é na verdade 10.
Sege a mesma lógica, quando há o estouro naquela casa carregamo 1 para a próxima. É posicional também, porém a base é 2.
começado, da esquerda pra direita, com 2⁰, 2¹, 2² e por aí vai.

No sistema binário, no entanto, o estouro é bem rápido.

Números binârios têm uma característica específica: permitir operações com circuitos elétricos de forma simples pois só
temos dois estados.

## Let's build an Adder circuit

Bom, agora que desacoplamos a operação soma do sistema decimal e elevamos à abstaração sistena posicional conseguimos,
usando o sistema binário criar um circuito simples que soma dois bits.

NOTA para a vida: Essa é uma coisa boa de se fazer, testas os casos mais triviais.

Vai ser fácil de validar, são 4 casos apenas:

- 0 + 0 = 0
- 0 + 1 = 1
- 1 + 0 = 1
- 1 + 1 = 0?

Temos um problema, ao somar 1 + 1 o resultado deve ser 10, mas se nossa saída só tem um bit, o resultado vai ser zero.
Isso na verdade está correto. O que precisamos é de duas saídas. uma para o resultado da operação naquela posição
e outra para representar o valor carregado. Assim nossa tabela fica sendo algo como:

- 0 + 0 (carry=0; out=0)
- 0 + 1 (carry=0; out=1)
- 1 + 0 (carry=0; out=1)
- 1 + 1 (carry=1; out=0)

### Alrebra booleana e portas lógicas

Ter dois estados é muito conveniente para uso como true/false. E nos valendo disso temos alguns circuitos primitivos que
ajudam a resolver operações booleanas. São eles: AND, OR e NOT - São suficientes para que possamos contruir
processadores, memórias e um computador inteiro.

Nosso circuito vai tal qual

- Entradas a (1-bit); b (1-bit)
- Saídas carry (1-bit); out (1-bit)

Verificando a tabela anterior conseguimos obter um padrão: carry só é 1 quando a e b são 1 e out só é 1 nos casos em que
ou a ou b é 1, mas não os dois juntos.

Fica mais fácil ver que precisamos de pelo menos uma porta AND e uma XOR (de ou exclusivo). A porta XOR pode ser,
naturalmente, construída a partir de portas primitivas.

Não vamos fazer aqui, mas no fim do post você pode encontrar uma porta XOR contruída com AND, OR e NOT -- [(a OR b) AND (NOT (a AND B))]

[imagens]

Bom, assim temos nossso circuito que adiciona 1-bit. Foi isso que o [fulano] fez a em [XXXX] em sua cozinha. Ele fez
soma com curcuitos.

### Soma com mais de um bit

Somas de 1 bit por si só não vão ser suficientes para muita coisa. Pra fazer isso podemos ter um circuito semelhante ao
half-adder, mas que também consiga recebar uma entrada a mais, que pode ser um carregamento da casa anterior. Assim
definimos um Full-Adder que recebe os dois inputs mais um "in".

NOTA: Um full-adder pode ser composto de dois half-adder

- 0 + 0 + 0 = (carry=0; sum=0)
- 0 + 0 + 1 = (carry=0; sum=1)
- 0 + 1 + 0 = (carry=0; sum=1)
- 0 + 1 + 1 = (carry=1; sum=0)
- 1 + 0 + 0 = (carry=0; sum=1)
- 1 + 0 + 1 = (carry=1; sum=0)
- 1 + 1 + 0 = (carry=1; sum=0)
- 1 + 1 + 1 = (carry=1; sum=1)

Para fazer o full-adder podemos nos valer do pensamento como uma sequenci de operacoes, então sejam os inputs a, b e c,
primeiro queremos a soma de a com b. Assim colocamos a e b como inputs de um half-adder h1.

h1 dará saídas out1 e carry1. Lembre-se que out1 é a coluna atual, assim, para adicionarmos c á operação somamos out1 +  c (em um outro half-adder), assim obtemos S sendo o resultado final do full-adder.

Agora precisamos resolver o carry, e só temos duas chances. Ou o carregamento final vem da primeira operação ou da
segunda. O que nos leva a um OR entre carry2 e carry1. 

Como exemplo, se estamos somando 1 + 0, e depois 1 + 1, o carry é da segunda operação, se fazemos 1 + 1, e 0 + 1,
o carry é da segunda -- para os outros casos carry out é zero

Agora pra fazermos nossa soma multibit basta encadearmos uma sequencia de full-adders

O primeiro full adder não tem carry in, é zero. Para os próximos o carry in é o resultado do carry out do
anterior.

Assim, pra fazermos a soma de números multibit resolvemos casa a casa, posição a posição.

# Conclusão

# Referencias

- [https://logic.ly/demo/](https://logic.ly/demo/)
- [https://academo.org/demos/logic-gate-simulator/](https://academo.org/demos/logic-gate-simulator/)
https://circuitverse.org/simulator

# Two's complment for handling subtractions

Os circuitos que montamos anteriormente são interessantes, mas não funcionam para subtração pois diferente da soma na
subtração temos o empréstimo ao invés do carregamento.

Bom, o funcionamento do complemento de dois já foi explicado em um momento anterior. Portanto, não vamos nos estender
nesse tema aqui. Vamos seguir para a explicação de o que está por trás da mágica.

# Two's complement magic trick revealed

## Aritmetica modular

A essencia da coisa é a aritmetica modular (ou de relogio). Que basicamente uma aritmetica de numeros inteiros onde os
números "reiniciam".

O exemplo mais comum que temos é o módulo 12, pois é o que temos em nossos relógios (formato 12h). Dígamos que sejam
11:00 am. Se adicionamos mais 2h, o resultado esperado é que sejam 1:00 pm. Do mesmo modo, digamos que são 3:00pm, se
subtraímos 5h chegaremos em 10:00am. E assim vai, ẽ cíclico.

Faz sentido pois 3 - 5 (mod 12) -> -2 (mod 12) = -2 + 12 = 10


### Congruência

Dizemos que a e b são congruentes se a = b (mod n). mod n aplicando-se à toda equação. Por exepmlo, 7 é congruente a 2 em módulo 5. Ambos os valores resultam em 2.

## Pontos importantes

O ponto mais interessante que podemos obervar aqui é que as coisas,por serem cíclicas, elas se complementam.

Independentemente do caminho sigamos vamos chegar no mesmo valor. Se estou em 1 e pretendo chegar em 11, em aritmetica
modular de modulo 12, posso:

- adicionar 10;
- ou subtrair 2.

Pra chegar em 10, posso adicionar 9 ou subtrair 3. Veja que isso vai se complementando. É fácil vera relação que é:

> Subtrair "k" de um número em *módulo n* é o mesmo que adicionar n - k

Em nossa máquina temos 4 bits. Pensando em números sem sinal podemos representar de 0 a 15. Nem mais, nem menos. Logo,
se um número extrapola temos overflow e os números "reiniciam".

1111 é o 15. 1000 seria o 16, mas só temos espaço para quatro bits, deixando então o valor 0000. 

É tranquilo de ver que temos um `mod 16` aqui.

Assim, para subtrairmos um número `k` de outro qualquer nessa máquina basta adicionarmos `16 - k`. Digamos que queremos
subtrair o número 3 de qualquer outro. Faremos então a adição de `16 - 3`.

Se colocarmos em binário para uma perspectiva vamos tirar alguns insights legais.

16 - 3 em decimal é equivalente a 10000 - 0011 em binário. Vamos rearranjar um pouco

```
10000 - 0011 => (1 + 1111) - 0011
```

Rearranjando um pouco mais vemos que 16 - 3 é:

```
(1111 - 0011) + 1
```

Parece que nada mudou. Mas vamos examinar cada parte dessa equação. Primeiro fazemos `1111 - 0011` que resulta em
`1100`. Se notarmos bem o que houve foi a inversão dos bits do número `0011`. E é isso que acontece sempre que
subtraímos de um número binário em que todos os bits são 1. Sempre que ver algo como `1111 - b` onde b é um número
binário, o resultado é `!b`.

Perceba que essa é a primeira parte do procedimento do complemento de dois: Inverter os bits.

A segunda parte da equação é somar `1`. Que é justamente a segunda parte do procedimento do complemento de dois.
Continuando então:

```
(1111 - 0011) + 1 -> 1100 + 1 -> 1101
```

Assim, subtrair 3 é na verdade somar `1101` em binário e complemento de dois.

Esse é o truque. Só um pouquinho de matemática.

Vamos a um exemplo então. Vamos fazer a operação `7 - 3`. Como já vimos, subtrair 3 é a mesma coisa de se somar `1101`.

Assim temos:

```
7 - 3
0111 + 1101 = 10100 -> 0100 = 4(10)
```

Nada de novo. Já havíamos visto em posts anteriores que a coisa toda funciona.

# Conclusão
É isso. Com complemento de dois tornamos adequadas as operações em nossos circuitos pois a subtração é na verdade uma
soma.

# References
