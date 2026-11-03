---
id: pendulum
title: Pêndulo
summary: Para balanços pequenos, o pêndulo é um oscilador harmônico com período que só depende do comprimento; para balanços grandes, o período cresce.
recap:
  - "Balanço pequeno: T = 2π √(L/g), sem depender da massa nem da amplitude."
  - "Um pêndulo de 1 m faz um vaivém em cerca de 2 s."
  - "Balanço grande: o período cresce; a 90° é uns 18% maior."
  - "O pêndulo de Foucault mostra a Terra girando."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [oscillations, gravity]
  era: scientific-revolution
  people: [galileo-galilei, christiaan-huygens, leon-foucault]
  events: [horologium, foucault-pendulum]
equations:
  - tex: T \approx 2\pi\sqrt{\frac{L}{g}}
    spoken: "T é aproximadamente dois pi vezes a raiz quadrada de L sobre g"
  - tex: \ddot{\theta} = -\frac{g}{L}\sin\theta
    spoken: "teta dois pontos é igual a menos g sobre L vezes seno de teta"
claims:
  - text: "Um pêndulo de 1 m na Terra tem período de cerca de 2,0 s para balanços pequenos"
    type: number
    check: compute
    formula: pendulum_period_1m
    expected: 2.006
    unit: s
    tolerance: 0.002
    status: verified
  - text: "Com amplitude de 90°, o período fica cerca de 18% maior"
    type: number
    check: compute
    formula: pendulum_90deg_ratio
    expected: 1.18
    unit: ""
    tolerance: 0.002
    status: verified
  - text: "Em Paris, o plano do pêndulo de Foucault dá uma volta completa em cerca de 32 horas"
    type: number
    check: compute
    formula: foucault_paris_hours
    expected: 31.8
    unit: h
    tolerance: 0.005
    status: verified
  - text: "Galileu notou que o período do pêndulo é aproximadamente independente da amplitude (válido só para pequenas oscilações). A história da lâmpada da catedral de Pisa (data tradicional 1583) vem do Racconto istorico de Viviani (1654) e é considerada possivelmente lendária; Galileu escreveu sobre o isocronismo em 1602."
    type: attribution
    check: source
    sources: ["https://brunelleschi.imss.fi.it/pencil/eng/html/Time/02 PrimeRicerche.htm", "https://brunelleschi.imss.fi.it/itineraries/place/CathedralOfSantaMaria.html"]
    status: verified
  - text: "Christiaan Huygens inventou o relógio de pêndulo em 1656 (patente em junho de 1657) e publicou o Horologium Oscillatorium em 1673, mostrando que o pêndulo cicloidal é verdadeiramente isócrono."
    type: date
    check: source
    sources: ["https://www.lindahall.org/about/news/scientist-of-the-day/christian-huygens/", "https://mathshistory.st-andrews.ac.uk/SH/huygens_2_sh.pdf"]
    status: verified
  - text: "Léon Foucault demonstrou a rotação da Terra com um pêndulo em 1851, em Paris"
    type: date
    check: source
    sources: ["https://britannica.com/science/Foucault-pendulum"]
    status: verified
resources:
  - kind: watch
    title: "Walter Lewin, MIT 8.01 Lecture 10 - Hooke's Law and Simple Harmonic Motion (spring and pendulum, small-angle approx.)"
    url: "https://cosmolearning.org/video-lectures/hookes-law-simple-harmonic-motion-2"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "PhET - Laboratório do Pêndulo (HTML5, PT)"
    url: "https://phet.colorado.edu/pt/simulations/pendulum-lab"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "HyperPhysics - Simple Pendulum (T = 2π√(L/g), calculator)"
    url: "https://hyperphysics.gsu.edu/hbase/pend.html"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "John Denker (av8n) - Simple pendulum: exact period for large amplitudes (table T/T0, 90° -> 1.18034)"
    url: "https://av8n.com/physics/simple-pendulum.htm"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Museo Galileo - Catedral de Pisa e o relato de Viviani sobre a lâmpada (história do isocronismo)"
    url: "https://brunelleschi.imss.fi.it/itineraries/place/CathedralOfSantaMaria.html"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Galileu reparou que um pêndulo leva quase o mesmo tempo para ir e voltar, balance pouco ou muito. Para balanços pequenos isso é verdade: o pêndulo vira um oscilador harmônico, e o período só depende do comprimento do fio e da gravidade. Nem a massa importa.

Para balanços grandes, a história muda. A força que puxa de volta cresce menos que o ângulo (é proporcional a $\sin\theta$, não a $\theta$), e o pêndulo demora mais. A 90°, uns 18% a mais. Huygens resolveu isso para os relógios com um truque geométrico: fazer o fio se enrolar em curvas que obrigam o peso a andar numa cicloide, onde o período é exatamente constante.

E um pêndulo bem comprido e pesado, solto livre, revela outra coisa: o plano do balanço vai girando devagar ao longo do dia. Quem gira, na verdade, é a Terra embaixo dele. Foucault mostrou isso em Paris, em 1851.

## Equação

$$
T \approx 2\pi\sqrt{\frac{L}{g}}
$$

```lab
pendulum-lab
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $T$ | período: tempo de ida e volta | s |
| $L$ | comprimento do fio | m |
| $g$ | aceleração da gravidade | m/s² |
| $\theta$ | ângulo com a vertical | rad |

## Exemplo

Um pêndulo de 1 m: $T = 2\pi\sqrt{1/9{,}81} \approx 2{,}0$ s, um "tique" por segundo, como nos relógios de pêndulo antigos. Soltando de 90°, o período real é cerca de 2,37 s. Em Paris, o plano do pêndulo de Foucault dá uma volta completa em cerca de 32 horas; nos polos seria cerca de 23 h 56 min (um dia sideral); no equador, ele não giraria.

## Onde isso volta

O pêndulo duplo é o exemplo clássico de caos. O espaço de fase do pêndulo mostra a fronteira entre balançar e dar voltas. Pêndulos mediram a gravidade da Terra em diferentes lugares e ajudaram a descobrir que ela é achatada nos polos.

## Pergunta-ponte

E se pendurarmos um segundo pêndulo na ponta do primeiro?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o período do pêndulo nunca muda" | "quase não muda para balanços pequenos; para grandes, aumenta" |
| "um pêndulo mais pesado balança mais devagar" | "a massa não entra no período (desprezando o ar)" |

## Nível técnico

A equação exata $\ddot\theta = -(g/L)\sin\theta$ dá $T = 4\sqrt{L/g}\,K(\sin\tfrac{\theta_0}{2})$, com $K$ a integral elíptica completa de primeira espécie; numericamente, $T = T_0/\operatorname{AGM}(1, \cos\tfrac{\theta_0}{2})$. Em série, $T \approx T_0(1 + \theta_0^2/16 + \cdots)$. No pêndulo de Foucault, o plano gira com velocidade angular $\Omega\sin\phi$, com $\phi$ a latitude, efeito da força de Coriolis no referencial que gira com a Terra.
