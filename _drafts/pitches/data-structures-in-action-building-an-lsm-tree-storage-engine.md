# Estruturas de dados em ação: vamos criar um banco de dados

O aprendizado em sala de aula pode ser pouco prático. Aprender sobre estruturas de dados é uma dessas
coisas que você precisa ver funcionando para entender. Nesssa oficina, vamos construir um banco de dados do zero,
passando por todas as etapas de um banco de dados real, desde a estrutura de dados até a implementação de um mecanismo
de armazenamento em disco.

Claro, não teremos como resultado um banco de dados pronto para produção, mas você terá uma compreensão muito mais
profunda de como um banco de dados funciona e como você pode construir um. Assim, aprendendo como as estruturas de dados
que aprendeu em sala de aula são usadas na prática.

## Takeaways

- Noções de bancos de dados: índices, armazenamento em disco
- Importância da prática deliberada
- Estruturas de dados fundamentais: Arrays, Hash Tables, Árvores Balanceadas, Heaps
- Notações Big-O e como elas se aplicam na prática
- Lidando com armazenamento em disco

## Estrutura da Oficina

### 1. Introdução

- O que é um banco de dados?
- Estruturas de dados fundamentais
    - Arrays
    - Hash Tables
    - Árvores Balanceadas
    - Heaps
- Notações Big-O

### 2. O banco de dados mais simples do mundo

- Salvando key/value pairs de forma imuável
- Buscando dados

### 3. Armazenamento em disco e efiência

- Nosso banco de dados é muito lento
    - O arquivo é lido por completo a cada busca
- Índices
    - Como criar um índice
    - Como usar um índice

### 4. O que são LSM Trees?

- O que são LSM Trees?
- Componentes de uma LSM Tree
- Exemplos de bancos de dados que usam LSM Trees: ScyllaDB, RocksDB

### 5. Implementando um LSM Tree

- Memtable
- SSTable (Sorted String Table) - também conhecido como Segmento
- Merge de SSTables

### 6. Conclusão

- O que aprendemos
- Próximos passos

## Referências

- Workshopd de Estruturas de Dados e Algoritmos que ministrei na Codeminer42: https://www.youtube.com/watch?v=vnSOoboNNQU&list=PLUMphNAA9pmrgS3ngMRfvS1MnDzjyRVeT
