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

Uma afirmação só fica `verified` se a checagem rodou de fato.

## Revisão

1. Cada revisor entra em `data/reviewers.yaml` com id, nome, usuário do GitHub e áreas.
2. Quem revisa uma afirmação preenche `reviewed_by` nela.
3. Uma página só fica `human_reviewed` com o id do revisor em `review.reviewer`.
4. Revisões entram por PR; o CI valida antes do merge.

## Rodando

```bash
pip install -r requirements.txt
python scripts/validate.py
python scripts/check_numbers.py
python scripts/coverage.py
python scripts/export_site.py
bash site/setup_quartz.sh
```

O site sai em `site/public`. O Quartz fica fixado na versão v4.5.2.

## Publicação

No GitHub, ative Pages com a fonte "GitHub Actions" (Settings > Pages). A cada push na `main`, o `pages.yml` valida, gera e publica o site. O `checks.yml` roda as checagens em todo PR e toda segunda-feira, e coloca o relatório e a cobertura no resumo da execução.

## Novo conceito

1. Confira se o conceito já está em `data/map.yaml`; se não, inclua com os pré-requisitos.
2. Copie `docs/concept-template.md` para `content/concepts/<id>.md`.
3. Preencha o frontmatter e as seções. Números entram em `claims` com `check: compute` e uma fórmula em `scripts/formulas.py`.
4. Rode `python scripts/validate.py` e `python scripts/check_numbers.py` antes de abrir o PR.
