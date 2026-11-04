---
id: capacitors
title: Capacitores
summary: Um capacitor guarda cargas opostas em duas placas separadas por um isolante; quanto maior a área e menor a distância, mais carga ele guarda por volt, e num circuito ele carrega e descarrega num ritmo dado por RC.
recap:
- 'Duas placas, um isolante no meio: cargas opostas se acumulam, uma em cada placa.'
- 'Capacitância C = Q/V: quanta carga por volt.'
- Placas maiores e mais próximas guardam mais.
- Carregando por um resistor, em um tempo RC ele chega a 63% do caminho.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - circuits
  era: classical-mechanics-era
  people:
  - ewald-von-kleist
  - pieter-van-musschenbroek
  - benjamin-franklin
  events:
  - leyden-jar
equations:
- tex: C = \frac{Q}{V}
  spoken: C é igual a Q sobre V
- tex: C = \varepsilon_0\,\frac{A}{d}
  spoken: C é igual a épsilon zero vezes A sobre d
- tex: V(t) = V_0\left(1 - e^{-t/RC}\right)
  spoken: V de t é igual a V zero vezes, um menos e elevado a menos t sobre R C
claims:
- id: claim-001
  text: Duas placas de 1 m² separadas por 1 mm de ar formam um capacitor de cerca de 8,85 nF
  type: number
  check: compute
  formula: plate_capacitor_1m2_1mm_nf
  expected: 8.854
  unit: nF
  tolerance: 0.002
  status: calculated
- id: claim-002
  text: Depois de um tempo RC, um capacitor carregando chega a cerca de 63% da voltagem final
  type: number
  check: compute
  formula: rc_charge_one_tau_percent
  expected: 63.2
  unit: '%'
  tolerance: 0.001
  status: calculated
- id: claim-003
  text: A garrafa de Leiden, um capacitor primitivo, foi inventada de forma independente por Ewald von Kleist (1745) e Pieter van Musschenbroek (1745–1746)
  type: date
  check: source
  sources:
  - https://www.britannica.com/technology/Leyden-jar
  - https://www.britannica.com:443/science/electromagnetism/Invention-of-the-Leyden-jar
  status: pending
resources:
- kind: watch
  title: 'Voltage & Capacitors: Crash Course Physics #27'
  url: https://www.pbs.org/video/crash-course-physics-27
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: 'PhET — Laboratório do Capacitor: Básico'
  url: https://phet.colorado.edu/pt/simulations/capacitor-lab-basics
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 8: Capacitância'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/08%3A_Capacitancia
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Capacitance
  url: https://hyperphysics.gsu.edu/hbase/electric/capac.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: Britannica — Leyden jar
  url: https://www.britannica.com/technology/Leyden-jar
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 6 (6-10 Condensers; parallel plates)
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

Ponha duas placas de metal frente a frente, sem se tocarem, e ligue cada uma a um terminal de uma bateria. Elétrons saem de uma placa e se acumulam na outra: uma fica positiva, a outra negativa. Nenhuma carga atravessa o espaço entre elas, porque ali há um isolante (ar, plástico, vidro). As cargas ficam ali, se atraindo através do vão. Isso é um capacitor: um lugar para guardar carga separada e, com ela, energia.

Quanto maiores as placas e mais perto uma da outra, mais carga cabe por volt. Esse "tamanho" é a capacitância. O primeiro capacitor foi uma garrafa de vidro com metal por dentro e por fora, a garrafa de Leiden, dos anos 1740; quem encostava nela levava um choque memorável.

Ligado a uma bateria através de um resistor, o capacitor não enche de uma vez. No começo a corrente é forte; conforme ele enche, a voltagem nas placas se aproxima da bateria e a corrente míngua. O ritmo é dado pelo produto RC.

## Equação

$$
C = \frac{Q}{V}
$$

```lab
capacitor
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $C$ | capacitância | F (farad = C/V) |
| $Q$ | carga em cada placa (+Q numa, −Q na outra) | C |
| $V$ | voltagem entre as placas | V |
| $A$ | área das placas | m² |
| $d$ | distância entre elas | m |
| $R$ | resistência por onde o capacitor carrega | Ω |
| $RC$ | constante de tempo $\tau$ | s |

## Exemplo

Duas placas de 1 m² separadas por 1 mm de ar: $C = 8{,}85\times10^{-12}\times 1/0{,}001 \approx 8{,}85$ nF. É pouco: capacitores reais enrolam folhas finíssimas e usam isolantes melhores para chegar a microfarads. Com 20 kΩ e 50 µF, $RC = 1$ s: depois de 1 s o capacitor está a 63% do caminho, depois de 5 s, a mais de 99%.

## Onde isso volta

O flash de uma câmera e o desfibrilador carregam um capacitor devagar e o descarregam de uma vez. Telas sensíveis ao toque medem mudanças de capacitância. O capacitor carregando também é o exemplo clássico para entender a corrente de deslocamento, o termo que Maxwell acrescentou às suas equações e que levou às ondas eletromagnéticas.

## Pergunta-ponte

O que determina quanta corrente passa por um fio quando há uma voltagem nele?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a corrente atravessa o capacitor" | "as cargas se acumulam nas placas; nenhuma atravessa o isolante" |
| "capacitor é uma bateria pequena" | "ele guarda carga separada e a solta depressa; a bateria gera voltagem por reações químicas e entrega energia devagar" |

## Nível técnico

A energia guardada é $U = \tfrac12 CV^2$, localizada no campo entre as placas, com densidade $\tfrac12\varepsilon_0 E^2$. Um dielétrico de constante $\kappa$ multiplica a capacitância por $\kappa$. Carga e descarga seguem $RC\,\dot V + V = V_{\text{fonte}}$, uma equação diferencial de primeira ordem, cuja solução é a exponencial. Entre as placas não há corrente de cargas, mas o campo varia; Maxwell chamou $\varepsilon_0\,\partial \vec E/\partial t$ de corrente de deslocamento, e é ela que mantém a lei de Ampère consistente.
