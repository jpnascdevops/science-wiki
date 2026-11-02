---
id: kinematics-1d
title: Posição, velocidade e aceleração
summary: Cinemática descreve o movimento sem perguntar a causa; com aceleração constante, três equações resolvem quase tudo.
recap:
  - "Posição: onde está. Velocidade: quanto a posição muda por segundo. Aceleração: quanto a velocidade muda por segundo."
  - "Com aceleração constante: v = v₀ + a t e x = x₀ + v₀ t + a t²/2."
  - "No gráfico v por t, a inclinação é a aceleração e a área é o deslocamento."
  - "Ir de 0 a 100 km/h em 10 s é acelerar cerca de 2,8 m/s²."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, foundations]
  era: scientific-revolution
  people: [galileo-galilei, nicole-oresme]
  events: [two-new-sciences]
equations:
  - tex: v = v_0 + a\,t
    spoken: "v é igual a v zero mais a vezes t"
  - tex: x = x_0 + v_0\,t + \frac{1}{2}\,a\,t^2
    spoken: "x é igual a x zero mais v zero vezes t mais um meio de a vezes t ao quadrado"
  - tex: v^2 = v_0^2 + 2\,a\,\Delta x
    spoken: "v ao quadrado é igual a v zero ao quadrado mais dois a delta x"
claims:
  - text: "Ir de 0 a 100 km/h em 10 s corresponde a uma aceleração de cerca de 2,78 m/s²"
    type: number
    check: compute
    formula: accel_0_100_kmh_10s
    expected: 2.78
    unit: m/s²
    tolerance: 0.002
    status: verified
  - text: "Nessa arrancada, o carro percorre cerca de 139 m"
    type: number
    check: compute
    formula: distance_0_100_kmh_10s
    expected: 138.9
    unit: m
    tolerance: 0.002
    status: verified
  - text: "Os calculadores de Merton (Oxford, século XIV) enunciaram o teorema da velocidade média, e Nicole Oresme deu uma prova geométrica"
    type: attribution
    check: source
    sources: [https://www.britannica.com/topic/Merton-theorem, https://en.wikipedia.org/wiki/Mean_speed_theorem]
    status: verified
resources:
  - kind: study
    title: "Cap. 3: Movimento ao longo de uma linha reta (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/03%3A_Movimento_ao_longo_de_uma_linha_reta
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "2.1 Introduction to Acceleration (MIT OCW 8.01SC)"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-1-kinematics/2-1-introduction-to-acceleration/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Merton theorem (Britannica)"
    url: https://www.britannica.com/topic/Merton-theorem
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Mean speed theorem (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Mean_speed_theorem
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Antes de perguntar por que algo se move, dá para descrever como se move. São três perguntas em cadeia. Onde está? (posição). Quão rápido a posição muda? (velocidade). Quão rápido a velocidade muda? (aceleração).

Quando a aceleração é constante, como num carro acelerando firme ou numa pedra caindo, tudo fica previsível: a velocidade cresce em linha reta e a posição cresce como uma parábola. Um truque que os estudiosos medievais de Oxford e Paris já conheciam: a distância é a mesma que você andaria na velocidade média, a meio caminho entre a inicial e a final.

## Equação

$$
x = x_0 + v_0\,t + \frac{1}{2}\,a\,t^2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $x, x_0$ | posição agora e no início | m |
| $v, v_0$ | velocidade agora e no início | m/s |
| $a$ | aceleração (constante) | m/s² |
| $t$ | tempo desde o início | s |

## Exemplo

Um carro vai de 0 a 100 km/h (27,8 m/s) em 10 s. Aceleração: $27{,}8 / 10 \approx 2{,}78$ m/s². Distância: $\tfrac12 \times 2{,}78 \times 10^2 \approx 139$ m. Pela velocidade média: metade de 27,8 m/s durante 10 s, também 139 m.

## Onde isso volta

Queda livre e projéteis são este caso com $a = g$. A segunda lei de Newton diz qual é a aceleração; a cinemática diz o que acontece com ela.

## Pergunta-ponte

Uma pedra e uma pena caem com a mesma aceleração?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "aceleração alta quer dizer que está rápido" | "aceleração alta quer dizer que a velocidade está mudando rápido" |
| "velocidade zero, aceleração zero" | "no ponto mais alto de um lançamento vertical a velocidade é zero, mas a aceleração continua sendo g" |
