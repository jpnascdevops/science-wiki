---
id: heat-engines
title: Máquinas térmicas e o ciclo de Carnot
summary: Uma máquina térmica tira calor de uma fonte quente, transforma parte em trabalho e joga o resto numa fonte fria; Carnot achou o limite máximo dessa conversão.
recap:
  - "Toda máquina térmica precisa de uma fonte quente e de uma fria; o resto do calor sempre vai para a fria."
  - "Eficiência máxima (Carnot): 1 − T_fria / T_quente, com temperaturas em kelvin."
  - "Entre 800 K e 300 K, nenhuma máquina passa de 62,5%."
  - "A geladeira é a máquina ao contrário: gasta trabalho para levar calor do frio para o quente."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [heat, energy]
  era: nineteenth-century
  people: [sadi-carnot, william-thomson-kelvin, rudolf-clausius]
  events: [carnot-reflections]
equations:
  - tex: \eta = \frac{W}{Q_q}
    spoken: "eta é igual a W sobre Q q"
  - tex: \eta_{\text{Carnot}} = 1 - \frac{T_f}{T_q}
    spoken: "eta de Carnot é igual a um menos T f sobre T q"
claims:
  - id: claim-001
    text: "Entre uma fonte a 800 K e outra a 300 K, a eficiência máxima é 62,5%"
    type: number
    check: compute
    formula: carnot_800_300_percent
    expected: 62.5
    unit: "%"
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Sadi Carnot publicou as Reflexões sobre a potência motriz do fogo em 1824"
    type: date
    check: source
    sources: ["https://www.britannica.com/biography/Sadi-Carnot-French-scientist"]
    status: pending
resources:
  - kind: read
    title: "4.6: O ciclo de Carnot (Física Universitária II, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/04%3A_A_Segunda_Lei_da_Termodinamica/4.06%3A_O_ciclo_de_Carnot"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 44: The Laws of Thermodynamics (reversible engines, ideal efficiency)"
    url: "https://www.feynmanlectures.caltech.edu/I_44.html"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 46: Ratchet and pawl (the ratchet as an engine)"
    url: "https://www.feynmanlectures.caltech.edu/I_46.html"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Engines: Crash Course Physics #24"
    url: "https://www.pbs.org/video/crash-course-physics-24/"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Uma máquina a vapor queima carvão, ferve água, e o vapor empurra um pistão. Parece que todo o calor poderia virar movimento. Não pode. Para o pistão voltar e o ciclo recomeçar, o vapor precisa esfriar, e esse calor vai embora para o ambiente (a fonte fria). Sem fonte fria, a máquina para.

Sadi Carnot, um jovem engenheiro francês, perguntou em 1824 qual é o melhor possível. A resposta não depende do vapor, do pistão ou do combustível: só das duas temperaturas. Quanto mais quente a fonte quente e mais fria a fria, maior a fração do calor que vira trabalho. Mas nunca toda.

## Equação

$$
\eta_{\text{Carnot}} = 1 - \frac{T_f}{T_q}
$$

```lab
carnot
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\eta$ | eficiência: fração do calor que vira trabalho | — |
| $W$ | trabalho por ciclo | J |
| $Q_q$ | calor tirado da fonte quente | J |
| $T_q$ | temperatura da fonte quente | K |
| $T_f$ | temperatura da fonte fria | K |

## Exemplo

Uma caldeira a 800 K e o ar ambiente a 300 K: $\eta = 1 - 300/800 = 62{,}5\%$. Esse é o teto; uma usina real fica bem abaixo, por atrito, perdas de calor e processos que não são reversíveis. Por isso usinas buscam vapor cada vez mais quente.

## Onde isso volta

O limite de Carnot é a segunda lei disfarçada: se uma máquina passasse dele, daria para montar um moto-perpétuo de segunda espécie: tirar calor de uma só fonte e transformá-lo todo em trabalho. Daí sai a definição de entropia e a própria escala de temperatura absoluta de Kelvin.

## Pergunta-ponte

O que, exatamente, impede o calor de se transformar todo em trabalho?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a máquina perde energia por ser mal feita" | "mesmo perfeita, parte do calor tem que ir para a fonte fria" |
| "eficiência de Carnot em graus Celsius" | "use sempre kelvin; em Celsius a conta dá errado" |
