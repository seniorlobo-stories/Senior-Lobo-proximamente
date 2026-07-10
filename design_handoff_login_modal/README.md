
# Handoff: Modal de Iniciar sesión / Registrar (Señor Lobo)

## Resumen
Modal de acceso en dos páginas ("libro abierto"), con dos modos que alternan
dentro del mismo modal: **Iniciar sesión** y **Registrar**. Página izquierda:
bienvenida ilustrada con el logo del lobo + CTA para cambiar de modo. Página
derecha: formulario (login: email/contraseña/recuérdame/Google; registro:
nombre/email/aceptar política).

## Sobre los archivos de diseño
Los archivos de este paquete (`reference/LoginModal.html`) son **referencias de
diseño creadas en HTML** — prototipos que muestran el aspecto y comportamiento
previstos, **no código de producción para copiar tal cual**. La tarea es
**recrear este diseño HTML dentro del entorno ya existente del repositorio**
(React, Vue, Angular, etc., con sus propios patrones y librerías) o, si el
proyecto no tiene aún un framework de UI, elegir el más adecuado e implementar
el modal ahí.

## Fidelidad
**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones son
finales. Debe recrearse píxel a píxel usando las librerías/patrones ya
existentes en el repositorio de destino (o, a falta de ellos, un CSS-in-JS /
CSS módulos equivalente a los tokens listados abajo).

## Cómo ver la referencia
Abre `reference/LoginModal.html` directamente en el navegador (doble clic o
"Abrir con..."). Es autocontenido: no requiere servidor. Al cargar, el modal
aparece ya abierto en modo "Iniciar sesión"; el botón bajo el modal lo vuelve a
abrir si se cierra.

## Estructura del modal

- **Overlay** (`.lg-overlay`): fondo fijo a pantalla completa, scrim oscuro
  semitransparente (`rgba(31,24,10,.52)`) + click para cerrar.
- **Modal** (`.lg-modal`): ancho `min(940px, 100%)`, centrado. Botón de cerrar
  circular flotante en la esquina superior derecha (`.lg-close`), 44×44px.
- **Spread / "libro abierto"** (`.lg-spread`): grid de 2 columnas + lomo
  central de 40px, altura 602px. Simula un libro con 2 hojas apiladas detrás
  (pseudo-elementos `::before`/`::after`, rotadas 1°, offsets 8px/16px) y una
  sombra dura sin blur (`6px 9px 0`).
  - **Página izquierda** (`.lg-page-left`): encabezado "Pág. 1" + título de
    modo, bloque de bienvenida (eyebrow + h2 grande en fuente slab), ilustración
    del logo (230px alto), y un CTA para cambiar entre login/registro.
  - **Lomo** (`.lg-spine`): línea vertical central, opacidad .5.
  - **Página derecha** (`.lg-page-right`): encabezado "Pág. 2" alineado a la
    derecha + formulario.
- **Responsive** (`max-width:760px`): el grid pasa a 1 columna; se ocultan el
  lomo y la página izquierda; solo queda el formulario.

## Modo "Iniciar sesión"
- Lede: "Introduce tus datos para crear tus cuentos"
- Campo Correo electrónico (email)
- Campo Contraseña (password) + enlace "¿Olvidaste tu contraseña?" alineado a
  la derecha del label
- Checkbox "Recuérdame en este dispositivo" (chip 22×22px, check anima opacity)
- Botón primario "Entrar" (ancho completo, flecha a la derecha)
- Separador "o"
- Botón secundario "Inicia sesión con Google" — **deshabilitado**, con label
  "Próximamente" encima (mono, uppercase, 11px)

## Modo "Registrar"
- Lede: "Crea tu cuenta para empezar a crear tus cuentos"
- Campo Nombre (text)
- Campo Correo electrónico (email)
- Checkbox "Acepto la política de privacidad de Senior Lobo"
- Botón primario "Solicitar registro" (ancho completo, flecha a la derecha)

El cambio de modo se dispara desde el CTA de la página izquierda
("Regístrate" / "Inicia sesión") — no hay tabs; todo el modal (título de
página, welcome, formulario) reacciona al modo activo.

## Interacciones y comportamiento
- Abrir modal: fade-in del scrim (`.22s ease`) + el modal sube con
  overshoot (`.28s cubic-bezier(.2,.9,.3,1.1)`, `translateY(18px)→0`,
  `scale(.97)→1`).
- Cerrar: click en el scrim, click en la X, o tecla `Escape`.
- Checkboxes: click alterna estado on/off (color de fondo del check pasa a
  `--teal`, el ✓ SVG hace fade-in de opacity).
- Inputs: foco muestra `box-shadow: 0 0 0 4px var(--teal-pale)` y borde
  `--teal`.
- Botones con sombra dura: al presionar (`:active`), el contenido se desplaza
  `translate(2px,2px)` y la sombra se reduce — simula un "papel presionado",
  sin transición suave.
- Google (login): deshabilitado visualmente (opacity .55, cursor default),
  reservado para integración futura.
- Tema Día/Noche: todos los colores usan variables CSS del design system
  (`--kraft`, `--ink`, `--line`, `--teal`, etc.) que se re-apuntan cuando
  `document.documentElement.dataset.theme = 'noche'`. El logo cambia de SVG
  (día/noche) vía las clases `.lobo-dia` / `.lobo-noche`.

## Gestión de estado
Estado local necesario (React `useState` u equivalente):
- `open: boolean` — visibilidad del modal
- `register: boolean` — modo activo (false = login, true = registro)
- `name, email, pwd: string` — valores de los campos
- `remember: boolean` — checkbox "recuérdame"
- `accept: boolean` — checkbox "acepto política" (registro)

No hay llamadas a red en el prototipo — los botones de submit ("Entrar",
"Solicitar registro") no tienen handler real; conectar a la lógica de
autenticación/registro real del backend de destino.

## Validación de formulario (a implementar)
No implementada en el prototipo. Recomendado:
- Login: email con formato válido, contraseña no vacía.
- Registro: nombre no vacío, email válido, checkbox de política **marcado**
  antes de habilitar "Solicitar registro".

## Design tokens usados

**Colores** (variables CSS del design system — no hardcodear valores nuevos):
- `--kraft` — fondo general (marrón papel kraft)
- `--pergamino` `#F5EDD8` — relleno de páginas/tarjetas
- `--ink` `#38362C` — texto principal
- `--ink-soft`, `--ink-faint` — texto secundario/placeholder
- `--line` — color de trazo/títulos
- `--teal` / `--teal-deep` / `--teal-pale` — acento interactivo (foco, checks)
- `--fill` — relleno de inputs/checks sin marcar
- `--paper`, `--paper-piece` — fondo de botones secundarios
- `--sh-drop` — color base de sombra dura (offset, sin blur)
- Tema noche: los mismos nombres de variable se re-apuntan a
  Medianoche `#1B2744` / Noche `#253560` / Crema `#F0E6C8` / Bruma `#6B7A9A`

**Tipografía:**
- Display/labels: **Wakerobin Compressed** (`--font-disp`) — uppercase,
  tracking .07–.14em
- Slab (título de bienvenida): **Mick Caster** (`--font-slab`) — 38px
- Cuerpo/inputs/lede: **Cormorant Upright** (`--font-body`)
- Meta/mono (número de página, "Próximamente"): `--font-mono`

**Espaciado/radios:**
- Radio de tarjeta/modal: 6px (spread), 8–10px (inputs/botones), 50% (cerrar)
- Padding de página: 40px 44px (30px 26px en mobile)
- Gap de campo: 9px (label→input), 20px entre campos

**Sombras:** siempre offset duro, sin blur — patrón `Xpx Ypx 0 color`
(ej. `3px 4px 0`, `6px 9px 0`). Nunca `blur > 0`.

**Efecto "trazo a mano"**: los bordes de tarjetas/inputs/botones no son bordes
CSS planos — se generan con un filtro SVG (turbulencia + desplazamiento)
sobre una capa `.bg` sintética, para que el trazo se vea "dibujado a pluma".
Ese comportamiento vive en `assets/linea-runtime.js` (inyecta los filtros SVG
`#rough` / `#torn-paper` / `#torn-paper-2` / `#torn-line` en el `<head>` y
añade la capa `.bg` a cada elemento marcado). **El equipo de desarrollo debe
decidir** si recrea este efecto (portando el runtime + los filtros SVG) o lo
sustituye por bordes CSS convencionales si el proyecto de destino no usa este
sistema de diseño ilustrado — flag para confirmar con el usuario.

## Assets
- `assets/senorlobo-dia.svg` / `assets/senorlobo-noche.svg` — logo del lobo
  (variante día/noche), usado como ilustración en la página izquierda del
  modal.
- `assets/linea-runtime.js` — runtime de filtros SVG que produce el efecto de
  trazo a mano (ver sección anterior).
- Fuentes self-hosted en `_ds/.../fonts/` (Mick Caster, Wakerobin Compressed)
  + Cormorant Upright vía Google Fonts (declarada en `_ds/.../tokens/fonts.css`).
- Icono de Google: SVG path inline dentro del botón (sin archivo aparte).

## Archivos de este paquete
- `reference/LoginModal.html` — prototipo funcional, autocontenido, abre
  directo en el navegador. Contiene **solo el modal** (sin la barra de
  navegación de la página que lo lanza).
- `reference/ds-base.js`, `reference/support.js` — runtime del prototipo
  (motor de plantillas usado para generar la referencia; no es necesario
  portarlo al codebase de destino, es solo para que el HTML de referencia
  funcione).
- `reference/assets/` — logo + runtime de trazo a mano (ver arriba).
- `reference/_ds/senior-lobo-design-system-9819669a-71b1-41c2-b24e-485c1a3c5cb9/`
  — el design system completo (tokens CSS, fuentes, componentes base) del que
  sale toda la paleta/tipografía/espaciado documentados arriba. Útil como
  referencia de valores exactos (abre los `.css` en `tokens/`).
