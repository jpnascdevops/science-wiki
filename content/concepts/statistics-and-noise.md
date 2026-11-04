---
id: statistics-and-noise
title: Estatística, média e ruído
summary: Ruído aleatório segue quase sempre uma curva em sino; fazer a média de N pontos reduz o ruído por √N e revela sinais escondidos.
recap:
  - "Somando muitos efeitos aleatórios pequenos, o resultado segue a curva normal (sino)."
  - "Cerca de 68% dos valores ficam a até 1 desvio padrão da média; 95%, a até 2."
  - "Média de N pontos independentes: ruído dividido por √N."
  - "Sinal/ruído acima de uns 3 a 5 começa a ser confiável; abaixo, pode ser acaso."
levels: [zero]
consensus: established
tags:
  area: math/probability
  topics: [statistics, signal-processing]
  era: nineteenth-century
  people: [abraham-de-moivre, pierre-simon-laplace, carl-friedrich-gauss, william-gosset]
  events: [least-squares]
equations:
  - tex: \text{SNR} = \frac{\text{sinal}}{\sigma / \sqrt{N}}
    spoken: "S N R é igual ao sinal dividido por, sigma sobre raiz de N"
  - tex: P(|x - \mu| < \sigma) \approx 68\%
    spoken: "a probabilidade de x estar a menos de um sigma de mi é aproximadamente sessenta e oito por cento"
claims:
  - id: claim-001
    text: "Numa distribuição normal, cerca de 68,3% dos valores ficam a até 1 desvio padrão da média"
    type: number
    check: compute
    formula: within_one_sigma_percent
    expected: 68.27
    unit: "%"
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "E cerca de 95,4% ficam a até 2 desvios padrão"
    type: number
    check: compute
    formula: within_two_sigma_percent
    expected: 95.45
    unit: "%"
    tolerance: 0.001
    status: calculated
  - id: claim-003
    text: "Uma queda de 0,4% com ruído de 0,6% por ponto, em média sobre 30 pontos, tem sinal/ruído de cerca de 3,7"
    type: number
    check: compute
    formula: transit_snr_30_points
    expected: 3.65
    unit: ""
    tolerance: 0.003
    status: calculated
  - id: claim-004
    text: "De Moivre encontrou a aproximação normal da binomial em 1733, e Laplace a generalizou (teorema central do limite) por volta de 1810"
    type: date
    check: source
    sources: ["https://jhanley.biostat.mcgill.ca/bios601/GaussianModel/HistoryCentralLimitTheorem.pdf", "https://www.johndcook.com/blog/2010/01/05/how-the-central-limit-theorem-began"]
    status: pending
  - id: claim-005
    text: "William Sealy Gosset publicou a distribuição t em 1908, com o pseudônimo Student, quando trabalhava na cervejaria Guinness"
    type: attribution
    check: source
    sources: ["https://encyclopediaofmath.org/wiki/Gosset,_William_Sealy"]
    status: pending
resources:
  - kind: study
    title: "2: Estatísticas descritivas (média, desvio padrão; Estatísticas introdutórias, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Estatisticas_introdutorias_(OpenStax)/02%3A_Estat%C3%ADsticas_descritivas
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "6: A distribuição normal (Estatísticas introdutórias, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Estatisticas_introdutorias_(OpenStax)/06%3A_A_distribui%C3%A7%C3%A3o_normal
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "7: O teorema do limite central (Estatísticas introdutórias, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Estatisticas_introdutorias_(OpenStax)/07%3A_O_teorema_do_limite_central
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: watch
    title: "But what is the Central Limit Theorem? (3Blue1Brown)"
    url: https://www.3blue1brown.com/lessons/clt
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Normal distribution (Britannica)"
    url: https://www.britannica.com/topic/normal-distribution
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

O brilho de uma estrela medido por um telescópio nunca sai igual: fótons chegam em quantidade aleatória, o detector esquenta, a atmosfera treme. Cada medida é o valor real mais um pouco de ruído. Quando o ruído vem de muitos efeitos pequenos somados, ele segue aproximadamente sempre a mesma forma: a curva em sino, ou normal.

A boa notícia é que o ruído aleatório se cancela na média. Com 100 pontos, os altos e baixos se compensam e o ruído cai para um décimo. É assim que um sinal fraco, como um planeta que apaga 0,01% de uma estrela, aparece no meio de um ruído muito maior: medindo muitas vezes e fazendo a média.

## Equação

$$
\text{SNR} = \frac{\text{sinal}}{\sigma / \sqrt{N}}
$$

```lab
noise
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\mu$ | média (valor central) | a da grandeza |
| $\sigma$ | desvio padrão do ruído de um ponto | a da grandeza |
| $N$ | pontos usados na média | — |
| SNR | razão sinal/ruído | — |

## Exemplo

Um planeta apaga 0,4% da estrela, e cada ponto tem ruído de 0,6%. Ponto a ponto, a queda é invisível (SNR ≈ 0,7). Fazendo a média de 30 pontos, o ruído cai para $0{,}6\%/\sqrt{30} \approx 0{,}11\%$ e o SNR sobe para cerca de 3,7. No laboratório, aumente $N$ e veja a queda aparecer.

## Onde isso volta

Curvas de luz e a detecção de trânsitos de exoplanetas, a teoria cinética (velocidades de moléculas seguem uma distribuição), testes de Bell (que são estatísticos) e a física de partículas, que só anuncia uma descoberta com "5 sigma".

## Pergunta-ponte

E se o sinal não for uma queda, mas uma vibração escondida no meio do ruído?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a média elimina o ruído" | "a média reduz o ruído aleatório por √N; o sistemático continua" |
| "deu 2 sigma, então é real" | "2 sigma ainda acontece por acaso em uns 5% das vezes; olhando muitos lugares, aparece sempre algum" |
