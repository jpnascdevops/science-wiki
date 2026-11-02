---
id: kepler-laws
title: Leis de Kepler
summary: Órbitas são elipses, varrem áreas iguais em tempos iguais, e o período se liga ao tamanho da órbita.
recap:
  - "Órbitas são elipses, com a estrela num dos focos."
  - "O planeta varre áreas iguais em tempos iguais."
  - "P² ∝ a³: com o período, sai a distância do planeta."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [orbits, gravity]
  era: scientific-revolution
  people: [johannes-kepler, isaac-newton]
equations:
  - tex: P^2 = \frac{4\pi^2}{G M}\,a^3
    spoken: "P ao quadrado é igual a quatro pi ao quadrado sobre G M, vezes a ao cubo"
  - tex: P_{\text{anos}}^2 = a_{\text{UA}}^3
    spoken: "P em anos ao quadrado é igual a a em unidades astronômicas ao cubo"
claims:
  - text: "Com a = 1 UA e a massa do Sol, a terceira lei dá um período de cerca de 365,25 dias"
    type: number
    check: compute
    formula: earth_orbital_period_days
    expected: 365.25
    unit: dias
    tolerance: 0.001
    status: verified
  - text: "Kepler publicou as duas primeiras leis na Astronomia Nova (1609) e a terceira na Harmonice Mundi (1619)"
    type: date
    check: source
    sources: [https://kepler.badw.de/en/on-johannes-kepler/the-planetary-laws.html]
    status: verified
resources:
  - kind: read
    title: "IAU OAE, glossário: Leis de Kepler"
    url: https://astro4edu.org/pt-br/resources/glossary/term/169/
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Toda Matéria: Leis de Kepler, com exercícios resolvidos"
    url: https://www.todamateria.com.br/leis-de-kepler/
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: watch
    title: "NASA SVS: Kepler's Laws of Planetary Motion Described Using Earth Satellites"
    url: https://svs.gsfc.nasa.gov/4642
    level: intermediate
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Kepler descobriu três regras olhando os dados de Marte. Primeira: as órbitas são elipses, com o Sol num dos focos. Segunda: o planeta anda mais rápido quando está perto do Sol e mais devagar quando está longe, varrendo áreas iguais em tempos iguais. Terceira: quanto maior a órbita, mais longo o ano, numa proporção exata.

Newton depois mostrou que as três saem da gravidade dele.

## Equação

$$
P^2 = \frac{4\pi^2}{G M}\,a^3
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $P$ | período orbital | s |
| $a$ | semieixo maior da órbita (o "raio médio") | m |
| $M$ | massa da estrela (mais a do planeta, que quase sempre se despreza) | kg |
| $G$ | constante da gravitação | N·m²/kg² |

## Exemplo

Com $a$ = 1 UA e a massa do Sol, a conta dá 365,25 dias. Em anos e UA, a lei fica $P^2 = a^3$: Júpiter, a 5,2 UA, leva cerca de 11,9 anos.

## Onde isso volta

Num trânsito, você mede o período $P$ diretamente (o intervalo entre quedas de brilho). Com a massa da estrela, a terceira lei dá a distância do planeta. É o primeiro número que se tira de uma curva de luz.

## Pergunta-ponte

Se uma estrela tem um planeta em órbita, como saber que ele existe se não dá para vê-lo?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "as órbitas são muito achatadas" | "são elipses, mas a da Terra é quase um círculo" |
| "o planeta gira em volta do Sol parado" | "os dois giram em volta do centro de massa; é isso que permite achar planetas" |

## Nível técnico

Para dois corpos, $P^2 = \frac{4\pi^2}{G(M+m)}a^3$, com $a$ o semieixo maior da órbita relativa. A segunda lei é a conservação do momento angular, $r^2\dot\theta$ constante. A estrela descreve uma elipse menor em volta do centro de massa, com semieixo $a_\star = a\,m/(M+m)$: é esse bamboleio que o método de velocidade radial mede.
