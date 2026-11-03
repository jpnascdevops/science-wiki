---
id: second-law-thermodynamics
title: Segunda lei da termodinâmica
summary: Num sistema isolado, a entropia total não diminui; por isso o calor flui do quente para o frio e misturas não se desfazem sozinhas.
recap:
  - "Calor não passa sozinho do frio para o quente (Clausius)."
  - "Num sistema isolado, a entropia total nunca diminui."
  - "Não é proibido por uma força: é que os estados misturados são absurdamente mais numerosos."
  - "Com 100 partículas, a chance de todas voltarem para um lado é cerca de 10⁻³⁰."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [entropy, heat]
  era: nineteenth-century
  people: [rudolf-clausius, william-thomson-kelvin, ludwig-boltzmann]
  events: [clausius-entropy]
equations:
  - tex: \Delta S_{\text{total}} \geq 0
    spoken: "delta S total é maior ou igual a zero"
  - tex: \Delta S = \frac{Q}{T}
    spoken: "delta S é igual a Q sobre T"
claims:
  - text: "A chance de 100 partículas independentes estarem todas na metade esquerda é 2⁻¹⁰⁰, cerca de 8 × 10⁻³¹"
    type: number
    check: compute
    formula: all_100_left_probability
    expected: 7.89e-31
    unit: ""
    tolerance: 0.002
    status: verified
  - text: "Clausius enunciou a segunda lei em 1850, e Kelvin deu sua versão em 1851"
    type: date
    check: source
    sources: ["https://www.britannica.com:443/print/article/120559", "https://mathshistory.st-andrews.ac.uk/SH/thomson_sh.pdf"]
    status: verified
  - text: "Clausius introduziu a palavra entropia em 1865"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/Biographies/Clausius/"]
    status: verified
resources:
  - kind: read
    title: "4.7: Entropia (Física Universitária II, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/04:_A_Segunda_Lei_da_Termodinamica/4.07:_Entropia"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "15.6: Entropia e a Segunda Lei da Termodinâmica - Transtorno e Indisponibilidade de Energia (Física Universitária, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_(OpenStax)/15:_Termodinamica/15.06:_Entropia_e_a_Segunda_Lei_da_Termodin%C3%A2mica_-_Transtorno_e_Indisponibilidade_de_Energia"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 44: The Laws of Thermodynamics (44-2 The second law, 44-6 Entropy)"
    url: "https://www.feynmanlectures.caltech.edu/I_44.html"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 8.044 Statistical Physics I (Spring 2013)"
    url: "https://ocw.mit.edu/courses/8-044-statistical-physics-i-spring-2013/"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "The Most Misunderstood Concept in Physics (Veritasium)"
    url: "https://www.youtube.com/watch?v=DxL2HoqLbyA"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Reversing Entropy with Maxwell's Demon (PBS Space Time)"
    url: "https://www.pbs.org/video/reversing-entropy-with-maxwells-demon-fpqnz3/"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Um copo de café esfria na mesa; nunca esquenta sozinho tirando calor do ar mais frio. Uma gota de tinta se espalha na água; nunca se junta de volta. Um gás solto num canto ocupa a sala; nunca volta para o canto. A segunda lei resume tudo isso: há coisas que acontecem num sentido só.

A explicação de Boltzmann é de contagem. Para as moléculas do gás estarem todas num canto, há pouquíssimos arranjos possíveis; para estarem espalhadas, há uma quantidade astronômica. O gás não "quer" se espalhar: ele só passeia ao acaso entre os arranjos, e quase todos são espalhados. Voltar ao canto não é proibido por nenhuma força; é só tão improvável que não acontece nunca na vida do universo.

## Equação

$$
\Delta S_{\text{total}} \geq 0
$$

```lab
mixing
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $S$ | entropia | J/K (ou bits, contando arranjos) |
| $Q$ | calor trocado de forma reversível | J |
| $T$ | temperatura | K |
| total | sistema mais vizinhança, juntos | — |

## Exemplo

Com 100 partículas soltas numa caixa, a chance de, num instante qualquer, todas estarem na metade esquerda é $2^{-100} \approx 8 \times 10^{-31}$. Num copo de ar há uns $10^{22}$ moléculas: a chance vira um número com mais zeros do que se consegue escrever.

## Onde isso volta

A entropia ganha uma definição exata, a seta do tempo vira uma pergunta séria, e a eficiência de Carnot sai como consequência. Nos buracos negros, a segunda lei generalizada obriga o horizonte a ter entropia.

## Pergunta-ponte

Se as leis do movimento funcionam igual para a frente e para trás, de onde vem o sentido do tempo?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a entropia sempre aumenta" | "a entropia total de um sistema isolado não diminui; a de uma parte pode cair (uma geladeira, um ser vivo) se aumentar mais em outro lugar" |
| "entropia é bagunça" | "entropia conta quantos arranjos microscópicos dão o mesmo estado visto de fora" |
