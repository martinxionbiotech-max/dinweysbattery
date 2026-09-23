#!/usr/bin/env python3
"""Content-level internal-link audit (header/footer nav stripped)."""
import os, re, json
from urllib.parse import urlparse, unquote

DIST = "dist"
SITE = "https://dinweysbattery.com"

def canonical_urls():
    urls = []
    with open(os.path.join(DIST, "sitemap-0.xml"), encoding="utf-8") as f:
        txt = f.read()
    for m in re.finditer(r"<loc>\s*(.*?)\s*</loc>", txt):
        u = m.group(1).strip()
        if u.startswith(SITE):
            urls.append(u)
    return urls

def norm(u):
    if u.startswith("http"):
        p = urlparse(u).path
    else:
        p = u.split("#")[0].split("?")[0]
    p = unquote(p)
    if p.endswith("/index.html"):
        p = p[:-len("index.html")]
    if p.endswith(".html"):
        p = p[:-len(".html")]
    return p.rstrip("/") or "/"

def page_key_of_file(path):
    rel = os.path.relpath(path, DIST)
    if rel == "index.html":
        return "/"
    if rel.endswith("/index.html"):
        return "/" + rel[:-len("/index.html")]
    if rel.endswith(".html"):
        return "/" + rel[:-len(".html")]
    return "/" + rel

def main():
    canon = sorted(set(canonical_urls()))
    canon_keys = set(norm(u) for u in canon)
    key2url = {norm(u): u for u in canon}

    incoming = {}
    outgoing = {}

    for root, dirs, files in os.walk(DIST):
        for fn in files:
            if not fn.endswith(".html"):
                continue
            fp = os.path.join(root, fn)
            pk = page_key_of_file(fp)
            if pk == "/404":
                continue
            with open(fp, encoding="utf-8") as f:
                txt = f.read()
            # content region only (between <main ...> and </main>)
            m = re.search(r"<main[^>]*>(.*?)</main>", txt, re.I | re.S)
            body = m.group(1) if m else txt
            links = set()
            for a in re.finditer(r"<a\b[^>]*\bhref\s*=\s*([\"'])(.*?)\1", body, re.I | re.S):
                k = norm(a.group(2))
                if k in canon_keys:
                    links.add(k)
            outgoing[pk] = links
            for t in links:
                incoming.setdefault(t, set()).add(pk)

    # Report: pages with weak content-level incoming links
    rows = []
    for k in canon_keys:
        inc = incoming.get(k, set())
        rows.append((k, len(inc), sorted(inc)))

    rows.sort(key=lambda r: (r[1], r[0]))

    print("=== CONTENT-LEVEL INCOMING LINKS (header/footer stripped) ===")
    print(f"pages: {len(rows)}")
    zero = [r for r in rows if r[1] == 0]
    one = [r for r in rows if r[1] == 1]
    print(f"0 content-incoming: {len(zero)}")
    print(f"1 content-incoming: {len(one)}")
    print()
    print("=== 0 content-incoming (true contextual orphans) ===")
    for k, n, src in zero:
        print("  " + key2url[k])
    print()
    print("=== 1 content-incoming ===")
    for k, n, src in one:
        print(f"  {key2url[k]}  <- {src}")
    print()
    # dump full map to json
    dump = {key2url[k]: {"incoming": sorted(src), "outgoing": sorted(outgoing.get(k, set()))} for k in canon_keys}
    with open("orphan-report.json", "w", encoding="utf-8") as f:
        json.dump(dump, f, indent=2)

if __name__ == "__main__":
    main()
