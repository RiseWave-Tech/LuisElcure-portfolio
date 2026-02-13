# Portfolio de Luis Elcure

Este proyecto es un portfolio profesional diseñado con **HTML5**, **CSS3** (con variables y Glassmorphism), **Bootstrap 5**, y **JavaScript** puro.

## Estructura de Archivos

- `index.html`: Estructura principal, incluye librerías CDN (Bootstrap, FontAwesome, Masonry, ImagesLoaded).
- `styles.css`: Estilos personalizados, variables de color, utilidades de Glassmorphism, animaciones y dark mode.
- `script.js`: Lógica para el toggle de tema, inicialización de Masonry, parallax y smooth scroll.

## Cómo Ejecutar

1.  **Opción Recomendada (Servidor Local)**:
    Si tienes Node.js o Python instalado, es mejor correrlo en un servidor local para asegurar que todos los scripts carguen correctamente sin bloqueos de CORS.
    *   Con Python: `python -m http.server` en la carpeta del proyecto.
    *   Con VS Code: Usa la extensión "Live Server".

2.  **Opción Directa**:
    Simplemente abre el archivo `index.html` en tu navegador web moderno (Chrome, Firefox, Edge).

## Personalización

El sistema de diseño está centralizado en variables CSS en `styles.css`.

### Colores
Puedes cambiar fácilmente la paleta de colores editando las variables `:root`:

```css
:root {
    --primary: #D93025;   /* Color de acento principal */
    --bg-color: #F4F1EA;  /* Fondo modo claro */
    --text-color: #1A1A1A; /* Texto modo claro */
}
```

### Grid de Portfolio (Masonry)
Las tarjetas del portfolio utilizan clases de Bootstrap para definir su ancho (`col-md-4`, `col-md-8`) y clases personalizadas para su altura (`card-vertical`, `card-horizontal`, `card-small`).
Para cambiar la distribución, edita el bloque HTML dentro de `<div class="row g-4 masonry-grid">`.

## Créditos y Recursos Usados

- **Bootstrap 5**: Framework CSS.
- **Masonry Layout**: Para la rejilla tipo Pinterest.
- **FontAwesome**: Iconos.
- **Google Fonts (Outfit)**: Tipografía moderna.
