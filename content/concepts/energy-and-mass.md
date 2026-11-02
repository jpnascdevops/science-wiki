---
id: energy-and-mass
title: Energia e E = mc²
summary: Massa é uma forma de energia; perder energia é perder massa.
levels: [zero]
prerequisites: [force-and-motion]
leads_to: [escape-velocity, temperature-and-radiation]
tags:
  area: physics/special-relativity
  topics: [energy]
  era: "1905"
  people: [albert-einstein]
equations:
  - tex: E = m\,c^2
    spoken: "E é igual a m c ao quadrado"
  - tex: E_c = \frac{1}{2} m v^2
    spoken: "E c é igual a um meio m v ao quadrado"
claims:
  - text: "Um grama de massa equivale a cerca de 9 × 10^13 joules"
    type: number
    check: compute
    formula: energy_one_gram_joule
    expected: 9.0e13
    unit: J
    tolerance: 0.01
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Relatividade restrita"
    url: https://pt.wikipedia.org/wiki/Relatividade_restrita
    level: zero
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Energia é a capacidade de fazer algo acontecer: mover, aquecer, iluminar. Einstein mostrou que massa também é energia, muito concentrada. Uma bateria carregada pesa um tantinho a mais que descarregada, embora seja impossível sentir.

## Equação

$$
E = m\,c^2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $E$ | energia | joule (J) |
| $m$ | massa | kg |
| $c$ | velocidade da luz, $3\times10^8$ | m/s |
| $E_c$ | energia de movimento (cinética) | J |

## Exemplo

Um grama de massa convertido por completo daria $10^{-3}\times(3\times10^8)^2 \approx 9\times10^{13}$ J.

## Onde isso volta

Um buraco negro que emite radiação perde energia, e portanto massa. É assim que ele encolhe e evapora. A energia de movimento $\frac12 mv^2$ é usada para calcular a velocidade de escape.

## Pergunta-ponte

Quanta energia de movimento é preciso ter para escapar da gravidade de um planeta?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "massa vira energia só em bombas" | "toda perda de energia é uma perda de massa, quase sempre minúscula" |
