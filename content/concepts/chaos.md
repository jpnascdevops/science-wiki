---
id: chaos
title: Caos e sensibilidade às condições iniciais
summary: Sistemas caóticos seguem leis determinísticas, mas diferenças minúsculas no começo crescem tão depressa que o futuro distante fica imprevisível na prática.
recap:
  - "Caos não é aleatório: as leis são exatas; o problema é a sensibilidade ao ponto de partida."
  - "No caos, a diferença entre dois estados próximos cresce exponencialmente."
  - "Se o erro dobra a cada segundo, uma incerteza de um milionésimo vira do tamanho do sistema em uns 20 segundos."
  - "Pêndulo duplo (com energia alta), tempo atmosférico e o problema de três corpos em geral são caóticos."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [chaos, oscillations]
  era: nuclear-age
  people: [henri-poincare, edward-lorenz]
  events: [poincare-three-body, lorenz-1963]
equations:
  - tex: '|\delta(t)| \approx |\delta_0|\,e^{\lambda t}'
    spoken: "o módulo de delta de t é aproximadamente o módulo de delta zero vezes e elevado a lambda t"
claims:
  - text: "Se a diferença dobra a cada passo, são precisas cerca de 20 duplicações para um milionésimo virar 1"
    type: number
    check: compute
    formula: doublings_1e6
    expected: 19.93
    unit: ""
    tolerance: 0.001
    status: verified
  - text: "Henri Poincaré descobriu o comportamento caótico no problema dos três corpos em sua memória premiada no concurso do rei Oscar II (prêmio em 1889, versão corrigida publicada na Acta Mathematica em 1890); foi ao corrigir um erro que ele encontrou as órbitas homoclínicas."
    type: date
    check: source
    sources: ["https://ui.adsabs.harvard.edu/abs/1994AHES...48..107B/abstract", "https://www.britannica.com/science/analysis-mathematics/Dynamical-systems-theory-and-chaos"]
    status: verified
  - text: "Edward Lorenz publicou Deterministic Nonperiodic Flow em 1963; a expressão efeito borboleta vem da palestra dele de 1972 sobre o bater de asas de uma borboleta no Brasil"
    type: date
    check: source
    sources: ["https://www.sciencenews.org/article/born-half-century-ago-chaos-theory-languished-years", "https://britannica.com/science/butterfly-effect"]
    status: verified
resources:
  - kind: watch
    title: "Veritasium - Chaos: The Science of the Butterfly Effect (2019; Lorenz, double pendulum) [index page; YouTube id fDek6cYijxI]"
    url: "https://rosetta.to/u/veritasium/chaos-the-science-of-the-butterfly-effect"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "myPhysicsLab - Double Pendulum (interactive simulation + equations of motion)"
    url: "https://www.myphysicslab.com/dbl_pendulum.html"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Britannica - Butterfly effect"
    url: "https://britannica.com/science/butterfly-effect"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Stanford Encyclopedia of Philosophy - Chaos (Robert Bishop, rev. 2024)"
    url: "https://plato.stanford.edu/entries/chaos/"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Weber, Heidemann & Martins, RBEF 45 (2023) - Caos determinístico: abordagem com Insight Maker (pêndulo amortecido e forçado, Lyapunov, Feigenbaum)"
    url: "https://doaj.org/article/415c7a8c58e94b0fbd8093b14cb3411b"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "RBEF - Deterministic chaos: A pedagogical review of the double pendulum case (RK4, Poincaré maps, Lyapunov)"
    url: "https://scielo.br/j/rbef/a/SsWk5qnzBgvmYB4hRtkbwqM"
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Pendure um pêndulo na ponta de outro e solte. O movimento parece maluco, mas segue as leis de Newton à risca. Agora solte dois pêndulos duplos quase iguais, com uma diferença menor que a espessura de um fio de cabelo. Por alguns segundos, andam juntos. Depois, fazem coisas completamente diferentes. Isso é caos.

Não há sorteio nenhum: com o estado inicial exato, o futuro está determinado. O problema é que a diferença entre dois começos cresce exponencialmente. Qualquer erro de medida, por menor que seja, acaba tomando conta. Por isso a previsão do tempo funciona bem para alguns dias e mal para semanas: a atmosfera é caótica. Lorenz descobriu isso num modelo de computador nos anos 1960, e a imagem da borboleta no Brasil que provoca um tornado no Texas virou o símbolo da ideia.

## Equação

$$
|\delta(t)| \approx |\delta_0|\,e^{\lambda t}
$$

```lab
double-pendulum
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\delta_0$ | diferença inicial entre dois estados | a do estado |
| $\delta(t)$ | diferença depois de um tempo $t$ | idem |
| $\lambda$ | expoente de Lyapunov: ritmo de crescimento da diferença | 1/s |

## Exemplo

Se a diferença dobra a cada segundo, um erro de um milionésimo dobra umas 20 vezes até chegar ao tamanho do sistema: em 20 segundos, a previsão não vale nada. Medir mil vezes melhor só compra uns 10 segundos a mais. No caos, precisão extra rende pouco tempo de previsão.

## Onde isso volta

Mecânica celeste (o sistema solar é caótico em escalas de milhões de anos), turbulência em fluidos, mistura em física estatística (o caos ajuda a explicar por que sistemas exploram todos os estados) e discussões sobre a seta do tempo (junto com a condição inicial de baixa entropia).

## Pergunta-ponte

Existe uma forma de escrever a mecânica que trate todos esses sistemas (pêndulo, pêndulo duplo, planetas) com a mesma receita?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "caos é bagunça aleatória" | "caos é determinístico, mas sensível demais ao ponto de partida" |
| "com computadores melhores, preveremos o tempo para sempre" | "o erro cresce exponencialmente; melhorar a medida só adia um pouco o limite" |

## Nível técnico

O expoente de Lyapunov máximo é $\lambda = \lim_{t\to\infty}\tfrac1t\ln(|\delta(t)|/|\delta_0|)$; $\lambda > 0$, num movimento limitado e não periódico, caracteriza caos. O horizonte de previsão cresce só como $\tfrac1\lambda\ln(\Delta/\delta_0)$. O sistema de Lorenz, $\dot x = \sigma(y - x)$, $\dot y = x(\rho - z) - y$, $\dot z = xy - \beta z$, tem um atrator estranho de dimensão fractal. Sistemas hamiltonianos podem ter regiões regulares (toros do teorema KAM) e regiões caóticas convivendo no mesmo espaço de fase.
