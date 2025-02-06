---
layout: post
title: 'Node.js é o melhor projeto opensource para contribuir'
date: 2025-01-07
lang: pt-BR
category: ["nodejs", "opensource"]
excerpt: 'Já passou pela sua cabeça contribuir com o NodeJS? Sei que as vezes parece muito distante, mas eu sou a prova de que isso não é verdade. Nesse post compartilho minha jornada até aqui e provo que você também pode.'
---

## Tópicos

- [Uma pessoa ordinária que estuda](#uma-pessoa-ordinária-que-estuda)
- [libuv](#libuv)
- [NodeJS](#nodejs)
- [O Futuro](#o-futuro)

Desde 2021 tenho tentado a manter a frequência em contribuções com projetos opensource. Comecei com um muito bom chamado Buefy. Até cheguei
a escrever sobre essas experiência. Destacando [os comos e porquês de contribuir com projetos opensource][medium-post].

Em 2024, no entanto, eu quis tentar algo diferente. Eu queria contribuir com um projeto mais geral. Eu já tinha aprendido Erlang e pensei em usar os projetos opensource para de alguma forma validar meu conhecimento.

> Na verdade, opensource em Erlang era uma meta de 2023 que eu não consegui alcançar.

Eu consegui. Abri alguns PRs no projeto [cowboy][cowboy]. É um projeto bem legal, é um web server bem robusto e que
é utilizado projetos bem famosos como o [Phoenix Framework][phoenix].

Meu único PR que entrou no cowboy, inclusive, quebrou coisas em projetos do lado do Elixir.

![Jose Valim (the creator of Elixir) commenting on the PR I merged in cowboy project][jose-valim]

Definitivamente foi uma mudança impactante (kkkk). Eu fiquei feliz de ter conseguido, com a ajuda do mantenedor, colocar
_código Erlang em produção_.

Me empolguei e abri vários outros. Mas que nunca entraram. Nem mesmo revisados foram. Talvez eu estivesse empolgado
demais.

![image](https://github.com/user-attachments/assets/2f7e30e7-5d60-46d0-bf25-aedfde2ccc4b)

Entre os dias 5 e 6 de Fevereiro eu fiz as mudanças e solicitadas e não tive retorno. Passados quatorze dias, eu tentei
solicitar revisão novamente.

![image](https://github.com/user-attachments/assets/4e64e17b-23eb-4a5d-9623-c792d55ca655)

> "Eu eventualmente sempre volto"

Depois desse dia ele não voltou mais.

Sem ressentimentos. É um projeto de um mantenedor só e que parece gostar de fazer as coisas sozinho mesmo.

> **EDIT (5 de Fevereiro)**: Ele realmente voltou
>
> ![mantenedor cowboy retorna depois de oito meses](assets/cowboy-pr-retorno.png)

## Uma pessoa ordinária que estuda

Depois de ficar um pouco desiludido eu pensei em que outros projetos eu poderia atuar. Pensei em alguns do momento como
`vitest` e `Gleam`. Mas acho que perdi um pouco da vontade. Não consegui nem mesmo começar.

Tirei um tempo então pra estudar coisas que eu tinha pouca afinidade, como a linguagem C e Assembly. Encontrei um
livro muito bom de C, o [Build Your Own LISP][].

Livro excelente que te ensina C a medida que você vai desenvolvendo uma
linguagem de programação da família Lisp - tipo um clojure. Acaba que você aprende muito sobre programação funcional
até.

Depois de concluir o livro ainda andei praticando mais coisas em C e depois fui revisitar conceitos de Assembly. No
caso, *Assembly do MIPS*.

E redescobri muito sobre o funcionamento da máquina, endereços de memóra, IO e interrupcção de Hardware. Esse interesse
veio depois que li o livro [Code][] de Charles Petzold que te ensina tudo o que você precisa saber sobre
o funcionamento do computador. Inclusive te ensina a criar circuitos como RAM e CPU.

> Nem todo mundo vai consumir esses conteúdos, eu sei. Por isso decidi eu mesmo escrever um livro sobre isso. Ainda não
> tem um título definido, mas penso em algo como `Ciência da Computação para pessoas apressadas` com seu primeiro volume
> explicando a arquitetura de computadores e como eles são capazes de executar esses tais "programas". Essa é uma das
> minhas metas de 2025.

Nesse período dedicado a aprender C e Assembly, me perguntaram: **pra quê você está estudando isso?** Uma perguta normal
dado que meu dia a dia é trabalhar com ReactJS, NodeJS e as vezes um pouco de Ruby on Rails.

Em essência minha resposta era e é: **porque sim!**

Eu não aprendo as coisas porque elas vão ser úteis agora, já passei dessa fase. Eu aprendo as coisas porque quero. Mesmo
que sejam `INÚTEIS`.

É isso que eu faço. Eu vejo algo que me interessa e pesquiso sobre; tento me aprofundar. É mais trabalhoso do que
dificil.

Sou uma pessoa ordinária só que eu estudo.

## libuv

Há uma coisa que percebi durante o período em que tentei contribuir com o cowbow foi que há menos pessoas tentando contribuir.

Não é muito difícil de entender o porquê. Há poucos desenvolvedores Erlang se compararmos com linguagens como JavaScript. Dentre esses poucos, menos ainda estão dispostos a contribuir com projetos opensource.

> Erlang é um pouco diferente mesmo. Amigos meus dizem que é mais fácil aprender latim

Com isso em mente, eu decidi aplicar meus conhecimentos, ainda modestos, da linguagem C e tentar contribuir com
a `libuv`. A lógica era a mesma. O projeto é em C, logo a concorrência é menor.

A recepção foi incrível.

![image](https://github.com/user-attachments/assets/3c1e0486-769f-426e-a051-32a469126f7f)

Nessa issue os mantenedores [Ben Noordhuis][] e [Saúl Ibarra][] me ajudaram com uma paciência de jó. São pessoas genuinamente dispostas a te ajudar.

![image](https://github.com/user-attachments/assets/ddf45b86-6744-429a-b93a-d51e0ae9d79d)

No caso dessa issue eu consegui fazer os testes da libuv rodarem no Android. Precisei ajustar algumas coisas no código
e nos testes mas no final deu (quase) tudo certo.

Os testes ainda estavam intermitentes e eu não pude entender o porquê. Até que uma outra pessoa veio e deu sequência no meu trabalho.

A libuv é uma das dependências do NodeJS. É por meio dela que o tal `event loop` é implementado. Um outro detalhe é que
alguns dos mantenedores da libuv são também mantenedores do NodeJS.

Por mais que tenha sido complicado eu consegui colocar código no repositório da libuv. Isso me deu confiança para tentar
também no NodeJS.

## NodeJS

No NodeJS eu tive a mesma recepção que tive na libuv. É um projeto convidativo no nível de terem um [calendário
público][nodejs-calendar] que te permite participar das reuniões.

Não só isso, há um [slack](https://slack-invite.openjsf.org/) em que você pode até conversar com os mantenedores. Isso não é incrível?

Graças a ajuda deles eu consegui fazer contribuçõe que até foram impactantes como o fix de um memory leak no
[AbortSignal][]. Contribuí também com correções de documentação, correções no `test runner` e no módulo `node:assert`.
Por último venho me aventurando com C++, V8 e libuv em alguns PRs para o módulo `node:sqlite`.

Todos com quem interagi de Setembro até agora foram incríveis. Mas em especial agradeço a [Rafael Gonzaga 🇧🇷 ][rafael-gonzaga], [Chemi
Atlow][], [Ruben Bridgewater][] e [Colin Ihrig][]. Me ajudaram muito e me fizeram sentir parte do projeto.

O projeto do NodeJS é realmente bem convidativo e há várias formas de fazer parte. Se você gosta de JavaScript ou C/C++ e tem vontade de contribuir com um
projeto opensource, o NodeJS é o lugar certo.

Eu sei que parece difícil, mas não é o que você imagina. Claro que tem sua complexidade. O trabalho feito numa runtime
não é um CRUD ou uma tela como estamos acostumados a fazer, mas é algo que pode ser feito; as pessoas vão te ajudar.

Se eu consegui, você também consegue.

## O Futuro

Trabalhando no NodeJS aprendi muito sobre coisas _low level_ e como debugar problemas de vazamento de memória. Aprendi sobre o V8
e como ele é utilizado no projeto. Aprendi também sobre a dinâmica, a organização, de um projeto dessa proporção.

Eu quero continuar fazendo isso. Eu quero, na verdade, poder fazer mais ainda e aprender durante o processo. Mas por hora só quero terminar esse [PR do `node:sqlite`](https://github.com/nodejs/node/pull/56253).

> **EDIT (5 de Fevereiro)**: O PR foi aceito 🙌. Espero seguir contribuindo

[jose-valim]: https://github.com/user-attachments/assets/c2f9c3c0-0581-4014-b7f9-a3a516ca0edf
[medium-post]: https://edigleyssonsilva.medium.com/why-and-how-to-contribute-to-open-source-projects-3d985d8d8619
[cowboy]: https://github.com/ninenines/cowboy/pulls/geeksilva97
[phoenix]: https://www.phoenixframework.org
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
