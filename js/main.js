(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  const openBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('menu-close');
  const panel = document.getElementById('menu-panel');

  function setMenu(open) {
    panel.classList.toggle('open', open);
    openBtn.setAttribute('aria-expanded', String(open));
    panel.setAttribute('aria-hidden', String(!open));
    if (open) closeBtn.focus(); else openBtn.focus({ preventScroll: true });
  }

  openBtn.addEventListener('click', () => setMenu(true));
  closeBtn.addEventListener('click', () => setMenu(false));

  // Zatvori meni nakon klika na link (skrol je glatak preko CSS-a)
  panel.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    panel.classList.remove('open');
    openBtn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('aria-hidden', 'true');
  }));

  // Esc zatvara meni
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && panel.classList.contains('open')) setMenu(false);
  });

  // Klik van menija ga zatvara
  document.addEventListener('click', e => {
    if (panel.classList.contains('open') && !panel.contains(e.target) && !openBtn.contains(e.target)) {
      setMenu(false);
    }
  });
})();