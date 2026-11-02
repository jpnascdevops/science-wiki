const G = 6.6743e-11
const C = 2.99792458e8
const M_EARTH = 5.9722e24
const R_EARTH = 6.371e6
const R_JUP_IN_EARTH = 11.209
const R_SUN_IN_EARTH = 109.08
const PAGE_RATIO = 1.4847
const SVG_NS = "http://www.w3.org/2000/svg"

const fmt = (v: number, d = 1) => v.toLocaleString("pt-BR", { maximumFractionDigits: d })
const sci = (v: number) => {
  if (v < 1e6) return Math.round(v).toLocaleString("pt-BR")
  const e = Math.floor(Math.log10(v))
  return `${(v / 10 ** e).toFixed(1).replace(".", ",")} × 10^${e}`
}
const len = (r: number) =>
  r >= 1000 ? `${fmt(r / 1000, r >= 1e5 ? 0 : 1)} km` : r >= 1 ? `${fmt(r, 1)} m` : `${fmt(r * 1000, 1)} mm`

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string, text?: string) {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  if (text !== undefined) e.textContent = text
  return e
}

function svg(tag: string, attrs: Record<string, string | number>) {
  const e = document.createElementNS(SVG_NS, tag)
  for (const k in attrs) e.setAttribute(k, String(attrs[k]))
  return e
}

function frame(title: string) {
  const box = el("div", "lab")
  box.appendChild(el("div", "lab-title", title))
  return box
}

function slider(box: HTMLElement, label: string, min: number, max: number, value: number, step = 1) {
  const wrap = el("label", "lab-ctrl")
  const head = el("span", "lab-ctrl-head")
  const name = el("span", "", label)
  const out = el("span", "lab-ctrl-value")
  head.append(name, out)
  const input = el("input") as HTMLInputElement
  input.type = "range"
  input.min = String(min)
  input.max = String(max)
  input.step = String(step)
  input.value = String(value)
  wrap.append(head, input)
  box.appendChild(wrap)
  return { input, out }
}

function readouts(box: HTMLElement, labels: string[]) {
  const grid = el("div", "lab-readout")
  const values = labels.map((l) => {
    const cell = el("div")
    cell.appendChild(el("span", "", l))
    const b = el("b")
    cell.appendChild(b)
    grid.appendChild(cell)
    return b
  })
  box.appendChild(grid)
  return values
}

function note(box: HTMLElement) {
  const p = el("p", "lab-note")
  p.setAttribute("aria-live", "polite")
  box.appendChild(p)
  return p
}

function button(parent: HTMLElement, text: string, ghost = false) {
  const b = el("button", ghost ? "lab-btn ghost" : "lab-btn", text) as HTMLButtonElement
  b.type = "button"
  parent.appendChild(b)
  return b
}

function escapeVelocity(box: HTMLElement) {
  const rs = (2 * G * M_EARTH) / C ** 2
  const s = slider(box, "Raio da Terra (massa fixa)", 0, 1000, 0)
  const [rR, rV, rC] = readouts(box, ["Raio", "Velocidade de escape", "Fração da luz"])
  const bar = el("div", "lab-bar")
  const fill = el("i")
  bar.appendChild(fill)
  box.appendChild(bar)
  const msg = note(box)
  const render = () => {
    const f = Number(s.input.value) / 1000
    const r = Math.exp(Math.log(R_EARTH) + f * (Math.log(1e-3) - Math.log(R_EARTH)))
    const v = Math.sqrt((2 * G * M_EARTH) / r)
    const frac = v / C
    s.out.textContent = len(r)
    rR.textContent = len(r)
    rV.textContent = frac >= 1 ? "maior que a luz" : `${fmt(v / 1000, v < 1e5 ? 1 : 0)} km/s`
    rC.textContent = frac >= 1 ? "100% ou mais" : `${fmt(frac * 100, frac < 0.01 ? 4 : 1)}%`
    fill.style.width = `${Math.min(100, Math.max(0.5, frac * 100))}%`
    bar.classList.toggle("full", frac >= 1)
    msg.classList.toggle("alert", r <= rs)
    msg.textContent =
      r <= rs
        ? `Buraco negro: com ${len(rs)} de raio ou menos, nem a luz escapa. Esse é o raio de Schwarzschild da Terra.`
        : frac > 0.1
          ? "A luz ainda escapa, mas por pouco. Aqui a gravidade de Newton já não é precisa."
          : "Arraste para espremer a Terra. A massa fica igual; só o raio diminui."
  }
  s.input.addEventListener("input", render)
  render()
}

function lorentz(box: HTMLElement) {
  const s = slider(box, "Velocidade (fração da luz)", 0, 999, 100)
  const [rG, rT] = readouts(box, ["Fator γ", "1 hora sua equivale a"])
  const msg = note(box)
  const render = () => {
    const beta = Number(s.input.value) / 1000
    const g = 1 / Math.sqrt(1 - beta * beta)
    s.out.textContent = `${fmt(beta * 100, 1)}%`
    rG.textContent = fmt(g, g < 1.01 ? 4 : 2)
    const minutes = g * 60
    rT.textContent = minutes < 120 ? `${fmt(minutes, 2)} min fora da nave` : `${fmt(g, 1)} h fora da nave`
    msg.textContent =
      beta < 0.1
        ? "Abaixo de 10% da luz o efeito existe, mas é minúsculo. Newton funciona muito bem."
        : beta < 0.9
          ? "O efeito cresce aos poucos: não existe um ponto exato em que Newton para de valer."
          : "Perto da luz, γ dispara. Chegar a 100% exigiria energia infinita."
  }
  s.input.addEventListener("input", render)
  render()
}

function coins(box: HTMLElement) {
  const s = slider(box, "Número de moedas", 1, 60, 8)
  const row = el("div", "lab-coins")
  box.appendChild(row)
  const btns = el("div", "lab-btns")
  box.appendChild(btns)
  const shuffle = button(btns, "Jogar as moedas")
  const [rW, rS] = readouts(box, ["Arranjos possíveis (W)", "Entropia em bits"])
  const msg = note(box)
  const draw = () => {
    row.replaceChildren()
    for (let i = 0; i < Number(s.input.value); i++) {
      row.appendChild(el("span", Math.random() < 0.5 ? "coin heads" : "coin tails"))
    }
  }
  const render = () => {
    const n = Number(s.input.value)
    s.out.textContent = String(n)
    rW.textContent = sci(2 ** n)
    rS.textContent = `${n} bits`
    msg.textContent =
      n >= 40
        ? "Cada moeda a mais dobra os arranjos, mas soma só 1 bit. Por isso a entropia usa logaritmo."
        : `Moeda cheia é cara, vazada é coroa. Para dizer exatamente qual arranjo saiu, você precisa de ${n} ${n === 1 ? "pergunta" : "perguntas"} de sim ou não.`
    draw()
  }
  s.input.addEventListener("input", render)
  shuffle.addEventListener("click", draw)
  render()
}

function entangledPair(box: HTMLElement) {
  const pair = el("div", "lab-pair")
  const a = el("div", "lab-particle")
  a.appendChild(el("span", "", "Partícula A (fora)"))
  const va = el("b", "", "?")
  a.appendChild(va)
  const b = el("div", "lab-particle")
  b.appendChild(el("span", "", "Partícula B (dentro)"))
  const vb = el("b", "", "?")
  b.appendChild(vb)
  pair.append(a, el("span", "lab-thread", "emaranhadas"), b)
  box.appendChild(pair)
  const btns = el("div", "lab-btns")
  box.appendChild(btns)
  const one = button(btns, "Medir um par")
  const hundred = button(btns, "Medir 100 pares", true)
  const reset = button(btns, "Zerar", true)
  const [rN, rA, rD] = readouts(box, ["Pares medidos", "A deu 0 / A deu 1", "A e B diferentes"])
  const msg = note(box)
  let n = 0
  let a0 = 0
  let a1 = 0
  const measure = () => {
    const r = Math.random() < 0.5 ? 0 : 1
    n++
    r === 0 ? a0++ : a1++
    return r
  }
  const show = (r: number | null) => {
    va.textContent = r === null ? "?" : String(r)
    vb.textContent = r === null ? "?" : String(1 - r)
    rN.textContent = String(n)
    rA.textContent = `${a0} / ${a1}`
    rD.textContent = `${n} de ${n}`
    msg.textContent =
      n === 0
        ? "Meça alguns pares. Olhe A sozinha e depois compare com B."
        : "Sozinha, A parece cara ou coroa (1 bit de entropia). Juntas, sempre combinam (entropia zero)."
  }
  one.addEventListener("click", () => show(measure()))
  hundred.addEventListener("click", () => {
    let r = 0
    for (let i = 0; i < 100; i++) r = measure()
    show(r)
  })
  reset.addEventListener("click", () => {
    n = a0 = a1 = 0
    show(null)
  })
  show(null)
}

function pageCurve(box: HTMLElement) {
  const W = 520
  const H = 280
  const x0 = 50
  const x1 = 500
  const y0 = 240
  const y1 = 20
  const ymax = 1.05
  const X = (t: number) => x0 + t * (x1 - x0)
  const Y = (v: number) => y0 - (v / ymax) * (y0 - y1)
  const sBH = (t: number) => Math.pow(Math.max(0, 1 - t), 2 / 3)
  const sH = (t: number) => PAGE_RATIO * (1 - sBH(t))
  const sP = (t: number) => Math.min(sH(t), sBH(t))
  const tPage = 1 - Math.pow(PAGE_RATIO / (1 + PAGE_RATIO), 1.5)
  const plot = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "lab-plot", role: "img", "aria-label": "Curva de Page" })
  for (const v of [0, 0.25, 0.5, 0.75, 1]) {
    plot.appendChild(svg("line", { x1: x0, x2: x1, y1: Y(v), y2: Y(v), class: "grid" }))
    const t = svg("text", { x: x0 - 8, y: Y(v) + 4, "text-anchor": "end", class: "tick" })
    t.textContent = v.toFixed(2)
    plot.appendChild(t)
    const tx = svg("text", { x: X(v), y: y0 + 18, "text-anchor": "middle", class: "tick" })
    tx.textContent = v.toFixed(2)
    plot.appendChild(tx)
  }
  plot.appendChild(svg("line", { x1: X(tPage), x2: X(tPage), y1: y1, y2: y0, class: "page-line" }))
  const tp = svg("text", { x: X(tPage) + 6, y: y1 + 12, class: "tick accent" })
  tp.textContent = `tempo de Page ≈ ${tPage.toFixed(2)}`
  plot.appendChild(tp)
  const pts = (f: (t: number) => number) => {
    const out: string[] = []
    for (let i = 0; i <= 300; i++) {
      const t = i / 300
      const v = f(t)
      if (v <= ymax) out.push(`${X(t).toFixed(1)},${Y(v).toFixed(1)}`)
    }
    return out.join(" ")
  }
  plot.appendChild(svg("polyline", { points: pts(sBH), class: "curve bh" }))
  plot.appendChild(svg("polyline", { points: pts(sH), class: "curve hawking" }))
  plot.appendChild(svg("polyline", { points: pts(sP), class: "curve page" }))
  const cursor = svg("line", { y1: y1, y2: y0, class: "cursor" })
  const dot = svg("circle", { r: 6, class: "dot" })
  plot.append(cursor, dot)
  box.appendChild(plot)
  const legend = el("div", "lab-legend")
  legend.innerHTML =
    '<span><i class="sw page"></i>Curva de Page</span><span><i class="sw hawking"></i>Conta de Hawking</span><span><i class="sw bh"></i>Capacidade do buraco negro</span>'
  box.appendChild(legend)
  const s = slider(box, "Vida do buraco negro (τ = t / t_evap)", 0, 1000, 300)
  const [rBH, rH, rP] = readouts(box, ["S_BH / S₀", "Hawking / S₀", "S(R) / S₀"])
  const msg = note(box)
  const render = () => {
    const t = Number(s.input.value) / 1000
    s.out.textContent = t.toFixed(3).replace(".", ",")
    rBH.textContent = sBH(t).toFixed(3).replace(".", ",")
    rH.textContent = sH(t).toFixed(3).replace(".", ",")
    rP.textContent = sP(t).toFixed(3).replace(".", ",")
    cursor.setAttribute("x1", String(X(t)))
    cursor.setAttribute("x2", String(X(t)))
    dot.setAttribute("cx", String(X(t)))
    dot.setAttribute("cy", String(Y(sP(t))))
    msg.textContent =
      t < tPage
        ? "Antes do tempo de Page, a conta de Hawking vale: cada partícula que sai deixa uma parceira dentro."
        : t < 1
          ? "Depois do tempo de Page, aparece a ilha e a curva desce. A conta de Hawking passa da capacidade do buraco negro, o que seria impossível."
          : "Evaporou: a radiação guarda toda a informação."
  }
  s.input.addEventListener("input", render)
  render()
}

function transit(box: HTMLElement) {
  const W = 520
  const H = 220
  const plot = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "lab-plot", role: "img", "aria-label": "Trânsito e curva de luz" })
  const star = svg("circle", { cx: 110, cy: 100, r: 70, class: "star" })
  const planet = svg("circle", { cx: 110, cy: 100, r: 6, class: "planet" })
  const curve = svg("polyline", { class: "curve page" })
  const base = svg("line", { x1: 220, x2: 500, y1: 60, y2: 60, class: "grid" })
  const lbl = svg("text", { x: 220, y: 40, class: "tick" })
  lbl.textContent = "brilho da estrela"
  plot.append(star, planet, base, curve, lbl)
  box.appendChild(plot)
  const sp = slider(box, "Raio do planeta (raios terrestres)", 5, 250, 10)
  const ss = slider(box, "Raio da estrela (raios solares)", 10, 300, 100)
  const [rD, rP, rR] = readouts(box, ["Profundidade", "Em partes por milhão", "Razão de raios"])
  const msg = note(box)
  let phase = 0
  const render = () => {
    const rp = Number(sp.input.value) / 10
    const rsun = Number(ss.input.value) / 100
    const ratio = rp / (rsun * R_SUN_IN_EARTH)
    const depth = ratio * ratio
    sp.out.textContent = `${fmt(rp, 1)} R⊕`
    ss.out.textContent = `${fmt(rsun, 2)} R☉`
    rD.textContent = `${fmt(depth * 100, depth < 0.001 ? 4 : 2)}%`
    rP.textContent = `${fmt(depth * 1e6, 0)} ppm`
    rR.textContent = fmt(ratio, 4)
    const starR = 70
    star.setAttribute("r", String(starR))
    planet.setAttribute("r", String(Math.max(1.5, ratio * starR)))
    const pts: string[] = []
    const drop = Math.min(130, Math.max(2, depth * 4000))
    for (let i = 0; i <= 280; i++) {
      const x = i / 280
      const inTransit = Math.abs(x - 0.5) < 0.12
      const edge = Math.abs(x - 0.5) > 0.1 ? (0.12 - Math.abs(x - 0.5)) / 0.02 : 1
      const y = 60 + (inTransit ? drop * Math.max(0, Math.min(1, edge)) : 0)
      pts.push(`${(220 + x * 280).toFixed(1)},${y.toFixed(1)}`)
    }
    curve.setAttribute("points", pts.join(" "))
    msg.textContent =
      rp >= 9
        ? "Um planeta do tamanho de Júpiter numa estrela como o Sol apaga cerca de 1% da luz: dá para ver até com telescópios pequenos."
        : "Um planeta como a Terra numa estrela como o Sol apaga menos de 0,01%. Por isso foi preciso ir ao espaço (Kepler, TESS)."
  }
  const animate = () => {
    phase = (phase + 0.004) % 1
    const x = 110 + (phase - 0.5) * 220
    planet.setAttribute("cx", String(x))
    if (box.isConnected) requestAnimationFrame(animate)
  }
  sp.input.addEventListener("input", render)
  ss.input.addEventListener("input", render)
  render()
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) requestAnimationFrame(animate)
}

function projectile(box: HTMLElement) {
  const W = 520
  const H = 230
  const X0 = 30
  const Y0 = 200
  const plot = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "lab-plot", role: "img", "aria-label": "Trajetória de um projétil" })
  const ground = svg("line", { x1: X0, x2: W - 10, y1: Y0, y2: Y0, class: "grid" })
  const ghost = svg("polyline", { class: "curve bh" })
  const path = svg("polyline", { class: "curve page" })
  const ball = svg("circle", { r: 5, class: "planet" })
  const tick = svg("text", { x: W - 10, y: Y0 + 18, class: "tick", "text-anchor": "end" })
  plot.append(ground, ghost, path, ball, tick)
  box.appendChild(plot)
  const sv = slider(box, "Velocidade de lançamento", 5, 40, 20)
  const sa = slider(box, "Ângulo", 5, 85, 45)
  const sg = slider(box, "Lugar", 0, 2, 0)
  const places: [string, number][] = [["Terra", 9.80665], ["Lua", 1.62], ["Marte", 3.71]]
  const [rR, rH, rT] = readouts(box, ["Alcance", "Altura máxima", "Tempo de voo"])
  const msg = note(box)
  const points = (v: number, deg: number, g: number, scale: number) => {
    const th = (deg * Math.PI) / 180
    const T = (2 * v * Math.sin(th)) / g
    const pts: string[] = []
    for (let i = 0; i <= 80; i++) {
      const t = (T * i) / 80
      const x = v * Math.cos(th) * t
      const y = v * Math.sin(th) * t - (g * t * t) / 2
      pts.push(`${(X0 + x * scale).toFixed(1)},${(Y0 - y * scale).toFixed(1)}`)
    }
    return pts
  }
  const render = () => {
    const v = Number(sv.input.value)
    const deg = Number(sa.input.value)
    const [place, g] = places[Number(sg.input.value)]
    const th = (deg * Math.PI) / 180
    const R = (v * v * Math.sin(2 * th)) / g
    const Hm = (v * Math.sin(th)) ** 2 / (2 * g)
    const T = (2 * v * Math.sin(th)) / g
    const maxR = (v * v) / g
    const scale = Math.min((W - X0 - 20) / maxR, (Y0 - 20) / ((v * v) / (2 * g)))
    sv.out.textContent = `${v} m/s`
    sa.out.textContent = `${deg}°`
    sg.out.textContent = place
    rR.textContent = `${fmt(R, 1)} m`
    rH.textContent = `${fmt(Hm, 1)} m`
    rT.textContent = `${fmt(T, 2)} s`
    tick.textContent = `escala: ${fmt(maxR, 0)} m no alcance máximo`
    ghost.setAttribute("points", points(v, 90 - deg, g, scale).join(" "))
    const pts = points(v, deg, g, scale)
    path.setAttribute("points", pts.join(" "))
    const [bx, by] = pts[pts.length - 1].split(",")
    ball.setAttribute("cx", bx)
    ball.setAttribute("cy", by)
    msg.textContent =
      deg === 45
        ? "45°: o maior alcance possível em terreno plano e sem ar."
        : `A linha tracejada é o lançamento a ${90 - deg}°: cai no mesmo ponto, mas ${deg < 45 ? "sobe mais e demora mais" : "vai mais baixo e chega antes"}.`
  }
  for (const s of [sv, sa, sg]) s.input.addEventListener("input", render)
  render()
}

const LABS: Record<string, [string, (box: HTMLElement) => void]> = {
  "escape-velocity": ["Laboratório: espremendo a Terra", escapeVelocity],
  lorentz: ["Laboratório: o tempo perto da luz", lorentz],
  coins: ["Laboratório: entropia com moedas", coins],
  "entangled-pair": ["Laboratório: medindo um par emaranhado", entangledPair],
  "page-curve": ["Laboratório: a curva de Page", pageCurve],
  transit: ["Laboratório: um planeta passando na frente da estrela", transit],
  projectile: ["Laboratório: lançando um projétil", projectile],
}

function mountLabs() {
  const blocks = document.querySelectorAll<HTMLElement>('pre[data-language="lab"], pre:has(> code.language-lab)')
  blocks.forEach((pre) => {
    const name = (pre.querySelector("code")?.textContent ?? "").trim()
    const lab = LABS[name]
    if (!lab) return
    const box = frame(lab[0])
    lab[1](box)
    const target = pre.closest("figure") ?? pre
    target.replaceWith(box)
  })
}

document.addEventListener("nav", mountLabs)
