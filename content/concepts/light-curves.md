---
id: light-curves
title: Curvas de luz
summary: O brilho de uma estrela medido ao longo do tempo; é o dado bruto de onde saem os trânsitos.
recap:
  - "Curva de luz é o brilho de uma estrela ao longo do tempo."
  - "Normalizada, 1 é o brilho normal; 0,99 é um apagão de 1%."
  - "Juntar N medidas reduz o ruído aleatório por raiz de N."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/data-analysis
  topics: [light-curves, stars]
  arxiv_category: astro-ph.IM
equations:
  - tex: f(t) = \frac{F(t)}{\operatorname{median}(F)}
    spoken: "f de t é igual a F de t sobre a mediana de F"
  - tex: \sigma_{\text{bin}} \approx \frac{\sigma}{\sqrt{N}}
    spoken: "sigma do bin é aproximadamente sigma sobre a raiz de N"
claims:
  - text: "Juntar N medidas independentes reduz o ruído aleatório por um fator de raiz de N"
    type: definition
    check: human
    status: pending
resources:
  - kind: read
    title: "NASA Science: What's a transit?"
    url: https://science.nasa.gov/exoplanets/whats-a-transit
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: study
    title: "ESA Educação: Detetive de Exoplanetas (dados do CHEOPS, português de Portugal)"
    url: https://hackanexoplanet.esa.int/wp-content/uploads/2023/02/P31-Exoplanets-detective-PT-final.pdf
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "NASA Exoplanet Watch: observe trânsitos como cientista cidadão"
    url: https://exoplanets.nasa.gov/exoplanet-watch/about-exoplanet-watch
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma curva de luz é um gráfico simples: no eixo de baixo, o tempo; no de cima, o brilho da estrela. Para uma estrela calma, é quase uma linha reta, com um chuvisco de ruído. Tudo que muda o brilho aparece ali: manchas girando, explosões, outra estrela eclipsando, ou um planeta passando na frente.

## Equação

$$
f(t) = \frac{F(t)}{\operatorname{median}(F)}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $F(t)$ | fluxo medido no instante $t$ | contagens/s ou W/m² |
| $f(t)$ | fluxo normalizado: 1 é o brilho normal | sem unidade |
| $\sigma$ | ruído de uma medida | mesma de $f$ |
| $N$ | número de medidas juntadas num bin | — |

## Exemplo

Normalizar divide tudo pela mediana: o brilho típico vira 1,0. Uma queda para 0,99 é um apagão de 1%. Se cada medida tem 0,1% de ruído, juntar 100 medidas reduz o ruído para cerca de 0,01%.

## Onde isso volta

O método de trânsito procura quedas periódicas nessa curva normalizada. A detecção automática (BLS) varre a curva atrás dessas quedas.

## Pergunta-ponte

Que formato tem a queda de brilho quando um planeta passa na frente da estrela?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a curva de luz é uma foto" | "é uma série de medidas de brilho; a estrela é só um ponto" |
| "toda queda é um planeta" | "manchas, eclipses de estrelas binárias e ruído instrumental também fazem quedas" |

## Nível técnico

Antes de procurar trânsitos, a curva passa por remoção de tendências (detrending), por exemplo com um filtro de Savitzky-Golay ou splines, que apaga variações lentas da estrela e do instrumento. O ruído é medido em ppm em escalas de tempo típicas de trânsito (CDPP, combined differential photometric precision). Em séries com ruído branco, a precisão de um bin cai como $1/\sqrt N$; ruído vermelho (correlacionado) cai mais devagar.
