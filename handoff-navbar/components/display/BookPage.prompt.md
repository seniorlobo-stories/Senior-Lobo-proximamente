**BookPage** — the storybook "page" layout for any text-with-paragraphs content (the "Capítulo 1" block). Wrap prose in it for the justified serif, drop cap, floating illustration slot and ornament dividers.

```jsx
<BookPage
  chapter="Capítulo I"
  title="¿Qué es Senior Lobo?"
  figure={<BookFigure slot="ilustración del capítulo" caption="Una estampa para cada cuento" />}
>
  <BookParagraph lead>
    En <span className="sl">Senior Lobo</span> escribimos cuentos personalizados…
  </BookParagraph>
  <BookParagraph>
    Creemos en la necesidad de contar historias que <span className="hl">reduzcan miedos</span>…
  </BookParagraph>
  <BookDivider />
  <BookParagraph lead>Sin necesidad de ponerse en la piel de Pepita o Jaimito…</BookParagraph>
</BookPage>
```

`BookFigure` floats right by default so prose wraps around it — pass `src` for a real image or leave it for the striped placeholder. Use `lead` on the first paragraph for the drop cap, `<span className="hl">` for accent highlights and `<span className="sl">` for inline small-caps. Needs the Línea SVG filters.
