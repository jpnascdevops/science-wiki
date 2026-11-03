---
id: quantum-basics
title: Básico de quântica
summary: Estados quânticos podem ser superposições; medir dá resultados com probabilidades.
recap:
  - "Um estado quântico pode ser uma superposição de resultados."
  - "Medir dá um resultado, com probabilidade igual ao quadrado da amplitude."
  - "A evolução de um sistema isolado é unitária: reversível, preserva informação."
levels: [zero]
consensus: established
tags:
  area: physics/quantum-mechanics
  topics: [foundations]
  era: modern-revolution
  people: [erwin-schrodinger, werner-heisenberg, paul-dirac]
  arxiv_category: quant-ph
equations:
  - tex: '|\psi\rangle = \alpha|0\rangle + \beta|1\rangle'
    spoken: "ket psi é igual a alfa vezes ket zero mais beta vezes ket um"
  - tex: '|\alpha|^2 + |\beta|^2 = 1'
    spoken: "o módulo de alfa ao quadrado mais o módulo de beta ao quadrado é igual a um"
  - tex: \rho \to U \rho\, U^\dagger
    spoken: "rô vai em U rô U adaga"
claims:
  - text: "Um estado com amplitudes 1/√2 tem 50% de chance para cada resultado"
    type: number
    check: compute
    formula: pair_amplitude_probability
    expected: 0.5
    tolerance: 0.0001
    status: verified
  - text: "A evolução quântica de um sistema isolado é unitária e preserva informação"
    type: conceptual
    check: human
    sources: [https://ar5iv.arxiv.org/html/2006.06872]
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Mecânica quântica"
    url: https://pt.wikipedia.org/wiki/Qu%C3%A2ntica
    level: zero
    lang: pt
    checked_at: null
  - kind: watch
    title: "Quantum Mechanics - Part 1: Crash Course Physics #43"
    url: "https://www.pbs.org/video/quantum-mechanics-part-1-crash-course-physics-43-nu4ylp/"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Some light quantum mechanics (with minutephysics) (3Blue1Brown)"
    url: "https://www.youtube.com/watch?v=MzRCDLre1b4"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma partícula quântica pode estar numa superposição: nem 0 nem 1, mas uma combinação dos dois, até ser medida. Ao medir, sai 0 ou 1, com probabilidades dadas pelos pesos da combinação.

A imagem da moeda girando no ar ajuda, mas falha: a moeda tem um lado definido que você só não conhece; a superposição não é falta de informação, é outro tipo de estado.

## Equação

$$
|\psi\rangle = \alpha|0\rangle + \beta|1\rangle
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $\lvert\psi\rangle$ | o estado do sistema ("ket psi") |
| $\lvert 0\rangle,\ \lvert 1\rangle$ | os dois resultados possíveis |
| $\alpha,\ \beta$ | amplitudes; a probabilidade é o quadrado do módulo |
| $U$ | evolução no tempo, reversível |

## Exemplo

Com $\alpha = \beta = 1/\sqrt2$, cada resultado tem probabilidade $(1/\sqrt2)^2 = 0{,}5$.

## Onde isso volta

A evolução $\rho\to U\rho U^\dagger$ é reversível: em princípio, dá para voltar ao estado inicial. Essa é a regra que a evaporação de buracos negros parecia violar.

## Pergunta-ponte

O que acontece quando duas partículas compartilham um único estado quântico?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a partícula está nos dois lugares ao mesmo tempo" | "ela está numa superposição; medir dá um resultado com certa probabilidade" |
| "observar é olhar com os olhos" | "medir é qualquer interação que registra o resultado" |
