# Como trabalhar com código legado

- nao tenha medo do codigo legado
- Entenda, domine e transforme o código legado

## Problema

The Mythical Man-Month, the woes of the craft

> ...outras pessoas definem os objetivos, fornecem os recursos e fornecem informações. Raramente se controla as circunstâncias do seu trabalho, ou mesmo o seu objectivo. Em termos de gestão, a autoridade de alguém não é suficiente para a sua responsabilidade. Parece que, em todos os domínios, contudo, os trabalhos onde as coisas são realizadas nunca têm autoridade formal proporcional à responsabilidade. Na prática, a autoridade real (em oposição à autoridade formal) é adquirida a partir do próprio impulso da realização.
>
> A dependência de outros tem um caso particular que é especialmente doloroso para o programador do sistema. Ele depende dos programas de outras pessoas. Muitas vezes, eles são mal projetados, mal implementados, entregues de forma incompleta (sem código-fonte ou casos de teste) e mal documentados. Portanto, ele deve passar horas estudando e consertando coisas que num mundo ideal seriam completas, disponíveis e utilizáveis.

Seu trabalho é controlado por outros. Inclusive, a codebase e ferramentas que vai utilizar são
definidas por outros, muitas vezes na concepção do produto.

Trabalhar com código legado parece não ser excitante, mas com certeza é desafiador e se sair bem com um código legado
diz muito sobre suas habilidades.

> O verdadeiro greenfield são os legados que refatoramos ao longo do caminho

A ideia dessa talk é dar uma perspectiva diferente acerca de código legado e definir um mapa para lidar com código legado.

### Por que isso importa?

- voce como profissional de desenvolvimento raramente vai ter controle das circunstancias do seu trabalho
- voce trabalha em produto dos outros; nao se fica reescrevendo base de codigo o tempo todo, o projeto tem que andar
- embora isso seja a tonica da sua profissao voce nao vê muita capacitacao nesse sentido;

### Por que consigo falar disso?

- Exerci liderança no time de debito tecnico da GD
- Na Petlove trabalhei na migracao de frontend legado e na melhoria do backend legado em java
- Sou aficionado em 'renovacao de código', em refactoring. Acredito que é das coisas que mais estressam suas habilidades

## Takeaways

- A importancia dos testes
- Tecnicas de refatoracao
- Documentacao, comunicacao e colaboracao
- Uso de Decorator Pattern e Principio da inversao de dependencia

## Outline

### 1. Mudanças no código (woe of the craft)

- queremos manter a maior parte do comportamento
- tipos de mudança
- o que é cógido legado?
    - janelas quebradas e perda de contexto

### 2. Guia para lidar com código legado

- manutencao de comportamento não é simples

### 3. Trabalhando com feedback

- Testes
- componente difíceis de testar
- quebra de dependencias

### 4. Patterns para o dia a dia

- principio da inversao de dependencia
- decorator pattern
- adapter pattern

### 5. Legado e pragmatico

- Um comentário sobre comentários
- O que é feito em um dia, é desfeito em um dia
    - Resistindo à tentação do refactor que leva à toca do coelho
    - Refatoracao massica leva a perda de contexto

-----

# Submissao TDC SP

Em meus últimos três projetos trabalhei e com código legado e fui capaz de produzir uma melhoria efetiva neles. Mais recentemente pude liderar um pequeno time dedicado a resolver débitos técnicos na GoDaddy.

Aprender a trabalhar com código legado não é algo muito ensinado, não há cursos disso, por exemplo. Acredito que é por conta que não é algo simples de se passar em um curso assim tal qual é fazer um curso de zero to hero de alguma tecnologia X, além de que um curso de código legado não vende muito, afinal ninguém gosta de código legado.

Eu tenho um certo apreço por trabalhar em código legado, penso que é um desafio. Pegar algo não tão bom naquele contexto e melhora-lo. Eu gostaria de trazer essa perspectiva nessa talk usando como referência o livro Working Effectively with legacy code e trazendo exemplos práticos que vi em meus últimos projetos.

TAKEWAYS

A importancia dos testes
Técnicas de refatoração
Documentação, comunicação e colaboração
Patterns: Decorator, Adapter e principio da inversão de dependência

ESTRUTURA DA PALESTRA

Mudanças no código

- Começo esse tópico falando sobre tipos de mudança (bugfix, adição de feature e otimização). Concluo nesse tópico que um dos objetivos que temos, trabalhando em um projeto já existente, é manter a maior parte do do comportamento intacta.

Guia para se trabalhar com código legado

- Uma vez que falamos sobre mudança no código e manutenção de comportamento partimos para discorrer sobre código legado em si. Definimos o que é e analisamos um mapa mental geral sobre como lidar com código legado, algo como "mudando comportamento com segurança" em código legado.

Trabalhando com Feedback

- Aqui tomo um tempo para falar da importância dos testes; observando que atuam como um feedback (de preferência rápido) do nosso trabalho. Mudamos e com o resultado dos testes podemos determinar se o comportamento é o esperado (recorro aqui ao que falamos sobre manter a maior parte do comportamento intacta).

- Testar as vezes não é tão simples, tomo um tempo falando sobre possíveis dificuldades na implementação de testes focando sobretudo no problema das dependências e como boa parte das nossas dificuldades em testes e mudança de comportamento tem a ver com dependências que são difíceis de mockar/emular, ou mesmo construir em um ambiente de testes rápidos.

Técnicas e patterns para o dia a dia

- Aqui mostro exemplos de códigos, exemplos que vi nos últimos anos, sobretudo. Esses exemplos mostrarão a essência do problema e é obsevando-os que vou começar a falar sobre Técnicas e Patterns que podemos usar para lidar com esses exemplos. Como os problemas são em muitos casos devido a dependências mostrarei como o Principio da Inversão de Dependência vai ser utilizado em técnicas como Extração de interface, Decorator e Adapter pattern.

Sendo pragmático com código legado

- Finalizo a palestra falando sobre pragmatismo. Discorro um pouco sobre documentação de conhecimento e comentários no código. Além disso, faço um apelo para que melhorias sejam feitas em pequenos esforços, para que evitemos a tentação de refatorações massivas pois se fizermos isso corremos risco de perder contexto uma vez que dependendo do que seja estaremos entrando na toca do coelho, um caminho sem fim.
- O código é como se fosse nossa mesa de trabalho, precisamos mantê-lo organizado e esse é um trabalho recorrente.

## Para o público

Trabalhar em greenfield é algo excitante, mas isso é uma parcela muito pequena do trabalho diário. No geral você vai manter/melhorar produtos que já existem. E se já existem já possuem tecnologias e práticas definidas. As vezes essas práticas necessitam de uma renovação de uma melhoria e isso é um desafio.

Nessa talk quero te mostrar uma nova perspectiva sobre código legado. Quero te mostrar, que na verdade, o código legado não é necessariamente código ruim e mais, te mostrar que o código legado traz uma série de oportunidades para aplicação de conceitos que melhoram a qualidade do software. Sim, um código legado pode ser renovado e conseguir fazer isso é o que vai te diferenciar na área.
