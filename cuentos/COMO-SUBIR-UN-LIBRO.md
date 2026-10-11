# Cómo subir un libro nuevo al lector

No hace falta adjuntar nada en el chat: se dejan los archivos en una carpeta del
proyecto y se le dice la ruta a Claude.

## 1 · Qué preparar

1. **Ilustraciones**: una por página, más la portada.
   - Formato vertical 2:3 (como Lucas: 800×1200).
   - Mejor en `.webp`; si vienen en `.png` o `.jpg`, se convierten.
   - Dos páginas pueden compartir la misma ilustración.
2. **Texto**: lo que va en cada página, en un `.txt` o Word, así:
   ```
   Pág 1 (imagen pag1): Otra noche más sin dormir...
   Pág 2 (imagen pag1): La manta no contestó...
   ```
3. **Audio**: el `.mp3` con la narración completa del libro.
   - Si el narrador lee el título al principio, perfecto: la portada empieza en el segundo 0.
4. **Datos de la ficha**: título, protagonista, edad y subtítulo
   (por ejemplo «Aventuras · Lectura intermedia»).

## 2 · Dónde dejarlo

Una carpeta por libro:

```
cuentos/nombre-del-libro/
    portada.webp
    pag1.webp, pag2.webp...
    texto.docx (o .txt)
imagenes/Audios_libros/Libro_Nombre.mp3
```

## 3 · Qué decirle a Claude

Por ejemplo:

> Nuevo libro en `cuentos/marta/`, audio en `imagenes/Audios_libros/Libro_Marta.mp3`

## 4 · Lo que hace Claude con eso

- Crea el `cuento.json` con las páginas y el texto.
- Saca del mp3 el momento en que se dice cada palabra (para que se iluminen al leer)
  y avisa si alguna no ha cuadrado. Las herramientas están en `herramientas/narracion/`.
- Añade el botón «Leer libro» en la biblioteca.
- Lo prueba en el navegador antes de entregarlo.

## Consejo importante

El texto del libro tiene que coincidir lo más posible con lo que dice el narrador.
Si al grabar se cambia alguna frase, esas palabras se iluminarán peor.
Es mejor ajustar el texto a la grabación final, o la grabación al texto.
