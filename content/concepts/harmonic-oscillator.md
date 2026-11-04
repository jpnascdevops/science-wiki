---
id: harmonic-oscillator
title: Oscilador harmônico
summary: Quando a força puxa de volta proporcionalmente ao desvio, o movimento é uma oscilação senoidal com período que não depende da amplitude.
recap:
  - "Força de volta proporcional ao desvio (F = −kx): o movimento é um seno."
  - "Período T = 2π √(m/k): mais massa, mais lento; mola mais dura, mais rápido."
  - "O período não depende de quanto se puxou (para molas ideais)."
  - "Quase tudo perto do equilíbrio se comporta assim: molas, pêndulos pequenos, átomos num cristal, circuitos."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [oscillations, energy]
  era: scientific-revolution
  people: [robert-hooke, christiaan-huygens]
  events: [horologium]
equations:
  - tex: F = -k\,x
    spoken: "F é igual a menos k x"
  - tex: m\,\ddot{x} = -k\,x
    spoken: "m vezes x dois pontos é igual a menos k x"
  - tex: T = 2\pi\sqrt{\frac{m}{k}}
    spoken: "T é igual a dois pi vezes a raiz quadrada de m sobre k"
claims:
  - id: claim-001
    text: "Uma massa de 0,5 kg numa mola de 20 N/m oscila com período de cerca de 0,99 s"
    type: number
    check: compute
    formula: spring_period_05kg_20nm
    expected: 0.993
    unit: s
    tolerance: 0.002
    status: calculated
  - id: claim-002
    text: "Robert Hooke publicou a lei da elasticidade como o anagrama ceiiinosssttuv em 1676 e a solução ut tensio, sic vis em 1678"
    type: date
    check: source
    sources: ["https://www.aip.org/library/ex-libris-universum/introducing-laws-of-physics", "https://en.wikipedia.org/wiki/Hooke%27s_law"]
    status: pending
resources:
  - kind: watch
    title: "MIT OCW 8.03SC Lecture 1 - Periodic Oscillations, Harmonic Oscillators (Yen-Jie Lee; Lecture 2 covers damping)"
    url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/lecture-1"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "PhET - Massas e Molas (HTML5, pt_BR)"
    url: "https://phet.colorado.edu/pt_BR/simulations/masses-and-springs"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Física Universitária (OpenStax, PT) cap. 16 - Movimento oscilatório e ondas (16.3 MHS, 16.5 energia, 16.7 amortecido, 16.8 ressonância)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)/16%3A_Movimento_oscilatorio_e_ondas"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 21 - The Harmonic Oscillator"
    url: "https://feynmanlectures.caltech.edu/I_21.html"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 23 - Resonance (damped and forced oscillator)"
    url: "https://feynmanlectures.caltech.edu/I_23.html"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "Oscilações (E. J. T. Manganote, IFGW/Unicamp) - MHS, pêndulos, MHS amortecido, ressonância"
    url: "https://sites.ifi.unicamp.br/graduacao/files/2021/04/Modulo-02_Oscilacoes.pdf"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Puxe uma massa presa numa mola e solte. A mola puxa de volta, a massa passa do centro, a mola freia e puxa para o outro lado. Vai e volta. Se a força de volta é proporcional ao desvio (a lei de Hooke), o movimento tem uma forma perfeita: um seno no tempo.

O detalhe surpreendente: o tempo de ida e volta não depende de quanto você puxou. Puxando mais, a força é maior e a massa corre mais rápido, compensando exatamente a distância maior. Por isso osciladores servem para medir o tempo: relógios de pêndulo, de quartzo e atômicos são osciladores.

E o oscilador está em todo lugar porque qualquer coisa perto de um ponto de equilíbrio estável sente, em primeira aproximação, uma força proporcional ao desvio.

## Equação

$$
T = 2\pi\sqrt{\frac{m}{k}}
$$

```lab
spring
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $x$ | desvio do equilíbrio | m |
| $\ddot x$ | aceleração (segunda derivada da posição) | m/s² |
| $k$ | constante da mola (rigidez) | N/m |
| $m$ | massa | kg |
| $T$ | período | s |

## Exemplo

Uma massa de 0,5 kg numa mola de 20 N/m: $T = 2\pi\sqrt{0{,}5/20} \approx 0{,}99$ s, quase um segundo por vaivém. Quadruplicando a massa, o período dobra. Com atrito fraco, a amplitude cai aos poucos, mas o ritmo quase não muda.

## Onde isso volta

O pêndulo para ângulos pequenos, ondas (cada pedacinho de uma corda é um oscilador), circuitos LC, ressonância, vibrações de moléculas e o oscilador harmônico quântico, cuja energia vem em degraus.

## Pergunta-ponte

E um pêndulo, que balança com amplitudes grandes, também tem período fixo?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "puxando mais, demora mais para voltar" | "numa mola ideal, o período é o mesmo para qualquer amplitude" |
| "a mola perde força com o tempo" | "o que faz a oscilação diminuir é o atrito, que transforma energia em calor" |

## Nível técnico

A solução geral é $x = A\cos(\omega t + \varphi)$ com $\omega = \sqrt{k/m}$. Com amortecimento $b\dot x$, $x \propto e^{-bt/2m}\cos(\omega' t)$, com $\omega' = \sqrt{\omega^2 - (b/2m)^2}$; para $b \ge 2\sqrt{km}$ não há oscilação (crítico na igualdade, superamortecido acima). A energia $\tfrac12 m\dot x^2 + \tfrac12 kx^2$ é constante sem atrito. Perto de um mínimo de qualquer potencial, $V(x) \approx V_0 + \tfrac12 V''(x_0)(x - x_0)^2$: é por isso que o oscilador aparece em toda a física.
