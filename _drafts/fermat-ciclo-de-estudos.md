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

# Heurísticas para concurso por Fernando Meirelles

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

https://en.wikipedia.org/wiki/Equitable_coloring
https://en.wikipedia.org/wiki/Anki_(software)
https://en.wikipedia.org/wiki/Spaced_repetition
[https://www.youtube.com/watch?v=AjU0UmGHm2Q](https://www.youtube.com/watch?v=AjU0UmGHm2Q)
[https://www.youtube.com/watch?v=Y5gCFOzV6so](https://www.youtube.com/watch?v=Y5gCFOzV6so)
