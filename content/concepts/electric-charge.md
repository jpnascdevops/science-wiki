---
id: electric-charge
title: Carga elétrica
summary: 'Carga elétrica é uma propriedade da matéria que vem em dois tipos, positiva e negativa: iguais se repelem, opostas se atraem, e a carga total nunca muda e sempre vem em múltiplos de uma carga mínima.'
recap:
- 'Dois tipos: positiva e negativa. Iguais se repelem, opostas se atraem.'
- Prótons (+) ficam presos nos núcleos; quem se move de um objeto para outro são os elétrons (−).
- 'Carga não se cria nem se destrói: só muda de lugar.'
- 'Ela vem em pacotes: tudo é múltiplo de e = 1,602176634 × 10⁻¹⁹ C.'
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - electricity
  - foundations
  era: classical-mechanics-era
  people:
  - thales-of-miletus
  - william-gilbert
  - benjamin-franklin
  - robert-millikan
  events:
  - gilbert-de-magnete
  - franklin-charge-signs
equations:
- tex: Q = n\,e
  spoken: Q é igual a n vezes e
claims:
- id: claim-001
  text: Um coulomb equivale à carga de cerca de 6,24 × 10¹⁸ elétrons
  type: number
  check: compute
  formula: electrons_per_coulomb
  expected: 6.2415e+18
  unit: elétrons
  tolerance: 0.001
  status: calculated
- id: claim-002
  text: 'Desde a redefinição do SI em 2019, a carga elementar é exata por definição: e = 1,602176634 × 10⁻¹⁹ C'
  type: definition
  check: source
  sources:
  - https://physics.nist.gov/cuu/Constants/Value/e.html
  status: pending
- id: claim-003
  text: Por tradição, atribui-se a Tales de Mileto (c. 600 a.C.) a observação de que o âmbar atritado atrai objetos leves; em De Magnete (1600), William Gilbert usou o latim electricus, do grego élektron (âmbar), para os corpos que se comportam assim
  type: date
  check: source
  sources:
  - https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Electricity
  - https://en.wikipedia.org/wiki/William_Gilbert_(physicist)
  - https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/05%3A_Cargas_eletricas_e_campos/5.02%3A_Carga_el%C3%A9trica
  status: pending
- id: claim-004
  text: Benjamin Franklin introduziu os nomes positivo e negativo para a eletricidade por volta de 1747
  type: date
  check: source
  sources:
  - https://homepages.uc.edu/~jensenwb/reprints/125.%20Positive%20&%20Negative.pdf
  - https://www.britannica.com:443/science/electromagnetism/Invention-of-the-Leyden-jar
  status: pending
resources:
- kind: watch
  title: 'Electric Charge: Crash Course Physics #25'
  url: https://www.pbs.org/video/crash-course-physics-25
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — 5.2: Carga elétrica (OpenStax/LibreTexts)'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/05%3A_Cargas_eletricas_e_campos/5.02%3A_Carga_el%C3%A9trica
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: study
  title: Feynman Lectures Vol. II, Ch. 1 — Electromagnetism
  url: https://feynmanlectures.caltech.edu/II_01.html
  level: technical
  lang: en
  checked_at: '2026-11-03'
- kind: read
  title: NIST CODATA — elementary charge e (exact value)
  url: https://physics.nist.gov/cuu/Constants/Value/e.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Esfregue um balão no cabelo (ou num pedaço de lã) e encoste-o na parede: ele fica grudado. Os fios de cabelo se arrepiam e se afastam uns dos outros. Os gregos já tinham notado que o âmbar esfregado atrai pedacinhos de palha, e é do nome grego do âmbar, *élektron*, que vem a palavra eletricidade.

O que acontece é uma troca. Toda matéria é feita de átomos, com prótons de carga positiva presos no núcleo e elétrons de carga negativa em volta. Normalmente há tantos de um quanto do outro, e o objeto é neutro. Ao esfregar, alguns elétrons passam do cabelo para o balão. O balão fica com elétrons sobrando (negativo), o cabelo com elétrons faltando (positivo), e os dois se atraem.

Duas regras nunca falharam. A carga total não muda: o que um ganha, o outro perde. E ela vem em pacotes: nunca se viu um objeto com meia carga de elétron sobrando.

## Equação

$$
Q = n\,e
$$

```lab
charges
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $Q$ | carga total de um objeto | C (coulomb) |
| $n$ | número inteiro de cargas elementares sobrando ou faltando | — |
| $e$ | carga elementar, $1{,}602176634 \times 10^{-19}$ C | C |

## Exemplo

Quantos elétrons há em 1 coulomb? $n = Q/e = 1/(1{,}602 \times 10^{-19}) \approx 6{,}24 \times 10^{18}$, ou seis bilhões de bilhões. É por isso que o coulomb é uma unidade enorme para eletricidade estática: um balão esfregado carrega uma fração minúscula disso. No laboratório, cada sinal vale 1 bilhão de cargas elementares, cerca de 0,16 nanocoulomb.

## Onde isso volta

A força entre cargas (lei de Coulomb), as correntes elétricas (cargas em movimento), as ligações químicas (elétrons compartilhados entre átomos) e o teorema de Noether, que liga a conservação da carga a uma simetria das leis da física.

## Pergunta-ponte

Com que força duas cargas se empurram, e como essa força muda com a distância?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "esfregar cria carga" | "esfregar transfere elétrons de um objeto para o outro; a carga total continua a mesma" |
| "o objeto positivo ganhou prótons" | "o objeto positivo perdeu elétrons; os prótons ficam presos nos núcleos" |

## Nível técnico

A conservação vale localmente: a carga que sai de uma região atravessa a fronteira, $\partial\rho/\partial t + \nabla\cdot\vec J = 0$. Pelo teorema de Noether, ela vem da simetria de fase U(1) da eletrodinâmica. Os quarks têm cargas $\pm\tfrac13 e$ e $\pm\tfrac23 e$, mas só aparecem confinados em combinações de carga inteira. Millikan mediu $e$ no começo do século XX observando gotas de óleo carregadas, cujas cargas sempre saíam múltiplas de um mesmo valor. A carga é um invariante relativístico: todo observador mede o mesmo valor, qualquer que seja a velocidade da partícula.
