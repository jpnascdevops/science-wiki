---
id: differential-equations
title: Equações diferenciais simples
summary: Uma equação diferencial diz como uma grandeza muda a partir do valor que ela tem agora; resolvê-la é descobrir a história inteira a partir dessa regra.
recap:
  - "Equação diferencial: uma regra que liga uma grandeza ao ritmo em que ela muda."
  - "dN/dt = −kN dá decaimento exponencial; x'' = −ω²x dá oscilação."
  - "Quase toda lei da física é uma equação diferencial: dada a situação agora, ela diz o próximo instante."
  - "Quando não há solução em fórmula, o computador anda passo a passo (método de Euler e melhores)."
levels: [zero, technical]
consensus: established
tags:
  area: math/calculus
  topics: [calculus, foundations]
  era: classical-mechanics-era
  people: [isaac-newton, gottfried-leibniz, leonhard-euler]
  events: []
equations:
  - tex: \frac{\mathrm{d}N}{\mathrm{d}t} = -k\,N \;\Rightarrow\; N(t) = N_0\,e^{-kt}
    spoken: "d N d t é igual a menos k N, logo N de t é igual a N zero vezes e elevado a menos k t"
  - tex: y_{n+1} = y_n + h\,f(y_n)
    spoken: "y n mais um é igual a y n mais h vezes f de y n"
claims:
  - id: claim-001
    text: "Para dN/dt = −N com N(0) = 1, o valor exato em t = 1 é cerca de 0,368"
    type: number
    check: compute
    formula: exact_decay_at_1
    expected: 0.3679
    unit: ""
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Com o método de Euler e passo 0,5, sai 0,25 em t = 1"
    type: number
    check: compute
    formula: euler_h05_at_1
    expected: 0.25
    unit: ""
    tolerance: 0.001
    status: calculated
  - id: claim-003
    text: "Com passo 0,1, o método de Euler dá cerca de 0,349"
    type: number
    check: compute
    formula: euler_h01_at_1
    expected: 0.3487
    unit: ""
    tolerance: 0.001
    status: calculated
  - id: claim-004
    text: "Euler descreveu o método numérico que leva seu nome em Institutiones calculi integralis (1768 a 1770)"
    type: date
    check: source
    sources: ["https://en.wikipedia.org/wiki/Euler_method", "https://www.britannica.com/topic/Institutiones-calculi-integralis"]
    status: pending
resources:
  - kind: watch
    title: "3Blue1Brown - Differential equations, studying the unsolvable (DE1: pendulum equation, basic numerical methods)"
    url: "https://www.3blue1brown.com/lessons/differential-equations"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Khan Academy - Euler's method (Differential equations, AP Calculus BC) [video index page; YouTube id q87L9R9v274]"
    url: "https://rosetta.to/u/khanacademy/euler-s-method-differential-equations-ap-calculus-bc-khan-academy"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "freeCodeCamp (PT) - Método de Euler explicado com exemplos"
    url: "https://www.freecodecamp.org/portuguese/news/metodo-de-euler-explicado-com-exemplos/"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "Algoritmos Numéricos, cap. 7 - Equações diferenciais ordinárias (slides, DCC/UFMG; método de Euler, Runge-Kutta)"
    url: "https://homepages.dcc.ufmg.br/~ffcampos/slide/7_edo.pdf"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Wikipedia - Euler method (derivation, error analysis, history)"
    url: "https://en.wikipedia.org/wiki/Euler_method"
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Muitas leis não dizem quanto algo vale; dizem como algo muda. "A quantidade de átomos radioativos cai num ritmo proporcional a quantos ainda existem." "A aceleração de um corpo é a força dividida pela massa." Regras assim, que ligam uma grandeza ao seu ritmo de mudança, são equações diferenciais.

Resolver uma equação diferencial é transformar a regra local ("como muda agora") na história completa ("quanto vale em cada instante"). Às vezes sai uma fórmula, como a exponencial do decaimento. Muitas vezes não sai, e aí se faz o que o computador faz: olha a inclinação de agora, dá um passinho, recalcula, dá outro. É o método de Euler. Passos menores seguem melhor a curva, mas há casos em que até passos pequenos acumulam erro.

## Equação

$$
\frac{\mathrm{d}N}{\mathrm{d}t} = -k\,N \;\Rightarrow\; N(t) = N_0\,e^{-kt}
$$

```lab
euler-steps
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $N$ | a grandeza que muda | qualquer |
| $\mathrm{d}N/\mathrm{d}t$ | ritmo de mudança de $N$ | unidade de $N$ por s |
| $k$ | constante de decaimento | 1/s |
| $h$ | tamanho do passo no método numérico | s |
| $y_n$ | valor aproximado no passo $n$ | — |

## Exemplo

Para $\mathrm{d}N/\mathrm{d}t = -N$, começando em 1, o valor exato em $t = 1$ é $e^{-1} \approx 0{,}368$. Euler com passo 0,5 dá dois passos de "tirar metade": $0{,}5^2 = 0{,}25$, um erro grande. Com passo 0,1, dez passos de "tirar 10%": $0{,}9^{10} \approx 0{,}349$, bem mais perto.

## Onde isso volta

O oscilador harmônico, o pêndulo, os circuitos, o calor se espalhando, as ondas e a equação de Schrödinger são equações diferenciais. O caos aparece quando a solução é extremamente sensível ao ponto de partida.

## Pergunta-ponte

Qual é a equação diferencial mais importante da física, a que aparece em quase tudo que vibra?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "resolver é achar um número" | "resolver é achar uma função: o valor em cada instante" |
| "o computador resolve exatamente" | "o computador aproxima passo a passo; o erro depende do método e do tamanho do passo" |

## Nível técnico

O método de Euler tem erro global proporcional a $h$ (primeira ordem). Runge-Kutta de quarta ordem erra como $h^4$. Para sistemas que conservam energia, métodos simpléticos (como o Euler semi-implícito ou o de Verlet) evitam o crescimento artificial da energia que o Euler explícito produz no oscilador: para $\ddot x = -x$, cada passo multiplica a energia por $1 + h^2$. O teorema de existência e unicidade (Picard-Lindelöf) garante solução única quando $f$ é Lipschitz (basta ser suave), ao menos por um intervalo de tempo: dado o estado agora, o futuro está determinado.
