---
id: temperature-and-radiation
title: Temperatura e radiação
summary: Tudo que tem temperatura brilha; quanto mais quente, mais energia por partícula de luz.
levels: [zero]
prerequisites: [energy-and-mass]
leads_to: [entropy]
tags:
  area: physics/thermodynamics
  topics: [energy, light]
equations:
  - tex: E_{\text{típica}} \approx k_B\,T
    spoken: "E típica é aproximadamente k B vezes T"
  - tex: P = \sigma A T^4
    spoken: "P é igual a sigma A T à quarta"
claims:
  - text: "A potência irradiada por unidade de área de um corpo negro ideal cresce com a quarta potência da temperatura (lei de Stefan-Boltzmann)"
    type: definition
    check: human
    sources: [https://www.britannica.com/science/Stefan-Boltzmann-law]
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Termodinâmica do buraco negro"
    url: https://pt.wikipedia.org/wiki/Termodin%C3%A2mica_do_buraco_negro
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Um ferro em brasa brilha vermelho, o Sol brilha amarelo, o seu corpo brilha em infravermelho. Temperatura é a medida da energia de agitação das partículas, e essa agitação vira luz. Quanto mais quente, mais energia carrega cada partícula de luz emitida.

## Equação

$$
P = \sigma A T^4
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $T$ | temperatura (0 K = −273,15 °C) | kelvin (K) |
| $k_B$ | constante de Boltzmann: converte temperatura em energia | J/K |
| $P$ | potência irradiada por um corpo negro ideal | watt (W) |
| $\sigma$ | constante de Stefan-Boltzmann | W/(m²·K⁴) |
| $A$ | área da superfície | m² |

## Exemplo

Dobrar a temperatura multiplica a potência irradiada por $2^4 = 16$.

## Onde isso volta

Hawking mostrou que buracos negros têm temperatura e, portanto, irradiam. Como a temperatura deles cresce quando a massa diminui, a evaporação acelera no fim.

## Pergunta-ponte

Se temperatura é energia de agitação, o que mede quantos jeitos diferentes essa agitação pode ter?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "só coisas quentes emitem luz" | "tudo acima do zero absoluto emite; o que muda é o tipo de luz" |
