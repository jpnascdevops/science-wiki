import re
from dataclasses import dataclass
from pathlib import Path

import yaml

class WikiLoader(yaml.SafeLoader):
    pass


WikiLoader.yaml_implicit_resolvers = {
    k: [(tag, rx) for tag, rx in v if tag != "tag:yaml.org,2002:timestamp"]
    for k, v in yaml.SafeLoader.yaml_implicit_resolvers.items()
}
WikiLoader.add_implicit_resolver(
    "tag:yaml.org,2002:float",
    re.compile(r"^[-+]?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)[eE][-+]?[0-9]+$"),
    list("-+0123456789."),
)

ROOT = Path(__file__).resolve().parent.parent
CONCEPTS_DIR = ROOT / "content" / "concepts"
DATA_DIR = ROOT / "data"


@dataclass
class Concept:
    path: Path
    meta: dict
    body: str

    @property
    def id(self) -> str:
        return self.meta["id"]


def parse(path: Path) -> Concept:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError(f"{path.name}: missing frontmatter")
    _, front, body = text.split("---\n", 2)
    return Concept(path, yaml.load(front, Loader=WikiLoader), body)


def load_all() -> dict[str, Concept]:
    concepts = {}
    for path in sorted(CONCEPTS_DIR.glob("*.md")):
        c = parse(path)
        if c.id in concepts:
            raise ValueError(f"duplicate id: {c.id}")
        concepts[c.id] = c
    return concepts


def load_yaml(name: str):
    return yaml.load((DATA_DIR / name).read_text(encoding="utf-8"), Loader=WikiLoader)


def topo_order(concepts: dict[str, Concept]) -> list[str]:
    indegree = {cid: 0 for cid in concepts}
    children = {cid: [] for cid in concepts}
    for cid, c in concepts.items():
        for pre in c.meta.get("prerequisites", []):
            indegree[cid] += 1
            children[pre].append(cid)
    ready = sorted(cid for cid, d in indegree.items() if d == 0)
    order = []
    while ready:
        cid = ready.pop(0)
        order.append(cid)
        for child in sorted(children[cid]):
            indegree[child] -= 1
            if indegree[child] == 0:
                ready.append(child)
    if len(order) != len(concepts):
        cyclic = sorted(set(concepts) - set(order))
        raise ValueError(f"cycle in prerequisites: {cyclic}")
    return order


def depth(concepts: dict[str, Concept]) -> dict[str, int]:
    result = {}
    for cid in topo_order(concepts):
        pres = concepts[cid].meta.get("prerequisites", [])
        result[cid] = 1 + max((result[p] for p in pres), default=-1)
    return result
