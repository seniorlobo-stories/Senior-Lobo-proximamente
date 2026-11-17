# Formato del cuento y cómo añadir uno nuevo

El lector es genérico: cada cuento es una carpeta con un `cuento.json`, sus ilustraciones y,
opcionalmente, el mp3 de la narración. Ejemplo completo: `cuentos/lucas/`.

## 1 · `cuento.json`

```json
{
  "titulo": "Buenas noches Lucas, buenas noches Pesadilla",
  "protagonista": "Lucas",
  "edad": 8,
  "subtitulo": "Aventuras · Lectura intermedia",
  "audio": "Libro_Lucas.MP3",
  "paginas": [
    { "n": 0, "tipo": "portada", "imagen": "portada-lucas.webp" },
    { "n": 1, "tipo": "texto", "imagen": "pag1-lucas-v2.webp",
      "texto": "Otra noche más sin dormir. …",
      "tiempos": [5.4, 6.06, 6.42, …] },
    …
    { "n": 21, "tipo": "fin", "imagen": "pag10-lucas-v2.webp" }
  ]
}
```

| Campo | Obligatorio | Qué es |
|---|---|---|
| `titulo` | sí | Título en portada y nav-bar |
| `protagonista` | sí | Se muestra «Protagonista - N años» en la portada |
| `edad` | no | Si falta, solo se muestra el nombre |
| `subtitulo` | no | Línea en mayúsculas bajo el título de portada |
| `audio` | no | mp3 de la narración, **ruta relativa al JSON**. Sin él: play apagado + «No disponible» |
| `paginas[]` | sí | En orden. La primera `portada`, la última `fin` |
| `paginas[].tipo` | sí | `portada` · `texto` · `fin` |
| `paginas[].imagen` | sí | Ilustración, ruta relativa al JSON. Varias páginas pueden repetir la misma |
| `paginas[].texto` | en `texto` | Texto de la página |
| `paginas[].tiempos` | con audio | Segundo en que el narrador **empieza** cada palabra (ver §3) |
| `paginas[].n` | no | Solo informativo; el lector no lo usa |

Total que ve el lector: `paginas.length - 1` páginas (la portada no cuenta).

## 2 · Ilustraciones
- Verticales **2:3** (Lucas: 848×1264). Mejor `.webp`, ~50–230 KB cada una.
- Se cargan todas al abrir el cuento: conviene que no pesen mucho.

## 3 · Narración sincronizada

### Cómo funciona en el lector
- Cada página de texto se corta por espacios (`texto.split(/\s+/)`) y cada trozo es una «palabra».
  **`tiempos` debe tener exactamente una cifra por palabra**, en segundos desde el inicio del mp3.
- Una palabra se pinta en ámbar cuando `audio.currentTime >= tiempos[i]`.
- La página que suena es la última cuya primera palabra ya ha empezado (con 0,12 s de adelanto).
  Cuando el narrador llega a la siguiente página, el lector pasa solo.
- Pasar página a mano lleva el audio a la primera palabra de esa página. La portada es el segundo 0
  (el narrador puede leer el título al principio). En «Fin» el audio se para; play desde «Fin» vuelve a empezar.
- Al acabar el mp3 salta a «Fin».

### Generar `tiempos` desde el mp3 (`herramientas/narracion/`)
Preparación, una sola vez (descarga un modelo de voz de ~1,5 GB la primera vez):
```bash
python3 -m venv ~/venv-narracion
~/venv-narracion/bin/pip install faster-whisper
```
Para cada cuento (desde la raíz de esta carpeta):
```bash
# 1 · transcribir: guarda el segundo de inicio de cada palabra que oye (unos minutos)
~/venv-narracion/bin/python herramientas/narracion/transcribir.py cuentos/marta/Libro_Marta.mp3 /tmp/palabras.json

# 2 · alinear con el texto del JSON y escribir "tiempos" (y "audio", relativo al JSON)
python3 herramientas/narracion/alinear.py cuentos/marta/cuento.json /tmp/palabras.json Libro_Marta.mp3
```
`alinear.py` avisa de las palabras que no ha podido emparejar (guiones, «…», onomatopeyas);
si alguna queda mal, se corrige a mano su cifra en `tiempos`.

- Si cambia el **texto**, repetir el paso 2. Si cambia el **audio**, los dos.
- El texto del JSON debe coincidir lo más posible con lo que dice el narrador.

## 4 · Añadir un cuento nuevo (lista de pasos)
1. Carpeta `cuentos/<nombre>/` con `portada.webp`, `pag1.webp`, `pag2.webp`… y el `.mp3`.
2. Escribir `cuento.json` (copiar el de Lucas y sustituir): portada → páginas de texto → fin.
3. Si hay audio: ejecutar `transcribir.py` y `alinear.py` (§3).
4. Poner un botón: `<button type="button" data-lector="cuentos/<nombre>/cuento.json">Leer cuento</button>`.
5. Probar con un servidor que admita Range (ver `LEEME.md` §2): portada, paso de páginas, play, «Fin».

### Nota sobre la web original
En seniorlobo.es el mp3 vive en `imagenes/Audios_libros/` y el JSON de Lucas apunta a
`"../../imagenes/Audios_libros/Libro_Lucas.MP3"`. En este paquete el mp3 está junto al JSON
(`"audio": "Libro_Lucas.MP3"`) para que todo vaya en una carpeta. Ambas formas valen.
