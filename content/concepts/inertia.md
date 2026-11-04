---
id: inertia
title: 'Inércia: a primeira lei de Newton'
summary: Um corpo sem força resultante continua parado ou em linha reta com velocidade constante.
recap:
  - "Sem força resultante, nada muda: parado continua parado, em movimento continua em linha reta, na mesma velocidade."
  - "Movimento não precisa de causa; mudança de movimento precisa."
  - "Inércia é a resistência a mudar de velocidade, e cresce com a massa."
  - "Quando o ônibus freia, você parece ser jogado para frente, mas só continua andando enquanto o ônibus para."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, foundations]
  era: classical-mechanics-era
  people: [aristotle, jean-buridan, galileo-galilei, rene-descartes, isaac-newton]
  events: [principia]
equations:
  - tex: \sum \vec{F} = 0 \;\Rightarrow\; \vec{v} = \text{constante}
    spoken: "se a soma das forças é zero, logo o vetor velocidade é constante"
claims:
  - id: claim-001
    text: "Um carro a 72 km/h anda 20 m por segundo; é com essa velocidade que um passageiro sem cinto segue em frente numa freada"
    type: number
    check: compute
    formula: kmh_72_to_m_s
    expected: 20
    unit: m/s
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Aristóteles defendia que um corpo em movimento precisa de um motor contínuo; Jean Buridan, no século XIV, desenvolveu e deu nome à teoria do ímpeto, que já tinha precursores como João Filopono"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Jean_Buridan]
    status: pending
  - id: claim-003
    text: "As três leis de Newton foram publicadas nos Principia, em 1687"
    type: date
    check: source
    sources: [https://www.britannica.com/topic/Principia]
    status: pending
resources:
  - kind: study
    title: "5.3: Primeira Lei de Newton (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/05%3A_Leis_do_movimento_de_Newton/5.03%3A_Primeira_Lei_de_Newton
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Forças e Movimento: Noções Básicas (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/forces-and-motion-basics
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "4.1 Newton's First and Second Laws (MIT OCW 8.01SC)"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-2-newtons-laws/4-1-newtons-first-and-second-laws/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Jean Buridan - impetus theory (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Jean_Buridan
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Na vida real, tudo que você empurra acaba parando. Por isso, por quase dois mil anos, a ideia aceita foi a de Aristóteles: movimento precisa de algo que o mantenha. Galileu virou o problema do avesso: a bola para por causa do atrito. Numa superfície cada vez mais lisa, ela anda cada vez mais longe. Sem atrito nenhum, andaria para sempre. Descartes completou a ideia: sem nada agindo, o corpo segue em linha reta.

Newton transformou isso na primeira lei: sem força resultante, a velocidade não muda, nem em tamanho nem em direção. Parar, acelerar e fazer curva exigem força; seguir em frente não exige nada.

## Equação

$$
\sum \vec{F} = 0 \;\Rightarrow\; \vec{v} = \text{constante}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\sum \vec{F}$ | soma de todas as forças (força resultante) | N |
| $\vec{v}$ | velocidade, com direção | m/s |

## Exemplo

Num ônibus a 72 km/h, você também anda a 20 m/s. Se o ônibus freia de repente, nada freia você: seu corpo segue a 20 m/s até o cinto, o banco da frente ou sua mão segurarem. Não é uma força te jogando para frente; é o ônibus parando embaixo de você.

## Onde isso volta

A segunda lei diz o que acontece quando a soma das forças não é zero. A ideia de que não dá para distinguir "parado" de "em movimento uniforme" vira o princípio da relatividade de Galileu e, depois, a base da relatividade de Einstein.

## Pergunta-ponte

E quando há força, quanto a velocidade muda?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "inércia é uma força" | "inércia é a tendência de manter a velocidade; não é uma força" |
| "uma nave no espaço precisa do motor ligado para continuar andando" | "o motor só é preciso para mudar a velocidade" |
| "a força do movimento acaba" | "o movimento para porque atrito e resistência do ar agem contra ele" |
