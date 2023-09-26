---
layout: post
title: Matemática te faz pensar/programar melhor
date: 2023-09-26
lang: pt-BR
tags: ["ciencia da computacao", "matematica"]
category: ["ciencia da computacao"]
---

Quando se inicia numa faculdade de Ciência da Computação e afins é comum refletirmos sobre alguns porquês. Eu, particularmente refletia sobre o porquê precisávamos de tanta matemática nos primeiros semestres de curso. Naturalmente, é um curso de ciência então discíplinas como Cálculo são necessárias.

Em particular eu sempre senti que a disciplina de **Matemática Discreta** me ajudava, mas não sabia como descrever isso, confesso.

Recentemente retomei os estudos, usando o livro **Concrete Mathematics** e também acompanhando a playlist do MIT: [Mathematics for Computer Science](https://www.youtube.com/watch?v=L3LMbpZIKhQ&list=PLB7540DEDD482705B) e agora as coisas ficaram mais claras. É mais fácil ver onde esses conceitos nos ajudam.

Alguns conceitos, claro, são mais simples de ver no dia a dia, como é o caso de **Teoria dos Conjuntos**. É muito mais
simples ver que os conceitos de teoria dos conjuntos estão presentes em queries que você faz num banco de dados.

E por isso eu quero fazer algo diferente aqui, eu quero falar sobre provas matemáticas, que pra mim foi a parte mais
complicada da disciplina. Mas que vejo hoje como uma das mais importantes para o dia a dia, para coisas não
necessariamente técnicas.

## Provas de teoremas, lógica e argumentação

Um dia comum na aula de Matemática Discreta começava com o professor colocando algum teorema, alguma afirmação e pedia
para que os alunos provassem. Algo como: `para qualquer n inteiro maior ou igual a 5, 2^n > n^2` - esse é um exemplo simples, os problemas costumavam ser mais desafiadores que esse.

O que vinha na sequência era o silêncio. Depois de um tempo, o professor resolvia ou mandava todo mundo pra casa pra resolver.

O fato é que pra resolver proposições como essa a gente pode se valer de algumas estratégias como:

- prova direta;
- prova por absurdo;
- prova por indução.

Independentemente da sua escolha, o que importa é que você vai ter que formar bases sólidas de argumentação para validar a sua prova. Você parte de `axiomas` e a proposição dada e chega numa conclusão, seja que a proposição é falsa ou verdadeira.

E isso é o que faz no dia a dia. No dia a dia quando você está fazendo seu código você parte de premissas, organiza seus pensamentos de forma lógica sem furar nenhuma premisa ou axioma e chega no resultado. O mesmo vale pra quando você analisa código dos outros, você pega as premissas e analisa os passos lógicos seguidos afim de saber se aquela "prova" está correta.

Eu passei por isso durante um code review recentemente. Vi o que a sequencia de passos seguida quebrava algumas premissas e imaginei que tivesse algo errado. Eu não aprovei a PR, mas alguém o fez e o código que entrou em produção quebrou parte do fluxo.

É algo que você desenvolve, sua observação das coisas melhora. Você vai melhorar sua escrita de testes automatizados, por exemplo, pois vai conseguir **isolar as premissas** a atacar melhor cada caso de teste. Suas discussões técnicas vão ser mais ricas porque também devido à compreensão de premissas você fará melhores conclusões sobre cada caminho, sobre prós e contras, etc.

## Precisa mesmo?

Precisar mesmo não precisa. Porém tendo bases sólidas vai ser mais difícil incorrer em desastres fatais como o bug do [Therac-25](https://en.wikipedia.org/wiki/Therac-25) que vitimou pelo menos seis pessoas emitindo mais radiação do que o esperado durante os tratamentos. Você vai se sentir mais tranquilo também em saber que seu código não derrubou um avião <sup>[[1]](https://www.barrons.com/news/inquiry-into-2019-ethiopian-air-crash-confirms-software-failure-01671821708)</sup>.

Provavelmente a aplicação em que você esteja trabalhando não seja tão crítica, mas os mesmos cuidados devem ser tomados. Não só pensando na empresa em que você trabalha e no lucro, mas também nos seus consumidores. Eu trabalhei em um app que ajudava pessoas a estudarem para concursos. Uma falha causava transtorno e poderia ser impecílio na busca do objetivo dessas pessoas.

## Conclusão

Espero que você tenha clareado sua mente e visto o quanto o estudo da matemática pode ser importante. A ideia não
é ser um matemático. Até porque a matemática é muito vasta. A ideia é aprender e entender os conceitos que vão ser importantes pra você, na sua jornada, daí vem o nome do curso do MIT e o tema do livro citados no post. 

São fundamentos para ciência da computação. É só o que você precisa.

Por hoje é só. Abraços.
