---
id: newton-gravity
title: Gravidade de Newton
summary: Toda massa atrai toda massa, com força que cai com o quadrado da distância.
levels: [zero, technical]
prerequisites: [force-and-motion]
leads_to: [escape-velocity, general-relativity]
tags:
  area: physics/classical-mechanics
  topics: [gravity]
  era: "1687"
  people: [isaac-newton, urbain-le-verrier, johann-galle]
  arxiv_category: physics.hist-ph
equations:
  - tex: F = \frac{G\,M\,m}{r^2}
    spoken: "F é igual a G M m sobre r ao quadrado"
  - tex: \vec F = -\frac{G M m}{r^2}\hat r
    spoken: "F vetor é igual a menos G M m sobre r ao quadrado, na direção r chapéu"
claims:
  - text: "Uma pessoa de 60 kg na superfície da Terra sofre uma força de cerca de 589 N"
    type: number
    check: compute
    formula: weight_60kg_newton
    expected: 589
    unit: N
    tolerance: 0.01
    status: verified
  - text: "Newton publicou a gravitação universal nos Principia, em 1687"
    type: date
    check: source
    sources: [https://pt.wikipedia.org/wiki/Lei_da_gravita%C3%A7%C3%A3o_universal]
    status: verified
  - text: "Galle encontrou Netuno em 23 de setembro de 1846, a partir dos cálculos de Le Verrier"
    type: attribution
    check: source
    sources: [https://www.britannica.com/place/Neptune-planet/Neptunes-discovery]
    status: verified
  - text: "Le Verrier notou em 1859 um avanço anômalo do periélio de Mercúrio de cerca de 43 segundos de arco por século"
    type: attribution
    check: source
    sources: [https://arxiv.org/pdf/1705.04397]
    status: verified
resources:
  - kind: watch
    title: "Khan Academy: Introdução à lei da gravitação de Newton"
    url: https://pt.khanacademy.org/science/physics/centripetal-force-and-gravitation/gravity-newtonian/v/introduction-to-newton-s-law-of-gravitation
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Lei da gravitação universal"
    url: https://pt.wikipedia.org/wiki/Lei_da_gravita%C3%A7%C3%A3o_universal
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Britannica: Neptune's discovery"
    url: https://www.britannica.com/place/Neptune-planet/Neptunes-discovery
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Para Newton, toda massa puxa toda massa. A força cresce com as massas e cai rápido com a distância: dobrar a distância deixa a força quatro vezes menor. A mesma conta explica a maçã caindo e a Lua em órbita.

## Equação

$$
F = \frac{G\,M\,m}{r^2}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $G$ | constante da gravitação, $6{,}674\times10^{-11}$ | N·m²/kg² |
| $M,\ m$ | as duas massas | kg |
| $r$ | distância entre os centros | m |

## Exemplo

Uma pessoa de 60 kg na superfície da Terra: $F \approx 589$ N. É o peso dela; a balança mostra 60 kg porque divide por 9,8 m/s².

## Onde isso volta

Le Verrier usou essa lei para prever Netuno, encontrado por Galle em 1846. A mesma lei falhou em explicar um pequeno excesso na precessão de Mercúrio, cerca de 43″ por século. A explicação veio com a relatividade geral.

## Pergunta-ponte

Se a gravidade fica mais forte perto de massas compactas, existe um ponto em que nada consegue escapar?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "Einstein provou que Newton estava errado" | "Newton é um caso particular, válido para gravidade fraca e baixas velocidades" |
| "no espaço não há gravidade" | "em órbita tudo cai junto, por isso parece não haver peso" |

## Nível técnico

A forma vetorial é $\vec F = -\frac{GMm}{r^2}\hat r$, ou, com o potencial gravitacional, $\vec g = -\nabla\Phi$ e $\nabla^2\Phi = 4\pi G\rho$ (equação de Poisson). Na relatividade geral, no limite de campo fraco, $g_{00}\approx-(1+2\Phi/c^2)$ recupera exatamente essa equação.
