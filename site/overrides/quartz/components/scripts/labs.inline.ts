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
