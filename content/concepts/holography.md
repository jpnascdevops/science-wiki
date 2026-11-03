---
id: holography
title: Holografia e Ryu-Takayanagi
summary: A informação de uma região com gravidade pode estar escrita na sua borda; emaranhamento vira área.
recap:
  - "A informação de uma região com gravidade pode estar escrita na sua borda."
  - "Maldacena (1997) deu um exemplo concreto: AdS/CFT."
  - "Ryu-Takayanagi (2006): emaranhamento é medido por uma área."
levels: [intermediate, technical]
consensus: broad
tags:
  area: physics/quantum-gravity
  topics: [holography, entanglement, entropy]
  era: standard-model-era
  people: [gerard-t-hooft, leonard-susskind, juan-maldacena, shinsei-ryu, tadashi-takayanagi]
  arxiv_category: hep-th
equations:
  - tex: S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N}
    spoken: "S de A é igual à área de gama A sobre quatro G N"
  - tex: S(A) = \min_{\chi}\, \operatorname{ext}_{\chi}\left[\frac{\operatorname{Area}(\chi)}{4G_N} + S_{\text{bulk}}(\Sigma_\chi)\right]
    spoken: "S de A é igual ao mínimo sobre qui do extremo sobre qui de: área de qui sobre quatro G N, mais S bulk de sigma qui"
claims:
  - text: "Ryu e Takayanagi propuseram a fórmula holográfica da entropia de emaranhamento em 2006"
    type: date
    check: source
    sources: [https://pt.wikipedia.org/wiki/Conjectura_de_Ryu-Takayanagi]
    status: verified
  - text: "Ryu-Takayanagi: Holographic derivation of entanglement entropy from AdS/CFT"
    type: reference
    check: arxiv
    arxiv: hep-th/0603001
    expected_title: "Holographic Derivation of Entanglement Entropy from AdS/CFT"
    sources: [https://arxiv.org/abs/hep-th/0603001]
    status: verified
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - text: "Maldacena: The large N limit of superconformal field theories and supergravity (1997)"
    type: reference
    check: arxiv
    arxiv: hep-th/9711200
    expected_title: "The Large N Limit of Superconformal Field Theories and Supergravity"
    sources: [https://arxiv.org/abs/hep-th/9711200]
    status: verified
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - text: "Engelhardt e Wall: Quantum extremal surfaces (2014)"
    type: reference
    check: arxiv
    arxiv: "1408.3203"
    expected_title: "Quantum Extremal Surfaces: Holographic Entanglement Entropy beyond the Classical Regime"
    sources: [https://arxiv.org/abs/1408.3203]
    status: verified
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
resources:
  - kind: read
    title: "Wikipedia: Conjectura de Ryu-Takayanagi"
    url: https://pt.wikipedia.org/wiki/Conjectura_de_Ryu-Takayanagi
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "The Theoretical Minimum (Leonard Susskind), aulas"
    url: http://theoreticalminimum.com/home
    level: intermediate
    lang: en
    checked_at: null
  - kind: watch
    title: "The Holographic Universe Explained (PBS Space Time)"
    url: "https://www.pbs.org/video/the-holographic-universe-explained-urhkpc"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "The Holographic Universe from AdS/CFT! | with Juan Maldacena (Int. Society for Quantum Gravity)"
    url: "https://www.youtube.com/watch?v=dczKVhn-tvc"
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

A entropia de um buraco negro cresce com a área, não com o volume. Isso sugere que a informação de uma região com gravidade está escrita na borda dela, como um holograma, que guarda uma imagem 3D num filme plano. Maldacena propôs uma dualidade concreta, sustentada por muitos testes teóricos: certos modelos com gravidade equivalem a teorias quânticas sem gravidade definidas na fronteira do espaço-tempo.

## Equação

$$
S(A) = \frac{\operatorname{Area}(\gamma_A)}{4 G_N}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $A$ | uma região da borda |
| $\gamma_A$ | a superfície mínima na fatia espacial estática, ancorada em $\partial A$ e homóloga a $A$ |
| $G_N$ | constante de Newton |
| $\chi$ | superfície candidata (na versão quântica) |
| $S_{\text{bulk}}$ | entropia dos campos quânticos no interior |

## Exemplo

Para saber quão emaranhada uma parte da borda está com o resto, desenhe a menor "bolha" no interior que se apoia nessa parte e meça a área. A área, dividida por $4G_N$, é a entropia.

## Onde isso volta

A versão quântica (superfície extremal quântica) é a regra que, aplicada a um buraco negro evaporando, produz as ilhas.

## Pergunta-ponte

O que essa regra diz sobre a radiação de um buraco negro que evapora?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o universo é um holograma" | "em certos modelos, uma teoria com gravidade equivale a outra na borda; se vale para o nosso universo é pergunta aberta" |

## Nível técnico

A correspondência AdS/CFT liga gravidade quântica em $\text{AdS}_{d+1}$ a uma CFT em $d$ dimensões. Ryu-Takayanagi (2006), Hubeny-Rangamani-Takayanagi (versão covariante), Faulkner-Lewkowycz-Maldacena (correções quânticas, 2013) e Engelhardt-Wall (2014) levam à prescrição da superfície extremal quântica, que extremiza a entropia generalizada $\frac{\operatorname{Area}}{4G_N}+S_{\text{bulk}}$.

As fórmulas usam $c=\hbar=k_B=1$. Ryu–Takayanagi vale no limite clássico estático; situações dependentes do tempo exigem a versão covariante HRT. [Ryu e Takayanagi](https://arxiv.org/abs/hep-th/0603001); [superfícies extremais quânticas](https://arxiv.org/abs/1408.3203).
