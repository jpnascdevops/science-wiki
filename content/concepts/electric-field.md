---
id: electric-field
title: Campo elétrico
summary: Cada carga cria em volta de si um campo elétrico, um mapa que diz, em cada ponto do espaço, para onde e com que força uma carga de teste seria empurrada.
recap:
- 'Campo elétrico: a força que uma carga de teste sentiria, dividida pela carga dela.'
- Aponta para longe das cargas positivas e para perto das negativas.
- Campos de várias cargas se somam como vetores.
- Linhas de campo (ideia de Faraday) saem das positivas e chegam às negativas.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - foundations
  era: nineteenth-century
  people:
  - michael-faraday
  - james-clerk-maxwell
  events: []
equations:
- tex: \vec{E} = \frac{\vec{F}}{q}
  spoken: E vetor é igual a F vetor sobre q
- tex: E = k\,\frac{Q}{r^2}
  spoken: E é igual a k vezes Q sobre r ao quadrado
claims:
- text: Uma carga de 1 nC produz, a 1 m de distância, um campo de cerca de 9 N/C
  type: number
  check: compute
  formula: field_1nc_1m
  expected: 8.99
  unit: N/C
  tolerance: 0.002
  status: verified
- text: Michael Faraday introduziu as linhas de força nos anos 1830 e, até cerca de 1850, chegou à ideia de campo como algo que existe no espaço
  type: date
  check: source
  sources:
  - https://www.britannica.com:443/print/article/213098
  - https://www.britannica.com/biography/Michael-Faraday/Later-life
  status: verified
resources:
- kind: watch
  title: 'Electric Fields: Crash Course Physics #26'
  url: https://www.pbs.org/video/crash-course-physics-26
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Cargas e Campos
  url: https://phet.colorado.edu/pt/simulations/charges-and-fields
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — 5.5: Campo elétrico'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/05%3A_Cargas_eletricas_e_campos/5.05%3A_Campo_el%C3%A9trico
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Electric Field
  url: https://hyperphysics.gsu.edu/hbase/electric/elefie.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 6 — The Electric Field in Various Circumstances
  url: https://www.feynmanlectures.caltech.edu/II_06.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

A lei de Coulomb diz quanto duas cargas se empurram, mas deixa uma pergunta: como uma carga age sobre outra sem nada no meio? Faraday propôs uma resposta que virou um dos conceitos centrais da física. Cada carga muda o espaço em volta de si. Esse espaço modificado é o campo. Uma segunda carga posta ali não sente a primeira diretamente: sente o campo no lugar onde está.

Dá para pensar no campo como um mapa de setas. Em cada ponto, a seta diz para onde uma pequena carga positiva seria empurrada e com que força. Perto de uma carga positiva, as setas apontam para fora; perto de uma negativa, para dentro. Com várias cargas, as setas de cada uma se somam. Faraday desenhava linhas que seguem essas setas: elas saem das cargas positivas e terminam nas negativas, e ficam mais juntas onde o campo é mais forte.

## Equação

$$
\vec{E} = \frac{\vec{F}}{q}
$$

```lab
field-lines
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec E$ | campo elétrico | N/C (igual a V/m) |
| $\vec F$ | força numa pequena carga de teste | N |
| $q$ | carga de teste | C |
| $Q$ | carga que cria o campo | C |
| $r$ | distância até ela | m |

## Exemplo

Uma carga de 1 nanocoulomb cria, a 1 m, um campo de $8{,}99\times10^9 \times 10^{-9}/1^2 \approx 9$ N/C. Um elétron posto ali sente $F = eE \approx 1{,}4\times10^{-18}$ N. A 2 m, o campo cai para um quarto, uns 2,2 N/C.

## Onde isso volta

O potencial elétrico (a "altura" associada ao campo), os capacitores (campo uniforme entre placas), as equações de Maxwell e a luz, que é um campo elétrico e magnético viajando sozinho pelo espaço. Foi esse passo que tornou o campo uma coisa real, que carrega energia.

## Pergunta-ponte

Quanta energia uma carga ganha ao ser empurrada pelo campo de um ponto até outro?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "as linhas de campo são fios que existem no espaço" | "as linhas são um desenho; o campo existe em todo ponto, inclusive entre as linhas" |
| "campo e força são a mesma coisa" | "campo é força por unidade de carga; a força depende de qual carga se coloca ali" |

## Nível técnico

Para uma distribuição de cargas, $\vec E(\vec r) = k\int \rho(\vec r\,')(\vec r - \vec r\,')/|\vec r - \vec r\,'|^3\,\mathrm dV'$. Valem a lei de Gauss, $\nabla\cdot\vec E = \rho/\varepsilon_0$, e, na eletrostática, $\nabla\times\vec E = 0$, o que permite escrever $\vec E = -\nabla V$. O campo carrega energia com densidade $u = \tfrac12\varepsilon_0 E^2$. Mudanças nas cargas não se espalham instantaneamente: viajam à velocidade da luz, o que só a teoria completa de Maxwell explica.
