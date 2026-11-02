---
id: circular-motion
title: Movimento circular
summary: Girar em círculo é acelerar o tempo todo em direção ao centro, mesmo com rapidez constante.
recap:
  - "Em círculo, a direção da velocidade muda sempre, então há aceleração, mesmo sem mudar a rapidez."
  - "Essa aceleração aponta para o centro: a = v²/r."
  - "É preciso uma força para o centro (centrípeta): tração, atrito, gravidade."
  - "A Lua cai em direção à Terra com 1/3600 de g, porque está cerca de 60 vezes mais longe do centro da Terra do que nós, na superfície."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, rotation, orbits]
  era: scientific-revolution
  people: [christiaan-huygens, isaac-newton]
  events: [principia]
equations:
  - tex: a_c = \frac{v^2}{r}
    spoken: "a c é igual a v ao quadrado sobre r"
  - tex: v = \frac{2\pi r}{T}
    spoken: "v é igual a dois pi r sobre T"
  - tex: F_c = m\,\frac{v^2}{r}
    spoken: "F c é igual a m vezes v ao quadrado sobre r"
claims:
  - text: "Um carro a 20 m/s numa curva de 50 m de raio tem aceleração centrípeta de 8 m/s²"
    type: number
    check: compute
    formula: curve_accel_20ms_50m
    expected: 8
    unit: m/s²
    tolerance: 0.001
    status: verified
  - text: "A aceleração centrípeta da Lua é cerca de 0,00272 m/s²"
    type: number
    check: compute
    formula: moon_centripetal_accel
    expected: 0.00272
    unit: m/s²
    tolerance: 0.005
    status: verified
  - text: "g dividido por 3600 dá cerca de 0,00272 m/s², o mesmo valor"
    type: number
    check: compute
    formula: g_over_3600
    expected: 0.00272
    unit: m/s²
    tolerance: 0.005
    status: verified
  - text: "Huygens deduziu a fórmula da força centrífuga (v²/r) por volta de 1659, em De vi centrifuga, publicado só em 1703"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Christiaan_Huygens, https://en.wikipedia.org/wiki/History_of_centrifugal_and_centripetal_forces]
    status: verified
  - text: "No teste da Lua, Newton comparou a aceleração da Lua com g: como a Lua está a cerca de 60 raios terrestres, a aceleração é cerca de 1/3600 de g"
    type: attribution
    check: source
    sources: [https://pwg.gsfc.nasa.gov/stargaze/Sgravity.htm]
    status: verified
resources:
  - kind: study
    title: "4.5: Movimento circular uniforme (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/04%3A_Movimento_em_duas_e_tres_dimensoes/4.05%3A_Movimento_circular_uniforme
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Cap. 6: Aplicações das leis de Newton (inclui 6.6 Força centrípeta)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/06%3A_Aplicacoes_das_leis_de_Newton
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "9.1 Uniform Circular Motion (MIT OCW 8.01SC)"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-3-circular-motion/9-1-uniform-circular-motion/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Circular Motion and Rotation (HyperPhysics)"
    url: https://hyperphysics.gsu.edu/hbase/circ.html
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Centripetal force (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Centripetal_force
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Gire uma pedra presa num barbante. A pedra tende a seguir reto (inércia); o barbante puxa para o centro e entorta o caminho a cada instante. Se o barbante arrebenta, ela sai pela tangente, em linha reta. Então girar em círculo, mesmo com rapidez constante, é acelerar o tempo todo, e a aceleração aponta para o centro.

Newton usou isso para o maior teste da história da gravidade. A Lua está cerca de 60 vezes mais longe do centro da Terra que uma maçã na superfície. Se a gravidade enfraquece com o quadrado da distância, a Lua deveria "cair" para a Terra com $1/60^2 = 1/3600$ de $g$. A conta com a órbita da Lua dá quase exatamente isso.

## Equação

$$
a_c = \frac{v^2}{r}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $a_c$ | aceleração centrípeta (para o centro) | m/s² |
| $v$ | rapidez ao longo do círculo | m/s |
| $r$ | raio do círculo | m |
| $T$ | período: tempo de uma volta | s |
| $F_c$ | força resultante para o centro | N |

## Exemplo

Um carro a 72 km/h (20 m/s) numa curva de 50 m: $a_c = 400/50 = 8$ m/s², mais de 80% de $g$. Quem dá essa força é o atrito dos pneus; com pista molhada, ele pode não bastar.

A Lua: raio da órbita $3{,}84 \times 10^8$ m, uma volta em 27,3 dias. $a_c = 4\pi^2 r / T^2 \approx 0{,}00272$ m/s². E $9{,}8/3600 \approx 0{,}00272$ m/s².

## Onde isso volta

Toda órbita circular é a gravidade fazendo o papel de força centrípeta; daí sai a terceira lei de Kepler. O movimento circular também leva ao momento angular e ao torque.

## Pergunta-ponte

O que faz um patinador girar mais rápido só fechando os braços?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a força centrífuga joga você para fora na curva" | "no carro, você tende a seguir reto; a porta empurra você para o centro" |
| "rapidez constante, aceleração zero" | "mudar de direção também é acelerar" |
| "a força centrípeta é um tipo de força" | "é o papel que alguma força real (tração, atrito, gravidade) faz" |

## Nível técnico

Em coordenadas polares, $\vec a = (\ddot r - r\dot\theta^2)\hat r + (r\ddot\theta + 2\dot r\dot\theta)\hat\theta$; com $r$ e $\dot\theta = \omega$ constantes, sobra $-r\omega^2\hat r$, isto é, $v^2/r$ para o centro. A força centrífuga aparece como força fictícia ao descrever o movimento num referencial que gira junto.
