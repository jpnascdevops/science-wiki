---
id: hamiltonian-mechanics
title: Mecânica hamiltoniana
summary: Descrevendo o sistema por posição e momento, a energia total (a hamiltoniana) gera o movimento; o estado inteiro vira um ponto no espaço de fase.
recap:
  - "Estado = posição e momento. Juntos, formam um ponto no espaço de fase."
  - "A hamiltoniana H (quase sempre a energia total) diz como o ponto se move."
  - "Num pêndulo, cada curva de energia constante é um movimento possível; a separatriz divide balançar de dar voltas."
  - "É a ponte direta para a mecânica quântica e a física estatística."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, foundations]
  era: nineteenth-century
  people: [william-rowan-hamilton, joseph-louis-lagrange]
  events: [hamilton-dynamics]
equations:
  - tex: \mathcal{H} = \frac{p^2}{2m} + V(q)
    spoken: "H cursivo é igual a p ao quadrado sobre dois m, mais V de q"
  - tex: \dot{q} = \frac{\partial \mathcal{H}}{\partial p}, \qquad \dot{p} = -\frac{\partial \mathcal{H}}{\partial q}
    spoken: "q ponto é igual à derivada parcial de H em relação a p; p ponto é igual a menos a derivada parcial de H em relação a q"
claims:
  - id: claim-001
    text: "Para um pêndulo de 1 kg e 1 m, a energia que separa balançar de dar voltas é cerca de 19,6 J (2 m g L)"
    type: number
    check: compute
    formula: pendulum_separatrix_energy
    expected: 19.61
    unit: J
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Hamilton publicou sua reformulação da mecânica em On a General Method in Dynamics (1834, 1835)"
    type: date
    check: source
    sources: ["https://www.maths.tcd.ie/pub/HistMath/People/Hamilton/Dynamics/"]
    status: pending
resources:
  - kind: watch
    title: "Leonard Susskind, The Theoretical Minimum Lecture 6 - Hamilton's Equations (phase space, harmonic oscillator)"
    url: "https://cosmolearning.org/video-lectures/hamiltons-equations"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Leonard Susskind, The Theoretical Minimum Lecture 7 - Liouville's Theorem & Phase Spaces"
    url: "https://cosmolearning.org/video-lectures/liouvilles-theorem-phase-spaces"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "David Tong, Lectures on Classical Dynamics (ch. 4 The Hamiltonian Formulation: Liouville, Poisson brackets, action-angle)"
    url: "https://damtp.cam.ac.uk/user/tong/dynamics.htm"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 8.09 Classical Mechanics III (Hamilton-Jacobi, action-angle, chaos)"
    url: "https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "UFPE FI595 Mecânica Clássica 2 - programa (formulação hamiltoniana, Liouville e espaço de fase, Noether; bibliografia em PT: Lemos) [ementa, não é apostila]"
    url: "https://Www.Ufpe.br/documents/39279/1214503/Mecanica_Classica2.pdf/1647a0a4-7c0d-4443-9394-697d11a4d112"
    level: technical
    lang: pt
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Para saber tudo sobre um pêndulo agora, basta saber o ângulo e quão rápido (com que momento) ele gira. Dois números. Desenhe um plano com o ângulo num eixo e o momento no outro: o estado inteiro do pêndulo é um ponto ali. Esse plano é o espaço de fase.

Com o tempo, o ponto anda. Como a energia não muda, ele anda sobre uma curva de energia constante. Balanços pequenos são ovais pequenos; balanços grandes, ovais maiores. Acima de uma energia crítica, o pêndulo passa por cima e gira sem parar, e as curvas deixam de fechar. A curva que separa os dois comportamentos é a separatriz.

Hamilton escreveu a mecânica toda assim: a energia total, escrita com posições e momentos, comanda o movimento com duas equações quase simétricas (com um sinal trocado). Parece só uma troca de variáveis, mas foi exatamente essa forma que a mecânica quântica herdou.

## Equação

$$
\dot{q} = \frac{\partial \mathcal{H}}{\partial p}, \qquad \dot{p} = -\frac{\partial \mathcal{H}}{\partial q}
$$

```lab
phase
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $q$ | posição generalizada (no pêndulo, o ângulo) | depende |
| $p$ | momento conjugado | depende |
| $\mathcal{H}$ | hamiltoniana (em geral, a energia total) | J |
| $V(q)$ | energia potencial | J |

## Exemplo

Pêndulo de 1 kg e 1 m. Com energia abaixo de $2mgL \approx 19{,}6$ J (medida a partir do ponto mais baixo), ele vai e volta. Acima disso, passa pelo topo e dá voltas. Exatamente nessa energia, ele se aproximaria do topo para sempre, sem nunca chegar.

## Onde isso volta

Na mecânica quântica, $\mathcal H$ vira o operador que aparece na equação de Schrödinger. Na física estatística, contar estados é medir volumes no espaço de fase, que o teorema de Liouville garante que se conservam. O caos se vê no espaço de fase como regiões onde as trajetórias se embaralham.

## Pergunta-ponte

Se a energia se conserva porque a hamiltoniana não depende do tempo, toda conservação vem de alguma simetria?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o espaço de fase é o espaço onde a partícula anda" | "é um espaço abstrato de posição e momento; cada ponto é um estado inteiro" |
| "hamiltoniana e lagrangiana são a mesma coisa" | "estão ligadas por uma transformação (de Legendre); uma usa velocidades, a outra momentos" |

## Nível técnico

$\mathcal H = \sum p_i\dot q_i - \mathcal L$ com $p_i = \partial\mathcal L/\partial\dot q_i$. O fluxo hamiltoniano preserva volume no espaço de fase (Liouville) e a estrutura simplética. Colchetes de Poisson, $\dot f = \{f, \mathcal H\}$, viram comutadores na quântica: $\{q, p\} = 1 \to [\hat q, \hat p] = i\hbar$. Para o pêndulo, $\mathcal H = p^2/(2mL^2) + mgL(1 - \cos q)$ e a separatriz é $\mathcal H = 2mgL$.
