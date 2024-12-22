---
layout: post
title: 'Node.js é o melhor projeto opensource para contribuir'
date: 2024-01-01
lang: pt-BR
category: ["nodejs", "opensource"]
excerpt: Você já percebeu que faz algumas atividades, como andar de bicicleta, sem saber? Claro, não é sem saber, é que você criou uma memória muscular, você ficou tão expert nessas atividades que faz sem nem perceber...
---

Desde 2021 tenho contribuído assíduamente com projetos opensource. Comecei com um muito bom chamado Buefy. Até cheguei
a escrever sobre essas experiência. Destacando [os comos e porquês de contribuir com projetos opensource][medium-post].

Em 2024, no entanto, eu quis tentar algo diferente. Eu queria contribuir num projeto que tivesse mais impacto. Eu já
tinha aprendido Erlang e pensei em usar os projetos opensource para de alguma forma validar meu conhecimento.

> Na verdade, opensource em Erlang era uma meta de 2023 que eu não consegui alcançar.

Eu consegui. Abri alguns PRs no projeto [cowboy][cowboy]. É um projeto bem legal, é um web server bem robusto e que
é utilizado projetos bem famosos como o [Phoenix Framework][phoenix].

Meu único PR que entrou no cowboy, inclusive, quebrou coisas em projetos do lado do Elixir.

![Jose Valim (the creator of Elixir) commenting on the PR I merged in cowboy project][jose-valim]

Definitivamente foi uma mudança impactante. Eu fiquei feliz de ter conseguido, com a ajuda do mantenedor, colocar
_código Erlang em produção_.

Me empolguei e abri vários outros. Mas que nunca entraram. Nem mesmo revisados foram. Talvez eu estivesse empolgado
demais.

![][review-pr]

Entre os dias 5 e 6 de Fevereiro eu fiz as mudanças e solicitadas e não tive retorno. Passados quatorze dias, eu tentei
solicitar revisão novamente.

![](https://cdn.discordapp.com/attachments/1320081464179687484/1320083913703424033/image.png?ex=67684f73&is=6766fdf3&hm=1f6d7604956773d4bd67068a5cdbe941978c7138c39f472f90c3bb83fabbb9d0&)

> "Eu eventualmente sempre volto"

Depois desse dia ele não voltou mais.

Sem ressentimentos. É um projeto de um mantenedor só e que parece gostar de fazer as coisas sozinho mesmo.

## Tópicos

- [Uma pessoa ordinária que estuda](#uma-pessoa-ordinária-que-estuda)
- [libuv-e-nodejs](#libuv-e-nodejs)

## Uma pessoa ordinária que estuda muito

Depois de ficar um pouco desiludido eu pensei em que outros projetos eu poderia atuar. Pensei em alguns do momento como
`vitest` e `Gleam`. Mas acho que perdi um pouco da vontade. Não consegui nem mesmo começar.

Tirei um tempo então pra estudar coisas que eu considerava ter dificuldades, como a linguagem C e Assembly. Encontrei um
livro muito bom de C, o [Build Your Own LISP][]. Livro excelente que te ensina C a medida que você vai desenvolvendo uma
linguagem de programação da família Lisp - tipo um clojure. Acaba que você aprende muito sobre programação funcional
até.

Depois de concluir o livro ainda andei praticando mais coisas em C e depois fui revisitar conceitos de Assembly. No
caso, Assembly do MIPS.

E redescobri muito sobre o funcionamento da máquina, endereços de memóra, IO e interrupcção de Hardware. Esse interesse
veio depois que li o livro [Code][] de Charles Petzold que te ensina tudo o que você precisa saber sobre
o funcionamento do computador. Inclusive te ensina a criar circuitor como RAM e CPU.

Nem todo mundo vai consumir esses conteúdos, eu sei. Por isso decidi eu mesmo escrever um livro sobre isso. Ainda não
tem um título definido, mas penso em algo como `Ciência da Computação para pessoas apressadas` com seu primeiro volume
explicando a arquitetura de computadores e como eles são capazes de executar esses tais "programas". Essa é uma das
minhas metas de 2025.

Nesse período dedicado a aprender C e Assembly, me perguntaram: pra quê você está estudando isso? Uma perguta normal
dado que meu dia a dia é trablahar com ReactJS, NodeJS e as vezes um pouco de Ruby on Rails.

Em essência minha resposta era e é: porque sim!

Eu não aprendo as coisas porque elas vão ser úteis agora, já passei dessa fase. Eu aprendo as coisas porque quero. Mesmo
que sejam `INÚTEIS`.

E é isso que eu faço. Eu vejo algo que me interessa e pesquiso sobre. Tento me aprofundar. Daí do outro lado pode
parecer muita coisa, pode parecer difícil, mas não.

Sou que nem você. Sou uma pessoa ordinária só que eu estudo. Eu tenho curiosidade genuína e assim como dizia o Richar
Feynman: "Uma pessoa ordinária que estuda pode fazer grandes coisas".

## libuv

Há uma coisa que percebi durante o período em que tentei contribuir com o cowboy. Há menos pessoas tentando contribuir.
Não é muito difícil de entender o porquê. Há poucos desenvolvedores Erlang se compararmos como linguagens como
JavaScript. Dentre esses poucos, menos ainda estão dispostos a contribuir com projetos opensource.

Isso é porque Erlang é complicado mesmo a princípio. Pelo menos foi complicado pra mim.

Com isso em mente, eu decidi aplicar meus conhecimentos, ainda modestos, da linguagem C e tentar contribuir com
a `libuv`. A lógica era a mesma. O projeto é em C, logo a concorrência é menor. De fato o é.

A recepção foi incrível.

![](https://cdn.discordapp.com/attachments/1320081464179687484/1320192452719808512/image.png?ex=6768b488&is=67676308&hm=2b94a1f6ef1afc6954a0f5e2895f1a753a7445876b6ba90307c506b3dac3cda1&)

Nessa issue os mantenedores [Ben Noordhuis][] e [Saúl Ibarra][] me ajudaram com uma paciência de jó. São pessoas que
realmente dispostas a te ajudar.

![](https://cdn.discordapp.com/attachments/1320081464179687484/1320193758863556618/image.png?ex=6768b5c0&is=67676440&hm=458d31ded829f127c1b095f5edac4da0fc2dd56d1dff58f6a166b689e356565d&)

No caso dessa issue eu consegui fazer os testes da libuv rodarem no Android. Precisei ajustar algumas coisas no código
e nos testes mas no final deu tudo certo.

Ou melhor, quase tudo. No final os testes ainda estavam intermitentes e eu não pude entender o porquê. Até que uma outra
pessoa veio e deu sequência no meu trabalho. Foi incrível.

Quero poder contribuir mais com a libuv. Ainda tenho muito a evoluir em C e I/O, e tem o fato de já ser um projeto bem
estabelecido, entregando tudo que se propõe a fazer muito bem - algumas issues não consigo nem entender do que falam.

A libuv é uma das dependências do NodeJS. É por meio dela que o tal `event loop` é implementado. Um outro detalhe é que
alguns dos mantenedores da libuv são também mantenedores do NodeJS.

Por mais que tenha sido complicado eu consegui colocar código no repositório da libuv. Isso me deu confiança para tentar
também no NodeJS.

## NodeJS

No NodeJS eu tive a mesma recepção que tive na libuv. É um porjeto convidativo a ponto de terem um [calendário
público][nodejs-calendar] que te permite participar das reuniões.

Não só isso, há um slack em que você pode até conversar com os mantenedores. Isso não é incrível?

Graças a ajuda deles eu consegui fazer contribuçõe que até foram impactantes como o fix de um memory leak no
[AbortSignal][]. Contribuí também com correções de documentação, correções no `test runner` e no módulo `node:assert`e
por último vemo me aventurando com C++, V8 e libuv em alguns PRs para o módulo `node:sqlite`.

Todos com quem interagi de Setembro até agora foram incríveis. Mas em especial agradeço ao [Rafael Gonzaga 🇧🇷 ][rafael-gonzaga], [Chemi
Atlow][], [Ruben Bridgewater][] e [Colin Ihrig][]. Me ajudaram muito e me fizeram sentir parte do projeto.

O projeto do NodeJS é realmente algo incrível. Se você gosta de JavaScript ou C/C++ e tem vontade de contribuir com um
projeto opensource, o NodeJS é o lugar certo.

Eu sei que parece difícil, mas não é o que você imagina. Claro que tem sua complexidade; o trabalho feito numa runtime
não é um CRUD ou uma tela como estamos acostumados a fazer. Mas é algo que pode ser feito; as pessoas vão te ajudar, e se eu consegui, você também
consegue.

## O Futuro

Trabalhando no NodeJS aprendi muito sobre Memória e como debugar problemas de vazamento de memória. Aprendi sobre o V8
e como ele é utilizado no projeto. Aprendi também sobre a dinâmica, a organização, de um projeto dessa proporção.

Eu quero continuar fazendo isso. Eu quero, na verdade, poder fazer mais ainda. Claro, quanto a poder fazer mais ainda
depende de mais abertura por parte dos mantenedores e mais tempo meu dedicado ao projeto. Espero que aconteça, mas por
hora só quero terminar esse [PR do `node:sqlite`](https://github.com/nodejs/node/pull/56253).

[medium-post]: https://edigleyssonsilva.medium.com/why-and-how-to-contribute-to-open-source-projects-3d985d8d8619
[cowboy]: https://github.com/ninenines/cowboy/pulls/geeksilva97
[jose-valim]: https://cdn.discordapp.com/attachments/1320081464179687484/1320081472173899967/image.png?ex=67684d2c&is=6766fbac&hm=bbdbe643e9f47393fa0744c9b83fc5d90df83e3472149c828b6f4940d5447e7c&
[review-pr]: https://cdn.discordapp.com/attachments/1320081464179687484/1320083245085491230/image.png?ex=67684ed3&is=6766fd53&hm=b3c9d29e3f1f3b3ba3dbeeb89f8f5ac252e33657fc8f3ce510c77b8396d4ae00&
[Build Your Own LISP]: https://buildyourownlisp.com/
[Code]: https://www.amazon.com.br/C%C3%B3digo-2ed-Vida-Secreta-Computadores/dp/8582606311/ref=sr_1_2?crid=IFTSNCSCQNC1&dib=eyJ2IjoiMSJ9.OF_EBB08x9KyZP9sPgHdUY7urjyWvQd1j99xgm7-ye6oB_SdS6MUGoepnaBcuswfaFYGj50BjDJhWJirGPgAFwRz9dpIHpxaC7siEzdcyQPmxlIE2uPPCn9beEcwGFHd5BZJHGXEiPEFHcDw6CHmQcQJJOdEYXIsNdQwsp9GLt5OcFrSIP5CfXt671Xja8VR8IRk9zF7qjRMQMqzMcQs3YiuZYBj7jS9aER4fCMvtXs.qWglBg0VQwXRIjmFWvbBj4VPVj6ychxbLyvMsfeQGgM&dib_tag=se&keywords=code+the+hidden+language+of+computer+hardware+and+software&qid=1734804385&sprefix=code+the%2Caps%2C384&sr=8-2&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9
[nodejs-calendar]: https://nodejs.org/calendar
[AbortSignal]: https://github.com/nodejs/node/commit/91b6e3c2874b6f6940e6dde5b5d00501d698fd30
[rafael-gonzaga]: https://github.com/RafaelGSS
[Chemi Atlow]: https://github.com/atlowChemi
[Ruben Bridgewater]: https://github.com/BridgeAR
[Colin Ihrig]: https://github.com/cjihrig
[Ben Noordhuis]: https://github.com/bnoordhuis
[Saúl Ibarra]: https://github.com/saghul
