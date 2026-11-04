---
id: series-and-approximations
title: Séries e aproximações
summary: Perto de um ponto, quase toda função parece um polinômio; somar termos de uma série de Taylor dá aproximações tão boas quanto se queira.
recap:
  - "Perto de um ponto, uma curva suave parece uma reta, depois uma parábola, e assim por diante."
  - "Série de Taylor: escrever a função como soma de potências de x."
  - "sen x ≈ x para ângulos pequenos: o erro a 10° é de só 0,5%."
  - "A física vive de aproximações controladas: saber o termo seguinte diz o tamanho do erro."
levels: [zero, technical]
consensus: established
tags:
  area: math/calculus
  topics: [calculus, foundations]
  era: classical-mechanics-era
  people: [madhava, brook-taylor, colin-maclaurin]
  events: [taylor-methodus]
equations:
  - tex: \sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
    spoken: "seno de x é igual a x menos x ao cubo sobre três fatorial, mais x à quinta sobre cinco fatorial, menos e assim por diante"
  - tex: e^x = 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots
    spoken: "e elevado a x é igual a um mais x mais x ao quadrado sobre dois fatorial, mais x ao cubo sobre três fatorial, e assim por diante"
  - tex: \sin x \approx x
    spoken: "seno de x é aproximadamente x"
claims:
  - id: claim-001
    text: "A 10°, a aproximação sen x ≈ x erra cerca de 0,5%"
    type: number
    check: compute
    formula: small_angle_error_10deg_percent
    expected: 0.51
    unit: "%"
    tolerance: 0.01
    status: calculated
  - id: claim-002
    text: "Somando os 11 primeiros termos da série de e, o resultado já acerta 7 casas decimais (2,7182818)"
    type: number
    check: compute
    formula: e_series_10_terms
    expected: 2.7182818
    unit: ""
    tolerance: 0.0000001
    status: calculated
  - id: claim-003
    text: "Brook Taylor publicou a série em Methodus Incrementorum Directa et Inversa (1715); o Tratado das Fluxões de Maclaurin (1742) popularizou o caso em torno de zero"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/Biographies/Taylor/", "https://www.britannica.com/biography/Colin-Maclaurin"]
    status: pending
  - id: claim-004
    text: "Madhava de Sangamagrama (escola de Kerala, século XIV) encontrou séries infinitas para seno, cosseno e arco tangente"
    type: attribution
    check: source
    sources: ["https://en.wikipedia.org/wiki/Madhava_of_Sangamagrama"]
    status: pending
resources:
  - kind: study
    title: "10.3: Série Taylor e Maclaurin (Cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/10%3A_S%C3%A9rie_Power/10.03%3A_S%C3%A9rie_Taylor_e_Maclaurin
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "10: Série Power (capítulo completo; Cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Livro%3A_Calculus_(OpenStax)/10%3A_S%C3%A9rie_Power
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Brook Taylor - Biography (MacTutor)"
    url: https://mathshistory.st-andrews.ac.uk/Biographies/Taylor/
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Madhava of Sangamagrama (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Madhava_of_Sangamagrama
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Taylor series | Chapter 11, Essence of calculus (3Blue1Brown)"
    url: "https://www.youtube.com/watch?v=3d6DsjIBzJ4"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Olhe um pedaço muito pequeno de uma curva suave com uma lupa: ele parece reto. Com um pouco menos de zoom, parece uma parábola. A série de Taylor leva isso a sério: escreve a função como uma soma de termos cada vez mais curvos ($x$, $x^2$, $x^3$...). Perto do ponto escolhido, poucos termos bastam; para ir mais longe, somam-se mais.

Isso é o dia a dia da física. O pêndulo só tem a solução simples porque, para ângulos pequenos, $\sin\theta \approx \theta$. A energia de movimento da relatividade vira $mv^2/2$ quando se corta a série no primeiro termo que importa. Toda aproximação boa vem com o próximo termo, que diz o tamanho do erro.

## Equação

$$
\sin x = x - \frac{x^3}{3!} + \frac{x^5}{5!} - \cdots
$$

```lab
taylor
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $x$ | ângulo em radianos (ou a variável da função) | rad |
| $n!$ | fatorial: $1 \times 2 \times \cdots \times n$ | — |
| $\cdots$ | e assim por diante, termos cada vez menores perto de zero | — |
| $\approx$ | aproximadamente igual | — |

## Exemplo

A 10° (0,1745 rad), $\sin x = 0{,}1736$ e a aproximação $x$ dá 0,1745: erro de 0,5%. O próximo termo, $x^3/6 \approx 0{,}0009$, é praticamente o tamanho do erro. A 45° a aproximação já erra 11%.

O número $e$: $1 + 1 + 1/2 + 1/6 + 1/24 + \cdots$. Com 11 termos chega a 2,7182818, sete casas certas.

## Onde isso volta

O pêndulo e todo oscilador (a física de quase tudo perto do equilíbrio é um termo $x^2$), a relatividade a baixas velocidades, a teoria de perturbação na quântica e a expansão em potências que os físicos usam quando a conta exata é impossível.

## Pergunta-ponte

Se a série de $e^x$ e a de $\sin x$ são tão parecidas, existe uma ligação entre exponenciais e ângulos?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "aproximação é conta errada" | "aproximação boa é conta com erro conhecido e pequeno" |
| "sen x ≈ x vale sempre" | "vale para ângulos pequenos, em radianos; o erro cresce como x³/6" |

## Nível técnico

$f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!}(x-a)^n$. O resto de Lagrange limita o erro ao truncar: $R_n = \frac{f^{(n+1)}(\xi)}{(n+1)!}(x-a)^{n+1}$. Nem toda função tem série convergente em todo lugar: a série de $1/(1-x)$ só converge para $|x|<1$, e $e^{-1/x^2}$ tem todas as derivadas nulas em 0 e não é igual à própria série. Em física, séries assintóticas (que divergem mas aproximam bem com poucos termos) são comuns, como na eletrodinâmica quântica.
