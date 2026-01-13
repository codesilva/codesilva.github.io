---
layout: post
title: "A crise do software, 50 anos depois"
date: 2026-01-11
lang: pt-BR
categories: [carreira]
excerpt: ""
---

Em 1972, Edsger Dijkstra recebeu seu Turing Award e fez um discurso memorável chamado "[The Humble Programmer](https://www.cs.utexas.edu/~EWD/transcriptions/EWD03xx/EWD340.html)" (O Programador Humilde).

Esse é um texto que poucas pessoas conhecem, mas que todos deveriam ler. Nesse discurso, que já tem mais de 50 anos, Dijkstra traz muitos takeaways que são extremamente relevantes para os dias de hoje. Por exemplo:

> A habilidade mais importante que um programador precisa ter é a capacidade de abstração

Ele também fala que

> Aqueles que querem ter um software confiável têm que encontrar meios de evitar a maioria dos bugs, e como resultado, o processo de desenvolvimento ficará mais barato

Quem aqui nunca ouviu falar de débito técnico? Código sem testes custando muito tempo e até [satisfação dos desenvolvedores](https://codesilva.com/carreira/2025/12/29/76-porcento-devs-insatisfeitos-como-fugir-estatistica-2026)?

Mas tem outra coisa bem mais marcante nesse discurso e que voltou a martelar na minha cabeça nesses anos em que a IA está cada vez mais presente no desenvolvimento de software.

## A CRISE DO SOFTWARE

Em 2024, tive o prazer de palestrar no Google I/O Extended, em Fortaleza. Minha palestra foi uma introdução ao Gemini e como integrá-lo com Firebase.

No [slide final](https://docs.google.com/presentation/d/1lzwdDXjuSrtYCoaFPhYRVqXkS-nq0s2heCXZih1oYso/edit?slide=id.g215889bf275_0_180#slide=id.g215889bf275_0_180), falo sobre a crise do software mencionada por Dijkstra e como tudo isso poderia voltar a acontecer.

Em seu discurso, Dijkstra fala sobre a sua vida de programador, termo que ainda nem era considerado como profissão direito.

Todo mundo tinha mais interesse no hardware do que no software. Daí o nome "o programador humilde".
<br />
<br />

> E quanto ao pobre programador? Bem, para dizer a verdade: ele quase não foi notado.
>
> [...] seu trabalho, de certa forma invisível, não tinha nenhum glamour: você podia mostrar a máquina aos visitantes, e isso era várias vezes mais espetacular do que algumas folhas de código.
>
> Mas, acima de tudo, o próprio programador tinha uma visão muito modesta de seu trabalho: toda a sua importância derivava da existência daquela máquina maravilhosa.
>
> Como aquela era uma máquina única, ele sabia muito bem que seus programas tinham apenas relevância local e, também, como era evidente que aquela máquina teria uma vida útil limitada, sabia que muito pouco do seu trabalho teria valor duradouro.

Então, nesse contexto, de máquinas exuberantes e cada vez mais poderosas, ele observou que a ambição da sociedade estava aumentando de forma proporcional.

Eu citei esse discurso e nomeei meu slide como "A crise do software" porque isso tudo é muito semelhante ao que estamos vivendo hoje.

Apenas troque as máquinas exuberantes por modelos de IA cada vez mais poderosos. E observe como tudo o que Dijkstra falou se aplica perfeitamente ao nosso momento atual.

## A CAUSA DA CRISE

Ele elenca duas causas para a crise, sendo a segunda a maior delas:

1. as máquinas novas são mais difíceis de programar do que as antigas
2. o aumento da ambição da sociedade

Ele fala:

> Enquanto não existiam máquinas, a programação não era problema algum; quando tínhamos alguns computadores fracos, a programação tornou-se um problema moderado, e agora que temos computadores gigantescos, a programação tornou-se um problema igualmente gigantesco.
>
> Nesse sentido, a indústria não resolveu nenhum problema, apenas criou problemas, **criou o problema de usar seus produtos**.

Isso é muito similar ao que acontece com LLMs e agentes de código hoje. Enquanto essas ferramentas não existiam ou eram fracas, seguir sua vida de programador como antes era simples.

Mas à medida que foram ficando boas, o nível de ambição da sociedade aumentou (PMs, clientes, etc.). As pessoas esperam que façamos coisas cada vez mais complexas, e com isso, o problema de programar voltou com tudo.

E sim, todos esses providers de modelos criaram o **problema de usar seus produtos**.

Você tem que testar modelos variados, tem que saber como integrá-los, seja diretamente ou via algum provider como AWS Bedrock ou Google Vertex AI.

Você tem de conhecer diferentes ferramentas para criar seus próprios agentes de IA e também tem de saber como usar agentes de IA de forma efetiva.

## SAIA DO HYPE ANTI-IA

Sim, o problema está aí. Mas assim como as máquinas não pararam de evoluir, modelos generativos também não vão. Pelo menos, não vejo por que.

A essa altura, já não faz mais sentido estar no [hype anti-IA](https://antirez.com/news/158).

No contexto de geração de código, tem MUITA gente utilizando e há um bom motivo para isso. Os modelos realmente são bons. Sim, você TEM QUE USAR. Assim como Dijkstra teve que usar as máquinas exuberantes e mais complicadas.

Esse blog mesmo, agora tem um dark mode, a página de [livros](https://codesilva.com/books/) está toda refatorada e você já pode até [ler livros direto aqui](https://codesilva.com/nodejs-apocrypha/node-internals/boundary-crossing/2025/07/13/nodejs-apocrypha-base-object). Tudo isso fiz em algumas horas com a ajuda do Claude.

Sim, eu tinha que fazer usando IA. Eu não tenho saco pra ficar ajustando CSS do blog ou mexendo no template do Jekyll. A IA fez um trabalho muito melhor do que eu faria e o resultado foi muito satisfatório.

O [Linus Torvalds também usa IA](https://github.com/torvalds/AudioNoise/commit/93a72563cba609a414297b558cb46ddd3ce9d6b5) e tem consciência de que é uma ferramenta extremamente poderosa em muitos contextos.
<br />
<br />

> Na maior parte, tudo correu bem, embora eu tenha tido que descobrir qual era o problema [...] Depois de instruir o antigravity [...] as coisas melhoraram bastante.
>
> Isso é muito melhor do que eu conseguiria fazer manualmente? **COM CERTEZA**

Fingir que ferramentas de IA são inúteis ou irrelevantes não trará nada de bom para a sua carreira. Pode trazer coisas ruins, mas de bom com certeza não.

Teste, experimente com essas ferramentas. Como sugere o `antirez` (criador do Redis), não faça um teste qualquer de cinco minutos em que você só confirma suas teses.

Experimente por algumas dezenas de vezes, encontre um jeito de fazê-la útil.

## TANGENTE: ACABARAM OS JÚNIORS?

Em um contexto em que os modelos estão cada vez melhores. A ambição aumenta em todos os lugares. Um jr de antes não pode ser o mesmo de agora.

Se você é, por exemplo, um frontend jr que é bom de CSS e HTML mas é ruim de lógica. Lamento, mas boa parte do que você faz, um Claude Opus da vida também faz. Há modelos abertos e grátis que são capazes de fazê-lo também.

Você vai precisar fazer mais, vai precisar entender mais de lógica, estruturas de dados e mais fundamentos. Sobretudo pra conquistar sua primeira oportunidade.

Além disso, há a componente de conduta. Dave Thomas e Andrew Hunt já falaram disso nos anos 90 em seu livro, The Pragmatic Programmer. Escrever código é só parte do trabalho.

Pessoas ainda são necessárias pois têm uma capacidade de se integrar e crescer dentro de um projeto que uma LLM não tem. Pelo menos não na mesma intensidade.

É importante observar, no entanto, que o conjunto de habilidades mínimas mudou.
