(function () {
  // Monta las plantillas repetidas (switch día/noche, separadores) en sus huecos.
  // El switch vive en el navbar (ya en el DOM), pero los separadores están
  // dentro de <main>, que el navegador aún no ha parseado en este punto —
  // por eso el montaje de separadores espera a DOMContentLoaded.
  var dnTpl = document.getElementById('tpl-dn-switch');
  document.querySelectorAll('.dn-switch-mount').forEach(function (mount) {
    mount.appendChild(dnTpl.content.cloneNode(true));
  });

  document.addEventListener('DOMContentLoaded', function () {
    var divTpl = document.getElementById('tpl-nb-divider');
    document.querySelectorAll('.nb-divider-mount').forEach(function (mount) {
      mount.replaceWith(divTpl.content.cloneNode(true));
    });
    // «Banda separadora»: franja a todo el ancho con el estilo del hero (ver css/site.css).
    // Lo que haya dentro del hueco pasa al interior de la banda (los nodos se mueven,
    // no se copian: conservan clases y observadores ya enganchados por site.js).
    var bandTpl = document.getElementById('tpl-banda-separadora');
    if (bandTpl) document.querySelectorAll('.banda-separadora-mount').forEach(function (mount) {
      var band = bandTpl.content.firstElementChild.cloneNode(true);
      var body = band.querySelector('.banda-separadora-body');
      while (mount.firstChild) body.appendChild(mount.firstChild);
      if (!body.children.length) band.setAttribute('aria-hidden', 'true');
      mount.replaceWith(band);
    });
  });
})();

(function () {
  var navWrap = document.querySelector('.navbar-wrap');
  var navInner = document.querySelector('.wz-nav-inner');
  var burger = document.getElementById('wzBurger');
  var menu = document.getElementById('wzMenu');
  var root = document.documentElement;

  function setNavH() {
    root.style.setProperty('--navh', navWrap.offsetHeight + 'px');
  }

  function close() {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  }
  function toggle() {
    if (!burger || !menu) return;
    var open = burger.getAttribute('aria-expanded') === 'true';
    if (open) close();
    else { burger.setAttribute('aria-expanded', 'true'); menu.classList.add('open'); }
  }

  // El modo compacto (hamburguesa) se decide midiendo si la barra desborda
  // en una sola línea, no por un ancho de viewport fijo: el punto real
  // donde deja de caber depende de la tipografía cargada (font-display:
  // swap), el idioma y el zoom del usuario — un breakpoint fijo se queda
  // corto en esos casos y la barra rompe a dos líneas.
  // En tablet y móvil (≤960px, el mismo corte que el resto de la web) la
  // hamburguesa va siempre, quepa o no la barra.
  var tabletMq = window.matchMedia('(max-width: 960px)');
  function checkCompact() {
    root.classList.remove('is-compact');
    var compact = tabletMq.matches || navInner.scrollWidth > navInner.clientWidth + 1;
    root.classList.toggle('is-compact', compact);
    setNavH();
    if (!compact) close();
  }

  checkCompact();

  var raf = null;
  function scheduleCheck() {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(checkCompact);
  }
  window.addEventListener('resize', scheduleCheck);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleCheck);
    document.fonts.addEventListener('loadingdone', scheduleCheck);
  }

  if (burger && menu) {
    burger.addEventListener('click', function (e) { e.stopPropagation(); toggle(); });
    // cierra al elegir un enlace o botón del menú, pero no al tocar el switch
    menu.querySelectorAll('a, button.cf-menu-item').forEach(function (el) { el.addEventListener('click', close); });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#wzMenu') && !e.target.closest('#wzBurger')) close();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
})();
