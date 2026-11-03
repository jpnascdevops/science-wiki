---
id: replica-wormholes
title: Replica wormholes
summary: Somando todas as geometrias com réplicas, aparece uma conectada em forma de buraco de minhoca que reproduz as ilhas e a curva de Page.
recap:
  - "Calculam a entropia com cópias do sistema, somando todas as geometrias."
  - "Uma geometria conectada, em forma de buraco de minhoca, domina depois do tempo de Page."
  - "Hawking não errou a conta: faltava uma geometria."
levels: [zero, technical]
consensus: broad
tags:
  area: physics/quantum-gravity
  topics: [information-paradox, black-holes, hawking-radiation]
  era: contemporary
  people: [ahmed-almheiri, thomas-hartman, juan-maldacena, edgar-shaghoulian, amirhossein-tajdini, geoff-penington, stephen-shenker, douglas-stanford, zhenbin-yang]
  arxiv_category: hep-th
equations:
  - tex: S_n(R) = \frac{1}{1-n}\log\operatorname{Tr}\rho_R^{\,n}
    spoken: "S n de R é igual a um sobre um menos n, vezes log do traço de rô R elevado a n"
  - tex: S(R) = \lim_{n\to 1} S_n(R)
    spoken: "S de R é o limite, com n tendendo a um, de S n de R"
  - tex: \operatorname{Tr}\rho_R^{\,n} = \frac{Z_n}{Z_1^{\,n}}
    spoken: "traço de rô R à n é igual a Z n sobre Z um elevado a n"
  - tex: Z_n = \int \mathcal{D}g\,\mathcal{D}\phi\; e^{-I[g,\phi]}
    spoken: "Z n é a integral sobre todas as métricas g e campos fi de e elevado a menos I de g e fi"
  - tex: S(R) \approx \min\left(S_{\text{Hawking}}, S_{\text{ilha}}\right)
    spoken: "S de R é aproximadamente o mínimo entre S Hawking e S ilha"
claims:
  - text: "Almheiri, Hartman, Maldacena, Shaghoulian e Tajdini: Replica Wormholes and the Entropy of Hawking Radiation (2019)"
    type: reference
    check: arxiv
    arxiv: "1911.12333"
    expected_title: "Replica Wormholes and the Entropy of Hawking Radiation"
    sources: [https://arxiv.org/pdf/1911.12333]
    status: verified
    note: "Título, autores e ano reconferidos na página do arXiv em 2026-11-02; a checagem da API no CI é independente."
  - text: "Penington, Shenker, Stanford e Yang: Replica wormholes and the black hole interior (2019)"
    type: reference
    check: arxiv
    arxiv: "1911.11977"
    expected_title: "Replica wormholes and the black hole interior"
    sources: [https://arxiv.org/abs/1911.11977]
    status: verified
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - text: "Almheiri et al.: The entropy of Hawking radiation (revisão, 2020)"
    type: reference
    check: arxiv
    arxiv: "2006.06872"
    expected_title: "The entropy of Hawking radiation"
    sources: [https://arxiv.org/abs/2006.06872]
    status: verified
    note: "Título, autoria e ano conferidos no arXiv em 2026-11-02."
  - text: "Edwards e Anderson aplicaram o método de réplicas a vidros de spin em 1975; Parisi recebeu metade do Nobel de Física de 2021 por suas contribuições à compreensão de sistemas desordenados"
    type: attribution
    check: source
    sources: [https://garfield.library.upenn.edu/classics1985/A1985APZ5700001.pdf, https://www.nobelprize.org/prizes/physics/2021/summary/]
    status: verified
  - text: "No limite n → 1, extremizar sobre a posição dos pontos fixos da réplica conectada dá a superfície extremal quântica, que é a borda da ilha"
    type: conceptual
    check: verifier
    sources: [https://ar5iv.arxiv.org/html/1911.12333]
    status: verified
resources:
  - kind: read
    title: "Quanta Magazine: The Most Famous Paradox in Physics Nears Its End (George Musser, 2020)"
    url: https://www.quantamagazine.org/the-most-famous-paradox-in-physics-nears-its-end-20201029/
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "PBS Space Time: Have We Solved the Black Hole Information Paradox? (2022)"
    url: https://www.pbssocal.org/shows/pbs-space-time/episodes/have-we-solved-black-hole-information-paradox-wormh-qnogsp
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: study
    title: "arXiv 1911.12333: Replica Wormholes and the Entropy of Hawking Radiation"
    url: https://arxiv.org/pdf/1911.12333
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: draft
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Calcular a entropia da radiação diretamente é quase impossível. O truque é fazer a conta com várias cópias do sistema e depois voltar para uma só. Na gravidade quântica, também é preciso somar todas as formas possíveis do espaço-tempo. Fazendo isso, aparecem dois tipos de geometria: cópias separadas, que dão a conta de Hawking, e cópias ligadas por dentro do buraco negro, em forma de buraco de minhoca. Depois do tempo de Page, o segundo tipo domina e a curva vira.

As cópias não são universos paralelos nem simulação de computador, e esses buracos de minhoca não são túneis atravessáveis: são peças de um cálculo.

## Equação

$$
S(R) = \lim_{n\to 1} \frac{1}{1-n}\log\operatorname{Tr}\rho_R^{\,n}
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $n$ | número de réplicas (cópias) |
| $S_n$ | entropia de Rényi |
| $\rho_R$ | estado da radiação |
| $Z_n$ | integral de caminho gravitacional com $n$ réplicas |
| $\mathcal{D}g$ | soma sobre todas as geometrias |
| $I[g,\phi]$ | ação (gravidade + matéria) |

## Exemplo

| Geometria | Como é | Dá | Domina |
| --- | --- | --- | --- |
| Desconectada | cada réplica com seu interior | conta de Hawking: entropia sobe | antes do tempo de Page |
| Replica wormhole | interiores das réplicas ligados | fórmula das ilhas: entropia cai | depois do tempo de Page |

## Onde isso volta

É o ponto final da trilha. Ele responde à pergunta do conceito de ilhas e reproduz a entropia compatível com unitariedade nos modelos estudados. O cálculo semiclássico usual de Hawking não incluía as contribuições conectadas entre réplicas.

## Pergunta-ponte

Se o interior está codificado na radiação, como a informação sai, e como alguém a leria de volta? Essa ainda é uma pergunta aberta.

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "eles simularam cópias do universo" | "eles calcularam com réplicas, um artifício matemático" |
| "provaram que a informação não se perde" | "obtiveram uma curva de entropia compatível com unitariedade em modelos controlados" |
| "o paper uniu quântica e relatividade" | "o método é semiclássico; a teoria completa ainda não existe" |
| "a informação atravessa o buraco de minhoca" | "o cálculo diz quanta informação está na radiação, não o mecanismo" |

## Nível técnico

A sela conectada tem simetria $\mathbb{Z}_n$. O quociente $\mathcal M_n/\mathbb{Z}_n$ é uma geometria com defeitos cônicos com ângulo de abertura $2\pi/n$ e déficit $2\pi(1-1/n)$; para $n\to1$, a tensão dos defeitos vai a zero, as equações de movimento viram a condição de extremalidade da entropia generalizada, e extremizar sobre a posição dos pontos fixos dá a superfície extremal quântica, $\partial I$. As contas explícitas usam gravidade de Jackiw-Teitelboim em 2D acoplada a uma CFT e a um banho. O trabalho paralelo de Penington-Shenker-Stanford-Yang usa branas de fim de mundo e resolve a soma sobre topologias. Pontos abertos: o mecanismo lorentziano, a complexidade de decodificação, buracos negros realistas em 4D e o problema de fatoração (wormholes sugerem média sobre teorias).

A expressão com o mínimo é uma aproximação de sela dominante, longe da transição. Não se pode substituir o traço normalizado por uma soma simples de duas exponenciais: em $n=1$ essa soma daria 2, mas $\operatorname{Tr}\rho_R=1$. Usamos $\hbar=k_B=1$ na integral de caminho e na entropia. [Derivação e limites do modelo](https://arxiv.org/html/1911.12333v2).
