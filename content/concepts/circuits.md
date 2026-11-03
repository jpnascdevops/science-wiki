---
id: circuits
title: Circuitos elétricos
summary: Num circuito, componentes podem ser ligados em série (a mesma corrente passa por todos e as voltagens se somam) ou em paralelo (todos recebem a mesma voltagem e as correntes se somam); as leis de Kirchhoff organizam qualquer caso.
recap:
- 'Série: um caminho só. Mesma corrente, voltagens se somam, R total = R₁ + R₂.'
- 'Paralelo: vários caminhos. Mesma voltagem, correntes se somam, R total menor que a menor.'
- 'Kirchhoff: a corrente que chega num nó é a que sai; as voltagens numa volta fechada somam zero.'
- 'Casas são ligadas em paralelo: cada aparelho recebe a voltagem inteira.'
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - circuits
  era: nineteenth-century
  people:
  - gustav-kirchhoff
  - georg-ohm
  events:
  - kirchhoff-laws
equations:
- tex: R_{\text{série}} = R_1 + R_2
  spoken: R série é igual a R um mais R dois
- tex: \frac{1}{R_{\text{paralelo}}} = \frac{1}{R_1} + \frac{1}{R_2}
  spoken: um sobre R paralelo é igual a um sobre R um mais um sobre R dois
claims:
- text: Resistores de 100 Ω e 200 Ω em série numa bateria de 9 V conduzem 30 mA
  type: number
  check: compute
  formula: series_100_200_9v_ma
  expected: 30.0
  unit: mA
  tolerance: 0.001
  status: verified
- text: Os mesmos dois em paralelo equivalem a cerca de 66,7 Ω
  type: number
  check: compute
  formula: parallel_100_200
  expected: 66.67
  unit: Ω
  tolerance: 0.001
  status: verified
resources:
- kind: watch
  title: 'Resistors & Batteries: Crash Course Physics #29'
  url: https://www.pbs.org/video/crash-course-physics-29
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: watch
  title: 'Capacitors and Kirchhoff: Crash Course Physics #31'
  url: https://www.pbs.org/video/capacitors-and-kirchhoff-crash-course-physics-31-jtuqfv
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: 'PhET — Kit de Construção de Circuitos: DC'
  url: https://phet.colorado.edu/pt/simulations/circuit-construction-kit-dc
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 10: Circuitos de corrente contínua'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/10%3A_Circuitos_de_corrente_continua
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Direct Current Circuit Concepts
  url: https://hyperphysics.gsu.edu/hbase/electric/dccircon.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Com mais de um aparelho, há duas formas básicas de ligar. Em série, um depois do outro, num caminho só: toda carga que passa pelo primeiro passa também pelo segundo. A corrente é a mesma nos dois, mas a voltagem da bateria se divide entre eles. Pisca-piscas de Natal antigos eram assim: queimava uma lâmpada, apagava tudo.

Em paralelo, cada aparelho tem seu próprio caminho entre os dois terminais. Todos recebem a voltagem inteira, e a corrente total é a soma das correntes de cada caminho. É assim que se liga uma casa: ligar a geladeira não diminui a voltagem do chuveiro, mas aumenta a corrente total que sai do quadro. Se ela passar do limite, o disjuntor desarma.

Por trás de qualquer circuito, por mais complicado, há duas regras de contabilidade, sistematizadas por Gustav Kirchhoff em meados do século XIX. A carga não some: o que entra num nó sai dele. E a energia não aparece do nada: somando as subidas e descidas de voltagem numa volta fechada, dá zero.

## Equação

$$
\frac{1}{R_{\text{paralelo}}} = \frac{1}{R_1} + \frac{1}{R_2}
$$

```lab
circuit
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $R_1, R_2$ | resistências de cada componente | Ω |
| $R_{\text{série}}$ | resistência equivalente em série | Ω |
| $R_{\text{paralelo}}$ | resistência equivalente em paralelo | Ω |

## Exemplo

Lâmpadas de 100 Ω e 200 Ω em série numa bateria de 9 V: $R = 300$ Ω, $I = 9/300 = 30$ mA, com 3 V na primeira e 6 V na segunda. Em paralelo: $R = 1/(1/100 + 1/200) \approx 66{,}7$ Ω, e a bateria entrega 135 mA, 90 na primeira e 45 na segunda. Em paralelo, as duas brilham muito mais.

## Onde isso volta

Circuitos com capacitores e bobinas oscilam como massas e molas (um circuito LC é um oscilador harmônico). Circuitos de corrente alternada se analisam com números complexos. Muitos circuitos viram sistemas de equações lineares, resolvidos com matrizes. E todo eletrônico é, no fim, um circuito.

## Pergunta-ponte

Uma corrente num fio cria alguma coisa no espaço em volta dele?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "em série, a primeira lâmpada gasta corrente e a segunda recebe menos" | "a mesma corrente passa pelas duas; o que se divide é a voltagem" |
| "ligar mais aparelhos em paralelo aumenta a resistência" | "diminui a resistência total e aumenta a corrente, por isso uma tomada com muitos aparelhos esquenta" |

## Nível técnico

As leis de Kirchhoff vêm da conservação da carga ($\sum I = 0$ em cada nó) e de o campo ser conservativo dentro dos fios ($\sum V = 0$ em cada malha, enquanto os campos magnéticos variáveis não importarem). A análise nodal monta um sistema linear $G\vec V = \vec I$. Com capacitores e indutores, as equações viram diferenciais: RC e RL decaem exponencialmente, e LC oscila com $\omega = 1/\sqrt{LC}$. Em corrente alternada, usa-se impedância complexa, $Z_C = 1/(i\omega C)$ e $Z_L = i\omega L$.
