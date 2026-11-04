---
id: force-and-motion
title: Força e movimento
summary: Força causa aceleração; quanto mais massa, mais força para acelerar o mesmo tanto.
recap:
  - "Força causa aceleração: F = m a."
  - "Mais massa exige mais força para a mesma aceleração."
  - "Velocidade é quanto se anda por tempo; aceleração é quanto a velocidade muda por tempo."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, foundations]
  era: classical-mechanics-era
  people: [isaac-newton]
equations:
  - tex: v = \frac{\Delta x}{\Delta t}
    spoken: "v é igual a delta x sobre delta t"
  - tex: a = \frac{\Delta v}{\Delta t}
    spoken: "a é igual a delta v sobre delta t"
  - tex: F = m\,a
    spoken: "F é igual a m vezes a"
claims:
  - id: claim-001
    text: "Empurrar 10 kg com aceleração de 2 m/s² exige 20 N"
    type: number
    check: compute
    formula: cart_force_newton
    expected: 20
    unit: N
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "A segunda lei de Newton relaciona força, massa e aceleração"
    type: definition
    check: source
    sources: [https://pt.wikipedia.org/wiki/For%C3%A7a]
    status: pending
resources:
  - kind: read
    title: "Wikipedia: Força"
    url: https://pt.wikipedia.org/wiki/For%C3%A7a
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Khan Academy: Biblioteca de Física"
    url: https://pt.khanacademy.org/science/physics
    level: zero
    lang: pt
    checked_at: null
  - kind: watch
    title: "Newton's Laws: Crash Course Physics #5"
    url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Velocidade é quanto você anda por unidade de tempo. Aceleração é quanto a velocidade muda por unidade de tempo. Força é o que causa aceleração: empurrar um carrinho vazio é fácil, um carrinho cheio exige mais força para ganhar a mesma velocidade.

A expressão abaixo supõe massa constante e um referencial inercial, no regime newtoniano.

## Equação

$$
F = m\,a
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $F$ | força resultante | newton (N) |
| $m$ | massa | quilograma (kg) |
| $a$ | aceleração | m/s² |
| $v$ | velocidade | m/s |
| $\Delta$ | variação | — |

## Exemplo

Um carrinho de 10 kg que ganha 2 m/s a cada segundo precisa de $F = 10 \times 2 = 20$ N.

## Onde isso volta

A gravidade de Newton é uma força específica, e a relatividade mostra que $F = ma$ deixa de valer perto da velocidade da luz.

## Pergunta-ponte

Que força faz a maçã cair e a Lua girar?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "força é velocidade" | "força muda a velocidade" |
| "massa é peso" | "massa é quantidade de matéria; peso é a força da gravidade sobre ela" |
