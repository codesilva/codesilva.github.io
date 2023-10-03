# Grafos

- Grafos sao em essencia sobre conectar pontos usando linhas
- Sim, em termos rusticos é isso. Com essas conexoes definimos relacionamentos. É sobre a formacao de redes
- Pense em sua rede de amigos no facebook.
- Podemos definir cada usuario como sendo um ponto em um grafo e as conexoes formadas se darao por arestas.
- hoje falaremos de grafos de forma pratica, teremos uns exemplos de implementacao e também de como a Teoria dos Grafos
    pode ser util na resolucao de problemas reais, alem do exemplo mais obvio que é o planejamento de rotas.

## Jargoes

- Um Grafo G é composto por dois conjuntos (E, V) tal que E é o conjunto de arestas e V o conjunto de vértices
- [exemplo de grafo]
- Um Grafo pode ser nao direcionado (como sua rede de amigos do facebook)
- Mas também pode ser direcionado como a rede de seguidores do seu perfil no instagram
- O grafo pode ter pesos em suas arestas
- Se uma aresta conecta dois vértices eles sao ditos adjacentes ou vizinhos.
- O grau de um vertice é dado pela quantidade de arestas incidentes (ou a quantidade de vizinhos)

## Como implementamos grafos

- Implementacoa de Grafo em ruby
    - Matrix de adjacencia
    - Lista de adjacencia
- Caminhando em um grafo
    - BFS
    - DFS
- Algoritmos famosos
    - Dijkstra

## Colorindo Grafos

- Colorir um grafo (colorir os vertices) consiste em atribuir a cada vértice uma cor (ou um label) de modo que dois
    vertices adjacentes tenham cores distintas.
- A ideia é colorir todo o grafo mínimo de cores possível. Chegamos assim no _número cromático_ do grafo.

- [Vamos colorir uns grafos]

- Da pra colorir de forma ruim? Claro!
- Como fazer certo? No geral podemos ordenar os vertices pelo grau e ir colorindo os de maior grau

## Resolvendo problemas com Grafos

- Problema 1: Encontrando slots pra marcar reuniao
- Aqui na Codeminer a gente tem reunioes de vez em quando. Temos atividades internas como workshops, etc. Temos avaliacao tb.
- Na arte de marcar uma reuniao eu quero evitar conflitos.
- Eu nao posso marcar uma reuniao de mentores, que seja, ao mesmo tempo que marco uma reuniao de heads.
- Entao veja, queremos marcar as seguintes reuniones
    - Reuniao de heads
    - Reuniao de mentores
    - Workshop de Estruturas de Dados
    - Grupo de estudos de Ruby e Rails
    - Workshop de Monads
E a lista de convidados é:
    - Tony -> Reuniao de mentores, WS de estruturas de dados
    - Heitor -> Grupo de estudos de ruby
    - Vitiello -> Reuniao de mentores, Reuniao de heads
    - Gabriel Quaresma -> Workshop de Estruturas de dados, Ruby e Monads
- **De quantos slots precisamos?**

- R: Vamos montar um grafo em que os vertices sao as reunioes e as arestas ligam as reunioes que nao podem acontecer ao
    mesmo tempo pois possuem participantes em comum.

# Referencias
- https://developers.google.com/optimization/routing/vrp
