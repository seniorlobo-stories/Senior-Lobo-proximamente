**DayNightSwitch** — the kit's hero control: a día/noche toggle whose knob is the active luminary (sun by day, moon by night). By default it flips `html[data-theme]` so the entire page swaps into the NOCHE palette, and remembers the choice across reloads.

```jsx
// drop-in theme toggle — manages the page theme for you
<DayNightSwitch />

// controlled
const [mode, setMode] = React.useState('dia');
<DayNightSwitch mode={mode} onChange={setMode} syncTheme={false} />
```

Props: `mode`/`defaultMode` (`'dia' | 'noche'`), `onChange`, `syncTheme` (set the page theme, default true), `persist` + `storageKey` (localStorage). Keyboard-operable. Needs the Línea SVG filters in the document.
