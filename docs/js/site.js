(function () {
  const layout = document.querySelector('.layout');
  const sidebar = document.querySelector('nav.sidebar');
  if (!layout || !sidebar) return;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'nav-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'site-sidebar');
  toggle.innerHTML = '<span class="nav-toggle-label">Menu</span>';
  sidebar.id = 'site-sidebar';
  layout.insertBefore(toggle, sidebar);

  function setOpen(open) {
    layout.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.querySelector('.nav-toggle-label').textContent = open ? 'Close' : 'Menu';
  }

  toggle.addEventListener('click', function () {
    setOpen(!layout.classList.contains('nav-open'));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && layout.classList.contains('nav-open')) setOpen(false);
  });

  sidebar.querySelectorAll('a[href]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.matchMedia('(max-width: 768px)').matches) setOpen(false);
    });
  });

  const anchorLinks = document.querySelectorAll('nav.sidebar a[href^="#"]');
  const sections = [...anchorLinks]
    .map(function (a) {
      const id = a.getAttribute('href');
      return id ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length < 2) return;

  function updateActive() {
    let current = sections[0].id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 100) current = section.id;
    }
    anchorLinks.forEach(function (a) {
      const href = a.getAttribute('href').slice(1);
      const isActive = href === current;
      a.classList.toggle('active', isActive);
      if (isActive) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
