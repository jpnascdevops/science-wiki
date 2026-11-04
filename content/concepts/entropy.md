---
id: entropy
title: Entropia
summary: Entropia é contar jeitos; é também a informação que falta para saber o estado exato.
recap:
  - "Entropia conta quantos arranjos internos são compatíveis com o que se vê: S = k ln W."
  - "Também mede quanta informação falta para saber o estado exato."
  - "Num sistema isolado, ela não diminui."
levels: [zero, technical]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [entropy, information]
  era: nineteenth-century
  people: [ludwig-boltzmann, claude-shannon]
equations:
  - tex: S = k_B \ln W
    spoken: "S é igual a k B vezes logaritmo natural de W"
  - tex: W = 2^{N}
    spoken: "W é igual a dois elevado a N"
  - tex: S_{\text{bits}} = \log_2 W
    spoken: "S em bits é igual a log na base dois de W"
  - tex: S(\rho) = -\operatorname{Tr}\,\rho \log \rho
    spoken: "S de rô é igual a menos o traço de rô log rô"
claims:
  - id: claim-001
    text: "Com 8 moedas há 256 arranjos possíveis"
    type: number
    check: compute
    formula: coins_8_arrangements
    expected: 256
    tolerance: 0.0
    status: calculated
  - id: claim-002
    text: "A fórmula S = k log W (log natural) está gravada no túmulo de Boltzmann, no Zentralfriedhof de Viena"
    type: attribution
    check: source
    sources: [https://WWW.ATLASOBSCURA.COM/places/boltzmanns-grave]
    status: pending
  - id: claim-003
    text: "A segunda lei da termodinâmica diz que a entropia de um sistema isolado não diminui"
    type: definition
    check: human
    sources: [https://britannica.com/science/thermodynamics/Entropy]
    status: pending
resources:
  - kind: read
    title: "Wikipedia: Termodinâmica do buraco negro"
    url: https://pt.wikipedia.org/wiki/Termodin%C3%A2mica_do_buraco_negro
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "The Most Misunderstood Concept in Physics (Veritasium)"
    url: "https://www.youtube.com/watch?v=DxL2HoqLbyA"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Entropia não é "bagunça" no sentido do dia a dia. Para estados equiprováveis, ela é proporcional ao logaritmo do número de jeitos diferentes que um sistema pode estar por dentro sem que você perceba a diferença por fora. Também é quanta informação falta para você saber o estado exato.

Com moedas justas e independentes, antes de conhecer os resultados: 8 moedas podem estar em $2^8 = 256$ arranjos. Para dizer qual saiu, você precisa de 8 respostas de sim ou não, ou seja, 8 bits.

## Equação

$$
S = k_B \ln W
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $S$ | entropia |
| $W$ | número de arranjos internos possíveis |
| $\ln$ | logaritmo natural: transforma números gigantes em números manejáveis |
| $k_B$ | constante de Boltzmann |
| $N$ | número de moedas (ou de sistemas de dois estados) |

## Exemplo

| Moedas | Arranjos $W$ | Entropia em bits |
| --- | --- | --- |
| 1 | 2 | 1 |
| 8 | 256 | 8 |
| 60 | ≈ $1{,}15\times10^{18}$ | 60 |

Cada moeda a mais dobra os arranjos, mas soma só um bit. Por isso a entropia usa logaritmo.

```lab
coins
```

## Onde isso volta

Bekenstein mostrou que um buraco negro tem entropia proporcional à área do horizonte. Na física quântica, a entropia reduzida de von Neumann, $S(\rho)$, mede o emaranhamento quando o estado global é puro, e é ela que a curva de Page acompanha.

## Pergunta-ponte

Na física quântica, o que significa uma parte de um sistema ter entropia se o todo não tem?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "entropia é desordem" | "entropia conta quantos estados internos são compatíveis com o que vemos" |
| "entropia sempre aumenta" | "a de um sistema isolado não diminui" |

## Nível técnico

Para uma distribuição de probabilidades $p_i$, a entropia de Gibbs-Shannon é $S = -k_B\sum_i p_i\ln p_i$, que se reduz a $k_B\ln W$ quando os $W$ estados são equiprováveis. Na mecânica quântica, com a matriz densidade $\rho$, a entropia de von Neumann é $S(\rho) = -\operatorname{Tr}\rho\log\rho$; ela é zero para um estado puro. Com log natural, essa expressão sem $k_B$ é medida em nats; com log de base 2, em bits. A entropia de von Neumann de um sistema fechado é constante sob evolução unitária; a segunda lei se refere à entropia termodinâmica macroscópica.
