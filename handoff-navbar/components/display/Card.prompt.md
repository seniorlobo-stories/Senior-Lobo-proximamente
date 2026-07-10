**Card** — the workhorse content container (article preview, feature, media tile).

```jsx
<Card media={null} title="Trazo a mano" more="Read More" onMore={open}>
  Cada contorno se dibuja con una capa filtrada para simular tinta sobre papel.
</Card>
```

Pass `media={null}` for the default striped placeholder, a custom node for real imagery, or omit `media` for a text-only card. Needs the Línea SVG filters.
