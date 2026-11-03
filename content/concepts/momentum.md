---
id: momentum
title: Momento linear e impulso
summary: Momento linear é massa vezes velocidade; num sistema isolado o total se conserva, e o impulso de uma força muda o momento.
recap:
  - "Momento linear (quantidade de movimento): p = m v, com direção."
  - "Sem força externa, o momento total de um sistema não muda."
  - "Impulso = força × tempo = variação do momento."
  - "Mesma variação de momento em mais tempo exige menos força: airbag, joelho dobrado, rede de proteção."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, conservation-laws]
  era: scientific-revolution
  people: [rene-descartes, christiaan-huygens, john-wallis, christopher-wren, isaac-newton]
  events: [royal-society-collisions, principia]
equations:
  - tex: \vec{p} = m\,\vec{v}
    spoken: "vetor p é igual a m vezes vetor v"
  - tex: \vec{F}\,\Delta t = \Delta\vec{p}
    spoken: "vetor F vezes delta t é igual a delta vetor p"
  - tex: \sum \vec{p}_{\text{antes}} = \sum \vec{p}_{\text{depois}}
    spoken: "a soma dos momentos antes é igual à soma dos momentos depois"
claims:
  - text: "Um carro de 1000 kg a 20 m/s tem momento de 20 000 kg·m/s"
    type: number
    check: compute
    formula: momentum_car_20ms
    expected: 20000
    unit: kg·m/s
    tolerance: 0.001
    status: verified
  - text: "Parar uma bola de 0,4 kg a 10 m/s em 0,1 s exige força média de 40 N"
    type: number
    check: compute
    formula: impulse_force_0_1s
    expected: 40
    unit: N
    tolerance: 0.001
    status: verified
  - text: "Parar a mesma bola em 0,01 s exige 400 N"
    type: number
    check: compute
    formula: impulse_force_0_01s
    expected: 400
    unit: N
    tolerance: 0.001
    status: verified
  - text: "Descartes definiu a quantidade de movimento (tamanho do corpo vezes rapidez) como conservada nos Princípios da Filosofia, de 1644, sem levar em conta a direção"
    type: attribution
    check: source
    sources: [https://cambridge.org/core/books/cambridge-descartes-lexicon/conservation-of-motion-principle-of/D22AE869A50822C84050300FEF144B3C]
    status: verified
  - text: "Entre 1668 e 1669, Wallis, Wren e Huygens apresentaram à Royal Society regras para as colisões"
    type: date
    check: source
    sources: [https://pictures.royalsociety.org/image-rs-15415, https://mathshistory.st-andrews.ac.uk/Biographies/Huygens.html]
    status: verified
resources:
  - kind: study
    title: "Cap. 9: Momento linear e colisões (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/09%3A_Momento_linear_e_colisoes
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "15.1 Momentum and Impulse (MIT OCW 8.01SC)"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/week-5-momentum-and-impulse/15-1-momentum-and-impulse/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 10 Conservation of Momentum"
    url: https://www.feynmanlectures.caltech.edu/I_10.html
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Momentum (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Momentum
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Um caminhão a 10 km/h e uma bicicleta a 10 km/h: qual é mais difícil de parar? O caminhão. O "embalo" de um corpo depende da massa e da velocidade juntas, e esse produto é o momento linear.

Pela terceira lei, quando dois corpos interagem, as forças são iguais e opostas durante o mesmo tempo. Então o momento que um ganha é exatamente o que o outro perde, e o total não muda. É uma das leis mais sólidas da física: vale em colisões de carros, de bolas de bilhar e de partículas num acelerador.

## Equação

$$
\vec{F}\,\Delta t = \Delta\vec{p}
$$

```lab
impulse
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec{p}$ | momento linear | kg·m/s |
| $m$ | massa | kg |
| $\vec{v}$ | velocidade | m/s |
| $\vec{F}$ | força média | N |
| $\Delta t$ | duração da interação | s |

## Exemplo

Para pegar uma bola de 0,4 kg a 10 m/s, você precisa tirar 4 kg·m/s de momento dela. Se a mão recua e a parada leva 0,1 s, a força média é 40 N. Com a mão dura, parando em 0,01 s, são 400 N. O airbag faz o mesmo: aumenta o tempo da parada para baixar a força.

## Onde isso volta

Colisões usam a conservação do momento. A versão para rotação é o momento angular. Na relatividade, o momento ganha um fator $\gamma$; na quântica, vira o operador que, junto com a posição, obedece ao princípio da incerteza. A luz, mesmo sem massa, carrega momento.

## Pergunta-ponte

Se o momento total se conserva numa batida, a energia também se conserva?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "momento é o mesmo que energia" | "momento é m v, com direção; energia cinética é m v²/2, sem direção" |
| "na batida o momento se perde" | "o momento total se conserva; o que pode diminuir é a energia cinética, que vira calor, som e deformação" |

## Nível técnico

Newton enunciou a segunda lei em termos de variação da quantidade de movimento; na forma moderna, $\vec F = \mathrm{d}\vec p/\mathrm{d}t$. Para massa variável, como foguetes, não se aplica essa fórmula ao foguete sozinho: conserva-se o momento do sistema foguete + gás expelido, o que dá $m\,\mathrm{d}v = -v_e\,\mathrm{d}m$ e a equação de Tsiolkovsky $\Delta v = v_e \ln(m_0/m_f)$. Pelo teorema de Noether, a conservação do momento linear decorre da simetria das leis físicas sob translação no espaço.
