---
id: black-hole-thermodynamics
title: Termodinâmica de buracos negros
summary: A teoria semiclássica prevê entropia proporcional à área e emissão de radiação Hawking; há evaporação líquida se a emissão superar a absorção.
recap:
  - "Buracos negros têm entropia proporcional à área do horizonte: S = A/4 (em unidades de Planck)."
  - "A teoria prevê temperatura e radiação Hawking; perdem massa se emitem mais energia do que absorvem."
  - "Quanto menores, mais quentes."
levels: [zero, technical]
consensus: established
tags:
  area: physics/quantum-gravity
  topics: [black-holes, entropy, hawking-radiation]
  era: standard-model-era
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
  - text: "Na aproximação de corpo negro ideal com área do horizonte, sem absorção externa, um buraco negro solar levaria cerca de 2 × 10^67 anos para evaporar"
    type: number
    check: compute
    formula: evaporation_time_sun_years
    expected: 2.1e67
    unit: anos
    tolerance: 0.02
    status: verified
    note: "Verificação aritmética da aproximação de Stefan–Boltzmann; não inclui fatores greybody, outras espécies de partículas nem absorção externa."
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

Jogar uma xícara de chá quente num buraco negro faria a entropia dela sumir do universo, o que a termodinâmica proíbe. Bekenstein propôs a saída: o buraco negro tem entropia, e ela é proporcional à área do horizonte, não ao volume. Hawking tentou mostrar que isso era absurdo e acabou derivando, na teoria semiclássica, que buracos negros têm temperatura e emitem radiação.

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
| Tempo de evaporação (corpo negro ideal, sem absorção) | ≈ $2\times10^{67}$ anos |

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

Em unidades SI, a primeira lei de Bardeen-Carter-Hawking (1973) tem a forma $d(Mc^2) = \frac{\kappa c^2}{8\pi G}dA + \Omega\,dJ + \Phi\,dQ$, com $\kappa$ a gravidade superficial em m/s² e $T_H = \hbar\kappa/(2\pi c k_B)$. Para um modo bosônico de frequência angular $\omega$, o estado idealizado de dois modos é proporcional a $\sum_n e^{-\beta\hbar\omega n/2}|n\rangle_{\text{out}}|n\rangle_{\text{in}}$, com $\beta=1/(k_BT_H)$ e um fator de normalização implícito. Traçar o modo interno produz um estado térmico nesse modelo. O espectro observado longe do buraco negro inclui fatores de transmissão dependentes da frequência (greybody factors). Pela lei de Stefan-Boltzmann, $dM/dt\propto -1/M^2$, o que dá $M(t) = M_0(1-t/t_{evap})^{1/3}$.

O coeficiente $5120\pi$ vem de aplicar Stefan–Boltzmann à área $4\pi r_s^2$; não é uma previsão completa da emissão de fótons em espaço-tempo curvo. A evolução $M(t)$ supõe taxa proporcional a $M^{-2}$ com coeficiente constante. [Aproximação e correções, seção 11.2](https://sites.ualberta.ca/~gingrich/textbooks/phys530.pdf); [cálculo com fótons e grávitons](https://arxiv.org/abs/1301.4995).
