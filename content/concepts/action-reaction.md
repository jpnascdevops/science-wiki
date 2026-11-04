---
id: action-reaction
title: 'Ação e reação: a terceira lei'
summary: Na mecânica newtoniana, forças de interação vêm em pares iguais e opostos, agindo em corpos diferentes.
recap:
  - "Se A empurra B, B empurra A com força igual e oposta, no mesmo instante."
  - "As duas forças agem em corpos diferentes, por isso não se cancelam."
  - "Força igual em massas diferentes dá acelerações diferentes."
  - "Foguete, nadador e você andando funcionam assim: empurram algo para trás e são empurrados para frente."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, foundations]
  era: classical-mechanics-era
  people: [isaac-newton]
  events: [principia]
equations:
  - tex: \vec{F}_{A\to B} = -\vec{F}_{B\to A}
    spoken: "a força de A sobre B é igual a menos a força de B sobre A"
claims:
  - id: claim-001
    text: "Dois patinadores de 60 kg e 40 kg se empurram com 120 N: o de 60 kg acelera 2 m/s²"
    type: number
    check: compute
    formula: skater_accel_60kg
    expected: 2
    unit: m/s²
    tolerance: 0.001
    status: calculated
  - id: claim-002
    text: "No mesmo empurrão, o de 40 kg acelera 3 m/s²"
    type: number
    check: compute
    formula: skater_accel_40kg
    expected: 3
    unit: m/s²
    tolerance: 0.001
    status: calculated
  - id: claim-003
    text: "A Terra também é puxada por uma pessoa de 60 kg em queda, mas acelera só cerca de 10⁻²² m/s²"
    type: number
    check: compute
    formula: earth_accel_from_60kg_person
    expected: 9.85e-23
    unit: m/s²
    tolerance: 0.005
    status: calculated
resources:
  - kind: study
    title: "5.6: Terceira Lei de Newton (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/05%3A_Leis_do_movimento_de_Newton/5.06%3A_Terceira_Lei_de_Newton
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Forças e Movimento: Noções Básicas (PhET; includes force pairs)"
    url: https://phet.colorado.edu/pt_BR/simulations/forces-and-motion-basics
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 10 Conservation of Momentum (10-1 Newton's Third Law)"
    url: https://www.feynmanlectures.caltech.edu/I_10.html
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Principia (Britannica)"
    url: https://www.britannica.com/topic/Principia
    level: zero
    lang: en
    checked_at: 2026-11-02
  - kind: watch
    title: "Newton's Laws: Crash Course Physics #5"
    url: "https://www.youtube.com/watch?v=kKKM8Y-u7ds"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Na mecânica newtoniana, as forças de interação entre dois corpos formam pares. Quando você empurra a parede, a parede empurra sua mão de volta, com a mesma força. Quando você anda, seu pé empurra o chão para trás e o chão empurra você para frente. Um foguete joga gás para trás e o gás empurra o foguete para frente; não precisa de ar para se apoiar.

Se as forças são iguais e opostas, por que não se cancelam? Porque agem em corpos diferentes. Uma está no foguete, a outra no gás.

## Equação

$$
\vec{F}_{A\to B} = -\vec{F}_{B\to A}
$$

```lab
skaters
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\vec{F}_{A\to B}$ | força que A faz em B | N |
| $\vec{F}_{B\to A}$ | força que B faz em A | N |
| sinal de menos | mesma intensidade, sentido oposto | — |

## Exemplo

Dois patinadores parados no gelo, um de 60 kg e outro de 40 kg, se empurram com 120 N. Cada um sente 120 N. O de 60 kg acelera $120/60 = 2$ m/s²; o de 40 kg, $120/40 = 3$ m/s². O mais leve sai mais rápido.

Quando uma pessoa de 60 kg está no ar depois de pular, ela puxa a Terra com a mesma força com que a Terra a puxa, cerca de 590 N. Mas a massa da Terra é tão grande que a aceleração é da ordem de $10^{-22}$ m/s².

## Onde isso volta

A terceira lei garante que, num sistema isolado, o momento linear total se conserva: o que um corpo ganha, o outro perde. Daí saem recuo de armas, foguetes e colisões.

## Pergunta-ponte

Se as forças são iguais, o que fica igual entre os dois patinadores depois do empurrão?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a reação vem depois da ação" | "as duas forças acontecem ao mesmo tempo" |
| "ação e reação se anulam" | "não se cancelam no balanço de forças de um só corpo; somam zero como forças internas do conjunto" |
| "o peso e a normal são ação e reação" | "o par do peso é a força que você faz puxando a Terra; a normal é outra interação" |

A terceira lei nessa forma instantânea não se estende a toda interação relativística. No eletromagnetismo, o momento total conservado inclui o dos campos. [Feynman, seção 10–3](https://www.feynmanlectures.caltech.edu/I_10.html).
