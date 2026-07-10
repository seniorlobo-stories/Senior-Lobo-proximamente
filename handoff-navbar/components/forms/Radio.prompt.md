**Radio / RadioGroup** — mutually-exclusive choice. Prefer `RadioGroup` for the common case; use bare `Radio` only when laying options out yourself.

```jsx
<RadioGroup
  defaultValue="a"
  options={[{ value: 'a', label: 'Opción A' }, { value: 'b', label: 'Opción B' }]}
  onChange={setChoice}
/>
```

The dot fills with the accent when selected.
