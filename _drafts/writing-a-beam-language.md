# Writing a programming languafe on top of BEAM

Cause it's fun!

Desde os meus primeiros contatos com programação fiquei fascinado por como tudo aquilo era possível. o estalo veio mesmo
nas aulas de Java.

Eu pensava, como isso tudo se torna possível? como clico nesse botão de play aqui - ícone de compilar da IDE eclipse
- e o código executa?

Meu professor na época disse: "primeiro você escreve um compilador, depois a linguagem". algo nesse sentido. a verdade
é que pra sua linguagem de programação funcionar, tem de ter uma outra. Porque se estou criando uma linguagem nova
e preciso de um compilador, é impossível eu fazer o compilador em tal linguagem. Pois ela ainda não existe.

Então o que permitia o meu JAVA rodar, era mais código. É obvio. Afinal precisamos de jdk e jre. É óbvio agora, mas eu não conseguia perceber.

Se formos puxar esse fio, vamos no mais profundo modo de "programação" que é linguagem de máquina. Uma grande seuqência
de binários. Inclusive, não é muito complicado perceber que o primeiro dos primeiros compiladores teve de ser feito em
linguagem de máquina.

Mais precisamente o primeiro compilador provavelmente foi feito em assembly. Mas o primeiro assembler provavelmente foi
feito direto com os códigos de máquina. Parseando uma sequência de caracteres e interpretando o que cada comando fazia.

Uma vez que o primeiro foi feito, fazer os próximos é mais fácil. É possível usar um assembler pra fazer um assembler.
É possível também usar um assembler para fazer um compilador, que lida com uma linguagem de programação de mais alto
nível.

E uma vez que você tem a linguagem de programação e seu compilador, você pode fazer isso ser autosuficiente, escrevendo
o compilador em sua linguagem. Assim como o cara do Temple OS fez - fez o proprio assembler e o proprio compiler. Assim como Go é hoje em dia. O compilador de Go,
é feito em Go.

Bom, isso era 2012 e eu sempre tive em mente em fazer essas coisas que usamos no dia-a-dia. Lembro de querer fazer um
sistema operacional para celular - provavelmente influenciado pelo filme "Piratas do Vale do Silício".

De celular, especificamente. Porque tinha de ser relevante e na minha mente seria mais fácil competir em mobile dado que
pra PC Windows já abocanhava quase tudo e linux já existia. Mas quem liga pra isso?

Além de um sistema operacional, queria fazer uma linguagem de programação. Quando mais novo, pensei em fazer algo com
o objetivo de pessoas usarem mesmo. Mas não sei. Não tenho capacidade pra fazer algo realmente inovador. As linguagend
que tenho usado têm me servido muito bem.

Ainda tenho o desejo de escrever uma linguagem de progrmaação, mas dessa vez é por diversão, é pra entender mesmo. Esse
é meu pet project.

## Primeiro você escreve o compilador...

No começo queria fazer minha própria linguagem, do total zero. Era uma boa ideia. No entanto, existe um outro jeito de
aprender que é usar o que já existe.

No curso from nand to tetris eles criam toda a vm pra depois rodar a linguagem em cima. Eu pensei: não preciso criar
a VM, pelo menos não agora. Assim, como gosto de Erlang e Elixir, e com esse lançamento da linguagem Gleam pensei:
porque não mais uma linguagem de programação que roda na BEAM?

Ainda, não quero ter que pensar em nenhuma sintaxe inovadora nem nada disso. Então vou simplesmente, meio que, portar
JavaScript para a BEAM.

## Explorando exemplos

Elixir, Luerl, ePHP e Gleam

[Build your own elixir](https://www.youtube.com/watch?v=IONWi9hayEA)
[Erlyjs](https://rsaccon.blogspot.com/2008/02/erlyjs-translating-javascript-to-erlang.html)
[leex and yeec](https://arifishaq.wordpress.com/2014/01/22/playing-with-leex-and-yeec/)
[erlang parse tools](https://www.erlang.org/docs/26/apps/parsetools/parsetools.pdf)
https://en.wikibooks.org/wiki/Erlang_Programming/Making_Parsers_with_yecc
https://www.erlang.org/doc/man/cerl#type-1
https://blog.stenmans.org/theBeamBook/#_compiling_erlang
https://github.com/lfe/lfe
