# Handoff: Modo noche del hero "Bosque Búho"

## Overview
Esto añade un **modo noche** al hero animado "Bosque Búho" que ya tienes integrado.
El modo noche reutiliza exactamente la misma composición y animaciones; solo cambian
**tres cosas** al activarse:

1. Las **3 capas de imagen** (fondo, árbol, búho) se intercambian por su versión nocturna.
2. El **ambiente** cambia: el haz de luz pasa de sol cálido a luna fría, y las motas de
   polvo crema pasan a luciérnagas ámbar.
3. El **color de fondo** de la escena pasa de crema a azul noche.

> El **switch día/noche ya está implementado en tu web**, así que aquí NO se incluye su
> diseño ni su markup. Solo necesitas **conectar tu switch existente** a la lógica de
> abajo (una variable booleana `night`).

## Cómo funciona (técnica)
Las versiones día y noche de cada capa se renderizan **ambas, superpuestas** en el mismo
contenedor, y se alternan con `opacity` (1/0) según el estado `night`. Esto precarga los
dos juegos de imágenes y hace el cambio **instantáneo y sin parpadeo**.

> Importante: cambia la `opacity` con un **valor literal** (`0`/`1`) atado al estado,
> NO a través de una variable CSS. Las transiciones CSS no se disparan al cambiar el
> valor de una custom property, así que un `transition` sobre `opacity:var(--x)` no
> animaría. Si quieres crossfade, anima el valor literal; si no, déjalo instantáneo.

## Estructura recomendada (HTML)
Por cada una de las 3 capas, dos `<img>` apiladas (misma posición, mismo `object-fit`):

```html
<!-- Fondo -->
<img class="l-bg"       src="forest-bg.webp"        style="opacity: var(--isDay)">
<img class="l-bg-night" src="forest-bg-night.webp"  style="opacity: var(--isNight)">

<!-- Árbol -->
<img class="l-tree"       src="forest-tree.webp"       style="opacity: var(--isDay)">
<img class="l-tree-night" src="forest-tree-night.webp" style="opacity: var(--isNight)">

<!-- Búho (dentro del .owl-wrap que ya escala .7 y desplaza el búho) -->
<img class="l-owl"       src="forest-owl.webp"        style="opacity: var(--isDay)">
<img class="l-owl-night" src="forest-owl-night.webp"  style="opacity: var(--isNight); translate: 0.71% 0;">
```

(Si tu framework liga `opacity` directo al estado en vez de a una var, mejor:
`opacity={night ? 0 : 1}` para las de día y `opacity={night ? 1 : 0}` para las de noche.)

### Alineación del búho nocturno (IMPORTANTE)
La imagen del búho nocturno tiene el cuerpo ~7px a la izquierda respecto a la diurna.
Para que NO "salte" al alternar, la capa del búho nocturno lleva un desplazamiento fijo:
**`translate: 0.71% 0;`** (propiedad `translate` independiente, para no pisar el
`transform` de la animación de balanceo). No lo quites.

## Valores que cambian según el modo
Aplica estos valores cuando `night === true` / `false`. (Tal cual están en la referencia.)

| Token / capa            | Día                          | Noche                          |
|-------------------------|------------------------------|--------------------------------|
| Fondo de escena         | `#E7E3CC`                    | `#141d2b`                      |
| Imagen fondo            | `forest-bg.webp`             | `forest-bg-night.webp`         |
| Imagen árbol            | `forest-tree.webp`           | `forest-tree-night.webp`       |
| Imagen búho             | `forest-owl.webp`            | `forest-owl-night.webp`        |
| Haz de luz — centro     | `rgba(255,250,224,0.85)`     | `rgba(150,180,232,0.45)`       |
| Haz de luz — borde      | `rgba(255,250,224,0)`        | `rgba(150,180,232,0)`          |
| Motas — color           | `rgba(255,252,232,0.9)`      | `rgba(255,208,120,0.95)`       |
| Motas — glow (box-shadow)| `rgba(255,252,232,0.7)`     | `rgba(255,180,80,0.95)`        |

El haz usa `background: radial-gradient(ellipse at 50% 35%, <centro>, <borde> 68%)` con
`mix-blend-mode:screen` (igual que en día). Las motas son los mismos `<span>`; solo
cambian `background` (color) y `box-shadow` (glow). Todo lo demás (posiciones,
duraciones de animación, `bgDrift`, `treeSway`, `owlBranch`, `mote`) es idéntico al día.

## Lógica (pseudocódigo, conéctalo a tu switch)
```js
// night = booleano que ya controla tu switch existente
const theme = night
  ? { sceneBg:'#141d2b', beamCore:'rgba(150,180,232,0.45)', beamEdge:'rgba(150,180,232,0)',
      moteCol:'rgba(255,208,120,0.95)', moteGlow:'rgba(255,180,80,0.95)' }
  : { sceneBg:'#E7E3CC', beamCore:'rgba(255,250,224,0.85)', beamEdge:'rgba(255,250,224,0)',
      moteCol:'rgba(255,252,232,0.9)',  moteGlow:'rgba(255,252,232,0.7)' };
// día: imgs *.webp visibles; noche: imgs *-night.webp visibles (opacity 1/0)
```

## Accesibilidad
Respeta `prefers-color-scheme: dark` si quieres que el modo noche sea el inicial por
defecto, pero deja que el switch del usuario tenga prioridad. Mantén el bloque
`@media (prefers-reduced-motion: reduce)` que ya desactiva las animaciones; aplica a
ambos modos.

## Assets (en esta carpeta)
WebP, 1344×768, ~204 KB las tres juntas:
- `forest-bg-night.webp` — fondo nocturno con setas luminosas (sin alfa).
- `forest-tree-night.webp` — árbol azulado (con alfa).
- `forest-owl-night.webp` — búho con gorro de dormir sobre la rama (con alfa).

Comparten lienzo 1344×768 y se alinean con las capas diurnas: misma posición, mismo
`object-fit`. (Las imágenes diurnas ya las tienes del handoff anterior.)

## Files
- `assets/` — las 3 imágenes nocturnas.
- Este README es autosuficiente: conecta tu switch a la variable `night` y aplica la
  tabla de valores + el intercambio de capas.
