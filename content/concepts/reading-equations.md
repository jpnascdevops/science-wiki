---
id: reading-equations
title: Como ler uma equação
summary: Uma equação é uma frase. Este conceito ensina a gramática dela.
levels: [zero]
prerequisites: []
leads_to: [force-and-motion, quantum-basics]
tags:
  area: math/notation
  topics: [foundations]
equations:
  - tex: E = m c^2
    spoken: "E é igual a m c ao quadrado"
  - tex: 3 \times 10^{8}
    spoken: "três vezes dez à oitava"
  - tex: \frac{a}{b}
    spoken: "a sobre b"
claims:
  - text: "3 × 10^8 é igual a 300.000.000"
    type: definition
    check: compute
    formula: three_times_ten_to_eight
    expected: 300000000
    tolerance: 0.0
    status: verified
resources:
  - kind: study
    title: "Khan Academy: Biblioteca de Física"
    url: https://pt.khanacademy.org/science/physics
    level: zero
    lang: pt
    checked_at: null
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma equação é uma frase. O sinal de igual é o verbo "é", e as letras são apelidos de coisas que podem ser medidas: $m$ é massa, $v$ é velocidade, $t$ é tempo. Duas letras encostadas significam multiplicar.

A analogia da frase falha num ponto: numa equação, cada lado precisa ter a mesma unidade. Não dá para dizer que metros "é" segundos.

## Equação

$$
E = m\,c^2
$$

## Variáveis

| Escrito | Significa | Fala-se |
| --- | --- | --- |
| $a\,b$ | a vezes b | a b |
| $\frac{a}{b}$ | a dividido por b | a sobre b |
| $a^2$ | a vezes a | a ao quadrado |
| $\sqrt{a}$ | o número que, ao quadrado, dá a | raiz de a |
| $m_0$ | a massa no início (o índice é um rótulo) | m zero |
| $\Delta t$ | quanto t mudou | delta t |
| $3\times10^{8}$ | 300.000.000 | três vezes dez à oitava |
| $6\times10^{-8}$ | 0,00000006 | seis vezes dez à menos oito |
| $\propto$ | cresce na mesma proporção | é proporcional a |

## Exemplo

Em $E = m c^2$, se $m$ dobra, $E$ dobra. Se $c$ dobrasse, $E$ quadruplicaria, porque $c$ está ao quadrado. Ler uma equação é, antes de tudo, perceber o que cresce com o quê.

## Onde isso volta

Toda equação da trilha usa essa gramática. Em especial a notação científica, porque buracos negros envolvem números como $10^{67}$ anos.

## Pergunta-ponte

Com a gramática em mãos, qual é a primeira frase da física? A que liga força e movimento.

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a equação prova que..." | "a equação descreve que..." |
| "dez elevado a oito vezes três" | "três vezes dez à oitava" |
