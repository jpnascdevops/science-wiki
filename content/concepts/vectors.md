---
id: vectors
title: Vetores
summary: Vetor é uma grandeza com tamanho e direção; soma-se com a regra do paralelogramo ou componente por componente.
recap:
  - "Vetor tem módulo (tamanho), direção e sentido; escalar só tem tamanho."
  - "Deslocamento, velocidade, aceleração e força são vetores; massa, tempo e energia não."
  - "Soma-se separando em componentes x e y (com seno e cosseno) e somando cada uma."
  - "3 km para leste mais 4 km para norte dão 5 km, não 7."
levels: [zero, technical]
consensus: established
tags:
  area: math/geometry
  topics: [foundations, motion]
  era: nineteenth-century
  people: [josiah-willard-gibbs, oliver-heaviside]
  events: []
equations:
  - tex: \vec{v} = (v_x, v_y) = (v\cos\theta,\ v\sin\theta)
    spoken: "vetor v é igual ao par v x, v y, que é v cosseno de teta, v seno de teta"
  - tex: '|\vec{v}| = \sqrt{v_x^2 + v_y^2}'
    spoken: "o módulo do vetor v é igual à raiz quadrada de v x ao quadrado mais v y ao quadrado"
claims:
  - text: "3 km para leste e 4 km para norte somam 5 km, numa direção de cerca de 53° acima do leste"
    type: number
    check: compute
    formula: vector_3_4_magnitude
    expected: 5
    unit: km
    tolerance: 0.001
    status: verified
  - text: "O ângulo do vetor (3, 4) com o eixo x é cerca de 53,13°"
    type: number
    check: compute
    formula: vector_3_4_angle_deg
    expected: 53.13
    unit: graus
    tolerance: 0.001
    status: verified
  - text: "A análise vetorial moderna foi desenvolvida de forma independente por Gibbs e Heaviside nos anos 1880"
    type: attribution
    check: source
    sources: [https://arxiv.org/pdf/2010.09679, https://en.wikipedia.org/wiki/Vector_Analysis]
    status: verified
resources:
  - kind: study
    title: "Cap. 2: Vetores (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/02%3A_Vetores
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Adição de Vetores (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/vector-addition
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "0.1 Vectors vs. Scalars (MIT OCW 8.01SC Classical Mechanics, Fall 2016)"
    url: https://www.ocw.mit.edu/courses/8-01sc-classical-mechanics-fall-2016/pages/review-vectors/0-1-vectors-vs--scalars/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Back to the Roots of Vector and Tensor Calculus: Heaviside versus Gibbs (arXiv 2010.09679)"
    url: https://arxiv.org/pdf/2010.09679
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

"Ande 5 km" não basta para chegar a lugar nenhum; falta dizer para onde. Grandezas assim, com tamanho e direção, são vetores. Desenha-se uma seta: o comprimento é o tamanho, a reta da seta é a direção e a ponta mostra o sentido.

Somar setas não é somar números. Andar 3 km para leste e depois 4 km para norte deixa você a 5 km do ponto de partida, na diagonal. O jeito prático de somar é quebrar cada seta em uma parte horizontal e uma vertical, somar as partes separadamente e remontar.

## Equação

$$
|\vec{v}| = \sqrt{v_x^2 + v_y^2}
$$

```lab
vector-add
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec{v}$ | vetor (a seta inteira) | depende da grandeza |
| $v_x, v_y$ | componentes horizontal e vertical | idem |
| $\lvert\vec{v}\rvert$ | módulo: o tamanho da seta | idem |
| $\theta$ | ângulo com o eixo horizontal | grau |

## Exemplo

3 km para leste e 4 km para norte: componentes (3, 4). Módulo $\sqrt{9 + 16} = 5$ km. Direção: $\tan\theta = 4/3$, $\theta \approx 53°$ acima do leste. O caminho andado foi 7 km, mas o deslocamento é 5 km.

## Onde isso volta

Força, velocidade e aceleração são vetores, e a segunda lei de Newton é uma equação entre vetores. Projéteis se resolvem separando o movimento em x e y. Torque e momento angular usam o produto vetorial; campos elétricos e magnéticos são vetores em cada ponto do espaço.

## Pergunta-ponte

Com posição e velocidade bem definidas, como descrever um movimento passo a passo?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "velocidade e rapidez são a mesma coisa" | "rapidez é o tamanho; velocidade inclui a direção" |
| "duas forças de 10 N somam 20 N" | "somam 20 N só se apontarem para o mesmo lado; opostas, dão zero; em outros ângulos, algo entre 0 e 20 N" |

## Nível técnico

Produto escalar: $\vec a \cdot \vec b = |\vec a||\vec b|\cos\theta$ (projeção; aparece no trabalho). Produto vetorial: $\vec a \times \vec b$, perpendicular aos dois, com módulo $|\vec a||\vec b|\sin\theta$ (aparece no torque e na força magnética). A notação de Gibbs e Heaviside substituiu os quatérnions de Hamilton, que Maxwell ainda usava em parte.
