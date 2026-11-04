---
id: doppler-effect
title: Efeito Doppler
summary: Uma fonte que se aproxima tem a onda comprimida; se afastando, esticada. Na luz, isso desloca as linhas do espectro.
recap:
  - "Fonte se aproximando: onda comprimida; se afastando: esticada."
  - "Na luz: Δλ/λ ≈ v/c."
  - "Mede só a velocidade na nossa direção."
levels: [zero, technical]
consensus: established
tags:
  area: physics/waves
  topics: [light, spectroscopy]
  era: nineteenth-century
  people: [christian-doppler]
equations:
  - tex: \frac{\Delta\lambda}{\lambda} \approx \frac{v_r}{c}
    spoken: "delta lambda sobre lambda é aproximadamente v r sobre c"
claims:
  - id: claim-001
    text: "Uma velocidade de 12,5 m/s desloca as linhas espectrais em cerca de 4 partes em 100 milhões"
    type: number
    check: compute
    formula: doppler_shift_12_5_m_s
    expected: 4.17e-8
    tolerance: 0.01
    status: calculated
resources:
  - kind: read
    title: "Planetary Society: How We Detect Exoplanets, The Radial-Velocity Method"
    url: https://www.planetary.org/space-images/how-to-search-for-exoplanets-rv-method
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "NASA Science: Radial Velocity"
    url: https://science.nasa.gov/resource/radial-velocity/
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

A sirene de uma ambulância soa mais aguda quando ela vem e mais grave quando vai. As ondas de som ficam espremidas na frente e esticadas atrás. Com a luz é igual: uma estrela que se aproxima fica um pouco mais azul, e uma que se afasta, um pouco mais vermelha.

A sirene ajuda, mas a luz não precisa de meio para viajar; o cálculo exato usa relatividade. Para velocidades baixas, as duas dão o mesmo resultado.

## Equação

$$
\frac{\Delta\lambda}{\lambda} \approx \frac{v_r}{c}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\lambda$ | comprimento de onda emitido | m |
| $\Delta\lambda$ | deslocamento medido | m |
| $v_r$ | velocidade na linha de visada (positiva se afastando) | m/s |
| $c$ | velocidade da luz | m/s |

## Exemplo

O Sol balança cerca de 12,5 m/s por causa de Júpiter. Isso desloca as linhas do espectro em $12{,}5/(3\times10^8) \approx 4\times10^{-8}$: quatro partes em cem milhões. Medir isso exige espectrógrafos extremamente estáveis.

## Onde isso volta

O método de velocidade radial mede exatamente esse deslocamento, repetido ao longo da órbita do planeta.

## Pergunta-ponte

Se a estrela balança porque tem um planeta, quanto ela balança e o que isso diz sobre o planeta?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a estrela muda de cor" | "as linhas do espectro se deslocam um tantinho; a olho nu não muda nada" |
| "mede a velocidade da estrela" | "mede só a componente na nossa direção" |

## Nível técnico

A forma relativística para movimento radial é $1 + z = \sqrt{\frac{1+\beta}{1-\beta}}$, com $\beta = v_r/c$; para $\beta \ll 1$, $z\approx\beta$. Na prática, mede-se o deslocamento de milhares de linhas ao mesmo tempo, por correlação cruzada com uma máscara ou um espectro de referência, o que permite chegar a precisões de cm/s a m/s.
