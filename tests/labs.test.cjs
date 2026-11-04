const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const source = fs.readFileSync('site/overrides/quartz/components/scripts/labs.inline.ts', 'utf8')

// Exercise the actual loop source with a synthetic browser clock.
function simulate(hz) {
  let callback, steps = 0
  const context = { window: { matchMedia: () => ({matches: false}) },
    requestAnimationFrame: fn => { callback = fn } }
  vm.createContext(context)
  const loop = source.slice(source.indexOf('function loop('), source.indexOf('\nconst K_B'))
    .replace('box: HTMLElement, step: () => void', 'box, step')
    .replace('let previous: number | undefined', 'let previous')
    .replace('(now: number)', '(now)').replace('(v: boolean)', '(v)')
  vm.runInContext(loop, context)
  const controls = context.loop({isConnected: true}, () => steps++)
  for (let i = 0; i <= hz * 10; i++) callback(i * 1000 / hz)
  assert.ok(Math.abs(steps - 600) <= 1, `${hz} Hz: ${steps} steps`)
  controls.running = false
  const before = steps
  callback(11000); callback(12000)
  assert.equal(steps, before)
  controls.running = true
  callback(13000)
  assert.equal(steps, before, 'resume must not catch up paused time')
}
test('simulation time is independent of refresh rate; pause does not accumulate time', () => {
  for (const hz of [30, 60, 120, 144]) simulate(hz)
})

test('actual RK4 integrator follows an oscillator and conserves energy over many periods', () => {
  const code = source.slice(source.indexOf('function rk4('), source.indexOf('\nfunction eulerSteps('))
    .replace('f: (y: number[]) => number[], y: number[], h: number', 'f, y, h')
  const context = {}; vm.createContext(context); vm.runInContext(code, context)
  let y = [1, 0]; const dt = 1 / 240
  for (let i = 0; i < 24000; i++) y = context.rk4(([x,v]) => [v,-x], y, dt)
  assert.ok(Math.abs(y[0] - Math.cos(100)) < 1e-8)
  assert.ok(Math.abs(y[0] ** 2 + y[1] ** 2 - 1) < 1e-8)
})

test('lab action agrees with analytic reference cases also checked in Python', () => {
  const action = source.slice(source.indexOf('function actionLab('), source.indexOf('\nfunction springPendulum('))
  const calculation = action.slice(action.indexOf('  const S ='), action.indexOf('  const render ='))
    .replace('(a: number)', '(a)')
  for (const n of [1, 2]) {
    const context = { T: 2, g: 9.81, m: 1, n }; vm.createContext(context)
    vm.runInContext(calculation + '\nglobalThis.action = S', context)
    const cases = JSON.parse(fs.readFileSync('tests/action-cases.json', 'utf8'))
    for (const {amplitude: a, delta_action} of cases) {
      const actual = context.action(a) - context.action(0)
      const expected = delta_action * n * n
      assert.ok(Math.abs(actual - expected) < 0.0001)
    }
  }
})
