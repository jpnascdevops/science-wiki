import re
import sys
from dataclasses import dataclass
from pathlib import Path

import yaml

# Preserve Portuguese text and scientific symbols in Windows terminals and pipes.
for stream in (sys.stdout, sys.stderr):
    if hasattr(stream, "reconfigure"):
        stream.reconfigure(encoding="utf-8")

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


@dataclass
class Node:
    id: str
    title: str
    module: str
    requires: list[str]


def load_map() -> dict[str, Node]:
    nodes = {}
    for module in load_yaml("map.yaml")["modules"]:
        for c in module["concepts"]:
            if c["id"] in nodes:
                raise ValueError(f"duplicate id in map: {c['id']}")
            nodes[c["id"]] = Node(c["id"], c["title"], module["id"], list(c.get("requires", [])))
    return nodes


def children(nodes: dict[str, Node]) -> dict[str, list[str]]:
    out = {cid: [] for cid in nodes}
    for cid, n in nodes.items():
        for pre in n.requires:
            if pre in out:
                out[pre].append(cid)
    return out


def topo_order(nodes: dict[str, Node]) -> list[str]:
    indegree = {cid: len(n.requires) for cid, n in nodes.items()}
    kids = children(nodes)
    ready = sorted(cid for cid, d in indegree.items() if d == 0)
    order = []
    while ready:
        cid = ready.pop(0)
        order.append(cid)
        for child in sorted(kids[cid]):
            indegree[child] -= 1
            if indegree[child] == 0:
                ready.append(child)
    if len(order) != len(nodes):
        raise ValueError(f"cycle in map: {sorted(set(nodes) - set(order))}")
    return order


def depth(nodes: dict[str, Node]) -> dict[str, int]:
    result = {}
    for cid in topo_order(nodes):
        result[cid] = 1 + max((result[p] for p in nodes[cid].requires), default=-1)
    return result


def ancestors(nodes: dict[str, Node], targets: list[str]) -> set[str]:
    seen = set()
    stack = list(targets)
    while stack:
        cid = stack.pop()
        if cid in seen:
            continue
        seen.add(cid)
        stack.extend(nodes[cid].requires)
    return seen
