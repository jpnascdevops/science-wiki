---
id: projectile-motion
title: Movimento em duas dimensões e projéteis
summary: Um projétil anda em velocidade constante na horizontal e em queda livre na vertical; sem ar, a trajetória é uma parábola.
recap:
  - "Separe o movimento: na horizontal a velocidade não muda; na vertical é queda livre."
  - "Sem ar, a trajetória é uma parábola, como Galileu mostrou."
  - "Em terreno plano e sem ar, o alcance máximo é com 45°; 30° e 60° chegam ao mesmo ponto."
  - "Uma bala disparada na horizontal e outra solta da mesma altura chegam juntas ao chão (sem ar e em terreno plano)."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, gravity]
  era: scientific-revolution
  people: [galileo-galilei]
  events: [two-new-sciences]
equations:
  - tex: x = v_0\cos\theta\; t
    spoken: "x é igual a v zero cosseno de teta vezes t"
  - tex: y = v_0\sin\theta\; t - \frac{1}{2}\,g\,t^2
    spoken: "y é igual a v zero seno de teta vezes t menos um meio de g vezes t ao quadrado"
  - tex: R = \frac{v_0^2 \sin 2\theta}{g}
    spoken: "R é igual a v zero ao quadrado vezes seno de dois teta, sobre g"
claims:
  - id: claim-001
    text: "Lançado a 20 m/s e 45°, sem ar, um objeto alcança cerca de 40,8 m"
    type: number
    check: compute
    formula: projectile_range_20ms_45deg
    expected: 40.8
    unit: m
    tolerance: 0.002
    status: calculated
  - id: claim-002
    text: "A 20 m/s, os ângulos de 30° e 60° dão o mesmo alcance, cerca de 35,3 m"
    type: number
    check: compute
    formula: projectile_range_20ms_30deg
    expected: 35.3
    unit: m
    tolerance: 0.002
    status: calculated
  - id: claim-003
    text: "A 20 m/s e 45°, a altura máxima é cerca de 10,2 m"
    type: number
    check: compute
    formula: projectile_max_height_20ms_45deg
    expected: 10.2
    unit: m
    tolerance: 0.002
    status: calculated
  - id: claim-004
    text: "Galileu mostrou nas Duas Novas Ciências que a trajetória de um projétil, sem o ar, é uma parábola"
    type: attribution
    check: source
    sources: [https://galileoandeinstein.phys.virginia.edu/tns244.htm, https://en.wikipedia.org/wiki/Two_New_Sciences]
    status: pending
resources:
  - kind: study
    title: "4.4: Movimento do projétil (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/04%3A_Movimento_em_duas_e_tres_dimensoes/4.04%3A_Movimento_do_proj%C3%A9til
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Projectile motion (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Projectile_motion
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Galileo on Projectiles - Two New Sciences, Day Four, annotated (Michael Fowler, UVA)"
    url: https://galileoandeinstein.phys.virginia.edu/tns244.htm
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "3.1 Coordinate System and Position Vector in 2D (MIT OCW 8.01SC) - prerequisite for 2D motion"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-1-kinematics/3-1-coordinate-system-and-position-vector-in-2d/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

A grande sacada de Galileu foi tratar o movimento de lado e o movimento para cima e para baixo como duas histórias separadas. De lado, nada empurra nem freia (sem ar): a bola segue com a mesma velocidade horizontal. Para cima e para baixo, é queda livre, com a gravidade puxando sempre igual. Juntando as duas, sai uma parábola.

Uma consequência estranha: uma bala disparada na horizontal e outra solta da mesma altura no mesmo instante chegam ao chão juntas. A horizontal não atrasa nem adianta a queda.

## Equação

$$
R = \frac{v_0^2 \sin 2\theta}{g}
$$

```lab
projectile
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $v_0$ | velocidade de lançamento | m/s |
| $\theta$ | ângulo de lançamento com o chão | grau |
| $g$ | aceleração da gravidade | m/s² |
| $R$ | alcance (distância até voltar à altura inicial) | m |
| $x, y$ | posição horizontal e vertical | m |

## Exemplo

Um chute a 20 m/s e 45°: alcance $20^2 \times \sin 90° / 9{,}8 \approx 40{,}8$ m, altura máxima de uns 10,2 m. Com 30° ou 60°, a bola cai no mesmo lugar, a 35,3 m: o de 60° sobe mais e demora mais, o de 30° vai mais baixo e chega antes.

## Onde isso volta

Se a velocidade horizontal for grande o bastante, o chão "foge" por causa da curvatura da Terra e o projétil continua caindo, mas nunca alcança o chão: é uma órbita. Newton desenhou exatamente isso, um canhão no alto de uma montanha.

## Pergunta-ponte

O que mantém algo girando em círculo em vez de seguir reto?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a bola sobe enquanto tem força do chute" | "depois de solta, a única força (sem ar) é a gravidade; ela sobe porque já tinha velocidade" |
| "45° é sempre o melhor ângulo" | "só em terreno plano e sem ar; com resistência do ar o ângulo ideal é menor" |

## Nível técnico

Eliminando $t$: $y = x\tan\theta - \dfrac{g\,x^2}{2 v_0^2 \cos^2\theta}$, uma parábola. Tempo de voo $T = 2 v_0 \sin\theta / g$; altura máxima $H = (v_0\sin\theta)^2/(2g)$. Com arrasto proporcional a $v^2$ as equações acoplam $x$ e $y$ e só se resolvem numericamente; a trajetória fica assimétrica, com a descida mais íngreme.
