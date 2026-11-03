---
id: fluid-flow
title: Escoamento e Bernoulli
summary: Num fluido que escoa, onde o cano estreita a velocidade aumenta, e onde a velocidade aumenta a pressão cai.
recap:
  - "Continuidade: a mesma quantidade de fluido passa por segundo em todo ponto do cano, então A v é constante."
  - "Estreitar o cano pela metade da área dobra a velocidade."
  - "Bernoulli: num fluido ideal, em escoamento estacionário e ao longo de uma linha de corrente, pressão + energia de movimento + energia de altura (por volume) é constante."
  - "Água saindo de um furo h abaixo da superfície sai a √(2 g h), como se caísse de h (Torricelli)."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [fluids, energy, conservation-laws]
  era: classical-mechanics-era
  people: [daniel-bernoulli, leonhard-euler, evangelista-torricelli]
  events: [hydrodynamica]
equations:
  - tex: A_1\,v_1 = A_2\,v_2
    spoken: "A um vezes v um é igual a A dois vezes v dois"
  - tex: p + \frac{1}{2}\,\rho\,v^2 + \rho\,g\,h = \text{constante}
    spoken: "p mais um meio de rô v ao quadrado mais rô g h é igual a uma constante"
  - tex: v = \sqrt{2\,g\,h}
    spoken: "v é igual à raiz quadrada de dois g h"
claims:
  - text: "Água a 2 m/s num cano que termina num bico com um quarto da área sai a 8 m/s"
    type: number
    check: compute
    formula: hose_speed_quarter_area
    expected: 8
    unit: m/s
    tolerance: 0.001
    status: verified
  - text: "Nessa aceleração de 2 para 8 m/s, em escoamento ideal à mesma altura, a pressão da água cai 30 kPa"
    type: number
    check: compute
    formula: bernoulli_dp_kpa
    expected: 30
    unit: kPa
    tolerance: 0.001
    status: verified
  - text: "Água saindo de um furo 5 m abaixo da superfície sai a cerca de 9,9 m/s"
    type: number
    check: compute
    formula: torricelli_5m
    expected: 9.9
    unit: m/s
    tolerance: 0.002
    status: verified
  - text: "Daniel Bernoulli publicou a Hydrodynamica em 1738; Euler escreveu as equações do escoamento de fluido ideal em 1757"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Hydrodynamica, https://en.wikipedia.org/wiki/Euler_equations_(fluid_dynamics)]
    status: verified
resources:
  - kind: study
    title: "14.7: Dinâmica de fluidos - equação da continuidade (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/14%3A_Mecanica_dos_Fluidos/14.07%3A_Din%C3%A2mica_de_fluidos
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "14.8: Equação de Bernoulli (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/14%3A_Mecanica_dos_Fluidos/14.08%3A_Equa%C3%A7%C3%A3o_de_Bernoulli
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Pressão do Fluido e Fluxo (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/fluid-pressure-and-flow
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Bernoulli's principle (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Bernoulli%27s_principle
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. II, ch. 40 The Flow of Dry Water (40-3 Bernoulli's theorem)"
    url: https://www.feynmanlectures.caltech.edu/II_40.html
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Num cano que afina, ou num rio que estreita, a água corre mais rápido no trecho estreito. A água não se acumula nem some no meio do caminho: a mesma quantidade que entra por segundo tem que sair. Se a passagem fica menor, ela precisa correr mais.

Em escoamento estacionário ideal, ao longo da mesma linha de corrente e na mesma altura, Bernoulli relaciona aumento de velocidade a queda de pressão. É a conservação da energia aplicada a um fluido: se ganha energia de movimento, alguma outra coisa precisa diminuir, e o que diminui é a pressão. Um caso particular é bonito: a água que sai de um furo no fundo de uma caixa d'água sai com a velocidade que teria se tivesse caído da superfície até o furo.

## Equação

$$
p + \frac{1}{2}\,\rho\,v^2 + \rho\,g\,h = \text{constante}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $A$ | área da seção do cano | m² |
| $v$ | velocidade do fluido | m/s |
| $p$ | pressão | Pa |
| $\rho$ | densidade do fluido | kg/m³ |
| $h$ | altura | m |

## Exemplo

Água a 2 m/s num cano que termina num bico com um quarto da área: pela continuidade, sai a 8 m/s. Desprezando perdas e mantendo a mesma altura, por Bernoulli a pressão no cano largo é $\tfrac12 \times 1000 \times (8^2 - 2^2) = 30$ kPa maior que no bico.

Uma caixa d'água com um furo 5 m abaixo da superfície: $v = \sqrt{2 \times 9{,}8 \times 5} \approx 9{,}9$ m/s.

## Onde isso volta

Bernoulli explica medidores de vazão (tubo de Venturi), o tubo de Pitot que mede a velocidade de aviões e parte da sustentação das asas. Fluidos reais têm viscosidade e turbulência (Navier-Stokes), e as mesmas ideias de fluxo reaparecem no eletromagnetismo e na relatividade.

## Pergunta-ponte

Se um gás é um fluido feito de trilhões de trilhões de moléculas, o que é a temperatura dele?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o avião voa só por Bernoulli, porque o ar de cima precisa chegar junto" | "a asa desvia o ar para baixo e a diferença de pressão aparece; o ar de cima não precisa chegar junto com o de baixo" |
| "pressão alta, fluido rápido" | "no mesmo escoamento e na mesma altura, onde a velocidade é maior a pressão é menor" |

## Nível técnico

Bernoulli vale ao longo de uma linha de corrente para escoamento estacionário, incompressível e sem viscosidade; sai da integração da equação de Euler $\rho\,(\partial_t \vec v + (\vec v\cdot\nabla)\vec v) = -\nabla p + \rho\vec g$. A continuidade geral é $\partial_t\rho + \nabla\cdot(\rho\vec v) = 0$. Com viscosidade, entra o termo $\mu\nabla^2\vec v$ (Navier-Stokes), e a existência de soluções suaves em 3D é um dos problemas do milênio do Instituto Clay.
