---
id: black-hole-thermodynamics
title: Termodinâmica de buracos negros
summary: Buracos negros têm entropia proporcional à área, temperatura, e evaporam emitindo radiação Hawking.
levels: [zero, technical]
prerequisites: [schwarzschild-black-hole, entropy, entanglement]
leads_to: [information-paradox]
tags:
  area: physics/quantum-gravity
  topics: [black-holes, entropy, hawking-radiation]
  era: "1974"
  people: [jacob-bekenstein, stephen-hawking]
  arxiv_category: gr-qc
equations:
  - tex: S_{BH} = \frac{k_B c^3 A}{4 G \hbar} = \frac{A}{4\ell_P^2}\,k_B
    spoken: "S B H é igual a k B c ao cubo A sobre quatro G agá cortado; ou seja, A sobre quatro ele P ao quadrado, vezes k B"
  - tex: T_H = \frac{\hbar c^3}{8\pi G M k_B}
    spoken: "T H é igual a agá cortado c ao cubo sobre oito pi G M k B"
  - tex: M(t) = M_0\left(1 - \frac{t}{t_{evap}}\right)^{1/3}
    spoken: "M de t é igual a M zero vezes, um menos t sobre t evap, elevado a um terço"
  - tex: t_{evap} \approx \frac{5120\,\pi\, G^2 M_0^3}{\hbar c^4}
    spoken: "t evap é aproximadamente cinco mil cento e vinte pi G ao quadrado M zero ao cubo, sobre agá cortado c à quarta"
claims:
  - text: "Um buraco negro com a massa do Sol tem temperatura de cerca de 6,2 × 10^-8 K"
    type: number
    check: compute
    formula: hawking_temperature_sun_kelvin
    expected: 6.17e-8
    unit: K
    tolerance: 0.01
    status: verified
  - text: "A entropia de um buraco negro solar é cerca de 10^77 vezes k_B"
    type: number
    check: compute
    formula: bh_entropy_sun_kb
    expected: 1.05e77
    tolerance: 0.02
    status: verified
  - text: "Considerando só fótons, um buraco negro solar levaria cerca de 2 × 10^67 anos para evaporar"
    type: number
    check: compute
    formula: evaporation_time_sun_years
    expected: 2.1e67
    unit: anos
    tolerance: 0.02
    status: verified
  - text: "Hawking fixou a constante de proporcionalidade da entropia em 1/4"
    type: attribution
    check: source
    sources: [https://pt.wikipedia.org/wiki/Termodin%C3%A2mica_do_buraco_negro]
    status: verified
  - text: "Bekenstein propôs em 1972 (Lett. Nuovo Cimento 4) que buracos negros têm entropia proporcional à área, a menos de um fator de ordem 1; o fator 1/4 veio do trabalho de Hawking"
    type: date
    check: source
    sources: [https://arxiv.org/pdf/1810.01880, https://en.wikipedia.org/wiki/Jacob_Bekenstein]
    status: verified
  - text: "Hawking publicou a radiação térmica de buracos negros na Nature em 1974 ('Black hole explosions?') e na Commun. Math. Phys. em 1975"
    type: date
    check: source
    sources: [https://link.springer.com/article/10.1038/248030a0, https://authors.library.caltech.edu/records/2wsvj-qrt68]
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Termodinâmica do buraco negro"
    url: https://pt.wikipedia.org/wiki/Termodin%C3%A2mica_do_buraco_negro
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Stephen Hawking: Uma Breve História do Tempo (livro)"
    url: null
    level: zero
    lang: pt
    checked_at: null
  - kind: study
    title: "MIT OpenCourseWare 8.962: General Relativity (Scott Hughes, 2020)"
    url: https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Jogar uma xícara de chá quente num buraco negro faria a entropia dela sumir do universo, o que a termodinâmica proíbe. Bekenstein propôs a saída: o buraco negro tem entropia, e ela é proporcional à área do horizonte, não ao volume. Hawking tentou mostrar que isso era absurdo e acabou provando que buracos negros têm temperatura e brilham.

O brilho vem de efeitos quânticos perto do horizonte. A imagem de pares de partículas surgindo do vácuo, um caindo e outro escapando, é uma simplificação; o ponto correto é que cada quantum que sai está emaranhado com um parceiro do lado de dentro.

## Equação

$$
S_{BH} = \frac{A}{4\ell_P^2}\,k_B, \qquad T_H = \frac{\hbar c^3}{8\pi G M k_B}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $S_{BH}$ | entropia de Bekenstein-Hawking | J/K |
| $A$ | área do horizonte, $4\pi r_s^2$ | m² |
| $\ell_P$ | comprimento de Planck, ≈ $1{,}6\times10^{-35}$ | m |
| $T_H$ | temperatura de Hawking | K |
| $\hbar$ | constante de Planck reduzida | J·s |
| $t_{evap}$ | tempo até evaporar | s |

## Exemplo

| Buraco negro com a massa do Sol | Valor |
| --- | --- |
| Temperatura | ≈ $6{,}2\times10^{-8}$ K, mais frio que a radiação cósmica de fundo (2,7 K) |
| Entropia | ≈ $10^{77}\,k_B$ |
| Tempo de evaporação (só fótons) | ≈ $2\times10^{67}$ anos |

## Onde isso volta

Se o buraco negro evapora por completo e a radiação é térmica, o que caiu nele parece desaparecer. Esse é o paradoxo da informação. A área como medida de entropia volta na holografia.

## Pergunta-ponte

Quando o buraco negro termina de evaporar, a informação do que caiu nele sobrevive?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "uma partícula de energia negativa cai e reduz a massa" | "é uma imagem simplificada; o cálculo é de teoria de campos no espaço curvo" |
| "buracos negros estão evaporando agora" | "os de massa estelar estão mais frios que o universo e hoje absorvem mais do que emitem" |

## Nível técnico

As leis de Bardeen-Carter-Hawking (1973) têm a forma $dM = \frac{\kappa}{8\pi G}dA + \Omega\,dJ + \Phi\,dQ$, com $T_H = \hbar\kappa/(2\pi c k_B)$. Para um modo de frequência $\omega$, o vácuo de quem cai é visto de fora como $\sum_n e^{-\beta\omega n/2}|n\rangle_{\text{out}}|n\rangle_{\text{in}}$; traçando os modos internos, a radiação externa é exatamente térmica. Pela lei de Stefan-Boltzmann, $dM/dt\propto -1/M^2$, o que dá $M(t) = M_0(1-t/t_{evap})^{1/3}$.
