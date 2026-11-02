---
id: free-fall
title: Queda livre e Galileu
summary: Sem ar, todos os corpos caem com a mesma aceleração, cerca de 9,8 m/s² na Terra, não importa a massa.
recap:
  - "Sem resistência do ar, tudo cai com a mesma aceleração g, pesado ou leve."
  - "Na Terra, g ≈ 9,8 m/s²: a cada segundo, a velocidade de queda aumenta 9,8 m/s."
  - "A distância cresce com o quadrado do tempo: d = g t²/2."
  - "Em 1971, um astronauta soltou um martelo e uma pena na Lua, e eles chegaram juntos ao chão."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, gravity]
  era: scientific-revolution
  people: [aristotle, galileo-galilei, david-scott]
  events: [two-new-sciences, apollo-15-hammer-feather]
equations:
  - tex: v = g\,t
    spoken: "v é igual a g vezes t"
  - tex: d = \frac{1}{2}\,g\,t^2
    spoken: "d é igual a um meio de g vezes t ao quadrado"
claims:
  - text: "Depois de 2 s de queda livre, a velocidade é cerca de 19,6 m/s"
    type: number
    check: compute
    formula: free_fall_speed_2s
    expected: 19.6
    unit: m/s
    tolerance: 0.002
    status: verified
  - text: "Em 2 s de queda livre, o corpo cai cerca de 19,6 m"
    type: number
    check: compute
    formula: free_fall_distance_2s
    expected: 19.6
    unit: m
    tolerance: 0.002
    status: verified
  - text: "Na superfície da Lua, g é cerca de 1,62 m/s²"
    type: number
    check: compute
    formula: moon_surface_gravity
    expected: 1.62
    unit: m/s²
    tolerance: 0.005
    status: verified
  - text: "A gravidade padrão g₀ é definida como exatamente 9,80665 m/s²"
    type: definition
    check: source
    sources: [https://en.wikipedia.org/wiki/Standard_gravity]
    status: verified
  - text: "Galileu publicou as Duas Novas Ciências em 1638, mostrando que a distância de queda cresce com o quadrado do tempo"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Two_New_Sciences]
    status: verified
  - text: "A história de Galileu soltando bolas da Torre de Pisa vem de seu aluno Viviani e é considerada duvidosa pelos historiadores"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment]
    status: verified
  - text: "Em 1971, na Apollo 15, David Scott soltou um martelo e uma pena na Lua e os dois chegaram juntos ao chão"
    type: date
    check: source
    sources: [https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html, https://en.wikipedia.org/wiki/Apollo_15]
    status: verified
resources:
  - kind: study
    title: "3.7: Queda livre (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/03%3A_Movimento_ao_longo_de_uma_linha_reta/3.07%3A_Queda_livre
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "Apollo 15 Hammer-Feather Drop (NASA NSSDC page, links the video)"
    url: https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "WATCH: A Bowling Ball And Feather Fall in World's Biggest Vacuum Chamber (ScienceAlert, embeds the BBC/Brian Cox clip)"
    url: https://www.sciencealert.com/watch-a-bowling-ball-and-feather-fall-in-world-s-biggest-vacuum-chamber
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Galileo's Leaning Tower of Pisa experiment (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Two New Sciences (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Two_New_Sciences
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Aristóteles ensinava que o mais pesado cai mais rápido, e parece óbvio: uma pedra cai antes de uma folha. Galileu percebeu que o culpado é o ar. Sem ar, uma pedra grande e uma pequena caem juntas, e ele mostrou com rampas que a velocidade cresce sempre no mesmo ritmo, enquanto a distância cresce com o quadrado do tempo: em 2 s, o corpo cai quatro vezes mais do que em 1 s.

A prova mais bonita veio séculos depois, na Lua, onde não há ar: um martelo e uma pena, soltos juntos, tocaram o chão juntos.

## Equação

$$
d = \frac{1}{2}\,g\,t^2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $g$ | aceleração da gravidade (≈ 9,8 na Terra, 1,62 na Lua) | m/s² |
| $t$ | tempo de queda | s |
| $v$ | velocidade de queda | m/s |
| $d$ | distância caída | m |

## Exemplo

Solte uma pedra de uma ponte. Depois de 2 s, ela cai a $9{,}8 \times 2 = 19{,}6$ m/s (uns 70 km/h) e já desceu $\tfrac12 \times 9{,}8 \times 4 \approx 19{,}6$ m. Na Lua, com $g$ seis vezes menor, a mesma pedra desceria só uns 3,2 m.

## Onde isso volta

A mesma aceleração para todas as massas é o fio que leva à gravidade de Newton (a força cresce com a massa, então a aceleração não muda) e, depois, ao princípio de equivalência de Einstein.

## Pergunta-ponte

Se nada empurrasse nem puxasse um objeto, ele pararia sozinho?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o mais pesado cai mais rápido" | "no vácuo, todos caem juntos; no ar, a resistência atrasa mais os corpos leves e largos" |
| "g é a força da gravidade" | "g é a aceleração; a força (o peso) é m vezes g" |
| "na Lua não tem gravidade" | "na Lua a gravidade é cerca de seis vezes menor" |
