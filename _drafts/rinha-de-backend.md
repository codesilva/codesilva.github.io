---
layout: post
title: Como ganhei 100k USD na Rinha de backend
date: 2023-06-19
lang: pt-BR
tags: ["elixir", "erlang", "nifs"]
category: ["paralelismo", "concorrencia"]
---

no dia 10 de marco se encerrou a segunda edicao "rinha de backend", um hackathon muito divertido. Eu pude participar
dessa edição e trago aqui minhas percepções e insights que obtive ao longo do caminho.

nesse posto discutiremos alguns aspectos tecnicos e sobre decisoes tecnicas, além de algumas observacoes sobre
o comportamento da turma que participou

## Desafio da rinha

A rinha é um hackathon como qualquer outro. Um desafio é proposto, voce da sua implementacao e competira com outros
desenvolvedores.

Dessa vez o desafio envolvia muito mais um controle de concorrencia. A ideia era implementar uma aplicacao web que
lidaria com operacoes bancarias. sua api subiria em duas instancias e estaria atras de um load balancer.

Cada cliente desse banco tinha um um limite, mínimo. Assim, operacoes de debito só poderiam ser performadas dentro do
limite.

Além disso, os recursos seriam limitados. Tudo deveria executar com 1.5 de cpu e no maximo 550MB de
memoria. Isso inclui as duas intancias, load balancer, banco de dados e o que mais voce precisasse.

Sua api deveria export endpoints para credito, debito e extrato.

O que temos aqui é claramente um problema de concorrencia, onde duas chamadas na mesma conta uma de debito e uma de
credito pudessem ser antendidas.

Os critérios para vencer a rinha, ficam pro final.

## Ecossistema Erlang

o que sinto da rinha é que o convite é à experimentacao, entao é uma grande oportunidade para tentar coisas que um dia
voce quis e nao conseguiu.

Eu, mesmo tenho estudado e erlang/elixir por um tempo. Inclusive, tenho me dedicado a contribuir para projetos
open-source nesse ecossitema como Swoosh e cowboy.

Eu não queria usar um mega framework, como um Phoenix da vida, para fazer algo tao simples e que seria só para uma
competicao. Pretendia fazer coisas mais manuais, pra sentir, ver, cas coisas acontecendo. Que nem um oleiro vendo o vaso
tomar forma.

Minha escolha foi toda baseada no ecossistema Erlang. Usei:

- cowboy como servidor web;
- Mnesia como banco de dados.

Além de NGINX como load balancer.

A priori, quis fazer algo simples. Endpoins, usar transacoes no banco de dados e é isso, e seguindo a cartilha de
implementação basica que é:

- fazer funcionar;
- fazer com que seja certo;
- fazer com que seja rápido.

Além da cartilha do Joe Armstrong (Programming Erlang 14.2) sobre desenvolvimento de aplicações distribuídas que é:

- fazer o programa de forma regular, rodando em um único nó;
- executar em dois nós diferentes, mas na mesma máquna;
- executar em duas máquinas diferentes.

Meu objetivo era ter uma estrutura com um cluster Erlang de dois nós, cada nó teria um server rodando, apto a receber
requests.

A requests recebidas pelo endpoint seiam direcionadas ao Mnesia em uma transação. Como o mnesia é distribuído, fazer as
oeprações em uma transacao já garantiria a parte do debito.

## Pensando um pouco sobre o problema

veja que, a despeito das validacoes em id de cliens, tipo de transacao, nosso real problema aqui era só evitar um saldo
menor que seu limite. isso nos diz entao que transacoes de creditos podem ser aceitas indefinidamente, o que temos de
checar é na transacao de credito, checar se nao há um limite menor.

server -> mnesia transaction

### Modelagem do banco de dados

baseado nas restricoes do problema, eu pude perceber que eventualmente, aplicar uma consistencia eventual poderia
funcionar.

Assim, uma abordagem que me pareceu válida um tipo de event sourcing. Onde toda a todas as transacoes eram salvas
a medida que chegavam. Além disso havia uma tabela de agregações que continha o saldo atual e a lista das ultimas 10
transacoes.

request -> |validations| -> save credit/debit to log -> update the aggregation

Essa solução funcionou bem, e no teste provido pela organização, para validarmos nossa solucao, ele passou em todas as
validacoes, mas nao me agradou muito o tempo de execucao das coisas.

Minha implementação perdia pra stacks que, pra mim deveriam ser mais lentas. Minha implementação perdia até pra NodeJS
(nao posso acreditar nisso!).

## Multitenancy

Como otimizacao da primeira implementacao, eu optei por fazer um multi tenancy. A ideia seria a mesma, de ter um log,
mas este seria por client.

Nesse contexto, temos uma tabela de logs pra cada client, assim diminuindo a concorrencia em transacoes de multiplos
clientes.

Pra ajudar um pouco mais, a aplicacao estava tambme subindo um processo (um genserver) para cada cliente. Assim, toda
request que vinha, era direcionado para um processo especifico, que era daquele cliente.

Ainda, acabei com a tabela de agregacao, e deixei o estado no proprio gen server pra reduzir um pouco o overhead.

[mostrar novo diagrama]

## Docker no Mac

O tempo de uma melhorada, mas ainda perdia para algumas stacks que eu nao esperava. O teste era simples e uma implementacao simples de Elixir deveria ser o suficiente.

Fiquei tentanto umas coisas pra melhorar o tempo, mas nada resolvia. Eu não conseguia baixar o p99 de ~90ms. Eu já tinha
conhecimento de que o Docker performava pior no Mac - isso tem um motivo.

Fiquei surpreso, no entanto, ao ver o quanto isso estava impactanos a minha aplicação. Eu peguei o mesmo código e rodei
no Linux, Manjaro, e o tempo do p99 geral caiu de ~90ms para 4ms.

### Profiling e código C (blazingly fast)

Sinceramente, com o p99 geral de 4ms eu já estava bem satisfeito. Ele chegava ali perto de implementações com Rust e Go
que eu tinha visto.

No entanto, algo ainda me incomodava. O tempo de execução nas validações estava aquém de outros exemplos que havia
visto. Meu p99 de validacoes estava em torno de 107 ms, com tempo maximo chegando a 110ms.

Lembrando, que isso não estava sendo um tempo horrível, mas eu queria esperimentar então decidi escovar os bits.
Aproventando também a oportunidade pra aprender um pouco mais sobre profiling em Erlang/Elixir.

Descobri que Erlang tem uma vasta quantidade de ferramentas para profiling. No entanto, os exemplos não muito bons.
Essas ferramentas estão integrafas com Elixir através do Mix, mas também não há exemplos de como integrar isso a um projeto. Os exemplos que há são sobre fazer profiling em um código passado para a ferramenta ao invés de um projeto em execução.

Eu fiz um simples profiling usando eprof, que pela doc temos

> eprof provides time information of each function used in the program. No call graph is produced, but eprof has considerably less impact on the program it profiles.

eu queria ver quais das funções em meu código que estavam mais lentas no quesito validação das transacoes. Notei que uma
parte considerável do tempo estava sendo gasta com parsing de JSON. Daí eu pensei: como posso melhorar isso?

Eu já estava usando a lib mais popular de JSON no ecossistema elixir - lib essa que é incluida no Phoenix. Por um
momento até pensei em implementar/pegar um parser escrito em C e portar para Erlang, fazenod um NIF. Mas por sorte
encontrei o jiffy, que já é um NIF (blazingly fast).

Substituí então a lib `jason` pelo `jiffy`. Até que melhorou, levando o p99 das validacoes de 108ms para 83ms, com tempo
máximo de 85ms. Redução em torno de 23% no tempo. Foi uma melhora razoável eu diria.

Creio que poderia melhorar mais. Mas já não havia mais tempo e a submissão precisava ser feita. Assim enviei minha
implementação com um pouco de Erlang no meu Elixir (através das chamadas do :mnesia) e um pouco de C no meu Erlang.

# Parte 2

## A síndrome do segundo sistema e lei de goodhart

https://en.wikipedia.org/wiki/Goodhart's_law

## Pavonismo

## Resultados


```
# Especificações do Ambiente de Testes

Abaixo estão os detalhes do servidor (gentilmente concedido pelo Giovanni Bassi) que rodará os testes. 


Docker
``` 
$ docker --version
Docker version 25.0.3, build 4debf41
```

Gatling
``` 
# gatling versão 3.10.3
$ java --version
openjdk 21.0.1 2023-10-17
OpenJDK Runtime Environment (build 21.0.1+12-Ubuntu-222.04)
OpenJDK 64-Bit Server VM (build 21.0.1+12-Ubuntu-222.04, mixed mode, sharing)
```

CPU
``` 
$ lscpu                          
Architecture:            x86_64
  CPU op-mode(s):        32-bit, 64-bit
  Address sizes:         46 bits physical, 57 bits virtual
  Byte Order:            Little Endian
CPU(s):                  4
  On-line CPU(s) list:   0-3
Vendor ID:               GenuineIntel
  Model name:            Intel(R) Xeon(R) Platinum 8370C CPU @ 2.80GHz
    CPU family:          6
    Model:               106
    Thread(s) per core:  2
    Core(s) per socket:  2
    Socket(s):           1
    Stepping:            6
    CPU max MHz:         2800.0000
    CPU min MHz:         800.0000
    BogoMIPS:            5586.87
    Flags:               fpu vme de pse tsc msr pae mce cx8 apic sep mtrr pge mca cmov pat pse36 clflush mmx fxsr sse sse2 ss ht syscall nx pdpe1gb rdtscp lm constant_tsc rep_good nopl xtopology tsc_reliable nonstop_tsc cpuid aperfmperf pni pclmulqdq vmx ssse3 fma cx16 pcid sse4_1 sse4_2 x2apic movbe popcnt tsc_deadline_timer aes xsave avx f16c rdrand hyp
                         ervisor lahf_lm abm 3dnowprefetch invpcid_single tpr_shadow vnmi ept vpid ept_ad fsgsbase tsc_adjust bmi1 hle avx2 smep bmi2 erms invpcid rtm avx512f avx512dq rdseed adx smap avx512ifma clflushopt clwb avx512cd sha_ni avx512bw avx512vl xsaveopt xsavec xgetbv1 xsaves avx512vbmi umip avx512_vbmi2 gfni vaes vpclmulqdq avx512_vnni avx
                         512_bitalg avx512_vpopcntdq la57 rdpid fsrm arch_capabilities
Virtualization features: 
  Virtualization:        VT-x
  Hypervisor vendor:     Microsoft
  Virtualization type:   full
Caches (sum of all):     
  L1d:                   96 KiB (2 instances)
  L1i:                   64 KiB (2 instances)
  L2:                    2.5 MiB (2 instances)
  L3:                    48 MiB (1 instance)
NUMA:                    
  NUMA node(s):          1
  NUMA node0 CPU(s):     0-3
Vulnerabilities:         
  Gather data sampling:  Unknown: Dependent on hypervisor status
  Itlb multihit:         Not affected
  L1tf:                  Not affected
  Mds:                   Not affected
  Meltdown:              Not affected
  Mmio stale data:       Vulnerable: Clear CPU buffers attempted, no microcode; SMT Host state unknown
  Retbleed:              Vulnerable
  Spec rstack overflow:  Not affected
  Spec store bypass:     Vulnerable
  Spectre v1:            Mitigation; usercopy/swapgs barriers and __user pointer sanitization
  Spectre v2:            Mitigation; Retpolines, STIBP disabled, RSB filling, PBRSB-eIBRS Not affected
  Srbds:                 Not affected
  Tsx async abort:       Not affected
```

Memória
```
$ free -h
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.0Gi       9.4Gi       3.0Mi       5.2Gi        14Gi
Swap:             0B          0B          0B
```

SO (Ubuntu 23.04)
```
$ uname -a
Linux rinha 6.2.0-1019-azure #19~22.04.1-Ubuntu SMP Wed Jan 10 22:57:03 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux
```
```

## Conclusão


### Referencias

- https://www.erlang.org/doc/efficiency_guide/profiling#do-not-guess-about-performance---profile
- https://hexdocs.pm/mix/1.12/Mix.Tasks.Profile.Eprof.html
