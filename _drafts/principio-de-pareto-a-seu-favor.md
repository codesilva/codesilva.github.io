---
layout: post
title: Evolua em programação com o Princípio de Pareto
date: 2023-06-19
lang: pt-BR
tags: ["princípio de pareto", "carreira", "pricípio de mateus"]
category: ["carreira"]
excerpt: Nos encontramos em uma situação caótica. Todo dia uma ferramenta ou técnica nova que precisamos assimilar. Se organizar para aprender em meio a esse caos pode ser bem complicado, sobretudo quando estamos coma visão errada sobre o aprendizado. Nesse post vamos diminuir o caos e por a cabeça no lugar para aprender bem e de forma consistente.
---

Uma coisa que sempre faço com meus companheiros de trabalho é discutir práticas de programação. Em nosso Discord temos inclusive um canal dedicado a isso chamado `best-practices`. Estávamos fazendo _bikeshedding_ sobre onde deveríamos por uma determinada função (estava mais pra um componente ReactJS). Durante essa conversa levantamos pontos e convergimos para um lugar comum, foi uma grande discussão.

Nesse bikesheding, entre uma mensagem e outra alguém citou um tal de <a target="_blank" href="https://react.dev/reference/react-dom/createPortal">**React Portals**</a>. Eu realmente não tinha ideia do que era isso. E sempre que tem algo assim que eu sou 100% leigo gosto de dar uma olhada, nem que superficialmente para ter uma ideia.

Isso me deu insumos para esse post, que não é sobre React Portals, mas sim sobre impressões que temos sobre o aprendizado de programação e por que pessoas em início de carreira deveriam se preocupar menos e procurar focar nas coisas certas.

## A confusão em que nos encontramos

Tem esse meu amigo contador que está transicionando de área. Grande decisão depois de muitos anos trabalhando com
contabilidade. Realmene corajoso.

Ele veio até mim perguntar uma série de coisas que quase todo mundo que é iniciante, e já me pediu algum conselho,  já
perguntou. Coisas como: _Qual a linguagem que devo escolher?_, _backend ou frontend?_, _será que devo largar isso que já
comecei e aprender essa outra coisa da moda?_, etc.

Isso é bem normal dado que a área é muito abrangente assim tendo muitas caminhos a serem seguidos e mesmo com um
caminho já definido existe um longo caminho a trilhar e muitos frameworks/libs JS para conhecer.

Eu estava inclusive com a ideia de escrever sobre um roadmap de programação, mas encontrei esse <a target="_blank" href="https://roadmap.sh/">site aqui</a> que
possui uma série deles e eu os curti bastante e acredito que sirva bem.

A confusão que estamos é natural do processo de evolução ao mesmo tempo que é extrapolada por agentes de mercado, por
assim dizer, que vivem de produzir curso. E como precisam de dinheiro, têm sempre que trazer um curso novo.
Honestamente, isso não é ruim. Algumas pessoas preferem aprender com cursos, então quanto mais e dos mais variados
assuntos melhor.

O ponto é que esses agente em geral não vão ter interesse nenhum em te explicar conceitos, mas sim ferramentas. Afinal,
se te ensinam um conceito que você vai aplicar independentemente da ferramenta, como vão te vender o curso de amanhã?

Apenas tenha em mente que <a target="_blank" href="https://codesilva.github.io/carreira/cursos/linguagens%20de%20programa%C3%A7%C3%A3o/2023/07/08/qualidades-que-os-cursos-deveriam-ter.html">há coisas que os cursos não te ensinam</a>.

## Princípio de Pareto aplicado a área de programação

É certo de que independentemente do caminho trilhado, muitas são as coisas que você vai precisar saber. Digamos que você
deseja ser um desenvolvedor mais de frontend. Você começa ali com HTML, um pouco de CSS pra estilizar. Daí a pouco você
precisa de um pouco mais de interação então vai ter de aprender JavaScript.

A partir disso você vai querer fazer coisas mais complexas com ReactJS, mas aí o código de qualidade precisa de testes
então você aprende React Testing Library, um pouco de cypress depois e por aí vai.

Nesse dois parágrafos já citei um punhado de coisas e isso não é muito mais que o básico. A medida que você for
evoluindo é esperado que se depare com outros problemas que vão demandar técnicas e ferramentas específicas.

Isso pode ser encarado de formas variadas. Isso pode ser observado como um fardo de que nunca se termina de aprender,
o que pode dar a sensação de nunca se estar pronto ou como algo bom por saber que área sempre vai oferecer uma nova aventura.

Eu particularmente gosto mais da segunda perspectiva e me sinto bem em saber que o meu dia de trabalho não vai se
monótono que tem muitas profissões que existem. Eu vejo como um privilégio até.

O que Pareto tem a ver com com tudo isso? Acredito que parte do que faz os desenvolvedores em início de jornada
a entrarem e parafuso é o fato de acharam que devem saber TUDO de forma altamente aprofundada.

Se você não conhece o **princípio Pareto** eis a definição:

> O princípio de Pareto (também conhecido como regra do 80/20, lei dos poucos vitais ou princípio de escassez do fator) afirma que, para muitos eventos, aproximadamente 80% dos efeitos vêm de 20% das causas.
>
>
> O consultor de negócios Joseph Moses Juran sugeriu o princípio e o nomeou em homenagem ao economista italiano Vilfredo Pareto, que notou a conexão 80/20 em sua passagem pela Universidade de Lausanne em 1892...

Trazendo para o nosso cenário podemos dizer que: com **20% do conhecimento** de frontend você vai conseguir resolver **80% dos problemas**. Pode parecer loucura, mas esse padrão existe e ele está presente em diferentes níveis.

Falando de operações com arrays em JavaScript por exemplo, existe um punhado de métodos de iteração que você vai utilizar
no dia-a-dia: `map`, `filter`, `reduce` e `forEach`. Com apenas esses 4 você vai sim resolver a maioria dos problemas
que envolvam iterar um array - claro, temos os loops convencionais mas falando de JavaScript ninguém mais usa isso.

Em HTML mesmo. Fiz uma pesquisa rápida e vi aqui que existem atualmente por volta de `140 tags` na especificação. Mas as
comumente utilizadas, pelo menos sob a perspectiva dos projetos em que trabalho e tirando as básicas da estrutura de um
documento HTML, são: `div`, `section`, `h1` (e até `h6`),
`span`, `p`, `main`, `footer`, `header`.

> Fiz um pequeno experimento em um dos projetos em que trabalho na GoDaddy. Processei todos os arquivos tsx em busca das
> tags. É um projeto relativamente e só usa 39 tags. Em torno de 30% das tags

Claro, posso ter esquecido uma tag ou outra que é bem comum, mas eu acho que você já pegou a ideia. É possível fazer
bastante coisa com uma pequena fração do todo.

É aí que está o alívio. Não precisamos estudar cada coisa até o final e só daí partir para próxima. Podemos
paralelizar o aprendizado e tocar multiplas superfícies. Você não precisa conhecer as mais de 100 tags HTML antes de
iniciar seus experimentos com CSS. Ou mesmo, você não precisa conhecer todos os possíveis comandos Docker antes de subir
sua aplicação em um container.

Com a tranquilidade de saber que não precisa ser especialista em tudo - no sentido de saber tudo de cor - trago também
a dica de sempre: Foque em conceitos não em ferramentas.

## Uma nota sobre especialização

A pergunta que pode ficar é: mas então eu não vou me especializar? Eu diria que você vai. Porque no começo você vai
aprender algo, e vai arrumar um estágio. Nesse estágio certas coisas vão demandar mais de você. Ainda no exemplo de
frontend, é provável que você tenha que estudar mais e mais JavaScript o que vai te tornar um cada vez mais em especialista - dentro do seu nível.

Em meu exemplo pessoal, comecei profissionalmente escrevendo bastante código PHP e JavaScript. Isso foi o que ficou por
muito tempo. O PHP já deixei de lado há um tempo - não por escolha necessariamente - mas o JavaScript persiste.

É importante deixar claro que essa é a MINHA especialidade no sentido de que fazer qualquer coisa em JavaScript hoje vai
ser bem mais simples pra mim do que em qualquer outra linguagem. E também no sentido de que sei explicar bem mais
aspector internos sobre JavaScript do que sobre qualquer outra linguagem.

O ponto interessante é perceber que com o tempo suas especialidades podem mudar, porque seus gostos podem mudar e quanto
mais coisas você se torna um especialista em aprender e aí tudo fica mais fácil. Por exemplo, eu não conhecia o tal do
**React Portals** citado no começo do post, mas eu conhecia esse conceito do **VueJS** de quando fazia contribuições
mais assíduas ao projeto open-source _Buefy_ - conceitos acima de ferramentas.
