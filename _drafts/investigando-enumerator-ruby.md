---
layout: post
title: Entendendo Enumerator em Ruby
date: 2023-06-23
lang: pt-BR
category: ["ruby", "enumerator", "design patterns", "from scratch"]
---

A regra do 80-20 é empiricamente obersavada em muitas fenômenos e atvidiades humanas. Em programação não é diferente.
Compreendendo uma parcela das features do ReactJS você já é capaz de produzir aplicações web funcionais. Entendendo 20%
dos comandos git você consegue trabalhar diariamente sem enfrentar grandes problemas.

Falando de código, no geral, esses 20% são uma abstração que utilizamos. Eles nos permitem resolver a maioria dos
problemas por que eles são os mais triviais - por isso já existe uma abstração que lida com isso.

As coisas são simples, até que deixam se ser e você se vê precisando implementar [iframes com altura dinâmica](https://blog.codeminer42.com/enhancing-user-experience-with-dynamic-iframe-height/). Só com ReactJS por si só você não consegue resolver esse problema.

É nesse ponto que você precisa adentrar nos 80% do conhecimento ainda não desbravado, mas que vai te ajudar a resolver
um problema em específico que, provavelmenete, vai impactar bastante sua aplicação, seu negócio.

Isso acontece com muitas ferramentas, incluindo linguagens de programação e suas features. Esse post inicia uma série
sobre Enumerators em Ruby. Você provavelmente já usou Enumerators através de alguns métodos comuns como `each`, `map`,
`select` - calma, eu sei que o dois últimos são tecnicamente do mixin Enumerable.

Uma vez que não estamos lidando com o trivial aqui, espero que você já saiba um pouco desses métodos que mencionei. Na
verdade, esse post tem como objetivo te mostrar como e quando usar `Custom Enumerators`.

## O pattern Iterator

A documentação da classe Enumerator do Ruby diz o seguinte:

> A class which allows both internal and external iteration.

Isso remete a um conhecido pattern que existe implementado em algumas lingagens como Java, Python e C#. É composto por um
Iterator e um Iterable. O Iterable é a collection que vai ser iterada. O Iterator é o objeto que sabe como iterar
naquela collection.

É um pattern útil para encapsulamento e para manter a uniformidade sobre como coleções são iteradas. Em algumas
linguagens, como JavaScript, aderir ao protocolo de iteradores permite, por exemplo, usar o `for...of` em qualquer
objeto.

Eis um exemplo de um iterador que itera sobre uma string.

```rb
class StringIterator
    def initialize(text)
        @iterable = text
        @index = 0
    end

    def next
        raise StopIteration if @index >= @iterable.length

        value = @iterable[@index]
        @index += 1

        value
    end
end

# usando
str_it = StringIterator.new("Hello")
puts str_it.next # H
puts str_it.next # e
puts str_it.next # l
puts str_it.next # l
puts str_it.next # o
puts str_it.next # raises StopIteration
```

É um iterador simples que pode ser feito facilmente com o uso da classe Enumerator. O código acima é apenas para termos
a ideia de como um **iterador externo** funciona.

O código acima pode ser reescrito de forma mais simples usando Enumerator.

```rb
str_it = "Hello".each_char
```

## Enumerators são sobre coleções?

Um pensamento que você pode ter a princípio é que Enumerators são coleções. No sentido de que ele só lida com listas
finitas como arrays.

O Enumerator, no entanto, faz mais que isso. Por isso gostaria de estabelecer aqui o Enumerator como um Gerador de
Sequências. Por algum motivo essa denotação de _iterar/iterador_ me dá a ideia de algo finito. Mas um Enumerator pode gerar sequências infinitas.

## Gerando sequências

**NOTA**: Mencionar aqui, que mesmo com poucos detalhes, o exemplo dado para uso de blocos na doc do ruby é justamente geração de
sequências (potencialment) infinitas.

Até aqui fizemos exemplos só com Arrays. Isso é proposital, pois arrays são mais simples de se entender nesse contexto.
Afinal, arrays são literalmente coleções de itens sobre as quais podemos iterar.

Quero que pense em enumerators como um gerador de sequencias para coisas como: sequencia dos números naturais. Isso
é bem fácil de fazer. Podemos usar o tipo Range para isso

```rb
natural_seq = (1..Float::INFINITY).to_enum

puts natural_seq.next # => 1
puts natural_seq.next # => 2
puts natural_seq.next # => 3
```

Temos uma sequência infinita! E meu computador nem travou.

Você deve estar pensando: mas pra Range é muito simples. Não há uma coleção infinita salva pois não precisa. Para
representar um range só preciso salvar as delimitações.

Isso não poderia estar mais certo. É por isso que mencionei que temos uma **sequência** infinita. Quero te dar essa
ideia de geração de sequência. Sob demanda mesmo.

Essa foi bem simples. Vamos complicar mais um pouco gerando uma sequência infinita menos previsível, uma que eu não possa
simplesmente usar um Range.

### Uma sequência de Fibonacci

Você sabe, a sequência de fibonacci é dada pela soma de números naturais. O terceiro número em diante são deinidos como
a soma dos dois anteriores. A sequência fica: 0 1 1 2 3 5 8...

Isso não é uma sequência que pode ser definida com um simples Range. Para representá-la podemos usar a classe Enumerator direto

```rb
fib = Enumerator.new do |yielder|
    a = 0
    b = 1

    loop do
        yielder << a

        a, b = b, a + b
    end
end
```

Temos nossa sequência em que cada step é definido por essa soma e transformamos isso num enumerator. Sim, é isso que
acontece com o objeto quando você chama um `to_enum`.

Um range seria algo como

```rb
range_enum = Enumerator.new do |yielder|
    step = 1
    range_end = Float::INFINITY
    current = 1 # current is where it starts

    loop do
        yielder << current

        current += step

        break if current > range_end
    end
end

# isso é equivalente a 
# range_enum = (1..Float::INFINITY).to_enum
```

Como vimos, essa forma de definir enumerators, passando um bloco, é bem mais flexível uma vez que podemos definir como
os elementos serão gerados.

Digamos, por exemplo, que queremos gerar números de fibonacci desde que sejam ímpares, bastaria modificar a parte que
faz yield do item.

```rb
odd_fib = Enumerator.new do |yielder|
    a = 0
    b = 1

    loop do
        yielder << a if a.odd?

        a, b = b, a + b
    end
end
```

## Casos de uso para custom Enumerators

Um case é esse de geração de sequências infinitas. Inclusivem, é um dos poucos exemplos de custom enumerators que há
na documentação.

Gerar sequência de Fibonacci, no entanto, não é algo muito prático. Mas pensemos num caso geral, como um parser de logs.

Em Kubernetes, Container Runtime Interface (CRI) é um componente que faz o meio campo entre o kubelet e o container
runtime. CRI é esse protocolo que define como o kubelet deve interagir com o container runtime.

O que isso tem a ver com enumerators? A princípio nada. A não ser pelo fato de que logs do CRI seguem um formato em
específico. Eles são prefixados com um timestamp, um indicador de qual stream de log é e um identificador se o log
é `full` (F) ou `partial` (P). Por exemplo:

```
2023-10-06T00:17:09.669794202Z stdout F Uma mensagem de log aqui
2023-10-06T00:17:09.669794202Z stdout P Me machucando provocou a minha ira
2023-10-06T00:17:09.669794202Z stdout P Só que eu nasci entre o velame e a macambira
2023-10-06T00:17:09.669794202Z stdout F Quem é você pra derramar meu mungunzá?
```

NOTA: Para efeito de simplicidade lidaremos apenas com logs stdout.

Como poderíamos ter um parser de logs assim de modo que ele nos desse um Enumerator que nos permitisse iterar sobre os
logs agregados, ou seja, logs parciais devem ser agrupados até que um log full seja encontrado?

Abaixo a implementação de um simples parser de logs CRI que retorna um Enumerator que nos permite iterar sobre os logs
de forma agregada.

```rb
logs = [
    '2023-10-06T00:17:09.669794202Z stdout F Your log message here',
    '2023-10-06T00:17:09.669794202Z stdout P Winx quando damos nosssas mãos ',
    '2023-10-06T00:17:09.669794202Z stdout P Nos tornamos poderosas. ',
    '2023-10-06T00:17:09.669794202Z stdout F Porque juntas somos invencíveis.'
]

class CRIParserEnumerator
    def initialize(logs)
        @logs = logs
    end

    def to_enum
        Enumerator.new do |yielder|
            current_log = ''

            for log in @logs
                parsed = log.split(/stdout (F|P) /).last
                current_log += parsed

                if log.match?(/stdout F/)
                    yielder << current_log
                    current_log = ''
                end
            end
        end
    end
end

parser_enum = CRIParserEnumerator.new(logs).to_enum
parser_enum.each_with_index do |log, index|
    puts "======= Log #{index + 1} =======\n\n#{log}\n"
end
```

O output desse código seria algo como:

```
======= Log 1 =======

Your log message here
======= Log 2 =======

Winx quando damos nosssas mãos Nos tornamos poderosas. Porque juntas somos invencíveis.
```

Interessante, não? Como falei no início do post, um pre-requisito para entender esse post é ter um conhecimento sobre
Enumerables e Enumerators.

Assim, você já notou que a definição desse Enumerator com um bloco é overengineering. Isso pode ser feito de forma bem
mais simples com o mixing `Enumerable` e um método `each`.

### Iteradores internos

Já no exemplo antetior deixamos de usar o metodo next. Depois de chamar criar um Enumerator com `to_enum` iteramos sobre
os logs usando o método `each_with_index`.

Com a implementação abaixo temos o uso de iteradores internos, que são feitos em cima do método `each`. Isso torna
o código mais declarativo, simples de entender e é o que é mais comum de se ver em implementações em Ruby.

```rb
class CRIParserEnumerator
    include Enumerable

    def initialize(logs)
        @logs = logs
    end

    def each
        current_log = ''

        @logs.each do |log|
            parsed = log.split(/stdout (F|P) /).last
            current_log += parsed

            if log.match?(/stdout F/)
                yield current_log
                current_log = ''
            end
        end
    end
end

parser_enum = CRIParserEnumerator.new(logs)
parser_enum.each_with_index do |log, index|
    puts "======= Log #{index + 1} =======\n\n#{log}\n"
end
```

Perceba:

- não precisamos mais chamar um Enumerator.new dentro da nossa classe;
- O `to_enum` não é mais necessário - embora ele exista devido ao método de objetos (Kernel::to_enum).

Perceba também que, para esse parser, pudemos, de forma simples, definir o each. Estamos enumerando em um array, que
é finito.

Mas e se não houvesse lista prévia? Digamos que nosso programa precisa pegar esses logs através de polling. Não tem como
definir um each simples assim pois não temos uma lista prévia. Definir um bloco no Enumerator é o que vai é o que vai permitir adicionar essa lógica extra para fazer essa espécie de `buffering`.

## Exemplo completo

Para esse exemplo usaremos objetos da classe `LogBucket`. É uma classe que criei para simular um serviço que traz logs
sob demanda. Uma chamada ao método `fetch` traz logs de forma assíncrona. Em cada chamada zero o mais logs podem ser retornados.

A implementação desse serviço pode ser encontrada [nesse gist](https://gist.github.com/geeksilva97/95266a1382cf68aaf5407138aceff154).


As chamadas a esse serviço vão trazer resultatos como o que é mostrado abaixo.

```
2024-08-14T02:38:46.282585000ZZ stdout P Sei que você vai querer ser
2024-08-14T02:38:46.282681000ZZ stdout P uma de nós
```

```
2024-08-14T02:38:46.282698000ZZ stdout P Winx quando damos nossas mãos
2024-08-14T02:38:46.282710000ZZ stdout P Nos tornamos poderosas
```

```
2024-08-14T02:38:46.282723000ZZ stdout F Porque juntas somos invencíveis
```

Lembre-se que nosso parser precisa agregar os logs. No exemplo anterior teria que acumular as três chamadas pra montar
uma mensagem que pode ser exibida.

Esse polling é algo que não dá pra saber previamente, precisa ser feito sob demanda. E é aí que o Enumerator com bloco
é necessário.

```rb
class CRIParserEnumerator
    include Enumerable

    def each
        e = Enumerator.new do |yielder|
            current_log = ''

            loop do
                logs = bucket_service.fetch

                logs.each do |log|
                    parsed = log.split(/stdout (F|P) /).last
                    current_log += parsed

                    if log.match?(/stdout F/)
                        yielder << current_log
                        current_log = ''
                    end
                end
            end
        end

        return e unless block_given?

        e.each { |log| yield log }
    end

    private

    def bucket_service
        @bucket_service ||= LogBucket.new
    end
end

parser = CRIParserEnumerator.new
parser.take(10).each_with_index do |log, index|
    puts "\n" if index > 0
    puts "======= Log #{index + 1} =======\n\n#{log}\n"

    sleep 1
end
```

Agora sim. O bloco foi realmente necessário pois temos um loop infinito que faz polling de logs. A cada fetch, logs são
agregados e yieldados.

Parece que não, mas aqui temos até um pouco de concorrência, uma vez que o bloco do Enumerator é executado em uma Fiber.
Por isso é possível ter um loop infinito sem travar o programa.

O uso de iteradores internos é interessante pois as interfaces que usam o método não precisam ser alteradas. Nesse [caso
de uso](https://thoughtbot.com/blog/how-we-used-a-custom-enumerator-to-fix-a-production-problem) usaram um custom Enumerator para aumentar a resiliência da aplicação.

## Conclusão

Nesse post entendemos um caso de uso particular de Enumerators que é quando uma lógica mais complexa é necessária para
a geração de sequências.

Durante o post mencionamos o uso de Fibers por parte do Enumerator. No próximo post dessa série vamos explorar
o funcionamento interno do Enumerator implementando o nosso próprio Enumerator do zero.

## Referências

- [https://thoughtbot.com/blog/how-we-used-a-custom-enumerator-to-fix-a-production-problem](https://thoughtbot.com/blog/how-we-used-a-custom-enumerator-to-fix-a-production-problem)
- [https://www.honeybadger.io/blog/creating-ruby-enumerators-on-the-fly/](https://www.honeybadger.io/blog/creating-ruby-enumerators-on-the-fly/)
- [https://docs.zeet.co/integrations/log-formats/#2-kubernetes-cri-format](https://docs.zeet.co/integrations/log-formats/#2-kubernetes-cri-format)

<!--
---------

---------

## Casos de Uso

- um exemplo que meio veio a mente agora é parsing de logs. No kubernetes temos logs do tipo: `timestamp stdout
    F [mensagem]`. Pode ser também um `stdout P`, que indica parcial. Em nosso enumerator poderíamos ter um bloco que da
    yield em stout F, e quando for P, acumula as mensagens até completar
- Digamos que você quer ter um parser de um arquivo de banco de dados por exemplo, ou um arquivo em MP3 em que quer
    enumerar sobre certos blocos. Digamos: yield do cabeçalho, yield do corpo, yield do rodapé.

## Iteradores internos e o módulo Enumerable

Tudo o que você precisa é um `each`. Seja qual for o objeto, se quiser que ele seja um Enumerator, basta implementar um
each.

Até o proprio Enumerator tem seu each, que executa blocos baseado no yield.

Com essa simples implementacao temos todos os métodos do módulo Enumerable disponíveis para nós. Isso é muito poderoso
e é o que faz o Ruby ser tão expressivo.

a implementacao aciam é simples e funciona. no entanto, algo mais e

https://github.com/ruby/ruby/blob/master/array.c#L2560-L2569 - Array tem seu próprio each
https://github.com/ruby/ruby/blob/master/hash.c#L7156C40-L7156C57 - Hash também tem seu each definido
https://docs.oracle.com/javase/8/docs/api/java/sql/ResultSet.html
https://www.baeldung.com/jdbc-resultset#:~:text=Typically%2C%20when%20loading%20data%20into,records%20into%20memory%20at%20once.

1. Understanding Enumerators: not collections but sequences
1. Understanding Enumerators: actually sequence generators

2. Writing the Enumerator from scratch.

3. Be lazy with enumerators + implementing lazy from scratch
-->

<!--
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

https://gist.github.com/geeksilva97/95266a1382cf68aaf5407138aceff154
-->
