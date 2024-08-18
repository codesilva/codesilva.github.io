Faz um tempo eu queria implementar uma linguagem de programacao. Só por diversão.
Até comecei a implementar um interpretador simples seguindo o livro do Crafting Interpreters. Depois despendi um tepmpo
lendo o livro do dragão.

Acontece que nunca fui muito além. As vezes precisei mudar o foco.

Depois pensei: se eu fizer uma VM direto já vou aprender bastante coisa sobre computadores, compiladores e linguagens de
programação. Baixei o Livro Smalltalk-80: The Language and its Implementation e comecei a ler. Até parece interessante,
confesso que não terminei.

Sinceramente, não sei nada de Smaltalk e não tenho interesse em aprender. Se tem uma linguagem que quero me aprofundar
é C.

Eu então me deparo com isso: https://buildyourownlisp.com/chapter4_interactive_prompt. Um livro que ensina a criar uma
lisp do zero e em C. É bem o que eu quero.

Gostei mais ainda porque a ideia não é criar a linguagem em si, é aprender C. A linguagem em si é o meio para aprender.

## C tem documentação

https://en.cppreference.com/w/c

## Hot takes

### Coisas dinamicas == Ponteiros

### Free em structs

Se eu tenho uma struct que contém um ponteiro, eu preciso liberar a memória do ponteiro antes de liberar a memória da struct.

```c
typedef struct {
    char *name;
    int age;
} Person;

Person p = {"John", 30};

free(p.name);
```

NOTA: Em geral damos free em memoria alocada por nós como em `malloc`, `calloc` e `realloc`. Algo como `char name[50]`
não precisa de `free`.

### Aparentemente copiar structs precisa de uma cópia interna explícita

Quando implementei a função `lenv_copy` useu `memcpy` para copiar a struct. Tomei segmentation fault. Aparentemente
o que acontece é que `memcpy` não copia ponteiros, ele copia o endereço de memória. Assim, se eu copio um ponteiro de
uma struct para outra, estou copiando o endereço de memória e não o conteúdo. Assim, quando eu libero a memória da
struct original, a struct copiada fica com um ponteiro inválido.

```c
typedef struct {
    char *name;
    int age;
} Person;

Person p1 = {"John", 30};
Person p2;

memcpy(&p2, &p1, sizeof(Person));

printf("Name: %s, Age: %d\n", p2.name, p2.age); // Name: John, Age: 30

free(p1.name);

printf("Name: %s, Age: %d\n", p2.name, p2.age); // Name: (null), Age: 30
```


### Push em array

Para estruturas de lista mais complexas não temos arrays como em linguagens de alto nível, na verdade pensamos em blocos
de memória. Assim se tenho uma struct Person e tenho uma lista chamada people, para adiciona itens a esta lista
dinamicamente preciso chamar `realloc`.

```c
typedef struct {
    char *name;
    int age;
} Person;

Person *people = NULL;
size_t people_len = 0;

void add_person(Person p) {
    people_len++;
    people = realloc(people, people_len * sizeof(Person));
    people[people_len - 1] = p;
}

int main() {
    Person p1 = {"John", 30};
    Person p2 = {"Jane", 25};

    add_person(p1);
    add_person(p2);

    for (size_t i = 0; i < people_len; i++) {
        printf("Name: %s, Age: %d\n", people[i].name, people[i].age);
    }

    free(people);
    return 0;
}
```

