---
id: third-law-thermodynamics
title: Terceira lei e o zero absoluto
summary: Ao se aproximar do zero absoluto, a entropia de um cristal perfeito tende a um valor mínimo; e o zero absoluto não pode ser alcançado num número finito de passos.
recap:
  - "Perto do zero absoluto, as diferenças de entropia somem (Nernst); na forma S → 0 para um cristal perfeito, Planck."
  - "Consequência: o zero absoluto é inalcançável num número finito de etapas."
  - "Perto do zero, cada etapa de resfriamento rende cada vez menos, porque quase não sobra entropia para retirar."
  - "Laboratórios já chegaram abaixo de um bilionésimo de kelvin, mas nunca ao zero."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [entropy, heat]
  era: modern-revolution
  people: [walther-nernst, william-thomson-kelvin]
  events: [nernst-theorem, kelvin-scale]
equations:
  - tex: \lim_{T \to 0} S = S_0
    spoken: "o limite de S quando T tende a zero é S zero"
claims:
  - text: "Reduzindo a temperatura à metade a cada etapa, são necessárias 39 etapas para ir de 300 K a menos de 1 nK"
    type: number
    check: compute
    formula: halvings_300k_to_1nk
    expected: 39
    unit: etapas
    tolerance: 0.001
    status: verified
  - text: "Walther Nernst formulou o teorema do calor (terceira lei) em 1906 e recebeu o Nobel de Química de 1920 por seus trabalhos em termoquímica, que incluem o teorema"
    type: date
    check: source
    sources: ["https://www.britannica.com/biography/Walther-Nernst", "https://www.britannica.com/science/third-law-of-thermodynamics"]
    status: verified
  - text: "As menores temperaturas já obtidas em laboratório estão na faixa dos picokelvin (38 pK em 2021), bem abaixo de um bilionésimo de kelvin"
    type: number
    check: source
    sources: ["https://phys.org/news/2021-10-coldest-temperature38-picokelvins.html", "https://www.britannica.com/science/absolute-zero"]
    status: verified
resources:
  - kind: read
    title: "Third law of thermodynamics (Britannica)"
    url: "https://www.britannica.com/science/third-law-of-thermodynamics"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Kelvin: Boltzmann Constant (NIST SI redefinition)"
    url: "https://www.nist.gov/si-redefinition/kelvin/kelvin-boltzmann-constant"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "11.13: Absolute Zero is Unattainable (Ellgen, Chemistry LibreTexts)"
    url: "https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Thermodynamics_and_Chemical_Equilibrium_(Ellgen)/11:_The_Third_Law_Absolute_Entropy_and_the_Gibbs_Free_Energy_of_Formation/11.13:_Absolute_Zero_is_Unattainable"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Absolute zero (Britannica)"
    url: "https://www.britannica.com/science/absolute-zero"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Absolute Zero (NOVA; short preview of the documentary on the race to the lowest temperature)"
    url: "https://www.pbs.org/wgbh/nova/video/absolute-zero/"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Esfriar algo é tirar entropia dele. Os métodos de refrigeração funcionam em etapas, e perto do zero absoluto cada etapa rende cada vez menos: quase não sobra entropia para retirar. Uma caricatura ajuda a enxergar: se cada etapa deixasse metade da temperatura, nunca se chegaria ao zero, por mais etapas que se fizessem.

Nernst chegou a isso em 1906 estudando reações químicas a baixas temperaturas: as diferenças de entropia entre estados somem perto do zero. Em 1912 ele mostrou a consequência: o zero absoluto não se alcança num número finito de etapas. Planck deu a forma mais usada hoje: a entropia de um cristal perfeito tende a zero.

Mesmo assim, chega-se muito perto. Átomos resfriados com lasers, armadilhas magnéticas e outros truques passam abaixo de um bilionésimo de kelvin, temperaturas em que surgem estados exóticos, como o condensado de Bose-Einstein.

## Equação

$$
\lim_{T \to 0} S = S_0
$$

```lab
cooling
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $S$ | entropia | J/K |
| $S_0$ | entropia residual mínima (zero para um cristal perfeito) | J/K |
| $T \to 0$ | temperatura tendendo ao zero absoluto | K |

## Exemplo

Partindo da temperatura ambiente (300 K) e reduzindo à metade a cada etapa, são 39 etapas para passar de 1 nK, e nenhuma quantidade finita chega a 0 K. Na prática, as etapas ficam cada vez mais difíceis, porque perto do zero há cada vez menos entropia para retirar.

## Onde isso volta

Supercondutividade e superfluidez, que só aparecem em temperaturas muito baixas, o condensado de Bose-Einstein e a temperatura de Hawking de buracos negros grandes, bem menor que a da radiação de fundo do universo.

## Pergunta-ponte

O que acontece quando muitas partículas, juntas, mudam de comportamento de uma vez ao passar por uma temperatura?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "no zero absoluto tudo para" | "no limite do zero absoluto sobra o movimento de ponto zero da quântica; o que some é a agitação térmica" |
| "os cientistas chegaram ao zero absoluto" | "chegaram a bilionésimos de kelvin, nunca ao zero" |
