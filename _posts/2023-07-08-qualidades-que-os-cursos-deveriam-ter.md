---
layout: post
title: Qualidades que os cursos deveriam ter - mas não vão
date: 2023-07-08
lang: pt-BR
tags: ["roadmap", "programação"]
category: ["carreira", "cursos", "linguagens de programação"]
---

Se você procurar por um curso de qualquer coisa em plataformas como Udemy, Udacity e mais algumas outras aí que eu não
conheço, com certeza vai encontrar aos montes - encontrará <a href="https://www.udemy.com/course/firebase-dominando-as-security-rules/" target="_blank">o meu curso sobre Firebase Security Rules, inclusive</a>.

Eu simplesmente abri a udemy e digitei: `"react"` na barra de busca. Uma lista imensa de cursos apareceu. Um total **9 mil resultados** distribuídos em 481 páginas. Alguns cursos mais diretos com React, outros em uma pegada mais full stack e mais algumas variedades, mas o padrão vai se repetindo com praticamente o mesmo conteúdo oferecido por instrutores diferentes.

Por um lado isso é bom, pois você pode escolher dentre os cursos, aquele o qual você gosta mais da
abordagem, didática, desafios propostos, etc. Por outro lado, você vai ser só mais um dos 3 mil alunos que vai aprender
a mesma ferramenta sendo utilizada de um mesmo jeito.

Eu busquei também por `"código legado"`. Nada muito animador. O mais próximo que encontrei foi um curso sobre Clean Code - que não é a mesma coisa. Clean Code é muito mais útil pra escrever um código novo do que para se trabalhar com um legado
existente.

Pesquisei por `"legacy code"` e obtive resultados melhores. Encontrei dois cursos mais direcionados ao assunto, pelo que
vi da ementa. Mas esses em inglês, claro.

Não fiz uma coleta e análise, mas é fácil ver,  com algumas poucas buscas, que existe uma demanda gigante por cursos
de ferramentas ao invés de cursos que te ensinam habilidades reais sobre como ser um profissional de programação.
Acredito que isso é normal e não vai mudar. Afinal quem está começando quer um emprego, quer ter algo para mostrar para
os amigos - postar no LinkedIn.

No entano, a jornada as vezes é tortuosa, e nesse artigo vou discorrer sobre o que acredito que deveria estar um num curso
que o tornaria realmente efetivo, sem amarras de ferramentas e atemporal.

## O jardim nem sempre é tão verde

Eu dei bastante sorte. Comecei minha carreira trabalhando em um projeto que era novo: reescrever um ecommerce de brindes para eventos, que estava
em ASP, em PHP e JQuery. Foi muito bom, a gente, ingenuamente até, escreveu cada pedaço da nova aplicação, o único framework
era o Bootstrap.

Trabalhar em um projeto _greenfield_ assim é muito bom e é isso que a maioria dos cursos ensinam. Eles te ensinam
a criar uma aplicação usando Next.JS. Eles montam o slogan: "from zero to hero". E sejamos sinceros, é o que vende.
É esse tipo de coisa que vai te saltar aos olhos. Você pensa, estou começando a estudar tecnologia X, o curso me diz que
vou sair de zero e ficar hero em X. Por que não compraria?

Mas nem sempre temos tal sorte. E depois de um tempo você percebe que grandes são as chances de você trabalhar em um
projeto com um produto já existente, portanto com um código já existente, código de uma outra pessoa, com seu próprio
background e jeito de fazer as coisas. E não vão mudar somente porque você quer ter Kotlin com coroutines integrado um banco NoSQL que só você conhece - muito específico, eu sei.

Muitas vezes o código nem segue as práticas mais convencionais (pode ter seus motivos para tal). Até em startups mais
jovens a gente encontra isso. Trabalhei em uma que tinha ainda 4 anos de vida, mas tinha um código com algumas partes
que os devs tinham medo de tocar.

Greenfield projects são ótimos, são renovadores, mas nos últimos 3 anos estive em 3 empresas diferentes, uma como dev
contradado e em outras duas como consultor e em todas haviam softwares legados em que a gente tinha tanto que manter
funcionando quanto adicionar coisa nova. E nesses três anos, o único projeto realmente novo que trabalhei foi há alguns
meses, e advinha? Sim, mais uma reescrita.

Tenho colegas de trabalho que até semana passada ainda estavam trabalhando com JQuery. Em 2023! Nada contra JQuery
claro, muito boa ferramenta.

## Habilidades que são tool-free

Existe um conjunto de habilidades que são independentes de ferramenta e que são extremamentes importantes no dia-a-dia de um programador. Abaixo listo dois conjuntos de habilidades que acredito estarem nessa categoria.

### Investigação/Pequisa

Considero essa a mais importante. Porque nem sempre você vai saber muito sobre uma ferramenta, ou mesmo sobre o projeto
em que você está trabalhando atualmente, com código criado por outras pessoas.

Atualmente estou em um projeto que requer muito isso. Ele consiste de muito repositórios que se conectam para performar
as mais diversas tarefas. As vezes me pego perdido e tenho de conectar os pontos, sair procurando no código e entender
como as coisas se conectam.

Essa habilidade também é útil para auditar as ferramentas que utilizamos no dia-a-dia. As vezes a ferramenta faz algo
que não está em sintonia com o que esperamos e com habilidade de invetgação podemos idenficar isso e tomar uma medida.

Naturalmente, investigar bem vai te ajudar também na resulção de bugs e contorno de documentações ruins.

### Aplicação de Patterns

Desing Patterns é algo que aprendemos, pelo menos deveríamos, quando vemos alguma disciplina ou curso de Orientação
a Objetos. Eles são no mínimo mencionados.

Patterns são interessantes e desempenham um papel importante no design de aplicações. Acredito, no entanto, que
poderíamos nos debruçar mais sobre aplicações de tais patterns em código que já existe, em código legado.

Criar o seu `AbstractSingletonProxyFactoryBean` em projeto novo é até tranquilo. Difícil mesmo é aplicar em código existente de modo que peguemos um código legado e o transformemos em algo melhor. E quanto mais você fizer isso mais vai conseguir ver os patterns emergindo dos códigos que vê.

## Conclusão

Se você encontrar um curso com essas qualidades ele é muito provávelmente um curso que vale a pena. Claro, isso não
significa que um curso que explica uma ferramenta é ruim ou que não tem seu valor. As vezes buscamos algo mais focado
é rápido e cursos assim vêm a calhar. Mas se você ainda está se desevolvendo como programador isso pode não ser o suficiente.

Por outro lado, preparar um curso só disso pode não ser muito atrativo, além de difícil. O que resta pra quem produz
treinamentos, cursos, bootcamps, etc é tentar embutir junto com o ensino da ferramenta.

Tentei fazer isso no curso em que produzi sobre **Firebase Security Rules**. Todo o curso é envolto em aplicar conceitos
em uma aplicação criada. A aplicação começa 100% insegura e vamos melhorando ao longo das aulas. Ainda, além de só já passar
a forma que escrevo e penson as regras eu procurei mostrar como podemos encontrar as coisas na documentação do Firebase.

Ainda assim, mesmo que eu tenha tentado eu posso ter falhado e esse é um curso mais nichado, que vai atingir somente
quem conhece e se interessa por Firebase e Firestore. Pode não ser o seu caso.

A melhor forma de adquirir tais habilidades não é necessariamente com cursos. Deixo aqui uma lista de
livros que abordam habilidades essenciais que vão além de criar e manter código. Pra isso já temos os **9 MIL CURSOS**
Udemy.

Os livros são:

- O Programador Pragmático, Dave Thomas e Andrew Hunt
- O Mítico Homem-Mês, Fred Brooks
- Refatoração, Kent Beck
- Trabalhando Efetivamente com Código Legado, Michael C Feathers

É importante notar que algo que nenhum curso vai te ensinar, pelo menos nenhum
sobre programação, é a ter interesse em estudar. Isso tem de vir de você. A vontade de melhorar, a vontade de desbravar
o novo.

Por hoje é só. Aproveite sua nova lista de leitura e até mais.
