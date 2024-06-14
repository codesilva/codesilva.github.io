# É assim que seu computador lembra (a criação de uma memória RAM)

## Fundamentos dos circuitos digitais

Na disciplina de circuitos digitais temos nosso primeiro contato com portas lógicas. Você lembra, portas lógicas são
elementos primitivos de circuitos digitais. São pequenos componentes que também são circuitos. Podem ter mais de uma
entrada mas possuem uma única saída.

Esses pequenos circuitos nos permite computar uma série de coisas. Seu funcionamento é baseado em dois estados: como
sinal ou sem sinal. Consideramos a presença de sinal como 1 e a ausência dele como 0.

NOTA: 0V representa o sinal 0; 5V representa o sinal 1. O thresgold é na metade.

### Algebra de Boole

Bom, escrevo esse post assumindo que você conhece os princípios básicos de algebra boolean pois não vou me estender
muito.

Em suma a algebra de boole possui operações que trabalham em cima de dois valores. Seja `f` uma função booleana, f pode
receber um ou mais variáveis e ter um único resultado. É uma grande semelhança, para não dizer conveniência, que funções
Booleanas sejam tão parecidas com portas lógicas.

Generalizando: uma funcao booleana que possui n variáveis possui no máximo 2^n combinações de valores de entrada
(tudo em base 2). Cada uma dessas combinações vai ter uma saída associada. Daí temos as "tabelas verdade" que descreve
o comportamento da funcao em cada combinacao desses inputs. cada linha possuia a combinacao de entrada e seu respectivo
output.

### A porta lógica fundamental

A porta lógica fundamental é a NAND (NOR também funciona) pois com ela conseguimos produzir todas as outras portas
fundamentais. A porta NAND recebe duas entradas e sua tabela verdade da porta NAND é mostrada abaixo.

NAND:
    - 0 NAND 0 -> 1
    - 0 NAND 1 -> 1
    - 1 NAND 0 -> 1
    - 1 NAND 1 -> 0

Criando portas lógicas conhecidas e úteis e bastante conhecidas (NOT, AND, OR, NOR).

NOT: O input é replicado nas duas entradas da Porta NAND que vai se limitar às entradas 0 NAND 0 -> 1 e 1 NAND 1 -> 0
AND: Os inputs sao passados para NAND, e colocamos um NOT na frente (que é composto de NAND)
OR: Cada input é passado para uma NAND diferente, os resultados dessas duas NANDs sao passados para uma outra NAND

## Como saímos disso para um circuito que calcula?

NOTA: A base de um sistema númerico tem a ver com a base da potencia... cada posicao é uma potencia, crescente da
direita para a esqueda.

Nosso sistemas numéricos são posicionais e partem de uma mesma lógica. Reconheço que pode ser complicado a primeira
vista, nas em essência, é tudo a mesma coisa e é bem simples até.

Perceba que cada sistema número possui uma determinada quantidade de símbolos k. E dependendo da posição de cada dígito
ele tem um valor.

Tomemos o sistema decimal. Temos dez símbolos {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}. Temos unidadez, dezenas e por aí vai.
Assim o número é de tal forma que ele vai aumentando em sua posição até que chega a seu máximo para aquela posição. Se
estamos contando e chegamos em 9 precisamos reiniciar a contagem daquela possição e carregar 1 para a posição mais
a esquerda.

Em binário é a mesma coisa. A diferença é que temos só dois símbolos {0, 1}. Assim, cada posição precisa ser rapidamente
reiniciada para cada coluna.

Começamos com 0, e ao adicionar 1, já chegamos no limite, que é 1. Se adicionarmos mais um, temos então que reiniciar
essa coluna e levar um para a próxima. Assim 1 + 1 = 10.

A soma de um bit é muito simples de fazer, precisamos basucamente lidar com os operandos e o carregamento para a próxima
coluna.

a XOR b -> sum
a AND b -> carry out

esse é um circuito em si, um pouco mais complexo. possui duas entradas, os dois bits a serem somados e mais o carry out.

a=0; b=0; sum=0; carry out=0;
a=0; b=1; sum=1; carry out=0;
a=1; b=0; sum=1; carry out=0;
a=1; b=1; sum=0; carry out=1;

Que loucura! Acabamos de fazer uma soma só com sinais elétricos. Esse circuito é chamado de Half-Adder.

```
# Full-Adder

{ci, a} ---> Half-Adder -> {sum1, co1} ----- >
                                    {b, sum} -> Half-Adder -> {sum2, co2}

sum2 é a soma final
co final é co1 AND co2
```

Temos um curcuito mais complexo que nos permite uma soma em múltiplos bits.

## Como saímos disso para um circuito que "lembra"?

Assim como em qualquer coisa da vida e da computacao, começamos com o mais simples possível. Tal qual fizemos com
circuitos de soma.

Primeiro faremos um circuito que salva 1 bit e escalaremos isso para um circuito capaz de salvar um byte inteiro!
Excitante não?

### Um clock

### Um multiplexador

### Eis um endereço de memória

## Referências

- [https://codehiddenlanguage.com/Chapter19/](https://codehiddenlanguage.com/Chapter19/)
- [https://www.quora.com/How-is-NAND-GATE-represented-with-switches-and-lamps](https://www.quora.com/How-is-NAND-GATE-represented-with-switches-and-lamps)
- [https://www.quora.com/Which-logic-gate-is-more-fundamental-the-NAND-gate-or-the-AND-gate](https://www.quora.com/Which-logic-gate-is-more-fundamental-the-NAND-gate-or-the-AND-gate)

-----

# Vamos construir uma memória

~~meu aprendizado geralmente gira em torno aprender coisas que estão no cerne da questao.por exemplo, ao inves de aprender
o event loop do nodejs, eu aprendo event loop em si, além de outros patterns de concorrencia.

ao invés de aprender/focar em genserver/supervisor, eu aprendo processos.

Essa é uma das coisas que eu acho extremamente interessante em ciência da computação/programação. Os conceitos mais
complexos podem ser decompostos até que cheguem num caso trivial, simples. Pense em recorrência, programação dinâmica,
e por aí vai.~~

Sabe, esses dias eu estava estudando um pouco de história. Estudar história é uma tarefa complicada pra mim. Você não
tem só fatos na maioria das vezes, você tem fatos ocorridos e as perspectivas de cada um. Entã você tem que ir tratando
tudo isso. Claro há aquelas que estudam a história com viés, aí é mais fácil, você lê um pouco, vê uma perspectiva dos
fatos e segue sua vida.

Colocando computação/programação em perspectiva é fácil ver que é mais simples. Você tem algo complexo, pode prestar
atenção que voce vai conseguir decompor isso em conceitos mais simples. as vezes chegando em uma base.

tome recursividade por exemplo. é tudo baseado nisso. a forma que voce encontra uma relacao matematica também assim.
voce parte de um caso base, aplica processos matematicas e chega numa generalizacao.

meu objetivo com esse post é te mostrar como construir uma memoria - prometo que vai mais fácil que entender a guerra do
peloponeso. e claro, faremos isso partindo do basico. savando 1 bit depois evoluindo para uma memoria ram de 1 byte
e vamos até 8 bytes.

https://codehiddenlanguage.com/Chapter19/

## Arquitetura de computadores e máquina de turing

## tudo fica na memoria

o cursor do seu mouse
tamanho da tela do browser em que voce le esse artigo, por aí vai

# Flip-flops

# RAM, feita a partir de flip-flops

## O que é um endereço de memória?


```js
const SIGNAL = (a) => a ? 1 : 0;
const XOR = (a, b) => a === !b;
const NOT = (a) => !a;
const OR = (a, b) => a || b;
const AND = (a, b) => a && b;
const NAND = (a, b) => NOT(AND(a, b));
```
