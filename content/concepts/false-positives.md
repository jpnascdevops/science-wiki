---
id: false-positives
title: Falsos positivos e validação
summary: Binárias eclipsantes, estrelas de fundo e ruído imitam trânsitos; confirmar um planeta exige descartar cada uma.
recap:
  - "Binárias eclipsantes, estrelas de fundo e ruído imitam trânsitos."
  - "Pistas: eclipse secundário, formato em V, centroide que se mexe."
  - "Candidato só vira planeta depois de descartar as alternativas."
levels: [zero, technical]
consensus: established
tags:
  area: astronomy/exoplanets
  topics: [transits, signal-processing]
  arxiv_category: astro-ph.EP
equations:
  - tex: \delta_{\text{obs}} = \delta_{\text{real}}\,\frac{F_{\text{ecl}}}{F_{\text{ecl}} + F_{\text{outros}}}
    spoken: "delta observado é igual a delta real vezes F da fonte eclipsada sobre, F da fonte eclipsada mais F das outras fontes"
claims:
  - id: claim-001
    text: "Binárias eclipsantes, inclusive misturadas com a luz de outra estrela (blended) ou rasantes (grazing), são uma fonte importante de falsos positivos"
    type: conceptual
    check: source
    sources: [https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets]
    status: pending
  - id: claim-002
    text: "Santerne et al. (2012) estimaram 34,8 ± 6,5% de falsos positivos numa amostra de candidatos gigantes do Kepler com período menor que 25 dias, profundidade maior que 0,4% e magnitude Kepler menor que 14,7"
    type: number
    check: source
    sources: [https://arxiv.org/abs/1206.0601]
    status: pending
    note: "A taxa depende da seleção; não se aplica a todos os candidatos únicos do Kepler."
resources:
  - kind: read
    title: "Wikipedia: Methods of detecting exoplanets"
    url: https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Cadernos de Astronomia (UFES): busca de trânsitos no TESS, com binárias eclipsantes como falso positivo"
    url: https://periodicos.ufes.br/astronomia/es/article/download/53384/37263/197613
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Giacalone et al.: Vetting of 384 TESS Objects of Interest with TRICERATOPS"
    url: https://arxiv.org/abs/2002.00691v2
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Binary and Multiple Stars: Crash Course Astronomy #34"
    url: "https://www.pbs.org/video/crash-course-astronomy-34/"
    level: zero
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Deciphering Eclipsing Binary Systems (and how citizen scientists can help) (AAVSO)"
    url: "https://www.youtube.com/watch?v=-K0NDMTg2IM"
    level: intermediate
    lang: en
    checked_at: 2026-11-03
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma queda periódica de brilho pode ser um planeta, mas também pode ser duas estrelas se eclipsando, uma estrela de fundo na mesma "foto" que dilui o sinal, ou um defeito do instrumento. Um candidato só vira planeta quando cada alternativa foi descartada, ou quando a chance dela é tão pequena que o planeta vence com folga.

## Equação

$$
\delta_{\text{obs}} = \delta_{\text{real}}\,\frac{F_{\text{ecl}}}{F_{\text{ecl}} + F_{\text{outros}}}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $\delta_{\text{obs}}$ | profundidade medida |
| $\delta_{\text{real}}$ | profundidade do evento na estrela que o produz |
| $F_{\text{ecl}}$ | fluxo fora do eclipse da fonte que sofre o evento |
| $F_{\text{outros}}$ | fluxo das demais fontes na abertura fotométrica |

## Exemplo

Uma binária eclipsante de fundo com eclipse de 50%, mas 1.000 vezes mais fraca que a estrela-alvo, aparece como uma queda de cerca de 0,05%: a cara de um planeta pequeno. Sinais que denunciam: eclipses alternados de profundidades diferentes (primário e secundário), formato em V em vez de caixa, e o centroide da imagem se mexendo durante a queda.

## Onde isso volta

É a etapa final de uma detecção. Fecha a trilha prática: curva de luz, detecção, candidato, validação.

## Pergunta-ponte

Confirmado o planeta, ele poderia ter água líquida?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "candidato" e "planeta" como sinônimos | "candidato ainda pode ser falso positivo; planeta foi confirmado ou validado" |
| "validar é o mesmo que medir a massa" | "validação estatística descarta alternativas sem medir a massa; confirmação dinâmica mede" |

## Nível técnico

Testes padrão: comparar profundidade de trânsitos pares e ímpares, procurar eclipse secundário (fase 0,5 em órbita circular; pode mudar em órbita excêntrica), checar o deslocamento do centroide e a forma (V versus U), e usar imagem de alta resolução para achar companheiras próximas. Ferramentas como TRICERATOPS e VESPA calculam a probabilidade de cada cenário (planeta, binária eclipsante, binária hierárquica, fundo) com critérios próprios. Giacalone et al. usam FPP < 0,015 e NFPP < 0,001 no TRICERATOPS; não há um limiar único para todas as ferramentas.

No exemplo, $\delta_{obs}=0{,}5\times(1/1000)/(1+1/1000)\approx0{,}04995\%$: a fonte eclipsada é a binária de fundo. [Critérios do TRICERATOPS](https://arxiv.org/abs/2002.00691).
