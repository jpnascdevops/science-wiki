# Wiki de Conceitos

Conceitos de física explicados do zero ao técnico, ligados por um roadmap de pré-requisitos. Cada conceito tem equações com pronúncia, exemplos calculados por código, tags, materiais de estudo e a lista das afirmações que precisam de checagem.

O primeiro tema é o paradoxo da informação: 18 conceitos, de "Como ler uma equação" até "Replica wormholes".

## Estrutura

```
content/concepts/<id>.md   um arquivo por conceito (frontmatter + texto)
schema/concept.schema.json esquema do frontmatter
data/tags.yaml             vocabulário controlado de tags
data/symbols.yaml          como ler cada símbolo em voz alta
scripts/                   validação, checagens e exportação
site/                      configuração e build do site (Quartz)
.github/workflows/         CI: checagens a cada PR e toda segunda; deploy no GitHub Pages
```

## Um conceito

O frontmatter guarda os dados; o corpo guarda a explicação.

- `prerequisites` monta o roadmap. `leads_to` precisa bater com quem depende do conceito; o validador confere.
- `equations` traz o TeX e a leitura em voz alta. A seção "Como ler as equações em voz alta" do site é gerada daqui, com a tabela de símbolos vinda de `data/symbols.yaml`.
- `claims` lista as afirmações factuais, cada uma com tipo, forma de checagem e status.
- `resources` traz os materiais (assistir, ler, estudar), com nível, idioma e data da última conferência.

O corpo segue sempre as mesmas seções: Intuição, Equação, Variáveis, Exemplo, Onde isso volta, Pergunta-ponte, Evite dizer / diga e, quando houver nível técnico, Nível técnico.

## Checagens

| Script | O que faz |
| --- | --- |
| `validate.py` | esquema, tags no vocabulário, seções obrigatórias, referências entre conceitos, ciclos no roadmap |
| `check_numbers.py` | recalcula cada afirmação numérica com as fórmulas de `formulas.py` |
| `check_arxiv.py` | confere na API do arXiv se o ID existe e o título bate |
| `check_links.py` | abre cada link de material |
| `report.py` | resumo das afirmações por status e lista do que está pendente |

Regra: uma afirmação só fica `verified` se a checagem rodou de fato. Afirmações conceituais ficam `pending` até passar por um revisor (`verifier` ou `human`).

## Rodando

```bash
pip install -r requirements.txt
cd scripts
python validate.py
python check_numbers.py
python check_arxiv.py
python check_links.py
python report.py
python export_site.py
cd ..
bash site/setup_quartz.sh
```

O site sai em `site/public`. O Quartz fica fixado na versão v4.5.2.

## Publicação

No GitHub, ative Pages com a fonte "GitHub Actions" (Settings > Pages). A cada push na `main`, o workflow `pages.yml` valida, gera e publica o site. O `checks.yml` roda as checagens em todo PR e toda segunda-feira, e coloca o relatório no resumo da execução.

## Novo conceito

1. Copie `docs/concept-template.md` para `content/concepts/<id>.md`.
2. Preencha o frontmatter e as seções. Números entram em `claims` com `check: compute` e uma fórmula em `scripts/formulas.py`.
3. Rode `python scripts/validate.py` e `python scripts/check_numbers.py` antes de abrir o PR.
