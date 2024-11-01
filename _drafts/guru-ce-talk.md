Bom dia pessoal. Meu nome é Edy e eu tenho um computador

Eu sou desenvolvedor de software na codeminer42 que me permitiu estar aqui hoje.

Hoje eu queria compartilhar com voces alguns insights sobre como evitar o estouro de memoria da sua aplicacao ruby. Isso
inclui, claro, sua aplicacao Rails.

Essa talk é sobre cuidado com performance. Mas é também sobre abstrações, gems e Enumerators... eu sei que parece coisa
demais. Até é. Mas eu gosto de pensar que vou conseguir passar a ideia.

# Ruby-way, Enumerable e Enumerators

- codigo declarativo
- uma abstração excelente!
- presente em muitos lugares

# Um script que lê queries de um banco

https://thoughtbot.com/blog/how-we-used-a-custom-enumerator-to-fix-a-production-problem

# Abstração é sobre esconder os detalhes

# Enumerators customizados

# Como a nossa história começa

- Dyno estourando memoria no heroku
- um upload de uma planilha de 160MB e uma gem

# Confie, mas cheque

- gem usando o mesmo padrão, o que é ótimo
- mas a gente viu que é um problema também. sobretudo quando não se checa.

https://tjay.dev/howto-working-efficiently-with-large-files-in-ruby/
