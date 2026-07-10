**TextField** — the standard labeled text input. Use for any single-line entry; pass `state="error"` with a `helper` message for validation.

```jsx
<TextField label="Correo" placeholder="hola@probatia.com" helper="Te enviaremos un código" />
<TextField label="Contraseña" type="password" state="error" helper="Mínimo 8 caracteres" />
```

The input sits inside a `.input-wrap` that carries the hand-drawn stroke; focus shows a forest halo, error turns the stroke and helper warm. Needs the Línea SVG filters in the document.
