todo mundo fala de ia hoje em dia. nao é pra menos, estamos presenciando uma revolucao tecnologica impulsionada por
avanços significativos, sobretudo em modelos de linguagem como ChatGPT, Gemini e outros.

Além dos modelos si, as ferramentas que existem em cima deles são um caso a parte. Produtos como Claude Code têm mudado
a forma como programamos.

Bom, eu gosto muito de entender as ferramentas com as quais trabalho. As coisas são simples, até que deixam de ser. No
primeiro momento que seu modelo se comportar de um jeito que você não espera, é sua expertise que determina com que
eficiencia voce vai resolver aquele problema.

https://arxiv.org/pdf/2307.09288

# Rádio

ia é que nem encontrar uma estácao de radio. voce vai girando o botao e ajustando à media que se aproxima do valor
correto


# Em código

Em essencia, vamos sempre ter algo assim

[formula perceptron]

para demonstar, vamos implementar uma porta AND usando IA.

```js
const X = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
];

const Y = [
  0,
  0,
  0,
  1
];
```

inputs e resultado esperado

Segundo a formula devemos entao fazer:

> w1 * x2 + w2 * x2 + b

nesse cenário, x1 e x2 são valores conhecidos, em nosso caso vêm da matriz X. O que precisamos sao valores adequados
para w1, w2 e b.

Como ainda vamos descobrir esses valores, vamos começar com um valor aleatório pra cada.

```js
const w1 = Math.random();
const w2 = Math.random();
const b = Math.random();
```

Coloquemos na formula e temos

```js
const [x1, x2] = X[0];
const result =  w2*x1 + w2*x2 + b;
```

Isso claramente não tem como funcionar. E foi o que sempre me intrigou. Como uma fórmula dessas se torna em algo útil?

Perceba que ao executar o código temos

```
w1: 0.5019920114377947,
w2: 0.5100379248719991,
b: 0.3245413680678091,
x1: 0,
x2: 0,
result: 0.3245413680678091
```

o `result`, nesse caso, é basicamente o valor de `b` já que `x1` e `x2` são zero.

# Função custo

Só a formula, do jeito que apresentei, não é o suficiente. Precisamos medir o quão certo, ou errado, o modelo está.

Perceba que além dos dados de entrada (matriz X), temos também os valores esperados (matriz Y). Pois bem, esse é o nosso
parâmetro de certo ou errado.

```js
const y = Y[0];
const err = y - result;
```

Agora temos uma medida que nos diz o quão distante estamos do nosso objetivo.

# O erro deveria ser zero?

Não necessariamente, corremos o risco de um o overtiftin.

okay, fui implmentar o xor usando uma hidden layer.

precisei ajustar os outputs do xor para -1 e 1, e também ajustei os target outputs para -1 e 1. tudo isso porque
a funcao de ativação que usei (tanh) trabalha melhor com valores negativos e positivos. vou tentar com sigmoid depois.

além diso, meus pesos estavam muito proximos de zero (0.05). aumentei para random entre -1 e 1.



> Yes, those were the biggest contributors, but it was specifically a combination of three mechanical factors that prevented the math from working:
1.  Zero Gradients (The "0" Problem): In your original [0, 1] inputs, whenever an input was 0, the weight update (gradient * input) became exactly 0. This meant the network only learned half the time. Switching to [-1, 1] ensures every sample provides a signal to every weight.
2.  Vanishing Gradient (Initialization): Your original weights were very small (0.05). Since the output of the first layer is multiplied by the weights of the second layer during backpropagation, the signal became so tiny by the time it reached the first layer that the weights barely moved. 
3.  Insufficient "Force" (Epochs/LR): XOR is a non-linear problem. A single-layer perceptron can't solve it at all, and a multi-layer one needs to "warp" its internal space to separate the points. 100 iterations at a low learning rate simply wasn't enough "push" to move the weights into that specific non-linear configuration.
In short: The network wasn't just slow; it was effectively "frozen" in place by the zeros and the tiny weights. Moving to bipolar inputs (-1, 1) and giving it more "running room" (epochs) allowed the gradients to actually flow.
