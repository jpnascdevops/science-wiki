---
id: radial-velocity
title: Velocidade radial
summary: O planeta faz a estrela balançar; o Doppler desse balanço dá a massa mínima do planeta.
levels: [zero, technical]
prerequisites: [doppler-effect, kepler-laws]
leads_to: [false-positives]
tags:
  area: astronomy/exoplanets
  topics: [exoplanets, spectroscopy, orbits]
  era: "1995"
  people: [michel-mayor, didier-queloz]
  arxiv_category: astro-ph.EP
equations:
  - tex: K = \left(\frac{2\pi G}{P}\right)^{1/3}\frac{M_p \sin i}{(M_\star + M_p)^{2/3}}\frac{1}{\sqrt{1-e^2}}
    spoken: "K é igual a, dois pi G sobre P, elevado a um terço, vezes M p seno de i sobre, M estrela mais M p, elevado a dois terços, vezes um sobre a raiz de um menos e ao quadrado"
claims:
  - text: "Júpiter faz o Sol balançar com cerca de 12,5 m/s"
    type: number
    check: compute
    formula: rv_sun_from_jupiter_m_s
    expected: 12.5
    unit: m/s
    tolerance: 0.01
    sources: [https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets]
    status: verified
  - text: "A Terra faz o Sol balançar com cerca de 9 cm/s"
    type: number
    check: compute
    formula: rv_sun_from_earth_cm_s
    expected: 8.95
    unit: cm/s
    tolerance: 0.01
    sources: [https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets]
    status: verified
  - text: "51 Pegasi b foi descoberto por velocidade radial com o espectrógrafo ELODIE, no Observatório da Alta Provença"
    type: attribution
    check: source
    sources: [https://www.space.com/astronomy/exoplanets/the-exoplanet-revolution-at-30-1st-alien-world-was-found-around-a-sun-like-star-three-decades-ago]
    status: verified
resources:
  - kind: watch
    title: "NASA Science: Radial Velocity"
    url: https://science.nasa.gov/resource/radial-velocity/
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Planetary Society: The Radial-Velocity Method"
    url: https://www.planetary.org/space-images/how-to-search-for-exoplanets-rv-method
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Cadernos de Astronomia (UFES): Como identificar exoplanetas"
    url: https://periodicos.ufes.br/astronomia/article/download/34063/22903
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "IFSC: Exoplanetas, novos horizontes a serem explorados (TCC, 2022)"
    url: https://repositorio.ifsc.edu.br/bitstreams/589299ea-a880-43e9-949f-1ab2b364f027/download
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Estrela e planeta giram em volta do centro de massa dos dois. Como a estrela é muito mais pesada, ela só dá um bamboleio pequeno. Quando vem na nossa direção, a luz dela fica levemente azulada; quando vai, avermelhada. Medindo esse vai e vem no espectro, dá para saber o período e a massa do planeta.

## Equação

$$
K = \left(\frac{2\pi G}{P}\right)^{1/3}\frac{M_p \sin i}{(M_\star + M_p)^{2/3}}\frac{1}{\sqrt{1-e^2}}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $K$ | semiamplitude: quanto a estrela vai e volta | m/s |
| $P$ | período orbital | s |
| $M_p$ | massa do planeta | kg |
| $M_\star$ | massa da estrela | kg |
| $i$ | inclinação da órbita (90° = vista de lado) | graus |
| $e$ | excentricidade | sem unidade |

## Exemplo

| Planeta | Balanço que causa no Sol |
| --- | --- |
| Júpiter | ≈ 12,5 m/s, um ciclista |
| Terra | ≈ 9 cm/s, mais devagar que uma lesma apressada |

Achar uma "Terra" em volta de um "Sol" por velocidade radial ainda está no limite do que os melhores instrumentos fazem.

## Onde isso volta

O trânsito dá o raio; a velocidade radial dá a massa. Juntos, dão a densidade: dá para saber se o planeta é rochoso ou gasoso. A velocidade radial também é a principal forma de confirmar candidatos de trânsito.

## Pergunta-ponte

Se um sinal de trânsito pode ser enganoso, como confirmar que é mesmo um planeta?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "mede a massa do planeta" | "mede $M_p \sin i$, a massa mínima; com trânsito, $i$ é conhecido e sai a massa real" |
| "a estrela fica parada e o planeta gira" | "os dois giram em volta do centro de massa" |

## Nível técnico

A curva de velocidade radial é $v_r(t) = K[\cos(\nu + \omega) + e\cos\omega] + \gamma$, com $\nu$ a anomalia verdadeira e $\omega$ o argumento do periastro. Ajustar a curva dá $P$, $K$, $e$ e $\omega$; daí sai a função de massa. Atividade estelar (manchas, granulação) gera sinais de m/s que imitam planetas, e é a principal barreira para chegar aos 10 cm/s de uma Terra.
