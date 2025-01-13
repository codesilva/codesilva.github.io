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


## Sofascore

Estatisticas do atleta - https://www.sofascore.com/api/v1/player/905463/unique-tournament/325/season/58766/statistics/overall (Yuri alberto)
Seasons - https://www.sofascore.com/api/v1/team/1981/standings/seasons

https://www.sofascore.com/team/football/sao-paulo/1981 (time no html)

```
 <script type="application/ld+json" data-next-head="">
            {
                "@context": "https://schema.org",
                "@type": "SportsTeam",
                "name": "São Paulo",
                "sport": "Football",
                "gender": "Male",
                "foundingDate": "1935-12-16T00:00:00.000Z",
                "logo": "https://img.sofascore.com/api/v1/team/1981/image",
                "url": "https://www.sofascore.com/team/football/sao-paulo/1981",
                "coach": {
                    "@type": "Person",
                    "name": "Luis Zubeldia"
                },
                "athlete": [
                    {
                        "@type": "Person",
                        "name": "Jonathan Calleri",
                        "birthDate": "1993-09-23T00:00:00.000Z",
                        "nationality": {
                            "@type": "Country",
                            "name": "Argentina"
                        },
                        "gender": "Male"
                    },
                    {
```

```json
  {
                                        "player": {
                                            "name": "Oscar",
                                            "slug": "oscar",
                                            "shortName": "Oscar",
                                            "team": {
                                                "name": "São Paulo",
                                                "slug": "sao-paulo",
                                                "shortName": "São Paulo",
                                                "gender": "M",
                                                "sport": {
                                                    "name": "Football",
                                                    "slug": "football",
                                                    "id": 1
                                                },
                                                "tournament": {
                                                    "name": "Brasileirão Série A",
                                                    "slug": "brasileirao-serie-a",
                                                    "category": {
                                                        "name": "Brazil",
                                                        "slug": "brazil",
                                                        "sport": {
                                                            "name": "Football",
                                                            "slug": "football",
                                                            "id": 1
                                                        },
                                                        "id": 13,
                                                        "country": {
                                                            "alpha2": "BR",
                                                            "alpha3": "BRA",
                                                            "name": "Brazil",
                                                            "slug": "brazil"
                                                        },
                                                        "flag": "brazil",
                                                        "alpha2": "BR"
                                                    },
                                                    "uniqueTournament": {
                                                        "name": "Brasileirão Série A",
                                                        "slug": "brasileirao-serie-a",
                                                        "primaryColorHex": "#C7FF00",
                                                        "secondaryColorHex": "#969696",
                                                        "category": {
                                                            "name": "Brazil",
                                                            "slug": "brazil",
                                                            "sport": {
                                                                "name": "Football",
                                                                "slug": "football",
                                                                "id": 1
                                                            },
                                                            "id": 13,
                                                            "country": {
                                                                "alpha2": "BR",
                                                                "alpha3": "BRA",
                                                                "name": "Brazil",
                                                                "slug": "brazil"
                                                            },
                                                            "flag": "brazil",
                                                            "alpha2": "BR"
                                                        },
                                                        "userCount": 317364,
                                                        "id": 325,
                                                        "country": {
                                                        },
                                                        "displayInverseHomeAwayTeams": false
                                                    },
                                                    "priority": 453,
                                                    "isLive": false,
                                                    "id": 83
                                                },
                                                "primaryUniqueTournament": {
                                                    "name": "Brasileirão Série A",
                                                    "slug": "brasileirao-serie-a",
                                                    "primaryColorHex": "#C7FF00",
                                                    "secondaryColorHex": "#969696",
                                                    "category": {
                                                        "name": "Brazil",
                                                        "slug": "brazil",
                                                        "sport": {
                                                            "name": "Football",
                                                            "slug": "football",
                                                            "id": 1
                                                        },
                                                        "id": 13,
                                                        "country": {
                                                            "alpha2": "BR",
                                                            "alpha3": "BRA",
                                                            "name": "Brazil",
                                                            "slug": "brazil"
                                                        },
                                                        "flag": "brazil",
                                                        "alpha2": "BR"
                                                    },
                                                    "userCount": 317364,
                                                    "id": 325,
                                                    "country": {
                                                    },
                                                    "displayInverseHomeAwayTeams": false
                                                },
                                                "userCount": 432885,
                                                "nameCode": "SPA",
                                                "disabled": false,
                                                "national": false,
                                                "type": 0,
                                                "id": 1981,
                                                "country": {
                                                    "alpha2": "BR",
                                                    "alpha3": "BRA",
                                                    "name": "Brazil",
                                                    "slug": "brazil"
                                                },
                                                "entityType": "team",
                                                "teamColors": {
                                                    "primary": "#ffffff",
                                                    "secondary": "#000000",
                                                    "text": "#000000"
                                                },
                                                "fieldTranslations": {
                                                    "nameTranslation": {
                                                        "ru": "ФК Сан-Паулу"
                                                    },
                                                    "shortNameTranslation": {
                                                    }
                                                }
                                            },
                                            "position": "M",
                                            "jerseyNumber": "8",
                                            "height": 179,
                                            "preferredFoot": "Right",
                                            "userCount": 8692,
                                            "deceased": false,
                                            "gender": "M",
                                            "id": 39400,
                                            "country": {
                                                "alpha2": "BR",
                                                "alpha3": "BRA",
                                                "name": "Brazil",
                                                "slug": "brazil"
                                            },
                                            "shirtNumber": 8,
                                            "dateOfBirthTimestamp": 684374400,
                                            "proposedMarketValue": 3700000,
                                            "proposedMarketValueRaw": {
                                                "value": 3700000,
                                                "currency": "EUR"
                                            }
                                        }
                                    },
```

Lista de jogadores

https://www.sofascore.com/api/v1/team/1981/unique-tournament/325/season/58766/top-players/overall
