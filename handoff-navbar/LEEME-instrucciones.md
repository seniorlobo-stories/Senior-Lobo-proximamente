# Handoff a Claude Code · Incorporar el Navbar en todas las versiones

> Objetivo: colocar el mismo header de marca (Navbar «hoja de papel rasgado») en la parte superior de **todas** las plantillas del sistema: **Login**, **Wizard** y **Configuración de usuario**. Debe verse y comportarse igual que en la card `components/navigation/navigation.card.html` (día/noche, avatar con menú, hamburguesa en móvil, versión visitante y con sesión).

> Nota sobre esta carpeta: el código fuente `.jsx`/`.d.ts` de los componentes NO se incluye a propósito (evita conflictos al recompilar). La fuente autoritativa en runtime es **`_ds_bundle.js`** (ya trae todos los componentes compilados, incluido `Navbar` y `DayNightSwitch`). Para consultar el markup/CSS del navbar usa `components/navigation/navigation.card.html` y las notas `*.prompt.md` de cada componente, que sí están incluidas.

## 0. Contexto del repo
- Sistema de diseño en la raíz. El bundle compilado es `_ds_bundle.js` (NO lo edites; se regenera solo).
- Namespace global del bundle: `window.SeOrLoboDesignSystem_981966`.
- Componente React ya existente: **`Navbar`** en `components/navigation/Navbar.jsx` (+ `Navbar.d.ts`). Firma:
  ```ts
  Navbar({ brand, brandTagline?, brandLogo?, links?: {label,href?,active?}[], actions?: ReactNode })
  ```
- **`DayNightSwitch`** (mismo namespace) es el switch día/noche que va en el slot `actions`.
- Assets del logo: `assets/senorlobo-dia.svg` y `assets/senorlobo-noche.svg`.
- Runtime de efectos (papel rasgado, rough, etc.): `assets/linea-runtime.js`.
- Las plantillas son **Design Components** (`.dc.html`) en `templates/<slug>/`. Cada una carga el DS vía su `ds-base.js` hermano.

## 1. Plantillas a modificar (las «versiones»)
1. `templates/login/Login.dc.html`
2. `templates/wizard/Wizard.dc.html`
3. `templates/configuracion-usuario/ConfiguracionUsuario.dc.html`

Para cada una: revisa si ya tiene una barra superior propia. Si la tiene, **reemplázala** por el Navbar compartido; si no, **añádelo** como primer hijo del cuerpo de la plantilla.

## 2. Fuente de verdad del markup
El markup exacto del navbar (visitante, con sesión, y móvil) más su CSS y su JS de comportamiento están en:
```
components/navigation/navigation.card.html
```
Cópialos **verbatim** desde ahí. Piezas clave que NO puedes olvidar:
- Estructura `.wz-topbar > i.bg + .wz-nav-inner` con `.wz-brand`, `.wz-nav`, `.wz-tools`.
- El `<i class="bg">` con `filter:url(#torn-paper)` (efecto papel). Requiere que `linea-runtime.js` esté cargado.
- Menú de avatar `.cf-user`/`.cf-menu` (versión con sesión).
- Hamburguesa `.wz-burger` + `.wz-menu` y las media queries `@media (max-width:640px)` para móvil.
- Los `#dn-mount-*` donde se montan los `DayNightSwitch`.
- Todo el bloque `<script>` final: montaje de `DayNightSwitch`, toggles de hamburguesa/avatar, y cierre al hacer click fuera.

## 3. Cómo montarlo dentro de un `.dc.html` (importante)
Las plantillas son DCs. Tienes DOS caminos válidos — usa **A** (componente) salvo que necesites las variantes visitante/móvil tal cual, en cuyo caso usa **B**.

### Opción A · usar el componente `Navbar` del bundle (preferida, menos código)
En el `<helmet>` de la plantilla ya se carga el bundle vía `ds-base.js`. Monta el Navbar con `x-import` sobre el namespace global:
```html
<x-import
  component-from-global-scope="SeOrLoboDesignSystem_981966.Navbar"
  hint-size="100%,130px"
  brand="Senior Lobo"
  brand-tagline="Cuentos personalizados"
  brand-logo="../../assets/senorlobo-dia.svg"
  links="{{ navLinks }}"
  actions="{{ navActions }}">
</x-import>
```
- `navLinks` y `navActions` se calculan en `renderVals()` de la clase `Component` (el `actions` debe incluir el `DayNightSwitch` y, con sesión, el avatar/menú).
- Ajusta `brand-logo` día/noche según el tema, o deja que el propio componente maneje ambos logos si ya lo hace (revisa `Navbar.jsx` antes).

### Opción B · pegar el markup HTML del navbar (si necesitas visitante + con sesión + móvil idénticos a la card)
1. Copia el `<style>` del navbar de la card a un `<helmet><style>…</style></helmet>` al inicio de la plantilla (solo lo que no se pueda inline: keyframes y reglas con pseudo-elementos van bien aquí).
2. Pega el `.wz-topbar` correspondiente (visitante o con sesión) como primer hijo.
3. Carga los scripts en `<helmet>`: `linea-runtime.js`, React/ReactDOM, `_ds_bundle.js`.
4. El JS de comportamiento (montaje de switches, hamburguesa, avatar, click-fuera) ponlo en `componentDidMount()` de la clase `Component`, NO en un `<script>` suelto del template.

## 4. Qué variante usar en cada plantilla
- **Login** → variante **visitante · sin sesión** (logo + enlaces + `Iniciar sesión` + switch). En la propia página de login puedes ocultar el botón «Iniciar sesión» del navbar para no duplicar.
- **Wizard** («Crear cuento») → variante **con sesión iniciada** (avatar `JG` + menú de usuario). Enlaces: Inicio · ¿Qué es Senior Lobo? · Mis cuentos · Ayuda.
- **Configuración de usuario** → variante **con sesión iniciada**, con el enlace/estado activo en el ítem que corresponda.

## 5. Comportamiento obligatorio (verificar en cada plantilla)
- Día/noche: el `DayNightSwitch` alterna `:root[data-theme="dia"|"noche"]`. Todas las sombras del navbar cambian a la variante «noche» (sombra dura color pergamino) — ya está en el CSS de la card.
- Móvil (<640px): desaparecen los enlaces inline, aparece la hamburguesa y su `.wz-menu` a pantalla completa con el switch día/noche al pie.
- Avatar: abre `.cf-menu`; cierra al hacer click fuera o al abrir otro menú.
- Accesibilidad: mantener `aria-label="Menú"` en la hamburguesa y `alt` en los logos.

## 6. Checklist de aceptación
- [ ] Login, Wizard y Configuración muestran el mismo header arriba.
- [ ] Logo día/noche cambia con el tema; sombras correctas en ambos temas.
- [ ] Enlaces correctos por plantilla; ítem activo marcado donde aplique.
- [ ] Hamburguesa + menú móvil funcionan bajo 640px.
- [ ] Menú de avatar funciona en Wizard y Configuración.
- [ ] Sin errores en consola; `filter:url(#torn-paper)` se ve (runtime cargado).
- [ ] `_ds_bundle.js`, `_ds_manifest.json` y `_adherence.oxlintrc.json` NO tocados a mano.

## 7. Después de editar
Recompila/valida el sistema (en este entorno: `check_design_system`). Corrige lo que reporte y repite hasta que esté limpio.
