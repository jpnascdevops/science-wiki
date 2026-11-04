---
id: information-entropy
title: Entropia de Shannon e informação
summary: A entropia de Shannon mede a surpresa média de uma fonte de mensagens, em bits; é a mesma matemática da entropia de Boltzmann, e apagar informação tem um custo físico mínimo.
recap:
  - "Informação é surpresa: um resultado certo não informa nada; um improvável informa muito."
  - "Entropia de Shannon: H = −Σ p log₂ p, em bits por símbolo."
  - "Uma moeda honesta dá 1 bit por lançamento; uma moeda que dá cara 90% das vezes, só 0,47."
  - "Apagar 1 bit custa no mínimo kT ln 2 de calor (Landauer): informação é física."
levels: [zero, technical]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [entropy, information]
  era: nuclear-age
  people: [claude-shannon, ludwig-boltzmann, rolf-landauer]
  events: [shannon-information]
equations:
  - tex: H = -\sum_i p_i \log_2 p_i
    spoken: "H é igual a menos a soma de p i vezes logaritmo na base dois de p i"
  - tex: E_{\min} = k_B T \ln 2
    spoken: "E mínima é igual a k B T vezes logaritmo natural de dois"
claims:
  - id: claim-001
    text: "Uma moeda que dá cara 90% das vezes tem entropia de cerca de 0,47 bit por lançamento"
    type: number
    check: compute
    formula: coin_90_entropy_bits
    expected: 0.469
    unit: bits
    tolerance: 0.002
    status: calculated
  - id: claim-002
    text: "A 300 K, o custo mínimo para apagar 1 bit é cerca de 2,9 × 10⁻²¹ J"
    type: number
    check: compute
    formula: landauer_300k_joule
    expected: 2.87e-21
    unit: J
    tolerance: 0.003
    status: calculated
  - id: claim-003
    text: "Claude Shannon publicou Uma Teoria Matemática da Comunicação em 1948, definindo a entropia da informação"
    type: date
    check: source
    sources: ["https://www.britannica.com/biography/Claude-Shannon", "https://www.britannica.com/topic/A-Mathematical-Theory-of-Communication"]
    status: pending
  - id: claim-004
    text: "Rolf Landauer mostrou em 1961 que apagar um bit dissipa no mínimo kT ln 2 de calor"
    type: date
    check: source
    sources: ["https://doi.org/10.1038/nature10872"]
    status: pending
resources:
  - kind: read
    title: "Information theory - Entropy (Britannica)"
    url: "https://www.britannica.com/science/information-theory/Entropy"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Claude Shannon (Britannica)"
    url: "https://www.britannica.com/biography/Claude-Shannon"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "A Mathematical Theory of Communication (Britannica topic page)"
    url: "https://www.britannica.com/topic/A-Mathematical-Theory-of-Communication"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Entropia da informação (Khan Academy em português)"
    url: "https://pt.khanacademy.org/computing/computer-science/informationtheory/moderninfotheory/v/information-entropy"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: watch
    title: "Reversing Entropy with Maxwell's Demon (PBS Space Time)"
    url: "https://www.pbs.org/video/reversing-entropy-with-maxwells-demon-fpqnz3/"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Se eu te digo que o Sol nasceu hoje, você não aprende nada: já sabia. Se digo que nevou em Fortaleza, você aprende muito. Informação é surpresa, e Shannon, em 1948, deu um número para ela: a quantidade de perguntas de sim ou não necessárias, em média, para descobrir o que saiu.

Uma moeda honesta precisa de uma pergunta por lançamento: 1 bit. Uma moeda viciada que quase sempre dá cara é previsível; dá para descrever uma sequência longa dela com bem menos bits. É assim que arquivos são comprimidos: o ZIP explora a previsibilidade.

A fórmula de Shannon tem a mesma forma da entropia de Gibbs e Boltzmann, só que em bits em vez de joules por kelvin. E a ligação é física: Landauer mostrou que apagar um bit de memória obriga a jogar uma quantidade mínima de calor no ambiente.

## Equação

$$
H = -\sum_i p_i \log_2 p_i
$$

```lab
shannon
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $H$ | entropia de Shannon | bits por símbolo |
| $p_i$ | probabilidade do resultado $i$ | — |
| $\log_2$ | logaritmo na base 2 | — |
| $E_{\min}$ | energia mínima dissipada para apagar 1 bit | J |

## Exemplo

Moeda com 90% de cara: $H = -(0{,}9\log_2 0{,}9 + 0{,}1\log_2 0{,}1) \approx 0{,}47$ bit. Mil lançamentos cabem, em média, em uns 470 bits em vez de 1000. Apagar um bit à temperatura ambiente custa pelo menos $k_B T\ln 2 \approx 2{,}9 \times 10^{-21}$ J; os chips atuais gastam muito mais que isso por operação.

## Onde isso volta

O demônio de Maxwell (que só é derrotado porque apagar a memória dele gera entropia), a entropia de emaranhamento na quântica e a curva de Page: a pergunta "a informação sai do buraco negro?" é, literalmente, uma conta de entropia (a de von Neumann, a versão quântica da de Shannon).

## Pergunta-ponte

Se apagar informação custa calor, o que acontece com a entropia quando a temperatura vai a zero?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "informação é o significado da mensagem" | "na teoria de Shannon, informação mede a surpresa, não o significado" |
| "entropia de Shannon e de Boltzmann são coisas diferentes que têm o mesmo nome" | "são a mesma fórmula; a física conta arranjos de moléculas e a informação conta mensagens possíveis" |

## Nível técnico

Para uma distribuição $p_i$, $H = -\sum p_i \log_2 p_i$ é máxima quando todos os $p_i$ são iguais ($H = \log_2 N$). O teorema da codificação de fonte diz que nenhum código sem perdas usa, em média, menos que $H$ bits por símbolo. A entropia de Gibbs $S = -k_B\sum p_i\ln p_i$ é $k_B\ln 2$ vezes $H$. O princípio de Landauer liga as duas: reduzir $H$ de um registrador em 1 bit exige aumentar a entropia do ambiente em pelo menos $k_B\ln 2$.
