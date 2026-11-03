---
id: free-energy
title: Energia livre
summary: Energia livre é a energia que de fato pode virar trabalho; um processo acontece sozinho, à temperatura e pressão constantes, quando ela diminui.
recap:
  - "G = H − TS: energia menos a parte 'presa' na desordem."
  - "À temperatura e pressão constantes, um processo é espontâneo quando ΔG < 0."
  - "O gelo derrete acima de 0 °C porque ali o ganho de entropia (TΔS) supera a energia para quebrar o cristal (ΔH)."
  - "É a ferramenta para prever reações químicas, mudanças de fase e o funcionamento das células."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [entropy, energy, phase-transitions]
  era: nineteenth-century
  people: [josiah-willard-gibbs, hermann-von-helmholtz]
  events: [gibbs-equilibrium]
equations:
  - tex: G = H - T S
    spoken: "G é igual a H menos T S"
  - tex: \Delta G = \Delta H - T\,\Delta S
    spoken: "delta G é igual a delta H menos T delta S"
claims:
  - text: "Com 6,01 kJ/mol de calor de fusão a 273,15 K, a entropia de fusão do gelo é cerca de 22 J/(mol·K)"
    type: number
    check: compute
    formula: ice_fusion_entropy
    expected: 22.0
    unit: J/(mol·K)
    tolerance: 0.002
    status: verified
  - text: "A −10 °C, derreter gelo custaria cerca de +220 J/mol de energia livre, por isso o gelo é estável"
    type: number
    check: compute
    formula: ice_dg_minus_10c
    expected: 220
    unit: J/mol
    tolerance: 0.003
    status: verified
  - text: "Gibbs desenvolveu a termodinâmica química e a energia livre em Sobre o equilíbrio das substâncias heterogêneas (1875 a 1878); Helmholtz introduziu F = U − TS por volta de 1882"
    type: date
    check: source
    sources: ["https://www.britannica.com/topic/On-the-Equilibrium-of-Heterogeneous-Substances", "https://en.wikipedia.org/wiki/Helmholtz_free_energy"]
    status: verified
resources:
  - kind: read
    title: "16.5: Energia livre (Química 2e, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Quimica_2e_(OpenStax)/16%3A_Termodin%C3%A2mica/16.05%3A_Energia_livre"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Free energy (Britannica)"
    url: "https://www.britannica.com/science/free-energy"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Gibbs free energy (Britannica)"
    url: "https://www.britannica.com/science/Gibbs-free-energy"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Helmholtz free energy (Britannica)"
    url: "https://www.britannica.com/science/Helmholtz-free-energy"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Gibbs free energy and spontaneity (Khan Academy)"
    url: "https://en.khanacademy.org/test-prep/mcat/chemical-processes/thermochemistry/v/gibbs-free-energy-and-spontaneity"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Nem toda energia de um sistema serve para alguma coisa. Parte dela está espalhada na agitação desordenada das moléculas e não dá para recolher. Energia livre é a parte útil: à temperatura e pressão constantes, o máximo de trabalho que se pode tirar além do trabalho de expansão.

Ela também decide o que acontece sozinho. Duas tendências brigam: os sistemas tendem a cair para estados de menor energia (o cristal de gelo, bem arrumado) e a ir para estados de maior entropia (a água líquida, mais desordenada). A temperatura é o juiz: quanto mais quente, mais pesa a entropia. Abaixo de 0 °C, vence a energia e o gelo fica; acima, vence a entropia e ele derrete.

## Equação

$$
\Delta G = \Delta H - T\,\Delta S
$$

```lab
free-energy
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $G$ | energia livre de Gibbs | J (ou J/mol) |
| $H$ | entalpia: energia interna mais $pV$ | J |
| $T$ | temperatura | K |
| $S$ | entropia | J/K |
| $\Delta G < 0$ | o processo acontece sozinho | — |

## Exemplo

Derreter gelo custa $\Delta H \approx 6{,}01$ kJ/mol e ganha $\Delta S \approx 22$ J/(mol·K). A −10 °C (263 K): $\Delta G = 6010 - 263 \times 22 \approx +220$ J/mol, positivo, e o gelo fica. A +10 °C, o sinal vira e ele derrete. Exatamente em 0 °C, $\Delta G = 0$ e as duas fases convivem.

## Onde isso volta

Transições de fase, pilhas e baterias (a voltagem é a energia livre da reação por carga), a química da vida (a célula acopla reações com $\Delta G$ negativo para empurrar as positivas) e o limite de Landauer para apagar informação.

## Pergunta-ponte

O que acontece exatamente no ponto em que as duas fases empatam?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a natureza sempre busca a menor energia" | "à temperatura e pressão constantes, busca a menor energia livre; a entropia entra na conta" |
| "reação espontânea é reação rápida" | "espontânea quer dizer que pode acontecer sozinha; a velocidade é outra história (o diamante vira grafite, mas, à temperatura ambiente, tão devagar que na prática nunca acontece)" |
