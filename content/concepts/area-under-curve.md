---
id: area-under-curve
title: Área sob a curva e integral
summary: A integral soma pedacinhos; a área embaixo do gráfico de velocidade é o deslocamento (a distância percorrida, se o corpo não volta).
recap:
  - "Integrar é somar infinitos pedacinhos pequenos."
  - "A área sob o gráfico de velocidade por tempo é o deslocamento."
  - "Integral e derivada são operações inversas (teorema fundamental do cálculo)."
  - "Arquimedes já calculava áreas curvas somando fatias, quase 2000 anos antes do cálculo."
levels: [zero, technical]
consensus: established
tags:
  area: math/calculus
  topics: [calculus, motion]
  era: scientific-revolution
  people: [archimedes, isaac-newton, gottfried-leibniz]
  events: [leibniz-nova-methodus]
equations:
  - tex: \Delta x = \int_{t_1}^{t_2} v(t)\,\mathrm{d}t
    spoken: "delta x é igual à integral de t um a t dois de v de t, d t"
  - tex: \Delta x = v\,\Delta t
    spoken: "delta x é igual a v vezes delta t"
claims:
  - id: claim-001
    text: "Com v = g t, a área sob a curva de 0 a 2 s dá cerca de 19,6 m"
    type: number
    check: compute
    formula: area_under_v_2s
    expected: 19.6
    unit: m
    tolerance: 0.002
    status: calculated
  - id: claim-002
    text: "Arquimedes mostrou, pelo método da exaustão, que a área de um segmento de parábola é 4/3 da área do triângulo inscrito"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Method_of_exhaustion]
    status: pending
resources:
  - kind: study
    title: "5.1: Aproximando áreas (Cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/05%3A_Integra%C3%A7%C3%A3o/5.01%3A_Aproximando_%C3%A1reas
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "5.2: A integral definida (Cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/05%3A_Integra%C3%A7%C3%A3o/5.02%3A_A_integral_definida
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "Integration and the fundamental theorem of calculus | Chapter 8, Essence of calculus (3Blue1Brown)"
    url: https://youtu.be/rfG8ce4nNh0
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Integral (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Integral
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Method of exhaustion (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Method_of_exhaustion
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Se você anda a 5 m/s por 10 s, anda 50 m. No gráfico de velocidade por tempo, isso é um retângulo de altura 5 e largura 10: a área é a distância. E se a velocidade muda o tempo todo? Corta-se o tempo em fatias finas, em cada fatia a velocidade quase não muda, soma-se a área de cada retângulo. Com fatias infinitamente finas, a soma vira a integral.

Arquimedes já usava a ideia de fatiar e somar para achar áreas curvas. Newton e Leibniz perceberam que somar fatias (integrar) é o caminho de volta de achar inclinações (derivar).

## Equação

$$
\Delta x = \int_{t_1}^{t_2} v(t)\,\mathrm{d}t
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\int$ | integral: soma contínua | — |
| $v(t)$ | velocidade em cada instante | m/s |
| $\mathrm{d}t$ | fatia de tempo infinitamente fina | s |
| $t_1, t_2$ | início e fim do intervalo | s |
| $\Delta x$ | deslocamento | m |

## Exemplo

Uma pedra em queda tem $v = 9{,}8\,t$. O gráfico é uma reta saindo do zero; de 0 a 2 s, a área é um triângulo de base 2 s e altura 19,6 m/s: $\tfrac12 \times 2 \times 19{,}6 = 19{,}6$ m. Somar 10 000 fatias no computador dá praticamente o mesmo número.

## Onde isso volta

Trabalho é a área sob o gráfico de força por distância; impulso, a área sob força por tempo. Energia potencial, fluxo de campo e probabilidade na quântica também são integrais.

## Pergunta-ponte

Velocidade e posição são números, mas um movimento também tem direção. Como lidar com isso?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "integral é a área de um desenho" | "integral é uma soma de pedacinhos; a área é uma forma de enxergá-la" |
| "área negativa não existe" | "abaixo do eixo a área conta com sinal negativo: andar para trás" |

## Nível técnico

Teorema fundamental: se $F'(t) = f(t)$, então $\int_a^b f(t)\,\mathrm{d}t = F(b) - F(a)$. Para $v = g t$, $x(t) = \tfrac12 g t^2$. A integral de Riemann é o limite das somas $\sum f(t_i)\,\Delta t$; o método da exaustão de Arquimedes é um precursor dela, sem a noção formal de limite.
