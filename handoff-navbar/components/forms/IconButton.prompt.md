**IconButton** — a single-glyph tactile button (raised torn-paper chip). Use in toolbars, nav bars, and card corners. Always pass `aria-label`.

```jsx
<IconButton aria-label="Buscar">
  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/></svg>
</IconButton>
<IconButton aria-label="Notificaciones" badge={3}>
  <svg viewBox="0 0 24 24"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8"/></svg>
</IconButton>
```

Needs the Línea SVG filters in the document.
