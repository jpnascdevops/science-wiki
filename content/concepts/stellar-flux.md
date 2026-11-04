---
id: stellar-flux
title: Brilho, fluxo e luminosidade
summary: Uma estrela emite uma potência fixa; o brilho que chega aqui cai com o quadrado da distância.
recap:
  - "Luminosidade é a potência total da estrela; fluxo é o que chega por metro quadrado."
  - "O fluxo cai com o quadrado da distância: F = L / 4πd²."
  - "Na Terra, o Sol entrega cerca de 1.361 W/m²."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/stellar
  topics: [stars, light]
  arxiv_category: astro-ph.SR
equations:
  - tex: F = \frac{L}{4\pi d^2}
    spoken: "F é igual a L sobre quatro pi d ao quadrado"
  - tex: L = 4\pi R^2 \sigma T^4
    spoken: "L é igual a quatro pi R ao quadrado, sigma, T à quarta"
claims:
  - id: claim-001
    text: "O fluxo do Sol na distância da Terra (constante solar) é cerca de 1.361 W/m²"
    type: number
    check: compute
    formula: solar_constant_w_m2
    expected: 1361
    unit: W/m²
    tolerance: 0.005
    status: calculated
  - id: claim-002
    text: "O brilho aparente cai com o inverso do quadrado da distância"
    type: definition
    check: source
    sources: [https://astronomynotes.com/starprop/s3.htm]
    status: pending
resources:
  - kind: read
    title: "LibreTexts: Stellar and Celestial Object Brightness"
    url: https://phys.libretexts.org/Bookshelves/Astronomy__Cosmology/Introduction_to_Astronomy_(Lumen)/11%3A_Stellar_Properties/11.15%3A_Stellar_and_Celestial_Object_Brightness
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Strobel: Properties of Stars, Inverse Square Law"
    url: https://astronomynotes.com/starprop/s3.htm
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: study
    title: "Observatório do Valongo (UFRJ): Radiação eletromagnética, magnitudes, cores, corpos negros"
    url: https://walterwsmf.github.io/BCMT/lectures/aula10_Radiacao.pdf
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "Stars: Crash Course Astronomy #26 (luminosity, HR diagram)"
    url: "https://www.pbs.org/video/crash-course-astronomy-26/"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Distances: Crash Course Astronomy #25"
    url: "https://www.youtube.com/watch?v=CWMh61yutjU"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma estrela solta uma quantidade fixa de energia por segundo: a luminosidade. Essa energia se espalha numa esfera cada vez maior. Longe da estrela, a mesma energia se divide por uma área maior, então cada metro quadrado recebe menos. É o brilho que a gente mede: o fluxo.

Uma lanterna ajuda a imaginar: o círculo de luz numa parede fica maior e mais fraco quando você se afasta. A analogia falha porque a lanterna mira numa direção; a estrela brilha em todas.

## Equação

$$
F = \frac{L}{4\pi d^2}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $F$ | fluxo: potência por área que chega | W/m² |
| $L$ | luminosidade: potência total da estrela | W |
| $d$ | distância até a estrela | m |
| $R$ | raio da estrela | m |
| $T$ | temperatura da superfície | K |

## Exemplo

O Sol emite cerca de $3{,}8\times10^{26}$ W. Na distância da Terra (1 UA), isso dá cerca de 1.361 W por metro quadrado: a constante solar. Em Marte, 1,5 vez mais longe, chega menos da metade.

## Onde isso volta

Uma curva de luz é o fluxo de uma estrela medido ao longo do tempo. Quando um planeta passa na frente, o fluxo cai um pouco. E o fluxo que um planeta recebe decide se ele fica na zona habitável.

## Pergunta-ponte

O que acontece com o fluxo medido quando algo passa entre a estrela e a gente?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "estrela mais brilhante é estrela mais potente" | "o brilho aparente depende da luminosidade e da distância" |
| "dobrar a distância corta o brilho pela metade" | "dobrar a distância divide o brilho por quatro" |

## Nível técnico

Combinando com Stefan-Boltzmann, $L = 4\pi R^2\sigma T^4$: duas estrelas com a mesma temperatura têm luminosidades na razão do quadrado dos raios. Em astronomia, o brilho aparente costuma vir em magnitudes, $m_1 - m_2 = -2{,}5\log_{10}(F_1/F_2)$: cinco magnitudes valem um fator 100 em fluxo.
