---
id: transit-method
title: Método de trânsito
summary: Quando o planeta passa na frente da estrela, o brilho cai; a profundidade dá o tamanho do planeta.
recap:
  - "Planeta passando na frente da estrela apaga uma fração (Rp/R*)² da luz."
  - "Júpiter num Sol: cerca de 1%; Terra num Sol: cerca de 84 ppm."
  - "O trânsito dá o raio do planeta, não a massa."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/exoplanets
  topics: [transits, exoplanets, light-curves]
  era: standard-model-era
  people: [david-charbonneau, gregory-henry]
  arxiv_category: astro-ph.EP
equations:
  - tex: \delta = \left(\frac{R_p}{R_\star}\right)^2
    spoken: "delta é igual a R p sobre R estrela, ao quadrado"
  - tex: T_{\text{dur}} \approx \frac{P}{\pi}\,\frac{R_\star}{a}
    spoken: "T duração é aproximadamente P sobre pi, vezes R estrela sobre a"
  - tex: p_{\text{trânsito}} \approx \frac{R_\star}{a}
    spoken: "a probabilidade de trânsito é aproximadamente R estrela sobre a"
claims:
  - text: "Um planeta do tamanho de Júpiter numa estrela como o Sol produz uma queda de cerca de 1%"
    type: number
    check: compute
    formula: transit_depth_jupiter_sun_percent
    expected: 1.06
    unit: "%"
    tolerance: 0.01
    status: verified
  - text: "Um planeta do tamanho da Terra numa estrela como o Sol produz uma queda de cerca de 84 ppm"
    type: number
    check: compute
    formula: transit_depth_earth_sun_ppm
    expected: 84
    unit: ppm
    tolerance: 0.01
    status: verified
  - text: "Um trânsito central da Terra diante do Sol, numa órbita aproximadamente circular, duraria cerca de 13 horas"
    type: number
    check: compute
    formula: transit_duration_earth_hours
    expected: 13
    unit: h
    tolerance: 0.01
    status: verified
  - text: "Só cerca de 0,5% dos sistemas como Terra e Sol estão alinhados de forma a mostrar trânsito"
    type: number
    check: compute
    formula: transit_probability_earth_percent
    expected: 0.465
    unit: "%"
    tolerance: 0.01
    status: verified
  - text: "HD 209458 b foi o primeiro exoplaneta observado em trânsito, em 1999 (equipes de Charbonneau e de Henry, publicado em 2000)"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/HD_209458_b]
    status: verified
resources:
  - kind: read
    title: "NASA Science: What's a transit?"
    url: https://science.nasa.gov/exoplanets/whats-a-transit
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: study
    title: "ESA Educação: Exoplanetas em Movimento (modelo prático, português de Portugal)"
    url: https://hackanexoplanet.esa.int/wp-content/uploads/2023/02/P32-Exoplanets-in-Motion-PT-final.pdf
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Cadernos de Astronomia (UFES): Como identificar exoplanetas"
    url: https://periodicos.ufes.br/astronomia/article/download/34063/22903
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Methods of detecting exoplanets"
    url: https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Detecting exoplanets with the transit method (ESA Space Science Hub)"
    url: "https://www.youtube.com/watch?v=xNeRqbw18Jk"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "What's a transit? (NASA Science, page with embedded video + animation)"
    url: "https://science.nasa.gov/exoplanets/whats-a-transit/"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Se a órbita do planeta estiver de lado para nós, a cada volta ele passa na frente da estrela e tapa um pedacinho dela. O brilho cai um pouco, fica baixo enquanto o planeta atravessa o disco, e volta. Quanto maior o planeta, maior a queda. Repetindo no mesmo intervalo, a queda revela o período.

A imagem de uma mosca passando na frente de um farol ajuda; ela falha porque a estrela não é um disco de brilho uniforme: a borda é mais escura (escurecimento de limbo), e isso arredonda o fundo da queda.

## Equação

$$
\delta = \left(\frac{R_p}{R_\star}\right)^2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\delta$ | profundidade do trânsito: fração do brilho que some | sem unidade (%, ppm) |
| $R_p$ | raio do planeta | m |
| $R_\star$ | raio da estrela | m |
| $P$ | período orbital | s |
| $a$ | distância do planeta à estrela | m |
| $T_{\text{dur}}$ | duração do trânsito | s |

## Exemplo

| Planeta, numa estrela como o Sol | Queda | Duração |
| --- | --- | --- |
| Júpiter | ≈ 1% | — |
| Terra | ≈ 84 ppm (0,0084%) | ≈ 13 h |

E só cerca de 0,5% dos "Terra e Sol" estão alinhados para mostrar trânsito. Por isso as missões observam centenas de milhares de estrelas.

```lab
transit
```

## Onde isso volta

A busca automática (BLS) procura esse formato de caixa repetido. A profundidade, junto com a massa medida por velocidade radial, dá a densidade do planeta. E, durante o trânsito, a luz atravessa a atmosfera do planeta: é assim que se estudam atmosferas.

## Pergunta-ponte

Como achar uma queda de 84 ppm escondida em anos de dados ruidosos?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o trânsito mede a massa do planeta" | "o trânsito mede o raio; a massa vem da velocidade radial" |
| "se não vimos trânsito, a estrela não tem planeta" | "a maioria das órbitas não está alinhada com a nossa linha de visada" |

## Nível técnico

Para órbita circular e parâmetro de impacto $b$, a duração total é $T_{14} = \frac{P}{\pi}\arcsin\!\left[\frac{R_\star}{a}\frac{\sqrt{(1+k)^2 - b^2}}{\sin i}\right]$, com $k = R_p/R_\star$. A forma da curva com escurecimento de limbo é dada pelo modelo de Mandel e Agol (2002). Desprezando a massa do planeta, da razão $a/R_\star$, ajustada na curva com a geometria orbital apropriada, e do período, sai a densidade média da estrela, $\rho_\star = \frac{3\pi}{GP^2}(a/R_\star)^3$.

A profundidade $(R_p/R_\star)^2$ supõe disco uniforme, sem luz contaminante e planeta inteiramente projetado sobre a estrela. A duração de 13 h é para trânsito central; trânsitos rasantes são mais curtos. [Geometria e hipóteses: Winn](https://arxiv.org/html/1001.2010v5).
