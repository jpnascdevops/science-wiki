---
id: habitable-zone
title: Zona habitável e atmosferas
summary: A faixa de distâncias em que um planeta poderia ter água líquida; atmosferas são estudadas pela luz que as atravessa no trânsito.
recap:
  - "Zona habitável é onde a água líquida seria possível na superfície."
  - "Temperatura de equilíbrio da Terra: cerca de 255 K; o efeito estufa leva a 288 K."
  - "Atmosferas são estudadas pela luz que as atravessa no trânsito."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/exoplanets
  topics: [habitability, spectroscopy, exoplanets]
  era: contemporary
  arxiv_category: astro-ph.EP
equations:
  - tex: T_{\text{eq}} = T_\star \sqrt{\frac{R_\star}{2a}}\,(1 - A)^{1/4}
    spoken: "T equilíbrio é igual a T estrela vezes a raiz de R estrela sobre dois a, vezes um menos A, elevado a um quarto"
  - tex: \Delta\delta \approx \frac{2 R_p H}{R_\star^2}
    spoken: "delta delta é aproximadamente dois R p H sobre R estrela ao quadrado"
claims:
  - text: "A temperatura de equilíbrio da Terra, com albedo 0,3, é cerca de 255 K"
    type: number
    check: compute
    formula: earth_equilibrium_temperature_k
    expected: 255
    unit: K
    tolerance: 0.01
    status: verified
  - text: "O JWST fez a primeira detecção clara de dióxido de carbono numa atmosfera de exoplaneta, em WASP-39 b, em 2022"
    type: attribution
    check: source
    sources: [https://www.ox.ac.uk/news/2022-08-26-first-definitive-detection-carbon-dioxide-exoplanet-atmosphere, https://science.nasa.gov/asset/webb/exoplanet-wasp-39-b-nirspec-transmission-spectrum]
    status: verified
resources:
  - kind: read
    title: "IAU OAE, glossário: Zona habitável"
    url: https://astro4edu.org/pt-br/resources/glossary/term/139/
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "CfA Harvard: Habitable Zones"
    url: https://www.cfa.harvard.edu/news/habitable-zones
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Universidade de Oxford: primeira detecção definitiva de CO₂ numa atmosfera de exoplaneta"
    url: https://www.ox.ac.uk/news/2022-08-26-first-definitive-detection-carbon-dioxide-exoplanet-atmosphere
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "NASA: Exoplanet WASP-39 b, espectro de transmissão do NIRSpec"
    url: https://science.nasa.gov/asset/webb/exoplanet-wasp-39-b-nirspec-transmission-spectrum
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "How Webb Will Study Atmospheres of Exoplanets (NASA Video)"
    url: "https://www.youtube.com/watch?v=jbSXBbyWsTE"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Perto demais da estrela, a água ferve; longe demais, congela. Entre os dois fica a zona habitável: a faixa em que um planeta com atmosfera parecida com a nossa poderia ter água líquida na superfície. Estar lá não garante vida, nem água; é só o primeiro filtro.

Para saber do que é feita a atmosfera, usa-se o próprio trânsito: um pouco da luz da estrela atravessa a borda da atmosfera do planeta. Em cores que os gases absorvem, o planeta parece um pouco maior.

## Equação

$$
T_{\text{eq}} = T_\star \sqrt{\frac{R_\star}{2a}}\,(1 - A)^{1/4}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $T_{\text{eq}}$ | temperatura de equilíbrio do planeta (sem efeito estufa) | K |
| $T_\star$ | temperatura da superfície da estrela | K |
| $A$ | albedo de Bond: fração da potência incidente refletida | 0 a 1 |
| $H$ | escala de altura da atmosfera | m |
| $\Delta\delta$ | variação da profundidade do trânsito com a cor | sem unidade |

## Exemplo

Para a Terra, com albedo 0,3, a conta dá cerca de 255 K, ou −18 °C. A temperatura média real é de uns 15 °C: a diferença é o efeito estufa. Ou seja, a temperatura de equilíbrio sozinha não diz se um planeta é habitável.

Em 2022, o JWST observou WASP-39 b, um gigante quente, e viu a assinatura do dióxido de carbono por volta de 4,3 µm: a primeira detecção clara desse gás na atmosfera de um exoplaneta.

## Onde isso volta

Este é o ponto final da trilha de exoplanetas: do brilho de uma estrela até a química do ar de outro mundo.

## Pergunta-ponte

Que moléculas, juntas, seriam um indício de vida, e como distinguir isso de química sem vida? É uma das perguntas abertas da área.

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "planeta na zona habitável tem vida" | "na zona habitável, água líquida é possível; vida é outra pergunta" |
| "o JWST fotografou a atmosfera" | "o JWST mediu como a profundidade do trânsito muda com a cor da luz" |

## Nível técnico

Para uma atmosfera ideal aproximadamente isotérmica, a escala de altura é $H = \frac{k_B T}{\mu g}$, com $\mu$ a massa média por molécula em kg; atmosferas quentes, leves e de baixa gravidade (gigantes inflados como WASP-39 b) dão os sinais maiores, de centenas de ppm. Para planetas rochosos em estrelas do tipo Sol, $\Delta\delta$ fica em poucos ppm, o que explica por que estrelas anãs vermelhas, pequenas, são os alvos preferidos. Os limites da zona habitável usados hoje vêm de modelos climáticos (Kopparapu et al.), em termos do fluxo recebido, não da distância.

A temperatura de equilíbrio acima assume redistribuição uniforme do calor por toda a superfície e emissão como corpo negro. [Detecção de CO₂ em WASP-39 b](https://science.nasa.gov/missions/webb/nasas-webb-detects-carbon-dioxide-in-exoplanet-atmosphere/).
