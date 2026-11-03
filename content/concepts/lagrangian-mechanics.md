---
id: lagrangian-mechanics
title: Mecânica lagrangiana
summary: Escrever a lagrangiana L = T − V em quaisquer coordenadas convenientes e aplicar a equação de Euler-Lagrange dá as equações de movimento sem desenhar forças.
recap:
  - "Lagrangiana: L = energia cinética − energia potencial."
  - "Escolhem-se as coordenadas mais cômodas (ângulos, comprimentos) e uma receita única dá as equações."
  - "Forças de vínculo (a tensão do fio, a normal) nem precisam aparecer."
  - "Lagrange publicou a Mecânica Analítica em 1788, famosa por não ter nenhuma figura."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, foundations]
  era: classical-mechanics-era
  people: [joseph-louis-lagrange, leonhard-euler]
  events: [mecanique-analytique]
equations:
  - tex: \mathcal{L} = T - V
    spoken: "L cursivo é igual a T menos V"
  - tex: \frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial \mathcal{L}}{\partial \dot{q}} - \frac{\partial \mathcal{L}}{\partial q} = 0
    spoken: "d d t da derivada parcial de L em relação a q ponto, menos a derivada parcial de L em relação a q, é igual a zero"
claims:
  - text: "Para o pêndulo de 1 m, a lagrangiana dá a mesma equação de Newton e o mesmo período de cerca de 2,0 s para balanços pequenos"
    type: number
    check: compute
    formula: pendulum_period_1m
    expected: 2.006
    unit: s
    tolerance: 0.002
    status: verified
  - text: "Lagrange publicou a Mecânica Analítica em 1788, sem nenhuma figura"
    type: date
    check: source
    sources: ["https://www.britannica.com/biography/Joseph-Louis-Lagrange-comte-de-lEmpire", "https://mathshistory.st-andrews.ac.uk/Biographies/Lagrange/quotations"]
    status: verified
resources:
  - kind: watch
    title: "Leonard Susskind, The Theoretical Minimum (Stanford) Lecture 3 - Lagrangian, Least Action & Euler-Lagrange Equations"
    url: "https://cosmolearning.org/video-lectures/lagrangian-least-action-euler-lagrange-equations"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "David Tong (Cambridge), Classical Dynamics ch. 2 - The Lagrangian Formalism (least action, generalised coordinates, Noether, double pendulum)"
    url: "https://davidtong.org/teaching/classical-dynamics/dynhtml/S2"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 8.09 Classical Mechanics III (Iain Stewart, Fall 2014) - Lagrangian and Hamiltonian mechanics"
    url: "https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Marcos Duarte (USP/UFABC) - Formalismo Lagrangeano em Mecânica Clássica (apostila)"
    url: "https://bmclab.pesquisa.ufabc.edu.br/pubs/lagrange.pdf"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 8.09 Chapter 1 - A Review of Analytical Mechanics (PDF notes)"
    url: "https://ocw.mit.edu/courses/8-09-classical-mechanics-iii-fall-2014/resources/mit8_09f14_chapter_1"
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Para resolver um pêndulo com Newton, é preciso desenhar a tensão do fio, o peso, decompor tudo em direções. Para um pêndulo de mola, pior: a mola estica, o ângulo muda, as forças viram um quebra-cabeça.

Lagrange propôs outro caminho. Esqueça as forças. Escreva duas energias (a de movimento e a de posição) usando as coordenadas que forem mais naturais, como o ângulo e o comprimento da mola. Faça a diferença $T - V$. Uma única receita, a equação de Euler-Lagrange, aplicada a cada coordenada, devolve as equações de movimento. As forças de vínculo, como a tensão do fio, nem aparecem.

É a mesma física de Newton, só que organizada a partir da ação. E é essa organização que depois leva à mecânica hamiltoniana, à quântica e à teoria de campos.

## Equação

$$
\frac{\mathrm{d}}{\mathrm{d}t}\frac{\partial \mathcal{L}}{\partial \dot{q}} - \frac{\partial \mathcal{L}}{\partial q} = 0
$$

```lab
spring-pendulum
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\mathcal{L}$ | lagrangiana, $T - V$ | J |
| $q$ | coordenada generalizada (um ângulo, um comprimento...) | depende |
| $\dot q$ | velocidade generalizada | depende |
| $\partial$ | derivada parcial: muda só uma variável | — |

## Exemplo

Pêndulo simples: $\mathcal{L} = \tfrac12 mL^2\dot\theta^2 + mgL\cos\theta$. A receita dá $mL^2\ddot\theta + mgL\sin\theta = 0$, ou $\ddot\theta = -(g/L)\sin\theta$, exatamente o que Newton daria, sem falar da tensão no fio. Para 1 m e ângulos pequenos, período de cerca de 2,0 s.

No pêndulo de mola do laboratório há duas coordenadas (comprimento e ângulo), e a mesma receita aplicada a cada uma dá as duas equações que a simulação resolve.

## Onde isso volta

Mecânica hamiltoniana, o teorema de Noether (simetrias da lagrangiana viram conservações), a relatividade e todas as teorias de campos do modelo padrão, que são escritas como uma lagrangiana.

## Pergunta-ponte

E se, em vez de posição e velocidade, descrevermos o sistema por posição e momento?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a lagrangiana é a energia total" | "é a cinética menos a potencial; a total é a soma" |
| "é uma física diferente da de Newton" | "é a mesma física, escrita de um jeito que se adapta a qualquer coordenada" |

## Nível técnico

Para o pêndulo de mola, com $r$ e $\theta$: $\mathcal L = \tfrac12 m(\dot r^2 + r^2\dot\theta^2) + mgr\cos\theta - \tfrac12 k(r - L_0)^2$, de onde $\ddot r = r\dot\theta^2 + g\cos\theta - (k/m)(r - L_0)$ e $\ddot\theta = -(g\sin\theta + 2\dot r\dot\theta)/r$. Vínculos holonômicos reduzem o número de coordenadas; forças não conservativas entram como forças generalizadas $Q_j$ do lado direito.
