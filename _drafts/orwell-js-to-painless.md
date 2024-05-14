Iniciando aqui minha jornada com um projeto que chamei de Orwell - em alusao ao Grnde irmao da historia de 1984.

Bom, meu propósito é poder escrever [Painless Scripts](https://www.elastic.co/guide/en/elasticsearch/painless/current/painless-lang-spec.html) em JavaScript.

Por quê?

1. Painless não é lá tão _painless_ 
    - falta de um bom standard library como ausência de um simples stringify de json
    - falta de import de scripts (mesmo um include já seria útil)
2. Usando JavaScript temos
    - Uma linguagem mais difundida
    - Uma linguagem mais simples
    - Possibilidade de tipagem usando TypeScript
    - Ferramentas de teste do próprio JavaScript
3. Vai ser divertido
    - Vai ser possível aprender mais sobre compiladore/interpretadores


## A ideia

A ideia é ter o arquivo original em JavaScript e ao compilar gerar o arquivo painless. Tal qual Gleam faz com Erlang.
Isso tem de ser feito pois, no fim do dia, Elastic entende Painless e não JavaScript.

Os logs de dia não sao necessariamente em sequencia.

## Dia 1

Comecándo pelo Classico. Inicie a leitura do livro do Dragao (Compilers Principles and Techniques). Tenho em minha poss
também o livro Crafting Interpreters.

Não necessariamente vou ler o livro todo. Pretendo ir seguindo e mesclando as coisas conforme necessário.

Por hora iniciei entendendo o funcionamento de um compilador. Como que o código sai do texto original ali pro codigo
objetivo (target).

O compilador é separado em "frontend" e "backend". O frontend basicamente pega um source code, faz um tonkenizacao,
parsing e gera um formato intermediário, geralmente uma árvore (Abstract Syntax Tree).

O backend pega a AST e gera o código final. No meu caso, vai pegar a AST e gerar o painless.

O livro menciona uma _tabela de simbolos_  que contém, por exemplo, a localicação dos identificadores das variáveis além
de outros metadados.

A tabela de simbilos está presente em todas as fases do compilador.

### Environments e Estado

- Environment: mapeamento de nomes em locais na store (memória). Aka mapeamento de nomes em variáveis. Em C isso
    é chamado de l-values.
- Estado: mapeamento de locais da store em valores. Mapeamenot de l-values para r-values.

    labels -> regioes de memoria -> valor daquela regiao de memoria

### Syntax Directed Translation

Em suma é um adendo à gramática. No exemplo do livro ele mostra como usar STD para converter operacoes infixas (ex:
5+2-1) em operacoes posfixas (ex: 52+1-).

Para tal é usado STD e Translation schemes com uma instrucao de `print` para por os símbolos.
