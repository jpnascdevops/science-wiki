---
id: ampere-law
title: 'Correntes geram campos: Ørsted e Ampère'
summary: Uma corrente elétrica cria um campo magnético em círculos em volta do fio, mais forte perto dele; Ørsted descobriu isso em 1820 e Ampère logo mostrou que correntes se atraem e se repelem como ímãs.
recap:
- 'Corrente cria campo magnético: eletricidade e magnetismo estão ligados.'
- Em volta de um fio reto, o campo forma círculos (regra da mão direita).
- 'Ele cai com 1/r: B = μ₀ I / (2π r).'
- Fios com correntes no mesmo sentido se atraem; em sentidos opostos, se repelem.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - magnetism
  - electricity
  era: nineteenth-century
  people:
  - hans-christian-orsted
  - andre-marie-ampere
  events:
  - orsted-ampere-1820
equations:
- tex: B = \frac{\mu_0 I}{2\pi r}
  spoken: B é igual a mi zero vezes I sobre dois pi r
- tex: \oint \vec{B}\cdot\mathrm{d}\vec{\ell} = \mu_0 I
  spoken: a integral fechada de B escalar d ele é igual a mi zero vezes I
claims:
- text: Um fio com 10 A produz, a 1 cm, um campo de cerca de 200 µT, várias vezes o da Terra
  type: number
  check: compute
  formula: wire_field_10a_1cm_ut
  expected: 200.0
  unit: µT
  tolerance: 0.001
  status: verified
- text: Em abril de 1820, Hans Christian Ørsted viu uma corrente elétrica desviar a agulha de uma bússola; no fim de setembro do mesmo ano, André-Marie Ampère já demonstrava forças entre correntes
  type: date
  check: source
  sources:
  - https://britannica.com/biography/Hans-Christian-Orsted
  - https://aps.org/apsnews/2008/07/1820-oersted-electromagnetism
  - https://www.ebsco.com/research-starters/history/andre-marie-ampere-and-electromagnetism
  status: verified
resources:
- kind: watch
  title: 'Ampère''s Law: Crash Course Physics #33'
  url: https://www.pbs.org/video/amperes-law-crash-course-physics-33-3r0tv0/
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — 12.6: Lei de Ampère'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/12%3A_Fontes_de_campos_magneticos/12.06%3A_Lei_de_Amp%C3%A8re
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Campo Magnético / Eletroímãs (Magnets and Electromagnets)
  url: https://phet.colorado.edu/pt/simulations/magnets-and-electromagnets
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Ampere's Law
  url: https://hyperphysics.gsu.edu/hbase/magnetic/amplaw.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 13 — Magnetostatics (13-4 Ampère's law)
  url: https://feynmanlectures.caltech.edu/II_13.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Em 1820, durante uma aula, o dinamarquês Hans Christian Ørsted ligou uma corrente num fio que passava perto de uma bússola, e a agulha girou. Eletricidade e magnetismo, até então assuntos separados, estavam ligados: uma corrente elétrica cria um campo magnético.

O campo de um fio reto tem uma forma inesperada. Não aponta para o fio nem para longe dele: forma círculos em volta. Uma regra prática: com o polegar da mão direita apontando no sentido da corrente, os dedos dobrados mostram o sentido do campo. Ele é mais forte perto do fio e cai com o inverso da distância: no dobro da distância, metade do campo.

Semanas depois da notícia, Ampère mostrou em Paris que dois fios com corrente se atraem quando as correntes têm o mesmo sentido e se repelem quando têm sentidos opostos. Enrolando o fio numa bobina, os círculos se somam e o campo fica parecido com o de um ímã de barra: um eletroímã, que se liga e desliga com um interruptor.

## Equação

$$
B = \frac{\mu_0 I}{2\pi r}
$$

```lab
wire-field
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $B$ | intensidade do campo magnético | T |
| $I$ | corrente no fio | A |
| $r$ | distância até o fio | m |
| $\mu_0$ | permeabilidade do vácuo, $\approx 1{,}2566\times10^{-6}$ | T·m/A |
| $\mathrm d\vec\ell$ | pedacinho de um caminho fechado em volta da corrente | m |

## Exemplo

Um fio com 10 A, a 1 cm de distância: $B = 1{,}2566\times10^{-6}\times10/(2\pi\times0{,}01) \approx 200$ µT, várias vezes o campo da Terra (de 25 a 65 µT, e a bússola só sente a parte horizontal dele). Uma bússola encostada no fio obedece ao fio; a 10 cm, o campo cai para 20 µT e a Terra volta a mandar.

## Onde isso volta

Eletroímãs em guindastes de ferro-velho, alto-falantes, motores e ressonância magnética. A atração entre fios foi usada por décadas para definir o ampère. E Maxwell, ao corrigir a lei de Ampère, previu ondas eletromagnéticas com a velocidade da luz e concluiu que a luz é uma delas.

## Pergunta-ponte

Se uma corrente cria campo magnético, será que um campo magnético pode criar uma corrente?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "um fio com corrente vira um ímã com polo norte e sul" | "o campo de um fio reto forma círculos, sem polos; é a bobina que se parece com um ímã de barra" |
| "a bússola aponta para o fio" | "ela se alinha com os círculos em volta do fio, tangente a eles" |

## Nível técnico

A lei de Biot-Savart dá o campo de qualquer circuito: $\mathrm d\vec B = \frac{\mu_0}{4\pi}\frac{I\,\mathrm d\vec\ell\times\hat r}{r^2}$. A lei de Ampère na forma diferencial, $\nabla\times\vec B = \mu_0\vec J$, só vale para correntes estacionárias; Maxwell acrescentou o termo $\mu_0\varepsilon_0\,\partial\vec E/\partial t$. Num solenoide longo, $B = \mu_0 n I$ dentro. Dois fios paralelos sentem $F/L = \mu_0 I_1 I_2/(2\pi d)$. Desde 2019 o ampère é definido por $e$, e $\mu_0$ passou a ser medido.
