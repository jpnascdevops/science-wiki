---
id: what-is-physics
title: O que é física e o método científico
summary: Física é tentar descrever a natureza com leis simples e testá-las contra medidas; uma lei vale enquanto os experimentos não a derrubam.
recap:
  - "Física busca regras simples que expliquem muitos fenômenos diferentes."
  - "O método: observar, propor uma lei, prever, medir, comparar. Se a medida discorda, a lei cai ou muda."
  - "Uma boa teoria arrisca previsões que poderiam dar errado."
  - "Toda lei tem um domínio de validade: a de Newton funciona muito bem, até a relatividade e a quântica mostrarem onde não funciona."
levels: [zero]
consensus: established
tags:
  area: physics/method
  topics: [foundations, scientific-method]
  era: scientific-revolution
  people: [ibn-al-haytham, galileo-galilei, francis-bacon, karl-popper]
  events: [novum-organum]
equations:
  - tex: t = \sqrt{\frac{2h}{g}}
    spoken: "t é igual à raiz quadrada de dois h sobre g"
claims:
  - text: "Pela lei de queda livre, um objeto solto de 5 m leva cerca de 1,01 s para chegar ao chão"
    type: number
    check: compute
    formula: fall_time_5m
    expected: 1.01
    unit: s
    tolerance: 0.002
    status: verified
  - text: "Ibn al-Haytham, no Livro da Óptica (escrito por volta de 1011 a 1021), defendeu testar ideias sobre a luz e a visão com experimentos controlados"
    type: attribution
    check: source
    sources: ["https://en.wikipedia.org/wiki/Book_of_Optics", "https://www.historyofinformation.com/detail.php?id=2047"]
    status: verified
  - text: "Francis Bacon publicou o Novum Organum em 1620, defendendo um método indutivo baseado em experimentos"
    type: date
    check: source
    sources: ["https://www.Britannica.Com/biography/Francis-Bacon-Viscount-Saint-Alban/Thought-and-writings"]
    status: verified
  - text: "Karl Popper propôs a falseabilidade como critério de ciência em A Lógica da Pesquisa Científica (original alemão de 1934, com data de impressão de 1935; edição inglesa de 1959)"
    type: date
    check: source
    sources: ["https://en.wikipedia.org/wiki/The_Logic_of_Scientific_Discovery"]
    status: verified
resources:
  - kind: study
    title: "1.2: O escopo e a escala da física (Física Universitária I, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/01%3A_Unidades_e_medidas/1.02%3A_O_escopo_e_a_escala_da_f%C3%ADsica
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures on Physics, Vol. I, Ch. 1: Atoms in Motion"
    url: https://feynmanlectures.caltech.edu/I_01.html
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Scientific method (Britannica)"
    url: https://www.britannica.com/science/scientific-method
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Thought and writings of Francis Bacon (Britannica)"
    url: https://www.Britannica.Com/biography/Francis-Bacon-Viscount-Saint-Alban/Thought-and-writings
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

A física começa com uma aposta: por trás da bagunça do mundo há regras simples. A maçã caindo, a Lua girando e a maré subindo parecem coisas diferentes, mas a mesma lei explica as três.

Como saber se uma regra é boa? Ninguém vota. Você usa a regra para prever um número, mede esse número e compara. Se bate, a regra sobrevive (por enquanto). Se não bate, ela cai ou precisa mudar. Ibn al-Haytham já fazia isso com a luz no século XI; Galileu fez com bolas rolando em rampas. No século XX, Popper resumiu a ideia: uma teoria científica é a que poderia ser derrubada por um experimento.

## Equação

Galileu mediu que a altura de queda cresce com o quadrado do tempo; na forma moderna, isso fica:

$$
t = \sqrt{\frac{2h}{g}}
$$

```lab
fit-law
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $t$ | tempo de queda | s |
| $h$ | altura de onde o objeto é solto | m |
| $g$ | aceleração da gravidade (≈ 9,8 na Terra) | m/s² |

## Exemplo

A lei prevê que de 5 m o tempo de queda é $\sqrt{2 \times 5 / 9{,}8} \approx 1{,}01$ s. De 20 m, quatro vezes mais alto, o tempo só dobra: cerca de 2 s. Essa é uma previsão arriscada: se você medisse 4 s, a lei estaria errada. No laboratório acima, os pontos são medidas com erro; a lei com expoente 0,5 é a que passa por elas.

## Onde isso volta

Todo conceito desta wiki é uma lei que sobreviveu a testes, dentro de um domínio. A medida e a incerteza dizem quando uma discordância é real ou só erro de medida. A história da física é cheia de leis que valiam num domínio e foram ampliadas: Newton dentro de Einstein, Einstein dentro de algo que ainda não conhecemos.

## Pergunta-ponte

Se toda medida tem erro, como saber se a lei falhou ou se foi a régua?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a ciência prova as coisas" | "a ciência testa; uma lei ganha confiança cada vez que sobrevive a um teste que poderia derrubá-la" |
| "é só uma teoria" | "em ciência, teoria é uma explicação ampla e muito testada, não um palpite" |
| "Einstein provou que Newton estava errado" | "Einstein mostrou onde Newton deixa de valer; para velocidades baixas e gravidade fraca, Newton continua excelente" |
