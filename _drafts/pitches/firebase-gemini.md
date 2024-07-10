# Introducao a Gemini no Firebase

## Eu nao sei nada de IA

É complicado começar uma talk em que me proponho falar de Gemini - um modelo de IA - desse jeito. Você pode pensar: mas
que diabos? Saí de casa pra isso?

Antes que cevá embora me deixe te contar essa história:

Eu tive aqui no Nina hub para um evento do GDG no ano passado. E muitas pessoas vieram por uma palestra em específico,
eu imagino.

Era a palestra de um professor, que era muito boa. É uma pena não termos tido mais tempo. Cara era eloquente, falava
bem.

Lembro que ele falava sore IAs generativas. E assim, eu não sabia quase nada de IA. Eu saí da faculdade de Ciencia da
computacao antes de ter essa disciplina.

O contato que tive com algo que emula inteligencia foi com Dialogflow, em 2017. Talvez você não conheça, mas com dialogflow eu
consegui criar uns toy projects, criando chatbots. Achei incrível.

Até me animei um pouco por NLP (Natural Language Processing) mas não fui adiante. Nem concebia que dali a quatro ou
cinco anos isso seria um bom.

Minha sensação é que todo mundo fala de IA o tempo todo. Então ano passado decidi aprender um pouco mais sobre IAs, eu li
algumas coisas e experimentei o Gemini com Firebase e to aqui pra compartilhar insights acerca desses experimentos.

A minha perspectiva é diferente. Não sou um profissional de dados, sou um profissional de desenvolvimento e um curioso.
O máximo de projeto que tenho pra compartilhar é o que temos na GD - e farei uma versão simplificada dele.

## Firebase, uma tarde de quinta-feira

A abordagem que tomei para aprender foi top-down. É bem assim que aprendemos as coisas, não? Começamos na superfície
e vamos descendo.

Então eu pensei: como podemos fazer IA no firebase? Daí comecei a esbarrar com dois conceitos que falaremos aqui

- Vertex AI
    Vertex AI is a machine learning (ML) platform that lets you train and deploy ML models and AI applications, and customize large language models (LLMs) for use in your AI-powered applications. Vertex AI combines data engineering, data science, and ML engineering workflows, enabling your teams to collaborate using a common toolset and scale your applications using the benefits of Google Cloud.
- Gemini (o modelo)
    É essa caixa em que damos informacoes e ele nos dá a resposta em cima de dados não vistos.

        "A model is typically used to describe a process for generating data, similar to the dataset at hand. Therefore, good models can also be thought
        of as simplified versions of the real (unknown) data-generating process,
        capturing aspects that are relevant for modeling the data and extracting
        hidden patterns from it. A good model can then be used to predict what
        would happen in the real world without performing real-world experiments."

Daí seguindo na documentação peguei uns exemplos e fui brincando com eles.

Sendo sincero, a documentação, mesmo em inglês, não é muito acurada. Em alguns casos tive de examinar a definição de
tipos para fazer as coisas direito. Mas isso é até esperado uma vez que isso aqui ainda está em Beta.

## Meu blog

Não dá para encontrar posts. Eu queria por algo como uma busca. Mas sei lá, parece simples demais. É 2024, só fazer uma
busca é simples demais. Eu quero algo hi-tech, eu quero IA.

Eu quero um chat em que o visitante do meu blog possa buscar posts. E quando não encontrar posts em uma categoria
desejada, o visitante pode sugerir um novo post.

### Estendendo Vertex AI com chamada de funcoes

Gemini é uma IA generativa. Se eu simplesmente perguntar por posts de uma determinada categoria no meu blog ele não vai
trazer resultados. Ele não sabe o que é meu blog - pouca gente sabe inclusive :(

[imagem mostrando a pergunta sobre posts no gemini, antes de estender o comportamento]

O que preciso é dar contexto para o modelo. Podemos treinar o modelo, talvez? Bom, talvez, mas eu ainda não sei como
fazer isso e, sendo sincero, não acho que precise.

E aqui entramos em uma parte muito legal do Gemini que é a estenção de comportamento. Que são as chamadas de função.

Em suma, vamos descrever funções que nosso modelo vai ter para executar. Uma vez que a mensagem é recebida o modelo
interpreta e define qual função deverá ser chamada, assim como extrai os parâmetros a partir da mensagem.

Simples, mas poderoso. Com esse recurso, você pode integrar o modelo a um backend seu que já exista. Um plugin wordpress
pode, por exemplo, sugerir resumos dos seus posts. Ou puxando pro lado mais de ecommerce ele pode te auxiliar na criação
de um produto. Então ele seria mais esse assistente mesmo, integrado ao seu negócio, ao seu domínio.

O meu domínio é o meu blog e o assistente vai ser utilizado pelos visitantes, no caso. Então o que quero é essa função
de busca por categoria.

Se nenhum post for encontrado, o que deve aparecer é um form para sugestão de um post.

[Form solicitando uma sugestao com campos de email, titulo e descricao do post]

### A implementação

Como pode ver temos aqui a funcao, que retorna dados estáticos. Mas entenda, isso aqui poderia ser tranquilamente um
backend seu. O wordpress, por exemplo, já te dá uma interface dessas de busca. Então aqui poderíamos ter uma chamada
à API do Wordpress buscando posts.

Uma vez que coletamos os dados, devolvemos ele para o modelo. Que produz uma resposta.

Veja que antes eu checo sem foi identificada uma funcao para chamar. Caso não tenha sido, eu mostro o form.

NOTA: A implementação do componente é irrelevante para nosso propósito aqui, é só um ReactJS simples. Mas você pode
conferir a implementação em [https://geeksilva](https://geeksilva)

## Conclusao

Vejam como foi simples ajustar o modelo para aderir ao nosso domínio e contexto. É essa simplicidade que quis trazer
aqui, como é fácil fazer as coisas funcionarem.

E acredito que esse é um approach que faz sentido para pessoas não academicas, o approach top-down. Isso aqui
é a superfície da superfície. O que vou fazer, e minha dica para você, é continuar descendo nesse iceberg. Entendendo
melhor os conceitos que tornam o Gemini possível como redes neurais e conceitos de algebra linear.

Sobre esse último, tem um livro que estou lendo, que é grátis, e que gostaria de recomendar: Mathematics for MAchine
Learning.

## Jargões

IA Generativa - GPT-3, Gemini, ChatGPT
Modelo de linguagem - GPT-3, Gemini, ChatGPT

================================================================================================

Meu dialogflow em 2017

ChatGPT, Bard e Gemini são um geradores de texto

## Glossário

Tensors - Tensor é uma matriz multidimensional. Um tensor de ordem zero é um escalar, um tensor de ordem um é um vetor,
um tensor de ordem dois é uma matriz.

Pesos de cada neuronio - Sao parametros

## Demo

Um gerador de posts para meu blog com Firebase e Gemini.

- buscar posts
- solicitar um novo post

## Referencias
https://github.com/firebase/firebase-js-sdk/blob/master/packages/firebase/package.json
https://github.com/firebase/quickstart-js/blob/master/vertexai/main.ts

- [Ref](https://firebase.google.com/docs/reference/js/vertexai-preview?authuser=1)
- [IAs e Redes Neurais](https://www.youtube.com/watch?v=UDrDg6uUOVs)
- [Firebase Get started with Vertex API](https://firebase.google.com/docs/vertex-ai/get-started)
https://blog.codeminer42.com/exploring-the-chatgpt-api/
-----

![image](https://github.com/codesilva/codesilva.github.io/assets/15680379/0c8ff407-3712-40db-befc-58dcfe991b03)

