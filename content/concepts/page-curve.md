---
id: page-curve
title: Curva de Page
summary: Para um estado inicial puro e evaporação completa e unitária, a entropia da radiação volta a zero.
recap:
  - "Para um estado inicial puro e evaporação completa e unitária, a entropia da radiação volta a zero."
  - "A virada é no tempo de Page, perto da metade da vida do buraco negro."
  - "A conta de Hawking só subia."
levels: [zero, technical]
consensus: established
tags:
  area: physics/quantum-gravity
  topics: [information-paradox, entanglement, entropy]
  era: standard-model-era
  people: [don-page]
  arxiv_category: hep-th
equations:
  - tex: \langle S_A\rangle \simeq \ln m - \frac{m}{2n}
    spoken: "o valor médio de S A é aproximadamente log natural de m, menos m sobre dois n"
  - tex: S(R) \lesssim \min\big(S_{\text{rad}}^{\text{coarse}},\, S_{BH}\big)
    spoken: "S de R é menor ou da ordem do mínimo entre a entropia grosseira da radiação e S B H"
  - tex: S_{BH}(\tau) \propto (1-\tau)^{2/3}
    spoken: "S B H de tau é proporcional a um menos tau, elevado a dois terços"
claims:
  - id: claim-001
    text: "Em quatro dimensões, com fótons e grávitons, o tempo de Page é cerca de 54% do tempo de evaporação"
    type: number
    check: compute
    formula: page_time_fraction_4d
    expected: 0.538
    tolerance: 0.005
    sources: [https://ar5iv.arxiv.org/html/1301.4995]
    status: calculated
    note: "Razão dS_rad/|dS_BH| ≈ 1,4847 (Page): buraco negro sem rotação em 4D emitindo só fótons e grávitons; é a entropia térmica (grosseira) da radiação."
  - id: claim-002
    text: "Don Page publicou 'Information in black hole radiation' em 1993"
    type: reference
    check: arxiv
    arxiv: hep-th/9306083
    expected_title: "Information in black hole radiation"
    sources: [https://arxiv.org/abs/hep-th/9306083]
    status: reference_checked
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - id: claim-003
    text: "Don Page publicou 'Average entropy of a subsystem' em 1993"
    type: reference
    check: arxiv
    arxiv: gr-qc/9305007
    expected_title: "Average entropy of a subsystem"
    sources: [https://arxiv.org/abs/gr-qc/9305007]
    status: reference_checked
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
resources:
  - kind: read
    title: "Quanta Magazine: The Most Famous Paradox in Physics Nears Its End (George Musser, 2020)"
    url: https://www.quantamagazine.org/the-most-famous-paradox-in-physics-nears-its-end-20201029/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "PBS Space Time: Have We Solved the Black Hole Information Paradox? (2022)"
    url: https://www.pbssocal.org/shows/pbs-space-time/episodes/have-we-solved-black-hole-information-paradox-wormh-qnogsp
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Olhe para o quanto a radiação que já saiu está emaranhada com o que ficou dentro. No começo, isso sobe: cada partícula que sai deixa uma parceira lá dentro. Mas o buraco negro é um copo que encolhe; a radiação não pode estar mais emaranhada com ele do que ele tem capacidade de guardar. Se o estado inicial é puro e a evaporação é completa e unitária, a entropia final da radiação é zero. A forma típica que sobe e desce também pressupõe uma dinâmica que mistura suficientemente os graus de liberdade.

## Equação

$$
S(R) \lesssim \min\big(S_{\text{rad}}^{\text{coarse}},\, S_{BH}\big)
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $S(R)$ | entropia de emaranhamento da radiação |
| $S_{\text{rad}}^{\text{coarse}}$ | entropia térmica da radiação (a conta de Hawking) |
| $S_{BH}$ | entropia de Bekenstein-Hawking: a capacidade do buraco negro |
| $\tau$ | tempo como fração da vida do buraco negro |
| $m,\ n$ | dimensões dos dois subsistemas, com $m\le n$ |

## Exemplo

Com $S_{BH}\propto(1-\tau)^{2/3}$ e a radiação carregando cerca de 1,48 vez a entropia que o buraco negro perde, as duas curvas se cruzam em $\tau\approx0{,}54$: o tempo de Page.

```lab
page-curve
```

## Onde isso volta

A conta de Hawking dá só o ramo que sobe. Por quase 30 anos, ninguém conseguiu, com gravidade, fazer a curva virar. As ilhas e os replica wormholes fazem exatamente isso.

## Pergunta-ponte

O que, dentro da própria gravidade, faz a curva virar?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a curva vira exatamente na metade" | "vira no tempo de Page, perto da metade; no modelo 4D sem rotação, inicialmente puro, emitindo fótons e grávitons, cerca de 54% da vida" |
| "Page resolveu o paradoxo" | "Page mostrou como a resposta teria de ser se a informação sobrevive" |

## Nível técnico

Para um estado puro aleatório em $\mathcal H_A\otimes\mathcal H_B$ com $1\ll m\le n$, Page mostrou $\langle S_A\rangle\simeq\ln m - \frac{m}{2n}$. Aplicado a buraco negro + radiação, isso dá $S(R)\approx\min(S_{\text{rad}},S_{BH})$. Depois do tempo de Page, a conta de Hawking dá $S(R) > S_{BH}$, o que conflita com um estado global puro e com a identificação de $S_{BH}$ como limite da entropia do buraco negro.

O valor de 54% depende do modelo de emissão; não é universal. Um estado inicial misto pode terminar com entropia da radiação diferente de zero. As entropias quânticas aqui são adimensionais ($k_B=1$). [Page, 2013](https://arxiv.org/abs/1301.4995).
