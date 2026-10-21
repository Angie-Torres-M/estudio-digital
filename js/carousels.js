(function(){
  const ready = (fn) => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  };

  function itemsPerView(carousel) {
    const mobile = Number(carousel.dataset.carouselItemsMobile || 2);
    const desktop = Number(carousel.dataset.carouselItemsDesktop || 4);
    return window.matchMedia('(max-width: 760px)').matches ? mobile : desktop;
  }

  function stepSize(track) {
    const first = track.querySelector('.carousel-card');
    if (!first) return 0;
    const styles = window.getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return first.getBoundingClientRect().width + gap;
  }

  function totalPages(track, perView) {
    const cards = track.querySelectorAll('.carousel-card').length;
    return Math.max(1, Math.ceil(cards / perView));
  }

  ready(() => {
    document.querySelectorAll('[data-carousel]').forEach((carousel) => {
      const track = carousel.querySelector('[data-carousel-track]');
      const prev = carousel.querySelector('[data-carousel-prev]');
      const next = carousel.querySelector('[data-carousel-next]');
      const status = carousel.querySelector('[data-carousel-status]');
      if (!track || !prev || !next || !status) return;

      let scrolling = false;

      const update = () => {
        const perView = itemsPerView(carousel);
        track.style.setProperty('--items-per-view', String(perView));
        const step = stepSize(track) || 1;
        const page = Math.round(track.scrollLeft / (step * perView)) + 1;
        const pages = totalPages(track, perView);
        const clampedPage = Math.min(pages, Math.max(1, page));
        status.textContent = `${clampedPage} / ${pages}`;
        prev.disabled = clampedPage <= 1;
        next.disabled = clampedPage >= pages;
      };

      const scrollByPage = (direction) => {
        if (scrolling) return;
        const perView = itemsPerView(carousel);
        const step = stepSize(track);
        if (!step) return;
        scrolling = true;
        track.scrollBy({ left: direction * step * perView, behavior: 'smooth' });
        window.setTimeout(() => { scrolling = false; update(); }, 380);
      };

      prev.addEventListener('click', () => scrollByPage(-1));
      next.addEventListener('click', () => scrollByPage(1));
      track.addEventListener('scroll', () => window.requestAnimationFrame(update), { passive: true });
      window.addEventListener('resize', update);
      update();
    });
  });
})();
