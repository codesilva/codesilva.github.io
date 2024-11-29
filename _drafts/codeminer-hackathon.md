Utilitarismo
Richard Feynman
"Desaprender 8 horas por dia ensina os princípios"

Euclides: "De-lhe uma moeda pois ele precisa ganhar com o que aprende"

No último sábado dia XX de Novembro a CodeMiner42 organizou seu primeiro Hackathon. O objetivo era bem simples: fomentar
a experimentação de novas tecnologias em problemas um pouco além do ordinário.

Nesse post, discutiremos como foi o evento, o desafio proposto, as tecologias utilizadas e entenderemos melhor o valor
do _nada_.

No total 10 duplas participaram do evento que tinha como objetivo criar um gerenciador de senhas limitando o uso das
seguintes tecnologias:

Backend:

    - Python
    - Rust
    - Go

Frontend:

    - Svelte
    - Flutter Web

## Rquerimentos

Os requerimentos mais básico envolvem um CRUD de senhas (vaults). O CRUD tem um adicional que é a possibilidade de se adicionar tags a cada vault - úteis para usuários na organização e busca de vaults.

No entanto, estamos falando de um gerenciador de senhas. Portanto, a segurança é um ponto crucial. A aplicação deve ser capaz de criptografar e descriptografar as senhas de forma segura. Além disso, a aplicação deve ser capaz de gerar códigos TOTP.

## As duplas

No frontend todos escolheram Svelte. Já para o backend houve uma variedade maior. A distribuição foi

- Go: 2 duplas
- Python: 5 duplas
- Rust: 3 duplas

[CHART]

As escolhas de Python sendo justificadas pela facilidade, praticidade e semelhança com a linguagens mais dominante - Ruby. A escolha de Go foi feita por familiaridade com Go em si e dois terços dos que escolheram Rust o fizeram por pura curiosidade.

## Organização das duplas

A maior parte das duplas seguiu a organização padrão. Um membro responsável pelo frontend e outro pelo backend. Uma dupla, no entanto, optou por intercalar as tarefas como um time multidisciplinar em um projeto de software; lidando com a proxima tarefa a ser feita independentemente da tecnologia.

## Abordagens

Como um dos participantes, eu achei muito interessante o desafio em si que nos levou a um lugar além do ordinário. Não é muito comum que lidemos com criptografia no dia a dia. Geralmente utilizamos framewoeks que já resolvem esse problema para nós. Ainda assim, ter esses conceitos na sua caixa de ferramentas te torna mais completo.

A maioria das duplas usou a abordagem padrão de deixar o backend a cargo da criptografia usando `salts` e `hashes` nos vaults. Em pseudocodigo seria algo como:

```
salt = generate_salt()
encrypted_password = encrypt(SOME_SYMETRIC_KEY, password_plain_text + salt)

vault = {
    password: encrypted_password,
    salt: salt
}
```

Let's say you have a password `123456` and a salt `abc`. The encrypted password would be `encrypt(123456abc)`. The salt is gerado randomicamente e armazenado no banco de dados.

### Zero-Knowledge Encryption

Uma minoria optou por uma abordagem mais segura, no entando mais complexa de ser implementada. A abordagem de
Zero-Knowledge Encryption é mais segura por nem mesmo o backend é capaz de descriptografar as senhas. A ideia é que
o backend apenas armazene as senhas criptografadas e o frontend seja responsável por descriptografar as senhas.

Esse processo é complexo o suficiente para merecer um post próprio. Mas aqui vai um resumo de seu funcionamento:

1. A partir da senha do usuário, o frontend gera uma chave simétrica.
    - essa chave em si possui um `salt` randomico
2. A chave simétrica é usada para criptografar os conteúdos sensíveis do vault.

Assim, cada vault possui uma chave simétrica única e o backend não tem acesso a ela. Apenas o frontend é capaz de descriptografar as senhas, pois a senha do usuário é necessária para gerar a chave simétrica. Abaixo há uma ilusração do processo:

O processo é que nem o que é feito no backend, porém é no frontend e para cada vault é gerada uma chave simétrica única.

[IMAGEM DO PROCESSO DE ENCRUPTACAO DO VAULT]

A implicação disso é que a senha do usuário também precisa ser segura e o backend não pode ter meios de acessá-la - e nem recuperá-la em caso de perda.

Durante o registro, o frontend, antes de enviar a senha para o backend, faz salt e hashing da senha. O backend recebe esse hash e por sua vez faz mais um hash e aí sim armazena no banco de dados.

## Arrependimentos

https://chatgpt.com/share/674a0aa6-c230-800b-a1a5-c2df660a699b
