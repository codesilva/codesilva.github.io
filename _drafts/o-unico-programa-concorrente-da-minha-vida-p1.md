---
layout: post
title: O único programa concorrente da minha vida
---

Uma balança, a [RFC 6455](https://datatracker.ietf.org/doc/html/rfc6455) e um sonho.

Em 2019 eu trabalhava em uma indústria de latícinios relativamente conhecida aqui o meu estado. Um dia chega uma demanda
pra gente: o setor da indústria, responsável pela produção, tem uma dor. Até aquela semana o método deles de etiquetação
era:

- pesa na balança;
- imprime a etiqueta com o espaço para o peso;
- anota o peso na etiqueta.

Bem arcaico eu sei, e com muito boas chances de alguém cometer um erro. As coisas estavam mudando e o gerente do setor,
solicitou uma impressora de etiquetas e uma balança nova. Porém, ele queria algo mais, ele queria uma balança acompanhada de um software. Um simples
software que lêsse o peso da balança e jã imprimisse a etiqueta.

NOTA: nao só peso sairia na etiqueta, mas também uma descricao.

Chegaram a balança e a impressora. O software ainda estava em negociação pois estavam cobrando um preço muito alto. Não
me recordo o valor exato mas era mais que dez mil reais, isso consigo lembrar.

Nosso gerente então pergunta se conseguimos fazer alguma coisa. Meu colega e eu dissemos sim e ficamos uma semana
brincando com a balança que tinha chegado e é aí que nossa jornada começa.

## Ler o Serial

Nosso setor de TI era composto de pessoas muito boas em suas respectivas áreas. Eu sempre fui de estudar coisas um pouco
distantes do trabalho coisas que o pessoal lá chamava de "mais inovadoras" - discordo um pouco, mas é tema pra outro
artigo.

Meu companheiro nesses perrengues por outro lado, era mais pragmático quanto a isso, mas tinha uma vasta experiência com
ERPs e sua lógica de negócio pois jã havia escrito um do quase zero. Além disso, era excelente em resolver problemas.
Não lembro de um que ele não tenha conseguido resolver. Com a balançca não foi diferente. 

NOTA: tinhamos um deadline de uma semana.

Em nosso primeiro dia com o equipamento, eu estava atarefaco com outras coisas em andamento, então meu coelga começou
fazendo o serial funcionar. E como falei, ele era um resolvedor de problemas, rapidamente encontrou uma implementaçã em
C# - linguagem de progtamação principal do time - e um simulador de porta serial pra testar o código.

Fez funcionar, depois disso conseguiu conectar a balaça no computador e ler o peso. Foi uma maravilha, um baita
progresso para o primeiro dia.

## Entender os interesses do cliente

Ler do Serial foi uma vitória e nós haviámos vencido. Agora tínhamos a semana toda pra trabalhar a parte fácil que era
a impresão, pensamos.

Conversando um pouco mais com o setor de indústria conseguimos entender melhor o problema deles. Eles chegaram
a mencionar as capacidades do softeare fornecido. No entanto, fomos conversando com o fito de encontrar o caminho
baseado nos interesses deles e nas capacidades do time.

Chegamos à conclusão de que o que o setor necessitava era na verdade um único modelo de etiqueta de um jeito
específico, só que com a capacidade de fornecer uma descrição, uma data e o peso, esse último já deveria vir da conexão
com a balança. Isso foi importante para bolarmos uma ideia de como fazer tudo funcionar.

## Impressão das etiquetas

Após essa conversa tive uma ideia. Bom, nós trabalhamos muito mais aplicações web. Então seria muito mais simples
continuar nessa área. Não valia nada a pena fazer um desktop pra nada.

NOTA: Talvez, um Electron coubesse, olhando para uma versão futura.

Então pensei: Podemos ter uma aplicação web que mostra um preview da etiqueta, ele imprime como uma página normal e isso
vai sair na impressora. 

minha hipótese se mostrou correta, naquele dia trabalhei no frontend que fazia isso. Com a impressora conectada, usar os
comandos convencionais de imprimir uma página funcionavam, então continuei aquele dia todo formatanod um prototipo de
etiqueta, trabalhando as dimensões e testando como ficava ao imprimiar a etiqueta.

## o design da aplicação

No terceiro dia procuramos conectar as coisas. Eu sabia que uma pagina web funcionaria, mas para tal, naturalmente,
a página deveria receber o peso. Agindo como o cliente, porém mais passivo, recebendo a informação, quanto tiver alguma.

Eu já conhecia websockets e foi só que me veio a mente. Nem pesquisei alternativas, confesso. Então seria assim:

- o programa em C# ficaria responsável por ler do serial e seria também o servidor de websocket;
- a pagina web seria client desse websocket e teria o preview da etiqueta.

Muito promissor, mas aquele dia reservava desafios. Desafios que vamos ver na parte 2.

---

# parte 2

## Um programa que faz duas coisas?

O programa tinha que lidar com a comunicação serial e também com clientes de websocket. E quando pensei nesse "lidar com
mais de uma coisa" lembrei de threads. Imaginei que poderíamos ter uma thread pra atuar como websocket e outra pra atuar
como servidor de websocket. Essa ideia se mostrou útil.


### Websocket e a falta de experiência

Eu já trabalhava com CSharp e dotnet core nessa empresa há pelo menos um ano. E como qualquer ecossistema imaginei que encontraria,
facilmente, um package de websocket que pudesse utilizar. Mas para a minha surpresa, não encontrei. Aqui ja nao sei se
foi devido à falta de experiencia ou porque realmente era complicado.

Lembro-me que no dotnetcore, no standard nao tinha nem lib pra parse de JSON - ussamos aquela Newtonsoft.

Eu chuto que é uma junção das coisas, pois que acabei encontrando bastante foram implementações de websocket. Peguei
algumas das implementações e tentei, cegamente, executar. Não funcionou. Pelo menos, não tudo. O handshake funcionava,
em nenhuma das implementações que encontrei tinha um send - pode ser devido à falta de experiencia até em pesquisar.

Eu comecei a ler a especificação do protocolo na tentativa de fazer funcionar. Revisei o _Data framing_, mas
a implementação não sair.

Foi mais um dia eu tentando fazer isso funcionar. Até então eu tinha uma aplicação que aceitava um único cliente - não
precisava demais - e conseguia ler do serial.

Bom, naquele dia, em casa, eu não me contentei, eu recomecei a implementação do WebSocket com a parte de código do
handshake. Aquilo estava martelando na minha cabeça. Eu tinha esquecido de por alguns bytes na mensagem enviada, por isso o cliente não conseuguia
receber.

Quando enviei um "hello world" do meu server pro client apareceu lá, eu fiquei maluco! Foi um momento eureka!

Confesso também que me senti bem por ter resolvido esse desafio, que até então, era o mais low-level da minha vida.

### Conectando as coisas

ja no terceiro dia eu tinha um servidor de websocket que funcionava e um codigo com leitura de serial. juntei as duas
coisas e funcionou. tive que arrumar uma coisinha aqui outra ali, mas deu certo. Fizemos alguns experimentos com
a balança. O código funcionava. Extremamente mal implementado, mas funcionava.

Agora eu podia voltar a focar no frontend da aplicação, na definição da etiqueta. E mais aquele dia levou para que
fossem feitos os ajustes e mais testes com a impressora.

Tudo estava encaminhado, agora era só configurar a máquina que ficaria no setor da indústria, do lado da balança,
servindo como host da nossa aplicação.

Não precisávamos de muito, uma máquina simples com 2GB de RAM e Intel Celeron era mais que o suficiente. O setup da
máquina foi iniciado naquele dia. No penultimo dia estávamos prontos para testar na máquina de destino e entregar
a aplicação.

> Sim, acredito que um embarcado em si fosse o adequado aqui

Porém não funcionou como o esperado e precisamos de uma reescrita invasiva num projeto já terminado e há um dia do
prazo.


---

# parte 3

## Dotnetcore não foi bem com os 2GB de RAM

Fizemos o build da aplicação gerando um binário da aplicaçao. Porém, para a nossa surpresa não conseguimos o DotNet core
na máquina host. Ela não tinha espaço suficiente.

Tentamos algumas soluções para fazer funcionar, mas sem êxito. Nesse meio tempo alo martelava na minha cabeça. Essa
máquina jã tem Python instalado, lembrando que o sistema operacional da máquina era Linux, então instalar
o interpretador/compilador não seria um problema se o código fosse em python.

Depois de algumas tentativas falei para meu parceiro, já frutstrado: e se a gente reescrever em python? Afinal já tem python na máquina. Bom, a reação
inicial não foi das melhores. Reescrever? Aquilo tinha levado um tempão.

Bom, claramente eu não iria refazer tudo do zero, e mesmo que precisasse, a expectativa é que fosse mais rápida já que
eu saberia exatamente o que fazer caso precisasse escrever outro websocket por exemplo.

Acontece que eu já conhecia python e sabia da força da comunidade em termos de pacotes. Então comecei minhas pesquisas,
primeiro, para conseguir ler do serial. Não foi muito complicado, tinha na standard library. Websocket, idem.

Depois de fazer essas coisas funcionarem separadamente, me debrucei sobre como poderia fazê-los de forma concorrente.
Encontrei, a até então lib, `asyncio` que dava essa posibilidade. Não foi lá muito difícil fazer funcionar.

Á tarde tínhamos a aplicação funcionando! Fizemos mais ajustes, como criar um serviço Linux para que a máquina jã
iniciasse com esse programinha ativo e fizemos muitos testes.

## A entrega

No último dia apresentamos a solução oficialmente. Fizemos mais testes e a partir daquela semana a aplicação passou
a operarar.

O funcionamento ainda era rústico. O usuário precisava interagir pra seguir com a impressão, pois clicava num botão
e aparecia aquela tela de impressão do browser. Sei que isso é ruim, mas essa aplicação, mesmo que não seja perfeita, salvou alguns milhares de reais e foi extremamete divertida de se implementar.

Essa aplicação nunca apresentou bugs. A única da minha vida também.

## Melhorias

o trabalho foi tão empolgante que pensei nas melhorias de antemao, como por exemplo: falar com a impressora diretamente.
Não tinha achado nada específico para Python que atendesse aos nossos requisitos, mas tinha visto que dava pra chamar
código C dentro do python, o que aumentava nossas possibilidades.

Foi uma vitoria e tanto. Nossos chefes ficaram felizes e vislumbravam o início de um trabalho mais low level, com
embarcados. Atẽ que as diretrizes mudaram. Nunca chegamos a implementar melhorias nessa aplicação. Mas ela atendeu
suficientemente bem às demandas enquanto estive por lá.

## Lições aprendidas

- Entenda os objetivos do seu cliente
- Nunca faça um websocket na mão para por em produção
- procurar entender melhor o fim daquela aplicação - a reescrita em python poderia ter dado ruim
