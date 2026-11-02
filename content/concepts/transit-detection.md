---
id: transit-detection
title: Detectando trânsitos
summary: Algoritmos como o BLS dobram a curva de luz em muitos períodos e procuram uma queda em forma de caixa.
recap:
  - "Empilhar a curva de luz em vários períodos faz a queda aparecer acima do ruído."
  - "O BLS testa períodos e procura uma queda em forma de caixa."
  - "Um pico no periodograma é candidato, não planeta."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/data-analysis
  topics: [transits, signal-processing, light-curves]
  era: contemporary
  people: [geza-kovacs, shay-zucker, tsevi-mazeh]
  arxiv_category: astro-ph.IM
equations:
  - tex: \phi = \frac{(t - t_0) \bmod P}{P}
    spoken: "fi é igual a, t menos t zero, módulo P, sobre P"
  - tex: \text{SNR} \approx \frac{\delta}{\sigma}\sqrt{N_{\text{in}}}
    spoken: "S N R é aproximadamente delta sobre sigma, vezes a raiz de N dentro"
claims:
  - text: "Um trânsito de 84 ppm, com ruído de 300 ppm por medida e 1.000 medidas dentro dos trânsitos, dá SNR de cerca de 9"
    type: number
    check: compute
    formula: snr_example_84ppm
    expected: 8.85
    tolerance: 0.01
    status: verified
  - text: "O algoritmo BLS foi publicado por Kovács, Zucker e Mazeh em 2002 (A&A 391, 369)"
    type: reference
    check: arxiv
    arxiv: astro-ph/0206099
    expected_title: "A box-fitting algorithm in the search for periodic transits"
    sources: [https://www.aanda.org/articles/aa/full/2002/31/aa2422/aa2422.right.html]
    status: verified
resources:
  - kind: study
    title: "Lightkurve: identifying transiting planet signals (BLS, Kepler-69)"
    url: https://nbviewer.org/github/lightkurve/lightkurve/blob/gh-pages/tutorials/3-science-examples/exoplanets-identifying-transiting-planet-signals.ipynb
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: study
    title: "Astropy: Box Least Squares (BLS) Periodogram"
    url: https://docs.astropy.org/en/latest/timeseries/bls.html
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Kovács, Zucker e Mazeh (2002): A box-fitting algorithm in the search for periodic transits"
    url: https://arxiv.org/abs/astro-ph/0206099
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Cadernos de Astronomia (UFES): busca de trânsitos em curvas de luz do TESS com redes neurais"
    url: https://periodicos.ufes.br/astronomia/es/article/download/53384/37263/197613
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma queda de 84 ppm some no ruído de uma medida só. O truque é empilhar: se o planeta passa a cada P dias, você corta a curva em pedaços de P dias e coloca uns sobre os outros. O ruído se cancela, e a queda, que cai sempre no mesmo lugar, se soma. Como não se sabe P, testa-se milhares de períodos e fica o que der a queda mais clara.

## Equação

$$
\phi = \frac{(t - t_0) \bmod P}{P}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\phi$ | fase: em que ponto da órbita está cada medida | 0 a 1 |
| $t_0$ | instante de um trânsito | dias |
| $P$ | período testado | dias |
| $\delta$ | profundidade | ppm |
| $\sigma$ | ruído de uma medida | ppm |
| $N_{\text{in}}$ | número de medidas dentro dos trânsitos | — |

## Exemplo

Um trânsito de 84 ppm numa curva com 300 ppm de ruído por medida, com 1.000 medidas caindo dentro dos trânsitos, dá $\text{SNR}\approx \frac{84}{300}\sqrt{1000}\approx 9$. Um limiar comum para considerar candidato é por volta de 7.

## Onde isso volta

Um pico forte no periodograma vira um candidato, não um planeta. Os falsos positivos precisam ser descartados.

## Pergunta-ponte

O que além de um planeta pode produzir uma queda periódica?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o BLS descobre planetas" | "o BLS aponta candidatos; a confirmação vem depois" |
| "o maior pico é sempre o período certo" | "harmônicos (P/2, 2P) também dão picos; é preciso conferir" |

## Nível técnico

O BLS modela a curva dobrada como dois níveis (fora e dentro da caixa) e, para cada período e duração, calcula o ajuste por mínimos quadrados; o resultado é o periodograma de potência versus período. Na prática: `astropy.timeseries.BoxLeastSquares` ou `lightkurve` (`lc.to_periodogram(method="bls")`), com grade de períodos densa o bastante para que a fase acumulada em toda a série não erre mais que a duração do trânsito. Alternativas: TLS (Transit Least Squares, com forma de trânsito realista) e redes neurais para classificar candidatos.
