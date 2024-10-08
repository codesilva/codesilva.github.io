# Eu falhei com Firebase para que você não precise falhar também

Nesta palestra, vou compartilhar minha jornada de altos e baixos com o Firebase, destacando as principais armadilhas que encontrei ao utilizar um banco de dados NoSQL em um cenário que parecia promissor, mas que revelou suas limitações ao longo do tempo.

Vou abordar as desvantagens mais comuns do NoSQL, especialmente em termos de escalabilidade, modelagem de dados e complexidade nas consultas, e como essas desvantagens podem se manifestar de maneira crítica ao usar o Firebase.

## Takeaways

- Segurança no Firebase
- Escalabilidade
- Modelagem de dados em bancos NoSQL
- Limitações e cuidados com orçamento

## Os problemas

- Frontend acoplado ao backend
- Dificuldade em remodelar dados
- Limitação das consultas.

[nota: adicionar referencia ao design data intensive applications quando falar sobre bancos relacionais para dados
analíticos]

## Outline

### 1. Introdução

- o que é Firebase?
- construindo aplicações com Firebase
    - Firebase Authentication
    - Firebase Hosting
    - Cloud Firestore for Firebase
    - Cloud Firebase Security Rules
    - Cloud Storage for Firebase
    - Cloud Functions for Firebase

### 2. Patterns para o Firebase

- Modelagem de dados (mantenha a calma e duplique os dados);
- Autenticação e Firestore
- Firestore e Storage
- Regras de Segurança
    - Validação de schema
    - Autenticação e autorização
    - Regras de negócio
- Lidando com dados duplicados (Cloud Functions)

### 3. Armadilhas do Firebase

- Dados analíticos e o problema das agregações
- Acomplamento entre UI e banco de dados

## Estrutura da Palestra

- Inicio a palestra apresentando o Firebase e as ferramentas disponíveis para desenvolver aplicações.
- Uma vez introduzido o Firebase, passo a apresentar os patterns existente para lidar e integras as multiplas
    ferramentas disponívels.
- Depois disso apresento os problemas que encontrei ao utilizar o Firebase e como esses problemas podem ser
    evitados ou mitigados.
