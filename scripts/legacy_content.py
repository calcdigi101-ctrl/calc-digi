"""
Extract the SEO article from a legacy calculator page (raw HTML embedded in
page.tsx) so it can be re-rendered inside the redesigned layout.

Sections whose body text is repeated across many pages (copy-pasted
boilerplate such as "Share and Save Results" or "Why Use CalcDigi") are
dropped, as are generic FAQs like "Is this calculator free?".
"""
import collections
import json
import os
import re
import subprocess

from bs4 import BeautifulSoup, Comment, NavigableString, Tag

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPEAT_THRESHOLD = 4
# Last commit before the redesign: legacy markup is always read from here, so
# pages that have already been converted can be regenerated and the
# boilerplate counts stay stable.
LEGACY_REF = "737ea3e"
CACHE = os.path.join(ROOT, "scripts", ".legacy_counts.json")


def git(*args):
    return subprocess.run(["git", "-C", ROOT, *args], capture_output=True, text=True, check=True).stdout


def legacy_pages():
    return [p for p in git("ls-tree", "-r", "--name-only", LEGACY_REF, "app/calculators").split() if p.endswith("/page.tsx") and p.count("/") == 4]


def read_legacy(rel):
    s = git("show", f"{LEGACY_REF}:{rel}")
    meta = re.search(r"export const metadata: Metadata = (\{.*?\n\});", s, re.S)
    blobs = [json.loads(b) for b in re.findall(r'dangerouslySetInnerHTML=\{\{ __html: (".*?") \}\}', s, re.S)]
    html = [b for b in blobs if '"@context"' not in b]
    return (json.loads(meta.group(1)) if meta else {}), (html[0] if html else "")


def norm(text, title=""):
    t = text.lower()
    for w in re.findall(r"[a-z]+", title.lower()):
        if len(w) > 3:
            t = t.replace(w, "")
    return re.sub(r"[^a-z]+", " ", t).strip()


def blocks(soup):
    """Yield (heading_tag, [nodes]) for each h2/h3-led block inside content sections."""
    for sec in soup.select(".calc-main .content-section, main > .content-section"):
        if sec.find_parent(class_="content-section"):
            continue
        cur_h, cur = None, []
        for child in list(sec.children):
            if isinstance(child, Tag) and child.name in ("h2", "h3"):
                if cur_h is not None or cur:
                    yield cur_h, cur
                cur_h, cur = child, []
            elif isinstance(child, Tag) and "content-section" in (child.get("class") or []):
                # Nested boilerplate section: flush and recurse.
                if cur_h is not None or cur:
                    yield cur_h, cur
                cur_h, cur = None, []
                inner = BeautifulSoup(str(child), "html.parser")
                for h in inner.find_all(["h2", "h3"]):
                    nodes = []
                    for sib in h.next_siblings:
                        if isinstance(sib, Tag) and sib.name in ("h2", "h3"):
                            break
                        nodes.append(sib)
                    yield h, nodes
            else:
                cur.append(child)
        if cur_h is not None or cur:
            yield cur_h, cur


def text_of(nodes):
    return " ".join(n.get_text(" ", strip=True) if isinstance(n, Tag) else str(n).strip() for n in nodes)


def counts():
    if os.path.exists(CACHE):
        return json.load(open(CACHE))
    block_c, faq_c = collections.Counter(), collections.Counter()
    for f in legacy_pages():
        meta, html = read_legacy(f)
        if not html:
            continue
        soup = BeautifulSoup(html, "html.parser")
        title = (soup.find("h1").get_text() if soup.find("h1") else "")
        for h, nodes in blocks(soup):
            body = norm(text_of(nodes), title)
            if body:
                block_c[body[:400]] += 1
        for a in soup.select(".faq-a"):
            faq_c[norm(a.get_text(" ", strip=True), title)[:300]] += 1
    data = {"blocks": block_c, "faq": faq_c}
    json.dump(data, open(CACHE, "w"))
    return data


AI_RE = re.compile(r"\bAI\b|AI-powered|artificial intelligence", re.I)


def clean_node(node):
    if isinstance(node, Comment):
        return ""
    if isinstance(node, NavigableString):
        return str(node)
    for c in node.find_all(string=lambda s: isinstance(s, Comment)):
        c.extract()
    for el in [node, *node.find_all(True)]:
        cls = el.get("class") or []
        keep = "fx-formula" if "formula-box" in cls else None
        el.attrs = {k: v for k, v in el.attrs.items() if k in ("href", "colspan", "rowspan")}
        if keep:
            el["class"] = keep
    for t in node.find_all("table"):
        wrap = t.wrap(BeautifulSoup("", "html.parser").new_tag("div"))
        wrap["class"] = "fx-table"
    # Drop wrappers that only added inline styling.
    for d in node.find_all("div"):
        if not d.get("class") and d.parent is not None and d.find(["table"]) is None and not d.get_text(strip=True):
            d.decompose()
    return str(node)


def extract(rel):
    """rel: repo-relative path, e.g. app/calculators/finance/loan-calculator/page.tsx"""
    meta, html = read_legacy(rel)
    soup = BeautifulSoup(html, "html.parser")
    c = counts()
    title_el = soup.find("h1")
    title = title_el.get_text(" ", strip=True) if title_el else meta.get("title", "")
    intro_el = soup.select_one(".calc-intro")
    intro = intro_el.get_text(" ", strip=True) if intro_el else meta.get("description", "")
    intro = " ".join(s for s in re.split(r"(?<=[.!?])\s+", intro) if not AI_RE.search(s)).strip() or intro

    parts = []
    for h, nodes in blocks(soup):
        heading = h.get_text(" ", strip=True) if h else ""
        if re.match(r"(frequently asked|related .*calculators|related calculations|related .*converters)", heading, re.I):
            continue
        body = norm(text_of(nodes), title)
        if not body or c["blocks"].get(body[:400], 0) >= REPEAT_THRESHOLD:
            continue
        kept = [n for n in nodes if not (isinstance(n, Tag) and (n.select_one(".faq-list, .related-grid") or "faq-list" in (n.get("class") or [])))]
        kept = [n for n in kept if not (isinstance(n, Tag) and n.name == "p" and AI_RE.search(n.get_text()))]
        body_html = "".join(clean_node(n) for n in kept).strip()
        if not BeautifulSoup(body_html, "html.parser").get_text(strip=True):
            continue
        tag = h.name if h else "h2"
        parts.append((f"<{tag}>{heading}</{tag}>" if heading else "") + body_html)

    faq, seen = [], set()
    for item in soup.select(".faq-item"):
        q = item.select_one(".faq-q")
        a = item.select_one(".faq-a")
        if not q or not a:
            continue
        qt = re.sub(r"\s*\+\s*$", "", q.get_text(" ", strip=True)).strip()
        at = a.get_text(" ", strip=True)
        if qt in seen or c["faq"].get(norm(at, title)[:300], 0) >= REPEAT_THRESHOLD or AI_RE.search(at):
            continue
        seen.add(qt)
        faq.append({"q": qt, "a": at})

    related = []
    for a in soup.select(".related-grid a.related-card"):
        icon = a.select_one(".rc-icon")
        name = a.select_one(".rc-name")
        related.append({"href": a["href"].replace(".html", ""), "icon": icon.get_text(strip=True) if icon else "🧮", "name": name.get_text(strip=True) if name else a.get_text(strip=True)})

    html_out = re.sub(r"\n\s*\n+", "\n", "\n".join(parts)).strip()
    return {"meta": meta, "title": title, "intro": intro, "html": html_out, "faq": faq, "related": related}


if __name__ == "__main__":
    import sys

    print(json.dumps(extract(sys.argv[1]), indent=1)[:int(sys.argv[2]) if len(sys.argv) > 2 else 6000])
