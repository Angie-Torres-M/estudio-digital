# Estudio Digital · Control de calidad de refactorización

## Verificaciones realizadas

- Un solo `index.html` en todo el árbol.
- Páginas `negocios.html`, `eventos.html`, `aprender.html` y `preguntas.html` presentes.
- Fragmentos `header.html`, `footer.html`, `nav-backdrop.html` y `contact-modal.html` presentes.
- Las cinco páginas preservan las secciones y el contenido de la fuente `estudio-digital.zip`.
- Rutas locales `src` y `href` resuelven a archivos incluidos en el proyecto.
- JavaScript sin errores sintácticos usando `node --check`.
- Portafolio publicado actualizado a `https://angie-torres-m.github.io/MiPortafolio/`.
- CSS desglosado por responsabilidades y páginas y sintaxis de hojas parseada.

## No verificado automáticamente

- Render y comportamiento visual de todas las páginas en navegador: la navegación a servidores locales y dominios de pruebas fue bloqueada en el entorno de ejecución.
- Envíos reales de EmailJS: permanece pendiente de configuración y pruebas con credenciales propias.
- Disponibilidad de URLs públicas externas en el momento de hacer clic.
- Redirects de Cloudflare Pages: `python -m http.server` no los interpreta.

## Prueba manual recomendada

1. Levantar `python -m http.server 5500` desde la carpeta raíz.
2. Visitar `/`, `/negocios.html`, `/eventos.html`, `/aprender.html` y `/preguntas.html`.
3. Comprobar que header/footer se insertan y funcionan menús móviles.
4. Validar en anchos 320, 390, 768, 1024 y 1440 px y comprobar consola del navegador.
5. Comprobar botones, modal de contacto, Gmail web y enlaces externos.
6. Revisar las capturas de Maíz Fundido en Trabajo seleccionado y el favicon de Chewie.
