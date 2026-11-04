import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

type Ref = { id: string; title: string; written: boolean }
type WindowNode = Ref & { current: boolean; n: number }
type Trail = { id: string; title: string; pos: number; total: number; window: WindowNode[] }
type Card = { id: string; title: string; summary: string; total: number; written: number; ids: string[] }
type TrailNode = Ref & { n: number; layer: number; module: string }

const REVIEW: Record<string, string> = {
  draft: "rascunho",
  auto_checked: "checado automaticamente",
  human_reviewed: "revisado por uma pessoa",
}

function ConceptLink({ from, item }: { from: string; item: Ref }) {
  if (!item.written) return <span class="wv-chip planned">{item.title}</span>
  return (
    <a class="wv-chip internal" href={resolveRelative(from as FullSlug, `concepts/${item.id}` as FullSlug)}>
      {item.title}
    </a>
  )
}

function Strip({ from, trail }: { from: string; trail: Trail }) {
  const n = trail.window.length
  const W = 520
  const step = W / n
  const x = (i: number) => step / 2 + i * step
  return (
    <svg class="wv-strip" viewBox={`0 0 ${W} 64`} role="img" aria-label={`Posição na trilha ${trail.title}`}>
      <line x1={x(0)} x2={x(n - 1)} y1="26" y2="26" class="wv-path" />
      {trail.window.map((w, i) => {
        const dot = (
          <g class={`wv-star${w.current ? " current" : ""}${w.written ? "" : " planned"}`} data-id={w.id}>
            <title>{`${w.n}. ${w.title}${w.written ? "" : " (em breve)"}`}</title>
            {w.current && <circle cx={x(i)} cy="26" r="17" class="wv-halo" />}
            <circle cx={x(i)} cy="26" r={w.current ? 9 : 6} class="wv-dot" />
            <text x={x(i)} y="58" class="wv-num">
              {w.n}
            </text>
          </g>
        )
        return w.written && !w.current ? (
          <a href={resolveRelative(from as FullSlug, `concepts/${w.id}` as FullSlug)}>{dot}</a>
        ) : (
          dot
        )
      })}
    </svg>
  )
}

function ConceptHeader({ from, data }: { from: string; data: any }) {
  const trails: Trail[] = data.trails ?? []
  const primary = trails[0]
  const before: Ref[] = data.before ?? []
  const after: Ref[] = data.after ?? []
  return (
    <div class="wv-concept">
      <p class="wv-kicker">
        <span>{data.module}</span>
        <span class={`wv-badge ${data.review}`}>{REVIEW[data.review] ?? data.review}</span>
        <span class="wv-badge">{data.consensus}</span>
      </p>
      {primary && (
        <div class="wv-trailbox">
          <Strip from={from} trail={primary} />
          <p class="wv-trailnote">
            <a class="internal" href={resolveRelative(from as FullSlug, `trails/${primary.id}` as FullSlug)}>
              {primary.title}
            </a>{" "}
            · conceito {primary.pos} de {primary.total}
            {trails.length > 1 && (
              <span class="wv-also">
                {" "}
                · também em{" "}
                {trails.slice(1, 4).map((t, i) => (
                  <>
                    {i > 0 && ", "}
                    <a class="internal" href={resolveRelative(from as FullSlug, `trails/${t.id}` as FullSlug)}>
                      {t.title}
                    </a>
                  </>
                ))}
                {trails.length > 4 && ` e mais ${trails.length - 4}`}
              </span>
            )}
          </p>
        </div>
      )}
      {(before.length > 0 || after.length > 0) && (
        <div class="wv-nav">
          {before.length > 0 && (
            <div>
              <span class="wv-label">Antes</span>
              {before.map((b) => (
                <ConceptLink from={from} item={b} />
              ))}
            </div>
          )}
          {after.length > 0 && (
            <div>
              <span class="wv-label">Depois</span>
              {after.map((b) => (
                <ConceptLink from={from} item={b} />
              ))}
            </div>
          )}
        </div>
      )}
      {(data.era || (data.people ?? []).length > 0) && (
        <p class="wv-history">
          {data.era && (
            <>
              <span class="wv-label">Época</span>
              <a class="internal" href={resolveRelative(from as FullSlug, "timeline" as FullSlug) + "#" + data.era.anchor}>
                {data.era.title}
              </a>
            </>
          )}
          {(data.people ?? []).length > 0 && (
            <>
              <span class="wv-label">Pessoas</span>
              {data.people.map((p: { id: string; name: string }, i: number) => (
                <>
                  {i > 0 && ", "}
                  <a class="internal" href={resolveRelative(from as FullSlug, `people/${p.id}` as FullSlug)}>
                    {p.name}
                  </a>
                </>
              ))}
            </>
          )}
        </p>
      )}
    </div>
  )
}

function Cards({ from, cards }: { from: string; cards: Card[] }) {
  return (
    <div class="wv-cards">
      {cards.map((c) => (
        <a class="wv-card internal" href={resolveRelative(from as FullSlug, `trails/${c.id}` as FullSlug)} data-ids={c.ids.join(" ")}>
          <span class="wv-card-title">{c.title}</span>
          <span class="wv-card-summary">{c.summary}</span>
          <span class="wv-meter" aria-hidden="true">
            <i style={`width:${Math.round((c.written / c.total) * 100)}%`} />
          </span>
          <span class="wv-card-foot">
            <span>
              {c.written} de {c.total} escritos
            </span>
            <span class="wv-card-progress" />
          </span>
        </a>
      ))}
    </div>
  )
}

function Home({ from, data }: { from: string; data: any }) {
  const s = data.stats
  const first: Card = data.trails[0]
  return (
    <>
      <section class="wv-hero">
        <p class="wv-eyebrow">Wiki de Conceitos · física</p>
        <h1>Do primeiro conceito às fronteiras da física</h1>
        <p class="wv-lede">
          Cada ideia explicada do zero ao técnico, na ordem certa, com a história de quem a descobriu, a equação lida em voz alta,
          laboratórios para mexer e a checagem de cada afirmação.
        </p>
        <div class="wv-cta">
          <a class="wv-btn primary internal" href={resolveRelative(from as FullSlug, `trails/${first.id}` as FullSlug)}>
            Começar do zero
          </a>
          <a class="wv-btn internal" href={resolveRelative(from as FullSlug, "roadmap" as FullSlug)}>
            Ver as trilhas
          </a>
          <a class="wv-btn internal" href={resolveRelative(from as FullSlug, "timeline" as FullSlug)}>
            Linha do tempo
          </a>
          <a class="wv-btn internal" href={resolveRelative(from as FullSlug, "playground" as FullSlug)}>
            Parquinho
          </a>
        </div>
        <dl class="wv-stats">
          <div>
            <dt>conceitos escritos</dt>
            <dd>
              {s.written}
              <small> de {s.mapped}</small>
            </dd>
          </div>
          <div>
            <dt>afirmações verificadas</dt>
            <dd>{s.verified}</dd>
          </div>
          <div>
            <dt>trilhas</dt>
            <dd>{s.trails}</dd>
          </div>
          <div>
            <dt>pessoas na história</dt>
            <dd>{s.people}</dd>
          </div>
        </dl>
      </section>
      <h2 class="wv-section">Trilhas</h2>
      <Cards from={from} cards={data.trails} />
    </>
  )
}

function layout(nodes: TrailNode[], edges: [string, string][]) {
  const rows: TrailNode[][] = []
  nodes.forEach((n) => (rows[n.layer] ??= []).push(n))
  const pos: Record<string, number> = {}
  const parents: Record<string, string[]> = {}
  edges.forEach(([a, b]) => (parents[b] ??= []).push(a))
  rows.forEach((row) => {
    row.sort((p, q) => {
      const bary = (n: TrailNode) => {
        const ps = parents[n.id] ?? []
        return ps.length ? ps.reduce((s, x) => s + pos[x], 0) / ps.length : 0.5
      }
      return bary(p) - bary(q)
    })
    row.forEach((n, i) => (pos[n.id] = (i + 1) / (row.length + 1)))
  })
  return { rows, pos }
}

function TrailMap({ from, data }: { from: string; data: any }) {
  const nodes: TrailNode[] = data.nodes
  const edges: [string, string][] = data.edges
  const { rows, pos } = layout(nodes, edges)
  const W = 720
  const RH = 70
  const H = rows.length * RH + 20
  const byId: Record<string, TrailNode> = {}
  nodes.forEach((n) => (byId[n.id] = n))
  const X = (id: string) => 20 + pos[id] * (W - 40)
  const Y = (id: string) => 36 + byId[id].layer * RH
  return (
    <figure class="wv-map">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Mapa da trilha">
        {edges.map(([a, b]) => (
          <line x1={X(a)} y1={Y(a)} x2={X(b)} y2={Y(b)} class="wv-edge" />
        ))}
        {nodes.map((n) => {
          const g = (
            <g class={`wv-star${n.written ? "" : " planned"}`} data-id={n.id}>
              <title>{`${n.n}. ${n.title}${n.written ? "" : " (em breve)"}`}</title>
              <circle cx={X(n.id)} cy={Y(n.id)} r="14" class="wv-dot" />
              <text x={X(n.id)} y={Y(n.id) + 4} class="wv-n">
                {n.n}
              </text>
            </g>
          )
          return n.written ? <a href={resolveRelative(from as FullSlug, `concepts/${n.id}` as FullSlug)}>{g}</a> : g
        })}
      </svg>
      <figcaption>
        <span class="wv-key written" /> escrito <span class="wv-key planned" /> em breve <span class="wv-key studied" /> estudado ·
        cada número corresponde à tabela abaixo
      </figcaption>
    </figure>
  )
}

function Timeline({ from, data }: { from: string; data: any }) {
  return (
    <ol class="wv-timeline">
      {data.eras.map((era: any) => (
        <li class="wv-era" id={era.anchor}>
          <span class="wv-era-dot" aria-hidden="true" />
          <p class="wv-span">{era.span}</p>
          <h2>{era.title}</h2>
          {era.events.length > 0 && (
            <ul class="wv-events">
              {era.events.map((e: any) => (
                <li>
                  <span>{e.title}</span>
                  {e.concepts.length > 0 && (
                    <span class="wv-event-links">
                      {e.concepts.map((c: Ref) => (
                        <ConceptLink from={from} item={c} />
                      ))}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
          {era.people.length > 0 && (
            <p class="wv-people">
              {era.people.map((p: { id: string; name: string }) => (
                <a class="wv-person internal" href={resolveRelative(from as FullSlug, `people/${p.id}` as FullSlug)}>
                  {p.name}
                </a>
              ))}
            </p>
          )}
          {era.superseded.length > 0 && (
            <ul class="wv-superseded">
              {era.superseded.map((x: any) => (
                <li>
                  <s>{x.title}</s> <span aria-hidden="true">→</span> <ConceptLink from={from} item={x.by} />
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ol>
  )
}

const WikiViews: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const data = fileData.frontmatter?.wiki as any
  const from = fileData.slug ?? ""
  if (!data) return <></>
  switch (data.kind) {
    case "concept":
      return <ConceptHeader from={from} data={data} />
    case "home":
      return <Home from={from} data={data} />
    case "roadmap":
      return (
        <>
          <p class="wv-intro">{data.intro}</p>
          <Cards from={from} cards={data.trails} />
        </>
      )
    case "trail":
      return (
        <>
          <p class="wv-intro">{data.intro}</p>
          <TrailMap from={from} data={data} />
        </>
      )
    case "timeline":
      return (
        <>
          <p class="wv-intro">{data.intro}</p>
          <Timeline from={from} data={data} />
        </>
      )
    default:
      return <></>
  }
}

export default (() => WikiViews) satisfies QuartzComponentConstructor
