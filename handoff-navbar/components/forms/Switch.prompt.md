**Switch** — a small binary on/off control for settings rows. For a day/night theme toggle use `DayNightSwitch` instead.

```jsx
const [on, setOn] = React.useState(true);
<Switch checked={on} onChange={setOn} />
```

Controlled (`checked` + `onChange`) or uncontrolled (`defaultChecked`). Keyboard-operable (Space/Enter). Needs the Línea SVG filters in the document.
