---
layout: post
title: Investigando o enumerator em Ruby
date: 2023-06-23
lang: pt-BR
category: ["ruby", "enumerator", "design patterns", "from scratch"]
---

Isso aqui é um experimento. Meu objetivo é criar um Enumerator do zero que performe as principais operações do
Enumerator da linguagem Ruby.

Não vai ser igual, aginal a implementação do Enumerator em Ruby é em C. Mas a ideia é entender como ele funciona e como
ele pode ser útil.

## Background

Meu plano não era fazer isso hoje. Eu ia fazer outra coisa, mas fazer algum tipo de código pareceu mais divertido - eu
me recuso a usar o neologismo "codar". Usei, e essa foi a única vez.

Meu amigo Helton me mandou o vídeo de um mano que é do staff do kernel do linux. Fiquei viciado em ver os vídeos do
mano. É como assistir a um superhumano. Isso me motivou a vir pro computador, confesso. Do nada pareceu algo divertido
a fazer.

o canal é [Rene Rebe](https://www.youtube.com/@MoreReneRebe/videos).

## A documentação

O que a documentação do Ruby tem a nos dizer sobre Enumerator é:

> A class which allows both internal and external iteration.

Bem objetivo, eu diria.

Além disso tem dizendo como que inicia um enumerator e aluns exemplos.

```irb
irb(main):001> enumerator = %w(one two three)
=> ["one", "two", "three"]
irb(main):002> enumerator = %w(one two three).each
=> #<Enumerator: ...>
irb(main):003> enumerator.class
=> Enumerator
irb(main):005* enumerator.with_object("foo") do |item, obj|
irb(main):006*   puts "#{obj}: #{item}"
irb(main):007> end
foo: one
foo: two
foo: three
=> "foo"
irb(main):008> enum_with_obj = enumerator.with_object("foo")
=> #<Enumerator: ...>
irb(main):009> enum_with_obj.class
=> Enumerator
irb(main):010* enum_with_obj.each do |item, obj|
irb(main):011*   puts "#{obj}: #{item}"
irb(main):012> end
foo: one
foo: two
foo: three
=> "foo"
irb(main):013> 
```

Há ainda uma informação importante aqui:

> Most methods have two forms: a block form where the contents are evaluated for each item in the enumeration, and a non-block form which returns a new Enumerator wrapping the iteration.

É bem o que podemos ver no exemplo. O método `with_object` itera nos itens quando um bloco é passado e retorna um novo
Enumerator quando não é passado um bloco.

### Iterador externo

Ainda, um enumerator pode ser usado como um iterador externo.

```irb
irb(main):021> e = [1, 2, 3].each
=> #<Enumerator: ...>
irb(main):022> e.next
=> 1
irb(main):023> e.next
=> 2
irb(main):024> e.next
=> 3
irb(main):025> e.next
(irb):25:in `next': iteration reached an end (StopIteration)
        from (irb):25:in `<main>'
        from /Users/edysilva/.asdf/installs/ruby/3.0.0/lib/ruby/gems/3.0.0/gems/irb-1.12.0/exe/irb:9:in `<top (required)>'
        from /Users/edysilva/.asdf/installs/ruby/3.0.0/bin/irb:23:in `load'
        from /Users/edysilva/.asdf/installs/ruby/3.0.0/bin/irb:23:in `<main>'
irb(main):026> 
```

Ainda da pra executar o metodo rewind e recomeçar tudo.

### Vamos pensar um pouco...

A principio nao parece nada muito além de um iterator pattern. Sempre que lembro desse pattern me vem Java a cabeça.
Não so porque Java é mais conhecido no meio dos patterns pois todo mundo ensina design patterns em java, mas porque eu
lembro claramente JDBC e ResultSet.

O ResultSet é um iterator. Você chama o método `next` e ele te retorna o próximo item. Ao fazer uma consulta o que vinha
era um ResultSet e colocando num while loop era possível caminhar pelos registros.

```java
ResultSet rs = stmt.executeQuery("SELECT * FROM table");
while (rs.next()) {
  System.out.println(rs.getString("column"));
}
```

### Criando enumerators

```irb
irb(main):070* fib = Enumerator.new do |y|
irb(main):071*   a = b = 1
irb(main):072*   loop do
irb(main):073*     y << a
irb(main):074*     a, b = b, a + b
irb(main):075*   end
irb(main):076> end
=> #<Enumerator: ...>
irb(main):077> fib.next
=> 1
irb(main):078> fib.next
=> 1
irb(main):079> fib.next
=> 2
irb(main):080> fib.take(3)
=> [1, 1, 2]
```

Aqui criamos um enumerador infinito. Ele é um enumerador que retorna a sequência de Fibonacci. A cada iteração ele faz
um "yield" do valor atual e atualiza os valores de `a` e `b`.

Importante perceber que esse "yield" é feito com o operador `<<` da classe Enumerator::Yielder. 

Nota pra mim: É algo semelhante ao que você faria com o a palavra reservada yield no javascript.

To pensando em como fazer esse negócio.

Achei esse [link](https://blog.appsignal.com/2018/09/04/ruby-magic-closures-in-ruby-blocks-procs-and-lambdas.html) que
mostra um each com loop infinito. É bem o que to pensando. Na verdade nao tem nada de infinito. MAs deu algumas ideias.

Em essência. Penso que algo assim pode funcionar

```rb
def test_infinite_loop_with_yield
    a = b = 1
    loop do
        yield a
        a, b = b, a + b
    end
end
```

O loop é infinito, mas ele muda o contexto, é como se parasse para a execução do bloco. Na verdade, é isso que faz
mesmo. Executa o bloco.

Isso me diz que nesse `yielder << value` algum **yield** tem de ser feito. Algum bloco tem de ser chamado.

1. Foi fácil perceber que o bloco passado para o Enumerator não é executado assim que o objeto é criado. Ele fica guardado.
    - esse bloco é chamado quando um metodo como each é chamado
2. Outra coisa, quando chamamos `yielder << value` de fato precisamos devolver o controle para um bloco passado no
   método each.

```rb
class Iterator
  def initialize(&block)
    @block = block
  end

  def each(&each_block)
    return self unless block_given?

    yielder = Yielder.new(&each_block)

    @block.call(yielder)
  end
end
```

Nossa classe Iterator recebe um bloco e o poe em uma variável de instância.

Quando método each é chamado e um bloco é passado, criamos um Yielder e passamos o bloco do each para ele.


```rb
class Iterator::Yielder
  def initialize(&yielder_block)
    @yielder_block = yielder_block
  end

  def yield(item)
    @yielder_block.call(item)
  end

  alias << yield
end
```

O Yielder recebe um bloco e o poe em uma variável de instância. Quando o método `<<` é chamado ele chama esse bloco, que
no exemplo do `each` vai ser o bloco passado para o each.

Minha meta é fazer o fibonacci também. Mas antes preciso implementar um método take para não ficar para sempre printando
números.

Para isso preciso de um jeito de quebrar o loop. Me ocorrou só agora que a palavra reservada `break` é usada para sair
de um bloco, não necessariamente um loop.

O bom de começar pelo método each é que ele é building block para os outros. Para implementar o `take` eu só preciso
usar o each para percorrer os itens e ir guardando em um array.

### Iterador externo: O inimigo agora é outro

Estava pensando em como poderia fazer isso. Essa nota, na documentação, me salvou.

> Note that enumeration sequence by next does not affect other non-external enumeration methods, unless the underlying iteration methods itself has side-effect,

O iterator externo não surte efeito no iterator interno o que me dá a ideia de um yielder separado pra isso. 

Confesso que não sei como detectar o fim ainda. Vou experimentar pra ver o que rola.

Tá difícil. nem copilot tá ajudando muito. Mas pensei em fazer um lazy evaluation. Assim, quando o método next for
chamado vou executando a proc e pegando o retultado.

Foi complicado. Minha implementação até funcionou para sequências finitas com closures. Mas para sequências infinitas
ficava travado.

Depois de quebrar muito a cabeça procurei pensar como fazer a troca de contexto. Em ruby isso funciona com Fibers.
Fiber.yield parece o yield do javascript.

https://stackoverflow.com/questions/9052621/why-do-we-need-fibers#:~:text=Probably%20the%20%231%20use%20of,it%20will%20return%20an%20Enumerator%20.
https://github.com/ruby/ruby/blob/master/enumerator.c#L785
https://github.com/ruby/ruby/blob/master/enumerator.c#L863

Aparentemente a cada next é chamado um Fiber.yield. Isso faz sentido. O Enumerator é um objeto que guarda um bloco
e a cada next ele chama o bloco.

