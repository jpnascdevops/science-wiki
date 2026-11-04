---
id: pressure-and-buoyancy
title: Pressão e empuxo
summary: Pressão é força por área; num fluido ela cresce com a profundidade, e a diferença de pressão empurra os corpos para cima (empuxo).
recap:
  - "Pressão = força / área. A mesma força numa ponta fina fura; numa área grande, não."
  - "Num líquido, a pressão cresce com a profundidade: p = p₀ + ρ g h."
  - "A cada 10 m de água, a pressão sobe cerca de uma atmosfera."
  - "Empuxo (Arquimedes): o fluido empurra para cima com o peso do fluido deslocado."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [fluids, foundations]
  era: scientific-revolution
  people: [archimedes, evangelista-torricelli, blaise-pascal]
  events: [torricelli-barometer, puy-de-dome]
equations:
  - tex: p = \frac{F}{A}
    spoken: "p é igual a F sobre A"
  - tex: p = p_0 + \rho\,g\,h
    spoken: "p é igual a p zero mais rô g h"
  - tex: E = \rho_{\text{fluido}}\,V\,g
    spoken: "E é igual a rô do fluido vezes V vezes g"
claims:
  - id: claim-001
    text: "A 10 m de profundidade na água, a pressão da coluna de água é cerca de 98 kPa"
    type: number
    check: compute
    formula: water_pressure_10m_kpa
    expected: 98.07
    unit: kPa
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Isso é cerca de 0,97 atmosfera"
    type: number
    check: compute
    formula: water_10m_in_atm
    expected: 0.968
    unit: atm
    tolerance: 0.002
    status: calculated
  - id: claim-003
    text: "Um bloco de gelo flutua no mar com cerca de 90% do volume submerso"
    type: number
    check: compute
    formula: ice_submerged_fraction_seawater
    expected: 0.895
    unit: ""
    tolerance: 0.01
    status: calculated
  - id: claim-004
    text: "A atmosfera padrão é definida como 101 325 Pa"
    type: definition
    check: source
    sources: [https://en.wikipedia.org/wiki/Standard_atmosphere_(unit)]
    status: pending
  - id: claim-005
    text: "O princípio do empuxo de Arquimedes aparece em sua obra Sobre os corpos flutuantes"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/On_Floating_Bodies, https://britannica.com/science/Archimedes-principle]
    status: pending
  - id: claim-006
    text: "Torricelli construiu o barômetro de mercúrio em 1643 (algumas fontes dão 1643–44)"
    type: date
    check: source
    sources: [https://www.britannica.com/technology/mercury-barometer, https://www.britannica.com/biography/Evangelista-Torricelli]
    status: pending
  - id: claim-007
    text: "Pascal propôs o experimento do Puy de Dôme, feito por Florin Périer em 1648, que mostrou que a pressão do ar diminui com a altitude"
    type: date
    check: source
    sources: [https://www.britannica.com/print/article/445445, https://www.irishtimes.com/news/mercury-on-a-mountain-1.194816]
    status: pending
resources:
  - kind: study
    title: "14.6: Princípio e flutuabilidade de Arquimedes (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/14%3A_Mecanica_dos_Fluidos/14.06%3A_Princ%C3%ADpio_e_flutuabilidade_de_Arquimedes
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Cap. 14: Mecânica dos Fluidos (pressão, medição da pressão, princípio de Pascal)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/14%3A_Mecanica_dos_Fluidos
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Flutuabilidade: Básico (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/buoyancy-basics
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Archimedes' principle (Britannica)"
    url: https://britannica.com/science/Archimedes-principle
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Buoyancy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Buoyancy
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Empuxo e o Princípio de Arquimedes (Ciência Todo Dia)"
    url: "https://www.youtube.com/watch?v=57qs91GBscU"
    level: zero
    lang: pt
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma agulha fura o dedo com pouca força; a palma da mão aguenta muito mais. A diferença é a área: pressão é força dividida pela área onde ela se espalha.

Num líquido, cada camada carrega o peso de toda a água em cima dela. Por isso a pressão cresce com a profundidade, e seus ouvidos doem no fundo da piscina. O ar também pesa: estamos no fundo de um oceano de ar, e Torricelli mostrou isso com um tubo de mercúrio.

Agora pense num objeto mergulhado. Embaixo dele a pressão é maior que em cima. Essa diferença empurra o objeto para cima: é o empuxo. Arquimedes descobriu que ele é igual ao peso do líquido que o objeto tirou do lugar.

## Equação

$$
p = p_0 + \rho\,g\,h
$$

```lab
buoyancy
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $p$ | pressão na profundidade $h$ | pascal (Pa = N/m²) |
| $p_0$ | pressão na superfície (a do ar, ≈ 101 325 Pa) | Pa |
| $\rho$ | densidade do fluido (água: 1000 kg/m³) | kg/m³ |
| $h$ | profundidade | m |
| $E$ | empuxo | N |
| $V$ | volume de fluido deslocado | m³ |

## Exemplo

A 10 m de profundidade, a água acrescenta $1000 \times 9{,}8 \times 10 \approx 98$ kPa, quase uma atmosfera inteira. Um mergulhador a 10 m sente cerca do dobro da pressão da superfície.

O gelo tem densidade de cerca de 917 kg/m³, e a água do mar, cerca de 1025 kg/m³. Para flutuar, o gelo afunda até deslocar seu próprio peso em água: $917/1025 \approx 0{,}9$. Cerca de 90% do iceberg fica embaixo d'água.

## Onde isso volta

A equação de Bernoulli junta pressão, velocidade e altura num fluido em movimento. A pressão de um gás leva à teoria cinética e à termodinâmica; dentro das estrelas, é ela que segura o peso das camadas de cima.

## Pergunta-ponte

O que acontece com a pressão quando o fluido começa a escoar?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "pressão é a mesma coisa que força" | "pressão é força dividida pela área" |
| "o empuxo depende do peso do objeto" | "depende do volume submerso e da densidade do fluido; quando o objeto flutua, ele afunda até o empuxo igualar seu peso" |
| "navios flutuam porque são leves" | "flutuam porque deslocam muita água; o casco oco tem densidade média menor que a da água" |
