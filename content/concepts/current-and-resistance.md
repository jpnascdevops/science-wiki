---
id: current-and-resistance
title: Corrente e resistência (lei de Ohm)
summary: Corrente é a quantidade de carga que passa por segundo; para muitos materiais ela é proporcional à voltagem aplicada, V = RI, e a energia que se perde na resistência vira calor, P = VI.
recap:
- 'Corrente: carga que atravessa o fio por segundo (1 A = 1 C/s).'
- 'Lei de Ohm: V = R I. A resistência diz quanto o material dificulta a passagem.'
- 'Potência P = V I: a energia por segundo que vira calor, luz ou movimento.'
- Os elétrons andam devagar (milímetros por minuto); o que corre quase à velocidade da luz é o campo que os empurra.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - circuits
  era: nineteenth-century
  people:
  - georg-ohm
  - alessandro-volta
  - james-prescott-joule
  events:
  - ohm-law-1827
equations:
- tex: I = \frac{\Delta Q}{\Delta t}
  spoken: I é igual a delta Q sobre delta t
- tex: V = R\,I
  spoken: V é igual a R vezes I
- tex: P = V\,I
  spoken: P é igual a V vezes I
claims:
- id: claim-001
  text: Um chuveiro de 5500 W ligado em 220 V puxa 25 A
  type: number
  check: compute
  formula: shower_current_5500w_220v
  expected: 25.0
  unit: A
  tolerance: 0.001
  status: calculated
- id: claim-002
  text: A resistência desse chuveiro é cerca de 8,8 Ω
  type: number
  check: compute
  formula: shower_resistance_5500w_220v
  expected: 8.8
  unit: Ω
  tolerance: 0.001
  status: calculated
- id: claim-003
  text: Com 1 A num fio de cobre de 1 mm², os elétrons derivam a cerca de 0,07 mm/s
  type: number
  check: compute
  formula: drift_speed_copper_1a_1mm2
  expected: 7.35e-05
  unit: m/s
  tolerance: 0.01
  status: calculated
- id: claim-004
  text: Georg Simon Ohm publicou em 1827 Die galvanische Kette, mathematisch bearbeitet, onde formulou a lei que leva seu nome
  type: date
  check: source
  sources:
  - https://britannica.com/topic/The-Galvanic-Circuit-Investigated-Mathematically
  status: pending
resources:
- kind: watch
  title: 'Electric Current: Crash Course Physics #28'
  url: https://www.pbs.org/video/crash-course-physics-28
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — 9.4: Resistividade e resistência'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/09:_Corrente_e_resistencia/9.04:_Resistividade_e_resist%C3%AAncia
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Electric Current
  url: https://hyperphysics.gsu.edu/hbase/electric/elecur.html
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Ohm's Law (and Kirchhoff's voltage/current laws)
  url: https://hyperphysics.gsu.edu/hbase/electric/ohmlaw.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Ligue uma pilha a uma lâmpada e cargas passam a circular pelo fio. A corrente mede quanta carga atravessa um ponto do fio a cada segundo. Pense na água num cano: a voltagem é a diferença de pressão, a corrente é a vazão e a resistência é o quanto o cano é estreito.

Ohm descobriu, nos anos 1820, que para um fio de metal a corrente é proporcional à voltagem: dobre a voltagem e a corrente dobra. A constante de proporção é a resistência. Um fio grosso e curto tem pouca resistência; um fio fino e comprido, muita. A energia que as cargas perdem atravessando a resistência vira calor. É o que acende o filamento de uma lâmpada antiga e esquenta a água do chuveiro.

Surpresa: os elétrons em si andam devagar, menos de um milímetro por segundo. A luz acende na hora porque, quando se fecha o circuito, o campo elétrico que os empurra se espalha pelo fio quase à velocidade da luz, e todos começam a andar ao mesmo tempo.

## Equação

$$
V = R\,I
$$

```lab
ohm
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $I$ | corrente | A (ampère = C/s) |
| $V$ | voltagem aplicada | V |
| $R$ | resistência | Ω (ohm = V/A) |
| $P$ | potência dissipada | W |
| $\Delta Q$ | carga que passa em um tempo $\Delta t$ | C |

## Exemplo

Um chuveiro de 5500 W em 220 V: $I = P/V = 25$ A, e $R = V^2/P = 8{,}8$ Ω. É muita corrente, por isso o chuveiro pede fio grosso e disjuntor próprio. Já os elétrons andam devagar: com 1 A num fio de cobre de 1 mm², a velocidade média deles é de uns 0,07 milímetro por segundo.

## Onde isso volta

Circuitos com vários resistores, o aquecimento de fios e a segurança elétrica de uma casa, a transmissão de energia em alta voltagem (para usar menos corrente e perder menos calor) e a física dos semicondutores e supercondutores.

## Pergunta-ponte

Quando há vários aparelhos ligados ao mesmo tempo, como a corrente se divide entre eles?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a corrente se gasta na lâmpada" | "a corrente que entra é a que sai; o que a lâmpada consome é energia" |
| "os elétrons correm da usina até a casa à velocidade da luz" | "os elétrons andam milímetros por minuto; o que viaja depressa é o campo que os empurra" |

## Nível técnico

Na forma local, $\vec J = \sigma\vec E$, com $R = \rho L/A$ para um fio de resistividade $\rho = 1/\sigma$. O modelo de Drude explica isso por colisões: os elétrons ganham velocidade no campo e a perdem ao bater na rede, resultando numa velocidade de deriva $v_d = I/(neA)$. A lei de Ohm não é uma lei fundamental: vale para metais e muitos materiais, mas não para diodos e LEDs. Em supercondutores abaixo da temperatura crítica, a resistência cai a zero.
