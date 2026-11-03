---
id: entanglement
title: Emaranhamento
summary: Duas partículas num estado só; cada uma sozinha parece aleatória, mas os resultados das duas estão ligados.
recap:
  - "Duas partículas emaranhadas formam um único estado."
  - "Cada uma sozinha parece aleatória; juntas, os resultados combinam."
  - "Não serve para mandar mensagens mais rápido que a luz."
levels: [zero, technical]
consensus: established
tags:
  area: physics/quantum-information
  topics: [entanglement, information]
  era: nuclear-age
  people: [albert-einstein, boris-podolsky, nathan-rosen, erwin-schrodinger]
  arxiv_category: quant-ph
equations:
  - tex: '|\psi\rangle = \frac{1}{\sqrt{2}}\big(|0\rangle_A|1\rangle_B + |1\rangle_A|0\rangle_B\big)'
    spoken: "ket psi é igual a um sobre raiz de dois, vezes: ket zero A, ket um B; mais ket um A, ket zero B"
  - tex: \rho_A = \operatorname{Tr}_B\, |\psi\rangle\langle\psi|
    spoken: "rô A é igual ao traço parcial sobre B de ket psi bra psi"
  - tex: S(A) = 1\ \text{bit}, \quad S(AB) = 0
    spoken: "S de A é igual a um bit; S de A B é igual a zero"
claims:
  - text: "Para um estado puro global de A e B, a entropia de von Neumann de A é igual à de B; para estados mistos isso não vale em geral"
    type: conceptual
    check: human
    sources: [https://ar5iv.arxiv.org/html/2006.06872]
    status: verified
  - text: "Emaranhamento não permite enviar mensagens mais rápido que a luz"
    type: conceptual
    check: human
    sources: [https://en.wikipedia.org/wiki/No-communication_theorem]
    status: verified
resources:
  - kind: read
    title: "Wikipedia: Entrelaçamento quântico"
    url: https://pt.wikipedia.org/wiki/Entrela%C3%A7amento_qu%C3%A2ntico
    level: zero
    lang: pt
    checked_at: 2026-11-02
review:
  status: auto_checked
  checked_at: 2026-11-02
  reviewer: null
---

## Intuição

Duas partículas emaranhadas formam um sistema só. Medindo A, o resultado é aleatório, como cara ou coroa. No par do exemplo, medindo ambas na base 0/1, os resultados são sempre opostos. A informação não está em nenhuma das duas sozinha; está na relação entre elas.

A analogia do par de luvas (uma esquerda, outra direita, em caixas separadas) explica a correlação, mas falha: as luvas já tinham lado definido antes de abrir a caixa, e os experimentos de Bell mostram que partículas emaranhadas não funcionam assim.

## Equação

$$
|\psi\rangle = \frac{1}{\sqrt{2}}\big(|0\rangle_A|1\rangle_B + |1\rangle_A|0\rangle_B\big)
$$

## Variáveis

| Símbolo | Significado |
| --- | --- |
| $A,\ B$ | as duas partículas |
| $\rho_A$ | o estado de A olhando só para A |
| $\operatorname{Tr}_B$ | traço parcial: "esquecer" B |
| $S(A)$ | entropia de emaranhamento de A |

## Exemplo

Neste par, A sozinha tem 50% de chance para cada resultado: 1 bit de entropia. O par inteiro está num estado puro: entropia zero. Para um estado global puro, a entropia de uma parte mede seu emaranhamento com o resto. Os resultados clássicos 01 e 10 continuam aleatórios: sua entropia conjunta é 1 bit, não zero.

```lab
entangled-pair
```

## Onde isso volta

É exatamente a estrutura da radiação Hawking: cada partícula que escapa (A) está emaranhada com uma parceira que ficou dentro do buraco negro (B). A curva de Page acompanha a entropia conjunta de toda a radiação. Ela não é a soma das entropias das partículas quando existem correlações entre elas.

## Pergunta-ponte

O que acontece com a parceira B quando o buraco negro evapora?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "medir A muda B instantaneamente e dá para mandar mensagem" | "os resultados são correlacionados, mas cada um sozinho é aleatório; não se envia informação" |
| "é como um par de luvas" | "a correlação lembra luvas, mas modelos de variáveis ocultas locais não reproduzem todas as correlações dos testes de Bell" |

## Nível técnico

Para um estado puro $|\psi\rangle_{AB}$, $S(\rho_A) = S(\rho_B)$ (decomposição de Schmidt). No par acima, $\rho_A = \tfrac12\mathbb{1}$ e $S(\rho_A) = \ln 2$, ou 1 bit. Einstein, Podolsky e Rosen (1935) usaram esse tipo de estado para questionar a completude da mecânica quântica; a conjectura ER = EPR (2013) liga emaranhamento a pontes no espaço-tempo.

A simulação ilustra apenas uma base de medição; correlação perfeita nessa base também pode ser produzida por uma mistura clássica. Ela, sozinha, não demonstra emaranhamento nem violação de Bell. [Entropia quântica e clássica: Preskill, cap. 10](https://www.preskill.caltech.edu/ph219/chap10_6A_2025.pdf).
