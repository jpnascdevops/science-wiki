---
id: dimensional-analysis
title: Análise dimensional e ordens de grandeza
summary: As unidades dos dois lados de uma equação precisam bater; isso pega erros e às vezes adivinha a forma de uma lei. Estimativas de ordem de grandeza dão respostas aproximadas sem dados exatos.
recap:
  - "Os dois lados de uma equação têm que ter as mesmas unidades: metros não podem ser iguais a segundos."
  - "Combinando as grandezas de um problema até a unidade fechar, dá para adivinhar a forma da lei, a menos de uma constante."
  - "O período de um pêndulo pequeno é proporcional a √(L/g); a massa nem entra."
  - "Estimativa de Fermi: quebrar uma pergunta impossível em pedaços que se consegue chutar."
levels: [zero]
consensus: established
tags:
  area: math/notation
  topics: [foundations, measurement]
  era: nineteenth-century
  people: [joseph-fourier, edgar-buckingham, enrico-fermi]
  events: [fourier-heat]
equations:
  - tex: T \propto \sqrt{\frac{L}{g}}
    spoken: "T é proporcional à raiz quadrada de L sobre g"
  - tex: T = 2\pi\sqrt{\frac{L}{g}}
    spoken: "T é igual a dois pi vezes a raiz quadrada de L sobre g"
claims:
  - text: "Um pêndulo de 1 m tem período de cerca de 2,0 s"
    type: number
    check: compute
    formula: pendulum_period_1m
    expected: 2.006
    unit: s
    tolerance: 0.002
    status: verified
  - text: "Só por análise dimensional, a estimativa √(L/g) para 1 m dá cerca de 0,32 s; falta o fator 2π"
    type: number
    check: compute
    formula: pendulum_dimensional_1m
    expected: 0.319
    unit: s
    tolerance: 0.003
    status: verified
  - text: "Com 70 batidas por minuto, um coração bate cerca de 3 bilhões de vezes em 80 anos"
    type: number
    check: compute
    formula: heartbeats_80_years
    expected: 2.94e9
    unit: ""
    tolerance: 0.005
    status: verified
  - text: "Fourier enunciou a homogeneidade dimensional na Teoria Analítica do Calor (1822); o teorema pi, provado antes por Bertrand (1878), ficou conhecido pela formulação de Buckingham (1914)"
    type: date
    check: source
    sources: ["https://en.wikipedia.org/wiki/Dimensional_analysis", "https://en.wikipedia.org/wiki/Buckingham_pi_theorem"]
    status: verified
  - text: "As estimativas de ordem de grandeza levam o nome de Enrico Fermi; um exemplo clássico é estimar quantos afinadores de piano há em Chicago"
    type: attribution
    check: source
    sources: ["https://en.wikipedia.org/wiki/Fermi_problem"]
    status: verified
resources:
  - kind: study
    title: "1.5: Análise dimensional (Física Universitária I, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/01%3A_Unidades_e_medidas/1.05%3A_An%C3%A1lise_dimensional
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "1.6: Estimativas e cálculos de Fermi (Física Universitária I, OpenStax/LibreTexts)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/01%3A_Unidades_e_medidas/1.06%3A_Estimativas_e_c%C3%A1lculos_de_Fermi
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Fermi problem (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Fermi_problem
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Dimensional analysis (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Dimensional_analysis
    level: intermediate
    lang: en
    checked_at: 2026-11-03
  - kind: read
    title: "Buckingham π theorem (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Buckingham_pi_theorem
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Worked example: Dimensional analysis (Khan Academy)"
    url: "https://en.khanacademy.org/science/up-class-11-physics/x3a9a44f124d01cf7:units-and-measurement/x3a9a44f124d01cf7:dimensional-analysis-and-its-applications/v/worked-example-dimensional-analysis"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Uma equação é uma igualdade entre coisas do mesmo tipo. Se o lado esquerdo é um tempo, o direito também tem que ser. Parece óbvio, mas é uma ferramenta poderosa: conferir as unidades pega muitos erros de conta antes de qualquer número.

E vai além. Pergunte: de que depende o período de um pêndulo? Do comprimento (metros), da gravidade (m/s²) e talvez da massa (kg). A única combinação dessas grandezas que dá segundos é $\sqrt{L/g}$ (grandezas sem unidade, como a amplitude do balanço, ainda podem entrar; para oscilações pequenas, quase não importam). Sem resolver nenhuma equação de movimento, você descobriu a forma da lei e que a massa não importa.

O primo disso é a estimativa de Fermi: quantos afinadores de piano há numa cidade? Ninguém sabe, mas dá para chutar a população, quantas casas têm piano, quantas vezes por ano se afina e quantos pianos um afinador atende. Os erros dos chutes tendem a se compensar e a resposta sai na ordem de grandeza certa.

## Equação

$$
T \propto \sqrt{\frac{L}{g}}
$$

```lab
dimensions
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $T$ | período: tempo de ir e voltar | s |
| $L$ | comprimento do fio | m |
| $g$ | aceleração da gravidade | m/s² |
| $\propto$ | proporcional a (falta uma constante sem unidade) | — |

## Exemplo

Para $L = 1$ m, a análise dimensional dá $\sqrt{1/9{,}8} \approx 0{,}32$ s, e a física completa dá $2\pi\sqrt{L/g} \approx 2{,}0$ s. A forma está certa; a constante $2\pi$ só aparece resolvendo o movimento. Mas a proporção funciona: um pêndulo quatro vezes mais comprido tem o dobro do período.

Uma estimativa de Fermi: quantas vezes seu coração bate na vida? Umas 70 por minuto, 60 minutos, 24 horas, 365 dias, 80 anos: cerca de 3 bilhões.

## Onde isso volta

Escalas naturais da física saem assim: o raio de Schwarzschild (da ordem de $GM/c^2$; o valor exato é $2GM/c^2$), o comprimento de Planck (juntando $G$, $\hbar$ e $c$) e a temperatura de Hawking. Em engenharia, números sem dimensão como o de Reynolds dizem quando um escoamento vira turbulento.

## Pergunta-ponte

Se toda medida tem erro, quanto confiar no número que saiu?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "unidade é detalhe, o importante é o número" | "a unidade é o primeiro teste de qualquer conta" |
| "a análise dimensional dá a fórmula" | "dá a forma da fórmula; constantes sem unidade, como 2π, ficam de fora" |
