# TDC DX Node

Bom dia pessoal. obrigado por estarem aqui. 

Me chamo Edy Silva. Sou pai de uma filha linda, esposo de uma mulher incrível e eu tenho um computador.

Que uso pra desenvolver - e escrever sobre - software.

Eu trabalho como Developer Relations na Codeminer42. Nós somos uma software boutique, especialista em JavaScript, Ruby,
Rails e outras tecnologias.

Além disso, nós temos diversas iniciativas interessantes dentro da companhia. Destaco aqui o nosso programa de trainee
que é bem completo e tem formado muitos novos miners. Temos um programa de pro-bono e outras iniciativas como
contribuições open-source.

Você pode checar mais em nosso site. Basta ler esse QR Code e você estará lá.

## Nos tempos de Java

minha experiencia com java foi muito pouca, mas foi marcante. Eu lembro de muitas siglas como JPA, JSP, Servlets e pior
ainda, lembro de ter que ficar mexendo em uns XMLs que nunca entendi porquê ou como funcionavam.

Parei com Java por alguns anos. Mas lembro que, pra mim, era verboso demais e  difícil de entender. Causando baixa
produtividade e propensão a erros.

há alguns anos, voltei a trabalhar em um projeto Java. As coisas pareciam mais simples. Tinha um tal de Spring Boot.
Parecia que tudo funcionava ali no código. 

Não tinha todo aquele boilerplate e nem vários XMLs espalhados. Eu podia focar no que realmente importava, usando o que
realmente queria usar: Java.

https://www.baeldung.com/spring-vs-spring-boot
https://www.reddit.com/r/learnjava/comments/mz70bj/is_java_spring_and_spring_boot_the_same_thing/
https://adtmag.com/articles/2014/04/09/spring-boot-launch.aspx?utm_source=chatgpt.com
https://cscode.io/spring/HelloWorld/

## Estamos sempre a procura das melhores ferramentas

queremos melhores ferramenta, seja qual for o contexto. Seja uma cli, seja um framework, seja uma biblioteca. Seja pra
fazer café. Queremos que seja uma boa experiência.

E prover essa boa experiência é algo de exterma importância para um time de desenvolvimento. Pois o time funciona de
forma mais suave, mais fluida.

- onboarding é mais rápido previsível
- maior produtitividade
- menos bugs e código mais seguro

## O sistema que morreu em pé (Baggio)

- nossa historia começa com uma aplicacao... uma aplicacao bem simples e que funcionava
- até que colocamos um recaptcha nela
- e isso fez com que a aplicaçao parasse de funcionar por dois meses
- acontece que ninguém notou isso.
- claro, faltava obsevabilidade, mas existe uma série de outros problemas que nós levou a essa situação
- a partir disso um time foi criado com um objetivo um pouco amplo, mas em essência tínhamos que melhorar a vida dos devs
- das prioridades que tínhamos, é de esperar, melhorar a observabilidade das aplicações era uma delas e eu fui o encarregado de fazer isso

## Painless Alerts - o repositorio de alertas

- comecei os trabalhos definindo o que seriam os alertas, para onde seriam enviados e que tipo de informaçao deveria conter em um alerta.
- o que precisávamos era de uma aplicaçao onde pudéssemos centralizar os alertas. todo os outros times poderíamos usar essa nossa feramenta para definir seus proprios alertas.
- nos usavamos o ElasticSearch e o Kibana, então a ideia era definir alertas baseado em logs.
    é fácil ver que seria um trabalho muito custoso. entao pensei em olhar como outros times estavam fazendo isso.
- eu já conhecia uma ferramenta chamada Rules & Connectors do ElasticSearch. É uma ferramenta muito útil e que muitos
    times na empresa usavam. Pra quem nao conhece, é uma ferramenta que premite criar regras de alerta baseadas em logs,
    adicionando thresholds e outras condições. Além disso, ela também permite enviar esses alertas para outros sistemas,
    como o Slack, Email e mais alguns lugares.
- O ponto de Rules & Connectors é que os tipos de alerta já sao predefinidos. ISso nao é bem o que queríamos. tinhamos
    uma filosofia específica para os alertas. Queríamos uma espécie de resumo, botoes de acao, links para o Kibana,
    entre outras coisas.
- Bom, encontrei entao um time que fazia alertas do jeito que eu queria. E eles me apresentaram essa ferramenta chamada
    Watchers.

    [diagrama de funcionamento dos watchers]

- Watchers sao definidos como arquivos JSON. Nesse JSON descrevemos o que queremos monitorar, como queremos
    monitorar e o que fazer quando o alerta for acionado. O ponto interessante é que podemos definir ações
    personalizadas para cada alerta. Isso é muito legal, pois podemos criar ações específicas para cada tipo de alerta.
- A flexibilidade dos watchers vem da possiblidade de definir queries para qualquer índice, requisicoes http
    e até mesmo executar scripts. Com esses scripts podemos manipular dados pra checar condicoes, montar payloads (como
    fazíamos para o Slack) e mais.

- esse time que me apresentou os watchers tinha um repositorio com seus alertas. O que é uma ideia muito boa, afinal
    você quer ter o controle de onde estao seus alertas, o que mudou, quem fez a mudança etc.
- Eu pensei em fazer algo semelhante, realmente curti a ideia
- mas aquilo precisava de um refinamento
    - a organizacao era feita por tipo de componente. Uma pasta com watchers e uma com scripts.
    - deployment era feito manualmente por meio da API do ElasticSearch
- sao dois pontos que reduzem a dx pois é dificil de se localizar no repositorio e tem uma fricao por conta do
    deployment manual. estamos falando de alertas, que para muitos devs nao é foco primário. Se colocarmos barreiras, os
    devs nao vao usar.

---

- Parti entao pra fazer nossa implementacao, também usando um repo, mas com algumas diferencas:
    - introduzimos o conceito de alerta. Cada alerta teria sua própria pasta contendo os arquivos JSON e scripts (fácil
        localizacao);
    - o deploymento é feito por uma Action do GitHub que faz o diff e determina quais alertas foram alterados. Assim, só
        fazemos o deploy dos alertas que realmente mudaram. Assim o deployment é rápido e sem intervençao humana. Basta
        focar no alerta e o sistema opera por conta própria;


- Estava bem melhor. Colocamos alguns alertas, mas ainda existiam dores:
    - Painless scripts nao sao tao painless assim. Ele carece de features as quais completamos como: import de outros
        scripts.

- Nao era lá as maravilhas, mas conseguimos ter nossos alertas em muiotas aplicacoes
- outros devs da organizacao estavam conseguindo utilizar, mesmo com alguma barreira
- até que um dia alguém de um time fora da minha BU me procurou. Queria ele ter seus alertas, mas só os seus, seu
    proprio repositório. E aí vimos que nao era uma tarefa tao simples.
- seria necessario um fork e ficar de olho nas atualizacoes para mergear

## Orwell Action: um gerenciador de alertas

- O fork até foi criado, mas nao era algo que manteríamos por muito tempo
- logo decidimos isolar a funcionalidade do nosso repositorio painless-alerts em uma action do github, chamada orwell
- essa action seria responsável por provero que tinha de legal no painless-alerts:
    - diff de alertas para determinar o que deployar
    - deploy dos alertas
    - pre-processamento de scripts possibilidando import de outros scripts

- e assim fizemos
- criamos uma action que poderia ser adicionada a qualquer repositório
- logo logo mais um time quis utilizar os alertas e agora estava bem mais simples de fazê-lo
- Ter action separada permitiu o uso de tags tornando tudo mais estável pra quem usa e mais seguro pra quem desenvolve.

### Continuamos evoluindo (A jornada até o JavaScript)

- Agora com o isolamento da action pudemos focar em outras melhorias e melhor atender a demanda dos devs.
- Ainda tínhamos alguns problemas:
    - muito boilerplate e duplicação de "código" JSON
    - poder ter multiplos scripts para um mesmo alerta
    - poder injetar variáveis de ambiente nos watchers (ex. slack hook path)

- Eu queria também que pudéssemos ter algo como Infra as Code tipo um AWS CDK da vida. E como nosso time é proficiente
    em JavaScript, eu comecei a trabalhar em uma DSL (Domain Specific Language) para definir os alertas.
- Mas qual a melhor linguagem se não o próprio JavaScript? Json é só uma notação de JavaScript. Usando JS seria muito
    mais simples para os devs.
- Escrevendo o watcher usando js podemos:
    - usar variáveis de ambiente
    - importar outros arquivos
    - usar funções e classes
    - usar todo o ecosistema JS como: linter, test, etc

- Mas como fazer isso? A resposta: O módulo VM do Node.js.

### O módulo VM

O modulo VM do Node.js permite compilar e executar código JavaScript. Até aí parece ter naa de interessante, mas o que
acontece é que podemos definir um contexto de execução. O que nos dá controle total sobre o que pode ser executado.

Vamos a alguns exepmlos:

```javascript
// Create a reusable context
const sandbox = { total: 0 };
const context = vm.createContext(sandbox);

// First execution
vm.runInContext('total = 5', sandbox);
console.log(context.total); // 5

// Second execution — context keeps its state
vm.runInContext('total += 10', sandbox);
console.log(context.total); // 15


// Now run one-off isolated code
const isolated = vm.runInNewContext('total + 20', { total: -2 });
console.log(isolated); // 18

console.log({sandbox, context})
```

#### Ressalvas

O código executado pelo modulo vm executa em seu proprio contexto e realm. O que significa que instanceof nao funciona
como voce espertaria

#### Ganhos

com isso pudemos transformar arquivos json em JS possibilitando uam melhor reutilizacao de código, e acesso a variaveis
de ambiente 

outro ponto positivo é que nos mesmos podemos definir o contexto. Podento entao definir funcoes que podem ser utilizadas
pelo devs na criacao de alertas

- script: computa id do script pra colocar no watcher
- includeScript: inclui o conteúdo do script no watche

## Orwell CLI: um gerenciador de alertas

depois disso tudo mais uma demanda surgiu, até por questoes de debugging, entao isolamos o core em uma CLI. A action usa
a CLI. ASsim nao quebra nenhuma compatilibidade e os devs ainda podem usar localmente

## Mais formas de melhrar a DX usando Node.js

- CLI (node:util parseArgs; commander)
- node:repl

---

## Herb Sutter e o almoço grátis

Alguém aqui conhece o herb sutter? bom, ele é bem conhecido na comunidade C++. em 2005 ele escreveu um artigo, muito
bom, chamado "The free lunch is over". nesse artigo ele fala sobre o fim da lei de Moore e como isso impacta
o desenvolvimento de software.

Em essência, ele diz que aquela facilidade de nosso programa ficar duas vezes mais rápido a cada dois anos, devido ao
hardware, acabou; agora precisaremos pensar em como fazer nosso software mais rápido. Isso seria feito com
concorrência/paralelismo.

