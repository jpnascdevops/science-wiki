---
id: linear-algebra
title: 'Álgebra linear: matrizes e autovalores'
summary: Uma matriz é uma transformação do espaço (girar, esticar, cisalhar); os autovetores são as direções que ela só estica, sem girar.
recap:
  - "Uma matriz 2×2 diz para onde vão os dois vetores de base; o resto do plano vai junto."
  - "Determinante: por quanto as áreas são multiplicadas (negativo se espelha, zero se achata)."
  - "Autovetor: direção que a matriz só estica ou encolhe; autovalor: por quanto."
  - "Na quântica, os valores possíveis de uma medida são autovalores de matrizes (operadores) hermitianas."
levels: [zero, technical]
consensus: established
tags:
  area: math/linear-algebra
  topics: [foundations]
  era: nineteenth-century
  people: [james-sylvester, arthur-cayley, werner-heisenberg, max-born, pascual-jordan]
  events: [matrix-mechanics]
equations:
  - tex: \begin{pmatrix} a & b \\ c & d \end{pmatrix}\begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} a x + b y \\ c x + d y \end{pmatrix}
    spoken: "a matriz a b, c d, vezes o vetor x y, é igual ao vetor a x mais b y, c x mais d y"
  - tex: A\,\vec{v} = \lambda\,\vec{v}
    spoken: "A vezes vetor v é igual a lambda vezes vetor v"
  - tex: \det A = a d - b c
    spoken: "o determinante de A é igual a a d menos b c"
claims:
  - text: "A matriz [2 1; 1 2] tem autovalores 3 e 1"
    type: number
    check: compute
    formula: eigen_2112_largest
    expected: 3
    unit: ""
    tolerance: 0.000001
    status: verified
  - text: "O menor autovalor de [2 1; 1 2] é 1"
    type: number
    check: compute
    formula: eigen_2112_smallest
    expected: 1
    unit: ""
    tolerance: 0.000001
    status: verified
  - text: "Sylvester cunhou o termo matriz em 1850; Cayley publicou a álgebra das matrizes em 1858"
    type: date
    check: source
    sources: ["https://eprints.maths.manchester.ac.uk/863/1/cay_syl_07.pdf"]
    status: verified
  - text: "Entre 1925 e 1926, Heisenberg, Born e Jordan formularam a mecânica quântica em termos de matrizes"
    type: date
    check: source
    sources: ["https://www.theorie.physik.uni-goettingen.de/aktuell/archiv/75qm.en.html", "https://arxiv.org/pdf/0806.4515"]
    status: verified
resources:
  - kind: study
    title: "9.5: Matrizes e operações matriciais (Pré-cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/09%3A_Sistemas_de_equa%C3%A7%C3%B5es_e_desigualdades/9.05%3A_Matrizes_e_opera%C3%A7%C3%B5es_matriciais
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: watch
    title: "Linear transformations and matrices - Essence of linear algebra, ch. 3 (3Blue1Brown)"
    url: https://www.3blue1brown.com/lessons/linear-transformations
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Eigenvectors and eigenvalues - Essence of linear algebra (3Blue1Brown)"
    url: https://3blue1brown.com/lessons/eigenvalues
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT 18.06SC Linear Algebra, Gilbert Strang (MIT Open Learning Library)"
    url: https://openlearninglibrary.mit.edu/courses/course-v1:OCW+18.06SC+2T2019/about
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Cayley, Sylvester, and Early Matrix Theory (N. J. Higham, MIMS EPrint 2007.119, PDF)"
    url: https://eprints.maths.manchester.ac.uk/863/1/cay_syl_07.pdf
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Imagine o plano desenhado numa folha de borracha quadriculada. Uma matriz é uma forma de deformar essa folha sem rasgar e mantendo as linhas retas e a origem no lugar: girar, esticar, inclinar, espelhar. Para saber a deformação inteira, basta saber para onde vão os dois vetores de base (um passo para a direita, um passo para cima). As colunas da matriz são exatamente esses destinos.

Na maioria das deformações, quase toda seta muda de direção. Mas algumas direções especiais só esticam ou encolhem, sem girar: são os autovetores. O fator de estiramento é o autovalor. Encontrar essas direções simplifica qualquer problema, porque nelas a transformação vira uma simples multiplicação.

## Equação

$$
A\,\vec{v} = \lambda\,\vec{v}
$$

```lab
matrix
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $A$ | matriz: a transformação | — |
| $\vec v$ | autovetor: direção que não gira | — |
| $\lambda$ | autovalor: por quanto essa direção estica | — |
| $\det A$ | determinante: fator de mudança das áreas | — |

## Exemplo

A matriz $\begin{pmatrix} 2 & 1 \\ 1 & 2 \end{pmatrix}$ estica o plano na diagonal $(1, 1)$ por 3 e deixa a outra diagonal $(1, -1)$ do mesmo tamanho (autovalor 1). O determinante é $2 \times 2 - 1 \times 1 = 3$: as áreas triplicam, que é o produto dos autovalores. Uma rotação de 90° não deixa nenhuma direção parada: os autovalores são $\pm i$.

## Onde isso volta

Modos normais de vibração (cada modo é um autovetor), tensores na relatividade, e a mecânica quântica inteira: estados são vetores, grandezas observáveis são matrizes, e os valores que se pode medir são os autovalores delas. Foi assim que Heisenberg, Born e Jordan escreveram a primeira versão completa da quântica.

## Pergunta-ponte

Se medir uma grandeza na quântica é achar um autovalor, o que acontece com o estado depois da medida?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "matriz é uma tabela de números" | "matriz é uma transformação; a tabela é só como se escreve" |
| "toda matriz tem autovetores reais" | "rotações, por exemplo, não têm; os autovalores ficam complexos" |

## Nível técnico

Os autovalores são as raízes de $\det(A - \lambda I) = 0$; para 2×2, $\lambda^2 - (\operatorname{tr}A)\lambda + \det A = 0$, com $\operatorname{tr}A = \sum\lambda_i$ e $\det A = \prod\lambda_i$. Matrizes simétricas reais (e hermitianas complexas) têm autovalores reais e autovetores ortogonais (teorema espectral): é por isso que observáveis quânticos são hermitianos. A matriz de Pauli $\sigma_x$ tem autovalores $\pm1$, os dois resultados possíveis de medir o spin em $x$.
