/* ── Lector de libro ──
   Genérico: cualquier botón con data-lector="ruta/al/cuento.json" abre el lector.
   El JSON trae titulo, protagonista, edad, subtitulo y paginas[]
   ({ tipo: portada|texto|fin, imagen, texto }); las imágenes van relativas al JSON.
   La narración aún no está disponible: el play sale desactivado con «No disponible».
   Cada palabra va ya en su <span> (clase .leida = ámbar) para cuando haya audio. */
(function () {
  var ICON_HOME = '<svg viewBox="0 0 24 24"><path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h4.5v-5.5h3V20H18V9.5"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
  var ICON_PLAY = '<svg class="ic-play" viewBox="0 0 24 24"><path d="M8 5.2l11 6.8-11 6.8z"/></svg>';

  var cache = {};
  var dlg, el = {}, cuento, imgs;
  var st = { pag: 0, navOpen: false };

  // filtro #rough del trazo «a mano», por si la página no lo trae
  function asegurarFiltro() {
    if (document.getElementById('rough')) return;
    var d = document.createElement('div');
    d.innerHTML = '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>' +
      '<filter id="rough" x="-6%" y="-6%" width="112%" height="112%">' +
      '<feTurbulence type="fractalNoise" baseFrequency="0.018 0.022" numOctaves="2" seed="3" result="n"/>' +
      '<feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter></defs></svg>';
    document.body.insertBefore(d.firstChild, document.body.firstChild);
  }

  function montar() {
    dlg = document.createElement('dialog');
    dlg.className = 'lector';
    dlg.setAttribute('aria-label', 'Lector de cuentos');
    dlg.innerHTML =
      '<div class="lr-ilus"></div>' +
      '<div class="lr-pill"></div>' +
      '<div class="lr-nav" id="lrNav">' +
        '<h2 class="lr-titulo"></h2>' +
        '<span class="lr-etiqueta"></span>' +
        '<button class="lr-btn lr-home" type="button" aria-label="Volver">' + ICON_HOME + '</button>' +
      '</div>' +
      '<button class="lr-btn lr-burger" type="button" aria-label="Menú" aria-expanded="false" aria-controls="lrNav"><span><i></i><i></i><i></i></span></button>' +
      '<div class="lr-bottom">' +
        '<div class="lr-ctrls">' +
          '<button class="lr-btn lr-prev" type="button" aria-label="Página anterior">' + ICON_PREV + '</button>' +
          '<span class="lr-play-wrap">' +
            '<button class="lr-btn lr-play" type="button" disabled aria-label="Escuchar el cuento (no disponible)">' + ICON_PLAY + '</button>' +
            '<span class="lr-play-tag" aria-hidden="true">No disponible</span>' +
          '</span>' +
          '<button class="lr-btn lr-next" type="button" aria-label="Página siguiente">' + ICON_NEXT + '</button>' +
        '</div>' +
        '<div class="lr-panel"><div class="lr-scroll">' +
          '<div class="lr-cover"><h1 class="lr-titulo"></h1><span class="lr-sub"></span>' +
            '<div class="lr-meta"><span class="lr-prota"></span><span class="lr-npags"></span></div></div>' +
          '<p class="lr-texto"></p>' +
          '<div class="lr-fin"><h2>Fin</h2><button class="lr-reinicio" type="button">Volver al principio</button></div>' +
        '</div></div>' +
      '</div>';
    document.body.appendChild(dlg);

    ['ilus', 'pill', 'etiqueta', 'burger', 'prev', 'next', 'scroll', 'sub', 'prota', 'npags', 'texto']
      .forEach(function (k) { el[k] = dlg.querySelector('.lr-' + k); });
    el.titulos = dlg.querySelectorAll('.lr-titulo');

    el.burger.addEventListener('click', function () { st.navOpen = !st.navOpen; pintar(); });
    el.prev.addEventListener('click', function () { irA(st.pag - 1); });
    el.next.addEventListener('click', function () { irA(st.pag + 1); });
    // la casa cierra el lector y devuelve a la pantalla de origen (mismo scroll; el foco vuelve al botón «Leer libro»)
    dlg.querySelector('.lr-home').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lr-reinicio').addEventListener('click', function () { irA(0); });

    // Esc (cancel) y cierre: salimos también del historial
    dlg.addEventListener('close', function () {
      if (history.state && history.state.lector) history.back();
    });
    window.addEventListener('popstate', function () { if (dlg.open) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') irA(st.pag - 1);
      else if (e.key === 'ArrowRight') irA(st.pag + 1);
    });
  }

  function cargar(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error('No se pudo cargar ' + url);
        return r.json();
      }).then(function (c) {
        var base = new URL(url, location.href);
        c.paginas.forEach(function (p) { if (p.imagen) p.src = new URL(p.imagen, base).href; });
        return c;
      });
      cache[url].catch(function () { delete cache[url]; });
    }
    return cache[url];
  }

  // todas las ilustraciones en el DOM (solo se alterna display): cambio de página instantáneo
  function prepararCuento(c) {
    cuento = c;
    imgs = {};
    el.ilus.textContent = '';
    c.paginas.forEach(function (p) {
      if (!p.src || imgs[p.src]) return;
      var img = new Image();
      img.src = p.src;
      img.decoding = 'async';
      img.alt = p.tipo === 'portada' ? 'Portada: ' + c.titulo : 'Ilustración de la página';
      el.ilus.appendChild(img);
      imgs[p.src] = img;
    });
    var total = c.paginas.length - 1;
    for (var i = 0; i < el.titulos.length; i++) el.titulos[i].textContent = c.titulo;
    el.sub.textContent = c.subtitulo || '';
    el.prota.textContent = c.protagonista + (c.edad ? ' - ' + c.edad + ' años' : '');
    el.npags.textContent = total + (total === 1 ? ' página' : ' páginas');
    st = { pag: 0, navOpen: false };
    pintarPagina();
  }

  function irA(n) {
    n = Math.max(0, Math.min(cuento.paginas.length - 1, n));
    if (n === st.pag) return;
    st.pag = n;
    pintarPagina();
  }

  // lo que cambia al cambiar de página: imagen, tipo y palabras
  function pintarPagina() {
    var p = cuento.paginas[st.pag];
    for (var k in imgs) imgs[k].classList.toggle('on', k === p.src);
    dlg.dataset.tipo = p.tipo;
    el.texto.textContent = '';
    if (p.tipo === 'texto') {
      (p.texto || '').split(/\s+/).filter(Boolean).forEach(function (w) {
        var s = document.createElement('span');
        s.textContent = w + ' ';
        el.texto.appendChild(s);
      });
    }
    el.scroll.scrollTop = 0;
    pintar();
  }

  function pintar() {
    var p = cuento.paginas[st.pag], total = cuento.paginas.length - 1;
    el.pill.textContent = 'Pág ' + st.pag + '/' + total;
    el.etiqueta.textContent = p.tipo === 'portada' ? 'Portada' : 'Capítulo 1 · pág ' + st.pag + ' de ' + total;
    el.prev.disabled = st.pag === 0;
    el.next.disabled = st.pag === total;
    dlg.classList.toggle('nav-open', st.navOpen);
    el.burger.setAttribute('aria-expanded', String(st.navOpen));
  }

  function abrir(url) {
    if (!dlg) { asegurarFiltro(); montar(); }
    return cargar(url).then(function (c) {
      prepararCuento(c);
      if (!dlg.open) {
        dlg.showModal();
        history.pushState({ lector: true }, '');
      }
      el.next.focus();
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lector]');
    if (!b) return;
    e.preventDefault();
    abrir(b.getAttribute('data-lector')).catch(function (err) { console.error(err); });
  });

  window.Lector = { abrir: abrir };
})();
