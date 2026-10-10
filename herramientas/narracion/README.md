# Narración de cuentos (palabras que se iluminan)

El lector (`js/lector.js`) lee el cuento en voz alta y pinta en ámbar cada palabra cuando
el narrador la dice. Para eso el `cuento.json` necesita:

- `"audio"`: ruta al mp3, relativa al JSON.
- `"tiempos"` en cada página de texto: el segundo en que empieza cada palabra
  (una cifra por palabra, cortando el texto por espacios).

Estos dos scripts lo generan a partir del mp3.

## Preparación (una sola vez)

```bash
python3 -m venv ~/venv-narracion
~/venv-narracion/bin/pip install faster-whisper
```

La primera vez descarga el modelo de voz (~1,5 GB).

## Para cada libro nuevo

```bash
# 1 · transcribir (unos minutos; imprime lo que ha entendido, con tiempos)
~/venv-narracion/bin/python herramientas/narracion/transcribir.py \
  imagenes/Audios_libros/Libro_X.mp3 /tmp/palabras.json

# 2 · alinear con el texto y escribir en el JSON
python3 herramientas/narracion/alinear.py \
  cuentos/x/cuento.json /tmp/palabras.json ../../imagenes/Audios_libros/Libro_X.mp3
```

`alinear.py` avisa de las palabras que no ha podido emparejar (guiones, «…», onomatopeyas).
Si alguna queda mal, se corrige a mano su número en `tiempos`.

## Cosas a tener en cuenta

- Si el texto del JSON cambia, hay que repetir el paso 2 (el paso 1 solo si cambia el audio).
- La portada arranca en el segundo 0, así que el narrador puede leer el título al principio.
- Para probar en local hace falta un servidor que admita peticiones Range (Live Server
  de VS Code sí; `python -m http.server` no). Sin eso no funciona el salto al cambiar de página.
