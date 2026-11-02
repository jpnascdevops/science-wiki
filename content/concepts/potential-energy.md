---
id: potential-energy
title: Energia potencial
summary: Energia potencial é energia guardada pela posição; na superfície da Terra, vale m g h.
recap:
  - "Energia potencial é energia guardada na posição ou na forma: altura, mola esticada."
  - "Perto da superfície da Terra: E_p = m g h."
  - "Só diferenças de energia potencial importam; o zero é escolha de quem calcula."
  - "A fórmula geral, válida a qualquer distância (com zero no infinito), é E_p = − G M m / r; m g h é a aproximação perto da superfície."
levels: [zero]
consensus: established
tags:
  area: physics/classical-mechanics
  topics: [energy, gravity]
  era: nineteenth-century
  people: [william-rankine]
  events: []
equations:
  - tex: E_p = m\,g\,h
    spoken: "E p é igual a m g h"
  - tex: E_p = \frac{1}{2}\,k\,x^2
    spoken: "E p é igual a um meio de k vezes x ao quadrado"
  - tex: E_p = -\frac{G M m}{r}
    spoken: "E p é igual a menos G M m sobre r"
claims:
  - text: "Uma pessoa de 60 kg que sobe um andar de 3 m ganha cerca de 1,8 kJ de energia potencial"
    type: number
    check: compute
    formula: pe_60kg_3m
    expected: 1765
    unit: J
    tolerance: 0.002
    status: verified
  - text: "O termo energia potencial foi cunhado por William Rankine em 1853"
    type: attribution
    check: source
    sources: [https://en.wikipedia.org/wiki/W._J._M._Rankine, https://www.encyclopedia.com/environment/encyclopedias-almanacs-transcripts-and-maps/scientific-and-technical-understanding-energy]
    status: verified
resources:
  - kind: study
    title: "8.2: Energia potencial de um sistema (Física Universitária I, OpenStax)"
    url: https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_I_-_Mecanica_Som_Oscilacoes_e_Ondas_(OpenStax)/08%3A_Energia_potencial_e_conservacao_de_energia/8.02%3A_Energia_potencial_de_um_sistema
    level: intermediate
    lang: pt
    checked_at: 2026-11-02
  - kind: study
    title: "Energia na Pista de Skate: Básico (PhET simulation)"
    url: https://phet.colorado.edu/pt_BR/simulations/energy-skate-park-basics
    level: zero
    lang: pt
    checked_at: 2026-11-02
  - kind: read
    title: "Potential energy (Wikipedia)"
    url: https://en.wikipedia.org/wiki/Potential_energy
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

Levantar uma caixa até a prateleira dá trabalho. Esse trabalho não sumiu: ficou guardado na altura. Se a caixa cair, ele volta como movimento. Energia guardada assim, por causa da posição, é energia potencial.

Uma mola esticada, um arco puxado e a água no alto de uma represa guardam energia do mesmo jeito. O valor exato depende de onde você põe o zero (o chão, a mesa, o nível do mar), mas isso não atrapalha: o que conta é quanto muda.

## Equação

$$
E_p = m\,g\,h
$$

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $E_p$ | energia potencial | J |
| $m$ | massa | kg |
| $g$ | aceleração da gravidade | m/s² |
| $h$ | altura acima do nível escolhido como zero | m |
| $k$ | constante da mola | N/m |
| $x$ | quanto a mola foi esticada ou comprimida | m |

## Exemplo

Subir um andar de 3 m, para uma pessoa de 60 kg: $60 \times 9{,}8 \times 3 \approx 1760$ J (cerca de 1,8 kJ). É pouco perto da energia de um pão francês (centenas de quilojoules), mas o corpo é ineficiente e gasta bem mais que isso para subir.

## Onde isso volta

Somando potencial e cinética, chega-se à conservação da energia. A forma $-GMm/r$ dá a velocidade de escape e as energias das órbitas. Na quântica, o potencial é o "terreno" em que a função de onda se move.

## Pergunta-ponte

Se a energia potencial vira cinética e vice-versa, a soma das duas fica constante?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "a caixa tem energia potencial sozinha" | "a energia potencial é do sistema caixa e Terra" |
| "energia potencial negativa não faz sentido" | "o sinal depende de onde se põe o zero; com zero no infinito, objetos presos têm energia negativa" |
