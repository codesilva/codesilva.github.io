# Como trabalhar com código legado

## Problema

The Mythical Man-Month, the woes of the craft

> ...outras pessoas definem os objetivos, fornecem os recursos e fornecem informações. Raramente se controla as circunstâncias do seu trabalho, ou mesmo o seu objectivo. Em termos de gestão, a autoridade de alguém não é suficiente para a sua responsabilidade. Parece que, em todos os domínios, contudo, os trabalhos onde as coisas são realizadas nunca têm autoridade formal proporcional à responsabilidade. Na prática, a autoridade real (em oposição à autoridade formal) é adquirida a partir do próprio impulso da realização.
>
> A dependência de outros tem um caso particular que é especialmente doloroso para o programador do sistema. Ele depende dos programas de outras pessoas. Muitas vezes, eles são mal projetados, mal implementados, entregues de forma incompleta (sem código-fonte ou casos de teste) e mal documentados. Portanto, ele deve passar horas estudando e consertando coisas que num mundo ideal seriam completas, disponíveis e utilizáveis.

O problema é que seu trabalho é controlado por outros. Inclusive, a codebase e ferramentas que vai utilizar são
definidas por outros, muitas vezes na concepção do produto.

Trabalhar com código legado não parece ser excitante, mas com certeza é desafiador e se sair bem com um código legado
diz muito sobre suas habilidades.

> O verdadeiro greenfield são os legados que refatoramos ao longo do caminho

A ideia dessa talk é definir um mapa de como lidar com código legado. 

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

