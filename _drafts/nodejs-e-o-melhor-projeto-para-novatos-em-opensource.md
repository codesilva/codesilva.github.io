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

## Uma pessoa ordinária que estuda

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

## libuv e NodeJS

## Uma nota sobre criatividade

## Mais livros

[medium-post]: https://edigleyssonsilva.medium.com/why-and-how-to-contribute-to-open-source-projects-3d985d8d8619
[cowboy]: https://github.com/ninenines/cowboy/pulls/geeksilva97
[jose-valim]: https://cdn.discordapp.com/attachments/1320081464179687484/1320081472173899967/image.png?ex=67684d2c&is=6766fbac&hm=bbdbe643e9f47393fa0744c9b83fc5d90df83e3472149c828b6f4940d5447e7c&
[review-pr]: https://cdn.discordapp.com/attachments/1320081464179687484/1320083245085491230/image.png?ex=67684ed3&is=6766fd53&hm=b3c9d29e3f1f3b3ba3dbeeb89f8f5ac252e33657fc8f3ce510c77b8396d4ae00&
[Build Your Own LISP]: https://buildyourownlisp.com/
[Code]: https://www.amazon.com.br/C%C3%B3digo-2ed-Vida-Secreta-Computadores/dp/8582606311/ref=sr_1_2?crid=IFTSNCSCQNC1&dib=eyJ2IjoiMSJ9.OF_EBB08x9KyZP9sPgHdUY7urjyWvQd1j99xgm7-ye6oB_SdS6MUGoepnaBcuswfaFYGj50BjDJhWJirGPgAFwRz9dpIHpxaC7siEzdcyQPmxlIE2uPPCn9beEcwGFHd5BZJHGXEiPEFHcDw6CHmQcQJJOdEYXIsNdQwsp9GLt5OcFrSIP5CfXt671Xja8VR8IRk9zF7qjRMQMqzMcQs3YiuZYBj7jS9aER4fCMvtXs.qWglBg0VQwXRIjmFWvbBj4VPVj6ychxbLyvMsfeQGgM&dib_tag=se&keywords=code+the+hidden+language+of+computer+hardware+and+software&qid=1734804385&sprefix=code+the%2Caps%2C384&sr=8-2&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9
