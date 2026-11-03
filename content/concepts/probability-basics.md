---
id: probability-basics
title: Probabilidade
summary: Probabilidade mede o quanto esperar que algo aconteça; com muitas repetições, as frequências se aproximam dela.
recap:
  - "Probabilidade é um número de 0 (impossível) a 1 (certo)."
  - "Com resultados igualmente prováveis: casos favoráveis dividido por casos possíveis."
  - "Eventos independentes: a chance de os dois acontecerem é o produto das chances."
  - "Lei dos grandes números: repetindo muito, a frequência observada encosta na probabilidade."
levels: [zero]
consensus: established
tags:
  area: math/probability
  topics: [foundations, statistics]
  era: scientific-revolution
  people: [blaise-pascal, pierre-de-fermat, christiaan-huygens, andrey-kolmogorov]
  events: [pascal-fermat-letters]
equations:
  - tex: P(A) = \frac{\text{casos favoráveis}}{\text{casos possíveis}}
    spoken: "P de A é igual a casos favoráveis sobre casos possíveis"
  - tex: P(A \text{ e } B) = P(A)\cdot P(B)
    spoken: "P de A e B é igual a P de A vezes P de B, se forem independentes"
  - tex: P(\text{não } A) = 1 - P(A)
    spoken: "P de não A é igual a um menos P de A"
claims:
  - text: "A chance de a soma de dois dados dar 7 é 6 em 36, cerca de 16,7%"
    type: number
    check: compute
    formula: two_dice_seven_percent
    expected: 16.67
    unit: "%"
    tolerance: 0.001
    status: verified
  - text: "A chance de tirar pelo menos um 6 em quatro lançamentos de um dado é cerca de 51,8%"
    type: number
    check: compute
    formula: at_least_one_six_in_four_percent
    expected: 51.77
    unit: "%"
    tolerance: 0.001
    status: verified
  - text: "A troca de cartas entre Pascal e Fermat em 1654 sobre jogos de azar é considerada o início da teoria da probabilidade; Huygens publicou De ratiociniis in ludo aleae em 1657"
    type: date
    check: source
    sources: ["https://en.wikipedia.org/wiki/History_of_probability"]
    status: verified
  - text: "Kolmogorov deu a fundamentação axiomática da probabilidade em 1933"
    type: date
    check: source
    sources: ["https://ar5iv.arxiv.org/html/1802.06071"]
    status: verified
resources:
  - kind: study
    title: "3: Tópicos de probabilidade (Estatísticas introdutórias, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Estatisticas_introdutorias_(OpenStax)/03%3A_T%C3%B3picos_de_probabilidade
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "11: Sequências, Probabilidade e Teoria da Contagem (Pré-cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/11%3A_Sequ%C3%AAncias%2C_Probabilidade_e_Teoria_da_Contagem
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures on Physics, Vol. I, Ch. 6: Probability"
    url: https://feynmanlectures.caltech.edu/I_06.html
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 18.05 Introduction to Probability and Statistics (Spring 2022)"
    url: https://ocw.mit.edu/courses/mathematics/18-05-introduction-to-probability-and-statistics-spring-2022/
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "History of probability (Wikipedia)"
    url: https://en.wikipedia.org/wiki/History_of_probability
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Jogue um dado uma vez e o resultado é imprevisível. Jogue mil vezes e cada face aparece perto de 1/6 das vezes. A probabilidade fala do segundo caso: ela não diz o que vai sair agora, diz como os resultados se distribuem quando se repete muito.

Com dois dados, a soma 7 é a mais comum, porque há seis jeitos de fazê-la (1+6, 2+5, ...) e só um jeito de fazer 2 ou 12. Somando muitos dados, as somas do meio dominam tanto que o histograma vira um sino. Esse sino vai aparecer em toda medida com erro.

A teoria nasceu de apostas: em 1654, Pascal e Fermat trocaram cartas sobre como dividir o prêmio de um jogo interrompido.

## Equação

$$
P(A \text{ e } B) = P(A)\cdot P(B)
$$

```lab
dice
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $P(A)$ | probabilidade do evento $A$ | de 0 a 1 (ou %) |
| $A, B$ | eventos (por exemplo, "sair 6") | — |
| independentes | o resultado de um não muda a chance do outro | — |

## Exemplo

Pelo menos um 6 em quatro lançamentos: é mais fácil calcular o contrário. A chance de não sair 6 num lançamento é 5/6; em quatro lançamentos independentes, $(5/6)^4 \approx 0{,}482$. Então a chance de sair pelo menos um 6 é $1 - 0{,}482 \approx 51{,}8\%$: uma aposta levemente favorável.

## Onde isso volta

Estatística e ruído (toda medida é um sorteio em volta do valor real), a física estatística (temperatura e entropia saem de contar arranjos prováveis) e a mecânica quântica, onde, na interpretação padrão, a probabilidade não é falta de informação: é a própria regra da natureza.

## Pergunta-ponte

Se cada medida é um pequeno sorteio, como juntar várias medidas para chegar mais perto do valor real?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "saiu cara cinco vezes, agora vem coroa" | "uma moeda não tem memória: a próxima continua 50%" |
| "probabilidade de 50% quer dizer metade das vezes, sempre" | "quer dizer perto da metade quando se repete muito; em poucas jogadas, a frequência varia bastante" |
