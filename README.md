# Wiki de Conceitos

Física explicada do zero ao técnico, conceito por conceito, ligada por um mapa de pré-requisitos e por uma camada histórica: quem descobriu, quando, e quais ideias ficaram para trás. Serve para quem está começando e para quem já estudou e quer recapitular.

Cada conceito tem uma revisão rápida, equações com pronúncia, exemplos calculados por código, laboratórios interativos, materiais para assistir, ler e estudar, e a lista das afirmações com o status da checagem.

## Estrutura

```
data/map.yaml              o mapa: módulos, conceitos (escritos e planejados) e pré-requisitos
data/trails.yaml           trilhas de estudo, definidas pelos conceitos de chegada
data/history/              épocas, pessoas, acontecimentos e ideias superadas
data/reviewers.yaml        quem pode revisar
data/tags.yaml             vocabulário controlado de tags
data/symbols.yaml          como ler cada símbolo em voz alta
content/concepts/<id>.md   um arquivo por conceito escrito
schema/concept.schema.json esquema do frontmatter
scripts/                   validação, checagens, banco e exportação
site/                      build do site (Quartz) e componentes próprios
.github/workflows/         checagens a cada PR e toda segunda; deploy no GitHub Pages
```

O mapa é a fonte única do grafo. Um conceito pode existir no mapa antes de ter página: aparece como "em breve" no roadmap e conta na cobertura.

## Um conceito

- `recap`: duas a quatro frases para revisão rápida, mostradas no topo da página.
- `consensus`: estabelecido, consenso amplo, em debate, especulativo ou superado.
- `tags`: área, tópicos, época, pessoas e acontecimentos (os três últimos precisam existir em `data/history/`).
- `equations`: TeX e leitura em voz alta; a seção de pronúncia é gerada daqui.
- `claims`: afirmações factuais com tipo, forma de checagem, status, fontes e quem revisou.
- `resources`: materiais com tipo, nível, idioma e data da última conferência.

O corpo segue sempre as mesmas seções: Intuição, Equação, Variáveis, Exemplo, Onde isso volta, Pergunta-ponte, Evite dizer / diga e, quando houver, Nível técnico.

## Checagens

| Script | O que faz |
| --- | --- |
| `validate.py` | esquema, mapa sem ciclos, trilhas, camada histórica, tags, seções obrigatórias, revisores |
| `check_numbers.py` | recalcula cada afirmação numérica com as fórmulas de `formulas.py` |
| `check_arxiv.py` | confere na API do arXiv se o ID existe e o título bate |
| `check_links.py` | abre cada link de material |
| `report.py` | afirmações por status e o que está pendente |
| `build_db.py` | gera `build/wiki.sqlite` com tudo (conceitos, mapa, história, afirmações, materiais) |
| `coverage.py` | cobertura por módulo e por trilha, e quais conceitos já podem ser escritos |

`verified` significa revisão com evidência registrada, não apenas um link ou cálculo correto.
`calculated` identifica um cálculo conferido; `reference_checked` identifica uma referência
conferida por título. Nenhum desses dois estados certifica a explicação científica.
Resultados de cada execução ficam em `build/checks/`, com data, impressão digital do
conteúdo e resultados `passed`, `failed` ou `inconclusive`. Resultados antigos (mais de
24 horas) ou de outro conteúdo não são apresentados como atuais no relatório.

A migração de novembro de 2026 preserva fontes, mas devolve para `pending` as afirmações
sem evidência de revisão estruturada. Isso não significa que sejam falsas.

## Revisão

1. Cada revisor entra em `data/reviewers.yaml` com id, nome, usuário do GitHub e áreas.
2. Cada afirmação tem um `id` estável; não renumere ids existentes. Separe afirmações
   compostas quando as evidências sustentarem partes diferentes.
3. Quem revisa preenche `reviewed_by` e `evidence`: `source` (presente em `sources`),
   `locator` (página/seção), `support` (como a fonte sustenta a afirmação e suas ressalvas),
   `checked_at` (AAAA-MM-DD), `claim_hash` e `content_hash`. Não invente evidência para
   satisfazer o validador. Após a leitura, obtenha os hashes com
   `python scripts/review_fingerprint.py <conceito> <claim-id>`.
   Edits na afirmação, pressupostos, resumo, equações ou corpo invalidam a revisão.
4. Use `covers: [definition, equation, recap]` somente para os aspectos realmente
   sustentados pela evidência. Uma página `human_reviewed` exige revisor e cobertura
   verificada dos três aspectos. O relatório mostra lacunas nos rascunhos.
5. Registre hipóteses em `assumptions`. Evidência sobre um exemplo numérico ou uma data
   histórica não substitui a revisão da explicação principal.
6. Revisões entram por PR; o CI valida antes do merge.

## Rodando

```bash
pip install -r requirements.txt
python scripts/validate.py
python scripts/check_numbers.py
python scripts/coverage.py
python scripts/export_site.py
bash site/setup_quartz.sh
```

No Windows, use o ambiente local para evitar os aliases da Microsoft Store:

```powershell
.\.venv\Scripts\python.exe scripts/validate.py
.\.venv\Scripts\python.exe scripts/check_numbers.py
.\.venv\Scripts\python.exe -m unittest discover -s tests
node --test tests/labs.test.cjs
```

Os testes de laboratório exercitam o relógio em diferentes taxas de atualização,
o integrador RK4 e o exemplo da ação contra soluções analíticas. Isso é cobertura
parcial: os demais laboratórios ainda precisam de casos de referência e testes físicos.

O site sai em `site/public`. O Quartz fica fixado na versão v4.5.2.

## Publicação

No GitHub, ative Pages com a fonte "GitHub Actions" (Settings > Pages). O `pages.yml`
executa o workflow reutilizável `checks.yml` no mesmo commit antes de gerar e publicar.
Falhas ou resultados inconclusivos de rede bloqueiam publicação; tente novamente após
falhas temporárias. As verificações incluem URLs de fontes e materiais, com tentativas
adicionais para indisponibilidade temporária. Relatórios e resultados são preservados
mesmo quando uma checagem falha. Rascunhos com revisão pendente continuam publicáveis,
explicitamente identificados, enquanto conteúdo que se declara revisado deve comprovar isso.

## Novo conceito

1. Confira se o conceito já está em `data/map.yaml`; se não, inclua com os pré-requisitos.
2. Copie `docs/concept-template.md` para `content/concepts/<id>.md`.
3. Preencha o frontmatter e as seções. Números entram em `claims` com `check: compute` e uma fórmula em `scripts/formulas.py`.
4. Rode `python scripts/validate.py` e `python scripts/check_numbers.py` antes de abrir o PR.
