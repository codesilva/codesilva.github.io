---
layout: post
title: FAQ Google Maps
date: 2023-06-19
lang: pt-BR
category: ["google maps"]
tags: ["google maps", "javascript"]
---

De todos os vídeos que já publiquei no [meu canal no YouTube](https://youtube.com/edigleyssonsilva) os da série sobre Google Maps são os que mais ganharam
visibilidade. E vez ou outra recebo perguntas sobre quais serviços/bibiliotecas da SDK JavaScript do Google podem ser
utlizadas para determinada tarefa, se a API é paga, e coisas desse tipo.

Dado que recebo algumas perguntas recorrentes sobre os mesmos assuntos resolvi escrever este post. Esse post pode
receber atuliazações conforme eu vá recebendo perguntas.

Sem mais delongas vamos a elas.

# 1. É pago?

Sim, a SDK JavaScript faz parte da Maps Platform e é categorizada como mapa dinâmico. Esses mapas dinâmicos têm um custo
por carregamento.

Outros serviços pagos são:

- Geocoding Service;
- Distance Matrix Service;
- Directions Service.

**NOTA:** Existem outros serviços pagos. Eu apenas listei os já falados no canal.

A infomação de todos os preços, junto com um simulador, podem ser encontradas em [https://mapsplatform.google.com/pricing/](https://mapsplatform.google.com/pricing/).

Apesar de esses serviços serem pagos a Google abate mensalmente um valor total de $200 dólares das despesas referentes ao
`Maps Platform`.

Isso significa que da soma de todos os custos envolvendo SKUs relacionados a maps terão esse valor descontado. Assim, se
sua aplicação demandar um custo abaixo de $200 dólares você estará fazendo uso da plataforma de graça.

# 2. É possível checar se um ponto está dentro de uma área?
Sim, é possível. Para tal você pode utilizar a [Geometry Library](https://developers.google.com/maps/documentation/javascript/geometry). Mais especificamente, você pode utilizar o método
`containsLocation` do namespace `poly`.

Na verdade, qualquer operação desse tipo que remeta a geometria como checar se uma coordenada está contida em uma área,
se está sobre uma linha, computar distância, e outras relacionadas podem ser resolvidas usando a Geometry Library.

# 3. É possível o obter o endereço a partir das coordenadas?
Essa é bem simples. Você pode usar o serviço de Geocoding que lhe permite obter um endereço a partir das coordenadas de
latitude e longitude. O inverso também é possível.

# Referências
- [Video sobre Geocoding](https://www.youtube.com/watch?v=2Su-935B6jU&pp=ygUVZ29vZ2xlIG1hcHMgZ2VvY29kaW5n)
- [Video sobre Geometry Library](https://www.youtube.com/watch?v=nisrqGu2MS4&pp=ygUcZ29vZ2xlIG1hcHMgZ2VvbWV0cnkgbGlicmFyeQ%3D%3D)
- [Livro Fórmulas em Google Maps](/books)
