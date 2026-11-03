---
id: information-paradox
title: Paradoxo da informação
summary: A evaporação térmica de buracos negros parece destruir informação, o que a mecânica quântica proíbe.
recap:
  - "Pela conta de Hawking, a radiação é térmica e apagaria a informação do que caiu."
  - "A evolução unitária de um sistema fechado preserva informação."
  - "Hawking apostou que ela se perdia e admitiu a derrota em 2004."
levels: [zero, technical]
consensus: established
tags:
  area: physics/quantum-gravity
  topics: [information-paradox, black-holes, information]
  era: standard-model-era
  people: [stephen-hawking, kip-thorne, john-preskill]
  arxiv_category: hep-th
equations:
  - tex: \rho \to U \rho\, U^\dagger
    spoken: "rô vai em U rô U adaga"
  - tex: '|\psi\rangle\langle\psi| \to \rho_{\text{térmico}}'
    spoken: "ket psi bra psi vai em rô térmico"
claims:
  - text: "Em 1997, Thorne e Hawking apostaram contra Preskill que a informação se perde em buracos negros"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Thorne%E2%80%93Hawking%E2%80%93Preskill_bet]
    status: verified
  - text: "Hawking admitiu a derrota em 2004, na 17ª Conferência Internacional de Relatividade Geral e Gravitação, em Dublin, e deu a Preskill uma enciclopédia de beisebol"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Thorne%E2%80%93Hawking%E2%80%93Preskill_bet]
    status: verified
  - text: "Kip Thorne não acompanhou a concessão de Hawking em 2004"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Thorne%E2%80%93Hawking%E2%80%93Preskill_bet]
    status: verified
  - text: "Hawking formulou o paradoxo no artigo 'Breakdown of predictability in gravitational collapse', Phys. Rev. D 14, 2460 (1976)"
    type: date
    check: source
    sources: [https://scilit.com/publications/9d5cd45bb73750a51b259d3177ead4ff]
    status: verified
resources:
  - kind: watch
    title: "NOVA (PBS): Black Hole Information Paradox, série What the Physics?!"
    url: https://www.pbs.org/wgbh/nova/video/black-hole-information-paradox
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Paradoxo da informação em buracos negros"
    url: https://pt.wikipedia.org/wiki/Paradoxo_da_informa%C3%A7%C3%A3o_em_buracos_negros
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Thorne–Hawking–Preskill bet"
    url: https://en.wikipedia.org/wiki/Thorne%E2%80%93Hawking%E2%80%93Preskill_bet
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Leonard Susskind: The Black Hole War (livro)"
    url: null
    level: intermediate
    lang: en
    checked_at: null
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Jogue um livro num buraco negro e espere ele evaporar. Pela conta de Hawking, a radiação que sai é puramente térmica e não carrega nada do livro. Seria como esvaziar a lixeira, não só jogar o arquivo nela.

Mas a evolução unitária de um sistema fechado preserva informação. Um livro queimado continua, em princípio, escrito na fumaça, nas cinzas e no calor. O conflito aparece ao extrapolar o cálculo semiclássico até a evaporação completa; a radiação Hawking de buracos negros astrofísicos não foi diretamente medida.

## Equação

$$
|\psi\rangle\langle\psi| \;\to\; \rho_{\text{térmico}}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $\lvert\psi\rangle\langle\psi\rvert$ | estado puro: informação completa |
| $\rho_{\text{térmico}}$ | estado misto térmico: só temperatura, sem detalhes |
| $U$ | evolução unitária, reversível |

## Exemplo

A evolução unitária de um sistema fechado leva estado puro em estado puro: $\rho\to U\rho U^\dagger$. A conta de Hawking leva o estado puro de uma estrela em colapso para radiação térmica, que é mista. Nenhum $U$ faz isso.

## Onde isso volta

O paradoxo vira uma pergunta concreta quando se olha para a entropia de emaranhamento da radiação: é a curva de Page.

## Pergunta-ponte

Existe uma grandeza calculável que separe "a informação se perde" de "a informação sai"?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "Hawking errou a conta" | "a conta de Hawking considerava só uma contribuição; o paper de 2019 mostra outra" |
| "Hawking perdeu a aposta porque alguém resolveu o paradoxo" | "Hawking cedeu por argumentos indiretos, sem mostrar onde a conta falhava" |

## Nível técnico

As saídas propostas ao longo das décadas foram: perda real de informação (evolução não unitária), remanescentes de Planck que guardam tudo, e informação codificada sutilmente na radiação. A correspondência AdS/CFT (1997) deu um argumento forte para a terceira, porque a teoria de fronteira é unitária, mas sem mostrar o mecanismo no cálculo gravitacional.
