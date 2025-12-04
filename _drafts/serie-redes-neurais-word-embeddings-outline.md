# Série: Redes Neurais e Word Embeddings em JavaScript

## Visão Geral da Série

Esta série de três artigos visa construir uma compreensão profunda de redes neurais e word embeddings através da implementação prática em JavaScript, começando dos fundamentos matemáticos até aplicações avançadas de processamento de linguagem natural.

---

## Artigo 1: Redes Neurais em JavaScript
**Título:** "Redes Neurais em JavaScript: Construindo Nossa Própria Torch do Zero"

### Objetivos do Artigo
- Implementar uma biblioteca minimalista de redes neurais similar ao PyTorch
- Explicar conceitos fundamentais através da prática
- Construir intuição matemática visual e interativa

### Estrutura Detalhada

#### 1. Introdução e Setup (10%)
- Por que implementar do zero ao invés de usar bibliotecas prontas?
- Configuração do ambiente (Node.js/npm)
- Visão geral do que será construído

#### 2. Fundamentos Matemáticos (25%)
- **Álgebra Linear Básica**
  - Vetores: o que são e por que importam
  - Matrizes: representação e operações
  - Implementação de `Vector` e `Matrix` classes
  - Produto escalar, produto matricial
  - Visualização interativa no navegador

#### 3. O Perceptron - Nossa Primeira Neurônio (20%)
- **Teoria**
  - História do perceptron (Frank Rosenblatt, 1957)
  - Função de ativação: step function, sigmoid, ReLU
  - Limitações do perceptron simples
  
- **Implementação**
  ```javascript
  class Perceptron {
    constructor(inputSize, activation='sigmoid') {
      // Inicialização de pesos
      // Função de ativação
    }
    
    forward(input) {
      // Forward pass
    }
    
    predict(input) {
      // Predição final
    }
  }
  ```

#### 4. Função de Perda e Gradientes (25%)
- **Funções de Perda**
  - Mean Squared Error (MSE) para regressão
  - Cross-Entropy para classificação
  - Implementação e visualização
  
- **Derivadas e Gradiente**
  - O que é uma derivada? (explicação intuitiva)
  - Derivada parcial para múltiplas variáveis
  - Gradiente como direção de maior crescimento
  - Implementação de auto-diferenciação básica
  
- **Código Exemplo**
  ```javascript
  class LossFunction {
    mse(predicted, actual) {
      const error = predicted.sub(actual);
      return error.pow(2).mean();
    }
    
    mseGradient(predicted, actual) {
      // Implementação do gradiente
    }
  }
  ```

#### 5. Gradient Descent em Ação (15%)
- **Algoritmo Completo**
  - Forward pass → calcular perda → backward pass → atualizar pesos
  - Learning rate: o que é e por que importa
  - Implementação do treinamento
  
- **Visualização Interativa**
  - Gráfico 3D mostrando o gradiente descendo
  - Animação do processo de otimização
  - Diferentes learning rates em ação

#### 6. Construindo Nossa Rede Neural (5%)
- **Multi-Layer Perceptron (MLP)**
  - Conectando múltiplos perceptrons
  - Backpropagation simplificado
  - Exemplo prático: classificação de dígitos MNIST

### Código Final Esperado
```javascript
// Exemplo de uso da nossa biblioteca
const net = new NeuralNetwork([2, 4, 1]); // 2 inputs, 4 hidden, 1 output
net.train(trainingData, {
  epochs: 1000,
  learningRate: 0.01,
  lossFunction: 'mse'
});
```

---

## Artigo 2: Entendendo Word Embeddings - Análise de Sentimentos
**Título:** "Entendendo Word Embeddings: Construindo um Analisador de Sentimentos do Zero"

### Objetivos do Artigo
- Implementar um sistema completo de análise de sentimentos
- Introduzir conceitos de processamento de linguagem natural
- Construir embeddings que capturam sentimento de palavras

### Estrutura Detalhada

#### 1. Introdução aos Word Embeddings (15%)
- O que são embeddings? (representação densa vs. esparsa)
- Por que não usar one-hot encoding?
- Intuição: palavras similares devem ter vetores similares

#### 2. Preparação dos Dados (20%)
- **Dataset IMDB**
  - Carregando e preprocessando reviews
  - Tokenização e limpeza de texto
  - Construindo vocabulário
  
- **Implementação**
  ```javascript
  class TextProcessor {
    constructor() {
      this.vocab = new Map();
      this.wordToIndex = new Map();
      this.indexToWord = new Map();
    }
    
    buildVocabulary(texts) {
      // Constrói vocabulário com frequência mínima
    }
    
    textToSequence(text) {
      // Converte texto para sequência de números
    }
  }
  ```

#### 3. Construindo Nossa Camada de Embedding (25%)
- **Teoria**
  - Matriz de embedding: cada linha é um vetor para uma palavra
  - Dimensões do embedding: 50, 100, 300 dimensões
  - Inicialização aleatória vs. pré-treinada
  
- **Implementação**
  ```javascript
  class EmbeddingLayer {
    constructor(vocabSize, embeddingDim) {
      this.embeddingMatrix = new Matrix(vocabSize, embeddingDim);
      this.embeddingMatrix.randomize(-0.1, 0.1); // Inicialização uniforme
    }
    
    forward(wordIndices) {
      // Retorna vetores para cada palavra
    }
  }
  ```

#### 4. Arquitetura da Rede para Sentimentos (25%)
- **Modelo Completo**
  - Embedding → Global Average Pooling → Dense → Sigmoid
  - Por que average pooling funciona para sentimentos?
  - Função de perda: binary cross-entropy
  
- **Código da Rede**
  ```javascript
  class SentimentNetwork {
    constructor(vocabSize, embeddingDim) {
      this.embedding = new EmbeddingLayer(vocabSize, embeddingDim);
      this.dense1 = new DenseLayer(embeddingDim, 64);
      this.dense2 = new DenseLayer(64, 1);
      this.sigmoid = new SigmoidActivation();
    }
    
    forward(input) {
      const embedded = this.embedding.forward(input);
      const pooled = embedded.mean(0); // Média dos embeddings
      const hidden = this.dense1.forward(pooled);
      const output = this.dense2.forward(hidden);
      return this.sigmoid.forward(output);
    }
  }
  ```

#### 5. Treinamento e Visualização (15%)
- **Processo de Treinamento**
  - Forward pass com embedding
  - Backpropagation através da camada de embedding
  - Atualização dos vetores de palavras
  
- **Visualizando Embeddings**
  - Redução de dimensionalidade (t-SNE)
  - Palavras positivas vs. negativas no espaço vetorial
  - Animação mostrando vetores se movendo durante treinamento

#### 6. Análise dos Resultados (10%)
- **Qualidade dos Embeddings**
  - Palavras positivas clusterizam juntas?
  - Palavras negativas formam outro cluster?
  - Exemplos de similaridades encontradas
  
- **Aplicação Prática**
  - Testando com novos reviews
  - Interpretando as previsões
  - Limitações do modelo simples

### Resultados Esperados
- Embeddings que capturam sentimento: "excelente" e "maravilhoso" próximos
- Accuracy de ~85% no dataset IMDB
- Visualização clara de clusters de sentimento

---

## Artigo 3: Capturando Semântica Com Word Embeddings
**Título:** "Capturando Semântica Com Word Embeddings: De Sentimentos para Significado"

### Objetivos do Artigo
- Demonstrar que embeddings dependem da tarefa de treinamento
- Construir modelo de preenchimento de lacunas (fill-in-the-blank)
- Mostrar relações semânticas tipo "rei - homem + mulher = rainha"

### Estrutura Detalhada

#### 1. Revisão e Motivação (10%)
- **Problema com Embeddings de Sentimento**
  - "Bom" e "ruim" são antônimos mas aparecem em contextos similares
  - Em análise de sentimento, contexto é mais importante que significado
  - Precisamos de embeddings que capturem significado real

#### 2. Tarefa de Preenchimento de Lacunas (20%)
- **Nova Tarefa, Novos Embeddings**
  - Exemplo: "O gato bebe ___" → "leite"
  - Palavras devem ser próximas por significado, não só por co-ocorrência
  - Dataset: textos gerais (Wikipedia, livros, notícias)
  
- **Preparação dos Dados**
  ```javascript
  class FillInTheBlankDataset {
    constructor(texts, windowSize=5) {
      this.windowSize = windowSize;
      this.contexts = [];
      this.targets = [];
    }
    
    generateTrainingPairs(text) {
      // Cria pares (contexto, palavra-alvo)
      // Exemplo: contexto = ["o", "gato", "bebe", "___"], target = "leite"
    }
  }
  ```

#### 3. Arquitetura Skip-Gram/CBOW (25%)
- **Duas Abordagens**
  - **CBOW (Continuous Bag of Words)**: contexto → palavra
  - **Skip-Gram**: palavra → contexto
  - Por que Skip-Gem geralmente funciona melhor?
  
- **Implementação Skip-Gram**
  ```javascript
  class SkipGramModel {
    constructor(vocabSize, embeddingDim) {
      // Duas matrizes: input embeddings e output embeddings
      this.inputEmbedding = new EmbeddingLayer(vocabSize, embeddingDim);
      this.outputEmbedding = new EmbeddingLayer(vocabSize, embeddingDim);
    }
    
    forward(targetWord, contextWords) {
      // Prediz palavras de contexto dada uma palavra-alvo
      const targetVector = this.inputEmbedding.forward(targetWord);
      const predictions = [];
      
      for (let contextWord of contextWords) {
        const contextVector = this.outputEmbedding.forward(contextWord);
        const similarity = targetVector.dot(contextVector);
        predictions.push(this.softmax(similarity));
      }
      
      return predictions;
    }
  }
  ```

#### 4. Negative Sampling e Eficiência (20%)
- **Problema de Escala**
  - Vocabulário grande = softmax caro
  - Negative sampling: treinar contra palavras negativas
  - Como escolher palavras negativas (distribuição de frequência)
  
- **Implementação Eficiente**
  ```javascript
  class NegativeSampling {
    constructor(vocabSize, numNegatives=5) {
      this.vocabSize = vocabSize;
      this.numNegatives = numNegatives;
      // Distribuição de frequência para amostragem
    }
    
    getNegativeSamples(positiveWord) {
      // Retorna palavras negativas para treinamento
    }
  }
  ```

#### 5. Treinamento e Análise de Resultados (20%)
- **Processo de Treinamento**
  - Janela deslizante sobre o texto
  - Atualizando embeddings com gradientes
  - Monitorando perda e similaridades
  
- **Visualizando Relações Semânticas**
  - Analogy task: "rei" - "homem" + "mulher" = ?
  - País e capitais: "Brasil" - "Brasília" + "Paris" = ?
  - Visualização 2D com t-SNE mostrando clusters semânticos

#### 6. Comparação e Insights (5%)
- **Embeddings de Sentimento vs. Semântica**
  - Mesmas palavras, vetores diferentes
  - Quando usar cada tipo?
  - Limitações e próximos passos (Word2Vec, GloVe, FastText)

### Demonstrações Finais
```javascript
// Testando analogias
const result = model.analogy("rei", "homem", "mulher");
console.log(result); // Deve retornar "rainha"

// Encontrando palavras similares
const similar = model.mostSimilar("computador");
console.log(similar); // ["notebook", "desktop", "PC", ...]
```

---

## Elementos Comuns a Todos os Artigos

### 1. Código Interativo
- Notebooks Jupyter/JavaScript executáveis
- Visualizações em tempo real no navegador
- Código completo no GitHub

### 2. Exemplos Práticos
- Datasets reais (IMDB, Wikipedia, textos brasileiros)
- Métricas de avaliação claras
- Comparações com bibliotecas estabelecidas

### 3. Teoria + Prática
- Explicações intuitivas antes da matemática
- Implementações passo a passo
- Visualizações que constroem intuição

### 4. Contexto Brasileiro
- Exemplos em português quando relevante
- Considerações para PLN em português
- Referências a recursos brasileiros

---

## Cronograma Sugerido
- **Semana 1**: Artigo 1 (Redes Neurais) - Fundamentos
- **Semana 2**: Artigo 2 (Análise de Sentimentos) - Aplicação 1
- **Semana 3**: Artigo 3 (Embeddings Semânticos) - Aplicação 2
- **Semana 4**: Revisão, publicação e promoção

## Recursos Necessários
- Node.js environment
- Bibliotecas: math.js para operações matriciais
- Datasets: IMDB (análise de sentimentos), textos Wikipedia (embeddings)
- Ferramentas: D3.js para visualizações, Chart.js para gráficos

## Métricas de Sucesso
- Código executável e didático
- Visualizações que clarificam conceitos complexos
- Leitores conseguem replicar e modificar os exemplos
- Comentários e discussão gerada pela comunidade