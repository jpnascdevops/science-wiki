---
id: schwarzschild-black-hole
title: Buraco negro de Schwarzschild
summary: A primeira solução exata das equações de Einstein já contém um horizonte de onde nada escapa.
recap:
  - "Primeira solução exata de Einstein (1916): tem um horizonte de onde nada escapa."
  - "r_s = 2GM/c²: cerca de 3 km para o Sol e 9 mm para a Terra."
  - "De fora, um buraco negro é só massa, carga e rotação."
levels: [zero, technical]
consensus: established
tags:
  area: physics/general-relativity
  topics: [black-holes, spacetime]
  era: modern-revolution
  people: [karl-schwarzschild, albert-einstein, robert-oppenheimer, hartland-snyder]
  arxiv_category: gr-qc
equations:
  - tex: ds^2 = -\left(1-\frac{r_s}{r}\right)c^2dt^2 + \left(1-\frac{r_s}{r}\right)^{-1}dr^2 + r^2 d\Omega^2
    spoken: "d s ao quadrado é igual a menos, um menos r s sobre r, vezes c ao quadrado d t ao quadrado; mais, um menos r s sobre r, elevado a menos um, vezes d r ao quadrado; mais r ao quadrado d ômega ao quadrado"
  - tex: r_s = \frac{2 G M}{c^2}
    spoken: "r s é igual a dois G M sobre c ao quadrado"
claims:
  - text: "O raio de Schwarzschild do Sol é cerca de 3 km"
    type: number
    check: compute
    formula: schwarzschild_radius_sun_km
    expected: 2.95
    unit: km
    tolerance: 0.01
    sources: [https://pt.wikipedia.org/wiki/Raio_de_Schwarzschild]
    status: verified
  - text: "O raio de Schwarzschild da Terra é cerca de 9 mm"
    type: number
    check: compute
    formula: schwarzschild_radius_earth_mm
    expected: 8.87
    unit: mm
    tolerance: 0.01
    sources: [https://pt.wikipedia.org/wiki/Raio_de_Schwarzschild]
    status: verified
  - text: "Schwarzschild encontrou a solução em 1916"
    type: date
    check: source
    sources: [https://pt.wikipedia.org/wiki/Raio_de_Schwarzschild]
    status: verified
  - text: "Em 1939, Einstein argumentou nos Annals of Mathematics que as singularidades de Schwarzschild não existem na realidade física"
    type: attribution
    check: source
    sources: [https://spark.iop.org/einstein-black-holes]
    status: verified
  - text: "Oppenheimer e Snyder publicaram 'On Continued Gravitational Contraction' na Physical Review em setembro de 1939"
    type: attribution
    check: source
    sources: [https://ui.adsabs.harvard.edu/abs/1939PhRv...56..455O/abstract]
    status: verified
  - text: "Na relatividade geral em quatro dimensões, sob as hipóteses usuais de unicidade em eletrovácuo assintoticamente plano, um buraco negro estacionário é caracterizado por massa, carga e momento angular"
    type: definition
    check: source
    sources: [https://pt.wikipedia.org/wiki/Teorema_da_calv%C3%ADcie]
    status: verified
resources:
  - kind: watch
    title: "NOVA (PBS): Black Hole Information Paradox, série What the Physics?!"
    url: https://www.pbs.org/wgbh/nova/video/black-hole-information-paradox
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Buraco negro"
    url: https://pt.wikipedia.org/wiki/Buraco-negro
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Raio de Schwarzschild"
    url: https://pt.wikipedia.org/wiki/Raio_de_Schwarzschild
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Teorema da calvície"
    url: https://pt.wikipedia.org/wiki/Teorema_da_calv%C3%ADcie
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "MIT OpenCourseWare 8.962: General Relativity (Scott Hughes, 2020)"
    url: https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Concentrando massa demais num espaço pequeno demais, a curvatura fica tão extrema que surge uma fronteira sem volta: o horizonte de eventos. Do lado de dentro, todos os caminhos possíveis, inclusive os da luz, apontam para o centro.

De fora, um buraco negro parado é a coisa mais simples do universo: só massa, carga e rotação. Os físicos dizem que "buraco negro não tem cabelo".

## Equação

$$
r_s = \frac{2\,G\,M}{c^2}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $r_s$ | raio do horizonte (raio de Schwarzschild) | m |
| $M$ | massa do buraco negro | kg |
| $ds^2$ | intervalo de espaço-tempo entre dois eventos próximos | m² |
| $d\Omega^2$ | parte angular (a superfície de uma esfera) | — |

## Exemplo

Para virar buraco negro, o Sol precisaria caber num raio de cerca de 3 km; a Terra, em cerca de 9 mm.

## Onde isso volta

O teorema da calvície cria a pergunta central da trilha: se de fora só sobram três números, onde está a informação do que caiu? A área do horizonte, $4\pi r_s^2$, vai virar a entropia do buraco negro.

## Pergunta-ponte

Um objeto que engole tudo pode ter temperatura e entropia?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "Schwarzschild provou que buracos negros existem" | "Schwarzschild achou a solução; a existência veio com o colapso de Oppenheimer-Snyder e, depois, com observações" |
| "o horizonte é uma superfície sólida" | "o horizonte é uma fronteira no espaço-tempo, não uma parede; num buraco negro muito grande, quem cai não sente nada de especial ao cruzá-lo, enquanto num pequeno as forças de maré já esticam o corpo antes" |

## Nível técnico

A divergência da métrica em $r = r_s$ é de coordenadas e some em Eddington-Finkelstein ou Kruskal; a singularidade física é $r = 0$, onde invariantes como $R_{\mu\nu\rho\sigma}R^{\mu\nu\rho\sigma} = 12 r_s^2/r^6$ divergem. Einstein (1939) argumentou contra a formação desses objetos; Oppenheimer e Snyder (1939) mostraram o colapso de uma nuvem de poeira até formar o horizonte; Penrose (1965) generalizou com o teorema de singularidade.
