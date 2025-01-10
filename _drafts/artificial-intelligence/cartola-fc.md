# Metodologia

Esse projeto tem por objetivo gerar um modelo que permita a escalação de um time no fantasy game CartolaFC usando
Programação Linear e Machine Learning.

NOTA: como nao disponho de muito tempo nem muita experiencia vou focar meus esforcos nos 12 grandes times do Brasil:

- Flamengo
- Vasco ?
- Fluminense ?
- Botafogo
- São Paulo
- Palmeiras
- Corinthians
- Santos ?
- Grêmio
- Internacional
- Cruzeiro
- Atlético-MG

## Definições

Do conjunto J de jogadores extraíremos os subconjuntos A (atacantes), M (meio-campistas), Z (zagueiros), L (laterais),
G (goleiros), T (treinadores).

Cada jogador possui um custo em cartoletas (moeda do jogo) e um peso w que é o que vai auxiliar na escolha. Esse peso
é uma composição das forças e fraquezas do jogador. Usaremos isso para simplificar nosso modelo.

### Cálculo de peso

- Atacantes
  - participação em gol (gols + assist) / # partidas
  - Média de pontuação no fantasy
  - numero de gols marcados do time em que joga (pra identificar se o jogador em questão é parte de um bom ataque). Na
      verdade isso é o quão bom é aquele time em fazer gol nos outros (taxa de 0 a 1).

  - modelo matematico: a*(gols + assist/# jogos) + b*media_cartola + c*(#jogos/#rodadas) + d*media_gols_marcados_time
  + e*media_gols_sofridos + f*(#desarmes/#jogos) - g*(#faltas/#jogos) - h*(#cartoes_v/#jogos) - i*(#cartoes_a/#jogos)

  **tradução:** a * participacao_em_gols + b*media_cartola + c*taxa_de_participacao + d*media_gold_marcados_time
  + e*media_gols_sofridos_time + f*participacao_em_desarmes - g*participacao_em_faltas - h*part_em_cartoes_vermelhos
  - i*part_em_cartoes_amarelos

- Meio-campistas
  - Taxa de participação defensiva
  - Taxa de participação ofensiva
  - Taxa de performance do time
  - Média de pontuação no jogo
- Zagueiros
  - Taxa de participação defensiva
  - Subtrai da taxa de cartões amarelos
  - Subtrai da taxa de cartões vermelhos
  - Soma com a taxa de o quão o time do jogador é sólido defensivamente
- Laterais
  - Taxa de participação defensiva
  - Subtrai da taxa de cartões amarelos
  - Subtrai da taxa de cartões vermelhos
  - Soma com a taxa de o quão o time do jogador é sólido defensivamente
- Goleiros
  - Taxa de defesas
  - O quão sólido é o time em que joga
  - Média no jogo

  - modelo matematico: a*(#gols_sofridos_time/#rodadas) + b*(#defesas/#jogos) + c*(#jogos/#rodadas)
- Treinadores
  - O quão bom é o time ofensivamente
  - O quão bom é o time defensivamente
  - Média no jogo

  - modelo matematico: a*(#vitorias/#rodadas) + b*(#empates/#rodadas) - c*(#derrotas/#rodadas)
