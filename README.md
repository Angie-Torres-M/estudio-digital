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
