---
id: magnetism
title: Ímãs e magnetismo
summary: Todo ímã tem dois polos, norte e sul; iguais se repelem, opostos se atraem, e cortar um ímã ao meio dá dois ímãs, nunca um polo isolado. A própria Terra é um grande ímã.
recap:
- Ímã tem polo norte e polo sul. Iguais se repelem, opostos se atraem.
- Fora do ímã, o campo sai do norte e entra no sul; por dentro, volta do sul para o norte, e as linhas sempre se fecham.
- 'Corte um ímã e cada pedaço vira um ímã inteiro: não existe polo sozinho.'
- A Terra é um ímã (Gilbert, 1600), e é por isso que a bússola aponta para o norte.
levels:
- zero
- technical
consensus: established
tags:
  area: physics/electromagnetism
  topics:
  - magnetism
  - foundations
  era: scientific-revolution
  people:
  - william-gilbert
  - hans-christian-orsted
  events:
  - gilbert-de-magnete
equations:
- tex: \oint \vec{B}\cdot\mathrm{d}\vec{A} = 0
  spoken: a integral fechada de B escalar d A é igual a zero
claims:
- text: Na superfície da Terra, o campo magnético vai de cerca de 25 a 65 microtesla, conforme o lugar
  type: reference
  check: source
  sources:
  - https://www.ncei.noaa.gov/products/geomagnetism-frequently-asked-questions
  - https://hyperphysics.gsu.edu/hbase/magnetic/magearth.html
  status: verified
- text: Em De Magnete (1600), William Gilbert descreveu a Terra como um grande ímã e separou o efeito do âmbar atritado do efeito dos ímãs
  type: date
  check: source
  sources:
  - https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Electricity
  - https://en.wikipedia.org/wiki/William_Gilbert_(physicist)
  - https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/05%3A_Cargas_eletricas_e_campos/5.02%3A_Carga_el%C3%A9trica
  - https://hyperphysics.gsu.edu/hbase/magnetic/magearth.html
  status: verified
resources:
- kind: watch
  title: 'Magnetism: Crash Course Physics #32'
  url: https://www.pbs.org/video/magnetism-crash-course-physics-32-ogkapy
  level: zero
  lang: en
  checked_at: '2026-11-03'
- kind: study
  title: PhET — Ímã e Bússola (Magnet and Compass)
  url: https://phet.colorado.edu/pt/simulations/magnet-and-compass
  level: zero
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: 'Física Universitária II — Cap. 11: Forças e campos magnéticos (inclui 11.2 Magnetismo e suas descobertas históricas)'
  url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/11%3A_Forcas_e_campos_magneticos
  level: intermediate
  lang: pt
  checked_at: '2026-11-03'
- kind: read
  title: HyperPhysics — Magnetic Field of the Earth
  url: https://hyperphysics.gsu.edu/hbase/magnetic/magearth.html
  level: intermediate
  lang: en
  checked_at: '2026-11-03'
review:
  status: auto_checked
  checked_at: '2026-11-03'
  reviewer: null
---

## Intuição

Aproxime dois ímãs de geladeira: de um lado eles grudam, do outro se empurram. Todo ímã tem duas pontas diferentes, chamadas polo norte e polo sul. Norte com sul se atraem; norte com norte, ou sul com sul, se repelem.

Em volta do ímã existe um campo magnético, que se pode ver espalhando limalha de ferro numa folha por cima dele ou com várias bússolas: cada agulha gira até se alinhar com o campo. Por fora do ímã, as linhas saem do polo norte e entram no polo sul; por dentro, voltam do sul para o norte, fechando o circuito.

Agora, a parte estranha. Corte um ímã ao meio para tentar separar o norte do sul. Não dá: cada metade vira um ímã completo, com seu próprio norte e sul. Ninguém nunca encontrou um polo magnético sozinho. Em 1600, William Gilbert mostrou que a própria Terra se comporta como um ímã gigante: a agulha da bússola é um pequeno ímã que se alinha com o campo da Terra.

## Equação

$$
\oint \vec{B}\cdot\mathrm{d}\vec{A} = 0
$$

Lida em palavras: o campo magnético que entra numa superfície fechada é igual ao que sai. Não existe carga magnética: as linhas de campo nunca começam nem terminam, sempre se fecham. Por isso não há polo isolado.

```lab
magnet
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec B$ | campo magnético | T (tesla) |
| $\mathrm{d}\vec A$ | pedacinho de uma superfície fechada, apontando para fora | m² |
| $\oint$ | soma sobre a superfície fechada inteira | — |

## Exemplo

O campo da Terra na superfície vale entre 25 e 65 microtesla, conforme o lugar: fraco, mas suficiente para girar uma agulha leve e bem equilibrada. O polo da Terra que fica perto do norte geográfico atrai o polo norte da bússola. Então, magneticamente, ele é um polo sul.

## Onde isso volta

Ørsted descobriu que correntes elétricas também criam campos magnéticos, e hoje sabemos que todo magnetismo vem de cargas em movimento e do spin dos elétrons. Num ímã, os spins de trilhões de trilhões de átomos ficam alinhados; aquecido demais, o alinhamento se desfaz numa transição de fase (veja o laboratório do modelo de Ising).

## Pergunta-ponte

Como um campo magnético empurra uma carga elétrica que se move dentro dele?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o polo norte geográfico é um polo norte magnético" | "perto do norte geográfico há um polo sul magnético: ele atrai o norte da bússola" |
| "ímã atrai qualquer metal" | "atrai bem ferro, níquel e cobalto; alumínio, cobre e ouro quase nada" |

## Nível técnico

$\nabla\cdot\vec B = 0$ é uma das equações de Maxwell. Longe de um ímã, o campo é o de um dipolo, caindo com $1/r^3$. O momento magnético de um material vem das correntes orbitais e, principalmente, do spin dos elétrons; nos ferromagnéticos, a interação de troca alinha spins vizinhos em domínios, e acima da temperatura de Curie a ordem desaparece. Monopolos magnéticos são permitidos em várias teorias de grande unificação, mas nunca foram observados.
