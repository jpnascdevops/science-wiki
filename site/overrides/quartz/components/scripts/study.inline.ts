const STUDIED_KEY = "wiki-studied"
const LEVEL_KEY = "wiki-level"

function readStudied(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(STUDIED_KEY) ?? "[]"))
  } catch {
    return new Set()
  }
}

function writeStudied(s: Set<string>) {
  try {
    localStorage.setItem(STUDIED_KEY, JSON.stringify([...s]))
  } catch {}
}

function readLevel(): string {
  try {
    return localStorage.getItem(LEVEL_KEY) ?? "technical"
  } catch {
    return "technical"
  }
}

function writeLevel(v: string) {
  try {
    localStorage.setItem(LEVEL_KEY, v)
  } catch {}
}

function idFromLink(a: Element | null | undefined): string | null {
  if (!a) return null
  const slug = (a as HTMLElement).dataset.slug ?? a.getAttribute("href") ?? ""
  const last = slug.split("/").pop() ?? ""
  return /^[a-z0-9-]+$/.test(last) ? last : null
}

function sectionNodes(heading: Element): Element[] {
  const nodes: Element[] = [heading]
  let n = heading.nextElementSibling
  while (n && n.tagName !== "H2") {
    nodes.push(n)
    n = n.nextElementSibling
  }
  return nodes
}

function setupConceptPage(bar: HTMLElement) {
  const id = bar.dataset.id!
  const studyBtn = bar.querySelector<HTMLButtonElement>(".study-toggle")!
  const paint = () => {
    const on = readStudied().has(id)
    studyBtn.classList.toggle("on", on)
    studyBtn.textContent = on ? "Estudado" : "Marcar como estudado"
    studyBtn.setAttribute("aria-pressed", String(on))
  }
  const toggle = () => {
    const s = readStudied()
    s.has(id) ? s.delete(id) : s.add(id)
    writeStudied(s)
    paint()
    paintStars()
  }
  studyBtn.addEventListener("click", toggle)
  window.addCleanup(() => studyBtn.removeEventListener("click", toggle))
  paint()

  const technical = [...document.querySelectorAll("article h2")].find((h) =>
    (h.textContent ?? "").trim().startsWith("Nível técnico"),
  )
  const levelBtns = bar.querySelectorAll<HTMLButtonElement>(".level-btn")
  if (!technical) {
    bar.querySelector(".level-switch")?.remove()
    return
  }
  const nodes = sectionNodes(technical)
  const apply = (level: string) => {
    nodes.forEach((n) => ((n as HTMLElement).hidden = level === "zero"))
    levelBtns.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.level === level)))
  }
  levelBtns.forEach((b) => {
    const handler = () => {
      writeLevel(b.dataset.level!)
      apply(b.dataset.level!)
    }
    b.addEventListener("click", handler)
    window.addCleanup(() => b.removeEventListener("click", handler))
  })
  apply(readLevel())
}

function setupRoadmap() {
  document.querySelectorAll(".roadmap-progress").forEach((n) => n.remove())
  const tables = [...document.querySelectorAll("article table")].filter(
    (t) => (t.querySelector("th")?.textContent ?? "").trim() === "#",
  )
  tables.forEach(setupTrailTable)
}

function setupTrailTable(table: Element) {
  const studied = readStudied()
  const rows = [...table.querySelectorAll("tbody tr")]
  const info = rows.map((tr) => {
    const cells = tr.querySelectorAll("td")
    const id = idFromLink(cells[1]?.querySelector("a"))
    const pres = [...(cells[3]?.querySelectorAll("a") ?? [])].map((a) => idFromLink(a)).filter((x) => x)
    return { tr, id, pres }
  })
  let next: string | null = null
  for (const r of info) {
    if (!r.id) continue
    const done = studied.has(r.id)
    r.tr.classList.toggle("row-studied", done)
    r.tr.classList.remove("row-next")
    if (!done && !next && r.pres.every((p) => p && studied.has(p))) {
      next = r.id
      r.tr.classList.add("row-next")
    }
  }
  const total = info.filter((r) => r.id).length
  const count = info.filter((r) => r.id && studied.has(r.id)).length
  const box = document.createElement("div")
  box.className = "roadmap-progress"
  const pct = total ? Math.round((count / total) * 100) : 0
  const nextRow = info.find((r) => r.id === next)
  const nextLink = nextRow?.tr.querySelectorAll("td")[1]?.querySelector("a")
  box.innerHTML = `<div class="rp-head"><b>${count} de ${total} conceitos disponíveis estudados</b><span>${pct}%</span></div><div class="rp-bar"><i style="width:${pct}%"></i></div>`
  const p = document.createElement("p")
  if (nextLink) {
    p.append("Próximo recomendado: ")
    const a = nextLink.cloneNode(true) as HTMLAnchorElement
    p.append(a)
  } else if (count === total && total > 0) {
    p.textContent = "Trilha completa."
  } else {
    p.textContent = "Marque os conceitos como estudados na página de cada um."
  }
  box.appendChild(p)
  table.parentElement?.insertBefore(box, table)
}

function paintStars() {
  const studied = readStudied()
  document.querySelectorAll<SVGGElement>(".wv-star[data-id]").forEach((g) => {
    g.classList.toggle("studied", studied.has(g.dataset.id!) && !g.classList.contains("current"))
  })
}

function paintCards() {
  const studied = readStudied()
  document.querySelectorAll<HTMLElement>(".wv-card[data-ids]").forEach((card) => {
    const ids = (card.dataset.ids ?? "").split(" ").filter((x) => x)
    const count = ids.filter((id) => studied.has(id)).length
    const out = card.querySelector(".wv-card-progress")
    if (out) out.textContent = count ? `${count} estudados` : ""
  })
}

document.addEventListener("nav", () => {
  const bar = document.querySelector<HTMLElement>(".study-tools")
  if (bar) setupConceptPage(bar)
  if (location.pathname.includes("/trails/")) setupRoadmap()
  paintStars()
  paintCards()
})
