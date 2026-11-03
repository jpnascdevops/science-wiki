---
id: phase-transitions
title: Transições de fase
summary: Uma transição de fase é quando muitas partículas mudam de comportamento coletivo de uma vez, como água virando gelo ou um ímã perdendo a magnetização ao esquentar.
recap:
  - "Fases são comportamentos coletivos: sólido, líquido, gás, ímã ou não ímã."
  - "A transição acontece onde as energias livres das duas fases empatam."
  - "Derreter 1 kg de gelo exige uns 334 kJ, sem mudar a temperatura (calor latente)."
  - "Perto do ponto crítico aparecem flutuações de todos os tamanhos; o modelo de Ising mostra isso com spins simples."
levels: [zero, technical]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [phase-transitions, entropy]
  era: nuclear-age
  people: [wilhelm-lenz, ernst-ising, lars-onsager]
  events: [onsager-ising]
equations:
  - tex: L = T\,\Delta S
    spoken: "L é igual a T vezes delta S"
  - tex: k_B T_c = \frac{2J}{\ln\left(1 + \sqrt{2}\right)}
    spoken: "k B vezes T c é igual a dois J sobre logaritmo natural de um mais raiz de dois"
claims:
  - text: "O calor latente de fusão do gelo é cerca de 334 kJ/kg"
    type: number
    check: compute
    formula: ice_latent_heat_kj_kg
    expected: 334
    unit: kJ/kg
    tolerance: 0.005
    status: verified
  - text: "No modelo de Ising em duas dimensões, a temperatura crítica é k T_c ≈ 2,269 J"
    type: number
    check: compute
    formula: ising_onsager_tc
    expected: 2.269
    unit: J/k
    tolerance: 0.001
    status: verified
  - text: "O modelo de Ising foi proposto por Wilhelm Lenz (1920) e resolvido em uma dimensão por Ernst Ising (1925); Lars Onsager resolveu exatamente o caso bidimensional em 1944"
    type: date
    check: source
    sources: ["https://arxiv.org/html/2601.11671v1"]
    status: verified
  - text: "O ponto triplo da água é cerca de 273,16 K e 611,657 Pa; desde 2019 é um valor medido, não mais a definição do kelvin"
    type: number
    check: source
    sources: ["https://en.wikipedia.org/wiki/Triple_point"]
    status: verified
resources:
  - kind: study
    title: "Estados da Matéria (PhET, simulação com diagrama P-T)"
    url: "https://phet.colorado.edu/pt_BR/simulations/states-of-matter"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "14.3: Mudança de fase e calor latente (Física Universitária, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)/14:_M%C3%A9todos_de_transfer%C3%AAncia_de_calor_e_calor/14.03:_Mudan%C3%A7a_de_fase_e_calor_latente"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 45: Illustrations of Thermodynamics (45-3 Clausius-Clapeyron equation)"
    url: "https://www.feynmanlectures.caltech.edu/I_45.html"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "100 Glorious Years of the Ising Model (arXiv 2601.11671)"
    url: "https://arxiv.org/html/2601.11671v1"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "How Many States Of Matter Are There? (PBS Space Time)"
    url: "https://www.pbs.org/video/how-many-states-of-matter-are-there-pb7mxe/"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Uma molécula de água sozinha não é sólida nem líquida. "Gelo" é um comportamento coletivo: bilhões de moléculas presas num arranjo. Quando a temperatura cruza 0 °C, esse comportamento muda de uma vez. Isso é uma transição de fase.

Ímãs fazem algo parecido. Cada átomo de ferro é um pequeno ímã (um spin) que prefere apontar igual aos vizinhos. Frio, eles se alinham em grandes regiões, e cada região vira um pequeno ímã. Quente, a agitação térmica embaralha tudo e a magnetização some. No meio, perto da temperatura crítica, aparecem regiões alinhadas de todos os tamanhos ao mesmo tempo. O modelo de Ising captura isso com uma grade de setas para cima e para baixo, e é um dos modelos mais estudados da física.

## Equação

$$
L = T\,\Delta S
$$

```lab
ising
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $L$ | calor latente: energia para mudar de fase sem mudar a temperatura | J/kg ou J/mol |
| $\Delta S$ | diferença de entropia entre as fases | J/(kg·K) ou J/(mol·K) |
| $T_c$ | temperatura crítica (no Ising, onde a magnetização some) | K |
| $J$ | força da interação entre spins vizinhos | J |

## Exemplo

Para derreter 1 kg de gelo a 0 °C são precisos uns 334 kJ, quase o mesmo que aquecer 1 litro de água de 20 °C a 100 °C, e a temperatura fica parada em 0 °C enquanto isso. É por isso que gelo resfria tão bem uma bebida.

No modelo de Ising em duas dimensões, Onsager mostrou que a transição acontece em $k_B T_c \approx 2{,}269\,J$. No laboratório acima, mova a temperatura em volta de 2,27 e veja os domínios.

## Onde isso volta

Supercondutividade, condensação de Bose-Einstein, a quebra de simetria no início do universo e o mecanismo de Higgs. Em matéria condensada, transições de fase são o assunto central.

## Pergunta-ponte

Por que fenômenos tão diferentes (um ímã, um líquido fervendo, uma liga metálica) se comportam igual perto do ponto crítico?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a água ferve sempre a 100 °C" | "a 100 °C ao nível do mar; com menos pressão (na montanha), ferve a uma temperatura mais baixa" |
| "durante a fusão, o calor esquenta o gelo" | "durante a fusão, o calor quebra o cristal; a temperatura fica constante até acabar o gelo" |

## Nível técnico

Em transições de primeira ordem (fusão, ebulição) a primeira derivada da energia livre salta: há calor latente. Em transições contínuas (ponto crítico do Ising, ferromagneto), abaixo de $T_c$ a magnetização vai a zero como $(T_c - T)^\beta$ e o comprimento de correlação diverge como $|T - T_c|^{-\nu}$. Os expoentes críticos são universais: dependem só da dimensão e das simetrias, não dos detalhes. Para o Ising 2D, $\beta = 1/8$ e $\nu = 1$. O grupo de renormalização de Wilson explica essa universalidade.
