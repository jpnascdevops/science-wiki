---
id: energy-conservation
title: Conservação da energia
summary: A energia total de um sistema isolado nunca muda; ela só passa de uma forma para outra.
recap:
  - "Energia não se cria nem se destrói; só muda de forma."
  - "Sem atrito: cinética + potencial = constante."
  - "Com atrito, a energia mecânica vira calor, mas o total continua o mesmo."
  - "Uma pedra que cai de 20 m chega ao chão a cerca de 20 m/s, qualquer que seja a massa (sem resistência do ar)."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, conservation-laws]
  era: nineteenth-century
  people: [julius-robert-mayer, james-prescott-joule, hermann-von-helmholtz, emmy-noether]
  events: [helmholtz-conservation, joule-equivalent]
equations:
  - tex: E_c + E_p = \text{constante}
    spoken: "E c mais E p é igual a uma constante"
  - tex: \frac{1}{2}\,m\,v^2 = m\,g\,h \;\Rightarrow\; v = \sqrt{2\,g\,h}
    spoken: "um meio de m v ao quadrado é igual a m g h, logo v é igual à raiz quadrada de dois g h"
claims:
  - text: "Sem resistência do ar, uma pedra solta de 20 m chega ao chão a cerca de 19,8 m/s"
    type: number
    check: compute
    formula: drop_20m_speed
    expected: 19.8
    unit: m/s
    tolerance: 0.002
    status: verified
  - text: "Um pêndulo solto de 0,5 m de altura passa pelo ponto mais baixo a cerca de 3,1 m/s"
    type: number
    check: compute
    formula: pendulum_0_5m_speed
    expected: 3.13
    unit: m/s
    tolerance: 0.002
    status: verified
  - text: "Mayer (1842), Joule (anos 1840) e Helmholtz (1847, Sobre a conservação da força) são creditados pelo princípio da conservação da energia"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Julius_von_Mayer]
    status: verified
resources:
  - kind: study
    title: "8.4: Conservação de energia (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/08%3A_Energia_potencial_e_conservacao_de_energia/8.04%3A_Conserva%C3%A7%C3%A3o_de_energia
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Energia na Pista de Skate (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/energy-skate-park
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 4 Conservation of Energy"
    url: https://www.feynmanlectures.caltech.edu/I_04.html
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Conservation of energy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Conservation_of_energy
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "History of energy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/History_of_energy
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Law of conservation of energy (Khan Academy)"
    url: "https://en.khanacademy.org/science/ap-physics-1/ap-work-and-energy/conservation-of-energy-ap/v/law-of-conservation-of-energy"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Work, Energy, and Power: Crash Course Physics #9"
    url: "https://www.youtube.com/watch?v=w4QFJb9a8vo"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Solte uma bola do alto. Ela perde altura e ganha velocidade: a energia potencial vira cinética. Num pêndulo, isso vai e volta: no alto, tudo é potencial; embaixo, tudo é cinético. Se não houvesse atrito, ele balançaria para sempre.

E quando há atrito? A bola quica cada vez mais baixo e o pêndulo para. A energia parece sumir, mas foi para o calor (o ar, o chão e a corda esquentam um pouquinho). Medir isso foi o trabalho de Joule, e juntar tudo num princípio só foi a conquista de Mayer e Helmholtz no século XIX: a energia total nunca muda.

## Equação

$$
\frac{1}{2}\,m\,v^2 = m\,g\,h \;\Rightarrow\; v = \sqrt{2\,g\,h}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $E_c$ | energia cinética | J |
| $E_p$ | energia potencial | J |
| $v$ | velocidade | m/s |
| $h$ | altura de queda | m |
| $g$ | aceleração da gravidade | m/s² |

## Exemplo

Uma pedra cai de 20 m. Toda a energia potencial vira cinética: $v = \sqrt{2 \times 9{,}8 \times 20} \approx 19{,}8$ m/s. A massa cancelou: pedra grande e pequena chegam com a mesma velocidade, como Galileu dizia. Um pêndulo solto de 0,5 m de altura passa embaixo a cerca de 3,1 m/s.

## Onde isso volta

A primeira lei da termodinâmica é este princípio incluindo o calor. Na relatividade, a massa entra na conta como energia ($E = mc^2$). Pelo teorema de Noether, a conservação da energia vem do fato de as leis da física não mudarem com o tempo.

## Pergunta-ponte

Numa colisão, o momento se conserva; e a energia cinética?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o atrito destrói energia" | "o atrito transforma energia de movimento em calor" |
| "gastamos energia" | "transformamos energia em formas menos úteis" |
| "moto-perpétuo só não existe porque falta tecnologia" | "uma máquina que cria energia violaria a conservação da energia" |

## Nível técnico

Para forças conservativas, $\vec F = -\nabla E_p$ e o trabalho não depende do caminho, então $E_c + E_p$ é constante. O teorema de Noether (1918) associa a conservação da energia à invariância das leis sob translação no tempo; em espaço-tempos que mudam com o tempo, como o universo em expansão, não há em geral uma energia total global conservada.
