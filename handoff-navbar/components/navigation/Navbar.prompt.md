**Navbar** — the Señor Lobo brand header. A torn-paper band carrying the owl logo, a slab-serif wordmark with an italic tagline, forest-green slab links (torn underline on hover/active), and right-aligned actions such as the día/noche switch.

```jsx
<Navbar
  brand="Senior Lobo"
  brandTagline="Cuentos personalizados"
  brandLogo="assets/senorlobo-dia.svg"
  links={[{ label: '¿Qué es Senior Lobo?', href: '#quees' }]}
  actions={<DiaNocheSwitch />}
/>
```

Wordmark and links are uppercased in CSS. In `data-theme="noche"` the green shifts to amber. Needs the Línea SVG filters.
