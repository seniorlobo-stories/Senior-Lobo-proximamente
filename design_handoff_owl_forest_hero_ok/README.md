# Handoff: Hero animado "Bosque Búho"

## Overview
Sección **hero** (portada) para una web: una escena de bosque ilustrada, animada de
forma sutil y continua. Tres capas WebP superpuestas — fondo de bosque, árbol en
segundo plano y un búho posado sobre una rama (primer plano, derecha) — con
micro-animaciones CSS, un haz de luz y partículas de polvo flotando. Encima va el
contenido del hero (titular, subtítulo y CTA).

## About the Design Files
Los archivos de `hero/` son una **referencia de diseño** y, a la vez, una
**implementación de referencia funcional en HTML/CSS puro** (sin JavaScript, sin
dependencias). El `index.html` ya corre tal cual.

La tarea es **integrar esta escena como hero dentro del codebase destino** siguiendo
sus patrones (React/Next, Vue, Astro, Svelte, etc.). Si el proyecto usa componentes,
conviértelo en un componente `<Hero />`; si es HTML estático, pega el bloque. Reutiliza
el sistema de diseño/tipografía existente para el **texto y el CTA**; las **3 capas de
imagen y sus animaciones** deben conservarse tal cual (es lo que da vida a la escena).

## Fidelity
**Alta fidelidad (hifi).** Colores, tiempos de animación, transforms y assets son
finales. Recrea las animaciones exactamente con los valores de `@keyframes` de abajo.
El contenido (titular/subtítulo/CTA) es de muestra: sustitúyelo por el real y aplica la
tipografía del proyecto.

## Screen / View

### Hero "Bosque Búho"
- **Purpose**: portada de la página; capta atención con una escena viva y un CTA.
- **Layout**:
  - Contenedor `section.hero`: `position:relative`, ancho `100%`,
    `height: clamp(440px, 72vh, 760px)`, `overflow:hidden`, `background:#E7E3CC`,
    `isolation:isolate` (para contener el `mix-blend-mode:screen` del haz).
  - Escena `.hero-scene`: `position:absolute; inset:0`. Contiene las 3 imágenes
    (`position:absolute; inset:0; width/height:100%; object-fit:cover; object-position:center`),
    el haz `.beam` y las motas `.motes`.
  - Contenido `.hero-content`: `position:relative; z-index:2`, columna flex centrada
    verticalmente, `max-width:560px`, `padding: clamp(28px,6vw,80px)`, `gap:18px`.
- **Orden de apilado (z, de atrás a delante)**: fondo → haz de luz → motas → árbol →
  búho → contenido.
- **Aspecto de diseño**: la escena está compuesta para un lienzo **7:4 (1344×768)**.
  Con `object-fit:cover` se adapta a cualquier alto recortando bordes; el texto va sobre
  la zona clara izquierda. Mantén el hero cerca de esa proporción para que el encuadre
  del búho coincida con el de la referencia.

#### Componentes / capas
1. **Fondo** `img.l-bg` (`forest-bg.webp`, 1344×768, sin alfa)
   - `object-fit:cover`. `transform-origin:54% 46%`.
   - Animación `bgDrift` 46s ease-in-out infinite **alternate** (deriva/zoom lento).
2. **Haz de luz** `span.beam`
   - `position:absolute; left:38%; top:6%; width:42%; height:78%; border-radius:50%`.
   - `background: radial-gradient(ellipse at 50% 35%, rgba(255,250,224,.85), rgba(255,250,224,0) 68%)`.
   - `mix-blend-mode:screen; pointer-events:none`. Animación `beam` 9s (pulso de opacidad).
3. **Motas de polvo** `.motes > i` (5 elementos)
   - Círculos `rgba(255,252,232,.9)` con `box-shadow:0 0 6px rgba(255,252,232,.7)`.
   - Cada una con `--mx/--my/--mo` y duración/delay propios (ver CSS). Animación `mote` linear infinite.
4. **Árbol** `img.l-tree` (`forest-tree.webp`, 1344×768, con alfa)
   - `transform-origin:13% 100%` (se mece desde la base). Animación `treeSway` 8.5s.
5. **Búho + rama** `img.l-owl` (`forest-owl.webp`, 1344×768, con alfa), dentro de
   `.owl-wrap`:
   - **`.owl-wrap`**: `position:absolute; inset:0; transform: translate(4%,-11%) scale(.7);
     transform-origin:100% 74%`. Esto reduce el búho al **70%** y lo desplaza hacia la
     derecha/arriba, manteniendo la rama anclada donde toca el árbol.
   - **`.l-owl`** (img interna): `transform-origin:100% 74%`; animación `owlBranch` 4.8s
     con delay 0.3s (la rama flexiona).
6. **Contenido**: `h1` (`clamp(34px,5.2vw,64px)`, `line-height:1.04`, `letter-spacing:-.02em`,
   `text-wrap:balance`), `p` (`clamp(16px,1.7vw,20px)`, `max-width:38ch`), `a.hero-cta`
   (pill `border-radius:999px`, fondo `#3E2C1E`, texto `#F5F0DC`, `padding:14px 26px`,
   hover `translateY(-2px)` + fondo `#523824`).

## Interactions & Behavior
- **Solo animaciones ambientales** (loop infinito, sin interacción). Todo se anima con
  `transform`/`opacity` → compositing por GPU, sin reflow.
- **CTA hover**: `transform: translateY(-2px)` + cambio de color, `transition .15s ease`.
- **Responsive**: la altura escala con `clamp(...vh...)`; las imágenes usan
  `object-fit:cover`. El texto se sitúa sobre la zona clara izquierda; en anchos
  estrechos añade un velo en `.hero-content` si falta contraste:
  `background: linear-gradient(90deg, rgba(245,240,220,.6), transparent)`.
- **Accesibilidad**: la escena lleva `aria-hidden="true"`; bajo
  `@media (prefers-reduced-motion: reduce)` **todas** las animaciones se desactivan.

## Animaciones (valores exactos)
```css
@keyframes bgDrift  {0%{transform:scale(1.03)} 100%{transform:scale(1.065) translate(-.8%,-.5%)}}
@keyframes treeSway {0%,100%{transform:rotate(-.9deg)} 50%{transform:rotate(1.1deg)}}
@keyframes owlBranch{0%,100%{transform:rotate(-.7deg) translateY(0)} 50%{transform:rotate(.7deg) translateY(-.5%)}}
@keyframes beam     {0%,100%{opacity:.18} 50%{opacity:.4}}
@keyframes mote{
  0%{transform:translate(0,0) scale(1);opacity:0}
  12%{opacity:var(--mo,.6)} 85%{opacity:var(--mo,.6)}
  100%{transform:translate(var(--mx,-30px),var(--my,-160px)) scale(.7);opacity:0}
}
```
Duraciones: bg 46s (alternate), tree 8.5s, owl 4.8s (delay .3s), beam 9s, motes 13/17/15/19/21s.
Transform estático del búho: `.owl-wrap { transform: translate(4%,-11%) scale(.7); transform-origin:100% 74%; }`.

## Design Tokens
- Colores: tinta `#3E2C1E`, tinta hover `#523824`, texto secundario `#5A4733`,
  crema fondo escena `#E7E3CC`, crema CTA `#F5F0DC`, luz `rgba(255,250,224,*)`,
  motas `rgba(255,252,232,*)`.
- Radios: CTA `999px` (pill).
- Tipografía: stack del sistema en la referencia → **sustituir por la fuente del proyecto**.
- Escala fluida: alturas y tamaños con `clamp()` (ver arriba).

## State Management
Ninguno. Componente puramente presentacional, sin estado ni data fetching.

## Assets
En `hero/` (formato **WebP**, 1344×768, ~239 KB en total — recomprimidos desde los PNG originales):
- `forest-bg.webp` — fondo del bosque (sin alfa).
- `forest-tree.webp` — árbol del primer plano izquierdo (con alfa).
- `forest-owl.webp` — búho sobre la rama, derecha (con alfa).
Las 3 comparten el mismo lienzo 1344×768 y están alineadas: deben superponerse a
pleno tamaño en el mismo contenedor. Mantén ese orden de apilado y el transform de
`.owl-wrap`.

## Files
- `hero/index.html` — implementación de referencia completa (HTML + CSS inline, sin JS).
  Es la fuente de verdad: copia de ahí la marca y las animaciones.
- `hero/forest-bg.webp`, `hero/forest-tree.webp`, `hero/forest-owl.webp` — capas.

## Notas de integración
- Mueve el `<style>` a la hoja/módulo de estilos del proyecto (o a CSS Modules /
  styled-components según el stack); no dejes estilos globales que choquen.
- Si el stack es React/JSX: `class` → `className`, y conserva los nombres de clase.
- Sirve los `.webp` desde la carpeta de assets del proyecto y ajusta los `src`.
- No reintroduzcas JavaScript: la escena no lo necesita.
