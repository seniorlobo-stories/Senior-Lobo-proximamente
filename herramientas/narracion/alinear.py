# Paso 2: empareja las palabras de cuento.json con las de la transcripción y escribe
# "tiempos" en cada página de texto (y "audio" si se le pasa la ruta, relativa al JSON).
# Uso: python alinear.py ruta/al/cuento.json palabras.json [ruta/audio/relativa/al/json]
import sys, json, re, unicodedata, difflib

cj, wj = sys.argv[1], sys.argv[2]
c = json.load(open(cj))
W = json.load(open(wj))["words"]
if len(sys.argv) > 3:  # "audio" justo después de "subtitulo"
    c2 = {}
    for k, v in c.items():
        if k == "audio": continue
        c2[k] = v
        if k == "subtitulo": c2["audio"] = sys.argv[3]
    c2.setdefault("audio", sys.argv[3])
    c = c2

# minúsculas, sin tildes ni signos: «—¡Hola» → ["hola"], «—Hola—dijo—» → ["hola", "dijo"]
def norm(s):
    s = unicodedata.normalize("NFD", s.lower())
    return re.findall(r"[a-zñ]+", "".join(ch for ch in s if unicodedata.category(ch) != "Mn"))

# los tokens se cortan igual que en js/lector.js: texto.split(/\s+/)
sub, owner, toks = [], [], []
for pi, p in enumerate(c["paginas"]):
    if p["tipo"] != "texto": continue
    for ti, t in enumerate(p["texto"].split()):
        toks.append((pi, ti))
        for w in norm(t): sub.append(w); owner.append(len(toks) - 1)
aud, aidx = [], []
for i, w in enumerate(W):
    for x in norm(w["w"]): aud.append(x); aidx.append(i)

sm = difflib.SequenceMatcher(None, sub, aud, autojunk=False)
tt = [None] * len(toks)
for a, b, n in sm.get_matching_blocks():
    for k in range(n):
        o = owner[a + k]
        if tt[o] is None: tt[o] = W[aidx[b + k]]["s"]

# tokens sin pareja: los signos sueltos («-», «…») heredan el tiempo anterior;
# las palabras que el reconocedor no entendió (p. ej. «¡GROAAARG!») van a mitad del hueco
tok = lambda i: c["paginas"][toks[i][0]]["texto"].split()[toks[i][1]]
miss = [i for i, v in enumerate(tt) if v is None]
for i in miss:
    prev = next((tt[j] for j in range(i - 1, -1, -1) if tt[j] is not None), 0)
    nxt = next((tt[j] for j in range(i + 1, len(tt)) if tt[j] is not None), prev)
    tt[i] = prev if not norm(tok(i)) else round((prev + nxt) / 2, 2)
print("sin pareja (revisar a mano si hace falta):", ["%s (pág %d)" % (tok(i), toks[i][0]) for i in miss])

for p in c["paginas"]: p.pop("tiempos", None)
for (pi, ti), v in zip(toks, tt):
    c["paginas"][pi].setdefault("tiempos", []).append(round(v, 2))
for p in c["paginas"]:
    if "tiempos" in p: assert len(p["tiempos"]) == len(p["texto"].split())

s = json.dumps(c, ensure_ascii=False, indent=2)
s = re.sub(r"\[\s+([\d.,\s]+?)\s+\]", lambda m: "[" + ", ".join(x.strip() for x in m.group(1).split(",")) + "]", s)
open(cj, "w").write(s + "\n")
print("escrito", cj)
