---
id: noether-theorem
title: 'Simetrias e conservação: teorema de Noether'
summary: Toda simetria contínua das leis físicas corresponde a uma grandeza conservada; deslocamento no tempo dá a energia, no espaço dá o momento, e rotação dá o momento angular.
recap:
  - "Simetria: mudar algo (o instante, o lugar, a direção) e as leis continuarem iguais."
  - "Noether: cada simetria contínua dá uma conservação."
  - "Tempo → energia; posição → momento linear; rotação → momento angular."
  - "Quebre a simetria e a conservação some. Simetrias são a ferramenta central da física moderna."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [symmetry, conservation-laws]
  era: modern-revolution
  people: [emmy-noether, albert-einstein]
  events: [noether-1918]
equations:
  - tex: \frac{\partial \mathcal{L}}{\partial q} = 0 \;\Rightarrow\; p = \frac{\partial \mathcal{L}}{\partial \dot{q}} = \text{constante}
    spoken: "se a derivada parcial de L em relação a q é zero, então p, a derivada parcial de L em relação a q ponto, é constante"
claims:
  - text: "O momento angular orbital da Terra em torno do Sol é cerca de 2,7 × 10⁴⁰ kg·m²/s"
    type: number
    check: compute
    formula: earth_orbital_angular_momentum
    expected: 2.66e40
    unit: kg·m²/s
    tolerance: 0.01
    status: verified
  - text: "Emmy Noether publicou o teorema sobre simetrias e leis de conservação em 1918 (Invariante Variationsprobleme)"
    type: date
    check: source
    sources: ["https://ar5iv.labs.arxiv.org/html/physics/0503066", "https://auth.aps.commonspotcloud.com/publications/apsnews/201303/physicshistory.cfm"]
    status: verified
  - text: "Einstein escreveu ao New York Times em 1935, após a morte de Noether, elogiando-a"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/OfTheDay/oftheday-05-04", "https://auth.aps.commonspotcloud.com/publications/apsnews/201303/physicshistory.cfm"]
    status: verified
resources:
  - kind: watch
    title: "PBS Space Time - Noether's Theorem and The Symmetries of Reality"
    url: "https://www.pbs.org/video/noethers-theorem-and-the-symmetries-of-reality-tf9sqz"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Leonard Susskind, The Theoretical Minimum Lecture 4 - Symmetry and Conservation Laws (outline of Noether's theorem)"
    url: "https://cosmolearning.org/video-lectures/symmetry-conservation-laws"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Areas, Barbosa & Santana, RBEF 41(4) 2019 - Teorema de Emmy Nöther, 100 anos: alegoria da misoginia em ciência"
    url: "https://www.repositorio.unb.br/handle/10482/36553?locale=en"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "David Tong, Classical Dynamics ch. 2 (sec. Noether's theorem and symmetries)"
    url: "https://davidtong.org/teaching/classical-dynamics/dynhtml/S2"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Stanford Encyclopedia of Philosophy - Symmetry and Symmetry Breaking (Nicholas Teh)"
    url: "https://plato.stanford.edu/ENTRIES/symmetry-breaking/"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Noether, Invariant Variation Problems (English translation by M. A. Tavel of the 1918 paper)"
    url: "https://ar5iv.labs.arxiv.org/html/physics/0503066"
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Faça um experimento hoje e repita amanhã: o resultado é o mesmo. As leis da física não mudam com o tempo. Faça aqui e em Tóquio: o mesmo. Gire a mesa: o mesmo. Essas são simetrias.

Em 1918, Emmy Noether provou que cada simetria contínua dessas obriga uma grandeza a se conservar. As leis não mudam com o tempo: a energia se conserva. Não mudam de lugar: o momento linear se conserva. Não mudam com a direção: o momento angular se conserva. As leis de conservação que pareciam fatos separados são, na verdade, consequências das simetrias.

No laboratório, uma partícula orbita num potencial igual em todas as direções: o momento angular fica parado. Quebre a simetria e ele passa a variar, mas a energia continua constante, porque a simetria no tempo ainda vale.

## Equação

$$
\frac{\partial \mathcal{L}}{\partial q} = 0 \;\Rightarrow\; p = \frac{\partial \mathcal{L}}{\partial \dot{q}} = \text{constante}
$$

```lab
noether
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\mathcal{L}$ | lagrangiana do sistema | J |
| $q$ | coordenada da simetria (posição, ângulo) | depende |
| $p$ | grandeza conservada associada (momento, momento angular) | depende |

## Exemplo

O Sol atrai a Terra igual em todas as direções (simetria de rotação em torno do Sol). Pelo teorema de Noether, o momento angular orbital da Terra se conserva: cerca de $2{,}7 \times 10^{40}$ kg·m²/s. É por isso que ela anda mais rápido perto do Sol, a segunda lei de Kepler.

## Onde isso volta

Conservação da carga elétrica vem de uma simetria interna (de fase); o modelo padrão inteiro é construído exigindo simetrias. Na cosmologia, como o universo em expansão muda com o tempo, não há em geral uma energia total conservada.

## Pergunta-ponte

Que simetrias as forças fundamentais têm, e o que elas obrigam a conservar?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a energia se conserva porque sim" | "a energia se conserva porque as leis da física não mudam com o tempo" |
| "simetria é algo ser bonito ou espelhado" | "em física, simetria é uma mudança que deixa as leis iguais" |

## Nível técnico

Se a ação é invariante sob $q \to q + \epsilon\,\delta q$, então $Q = \sum_i \frac{\partial\mathcal L}{\partial\dot q_i}\delta q_i$ é conservada (com um termo extra se a lagrangiana muda por uma derivada total). Translação temporal dá $\mathcal H$; translação espacial dá $\vec p$; rotação dá $\vec L$. Em teoria de campos, há uma corrente conservada $\partial_\mu j^\mu = 0$; a simetria de fase U(1) da eletrodinâmica dá a conservação da carga. O segundo teorema de Noether trata de simetrias locais (de gauge).
