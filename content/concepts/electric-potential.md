---
id: electric-potential
title: Potencial elétrico e voltagem
summary: O potencial elétrico é a energia por unidade de carga em cada ponto, como uma altura numa paisagem; a voltagem é a diferença de potencial entre dois pontos, e cargas soltas descem essa ladeira ganhando energia.
recap:
- 'Potencial: energia potencial por coulomb em cada ponto (volt = joule por coulomb).'
- Voltagem é sempre uma diferença entre dois pontos.
- Cargas positivas descem do potencial alto para o baixo; negativas fazem o contrário.
- Um elétron que atravessa 1 V ganha 1 elétron-volt de energia.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - energy
  era: nineteenth-century
  people:
  - alessandro-volta
  events:
  - volta-pile
equations:
- tex: \Delta U = q\,\Delta V
  spoken: delta U é igual a q vezes delta V
- tex: V = k\,\frac{Q}{r}
  spoken: V é igual a k vezes Q sobre r
claims:
- text: Um elétron acelerado por 100 V, partindo do repouso, chega a cerca de 5,9 × 10⁶ m/s
  type: number
  check: compute
  formula: electron_speed_100v
  expected: 5930000.0
  unit: m/s
  tolerance: 0.002
  status: verified
- text: Alessandro Volta construiu por volta de 1800 a pilha voltaica, a primeira bateria elétrica
  type: date
  check: source
  sources:
  - https://www.britannica.com/technology/battery-electronics/Development-of-batteries
  status: verified
resources:
- kind: watch
  title: 'Voltage & Capacitors: Crash Course Physics #27'
  url: https://www.pbs.org/video/crash-course-physics-27
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 7: Potencial elétrico'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/07%3A_Potencial_eletrico
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Cargas e Campos (equipotenciais e voltímetro)
  url: https://phet.colorado.edu/pt/simulations/charges-and-fields
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Electric Voltage
  url: https://hyperphysics.gsu.edu/hbase/electric/elevol.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 4 — Electrostatics (4-3 Electric potential; 4-4 E = −∇φ)
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

Uma bola numa paisagem de morros desce sozinha e ganha velocidade; quanto mais alto começa, mais energia ganha. Com cargas elétricas é igual. Em cada ponto do espaço existe um número, o potencial elétrico, que faz o papel da altura: diz quanta energia cada coulomb de carga tem ali. Perto de uma carga positiva o potencial é alto; perto de uma negativa, baixo.

Uma carga positiva solta "desce" do potencial alto para o baixo, ganhando energia de movimento. Uma negativa, como o elétron, faz o contrário: é atraída para o potencial alto. A voltagem de uma pilha é a diferença de potencial entre seus dois terminais. Uma pilha de 1,5 V entrega 1,5 joule para cada coulomb que passa por ela, de um terminal ao outro. Volta construiu a primeira, empilhando discos de metais diferentes com papelão molhado entre eles.

## Equação

$$
\Delta U = q\,\Delta V
$$

```lab
potential
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $V$ | potencial elétrico num ponto | V (volt = J/C) |
| $\Delta V$ | diferença de potencial, ou voltagem | V |
| $\Delta U$ | variação da energia potencial da carga | J |
| $q$ | carga que se move | C |

## Exemplo

Um elétron parte do repouso e atravessa uma diferença de potencial de 100 V. Ele ganha $eV = 100$ elétron-volts, ou $1{,}6\times10^{-17}$ J. Igualando a $\tfrac12 m v^2$: $v = \sqrt{2eV/m} \approx 5{,}9\times10^6$ m/s, uns 2% da velocidade da luz. Os tubos de TV antigos faziam o mesmo, com dezenas de milhares de volts, para lançar elétrons contra a tela.

## Onde isso volta

Capacitores (guardar carga numa diferença de potencial), circuitos (a voltagem empurra a corrente), química (pilhas e baterias), e a física de partículas, onde energias se medem em elétron-volts: MeV, GeV, TeV.

## Pergunta-ponte

Dá para guardar carga e energia separadas por uma voltagem, como água numa represa?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a voltagem passa pelo fio" | "voltagem é a diferença entre dois pontos; o que passa pelo fio é a corrente" |
| "o pássaro no fio de alta tensão deveria levar choque" | "os dois pés estão no mesmo potencial: sem diferença, quase nenhuma corrente passa por ele" |

## Nível técnico

$\vec E = -\nabla V$: o campo aponta morro abaixo, perpendicular às superfícies equipotenciais. Na eletrostática, $\nabla^2 V = -\rho/\varepsilon_0$ (equação de Poisson). O zero do potencial é uma escolha, e só diferenças têm significado físico. O potencial existe porque o campo eletrostático é conservativo ($\nabla\times\vec E = 0$): o trabalho não depende do caminho. Com campos magnéticos variando isso deixa de valer, como se vê na indução.
