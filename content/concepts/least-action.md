---
id: least-action
title: Princípio de mínima ação
summary: Entre todos os caminhos possíveis com o mesmo começo e fim, a natureza segue aquele em que a ação, a soma de energia cinética menos potencial ao longo do tempo, é estacionária (quase sempre mínima).
recap:
  - "Em vez de forças instante a instante, olhar o caminho inteiro de uma vez."
  - "Ação: somar (cinética − potencial) ao longo do tempo. O caminho real deixa a ação estacionária."
  - "Na maioria dos casos do dia a dia, estacionária quer dizer mínima."
  - "A luz já fazia algo parecido: segue o caminho de tempo estacionário, quase sempre o menor (Fermat)."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, foundations]
  era: classical-mechanics-era
  people: [pierre-de-fermat, pierre-louis-maupertuis, leonhard-euler, william-rowan-hamilton]
  events: [maupertuis-action, hamilton-dynamics]
equations:
  - tex: S = \int_{t_1}^{t_2} \left(T - V\right)\mathrm{d}t
    spoken: "S é igual à integral de t um a t dois de T menos V, d t"
  - tex: \delta S = 0
    spoken: "delta S é igual a zero"
claims:
  - id: claim-001
    text: "Para uma bola de 1 kg jogada para cima que volta em 2 s, entortar o caminho com uma corcova de 0,5 m aumenta a ação em cerca de 0,31 J·s"
    type: number
    check: compute
    formula: action_delta_a05
    expected: 0.308
    unit: J·s
    tolerance: 0.003
    status: calculated
  - id: claim-002
    text: "Pierre de Fermat formulou o princípio do tempo mínimo para a luz por volta de 1657 e publicou a dedução da lei da refração a partir dele em 1662."
    type: date
    check: source
    sources: ["https://arxiv.org/pdf/2402.19400"]
    status: pending
  - id: claim-003
    text: "Maupertuis enunciou um princípio de mínima ação em 1744 e o ampliou em 1746."
    type: date
    check: source
    sources: ["https://ccrma.stanford.edu/~jos/Lagrangians/History_Least_Action_Principle.html", "https://www.britannica.com/topic/principle-of-least-action"]
    status: pending
  - id: claim-004
    text: "Euler publicou uma formulação no apêndice do Methodus inveniendi em 1744 e voltou ao tema em 1753."
    type: date
    check: source
    sources: ["https://ccrma.stanford.edu/~jos/Lagrangians/History_Least_Action_Principle.html"]
    status: pending
  - id: claim-005
    text: "Hamilton deu o princípio de Hamilton em 1834–1835."
    type: date
    check: source
    sources: ["https://ccrma.stanford.edu/~jos/Lagrangians/History_Least_Action_Principle.html"]
    status: pending
  - id: claim-006
    text: "O caminho real deixa a ação estacionária para variações com extremos fixos."
    type: conceptual
    check: source
    covers: [definition, equation, recap]
    assumptions: "Formulação lagrangiana apresentada na página; extremos e tempos fixos."
    sources: ["https://feynmanlectures.caltech.edu/II_19.html"]
    status: pending
resources:
  - kind: watch
    title: "Veritasium - The Closest We've Come to a Theory of Everything (principle of least action, Fermat to Hamilton)"
    url: "https://www.youtube.com/watch?v=Q10_srZ-pbs"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "PBS Space Time - Is Action The Most Fundamental Property in Physics?"
    url: "https://www.pbs.org/video/is-action-the-most-fundamental-property-in-physics-ujofxc"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. II, ch. 19 - The Principle of Least Action"
    url: "https://feynmanlectures.caltech.edu/II_19.html"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Britannica - Principle of least action"
    url: "https://www.britannica.com/topic/principle-of-least-action"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Rabeno & Lima (UFRGS), Caderno Brasileiro de Ensino de Física 40(3), 2023 - O Princípio de Mínima Ação de Maupertuis (inclui tradução de 'As Leis do Movimento e do Repouso')"
    url: "https://periodicos.ufsc.br/index.php/fisica/article/view/93136"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Newton descreve o movimento instante a instante: a força agora decide a aceleração agora. Há outro jeito, estranho e bonito. Fixe o ponto de partida e o de chegada, e imagine todos os caminhos possíveis entre eles, inclusive os absurdos. Para cada um, calcule um número, a ação: some, ao longo do tempo, a energia cinética menos a potencial. O caminho que a natureza escolhe é aquele em que esse número não muda quando se entorta o caminho um pouquinho. Quase sempre, é o caminho de ação mínima.

Uma bola jogada para cima segue uma parábola. No laboratório, você pode tentar outros caminhos com o mesmo começo e fim: todos têm ação maior. Fermat já tinha uma ideia parecida para a luz: ela vai de um ponto a outro pelo caminho de menor tempo, o que explica a refração.

## Equação

$$
S = \int_{t_1}^{t_2} \left(T - V\right)\mathrm{d}t
$$

```lab
action
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $S$ | ação | J·s |
| $T$ | energia cinética | J |
| $V$ | energia potencial | J |
| $t_1, t_2$ | instantes de partida e chegada (fixos) | s |
| $\delta S = 0$ | a ação não muda em primeira ordem quando o caminho é entortado | — |

## Exemplo

Uma bola de 1 kg jogada para cima volta em 2 s. Entortando o caminho com uma corcova de 0,5 m (mesmo começo, mesmo fim), a ação aumenta cerca de 0,31 J·s. Entortando para baixo, também aumenta. O real fica no fundo do vale.

## Onde isso volta

A mecânica lagrangiana é a máquina que transforma esse princípio em equações de movimento. O teorema de Noether liga simetrias da ação a leis de conservação. Na quântica, Feynman mostrou que a partícula "experimenta" todos os caminhos, e o clássico é o que sobra quando eles interferem.

## Pergunta-ponte

Como tirar, do princípio de mínima ação, as equações que dizem o movimento?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a bola escolhe o caminho" | "a natureza segue o caminho de ação estacionária; não há escolha, é outra forma de escrever as mesmas leis" |
| "é sempre o mínimo" | "é estacionário; em geral é mínimo para trechos curtos, mas pode ser um ponto de sela" |

## Nível técnico

Pedindo $\delta S = 0$ para variações com extremos fixos, sai a equação de Euler-Lagrange $\frac{\mathrm d}{\mathrm dt}\frac{\partial L}{\partial \dot q} - \frac{\partial L}{\partial q} = 0$. Para $L = \tfrac12 m\dot x^2 - V(x)$, ela dá $m\ddot x = -V'(x)$, a segunda lei de Newton. No exemplo, a perturbação $a\sin(\pi t/\tau)$, com $\tau = 2$ s o tempo de voo, muda a ação em $\Delta S = m a^2\pi^2/(4\tau)$, sempre positiva: os termos lineares em $a$ se cancelam exatamente porque o caminho real é estacionário.
