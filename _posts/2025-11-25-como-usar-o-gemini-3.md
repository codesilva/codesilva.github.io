---
layout: post
title: "Como usar o Gemini 3 hoje"
date: 2025-11-25
tags: [gemini, ollama, ia, tutorial]
categories: [ia, gemini]
---

O [Gemini 3 Pro](https://ai.google.dev/gemini-api/docs/gemini-3?thinking=high#javascript_1) é o modelo mais avançado da Google para tarefas complexas, capaz de compreender grandes conjuntos de dados e resolver problemas desafiadores a partir de diferentes fontes de informação, incluindo texto, áudio, imagens, vídeo e repositórios de código completos.

Como qualquer pessoa curiosa, você pode querer experimentar o modelo já hoje. Há algumas formas de fazer isso. A primeira e mais simples é através do [gemini.google.com/app](https://gemini.google.com/app), que é a interface web oficial para interagir com os modelos Gemini.

![imagem da selecao do modelo Gemini 3 Pro no gemini.google.com/app](/assets/images/gemini3/gemini-app-web.png)

Funciona, mas não sei se funciona de forma consistente, já que no site da própria Google há a informação de que o acesso ao Gemini 3 Pro é limitado.

## Como usar Gemini 3 Pro hoje

No contexto de aplicações ou dev tools, o [modelo está disponível](https://github.com/google-gemini/gemini-cli/discussions/13280), mas não para todos ainda. O acesso imediato está liberado para três categorias principais de usuários:

- Assinantes não comerciais do Google AI Ultra.
- Observação: Isso NÃO inclui, no momento, o Google AI Ultra para Empresas.
- Usuários que têm acesso por meio de uma chave de API Gemini paga.

Eu não faço parte de nenhuma dessas categorias. Tentei enviar um pedido de acesso, mas não obtive sucesso até o momento. Recorri então à minha conta do Google Cloud, onde pelo Vertex AI eu consigo acessar o Gemini 3.

Vertex AI é a plataforma de IA gerenciada do Google Cloud que permite aos desenvolvedores construir, implantar e escalar modelos de machine learning. Recentemente, o Google integrou o Gemini 3 ao Vertex AI, permitindo que os usuários aproveitem o poder do modelo em suas aplicações.

Você pode, inclusive, usar o modelo mais recente de forma explicita via Vertex AI Studio, uma interface web para interagir com modelos de IA.

![Foto do Vertex AI Studio com o modelo Gemini 3 selecionado](/assets/images/gemini3/vertexai-gemini3.png)

Para usar a Vertex AI, você precisa de uma conta de faturamento ativa (novos usuários têm USD 300.00 de crédito) no Google Cloud e habilitar a API do Vertex AI no seu projeto. O próprio painel do Vertex AI Studio vai te guiar nesse processo.

## Obtendo acesso ao Gemini 3 Pro via Vertex AI

A forma mais simples de integrar com o Gemini 3 é via API Key, que pode ser obtida através do painel do Vertex AI Studio. Com essa API você pode fazer chamadas REST e também integrar com ferramentas como o Gemini CLI.

## Usando com o Gemini CLI

Com o vertex configurado, você já pode usar o Gemini 3 Pro através do Gemini CLI, que é a ferramenta oficial da Google para fazer frente a alternativas como Claude Code e Codex.

Uma vez obtida a API Key, defina a variável de ambiente `GOOGLE_API_KEY` com o valor da sua chave:

```bash
export GOOGLE_API_KEY="sua_api_key_aqui"
```

Defina o método de autenticação, usando o comando `/auth`, para Vertex AI.

![Imagem do comando /auth sendo utilizado no Gemini CLI](/assets/images/gemini3/gemini-cli-auth.png)

Dentro da CLI, usando o comando `/settings`, habilite as "Preview Features" para liberar o acesso ao Gemini 3 Pro.

![Imagem das features preview sendo habilitadas](/assets/images/gemini3/gemini-cli-preview-features.png)

![Imagem do modelo disponível no Gemini CLI](/assets/images/gemini3/gemini-cli-model-selection.png)

## Chamadas via HTTP e SDKs

Usando a [SDK oficial](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/sdks/overview) do Google GenAI, você pode fazer chamadas diretas ao modelo Gemini 3 Pro. Veja um exemplo em Python:

```python
from google import genai
from google.genai import types

client = genai.Client(
    vertexai=True, 
    api_key="SUA_API_KEY"
)

response = client.models.generate_content(
    model="gemini-3-pro-preview",
    contents="Explain how AI agents work in one sentence."
)

print(response.text)
```

Ou, se preferir, você pode fazer chamadas HTTP diretas, como mostrado no exemplo abaixo:

```bash
curl "https://aiplatform.googleapis.com/v1/publishers/google/models/gemini-3-pro-preview:streamGenerateContent?key=SUA_API_KEY" \
-X POST \
-H "Content-Type: application/json" \
-d '{
  "contents": [
    {
      "role": "user",
      "parts": [
        {
          "text": "Explain how AI works in a few words"
        }
      ]
    }
  ]
}'
```

## Conclusão

É isso, agora você já sabe como usar o Gemini 3 Pro hoje mesmo, seja via interface web, CLI ou API. Aproveite para explorar as capacidades avançadas do modelo e integrá-las em suas aplicações!
