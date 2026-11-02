---
id: work-and-kinetic-energy
title: Trabalho e energia cinética
summary: Trabalho é força vezes deslocamento; ele vira energia de movimento, que cresce com o quadrado da velocidade.
recap:
  - "Trabalho = força × deslocamento na direção da força. Empurrar uma parede parada não realiza trabalho."
  - "Energia cinética é a energia do movimento: E = m v²/2."
  - "O trabalho total feito sobre um corpo é igual à variação da energia cinética dele."
  - "Dobrar a velocidade quadruplica a energia: por isso a 80 km/h a batida é muito pior que a 40."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, motion]
  era: nineteenth-century
  people: [gottfried-leibniz, emilie-du-chatelet, gaspard-gustave-coriolis, william-thomson-kelvin]
  events: []
equations:
  - tex: W = F\,d\,\cos\theta
    spoken: "W é igual a F vezes d vezes cosseno de teta"
  - tex: E_c = \frac{1}{2}\,m\,v^2
    spoken: "E c é igual a um meio de m vezes v ao quadrado"
  - tex: W_{\text{total}} = \Delta E_c
    spoken: "W total é igual a delta E c"
claims:
  - text: "Um carro de 1000 kg a 72 km/h (20 m/s) tem 200 kJ de energia cinética"
    type: number
    check: compute
    formula: ke_car_20ms_kj
    expected: 200
    unit: kJ
    tolerance: 0.001
    status: verified
  - text: "A 144 km/h (40 m/s), o mesmo carro tem 800 kJ, quatro vezes mais"
    type: number
    check: compute
    formula: ke_car_40ms_kj
    expected: 800
    unit: kJ
    tolerance: 0.001
    status: verified
  - text: "Coriolis introduziu o termo trabalho (travail) no sentido da física em 1829, com o fator 1/2 na energia cinética"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Gaspard-Gustave_de_Coriolis, https://en.wikipedia.org/wiki/Vis_viva]
    status: verified
  - text: "Émilie du Châtelet, partindo dos experimentos de 's Gravesande, defendeu que a força viva (vis viva) é proporcional a m v²"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Kinetic_energy, https://en.wikipedia.org/wiki/History_of_energy]
    status: verified
  - text: "William Thomson (Lord Kelvin) é creditado por cunhar o termo energia cinética por volta de 1849–1851; ele se firmou com o tratado de Thomson e Tait (1867)"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/Kinetic_energy, https://spark.iop.org/history-concept-energy-and-work]
    status: verified
resources:
  - kind: study
    title: "Cap. 7: Trabalho e energia cinética (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/07%3A_Trabalho_e_energia_cinetica
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "7.4: Teorema da Energia do Trabalho (OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/07%3A_Trabalho_e_energia_cinetica/7.04%3A_Teorema_da_Energia_do_Trabalho
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Kinetic energy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Kinetic_energy
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 13 Work and Potential Energy (A)"
    url: https://www.feynmanlectures.caltech.edu/I_13.html
    level: technical
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Em física, "trabalho" tem um sentido preciso: força aplicada ao longo de um caminho. Empurrar um carrinho por 10 m é trabalho; segurar uma mala parado, por mais cansativo, não é, porque nada se deslocou.

O trabalho total (o da força resultante) não some: vira energia de movimento, a energia cinética. E ela cresce com o quadrado da velocidade. No século XVIII houve uma briga sobre o que se conserva num choque, $mv$ ou $mv^2$. Émilie du Châtelet, interpretando experimentos de Willem 's Gravesande com bolas caindo em argila, mostrou que com o dobro da velocidade, a marca ficava quatro vezes mais funda. A energia segue $v^2$.

## Equação

$$
E_c = \frac{1}{2}\,m\,v^2
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $W$ | trabalho | joule (J = N·m) |
| $F$ | força | N |
| $d$ | deslocamento | m |
| $\theta$ | ângulo entre força e deslocamento | grau |
| $E_c$ | energia cinética | J |
| $m$ | massa | kg |
| $v$ | velocidade | m/s |

## Exemplo

Um carro de 1000 kg a 72 km/h (20 m/s): $E_c = \tfrac12 \times 1000 \times 20^2 = 200$ kJ. A 144 km/h: 800 kJ. Os freios precisam dissipar quatro vezes mais energia, e a distância de frenagem também fica cerca de quatro vezes maior.

## Onde isso volta

Quando a força é a gravidade ou uma mola, o trabalho pode ser guardado e devolvido: é a energia potencial. Somando as duas, chega-se à conservação da energia. Na relatividade, $mv^2/2$ é só a aproximação de baixa velocidade de uma fórmula maior.

## Pergunta-ponte

Para onde vai o trabalho feito para levantar uma caixa até a prateleira?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "segurar peso parado é trabalho" | "cansa o músculo, mas o trabalho mecânico sobre a mala é zero" |
| "o dobro da velocidade, o dobro da energia" | "o dobro da velocidade, quatro vezes a energia" |
| "energia é uma substância" | "energia é um número que se conserva quando somamos todas as formas" |
