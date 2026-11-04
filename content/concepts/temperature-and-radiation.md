---
id: temperature-and-radiation
title: Temperatura e radiação
summary: Tudo que tem temperatura brilha; quanto mais quente, maior a energia média dos fótons da radiação térmica.
recap:
  - "Tudo que tem temperatura emite luz."
  - "A potência irradiada cresce com T à quarta (Stefan-Boltzmann)."
  - "Mais quente significa maior energia média por fóton na radiação térmica."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [energy, light]
equations:
  - tex: E_{\text{típica}} \approx k_B\,T
    spoken: "E típica é aproximadamente k B vezes T"
  - tex: P = \sigma A T^4
    spoken: "P é igual a sigma A T à quarta"
claims:
  - id: claim-001
    text: "A potência irradiada por unidade de área de um corpo negro ideal cresce com a quarta potência da temperatura (lei de Stefan-Boltzmann)"
    type: definition
    check: human
    sources: [https://www.britannica.com/science/Stefan-Boltzmann-law]
    status: pending
resources:
  - kind: read
    title: "Wikipedia: Termodinâmica do buraco negro"
    url: https://pt.wikipedia.org/wiki/Termodin%C3%A2mica_do_buraco_negro
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "The Ultraviolet Catastrophe (Physics Girl)"
    url: "https://www.pbs.org/video/the-ultraviolet-catastrophe-rp9fqg/"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Light: Crash Course Astronomy #24"
    url: "https://www.youtube.com/watch?v=jjy-eqWM38g"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Um ferro em brasa brilha vermelho, o Sol emite luz que, vista do espaço, é branca, o seu corpo brilha em infravermelho. Num gás, temperatura é a medida da agitação média das partículas, e essa agitação vira luz. A luz emitida tem fótons de várias energias; quanto mais quente o corpo, maior a energia média deles, e a cor puxa do vermelho para o azul.

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

Para um corpo negro de área fixa, dobrar a temperatura em kelvin multiplica a potência irradiada por $2^4 = 16$. Corpos reais dependem também da emissividade; a potência líquida inclui a radiação absorvida do ambiente.

## Onde isso volta

Hawking mostrou que buracos negros têm temperatura e, portanto, irradiam. Como a temperatura deles cresce quando a massa diminui, a evaporação acelera no fim.

## Pergunta-ponte

Se temperatura é energia de agitação, o que mede quantos jeitos diferentes essa agitação pode ter?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "só coisas quentes emitem luz" | "tudo acima do zero absoluto emite; o que muda é o tipo de luz" |

[Cor do Sol: NASA/SOHO](https://soho.nascom.nasa.gov/classroom/faq.html).
