---
id: magnetic-field-lorentz-force
title: Campo magnético e força de Lorentz
summary: Uma carga em movimento num campo magnético sente uma força perpendicular à sua velocidade e ao campo; essa força muda a direção do movimento, nunca a rapidez, e num campo uniforme faz a carga andar em círculos quando ela se move perpendicular a ele.
recap:
- Campo magnético só empurra cargas que se movem.
- 'A força é perpendicular à velocidade e ao campo: F = q v × B.'
- 'Por isso ela curva a trajetória sem acelerar nem frear: num campo uniforme, perpendicular ao movimento, a carga anda em círculos.'
- 'Força de Lorentz completa: F = q(E + v × B).'
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - magnetism
  - electricity
  era: nineteenth-century
  people:
  - hendrik-lorentz
  - oliver-heaviside
  - james-clerk-maxwell
  events:
  - lorentz-force-1895
equations:
- tex: \vec{F} = q\left(\vec{E} + \vec{v}\times\vec{B}\right)
  spoken: F vetor é igual a q vezes, E vetor mais v vetor vezes B vetor
- tex: r = \frac{m v}{q B}
  spoken: r é igual a m v sobre q B
claims:
- id: claim-001
  text: Um elétron a 10⁶ m/s num campo de 1 mT anda num círculo de cerca de 5,7 mm de raio
  type: number
  check: compute
  formula: electron_radius_1e6_1mt
  expected: 0.00569
  unit: m
  tolerance: 0.002
  status: calculated
- id: claim-002
  text: A forma completa da força de Lorentz, F = q(E + v × B), é atribuída a Hendrik Lorentz em 1895; Maxwell e Heaviside já tinham chegado a formas relacionadas
  type: date
  check: source
  sources:
  - https://en.wikipedia.org/wiki/Lorentz_force
  - https://britannica.com/science/magnetism/Magnetic-forces
  status: pending
resources:
- kind: watch
  title: 'Magnetism: Crash Course Physics #32'
  url: https://www.pbs.org/video/magnetism-crash-course-physics-32-ogkapy
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 11: Forças e campos magnéticos (11.4 partícula carregada em campo magnético)'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/11%3A_Forcas_e_campos_magneticos
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Magnetic Force (inclui Lorentz Force Law)
  url: https://hyperphysics.gsu.edu/hbase/magnetic/magfor.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Britannica — Magnetism: Magnetic forces (Lorentz force)'
  url: https://britannica.com/science/magnetism/Magnetic-forces
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 13 — Magnetostatics
  url: https://feynmanlectures.caltech.edu/II_13.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Um campo elétrico empurra qualquer carga, parada ou não. O campo magnético é diferente: ignora cargas paradas e só age nas que se movem. E age de um jeito curioso: a força é sempre de lado, perpendicular à direção do movimento e à direção do campo.

Uma força sempre de lado não acelera nem freia; só muda a direção. É como girar uma pedra presa num barbante: o barbante puxa para o centro, e a pedra anda em círculo com a mesma rapidez. Por isso uma carga num campo magnético uniforme anda em círculos. Mais rápida, círculo maior; campo mais forte, círculo menor. Na aurora boreal, partículas carregadas, energizadas pelo vento solar, são guiadas pelo campo magnético da Terra até perto dos polos.

## Equação

$$
\vec{F} = q\left(\vec{E} + \vec{v}\times\vec{B}\right)
$$

```lab
cyclotron
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec F$ | força na carga | N |
| $q$ | carga | C |
| $\vec v$ | velocidade | m/s |
| $\vec B$ | campo magnético | T |
| $\times$ | produto vetorial: resultado perpendicular aos dois | — |
| $r$ | raio do círculo | m |
| $m$ | massa da partícula | kg |

## Exemplo

Um elétron a $10^6$ m/s, perpendicular a um campo de 1 mT (umas 20 vezes o campo da Terra): $r = mv/(eB) = 9{,}1\times10^{-31}\times10^6 / (1{,}6\times10^{-19}\times10^{-3}) \approx 5{,}7$ mm. Uma volta leva uns 36 nanossegundos, e esse tempo não depende da velocidade: dobrando a velocidade, o círculo dobra e o tempo fica igual.

## Onde isso volta

Espectrômetros de massa separam átomos pelo raio da curva. Aceleradores circulares usam ímãs para manter as partículas na pista. Um fio com corrente num campo magnético sente força (o princípio dos motores elétricos). E, na relatividade, campo elétrico e magnético se revelam dois lados de uma mesma coisa.

## Pergunta-ponte

Se cargas em movimento sentem campos magnéticos, será que elas também criam campos magnéticos?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o campo magnético acelera a partícula, aumentando sua velocidade" | "ele só muda a direção; como a força é perpendicular ao movimento, não faz trabalho" |
| "a força magnética aponta ao longo do campo" | "ela é perpendicular tanto à velocidade quanto ao campo" |

## Nível técnico

Como $\vec F\cdot\vec v = 0$, a força magnética não faz trabalho. A frequência de cíclotron é $\omega = qB/m$, independente da velocidade (para $v \ll c$). Com componente da velocidade ao longo de $\vec B$, a trajetória vira uma hélice; campos que se estreitam refletem partículas (garrafas magnéticas, cinturões de Van Allen). Com $\vec E \perp \vec B$, aparece uma deriva com velocidade $\vec E\times\vec B/B^2$. Relativisticamente, $r = p/(qB)$ com o momento relativístico, e $\vec E$ e $\vec B$ se misturam quando se troca de referencial.
