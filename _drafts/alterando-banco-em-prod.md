---
layout: post
title: Alterando o banco de produção de forma segura
date: 2024-03-12
lang: pt-BR
tags: ["banco de dados", "database migrations"]
category: ["banco de dados"]
---

Preparando uma talk interna sobre deployment eu tive memórias da guerra. Memórias de quando trabalhei em uma indústria
de laticícinio que possuia todas as suas aplicações em dois servidores `bare-metal`. Os servidores não eram lá dos
melhores e as tecnologias que usávamos pareciam não escalar corretamente.

Há alguns causos que eu posso contar sobre esse perído da minha vida. Embora tenha sofrido um pouco, nem todo sofrimento
é em vão. Eu acredito profundamente que há um tipo de sofrimento que constrói. No geral, isso só pode ser observado ou com
experiência ou ligando os pontos, este segundo só acontece depois então pode ser frustrante mesmo.

Um dos momentos mais sofridos e tensos era o deployment de versões. Devido à criticidade da aplicação, fazíamos um
processo minucioso e muito cuidadoso para evitar desastres. Nesse post quero compartilhar esse causo e te deixar alguns
insights sobre deployment, mais especificamente sobre alteração de banco de dados de produção.

## Nossa stack

Nossa stack era talk qual como descrita abaixo. O core das nossa empresa e de muitas outras indústrias semelhantes era
o ERP. ERP é um tipo de aplicação que traz consigo já muitas funcionalidades que são de extrema importância para os
múltiplos setores de uma empresa. Então módulos dos setores de comercial, logística, estoque, contabilidade e mais.

São muitas atribuições e trabalhar em um tipo de aplicação dessas é outra perspectiva.

![Imagem com a stack utilizada pelo setor de TI da indústria mostrando como os usuários interagem com as aplicações](/assets/maranguape.png)

Uma breve descrição:

- ERP Sapiens - Sapiens era o ERP que utilizávamos, fornecido pela empresa Senior Sistemas;
- Satelite - aplicações que ficavam em torno do ERP, aplicações que integravam com ele;
- Banco de dados - Banco de dados SQL Server.

Essa stack rodava em dois servidores: `aragorn` (teste) e `gandalf` (produção). Cada servidor tinha [Microsoft IIS](https://en.wikipedia.org/wiki/Internet_Information_Services) para execução
das aplicações Satelite, que tinha backand em C# com dotNet e algmas páginas em PHP, tinha [Glassfish](https://www.oracle.com/middleware/technologies/glassfish-server.html) para execução do
ERP, pois este era escrito em Java, e tinha o banco de dados que, como já mencionado, era SQL Server.

![Processos principais de um servidor em nossa stack](/assets/server.png)

## Deployment e Banco de Dados

## Noites de deployment

## Referências

- https://stackoverflow.com/questions/40987909/best-practice-for-updating-production-database
