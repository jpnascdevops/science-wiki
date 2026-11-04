---
id: electromagnetic-induction
title: Indução eletromagnética (Faraday)
summary: Quando o fluxo magnético através de uma bobina muda, aparece uma voltagem nela, proporcional à rapidez da mudança; é assim que geradores, transformadores e fogões de indução funcionam.
recap:
- 'Fluxo magnético: quanto campo atravessa a bobina.'
- Fluxo mudando gera voltagem. Fluxo parado, mesmo grande, não gera nada.
- 'Quanto mais rápida a mudança e mais voltas, maior a voltagem: ε = −N dΦ/dt.'
- 'O sinal de menos (Lenz): a corrente induzida se opõe à mudança que a criou.'
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - magnetism
  - electricity
  - energy
  era: nineteenth-century
  people:
  - michael-faraday
  - james-clerk-maxwell
  events:
  - faraday-induction
equations:
- tex: \mathcal{E} = -N\,\frac{\mathrm{d}\Phi_B}{\mathrm{d}t}
  spoken: E cursivo é igual a menos N vezes d fi B sobre d t
- tex: \Phi_B = B\,A\cos\theta
  spoken: fi B é igual a B vezes A vezes cosseno de teta
claims:
- id: claim-001
  text: Uma bobina de 100 voltas e 0,01 m², com o campo indo de 0 a 0,1 T em 0,1 s, ganha uma voltagem de 1 V
  type: number
  check: compute
  formula: coil_emf_100turns
  expected: 1.0
  unit: V
  tolerance: 0.001
  status: calculated
- id: claim-002
  text: Uma bobina de 200 voltas e 0,02 m², girando a 60 Hz num campo de 0,05 T, chega a uns 75 V de pico
  type: number
  check: compute
  formula: generator_peak_emf_60hz
  expected: 75.4
  unit: V
  tolerance: 0.001
  status: calculated
- id: claim-003
  text: Michael Faraday descobriu a indução eletromagnética em 1831
  type: date
  check: source
  sources:
  - https://britannica.com/science/Faradays-law-of-induction
  status: pending
resources:
- kind: watch
  title: 'Induction - An Introduction: Crash Course Physics #34'
  url: https://www.pbs.org/video/induction-an-introduction-crash-course-physics-34-tb0vol
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Laboratório Eletromagnético de Faraday
  url: https://phet.colorado.edu/pt/simulations/faradays-electromagnetic-lab
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Lei de Faraday
  url: https://phet.colorado.edu/pt/simulations/faradays-law
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 13: Indução eletromagnética'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/13%3A_Inducao_eletromagnetica
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Faraday's Law (e Lei de Lenz)
  url: https://hyperphysics.gsu.edu/hbase/electric/farlaw.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: Britannica — Faraday's law of induction
  url: https://britannica.com/science/Faradays-law-of-induction
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 17 — The Laws of Induction
  url: https://feynmanlectures.caltech.edu/II_17.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Se uma corrente cria um campo magnético, um ímã deveria criar uma corrente? Faraday tentou por anos. Pôr um ímã parado ao lado de uma bobina não dava nada. Em 1831 ele percebeu o segredo: o que importa é a mudança. Empurre o ímã para dentro da bobina e o medidor salta; pare, e volta a zero; puxe para fora, e salta para o outro lado.

A grandeza que conta é o fluxo magnético, uma medida de quanto campo atravessa a bobina. Enquanto o fluxo está mudando, aparece uma voltagem na bobina, e quanto mais rápida a mudança, maior a voltagem. Bobinas com mais voltas somam a voltagem de cada volta. A corrente induzida sempre empurra contra a mudança (lei de Lenz): é por isso que é preciso fazer força para gerar eletricidade, e a energia não sai do nada.

Quase toda a eletricidade do mundo vem disso. Numa usina, uma turbina gira um ímã dentro de bobinas (nas grandes usinas, normalmente um eletroímã girando dentro de bobinas fixas); o fluxo muda o tempo todo e sai uma voltagem alternada.

## Equação

$$
\mathcal{E} = -N\,\frac{\mathrm{d}\Phi_B}{\mathrm{d}t}
$$

```lab
induction
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\mathcal E$ | força eletromotriz: a voltagem induzida | V |
| $N$ | número de voltas da bobina | — |
| $\Phi_B$ | fluxo magnético numa volta | Wb (weber = T·m²) |
| $B$ | campo magnético | T |
| $A$ | área de cada volta | m² |
| $\theta$ | ângulo entre o campo e a perpendicular à bobina | rad |

## Exemplo

Uma bobina de 100 voltas com 0,01 m² (um quadrado de 10 cm) num campo que sobe de 0 a 0,1 T em 0,1 s: $\mathcal E = 100\times(0{,}1\times0{,}01)/0{,}1 = 1$ V. Agora um gerador: 200 voltas de 0,02 m² girando 60 vezes por segundo (a frequência da rede no Brasil) num campo de 0,05 T dão um pico de $NBA\omega \approx 75$ V.

## Onde isso volta

Geradores de usinas, dínamos de bicicleta, transformadores (que só funcionam com corrente alternada, porque precisam de fluxo variando), fogões de indução, carregadores sem fio e leitores de cartão. Nas equações de Maxwell, a indução é a lei que diz que campo magnético variando cria campo elétrico.

## Pergunta-ponte

Campo magnético variando cria campo elétrico. Será que campo elétrico variando cria campo magnético?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "um ímã parado dentro da bobina gera corrente" | "só há voltagem enquanto o fluxo está mudando" |
| "o gerador cria energia elétrica do nada" | "ela vem do trabalho feito para girar a bobina contra a força que a corrente induzida produz" |

## Nível técnico

Na forma integral, $\oint\vec E\cdot\mathrm d\vec\ell = -\frac{\mathrm d}{\mathrm dt}\int\vec B\cdot\mathrm d\vec A$; na diferencial, $\nabla\times\vec E = -\partial\vec B/\partial t$. O campo elétrico induzido não é conservativo e não tem potencial. Para condutores em movimento, a voltagem vem da força $q\,\vec v\times\vec B$; Einstein notou que ímã andando e bobina andando dão o mesmo resultado, uma das pistas para a relatividade. A autoindutância guarda energia $\tfrac12 LI^2$ no campo magnético; um gerador de $N$ voltas girando com $\omega$ dá $\mathcal E = NBA\omega\sin\omega t$.
