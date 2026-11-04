---
id: torque
title: Torque e equilíbrio
summary: Torque é a capacidade de uma força girar algo; depende da força e da distância ao eixo.
recap:
  - "Torque = força × braço, a distância do eixo até a linha da força, medida na perpendicular. Mais longe, mais efeito de giro."
  - "Por isso a maçaneta fica longe da dobradiça e a chave de roda é comprida."
  - "Equilíbrio: soma das forças zero e soma dos torques zero."
  - "Lei da alavanca: peso × braço de um lado = peso × braço do outro."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [rotation, foundations]
  era: antiquity
  people: [archimedes]
  events: []
equations:
  - tex: \tau = r\,F\,\sin\theta
    spoken: "tau é igual a r vezes F vezes seno de teta"
  - tex: F_1\,d_1 = F_2\,d_2
    spoken: "F um vezes d um é igual a F dois vezes d dois"
claims:
  - id: claim-001
    text: "Uma criança de 30 kg a 2 m do eixo de uma gangorra faz um torque de cerca de 588 N·m"
    type: number
    check: compute
    formula: torque_30kg_2m
    expected: 588.4
    unit: N·m
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "Alguém de 40 kg a 1,5 m faz o mesmo torque e a gangorra fica em equilíbrio"
    type: number
    check: compute
    formula: torque_40kg_1_5m
    expected: 588.4
    unit: N·m
    tolerance: 0.001
    status: calculated
  - id: claim-003
    text: "Arquimedes enunciou a lei da alavanca em Sobre o equilíbrio dos planos"
    type: attribution
    check: source
    sources: [https://mathshistory.st-andrews.ac.uk/Extras/Archimedes_on_statics/]
    status: pending
resources:
  - kind: study
    title: "10.7: Torque (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/10%3A_Introducao_a_rotacao_de_eixo_fixo/10.07%3A_Torque
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Cap. 12: Equilíbrio estático e elasticidade (OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/12%3A_Equilibrio_estatico_e_elasticidade
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Balançando (PhET simulation - torque, lever arm, equilibrium)"
    url: https://phet.colorado.edu/pt_BR/simulations/balancing-act
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Torque and Equilibrium - Torque Calculation (HyperPhysics)"
    url: https://hyperphysics.gsu.edu/hbase/torq2.html
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Archimedes on statics - On the Equilibrium of Planes (MacTutor)"
    url: https://mathshistory.st-andrews.ac.uk/Extras/Archimedes_on_statics/
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Torque: Crash Course Physics #12"
    url: "https://www.youtube.com/watch?v=b-HZ1SZPaQw"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Tente abrir uma porta empurrando perto da dobradiça: é difícil. Empurrando na maçaneta, longe dela, é fácil. A força é a mesma; o que muda é a distância ao eixo. O efeito de giro de uma força chama-se torque, e é força vezes distância.

Arquimedes resumiu isso na lei da alavanca: um peso pequeno longe do apoio equilibra um peso grande perto dele. A frase atribuída a ele, "deem-me um ponto de apoio e moverei o mundo", é a lei da alavanca levada ao exagero.

## Equação

$$
\tau = r\,F\,\sin\theta
$$

```lab
seesaw
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\tau$ | torque | N·m |
| $r$ | distância do eixo até onde a força é aplicada | m |
| $F$ | força | N |
| $\theta$ | ângulo entre a força e a linha que vai do eixo ao ponto de aplicação (90° dá o máximo) | grau |

## Exemplo

Numa gangorra, uma criança de 30 kg senta a 2 m do eixo: torque $30 \times 9{,}8 \times 2 \approx 588$ N·m. Do outro lado, alguém de 40 kg senta a 1,5 m: $40 \times 9{,}8 \times 1{,}5 \approx 588$ N·m. Torques iguais e opostos, gangorra parada na horizontal.

## Onde isso volta

O torque está para a rotação como a força está para o movimento em linha reta: muda o momento angular. Sem torque externo, o momento angular se conserva, e é por isso que planetas e patinadores fazem o que fazem.

## Pergunta-ponte

Se força muda o momento linear, o que o torque muda?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "torque é uma força forte" | "torque é força vezes distância ao eixo; a mesma força pode dar torques diferentes" |
| "equilíbrio é só a soma das forças dar zero" | "também os torques precisam somar zero, senão o corpo gira" |
