---
id: complex-numbers
title: Números complexos
summary: Números complexos são pontos num plano; multiplicar por eles é girar e esticar, e a fórmula de Euler liga exponenciais a ângulos.
recap:
  - "i é um número com i² = −1; um complexo é a + bi, um ponto no plano."
  - "Multiplicar por i gira 90°. Multiplicar complexos soma ângulos e multiplica tamanhos."
  - "Fórmula de Euler: e^(iθ) = cos θ + i sen θ, um ponto andando no círculo."
  - "Em física, oscilações e ondas ficam muito mais simples escritas assim."
levels: [zero, technical]
consensus: established
tags:
  area: math/notation
  topics: [foundations, waves]
  era: classical-mechanics-era
  people: [gerolamo-cardano, rafael-bombelli, leonhard-euler, caspar-wessel]
  events: [ars-magna, euler-introductio]
equations:
  - tex: z = a + b\,i, \qquad i^2 = -1
    spoken: "z é igual a a mais b i, com i ao quadrado igual a menos um"
  - tex: e^{i\theta} = \cos\theta + i\sin\theta
    spoken: "e elevado a i teta é igual a cosseno de teta mais i seno de teta"
  - tex: e^{i\pi} + 1 = 0
    spoken: "e elevado a i pi, mais um, é igual a zero"
claims:
  - text: "e^(iπ) tem parte real −1, ou seja, e^(iπ) + 1 = 0"
    type: number
    check: compute
    formula: euler_identity_real
    expected: -1
    unit: ""
    tolerance: 0.000001
    status: verified
  - text: "(1 + i)² = 2i: o ângulo dobra de 45° para 90° e o tamanho vai de √2 para 2"
    type: number
    check: compute
    formula: one_plus_i_squared_imag
    expected: 2
    unit: ""
    tolerance: 0.000001
    status: verified
  - text: "Cardano, na Ars Magna (1545), esbarrou em raízes quadradas de números negativos; Bombelli (1572) deu regras para calcular com elas"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/Biographies/Bombelli/"]
    status: verified
  - text: "A fórmula e^(ix) = cos x + i sen x aparece na Introductio in analysin infinitorum de Euler (1748)"
    type: date
    check: source
    sources: ["https://en.wikipedia.org/wiki/Euler%27s_formula"]
    status: verified
  - text: "Wessel (trabalho apresentado em 1797 e publicado em 1799) e Argand (1806) deram, de forma independente, a representação geométrica dos complexos no plano"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/Biographies/Wessel/", "https://mathshistory.st-andrews.ac.uk/Biographies/Argand/"]
    status: verified
resources:
  - kind: study
    title: "3.1: Números complexos (Pré-cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Pr%C3%A9-c%C3%A1lculo_(OpenStax)/03%3A_Fun%C3%A7%C3%B5es_polinomiais_e_racionais/3.01%3A_N%C3%BAmeros_complexos
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "8.5: Forma polar de números complexos (Pré-cálculo, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Pre-calculo_(OpenStax)/08%3A_Outras_aplica%C3%A7%C3%B5es_da_trigonometria/8.05%3A_Forma_polar_de_n%C3%BAmeros_complexos
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures on Physics, Vol. I, Ch. 22: Algebra (22-5 Complex numbers, 22-6 Imaginary exponents)"
    url: https://www.feynmanlectures.caltech.edu/I_22.html
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Euler's formula (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Euler%27s_formula
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Rafael Bombelli - Biography (MacTutor)"
    url: https://mathshistory.st-andrews.ac.uk/Biographies/Bombelli/
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Euler's formula with introductory group theory (3Blue1Brown)"
    url: "https://www.youtube.com/watch?v=mvmuCPvRoWQ"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Nenhum número real ao quadrado dá −1. Por séculos, raízes de números negativos apareciam no meio de contas e eram tratadas como truque esquisito. A virada foi geométrica: os números reais vivem numa reta; os complexos, num plano. A parte real é o eixo horizontal, a imaginária, o vertical.

Nesse plano, multiplicar ganha um significado bonito. Multiplicar por −1 é dar meia volta. Multiplicar por $i$ é dar um quarto de volta. Então $i \times i$ são duas viradas de 90°: meia volta, ou −1. Multiplicar dois complexos quaisquer soma os ângulos e multiplica os tamanhos.

Euler juntou tudo: $e^{i\theta}$ é um ponto no círculo de raio 1, no ângulo $\theta$. Com $\theta = \pi$, chega a −1, e sai $e^{i\pi} + 1 = 0$.

## Equação

$$
e^{i\theta} = \cos\theta + i\sin\theta
$$

```lab
complex
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $i$ | unidade imaginária, $i^2 = -1$ | — |
| $a$ | parte real | — |
| $b$ | parte imaginária | — |
| $r = \lvert z \rvert$ | módulo: distância à origem | — |
| $\theta$ | ângulo com o eixo real | rad ou grau |

## Exemplo

$1 + i$ está a 45°, com tamanho $\sqrt 2$. Ao quadrado: ângulo 90°, tamanho 2, ou seja, $2i$. Confira na conta: $(1+i)^2 = 1 + 2i + i^2 = 2i$.

## Onde isso volta

Oscilações e ondas (uma onda se escreve $e^{i(kx - \omega t)}$, tomando a parte real no fim, e derivar vira só multiplicar), circuitos de corrente alternada, a análise de Fourier e a mecânica quântica, em que a função de onda é complexa por natureza e as interferências vêm de somar amplitudes com fases diferentes.

## Pergunta-ponte

Se uma onda é um ponto girando no círculo, dá para montar qualquer onda somando vários desses giros?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "números imaginários não existem" | "são tão reais quanto os negativos: uma extensão útil com regras consistentes" |
| "i é a raiz de −1, e pronto" | "i é um giro de 90° no plano; i² = −1 é meia volta" |

## Nível técnico

Na forma polar, $z = re^{i\theta}$ e $z_1 z_2 = r_1 r_2 e^{i(\theta_1 + \theta_2)}$. A fórmula de Euler sai comparando as séries de Taylor de $e^{ix}$, $\cos x$ e $\sin x$. Os complexos são algebricamente fechados: todo polinômio não constante tem raízes neles (teorema fundamental da álgebra). Em quântica, a fase global não é observável, mas as fases relativas produzem interferência.
