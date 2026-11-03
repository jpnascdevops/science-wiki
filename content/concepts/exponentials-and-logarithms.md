---
id: exponentials-and-logarithms
title: Exponenciais e logaritmos
summary: Exponencial é crescer (ou decair) multiplicando pelo mesmo fator a cada passo; o logaritmo é a operação que pergunta quantos passos foram.
recap:
  - "Crescimento linear soma sempre o mesmo; exponencial multiplica sempre pelo mesmo."
  - "Tempo de dobra (ou meia-vida) é o tempo para multiplicar por 2 (ou dividir por 2)."
  - "O logaritmo inverte a exponencial: log₂ 8 = 3 porque 2³ = 8."
  - "Com o eixo vertical em escala logarítmica, uma exponencial vira uma reta."
levels: [zero, technical]
consensus: established
tags:
  area: math/notation
  topics: [foundations, calculus]
  era: scientific-revolution
  people: [john-napier, leonhard-euler]
  events: [napier-logarithms]
equations:
  - tex: N(t) = N_0 \cdot 2^{t/T}
    spoken: "N de t é igual a N zero vezes dois elevado a t sobre T"
  - tex: N(t) = N_0\, e^{-t/\tau}
    spoken: "N de t é igual a N zero vezes e elevado a menos t sobre tau"
  - tex: \log_2 8 = 3 \iff 2^3 = 8
    spoken: "logaritmo de oito na base dois é três, se e somente se dois ao cubo é oito"
claims:
  - text: "Depois de duas meias-vidas, sobram 25% da amostra"
    type: number
    check: compute
    formula: c14_fraction_two_half_lives_percent
    expected: 25
    unit: "%"
    tolerance: 0.001
    status: verified
  - text: "Dobrar 30 vezes multiplica por cerca de um bilhão (2³⁰ ≈ 1,07 × 10⁹)"
    type: number
    check: compute
    formula: doubling_30_times
    expected: 1073741824
    unit: ""
    tolerance: 0.001
    status: verified
  - text: "Crescendo 7% ao ano, algo dobra em cerca de 10 anos"
    type: number
    check: compute
    formula: doubling_time_7_percent_years
    expected: 10.24
    unit: anos
    tolerance: 0.002
    status: verified
  - text: "A meia-vida do carbono-14 é de cerca de 5730 anos; por convenção, as datações por radiocarbono ainda são relatadas com o valor de Libby, 5568 anos"
    type: number
    check: source
    sources: ["https://www.chemeurope.com/en/encyclopedia/Carbon_dating.html", "https://pmc.ncbi.nlm.nih.gov/articles/PMC9805314"]
    status: verified
  - text: "John Napier publicou a invenção dos logaritmos em 1614"
    type: date
    check: source
    sources: ["https://britannica.com/topic/Description-of-the-Marvelous-Canon-of-Logarithms"]
    status: verified
  - text: "A letra e para a constante 2,718... foi introduzida por Euler: primeiro num manuscrito de cerca de 1727 a 1728 e depois numa carta a Goldbach de 1731"
    type: attribution
    check: source
    sources: ["https://scholarlycommons.pacific.edu/euler-works/853/", "https://mathshistory.st-andrews.ac.uk/HistTopics/e/"]
    status: verified
resources:
  - kind: study
    title: "4: Funções exponenciais e logarítmicas (Pré-cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/04%3A_Fun%C3%A7%C3%B5es_exponenciais_e_logar%C3%ADtmicas
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "1.5: Funções exponenciais e logarítmicas (Cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/01%3A_Fun%C3%A7%C3%B5es_e_gr%C3%A1ficos/1.05%3A_Fun%C3%A7%C3%B5es_exponenciais_e_logar%C3%ADtmicas
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "Decaimento Alfa (simulação PhET; relação com a meia-vida)"
    url: https://phet.colorado.edu/pt_BR/simulations/alpha-decay
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "The number e (MacTutor History of Mathematics)"
    url: https://mathshistory.st-andrews.ac.uk/HistTopics/e/
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Description of the Marvelous Canon of Logarithms (Britannica)"
    url: https://britannica.com/topic/Description-of-the-Marvelous-Canon-of-Logarithms
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Dobre uma folha de papel ao meio 42 vezes e a espessura passaria da distância até a Lua. Parece absurdo porque nossa intuição é linear: somamos. A exponencial multiplica. No começo parece lenta; depois, explode.

O caminho de volta é o logaritmo. A pergunta "por quanto multipliquei?" é exponencial; a pergunta "quantas vezes dobrei?" é logaritmo. Napier inventou os logaritmos no século XVII justamente para isso: transformar multiplicações enormes (de astrônomos e navegadores) em somas.

O decaimento é o mesmo filme ao contrário: a cada meia-vida, sobra metade. Átomos radioativos, a carga de um capacitor e o remédio no sangue seguem essa regra.

## Equação

$$
N(t) = N_0 \cdot 2^{t/T}
$$

```lab
growth
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $N_0$ | quantidade no começo | qualquer |
| $N(t)$ | quantidade no tempo $t$ | a mesma |
| $T$ | tempo de dobra (com sinal de menos no expoente, meia-vida) | s, anos... |
| $e$ | número de Euler, ≈ 2,718 | — |
| $\tau$ | tempo característico: em $\tau$, cai para 1/e ≈ 37% | s |

## Exemplo

Uma bactéria que se divide a cada 20 minutos: em 10 horas são 30 divisões, e $2^{30} \approx 1{,}07$ bilhão de bactérias. No sentido contrário, o carbono-14 tem meia-vida de cerca de 5730 anos: depois de duas meias-vidas, uns 11 500 anos, sobram 25%. Medindo quanto sobrou, o logaritmo diz a idade.

Uma regra prática: algo que cresce $p$% por período dobra em cerca de $70/p$ períodos. A 7% ao ano, dobra em uns 10 anos.

## Onde isso volta

Decaimento radioativo, carga e descarga de capacitores, absorção da luz, a atmosfera ficando rarefeita com a altura, o fator de Boltzmann $e^{-E/k_BT}$ e a entropia (que é um logaritmo). Escalas de decibéis, magnitudes de estrelas e o pH também são logaritmos.

## Pergunta-ponte

Se cada evento (uma divisão, um decaimento) é aleatório, por que o total segue uma curva tão previsível?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "cresce exponencialmente" para qualquer coisa rápida | "exponencial é multiplicar pelo mesmo fator a cada passo; rápido não é sinônimo" |
| "depois de duas meias-vidas acaba" | "depois de duas meias-vidas sobra um quarto; a curva matemática nunca chega a zero (uma amostra real, com átomos contáveis, acaba)" |

## Nível técnico

A exponencial natural é a solução de $\mathrm{d}N/\mathrm{d}t = kN$: a taxa de mudança é proporcional à própria quantidade. Daí $N = N_0 e^{kt}$, com tempo de dobra $T = \ln 2 / k$. A regra do 70 vem de $\ln 2 \approx 0{,}693$ e, com $p$ em fração (0,07), $\ln(1+p) \approx p$: daí $0{,}693/p$, ou cerca de 70 dividido pela taxa em %. A série $e^x = \sum x^n/n!$ e a fórmula de Euler $e^{i\theta} = \cos\theta + i\sin\theta$ ligam a exponencial à trigonometria.
