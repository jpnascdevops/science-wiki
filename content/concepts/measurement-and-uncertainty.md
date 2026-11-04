---
id: measurement-and-uncertainty
title: Medida, erro e incerteza
summary: Toda medida tem uma incerteza; repetir e tirar a média reduz o erro aleatório, que cai com a raiz do número de medidas.
recap:
  - "Medida sem incerteza não está completa: 1,00 ± 0,01 s diz quanto confiar no número."
  - "Erro aleatório espalha as medidas em volta do valor real; erro sistemático desloca todas para o mesmo lado."
  - "O desvio padrão mede o espalhamento de uma medida típica."
  - "A incerteza da média cai com √N: cem medidas dão uma média dez vezes mais precisa."
levels: [zero]
consensus: established
tags:
  area: math/probability
  topics: [measurement, statistics]
  era: nineteenth-century
  people: [eratosthenes, adrien-marie-legendre, carl-friedrich-gauss]
  events: [eratosthenes-earth-size, least-squares]
equations:
  - tex: \bar{x} = \frac{1}{N}\sum_{i=1}^{N} x_i
    spoken: "x barra é igual a um sobre N vezes a soma dos x i, de i igual a um até N"
  - tex: \sigma_{\bar{x}} = \frac{\sigma}{\sqrt{N}}
    spoken: "sigma de x barra é igual a sigma sobre raiz de N"
claims:
  - id: claim-001
    text: "Com desvio padrão de 0,08 s por medida, a média de 100 medidas tem incerteza de 0,008 s"
    type: number
    check: compute
    formula: mean_uncertainty_100
    expected: 0.008
    unit: s
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Com um ângulo de 7,2° e 5000 estádios entre as cidades, a circunferência da Terra dá 250 000 estádios"
    type: number
    check: compute
    formula: eratosthenes_stadia
    expected: 250000
    unit: estádios
    tolerance: 0.001
    status: calculated
  - id: claim-003
    text: "Eratóstenes estimou a circunferência da Terra por volta de 240 a.C. comparando a sombra do Sol em Siene (atual Assuã) e em Alexandria"
    type: date
    check: source
    sources: ["https://perimeterinstitute.ca/news/how-measure-earths-circumference", "https://kids.britannica.com/students/article/Eratosthenes/322583"]
    status: pending
  - id: claim-004
    text: "Legendre publicou o método dos mínimos quadrados em 1805, e Gauss publicou sua versão em 1809, ligando-o à distribuição normal"
    type: date
    check: source
    sources: ["https://encyclopediaofmath.org/wiki/Legendre,_Adrien-Marie", "https://www.britannica.com/topic/normal-distribution"]
    status: pending
resources:
  - kind: study
    title: "1.7: Números significativos (precisão, exatidão, incerteza; Física Universitária I, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/01%3A_Unidades_e_medidas/1.07%3A_N%C3%BAmeros_significativos
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Avaliação de dados de medição: uma introdução ao GUM (INTROGUM 2009, Inmetro, PDF)"
    url: https://www.gov.br/inmetro/pt-br/assuntos/metrologia-cientifica/documentos-tecnicos-em-metrologia/introgum_2009.pdf
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "NIST Technical Note 1297: Guidelines for Evaluating and Expressing the Uncertainty of NIST Measurement Results"
    url: https://www.nist.gov/pml/pubs/tn1297/index
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "JCGM 100:2008 (GUM) - Guide to the expression of uncertainty in measurement (BIPM)"
    url: https://www.bipm.org/doi/10.59161/JCGM100-2008E
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures on Physics, Vol. I, Ch. 5: Time and Distance"
    url: https://www.feynmanlectures.caltech.edu/I_05.html
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Intro to significant figures (Khan Academy)"
    url: "https://en.khanacademy.org/districts-courses/grade-8-fl-best/x227e06ed62a17eb7:exponents-factoring-scientific-notation/x227e06ed62a17eb7:significant-figures/v/significant-figures"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Cronometre a queda de uma bola várias vezes e cada medida sai diferente: 0,97 s, 1,05 s, 1,02 s... A bola não mudou; quem mudou foi seu dedo no cronômetro. Toda medida carrega um pouco de sorteio. Por isso um resultado científico vem sempre com a incerteza: $1{,}01 \pm 0{,}03$ s.

Há dois tipos de erro. O aleatório espalha as medidas para os dois lados, e a média cancela boa parte dele. O sistemático empurra tudo para o mesmo lado (um cronômetro atrasado, uma régua gasta), e nenhuma média resolve; é preciso achar a causa.

Há 2200 anos, Eratóstenes mediu o tamanho da Terra com sombras e uma distância entre duas cidades. O resultado dependia da medida do ângulo e da distância, e a incerteza delas é o que define quanto o número final vale.

## Equação

$$
\sigma_{\bar{x}} = \frac{\sigma}{\sqrt{N}}
$$

```lab
measure
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $x_i$ | cada medida | a da grandeza |
| $N$ | número de medidas | — |
| $\bar{x}$ | média das medidas | a da grandeza |
| $\sigma$ | desvio padrão: espalhamento de uma medida típica | a da grandeza |
| $\sigma_{\bar{x}}$ | incerteza da média | a da grandeza |

## Exemplo

Se cada medida tem desvio padrão de 0,08 s, uma medida só vale $\pm 0{,}08$ s. A média de 100 medidas vale $0{,}08/\sqrt{100} = \pm 0{,}008$ s: dez vezes melhor. Para ganhar mais um fator 10, seriam necessárias 10 000 medidas. Precisão custa caro.

Eratóstenes: ao meio-dia em Siene o Sol não fazia sombra; em Alexandria fazia um ângulo de 7,2°, ou 1/50 de volta. Com 5000 estádios entre as cidades, a Terra teria 250 000 estádios de circunferência, um valor próximo do real, dependendo do tamanho do estádio que ele usou.

## Onde isso volta

Estatística e ruído, a detecção de exoplanetas (a média de muitos pontos revela quedas de brilho minúsculas) e qualquer descoberta: uma "anomalia" só conta se for bem maior que a incerteza.

## Pergunta-ponte

Por que a média de muitas medidas segue a forma de um sino?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "erro de medida é engano de quem mediu" | "erro de medida é inevitável; a incerteza diz o tamanho dele" |
| "mais medidas eliminam todo erro" | "mais medidas reduzem o erro aleatório; o sistemático continua lá" |
