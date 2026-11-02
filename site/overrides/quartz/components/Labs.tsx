// @ts-ignore
import script from "./scripts/labs.inline"
import { QuartzComponent, QuartzComponentConstructor } from "./types"

const Labs: QuartzComponent = () => <></>

Labs.afterDOMLoaded = script
Labs.css = `
.lab {
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  padding: 1rem 1.1rem;
  margin: 1.2rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  background: var(--highlight);
}
.lab-title {
  font-family: var(--codeFont);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--tertiary);
}
.lab-ctrl { display: flex; flex-direction: column; gap: 0.3rem; }
.lab-ctrl-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-family: var(--codeFont);
  font-size: 0.8rem;
  color: var(--darkgray);
}
.lab-ctrl input { width: 100%; accent-color: var(--tertiary); }
.lab-readout { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem; }
.lab-readout div {
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  padding: 0.4rem 0.6rem;
  display: flex;
  flex-direction: column;
  min-width: 0;
  background: var(--light);
}
.lab-readout span { font-family: var(--codeFont); font-size: 0.7rem; color: var(--gray); }
.lab-readout b { font-family: var(--codeFont); font-weight: 500; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
.lab-note { margin: 0; font-size: 0.95rem; min-height: 2.8em; }
.lab-note.alert { color: var(--tertiary); font-weight: 600; }
.lab-bar { height: 10px; border-radius: 6px; background: var(--lightgray); overflow: hidden; }
.lab-bar i { display: block; height: 100%; width: 0; background: var(--secondary); transition: width 0.15s; }
.lab-bar.full i { background: var(--tertiary); }
.lab-btns { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.lab-btn {
  font: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.45rem 0.9rem;
  border-radius: 8px;
  border: 1.5px solid var(--dark);
  background: var(--dark);
  color: var(--light);
  cursor: pointer;
}
.lab-btn.ghost { background: transparent; color: var(--dark); }
.lab-btn:focus-visible, .lab-ctrl input:focus-visible { outline: 2px solid var(--tertiary); outline-offset: 3px; }
.lab-coins { display: flex; flex-wrap: wrap; gap: 5px; min-height: 22px; }
.lab-coins .coin { width: 18px; height: 18px; border-radius: 50%; }
.lab-coins .heads { background: var(--tertiary); }
.lab-coins .tails { border: 1.5px solid var(--secondary); box-sizing: border-box; }
.lab-pair { display: grid; grid-template-columns: 1fr auto 1fr; gap: 0.8rem; align-items: center; }
.lab-particle {
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  padding: 0.7rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  background: var(--light);
}
.lab-particle span { font-family: var(--codeFont); font-size: 0.7rem; color: var(--gray); }
.lab-particle b { font-family: var(--headerFont); font-size: 2.2rem; line-height: 1.1; }
.lab-thread { font-family: var(--codeFont); font-size: 0.75rem; color: var(--gray); }
.lab-plot { width: 100%; height: auto; display: block; }
.lab-plot .grid { stroke: var(--lightgray); stroke-width: 1; }
.lab-plot .tick { fill: var(--gray); font-family: var(--codeFont); font-size: 11px; }
.lab-plot .tick.accent { fill: var(--tertiary); }
.lab-plot .page-line { stroke: var(--tertiary); stroke-dasharray: 4 4; }
.lab-plot .curve { fill: none; stroke-linejoin: round; }
.lab-plot .curve.page { stroke: var(--tertiary); stroke-width: 3; }
.lab-plot .curve.hawking { stroke: var(--secondary); stroke-width: 2; stroke-dasharray: 7 5; }
.lab-plot .curve.bh { stroke: var(--gray); stroke-width: 1.5; stroke-dasharray: 2 4; }
.lab-plot .cursor { stroke: var(--dark); opacity: 0.35; }
.lab-plot .dot { fill: var(--tertiary); }
.lab-plot .star { fill: var(--tertiary); opacity: 0.85; }
.lab-plot .planet { fill: var(--dark); }
.lab-legend { display: flex; flex-wrap: wrap; gap: 0.3rem 1rem; font-size: 0.8rem; color: var(--darkgray); }
.lab-legend span { display: inline-flex; align-items: center; gap: 0.4rem; }
.lab-legend .sw { width: 18px; height: 0; border-top: 2.5px solid; display: inline-block; }
.lab-legend .sw.page { border-color: var(--tertiary); }
.lab-legend .sw.hawking { border-color: var(--secondary); border-top-style: dashed; }
.lab-legend .sw.bh { border-color: var(--gray); border-top-style: dotted; }
@media (max-width: 600px) { .lab-pair { grid-template-columns: 1fr; } }
@media (prefers-reduced-motion: reduce) { .lab-bar i { transition: none; } }
`

export default (() => Labs) satisfies QuartzComponentConstructor
