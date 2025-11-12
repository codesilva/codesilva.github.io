---
layout: post
title: Tornando seu git mais inteligente com Ollama e LLMs locais
date: 2024-11-05
lang: pt-BR
category: ["ai", "ollama"]
---

[Nate Berkopec](https://x.com/nateberkopec), mantenedor do PUMA, tem compartilhado vários resultados e ideias interessantes sobre o uso de IAs generativas para melhorar fluxos de trabalho de desenvolvimento no X/Twitter.

Uma das últimas coisas que ele compartilhou foi o script [`gc-ai.fish`][] que ele usa para gerar mensagens de commit usando LLM. É bem prático e fácil de usar; e para quem gosta de escrever scripts, há uma série de ferramentas legais que ele recomenda para melhorar a experiência no terminal, como o [`gum`][], [`bat`][] e [`llm`][].

Em Fish Shell, para executar o script, basta rodar:

```fish
gc-ai
```

Pensando em um experimento, achei que seria uma boa ideia fazer algo semelhante, mas escrito em Node.js, e usando o Ollama para gerar as mensagens de commit, assim sendo capaz de usar um modelo local.

Mas ao invés de ter que chamar um script independentemente, pensei em fazer uma extensão git chamada `ollama-commit`, assim poderia chamar o comando diretamente como:

```bash
git ollama-commit
```

## Estendendo o git

Para estender o `git` com um script personalizado precisamos de duas coisas:

1. Criar um arquivo executável chamado `git-<comando>` (no nosso caso, `git-ollama-commit`)
2. Adicionar esse arquivo ao PATH do sistema

Como um exemplo, observe o seguinte script simples em Node.js:

```javascript
#!/usr/bin/env node
console.log('Olá do git-ollama-commit!');
```

Esse arquivo se encontra no diretório `$HOME/projects/probe`, e para que o `git` consiga encontrá-lo, adicionei esse diretório ao meu PATH, modificando o arquivo `~/.zshrc`:

```bash
export PATH="$HOME/projects/probe:$PATH"
```

Lembre-se de que o script precisa ser executável, então rode:

```bash
chmod +x git-ollama-commit
```

## O código

Essa é a parte mais simples. O código, em JavaScript, faz a mesma coisa que o `gc-ai.fish`. Ele verifica se há mudanças staged no git, obtém o diff dessas mudanças, envia o diff para o Ollama com um prompt apropriado, e usa a resposta para fazer o commit.

Para gerar o código eu usei também LLM. No caso, usei o `OpenCode` com o modelo `Claude Haiku 4.5`. Precisei ir e voltar algumas vezes, mas o resultado foi satisfatório.

#### Primeira tentativa de prompt

    Modelo: Qwen3-coder:480b-cloud

    I want you to come up with a git extension, that is able to diff the changes and commit all using llm through ollama.
    you may already know, to extend git you can create a file like git-something, expose it in the PATH . once it's done, the command "git something" can be used.
    you can get inspiration from: https://github.com/nateberkopec/dotfiles/blob/main/files/config/fish/functions/gc-ai.fish
    ensure the file you create is written in js. to make it work as an executable you can add the nodejs shebang
    for the model, use one I already have in the ollama (you can find which models i have using the command ollama list).
    I suggest you use the qwen3-coder

Perceba que ofereço um exemplo, citei como se faz uma extensão `git`, e também sugeri um modelo que eu tinha instalado no Ollama.

Ele gerou um código que não funcionou com `diffs` mais longos por conta de um check de limite de caracteres. Então fiz uma segunda tentativa, desta vez mais detalhada.

#### Segunda tentativa de prompt

    Modelo: Claude Haiku 4.5

    In this repository, there is a file at ./bin/git-ollama-commit. I want you to replace it.
    To replace it, I want you to look into that reference https://github.com/nateberkopec/dotfiles/blob/main/files/config/fish/functions/gc-ai.fish
     I just want you to get this gc-ai.fish and convert to JavaScript. The only difference is that it should be executed with Node, so add the proper shebang, and it will use Ollama, not Claude.
    This result of the process should be saved at ./bin/git-ollama-commit

    for the model, use one I already have in the ollama (you can find which models i have using the command ollama list).
     I suggest you use the qwen3-coder

O prompt é em essência o mesmo, mas dessa vez informei que ele só deveria converter o script `gc-ai.fish` para JavaScript, sem tirar nem adicionar nada.

O modelo removeu o limite de caracteres, mas tentou chamar o Ollama via CLI, o que não funciona. A integração com o Ollama precisa ser feita via API HTTP.

#### Terceira tentativa de prompt

    Modelo: Claude Haiku 4.5

    In this repository, there is a file at ./bin/git-ollama-commit. I want you to replace it.
    To replace it, I want you to look into that reference https://github.com/nateberkopec/dotfiles/blob/main/files/config/fish/functions/gc-ai.fish
    I just want you to get this gc-ai.fish, convert to JavaScript. The only difference is that it should be executed with Node, so add the proper shebang, and it will use Ollama, not Claude.
    This result of the process should be saved at ./bin/git-ollama-commit

    for the model, use one I already have in the ollama (you can find which models i have using the command ollama list).
     I suggest you use the qwen3-coder

     Ollama is not a CLI; you should use its API

Praticamente o mesmo prompt, mas agora informei que ele deveria usar a API do Ollama ao invés de tentar chamar o CLI. 

O código gerado funcionou, eu inclusive usei para commitar as mudanças na própria extensão, como clean up e remoção de dependências não utilizadas.

![Extensão git ollama-commit em ação](/assets/images/ollama/git-ollama-commit.png)

A implementação completa está disponível no gist: [https://gist.github.com/geeksilva97/69c4b74fb5a065b733abb084d786c922](https://gist.github.com/geeksilva97/69c4b74fb5a065b733abb084d786c922)

## Validando

Para fazer os testes também usei IA generativa. Ainda usando `OpenCode` e o modelo `Claude Haiku 4.5`, pedi o seguinte:

    Now I want you to test it. 
    Create a repository, add some files, commit. Then change the files and commit. Remove files and commit. Remember to use the tool you just created at ./bin/git-ollama-commit

Nesse caso só observei que funcionava como esperado.

[`gc-ai.fish`]: https://github.com/nateberkopec/dotfiles/blob/main/files/config/fish/functions/gc-ai.fish
[`llm`]: https://llm.datasette.io/en/stable/
[`gum`]: https://github.com/charmbracelet/gum
[`bat`]: https://github.com/sharkdp/bat
