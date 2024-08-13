# Introduzindo orwell

## Vamos falar sobre alertas

Alertas são importantes para monitorar o sistema e garantir que ele está funcionando corretamente.
Tivemos problemas com isso no ano passado quando uma de nossas aplicações parou de funcionar e não percebemos. Não foi
um outage geral, mas algumas features não funcionavam.

## Technical debt team e ELK

Assim, como membro do time de technical debt, fui designado para definir alertas para as aplicações. A ideia do time era
serviro tanto a IPS quando a Payments Hub.

Assim, o ideal seria uma solução mais geral. Uma solução que pudesse ser usada por qualquer time. O time poderia:

- definir seu alerta baseado em logs
- esses alertas seriam executados periodicamente
- os alertas poderiam ser enviados por email, slack, etc

Pensei então na dificuldade que seria conceber algo assim. Como temos alertas já definidos, perguntei por aí sobre como
as pessoas faziam alertas.

A maioria deles usava uma ferramenta que eu já havia visto na documentação do Elastic: Rules and Connectors. Na verdade
esse produto atende a todos os requisitos.

Menos um. Um requisito nosso de como que o alerta deveria ser. O alerta deveria ter contexto, deveria ter call to
actions. A ideia é que fosse tal qual um _oncall_ reportado. Vem o problema e vem junto o contexto.

Rules e connectors, no entanto, são limitados quanto as ações. As mensagens são geralmente padrões. Isso justamente,
porque o conjunto de dados que ele te oferece para montar uma mensagem pro Slack, por exemplo, é limitado.

Como queríamos sumarizar, o alerta deveria ser mais rico.

Eu tinha conhecimento de outro alerta. Esse parecia encaixar mais com o que precisávamos. Era um alerta mantido pelo
time de Ecomm.

E foi aí que passei a conhecer os Watchers.

## Watcher trazem flexibilidade (trade-off: complexidade)

[Explicar o que é um Watcher]

### Painless alerts

Gerenciar alertas desse jeito de ficar subindo manualmente e essas coisas é chato demais. Assim nasceu o Painless
Alerts; um projeto que tem toda uma estrutura para gerenciamento de alertas no Elastic.

### A solução: orwell

Orwell é o passo adiante. É o desacoplamento da lógica de gerenciamento de alertas no elastic.
