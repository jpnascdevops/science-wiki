---
id: rates-of-change
title: Taxa de variação e derivada
summary: A derivada é o ritmo de mudança num instante só, a inclinação da curva naquele ponto.
recap:
  - "Taxa de variação média: quanto a grandeza mudou dividido pelo tempo que levou."
  - "A derivada é essa taxa num instante, fazendo o intervalo tender a zero (o valor-limite da divisão)."
  - "Velocidade é a derivada da posição; aceleração é a derivada da velocidade."
  - "Newton e Leibniz criaram o cálculo de forma independente no século XVII."
levels: [zero, technical]
consensus: established
tags:
  area: math/calculus
  topics: [calculus, motion]
  era: scientific-revolution
  people: [isaac-newton, gottfried-leibniz]
  events: [leibniz-nova-methodus]
equations:
  - tex: \frac{\Delta x}{\Delta t}
    spoken: "delta x sobre delta t"
  - tex: v = \frac{\mathrm{d}x}{\mathrm{d}t} = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t}
    spoken: "v é igual a d x d t, que é o limite de delta x sobre delta t quando delta t tende a zero"
claims:
  - text: "Para x(t) = g t²/2, a velocidade em t = 2 s é cerca de 19,6 m/s"
    type: number
    check: compute
    formula: derivative_free_fall_2s
    expected: 19.6
    unit: m/s
    tolerance: 0.002
    status: verified
  - text: "Newton e Leibniz desenvolveram o cálculo de forma independente; Leibniz publicou primeiro, em 1684"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy]
    status: verified
resources:
  - kind: study
    title: "12.4: Derivativos (Pré-cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/12%3A_Introdu%C3%A7%C3%A3o_ao_c%C3%A1lculo/12.04%3A_Derivativos
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "3.4: Derivativos como taxas de variação (Cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/03%3A_Derivados/3.04%3A_Derivativos_como_taxas_de_varia%C3%A7%C3%A3o
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "The paradox of the derivative (3Blue1Brown lesson page, text version of Essence of Calculus ch. 2)"
    url: https://3blue1brown.com/lessons/derivatives
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Leibniz–Newton calculus controversy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "The essence of calculus (3Blue1Brown, ch. 1)"
    url: "https://www.youtube.com/watch?v=WUvTyaaNkzM"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Essence of calculus (3Blue1Brown playlist)"
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDMsr9K-rj53DwVRMYO3t5Yr"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

O velocímetro do carro não mostra a velocidade média da viagem; mostra quão rápido você vai agora. Mas "agora" é um instante, e num instante você não anda nada. Como pode haver velocidade?

A saída é olhar intervalos cada vez menores: quanto o carro andou em 1 s, em 0,1 s, em 0,001 s, sempre dividindo pelo tempo. A divisão se aproxima de um valor fixo. Esse valor é a derivada. No gráfico, é a inclinação da reta tangente, a que melhor acompanha a curva bem perto daquele ponto.

## Equação

$$
v = \frac{\mathrm{d}x}{\mathrm{d}t} = \lim_{\Delta t \to 0} \frac{\Delta x}{\Delta t}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\Delta x$ | quanto a posição mudou | m |
| $\Delta t$ | quanto tempo passou | s |
| $\mathrm{d}x/\mathrm{d}t$ | derivada da posição pelo tempo | m/s |
| $\lim$ | limite: o valor de que a conta se aproxima | — |

## Exemplo

Uma pedra em queda livre está em $x(t) = 4{,}9\,t^2$ metros abaixo do ponto de partida. Entre 1,9 s e 2,1 s ela anda $4{,}9\,(2{,}1^2 - 1{,}9^2) = 3{,}92$ m; dividido por 0,2 s, dá 19,6 m/s. Encolhendo o intervalo, o resultado fica em 19,6 m/s: é a velocidade exatamente em 2 s.

## Onde isso volta

Velocidade e aceleração são derivadas, e a segunda lei de Newton fala de aceleração. Em quase toda lei física aparece uma derivada: como a temperatura muda, como uma onda se move, como a função de onda evolui.

## Pergunta-ponte

Se a derivada tira a velocidade da posição, como fazer o caminho de volta?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "derivada é dividir por zero" | "derivada é o valor de que a divisão se aproxima quando o intervalo encolhe" |
| "velocidade média e instantânea são a mesma coisa" | "com velocidade constante, coincidem em qualquer intervalo; com aceleração constante, a média coincide com a instantânea no ponto médio do intervalo" |

## Nível técnico

Para $f(t) = t^n$, $f'(t) = n\,t^{n-1}$; para $x = \tfrac12 g t^2$, $\dot x = g t$ e $\ddot x = g$. Newton escrevia $\dot x$ (fluxões); Leibniz, $\mathrm{d}x/\mathrm{d}t$, notação que mostra a derivada como razão de variações infinitesimais e que prevaleceu. A definição rigorosa por limite ($\varepsilon$–$\delta$) só veio no século XIX, com Cauchy e Weierstrass.
