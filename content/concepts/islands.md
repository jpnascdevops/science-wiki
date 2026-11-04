---
id: islands
title: Ilhas
summary: Nos modelos de evaporação com ilhas, uma região interna entra no cálculo da entropia da radiação após o tempo de Page.
recap:
  - "Nos modelos estudados, uma ilha interna passa a integrar a cunha de emaranhamento da radiação."
  - "Com essa ilha, a entropia da radiação desce: aparece a curva de Page."
  - "O interior fica codificado do lado de fora."
levels: [intermediate, technical]
consensus: broad
tags:
  area: physics/quantum-gravity
  topics: [information-paradox, holography, black-holes]
  era: contemporary
  people: [geoff-penington, ahmed-almheiri, netta-engelhardt, donald-marolf, henry-maxfield, juan-maldacena]
  arxiv_category: hep-th
equations:
  - tex: S(R) = \min_{I}\, \operatorname{ext}_{I}\left[\frac{\operatorname{Area}(\partial I)}{4 G_N} + S_{\text{matter}}(R \cup I)\right]
    spoken: "S de R é igual ao mínimo sobre I do extremo sobre I de: área da borda de I sobre quatro G N, mais a entropia da matéria em R união I"
  - tex: t_{scr} \sim \frac{\beta}{2\pi}\log S_{BH}
    spoken: "t scrambling é da ordem de beta sobre dois pi, vezes log de S B H"
claims:
  - id: claim-001
    text: "Penington: Entanglement wedge reconstruction and the information paradox (2019)"
    type: reference
    check: arxiv
    arxiv: "1905.08255"
    expected_title: "Entanglement Wedge Reconstruction and the Information Paradox"
    sources: [https://arxiv.org/abs/1905.08255]
    status: reference_checked
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - id: claim-002
    text: "Almheiri, Engelhardt, Marolf e Maxfield: The entropy of bulk quantum fields and the entanglement wedge of an evaporating black hole (2019)"
    type: reference
    check: arxiv
    arxiv: "1905.08762"
    expected_title: "The entropy of bulk quantum fields and the entanglement wedge of an evaporating black hole"
    sources: [https://arxiv.org/abs/1905.08762]
    status: reference_checked
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - id: claim-003
    text: "Almheiri, Mahajan, Maldacena e Zhao: The Page curve of Hawking radiation from semiclassical geometry (2019)"
    type: reference
    check: arxiv
    arxiv: "1908.10996"
    expected_title: "The Page curve of Hawking radiation from semiclassical geometry"
    sources: [https://arxiv.org/abs/1908.10996]
    status: reference_checked
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - id: claim-004
    text: "Nos modelos holográficos de evaporação estudados, a ilha fica na cunha de emaranhamento da radiação depois do tempo de Page"
    type: conceptual
    check: verifier
    sources: [https://ar5iv.arxiv.org/html/2006.06872]
    status: pending
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

Aplicando a regra holográfica a um buraco negro que evapora, aparece uma surpresa. Antes do tempo de Page, a conta repete Hawking. Depois, surge uma superfície logo dentro do horizonte, e a região que ela delimita passa a contar como parte da radiação que já saiu. Essa região foi chamada de ilha. Com ela, a entropia da radiação para de subir e cai.

A palavra "ilha" engana se sugerir um lugar especial onde algo físico acontece; é uma região que entra na conta da entropia.

## Equação

$$
S(R) = \min_{I}\, \operatorname{ext}_{I}\left[\frac{\operatorname{Area}(\partial I)}{4 G_N} + S_{\text{matter}}(R \cup I)\right]
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $R$ | a radiação coletada fora do buraco negro |
| $I$ | a ilha: região do interior (pode ser vazia) |
| $\partial I$ | a borda da ilha |
| $S_{\text{matter}}$ | entropia dos campos quânticos |
| $t_{scr}$ | tempo de scrambling: quanto a informação demora para se espalhar |

## Exemplo

Antes do tempo de Page, o mínimo é a ilha vazia: $S(R) = S_{\text{matter}}(R)$, que cresce (Hawking). Depois, a ilha não vazia vence: o termo de área vale cerca de $S_{BH}$ e o termo de matéria é pequeno, porque os parceiros que estão na ilha purificam a radiação. Resultado: $S(R)\approx S_{BH}$, que diminui.

## Onde isso volta

A fórmula funcionava, mas parecia um palpite importado da holografia. O paper dos replica wormholes mostra que ela sai da própria gravidade.

## Pergunta-ponte

De onde vem essa fórmula, se ninguém a postulou a partir das leis da gravidade?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "as ilhas foram descobertas no paper dos replica wormholes" | "as ilhas vieram de dois grupos em 2019; o paper dos replica wormholes derivou a regra" |
| "a informação está guardada na ilha" | "depois do tempo de Page, o conteúdo da ilha pode ser reconstruído a partir da radiação" |

## Nível técnico

Penington e Almheiri-Engelhardt-Marolf-Maxfield usaram a prescrição QES num buraco negro em AdS acoplado a um banho com condições transparentes. O QES não trivial fica ligeiramente dentro do horizonte, atrasado pelo tempo de scrambling. Almheiri-Mahajan-Maldacena-Zhao escreveram a fórmula das ilhas na forma acima. Isso é consistente com Hayden-Preskill: informação jogada num buraco negro velho reaparece na radiação após cerca de $t_{scr}$.

Usamos $c=\hbar=k_B=1$ e $\beta=1/T_H$. A ilha entra na reconstrução e no cálculo da entropia; não se desloca fisicamente para fora. A posição da superfície e o tempo de recuperação dependem do modelo e do estado. [Penington, 2019](https://arxiv.org/abs/1905.08255).
