# Fundamentos da Arq. de Software

Padrões arquiteturais, estilos arquiteturais e design de código são termos que ouvimos com frequência quando se trata de software escaláveis. Embora esses termos pareçam descrever a mesma coisa, não é isso que acontece; eles definem coisas diferentes, que se relacionam em algum nível.

Nessa talk recorreremos aos princípios das boas práticas e aprenderemos, por meio de exemplos, como um padrão arquitetural surge e porque ele é importante. Com exemplos convencionais estabelecemos as bases, partimos então para exemplos menos convencionais com o objetivo de fixar o entendimento.

## Mensagem privada

Essa talk tem como principal objetivo introduzir conceitos de arquitetura a partir de seus fundamentos, solidificando as bases e deixando o espectador em um estado de consciência acerca desses conceitos que são bem "marketáveis" atualmente.

TAKEAWAYS

- Entender a diferença entre padrões e estilos arquiteturais e design
- Reconhecer como como esses conceitos se conectam
- Entender o princípio de desacoplamento que separa as regras de negócio dos detalhes

TÓPICOS

- Design Patterns e SOLID
- Estilos arquiteturais
- Padrões arquiteturais
- Modelagem e domínio de aplicações

ESTRUTURA DA PALESTRA

O código que funciona

- Com o objetivo de ser prático inicio um app simples de controle financeiro com a ideia mais básica: fazer funcionar
- Sigo comentando que apenas funcionar não é o suficiente.
- Trago os primeiros princípios fundamentais: Easy To Change e Don't Repeat Yourself

Design Patterns

- Aqui começo comentando sobre como design patterns é mais um conjunto de princípios que é utilizado, algo como um padrão que emerge ao invés de um standard que define regras mais estritas e estáticas
- Com o entendimento de alguns patterns, aplicamos à nossa app de finanças com o objetivo de organizar melhor;
- Por fim comento sobre como design patterns emergem, as vezes você já usou um ou outro, intuitivamente, sem nem saber o nome. Enfatizo, no entanto, que design patterns definidos são bons para a comunicação entre desenvolvedores.

Padrões e Estilos Arquiteturais

- Inicio essa parte da apresentação explicando o que é cada coisa e como elas se diferem. Faremos isso com exemplos conhecidos, como REST que é um estilo arquitetural famoso
- Voltamos a trabalhar em nossa aplicação, aplicando a divisão entre regras de negócio e detalhes (até aqui estava tudo acoplado)
- Vemos os benefícios de tal separação
- Avançamos um pouco mais mostrando como decisões de design dão suporte às arquiteturas

Conclusão

- Concluo a apresentação com uma breve retrospectiva da aplicação, de onde saímos e onde chegamos
- Dou um breve preambulo do que vem pela frente, pois sim, isso é só uma introdução
