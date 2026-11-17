# Lector de cuentos Senior Lobo · paquete de instalación

Lector de cuentos ilustrados a pantalla completa, pensado para móvil vertical, con audiolibro
opcional: mientras el narrador lee, las palabras se van pintando en ámbar y la página pasa sola.
Es **vanilla JS + CSS, sin dependencias ni build**. Este paquete funciona solo: copia la carpeta,
sírvela y abre `demo.html`.

Es la versión **en producción** en seniorlobo.es (noviembre 2026). Si encuentras la carpeta
antigua `design_handoff_lector_libro/` (prototipo de diseño), **manda esta**: el lector real añade
modo día/noche propio, botón «casa» que cierra, estado sin audio, gesto de deslizar, adaptación a
escritorio y sincronización real con el audio.

| Documento | Para qué |
|---|---|
| `LEEME.md` (este) | Qué hay, cómo probarlo, cómo instalarlo en otra web |
| `DISENO.md` | Especificación visual completa: tokens, tipografías, medidas, capas, estados, día/noche |
| `FORMATO-CUENTO.md` | Formato de `cuento.json` y cómo añadir un cuento nuevo (con narración) |
| `referencia/` | Capturas del lector real (móvil 393×852 @2x y escritorio) |

---

## 1 · Contenido

```
handoff-lector-cuentos/
├── demo.html                    página mínima que abre el lector (para probar)
├── lector/
│   ├── lector-base.css          fuentes + 5 variables + reset (lo que el lector toma de la web)
│   ├── lector.css               todo el aspecto del lector (copia exacta de producción)
│   └── lector.js                toda la lógica (copia exacta de producción)
├── fonts/                       Wakerobin Compressed, Mick Caster, Cormorant Upright (+ licencia OFL)
├── cuentos/lucas/               cuento de ejemplo completo
│   ├── cuento.json              datos: páginas, textos, ruta del audio y tiempos de cada palabra
│   ├── portada-lucas.webp       ilustraciones 2:3
│   ├── pag1…pag10-lucas-v2.webp
│   └── Libro_Lucas.MP3          narración (4,5 MB)
├── herramientas/narracion/      scripts Python que sacan del mp3 el segundo de cada palabra
│   ├── transcribir.py
│   └── alinear.py
└── referencia/                  capturas
```

## 2 · Probarlo (2 minutos)

Hace falta un **servidor local que admita peticiones Range** (el audio salta al pasar página).
`python3 -m http.server` **no** las admite: las imágenes y el texto se ven, pero el audio no se
recoloca al cambiar de página.

Opciones que sí sirven:

- **VS Code → extensión Live Server** → clic derecho en `demo.html` → *Open with Live Server*.
- **Node**: `npx http-server -c-1` dentro de esta carpeta → abre `http://localhost:8080/demo.html`.

No funciona abriendo el archivo con doble clic (`file://`): el lector carga el JSON con `fetch`.

Qué comprobar:
1. «Leer cuento» → portada con título, «Lucas - 8 años», «21 páginas».
2. Flechas / teclado ← → / deslizar el dedo sobre la ilustración: cambian de página.
3. Play ámbar: suena el narrador, las palabras se pintan en ámbar y la página pasa sola.
4. Hamburguesa: baja la barra con el título y aparecen luna/sol (modo noche solo del lector) y casa (cierra).
5. Esc o el botón «atrás» del navegador cierran el lector y devuelven al mismo scroll.
6. «Web día / noche» en la demo: el lector abre en el modo que tenga la web.

## 3 · Instalarlo en otra web

### 3.1 Archivos
Copia `lector/` y `fonts/` manteniendo la relación `lector/ ↔ ../fonts/` (las rutas de las
fuentes en `lector-base.css` son `../fonts/…`). Si cambias la estructura, ajusta esas `url()`.

### 3.2 En el HTML
```html
<head>
  <link rel="stylesheet" href="/lector/lector-base.css" />   <!-- primero -->
  <link rel="stylesheet" href="/lector/lector.css" />
</head>
<body>
  …
  <button type="button" data-lector="/cuentos/lucas/cuento.json">Leer cuento</button>
  …
  <script src="/lector/lector.js"></script>                    <!-- al final del body -->
</body>
```

- **Cualquier elemento** con `data-lector="ruta/al/cuento.json"` abre el lector (delegación de
  clics en `document`, así que sirve también para botones añadidos después).
- API JS: `Lector.abrir('ruta/al/cuento.json')` → devuelve una promesa.
- Las rutas de imágenes y audio dentro del JSON son **relativas al propio JSON**.

### 3.3 Puntos de integración con la web
| El lector… | Detalle |
|---|---|
| Crea su propio `<dialog class="lector">` | Lo monta la primera vez que se abre; no hay que poner HTML. `showModal()`, a pantalla completa. |
| Lee el modo de la web | Al abrir mira `document.documentElement.dataset.theme` (`"noche"` → arranca de noche; cualquier otra cosa → día). Si la web no usa ese atributo, arranca de día. |
| Tiene su propio día/noche | El botón luna/sol cambia solo el lector (atributo `data-tema` del `<dialog>`), no la web. |
| Toca el historial | Al abrir hace `history.pushState({lector:true})`, para que «atrás» en el móvil cierre el lector en vez de salir de la web. |
| Bloquea el scroll de la web | `html:has(.lector[open]) { overflow:hidden }`. Al cerrar vuelve al mismo `scrollY`. |
| Filtro SVG `#rough` | Lo inyecta él mismo si la página no lo tiene (trazo «a mano» de los iconos). |
| Variables | Usa `--amber` y `--font-disp/body/slab/mono` de `:root` (en `lector-base.css`). Todos los demás colores los fija `lector.css` dentro del lector. Si la web ya tiene esas variables con otros valores, el lector los heredará: déjalas como en `lector-base.css`. |
| Nombres de clase | Todo empieza por `.lector` / `.lr-`; no choca con nada si la web no usa esos prefijos. |

### 3.4 Si el stack de destino es React/Vue/etc.
Se puede usar tal cual (el script es autónomo y escucha `[data-lector]` en `document`).
Si se reescribe como componente, `lector.js` + `DISENO.md` son la especificación exacta:
mantener las mismas clases y medidas, todas las `<img>` en el DOM (solo se alterna `display`)
y la lógica de audio descrita en `FORMATO-CUENTO.md`.

## 4 · Compatibilidad
- Navegadores actuales (Chrome, Safari iOS 16+, Firefox). Usa `<dialog>`, `100dvh`, `:has()`,
  `color-mix()`, `text-wrap`, `aspect-ratio`.
- iOS: el salto de audio espera a `loadedmetadata` (ya resuelto en el código).
- Accesibilidad: botones con `aria-label`, hamburguesa con `aria-expanded`, Esc cierra, ← → pasan página;
  al abrir, el foco va a «siguiente» (por eso aparece el anillo de foco del navegador en las capturas).

## 5 · Tipografías y licencias
| Familia | Archivo | Uso | Licencia |
|---|---|---|---|
| Wakerobin Compressed | `wakerobin-compressed.otf` | títulos en mayúsculas, botones, etiqueta «No disponible» | **revisar** (no viene con el archivo) |
| Mick Caster | `Mick_Caster.otf` / `.ttf` | título de portada, «Fin» | **revisar** (no viene con el archivo) |
| Cormorant Upright | `cormorant-upright-*.woff2` (400–700, latin + latin-ext) | texto del cuento, píldora, etiquetas | SIL OFL (`OFL-cormorant-upright.txt`) |

Antes de publicar en otro dominio, confirma la licencia web de Wakerobin y Mick Caster.

## 6 · Problemas típicos
| Síntoma | Causa |
|---|---|
| No abre, error de `fetch` en consola | Abierto con `file://` o ruta del JSON mal escrita |
| Se ve la portada pero no las páginas | Faltan los `.webp` junto al JSON o el nombre no coincide con `"imagen"` |
| Play gris con «No disponible» | El JSON no tiene `"audio"` (comportamiento previsto) |
| El audio suena pero no salta al cambiar de página | Servidor sin peticiones Range |
| Letras con fuente del sistema | `lector-base.css` no cargado o rutas `../fonts/` rotas |
