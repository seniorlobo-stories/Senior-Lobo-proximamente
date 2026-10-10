# Paso 1: transcribe el audiolibro y guarda el segundo en que empieza cada palabra.
# Uso: python transcribir.py ruta/al/audio.mp3 palabras.json
import sys, json
import av, numpy as np
from faster_whisper import WhisperModel

# decodificamos nosotros con PyAV (a 16 kHz mono) en vez de pasarle la ruta a faster-whisper:
# según la versión de PyAV instalada, su decodificador falla
c = av.open(sys.argv[1])
r = av.AudioResampler(format="s16", layout="mono", rate=16000)
buf = []
for f in c.decode(audio=0):
    for o in r.resample(f):
        buf.append(o.to_ndarray().reshape(-1))
audio = np.concatenate(buf).astype(np.float32) / 32768.0

m = WhisperModel("medium", device="cpu", compute_type="int8")
segs, info = m.transcribe(audio, language="es", word_timestamps=True, beam_size=5)
out = []
for s in segs:
    for w in s.words:
        out.append({"w": w.word.strip(), "s": round(w.start, 3), "e": round(w.end, 3)})
json.dump({"dur": info.duration, "words": out}, open(sys.argv[2], "w"), ensure_ascii=False, indent=0)
print("duración %.1f s, %d palabras" % (info.duration, len(out)))
print(" ".join("%s[%.1f]" % (w["w"], w["s"]) for w in out))
