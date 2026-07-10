**Button** — the primary call-to-action in the line-art kit; use it anywhere the user commits an action. Labels are UPPERCASE display serif.

```jsx
<Button variant="primary" onClick={save}>Guardar</Button>
<Button variant="ghost" icon={<svg className="icon s" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>}>Añadir</Button>
<Button variant="disabled">No disponible</Button>
```

Variants: `primary` (filled forest/amber accent with a raised lip), `ghost` (paper fill + stroke), `pressed` (inset, for a held state), `disabled` (dashed outline). Pass `icon` for a leading glyph. Requires the Línea SVG filters in the document (include `linea-runtime.js`).
