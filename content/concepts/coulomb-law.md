---
id: coulomb-law
title: Lei de Coulomb
summary: A força entre duas cargas é proporcional ao produto delas e cai com o quadrado da distância, a mesma forma da gravidade de Newton, mas cerca de 10³⁹ vezes mais forte entre um próton e um elétron.
recap:
- 'F = k q₁ q₂ / r²: produto das cargas sobre a distância ao quadrado.'
- Dobrou a distância, a força cai para um quarto.
- Mesma forma da gravidade, mas pode atrair ou repelir.
- É absurdamente forte; não a vemos agindo à distância entre objetos porque a matéria é quase perfeitamente neutra.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - foundations
  era: classical-mechanics-era
  people:
  - charles-coulomb
  - isaac-newton
  events:
  - coulomb-torsion-balance
equations:
- tex: F = k\,\frac{q_1 q_2}{r^2}
  spoken: F é igual a k vezes q um vezes q dois, sobre r ao quadrado
- tex: k = \frac{1}{4\pi\varepsilon_0} \approx 8{,}99 \times 10^{9}\ \mathrm{N\,m^2/C^2}
  spoken: k é igual a um sobre quatro pi épsilon zero, aproximadamente oito vírgula noventa e nove vezes dez à nona newton metro quadrado por coulomb ao quadrado
claims:
- text: A constante de Coulomb vale cerca de 8,99 × 10⁹ N·m²/C²
  type: number
  check: compute
  formula: coulomb_constant
  expected: 8988000000.0
  unit: N·m²/C²
  tolerance: 0.001
  status: verified
- text: Duas cargas de 1 µC a 10 cm uma da outra se empurram com cerca de 0,9 N
  type: number
  check: compute
  formula: coulomb_two_1uc_10cm
  expected: 0.899
  unit: N
  tolerance: 0.002
  status: verified
- text: Entre um próton e um elétron, a força elétrica é cerca de 2,3 × 10³⁹ vezes maior que a gravitacional
  type: number
  check: compute
  formula: electric_over_gravity_pe
  expected: 2.27e+39
  unit: ''
  tolerance: 0.005
  status: verified
- text: Charles-Augustin de Coulomb publicou a lei do inverso do quadrado da força elétrica a partir de 1785, medindo-a com uma balança de torção
  type: date
  check: source
  sources:
  - https://www.britannica.com/EBchecked/topic/140071/Charles-Augustin-de-Coulomb
  status: verified
resources:
- kind: watch
  title: 'Electric Charge: Crash Course Physics #25 (ends with Coulomb''s law)'
  url: https://www.pbs.org/video/crash-course-physics-25
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Lei de Coulomb
  url: https://phet.colorado.edu/pt/simulations/coulombs-law
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — 5.4: Lei de Coulomb'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/05%3A_Cargas_eletricas_e_campos/5.04%3A_Lei_de_Coulomb
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Electric Forces (Coulomb's law)
  url: https://hyperphysics.gsu.edu/hbase/electric/elefor.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 4 — Electrostatics (4-2 Coulomb's law; superposition)
  url: https://feynmanlectures.caltech.edu/II_04.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Duas cargas se empurram ou se puxam, e quanto mais perto, mais forte. Coulomb mediu isso nos anos 1780 com uma balança de torção: um fio fino que torce quando uma bolinha carregada é empurrada por outra. O resultado tem a mesma forma da gravidade de Newton. A força é proporcional ao produto das cargas e cai com o quadrado da distância: dobre a distância e ela fica quatro vezes menor.

Há duas diferenças. A gravidade só atrai; a força elétrica pode atrair (sinais opostos) ou repelir (sinais iguais). E ela é muito mais forte. Entre um próton e um elétron, a atração elétrica é uns $10^{39}$ vezes maior que a gravitacional. Então por que a gravidade manda no movimento dos planetas? Porque a matéria grande é quase perfeitamente neutra: as atrações e repulsões se cancelam, e sobra só a gravidade, que nunca se cancela.

## Equação

$$
F = k\,\frac{q_1 q_2}{r^2}
$$

```lab
coulomb
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $F$ | força em cada carga (iguais e opostas) | N |
| $q_1, q_2$ | as duas cargas, com sinal | C |
| $r$ | distância entre elas | m |
| $k$ | constante de Coulomb, $\approx 8{,}99 \times 10^9$ | N·m²/C² |
| $\varepsilon_0$ | permissividade do vácuo, $k = 1/(4\pi\varepsilon_0)$ | C²/(N·m²) |

## Exemplo

Duas cargas de 1 microcoulomb a 10 cm uma da outra: $F = 8{,}99 \times 10^9 \times (10^{-6})^2 / 0{,}1^2 \approx 0{,}9$ N, mais ou menos o peso de um copo de 90 g. A 20 cm, um quarto disso. Um microcoulomb parece pouco, mas é bem mais do que um balão esfregado costuma acumular.

## Onde isso volta

O campo elétrico é a lei de Coulomb reorganizada: em vez de perguntar a força entre duas cargas, pergunta-se o que cada carga faz no espaço em volta. Ela também segura os elétrons nos átomos e explica as ligações químicas e o atrito, o empurrão de uma mão na mesa e quase toda força do dia a dia que não é gravidade.

## Pergunta-ponte

Como uma carga "sabe" que a outra está lá, sem nada encostando nelas?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a força elétrica é fraca" | "ela é enorme; só não a vemos agindo à distância porque a matéria é quase sempre neutra" |
| "a carga maior empurra mais a menor do que é empurrada" | "pela terceira lei de Newton, as duas forças são iguais e opostas, mesmo com cargas diferentes" |

## Nível técnico

Na forma vetorial, $\vec F_{12} = k q_1 q_2\,\hat r_{12}/r^2$, e forças de várias cargas se somam (superposição). Para uma carga pontual, a lei de Gauss, $\oint \vec E\cdot\mathrm d\vec A = Q/\varepsilon_0$, com simetria esférica dá a lei de Coulomb; na eletrostática (com $\nabla\times\vec E = 0$), as duas são equivalentes. Desde 2019, com $e$ fixado por definição, $\varepsilon_0$ (e portanto $k$) passou a ser uma grandeza medida, ligada à constante de estrutura fina. A forma $1/r^2$ foi testada com precisão altíssima; um desvio indicaria um fóton com massa.
