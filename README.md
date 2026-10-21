# Angie Torres · Estudio Digital

## Arquitectura refactorizada

Sitio estático con **un solo `index.html`**, cuatro páginas con nombres propios y fragmentos compartidos. Conserva el contenido, las imágenes y las secciones de la versión entregada en `estudio-digital.zip`.

```text
estudio-digital/
├── index.html
├── negocios.html
├── eventos.html
├── aprender.html
├── preguntas.html
├── fragments/
│   ├── header.html
│   ├── nav-backdrop.html
│   ├── contact-modal.html
│   └── footer.html
├── css/
│   ├── tokens.css
│   ├── global.css
│   ├── components.css
│   ├── chewie-v13.css
│   ├── visual-refresh-v14.css
│   ├── restore-v16.css
│   └── pages/
│       ├── inicio.css
│       ├── negocios.css
│       ├── eventos.css
│       ├── aprender.css
│       └── preguntas.css
├── js/
│   ├── shared-layout.js
│   ├── navigation.js
│   ├── contact.js
│   └── emailjs-config.js
├── assets/
└── _redirects
```

## Ejecutar localmente

Desde esta carpeta:

```bash
python -m http.server 5500
```

Abrir `http://localhost:5500/`. **No abrir `index.html` directamente**: el navegador necesita HTTP para obtener los fragmentos compartidos.

## Rutas

- Inicio: `/`
- Negocios: `/negocios.html`
- Eventos: `/eventos.html`
- Aprender: `/aprender.html`
- Preguntas: `/preguntas.html`

`_redirects` permite conservar rutas anteriores `/negocios/` etc. en Cloudflare Pages; el servidor Python de desarrollo no interpreta `_redirects`.

## Enlaces y correo

El portafolio publicado es `https://angie-torres-m.github.io/MiPortafolio/` y GitHub es `https://github.com/Angie-Torres-M`.

El contacto por Gmail web está disponible; EmailJS **no está activado** hasta configurar sus claves públicas en `js/emailjs-config.js`. No subir contraseñas ni secretos.

## CSS

Los estilos están formateados en declaraciones legibles. La cascada común se mantiene en `tokens.css`, `global.css`, `components.css` y las capas de compatibilidad (`chewie-v13.css`, `visual-refresh-v14.css`, `restore-v16.css`). Las hojas por página están separadas y preparadas para los futuros ajustes puntuales sin afectar las demás vistas. Las reglas `@media` se mantienen al final de cada hoja cuando ya se encontraban allí; revisar consolidación posterior antes de eliminar capas históricas.

## Seguridad operativa

Este ZIP es un proyecto completo nuevo; **no sobrescribir** la carpeta actual sin respaldo. No hay push, commit ni despliegue.


## GitHub Pages — ubicación en subcarpeta

Este sitio funciona tanto desde una carpeta raíz local (`http://localhost:5500/`)
como desde GitHub Pages bajo el prefijo `/estudio-digital/`. Para eso todas las
rutas internas en HTML y los fragmentos usan direcciones relativas (`./`).
No cambies estas rutas por `/css/`, `/assets/`, `/js/` o `/fragments/`, porque
en GitHub Pages apuntarían a la raíz del dominio y causarían errores 404.

Páginas publicables:
- `/estudio-digital/` — Inicio.
- `/estudio-digital/negocios.html` — Negocios.
- `/estudio-digital/eventos.html` — Eventos.
- `/estudio-digital/aprender.html` — Aprender.
- `/estudio-digital/preguntas.html` — Preguntas.

El archivo `_redirects` es para Cloudflare Pages, no para GitHub Pages. Enlaces
internos usan directamente los archivos `.html`.

Se incluye `.nojekyll` para servir el contenido estático sin procesarlo con Jekyll.


## V2.3 · Ajustes UX/UI en `develop` (pendientes de publicación)

- Header fijo, ocultación al bajar y reaparición al subir; el enlace **Hablemos** abre el diálogo de contacto.
- Selección de interés para redactar un correo por Gmail web, incluida **consulta de disponibilidad**. Esta consulta **no comprueba cupos o agenda en tiempo real**.
- Inicio: sección FAQ más compacta y semblanza con herramientas de CI/CD y despliegue, presentadas a nivel práctico.
- Negocios: dos demostraciones visuales identificadas como **imágenes generadas con IA**, separadas de los proyectos reales. Idea promocional de 10 llaveros 3D **sin condiciones comerciales confirmadas**.
- Eventos: galería separada con conceptos de invitación/recuerdos generados con IA e inspiraciones externas; la carga colaborativa de fotografías y RSVP automatizado **no están implementados**. Se conserva la galería de productos reales de Maíz Fundido.
- Aprender: galería didáctica de tecnologías y herramientas tentativas con ilustraciones propias (no logotipos oficiales). Su uso está sujeto a confirmación del programa y condiciones de cada servicio.
- No incluye pagos, disponibilidad automatizada, carga de fotos ni envíos directos de EmailJS hasta configurar las credenciales públicas.

**Fuente visual:** `assets/conceptos/` contiene imágenes generadas con IA extraídas del ZIP que proporcionaste. `assets/eventos/` mantiene las fotografías de productos reales previamente aportadas. No intercambiar etiquetas de procedencia.


## Ajustes V2.5 · Capturas reales de Maíz Fundido

- **Inicio:** dos screenshots de la landing (modo claro y oscuro), con enlace al sitio público.
- **Negocios:** portada real del e-commerce y galería con panel de administración,
  catálogo, centro de ayuda y página institucional.
- El e-commerce está en desarrollo: no se presenta como producto comercial concluido.
- Una tienda puede ser administrable, pero módulos como inventario, pedidos, pagos,
  promociones, roles e integraciones **no están incluidos automáticamente**:
  se cotizan según alcance, complejidad y presupuesto.
- Imágenes de autoría del proyecto facilitadas por Angie Torres (octubre de 2026).
- Se conservan los carruseles de Eventos, los estilos de Aprender, el contacto y Chewie Dev.
