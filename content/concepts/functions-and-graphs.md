---
id: functions-and-graphs
title: Funções e gráficos
summary: Uma função é uma regra que transforma um número em outro; o gráfico é o desenho dessa regra.
recap:
  - "Função é uma regra: entra um número, sai outro. Em física, quase sempre entra o tempo."
  - "O gráfico põe a entrada no eixo horizontal e a saída no vertical."
  - "Reta: a grandeza muda sempre no mesmo ritmo. Curva: o ritmo muda."
  - "A inclinação da reta é o ritmo; em x(t) = x₀ + v t, a inclinação é a velocidade."
levels: [zero]
consensus: established
tags:
  area: math/notation
  topics: [foundations, motion]
  era: scientific-revolution
  people: [rene-descartes, pierre-de-fermat]
  events: [la-geometrie]
equations:
  - tex: y = f(x)
    spoken: "y é igual a f de x"
  - tex: x(t) = x_0 + v\,t
    spoken: "x de t é igual a x zero mais v vezes t"
claims:
  - text: "Um carro que parte de 10 m a 20 m/s está em 70 m depois de 3 s"
    type: number
    check: compute
    formula: position_linear_3s
    expected: 70
    unit: m
    tolerance: 0.001
    status: verified
  - text: "Descartes publicou A Geometria em 1637, origem das coordenadas cartesianas; Fermat chegou a ideias parecidas de forma independente"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/Analytic_geometry]
    status: verified
resources:
  - kind: study
    title: "1.1: Funções e notação de funções (Pré-cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/01%3A_Fun%C3%A7%C3%B5es/1.01%3A_Fun%C3%A7%C3%B5es_e_nota%C3%A7%C3%A3o_de_fun%C3%A7%C3%B5es
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "1.1: Revisão das funções (Cálculo, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/01%3A_Fun%C3%A7%C3%B5es_e_gr%C3%A1ficos/1.01%3A_Revis%C3%A3o_das_fun%C3%A7%C3%B5es
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Analytic geometry (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Analytic_geometry
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "What is a function? (Khan Academy)"
    url: "https://en.khanacademy.org/math/algebra/algebra-functions/evaluating-functions/v/what-is-a-function"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Pense numa máquina: você coloca um número, ela devolve outro. Coloque o tempo, ela devolve onde o carro está. Essa máquina é uma função. O gráfico é a foto da máquina inteira de uma vez: para cada tempo no eixo horizontal, um ponto na altura da posição.

A ideia de descrever curvas com números medidos a partir de eixos de referência veio de Descartes e Fermat, no século XVII; o plano com dois eixos perpendiculares, como usamos hoje, se firmou depois. Foi ela que juntou a geometria e a álgebra, e a física inteira depois passou a ser escrita assim.

## Equação

$$
x(t) = x_0 + v\,t
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $t$ | tempo (a entrada) | s |
| $x(t)$ | posição no instante $t$ (a saída) | m |
| $x_0$ | posição no instante zero | m |
| $v$ | velocidade, a inclinação da reta | m/s |

## Exemplo

Um carro passa pela marca de 10 m andando a 20 m/s, sempre no mesmo ritmo. A função é $x(t) = 10 + 20\,t$. Depois de 3 s: $x = 10 + 20 \times 3 = 70$ m. No gráfico, é uma reta que corta o eixo vertical em 10 e sobe 20 m a cada segundo.

## Onde isso volta

Toda a cinemática é ler gráficos de posição, velocidade e aceleração. A inclinação de um gráfico vira a derivada, e a área embaixo dele vira a integral.

## Pergunta-ponte

E se o gráfico for uma curva, qual é a "inclinação" num ponto só?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o gráfico mostra o caminho do carro" | "o gráfico de x por t mostra onde o carro está em cada instante, não o desenho da estrada" |
| "reta inclinada quer dizer que está subindo uma ladeira" | "inclinação no gráfico é ritmo de mudança; pode ser um carro numa pista plana" |
