---
id: trigonometry
title: Trigonometria
summary: Seno, cosseno e tangente ligam os ângulos de um triângulo retângulo às proporções entre seus lados.
recap:
  - "Num triângulo retângulo, o ângulo fixa as proporções entre os lados."
  - "Seno = oposto / hipotenusa; cosseno = adjacente / hipotenusa; tangente = oposto / adjacente."
  - "Serve para decompor qualquer coisa inclinada em parte horizontal e parte vertical."
  - "As primeiras tabelas trigonométricas vieram da astronomia grega."
levels: [zero]
consensus: established
tags:
  area: math/geometry
  topics: [foundations]
  era: antiquity
  people: [hipparchus, ptolemy]
  events: []
equations:
  - tex: \sin\theta = \frac{\text{oposto}}{\text{hipotenusa}}
    spoken: "seno de teta é igual a oposto sobre hipotenusa"
  - tex: \cos\theta = \frac{\text{adjacente}}{\text{hipotenusa}}
    spoken: "cosseno de teta é igual a adjacente sobre hipotenusa"
  - tex: \tan\theta = \frac{\sin\theta}{\cos\theta}
    spoken: "tangente de teta é igual a seno de teta sobre cosseno de teta"
  - tex: \sin^2\theta + \cos^2\theta = 1
    spoken: "seno ao quadrado de teta mais cosseno ao quadrado de teta é igual a um"
claims:
  - text: "Uma rampa de 10 m inclinada 30° sobe 5 m"
    type: number
    check: compute
    formula: ramp_rise_30deg_10m
    expected: 5
    unit: m
    tolerance: 0.001
    status: verified
  - text: "A primeira tabela trigonométrica conhecida, uma tabela de cordas, é atribuída a Hiparco, no século II a.C."
    type: attribution
    check: source
    sources: [https://math.clarku.edu/~djoyce/ma105/trighist.html, https://mathshistory.st-andrews.ac.uk/SH/hipparchus_sh.pdf]
    status: verified
resources:
  - kind: study
    title: "5.4: Trigonometria do triângulo reto (Pré-cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/05%3A_Fun%C3%A7%C3%B5es_trigonom%C3%A9tricas/5.04%3A_Trigonometria_do_tri%C3%A2ngulo_reto
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Tour Trigonométrico (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/trig-tour
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "History of Trigonometry Outline (D. Joyce, Clark University)"
    url: https://math.clarku.edu/~djoyce/ma105/trighist.html
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Hipparchus of Nicaea - short biography (MacTutor, PDF)"
    url: https://mathshistory.st-andrews.ac.uk/SH/hipparchus_sh.pdf
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Desenhe dois triângulos retângulos com o mesmo ângulo, um pequeno e um enorme. Eles têm a mesma forma, só muda o tamanho. Então a proporção entre os lados depende só do ângulo. Seno, cosseno e tangente são os nomes dessas proporções.

Na prática, a trigonometria serve para uma coisa o tempo todo em física: pegar algo inclinado (uma rampa, um lançamento, uma força puxando de lado) e separar quanto vai na horizontal e quanto vai na vertical.

## Equação

$$
\sin\theta = \frac{\text{oposto}}{\text{hipotenusa}}, \qquad \cos\theta = \frac{\text{adjacente}}{\text{hipotenusa}}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\theta$ | ângulo | grau ou radiano |
| hipotenusa | lado oposto ao ângulo reto, o maior | m |
| oposto | lado em frente ao ângulo $\theta$ | m |
| adjacente | lado que encosta no ângulo $\theta$ | m |

## Exemplo

Uma rampa de 10 m inclinada 30°: a altura é $10 \times \sin 30° = 10 \times 0{,}5 = 5$ m, e o avanço na horizontal é $10 \times \cos 30° \approx 8{,}66$ m. Confira: $5^2 + 8{,}66^2 \approx 100 = 10^2$.

## Onde isso volta

Vetores se decompõem com seno e cosseno; lançamentos de projéteis, forças em rampas e torque usam isso. As ondas mais simples são senos que se repetem no tempo e no espaço; ondas complicadas são somas de senos (Fourier).

## Pergunta-ponte

Como somar duas coisas que apontam em direções diferentes?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "seno é uma função difícil" | "seno é uma proporção entre dois lados de um triângulo" |
| "o seno depende do tamanho do triângulo" | "depende só do ângulo" |
