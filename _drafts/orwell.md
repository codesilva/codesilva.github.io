# Orwell project

it is meant to make it easy to work with painless and watcher in Elastic.

## The hard parts

- Painless is not quite painless. it's very limited.
- It's hard to test both scripts and watchers
- write a whole watch json is boring
- handle environments

A ideia é fazer algo como um Terraform ou AWS CDK. A ideia é escrever código e gerar o watcher, assim não precisando escrevet todo um JSON chato

### Credenciais do Elastic

Podemos usar chaves - bem mais seguro. Algo como

```bash
orwell init
```

Salva as keys em ~/.owrell/credentials

```js
// https://www.elastic.co/guide/en/elasticsearch/reference/current/xpack-alerting.html

export const environment = (elasticContext) => ({
  message: 'This env will get available into under the key env'
});

export const schedule = () => {};

export const inputHello = () => makeSimple({
  name: 'somename', // if not define will the function name, like "hello" in this case, it can't be "env"
  data: {}
});

export const inputFromQuery = () => makeSearch({
  name: 'somename', // if not define will the function name, like "hello" in this case
  indices: [],
  body: {
    query: {}
  }
});

export const inputFromWebAPI = () => makeHttpRequest({
  name: 'somename', // if not define will the function name, like "hello" in this case
  request: {
    method: 'POST',
    url: 'https://codesilva.com',
    query: '',
    body: {}
  }
});

// makeArrayCompare, makeScriptCondition
export const condition = (context) => true;

export const tranform1 = (context) => makeSearch();
export const tranform2 = (context) => makeScript();

export const sendEmail = (context) => makeEmailAction();
export const sendSlackMessage = (context) => makeWebHookAction();
export const logAction = (context) => makeLogAction();
```

Fluxo de execução para gerar o json

1. Monta env
2. Monta inputs
3. monta condicoes
4. monta transformes
5. checa se a passagem de tipos está de acorco, um tipo de linter (not a must-have)

Validate watcher

1. Passa pelos transformers
    - Transformers de script com id, é checada a existencia do script
    - inline scripts são compilados
2. Passa pelos de input
    - inputs de script com id, é checada a existencia do script
    - inline scripts são compilados


Comandos

`init` -> inicia credenciais (api key, ingestion url aka endpoint)
`deploy` -> valida e envia para o servidor
`deploy:scripts` -> compila e envia para o servidor | Precisamos de uma opcao pra dar refresh no watchers que tem esse
script introduzido
`deploy:watchers` -> valida e envia para o servidor
`validate` -> valida watcher ()
`simulate` -w [watcher-id] -i [alternative input] -> simula um watcher

## Estrutura de pastas

watchers/
    index.js -- all the watchers should be here
scripts/
    index.js -- all the scripts should be here
