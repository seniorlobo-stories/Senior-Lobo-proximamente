# Lector de cuentos · especificación de diseño

Fuente de verdad: `lector/lector.css` (producción). Este documento lo explica; si algo no
cuadra, manda el CSS. Capturas en `referencia/`.

**Concepto:** un libro de papel. Piezas de papel crema con **sombra dura sin desenfoque**
(desplazada abajo-derecha), paneles de **papel kraft con trama de puntos**, iconos de trazo
«a mano» (filtro SVG `#rough`) y un único color de acento, **ámbar**.

**Pantalla de referencia:** móvil vertical **393×852**. Sin scroll de página ni barras visibles.

---

## 1 · Color

### Día (`.lector[data-tema="dia"]`)
| Token | Valor | Uso |
|---|---|---|
| `--pergamino` | `#f5edd8` | base del papel |
| `--paper-piece` | `color-mix(#fff 32%, #f5edd8)` ≈ `#f8f3e5` | botones, píldora, fondo del lector |
| `--lr-kraft` | `color-mix(#8c5f3a 22%, #f5edd8)` ≈ `#decfb5` | panel de texto, nav-bar, rayas del fondo |
| `--tinta` = `--line` = `--ink` | `#38362c` | trazos, iconos, títulos |
| `--lr-text` | `#38362c` | texto del cuento |
| `--lr-ink-soft` | `color-mix(#38362c 65%, #9ba89c)` | etiquetas secundarias |
| `--lr-sh` | `rgba(59,47,23,.18)` | sombra dura de las piezas |
| `--lr-sh-play` | `rgba(59,47,23,.22)` | sombra del play |
| `--lr-dots` | `radial-gradient(rgba(59,47,23,.05) 1px, transparent 1px)` a `5px 5px` | trama del kraft |
| `--amber` | `#c9a035` | play, flecha pulsada, palabra ya leída |

### Noche (`.lector[data-tema="noche"]`)
| Token | Valor |
|---|---|
| `--pergamino` / `--lr-kraft` | `#1b2744` |
| `--paper-piece` | `#253560` |
| `--tinta` = `--line` = `--ink` = `--lr-text` | `#f0e6c8` |
| `--lr-ink-soft` | `color-mix(#f0e6c8 60%, #6b7a9a)` |
| `--lr-sh`, `--lr-sh-play` | `rgba(240,230,200,.35)` (sombra clara) |
| `--lr-dots` | `radial-gradient(rgba(240,230,200,.05) 1px, transparent 1px)` |
| `--amber` | `#c9a035` (igual) |

Los iconos sobre ámbar (play/pausa, flecha pulsada) son siempre `#38362c`, en los dos modos.

## 2 · Tipografía

| Rol | Familia | Tamaño / estilo |
|---|---|---|
| Texto del cuento | Cormorant Upright **700** | 19px, `line-height 1.55`, `text-wrap: pretty`, alineado a la izquierda |
| Título de portada | Mick Caster 400 | 29px, `line-height 1.1`, `text-wrap: balance` |
| «Fin» | Mick Caster 400 | 34px, `letter-spacing .06em` |
| Subtítulo de portada | Wakerobin Compressed, MAYÚSCULAS | 13px, `letter-spacing .16em`, `--lr-ink-soft` |
| Protagonista («Lucas - 8 años») | Cormorant Upright | 19px, `--ink` |
| Nº de páginas | Cormorant Upright | 13px, `letter-spacing .04em`, `--lr-ink-soft` |
| Título en la nav-bar | Wakerobin Compressed 600, MAYÚSCULAS | 15.5px, `letter-spacing .07em`, `line-height 1.35`, `text-wrap: balance` |
| Etiqueta nav-bar | Cormorant Upright | 12.5px, `letter-spacing .04em`, `--lr-ink-soft` |
| Píldora «Pág 3/21» | Cormorant Upright | 11px, `letter-spacing .04em` |
| Botones de «Fin» | Wakerobin Compressed 600, MAYÚSCULAS | 14px, `letter-spacing .08em` |
| Etiqueta «No disponible» | Wakerobin Compressed 600, MAYÚSCULAS | 10.5px, `letter-spacing .14em` |

## 3 · Estructura y capas

`<dialog class="lector">` a pantalla completa (`position:fixed; inset:0; height:100dvh`), fondo `--paper-piece`.

| z-index | Capa |
|---|---|
| 0 | Ilustración |
| 5 | Zona inferior: controles + panel de texto |
| 10 | Píldora de página |
| 20 | Nav-bar desplegable |
| 30 | Hamburguesa, casa, luna/sol |

## 4 · Piezas

### 4.1 Ilustración
- Caja centrada: `top:0; left:50%; translateX(-50%); width:100%; max-width:800px; max-height:100%; aspect-ratio:800/1200`.
- Fondo de espera: rayas a 45° `repeating-linear-gradient(45deg, --lr-kraft 0 12px, --paper-piece 12px 24px)`.
- Imagen: `object-fit:contain; object-position:center top`. **Todas las `<img>` del cuento están en el DOM**; solo la actual lleva `.on` (`display:block`). Cambio de página instantáneo.
- Ilustraciones verticales **2:3** (las de Lucas son 848×1264 .webp; la caja usa la proporción 800/1200 y `contain`, así que no se recortan).

### 4.2 Píldora de página (arriba izquierda)
`left:14px; top:21px; padding:6px 11px; border-radius:26px`; fondo `--paper-piece`; sombra `3px 4px 0 --lr-sh`. Texto `Pág {n}/{total}`. **Oculta en la portada**.

### 4.3 Botones superiores (derecha), 37×37, `border-radius:9px`, `top:16px`
| Botón | `right` | Comportamiento |
|---|---|---|
| Hamburguesa | 14px | 3 barras 18×2 (`top` 0 / 5.5 / 11px). Abierta → X (±45°, la del medio `opacity:0`), `.2s` |
| Casa | 62px | Cierra el lector y vuelve al punto de la web donde estaba |
| Luna / sol | 110px | Cambia el modo **solo del lector**. Luna de día, sol de noche |

Casa y luna/sol están **ocultas** con la barra cerrada (`opacity:0; translateY(-8px)`) y aparecen al abrirla (`.28s cubic-bezier(.5,1.2,.5,1)`, retardo `.06s`).

### 4.4 Nav-bar desplegable
- `top:0; left:0; right:0; min-height:44px; padding:14px 180px 14px 22px`; columna con `gap:2px`.
- Fondo kraft + trama de puntos; sombra `0 4px 0 --lr-sh`.
- Cerrada `translateY(-110%)` → abierta `translateY(0)`, `.28s cubic-bezier(.5,1.2,.5,1)`.
- Contenido: título del cuento + etiqueta (`Portada` o `Capítulo 1 · pág {n} de {total}`).

### 4.5 Zona inferior
- `position:absolute; left:0; right:0; bottom:0; top:min(150vw, 1200px, calc(100dvh - 190px))`: empieza donde acaba la ilustración y **nunca deja menos de 190px** para el texto. Columna con `gap:14px`.
- **Controles**: fila `space-between`, `padding:0 18px; margin-top:-62px` (se montan sobre el borde inferior de la ilustración).
  - Anterior / siguiente: 42×37, `border-radius:11px`, chevron 16px trazo 2.2. Deshabilitado: `opacity:.35`. Al pulsar: fondo **ámbar** e icono `#38362c` (se mantiene 220ms con `.pulsado` para que se vea en móvil).
  - Play: círculo 48px, fondo ámbar, sombra `3px 4px 0 --lr-sh-play`, triángulo relleno 19px. Sonando → icono de pausa (dos barras).
  - **Sin audio**: play `opacity:.45`, deshabilitado, y debajo una píldora «NO DISPONIBLE» (`margin-top:7px`, sombra `2px 3px 0`).
- **Panel de texto**: kraft + trama, sombra `0 -4px 0 --lr-sh`, `padding:20px 22px max(34px, safe-area + 14px)`. Scroll interno solo si el texto no cabe (barra oculta); durante la narración se desplaza solo para que la palabra en curso no quede escondida.

### 4.6 Contenido del panel según el tipo de página
| Tipo | Contenido |
|---|---|
| `portada` | Título (Mick Caster 29) · subtítulo · fila con «Protagonista - N años» y «N páginas» (`gap:4px`, fila `gap:12px`) |
| `texto` | Párrafo; cada palabra es un `<span>`. Las ya dichas por el narrador llevan `.leida` → color ámbar (`transition: color .18s`) |
| `fin` | «Fin» centrado + botones «Volver al principio» y «Cerrar libro» (papel + sombra dura, `padding:9px 18px`, `radius:9px`, `gap:14px`) |

## 5 · Interacción y movimiento
- Todas las piezas bajan 1px al pulsar (`translateY(1px)`); los botones de «Fin» `translate(2px,3px)`.
- Deslizar sobre la ilustración: ← siguiente, → anterior (umbral 50px y gesto claramente horizontal).
- Teclado: ← → pasan página; Esc cierra.
- `touch-action: manipulation` (sin zoom por doble toque al pulsar rápido «siguiente»; el pellizco se mantiene).
- Total de páginas mostrado = `paginas.length - 1` (la portada no cuenta).

## 6 · Pantallas anchas
El diseño es móvil. En escritorio la ilustración se queda en su caja 2:3 centrada (rayas kraft a los lados) y
los controles y el texto se limitan al ancho visible de esa ilustración:
`max-width: min(100vw, 800px, 66.667dvh)` (el texto, 44px menos). Ver `referencia/09-escritorio.png`.

## 7 · Capturas (`referencia/`)
| Archivo | Estado |
|---|---|
| `01-portada-dia.png` | Portada, día |
| `02-texto-dia.png` | Página de texto, día |
| `03-narrando-palabras-ambar.png` | Narrando: pausa visible y palabras leídas en ámbar |
| `04-menu-abierto.png` | Nav-bar abierta con luna, casa y X |
| `05-fin.png` | Página «Fin» (siguiente deshabilitado) |
| `06-texto-noche.png` | Página de texto, noche |
| `07-menu-abierto-noche.png` | Nav-bar abierta, noche (sol) |
| `08-sin-audio.png` | Cuento sin narración: play apagado + «No disponible» |
| `09-escritorio.png` | Escritorio 1280×860 |

Las capturas de móvil son 393×852 a @2x. El anillo azul en «siguiente» es el foco del navegador (el foco va ahí al abrir).
