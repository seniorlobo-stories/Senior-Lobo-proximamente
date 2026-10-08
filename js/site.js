(function () {
  // Dos instancias del switch conviven en el navbar universal: la píldora
  // de escritorio (.dn-desktop) y el círculo suelto del menú móvil
  // (.wz-menu-dn). Ambas deben quedar sincronizadas y ser clicables.
  var switches = document.querySelectorAll('.dn-switch');
  var root = document.documentElement;

  var tornEls = document.querySelectorAll('.wz-topbar > .bg, .wz-menu > .bg, .topband, .hero-tear, .age-card > .bg');

  // El bug de repintado de filter:url(#torn-paper/-up/-line) al cambiar
  // background-color por variable CSS solo se da en motores WebKit
  // (Safari / cualquier navegador en iOS). En el resto (Chrome, Firefox,
  // Android...) el forzado de reflow es puro coste extra durante el
  // cambio de tema, así que se aplica solo donde hace falta.
  var needsFilterRepaintFix = /iP(hone|od|ad)/.test(navigator.userAgent) ||
    (/^((?!chrome|android).)*safari/i.test(navigator.userAgent));

  function apply(mode) {
    switches.forEach(function (sw) {
      sw.dataset.mode = mode;
      sw.setAttribute('aria-checked', mode === 'noche');
    });
    root.dataset.theme = mode;
    // Se recuerda entre páginas (Inicio ↔ ¿Qué es Senior Lobo?); el <head> de
    // cada página lo lee antes de pintar para evitar un destello de modo día.
    try { localStorage.setItem('sl-theme', mode); } catch (e) {}

    if (needsFilterRepaintFix) {
      requestAnimationFrame(function () {
        tornEls.forEach(function (el) { el.style.filter = 'none'; });
        void document.body.offsetHeight; // un único reflow forzado, no uno por elemento
        requestAnimationFrame(function () {
          tornEls.forEach(function (el) { el.style.filter = ''; });
        });
      });
    }
  }

  function toggle() {
    apply(switches[0].dataset.mode === 'dia' ? 'noche' : 'dia');
  }

  apply(root.dataset.theme === 'noche' ? 'noche' : 'dia');

  switches.forEach(function (sw) {
    sw.addEventListener('click', toggle);
    sw.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
    });
  });
})();

(function () {
  var marks = document.querySelectorAll('strong:not(.hero *), b:not(:empty):not(.hero *)');
  if (!marks.length) return;

  if (!('IntersectionObserver' in window)) {
    marks.forEach(function (el) { el.classList.add('in-view'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    });
  }, { threshold: 0, rootMargin: '0px 0px -45% 0px' });

  marks.forEach(function (el) { observer.observe(el); });
})();

// ── Modal: Iniciar sesión / Registrar ──
(function () {
  var overlay = document.getElementById('lgOverlay');
  var modal = document.getElementById('lgModal');
  if (!overlay || !modal) return;

  var lastFocus = null;
  var lockedScrollY = 0;

  // iOS Safari no bloquea el scroll táctil del body solo con overflow:hidden;
  // al hacer scroll de fondo la barra de direcciones se colapsa/expande y el
  // modal (dimensionado con el alto de viewport previo) deja ver la página
  // por debajo. Fijar el body en su posición actual evita ese scroll de fondo.
  function lockBodyScroll() {
    lockedScrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = -lockedScrollY + 'px';
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
  }

  function unlockBodyScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, lockedScrollY);
  }

  function openModal(mode) {
    modal.dataset.mode = mode === 'register' ? 'register' : 'login';
    overlay.classList.add('lg-open');
    lockBodyScroll();
    lastFocus = document.activeElement;
    requestAnimationFrame(function () {
      var closeBtn = modal.querySelector('.lg-close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function closeModal() {
    overlay.classList.remove('lg-open');
    unlockBodyScroll();
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  document.querySelectorAll('.wz-login').forEach(function (btn) {
    btn.addEventListener('click', function () { openModal('login'); });
  });

  overlay.querySelectorAll('[data-lg-close]').forEach(function (el) {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('lg-open')) closeModal();
  });

  document.querySelectorAll('.lg-go-register').forEach(function (btn) {
    btn.addEventListener('click', function () { modal.dataset.mode = 'register'; });
  });
  document.querySelectorAll('.lg-go-login').forEach(function (btn) {
    btn.addEventListener('click', function () { modal.dataset.mode = 'login'; });
  });

  function wireCheck(id) {
    var btn = document.getElementById(id);
    if (!btn) return;
    btn.addEventListener('click', function () {
      btn.classList.toggle('on');
      validate();
    });
  }
  wireCheck('lgRemember');
  wireCheck('lgAccept');

  function isEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  var email = document.getElementById('lgEmail');
  var pwd = document.getElementById('lgPwd');
  var submitLogin = document.getElementById('lgSubmitLogin');
  var name = document.getElementById('lgName');
  var regEmail = document.getElementById('lgRegEmail');
  var accept = document.getElementById('lgAccept');
  var submitRegister = document.getElementById('lgSubmitRegister');

  function validate() {
    if (submitLogin) submitLogin.disabled = !(isEmail(email.value) && pwd.value.length > 0);
    // registro aún cerrado («Próximamente»): «Solicitar registro» siempre desactivado
    if (submitRegister) submitRegister.disabled = true;
  }

  [email, pwd, name, regEmail].forEach(function (input) {
    if (input) input.addEventListener('input', validate);
  });
  validate();

  // Sin backend todavía: los envíos no hacen nada real, solo evitan el
  // submit por defecto. Conectar aquí a la lógica de autenticación real.
  if (submitLogin) submitLogin.addEventListener('click', function () {});
  if (submitRegister) submitRegister.addEventListener('click', function () {});
})();

// ── Tarjetas por edad: chincheta + tarjeta que se posa al entrar en pantalla ──
// (también el collage de portadas del Capítulo II y la fila del Capítulo III,
// que usan las mismas piezas)
(function () {
  var grids = document.querySelectorAll('.ages-grid, .pin-collage, .pin-row, .pin-shots');
  if (!grids.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var items = document.querySelectorAll('.ages-grid .age-item, .pin-collage .age-item, .pin-row .age-item, .pin-shots .age-item');
  grids.forEach(function (grid) { grid.classList.add('pin-ready'); });

  // Las tarjetas que entran a la vez (las tres en escritorio) se escalonan
  // según su orden; en móvil, en columna, cada una entra sola sin retardo.
  var observer = new IntersectionObserver(function (entries) {
    var i = 0;
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.style.setProperty('--i', i++);
      entry.target.classList.add('pinned');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  items.forEach(function (el) { observer.observe(el); });
})();

// ── Títulos de capítulo: escritura a máquina al entrar en pantalla ──
// Norma del sitio: todo «Capítulo N: título» se escribe letra a letra.
(function () {
  var titles = document.querySelectorAll('.chapter-title');
  if (!titles.length || !('IntersectionObserver' in window)) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Cada letra va en su propio span, oculto pero ocupando su sitio: el título
  // no cambia de ancho mientras se escribe y no mueve nada a su alrededor.
  function prepare(title) {
    var text = title.textContent;
    title.setAttribute('aria-label', text);
    title.textContent = '';
    var chars = Array.prototype.map.call(text, function (ch) {
      var span = document.createElement('span');
      span.className = 'tw-char';
      span.setAttribute('aria-hidden', 'true');
      span.textContent = ch;
      title.appendChild(span);
      return span;
    });
    var caret = document.createElement('span');
    caret.className = 'tw-caret';
    caret.setAttribute('aria-hidden', 'true');
    title.insertBefore(caret, title.firstChild);
    title.classList.add('tw-ready');
    return { title: title, chars: chars, caret: caret };
  }

  function type(t, i) {
    if (i >= t.chars.length) {
      setTimeout(function () { t.title.classList.add('tw-done'); }, 1600);
      return;
    }
    t.chars[i].classList.add('on');
    t.title.insertBefore(t.caret, t.chars[i].nextSibling);
    // Ritmo irregular, como una máquina de verdad; pausa algo más en los espacios.
    var delay = 55 + Math.random() * 70 + (t.chars[i].textContent === ' ' ? 120 : 0);
    setTimeout(function () { type(t, i + 1); }, delay);
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      var t = entry.target._tw;
      setTimeout(function () { type(t, 0); }, 350);
    });
  }, { threshold: 0.6 });

  Array.prototype.forEach.call(titles, function (title) {
    title._tw = prepare(title);
    observer.observe(title);
  });
})();

// ── Capturas del Prólogo: se abren a pantalla completa en un <dialog> ──
// Cerrar: botón ×, clic fuera de la imagen o Esc (lo gestiona el propio <dialog>).
(function () {
  var lb = document.getElementById('shotLb');
  if (!lb || typeof lb.showModal !== 'function') return;
  var img = lb.querySelector('.shot-lb-img');

  document.querySelectorAll('.shot-open').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.querySelector('img');
      img.src = src.currentSrc || src.src;
      img.alt = src.alt;
      lb.showModal();
    });
  });

  lb.querySelector('[data-shot-close]').addEventListener('click', function () { lb.close(); });
  // el <dialog> solo ocupa lo que la imagen: un clic sobre él que no cae en la imagen es el fondo
  lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
})();
