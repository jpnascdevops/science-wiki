---
id: escape-velocity
title: Velocidade de escape
summary: A velocidade mínima para nunca mais voltar; quando ela chega à da luz, nasce a ideia de buraco negro.
recap:
  - "Velocidade mínima para nunca mais voltar: v = raiz de 2GM/r."
  - "Terra: 11,2 km/s. Espremer a mesma massa aumenta essa velocidade."
  - "Quando ela chega à velocidade da luz, o raio é r_s = 2GM/c²."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [gravity, black-holes]
  era: classical-mechanics-era
  people: [john-michell, pierre-simon-laplace]
equations:
  - tex: v_{esc} = \sqrt{\frac{2\,G\,M}{r}}
    spoken: "v escape é igual à raiz de dois G M sobre r"
  - tex: \frac{1}{2} m v^2 = \frac{G M m}{r}
    spoken: "um meio m v ao quadrado é igual a G M m sobre r"
  - tex: r_s = \frac{2\,G\,M}{c^2}
    spoken: "r s é igual a dois G M sobre c ao quadrado"
claims:
  - id: claim-001
    text: "A velocidade de escape da Terra é cerca de 11,2 km/s"
    type: number
    check: compute
    formula: escape_velocity_earth_km_s
    expected: 11.2
    unit: km/s
    tolerance: 0.01
    sources: [https://pt.wikipedia.org/wiki/Velocidade_de_escape]
    status: calculated
  - id: claim-002
    text: "A velocidade de escape na superfície do Sol é cerca de 618 km/s"
    type: number
    check: compute
    formula: escape_velocity_sun_km_s
    expected: 618
    unit: km/s
    tolerance: 0.01
    status: calculated
  - id: claim-003
    text: "John Michell descreveu estrelas escuras numa carta a Henry Cavendish datada de 27 de novembro de 1783, publicada pela Royal Society em 1784"
    type: date
    check: source
    sources: [https://aps.org/publications/apsnews/200911/physicshistory.cfm, https://en.wikipedia.org/wiki/Dark_star_(Newtonian_mechanics)]
    status: pending
    note: "A Wikipedia em português data a ideia de 1784 (ano da publicação); 1783 é a data da carta."
  - id: claim-004
    text: "Laplace divulgou a mesma ideia em 1796"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Dark_star_(Newtonian_mechanics)]
    status: pending
resources:
  - kind: read
    title: "Wikipedia: Velocidade de escape"
    url: https://pt.wikipedia.org/wiki/Velocidade_de_escape
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "APS News: November 27, 1783: John Michell anticipates black holes"
    url: https://aps.org/publications/apsnews/200911/physicshistory.cfm
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Dark star (Newtonian mechanics)"
    url: https://en.wikipedia.org/wiki/Dark_star_(Newtonian_mechanics)
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Escape velocity (Khan Academy)"
    url: "https://www.khanacademy.org/science/bmc-grade-10-science/x4e98504963be64d8:gravitation/x4e98504963be64d8:escape-velocity/v/escape-velocity"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Jogue uma pedra para cima e ela volta. Jogue mais rápido e ela sobe mais. Existe uma velocidade a partir da qual ela nunca volta: a velocidade de escape. Quanto mais massa e quanto mais compacto o corpo, maior ela é.

A imagem da pedra falha num ponto: a velocidade de escape não depende da direção nem da massa da pedra, da massa do astro e da distância inicial ao centro. Isso supõe ausência de arrasto e de propulsão posterior; a trajetória também não pode colidir com o astro.

## Equação

$$
v_{esc} = \sqrt{\frac{2\,G\,M}{r}}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $v_{esc}$ | velocidade de escape | m/s |
| $G$ | constante da gravitação | N·m²/kg² |
| $M$ | massa do planeta ou estrela | kg |
| $r$ | distância ao centro (o raio, na superfície) | m |
| $r_s$ | raio em que $v_{esc}$ chega a $c$ | m |

## Exemplo

Terra: 11,2 km/s. Sol: 618 km/s. Espremendo a Terra sem mudar sua massa, $v_{esc}$ sobe; ela chega à velocidade da luz quando o raio é cerca de 9 mm.

```lab
escape-velocity
```

## Onde isso volta

Igualando $v_{esc} = c$, sai $r_s = 2GM/c^2$. John Michell pensou nisso em 1783 usando Newton: "estrelas escuras". A relatividade geral, que é a teoria correta, dá exatamente a mesma fórmula para o raio do horizonte de um buraco negro.

## Pergunta-ponte

O que a teoria correta da gravidade diz sobre um objeto assim?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "Michell descobriu os buracos negros" | "Michell imaginou estrelas escuras com a física de Newton" |
| "a luz cai de volta como uma pedra" | "na relatividade, a luz não sai do horizonte; a imagem da pedra é só newtoniana" |

## Nível técnico

Conservação de energia: $\frac12 mv^2 - \frac{GMm}{r} = 0$ no limiar de escape, logo $v_{esc}=\sqrt{2GM/r}$. A coincidência com o raio de Schwarzschild é numérica: na relatividade geral, $r_s$ é onde $g_{tt}$ muda de sinal, e a luz não "desacelera"; ela fica presa porque todos os cones de luz apontam para dentro.
