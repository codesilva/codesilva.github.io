# Por que diabos alguém precisa de uma Virtual Machine?

enquanto estudava sobre coisas de mais baixo nível me peguei pensando: por que diabos alguém, criando uma linguagem de
programação, precisa de uma Virtual Machine? Pensemos em uma das mais famosas, a JVM.

Um dos argumentos é portabilidade. Mas veja, portabilidade para nós enquanto desenvolvedores Java. Para quem mantém a VM
isso não existe, afinal, a VM em si é um software (escrita em C++, até onde pude pesquisar) e precisa ser compilada para cada arquitetura.


### Alguns motivos

- VMs tem mais a ver com runtime, há certas coisas que precisam ser feitas em tempo de execução mesmo. Por exemplo,
    Green Threads. A BEAM VM do Erlang é um exemplo disso.

## Referências

- [História dos compiladores](https://en.wikipedia.org/wiki/History_of_compiler_construction#:~:text=The%20first%20implemented%20compiler%20was,modern%20notion%20of%20a%20compiler.)
- [Artigo sobre compiladores](https://www.itu.dk/~sestoft/boehmthesis/boehm.pdf)
- [Go Compilado com GC](https://stackoverflow.com/questions/32186342/how-does-golangs-garbage-collector-work-when-compiled)
- [https://luajit.org/](https://luajit.org/)
- [Terrence Parr - how to build a virtual machine](https://www.youtube.com/watch?v=OjaAToVkoTw)
- [https://v8.dev/docs/turbofan](https://v8.dev/docs/turbofan)
- [https://www.youtube.com/watch?v=M1FBosB5tjM](https://www.youtube.com/watch?v=M1FBosB5tjM)
- [youtube.com/watch?v=sQTOIkOMDIw](https://www.youtube.com/watch?v=sQTOIkOMDIw)

