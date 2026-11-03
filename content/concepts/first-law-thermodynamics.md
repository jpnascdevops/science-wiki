---
id: first-law-thermodynamics
title: Primeira lei da termodinâmica
summary: A energia interna de um sistema muda pelo calor que entra menos o trabalho que ele faz; é a conservação da energia incluindo o calor.
recap:
  - "ΔU = Q − W: a energia interna sobe com o calor recebido e desce com o trabalho realizado."
  - "É a conservação da energia, agora contando o calor."
  - "Comprimir um gás sem deixar o calor sair o esquenta (bomba de bicicleta); expandir esfria (o ar que sobe na atmosfera)."
  - "Joule mostrou que trabalho e calor são duas formas de transferir a mesma coisa: energia."
levels: [zero, technical]
consensus: established
tags:
  area: physics/thermodynamics
  topics: [heat, energy, conservation-laws]
  era: nineteenth-century
  people: [james-prescott-joule, julius-robert-mayer, hermann-von-helmholtz, rudolf-clausius]
  events: [joule-equivalent, helmholtz-conservation]
equations:
  - tex: \Delta U = Q - W
    spoken: "delta U é igual a Q menos W"
  - tex: W = n R T \ln\frac{V_2}{V_1}
    spoken: "W é igual a n R T vezes logaritmo natural de V dois sobre V um"
claims:
  - text: "Um mol de gás ideal a 300 K que dobra de volume a temperatura constante realiza cerca de 1,73 kJ de trabalho"
    type: number
    check: compute
    formula: isothermal_doubling_work_300k
    expected: 1729
    unit: J
    tolerance: 0.002
    status: verified
  - text: "Joule mediu o equivalente mecânico do calor a partir de 1843; o experimento das pás girando na água, apresentado em 1845, foi refinado nas décadas seguintes"
    type: attribution
    check: source
    sources: ["https://www.chemteam.info/Chem-History/Joule-Heat-1845.html", "https://www.britannica.com/biography/James-Prescott-Joule"]
    status: verified
  - text: "Julius Robert Mayer publicou em 1842 o enunciado da conservação da energia incluindo o calor"
    type: date
    check: source
    sources: ["https://encyclopedia.com/science/dictionaries-thesauruses-pictures-and-press-releases/mayer-julius-robert", "https://galileo.phys.virginia.edu/classes/152.mf1i.spring02/MayerJoule.htm"]
    status: verified
resources:
  - kind: read
    title: "3.4: Primeira Lei da Termodinâmica (Física Universitária II, OpenStax/LibreTexts)"
    url: "https://query.libretexts.org/Idioma_Portugues/Fisica_Universitaria_II_-_Termodinamica_Eletricidade_e_Magnetismo_(OpenStax)/03:_A_Primeira_Lei_da_Termodinamica/3.04:_Primeira_Lei_da_Termodin%C3%A2mica"
    level: intermediate
    lang: pt
    checked_at: 2026-11-03
  - kind: study
    title: "Propriedades dos Gases (PhET: trabalho PV, lei do gás ideal)"
    url: "https://phet.colorado.edu/pt_BR/simulations/gas-properties"
    level: zero
    lang: pt
    checked_at: 2026-11-03
  - kind: read
    title: "Feynman Lectures Vol. I Ch. 44: The Laws of Thermodynamics (44-1 Heat engines; the first law)"
    url: "https://www.feynmanlectures.caltech.edu/I_44.html"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: study
    title: "MIT OCW 5.60 Thermodynamics & Kinetics (Spring 2008)"
    url: "https://ocw.mit.edu/courses/5-60-thermodynamics-kinetics-spring-2008/"
    level: technical
    lang: en
    checked_at: 2026-11-03
  - kind: watch
    title: "Thermodynamics: Crash Course Physics #23"
    url: "https://www.youtube.com/watch?v=4i1MUWJoI0U"
    level: zero
    lang: en
    checked_at: 2026-11-03
review:
  status: auto_checked
  checked_at: 2026-11-03
  reviewer: null
---

## Intuição

Há dois jeitos de mudar a energia de um gás: aquecer (calor) ou empurrar o pistão (trabalho). A primeira lei é a conta do caixa: a energia interna sobe com o que entra e desce com o que sai.

Encha um pneu com uma bomba manual e a bomba esquenta: você fez trabalho sobre o ar, e ele virou energia interna. No sentido contrário, o ar que sobe na atmosfera se expande e esfria: ele faz trabalho empurrando o ar em volta e paga com a própria energia. É por isso que o topo das montanhas é frio.

No século XIX, Joule fez pás girarem dentro de um tanque de água com pesos que caíam, e mediu a água esquentando. A mesma quantidade de trabalho sempre dava o mesmo aquecimento: calor e trabalho eram moedas da mesma energia.

## Equação

$$
\Delta U = Q - W
$$

```lab
pv
```

## Variáveis

| Símbolo | Significado | Unidade |
| --- | --- | --- |
| $\Delta U$ | variação da energia interna | J |
| $Q$ | calor recebido pelo sistema | J |
| $W$ | trabalho feito pelo sistema (expandindo) | J |
| $n$ | número de mols | mol |
| $R$ | constante dos gases, 8,314 | J/(mol·K) |
| $V$ | volume | m³ |

## Exemplo

Um mol de gás a 300 K dobra de volume sem mudar a temperatura. O trabalho é $8{,}314 \times 300 \times \ln 2 \approx 1{,}73$ kJ. Como a temperatura não mudou, a energia interna de um gás ideal também não; então o gás precisou receber 1,73 kJ de calor, exatamente o que gastou empurrando.

## Onde isso volta

Máquinas térmicas (motor, geladeira, usina) vivem de transformar calor em trabalho e vice-versa. A segunda lei diz quanto dessa conversão é possível.

## Pergunta-ponte

Se trabalho vira calor facilmente (é só esfregar as mãos), por que calor não vira trabalho com a mesma facilidade?

## Evite dizer / diga

| Evite dizer | Diga |
| --- | --- |
| "o gás tem calor e trabalho" | "o gás tem energia interna; calor e trabalho são formas de trocá-la" |
| "comprimir aquece porque o ar fica apertado" | "comprimir aquece porque o trabalho feito sobre o gás vira energia interna" |

## Nível técnico

Na forma diferencial, para processo quase-estático, $\mathrm{d}U = \delta Q - p\,\mathrm{d}V$; $U$ é função de estado, mas $Q$ e $W$ dependem do caminho (por isso $\delta$). Para gás ideal monoatômico, $U = \tfrac32 nRT$. Num processo adiabático reversível de um gás ideal, $pV^\gamma$ é constante, com $\gamma = C_p/C_v = 5/3$ para gás monoatômico. A convenção de sinal varia: em química, muitas vezes se escreve $\Delta U = Q + W$, com $W$ o trabalho feito sobre o sistema.
