---
id: temperature-and-heat
title: Temperatura e calor
summary: Temperatura mede a agitação média das partículas; calor é energia que passa de um corpo para outro por causa de uma diferença de temperatura.
recap:
  - "Temperatura é a agitação média das moléculas; calor é energia em trânsito do quente para o frio."
  - "Um corpo não 'tem' calor; tem energia interna. Calor é o nome da energia enquanto passa."
  - "No ar a 27 °C, uma molécula de N₂ anda em média a uns 480 m/s."
  - "O zero absoluto, −273,15 °C (0 K), é onde a agitação térmica é a menor possível."
levels: [zero]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [heat, energy]
  era: nineteenth-century
  people: [gabriel-fahrenheit, anders-celsius, william-thomson-kelvin, ludwig-boltzmann]
  events: [temperature-scales, kelvin-scale]
equations:
  - tex: Q = m\,c\,\Delta T
    spoken: "Q é igual a m vezes c vezes delta T"
  - tex: T_{\text{K}} = T_{^\circ\text{C}} + 273{,}15
    spoken: "T em kelvin é igual a T em graus Celsius mais duzentos e setenta e três vírgula quinze"
  - tex: \bar{v} = \sqrt{\frac{8\,k_B T}{\pi m}}
    spoken: "v barra é igual à raiz quadrada de oito k B T sobre pi m"
claims:
  - id: claim-001
    text: "A velocidade média de uma molécula de N₂ a 300 K é cerca de 476 m/s"
    type: number
    check: compute
    formula: n2_mean_speed_300k
    expected: 476
    unit: m/s
    tolerance: 0.003
    status: calculated
  - id: claim-002
    text: "Aquecer 1 litro de água de 20 °C a 100 °C exige cerca de 335 kJ"
    type: number
    check: compute
    formula: heat_1l_water_20_to_100_kj
    expected: 335
    unit: kJ
    tolerance: 0.003
    status: calculated
  - id: claim-003
    text: "O zero absoluto é −273,15 °C; desde 2019 (revisão aprovada em 2018), o kelvin é definido fixando a constante de Boltzmann em 1,380649 × 10⁻²³ J/K"
    type: definition
    check: source
    sources: ["https://www.britannica.com/science/absolute-zero", "https://www.nist.gov/si-redefinition/kelvin/kelvin-boltzmann-constant"]
    status: pending
  - id: claim-004
    text: "Kelvin propôs a escala absoluta de temperatura em 1848"
    type: date
    check: source
    sources: ["https://mathshistory.st-andrews.ac.uk/SH/thomson_sh.pdf"]
    status: pending
  - id: claim-005
    text: "Fahrenheit e Celsius criaram suas escalas em 1724 e 1742"
    type: date
    check: source
    sources: ["https://kids.britannica.com/students/article/Daniel-Gabriel-Fahrenheit/274252", "https://www.britannica.com/technology/Celsius-temperature-scale"]
    status: pending
resources:
  - kind: read
    title: "1.2: Temperatura e equilíbrio térmico (Física Universitária II, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/01%3A_Temperatura_e_calor/1.02%3A_Temperatura_e_equil%C3%ADbrio_t%C3%A9rmico"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "Propriedades dos Gases (PhET, simulação)"
    url: "https://phet.colorado.edu/pt_BR/simulations/gas-properties"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Celsius temperature scale (Britannica)"
    url: "https://www.britannica.com/technology/Celsius-temperature-scale"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Absolute zero (Britannica)"
    url: "https://www.britannica.com/science/absolute-zero"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Temperature: Crash Course Physics #20"
    url: "https://www.pbs.org/video/crash-course-physics-20/"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Tudo é feito de partículas que nunca ficam paradas. Num gás, elas voam e batem umas nas outras; num sólido, vibram no lugar. Temperatura é a medida da agitação média delas: mais quente, mais rápido.

Calor é outra coisa. Encoste uma mão fria numa xícara quente: as moléculas agitadas da xícara chacoalham as da sua pele, e energia passa de um lado para o outro. Essa energia em trânsito, empurrada pela diferença de temperatura, é o calor. Ela sempre vai do quente para o frio, até as temperaturas igualarem.

Como a agitação não pode ficar abaixo de zero, existe uma temperatura mínima: o zero absoluto, −273,15 °C. A escala kelvin começa ali.

## Equação

$$
Q = m\,c\,\Delta T
$$

```lab
gas
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $Q$ | calor trocado | J |
| $m$ | massa | kg |
| $c$ | calor específico (água: 4186 J/(kg·K)) | J/(kg·K) |
| $\Delta T$ | variação de temperatura | K ou °C (mesmo tamanho) |
| $k_B$ | constante de Boltzmann | J/K |
| $\bar v$ | velocidade média das moléculas | m/s |

## Exemplo

Para levar 1 litro de água de 20 °C até 100 °C, o ponto de fervura: $Q = 1 \times 4186 \times 80 \approx 335$ kJ. A água tem um calor específico enorme: por isso o mar demora a esquentar e esfriar, e regula o clima das cidades costeiras.

No ar da sala, a 300 K, uma molécula de nitrogênio anda em média a uns 476 m/s, mais rápido que um avião comercial. Ela só não chega longe porque bate em outra molécula bilhões de vezes por segundo.

## Onde isso volta

A primeira lei da termodinâmica soma calor e trabalho. A radiação térmica mostra que tudo com temperatura brilha. Na física estatística, a temperatura aparece no fator de Boltzmann, e nos buracos negros vira a temperatura de Hawking.

## Pergunta-ponte

Se calor e trabalho são duas formas de passar energia, existe uma conta que junte as duas?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "este corpo tem muito calor" | "este corpo tem muita energia interna; calor é a energia enquanto passa" |
| "o frio entra pela janela" | "o calor sai pela janela; frio é só menos energia" |
| "temperatura é a quantidade de calor" | "temperatura é a agitação média; uma piscina morna tem mais energia térmica que uma faísca muito quente" |
