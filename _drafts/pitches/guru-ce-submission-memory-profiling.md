# Bio

Com 10 anos de carreira, atualmente trabalho como Desenvolvedor Senior na Codeminer42. Tenho trabalhado com Ruby e Rails há pelo menos três anos.

Sou aficionado por aprender e gosto de compartilhar com a comunidade seja em contribuições open-source, talks ou blog posts.

Ministrei um grupo de estudos, disponível no canal da CodeMiner42 no YouTube, onde fizemos um Banco de Dados inteiramente em Ruby - https://github.com/geeksilva97/amnesia-db-ruby.

Mais recentement fiz um estudo de aspectos internos do Enumerator do Ruby. Acabei criando minha própria classe de Enumerator, 100% funcional. Expus isso em um post no LinkedIn e em um artigo no blog da CodeMiner42:

- https://www.linkedin.com/posts/edigleyssonsilva_ruby-enumerator-lazyevaluation-activity-7220489128667209729-ELfV?utm_source=share&utm_medium=member_desktop
- https://blog.codeminer42.com/ruby-enumerators-a-point-of-view-youve-never-had/

Também contribuí em projetos opensource como CASA e Punchclock.

# Titulo

Como Evitar O Estouro De Memória Sua Aplicação Ruby

# Descricao

## Pitch

Softwares são feitos para serem úteis. Essa útilidade pode ser medida com eficiência e eficácia. Fazer software que funciona em Ruby não é uma tarefa muito complicada devido às features e à flexibilidade que a linguagem oferece.

A eficiência do software é algo que fica a cargo de quem o programou. Quando trabalhamos com Enumerators e Enumerables é fácil ser pego de surpresa com seu programa consumindo mais memória do que o necessário - as vezes chegando ao crash por falta de recursos.

Nessa palestra trago um exemplo real de uma aplicação que faz processamento de arquivos que crashou pois bateu limite de memória. Quero dar ênfase a como um código aparentemente normal pode se tornar uma fonte de problemas.

Quero mostrar também como podemos resolver tais problemas quando entendemos o que está por trás das classes Enumerable e Enumerator.

Como alguém que já cometeu erros desse tipo não só em Ruby mas em outras linguagens posso trazer diferentes perspectivas acerca do problema da eficiência.

## Objetivo

O principal objetivo dessa palestra é dar o poder às pessoas. Quero mostrar, com exemplos reais, como podemos facilmente cair em armadilhas. Da mesma forma quero mostrar que não é tão difícil evitar - ou mesmo lidar com - tais armadilhas se temos as ferramentas certas.

## Outline

- O Essencial de Enumerable e Enumerator

Nesse tópico quero que todos estejamos na mesma página. Explico o que são Enumerator e Enumerable, mostro alguns
exemplos de uso e comento de seu uso em outros casos como no ActiveRecord (https://api.rubyonrails.org/v7.2/classes/ActiveRecord/Relation.html).

- Ruby-way e Processamento de Arquivos

Ruby, apesar de ser muito conhecida como linguagem Orientada a Objetos, é na verdade multiparadigma e muito código
escrito em Ruby é declarativo.

Nesse tópico mostro um algoritmo simples que faz processamento de arquivos grandes usando a forma declarativa do Ruby.

- O Problema do Consumo de Memória

O estilo declarativo de escrita esconde detalhes de implementação. Isso é bom, porém isso te tira o controle sobre
o funcionamento das coisas e para aplicações críticas, com recursos escassos, você quer ter esse controle.

Nesse tópico mostro como o código apresentado na seção anterior é, embora não pareça, problemático.

- Enumerators Customizados

Depois de identificado o problema mostro como podemos continuar num estilo declarativo e ter o controle dos detalhes que
determinam a eficiência do software.

- Lazy Enumerator: Não faça agora o que pode deixar pra depois

Como bônus falo sobre lazy evaluation e como esse conceito se faz presente na classe Enumerator.

- Conclusão

Finalizo a apresentação citando outras dicas para análise e solução de problemas de eficiência. Mencionarei tópicos como:

    - Flame Graphs
    - Garbage Collector
    - Benchmarks
    - Heap snapshots
