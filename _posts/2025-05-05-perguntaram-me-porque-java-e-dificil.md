---
layout: post
title: Perguntaram-me porquê Java é difícil
date: 2025-05-05
lang: pt-BR
category: ["carreira"]
tags: ["java", "programação"]
excerpt: "\"As pessoas sao preguiçosas, por isso preferem Python ou Node (JavaScript) ao invés de Java\". Eu já ouvi isso em alguns lugares. Acho que as vezes pouco de empatia..."
---

Tech influencers de Java sempre defendem sua linguagem. Normal, todo tech influencer de uma ferramenta defende sua ferramenta. É comum entre todos eles que o que as pessoas falam sobre Java, na maioria das vezes, é incorrento.

Por exemplo, pessoas falam que Java é lento. Bom, nesse ponto, mesmo que _"lento"_ seja algo muito subjetivo, se compararmos Java com outras linguagens de alto nível, Java é uma das mais rápidas.

Agora, uma das coisas que rebatem é acerca da dificuldade da linguagem. De fato, é bem comum ouvir por aí que Java é difícil. Mas por que será?

## Tópicos

- [Um exercício de empatia](#um-exercício-de-empatia)
- [Mas por que acham Java difícil?](#mas-por-que-acham-java-difícil)

## Um exercício de empatia

> As pessoas sao preguiçosas, por isso preferem Python ou Node (JavaScript) ao invés de Java

Eu já ouvi isso em alguns lugares. Bom, acho que as vezes falta para tech influencers, geralmente devs com anos de experiência, um pouco de empatia. Essa falta de empatia não é por maldade, no entanto. É que eles têm o **_cérebro de expert_**.

O cérebro de expert é algo que você atesta empiricamente, seja observando a si mesmo ou outras pessoas. É quando um assunto é tão familiar que, na perspectiva do expert, é algo trivial, simples.

Acho que como comunicadores, queremos ser o mais próximo do espectador possível. Por mais que seja difícil, é importante tentar se colocar na perspectiva do outro. Lembrar de quando começamos do completo zero.

Falo isso pois calculo que a maioria das pessoas que se referem a Java como uma linguagem de progamação difícil, são pessoas iniciantes. Pois, pessoas mais experientes já entenderam que sintaxe é só sintaxe e não entram nesse tipo de discussão.

## Mas por que acham Java difícil?

Quando estamos aprendendo, pelo menos assim foi pra mim, nós memorizamos a sintaxe. Essa é das primeiras barreiras a superar. Agora pense como um iniciante. Fazendo um programa que recebe entrada de dois números, calcula a soma e printa o resultado. O que é mais fácil de memorizar?

```java
public class HelloWorld {
    // Sei que em alguma versão do Java podemos encurtar esssa assinatura... mas sério, não melhora tanto e quem usa versão mais acima do Java 8 afinal? ¯\_(ツ)_/¯
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        System.out.print("Digite o primeiro número: ");
        int num1 = scanner.nextInt();
        System.out.print("Digite o segundo número: ");
        int num2 = scanner.nextInt();
        int soma = num1 + num2;
        System.out.println("A soma é: " + soma);
    }
}
```

ou

```python
num1 = int(input("Digite o primeiro número: "))
num2 = int(input("Digite o segundo número: "))
soma = num1 + num2
print("A soma é:", soma)
```

Acima, comparamos Java com Python. E, de fato, Java é mais complexo. É mais difícil de memorizar. Isso se eleva quando você adiciona conceitos de orientação a objetos e mais keywords como `implements`, `extends`, `abstract`, `interface`, etc.

Naturalmente só podemos achar algo difícil se comparamos. Se alguém aprende a programar em Java diretamente, não vai achar Java difícil. Mas, se alguém aprende a programar em Python e depois tenta aprender Java, vai achar Java difícil. O mesmo acontece na troca de paradigmas.

Eu, particularmente, gosto da sintaxe do Erlang. Embora das vezes que mostrei algum código em Erlang para meus colegas e amigos ele me perguntaram se eu havia batido com a cara no teclado.

A verdade é que leva um tempo pra se adaptar, tech influencers. Tenham paciência.
