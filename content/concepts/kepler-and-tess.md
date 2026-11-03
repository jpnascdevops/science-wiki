---
id: kepler-and-tess
title: Kepler e TESS
summary: Dois telescópios espaciais feitos para achar trânsitos; o Kepler olhou fundo num pedaço do céu, o TESS varre o céu todo.
recap:
  - "Telescópios espaciais para medir brilho de muitas estrelas sem parar."
  - "Kepler (2009 a 2018): um campo fixo, por anos."
  - "TESS (desde 2018): o céu em setores de cerca de 27 dias."
levels: [zero]
consensus: established
tags:
  area: astronomy/exoplanets
  topics: [space-missions, transits]
  era: contemporary
  arxiv_category: astro-ph.EP
equations: []
claims:
  - text: "O telescópio Kepler foi lançado em março de 2009 (6 de março no horário local, 7 de março em UTC) e aposentado em 30 de outubro de 2018"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Kepler_space_telescope, https://www.jpl.nasa.gov/news/nasas-kepler-mission-celebrates-one-year-in-space/]
    status: verified
  - text: "O TESS foi lançado em 18 de abril de 2018 e começou as operações científicas em 25 de julho de 2018"
    type: date
    check: source
    sources: [https://tess.mit.edu/news/tess-launches/, https://heasarc.gsfc.nasa.gov/docs/tess/what-is-tess.html]
    status: verified
resources:
  - kind: read
    title: "NASA TESS Science Support Center: What Is TESS?"
    url: https://heasarc.gsfc.nasa.gov/docs/tess/what-is-tess.html
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "MIT: TESS Mission Overview"
    url: https://tess.mit.edu/mission-overview
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "JPL: NASA's Kepler Mission Celebrates One Year in Space"
    url: https://www.jpl.nasa.gov/news/nasas-kepler-mission-celebrates-one-year-in-space/
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "RTP: Missão TESS, olhar mais longe em busca de planetas com potencial de vida"
    url: https://www.rtp.pt/noticias/ciencias/missao-tess-olhar-mais-longe-em-busca-de-planetas-com-potencial-de-vida_n1070946
    level: zero
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Da Terra, a atmosfera e as interrupções diárias dificultam medir quedas de cerca de 0,01% durante vários trânsitos. No espaço, um telescópio pode medir o brilho de muitas estrelas ao mesmo tempo, sem parar, por meses. Foi para isso que foram feitos o Kepler e o TESS: são, basicamente, máquinas de fazer curvas de luz.

## Equação

Este conceito não tem uma equação central; ele usa as do método de trânsito.

## Variáveis

| | Kepler | TESS |
| --- | --- | --- |
| Lançamento | março de 2009 | 18 de abril de 2018 |
| Estratégia | um campo fixo, observado por anos | o céu em setores, cerca de 27 dias cada |
| Melhor para | planetas pequenos e períodos longos | estrelas próximas e brilhantes, fáceis de acompanhar |

## Exemplo

Uma busca como a do Kepler normalmente exige pelo menos três trânsitos. Para período de um ano, o primeiro e o terceiro estão separados por dois anos; a espera até o primeiro e as lacunas de observação exigem uma campanha mais longa. Foi a aposta do Kepler. O TESS fica menos tempo em cada pedaço do céu, então acha mais planetas de período curto, mas em estrelas brilhantes, onde a confirmação por velocidade radial é mais fácil.

## Onde isso volta

Os dados das duas missões são públicos (arquivo MAST) e são lidos com bibliotecas como lightkurve. É o material para os algoritmos de detecção e para projetos de ciência cidadã.

## Pergunta-ponte

Dos milhares de candidatos que essas missões produzem, quantos são planetas de verdade?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o Kepler fotografou planetas" | "o Kepler mediu o brilho de estrelas; os planetas apareceram como quedas" |
| "o TESS substituiu o Kepler" | "são estratégias complementares: fundo e estreito versus raso e amplo" |

A missão original foi planejada para 3,5 anos. Três trânsitos são um critério de busca, não uma condição universal para confirmar um planeta com observações complementares. [Objetivos do Kepler](https://science.nasa.gov/mission/kepler/).
