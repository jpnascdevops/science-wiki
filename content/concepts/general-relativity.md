---
id: general-relativity
title: Relatividade geral
summary: Gravidade não é força; é a curvatura do espaço-tempo causada por massa e energia.
recap:
  - "Gravidade é curvatura do espaço-tempo causada por massa e energia."
  - "Explica Mercúrio e previu a deflexão da luz, confirmada em Sobral em 1919."
  - "Newton é o limite de campo fraco e baixas velocidades."
levels: [zero, technical]
consensus: established
tags:
  area: physics/general-relativity
  topics: [gravity, spacetime]
  era: modern-revolution
  people: [albert-einstein, arthur-eddington, georges-lemaitre]
  arxiv_category: gr-qc
equations:
  - tex: G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4} T_{\mu\nu}
    spoken: "G mi ni mais lambda g mi ni é igual a oito pi G sobre c à quarta, vezes T mi ni"
  - tex: \Delta\varphi = \frac{6\pi G M}{c^2 a (1 - e^2)}
    spoken: "delta fi é igual a seis pi G M sobre c ao quadrado, vezes a, vezes um menos e ao quadrado"
  - tex: \delta = \frac{4 G M}{c^2 b}
    spoken: "delta é igual a quatro G M sobre c ao quadrado vezes b"
claims:
  - id: claim-001
    text: "Einstein publicou a relatividade geral em 1915"
    type: date
    check: source
    sources: [https://pt.wikipedia.org/wiki/Relatividade_geral]
    status: pending
  - id: claim-002
    text: "No eclipse de 29 de maio de 1919, em Sobral (CE), a deflexão prevista era 0,87 segundo de arco por Newton e 1,75 por Einstein; as melhores placas de Sobral mediram 1,98 ± 0,12"
    type: number
    check: source
    sources: [https://revistapesquisa.fapesp.br/quando-a-luz-se-curvou/]
    status: pending
  - id: claim-003
    text: "A relatividade geral explica os cerca de 43 segundos de arco por século que faltavam na precessão de Mercúrio"
    type: conceptual
    check: source
    sources: [https://arxiv.org/pdf/1705.04397]
    status: pending
  - id: claim-004
    text: "Lemaître (1927) usou a relatividade geral para descrever um universo em expansão e ligou isso à recessão das galáxias; Friedmann já tinha achado soluções em expansão em 1922"
    type: attribution
    check: source
    sources: [https://mathshistory.st-andrews.ac.uk/Biographies/Lemaitre/]
    status: pending
resources:
  - kind: read
    title: "Pesquisa FAPESP: Quando a luz se curvou"
    url: https://revistapesquisa.fapesp.br/quando-a-luz-se-curvou/
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Wikipedia: Relatividade geral"
    url: https://pt.wikipedia.org/wiki/Relatividade_geral
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "MIT OpenCourseWare 8.962: General Relativity (Scott Hughes, 2020)"
    url: https://ocw.mit.edu/courses/8-962-general-relativity-spring-2020
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "What Everyone Gets Wrong About Gravity (Veritasium; originally 'Why Gravity is NOT a Force')"
    url: "https://www.youtube.com/watch?v=XRr1kaXKBsU"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Massa e energia deformam o espaço e o tempo juntos, e as coisas andam "o mais reto possível" nessa geometria deformada. É a imagem da bola de boliche num lençol esticado, com uma bolinha de gude rodando em volta.

A analogia falha de dois jeitos: ela usa a gravidade da Terra para puxar a bolinha (explica a gravidade com gravidade) e mostra só o espaço curvado, quando o efeito mais importante no dia a dia é a curvatura do tempo.

## Equação

$$
G_{\mu\nu} + \Lambda g_{\mu\nu} = \frac{8\pi G}{c^4}\,T_{\mu\nu}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $G_{\mu\nu}$ | curvatura do espaço-tempo (tensor de Einstein) |
| $g_{\mu\nu}$ | a métrica: como medir distâncias e tempos |
| $\Lambda$ | constante cosmológica |
| $T_{\mu\nu}$ | matéria e energia (tensor energia-momento) |
| $\mu,\nu$ | índices: tempo, x, y, z |

Em palavras: curvatura é igual a matéria, vezes uma constante.

## Exemplo

| Teste | Newton | Relatividade geral | Observado |
| --- | --- | --- | --- |
| Excesso no periélio de Mercúrio | 0 | ≈ 43″/século | ≈ 43″/século |
| Deflexão da luz no Sol | 0,87″ | 1,75″ | Sobral 1919: 1,98 ± 0,12″ |

## Onde isso volta

Resolver essas equações para uma massa compacta leva ao buraco negro. No paper dos replica wormholes, a física quântica obriga a somar várias geometrias possíveis desse espaço-tempo.

## Pergunta-ponte

O que as equações dizem quando toda a massa está concentrada num ponto?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o lençol mostra exatamente o que acontece" | "o lençol é uma analogia; ela mostra o espaço, mas o tempo também se curva" |
| "Einstein derrubou Newton" | "Newton é o limite de campo fraco da relatividade geral" |

## Nível técnico

São 10 equações diferenciais acopladas e não lineares para as componentes de $g_{\mu\nu}$. Partículas livres seguem geodésicas, $\frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\alpha\beta}\frac{dx^\alpha}{d\tau}\frac{dx^\beta}{d\tau} = 0$. Friedmann (1922) achou soluções de universo em expansão nessas equações; Lemaître (1927), de forma independente, ligou essa expansão à recessão das galáxias.
