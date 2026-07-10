**Stepper** — shows progress through a sequence (checkout, onboarding). Completed steps get an amber tick, the active step is highlighted.

```jsx
<Stepper current={2} steps={[
  { label: 'Cuenta' }, { label: 'Perfil' }, { label: 'Pago' }, { label: 'Listo' },
]} />
```

Needs the Línea SVG filters.
