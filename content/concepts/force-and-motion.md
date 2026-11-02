---
id: force-and-motion
title: Força e movimento
summary: Força causa aceleração; quanto mais massa, mais força para acelerar o mesmo tanto.
levels: [zero]
prerequisites: [reading-equations]
leads_to: [newton-gravity, energy-and-mass, special-relativity]
tags:
  area: physics/classical-mechanics
  topics: [motion, foundations]
  era: "1687"
  people: [isaac-newton]
equations:
  - tex: v = \frac{\Delta x}{\Delta t}
    spoken: "v é igual a delta x sobre delta t"
  - tex: a = \frac{\Delta v}{\Delta t}
    spoken: "a é igual a delta v sobre delta t"
  - tex: F = m\,a
    spoken: "F é igual a m vezes a"
claims:
  - text: "Empurrar 10 kg com aceleração de 2 m/s² exige 20 N"
    type: number
    check: compute
    formula: cart_force_newton
    expected: 20
    unit: N
    tolerance: 0.001
    status: verified
  - text: "A segunda lei de Newton relaciona força, massa e aceleração"
    type: definition
    check: source
    sources: [https://pt.wikipedia.org/wiki/For%C3%A7a]
    status: verified
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
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Velocidade é quanto você anda por unidade de tempo. Aceleração é quanto a velocidade muda por unidade de tempo. Força é o que causa aceleração: empurrar um carrinho vazio é fácil, um carrinho cheio exige mais força para ganhar a mesma velocidade.

## Equação

$$
F = m\,a
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $F$ | força | newton (N) |
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
