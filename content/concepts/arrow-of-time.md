---
id: arrow-of-time
title: A seta do tempo
summary: As leis microscópicas funcionam igual nos dois sentidos do tempo; a diferença entre passado e futuro vem do aumento da entropia a partir de um começo muito ordenado.
recap:
  - "Um filme de duas bolas de bilhar faz sentido rodado ao contrário; um copo quebrando, não."
  - "As leis do movimento não escolhem sentido; a entropia, sim."
  - "Inverter todas as velocidades desfaria a mistura, mas exige precisão perfeita: qualquer erro cresce a cada colisão."
  - "A seta existe porque o universo começou num estado de entropia muito baixa, e por que foi assim ainda é uma pergunta aberta."
levels: [zero]
consensus: broad
tags:
  area: physics/thermodynamics
  topics: [entropy, information]
  era: modern-revolution
  people: [ludwig-boltzmann, arthur-eddington]
  events: [eddington-arrow]
equations:
  - tex: S = k_B \ln W
    spoken: "S é igual a k B vezes logaritmo natural de W"
claims:
  - id: claim-001
    text: "Misturar 100 partículas meio a meio entre dois lados dá cerca de 96 bits de entropia de mistura"
    type: number
    check: compute
    formula: mixing_100_bits
    expected: 96.35
    unit: bits
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Eddington cunhou a expressão time's arrow (seta do tempo) nas Gifford Lectures de 1927, publicadas em The Nature of the Physical World (1928)"
    type: attribution
    check: source
    sources: ["https://todayinsci.com/E/Eddington_Arthur/EddingtonArthur-Entropy-Quotations.htm", "https://mathshistory.st-andrews.ac.uk/Extras/Eddington_Gifford/"]
    status: pending
  - id: claim-003
    text: "A fórmula S = k log W está gravada no túmulo de Boltzmann, em Viena"
    type: attribution
    check: source
    sources: ["https://WWW.ATLASOBSCURA.COM/places/boltzmanns-grave"]
    status: pending
resources:
  - kind: read
    title: "Thermodynamic Asymmetry in Time (Stanford Encyclopedia of Philosophy)"
    url: "https://plato.stanford.edu/entries/time-thermo/"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 46: Ratchet and pawl (reversibility, irreversibility, order and entropy)"
    url: "https://www.feynmanlectures.caltech.edu/I_46.html"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "15.6: Entropia e a Segunda Lei da Termodinâmica - Transtorno e Indisponibilidade de Energia (OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)/15:_Termodinamica/15.06:_Entropia_e_a_Segunda_Lei_da_Termodin%C3%A2mica_-_Transtorno_e_Indisponibilidade_de_Energia"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: watch
    title: "The Arrow of Time and How to Reverse It (PBS Space Time)"
    url: "https://www.pbs.org/video/the-arrow-of-time-and-how-to-reverse-it-mnqgfq/"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Filme duas bolas de bilhar se chocando e rode ao contrário: ninguém percebe. Filme um ovo caindo e quebrando e rode ao contrário: todo mundo ri. As leis de Newton (e as da quântica, com uma exceção minúscula na força fraca) funcionam igual nos dois sentidos. Então de onde vem a diferença entre passado e futuro?

A resposta está na contagem de arranjos. Ovo inteiro é um estado raro; ovo espalhado no chão tem incontáveis arranjos. Indo para a frente no tempo, o sistema vai para os estados mais numerosos. Para voltar, cada molécula teria que estar exatamente no lugar certo, com a velocidade exatamente oposta. No laboratório, você pode tentar: inverta as velocidades e veja o gás desfazer a mistura. Mas inverta depois de muitas colisões e pequenas imprecisões (do arredondamento e do próprio passo da simulação) crescem a cada choque e estragam tudo.

Sobra uma pergunta profunda: se a entropia total vem aumentando desde sempre, ela começou baixa. Por que o universo nasceu tão ordenado? A cosmologia ainda não tem resposta fechada.

## Equação

$$
S = k_B \ln W
$$

```lab
reverse
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $S$ | entropia | J/K |
| $k_B$ | constante de Boltzmann | J/K |
| $W$ | número de arranjos microscópicos compatíveis com o que se vê | — |
| $\ln$ | logaritmo natural | — |

## Exemplo

Cem partículas, todas à esquerda: um único arranjo, $W = 1$, entropia de mistura zero (contando só esquerda e direita). Meio a meio: $W = \binom{100}{50} \approx 10^{29}$, ou cerca de 96 bits. Para o gás "voltar" ele teria que achar, por acaso, o único arranjo com todas à esquerda entre cerca de $10^{30}$ ($2^{100}$) possíveis.

## Onde isso volta

A memória e a causalidade (lembramos do passado porque registrar informação aumenta entropia), a cosmologia (o Big Bang de baixa entropia) e o paradoxo da informação: se a física fundamental é reversível, a informação do que cai num buraco negro não pode simplesmente sumir.

## Pergunta-ponte

Se a entropia mede arranjos, quanto de energia está realmente disponível para fazer algo útil?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a física proíbe voltar no tempo" | "as leis microscópicas não proíbem; a volta é estatisticamente improvável demais" |
| "a seta do tempo está explicada" | "o aumento da entropia está explicado; por que o universo começou com entropia tão baixa ainda é aberto" |
