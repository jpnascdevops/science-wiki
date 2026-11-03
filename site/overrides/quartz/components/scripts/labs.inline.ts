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
    rV.textContent = frac >= 1 ? "sem escape do horizonte" : `${fmt(v / 1000, v < 1e5 ? 1 : 0)} km/s`
    rC.textContent = frac >= 1 ? "extrapolação newtoniana ≥ 100%" : `${fmt(frac * 100, frac < 0.01 ? 4 : 1)}%`
    fill.style.width = `${Math.min(100, Math.max(0.5, frac * 100))}%`
    bar.classList.toggle("full", frac >= 1)
    msg.classList.toggle("alert", r <= rs)
    msg.textContent =
      r <= rs
        ? `Buraco negro: com ${len(rs)} de raio ou menos, nem a luz escapa. Esse é o raio de Schwarzschild da Terra.`
        : frac > 0.1
          ? "Fora do horizonte ainda há trajetórias de escape para a luz. A fórmula é newtoniana; campos fortes exigem relatividade geral."
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
        : "Sozinha, A parece cara ou coroa (1 bit). Juntas, sempre saem opostas: o par inteiro, antes de medir, está num estado puro de entropia zero. Só esta correlação não prova emaranhamento; para isso é preciso medir em outras bases (teste de Bell)."
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
        ? "Antes do tempo de Page, a curva acompanha a conta de Hawking: cada partícula que sai deixa uma parceira dentro."
        : t < 1
          ? "Depois do tempo de Page, a curva desce. Nos modelos estudados, as ilhas explicam essa virada."
          : "Evaporou: se o buraco negro nasceu de um estado puro, a radiação final volta a ter entropia zero."
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
    const depth = Math.min(1, ratio * ratio)
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
    msg.textContent = ratio >= 1
      ? "O corpo é maior que a estrela: na passagem central, ele tapa 100% da luz, nunca mais que isso."
      : rp >= 9
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

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gauss(r: () => number) {
  const u = Math.max(r(), 1e-12)
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r())
}

function chart(box: HTMLElement, W = 520, H = 240, label = "Gráfico") {
  const s = svg("svg", { viewBox: `0 0 ${W} ${H}`, class: "lab-plot", role: "img", "aria-label": label })
  box.appendChild(s)
  return s
}

function pts(list: [number, number][]) {
  return list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ")
}

function axes(s: SVGElement, W: number, H: number, P: number, xl: string, yl: string) {
  s.append(
    svg("line", { x1: P, x2: W - 10, y1: H - P, y2: H - P, class: "axis" }),
    svg("line", { x1: P, x2: P, y1: 10, y2: H - P, class: "axis" }),
  )
  const tx = svg("text", { x: W - 10, y: H - P + 18, class: "tick", "text-anchor": "end" })
  tx.textContent = xl
  const ty = svg("text", { x: P + 6, y: 20, class: "tick" })
  ty.textContent = yl
  s.append(tx, ty)
}

function btnRow(box: HTMLElement, labels: string[]) {
  const row = el("div", "lab-btns")
  box.appendChild(row)
  return labels.map((l) => button(row, l, true))
}

function fitLaw(box: HTMLElement) {
  const r = rng(15)
  const data: [number, number][] = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5].map((h) => [h, Math.sqrt((2 * h) / 9.81) * (1 + 0.03 * gauss(r))])
  const W = 520, H = 240, P = 36
  const s = chart(box, W, H, "Dados de queda e a lei proposta")
  axes(s, W, H, P, "altura (m)", "tempo (s)")
  const X = (h: number) => P + (h / 5.2) * (W - P - 20)
  const Y = (t: number) => H - P - (t / 1.2) * (H - P - 20)
  const curve = svg("polyline", { class: "curve page" })
  s.appendChild(curve)
  data.forEach(([h, t]) => s.appendChild(svg("circle", { cx: X(h), cy: Y(t), r: 4.5, class: "pt" })))
  const sn = slider(box, "Expoente n na lei t = k · hⁿ", 10, 150, 100, 5)
  const [rL, rE] = readouts(box, ["Lei proposta", "Erro típico (RMS)"])
  const msg = note(box)
  const render = () => {
    const n = Number(sn.input.value) / 100
    const k = data.reduce((a, [h, t]) => a + t * h ** n, 0) / data.reduce((a, [h]) => a + h ** (2 * n), 0)
    const err = Math.sqrt(data.reduce((a, [h, t]) => a + ((k * h ** n - t) / t) ** 2, 0) / data.length)
    sn.out.textContent = fmt(n, 2)
    rL.textContent = `t = ${fmt(k, 3)} · h^${fmt(n, 2)}`
    rE.textContent = `${fmt(err * 100, 1)}%`
    const line: [number, number][] = []
    for (let i = 0; i <= 60; i++) {
      const h = 0.05 + (5.1 * i) / 60
      line.push([X(h), Y(Math.min(1.25, k * h ** n))])
    }
    curve.setAttribute("points", pts(line))
    msg.textContent =
      Math.abs(n - 0.5) < 0.03
        ? "Com n = 0,5 a curva passa pelos pontos: o tempo de queda cresce com a raiz da altura. Os desvios que sobram são o erro das medidas."
        : err < 0.06
          ? "Chegando perto. Ajuste n até o erro parar de diminuir."
          : "Cada ponto é uma medida (com erro). Proponha uma lei mudando n e veja se a curva passa pelos dados."
  }
  sn.input.addEventListener("input", render)
  render()
}

function growth(box: HTMLElement) {
  const W = 520, H = 240, P = 36
  const s = chart(box, W, H, "Crescimento exponencial e linear")
  axes(s, W, H, P, "tempo (unidades)", "quantidade")
  const lin = svg("polyline", { class: "curve bh" })
  const exp = svg("polyline", { class: "curve page" })
  const half = svg("line", { class: "page-line" })
  s.append(half, lin, exp)
  const st = slider(box, "Tempo de dobra (ou meia-vida)", 5, 40, 20)
  const [bGrow, bDecay, bScale] = btnRow(box, ["Crescer", "Decair", "Escala: linear"])
  const [r10, rRate] = readouts(box, ["Depois de 10 unidades", "Taxa por unidade"])
  const msg = note(box)
  let decay = false
  let log = false
  const render = () => {
    const T = Number(st.input.value) / 10
    st.out.textContent = `${fmt(T, 1)} unidades`
    const f = (t: number) => 2 ** ((decay ? -1 : 1) * (t / T))
    const tmax = 10
    const fmax = decay ? 1 : f(tmax)
    const fmin = decay ? f(tmax) : 1
    const Yv = (v: number) =>
      log
        ? H - P - ((Math.log10(v) - Math.log10(Math.min(fmin, 1))) / (Math.log10(Math.max(fmax, 1)) - Math.log10(Math.min(fmin, 1)) || 1)) * (H - P - 20)
        : H - P - (v / Math.max(fmax, 1)) * (H - P - 20)
    const X = (t: number) => P + (t / tmax) * (W - P - 20)
    const e: [number, number][] = []
    const l: [number, number][] = []
    const slope = (f(T) - 1) / T
    for (let i = 0; i <= 80; i++) {
      const t = (tmax * i) / 80
      e.push([X(t), Yv(f(t))])
      const lv = Math.max(1 + slope * t, decay ? fmin : 1)
      l.push([X(t), Yv(Math.max(lv, 1e-6))])
    }
    exp.setAttribute("points", pts(e))
    lin.setAttribute("points", pts(l))
    half.setAttribute("x1", String(X(T)))
    half.setAttribute("x2", String(X(T)))
    half.setAttribute("y1", "10")
    half.setAttribute("y2", String(H - P))
    r10.textContent = decay ? `${fmt(f(tmax) * 100, f(tmax) < 0.01 ? 3 : 1)}% do início` : `× ${f(tmax) < 1e3 ? fmt(f(tmax), 2) : sci(f(tmax))}`
    rRate.textContent = decay ? `−${fmt((1 - 2 ** (-1 / T)) * 100, 1)}%` : `+${fmt((2 ** (1 / T) - 1) * 100, 1)}%`
    bScale.textContent = log ? "Escala: logarítmica" : "Escala: linear"
    bGrow.setAttribute("aria-pressed", String(!decay))
    bDecay.setAttribute("aria-pressed", String(decay))
    msg.textContent = log
      ? "Na escala logarítmica, a exponencial vira uma reta: cada passo igual no tempo multiplica pelo mesmo fator."
      : decay
        ? "A cada meia-vida sobra metade. Nunca chega a zero, mas some rápido: é assim com o carbono-14 e com a carga de um capacitor."
        : "A linha tracejada é um crescimento linear com o mesmo começo. A exponencial parece lenta no início e depois dispara."
  }
  st.input.addEventListener("input", render)
  bGrow.addEventListener("click", () => ((decay = false), render()))
  bDecay.addEventListener("click", () => ((decay = true), render()))
  bScale.addEventListener("click", () => ((log = !log), render()))
  render()
}

function dice(box: HTMLElement) {
  const W = 520, H = 220, P = 30
  const s = chart(box, W, H, "Histograma das somas dos dados")
  axes(s, W, H, P, "soma", "frequência")
  const bars = svg("g", {})
  const expect = svg("polyline", { class: "curve page" })
  s.append(bars, expect)
  const sn = slider(box, "Quantidade de dados", 1, 5, 2)
  const [b1, b100, b1000, bReset] = btnRow(box, ["Jogar 1 vez", "Jogar 100", "Jogar 1000", "Zerar"])
  const [rN, rMean, rExp] = readouts(box, ["Lançamentos", "Média observada", "Média esperada"])
  const msg = note(box)
  let counts: number[] = []
  let total = 0
  const dist = (n: number) => {
    let d = [1]
    for (let k = 0; k < n; k++) {
      const nd = new Array(d.length + 6).fill(0)
      d.forEach((v, i) => {
        for (let f = 1; f <= 6; f++) nd[i + f] += v / 6
      })
      d = nd
    }
    return d
  }
  const reset = () => {
    const n = Number(sn.input.value)
    counts = new Array(6 * n + 1).fill(0)
    total = 0
  }
  const roll = (times: number) => {
    const n = Number(sn.input.value)
    for (let k = 0; k < times; k++) {
      let sum = 0
      for (let i = 0; i < n; i++) sum += 1 + Math.floor(Math.random() * 6)
      counts[sum]++
    }
    total += times
    render()
  }
  const render = () => {
    const n = Number(sn.input.value)
    sn.out.textContent = String(n)
    const d = dist(n)
    const lo = n, hi = 6 * n
    const bw = (W - P - 20) / (hi - lo + 1)
    const maxP = Math.max(...d.slice(lo, hi + 1), ...counts.slice(lo, hi + 1).map((c) => (total ? c / total : 0)))
    const Y = (p: number) => H - P - (p / maxP) * (H - P - 20)
    bars.replaceChildren()
    for (let v = lo; v <= hi; v++) {
      const p = total ? counts[v] / total : 0
      const x = P + (v - lo) * bw
      bars.appendChild(svg("rect", { x: x + 1, y: Y(p), width: Math.max(1, bw - 2), height: H - P - Y(p), class: "bar" }))
      if (hi - lo <= 12 || v % 2 === 0) {
        const t = svg("text", { x: x + bw / 2, y: H - P + 13, class: "tick", "text-anchor": "middle" })
        t.textContent = String(v)
        bars.appendChild(t)
      }
    }
    const line: [number, number][] = []
    for (let v = lo; v <= hi; v++) line.push([P + (v - lo) * bw + bw / 2, Y(d[v])])
    expect.setAttribute("points", pts(line))
    const mean = total ? counts.reduce((a, c, v) => a + c * v, 0) / total : 0
    rN.textContent = String(total)
    rMean.textContent = total ? fmt(mean, 2) : "—"
    rExp.textContent = fmt(3.5 * n, 1)
    msg.textContent =
      total === 0
        ? "Jogue os dados. A linha mostra a probabilidade exata de cada soma; as barras, o que saiu de fato."
        : total < 200
          ? "Com poucos lançamentos, as barras ainda dançam em volta da linha."
          : n >= 3
            ? "Com mais lançamentos as barras colam na linha (lei dos grandes números). E somando vários dados, a forma vira um sino."
            : "Com mais lançamentos as barras colam na linha: é a lei dos grandes números."
  }
  sn.input.addEventListener("input", () => (reset(), render()))
  b1.addEventListener("click", () => roll(1))
  b100.addEventListener("click", () => roll(100))
  b1000.addEventListener("click", () => roll(1000))
  bReset.addEventListener("click", () => (reset(), render()))
  reset()
  render()
}

function dimensions(box: HTMLElement) {
  const intro = el("p", "lab-note", "Quanto tempo um pêndulo leva para ir e voltar? Ignorando a amplitude do balanço (que não tem unidade), o período só pode depender do comprimento L (m), da gravidade g (m/s²) e da massa m (kg). Escolha os expoentes de L^a · g^b · m^c para o resultado ter unidade de tempo.")
  box.appendChild(intro)
  const sa = slider(box, "a (expoente de L)", -4, 4, 2)
  const sb = slider(box, "b (expoente de g)", -4, 4, 0)
  const sc = slider(box, "c (expoente de m)", -4, 4, 2)
  const [rD, rT] = readouts(box, ["Unidade resultante", "Valor para L = 1 m"])
  const msg = note(box)
  const sup = (v: number) => (v === 1 ? "" : `^${fmt(v, 1)}`)
  const render = () => {
    const a = Number(sa.input.value) / 2, b = Number(sb.input.value) / 2, c = Number(sc.input.value) / 2
    sa.out.textContent = fmt(a, 1)
    sb.out.textContent = fmt(b, 1)
    sc.out.textContent = fmt(c, 1)
    const em = a + b, es = -2 * b, ek = c
    const parts = [em ? `m${sup(em)}` : "", ek ? `kg${sup(ek)}` : "", es ? `s${sup(es)}` : ""].filter((x) => x)
    rD.textContent = parts.length ? parts.join(" · ") : "sem unidade"
    const ok = em === 0 && ek === 0 && es === 1
    rT.textContent = ok ? `${fmt(Math.sqrt(1 / 9.81), 3)} s (teoria completa: ${fmt(2 * Math.PI * Math.sqrt(1 / 9.81), 2)} s)` : "—"
    msg.classList.toggle("alert", ok)
    msg.textContent = ok
      ? "Achou: T ∝ √(L/g). A massa nem entra! A análise dimensional acerta a forma; o fator 2π só sai resolvendo a física."
      : ek !== 0
        ? "A massa deixa sobrar kg. Nenhuma outra grandeza tem kg para cancelar, então c tem que ser zero."
        : "Ajuste os expoentes até sobrar só s (segundos)."
  }
  ;[sa, sb, sc].forEach((x) => x.input.addEventListener("input", render))
  render()
}

function measure(box: HTMLElement) {
  const W = 520, H = 150, P = 20
  const s = chart(box, W, H, "Medidas repetidas e a média")
  const band = svg("rect", { y: 20, height: H - 50, class: "band" })
  const meanLine = svg("line", { y1: 14, y2: H - 30, class: "page-line" })
  const dots = svg("g", {})
  s.append(band, dots, meanLine)
  const X = (v: number) => P + ((v - 0.6) / 0.8) * (W - 2 * P)
  ;[0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3].forEach((v) => {
    const t = svg("text", { x: X(v), y: H - 8, class: "tick", "text-anchor": "middle" })
    t.textContent = `${fmt(v, 1)} s`
    s.appendChild(t)
  })
  const [b1, b10, b100, bReset] = btnRow(box, ["Medir 1 vez", "Medir 10", "Medir 100", "Limpar"])
  const [rN, rM, rS, rE] = readouts(box, ["Medidas", "Média", "Desvio padrão", "Incerteza da média"])
  const msg = note(box)
  let vals: number[] = []
  const add = (k: number) => {
    for (let i = 0; i < k; i++) vals.push(1 + 0.08 * gauss(Math.random))
    render()
  }
  const render = () => {
    dots.replaceChildren()
    const r = rng(3)
    vals.slice(-300).forEach((v) => dots.appendChild(svg("circle", { cx: X(Math.min(1.4, Math.max(0.6, v))), cy: 30 + r() * (H - 70), r: 3, class: "pt" })))
    const n = vals.length
    const m = n ? vals.reduce((a, b) => a + b, 0) / n : 0
    const sd = n > 1 ? Math.sqrt(vals.reduce((a, b) => a + (b - m) ** 2, 0) / (n - 1)) : 0
    rN.textContent = String(n)
    rM.textContent = n ? `${fmt(m, 3)} s` : "—"
    rS.textContent = n > 1 ? `${fmt(sd, 3)} s` : "—"
    rE.textContent = n > 1 ? `± ${fmt(sd / Math.sqrt(n), 3)} s` : "—"
    if (n) {
      meanLine.setAttribute("x1", String(X(m)))
      meanLine.setAttribute("x2", String(X(m)))
      band.setAttribute("x", String(X(m - sd)))
      band.setAttribute("width", String(Math.max(0, X(m + sd) - X(m - sd))))
    }
    meanLine.style.display = band.style.display = n ? "" : "none"
    msg.textContent =
      n === 0
        ? "Um cronômetro na mão mede uma queda que dura 1 s. Cada medida sai um pouco diferente (seu tempo de reação)."
        : n < 10
          ? "A faixa sombreada é o desvio padrão: o quanto uma medida típica erra."
          : "O desvio padrão fica parecido, mas a incerteza da média cai com √N: 100 medidas dão uma média 10 vezes mais precisa que uma."
  }
  b1.addEventListener("click", () => add(1))
  b10.addEventListener("click", () => add(10))
  b100.addEventListener("click", () => add(100))
  bReset.addEventListener("click", () => ((vals = []), render()))
  render()
}

function taylor(box: HTMLElement) {
  const W = 520, H = 240, P = 20
  const s = chart(box, W, H, "Função e aproximação de Taylor")
  const X0 = W / 2, Y0 = H / 2
  const xr = 2 * Math.PI
  const X = (x: number) => X0 + (x / xr) * (W / 2 - P)
  const Y = (y: number) => Y0 - (y / 2.2) * (H / 2 - 12)
  s.append(svg("line", { x1: P, x2: W - P, y1: Y0, y2: Y0, class: "axis" }), svg("line", { x1: X0, x2: X0, y1: 8, y2: H - 8, class: "axis" }))
  const f = svg("polyline", { class: "curve alt" })
  const g = svg("polyline", { class: "curve page" })
  s.append(f, g)
  const sn = slider(box, "Termos da série", 1, 10, 1)
  const [bSin, bCos] = btnRow(box, ["sen x", "cos x"])
  const [rP, rE] = readouts(box, ["Polinômio", "Erro em x = 1 rad"])
  const msg = note(box)
  let fn: "sin" | "cos" = "sin"
  const fact = (k: number) => (k <= 1 ? 1 : k * fact(k - 1))
  const series = (x: number, n: number) => {
    let sum = 0
    for (let k = 0; k < n; k++) {
      const p = fn === "sin" ? 2 * k + 1 : 2 * k
      sum += ((-1) ** k * x ** p) / fact(p)
    }
    return sum
  }
  const label = (n: number) => {
    const terms: string[] = []
    for (let k = 0; k < Math.min(n, 3); k++) {
      const p = fn === "sin" ? 2 * k + 1 : 2 * k
      const t = p === 0 ? "1" : p === 1 ? "x" : `x^${p}/${p}!`
      terms.push((k ? (k % 2 ? " − " : " + ") : "") + t)
    }
    return terms.join("") + (n > 3 ? " + …" : "")
  }
  const render = () => {
    const n = Number(sn.input.value)
    sn.out.textContent = String(n)
    const real = (x: number) => (fn === "sin" ? Math.sin(x) : Math.cos(x))
    const a: [number, number][] = [], b: [number, number][] = []
    for (let i = 0; i <= 200; i++) {
      const x = -xr + (2 * xr * i) / 200
      a.push([X(x), Y(real(x))])
      b.push([X(x), Y(Math.max(-20, Math.min(20, series(x, n))))])
    }
    f.setAttribute("points", pts(a))
    g.setAttribute("points", pts(b))
    rP.textContent = label(n)
    const err = Math.abs(series(1, n) - real(1))
    rE.textContent = err < 1e-6 ? "< 0,000001" : fmt(err, 6)
    bSin.setAttribute("aria-pressed", String(fn === "sin"))
    bCos.setAttribute("aria-pressed", String(fn === "cos"))
    msg.textContent =
      n === 1
        ? fn === "sin"
          ? "Um termo só: sen x ≈ x. Perto de zero funciona muito bem; é a aproximação de ângulo pequeno que simplifica o pêndulo."
          : "Um termo só: cos x ≈ 1. Para melhorar, o próximo termo é −x²/2."
        : "Cada termo novo cola a curva laranja na azul por um trecho maior. Perto de zero, poucos termos já bastam."
  }
  sn.input.addEventListener("input", render)
  bSin.addEventListener("click", () => ((fn = "sin"), render()))
  bCos.addEventListener("click", () => ((fn = "cos"), render()))
  render()
}

function complexPlane(box: HTMLElement) {
  const W = 320, H = 320, C = 160, R = 100
  const s = chart(box, W, H, "Plano complexo")
  s.style.maxWidth = "360px"
  s.style.margin = "0 auto"
  s.append(
    svg("line", { x1: 10, x2: W - 10, y1: C, y2: C, class: "axis" }),
    svg("line", { x1: C, x2: C, y1: 10, y2: H - 10, class: "axis" }),
    svg("circle", { cx: C, cy: C, r: R, class: "grid", fill: "none" }),
  )
  const re = svg("text", { x: W - 12, y: C - 6, class: "tick", "text-anchor": "end" })
  re.textContent = "real"
  const im = svg("text", { x: C + 6, y: 20, class: "tick" })
  im.textContent = "imaginário"
  const px = svg("line", { class: "page-line" })
  const py = svg("line", { class: "page-line" })
  const vec = svg("line", { class: "vec a" })
  const dot = svg("circle", { r: 6, class: "dot" })
  s.append(re, im, px, py, vec, dot)
  const sr = slider(box, "Módulo r", 2, 15, 10)
  const st = slider(box, "Ângulo θ", 0, 360, 30)
  const [bI, bSq] = btnRow(box, ["Multiplicar por i", "Elevar ao quadrado"])
  const [rA, rP2] = readouts(box, ["Forma a + bi", "Forma r·e^(iθ)"])
  const msg = note(box)
  let last = ""
  const render = () => {
    const r = Number(sr.input.value) / 10
    const th = Number(st.input.value)
    sr.out.textContent = fmt(r, 1)
    st.out.textContent = `${th}°`
    const a = r * Math.cos((th * Math.PI) / 180), b = r * Math.sin((th * Math.PI) / 180)
    const x = C + a * R, y = C - b * R
    vec.setAttribute("x1", String(C))
    vec.setAttribute("y1", String(C))
    vec.setAttribute("x2", String(x))
    vec.setAttribute("y2", String(y))
    dot.setAttribute("cx", String(x))
    dot.setAttribute("cy", String(y))
    px.setAttribute("x1", String(x)); px.setAttribute("x2", String(x)); px.setAttribute("y1", String(y)); px.setAttribute("y2", String(C))
    py.setAttribute("x1", String(x)); py.setAttribute("x2", String(C)); py.setAttribute("y1", String(y)); py.setAttribute("y2", String(y))
    rA.textContent = `${fmt(a, 2)} ${b < 0 ? "−" : "+"} ${fmt(Math.abs(b), 2)}i`
    rP2.textContent = `${fmt(r, 1)} · e^(i·${th}°)`
    msg.textContent =
      last === "i"
        ? "Multiplicar por i girou o ponto 90°, sem mudar o tamanho. Duas vezes por i dá meia volta: i² = −1."
        : last === "sq"
          ? "Elevar ao quadrado dobra o ângulo e eleva o módulo ao quadrado. Na forma polar, multiplicar é girar e esticar."
          : last === "sqclamp"
            ? "O ângulo dobrou, mas o módulo ao quadrado saiu do gráfico; o ponto foi limitado à borda da escala."
          : "A projeção no eixo real é r·cos θ; no imaginário, r·sen θ. É a fórmula de Euler: e^(iθ) = cos θ + i sen θ."
    last = ""
  }
  sr.input.addEventListener("input", render)
  st.input.addEventListener("input", render)
  bI.addEventListener("click", () => {
    st.input.value = String((Number(st.input.value) + 90) % 360)
    last = "i"
    render()
  })
  bSq.addEventListener("click", () => {
    const r = Number(sr.input.value) / 10
    const r2 = r * r
    sr.input.value = String(Math.min(15, Math.max(2, Math.round(r2 * 10))))
    st.input.value = String((Number(st.input.value) * 2) % 360)
    last = r2 < 0.2 || r2 > 1.5 ? "sqclamp" : "sq"
    render()
  })
  render()
}

function noise(box: HTMLElement) {
  const W = 520, H = 220, P = 30
  const s = chart(box, W, H, "Curva de luz com ruído")
  axes(s, W, H, P, "tempo", "brilho")
  const raw = svg("g", {})
  const binned = svg("polyline", { class: "curve page" })
  s.append(raw, binned)
  const r = rng(11)
  const N = 600
  const depth = 0.004
  const sigma = 0.006
  const flux = Array.from({ length: N }, (_, i) => (Math.abs(i - 300) < 45 ? 1 - depth : 1) + sigma * gauss(r))
  const X = (i: number) => P + (i / (N - 1)) * (W - P - 20)
  const Y = (f: number) => H - P - ((f - 0.98) / 0.04) * (H - P - 20)
  flux.forEach((f, i) => raw.appendChild(svg("circle", { cx: X(i), cy: Y(Math.max(0.981, Math.min(1.019, f))), r: 1.6, class: "pt faint" })))
  const sb = slider(box, "Pontos por média (N)", 1, 45, 1)
  const [rS, rB, rSNR] = readouts(box, ["Ruído de um ponto", "Ruído da média", "Sinal / ruído"])
  const msg = note(box)
  const render = () => {
    const n = Number(sb.input.value)
    sb.out.textContent = String(n)
    const line: [number, number][] = []
    for (let i = 0; i + n <= N; i += n) {
      const m = flux.slice(i, i + n).reduce((a, b) => a + b, 0) / n
      line.push([X(i + (n - 1) / 2), Y(m)])
    }
    binned.setAttribute("points", pts(line))
    binned.style.display = n === 1 ? "none" : ""
    const sN = sigma / Math.sqrt(n)
    rS.textContent = `${fmt(sigma * 100, 2)}%`
    rB.textContent = `${fmt(sN * 100, 3)}%`
    rSNR.textContent = fmt(depth / sN, 1)
    msg.textContent =
      depth / sN < 3
        ? "Tem um planeta passando aqui, apagando 0,4% da luz. Com o ruído de cada ponto (0,6%), ele some. Aumente N."
        : "Fazendo a média de N pontos, o ruído cai com √N e a queda aparece. Combinando muitos pontos e vários trânsitos, foi assim que o Kepler achou planetas do tamanho da Terra."
  }
  sb.input.addEventListener("input", render)
  render()
}

function fourier(box: HTMLElement) {
  const W = 520, H = 220
  const s = chart(box, W, H, "Soma de senos aproximando uma onda")
  const Y0 = H / 2
  s.appendChild(svg("line", { x1: 10, x2: W - 10, y1: Y0, y2: Y0, class: "axis" }))
  const target = svg("polyline", { class: "curve alt" })
  const sum = svg("polyline", { class: "curve page" })
  s.append(target, sum)
  const sn = slider(box, "Número de termos somados", 1, 40, 1)
  const [bSq, bSaw, bTri] = btnRow(box, ["Onda quadrada", "Dente de serra", "Triangular"])
  const [rT, rO] = readouts(box, ["Último termo", "Maior pico"])
  const msg = note(box)
  let kind: "sq" | "saw" | "tri" = "sq"
  const X = (t: number) => 10 + (t / (4 * Math.PI)) * (W - 20)
  const Y = (v: number) => Y0 - v * (H / 2 - 30)
  const real = (t: number) => {
    const u = ((t % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    if (kind === "sq") return u < Math.PI ? 1 : -1
    if (kind === "saw") return u < Math.PI ? u / Math.PI : u / Math.PI - 2
    return u < Math.PI ? 1 - (2 * u) / Math.PI : -1 + (2 * (u - Math.PI)) / Math.PI
  }
  const term = (k: number, t: number) => {
    if (kind === "sq") return ((4 / Math.PI) * Math.sin((2 * k - 1) * t)) / (2 * k - 1)
    if (kind === "saw") return ((2 / Math.PI) * (-1) ** (k + 1) * Math.sin(k * t)) / k
    const m = 2 * k - 1
    return ((8 / Math.PI ** 2) * Math.cos(m * t)) / m ** 2
  }
  const render = () => {
    const n = Number(sn.input.value)
    sn.out.textContent = String(n)
    const a: [number, number][] = [], b: [number, number][] = []
    let peak = 0
    for (let i = 0; i <= 600; i++) {
      const t = (4 * Math.PI * i) / 600
      a.push([X(t), Y(real(t))])
      let v = 0
      for (let k = 1; k <= n; k++) v += term(k, t)
      peak = Math.max(peak, v)
      b.push([X(t), Y(v)])
    }
    target.setAttribute("points", pts(a))
    sum.setAttribute("points", pts(b))
    const freq = kind === "saw" ? n : 2 * n - 1
    rT.textContent = `${kind === "tri" ? "cos" : "sen"}(${freq}x), amplitude ${fmt(kind === "tri" ? 8 / Math.PI ** 2 / freq ** 2 : kind === "sq" ? 4 / Math.PI / freq : 2 / Math.PI / freq, 3)}`
    rO.textContent = fmt(peak, 3)
    ;[bSq, bSaw, bTri].forEach((b, i) => b.setAttribute("aria-pressed", String(["sq", "saw", "tri"][i] === kind)))
    msg.textContent =
      n === 1
        ? "Um termo só já lembra a forma. Some mais, cada um mais rápido e mais fraco."
        : kind === "tri"
          ? "A triangular converge rápido: os termos caem com 1/n². Sem saltos (só quinas), poucos termos bastam."
          : n >= 15
            ? "Perto dos saltos sobra um pico de uns 9% da altura do salto (aqui de −1 a 1, então cerca de 1,18). Ele não diminui, só fica mais estreito: é o fenômeno de Gibbs."
            : "Quanto mais senos, mais fiel a forma. Saltos bruscos exigem muitos senos de alta frequência."
  }
  sn.input.addEventListener("input", render)
  bSq.addEventListener("click", () => ((kind = "sq"), render()))
  bSaw.addEventListener("click", () => ((kind = "saw"), render()))
  bTri.addEventListener("click", () => ((kind = "tri"), render()))
  render()
}

function matrix(box: HTMLElement) {
  const W = 320, H = 320, C = 160, U = 45
  const s = chart(box, W, H, "Transformação linear do plano")
  s.style.maxWidth = "360px"
  s.style.margin = "0 auto"
  const grid = svg("g", {})
  const shape = svg("polygon", { class: "shape" })
  const e1 = svg("line", { class: "vec a" })
  const e2 = svg("line", { class: "vec b" })
  const eig = svg("g", {})
  s.append(grid, eig, shape, e1, e2)
  const sa = slider(box, "a", -20, 20, 10)
  const sb = slider(box, "b", -20, 20, 0)
  const sc = slider(box, "c", -20, 20, 0)
  const sd = slider(box, "d", -20, 20, 10)
  const presets: Record<string, number[]> = {
    Identidade: [10, 0, 0, 10],
    "Rotação 90°": [0, -10, 10, 0],
    Cisalhamento: [10, 10, 0, 10],
    Reflexão: [-10, 0, 0, 10],
    Esticar: [20, 0, 0, 5],
  }
  const bs = btnRow(box, Object.keys(presets))
  const [rM, rDet, rEig] = readouts(box, ["Matriz", "Determinante", "Autovalores"])
  const msg = note(box)
  const render = () => {
    const [a, b, c, d] = [sa, sb, sc, sd].map((x) => Number(x.input.value) / 10)
    ;[sa, sb, sc, sd].forEach((x) => (x.out.textContent = fmt(Number(x.input.value) / 10, 1)))
    const T = (x: number, y: number): [number, number] => [C + (a * x + b * y) * U, C - (c * x + d * y) * U]
    grid.replaceChildren()
    for (let k = -4; k <= 4; k++) {
      const [x1, y1] = T(k, -4), [x2, y2] = T(k, 4), [x3, y3] = T(-4, k), [x4, y4] = T(4, k)
      grid.append(svg("line", { x1, y1, x2, y2, class: k === 0 ? "axis" : "grid" }), svg("line", { x1: x3, y1: y3, x2: x4, y2: y4, class: k === 0 ? "axis" : "grid" }))
    }
    shape.setAttribute("points", pts([T(0, 0), T(1, 0), T(1, 1), T(0, 1)]))
    const [ox, oy] = T(0, 0), [ax, ay] = T(1, 0), [bx, by] = T(0, 1)
    e1.setAttribute("x1", String(ox)); e1.setAttribute("y1", String(oy)); e1.setAttribute("x2", String(ax)); e1.setAttribute("y2", String(ay))
    e2.setAttribute("x1", String(ox)); e2.setAttribute("y1", String(oy)); e2.setAttribute("x2", String(bx)); e2.setAttribute("y2", String(by))
    const det = a * d - b * c
    const tr = a + d
    const disc0 = tr * tr - 4 * det
    const disc = Math.abs(disc0) < 1e-9 ? 0 : disc0
    const scalar = Math.abs(b) < 1e-9 && Math.abs(c) < 1e-9 && Math.abs(a - d) < 1e-9
    eig.replaceChildren()
    rM.textContent = `[${fmt(a, 1)} ${fmt(b, 1)}; ${fmt(c, 1)} ${fmt(d, 1)}]`
    rDet.textContent = fmt(det, 2)
    if (disc >= 0) {
      const l1 = (tr + Math.sqrt(disc)) / 2, l2 = (tr - Math.sqrt(disc)) / 2
      rEig.textContent = Math.abs(l1 - l2) < 1e-9 ? fmt(l1, 2) : `${fmt(l1, 2)} e ${fmt(l2, 2)}`
      for (const l of [l1, l2]) {
        let vx = b, vy = l - a
        if (Math.abs(vx) < 1e-9 && Math.abs(vy) < 1e-9) [vx, vy] = [l - d, c]
        if (Math.abs(vx) < 1e-9 && Math.abs(vy) < 1e-9) continue
        const n = Math.hypot(vx, vy)
        eig.appendChild(svg("line", { x1: C - (vx / n) * 200, y1: C + (vy / n) * 200, x2: C + (vx / n) * 200, y2: C - (vy / n) * 200, class: "eig" }))
      }
    } else {
      rEig.textContent = `complexos (${fmt(tr / 2, 2)} ± ${fmt(Math.sqrt(-disc) / 2, 2)}i)`
    }
    msg.textContent = scalar
      ? `Toda direção é autovetor: a matriz só multiplica tudo por ${fmt(a, 1)}.`
      : disc < 0
        ? "Sem autovetores reais: a transformação gira tudo, nenhuma direção fica parada. Os autovalores complexos guardam o ângulo do giro."
        : Math.abs(det) < 1e-9
          ? "Determinante zero: o plano foi achatado numa reta e a informação de uma direção se perdeu."
          : det < 0
            ? "Determinante negativo: o plano foi espelhado (a área do quadrado também mudou pelo fator |det|)."
            : "As linhas tracejadas são os autovetores: direções que só esticam ou encolhem, sem girar. O autovalor diz por quanto."
  }
  ;[sa, sb, sc, sd].forEach((x) => x.input.addEventListener("input", render))
  bs.forEach((btn, i) =>
    btn.addEventListener("click", () => {
      const v = Object.values(presets)[i]
      ;[sa, sb, sc, sd].forEach((x, j) => (x.input.value = String(v[j])))
      render()
    }),
  )
  render()
}

function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#888"
}

function canvas(box: HTMLElement, W: number, H: number, label: string) {
  const c = document.createElement("canvas")
  const dpr = Math.min(2, window.devicePixelRatio || 1)
  c.width = W * dpr
  c.height = H * dpr
  c.className = "lab-canvas"
  c.setAttribute("role", "img")
  c.setAttribute("aria-label", label)
  box.appendChild(c)
  const ctx = c.getContext("2d")!
  ctx.scale(dpr, dpr)
  return ctx
}

function loop(box: HTMLElement, step: () => void) {
  let running = !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const tick = () => {
    if (!box.isConnected) return
    if (running) step()
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
  return {
    get running() {
      return running
    },
    set running(v: boolean) {
      running = v
    },
  }
}

const K_B = 1.380649e-23
const M_N2 = 4.65e-26

function gas(box: HTMLElement) {
  const W = 520, H = 220
  const ctx = canvas(box, W, H, "Moléculas de gás numa caixa")
  const hist = chart(box, 520, 140, "Distribuição de velocidades")
  const bars = svg("g", {})
  const theory = svg("polyline", { class: "curve page" })
  const lbl = svg("text", { x: 510, y: 138, class: "tick", "text-anchor": "end" })
  lbl.textContent = "velocidade (m/s), até 2500"
  hist.append(bars, theory, lbl)
  const st = slider(box, "Temperatura", 50, 1200, 300, 10)
  const [bPause] = btnRow(box, ["Pausar"])
  const [rT, rV] = readouts(box, ["Temperatura", "Velocidade média do N₂"])
  const msg = note(box)
  const N = 120
  const r = rng(5)
  const scale = 0.0035
  let T = 300
  const ps = Array.from({ length: N }, () => {
    const s = Math.sqrt((K_B * T) / M_N2)
    return { x: 10 + r() * (W - 20), y: 10 + r() * (H - 20), vx: s * gauss(r), vy: s * gauss(r), vz: s * gauss(r) }
  })
  const speed = (p: { vx: number; vy: number; vz: number }) => Math.hypot(p.vx, p.vy, p.vz)
  const vmean = (t: number) => Math.sqrt((8 * K_B * t) / (Math.PI * M_N2))
  const draw = () => {
    const fast = cssVar("--tertiary"), slow = cssVar("--secondary")
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--lightgray")
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1)
    const vm = vmean(T)
    for (const p of ps) {
      ctx.fillStyle = speed(p) > 1.5 * vm ? fast : slow
      ctx.beginPath()
      ctx.arc(p.x, p.y, 3.5, 0, 2 * Math.PI)
      ctx.fill()
    }
  }
  const step = () => {
    for (const p of ps) {
      p.x += p.vx * scale
      p.y += p.vy * scale
      if (p.x < 4 || p.x > W - 4) (p.vx *= -1), (p.x = Math.min(W - 4, Math.max(4, p.x)))
      if (p.y < 4 || p.y > H - 4) (p.vy *= -1), (p.y = Math.min(H - 4, Math.max(4, p.y)))
    }
    draw()
  }
  const drawHist = () => {
    const vmax = 2500
    const nb = 25
    const counts = new Array(nb).fill(0)
    ps.forEach((p) => {
      const b = Math.floor((speed(p) / vmax) * nb)
      if (b < nb) counts[b]++
    })
    const a = M_N2 / (K_B * T)
    const pdf = (v: number) => 4 * Math.PI * (a / (2 * Math.PI)) ** 1.5 * v * v * Math.exp((-a * v * v) / 2)
    const bw = 500 / nb
    const dens = counts.map((c) => c / N / (vmax / nb))
    const peak = Math.max(...dens, pdf(Math.sqrt(2 / a)))
    const Y = (d: number) => 125 - (d / peak) * 110
    bars.replaceChildren()
    dens.forEach((d, i) => bars.appendChild(svg("rect", { x: 10 + i * bw + 1, y: Y(d), width: bw - 2, height: 125 - Y(d), class: "bar" })))
    const line: [number, number][] = []
    for (let i = 0; i <= 100; i++) {
      const v = (vmax * i) / 100
      line.push([10 + (v / vmax) * 500, Y(pdf(v))])
    }
    theory.setAttribute("points", pts(line))
  }
  const render = () => {
    const nt = Number(st.input.value)
    const k = Math.sqrt(nt / T)
    ps.forEach((p) => ((p.vx *= k), (p.vy *= k), (p.vz *= k)))
    T = nt
    st.out.textContent = `${nt} K`
    rT.textContent = `${nt} K (${fmt(nt - 273.15, 0)} °C)`
    rV.textContent = `${fmt(vmean(nt), 0)} m/s`
    msg.textContent =
      nt < 120
        ? `Frio: as moléculas andam mais devagar (ainda uns ${fmt(vmean(nt), 0)} m/s). Na vida real, o N₂ já teria virado líquido abaixo de 77 K.`
        : "Temperatura é a agitação média das moléculas. As laranjas são as mais rápidas; as barras mostram as velocidades (em 3D) das moléculas da caixa, e a curva, a distribuição de Maxwell prevista."
    drawHist()
    draw()
  }
  st.input.addEventListener("input", render)
  render()
  const l = loop(box, step)
  bPause.textContent = l.running ? "Pausar" : "Rodar"
  bPause.addEventListener("click", () => {
    l.running = !l.running
    bPause.textContent = l.running ? "Pausar" : "Rodar"
  })
}

function pv(box: HTMLElement) {
  const R = 8.314, n = 1, T1 = 300, V1 = 10
  const P1 = (n * R * T1) / (V1 / 1000) / 1000
  const W = 520, H = 250, P = 40
  const s = chart(box, W, H, "Diagrama pressão por volume")
  axes(s, W, H, P, "volume (L)", "pressão (kPa)")
  const area = svg("polygon", { class: "shape" })
  const path = svg("polyline", { class: "curve page" })
  const start = svg("circle", { r: 5, class: "dot" })
  s.append(area, path, start)
  const bs = btnRow(box, ["Pressão constante", "Volume constante", "Temperatura constante", "Sem trocar calor"])
  const sv = slider(box, "Volume final", 5, 20, 15)
  const stt = slider(box, "Temperatura final", 150, 600, 450, 10)
  const [rW, rQ, rU, rT] = readouts(box, ["Trabalho do gás (W)", "Calor recebido (Q)", "Energia interna (ΔU)", "Temperatura final"])
  const msg = note(box)
  let kind = 0
  const X = (v: number) => P + (v / 22) * (W - P - 20)
  const Y = (p: number) => H - P - (p / 820) * (H - P - 20)
  const render = () => {
    sv.input.parentElement!.style.display = kind === 1 ? "none" : ""
    stt.input.parentElement!.style.display = kind === 1 ? "" : "none"
    const V2 = Number(sv.input.value)
    sv.out.textContent = `${V2} L`
    stt.out.textContent = `${stt.input.value} K`
    let T2 = T1, Wk = 0
    const curve: [number, number][] = []
    const Pof = (v: number) => {
      if (kind === 0) return P1
      if (kind === 2) return (P1 * V1) / v
      return P1 * (V1 / v) ** (5 / 3)
    }
    if (kind === 1) {
      T2 = Number(stt.input.value)
      curve.push([V1, P1], [V1, (P1 * T2) / T1])
    } else {
      for (let i = 0; i <= 60; i++) {
        const v = V1 + ((V2 - V1) * i) / 60
        curve.push([v, Pof(v)])
      }
      if (kind === 0) {
        T2 = (T1 * V2) / V1
        Wk = P1 * 1000 * ((V2 - V1) / 1000)
      } else if (kind === 2) {
        Wk = n * R * T1 * Math.log(V2 / V1)
      } else {
        T2 = T1 * (V1 / V2) ** (2 / 3)
        Wk = -1.5 * n * R * (T2 - T1)
      }
    }
    const dU = 1.5 * n * R * (T2 - T1)
    const Q = dU + Wk
    path.setAttribute("points", pts(curve.map(([v, p]) => [X(v), Y(p)])))
    area.setAttribute("points", pts([[X(curve[0][0]), Y(0)], ...curve.map(([v, p]) => [X(v), Y(p)] as [number, number]), [X(curve[curve.length - 1][0]), Y(0)]]))
    start.setAttribute("cx", String(X(V1)))
    start.setAttribute("cy", String(Y(P1)))
    const J = (v: number) => `${v >= 0 ? "" : "−"}${fmt(Math.abs(v), 0)} J`
    rW.textContent = J(Wk)
    rQ.textContent = J(Q)
    rU.textContent = J(dU)
    rT.textContent = `${fmt(T2, 0)} K`
    bs.forEach((b, i) => b.setAttribute("aria-pressed", String(i === kind)))
    const lines = [
      V2 >= V1
        ? "Pressão constante: para expandir, o gás recebe calor; parte vira trabalho (a área sombreada) e parte aquece o gás."
        : "Pressão constante: comprimindo, o gás perde calor e esfria; o trabalho é feito sobre ele (W negativo).",
      "Volume constante: não há trabalho (área zero). Todo o calor vira energia interna.",
      "Temperatura constante: a energia interna não muda; todo calor que entra sai como trabalho.",
      "Sem trocar calor (adiabático): o trabalho sai da energia interna, e o gás esfria ao expandir. Comprimindo, esquenta (bomba de bicicleta).",
    ]
    msg.textContent = `${lines[kind]} Sempre vale Q = ΔU + W.`
  }
  bs.forEach((b, i) => b.addEventListener("click", () => ((kind = i), render())))
  sv.input.addEventListener("input", render)
  stt.input.addEventListener("input", render)
  render()
}

function carnot(box: HTMLElement) {
  const W = 520, H = 250, P = 44
  const s = chart(box, W, H, "Ciclo de Carnot no diagrama temperatura por entropia")
  axes(s, W, H, P, "entropia", "temperatura (K)")
  const qh = svg("rect", { class: "band" })
  const work = svg("rect", { class: "shape" })
  const thL = svg("text", { class: "tick accent" })
  const tcL = svg("text", { class: "tick" })
  s.append(qh, work, thL, tcL)
  const sh = slider(box, "Fonte quente", 400, 1500, 800, 10)
  const sc = slider(box, "Fonte fria", 200, 390, 300, 5)
  const [rE, rW, rQ] = readouts(box, ["Eficiência máxima", "De cada 100 J de calor, viram trabalho", "E vão para a fonte fria"])
  const msg = note(box)
  const Y = (t: number) => H - P - (t / 1600) * (H - P - 20)
  const render = () => {
    const Th = Number(sh.input.value), Tc = Number(sc.input.value)
    sh.out.textContent = `${Th} K`
    sc.out.textContent = `${Tc} K`
    const e = 1 - Tc / Th
    const x1 = P + 120, x2 = W - 120
    qh.setAttribute("x", String(x1)); qh.setAttribute("width", String(x2 - x1)); qh.setAttribute("y", String(Y(Th))); qh.setAttribute("height", String(Y(0) - Y(Th)))
    work.setAttribute("x", String(x1)); work.setAttribute("width", String(x2 - x1)); work.setAttribute("y", String(Y(Th))); work.setAttribute("height", String(Y(Tc) - Y(Th)))
    thL.setAttribute("x", String(x2 + 6)); thL.setAttribute("y", String(Y(Th) + 4)); thL.textContent = `${Th} K`
    tcL.setAttribute("x", String(x2 + 6)); tcL.setAttribute("y", String(Y(Tc) + 4)); tcL.textContent = `${Tc} K`
    rE.textContent = `${fmt(e * 100, 1)}%`
    rW.textContent = `${fmt(e * 100, 1)} J`
    rQ.textContent = `${fmt((1 - e) * 100, 1)} J`
    msg.textContent =
      "O retângulo laranja é o trabalho de um ciclo; a área clara inteira é o calor que sai da fonte quente. A parte de baixo sempre vai para a fonte fria. Só uma fonte fria no zero absoluto daria 100%, e isso é inalcançável. Motores reais ficam abaixo deste limite."
  }
  sh.input.addEventListener("input", render)
  sc.input.addEventListener("input", render)
  render()
}

function mixing(box: HTMLElement, reverse: boolean) {
  const W = 520, H = 200, RAD = 4
  const ctx = canvas(box, W, H, "Partículas se espalhando numa caixa")
  const plot = chart(box, 520, 110, "Fração de partículas na metade esquerda ao longo do tempo")
  const line = svg("polyline", { class: "curve page" })
  const half = svg("line", { x1: 10, x2: 510, y1: 55, y2: 55, class: "page-line" })
  plot.append(half, line)
  const btns = btnRow(box, reverse ? ["Recomeçar", "Inverter as velocidades", "Pausar"] : ["Recomeçar", "Pausar"])
  const [rL, rS] = readouts(box, ["Na metade esquerda", "Entropia de mistura"])
  const msg = note(box)
  const N = 100
  type Pt = { x: number; y: number; vx: number; vy: number }
  let ps: Pt[] = []
  let hist: number[] = []
  let t = 0
  let reversedAt = -1
  const lnC = (n: number, k: number) => {
    let s = 0
    for (let i = 1; i <= k; i++) s += Math.log((n - k + i) / i)
    return s
  }
  const reset = () => {
    const r = rng(9)
    ps = []
    while (ps.length < N) {
      const p = { x: 8 + r() * (W / 2 - 16), y: 8 + r() * (H - 16), vx: 0, vy: 0 }
      if (ps.every((q) => Math.hypot(q.x - p.x, q.y - p.y) > 2 * RAD + 1)) {
        const a = r() * 2 * Math.PI
        p.vx = 1.6 * Math.cos(a)
        p.vy = 1.6 * Math.sin(a)
        ps.push(p)
      }
    }
    hist = []
    t = 0
    reversedAt = -1
  }
  const drift = (h: number) => {
    for (const p of ps) {
      p.x += h * p.vx
      p.y += h * p.vy
      if (p.x < RAD) (p.x = 2 * RAD - p.x), (p.vx = -p.vx)
      if (p.x > W - RAD) (p.x = 2 * (W - RAD) - p.x), (p.vx = -p.vx)
      if (p.y < RAD) (p.y = 2 * RAD - p.y), (p.vy = -p.vy)
      if (p.y > H - RAD) (p.y = 2 * (H - RAD) - p.y), (p.vy = -p.vy)
    }
  }
  const physics = () => {
    drift(0.5)
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const a = ps[i], b = ps[j]
        const dx = b.x - a.x, dy = b.y - a.y
        const d2 = dx * dx + dy * dy
        if (d2 < 4 * RAD * RAD && d2 > 0) {
          const dvx = b.vx - a.vx, dvy = b.vy - a.vy
          const dot = dvx * dx + dvy * dy
          if (dot < 0) {
            const k = dot / d2
            a.vx += k * dx; a.vy += k * dy
            b.vx -= k * dx; b.vy -= k * dy
          }
        }
      }
    }
    drift(0.5)
    t++
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--lightgray")
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1)
    ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke()
    ctx.setLineDash([])
    ps.forEach((p, i) => {
      ctx.fillStyle = i % 2 ? cssVar("--secondary") : cssVar("--tertiary")
      ctx.beginPath(); ctx.arc(p.x, p.y, RAD, 0, 2 * Math.PI); ctx.fill()
    })
    const left = ps.filter((p) => p.x < W / 2).length
    hist.push(left / N)
    if (hist.length > 500) hist.shift()
    line.setAttribute("points", pts(hist.map((f, i) => [10 + i, 105 - f * 100])))
    rL.textContent = `${left} de ${N}`
    rS.textContent = `${fmt(lnC(N, left) / Math.LN2, 1)} bits`
    if (reverse && reversedAt >= 0) {
      const back = t - reversedAt
      if (back >= reversedAt && l.running) {
        l.running = false
        pause.textContent = "Rodar"
        msg.textContent =
          left > 0.9 * N
            ? `De volta ao começo: ${left} de ${N} na esquerda. As leis do movimento funcionam igual nos dois sentidos.`
            : `Só ${left} de ${N} voltaram: pequenas imprecisões (do arredondamento e do passo da simulação) cresceram a cada colisão. Desfazer a mistura exige precisão perfeita.`
      } else if (back < reversedAt) {
        msg.textContent = "Filme rodando de trás para frente: cada colisão é desfeita..."
      }
    } else if (reverse) {
      msg.textContent = "Deixe misturar e aperte inverter. Inverta cedo (uns 3 segundos) e depois tente inverter bem mais tarde (uns 10 segundos). As cores só ajudam a acompanhar as partículas."
    } else {
      msg.textContent =
        left === N
          ? "Todas começam na esquerda: um único arranjo, entropia de mistura zero (contando só esquerda e direita)."
          : "Agora há mais de 10²⁹ arranjos com metade de cada lado e só um com todas à esquerda. Por isso o gás não volta sozinho: não é proibido, é improvável demais."
    }
  }
  const pause = btns[btns.length - 1]
  const l = loop(box, () => (physics(), draw()))
  btns[0].addEventListener("click", () => (reset(), (l.running = true), (pause.textContent = "Pausar"), draw()))
  if (reverse) {
    btns[1].addEventListener("click", () => {
      ps.forEach((p) => ((p.vx = -p.vx), (p.vy = -p.vy)))
      reversedAt = t
    })
  }
  pause.textContent = l.running ? "Pausar" : "Rodar"
  pause.addEventListener("click", () => {
    l.running = !l.running
    pause.textContent = l.running ? "Pausar" : "Rodar"
  })
  reset()
  draw()
}

function freeEnergy(box: HTMLElement) {
  const dH = 6010, Tm = 273.15, dS = dH / Tm
  const W = 520, H = 230, P = 40
  const s = chart(box, W, H, "Energia livre de fusão do gelo pela temperatura")
  const X = (t: number) => P + ((t - 243) / 60) * (W - P - 20)
  const Y = (g: number) => H / 2 - (g / 700) * (H / 2 - 20)
  s.append(svg("line", { x1: P, x2: W - 10, y1: Y(0), y2: Y(0), class: "axis" }), svg("line", { x1: X(Tm), x2: X(Tm), y1: 10, y2: H - 10, class: "page-line" }))
  const g = svg("polyline", { class: "curve page" })
  const dot = svg("circle", { r: 6, class: "dot" })
  const l1 = svg("text", { x: P + 4, y: 22, class: "tick" })
  l1.textContent = "ΔG > 0: o gelo é estável"
  const l2 = svg("text", { x: W - 14, y: H - 12, class: "tick", "text-anchor": "end" })
  l2.textContent = "ΔG < 0: a água é estável"
  s.append(g, dot, l1, l2)
  const line: [number, number][] = []
  for (let t = 243; t <= 303; t += 1) line.push([X(t), Y(dH - t * dS)])
  g.setAttribute("points", pts(line))
  const st = slider(box, "Temperatura", 248, 298, 263)
  const [rH, rTS, rG] = readouts(box, ["ΔH (energia para derreter)", "TΔS (ganho de desordem)", "ΔG = ΔH − TΔS"])
  const msg = note(box)
  const render = () => {
    const T = Number(st.input.value)
    st.out.textContent = `${T} K (${fmt(T - 273.15, 0)} °C)`
    const G = dH - T * dS
    dot.setAttribute("cx", String(X(T)))
    dot.setAttribute("cy", String(Y(G)))
    rH.textContent = `${fmt(dH, 0)} J/mol`
    rTS.textContent = `${fmt(T * dS, 0)} J/mol`
    rG.textContent = Math.abs(T - Tm) < 1 ? "≈ 0" : `${fmt(G, 0)} J/mol`
    msg.textContent =
      Math.abs(T - Tm) < 1
        ? "No ponto de fusão, ΔG = 0: gelo e água convivem em equilíbrio."
        : G > 0
          ? "Abaixo de 0 °C, a energia para desfazer o cristal pesa mais que o ganho de entropia: o gelo vence."
          : "Acima de 0 °C, o termo TΔS (mais temperatura vezes mais desordem) supera ΔH: a água líquida vence."
  }
  st.input.addEventListener("input", render)
  render()
}

function shannon(box: HTMLElement) {
  const W = 520, H = 200, P = 36
  const s = chart(box, W, H, "Entropia de uma moeda viciada")
  axes(s, W, H, P, "chance de cara (p)", "bits")
  const H2 = (p: number) => (p <= 0 || p >= 1 ? 0 : -p * Math.log2(p) - (1 - p) * Math.log2(1 - p))
  const X = (p: number) => P + p * (W - P - 20)
  const Y = (b: number) => H - P - b * (H - P - 20)
  const curve: [number, number][] = []
  for (let i = 0; i <= 100; i++) curve.push([X(i / 100), Y(H2(i / 100))])
  const c = svg("polyline", { class: "curve page", points: pts(curve) })
  const dot = svg("circle", { r: 6, class: "dot" })
  s.append(c, dot)
  const sp = slider(box, "Chance de cara", 0, 100, 50)
  const seq = el("p", "lab-thread")
  box.appendChild(seq)
  const [bGen] = btnRow(box, ["Jogar 40 vezes"])
  const [rH, rK] = readouts(box, ["Entropia por lançamento", "1000 lançamentos cabem em"])
  const msg = note(box)
  const gen = () => {
    const p = Number(sp.input.value) / 100
    let out = ""
    for (let i = 0; i < 40; i++) out += Math.random() < p ? "●" : "○"
    seq.textContent = `${out}   (● cara, ○ coroa)`
  }
  const render = () => {
    const p = Number(sp.input.value) / 100
    sp.out.textContent = `${Math.round(p * 100)}%`
    dot.setAttribute("cx", String(X(p)))
    dot.setAttribute("cy", String(Y(H2(p))))
    rH.textContent = `${fmt(H2(p), 3)} bit`
    rK.textContent = `${fmt(1000 * H2(p), 0)} bits`
    msg.textContent =
      p === 0.5
        ? "Moeda honesta: cada lançamento é 1 bit inteiro de surpresa. Não dá para comprimir."
        : H2(p) < 0.1
          ? "Quase sempre o mesmo lado: quase nenhuma surpresa, quase nenhuma informação. A sequência comprime muito."
          : "Quanto mais previsível a moeda, menos bits por lançamento são precisos, em média, para descrever a sequência."
    gen()
  }
  sp.input.addEventListener("input", render)
  bGen.addEventListener("click", gen)
  render()
}

function cooling(box: HTMLElement) {
  const W = 520, H = 230, P = 44
  const s = chart(box, W, H, "Temperatura a cada etapa de resfriamento, em escala logarítmica")
  axes(s, W, H, P, "etapas", "temperatura (log)")
  const curve = svg("polyline", { class: "curve page" })
  const marks = svg("g", {})
  s.append(marks, curve)
  const sr = slider(box, "Cada etapa deixa a temperatura em", 10, 90, 50, 5)
  const [r1, r2, r3] = readouts(box, ["Etapas até 1 mK", "Etapas até 1 nK", "Etapas até 0 K"])
  const msg = note(box)
  const X = (k: number) => P + (k / 60) * (W - P - 20)
  const Y = (t: number) => H - P - ((Math.log10(t) + 12) / 15) * (H - P - 20)
  ;[[300, "300 K"], [1e-3, "1 mK"], [1e-9, "1 nK"]].forEach(([t, l]) => {
    marks.appendChild(svg("line", { x1: P, x2: W - 10, y1: Y(t as number), y2: Y(t as number), class: "grid" }))
    const tx = svg("text", { x: P - 4, y: Y(t as number) + 4, class: "tick", "text-anchor": "end" })
    tx.textContent = l as string
    marks.appendChild(tx)
  })
  const render = () => {
    const f = Number(sr.input.value) / 100
    sr.out.textContent = `${Math.round(f * 100)}% da anterior`
    const line: [number, number][] = []
    for (let k = 0; k <= 60; k++) {
      const t = 300 * f ** k
      if (t < 1e-12) break
      line.push([X(k), Y(t)])
    }
    curve.setAttribute("points", pts(line))
    const steps = (target: number) => Math.ceil(Math.log(target / 300) / Math.log(f))
    r1.textContent = String(steps(1e-3))
    r2.textContent = String(steps(1e-9))
    r3.textContent = "nunca"
    msg.textContent = "Este modelo de fração fixa é uma caricatura: na vida real, perto do zero cada etapa rende cada vez menos, porque quase não sobra entropia para retirar. A terceira lei garante que o zero absoluto não se alcança num número finito de etapas."
  }
  sr.input.addEventListener("input", render)
  render()
}

function ising(box: HTMLElement) {
  const L = 64, S = 5
  const ctx = canvas(box, L * S, L * S, "Ímã de spins: modelo de Ising")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "340px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const st = slider(box, "Temperatura (em unidades de J/k_B)", 100, 400, 150, 5)
  const btns = btnRow(box, ["Bagunçar tudo", "Alinhar tudo", "Pausar"])
  const [rM, rT] = readouts(box, ["Magnetização", "Temperatura / crítica"])
  const msg = note(box)
  const Tc = 2 / Math.log(1 + Math.SQRT2)
  const r = rng(21)
  let spin = new Int8Array(L * L).map(() => (r() < 0.5 ? 1 : -1))
  const at = (x: number, y: number) => spin[((y + L) % L) * L + ((x + L) % L)]
  const sweep = () => {
    const T = Number(st.input.value) / 100
    for (let k = 0; k < L * L; k++) {
      const x = Math.floor(Math.random() * L), y = Math.floor(Math.random() * L)
      const s = spin[y * L + x]
      const dE = 2 * s * (at(x + 1, y) + at(x - 1, y) + at(x, y + 1) + at(x, y - 1))
      if (dE <= 0 || Math.random() < Math.exp(-dE / T)) spin[y * L + x] = -s as 1 | -1
    }
  }
  const draw = () => {
    const up = cssVar("--tertiary"), down = cssVar("--lightgray")
    for (let y = 0; y < L; y++) for (let x = 0; x < L; x++) {
      ctx.fillStyle = spin[y * L + x] > 0 ? up : down
      ctx.fillRect(x * S, y * S, S, S)
    }
    const m = spin.reduce((a, b) => a + b, 0) / (L * L)
    const T = Number(st.input.value) / 100
    rM.textContent = `${fmt(Math.abs(m) * 100, 0)}%`
    rT.textContent = fmt(T / Tc, 2)
    msg.textContent =
      T < 0.9 * Tc
        ? "Frio: os spins vizinhos se alinham e formam domínios grandes. Com o tempo, um lado vence (às vezes ficam faixas presas por muito tempo): o material vira ímã."
        : T > 1.1 * Tc
          ? "Quente: a agitação térmica vence o alinhamento. A magnetização média fica perto de zero."
          : "Perto da temperatura crítica: domínios de todos os tamanhos aparecem e somem. É uma transição de fase."
  }
  const l = loop(box, () => (sweep(), sweep(), draw()))
  btns[0].addEventListener("click", () => ((spin = spin.map(() => (Math.random() < 0.5 ? 1 : -1))), draw()))
  btns[1].addEventListener("click", () => (spin.fill(1), draw()))
  btns[2].textContent = l.running ? "Pausar" : "Rodar"
  btns[2].addEventListener("click", () => {
    l.running = !l.running
    btns[2].textContent = l.running ? "Pausar" : "Rodar"
  })
  st.input.addEventListener("input", () => (st.out.textContent = fmt(Number(st.input.value) / 100, 2), draw()))
  st.out.textContent = fmt(Number(st.input.value) / 100, 2)
  draw()
}

const G_EARTH = 9.81
const nz = (v: number) => (Math.abs(v) < 0.005 ? 0 : v)


function playBtn(box: HTMLElement, l: { running: boolean }, row?: HTMLElement) {
  const b = button(row ?? (box.appendChild(el("div", "lab-btns")) as HTMLElement), l.running ? "Pausar" : "Rodar", true)
  b.addEventListener("click", () => {
    l.running = !l.running
    b.textContent = l.running ? "Pausar" : "Rodar"
  })
  return () => (b.textContent = l.running ? "Pausar" : "Rodar")
}

function drop(box: HTMLElement) {
  const W = 520, H = 260, H0 = 1.6
  const ctx = canvas(box, W, H, "Martelo e pena caindo")
  const modes: [string, number, boolean][] = [["Terra, com ar", G_EARTH, true], ["Terra, sem ar", G_EARTH, false], ["Lua", 1.62, false]]
  const bs = btnRow(box, modes.map((m) => m[0]))
  const [bGo] = btnRow(box, ["Soltar de novo"])
  const [rH, rF] = readouts(box, ["Martelo chega em", "Pena chega em"])
  const msg = note(box)
  let mode = 0
  let t = 0
  let obj = [{ y: 0, v: 0, done: 0 }, { y: 0, v: 0, done: 0 }]
  const vt = [40, 0.6]
  const reset = () => {
    t = 0
    obj = [{ y: 0, v: 0, done: 0 }, { y: 0, v: 0, done: 0 }]
    rH.textContent = "…"
    rF.textContent = "…"
  }
  const Y = (y: number) => 30 + (y / H0) * (H - 60)
  const draw = () => {
    const c1 = cssVar("--tertiary"), c2 = cssVar("--secondary"), ground = cssVar("--gray"), text = cssVar("--darkgray")
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = ground
    ctx.fillRect(0, H - 28, W, 2)
    ctx.fillStyle = c1
    ctx.fillRect(170, Y(obj[0].y) - 22, 24, 24)
    ctx.fillStyle = c2
    ctx.beginPath()
    ctx.ellipse(340, Y(obj[1].y), 22, 7, 0.3, 0, 2 * Math.PI)
    ctx.fill()
    ctx.fillStyle = text
    ctx.font = "12px monospace"
    ctx.fillText("martelo", 160, H - 8)
    ctx.fillText("pena", 326, H - 8)
    ctx.fillText(`${fmt(t, 2)} s`, 12, 20)
  }
  const step = () => {
    const [, g, air] = modes[mode]
    const dt = 1 / 60
    if (obj.every((o) => o.done)) return draw()
    t += dt
    obj.forEach((o, i) => {
      if (o.done) return
      const drag = air ? (g / vt[i] ** 2) * o.v * o.v : 0
      o.v += (g - drag) * dt
      o.y += o.v * dt
      if (o.y >= H0) {
        o.y = H0
        o.done = t
        ;(i ? rF : rH).textContent = `${fmt(t, 2)} s`
      }
    })
    if (obj.every((o) => o.done)) {
      msg.textContent = air
        ? "No ar, a pena demora muito mais: a resistência do ar quase não freia o martelo, mas segura a pena."
        : mode === 2
          ? "Na Lua não há ar: martelo e pena chegam juntos, só que mais devagar, porque a gravidade é umas seis vezes menor. Foi o que David Scott mostrou em 1971."
          : "Sem ar, os dois chegam juntos: a gravidade acelera tudo igual, qualquer que seja a massa."
    }
    draw()
  }
  bs.forEach((b, i) =>
    b.addEventListener("click", () => {
      mode = i
      bs.forEach((x, j) => x.setAttribute("aria-pressed", String(j === i)))
      reset()
      msg.textContent = "Caindo de 1,6 m..."
      l.running = true
      sync()
    }),
  )
  bs[0].setAttribute("aria-pressed", "true")
  bGo.addEventListener("click", () => ((msg.textContent = "Caindo de 1,6 m..."), reset(), (l.running = true), sync()))
  reset()
  msg.textContent = "Escolha onde soltar. Os dois começam juntos, de 1,6 m de altura."
  const l = loop(box, step)
  const sync = playBtn(box, l, bGo.parentElement as HTMLElement)
  draw()
}

function motionGraphs(box: HTMLElement) {
  const W = 520
  const lane = chart(box, W, 50, "Carro andando numa pista")
  const car = svg("rect", { y: 18, width: 24, height: 14, rx: 3, class: "dot" })
  lane.append(svg("line", { x1: 10, x2: W - 10, y1: 34, y2: 34, class: "axis" }), car)
  const px = chart(box, W, 150, "Posição pelo tempo")
  const pv2 = chart(box, W, 150, "Velocidade pelo tempo")
  const P = 36
  axes(px, W, 150, P, "tempo (s)", "posição (m)")
  axes(pv2, W, 150, P, "tempo (s)", "velocidade (m/s)")
  const cx = svg("polyline", { class: "curve page" }), cv = svg("polyline", { class: "curve alt" })
  const area = svg("polygon", { class: "band" })
  const kx = svg("line", { class: "cursor" }), kv = svg("line", { class: "cursor" })
  const zv = svg("line", { x1: P, x2: W - 10, class: "grid" }), zx = svg("line", { x1: P, x2: W - 10, class: "grid" })
  px.append(zx, cx, kx)
  pv2.append(zv, area, cv, kv)
  const s0 = slider(box, "Velocidade inicial", -10, 10, 0)
  const sa = slider(box, "Aceleração", -30, 30, 15)
  const [rX, rV] = readouts(box, ["Posição agora", "Velocidade agora"])
  const msg = note(box)
  let t = 0
  const T = 10
  const X = (tt: number) => P + (tt / T) * (W - P - 20)
  const state = () => ({ v0: Number(s0.input.value), a: Number(sa.input.value) / 10 })
  const render = () => {
    const { v0, a } = state()
    s0.out.textContent = `${v0} m/s`
    sa.out.textContent = `${fmt(a, 1)} m/s²`
    const xs: number[] = [], vs: number[] = []
    for (let i = 0; i <= 100; i++) {
      const tt = (T * i) / 100
      xs.push(v0 * tt + (a * tt * tt) / 2)
      vs.push(v0 + a * tt)
    }
    const xmax = Math.max(10, ...xs.map(Math.abs)), vmax = Math.max(5, ...vs.map(Math.abs))
    const YX = (x: number) => 60 - (x / xmax) * 45
    const YV = (v: number) => 60 - (v / vmax) * 45
    zx.setAttribute("y1", "60"); zx.setAttribute("y2", "60")
    zv.setAttribute("y1", "60"); zv.setAttribute("y2", "60")
    cx.setAttribute("points", pts(xs.map((x, i) => [X((T * i) / 100), YX(x)])))
    cv.setAttribute("points", pts(vs.map((v, i) => [X((T * i) / 100), YV(v)])))
    const k = Math.round((t / T) * 100)
    area.setAttribute("points", pts([[X(0), YV(0)], ...vs.slice(0, k + 1).map((v, i) => [X((T * i) / 100), YV(v)] as [number, number]), [X(t), YV(0)]]))
    for (const [line, y1, y2] of [[kx, 10, 114], [kv, 10, 114]] as const) {
      line.setAttribute("x1", String(X(t))); line.setAttribute("x2", String(X(t)))
      line.setAttribute("y1", String(y1)); line.setAttribute("y2", String(y2))
    }
    const x = v0 * t + (a * t * t) / 2, v = v0 + a * t
    car.setAttribute("x", String(W / 2 - 12 + (x / xmax) * (W / 2 - 30)))
    rX.textContent = `${fmt(x, 1)} m`
    rV.textContent = `${fmt(v, 1)} m/s`
    msg.textContent =
      a === 0 && v0 === 0
        ? "Parado: posição constante e velocidade zero, duas retas horizontais."
        : a === 0
          ? "Sem aceleração, a velocidade é uma reta horizontal e a posição, uma reta inclinada."
        : "A inclinação do gráfico de posição é a velocidade; a do gráfico de velocidade é a aceleração. A área sombreada sob a velocidade é o deslocamento até agora."
  }
  s0.input.addEventListener("input", () => ((t = 0), render()))
  sa.input.addEventListener("input", () => ((t = 0), render()))
  const l = loop(box, () => {
    t += 1 / 60
    if (t > T) t = 0
    render()
  })
  playBtn(box, l)
  render()
}

function skaters(box: HTMLElement) {
  const W = 520, H = 120
  const ctx = canvas(box, W, H, "Dois patinadores se empurrando")
  const s1 = slider(box, "Massa do patinador laranja", 30, 100, 60)
  const s2 = slider(box, "Massa do patinador azul", 30, 100, 40)
  const [bPush] = btnRow(box, ["Empurrar (120 N por 0,5 s)"])
  const [rA, rV, rP] = readouts(box, ["Acelerações", "Velocidades depois", "Momento total"])
  const msg = note(box)
  let t = -1, x1 = W / 2 - 20, x2 = W / 2 + 20
  const F = 120, dt = 0.5
  const draw = () => {
    const m1 = Number(s1.input.value), m2 = Number(s2.input.value)
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = cssVar("--gray")
    ctx.fillRect(0, H - 20, W, 2)
    ctx.fillStyle = cssVar("--tertiary")
    ctx.beginPath(); ctx.arc(x1, H - 40, 6 + m1 / 8, 0, 2 * Math.PI); ctx.fill()
    ctx.fillStyle = cssVar("--secondary")
    ctx.beginPath(); ctx.arc(x2, H - 40, 6 + m2 / 8, 0, 2 * Math.PI); ctx.fill()
  }
  const render = () => {
    const m1 = Number(s1.input.value), m2 = Number(s2.input.value)
    s1.out.textContent = `${m1} kg`
    s2.out.textContent = `${m2} kg`
    const v1 = (F * dt) / m1, v2 = (F * dt) / m2
    rA.textContent = `${fmt(F / m1, 2)} e ${fmt(F / m2, 2)} m/s²`
    rV.textContent = `${fmt(v1, 2)} e ${fmt(v2, 2)} m/s`
    rP.textContent = `${fmt(nz(m1 * -v1 + m2 * v2), 1)} kg·m/s`
    msg.textContent = m1 === m2
      ? "Massas iguais: os dois sentem 120 N, aceleram igual e saem com a mesma velocidade, em sentidos opostos. O momento total continua zero."
      : "Os dois sentem a mesma força de 120 N, em sentidos opostos. O mais leve acelera mais. O momento total continua zero: o que um ganha para a esquerda, o outro ganha para a direita."
    draw()
  }
  const l = loop(box, () => {
    if (t < 0) return draw()
    const m1 = Number(s1.input.value), m2 = Number(s2.input.value)
    t += 1 / 60
    const tt = Math.min(t, dt)
    const s = (m: number) => (F / m) * (tt * tt / 2 + (t > dt ? dt * (t - dt) : 0))
    x1 = W / 2 - 20 - s(m1) * 40
    x2 = W / 2 + 20 + s(m2) * 40
    if (x1 < 20 || x2 > W - 20) t = -1
    draw()
  })
  bPush.addEventListener("click", () => {
    x1 = W / 2 - 20; x2 = W / 2 + 20; t = 0
    if (!l.running) l.running = true
  })
  s1.input.addEventListener("input", render)
  s2.input.addEventListener("input", render)
  render()
}

function cannon(box: HTMLElement) {
  const W = 360, H = 360, C = 180, RE = 6.371e6, GM = 3.986e14, SC = 42 / RE
  const ctx = canvas(box, W, H, "Canhão de Newton disparando do alto de uma montanha")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "380px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const r0 = RE * 1.05
  const vc = Math.sqrt(GM / r0), ve = Math.sqrt((2 * GM) / r0)
  const sv = slider(box, "Velocidade do disparo", 0, 120, 77)
  const [bFire] = btnRow(box, ["Disparar"])
  const [rV, rC, rE] = readouts(box, ["Disparo", "Para órbita circular", "Para escapar"])
  const msg = note(box)
  let path: [number, number][] = []
  let st = { x: 0, y: r0, vx: 0, vy: 0, on: false, t: 0 }
  const fire = () => {
    const v = (Number(sv.input.value) / 10) * 1000
    st = { x: 0, y: r0, vx: v, vy: 0, on: true, t: 0 }
    path = [[0, r0]]
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = cssVar("--lightgray")
    ctx.beginPath(); ctx.arc(C, C, RE * SC, 0, 2 * Math.PI); ctx.fill()
    ctx.fillStyle = cssVar("--gray")
    ctx.beginPath(); ctx.moveTo(C - 8, C - RE * SC + 1); ctx.lineTo(C, C - r0 * SC); ctx.lineTo(C + 8, C - RE * SC + 1); ctx.fill()
    ctx.strokeStyle = cssVar("--tertiary")
    ctx.lineWidth = 2
    ctx.beginPath()
    path.forEach(([x, y], i) => (i ? ctx.lineTo(C + x * SC, C - y * SC) : ctx.moveTo(C + x * SC, C - y * SC)))
    ctx.stroke()
    ctx.fillStyle = cssVar("--tertiary")
    ctx.beginPath(); ctx.arc(C + st.x * SC, C - st.y * SC, 4, 0, 2 * Math.PI); ctx.fill()
  }
  const step = () => {
    if (!st.on) return draw()
    const h = 20
    for (let k = 0; k < 5; k++) {
      const r = Math.hypot(st.x, st.y)
      const a = -GM / r ** 3
      st.vx += a * st.x * h; st.vy += a * st.y * h
      st.x += st.vx * h; st.y += st.vy * h
      st.t += h
      const rr = Math.hypot(st.x, st.y)
      if (rr <= RE) { st.on = false; break }
      if (rr > RE * 4.2 || st.t > 6e4) { st.on = false; break }
    }
    path.push([st.x, st.y])
    draw()
  }
  const render = () => {
    const v = Number(sv.input.value) / 10
    sv.out.textContent = `${fmt(v, 1)} km/s`
    rV.textContent = `${fmt(v, 1)} km/s`
    rC.textContent = `${fmt(vc / 1000, 1)} km/s`
    rE.textContent = `${fmt(ve / 1000, 1)} km/s`
    msg.textContent =
      v * 1000 < 0.97 * vc
        ? "Devagar demais: a bala cai no chão. Quanto mais rápido o disparo, mais longe ela cai, porque o chão curvo vai \"fugindo\" dela."
        : v * 1000 < 1.03 * vc
          ? "Na velocidade certa, a bala cai o tempo todo, mas o chão se curva na mesma medida: é uma órbita, como a da Lua."
          : v * 1000 < ve
            ? "Mais rápido que o circular: a órbita vira uma elipse que se afasta e volta."
            : "Acima da velocidade de escape: a bala vai embora e não volta."
  }
  sv.input.addEventListener("input", render)
  bFire.addEventListener("click", () => (fire(), (l.running = true)))
  const l = loop(box, step)
  render()
  fire()
  draw()
}

function seesaw(box: HTMLElement) {
  const W = 520, H = 200
  const s = chart(box, W, H, "Gangorra")
  const g = svg("g", {})
  const plank = svg("rect", { x: 60, y: 126, width: 400, height: 8, rx: 3, class: "shape" })
  const b1 = svg("circle", { r: 14, class: "dot" })
  const b2 = svg("circle", { r: 14, class: "pt" })
  g.append(plank, b1, b2)
  s.append(svg("polygon", { points: "245,180 275,180 260,134", class: "axis", fill: "none" }), g)
  const sm1 = slider(box, "Massa laranja", 10, 80, 30)
  const sd1 = slider(box, "Distância laranja ao eixo", 2, 20, 20)
  const sm2 = slider(box, "Massa azul", 10, 80, 40)
  const sd2 = slider(box, "Distância azul ao eixo", 2, 20, 15)
  const [r1, r2] = readouts(box, ["Torque laranja", "Torque azul"])
  const msg = note(box)
  const render = () => {
    const m1 = Number(sm1.input.value), d1 = Number(sd1.input.value) / 10, m2 = Number(sm2.input.value), d2 = Number(sd2.input.value) / 10
    sm1.out.textContent = `${m1} kg`; sd1.out.textContent = `${fmt(d1, 1)} m`
    sm2.out.textContent = `${m2} kg`; sd2.out.textContent = `${fmt(d2, 1)} m`
    const t1 = m1 * G_EARTH * d1, t2 = m2 * G_EARTH * d2
    const ang = Math.max(-14, Math.min(14, (t1 - t2) / 25))
    g.setAttribute("transform", `rotate(${-ang} 260 130)`)
    b1.setAttribute("cx", String(260 - d1 * 95)); b1.setAttribute("cy", "112")
    b2.setAttribute("cx", String(260 + d2 * 95)); b2.setAttribute("cy", "112")
    r1.textContent = `${fmt(t1, 0)} N·m`
    r2.textContent = `${fmt(t2, 0)} N·m`
    msg.textContent =
      m1 * Number(sd1.input.value) === m2 * Number(sd2.input.value)
        ? "Equilíbrio: peso vezes distância é igual dos dois lados. É a lei da alavanca de Arquimedes."
        : `O lado ${t1 > t2 ? "laranja" : "azul"} desce: tem mais torque. Afaste do eixo quem está do lado que subiu (${t1 > t2 ? "azul" : "laranja"}) ou aproxime quem desceu.`
  }
  ;[sm1, sd1, sm2, sd2].forEach((x) => x.input.addEventListener("input", render))
  render()
}

function skate(box: HTMLElement) {
  const W = 520, H = 220
  const ctx = canvas(box, W, H, "Skatista numa rampa em U")
  const bars = chart(box, 520, 70, "Energias")
  const bk = svg("rect", { y: 8, height: 14, class: "pt" })
  const bp = svg("rect", { y: 28, height: 14, class: "dot" })
  const bh = svg("rect", { y: 48, height: 14, class: "bar" })
  const lab = (y: number, t: string) => { const e = svg("text", { x: 4, y, class: "tick" }); e.textContent = t; return e }
  bars.append(bk, bp, bh, lab(19, "cinética"), lab(39, "potencial"), lab(59, "calor"))
  const sh = slider(box, "Altura de onde solta", 10, 40, 30)
  const [bFric, bGo] = btnRow(box, ["Atrito: desligado", "Soltar"])
  const [rV] = readouts(box, ["Velocidade agora"])
  const msg = note(box)
  const m = 50, A = 4
  const y = (x: number) => A * x * x
  let fric = false
  const NS = 4000
  const XS: number[] = [], SS: number[] = []
  for (let i = 0; i <= NS; i++) {
    const xx = -1.3 + (2.6 * i) / NS
    XS.push(xx)
    SS.push(i ? SS[i - 1] + Math.hypot(XS[i] - XS[i - 1], y(XS[i]) - y(XS[i - 1])) : 0)
  }
  const xOf = (sv: number) => {
    let lo = 0, hi = NS
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; SS[mid] < sv ? (lo = mid) : (hi = mid) }
    const f2 = (sv - SS[lo]) / (SS[hi] - SS[lo] || 1)
    return XS[lo] + f2 * (XS[hi] - XS[lo])
  }
  const sOf = (xx: number) => SS[Math.round(((xx + 1.3) / 2.6) * NS)]
  let x = -1, sPos = 0, v = 0, E0 = 0
  const reset = () => {
    const h = Number(sh.input.value) / 10
    x = -Math.sqrt(h / A); sPos = sOf(x); v = 0
    E0 = m * G_EARTH * y(x)
  }
  const PX = (xx: number) => W / 2 + xx * 180
  const PY = (yy: number) => H - 20 - yy * 45
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--gray")
    ctx.lineWidth = 3
    ctx.beginPath()
    for (let i = 0; i <= 100; i++) { const xx = -1.3 + (2.6 * i) / 100; i ? ctx.lineTo(PX(xx), PY(y(xx))) : ctx.moveTo(PX(xx), PY(y(xx))) }
    ctx.stroke()
    ctx.fillStyle = cssVar("--tertiary")
    ctx.beginPath(); ctx.arc(PX(x), PY(y(x)) - 9, 9, 0, 2 * Math.PI); ctx.fill()
    const ke = 0.5 * m * v * v
    const pe = m * G_EARTH * y(x)
    const heat = Math.max(0, E0 - ke - pe)
    const Wd = (e: number) => String(Math.max(0, (e / Math.max(E0, 1)) * 420))
    bk.setAttribute("x", "80"); bk.setAttribute("width", Wd(ke))
    bp.setAttribute("x", "80"); bp.setAttribute("width", Wd(pe))
    bh.setAttribute("x", "80"); bh.setAttribute("width", Wd(heat))
    rV.textContent = `${fmt(Math.abs(v), 1)} m/s`
  }
  const step = () => {
    const dt = 1 / 240
    for (let k = 0; k < 4; k++) {
      const slope = 2 * A * x
      const at = (-G_EARTH * slope) / Math.sqrt(1 + slope * slope) - (fric ? 0.6 * v : 0)
      v += at * dt
      sPos += v * dt
      x = xOf(sPos)
    }
    draw()
  }
  const render = () => {
    sh.out.textContent = `${fmt(Number(sh.input.value) / 10, 1)} m`
    bFric.textContent = fric ? "Atrito: ligado" : "Atrito: desligado"
    msg.textContent = fric
      ? "Com atrito, parte da energia vira calor a cada passada, e o skatista sobe cada vez menos até parar no fundo."
      : "Sem atrito, a energia só troca de forma: embaixo é toda cinética, em cima toda potencial. Ele volta sempre à mesma altura."
  }
  sh.input.addEventListener("input", () => (reset(), render(), draw()))
  bFric.addEventListener("click", () => ((fric = !fric), reset(), render(), draw()))
  bGo.addEventListener("click", () => (reset(), (l.running = true)))
  const l = loop(box, step)
  reset(); render(); draw()
}

function collide(box: HTMLElement) {
  const W = 520, H = 110
  const ctx = canvas(box, W, H, "Dois blocos colidindo")
  const s1 = slider(box, "Massa do bloco laranja", 1, 10, 2)
  const s2 = slider(box, "Massa do bloco azul", 1, 10, 2)
  const se = slider(box, "Elasticidade (0 = grudam, 1 = elástica)", 0, 10, 10)
  const [bGo] = btnRow(box, ["Colidir"])
  const [rP, rK, rV] = readouts(box, ["Momento antes → depois", "Energia cinética antes → depois", "Velocidades depois"])
  const msg = note(box)
  const v0 = 4
  let x1 = 60, x2 = 300, u1 = v0, u2 = 0, hit = false
  const size = (m: number) => 18 + m * 3
  const finals = () => {
    const m1 = Number(s1.input.value), m2 = Number(s2.input.value), e = Number(se.input.value) / 10
    const p = m1 * v0
    return { m1, m2, e, w1: (p - m2 * e * v0) / (m1 + m2), w2: (p + m1 * e * v0) / (m1 + m2) }
  }
  const draw = () => {
    const { m1, m2 } = finals()
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = cssVar("--gray"); ctx.fillRect(0, H - 18, W, 2)
    ctx.fillStyle = cssVar("--tertiary"); ctx.fillRect(x1 - size(m1), H - 18 - size(m1), size(m1), size(m1))
    ctx.fillStyle = cssVar("--secondary"); ctx.fillRect(x2, H - 18 - size(m2), size(m2), size(m2))
  }
  const render = () => {
    const { m1, m2, e, w1, w2 } = finals()
    s1.out.textContent = `${m1} kg`; s2.out.textContent = `${m2} kg`; se.out.textContent = fmt(e, 1)
    const k0 = 0.5 * m1 * v0 * v0, k1 = 0.5 * m1 * w1 * w1 + 0.5 * m2 * w2 * w2
    rP.textContent = `${fmt(m1 * v0, 1)} → ${fmt(m1 * w1 + m2 * w2, 1)} kg·m/s`
    rK.textContent = `${fmt(k0, 1)} → ${fmt(k1, 1)} J`
    rV.textContent = `${fmt(w1, 2)} e ${fmt(w2, 2)} m/s`
    msg.textContent =
      e === 1
        ? m1 === m2
          ? "Elástica com massas iguais: o laranja para e o azul sai com a velocidade dele, como no pêndulo de Newton."
          : "Elástica: o momento e a energia cinética se conservam."
        : e === 0
          ? "Perfeitamente inelástica: os blocos grudam. O momento se conserva, mas parte da energia cinética vira deformação e calor."
          : "O momento total sempre se conserva. A energia cinética diminui tanto mais quanto menos elástica for a batida."
  }
  const reset = () => { x1 = 60; x2 = 300; u1 = v0; u2 = 0; hit = false }
  const l = loop(box, () => {
    const { m1, w1, w2 } = finals()
    const s = 40 / 60
    x1 += u1 * s; x2 += u2 * s
    if (!hit && x1 >= x2) { hit = true; u1 = w1; u2 = w2; x1 = x2 }
    if (x1 - size(m1) > W || x2 > W + 40 || x1 < -40) reset()
    draw()
  })
  ;[s1, s2, se].forEach((x) => x.input.addEventListener("input", () => (reset(), render(), draw())))
  bGo.addEventListener("click", () => (reset(), (l.running = true), sync()))
  const sync = playBtn(box, l, bGo.parentElement as HTMLElement)
  render(); draw()
}

function spinner(box: HTMLElement) {
  const W = 300, H = 300, C = 150
  const ctx = canvas(box, W, H, "Patinadora girando vista de cima")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "320px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const sr = slider(box, "Distância dos braços ao eixo", 20, 90, 90)
  const [rI, rW, rK] = readouts(box, ["Momento de inércia", "Rotação", "Energia de rotação"])
  const msg = note(box)
  const Ib = 1, ma = 3
  const I = (r: number) => Ib + 2 * ma * r * r
  const L = I(0.9) * 2 * Math.PI
  let ang = 0
  const render = () => {
    const r = Number(sr.input.value) / 100
    sr.out.textContent = `${fmt(r, 2)} m`
    const w = L / I(r)
    rI.textContent = `${fmt(I(r), 2)} kg·m²`
    rW.textContent = `${fmt(w / (2 * Math.PI), 2)} ${Math.abs(w / (2 * Math.PI) - 1) < 0.005 ? "volta" : "voltas"}/s`
    rK.textContent = `${fmt((L * w) / 2, 0)} J`
    msg.textContent = "O momento angular (inércia vezes rotação) fica constante. Puxando os braços, a inércia cai e a rotação sobe. A energia de rotação aumenta: vem do trabalho dos músculos ao puxar os braços."
  }
  const draw = () => {
    const r = Number(sr.input.value) / 100
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 4
    const ex = Math.cos(ang) * r * 140, ey = Math.sin(ang) * r * 140
    ctx.beginPath(); ctx.moveTo(C - ex, C - ey); ctx.lineTo(C + ex, C + ey); ctx.stroke()
    ctx.fillStyle = cssVar("--secondary"); ctx.beginPath(); ctx.arc(C, C, 22, 0, 2 * Math.PI); ctx.fill()
    ctx.fillStyle = cssVar("--tertiary")
    for (const sgn of [1, -1]) { ctx.beginPath(); ctx.arc(C + sgn * ex, C + sgn * ey, 10, 0, 2 * Math.PI); ctx.fill() }
  }
  const l = loop(box, () => {
    ang += L / I(Number(sr.input.value) / 100) / 60
    draw()
  })
  sr.input.addEventListener("input", () => (render(), draw()))
  playBtn(box, l)
  render()
  draw()
}

function buoyancy(box: HTMLElement) {
  const W = 520, H = 220
  const s = chart(box, W, H, "Objeto num líquido")
  const fluid = svg("rect", { x: 20, y: 90, width: W - 40, height: H - 100, class: "band" })
  const surf = svg("line", { x1: 20, x2: W - 20, y1: 90, y2: 90, class: "curve alt" })
  const cube = svg("rect", { x: W / 2 - 40, width: 80, height: 80, class: "shape" })
  s.append(fluid, surf, cube)
  const sd = slider(box, "Densidade do objeto", 100, 3000, 917, 1)
  const fluids: [string, number][] = [["Água doce", 1000], ["Água do mar", 1025], ["Óleo de cozinha", 920], ["Mercúrio", 13534]]
  const bs = btnRow(box, fluids.map((f) => f[0]))
  const [rF, rE, rP] = readouts(box, ["Parte submersa", "Empuxo máximo (1 L)", "Peso (1 L)"])
  const msg = note(box)
  let fi = 0
  const render = () => {
    const rho = Number(sd.input.value), rf = fluids[fi][1]
    sd.out.textContent = `${rho} kg/m³`
    const frac = Math.min(1, rho / rf)
    const sinks = rho > rf
    cube.setAttribute("y", String(sinks ? H - 10 - 80 : 90 - 80 * (1 - frac)))
    rF.textContent = sinks ? "afunda" : `${fmt(frac * 100, 1)}%`
    rE.textContent = `${fmt(rf * 0.001 * G_EARTH, 2)} N`
    rP.textContent = `${fmt(rho * 0.001 * G_EARTH, 2)} N`
    bs.forEach((b, i) => b.setAttribute("aria-pressed", String(i === fi)))
    msg.textContent = sinks
      ? "Mais denso que o líquido: mesmo todo submerso, o empuxo não chega ao peso, e o objeto afunda."
      : rho === rf
        ? "Mesma densidade do líquido: fica parado em qualquer profundidade, totalmente submerso."
        : `Flutua com ${fmt(frac * 100, 1)}% submerso: afunda até deslocar líquido com o mesmo peso que ele. ${rho === 917 ? "Com 917 kg/m³, é gelo." : ""}`
  }
  sd.input.addEventListener("input", render)
  bs.forEach((b, i) => b.addEventListener("click", () => ((fi = i), render())))
  render()
}

function venturi(box: HTMLElement) {
  const W = 520, H = 220
  const ctx = canvas(box, W, H, "Água num cano que afina")
  const sr = slider(box, "Quanto o cano afina (área larga / estreita)", 10, 40, 20)
  const [rV1, rV2, rDP] = readouts(box, ["Velocidade no largo", "Velocidade no estreito", "Queda de pressão"])
  const msg = note(box)
  const v1 = 2
  const r = rng(4)
  const parts = Array.from({ length: 70 }, () => ({ x: r() * W, f: r() * 2 - 1 }))
  const halfW = (x: number, k: number) => {
    const wide = 40, narrow = 40 / Math.sqrt(k)
    const t = Math.min(1, Math.max(0, (Math.abs(x - W / 2) - 60) / 60))
    return narrow + (wide - narrow) * t
  }
  const render = () => {
    const k = Number(sr.input.value) / 10
    sr.out.textContent = `${fmt(k, 1)}×`
    const v2 = v1 * k
    const dp = 0.5 * 1000 * (v2 * v2 - v1 * v1)
    rV1.textContent = `${fmt(v1, 1)} m/s`
    rV2.textContent = `${fmt(v2, 1)} m/s`
    rDP.textContent = `${fmt(dp / 1000, 1)} kPa`
    msg.textContent = k === 1
      ? "Sem estreitamento: mesma velocidade e mesma pressão em todo o cano."
      : "A mesma quantidade de água passa por segundo em todo trecho: no estreito, ela corre mais. Ali a pressão cai (os tubinhos mostram), como Bernoulli previu, num escoamento ideal."
  }
  const draw = (move: boolean) => {
    const k = Number(sr.input.value) / 10
    const cy = 150
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 2
    for (const sgn of [1, -1]) {
      ctx.beginPath()
      for (let x = 0; x <= W; x += 4) { const y = cy + sgn * halfW(x, k); x ? ctx.lineTo(x, y) : ctx.moveTo(x, y) }
      ctx.stroke()
    }
    ctx.fillStyle = cssVar("--secondary")
    for (const p of parts) {
      const hw = halfW(p.x, k)
      if (move) p.x += v1 * (40 / hw) ** 2 * 1.2
      if (p.x > W) p.x -= W
      ctx.beginPath(); ctx.arc(p.x, cy + p.f * (hw - 4), 2.5, 0, 2 * Math.PI); ctx.fill()
    }
    const dpScale = (v: number) => 0.5 * (v * v)
    const base = 95
    for (const [x, v] of [[90, v1], [W / 2, v1 * k], [W - 90, v1]] as [number, number][]) {
      const hgt = base - (dpScale(v) - dpScale(v1)) * 2.5
      const top = cy - halfW(x, k)
      ctx.strokeStyle = cssVar("--darkgray"); ctx.lineWidth = 1
      ctx.strokeRect(x - 5, top - 95, 10, 95)
      ctx.fillStyle = cssVar("--tertiary")
      const hh = Math.max(4, hgt)
      ctx.fillRect(x - 4, top - hh, 8, hh)
    }
  }
  const l = loop(box, () => draw(true))
  sr.input.addEventListener("input", () => (render(), draw(false)))
  playBtn(box, l)
  render()
  draw(false)
}

function impulse(box: HTMLElement) {
  const W = 520, H = 200, P = 40
  const s = chart(box, W, H, "Força ao parar uma bola, pelo tempo")
  axes(s, W, H, P, "tempo (s)", "força (N)")
  const shape = svg("polygon", { class: "shape" })
  s.appendChild(shape)
  const st = slider(box, "Tempo para parar", 5, 300, 100)
  const [rT, rF, rI] = readouts(box, ["Tempo de parada", "Força média", "Impulso (área)"])
  const msg = note(box)
  const p = 0.4 * 10
  const render = () => {
    const dt = Number(st.input.value) / 1000
    st.out.textContent = `${fmt(dt * 1000, 0)} ms`
    const F = p / dt
    const X = (t: number) => P + (t / 0.32) * (W - P - 20)
    const Y = (f: number) => H - P - (Math.min(f, 250) / 250) * (H - P - 20)
    const line: [number, number][] = []
    for (let i = 0; i <= 40; i++) {
      const t = (dt * i) / 40
      line.push([X(t), Y((Math.PI / 2) * F * Math.sin((Math.PI * i) / 40))])
    }
    shape.setAttribute("points", pts([[X(0), Y(0)], ...line, [X(dt), Y(0)]]))
    rT.textContent = `${fmt(dt * 1000, 0)} ms`
    rF.textContent = `${fmt(F, 0)} N`
    rI.textContent = `${fmt(p, 1)} N·s`
    msg.textContent =
      (Math.PI / 2) * F > 250
        ? "Parada brusca: a mesma variação de momento em pouquíssimo tempo exige uma força enorme (o pico sai do gráfico)."
        : "Uma bola de 0,4 kg a 10 m/s. A área sob a curva (o impulso) é sempre a mesma; esticar o tempo achata a força. É o que fazem o airbag e o joelho dobrado."
  }
  st.input.addEventListener("input", render)
  render()
}

function vectorAdd(box: HTMLElement) {
  const W = 320, H = 320, C = 160, U = 14
  const s = chart(box, W, H, "Soma de dois vetores")
  s.style.maxWidth = "360px"
  s.style.margin = "0 auto"
  for (let k = -10; k <= 10; k++) s.append(svg("line", { x1: C + k * U, x2: C + k * U, y1: 10, y2: H - 10, class: k ? "grid" : "axis" }), svg("line", { y1: C + k * U, y2: C + k * U, x1: 10, x2: W - 10, class: k ? "grid" : "axis" }))
  const va = svg("line", { class: "vec a" }), vb = svg("line", { class: "vec b" }), vr = svg("line", { class: "curve page" })
  vr.setAttribute("stroke-dasharray", "6 4")
  const tip = svg("circle", { r: 5, class: "dot" })
  s.append(va, vb, vr, tip)
  const sa = slider(box, "Tamanho do vetor laranja", 0, 5, 3)
  const ta = slider(box, "Ângulo do laranja", 0, 360, 0, 5)
  const sb = slider(box, "Tamanho do vetor azul", 0, 5, 4)
  const tb = slider(box, "Ângulo do azul", 0, 360, 90, 5)
  const [rR, rA, rC] = readouts(box, ["Resultante", "Ângulo", "Componentes (x, y)"])
  const msg = note(box)
  const render = () => {
    const a = Number(sa.input.value), b = Number(sb.input.value)
    const aa = (Number(ta.input.value) * Math.PI) / 180, ab = (Number(tb.input.value) * Math.PI) / 180
    sa.out.textContent = String(a); sb.out.textContent = String(b)
    ta.out.textContent = `${ta.input.value}°`; tb.out.textContent = `${tb.input.value}°`
    const ax = a * Math.cos(aa), ay = a * Math.sin(aa), bx = b * Math.cos(ab), by = b * Math.sin(ab)
    const set = (l: SVGElement, x1: number, y1: number, x2: number, y2: number) => {
      l.setAttribute("x1", String(C + x1 * U)); l.setAttribute("y1", String(C - y1 * U))
      l.setAttribute("x2", String(C + x2 * U)); l.setAttribute("y2", String(C - y2 * U))
    }
    set(va, 0, 0, ax, ay)
    set(vb, ax, ay, ax + bx, ay + by)
    set(vr, 0, 0, ax + bx, ay + by)
    tip.setAttribute("cx", String(C + (ax + bx) * U)); tip.setAttribute("cy", String(C - (ay + by) * U))
    const R = Math.hypot(ax + bx, ay + by)
    rR.textContent = fmt(nz(R), 2)
    rA.textContent = R < 1e-9 ? "—" : `${fmt(((Math.atan2(ay + by, ax + bx) * 180) / Math.PI + 360) % 360, 0)}°`
    rC.textContent = `(${fmt(nz(ax + bx), 2)}; ${fmt(nz(ay + by), 2)})`
    msg.textContent =
      a === 0 && b === 0
        ? "Os dois vetores são nulos: a soma é zero."
        : R < 1e-9
          ? "Mesmo tamanho e sentidos opostos: a soma é zero."
        : "Ponha o azul na ponta do laranja: a resultante (tracejada) vai do começo de um ao fim do outro. Some x com x e y com y."
  }
  ;[sa, ta, sb, tb].forEach((x) => x.input.addEventListener("input", render))
  render()
}

function rk4(f: (y: number[]) => number[], y: number[], h: number) {
  const k1 = f(y)
  const k2 = f(y.map((v, i) => v + (h / 2) * k1[i]))
  const k3 = f(y.map((v, i) => v + (h / 2) * k2[i]))
  const k4 = f(y.map((v, i) => v + h * k3[i]))
  return y.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]))
}

function eulerSteps(box: HTMLElement) {
  const W = 520, H = 230, P = 36
  const s = chart(box, W, H, "Solução exata e método de Euler")
  axes(s, W, H, P, "tempo", "valor")
  const zero = svg("line", { x1: P, x2: W - 10, class: "grid" })
  const exact = svg("polyline", { class: "curve alt" })
  const approx = svg("polyline", { class: "curve page" })
  const dots = svg("g", {})
  s.append(zero, exact, approx, dots)
  const sh = slider(box, "Tamanho do passo (h)", 2, 100, 50)
  const bs = btnRow(box, ["Decaimento: dN/dt = −N", "Oscilação: x'' = −x"])
  const [rE, rA, rErr] = readouts(box, ["Exato no fim", "Euler no fim", "Erro"])
  const msg = note(box)
  let mode = 0
  const render = () => {
    const h = Number(sh.input.value) / 100
    sh.out.textContent = fmt(h, 2)
    const T = mode === 0 ? 4 : 12
    const X = (t: number) => P + (t / T) * (W - P - 20)
    const lim = mode === 0 ? 1.05 : 6
    const Y = (v: number) => (mode === 0 ? H - P - (v / lim) * (H - P - 20) : (H - P) / 2 + 5 - (Math.max(-lim, Math.min(lim, v)) / lim) * ((H - P) / 2 - 10))
    zero.setAttribute("y1", String(Y(0))); zero.setAttribute("y2", String(Y(0)))
    const ex: [number, number][] = []
    for (let i = 0; i <= 200; i++) { const t = (T * i) / 200; ex.push([X(t), Y(mode === 0 ? Math.exp(-t) : Math.cos(t))]) }
    exact.setAttribute("points", pts(ex))
    const ap: [number, number][] = []
    dots.replaceChildren()
    let y = 1, v = 0, t = 0
    while (t <= T + 1e-9) {
      ap.push([X(t), Y(y)])
      if (ap.length % Math.max(1, Math.round(0.1 / h)) === 0 || h >= 0.1) dots.appendChild(svg("circle", { cx: X(t), cy: Y(y), r: 3, class: "dot" }))
      if (mode === 0) y += h * -y
      else { const ny = y + h * v; v += h * -y; y = ny }
      t += h
    }
    approx.setAttribute("points", pts(ap))
    const tEnd = t - h
    const exEnd = mode === 0 ? Math.exp(-tEnd) : Math.cos(tEnd)
    let yy = 1, vv = 0
    for (let k = 0; k < Math.round(tEnd / h); k++) { if (mode === 0) yy += h * -yy; else { const ny = yy + h * vv; vv += h * -yy; yy = ny } }
    rE.textContent = fmt(exEnd, 3)
    rA.textContent = fmt(yy, 3)
    rErr.textContent = fmt(Math.abs(yy - exEnd), 3)
    bs.forEach((b, i) => b.setAttribute("aria-pressed", String(i === mode)))
    msg.textContent =
      mode === 0
        ? h >= 1
          ? "Passo grande demais: com h = 1, Euler já zera tudo no primeiro passo. A reta do passo erra feio quando a curva muda rápido."
          : "Euler anda em retas: usa a inclinação de agora para dar o próximo passo. Passos menores seguem melhor a curva."
        : "Na oscilação, o Euler simples ganha energia a cada passo e a amplitude cresce sem parar, mesmo com passo pequeno. Por isso simulações sérias usam métodos melhores (como Runge-Kutta ou métodos simpléticos, que conservam a energia). A curva é cortada em ±6."
  }
  sh.input.addEventListener("input", render)
  bs.forEach((b, i) => b.addEventListener("click", () => ((mode = i), render())))
  render()
}

function springLab(box: HTMLElement) {
  const W = 520, H = 90
  const ctx = canvas(box, W, H, "Massa presa numa mola")
  const plot = chart(box, 520, 140, "Posição pelo tempo")
  const curve = svg("polyline", { class: "curve page" })
  plot.append(svg("line", { x1: 10, x2: 510, y1: 70, y2: 70, class: "grid" }), curve)
  const sm = slider(box, "Massa", 1, 40, 5)
  const sk = slider(box, "Constante da mola", 5, 100, 20)
  const sb = slider(box, "Amortecimento", 0, 40, 0)
  const [bKick] = btnRow(box, ["Puxar e soltar"])
  const [rT, rF] = readouts(box, ["Período", "Frequência"])
  const msg = note(box)
  let x = 1, v = 0
  const hist: number[] = []
  const params = () => ({ m: Number(sm.input.value) / 10, k: Number(sk.input.value), b: Number(sb.input.value) / 10 })
  const render = () => {
    const { m, k, b } = params()
    sm.out.textContent = `${fmt(m, 1)} kg`; sk.out.textContent = `${k} N/m`; sb.out.textContent = `${fmt(b, 1)} kg/s`
    const crit = 2 * Math.sqrt(k * m)
    const wd2 = k / m - (b / (2 * m)) ** 2
    const T = wd2 > 0 ? (2 * Math.PI) / Math.sqrt(wd2) : Infinity
    rT.textContent = b >= crit ? "—" : `${fmt(T, 2)} s`
    rF.textContent = b >= crit ? "—" : `${fmt(1 / T, 2)} Hz`
    msg.textContent =
      b === 0
        ? "Sem atrito, oscila para sempre. O período só depende da massa e da mola, não de quanto você puxou."
        : b < 0.3 * crit
          ? "Com amortecimento fraco, a amplitude cai como uma exponencial, mas o ritmo quase não muda."
          : b < crit
            ? "O amortecimento já deixa a oscilação visivelmente mais lenta, além de apagá-la depressa."
          : "Amortecimento forte: a massa volta devagar ao centro sem oscilar (como o amortecedor de um carro)."
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const px = W / 2 + x * 120
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(20, 45)
    const n = 14
    for (let i = 1; i < n; i++) ctx.lineTo(20 + ((px - 40) * i) / n, 45 + (i % 2 ? -10 : 10))
    ctx.lineTo(px - 20, 45); ctx.stroke()
    ctx.fillStyle = cssVar("--gray"); ctx.fillRect(14, 20, 6, 50)
    ctx.fillStyle = cssVar("--tertiary"); ctx.fillRect(px - 20, 25, 40, 40)
    curve.setAttribute("points", pts(hist.map((h, i) => [510 - (hist.length - 1 - i) * 1, 70 - h * 55])))
  }
  const l = loop(box, () => {
    const { m, k, b } = params()
    const dt = 1 / 240
    for (let s = 0; s < 4; s++) { v += ((-k * x - b * v) / m) * dt; x += v * dt }
    hist.push(Math.max(-1.2, Math.min(1.2, x)))
    if (hist.length > 500) hist.shift()
    draw()
  })
  ;[sm, sk, sb].forEach((q) => q.input.addEventListener("input", render))
  bKick.addEventListener("click", () => ((x = 1), (v = 0), (l.running = true), sync()))
  const sync = playBtn(box, l, bKick.parentElement as HTMLElement)
  render(); draw()
}

function pendulumLab(box: HTMLElement) {
  const W = 520, H = 250, Lp = 100
  const ctx = canvas(box, W, H, "Pêndulo real e pêndulo de ângulo pequeno")
  const sa = slider(box, "Amplitude", 5, 175, 30)
  const [rR, rS, rD] = readouts(box, ["Período real (1 m)", "Fórmula de ângulo pequeno", "Diferença"])
  const msg = note(box)
  const g = 9.81, L = 1
  let real = [0, 0], lin = [0, 0]
  const T0 = 2 * Math.PI * Math.sqrt(L / g)
  const agmF = (a: number, b: number) => { for (let i = 0; i < 30; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)]; return a }
  const reset = () => {
    const a = (Number(sa.input.value) * Math.PI) / 180
    real = [a, 0]; lin = [a, 0]
  }
  const render = () => {
    const a = (Number(sa.input.value) * Math.PI) / 180
    sa.out.textContent = `${sa.input.value}°`
    const T = T0 / agmF(1, Math.cos(a / 2))
    rR.textContent = `${fmt(T, 3)} s`
    rS.textContent = `${fmt(T0, 3)} s`
    rD.textContent = `+${fmt((T / T0 - 1) * 100, 1)}%`
    msg.textContent =
      a < 0.35
        ? "Ângulos pequenos: os dois pêndulos andam juntos. É a aproximação sen θ ≈ θ, e o período não depende da amplitude."
        : a < 1
          ? "Amplitude média: a diferença ainda é pequena, mas o pêndulo real (laranja) já atrasa um pouco a cada balanço."
          : "Amplitude grande: o pêndulo real (laranja) atrasa em relação ao de ângulo pequeno (azul). Galileu achava que o período nunca mudava; só vale para balanços pequenos."
  }
  const drawBob = (th: number, cx: number, color: string) => {
    const bx = cx + Lp * Math.sin(th), by = 120 + Lp * Math.cos(th)
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(cx, 120); ctx.lineTo(bx, by); ctx.stroke()
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(bx, by, 11, 0, 2 * Math.PI); ctx.fill()
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = cssVar("--gray"); ctx.fillRect(W / 2 - 60, 116, 120, 4)
    drawBob(lin[0], W / 2, cssVar("--secondary"))
    drawBob(real[0], W / 2, cssVar("--tertiary"))
  }
  const l = loop(box, () => {
    const dt = 1 / 240
    for (let k = 0; k < 4; k++) {
      real = rk4(([th, w]) => [w, (-g / L) * Math.sin(th)], real, dt)
      lin = rk4(([th, w]) => [w, (-g / L) * th], lin, dt)
    }
    draw()
  })
  sa.input.addEventListener("input", () => (reset(), render(), draw()))
  playBtn(box, l)
  reset(); render(); draw()
}

function doublePendulum(box: HTMLElement) {
  const W = 400, H = 340, C = 200, R = 75
  const ctx = canvas(box, W, H, "Dois pêndulos duplos quase iguais")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "420px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const sd = slider(box, "Diferença inicial no ângulo", 1, 9, 6)
  const [bReset] = btnRow(box, ["Recomeçar"])
  const [rT, rS] = readouts(box, ["Tempo", "Distância entre as pontas"])
  const msg = note(box)
  const g = 9.81, L = 1
  const f = (y: number[]) => {
    const [a1, a2, w1, w2] = y
    const d = a1 - a2
    const den = 3 - Math.cos(2 * d)
    const dw1 = (-3 * g * Math.sin(a1) - g * Math.sin(a1 - 2 * a2) - 2 * Math.sin(d) * (w2 * w2 * L + w1 * w1 * L * Math.cos(d))) / (L * den)
    const dw2 = (2 * Math.sin(d) * (2 * w1 * w1 * L + 2 * g * Math.cos(a1) + w2 * w2 * L * Math.cos(d))) / (L * den)
    return [w1, w2, dw1, dw2]
  }
  let A: number[] = [], B: number[] = [], t = 0
  let ta: [number, number][] = [], tb: [number, number][] = []
  const tip = (y: number[]): [number, number] => [C + R * Math.sin(y[0]) + R * Math.sin(y[1]), 170 + R * Math.cos(y[0]) + R * Math.cos(y[1])]
  const reset = () => {
    const eps = 10 ** -Number(sd.input.value)
    A = [2.2, 2.6, 0, 0]; B = [2.2 + eps, 2.6, 0, 0]; t = 0; ta = []; tb = []
    sd.out.textContent = `10⁻${"⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(sd.input.value)]} rad`
  }
  const drawP = (y: number[], color: string) => {
    const x1 = C + R * Math.sin(y[0]), y1 = 170 + R * Math.cos(y[0])
    const [x2, y2] = tip(y)
    ctx.strokeStyle = color; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(C, 170); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x2, y2, 6, 0, 2 * Math.PI); ctx.fill()
  }
  const trail = (pts2: [number, number][], color: string) => {
    ctx.strokeStyle = color; ctx.globalAlpha = 0.35; ctx.lineWidth = 1
    ctx.beginPath(); pts2.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke()
    ctx.globalAlpha = 1
  }
  const draw = () => {
    const c1 = cssVar("--tertiary"), c2 = cssVar("--secondary")
    ctx.clearRect(0, 0, W, H)
    trail(ta, c1); trail(tb, c2)
    drawP(B, c2); drawP(A, c1)
    const [xa, ya] = tip(A), [xb, yb] = tip(B)
    const dist = Math.hypot(xa - xb, ya - yb) / R
    rT.textContent = `${fmt(t, 1)} s`
    rS.textContent = dist < 0.001 ? "< 1 mm" : dist < 0.1 ? `${fmt(dist * 100, 1)} cm` : `${fmt(dist, 2)} m`
    msg.textContent =
      Number(sd.input.value) <= 3 && t < 1
        ? "Diferença inicial visível; mesmo assim, ela vai crescer muito mais depressa do que parece."
        : dist < 0.01
          ? "Os dois começam quase iguais (diferença menor que um fio de cabelo) e, por um tempo, andam juntos."
        : dist < 0.5
          ? "A diferença minúscula está crescendo depressa..."
          : "Agora fazem coisas completamente diferentes. É o caos: o movimento é determinado pelas leis de Newton, mas imprevisível na prática."
  }
  const l = loop(box, () => {
    const h = 1 / 600
    for (let k = 0; k < 10; k++) { A = rk4(f, A, h); B = rk4(f, B, h); t += h }
    ta.push(tip(A)); tb.push(tip(B))
    if (ta.length > 400) { ta.shift(); tb.shift() }
    draw()
  })
  sd.input.addEventListener("input", () => (reset(), draw()))
  bReset.addEventListener("click", () => (reset(), (l.running = true), sync(), draw()))
  const sync = playBtn(box, l, bReset.parentElement as HTMLElement)
  reset(); draw()
}

function actionLab(box: HTMLElement) {
  const W = 520, H = 200, P = 36, T = 2, g = 9.81, m = 1
  const s = chart(box, W, H, "Caminhos possíveis de uma bola jogada para cima")
  axes(s, W, H, P, "tempo (s)", "altura (m)")
  const truth = svg("polyline", { class: "curve alt" })
  const trial = svg("polyline", { class: "curve page" })
  s.append(truth, trial)
  const sp = chart(box, 520, 120, "Ação de cada caminho")
  const parab = svg("polyline", { class: "curve alt" })
  const dot = svg("circle", { r: 6, class: "dot" })
  sp.append(svg("line", { x1: 20, x2: 500, y1: 110, y2: 110, class: "axis" }), parab, dot)
  const sa = slider(box, "Quanto entortar o caminho", -100, 100, 60)
  const bs = btnRow(box, ["Entortar uma vez", "Entortar duas vezes"])
  const [rS, rD] = readouts(box, ["Ação do caminho", "A mais que o real"])
  const msg = note(box)
  let n = 1
  const S = (a: number) => {
    let tot = 0
    const N = 400, dt = T / N
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) * dt
      const x = (g * t * (T - t)) / 2 + a * Math.sin((n * Math.PI * t) / T)
      const v = (g * (T - 2 * t)) / 2 + ((a * n * Math.PI) / T) * Math.cos((n * Math.PI * t) / T)
      tot += (0.5 * m * v * v - m * g * x) * dt
    }
    return tot
  }
  const render = () => {
    const a = Number(sa.input.value) / 100
    sa.out.textContent = `${fmt(a, 2)} m`
    const X = (t: number) => P + (t / T) * (W - P - 20)
    const Y = (x: number) => H - P - ((x + 1.2) / 6.5) * (H - P - 20)
    const tr: [number, number][] = [], tt: [number, number][] = []
    for (let i = 0; i <= 80; i++) {
      const t = (T * i) / 80
      const x0 = (g * t * (T - t)) / 2
      tr.push([X(t), Y(x0)])
      tt.push([X(t), Y(x0 + a * Math.sin((n * Math.PI * t) / T))])
    }
    truth.setAttribute("points", pts(tr))
    trial.setAttribute("points", pts(tt))
    const s0 = S(0)
    const curve: [number, number][] = []
    for (let i = 0; i <= 50; i++) { const aa = -1 + (2 * i) / 50; curve.push([20 + ((aa + 1) / 2) * 480, 110 - ((S(aa) - s0) / (1.3 * n * n)) * 95]) }
    parab.setAttribute("points", pts(curve))
    dot.setAttribute("cx", String(20 + ((a + 1) / 2) * 480))
    dot.setAttribute("cy", String(110 - ((S(a) - s0) / (1.3 * n * n)) * 95))
    rS.textContent = `${fmt(S(a), 3)} J·s`
    rD.textContent = `${fmt(S(a) - s0, 3)} J·s`
    bs.forEach((b, i) => b.setAttribute("aria-pressed", String(i + 1 === n)))
    msg.textContent =
      Math.abs(a) < 0.005
        ? "Este é o caminho que a bola segue de verdade: o de menor ação. Qualquer jeito de entortá-lo aumenta a ação."
        : "A curva azul é a trajetória real; a laranja, uma alternativa com o mesmo começo e o mesmo fim. Embaixo, a ação de cada alternativa: o mínimo está no caminho real."
  }
  sa.input.addEventListener("input", render)
  bs.forEach((b, i) => b.addEventListener("click", () => ((n = i + 1), render())))
  render()
}

function springPendulum(box: HTMLElement) {
  const W = 400, H = 340, C = 200
  const ctx = canvas(box, W, H, "Pêndulo de mola")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "420px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const sk = slider(box, "Rigidez da mola", 10, 120, 40)
  const [bReset] = btnRow(box, ["Soltar de novo"])
  const msg = note(box)
  const g = 9.81, m = 1, L0 = 1
  let y = [1.2, 0.8, 0, 0]
  let tr: [number, number][] = []
  const f = ([r, th, vr, w]: number[]) => {
    const k = Number(sk.input.value)
    return [vr, w, r * w * w + g * Math.cos(th) - (k / m) * (r - L0), -(g * Math.sin(th) + 2 * vr * w) / r]
  }
  const S = 90
  const pos = (s: number[]): [number, number] => [C + S * s[0] * Math.sin(s[1]), 30 + S * s[0] * Math.cos(s[1])]
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--tertiary"); ctx.globalAlpha = 0.35; ctx.lineWidth = 1
    ctx.beginPath(); tr.forEach(([x, yy], i) => (i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy))); ctx.stroke()
    ctx.globalAlpha = 1
    const [bx, by] = pos(y)
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(C, 30)
    const n = 16
    for (let i = 1; i < n; i++) {
      const fx = C + ((bx - C) * i) / n, fy = 30 + ((by - 30) * i) / n
      const nx = -(by - 30), ny = bx - C, nl = Math.hypot(nx, ny) || 1
      ctx.lineTo(fx + ((i % 2 ? 7 : -7) * nx) / nl, fy + ((i % 2 ? 7 : -7) * ny) / nl)
    }
    ctx.lineTo(bx, by); ctx.stroke()
    ctx.fillStyle = cssVar("--tertiary"); ctx.beginPath(); ctx.arc(bx, by, 10, 0, 2 * Math.PI); ctx.fill()
  }
  const l = loop(box, () => {
    const h = 1 / 600
    for (let k = 0; k < 10; k++) y = rk4(f, y, h)
    tr.push(pos(y))
    if (tr.length > 600) tr.shift()
    draw()
  })
  const render = () => {
    sk.out.textContent = `${sk.input.value} N/m`
    msg.textContent = "Duas coordenadas (o comprimento da mola e o ângulo) que trocam energia entre si. Com forças de Newton seria trabalhoso; com a lagrangiana L = T − V, as duas equações saem de uma receita só."
  }
  sk.input.addEventListener("input", () => ((y = [1.2, 0.8, 0, 0]), (tr = []), render(), draw()))
  bReset.addEventListener("click", () => ((y = [1.2, 0.8, 0, 0]), (tr = []), (l.running = true), sync(), draw()))
  const sync = playBtn(box, l, bReset.parentElement as HTMLElement)
  render(); draw()
}

function phaseSpace(box: HTMLElement) {
  const W = 520, H = 260
  const s = chart(box, W, H, "Espaço de fase do pêndulo")
  const X = (th: number) => 20 + ((th + Math.PI) / (2 * Math.PI)) * (W - 40)
  const Y = (p: number) => H / 2 - (p / 3.2) * (H / 2 - 14)
  s.append(svg("line", { x1: 20, x2: W - 20, y1: H / 2, y2: H / 2, class: "axis" }), svg("line", { x1: W / 2, x2: W / 2, y1: 8, y2: H - 8, class: "axis" }))
  const lev = svg("g", {})
  s.appendChild(lev)
  for (const E of [0.25, 0.75, 1.25, 1.75, 2, 2.6, 3.4]) {
    for (const sg of [1, -1]) {
      const ln: [number, number][] = []
      for (let i = 0; i <= 200; i++) {
        const th = -Math.PI + (2 * Math.PI * i) / 200
        const q = 2 * (E - (1 - Math.cos(th)))
        if (q >= 0) ln.push([X(th), Y(sg * Math.sqrt(q))])
        else if (ln.length) { lev.appendChild(svg("polyline", { points: pts(ln), class: E === 2 ? "curve page" : "grid", fill: "none" })); ln.length = 0 }
      }
      if (ln.length) lev.appendChild(svg("polyline", { points: pts(ln), class: E === 2 ? "curve page" : "grid", fill: "none" }))
    }
  }
  const tl = svg("text", { x: W - 20, y: H / 2 - 6, class: "tick", "text-anchor": "end" }); tl.textContent = "ângulo"
  const pl = svg("text", { x: W / 2 + 6, y: 18, class: "tick" }); pl.textContent = "momento"
  const dot = svg("circle", { r: 6, class: "dot" })
  s.append(tl, pl, dot)
  const se = slider(box, "Energia (em unidades de m g L)", 10, 340, 100)
  const [rE, rK] = readouts(box, ["Energia", "Movimento"])
  const msg = note(box)
  let y = [0, 0]
  const reset = () => {
    const E = Number(se.input.value) / 100
    y = [0, Math.sqrt(2 * E)]
    dot.setAttribute("cx", String(X(0)))
    dot.setAttribute("cy", String(Y(Math.min(3.2, y[1]))))
  }
  const render = () => {
    const E = Number(se.input.value) / 100
    se.out.textContent = fmt(E, 2)
    rE.textContent = `${fmt(E, 2)} m g L`
    rK.textContent = E < 2 ? "vai e volta" : E > 2 ? "dá voltas completas" : "no limite"
    msg.textContent =
      E < 2
        ? "Cada curva fechada é um balanço com energia fixa. O ponto anda pela curva da sua energia: no espaço de fase, o estado inteiro do pêndulo é um ponto."
        : E === 2
          ? "Exatamente na separatriz (a curva laranja): o pêndulo se aproxima do topo sem nunca chegar."
          : "Fora da curva laranja (a separatriz, energia 2 m g L) o pêndulo passa do topo e gira sem parar: as curvas deixam de fechar."
  }
  const l = loop(box, () => {
    for (let k = 0; k < 6; k++) y = rk4(([th, p]) => [p, -Math.sin(th)], y, 1 / 120)
    const th = ((((y[0] + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI
    dot.setAttribute("cx", String(X(th)))
    dot.setAttribute("cy", String(Y(Math.max(-3.2, Math.min(3.2, y[1])))))
  })
  se.input.addEventListener("input", () => (reset(), render()))
  playBtn(box, l)
  reset(); render()
  dot.setAttribute("cx", String(X(0))); dot.setAttribute("cy", String(Y(y[1])))
}

function noetherLab(box: HTMLElement) {
  const W = 300, H = 300, C = 150, S = 80
  const ctx = canvas(box, W, H, "Órbita num potencial com e sem simetria de rotação")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "320px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const plot = chart(box, 520, 110, "Momento angular e energia ao longo do tempo")
  const lL = svg("polyline", { class: "curve page" })
  const lE = svg("polyline", { class: "curve alt" })
  plot.append(lL, lE)
  const se = slider(box, "Quanto quebrar a simetria de rotação", 0, 30, 0)
  const [rL, rE] = readouts(box, ["Momento angular (laranja)", "Energia (azul)"])
  const msg = note(box)
  let y = [1, 0, 0, 0.4]
  let tr: [number, number][] = []
  let hL: number[] = [], hE: number[] = []
  const eps = () => Number(se.input.value) / 100
  const f = ([x, yy, vx, vy]: number[]) => {
    const e = eps()
    return [vx, vy, -x * (1 + 2 * e), -yy * (1 - 2 * e) ]
  }
  const energy = ([x, yy, vx, vy]: number[]) => 0.5 * (vx * vx + vy * vy) + 0.5 * (x * x * (1 + 2 * eps()) + yy * yy * (1 - 2 * eps()))
  const ang = ([x, yy, vx, vy]: number[]) => x * vy - yy * vx
  const reset = () => { y = [1, 0, 0, 0.4]; tr = []; hL = []; hE = [] }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.fillStyle = cssVar("--gray"); ctx.beginPath(); ctx.arc(C, C, 4, 0, 2 * Math.PI); ctx.fill()
    ctx.strokeStyle = cssVar("--tertiary"); ctx.globalAlpha = 0.4; ctx.lineWidth = 1
    ctx.beginPath(); tr.forEach(([x, yy], i) => (i ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy))); ctx.stroke()
    ctx.globalAlpha = 1
    ctx.fillStyle = cssVar("--tertiary"); ctx.beginPath(); ctx.arc(C + y[0] * S, C - y[1] * S, 6, 0, 2 * Math.PI); ctx.fill()
    const Yp = (v: number) => 55 - (v / 1.2) * 45
    lL.setAttribute("points", pts(hL.map((v, i) => [10 + i, Yp(v)])))
    lE.setAttribute("points", pts(hE.map((v, i) => [10 + i, Yp(v)])))
    rL.textContent = fmt(ang(y), 3)
    rE.textContent = fmt(energy(y), 3)
  }
  const render = () => {
    se.out.textContent = fmt(eps(), 2)
    msg.textContent =
      eps() === 0
        ? "Potencial igual em todas as direções (simetria de rotação): o momento angular fica constante, e a órbita é uma elipse fixa. É o teorema de Noether."
        : "Simetria de rotação quebrada: o momento angular passa a variar. A energia continua constante, porque a lei não muda com o tempo: outra simetria, outra conservação."
  }
  const l = loop(box, () => {
    for (let k = 0; k < 4; k++) y = rk4(f, y, 1 / 120)
    tr.push([C + y[0] * S, C - y[1] * S]); if (tr.length > 700) tr.shift()
    hL.push(ang(y)); hE.push(energy(y)); if (hL.length > 500) { hL.shift(); hE.shift() }
    draw()
  })
  se.input.addEventListener("input", () => (reset(), render(), draw()))
  playBtn(box, l)
  reset(); render(); draw()
}

const K_E = 8.9875517923e9
const E_CHARGE = 1.602176634e-19
const M_E = 9.1093837e-31
const MU0 = 1.25663706212e-6

function pointer(ctx: CanvasRenderingContext2D, W: number, H: number, down: (x: number, y: number) => boolean, move: (x: number, y: number, dragging: boolean) => void, up?: () => void) {
  const c = ctx.canvas as HTMLCanvasElement
  c.style.touchAction = "none"
  let dragging = false
  const pos = (e: PointerEvent): [number, number] => {
    const r = c.getBoundingClientRect()
    return [((e.clientX - r.left) / r.width) * W, ((e.clientY - r.top) / r.height) * H]
  }
  c.addEventListener("pointerdown", (e) => {
    const [x, y] = pos(e)
    if (down(x, y)) {
      dragging = true
      c.setPointerCapture(e.pointerId)
      e.preventDefault()
    }
  })
  c.addEventListener("pointermove", (e) => {
    const [x, y] = pos(e)
    move(x, y, dragging)
  })
  const stop = () => {
    if (dragging && up) up()
    dragging = false
  }
  c.addEventListener("pointerup", stop)
  c.addEventListener("pointercancel", stop)
}

function arrow(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, w = 2, head = 7) {
  const a = Math.atan2(y2 - y1, x2 - x1)
  ctx.strokeStyle = color
  ctx.fillStyle = color
  ctx.lineWidth = w
  ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2 - Math.cos(a) * head * 0.6, y2 - Math.sin(a) * head * 0.6); ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(x2, y2)
  ctx.lineTo(x2 - head * Math.cos(a - 0.45), y2 - head * Math.sin(a - 0.45))
  ctx.lineTo(x2 - head * Math.cos(a + 0.45), y2 - head * Math.sin(a + 0.45))
  ctx.closePath(); ctx.fill()
}

function sign(ctx: CanvasRenderingContext2D, x: number, y: number, positive: boolean, size = 5) {
  ctx.lineWidth = 2
  ctx.strokeStyle = cssVar(positive ? "--tertiary" : "--secondary")
  ctx.beginPath(); ctx.moveTo(x - size, y); ctx.lineTo(x + size, y)
  if (positive) { ctx.moveTo(x, y - size); ctx.lineTo(x, y + size) }
  ctx.stroke()
}

function ball(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, q: number) {
  ctx.fillStyle = cssVar(q > 0 ? "--tertiary" : q < 0 ? "--secondary" : "--gray")
  ctx.beginPath(); ctx.arc(x, y, r, 0, 2 * Math.PI); ctx.fill()
  if (q === 0) return
  ctx.strokeStyle = cssVar("--light"); ctx.lineWidth = 2.5
  const s = r * 0.5
  ctx.beginPath(); ctx.moveTo(x - s, y); ctx.lineTo(x + s, y)
  if (q > 0) { ctx.moveTo(x, y - s); ctx.lineTo(x, y + s) }
  ctx.stroke()
}

const fmtSigned = (v: number, d = 1) => {
  const r = Math.round(v * 10 ** d) / 10 ** d
  return (r > 0 ? "+" : r < 0 ? "−" : "") + fmt(Math.abs(r), d)
}
const supNum = (v: number) => {
  const e = Math.floor(Math.log10(Math.abs(v)))
  const sup = String(e).replace("-", "⁻").replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
  return `${fmt(v / 10 ** e, 2)} × 10${sup}`
}

function engNum(v: number, unit: string) {
  const a = Math.abs(v)
  if (a === 0) return `0 ${unit}`
  const pre: [number, string][] = [[1e6, "M"], [1e3, "k"], [1, ""], [1e-3, "m"], [1e-6, "µ"], [1e-9, "n"], [1e-12, "p"]]
  for (const [f, p] of pre) if (a >= f * 0.9995) return `${fmtSigned(v / f, a / f >= 100 ? 0 : a / f >= 10 ? 1 : 2).replace("+", "")} ${p}${unit}`
  return `${sci(a)} ${unit}`
}

function chargesLab(box: HTMLElement) {
  const W = 520, H = 240, N = 12
  const ctx = canvas(box, W, H, "Balão e pedaço de lã trocando elétrons")
  const [bRub, bReset] = btnRow(box, ["Esfregar uma vez", "Recomeçar"])
  const [rB, rW, rT] = readouts(box, ["Carga do balão", "Carga da lã", "Carga total"])
  const msg = note(box)
  const r = rng(7)
  const spot = (cx: number, cy: number, rx: number, ry: number): [number, number] => {
    for (;;) {
      const x = (r() * 2 - 1) * rx, y = (r() * 2 - 1) * ry
      if ((x * x) / (rx * rx) + (y * y) / (ry * ry) < 0.75) return [cx + x, cy + y]
    }
  }
  const bp = Array.from({ length: N }, () => spot(140, 120, 80, 95))
  const wp = Array.from({ length: N }, () => spot(390, 120, 85, 70))
  let bE: [number, number][] = [], wE: [number, number][] = []
  let moved = 0
  const place = () => {
    bE = Array.from({ length: N }, () => spot(140, 120, 80, 95))
    wE = Array.from({ length: N }, () => spot(390, 120, 85, 70))
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.globalAlpha = 0.14; ctx.fillStyle = cssVar("--tertiary")
    ctx.beginPath(); ctx.ellipse(140, 120, 80, 95, 0, 0, 2 * Math.PI); ctx.fill()
    ctx.fillStyle = cssVar("--gray")
    ctx.beginPath(); ctx.ellipse(390, 120, 85, 70, 0, 0, 2 * Math.PI); ctx.fill()
    ctx.globalAlpha = 1
    ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.ellipse(140, 120, 80, 95, 0, 0, 2 * Math.PI); ctx.stroke()
    ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.ellipse(390, 120, 85, 70, 0, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([])
    ctx.fillStyle = cssVar("--darkgray"); ctx.font = "13px system-ui, sans-serif"; ctx.textAlign = "center"
    ctx.fillText("balão", 140, 234); ctx.fillText("lã", 390, 210)
    bp.forEach(([x, y]) => sign(ctx, x - 6, y, true))
    wp.forEach(([x, y]) => sign(ctx, x - 6, y, true))
    bE.forEach(([x, y]) => sign(ctx, x + 7, y + 4, false))
    wE.forEach(([x, y]) => sign(ctx, x + 7, y + 4, false))
    if (moved > 0) {
      const L = Math.min(70, 8 + moved * moved * 0.6)
      arrow(ctx, 228, 120, 228 + L, 120, cssVar("--tertiary"), 3)
      arrow(ctx, 298, 120, 298 - L, 120, cssVar("--tertiary"), 3)
    }
  }
  const render = () => {
    const nC = moved * 0.160
    const word = moved === 1 ? "bilhão" : "bilhões"
    rB.textContent = moved ? `−${moved} ${word} de e (−${fmt(nC, 2)} nC)` : "0"
    rW.textContent = moved ? `+${moved} ${word} de e (+${fmt(nC, 2)} nC)` : "0"
    rT.textContent = "0"
    bRub.disabled = moved >= N - 2
    msg.textContent =
      moved === 0
        ? "Cada sinal representa 1 bilhão de cargas elementares. O balão e a lã (ou o cabelo) começam neutros: tantos + quanto −. Esfregue para passar elétrons da lã para o balão."
        : moved >= N - 2
          ? "Já passou bastante. Repare: o total continua zero. A carga não foi criada, só trocou de lugar, e sempre em pacotes inteiros de e."
          : "Elétrons (−) passaram para o balão. Ele ficou negativo, a lã positiva, e agora os dois se atraem (setas). Os + não saem do lugar: estão presos nos núcleos."
  }
  bRub.addEventListener("click", () => {
    if (moved < N - 2) {
      wE.pop()
      bE.push(spot(140, 120, 80, 95))
      moved++
    }
    render(); draw()
  })
  bReset.addEventListener("click", () => { moved = 0; place(); render(); draw() })
  place(); render(); draw()
}

function magnetLab(box: HTMLElement) {
  const W = 520, H = 300, CX = 260, CY = 150
  const ctx = canvas(box, W, H, "Ímã em barra rodeado de bússolas")
  const sa = slider(box, "Girar o ímã", 0, 180, 0, 5)
  const [bCut] = btnRow(box, ["Cortar o ímã ao meio"])
  const [rP] = readouts(box, ["Polos"])
  const msg = note(box)
  let cut = false
  const poles = (): [number, number, number][] => {
    const a = (Number(sa.input.value) * Math.PI) / 180, ux = Math.cos(a), uy = Math.sin(a)
    if (!cut) return [[CX + 60 * ux, CY - 60 * uy, 1], [CX - 60 * ux, CY + 60 * uy, -1]]
    return [[CX + 75 * ux, CY - 75 * uy, 1], [CX + 15 * ux, CY - 15 * uy, -1], [CX - 15 * ux, CY + 15 * uy, 1], [CX - 75 * ux, CY + 75 * uy, -1]]
  }
  const field = (x: number, y: number, P: [number, number, number][]) => {
    let bx = 0, by = 0
    for (const [px, py, s] of P) {
      const dx = x - px, dy = y - py, d = Math.hypot(dx, dy) + 1e-6
      bx += (s * dx) / d ** 3; by += (s * dy) / d ** 3
    }
    return [bx, by]
  }
  const inside = (x: number, y: number) => {
    const a = (Number(sa.input.value) * Math.PI) / 180
    const dx = x - CX, dy = -(y - CY)
    const u = dx * Math.cos(a) + dy * Math.sin(a), v = -dx * Math.sin(a) + dy * Math.cos(a)
    return Math.abs(u) < 92 && Math.abs(v) < 26
  }
  const bar = (u0: number, u1: number) => {
    const a = (Number(sa.input.value) * Math.PI) / 180
    ctx.save(); ctx.translate(CX, CY); ctx.rotate(-a)
    const mid = (u0 + u1) / 2
    ctx.fillStyle = cssVar("--secondary"); ctx.fillRect(u0, -13, mid - u0, 26)
    ctx.fillStyle = cssVar("--tertiary"); ctx.fillRect(mid, -13, u1 - mid, 26)
    ctx.fillStyle = cssVar("--light"); ctx.font = "bold 13px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"
    ctx.save(); ctx.translate(u1 - 10, 0); ctx.rotate(a); ctx.fillText("N", 0, 0); ctx.restore()
    ctx.save(); ctx.translate(u0 + 10, 0); ctx.rotate(a); ctx.fillText("S", 0, 0); ctx.restore()
    ctx.restore()
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const P = poles()
    for (let x = 20; x < W; x += 34)
      for (let y = 18; y < H; y += 34) {
        if (inside(x, y)) continue
        const [bx, by] = field(x, y, P)
        const m = Math.hypot(bx, by), ux = bx / m, uy = by / m
        ctx.globalAlpha = Math.min(1, 0.35 + m * 3000)
        ctx.lineWidth = 3
        ctx.strokeStyle = cssVar("--tertiary"); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + ux * 11, y + uy * 11); ctx.stroke()
        ctx.strokeStyle = cssVar("--gray"); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - ux * 11, y - uy * 11); ctx.stroke()
      }
    ctx.globalAlpha = 1
    if (cut) { bar(15, 92); bar(-92, -15) } else bar(-92, 92)
  }
  const render = () => {
    sa.out.textContent = `${sa.input.value}°`
    bCut.textContent = cut ? "Juntar as metades" : "Cortar o ímã ao meio"
    rP.textContent = cut ? "4 (dois ímãs, cada um com N e S)" : "2 (N e S)"
    msg.textContent = cut
      ? "Cortado ao meio, não sobra um polo norte sozinho: cada pedaço vira um ímã completo, com N e S. Ninguém nunca encontrou um polo isolado."
      : "Cada agulha (ponta laranja = norte da bússola) aponta ao longo do campo: sai do polo N do ímã e entra no S. Gire o ímã e todas acompanham."
  }
  sa.input.addEventListener("input", () => (render(), draw()))
  bCut.addEventListener("click", () => { cut = !cut; render(); draw() })
  render(); draw()
}

function coulombLab(box: HTMLElement) {
  const W = 520, H = 170, Y = 85
  const ctx = canvas(box, W, H, "Duas cargas e as forças entre elas")
  const s1 = slider(box, "Carga da esquerda (µC)", -5, 5, 1)
  const s2 = slider(box, "Carga da direita (µC)", -5, 5, 1)
  const sr = slider(box, "Distância (cm)", 2, 50, 10)
  const [rF, rW, rD] = readouts(box, ["Força em cada uma", "Equivale ao peso de", "Com o dobro da distância"])
  const msg = note(box)
  const CXc = W / 2
  const draw = () => {
    const q1 = Number(s1.input.value), q2 = Number(s2.input.value), r = Number(sr.input.value)
    const d = 30 + r * 8.4, x1 = CXc - d / 2, x2 = CXc + d / 2
    const F = (K_E * Math.abs(q1 * q2) * 1e-12) / (r / 100) ** 2
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--lightgray"); ctx.lineWidth = 1; ctx.setLineDash([4, 4])
    ctx.beginPath(); ctx.moveTo(x1, Y + 34); ctx.lineTo(x2, Y + 34); ctx.stroke(); ctx.setLineDash([])
    ctx.fillStyle = cssVar("--gray"); ctx.font = "12px system-ui, sans-serif"; ctx.textAlign = "center"
    ctx.fillText(`${r} cm`, CXc, Y + 50)
    if (F > 0) {
      const L = Math.max(14, Math.min(110, x1 - 24, 20 + 18 * Math.log10(F / 0.001)))
      const rep = q1 * q2 > 0, c = cssVar("--tertiary")
      if (rep) { arrow(ctx, x1 - 16, Y, x1 - 16 - L, Y, c, 3); arrow(ctx, x2 + 16, Y, x2 + 16 + L, Y, c, 3) }
      else if (d / 2 - 18 > 8) { const l = Math.min(L, d / 2 - 18); arrow(ctx, x1 + 16, Y, x1 + 16 + l, Y, c, 3); arrow(ctx, x2 - 16, Y, x2 - 16 - l, Y, c, 3) }
      else { arrow(ctx, x1 - 16 - L, Y, x1 - 16, Y, c, 3); arrow(ctx, x2 + 16 + L, Y, x2 + 16, Y, c, 3) }
    }
    ball(ctx, x1, Y, 13, q1); ball(ctx, x2, Y, 13, q2)
  }
  const force = (F: number) => (F >= 1 ? `${fmt(F, F >= 100 ? 0 : F >= 10 ? 1 : 2)} N` : `${fmt(F * 1000, F >= 0.1 ? 0 : F >= 0.01 ? 1 : 2)} mN`)
  const render = () => {
    const q1 = Number(s1.input.value), q2 = Number(s2.input.value), r = Number(sr.input.value)
    s1.out.textContent = `${fmtSigned(q1, 0)} µC`; s2.out.textContent = `${fmtSigned(q2, 0)} µC`; sr.out.textContent = `${r} cm`
    const F = (K_E * Math.abs(q1 * q2) * 1e-12) / (r / 100) ** 2
    rF.textContent = F === 0 ? "0" : force(F)
    const kg = F / 9.81
    rW.textContent = F === 0 ? "—" : kg >= 1 ? `${fmt(kg, 1)} kg` : `${fmt(kg * 1000, kg >= 0.01 ? 0 : 1)} g`
    rD.textContent = F === 0 ? "—" : `${force(F / 4)} (um quarto)`
    msg.textContent =
      q1 === 0 || q2 === 0
        ? "Uma das cargas é zero: não há força elétrica."
        : q1 * q2 > 0
          ? "Sinais iguais se repelem. Dobre a distância e a força cai para um quarto: é o inverso do quadrado, como na gravidade."
          : "Sinais opostos se atraem. Note como poucos microcoulombs já dão forças do tamanho do peso de objetos do dia a dia."
  }
  ;[s1, s2, sr].forEach((s) => s.input.addEventListener("input", () => (render(), draw())))
  render(); draw()
}

function fieldLines(box: HTMLElement) {
  const W = 520, H = 320
  const ctx = canvas(box, W, H, "Linhas de campo elétrico de cargas que podem ser arrastadas")
  const [bDip, bTwo, bOne, bFlip] = btnRow(box, ["+ e −", "+ e +", "Uma carga", "Inverter sinais"])
  const [rE, rD] = readouts(box, ["Campo no ponteiro", "Direção"])
  const msg = note(box)
  let Q: { x: number; y: number; q: number }[] = []
  let drag = -1
  let probe: [number, number] | null = null
  const E = (x: number, y: number) => {
    let ex = 0, ey = 0
    for (const c of Q) {
      const dx = x - c.x, dy = y - c.y, d2 = dx * dx + dy * dy + 1e-9, d = Math.sqrt(d2)
      ex += (c.q * dx) / (d2 * d); ey += (c.q * dy) / (d2 * d)
    }
    return [ex, ey]
  }
  const preset = (k: string) => {
    if (k === "dip") Q = [{ x: 180, y: 160, q: 1 }, { x: 340, y: 160, q: -1 }]
    if (k === "two") Q = [{ x: 180, y: 160, q: 1 }, { x: 340, y: 160, q: 1 }]
    if (k === "one") Q = [{ x: 260, y: 160, q: 1 }]
    ;[bDip, bTwo, bOne].forEach((b, i) => b.setAttribute("aria-pressed", String(["dip", "two", "one"][i] === k)))
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    for (let x = 13; x < W; x += 26)
      for (let y = 13; y < H; y += 26) {
        if (Q.some((c) => Math.hypot(x - c.x, y - c.y) < 18)) continue
        const [ex, ey] = E(x, y), m = Math.hypot(ex, ey)
        ctx.globalAlpha = Math.min(0.9, 0.18 + m * 4000)
        arrow(ctx, x - (ex / m) * 6, y - (ey / m) * 6, x + (ex / m) * 6, y + (ey / m) * 6, cssVar("--gray"), 1.3, 5)
      }
    ctx.globalAlpha = 0.85
    ctx.strokeStyle = cssVar("--tertiary"); ctx.lineWidth = 1.6
    const hasPos = Q.some((c) => c.q > 0)
    for (const s of Q) {
      const dir = s.q > 0 ? 1 : -1
      if (dir < 0 && !hasPos) continue
      for (let k = 0; k < 16; k++) {
        const a = (2 * Math.PI * (k + 0.5)) / 16
        let x = s.x + 14 * Math.cos(a), y = s.y + 14 * Math.sin(a)
        const path: [number, number][] = [[x, y]]
        let escaped = false
        for (let i = 0; i < 500; i++) {
          const [ex, ey] = E(x, y), m = Math.hypot(ex, ey)
          x += (dir * 3 * ex) / m; y += (dir * 3 * ey) / m
          path.push([x, y])
          if (x < -10 || x > W + 10 || y < -10 || y > H + 10) { escaped = true; break }
          if (Q.some((c) => c !== s && Math.hypot(x - c.x, y - c.y) < 10)) break
        }
        if (dir < 0 && !escaped) continue
        ctx.beginPath(); path.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py))); ctx.stroke()
      }
    }
    if (!hasPos) {
      for (const s of Q)
        for (let k = 0; k < 16; k++) {
          const a = (2 * Math.PI * (k + 0.5)) / 16
          let x = s.x + 14 * Math.cos(a), y = s.y + 14 * Math.sin(a)
          ctx.beginPath(); ctx.moveTo(x, y)
          for (let i = 0; i < 500; i++) {
            const [ex, ey] = E(x, y), m = Math.hypot(ex, ey)
            x -= (3 * ex) / m; y -= (3 * ey) / m
            ctx.lineTo(x, y)
            if (x < -10 || x > W + 10 || y < -10 || y > H + 10) break
            if (Q.some((c) => c !== s && Math.hypot(x - c.x, y - c.y) < 10)) break
          }
          ctx.stroke()
        }
    }
    ctx.globalAlpha = 1
    Q.forEach((c) => ball(ctx, c.x, c.y, 12, c.q))
  }
  const render = () => {
    if (!probe) { rE.textContent = "—"; rD.textContent = "passe o ponteiro" }
    else {
      const [ex, ey] = E(probe[0], probe[1])
      const m = Math.hypot(ex, ey) * K_E * 1e-9 * 1e6
      rE.textContent = `${m >= 1000 ? fmt(m / 1000, 1) + " mil" : fmt(m, 0)} N/C`
      const ang = (Math.atan2(-ey, ex) * 180) / Math.PI
      rD.textContent = `${fmt((ang + 360) % 360, 0)}° (0° = direita)`
    }
    const n = Q.length, same = Q.every((c) => c.q === Q[0].q)
    msg.textContent =
      n === 1
        ? Q[0].q > 0 ? "Uma carga positiva: o campo aponta para fora em todas as direções e enfraquece com o quadrado da distância." : "Uma carga negativa: o campo aponta para dentro, para a carga."
        : same
          ? "Duas cargas iguais: as linhas se repelem e, entre elas, existe um ponto onde o campo é zero. Arraste as cargas."
          : "Dipolo: as linhas saem da positiva e terminam na negativa. As setas cinza mostram para onde uma carga positiva de teste seria empurrada. Cada carga vale 1 nC e 1 pixel vale 1 mm. Arraste as cargas."
  }
  pointer(ctx, W, H, (x, y) => {
    drag = Q.findIndex((c) => Math.hypot(x - c.x, y - c.y) < 20)
    return drag >= 0
  }, (x, y, dragging) => {
    probe = [x, y]
    if (dragging && drag >= 0) { Q[drag].x = Math.max(14, Math.min(W - 14, x)); Q[drag].y = Math.max(14, Math.min(H - 14, y)); draw() }
    render()
  }, () => (drag = -1))
  ;(ctx.canvas as HTMLCanvasElement).addEventListener("pointerleave", () => { probe = null; render() })
  bDip.addEventListener("click", () => (preset("dip"), render(), draw()))
  bTwo.addEventListener("click", () => (preset("two"), render(), draw()))
  bOne.addEventListener("click", () => (preset("one"), render(), draw()))
  bFlip.addEventListener("click", () => { Q.forEach((c) => (c.q = -c.q)); render(); draw() })
  preset("dip"); render(); draw()
}

function potentialLab(box: HTMLElement) {
  const W = 520, H = 300
  const ctx = canvas(box, W, H, "Mapa de potencial elétrico com uma partícula que pode ser solta")
  const [bGo, bKind, bReset] = btnRow(box, ["Soltar", "Trocar por elétron", "Recomeçar"])
  const [rV, rU, rK] = readouts(box, ["Potencial onde ela está", "Energia potencial", "Energia de movimento ganha"])
  const msg = note(box)
  const Q = [{ x: 170, y: 150, q: 1 }, { x: 350, y: 150, q: -1 }]
  const V = (x: number, y: number) => Q.reduce((s, c) => s + (K_E * c.q * 1e-9) / (Math.max(4, Math.hypot(x - c.x, y - c.y)) / 1000), 0)
  const Ef = (x: number, y: number) => {
    let ex = 0, ey = 0
    for (const c of Q) {
      const dx = x - c.x, dy = y - c.y, d = Math.max(4, Math.hypot(dx, dy))
      ex += (c.q * dx) / d ** 3; ey += (c.q * dy) / d ** 3
    }
    return [ex * K_E * 1e-9 * 1e6 / 1000, ey * K_E * 1e-9 * 1e6 / 1000]
  }
  let map: HTMLCanvasElement | null = null, mapTheme = ""
  const build = () => {
    const m = document.createElement("canvas"); m.width = W; m.height = H
    const c = m.getContext("2d")!
    const pos = cssVar("--tertiary"), neg = cssVar("--secondary"), line = cssVar("--darkgray")
    const S = 2, lv = (v: number) => Math.floor(v / 40)
    for (let x = 0; x < W; x += S)
      for (let y = 0; y < H; y += S) {
        const v = V(x + S / 2, y + S / 2)
        c.globalAlpha = Math.min(0.55, Math.abs(v) / 500)
        c.fillStyle = v > 0 ? pos : neg
        c.fillRect(x, y, S, S)
        const l = lv(v)
        if (Math.abs(v) < 1100 && (lv(V(x + S * 1.5, y + S / 2)) !== l || lv(V(x + S / 2, y + S * 1.5)) !== l)) {
          c.globalAlpha = 0.45; c.fillStyle = line; c.fillRect(x, y, S, S)
        }
      }
    map = m
  }
  let p = [215, 70], v = [0, 0], start = [215, 70], kind = 1, moving = false, done = false, why = "", frames = 0
  const reset = () => { p = [...start]; v = [0, 0]; moving = false; done = false; l.running = false; tr = []; frames = 0 }
  const advance = () => {
    for (let k = 0; k < 40; k++) {
      const [ex, ey] = Ef(p[0], p[1])
      v[0] += kind * ex * 0.0008; v[1] += kind * ey * 0.0008
      const sp = Math.hypot(v[0], v[1]), f = sp > 0.6 ? 0.6 / sp : 1
      p[0] += v[0] * f; p[1] += v[1] * f
      if (Q.some((c) => c.q * kind < 0 && Math.hypot(p[0] - c.x, p[1] - c.y) < 14)) { moving = false; done = true; why = "hit"; break }
      if (p[0] < 0 || p[0] > W || p[1] < 0 || p[1] > H) { p = [Math.max(0, Math.min(W, p[0])), Math.max(0, Math.min(H, p[1]))]; moving = false; done = true; why = "out"; break }
    }
    tr.push([p[0], p[1]])
    if (++frames > 900 && moving) { moving = false; done = true; why = "time" }
  }
  let tr: [number, number][] = []
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const theme = cssVar("--tertiary") + cssVar("--secondary")
    if (!map || theme !== mapTheme) { build(); mapTheme = theme }
    ctx.drawImage(map!, 0, 0, W, H)
    Q.forEach((c) => ball(ctx, c.x, c.y, 11, c.q))
    ctx.strokeStyle = cssVar(kind > 0 ? "--tertiary" : "--secondary"); ctx.lineWidth = 1.5; ctx.globalAlpha = 0.6
    ctx.beginPath(); tr.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.globalAlpha = 1
    ctx.fillStyle = cssVar("--dark"); ctx.beginPath(); ctx.arc(p[0], p[1], 7, 0, 2 * Math.PI); ctx.fill()
    ball(ctx, p[0], p[1], 5.5, kind)
  }
  const render = () => {
    const vv = V(p[0], p[1]), v0 = V(start[0], start[1])
    rV.textContent = `${fmtSigned(vv, 0)} V`
    rU.textContent = `${fmtSigned(kind * vv, 0)} eV`
    const K = kind * (v0 - vv)
    rK.textContent = `${fmt(Math.max(0, K), 0)} eV`
    bKind.textContent = kind > 0 ? "Trocar por elétron" : "Trocar por próton"
    bGo.disabled = moving || done
    const who = kind > 0 ? "O próton" : "O elétron"
    const ride = kind > 0
      ? "O próton desce a ladeira: vai do potencial alto (laranja) para o baixo (azul), trocando energia potencial por velocidade."
      : "O elétron tem carga negativa, então para ele a ladeira é invertida: vai para o potencial alto (laranja), trocando energia potencial por velocidade."
    msg.textContent = done
      ? (why === "hit" ? `${who} chegou à carga que o atrai.` : why === "out" ? `${who} saiu do mapa.` : `${who} ficou indo e voltando sem cair na carga; paramos aqui.`) +
        ` Cada volt atravessado vale 1 elétron-volt de energia de movimento: ${fmt(Math.max(0, K), 0)} eV.`
      : moving
        ? ride
        : "Laranja é potencial alto (perto da carga +), azul é baixo (perto da −); as linhas finas ligam pontos de mesmo potencial, a cada 40 V (cargas de 1 nC, 1 pixel = 1 mm). Arraste a partícula e solte."
  }
  const l = loop(box, () => {
    if (!moving) return
    advance()
    render(); draw()
  })
  l.running = false
  pointer(ctx, W, H, (x, y) => Math.hypot(x - p[0], y - p[1]) < 18 && !moving, (x, y, dragging) => {
    if (!dragging) return
    if (Q.some((c) => Math.hypot(x - c.x, y - c.y) < 20)) return
    p = [Math.max(6, Math.min(W - 6, x)), Math.max(6, Math.min(H - 6, y))]; start = [...p]; v = [0, 0]; done = false; tr = []; frames = 0
    render(); draw()
  })
  bGo.addEventListener("click", () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      moving = true
      while (moving) advance()
    } else { moving = true; l.running = true }
    render(); draw()
  })
  bKind.addEventListener("click", () => { kind = -kind; reset(); render(); draw() })
  bReset.addEventListener("click", () => { reset(); render(); draw() })
  render(); draw()
}

function cyclotronLab(box: HTMLElement) {
  const W = 520, H = 300, CX = 260, CY = 150, PX_MM = 4.8
  const ctx = canvas(box, W, H, "Partícula carregada girando num campo magnético que entra na tela")
  const sv = slider(box, "Velocidade (milhões de m/s)", 0.5, 5, 2.5, 0.5)
  const sb = slider(box, "Campo magnético (mT)", 1, 10, 1, 0.5)
  const [bKind] = btnRow(box, ["Trocar por pósitron"])
  const [rR, rT, rF] = readouts(box, ["Raio da volta", "Tempo de uma volta", "Força magnética"])
  const msg = note(box)
  let q = -1, phi = Math.PI / 2, tr: [number, number][] = []
  const radius = () => (M_E * Number(sv.input.value) * 1e6) / (E_CHARGE * Number(sb.input.value) * 1e-3)
  const posAt = (a: number): [number, number] => {
    const R = radius() * 1000 * PX_MM
    return [CX + R * Math.cos(a), CY - R * Math.sin(a)]
  }
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    ctx.strokeStyle = cssVar("--lightgray"); ctx.lineWidth = 1.2
    for (let x = 20; x < W; x += 40)
      for (let y = 20; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(x - 4, y - 4); ctx.lineTo(x + 4, y + 4); ctx.moveTo(x + 4, y - 4); ctx.lineTo(x - 4, y + 4); ctx.stroke() }
    const R = radius() * 1000 * PX_MM
    ctx.setLineDash([3, 5]); ctx.strokeStyle = cssVar("--gray"); ctx.beginPath(); ctx.arc(CX, CY, R, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([])
    const col = cssVar(q > 0 ? "--tertiary" : "--secondary")
    ctx.strokeStyle = col; ctx.globalAlpha = 0.5; ctx.lineWidth = 2
    ctx.beginPath(); tr.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.globalAlpha = 1
    const [x, y] = posAt(phi)
    const dir = q > 0 ? 1 : -1
    const tx = -Math.sin(phi) * dir, ty = -Math.cos(phi) * dir
    const fl = Math.min(26, R * 0.8)
    arrow(ctx, x, y, x + tx * 34, y + ty * 34, cssVar("--darkgray"), 2)
    const cx = CX - x, cy = CY - y, cm = Math.hypot(cx, cy) || 1
    if (fl > 8) arrow(ctx, x, y, x + (cx / cm) * fl, y + (cy / cm) * fl, cssVar("--tertiary"), 2.5)
    ball(ctx, x, y, 8, q)
  }
  const render = () => {
    const v = Number(sv.input.value), B = Number(sb.input.value), r = radius()
    sv.out.textContent = fmt(v, 1); sb.out.textContent = `${fmt(B, 1)} mT`
    rR.textContent = `${fmt(r * 1000, r < 0.01 ? 2 : 1)} mm`
    rT.textContent = `${fmt(((2 * Math.PI * M_E) / (E_CHARGE * B * 1e-3)) * 1e9, 1)} ns`
    rF.textContent = `${supNum(E_CHARGE * v * 1e6 * B * 1e-3)} N`
    bKind.textContent = q < 0 ? "Trocar por pósitron" : "Trocar por elétron"
    msg.textContent =
      `Os × são o campo entrando na tela. A força (seta laranja) é sempre perpendicular à velocidade (seta cinza): muda a direção, nunca a rapidez, e a partícula anda em círculo. ` +
      (q < 0 ? "O elétron gira no sentido horário; o pósitron, de carga oposta, giraria ao contrário. " : "O pósitron gira no sentido anti-horário, ao contrário do elétron. ") +
      "Mais rápida, volta maior; o tempo de uma volta não depende da velocidade." +
      (r * 1000 * PX_MM < 8 ? " Nesta combinação o círculo fica pequeno demais para a escala do desenho." : "")
  }
  const l = loop(box, () => {
    phi += (q > 0 ? 1 : -1) * Number(sb.input.value) * 0.02
    tr.push(posAt(phi)); if (tr.length > 160) tr.shift()
    draw()
  })
  ;[sv, sb].forEach((s) => s.input.addEventListener("input", () => { tr = []; render(); draw() }))
  bKind.addEventListener("click", () => { q = -q; tr = []; render(); draw() })
  playBtn(box, l, bKind.parentElement as HTMLElement)
  render(); draw()
}

function capacitorLab(box: HTMLElement) {
  const V0 = 9
  const ctx = canvas(box, 520, 110, "Circuito com bateria, resistor e capacitor")
  const plot = chart(box, 520, 200, "Voltagem no capacitor ao longo do tempo")
  axes(plot, 520, 200, 30, "tempo", "voltagem")
  const full = svg("polyline", { class: "curve bh" }), done = svg("polyline", { class: "curve page" })
  const dot = svg("circle", { r: 5, class: "pt" })
  const tauLine = svg("line", { class: "axis" }); tauLine.setAttribute("stroke-dasharray", "3 4")
  const tauTxt = svg("text", { class: "tick accent", "text-anchor": "middle" }); tauTxt.textContent = "τ"
  plot.append(tauLine, tauTxt, full, done, dot)
  const sR = slider(box, "Resistência (kΩ)", 1, 100, 20)
  const sC = slider(box, "Capacitância (µF)", 10, 100, 50, 10)
  const [bCh, bDis] = btnRow(box, ["Carregar", "Descarregar"])
  const [rTau, rT, rV, rQ, rI] = readouts(box, ["τ = RC", "Tempo", "Voltagem", "Carga", "Corrente"])
  const msg = note(box)
  let vStart = 0, target = 0, u = 0, Vc = 0
  const tau = () => Number(sR.input.value) * 1e3 * Number(sC.input.value) * 1e-6
  const X = (s: number) => 30 + (s / 5) * 480, Yv = (v: number) => 170 - (v / V0) * 150
  const vAt = (s: number) => target + (vStart - target) * Math.exp(-s)
  const drawCircuit = () => {
    ctx.clearRect(0, 0, 520, 110)
    const g = cssVar("--gray")
    ctx.strokeStyle = g; ctx.lineWidth = 2
    ctx.beginPath(); ctx.moveTo(60, 30); ctx.lineTo(380, 30); ctx.moveTo(60, 90); ctx.lineTo(380, 90)
    if (target > 0) { ctx.moveTo(60, 30); ctx.lineTo(60, 48); ctx.moveTo(60, 72); ctx.lineTo(60, 90) } else { ctx.moveTo(60, 30); ctx.lineTo(60, 90) }
    ctx.moveTo(380, 30); ctx.lineTo(380, 52); ctx.moveTo(380, 68); ctx.lineTo(380, 90); ctx.stroke()
    if (target > 0) {
      ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(44, 48); ctx.lineTo(76, 48); ctx.stroke()
      ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(52, 72); ctx.lineTo(68, 72); ctx.stroke()
    }
    ctx.fillStyle = g; ctx.font = "12px system-ui, sans-serif"; ctx.textAlign = "left"
    ctx.fillText(target > 0 ? "bateria de 9 V" : "sem bateria", 72, 64)
    ctx.clearRect(180, 22, 60, 16); ctx.strokeStyle = g; ctx.beginPath()
    for (let i = 0; i <= 6; i++) ctx.lineTo(180 + i * 10, 30 + (i % 2 ? -7 : 7) * (i > 0 && i < 6 ? 1 : 0))
    ctx.stroke()
    ctx.fillText("R", 205, 52)
    ctx.lineWidth = 4; ctx.strokeStyle = cssVar("--darkgray")
    ctx.beginPath(); ctx.moveTo(355, 52); ctx.lineTo(405, 52); ctx.moveTo(355, 68); ctx.lineTo(405, 68); ctx.stroke()
    const n = Math.round((Vc / V0) * 7)
    for (let i = 0; i < n; i++) { sign(ctx, 360 + i * 7, 44, true, 3); sign(ctx, 360 + i * 7, 77, false, 3) }
    ctx.fillStyle = g; ctx.fillText("C", 412, 64)
    const I = Math.abs(target - Vc) / (Number(sR.input.value) * 1e3)
    if (I > 1e-6) {
      const L = 10 + Math.min(40, (I / (V0 / 1e3)) * 40)
      const dir = target > Vc ? 1 : -1
      arrow(ctx, 280 - (dir * L) / 2, 18, 280 + (dir * L) / 2, 18, cssVar("--tertiary"), 2)
    }
  }
  const draw = () => {
    const list: [number, number][] = [], fin: [number, number][] = []
    for (let i = 0; i <= 100; i++) { const s = (i / 100) * 5; list.push([X(s), Yv(vAt(s))]); if (s <= u) fin.push([X(s), Yv(vAt(s))]) }
    fin.push([X(u), Yv(Vc)])
    full.setAttribute("points", pts(list)); done.setAttribute("points", pts(fin))
    dot.setAttribute("cx", String(X(u))); dot.setAttribute("cy", String(Yv(Vc)))
    tauLine.setAttribute("x1", String(X(1))); tauLine.setAttribute("x2", String(X(1))); tauLine.setAttribute("y1", "20"); tauLine.setAttribute("y2", "170")
    tauTxt.setAttribute("x", String(X(1))); tauTxt.setAttribute("y", "16")
    drawCircuit()
  }
  const render = () => {
    const t = tau()
    sR.out.textContent = `${sR.input.value} kΩ`; sC.out.textContent = `${sC.input.value} µF`
    rTau.textContent = t >= 1 ? `${fmt(t, 2)} s` : `${fmt(t * 1000, 0)} ms`
    const real = u * t
    rT.textContent = real >= 1 ? `${fmt(real, 2)} s` : `${fmt(real * 1000, 0)} ms`
    rV.textContent = `${fmt(Vc, 2)} V`
    rQ.textContent = `${fmt(Number(sC.input.value) * Vc, 0)} µC`
    rI.textContent = `${fmt((Math.abs(target - Vc) / (Number(sR.input.value) * 1e3)) * 1e3, 3)} mA`
    const pct = Math.abs(target - vStart) > 0.01 ? (Math.abs(Vc - vStart) / Math.abs(target - vStart)) * 100 : 100
    const charging = target > vStart
    msg.textContent =
      Math.abs(target - vStart) < 0.01
        ? target > 0 ? "Capacitor já carregado: não passa mais corrente. Experimente descarregar." : "Capacitor vazio. Clique em carregar."
        : u < 0.9
          ? `No começo a corrente é máxima e a voltagem ${charging ? "sobe" : "cai"} rápido. Já foi ${fmt(pct, 0)}% do caminho.`
          : u < 1.1
            ? `Depois de um tempo τ = RC, o capacitor percorreu cerca de 63% do caminho${charging ? "" : " até ficar vazio"}.`
            : u < 4.9
              ? `A corrente vai minguando: ${charging ? "quanto mais cheio, mais devagar enche" : "quanto mais vazio, mais devagar esvazia"}. ${fmt(pct, 0)}% do caminho.`
              : "Depois de 5τ, mais de 99% do caminho: na prática, terminou. Mude R ou C e veja τ mudar."
  }
  const start = (to: number) => { vStart = Vc; target = to; u = 0; render(); draw() }
  const l = loop(box, () => {
    if (u >= 5) return
    u = Math.min(5, u + 5 / 240)
    Vc = u >= 5 ? target : vAt(u)
    render(); draw()
  })
  bCh.addEventListener("click", () => {
    start(V0)
    if (!l.running) { u = 5; Vc = target; render(); draw() }
  })
  bDis.addEventListener("click", () => {
    start(0)
    if (!l.running) { u = 5; Vc = target; render(); draw() }
  })
  ;[sR, sC].forEach((s) => s.input.addEventListener("input", () => (render(), draw())))
  vStart = 0; target = 0; u = 0; Vc = 0
  render(); draw()
}

function ohmLab(box: HTMLElement) {
  const W = 520, H = 170
  const ctx = canvas(box, W, H, "Fio com elétrons andando e um resistor que esquenta")
  const sV = slider(box, "Voltagem (V)", 0, 240, 12)
  const sR = slider(box, "Resistência (Ω)", 1, 100, 6, 0.1)
  const [bPile, bShower] = btnRow(box, ["Pilha e lâmpada pequena", "Chuveiro elétrico"])
  const [rI, rP, rVd] = readouts(box, ["Corrente", "Potência", "Deriva real dos elétrons (fio de 1 mm²)"])
  const msg = note(box)
  const r = rng(3)
  const dots = Array.from({ length: 70 }, () => [r() * W, 52 + r() * 26])
  const I = () => Number(sV.input.value) / Number(sR.input.value)
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const P = Number(sV.input.value) * I()
    const heat = Math.min(1, Math.log10(1 + P) / 3.8)
    ctx.fillStyle = cssVar("--lightgray"); ctx.globalAlpha = 0.5; ctx.fillRect(0, 48, W, 34); ctx.globalAlpha = 1
    ctx.fillStyle = cssVar("--tertiary"); ctx.globalAlpha = 0.15 + 0.75 * heat
    ctx.fillRect(210, 44, 100, 42); ctx.globalAlpha = 1
    ctx.strokeStyle = cssVar("--darkgray"); ctx.lineWidth = 1.5; ctx.strokeRect(210, 44, 100, 42)
    ctx.fillStyle = cssVar("--secondary")
    dots.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 2.6, 0, 2 * Math.PI); ctx.fill() })
    ctx.fillStyle = cssVar("--gray"); ctx.font = "12px system-ui, sans-serif"; ctx.textAlign = "center"
    ctx.fillText("resistor", 260, 104)
    if (I() > 0) {
      arrow(ctx, 60, 126, 140, 126, cssVar("--tertiary"), 2.5)
      ctx.fillText("sentido da corrente (convenção)", 100, 148)
      arrow(ctx, 470, 126, 390, 126, cssVar("--secondary"), 2.5)
      ctx.fillText("sentido dos elétrons", 430, 148)
    }
    ctx.textAlign = "left"; ctx.fillText("+", 6, 40); ctx.textAlign = "right"; ctx.fillText("−", W - 6, 40)
  }
  const render = () => {
    const v = Number(sV.input.value), R = Number(sR.input.value), i = I(), P = v * i
    sV.out.textContent = `${fmt(v, 1)} V`; sR.out.textContent = `${fmt(R, 1)} Ω`
    rI.textContent = i >= 1 ? `${fmt(i, 2)} A` : `${fmt(i * 1000, 0)} mA`
    rP.textContent = P >= 1000 ? `${fmt(P / 1000, 2)} kW` : `${fmt(P, P >= 10 ? 0 : 2)} W`
    rVd.textContent = `${fmt((i / (8.49e28 * E_CHARGE * 1e-6)) * 1000, 3)} mm/s`
    const tag = Math.abs(v - 220) < 0.5 && Math.abs(R - 8.8) < 0.05 ? "chuveiro" : Math.abs(v - 1.5) < 0.6 && Math.abs(R - 5) < 0.05 ? "pilha" : ""
    msg.textContent =
      v === 0
        ? "Sem voltagem, os elétrons só se agitam ao acaso: nenhuma corrente líquida."
        : tag === "chuveiro"
          ? "Um chuveiro de 5500 W em 220 V: 25 A atravessando 8,8 Ω. É por isso que ele pede fio grosso e disjuntor próprio."
          : `I = V/R. Dobre a voltagem e a corrente dobra; dobre a resistência e ela cai pela metade. Mesmo com ${rI.textContent}, os elétrons andam devagar: o que viaja rápido é o empurrão do campo.`
    bPile.setAttribute("aria-pressed", String(tag === "pilha")); bShower.setAttribute("aria-pressed", String(tag === "chuveiro"))
  }
  const l = loop(box, () => {
    const sp = Math.min(5, Math.sqrt(I()) * 0.9)
    dots.forEach((d) => { d[0] -= sp * (0.7 + 0.6 * ((d[1] * 7) % 1)); if (d[0] < 0) d[0] += W; d[1] += (Math.random() - 0.5) * 0.8; d[1] = Math.max(52, Math.min(78, d[1])) })
    draw()
  })
  ;[sV, sR].forEach((s) => s.input.addEventListener("input", () => (render(), draw())))
  bPile.addEventListener("click", () => { sV.input.step = "0.5"; sV.input.value = "1.5"; sR.input.value = "5"; render(); draw() })
  bShower.addEventListener("click", () => { sV.input.value = "220"; sR.input.value = "8.8"; render(); draw() })
  sV.input.addEventListener("input", () => { if (Number(sV.input.value) > 2) sV.input.step = "1" })
  playBtn(box, l, bPile.parentElement as HTMLElement)
  render(); draw()
}

function circuitLab(box: HTMLElement) {
  const W = 520, H = 250
  const s = chart(box, W, H, "Duas lâmpadas ligadas a uma bateria")
  const gWire = svg("g", {}), gDots = svg("g", {}), gBulb = svg("g", {})
  s.append(gWire, gDots, gBulb)
  const sV = slider(box, "Voltagem da bateria (V)", 1, 12, 9)
  const s1 = slider(box, "Resistência da lâmpada 1 (Ω)", 10, 500, 100, 10)
  const s2 = slider(box, "Resistência da lâmpada 2 (Ω)", 10, 500, 200, 10)
  const [bSer, bPar] = btnRow(box, ["Em série", "Em paralelo"])
  const [rReq, rI, rL1, rL2] = readouts(box, ["Resistência equivalente", "Corrente da bateria", "Lâmpada 1", "Lâmpada 2"])
  const msg = note(box)
  let series = true
  let paths: SVGPathElement[] = [], phase = 0
  const layout = () => {
    gWire.replaceChildren(); gBulb.replaceChildren()
    const d = series
      ? ["M 70 120 L 70 40 L 460 40 L 460 210 L 70 210 L 70 140"]
      : ["M 70 120 L 70 40 L 240 40 L 240 210 L 70 210 L 70 140", "M 70 120 L 70 40 L 440 40 L 440 210 L 70 210 L 70 140"]
    paths = d.map((p) => {
      const e = svg("path", { d: p, fill: "none", stroke: "var(--gray)", "stroke-width": 2 }) as SVGPathElement
      gWire.appendChild(e)
      return e
    })
    gWire.append(svg("line", { x1: 52, x2: 88, y1: 120, y2: 120, stroke: "var(--darkgray)", "stroke-width": 2 }), svg("line", { x1: 60, x2: 80, y1: 140, y2: 140, stroke: "var(--darkgray)", "stroke-width": 5 }))
    const lab = svg("text", { x: 96, y: 134, class: "tick" }); lab.textContent = "bateria"; gWire.appendChild(lab)
  }
  const bulbAt = (x: number, y: number, P: number, Pmax: number, name: string, I: number, Vb: number) => {
    const glow = Math.min(1, Math.sqrt(P / Pmax))
    gBulb.append(
      svg("circle", { cx: x, cy: y, r: 30, fill: "var(--tertiary)", opacity: 0.1 + 0.6 * glow }),
      svg("circle", { cx: x, cy: y, r: 15, fill: "var(--light)", stroke: "var(--darkgray)", "stroke-width": 2 }),
      svg("circle", { cx: x, cy: y, r: 11, fill: "var(--tertiary)", opacity: 0.08 + 0.92 * glow }),
    )
    const right = x > 400 || !series, tx = right ? x - 22 : x + 22, anchor = right ? "end" : "start"
    const t = svg("text", { x: tx, y: y - 20, class: "tick", "text-anchor": anchor }); t.textContent = name
    const t2 = svg("text", { x: tx, y: y + 30, class: "tick accent", "text-anchor": anchor }); t2.textContent = `${fmt(I * 1000, 1)} mA, ${fmt(Vb, 2)} V`
    gBulb.append(t, t2)
  }
  const solve = () => {
    const V = Number(sV.input.value), R1 = Number(s1.input.value), R2 = Number(s2.input.value)
    if (series) { const I = V / (R1 + R2); return { V, R1, R2, Req: R1 + R2, I, I1: I, I2: I, V1: I * R1, V2: I * R2 } }
    const Req = 1 / (1 / R1 + 1 / R2)
    return { V, R1, R2, Req, I: V / Req, I1: V / R1, I2: V / R2, V1: V, V2: V }
  }
  const draw = () => {
    const c = solve()
    gBulb.replaceChildren()
    const Pm = 1.5
    if (series) { bulbAt(200, 40, c.I1 * c.V1, Pm, "lâmpada 1", c.I1, c.V1); bulbAt(460, 125, c.I2 * c.V2, Pm, "lâmpada 2", c.I2, c.V2) }
    else { bulbAt(240, 125, c.I1 * c.V1, Pm, "lâmpada 1", c.I1, c.V1); bulbAt(440, 125, c.I2 * c.V2, Pm, "lâmpada 2", c.I2, c.V2) }
    gDots.replaceChildren()
    const currents = series ? [c.I] : [c.I1, c.I2]
    paths.forEach((p, k) => {
      const L = p.getTotalLength()
      const off = (phase * Math.min(4, currents[k] * 40)) % 30
      for (let a = L - off; a > 0; a -= 30) {
        const q = p.getPointAtLength(a)
        gDots.appendChild(svg("circle", { cx: q.x, cy: q.y, r: 2.6, fill: "var(--secondary)" }))
      }
    })
  }
  const render = () => {
    const c = solve()
    sV.out.textContent = `${c.V} V`; s1.out.textContent = `${c.R1} Ω`; s2.out.textContent = `${c.R2} Ω`
    rReq.textContent = `${fmt(c.Req, 1)} Ω`
    rI.textContent = `${fmt(c.I * 1000, 1)} mA`
    rL1.textContent = `${fmt(c.V1, 2)} V · ${fmt(c.I1 * c.V1 * 1000, 0)} mW`
    rL2.textContent = `${fmt(c.V2, 2)} V · ${fmt(c.I2 * c.V2 * 1000, 0)} mW`
    bSer.setAttribute("aria-pressed", String(series)); bPar.setAttribute("aria-pressed", String(!series))
    msg.textContent = series
      ? `Em série, a mesma corrente passa pelas duas e as voltagens se somam: ${fmt(c.V1, 2)} + ${fmt(c.V2, 2)} = ${fmt(c.V, 2)} V. A resistência total é a soma, e as lâmpadas ficam mais fracas.`
      : `Em paralelo, cada lâmpada recebe a voltagem inteira e as correntes se somam: ${fmt(c.I1 * 1000, 1)} + ${fmt(c.I2 * 1000, 1)} = ${fmt(c.I * 1000, 1)} mA. A resistência total fica menor que a menor delas. É assim que se ligam os aparelhos de uma casa.`
  }
  const l = loop(box, () => { phase += 1; draw() })
  ;[sV, s1, s2].forEach((x) => x.input.addEventListener("input", () => (render(), draw())))
  bSer.addEventListener("click", () => { series = true; layout(); render(); draw() })
  bPar.addEventListener("click", () => { series = false; layout(); render(); draw() })
  playBtn(box, l, bSer.parentElement as HTMLElement)
  layout(); render(); draw()
}

function wireField(box: HTMLElement) {
  const W = 360, H = 360, C = 180, PX_CM = 32
  const ctx = canvas(box, W, H, "Fio visto de frente, cercado de bússolas")
  ;(ctx.canvas as HTMLCanvasElement).style.maxWidth = "380px"
  ;(ctx.canvas as HTMLCanvasElement).style.margin = "0 auto"
  const sI = slider(box, "Corrente no fio (A, positiva saindo da tela)", -20, 20, 0)
  const sr = slider(box, "Distância do ponto medido (cm)", 0.5, 5, 1, 0.5)
  const [bEarth] = btnRow(box, ["Campo da Terra: ligado"])
  const [rB, rRatio] = readouts(box, ["Campo do fio no ponto", "Comparado à Terra (componente horizontal, ~30 µT)"])
  const msg = note(box)
  let earth = true
  const BE = 30
  const Bwire = (rcm: number) => (MU0 * Number(sI.input.value)) / (2 * Math.PI * (rcm / 100)) * 1e6
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const I = Number(sI.input.value)
    ctx.strokeStyle = cssVar("--lightgray"); ctx.lineWidth = 1
    for (const rc of [1.25, 2.5, 3.75, 5]) { ctx.beginPath(); ctx.arc(C, C, rc * PX_CM, 0, 2 * Math.PI); ctx.stroke() }
    const rp = Number(sr.input.value) * PX_CM
    ctx.strokeStyle = cssVar("--tertiary"); ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(C, C, rp, 0, 2 * Math.PI); ctx.stroke(); ctx.setLineDash([])
    for (const rc of [1.25, 2.5, 3.75, 5])
      for (let k = 0; k < 8; k++) {
        const a = (2 * Math.PI * k) / 8 + (rc === 2.5 || rc === 5 ? Math.PI / 8 : 0)
        const x = C + rc * PX_CM * Math.cos(a), y = C - rc * PX_CM * Math.sin(a)
        const bw = Bwire(rc)
        let bx = -Math.sin(a) * bw, by = Math.cos(a) * bw
        if (earth) by += BE
        const m = Math.hypot(bx, by)
        ctx.fillStyle = cssVar("--light"); ctx.strokeStyle = cssVar("--gray"); ctx.lineWidth = 1
        ctx.beginPath(); ctx.arc(x, y, 12, 0, 2 * Math.PI); ctx.fill(); ctx.stroke()
        if (m < 1e-9) continue
        const ux = bx / m, uy = -by / m
        ctx.lineWidth = 3
        ctx.strokeStyle = cssVar("--tertiary"); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + ux * 10, y + uy * 10); ctx.stroke()
        ctx.strokeStyle = cssVar("--gray"); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - ux * 10, y - uy * 10); ctx.stroke()
      }
    ctx.fillStyle = cssVar("--darkgray"); ctx.beginPath(); ctx.arc(C, C, 11, 0, 2 * Math.PI); ctx.fill()
    ctx.strokeStyle = cssVar("--light"); ctx.fillStyle = cssVar("--light"); ctx.lineWidth = 2
    if (I > 0) { ctx.beginPath(); ctx.arc(C, C, 3, 0, 2 * Math.PI); ctx.fill() }
    if (I < 0) { ctx.beginPath(); ctx.moveTo(C - 5, C - 5); ctx.lineTo(C + 5, C + 5); ctx.moveTo(C + 5, C - 5); ctx.lineTo(C - 5, C + 5); ctx.stroke() }
    if (earth) { arrow(ctx, W - 24, 70, W - 24, 24, cssVar("--gray"), 2); ctx.fillStyle = cssVar("--gray"); ctx.font = "11px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText("norte", W - 24, 84) }
  }
  const render = () => {
    const I = Number(sI.input.value), rc = Number(sr.input.value), b = Math.abs(Bwire(rc))
    sI.out.textContent = `${fmtSigned(I, 0)} A`; sr.out.textContent = `${fmt(rc, 1)} cm`
    rB.textContent = `${fmt(b, b >= 10 ? 0 : 1)} µT`
    rRatio.textContent = I === 0 ? "—" : `${fmt(b / BE, 2)} vezes`
    bEarth.textContent = earth ? "Campo da Terra: ligado" : "Campo da Terra: desligado"
    bEarth.setAttribute("aria-pressed", String(earth))
    msg.textContent =
      I === 0
        ? earth ? "Sem corrente, todas as bússolas apontam para o norte da Terra. Aumente a corrente, como Ørsted em 1820." : "Sem corrente e sem a Terra: nenhum campo, as agulhas ficam soltas."
        : `A corrente cria um campo em círculos em volta do fio (${I > 0 ? "anti-horário, com a corrente saindo da tela" : "horário, com a corrente entrando na tela"}): regra da mão direita. Ele cai com 1/r. ` +
          (!earth
            ? "Sem a Terra, só o campo do fio: as agulhas formam círculos completos."
            : `A cerca de ${fmt((20 * Math.abs(I)) / BE, 1)} cm os dois campos se igualam: mais perto, o fio manda; mais longe, a Terra.`)
  }
  ;[sI, sr].forEach((s) => s.input.addEventListener("input", () => (render(), draw())))
  bEarth.addEventListener("click", () => { earth = !earth; render(); draw() })
  render(); draw()
}

function inductionLab(box: HTMLElement) {
  const W = 520, H = 236, COIL = 300, PX_M = 2000
  const ctx = canvas(box, W, H, "Ímã passando por dentro de uma bobina ligada a um medidor")
  const plot = chart(box, 520, 150, "Fluxo magnético e tensão induzida ao longo do tempo")
  const zero = svg("line", { x1: 10, x2: 510, y1: 75, y2: 75, class: "axis" })
  const lF = svg("polyline", { class: "curve alt" }), lE = svg("polyline", { class: "curve page" })
  plot.append(zero, lF, lE)
  const sN = slider(box, "Número de voltas da bobina", 10, 200, 100, 10)
  const sw = slider(box, "Rapidez do vaivém", 1, 10, 4)
  const [rPhi, rEmf] = readouts(box, ["Fluxo numa volta (azul)", "Voltagem induzida (laranja)"])
  const msg = note(box)
  const PHI0 = 1e-4, A = 0.03
  const phi = (x: number) => PHI0 / (1 + (x / A) ** 2) ** 1.5
  let x = -0.09, t = 0, emf = 0, hist: [number, number][] = [], dragging = false, dragX = x
  const draw = () => {
    ctx.clearRect(0, 0, W, H)
    const g = cssVar("--gray")
    ctx.strokeStyle = cssVar("--tertiary"); ctx.lineWidth = 3
    ctx.strokeStyle = g; ctx.lineWidth = 1.5
    ctx.beginPath(); ctx.moveTo(COIL - 30, 129); ctx.lineTo(COIL - 30, 214); ctx.moveTo(COIL + 30, 129); ctx.lineTo(COIL + 30, 214); ctx.stroke()
    ctx.fillStyle = cssVar("--light"); ctx.strokeStyle = cssVar("--darkgray")
    ctx.beginPath(); ctx.arc(COIL, 216, 42, Math.PI, 2 * Math.PI); ctx.closePath(); ctx.fill(); ctx.stroke()
    const ang = Math.max(-1, Math.min(1, emf / 0.06)) * 1.3
    ctx.strokeStyle = cssVar("--tertiary"); ctx.lineWidth = 2.5
    ctx.beginPath(); ctx.moveTo(COIL, 216); ctx.lineTo(COIL + 34 * Math.sin(ang), 216 - 34 * Math.cos(ang)); ctx.stroke()
    ctx.fillStyle = g; ctx.font = "11px system-ui, sans-serif"; ctx.textAlign = "center"; ctx.fillText("0", COIL, 190)
    ctx.strokeStyle = cssVar("--tertiary"); ctx.lineWidth = 3
    for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(COIL - 30 + k * 10, 95, 7, 34, 0, Math.PI / 2, (3 * Math.PI) / 2); ctx.stroke() }
    const mx = COIL + x * PX_M
    ctx.fillStyle = cssVar("--secondary"); ctx.fillRect(mx - 40, 83, 40, 24)
    ctx.fillStyle = cssVar("--tertiary"); ctx.fillRect(mx, 83, 40, 24)
    ctx.fillStyle = cssVar("--light"); ctx.font = "bold 12px system-ui, sans-serif"; ctx.fillText("S", mx - 20, 100); ctx.fillText("N", mx + 20, 100)
    ctx.strokeStyle = cssVar("--tertiary"); ctx.lineWidth = 3
    for (let k = 0; k < 7; k++) { ctx.beginPath(); ctx.ellipse(COIL - 30 + k * 10, 95, 7, 34, 0, -Math.PI / 2, Math.PI / 2); ctx.stroke() }
    const Yf = (v: number) => 140 - (v / PHI0) * 125, Ye = (v: number) => 75 - Math.max(-1.1, Math.min(1.1, v / 0.06)) * 60
    lF.setAttribute("points", pts(hist.map(([f], i) => [10 + i, Yf(f)])))
    lE.setAttribute("points", pts(hist.map(([, e], i) => [10 + i, Ye(e)])))
  }
  const render = () => {
    sN.out.textContent = sN.input.value; sw.out.textContent = sw.input.value
    rPhi.textContent = `${fmt(phi(x) * 1e6, 0)} µWb`
    rEmf.textContent = `${fmtSigned(emf * 1000, 0)} mV`
    const moving = Math.abs(emf) > 0.002
    msg.textContent = !l.running && !dragging && !moving
      ? "Ímã parado: o fluxo não muda e o medidor fica no zero, mesmo com o ímã dentro da bobina. Arraste o ímã ou rode o vaivém."
      : Math.abs(x) < 0.008
        ? "No meio da bobina o fluxo é máximo, mas por um instante não está mudando: a voltagem passa por zero e troca de sinal."
        : "Só aparece voltagem enquanto o fluxo muda. Entrando, o ponteiro vai para um lado; saindo, para o outro. Mais voltas ou mais rapidez, mais voltagem."
  }
  const step = (nx: number, dt: number) => {
    const N = Number(sN.input.value)
    const e = (-N * (phi(nx) - phi(x))) / dt
    emf = emf * 0.6 + e * 0.4
    x = nx
    hist.push([phi(x), emf]); if (hist.length > 500) hist.shift()
  }
  const l = loop(box, () => {
    if (dragging) return
    t += (Number(sw.input.value) * 0.5) / 60
    step(-0.09 * Math.cos(t), 1 / 60)
    render(); draw()
  })
  const idle = loop(box, () => {
    if (l.running && !dragging) return
    step(dragging ? dragX : x, 1 / 60)
    render(); draw()
  })
  idle.running = true
  pointer(ctx, W, H, (px, py) => {
    if (Math.abs(px - (COIL + x * PX_M)) < 45 && py > 70 && py < 120) { dragging = true; dragX = x; l.running = false; sync(); return true }
    return false
  }, (px, _py, d) => {
    if (d) dragX = Math.max(-0.12, Math.min(0.09, (px - COIL) / PX_M))
  }, () => { dragging = false; t = Math.acos(Math.max(-1, Math.min(1, -x / 0.09))) })
  const sync = playBtn(box, l)
  sN.input.addEventListener("input", () => (render(), draw()))
  sw.input.addEventListener("input", render)
  render(); draw()
}

const LABS: Record<string, [string, (box: HTMLElement) => void]> = {
  "escape-velocity": ["Laboratório: espremendo a Terra", escapeVelocity],
  lorentz: ["Laboratório: o tempo perto da luz", lorentz],
  coins: ["Laboratório: entropia com moedas", coins],
  "entangled-pair": ["Laboratório: medindo um par emaranhado", entangledPair],
  "page-curve": ["Laboratório: a curva de Page", pageCurve],
  transit: ["Laboratório: um planeta passando na frente da estrela", transit],
  projectile: ["Laboratório: lançando um projétil", projectile],
  "fit-law": ["Laboratório: descubra a lei pelos dados", fitLaw],
  growth: ["Laboratório: crescer e decair", growth],
  dice: ["Laboratório: jogando dados", dice],
  dimensions: ["Laboratório: o pêndulo só com unidades", dimensions],
  measure: ["Laboratório: medindo de novo e de novo", measure],
  taylor: ["Laboratório: aproximando com polinômios", taylor],
  complex: ["Laboratório: o plano complexo", complexPlane],
  noise: ["Laboratório: um planeta escondido no ruído", noise],
  fourier: ["Laboratório: montando ondas com senos", fourier],
  matrix: ["Laboratório: uma matriz deformando o plano", matrix],
  gas: ["Laboratório: um gás na caixa", gas],
  pv: ["Laboratório: aquecendo e expandindo um gás", pv],
  carnot: ["Laboratório: o limite de Carnot", carnot],
  mixing: ["Laboratório: um gás se espalhando", (b) => mixing(b, false)],
  reverse: ["Laboratório: rodando o filme ao contrário", (b) => mixing(b, true)],
  "free-energy": ["Laboratório: gelo ou água?", freeEnergy],
  shannon: ["Laboratório: quanta informação tem uma moeda", shannon],
  cooling: ["Laboratório: perseguindo o zero absoluto", cooling],
  ising: ["Laboratório: um ímã esquentando", ising],
  drop: ["Laboratório: martelo e pena", drop],
  "motion-graphs": ["Laboratório: os gráficos do movimento", motionGraphs],
  skaters: ["Laboratório: dois patinadores se empurrando", skaters],
  cannon: ["Laboratório: o canhão de Newton", cannon],
  seesaw: ["Laboratório: a gangorra", seesaw],
  skate: ["Laboratório: skate na rampa", skate],
  collide: ["Laboratório: batida de blocos", collide],
  spinner: ["Laboratório: a patinadora girando", spinner],
  buoyancy: ["Laboratório: afunda ou flutua?", buoyancy],
  venturi: ["Laboratório: água num cano que afina", venturi],
  impulse: ["Laboratório: parando uma bola", impulse],
  "vector-add": ["Laboratório: somando vetores", vectorAdd],
  "euler-steps": ["Laboratório: resolvendo passo a passo", eulerSteps],
  spring: ["Laboratório: massa e mola", springLab],
  "pendulum-lab": ["Laboratório: o pêndulo de verdade", pendulumLab],
  "double-pendulum": ["Laboratório: o pêndulo duplo", doublePendulum],
  action: ["Laboratório: o caminho de menor ação", actionLab],
  "spring-pendulum": ["Laboratório: o pêndulo de mola", springPendulum],
  phase: ["Laboratório: o espaço de fase", phaseSpace],
  noether: ["Laboratório: simetria e conservação", noetherLab],
  charges: ["Laboratório: esfregando um balão", chargesLab],
  magnet: ["Laboratório: um ímã e muitas bússolas", magnetLab],
  coulomb: ["Laboratório: a força entre duas cargas", coulombLab],
  "field-lines": ["Laboratório: desenhando o campo elétrico", fieldLines],
  potential: ["Laboratório: a paisagem do potencial", potentialLab],
  cyclotron: ["Laboratório: uma carga num campo magnético", cyclotronLab],
  capacitor: ["Laboratório: carregando um capacitor", capacitorLab],
  ohm: ["Laboratório: a lei de Ohm num fio", ohmLab],
  circuit: ["Laboratório: série ou paralelo?", circuitLab],
  "wire-field": ["Laboratório: o experimento de Ørsted", wireField],
  induction: ["Laboratório: um ímã atravessando a bobina", inductionLab],
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
