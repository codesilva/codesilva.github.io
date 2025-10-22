Basic Algorithm Outline for Even Distribution of Colors
Divide the Graph into Sections:

Divide the number of vertices 
𝑛
n by the number of colors 
𝑘
k.
This gives the spacing of vertices for each color, 
𝑠
=
𝑛
𝑘
s= 
k
n
​
 .
Assign Colors:

Start at a vertex and color it with color 
𝑐
1
c 
1
​
 .
Move 
𝑠
s steps forward in the cycle and color the next vertex with 
𝑐
1
c 
1
​
  again.
Continue until all vertices for 
𝑐
1
c 
1
​
  are placed, then repeat for 
𝑐
2
c 
2
​
 , and so forth.
Adjust for Cyclic Constraints:

Since this is a cycle, you need to handle wrap-around indexing (e.g., using modulo arithmetic) so that colors are placed cyclically.

# Algoritmo basico para pintar o ciclo

Definidas as cores: C = [c1, c1, c2, c2, c3, c4]

1. Divida o grafo em seções:
    - Divida o número de vértices n pelo número de cores k.
    - Isso dá o espaçamento de vértices para cada cor, s = n/k.
    - Se n não for divisível por k, arredonde para cima.
    - Se n for menor que k, defina k = n.

2. Atribua cores:
    - Comece em um vértice e pinte-o com a cor c1.
    - Mova s passos para frente no ciclo e pinte o próximo vértice com c1 novamente.
    - Continue até que todos os vértices para c1 sejam colocados, depois repita para c2, e assim por diante.

3. Ajuste para restrições cíclicas:
    - Como este é um ciclo, você precisa lidar com a indexação de wrap-around (por exemplo, usando aritmética de módulo)
        para que as cores sejam colocadas ciclicamente.

# Heurísticas para concurso por Alexandre Meirelles

E evite estudar direto mais de 2h30min cada disciplina, porque seu rendimento será bem
menor. A idéia é variar bastante as disciplinas. Claro que estudar 30min, por exemplo, salvo raras
exceções, também não é proveitoso, porque você ainda está entrando no ritmo, mas mais do que
2h30min só em casos extremos. Se no seu ciclo tiver 16h, e você reservou 3h30min para Contab,
como no exemplo dado, separe essas 3h30min em 3 blocos, como eu fiz, ou em dois. Isso trará duas
vantagens imensas: a 1ª, você sempre estudará a matéria com a cabeça pronta para aprender, o
cérebro pronto para as novidades, e não entrará na curva descendente de aprendizado, quando seu
rendimento cai demais após algum tempo de estudo; e a 2ª, você estará sempre vendo aquela
matéria, o que é ótimo para manter boa sua memória. Nesse exemplo dado, você verá Contab
praticamente todos os dias, e não em um dia aqui e outro lá na frente, e com um aproveitameno
muito melhor do que se estudasse 3h30min direto. 

Minimo: 30min; Maximo: 2h30min

Idealmente queremos dividir o tempo em mais blocos porque a ideia é variar bastante as disciplinas.

## Como dividir o tempo?

Para cada disciplina `d` atribuímos um peso `w` que é o quão importante é a disciplina para o concurso e um nível de
proficiencia `p` que é o quão bem você conhece a disciplina.

Assim podemos calcular o fator `R` de cada disciplina `d`:

```
Ri = wi * 1/pi
```

Normalizando fatores:

```
Ni = Ri / sum(R)
```

Onde `Ni` é o fator normalizado da disciplina `i`. Para calcular as horas de estudo de cada disciplina `i`:

```
Hi = Ni * T
```

Onde `T` é o máximo de horas do ciclo de estudos.

PS. Ajustes podem ser necessários caso passe ou falte do tempo limite - isso deve ser feito na disciplina com menor
factor.

## Estudaqui

- 2h por cada disciplina. Máximo ??; Minimo ??

Cada bloco no mínimo 1h e no máximo 2h30min.

https://www.estudaqui.com/blog/ciclo-de-estudos/ciclo-de-estudos-para-concursos-pratica/

## Método do 'Matemática em Evidência'

https://en.wikipedia.org/wiki/Anki_(software)
https://en.wikipedia.org/wiki/Spaced_repetition
[https://en.wikipedia.org/wiki/Equitable_coloring](https://en.wikipedia.org/wiki/Equitable_coloring)
[https://www.youtube.com/watch?v=AjU0UmGHm2Q](https://www.youtube.com/watch?v=AjU0UmGHm2Q)
[https://www.youtube.com/watch?v=Y5gCFOzV6so](https://www.youtube.com/watch?v=Y5gCFOzV6so)
https://www.youtube.com/watch?v=4yAtw5TcaXc

---

# Conversa com Alisson

Estudo por ciclo
Mas
Eu sempre gosto de ir na banca
Vejo o que ela mais cobra
E em cima disso eu início os estudos
Por ciclo fica mais interessante pq fica flexível
Mas ae
A melhor forma de estudar é muito subjetiva
Tem pessoas que gostam de ver 3 matérias por dia
Eu não me dou muito bem assim
Prefiro estudar apenas uma... E depois que fecho, incluo somente nas revisões
E muita questão
Tem o qconcursos, q tem uma indexação muito boa
O estratégia concursos é engrenado pra área de TI, se for o seu caso
N tem muito segredo. É o básico.
O difícil é só manter a constância mesmo
Como falei, a forma de estudar é subjetivo. Vc vai se descobrindo

`Eu acho a verdade é que Eu estou estudando umas coisas agora de estatística, né? E tal, aquelas parada de marchine lene e tal. Aí eu trabalhei um tempo num numa empresa que chama estudo aqui, não sei se está ligado. Aqui tem tem umas parada assim, sabe? De ciclo e tal. Eles têm todo um método assim, pra criar o ciclo, só que eu achei bem complexo. Quando eu vi tanto que eu nem lembro como é. Papai. Eh, o código assim, as regras. Ele faz um monte de putaria lá pra gerar um ciclo, né?`

Direcionamento é tudo
Vc pega um edital de TI hoje
Meu Deus
Muita coisa

`Tipo assim, os caras já colocam as provas, aí tem os pesos, aí tem o seu nível, né? De o quão bem você sabe aquela matéria e tal. E baseado nisso ele ajusta as horas, né? Quantas, quantas vezes o o ciclo vai vai repetir, aquela matéria vai repetir, né? No ciclo e tal. E aí ele ele gera, né? Está ligado?`

Os caras querem um Dev infra cyber
A porra toda
Mas ae é o q eu disse
Teu melhor indicador serao as questões

`Eu estava pensando se tipo se tinha como deixar isso eu queria fazer um, entendeu?
Uma ferramenta dessa assim mas pra aprendizado do que pra né pai? Tem muita gente que faz concurso, né? Amanhã é bom ter uma ferramentinha dessa.
De graça sem anúncio Foi mais um projeto de estudo mesmo assim.`

Saquei. Com certeza
Mano, seria muito útil
Pq todo esse trabalho q a aplicação faria
Fazer isso manualmente consome um tempo da porra
Eu n faço simulados e vou pra todo tipo de prova de TI e isso ajuda a me familiarizar com o que vem sendo cobrado
E saber direcionar

Posso te dizer que a maior dificuldade hj é direcionar o edital. Mas com algumas milhares de questões respondidas, vc começa a perceber um padrão
Ter algum tipo de ferramente q indicasse isso seria top
E por banca
As bancas abordam mais uns assuntos que outras não abordam 

`Tipo assim tu fala direcionar tipo assim por exemplo a gente está do Correios sei lá aí tem as parada dos Correios lá né? Aí seria tipo assim tu já indexar a questão essas coisas que eu estou falando?`

Por exemplo
Todo concurso tem uma banca
Correios foi Ibfc, eu acho
Beleza
Ibfc tem a disciplina raciocínio lógico matemático
Poxa
Mas q assuntos dessa disciplina mais priorizar?
São muito dentro dessa disciplina
Mas vamos aqui pegar um histórico de questões de RLM da Ibfc
E vamos classificar as questões por assunto
E gerar um tipo de probabilidade em cima disso
Ou estatística
Hoje, vc consegue indexar
Essas plataformas de questões fazem isso facilmente
Mas ela não te dar a probabilidade

`E fica em linha com o que quero estudar
Então tipo assim pra prova tal, banca tal probabilidade desses assuntos nessa disciplina serem abordadas é maior então fazer tipo baseado nisso. 
É planejar baseado nisso. Pô legal mano. 
Tu sabes que tem como pegar essas informações eh de tipo Tipo assim, um Excel gigantão assim dessas parada, não?`

sso, e muda muito, dependendo da banca
Eu tenho mais trabalho tentando mapear isso
Cebraspe aborda mais uma coisa, FGV mais outra
Quem consegue ter uma visão geral do q mais cai é quem vem fznd muitas provas dessas bancas
Mas quem chega enxuto fica perdido

`Mas tu clareaou demais oh quem vai ajudar eu estava pensando sabe eu pensei em fazer só que para aí eu tenho experiência né? Fiz concurso duas vezes na minha vida e foi clareou muito pô valeu pelo pelos insights aí acho que vai ser massa`

Enfim, aí daí, dá pra tirar várias ideias
Sla, simulados de provas, onde a partir deles, vc vai organizar ciclos de estudo redistribuindo os horários dependendo do seu desempenho
Mas tudo será medido através das questões

`Real é que essa parada de dados lá pro cara fazer um monte de cruzamento, né? Desse tipo aí. Separa pra ter tipo assim, o cara escolher as que tipo de metodologia por assim dizerem que é parte de simulado, a parte de tal que aí eu acho que fica até mais flexível.
Mas é isso mano. No durante o ano eu vou tentando fazer que eu estou estudando ainda, né? E aí eu Os Avon se fortano eu vou te dizendo aí. Pô valeu mesmo ô mano. Obrigado mesmo. Pô saudade véi. A gente vai por aqui dá o toque pô pra gente dar um sair por aí.`
