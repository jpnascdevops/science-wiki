---
id: fourier-analysis
title: Ondas como soma de senos (Fourier)
summary: Qualquer sinal razoável pode ser montado somando senos de frequências diferentes; a análise de Fourier descobre quais e com que força.
recap:
  - "Qualquer forma de onda periódica é uma constante mais uma soma de senos e cossenos com frequências múltiplas da fundamental."
  - "A análise de Fourier pega um sinal e devolve o espectro: quanto de cada frequência ele tem."
  - "Quinas e saltos exigem muitas frequências altas; formas suaves, poucas."
  - "Perto de um salto, a soma passa do valor em uns 9% da altura do salto: o fenômeno de Gibbs."
levels: [zero, technical]
consensus: established
tags:
  area: math/calculus
  topics: [waves, signal-processing]
  era: nineteenth-century
  people: [joseph-fourier, josiah-willard-gibbs]
  events: [fourier-heat]
equations:
  - tex: f(t) = \frac{a_0}{2} + \sum_{n=1}^{\infty} \left(a_n \cos n\omega t + b_n \sin n\omega t\right)
    spoken: "f de t é igual a a zero sobre dois, mais a soma, de n igual a um até infinito, de a n cosseno de n ômega t mais b n seno de n ômega t"
  - tex: \text{quadrada}(t) = \frac{4}{\pi}\left(\sin\omega t + \frac{\sin 3\omega t}{3} + \frac{\sin 5\omega t}{5} + \cdots\right)
    spoken: "a onda quadrada é igual a quatro sobre pi vezes, seno de ômega t, mais seno de três ômega t sobre três, mais seno de cinco ômega t sobre cinco, e assim por diante"
claims:
  - text: "Na onda quadrada, as somas parciais passam do salto em cerca de 9% da altura do salto (fenômeno de Gibbs)"
    type: number
    check: compute
    formula: gibbs_overshoot_percent
    expected: 8.95
    unit: "%"
    tolerance: 0.005
    status: verified
  - text: "Fourier apresentou à Academia de Paris, em 1807, seu trabalho sobre o calor usando séries trigonométricas, e publicou a Teoria Analítica do Calor em 1822"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/Biographies/Fourier/", "https://www.britannica.com/technology/Fourier-analysis"]
    status: verified
  - text: "O fenômeno de Gibbs foi notado primeiro por Henry Wilbraham (1848), descrito por Gibbs (1899) e analisado por completo por Bôcher (1906), que lhe deu o nome"
    type: attribution
    check: source
    sources: ["https://en.wikipedia.org/wiki/Gibbs_phenomenon", "https://encyclopediaofmath.org/wiki/Gibbs_phenomenon"]
    status: verified
resources:
  - kind: study
    title: "Fourier: Construindo Ondas (simulação PhET)"
    url: https://phet.colorado.edu/pt_BR/simulations/fourier-making-waves
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "Séries de Fourier - Análise de Fourier: Um Livro Colaborativo (REAMAT/UFRGS)"
    url: https://www.ufrgs.br/reamat/TransformadasIntegrais/livro-af/sdf-sx00e9ries_de_fourier.html
    level: technical
    lang: pt
    checked_at: 2026-11-03
  - kind: watch
    title: "But what is a Fourier series? From heat flow to drawing with circles (3Blue1Brown)"
    url: https://3blue1brown.com/lessons/fourier-series
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Fourier analysis (Britannica)"
    url: https://www.britannica.com/technology/Fourier-analysis
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Gibbs phenomenon (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Gibbs_phenomenon
    level: technical
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Toque a mesma nota num violão e num piano: a frequência é a mesma, mas o som é diferente. A diferença está nos "ingredientes": além da nota principal, cada instrumento soma outras frequências (2, 3, 4 vezes a fundamental) em proporções próprias. Fourier mostrou que isso vale para qualquer sinal: ele é uma receita de senos.

Montar uma onda quadrada com senos parece impossível, porque senos são suaves e a quadrada tem saltos. Mas somando senos cada vez mais rápidos e mais fracos, a soma vai ficando quadrada. Só perto do salto sobra um pequeno pico teimoso que não diminui de altura, só fica mais estreito: o fenômeno de Gibbs.

O caminho inverso é ainda mais útil: dado um sinal bagunçado, a análise de Fourier diz quais frequências estão nele. É o que o seu celular faz para comprimir música e o que os astrônomos fazem para achar ritmos escondidos em dados.

## Equação

$$
\text{quadrada}(t) = \frac{4}{\pi}\left(\sin\omega t + \frac{\sin 3\omega t}{3} + \frac{\sin 5\omega t}{5} + \cdots\right)
$$

```lab
fourier
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\omega$ | frequência angular da fundamental | rad/s |
| $n\omega$ | harmônicos: múltiplos da fundamental | rad/s |
| $b_n$ | amplitude de cada seno (o "quanto" de cada ingrediente) | a do sinal |
| $t$ | tempo | s |

## Exemplo

Na onda quadrada só entram os harmônicos ímpares, com amplitudes 1, 1/3, 1/5... Com 1 seno, a forma já lembra; com 10, os degraus ficam nítidos; com 40, quase perfeitos, exceto pelo pico de cerca de 9% perto de cada salto. Na onda triangular, as amplitudes caem com $1/n^2$, muito mais rápido, e poucos termos bastam.

## Onde isso volta

Som e instrumentos musicais, ondas estacionárias, óptica (uma lente faz uma transformada de Fourier da luz), a busca de períodos em curvas de luz e, na mecânica quântica, a relação entre posição e momento: um pacote de onda estreito precisa de muitas frequências, o que dá o princípio da incerteza.

## Pergunta-ponte

Se um sinal é uma lista de números e a transformada é outra lista, existe uma forma geral de transformar listas em listas?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a série de Fourier só serve para ondas" | "serve para qualquer função razoável: calor, imagens, som, órbitas" |
| "com termos suficientes, a soma fica perfeita em todo ponto" | "fica perfeita em quase todo ponto; perto de saltos sobra o pico de Gibbs" |

## Nível técnico

Para $f$ periódica de período $2\pi$: $f(t) = \frac{a_0}{2} + \sum_n (a_n \cos nt + b_n \sin nt)$, com $b_n = \frac{1}{\pi}\int_{-\pi}^{\pi} f(t)\sin nt\,\mathrm{d}t$. Na forma complexa, $f = \sum c_n e^{int}$. Para sinais não periódicos, a transformada $\hat f(\omega) = \int f(t)e^{-i\omega t}\,\mathrm{d}t$. As larguras de $f$ e de $\hat f$ não podem ser ambas pequenas: $\Delta t\,\Delta\omega \geq 1/2$. O análogo no espaço, $\Delta x\,\Delta k \geq 1/2$, com $p = \hbar k$, vira $\Delta x\,\Delta p \geq \hbar/2$. O pico de Gibbs tende a $\frac{1}{\pi}\mathrm{Si}(\pi) - \frac12 \approx 0{,}0895$ do salto.
