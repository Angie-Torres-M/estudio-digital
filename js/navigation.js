/* Navegación ligera y accesible. No usa dependencias ni inyecta HTML. */
(() => {
  'use strict';
  const trigger = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const backdrop = document.querySelector('[data-nav-backdrop]');
  if (!trigger || !nav || !backdrop) return;
  const mobile = window.matchMedia('(max-width: 860px)');
  const servicesToggle = nav.querySelector('[data-services-toggle]');
  const servicesGroup = nav.querySelector('.nav-service-group');
  const setServices = (expanded) => {
    if (!servicesToggle || !servicesGroup) return;
    servicesToggle.setAttribute('aria-expanded', String(expanded));
    servicesGroup.classList.toggle('is-expanded', expanded);
  };
  servicesToggle?.addEventListener('click', () => setServices(servicesToggle.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('click', event => {
    if (servicesGroup && !servicesGroup.contains(event.target)) setServices(false);
  });

  const close = (restoreFocus = false) => {
    const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
    setServices(false);
    nav.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    trigger.setAttribute('aria-label', 'Abrir menú de navegación');
    document.body.classList.remove('menu-open');
    if (restoreFocus && wasOpen) trigger.focus();
  };

  const open = () => {
    nav.classList.add('is-open');
    backdrop.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    trigger.setAttribute('aria-label', 'Cerrar menú de navegación');
    document.body.classList.add('menu-open');
    nav.querySelector('a')?.focus();
  };

  trigger.addEventListener('click', () => {
    if (trigger.getAttribute('aria-expanded') === 'true') close(true);
    else open();
  });
  backdrop.addEventListener('click', () => close(true));
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => close(false)));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && servicesToggle?.getAttribute('aria-expanded') === 'true') { setServices(false); servicesToggle.focus(); return; }
    if (event.key === 'Escape' && trigger.getAttribute('aria-expanded') === 'true') {
      event.preventDefault();
      close(true);
    }
    if (event.key !== 'Tab' || trigger.getAttribute('aria-expanded') !== 'true' || !mobile.matches) return;
    const focusables = [...nav.querySelectorAll('a,button'), trigger];
    const current = focusables.indexOf(document.activeElement);
    if (event.shiftKey && (current === 0 || current === -1)) {
      event.preventDefault(); trigger.focus();
    } else if (!event.shiftKey && (document.activeElement === trigger || current === focusables.length - 2)) {
      event.preventDefault();
      if (document.activeElement === trigger) nav.querySelector('a')?.focus();
      else trigger.focus();
    }
  });
  mobile.addEventListener('change', () => close(false));
})();
