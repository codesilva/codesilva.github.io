---
layout: post
title: Criando uma extensão git com Node.js e Ollama para commits automatizados
date: 2024-11-05
lang: pt-BR
category: ["git", "node.js", "ollama", "automacao"]
tags: ["git", "node.js", "ollama", "inteligencia artificial", "automacao"]
---

Recentemente, explorei uma forma interessante de combinar conhecimentos de diferentes áreas para criar uma solução prática: uma extensão git que utiliza inteligência artificial para gerar mensagens de commit automaticamente. Neste post, vou mostrar como criei essa extensão usando Node.js e Ollama, e como você pode fazer o mesmo.

## Criando uma extensão git

Você sabia que é possível estender o git criando seus próprios comandos? O git permite que você crie executáveis com o nome `git-<comando>` e os coloque no seu PATH. Quando fizer isso, poderá usar o comando como `git <comando>`.

Por exemplo, se criarmos um arquivo chamado `git-ola` e colocarmos no PATH, poderemos executá-lo com `git ola`. É uma forma poderosa de estender a funcionalidade do git com suas próprias ferramentas.

## Scripts executáveis em Node.js

Um detalhe que muitos desenvolvedores não sabem é que você pode criar scripts executáveis em Node.js adicionando um shebang no início do arquivo. O shebang `#!/usr/bin/env node` diz ao sistema operacional para executar o arquivo usando o Node.js.

```javascript
#!/usr/bin/env node

// Seu código Node.js aqui
console.log('Olá, mundo!');
```

Com isso, seu arquivo JavaScript se torna um executável que pode ser chamado diretamente do terminal, sem precisar usar `node script.js`.

## Integrando com Ollama

Para a parte de inteligência artificial, utilizei o Ollama, que é uma plataforma excelente para rodar modelos de linguagem localmente. A integração foi feita através da API HTTP que o Ollama expõe na porta 11434.

A parte mais importante foi criar um prompt eficaz para gerar mensagens de commit de qualidade:

```
Você é um especialista em seguir as diretrizes de commits convencionais. 
Com base no seguinte diff do git, gere uma mensagem de commit concisa e informativa 
que siga o formato de commit convencional (tipo: assunto). 
Foque nas mudanças principais e seu propósito. Mantenha abaixo de 72 caracteres.
```

Esse prompt orienta o modelo a gerar mensagens que seguem o padrão Conventional Commits, o que é ótimo para manter um histórico de commits consistente.

## O código

O script faz o seguinte:

1. Verifica se há mudanças staged no git
2. Obtém o diff dessas mudanças
3. Envia o diff para o Ollama com o prompt apropriado
4. Usa a resposta para fazer o commit

A integração com a API do Ollama é feita com uma simples requisição HTTP:

```javascript
const data = JSON.stringify({
  model: "qwen3-coder:480b-cloud",
  prompt: prompt,
  stream: false
});

const options = {
  hostname: 'localhost',
  port: 11434,
  path: '/api/generate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};
```

## Conclusão

Criar essa extensão foi uma experiência enriquecedora que mostrou como podemos combinar diferentes tecnologias para resolver problemas do dia a dia de forma criativa. Agora, sempre que faço alterações no código, posso simplesmente usar `git ollama-commit` e deixar a IA sugerir uma mensagem apropriada.

Claro que a mensagem gerada nem sempre será perfeita, e eu ainda reviso antes de confirmar o commit, mas é um ótimo ponto de partida que economiza tempo e ajuda a manter um padrão nas mensagens.

Você pode adaptar essa abordagem para outras tarefas, como gerar descrições de pull requests, atualizar documentação ou até mesmo escrever testes automaticamente. As possibilidades são vastas quando combinamos ferramentas de desenvolvimento com inteligência artificial local.

Experimente criar sua própria extensão git - é mais fácil do que parece!