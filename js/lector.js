/* ── Lector de libro ──
   Genérico: cualquier botón con data-lector="ruta/al/cuento.json" abre el lector.
   El JSON trae titulo, protagonista, edad, subtitulo y paginas[]
   ({ tipo: portada|texto|fin, imagen, texto }); las imágenes van relativas al JSON.
   Narración: si el JSON trae «audio» (ruta relativa al JSON) y cada página de texto
   trae «tiempos» (segundo en que el narrador empieza cada palabra), el play lee el cuento,
   pinta en ámbar (.leida) las palabras ya dichas y pasa de página solo. Pasar página a mano
   lleva el audio a la primera palabra de esa página. Sin audio: play apagado + «No disponible». */
(function () {
  var ICON_HOME = '<svg viewBox="0 0 24 24"><path d="M3.5 11L12 4l8.5 7"/><path d="M6 9.5V20h4.5v-5.5h3V20H18V9.5"/></svg>';
  var ICON_PREV = '<svg viewBox="0 0 24 24"><path d="M15 5l-7 7 7 7"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>';
  var ICON_PLAY = '<svg class="ic-play" viewBox="0 0 24 24"><path d="M8 5.2l11 6.8-11 6.8z"/></svg>';
  var ICON_PAUSE = '<svg class="ic-pause" viewBox="0 0 24 24"><rect x="6.5" y="5.5" width="3.8" height="13" rx="1"/><rect x="13.7" y="5.5" width="3.8" height="13" rx="1"/></svg>';

  var cache = {};
  var dlg, el = {}, cuento, imgs;
  var st = { pag: 0, navOpen: false };
  var scrollOrigen = 0;
  var audio = null, raf = 0, seekPendiente = null;
  var ADELANTO = 0.12; // al saltar a una página, arrancamos un pelín antes de su primera palabra

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
      '</div>' +
      // la casa va fuera de la nav-bar: siempre visible, al lado de la hamburguesa
      '<button class="lr-btn lr-home" type="button" aria-label="Volver">' + ICON_HOME + '</button>' +
      '<button class="lr-btn lr-burger" type="button" aria-label="Menú" aria-expanded="false" aria-controls="lrNav"><span><i></i><i></i><i></i></span></button>' +
      '<div class="lr-bottom">' +
        '<div class="lr-ctrls">' +
          '<button class="lr-btn lr-prev" type="button" aria-label="Página anterior">' + ICON_PREV + '</button>' +
          '<span class="lr-play-wrap">' +
            '<button class="lr-btn lr-play" type="button" disabled aria-label="Escuchar el cuento (no disponible)">' + ICON_PLAY + ICON_PAUSE + '</button>' +
            '<span class="lr-play-tag" aria-hidden="true">No disponible</span>' +
          '</span>' +
          '<button class="lr-btn lr-next" type="button" aria-label="Página siguiente">' + ICON_NEXT + '</button>' +
        '</div>' +
        '<div class="lr-panel"><div class="lr-scroll">' +
          '<div class="lr-cover"><h1 class="lr-titulo"></h1><span class="lr-sub"></span>' +
            '<div class="lr-meta"><span class="lr-prota"></span><span class="lr-npags"></span></div></div>' +
          '<p class="lr-texto"></p>' +
          '<div class="lr-fin"><h2>Fin</h2><div class="lr-fin-acts">' +
            '<button class="lr-reinicio" type="button">Volver al principio</button>' +
            '<button class="lr-salir" type="button">Cerrar libro</button>' +
          '</div></div>' +
        '</div></div>' +
      '</div>';
    document.body.appendChild(dlg);

    ['ilus', 'pill', 'etiqueta', 'burger', 'prev', 'next', 'play', 'scroll', 'sub', 'prota', 'npags', 'texto']
      .forEach(function (k) { el[k] = dlg.querySelector('.lr-' + k); });
    el.titulos = dlg.querySelectorAll('.lr-titulo');

    el.burger.addEventListener('click', function () { st.navOpen = !st.navOpen; pintar(); });
    el.prev.addEventListener('click', function () { destello(el.prev); irA(st.pag - 1); });
    el.next.addEventListener('click', function () { destello(el.next); irA(st.pag + 1); });
    el.play.addEventListener('click', alternarAudio);
    // la casa cierra el lector y devuelve a la pantalla de origen (mismo scroll; el foco vuelve al botón «Leer libro»)
    dlg.querySelector('.lr-home').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lr-reinicio').addEventListener('click', function () { irA(0); });
    dlg.querySelector('.lr-salir').addEventListener('click', function () { dlg.close(); }); // como la casa: vuelve a la pantalla de origen

    // deslizar el dedo sobre la ilustración pasa página: ← siguiente, → anterior
    var x0 = null, y0 = 0;
    el.ilus.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { x0 = null; return; }
      x0 = e.touches[0].clientX;
      y0 = e.touches[0].clientY;
    }, { passive: true });
    el.ilus.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0;
      x0 = null;
      if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return; // toque o gesto vertical
      irA(st.pag + (dx < 0 ? 1 : -1));
    });
    el.ilus.addEventListener('touchcancel', function () { x0 = null; });

    // Esc (cancel) y cierre: salimos también del historial
    dlg.addEventListener('close', function () {
      if (audio) audio.pause();
      if (history.state && history.state.lector) history.back();
      window.scrollTo(0, scrollOrigen); // de vuelta al mismo punto de la página de origen
    });
    window.addEventListener('popstate', function () { if (dlg.open) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') irA(st.pag - 1);
      else if (e.key === 'ArrowRight') irA(st.pag + 1);
    });
  }

  // la flecha pulsada se queda en ámbar un instante (en móvil :active apenas se ve)
  function destello(b) {
    b.classList.add('pulsado');
    clearTimeout(b._t);
    b._t = setTimeout(function () { b.classList.remove('pulsado'); }, 220);
  }

  function cargar(url) {
    if (!cache[url]) {
      cache[url] = fetch(url).then(function (r) {
        if (!r.ok) throw new Error('No se pudo cargar ' + url);
        return r.json();
      }).then(function (c) {
        var base = new URL(url, location.href);
        c.paginas.forEach(function (p) { if (p.imagen) p.src = new URL(p.imagen, base).href; });
        if (c.audio) c.audioSrc = new URL(c.audio, base).href;
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
    prepararAudio(c);
    pintarPagina();
  }

  // ── Narración ──
  function prepararAudio(c) {
    if (audio && audio._src !== c.audioSrc) { audio.pause(); audio.removeAttribute('src'); audio.load(); audio = null; }
    var hay = !!c.audioSrc;
    el.play.disabled = !hay;
    dlg.classList.toggle('sin-audio', !hay);
    if (!hay) { pintarPlay(); return; }
    if (!audio) {
      audio = new Audio();
      audio.preload = 'metadata';
      audio._src = c.audioSrc;
      audio.src = c.audioSrc;
      audio.addEventListener('play', function () { pintarPlay(); bucle(); });
      audio.addEventListener('pause', function () { cancelAnimationFrame(raf); pintarPlay(); });
      audio.addEventListener('ended', function () { irA(cuento.paginas.length - 1); });
      audio.addEventListener('loadedmetadata', function () {
        if (seekPendiente !== null) { audio.currentTime = seekPendiente; seekPendiente = null; }
      });
    }
    audio.pause();
    situar(0);
    pintarPlay();
  }

  // iOS no deja mover currentTime antes de tener los metadatos: lo guardamos para luego
  function situar(t) {
    if (audio.readyState >= 1) { audio.currentTime = t; seekPendiente = null; }
    else seekPendiente = t;
  }
  function ahora() { return seekPendiente !== null ? seekPendiente : audio.currentTime; }

  // segundo en que empieza la lectura de la página n (portada = principio: el narrador lee el título)
  function inicioPagina(n) {
    var p = cuento.paginas[n];
    if (p.tipo === 'portada') return 0;
    if (p.tiempos && p.tiempos.length) return Math.max(0, p.tiempos[0] - ADELANTO);
    return null;
  }

  // página que se está leyendo en el segundo t: la última cuya primera palabra ya ha sonado
  function paginaEn(t) {
    var n = 0;
    cuento.paginas.forEach(function (p, i) { if (p.tiempos && p.tiempos.length && p.tiempos[0] - ADELANTO <= t) n = i; });
    return n;
  }

  function alternarAudio() {
    if (!audio) return;
    if (!audio.paused) { audio.pause(); return; }
    // desde el «Fin» el play vuelve a empezar el cuento
    if (cuento.paginas[st.pag].tipo === 'fin') { irA(0); situar(0); }
    var pr = audio.play();
    if (pr && pr.catch) pr.catch(function (err) { console.error(err); pintarPlay(); });
  }

  function bucle() {
    cancelAnimationFrame(raf);
    var paso = function () {
      if (!audio || audio.paused) return;
      var n = paginaEn(audio.currentTime);
      if (n > st.pag) { st.pag = n; pintarPagina(); } // el narrador pasa de página solo
      else marcarLeidas();
      raf = requestAnimationFrame(paso);
    };
    raf = requestAnimationFrame(paso);
  }

  // ámbar para las palabras de esta página que el narrador ya ha empezado a decir
  function marcarLeidas() {
    var p = cuento.paginas[st.pag];
    if (!audio || !p.tiempos) return;
    var t = ahora(), spans = el.texto.children, ultima = null;
    for (var i = 0; i < spans.length; i++) {
      var on = p.tiempos[i] <= t;
      if (spans[i].classList.contains('leida') !== on) spans[i].classList.toggle('leida', on);
      if (on) ultima = spans[i];
    }
    // si el texto no cabe en el panel, que la palabra en curso no se quede escondida
    if (ultima && !audio.paused) {
      var sc = el.scroll, top = ultima.offsetTop, h = ultima.offsetHeight;
      if (top + h > sc.scrollTop + sc.clientHeight || top < sc.scrollTop) sc.scrollTop = top - sc.clientHeight / 3;
    }
  }

  function pintarPlay() {
    var sonando = !!audio && !audio.paused;
    el.play.classList.toggle('sonando', sonando);
    el.play.setAttribute('aria-label', !cuento || !cuento.audioSrc ? 'Escuchar el cuento (no disponible)'
      : sonando ? 'Pausar la lectura' : 'Escuchar el cuento');
  }

  function irA(n) {
    n = Math.max(0, Math.min(cuento.paginas.length - 1, n));
    if (n === st.pag) return;
    st.pag = n;
    // paso de página a mano: el audio salta a la primera palabra de la nueva página
    if (audio) {
      var t = inicioPagina(n);
      if (t !== null) situar(t);
      else audio.pause(); // «Fin»: se acabó la lectura
    }
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
    marcarLeidas();
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
        scrollOrigen = window.scrollY;
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
