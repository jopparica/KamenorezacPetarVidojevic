/* ==========================================================
   Katalog – kartice se prave iz ove liste.
   Za svaku grupu podesite "count" (koliko slika imate).
   Slike: images/<prefix><broj>.jpg  →  g1.jpg, st1.jpg, o1.jpg ...
   Spomenici imaju poseban naziv: s (1).jpg, s (2).jpg, ... (vidi "file")
   ========================================================== */
(function () {
  const IMG_DIR = 'images/';
  const EXT = '.jpg';

  const GROUPS = [
    { key: 'spomenici', label: 'Spomenici',       single: 'Spomenik',       prefix: 's',  count: 161, file: i => 's (' + i + ')', note: 'Montaža i put uračunati u cenu.' },
    { key: 'grobnice',  label: 'Grobnice',        single: 'Grobnica',       prefix: 'g',  count: 42 },
    { key: 'stolovi',   label: 'Stolovi',         single: 'Sto',            prefix: 'st', count: 7 },
    { key: 'ograde',    label: 'Ograde',          single: 'Ograda',         prefix: 'o',  count: 10 }
  ];

  const filters = document.getElementById('catalog-filters');
  const grid = document.getElementById('catalog-grid');

  /* ---- dugmad za filter ---- */
  const makeBtn = (key, text, active) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'filter-btn' + (active ? ' is-active' : '');
    b.dataset.filter = key;
    b.setAttribute('aria-pressed', String(active));
    b.textContent = text;
    return b;
  };
  filters.appendChild(makeBtn('all', 'Sve', true));
  GROUPS.forEach(g => filters.appendChild(makeBtn(g.key, g.label, false)));

  /* ---- kartice ---- */
  GROUPS.forEach(g => {
    for (let i = 1; i <= g.count; i++) {
      const card = document.createElement('article');
      card.className = 'card catalog-card';
      card.dataset.cat = g.key;

      const media = document.createElement('div');
      media.className = 'stone-ph';

      const img = document.createElement('img');
      img.src = encodeURI(IMG_DIR + (g.file ? g.file(i) : g.prefix + i) + EXT);
      img.alt = g.single + ' ' + i;
      img.loading = 'lazy';
      img.decoding = 'async';
      // slika ne postoji (npr. count je veći od broja slika) → ukloni karticu
      img.addEventListener('error', () => card.remove());
      media.appendChild(img);

      const body = document.createElement('div');
      body.className = 'catalog-card__body';
      body.innerHTML =
        '<span class="catalog-card__cat">' + g.label + '</span>' +
        '<h3 class="catalog-card__title">' + g.single + ' ' + i + '</h3>' +
        (g.note ? '<p class="catalog-card__note">' + g.note + '</p>' : '');

      card.append(media, body);
      grid.appendChild(card);
    }
  });

  /* ---- filtriranje ---- */
  const buttons = filters.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    buttons.forEach(b => {
      const on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    grid.querySelectorAll('.catalog-card').forEach(c => {
      c.hidden = !(f === 'all' || c.dataset.cat === f);
    });
  }));
})();