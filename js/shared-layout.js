/**
 * Layout común: header, fondo del menú, modal de contacto y footer.
 * En servidor estático se cargan fragmentos HTML por fetch; no hay backend.
 * Para poder navegar localmente ejecutar un servidor HTTP (no file://).
 */
(async () => {
  'use strict';

  const fragments = [
    ['shared-header', '/fragments/header.html'],
    ['shared-backdrop', '/fragments/nav-backdrop.html'],
    ['shared-contact', '/fragments/contact-modal.html'],
    ['shared-footer', '/fragments/footer.html'],
  ];

  try {
    const contents = await Promise.all(
      fragments.map(async ([, path]) => {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${path}`);
        return response.text();
      }),
    );

    fragments.forEach(([id], index) => {
      const host = document.getElementById(id);
      if (host) host.innerHTML = contents[index];
    });

    // Marcar la página activa en la navegación.
    const current = document.body.dataset.page;
    const currentHref = current === 'inicio' ? '/' : `/${current}.html`;
    document.querySelectorAll('.site-nav a[aria-current]').forEach(a => a.removeAttribute('aria-current'));
    document.querySelector(`.site-nav a[href="${currentHref}"]`)?.setAttribute('aria-current', 'page');

    await Promise.all([loadScript('/js/navigation.js'), loadScript('/js/contact.js')]);
  } catch (error) {
    console.error('No se pudieron cargar componentes compartidos:', error);
    for (const [id] of fragments) {
      const host = document.getElementById(id);
      if (host && !host.childElementCount) {
        host.textContent = 'No se pudo cargar esta parte del sitio. Actualiza la página.';
      }
    }
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }
})();
