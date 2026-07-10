**Dialog** — a confirmation / decision modal. Presentational only; manage the overlay and open state yourself. Inside the dialog the Confirm button matches Cancel's shadow (flat, no raised lip).

```jsx
<Dialog
  title="¿Eliminar capa?"
  confirmLabel="Eliminar"
  onConfirm={remove}
  onCancel={close}
>
  Esta acción no se puede deshacer.
</Dialog>
```

Composes `Button`. Needs the Línea SVG filters.
