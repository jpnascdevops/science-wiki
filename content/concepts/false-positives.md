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
  - tex: \delta_{\text{obs}} = \delta_{\text{real}}\,\frac{F_{\text{alvo}}}{F_{\text{alvo}} + F_{\text{contam}}}
    spoken: "delta observado é igual a delta real vezes F alvo sobre, F alvo mais F contaminante"
claims:
  - text: "Binárias eclipsantes, inclusive misturadas com a luz de outra estrela (blended) ou rasantes (grazing), são uma fonte importante de falsos positivos"
    type: conceptual
    check: source
    sources: [https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets]
    status: verified
  - text: "Para candidatos únicos do Kepler, a taxa de falsos positivos já foi estimada em cerca de 40%"
    type: number
    check: source
    sources: [https://en.wikipedia.org/wiki/Methods_of_detecting_exoplanets]
    status: pending
    note: "Valor citado na Wikipedia; falta a fonte primária."
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
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Uma queda periódica de brilho pode ser um planeta, mas também pode ser duas estrelas se eclipsando, uma estrela de fundo na mesma "foto" que dilui o sinal, ou um defeito do instrumento. Um candidato só vira planeta quando cada alternativa foi descartada, ou quando a chance dela é tão pequena que o planeta vence com folga.

## Equação

$$
\delta_{\text{obs}} = \delta_{\text{real}}\,\frac{F_{\text{alvo}}}{F_{\text{alvo}} + F_{\text{contam}}}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $\delta_{\text{obs}}$ | profundidade medida |
| $\delta_{\text{real}}$ | profundidade do evento na estrela que o produz |
| $F_{\text{alvo}}$ | fluxo da estrela de interesse |
| $F_{\text{contam}}$ | fluxo de outras estrelas no mesmo pixel |

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

Testes padrão: comparar profundidade de trânsitos pares e ímpares, procurar eclipse secundário na fase 0,5, checar o deslocamento do centroide e a forma (V versus U), e usar imagem de alta resolução para achar companheiras próximas. Ferramentas como TRICERATOPS e VESPA calculam a probabilidade de cada cenário (planeta, binária eclipsante, binária hierárquica, fundo) e declaram o planeta "validado" quando a probabilidade de falso positivo fica abaixo de cerca de 1%.
