---
id: collisions
title: Colisões
summary: Em toda colisão o momento total se conserva; a energia cinética só se conserva nas colisões elásticas.
recap:
  - "Momento total antes = momento total depois, em qualquer colisão."
  - "Elástica: a energia cinética também se conserva (bolas de bilhar, quase)."
  - "Inelástica: parte da energia vira calor, som e deformação; perfeitamente inelástica: os corpos grudam."
  - "Dois carros iguais, um parado: se grudam, saem com metade da velocidade e metade da energia cinética vira deformação, calor e som."
levels: [zero, technical]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [motion, energy, conservation-laws]
  era: scientific-revolution
  people: [christiaan-huygens, john-wallis, christopher-wren]
  events: [royal-society-collisions]
equations:
  - tex: m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'
    spoken: "m um v um mais m dois v dois é igual a m um v um linha mais m dois v dois linha"
  - tex: v_f = \frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}
    spoken: "v f é igual a m um v um mais m dois v dois, sobre m um mais m dois"
claims:
  - text: "Um carro de 1000 kg a 20 m/s que bate e gruda num carro igual parado: os dois seguem a 10 m/s"
    type: number
    check: compute
    formula: inelastic_final_speed
    expected: 10
    unit: m/s
    tolerance: 0.001
    status: verified
  - text: "Nessa batida, metade da energia cinética vira deformação, calor e som"
    type: number
    check: compute
    formula: inelastic_ke_fraction_lost
    expected: 0.5
    unit: ""
    tolerance: 0.001
    status: verified
resources:
  - kind: study
    title: "9.7: Tipos de colisões (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/09%3A_Momento_linear_e_colisoes/9.07%3A_Tipos_de_colis%C3%B5es
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Elastic collision (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Elastic_collision
    level: intermediate
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "Feynman Lectures Vol. I, ch. 10 Conservation of Momentum (10-4 Momentum and energy)"
    url: https://www.feynmanlectures.caltech.edu/I_10.html
    level: technical
    lang: en
    checked_at: 2026-11-02
  - kind: read
    title: "On the collision of bodies - Christopher Wren's figures, 1668 (Royal Society Picture Library)"
    url: https://pictures.royalsociety.org/image-rs-15415
    level: zero
    lang: en
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Numa colisão, os corpos se empurram com forças iguais e opostas pelo mesmo tempo. Por isso o momento total sempre se conserva. A energia cinética é outra história: depende de quanto os corpos se deformam e esquentam.

Bolas de bilhar quase não se deformam: a colisão é quase elástica, e numa batida de frente uma bola para e a outra sai com a velocidade dela (se a branca deslizar sem girar), como no pêndulo de Newton. Carros se amassam de propósito: a carroceria absorve energia que, de outro modo, iria para os passageiros.

## Equação

$$
m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $m_1, m_2$ | massas | kg |
| $v_1, v_2$ | velocidades antes | m/s |
| $v_1', v_2'$ | velocidades depois | m/s |
| $v_f$ | velocidade comum, se grudam | m/s |

## Exemplo

Um carro de 1000 kg a 20 m/s bate num carro igual parado e os dois ficam presos. Momento antes: 20 000 kg·m/s. Depois, 2000 kg juntos: $v_f = 10$ m/s. Energia antes: 200 kJ; depois: $\tfrac12 \times 2000 \times 10^2 = 100$ kJ. Metade virou amassado, calor e barulho.

## Onde isso volta

Física de partículas é física de colisões: aceleradores batem partículas e usam a conservação de momento e energia para descobrir o que saiu. Estilingues gravitacionais de sondas espaciais são colisões elásticas com planetas, sem contato.

## Pergunta-ponte

E se em vez de corpos sólidos for um fluido, como a água num cano?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "na batida a energia se perde" | "a energia cinética vira outras formas; a energia total se conserva" |
| "colisão elástica é quando quica" | "elástica é quando a energia cinética total antes e depois é a mesma" |

## Nível técnico

Para colisão elástica frontal, $v_1' = \dfrac{m_1 - m_2}{m_1 + m_2}v_1 + \dfrac{2m_2}{m_1+m_2}v_2$ e $v_2' = \dfrac{2m_1}{m_1+m_2}v_1 + \dfrac{m_2 - m_1}{m_1+m_2}v_2$; massas iguais trocam de velocidade. No referencial do centro de massa, as velocidades só mudam de direção (elástica) ou se anulam (perfeitamente inelástica). O coeficiente de restituição $e = (v_2' - v_1')/(v_1 - v_2)$ vai de 0 (grudam) a 1 (elástica).
