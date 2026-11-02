---
id: units-and-si
title: Unidades, SI e notação científica
summary: Todo número em física vem com unidade; o SI é o acordo mundial sobre essas unidades, e a notação científica escreve números enormes e minúsculos.
recap:
  - "Número sem unidade não é medida: 20 o quê? metros, segundos, km/h?"
  - "O SI tem sete unidades de base (metro, quilograma, segundo, ampere, kelvin, mol, candela)."
  - "Desde 2019, todas são definidas fixando valores exatos de constantes, como a velocidade da luz e a constante de Planck."
  - "Notação científica: 150 000 000 000 m vira 1,5 × 10¹¹ m."
levels: [zero]
consensus: established
tags:
  area: math/notation
  topics: [foundations, measurement]
  era: classical-mechanics-era
  people: []
  events: [metre-definition, si-established, si-2019-redefinition]
equations:
  - tex: 1\ \text{km/h} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3{,}6}\ \text{m/s}
    spoken: "um quilômetro por hora é igual a mil metros sobre três mil e seiscentos segundos, que é um sobre três vírgula seis metros por segundo"
  - tex: 1{,}5 \times 10^{11}
    spoken: "um vírgula cinco vezes dez elevado a onze"
claims:
  - text: "72 km/h equivalem a 20 m/s"
    type: number
    check: compute
    formula: kmh_72_to_m_s
    expected: 20
    unit: m/s
    tolerance: 0.001
    status: verified
  - text: "A luz do Sol leva cerca de 8,3 minutos para chegar à Terra"
    type: number
    check: compute
    formula: sunlight_travel_minutes
    expected: 8.32
    unit: min
    tolerance: 0.005
    status: verified
  - text: "O SI foi estabelecido em 1960 pela 11ª Conferência Geral de Pesos e Medidas"
    type: date
    check: source
    sources: [https://www.bipm.org/en/-/resolution-cgpm-11-12, https://www.britannica.com/summary/International-System-of-Units]
    status: verified
  - text: "Desde 20 de maio de 2019, todas as unidades de base do SI são definidas fixando valores de constantes"
    type: date
    check: source
    sources: [https://www.bipm.org/en/-/resolution-cgpm-26-1, https://en.wikipedia.org/wiki/2019_revision_of_the_SI]
    status: verified
  - text: "O metro foi definido na França, nos anos 1790, como a décima milionésima parte da distância do polo norte ao equador, medida ao longo do meridiano de Paris"
    type: date
    check: source
    sources: [https://en.wikipedia.org/wiki/History_of_the_metre]
    status: verified
resources:
  - kind: study
    title: "1.3: Unidades e padrões (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/01%3A_Unidades_e_medidas/1.03%3A_Unidades_e_padr%C3%B5es
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "International System of Units - summary (Britannica)"
    url: https://www.britannica.com/summary/International-System-of-Units
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "International System of Units (Wikipedia)"
    url: https://en.wikipedia.org/wiki/International_System_of_Units
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "2019 revision of the SI (Wikipedia)"
    url: https://en.wikipedia.org/wiki/2019_revision_of_the_SI
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Resolution 1 of the 26th CGPM (2018) - revision of the SI (BIPM)"
    url: https://www.bipm.org/en/-/resolution-cgpm-26-1
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Se alguém diz "a distância é 20", não dá para fazer nada com isso. Vinte metros, vinte quilômetros, vinte anos-luz? Em física, número e unidade andam sempre juntos. Por isso o mundo combinou um sistema único, o SI, e todo cálculo começa colocando as grandezas nele.

A física também lida com números absurdos: a distância da Terra ao Sol tem 12 algarismos em metros, e a massa de um elétron, em quilogramas, tem 30 zeros depois da vírgula. A notação científica resolve isso: escreve-se um número entre 1 e 10 vezes uma potência de dez. O expoente diz quantas casas a vírgula andou.

## Equação

$$
1\ \text{km/h} = \frac{1000\ \text{m}}{3600\ \text{s}} = \frac{1}{3{,}6}\ \text{m/s}
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| m | metro, unidade de comprimento | — |
| s | segundo, unidade de tempo | — |
| kg | quilograma, unidade de massa | — |
| $10^{n}$ | dez elevado a $n$: 1 seguido de $n$ zeros | — |
| $10^{-n}$ | dez elevado a menos $n$: vírgula com $n$ casas | — |

## Exemplo

72 km/h divididos por 3,6 dão 20 m/s. A distância média Terra–Sol é cerca de $1{,}5 \times 10^{11}$ m; a luz anda $3 \times 10^{8}$ m por segundo; dividindo, dá cerca de 500 s, ou 8,3 minutos. A luz do Sol que você vê agora saiu de lá há oito minutos.

## Onde isso volta

Toda equação precisa fechar nas unidades: se do lado esquerdo há metros, do direito também. Essa conferência, a análise dimensional, pega muitos erros de conta. A relatividade e a quântica usam constantes como $c$ e $\hbar$, que hoje definem as próprias unidades.

## Pergunta-ponte

Com metros e segundos em mãos, como descrever um movimento?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o quilo é um peso" | "o quilograma é unidade de massa; peso é força e se mede em newtons" |
| "10⁻³ é um número negativo" | "10⁻³ é 0,001: o sinal de menos no expoente quer dizer dividir" |
| "a unidade é um detalhe" | "sem unidade, o número não diz nada" |
