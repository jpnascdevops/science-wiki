---
id: angular-momentum
title: Momento angular
summary: O momento angular é o "embalo" de rotação; sem torque externo ele se conserva, e por isso quem encolhe gira mais rápido.
recap:
  - "Momento angular L = I ω: inércia de rotação vezes velocidade de giro."
  - "Sem torque externo, L não muda."
  - "Encolher (diminuir I) faz girar mais rápido: patinadora, estrela que vira pulsar."
  - "A segunda lei de Kepler (áreas iguais) é a conservação do momento angular do planeta."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [rotation, conservation-laws, orbits]
  era: classical-mechanics-era
  people: [johannes-kepler, isaac-newton, leonhard-euler]
  events: []
equations:
  - tex: L = I\,\omega
    spoken: "L é igual a I vezes ômega"
  - tex: \vec{L} = \vec{r} \times \vec{p}
    spoken: "vetor L é igual a vetor r vetorial vetor p"
  - tex: I_1\,\omega_1 = I_2\,\omega_2
    spoken: "I um vezes ômega um é igual a I dois vezes ômega dois"
claims:
  - text: "Uma patinadora girando a 1 volta por segundo que reduz o momento de inércia a um terço passa a 3 voltas por segundo"
    type: number
    check: compute
    formula: skater_spin_rev_s
    expected: 3
    unit: voltas/s
    tolerance: 0.001
    status: verified
  - text: "A Terra anda cerca de 3,4% mais rápido no periélio do que no afélio"
    type: number
    check: compute
    formula: earth_perihelion_aphelion_speed_ratio
    expected: 1.034
    unit: ""
    tolerance: 0.001
    status: verified
  - text: "A segunda lei de Kepler (áreas iguais em tempos iguais) equivale à conservação do momento angular sob uma força central"
    type: conceptual
    check: source
    sources: [https://theory.physics.manchester.ac.uk/~mikeb/lecture/pc167/gravity/central.html]
    status: verified
resources:
  - kind: study
    title: "11.4: Conservação do momento angular (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/11%3A_Momento_angular/11.04%3A_Conserva%C3%A7%C3%A3o_do_momento_angular
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Torque (PhET simulation - rotação, momento de inércia, momento angular)"
    url: https://phet.colorado.edu/pt_BR/simulations/torque
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Angular momentum (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Angular_momentum
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Central forces and Kepler's second law (Univ. of Manchester lecture notes, PC167)"
    url: https://theory.physics.manchester.ac.uk/~mikeb/lecture/pc167/gravity/central.html
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma patinadora gira com os braços abertos. Ela fecha os braços e começa a girar muito mais rápido, sem empurrar nada. O que aconteceu? A quantidade de rotação, o momento angular, ficou a mesma; como a massa ficou mais perto do eixo, a velocidade de giro teve que aumentar para compensar.

O mesmo vale no céu. Um planeta numa elipse fica mais perto do Sol em parte da órbita e, ali, anda mais rápido. É a segunda lei de Kepler vista de outro jeito. E o núcleo de uma estrela que colapsa num objeto de uns 20 km de diâmetro passa a girar até dezenas de vezes por segundo (o pulsar do Caranguejo, cerca de 30): é um pulsar.

## Equação

$$
I_1\,\omega_1 = I_2\,\omega_2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $L$ | momento angular | kg·m²/s |
| $I$ | momento de inércia: massa e quão longe ela está do eixo | kg·m² |
| $\omega$ | velocidade angular (quão rápido gira) | rad/s |
| $\vec r$ | posição em relação ao eixo ou centro | m |
| $\vec p$ | momento linear | kg·m/s |

## Exemplo

A patinadora gira a 1 volta por segundo e, ao fechar os braços, reduz o momento de inércia a um terço. Para manter $I\omega$, a rotação vai a 3 voltas por segundo.

A órbita da Terra tem excentricidade 0,0167. Pela conservação do momento angular, a razão entre a velocidade no periélio e no afélio é $(1+e)/(1-e) \approx 1{,}034$: em janeiro, a Terra anda uns 3% mais rápido que em julho.

## Onde isso volta

Discos de acreção em volta de buracos negros, a rotação das galáxias e a formação de sistemas planetários dependem do momento angular. Na quântica, ele vem em pacotes, e o spin é um momento angular sem nada girando de fato.

## Pergunta-ponte

O que, além do momento, fica sempre igual quando nada de fora atrapalha?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "ela gira mais rápido porque faz força com os braços" | "nenhum torque externo age; o giro acelera porque o momento de inércia diminuiu" |
| "momento angular é velocidade de rotação" | "é velocidade de rotação vezes momento de inércia" |

## Nível técnico

$\mathrm{d}\vec L/\mathrm{d}t = \vec\tau$; com força central, $\vec\tau = \vec r \times \vec F = 0$ e $\vec L$ é constante. A área varrida por unidade de tempo é $\mathrm{d}A/\mathrm{d}t = L/(2m)$, que é a segunda lei de Kepler. A energia cinética de rotação $\tfrac12 I\omega^2 = L^2/(2I)$ aumenta quando $I$ diminui: a patinadora realiza trabalho ao puxar os braços. Pelo teorema de Noether, a conservação de $\vec L$ vem da simetria por rotações.
