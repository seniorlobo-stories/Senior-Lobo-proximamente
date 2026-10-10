# Handoff: Lector de libro / audiolibro (móvil)

## Overview
Lector a pantalla completa para móvil vertical que muestra un cuento personalizado de Señor Lobo página a página: ilustración arriba, panel de texto de papel kraft abajo, navegación anterior/siguiente y botón de reproducción que "narra" la página resaltando en ámbar las palabras ya leídas. Cuento de ejemplo: *Buenas noches Lucas, buenas noches Pesadilla* (portada + 20 páginas de texto + página "Fin").

## About the Design Files
Los archivos de `referencia/` son **prototipos de diseño en HTML** que muestran el aspecto y el comportamiento buscados; **no son código de producción**. La tarea es **recrear este lector en el stack de la web de destino** (React, Vue, Next, Astro…) con sus patrones y librerías. Si no hay stack, usar el más adecuado (p. ej. un componente React o vanilla JS + CSS).

`referencia/Lector Libro Lucas V2.dc.html` es un "Design Component": HTML con huecos `{{ }}` más una clase JS (`renderVals()`) que calcula esos valores. Ahí está toda la lógica; léelo como especificación, no como código para copiar.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografías, medidas e interacciones son finales; hay que reproducirlos al píxel.

## Datos
`cuento.json` contiene el cuento completo: título, protagonista, edad, segundos por página (14) y un array `paginas` con `tipo` (`portada` | `texto` | `fin`), `imagen` y `texto`. El lector debe ser **genérico**: se alimenta de este JSON y vale para cualquier cuento.

Total de páginas mostrado = `paginas.length - 1` (la portada no cuenta). Con este cuento, 21.

## Pantalla única: Lector

Viewport de referencia: **393×852** (móvil vertical). Contenedor `width:100%; height:100dvh; overflow:hidden; position:relative`; fondo `--paper-piece`. **Sin scroll en ningún momento y sin barras de scroll visibles** (`html,body{height:100%;overflow:hidden;overscroll-behavior:none}` y scrollbars ocultas en todo el documento).

Capas (z-index): ilustración 0 → controles + panel 5 → píldora de página 10 → nav-bar 20 → hamburguesa 30.

### 1. Ilustración (fondo)
- Caja: `position:absolute; top:0; left:50%; transform:translateX(-50%); width:100%; max-width:800px; max-height:100%; aspect-ratio:800/1200; overflow:hidden`.
- Debajo, un placeholder rayado a 45°: `repeating-linear-gradient(45deg, #E0D2BF 0 12px, #F8F3E5 12px 24px)`.
- Imagen: `object-fit:contain; object-position:center top`, sin zoom ni recorte. Formato 2:3 (las ilustraciones son 848×1264 .webp).
- **Importante:** renderizar todas las `<img>` en el DOM y alternar solo `display` (o precargarlas), para que el cambio de página sea instantáneo y todas carguen al publicar.

### 2. Píldora de página (arriba izquierda)
- `left:14px; top:21px; padding:6px 11px; border-radius:26px`; fondo `--paper-piece`; sombra dura `3px 4px 0 rgba(59,47,23,.18)`.
- Texto `Pág {i}/{total}` en Cormorant Upright 11px, `letter-spacing:.04em`, color `--line` (#38362C).
- Oculta (`visibility:hidden`) en la portada.

### 3. Botón hamburguesa (arriba derecha)
- `right:14px; top:16px; 37×37px; border-radius:9px`; fondo `--paper-piece` + la misma sombra dura.
- Tres barras de 18×2px (`border-radius:2px`, color `--line`) en `top` 0 / 5.5 / 11px dentro de una caja de 18×13.
- Abierto, se convierte en X: la barra superior hace `translateY(5.5px) rotate(45deg)`, la inferior `translateY(-5.5px) rotate(-45deg)` y la del medio pasa a `opacity:0`. Transiciones de `.2s ease` (opacidad `.15s`).
- `aria-label="Menú"`, `aria-expanded`.

### 4. Nav-bar (desplegable desde arriba)
- `top:0; left:0; right:0; padding:14px 132px 14px 22px; min-height:44px`. Columna con `gap:2px`.
- Fondo kraft `#DECEB5` con trama de puntos `radial-gradient(rgba(59,47,23,.05) 1px, transparent 1px)` a `5px 5px`; sombra `0 4px 0 rgba(59,47,23,.18)`.
- Cerrada: `transform:translateY(-110%)`; abierta: `translateY(0)`. Transición `transform .28s cubic-bezier(.5,1.2,.5,1)`.
- Título: Wakerobin Compressed, MAYÚSCULAS, 15.5px, peso 600, `letter-spacing:.07em`, `line-height:1.35`, color `--line`, `text-wrap:balance`.
- Debajo, la etiqueta: `Portada` en la portada; si no, `Capítulo 1 · pág {i} de {total}`. Cormorant Upright 12.5px, `letter-spacing:.04em`, color `--ink-soft` (#5B5E53).
- Botón Home: `right:62px; top:16px`, 37×37, mismo estilo que la hamburguesa. Icono de casa SVG 22px, trazo 1.9: `M3.5 11L12 4l8.5 7` + `M6 9.5V20h4.5v-5.5h3V20H18V9.5`. Lleva a la home de la web (`aria-label="Inicio"`).

### 5. Zona inferior (controles + panel de texto)
- Contenedor `position:absolute; left:0; right:0; bottom:0; top:min(150vw, 1200px, calc(100dvh - 190px))`. Columna con `gap:14px`. Arranca donde termina la ilustración y nunca deja menos de 190px para el texto.
- **Fila de controles**: `padding:0 18px; margin-top:-62px` (se monta sobre el borde inferior de la ilustración); `justify-content:space-between`.
  - Anterior / Siguiente: 42×37, `border-radius:11px`, fondo `--paper-piece` + sombra dura; chevron SVG 16px, trazo 2.2 (`M15 5l-7 7 7 7` / `M9 5l7 7-7 7`). En el primer y último extremo, `opacity:.35`.
  - Play/Pausa: círculo de 48px, fondo ámbar `#C9A035`, sombra `3px 4px 0 rgba(59,47,23,.22)`. Play: triángulo relleno `M8 5.2l11 6.8-11 6.8z` (19px). Pausa: dos rectángulos `x=6/13.4, y=5, 4.6×14, rx 1.4` (18px). Relleno `#38362C`. `aria-label` "Escuchar el cuento" / "Pausar la narración".
  - Al pulsar (`:active`), todos los botones bajan con `transform:translateY(1px)`.
- **Panel de texto**: `flex:1; padding:20px 22px 34px`; mismo fondo kraft con trama de puntos que la nav-bar; sombra `0 -4px 0 rgba(59,47,23,.18)`. Contenido con `overflow:auto` y scrollbar oculta.

### 6. Contenido del panel según tipo de página
- **Portada** (columna, `gap:4px`):
  - Título: Mick Caster 29px, `line-height:1.1`, color `--line`, `text-wrap:balance`.
  - "Aventuras · Lectura fácil": Wakerobin Compressed MAYÚSCULAS 13px, `letter-spacing:.16em`, color `--ink-soft`.
  - Fila: `{protagonista} - {edad} años` (Cormorant 19px, `--ink`) y `{total} páginas` (Cormorant 13px, `letter-spacing:.04em`, `--ink-soft`).
- **Texto**: párrafo en Cormorant Upright 19px, **negrita 700**, `line-height:1.55`, color `#38362C`, alineado a la izquierda, `text-wrap:pretty`. Cada palabra va en su propio `<span>` para el resaltado (ver Narración).
- **Fin**: "Fin" centrado (Mick Caster 34px, `letter-spacing:.06em`, color `--line`, `margin-top:6px`). Debajo, centrado a `8px`, el botón "Volver al principio": `padding:9px 18px; border-radius:9px`, fondo `--paper-piece` + sombra dura, Wakerobin Compressed MAYÚSCULAS 14px, peso 600, `letter-spacing:.08em`; al pulsar, `translate(2px,3px)`. Lleva a la portada (página 0) y para la narración.

## Interactions & Behavior
- **Anterior / Siguiente**: `pag ± 1`, limitado a `[0, n-1]`; el tiempo de narración salta al inicio de esa página (`seg = pag*14`).
- **Hamburguesa**: abre o cierra la nav-bar.
- **Play/Pausa (narración simulada)**:
  - Cada página dura 14 s. Duración total = `n*14`.
  - Al darle a play: si el tiempo actual no está dentro de la página visible, salta a `pag*14`. Luego un intervalo de 250 ms suma 0,5 s × velocidad.
  - Cuando el tiempo cruza a la página siguiente, el lector pasa de página solo. Al llegar al final, se para.
  - **Resaltado**: `prog = (seg - pag*14)/14`; `leidas = prog <= 0 ? -1 : floor(prog * nPalabras)`. Las palabras con índice `<= leidas` se ven en ámbar `#C9A035` (transición `color .18s ease`) y el resto en negro `#38362C`. Sin subrayado.
  - En producción, cambiar el temporizador por el audio real (TTS o MP3 por página) y calcular `prog` con `audio.currentTime / audio.duration`. Opciones de voz: femenina o masculina.
- Al desmontar el componente, limpiar el intervalo.

## State Management
- `pag` (int): página actual, 0 = portada.
- `seg` (float): segundo de narración global.
- `play` (bool).
- `vel` (1 | 1,5 | 2): velocidad. Existe en la lógica pero ahora no hay control visible.
- `navOpen` (bool).
- Datos derivados: tipo de página, palabras de la página, índice de palabras leídas, etiquetas y total.

## Design Tokens (Señor Lobo)
- Tinta / `--line` / `--ink`: `#38362C`
- Ámbar: `#C9A035`
- Pergamino: `#F5EDD8`
- Castaño: `#8C5F3A`
- Niebla: `#9BA89C`
- `--paper-piece` (pergamino + 32 % blanco): ≈ `#F8F3E5`
- `--kraft` (castaño 22 % + pergamino): ≈ `#DECEB5`
- `--ink-soft` (tinta 65 % + niebla): ≈ `#5B5E53`
- Sombras siempre duras, sin blur: `3px 4px 0 rgba(59,47,23,.18)` (chips), `.22` (play), `0 ±4px 0 rgba(59,47,23,.18)` (barras).
- Radios: 9 (botones cuadrados), 11 (flechas), 26 (píldora), 50 % (play).
- Tipografías:
  - Wakerobin Compressed: display y etiquetas, siempre en MAYÚSCULAS.
  - Cormorant Upright: texto del cuento y valores.
  - Mick Caster: títulos de portada y "Fin".
  - Wakerobin y Mick Caster son comerciales y se autoalojan (ver `design-system/fonts.css`); Cormorant viene de Google Fonts.
- **Trazo "a mano"**: los iconos SVG llevan `filter:url(#rough)` (turbulencia + desplazamiento). Los filtros SVG los inyecta `design-system/linea-runtime.js`: incluirlo, o copiar sus `<defs>` en la página. Sin ellos, los iconos salen con trazo limpio.

## Assets
- `assets/portada-lucas-v2.webp`: portada.
- `assets/pag1-lucas-v2.webp` … `pag10-lucas-v2.webp`: ilustraciones. Cada una se usa en 1–3 páginas seguidas (ver `cuento.json`). La página "Fin" usa `pag10`.
- Todas en .webp a 848×1264 px, calidad 82.

## Files
- `README.md`: este documento.
- `cuento.json`: datos del cuento.
- `referencia/Lector Libro Lucas V2.dc.html`: prototipo de referencia; se abre en el navegador junto a `support.js`.
- `assets/`: ilustraciones.
- `design-system/`: tokens de color y tipografía, `fonts.css`, `base.css` (capa `.bg`) y `linea-runtime.js` (filtros SVG).
