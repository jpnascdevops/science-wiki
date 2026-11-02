---
id: special-relativity
title: Relatividade restrita
summary: A velocidade da luz é a mesma para todos; tempo e espaço se ajustam a isso.
recap:
  - "A velocidade da luz é a mesma para todos os observadores."
  - "Relógios em movimento andam mais devagar, pelo fator γ."
  - "O desvio em relação a Newton cresce aos poucos; não há um limite fixo."
levels: [zero, technical]
consensus: established
tags:
  area: physics/special-relativity
  topics: [light, spacetime]
  era: modern-revolution
  people: [albert-einstein]
equations:
  - tex: \gamma = \frac{1}{\sqrt{1 - v^2/c^2}}
    spoken: "gama é igual a um sobre a raiz de um menos v ao quadrado sobre c ao quadrado"
  - tex: \Delta t = \gamma\,\Delta t_0
    spoken: "delta t é igual a gama vezes delta t zero"
claims:
  - text: "A 10% da velocidade da luz, o fator de Lorentz é cerca de 1,005"
    type: number
    check: compute
    formula: gamma_at_0_1c
    expected: 1.005
    tolerance: 0.001
    status: verified
  - text: "A 90% da velocidade da luz, o fator de Lorentz é cerca de 2,29"
    type: number
    check: compute
    formula: gamma_at_0_9c
    expected: 2.29
    tolerance: 0.005
    status: verified
  - text: "Einstein publicou a relatividade restrita em 1905"
    type: date
    check: source
    sources: [https://pt.wikipedia.org/wiki/Relatividade_restrita]
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Relatividade restrita"
    url: https://pt.wikipedia.org/wiki/Relatividade_restrita
    level: zero
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

A luz anda sempre a $c \approx 300$ mil km/s, não importa quem mede. Para isso ser verdade, o tempo de quem se move rápido passa mais devagar e as distâncias encurtam na direção do movimento. No dia a dia isso é invisível porque andamos devagar demais.

## Equação

$$
\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\gamma$ | fator de Lorentz | sem unidade |
| $v$ | velocidade | m/s |
| $c$ | velocidade da luz | m/s |
| $\Delta t_0$ | tempo no relógio de quem se move | s |
| $\Delta t$ | o mesmo intervalo visto por quem está parado | s |

## Exemplo

| $v/c$ | $\gamma$ |
| --- | --- |
| 0,1 | 1,005 |
| 0,9 | 2,29 |

Não existe uma velocidade em que Newton "para de funcionar": o desvio cresce continuamente.

```lab
lorentz
```

## Onde isso volta

A relatividade geral estende essas ideias para incluir a gravidade. O GPS precisa corrigir os dois efeitos, o da velocidade e o da gravidade.

## Pergunta-ponte

Se o tempo depende do movimento, ele também depende da gravidade?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a partir de 10% da luz Newton falha" | "o desvio cresce aos poucos; depende da precisão que você precisa" |
| "é só uma ilusão de ótica" | "relógios reais marcam tempos diferentes" |

## Nível técnico

O intervalo $ds^2 = -c^2dt^2 + dx^2 + dy^2 + dz^2$ é invariante sob transformações de Lorentz. A dilatação do tempo sai de $d\tau = dt/\gamma$, e a energia de uma partícula livre é $E = \gamma m c^2$, que se reduz a $mc^2 + \frac12 mv^2$ para $v \ll c$.
