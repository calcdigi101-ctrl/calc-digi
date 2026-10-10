"""Print a compact view of a legacy calculator's inputs and JS logic (porting aid)."""
import json, re, sys
sys.path.insert(0, __file__.rsplit("/", 1)[0])
from legacy_content import git, LEGACY_REF
from bs4 import BeautifulSoup

def show(rel):
    s = git("show", f"{LEGACY_REF}:{rel}")
    blobs = [json.loads(b) for b in re.findall(r'dangerouslySetInnerHTML=\{\{ __html: (".*?") \}\}', s, re.S)]
    html = next((b for b in blobs if '"@context"' not in b), "")
    soup = BeautifulSoup(html, "html.parser")
    w = soup.select_one(".calc-widget") or soup
    out = []
    for el in w.find_all(["input", "select", "textarea"]):
        lab = soup.find("label", attrs={"for": el.get("id")})
        lab = lab.get_text(" ", strip=True) if lab else ""
        if el.name == "select":
            opts = ",".join(f"{o.get('value')}={o.get_text(strip=True)}{'*' if o.has_attr('selected') else ''}" for o in el.find_all("option"))
            out.append(f"  select #{el.get('id')} [{lab}] {opts}")
        else:
            a = {k: el.get(k) for k in ("type", "value", "min", "max", "step", "placeholder") if el.get(k) is not None}
            out.append(f"  input #{el.get('id')} [{lab}] {a}")
    m = re.search(r'<Script id="calc-script[^"]*" strategy="afterInteractive" dangerouslySetInnerHTML=\{\{ __html: (".*?") \}\} />', s, re.S)
    js = json.loads(m.group(1)) if m else ""
    js = re.sub(r"\s*(const|var|let) aiBox=.*?\}\);", "", js, flags=re.S)
    js = re.sub(r"getAIInsight\(.*?\}\);", "", js, flags=re.S)
    js = re.sub(r"\n?initFAQ\(\);initScrollReveal\(\);", "", js).strip()
    print(f"### {rel.split('/')[3]}\n" + "\n".join(out) + "\n" + js + "\n")

for rel in sys.argv[1:]:
    show(rel)
