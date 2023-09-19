# Revisitando infraestrutura

## Cenario atual

- frontend usando Vue
- Gateway de pagamento: Mercado Pago
- Backend parte em Python parte em NodeJS (em node ficam as funcoes que atualizam o banco com os triggers do Cloud
    Firestore)
- Banco de dados: Cloud Firestore
- Deploy em VM do Google com redis em Docker.
- Observacoes
    - Codigo acoplado e com testes faltando
    - Observabilidade ruim
    - Uso pobre de logs


## Propostas

- Mudar o Gateway de pagamento para Pagar.me
- Alterar o backend para Elixir, um ecossistema mais útil em ambientes restritivos. Consegue fazer melhor uso dos
    recursos de hardware já que é multicore por definicao -> [https://www.erlang-solutions.com/blog/5-ways-elixir-can-improve-business-performance/#:~:text=It's%20a%20lightweight%20language%2C%20which,problem%20for%20Elixir%2Dbased%20applications.](https://www.erlang-solutions.com/blog/5-ways-elixir-can-improve-business-performance/#:~:text=It's%20a%20lightweight%20language%2C%20which,problem%20for%20Elixir%2Dbased%20applications.)
- Banco de dados para postgres com uma remodelagem dos dados.
- Deploy em AWS ou Heroku por questao de precos
- Se for Heroku, ter o banco de dados postgres como extensao
- Se for AWS ter um container com o banco durante o periodo de testes
    - Ter backup do banco de dados (Se amazon, usar RDS postgres) - [https://instances.vantage.sh/rds/?cost_duration=monthly&selected=cache.m3.medium](https://instances.vantage.sh/rds/?cost_duration=monthly&selected=cache.m3.medium)

