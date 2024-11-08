Bom dia pessoal. Meu nome é Edy e eu tenho um computador

Eu sou desenvolvedor de software na codeminer42 que me permitiu estar aqui hoje.

Hoje eu queria compartilhar com voces alguns insights sobre como evitar o estouro de memoria da sua aplicacao ruby. Isso
inclui, claro, sua aplicacao Rails.

Essa talk é sobre Ruby. Sobre cuidado com abstrações performance.

# Ruby-way, Enumerable e Enumerators

> [...] I knew Python then. But I didn’t like it, because I didn’t think it was a true object-oriented language—OO features appeared to be an add-on to the language. As a language maniac and OO fan for 15 years, I really wanted a genuine object-oriented, easy-to-use scripting language. I looked for one, but couldn’t find one
> ~ Matz

https://twobithistory.org/images/matz.png


Essa citação do Matz descreve bem o que ele almejava com Ruby. Uma linguagem que fosse fácil de usar e genuinamente orientada a objetos. Mas se você conhece Ruby sabe que ela é na verdade multiparadigma. 

Isso significa apenas que você pode escrever código imperativo. Mas você sabe também. Um loop imperativo como mostrado
abaixo é quase um crime:

```rb
i = 0

while i < 10
  puts i
  i += 1
end
```

Idealmente você escreveria algo assim:

```rb
(0..9).each do |i|
  puts i
end
```

ou algo assim:

```rb
10.times do |i|
  puts i
end
```

ou ainda

```rb
0.upto(9) do |i|
  puts i
end
```

Sabe o que esses três exemplos tem em comum? Eles são declaratibos e usam a classe `Enumerator`. E essa é uma coisa muito legal do Ruby. As vezes eu tenho a sensação que todos os caminhos levam a Enumerator e Enumerable.

Isso é incrível. Torna as coisas bem consistentes. Essa mesma abstração você encontra em gems. ActiveRecord, por exemplo tem esse mesmo estilo (https://github.com/rails/rails/blob/a7c8a20825be5ac8d96566ec5dbe9daa85568bc8/activerecord/lib/active_record/result.rb#L37).

https://github.com/rails/rails/blob/a7c8a20825be5ac8d96566ec5dbe9daa85568bc8/activerecord/lib/active_record/relation.rb#L102

Eu gosto disso. Se você pensar bem, nosso trabalho como dev é converter dados de um tipo para outro. Pode parecer que não, mas pense: sua aplicação recebe uma request (antes disso já houve várias transformações) e converte isso em um registro no banco de dados e vice-versa.

As vezes sua aplicação recebe um arquivo e converte isso em um registro no banco de dados. Por aí vai.

Sabendo disso, é ainda mais incrível ver como Ruby é consistente. Ele te dá um pattern todo para lidar com transformações.

# Como a nossa história começa

Nossa história começa no projeto de um de nossos clientes. Projeto simples. Antes era tudo planilha e a empresa lá decidiu modernizar as coisas. Isso significa que essas planilhas precisariam ser importadas para a aplicação.

A aplicação é simples, tão simples que um dyno basic do heroku é suficiente.

    512MB RAM / 1 a 4 vCPU


tudo muito bem até que um dia nosso cliente reporta problemas na importação de uma planilha. Uma planilha com dois anos de registro, totalizando 162 mil linhas.

esse foi o erro que tomamos

```
heroku[worker.1]: Process running mem=1124M(219.5%)
heroku[worker.1]: Error R15 (Memory quota vastly exceeded)
heroku[worker.1]: Stopping process with SIGKILL
```

Processo sendo morto por excesso de uso na memória - usando o dobro do permitido. Resultando num erro 503 na request.

116 mil linha parecer muito. até é. pensa o quao grande é uma planilha dessas.

mas em termos de espaço em disco não é tanto assim. Essa planilha em formato xlsx ocupa 10MB.

Mas xlsx é um format comprimido. pra ler a planilha é preciso descomprimi-la. o arquivo descomprimido ocupa 74MB.

Mas isso bateu um giga.

## Piora

No heroku batemos no limite. Testando localmente, com mais memória à dispoção observamos o seguinte: ~ 30 minutos para
finalizar a importação. Pouco mais de 3GB de memória utilizados. Como pode?

# A implementação

```ruby
class Import
    def initialize(file_path:)
        @spreadsheet = Roo::Excelx.new(file_path).sheet(0)
    end

    def call
        (SpreadsheetCells::DEFAULT_FIRST_ROW..spreadsheet.last_row).each do |row_number|
            next unless valid_date?(row_number)
            next unless valid_entry?(row_number)

            attrs = extract_string_attributes_from_row(row_number)
                .merge(extract_float_attributes_from_row(row_number))
                .merge(extract_integer_attributes_from_row(row_number))

            Upsert.call(attrs)
        end
    end

    private

    attr_reader :spreadsheet
end
```

Perceba o mesmo padrão aqui. O `each` se fez presente.

# O Problema da Abstração

A implementação é inofensiva. Segue exatamente o estilo do Ruby. Mas o sonho de happy programming do ruby pode se tornar
um pesadelo.

E aqui a primeira dica para nÃo estourar a memória do seu computador: confie, mas cheque.

Isso significa estressar sua implementação. Sondar com seu stakeholder que tipo de planliha seria importada. Checar os
maiores arquivos que eles tinham e validar com eles.

Além disso: é importante ter ciência da lib que voce esta utilizando. eu sei que isso nao é muito comum, mas é bom dar
um olhada na implementacao das libs. Ver como elas fazem as coisas. Sobretudo se tiver grande impacto na sua aplicação.

# O que há de errado afinal?

Não foi muito difícil ver que o problema tinha a ver com a manipulação do arquivo em si. Afinal, um arquivo um pouco maior causou o problema.

Antes de tudo um mau uso de nossa parte. Aqui alguns insights do código acima.

- initialize: só abrir o arquivo já eleva o consumo de memória em 130MB (quase o dobro do arquivo descompactado)
- `SpreadsheetCells::DEFAULT_FIRST_ROW..spreadsheet.last_row`: Só essa linha elevou o consumo de memória para 2GB

Esse last_row faz um de DOIS MILHOES de iteraçoes. Sim, a planilha começa am `A1` e termina em `S116184`. São 116.184
linhas e 19 colunas.

    https://github.com/roo-rb/roo/blob/3d24c117fd1c4f58826b71211526dac46d34f1c6/lib/roo/excelx/sheet.rb#L68-L70
        https://github.com/roo-rb/roo/blob/3d24c117fd1c4f58826b71211526dac46d34f1c6/lib/roo/excelx/sheet.rb#L122-L149
        ...
            https://github.com/roo-rb/roo/blob/master/lib/roo/excelx/sheet_doc.rb#L210
                https://github.com/roo-rb/roo/blob/master/lib/roo/excelx/extractor.rb#L26

Já matamos parte do problema. Um último problema aqui são loops desnecessários. Vamos examinar esse o método `valid_entry?`.

```ruby
def valid_entry?(row_number)
    !spreadsheet.row(row_number).empty? &&
    !row_reference_invalid?(row_number) &&
    !invalid_type?(row_number) &&
    !invalid_non_zero_fields?(row_number)
end

# ...


def invalid_type?(row_number)
    raw_cell_value(row_number:,
                    column_number: SpreadsheetColumns::DEFINITIONS[:TYPE]) != SpreadsheetCells::VALID_EXAM_TYPE
end

def row_reference_invalid?(row_number)
    row_values = spreadsheet.row(row_number).map(&:to_s)

    row_values.any? { |value| value.in?(SpreadsheetCells::INVALID_VALUES) }
end

def invalid_non_zero_fields?(row_number)
    [
    SpreadsheetColumns::DEFINITIONS[:NAAB],
    SpreadsheetColumns::DEFINITIONS[:CODE],
    SpreadsheetColumns::DEFINITIONS[:BATCH_NUMBER],
    SpreadsheetColumns::DEFINITIONS[:CREATED_DATE]
    ].map { |column_number| raw_cell_value(row_number:, column_number:) }.any?('0')
end
```

Cada chamada em `row` faz um `map` da primeira à última coluna.

```
Objects Freed: 15647 / GC Count: 21
Time: 0.27 seconds
Memory usage (delta): 153.48 MB / Current: 323.203125 MB

------

I, [2024-11-01T17:42:53.449997 #62483]  INFO -- : Importing - calculating ro ws and cols
Objects Freed: 16288387 / GC Count: 75
Time: 13.91 seconds
Memory usage (delta): 2255.3 MB / Current: 2578.5 MB
```

# Como foi resolvido?

Trocar o método para each_row_streaming resolveu o problema, pois ele faz em uma passada. Ainda 300MB (o dobro do
tamanho do arquivo descompactado), mas é razoável.

Ainda quero brincar um pouco com esse problema e experimentar se há maneiras mais eficientes de processar um XML.

# Performance Mantras

As vezes o problema não é tão simples. Então eu quero deixar aqui alguns guidelines para lidar com problemas parecidos

## Enumerators Customizados

Use enumerators a seu favor. Com enumerators você pode gerar sequências infinitas sob demanda, com sua própria logica.

## Lazy Evaluation

Não faça hoje o que pode deixar para amanhã.

## Garbage Collector

Em um processo Ruby, apenas uma thread por vez pode executar código Ruby - devido a GVL. Assim, se o GC estiver rodando, o código Ruby não pode ser
executado. Isso pode ser um problema se o GC executar com muita frequência.

## Heap snapshots

# Um script que lê queries de um banco

https://www.speedshop.co/2020/05/11/the-ruby-gvl-and-scaling.html
https://thoughtbot.com/blog/how-we-used-a-custom-enumerator-to-fix-a-production-problem
https://www.speedshop.co/2017/03/09/a-guide-to-gc-stat.html
https://tjay.dev/howto-working-efficiently-with-large-files-in-ruby/
https://www.reddit.com/r/ruby/comments/1cslfrj/any_info_on_how_ruby_32_default_garbage_collector/
