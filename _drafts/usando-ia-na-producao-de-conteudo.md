---
layout: post
title: "Usando IA na Produção de Conteúdo"
date: 2025-11-25
tags: [gemini, ollama, ia, tutorial]
categories: [ia, gemini]
---

usar ia para produzir conteúdo sempre vai gerar polêmica. a verdade é que **ninguem gosta** de conteúdos gerados por ia.
chegamos ao ponto em que o uso de travessões, que eu gosto muito, é visto como um sinal de que o texto foi gerado por
ia. isso é triste, mas é a realidade.

ninguém gosta de conteúdos gerados por ia porque eles não bons.

Nessa palestra, o autor fala sobre o processo de revisar propostas de palestras para o evento `NDC Oslo`. Ele chega
a mencionar que foi lendo e lendo várias propostas e tendo um desconforto, ficando com raiva.

> "... eles estam escritos em Linkedines, uma espécie de dialeto usado em posts do LinkedIn ..."

<iframe width="560" height="315" src="https://www.youtube.com/embed/XhKcelV7DBo?si=pgTFs9QiZDmo75IP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

<br />
<br />

## IAs Generativas São Medíocres

O conteúdo produzido por IAs é que nem MCDonald's. Certamente, muitas pessoas gostam de MCDonald's, e dependendo do seu contexto ele pode ser uma boa opção. Num grupo de amigos, vocês estão indecisos sobre onde comer. Se alguém sugere McDonald's, todos concordam. As vezes num aeroporto, entre um voo e outro, um McDonald's te salva.

No entanto, se decidem que querem comer algo especial, alguém bem preparado, o McDonald's nem entra em discussão.

Na produção de conteúdo, o mesmo vale. Para fazer um bom conteúdo é preciso **pensar**, coisa que IA nenhuma faz. [Pensar é difícil][] e por isso requer repetição e esforço.

Assim como fast food tem seu lugar, ferramentas de IA generativa também têm seu lugar na pipeline de produção de conteúdo. 

## Usando IA na Produção de Conteúdo

Eu uso IAs generativas pra me ajudar em todos os artigos que escrevo, tanto para esse blog, quanto para o blog da [Codeminer42](https://blog.codeminer42.com). Uso também para escrever roteiros de workshops e palestras.

O processo é o seguinte:

### EU ESCREVO O TEXTO

Faço a minha pesquisa, coloco as minhas ideias no papel (ou no editor de texto). Separo a escrita do texto em duas
partes: escrevo o texto, coloco as ideias sem me preocupar com grmática ou fluidez.

Não me preocupo em fazer um texto perfeito logo de cara. Escrevo o texto, deixo ele "cru".

Pense como se fosse um filme. São horas e horas de filmagem, mas o que você assiste no cinema são 2 horas de filme editado. A ordem foi modificada, cenas foram cortadas, outras foram adicionadas na pós-produção.

A ideia é a mesma. Escrevo o texto, deixo ele cru, depois volto e edito. Nessa edição eu melhoro o que encontro de
errado. Melhoro gramática, adicionou, removo ou adiciono parágrafos inteiros.

essa divisão ajuda muito pois não vou gastar energia pensando na melhor formatação do texto enquanto escrevo.

### EU USO IA PARA ME AJUDAR NA EDIÇÃO DO TEXTO

Tendo uma versão prévia do texto, faço uso de IAs generativas para me ajudar na tarefa de edição pedindo que corrija
eventuauis erros que deixei passar. Peço também pra melhorar a fluidez do texto e reduzir repetições.

#### Qual modelo usar?

Essa é a pergunta de um milhão de dólares. A verdade é que não existe um modelo perfeito. Minha recomendação é que você
faça os seus próprios testes.

Eu experimentei alguns modelos como Qwen3, ChatGPT-4 e Kimi K2 Thinking. O que melhor funcionou pra mim foi o [`Kimi K2`][],
sem o _Thinking_.

Eu o uso dentro do [OpenCode][] através do [Ollama Cloud][]. Eu uso pelo Cloud, mas você pode rodar localmente também
caso tenha hardware suficiente.

Kimi K2 tem uma performance boa a ponto de eu poder tirar o Grammarly da minha pipeline de edição quando escrevendo textos em inglês.

#### Título e Imagens

Título é das coisas mais importantes em um artigo. É o que o leitor vê primeiro e o que vai fazer ele decidir se clica
ou não no link.

Eu sempre tenho minhas próprias ideias para títulos, mas peço ajuda da IA para melhorar eles. Peço sugestões de títulos
alternativos e também peço para melhorar títulos que eu já tenha.

Se o blog requer imagem de capa, como é o caso do blog da Codeminer42, peço ao [`Kimi K2`][] um prompt para gerar uma imagem
que combine com o título e o tema do artigo. Uso esse prompt no Nano Banana para gerar a imagem.

[Pensar é difícil]: https://codesilva.github.io/aprendendo-a-aprender/2025/06/05/como-reter-conhecimento.html#1-voc%C3%AA-precisa-pensar-n%C3%A3o-buscar-por-respostas
[Ollama Cloud]: https://ollama.com/cloud
[`Kimi K2`]: https://github.com/MoonshotAI/Kimi-K2
[OpenCode]: https://opencode.ai/
