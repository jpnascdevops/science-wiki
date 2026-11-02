// @ts-ignore
import script from "./scripts/study.inline"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const StudyTools: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  const match = slug.match(/^concepts\/([a-z0-9-]+)$/)
  if (!match || match[1] === "index") return <></>
  const tags = (fileData.frontmatter?.tags as string[] | undefined) ?? []
  const hasTechnical = tags.includes("level/technical")
  return (
    <div class="study-tools" data-id={match[1]}>
      {hasTechnical && (
        <div class="level-switch" role="group" aria-label="Nível de leitura">
          <button type="button" class="level-btn" data-level="zero" aria-pressed="false">
            Do zero
          </button>
          <button type="button" class="level-btn" data-level="technical" aria-pressed="true">
            Com nível técnico
          </button>
        </div>
      )}
      <button type="button" class="study-toggle" aria-pressed="false">
        Marcar como estudado
      </button>
    </div>
  )
}

StudyTools.afterDOMLoaded = script
StudyTools.css = `
.study-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
  justify-content: space-between;
  margin: 0.6rem 0 0.2rem;
}
.level-switch {
  display: inline-flex;
  border: 1px solid var(--lightgray);
  border-radius: 8px;
  overflow: hidden;
}
.level-btn, .study-toggle {
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 0.4rem 0.8rem;
  border: 0;
  background: transparent;
  color: var(--darkgray);
  cursor: pointer;
}
.level-btn[aria-pressed="true"] { background: var(--secondary); color: var(--light); }
.study-toggle { border: 1.5px solid var(--secondary); border-radius: 8px; color: var(--secondary); }
.study-toggle.on { background: var(--tertiary); border-color: var(--tertiary); color: var(--light); }
.level-btn:focus-visible, .study-toggle:focus-visible { outline: 2px solid var(--tertiary); outline-offset: 2px; }
.roadmap-progress {
  border: 1px solid var(--lightgray);
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.roadmap-progress p { margin: 0; }
.rp-head { display: flex; justify-content: space-between; font-variant-numeric: tabular-nums; }
.rp-bar { height: 8px; border-radius: 5px; background: var(--lightgray); overflow: hidden; }
.rp-bar i { display: block; height: 100%; background: var(--tertiary); }
tr.row-studied td:nth-child(2) a::after { content: "  estudado"; font-size: 0.75em; color: var(--tertiary); font-weight: 600; }
tr.row-next { background: var(--highlight); }
tr.row-next td:nth-child(2) a::after { content: "  próximo"; font-size: 0.75em; color: var(--secondary); font-weight: 600; }
`

export default (() => StudyTools) satisfies QuartzComponentConstructor
