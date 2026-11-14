// ── Consentimiento de cookies: el banner del búho + Google Analytics 4 ──
// Componente universal: el mismo script en todas las páginas. Pinta él mismo el banner
// (capa 1 «Una pregunta del búho», capa 2 «El cuaderno del búho») y solo carga gtag.js
// cuando hay permiso para la analítica. Cualquier botón con [data-consent-open] (el
// «Configurar cookies» del pie) abre directamente la capa 2 con la elección actual.
(function () {
  var GA_ID = 'G-166LE73BGF';
  var CLAVE = 'sl-consent';
  var VERSION = 1;
  var MESES_VALIDEZ = 12;
  // en local no se carga Analytics, para no mezclar las pruebas con visitas reales
  var ES_LOCAL = /^(localhost|127\.0\.0\.1|\[::1\]|)$/.test(location.hostname);

  var gaCargado = false;

  // ── Elección guardada ──
  function leerEleccion() {
    try {
      var c = JSON.parse(localStorage.getItem(CLAVE));
      if (!c || c.version !== VERSION || typeof c.analitica !== 'boolean') return null;
      var caduca = new Date(c.fecha);
      if (isNaN(caduca)) return null;
      caduca.setMonth(caduca.getMonth() + MESES_VALIDEZ);
      return Date.now() < caduca.getTime() ? c : null;
    } catch (e) { return null; }
  }

  function guardarEleccion(analitica) {
    var antes = leerEleccion();
    var habiaAceptado = gaCargado || !!(antes && antes.analitica);
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ analitica: analitica, fecha: new Date().toISOString(), version: VERSION }));
    } catch (e) {}
    cerrar();
    if (analitica) { cargarAnalytics(); return; }
    borrarCookiesGA();
    // retirar el consentimiento: recargar para que el script de Google deje de ejecutarse
    if (habiaAceptado) location.reload();
  }

  // ── Google Analytics (solo con permiso) ──
  function cargarAnalytics() {
    if (gaCargado) return;
    if (ES_LOCAL) { console.info('[consentimiento] Analytics aceptado, pero no se carga en local.'); return; }
    gaCargado = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { cookie_expires: 33696000 });
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  function borrarCookiesGA() {
    var host = location.hostname;
    var dominios = ['', 'seniorlobo.es', '.seniorlobo.es', host, '.' + host];
    document.cookie.split(';').forEach(function (par) {
      var nombre = par.split('=')[0].trim();
      if (!/^_ga(_|$)/.test(nombre)) return;
      dominios.forEach(function (d) {
        document.cookie = nombre + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + (d ? '; domain=' + d : '');
      });
    });
  }

  // ── Banner ──
  var X_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  var BUHO = '<div class="ck-buho" aria-hidden="true">' +
      '<img class="ck-buho-dia" src="/imagenes/Buho_cookies_dia.webp" alt="" width="480" height="490" loading="lazy" />' +
      '<img class="ck-buho-noche" src="/imagenes/Buho_cookies_noche.webp" alt="" width="480" height="490" loading="lazy" />' +
    '</div>';

  var HTML =
    '<div class="ck-scrim"></div>' +
    '<div class="ck-modal" role="dialog" aria-modal="true" tabindex="-1" data-capa="1" aria-labelledby="ckTitulo1" aria-describedby="ckTexto1">' +
      '<i class="bg"></i>' +

      // capa 1
      '<section class="ck-capa ck-capa-1">' +
        '<h2 class="ck-title" id="ckTitulo1">Una pregunta del búho</h2>' +
        BUHO +
        '<div class="ck-cuerpo" id="ckTexto1">' +
          '<p class="ck-text">A nuestro búho le cuesta dormir. Sus noches en vela las pasa dibujando a los visitantes del bosque en su cuaderno con notas curiosas sobre: qué lugares visitas, por qué camino has venido o cuánto rato te quedas en nuestra biblioteca.</p>' +
          '<p class="ck-text">Luego, le pasa la información a nuestro Lobo para que configure qué historias gustan más a los habitantes de la aldea. ¿Le das permiso para continuar sus noches en vela?</p>' +
          '<a class="ck-link" href="/politica-cookies/">Lee la política de cookies</a>' +
        '</div>' +
        '<div class="ck-acts">' +
          '<button class="btn primary ck-btn" type="button" data-ck="si"><i class="bg"></i>Vale, toma nota</button>' +
          '<button class="btn ghost ck-btn" type="button" data-ck="no"><i class="bg"></i>Mejor no</button>' +
        '</div>' +
        '<button class="ck-elegir" type="button" data-ck="capa2">Elegir qué apunta</button>' +
      '</section>' +

      // capa 2
      '<section class="ck-capa ck-capa-2">' +
        '<div class="ck-head">' +
          '<button class="ck-back" type="button" data-ck="capa1" aria-label="Volver"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>' +
          '<h2 class="ck-title" id="ckTitulo2">El cuaderno del búho</h2>' +
        '</div>' +
        '<p class="ck-text ck-intro" id="ckTexto2">Aquí decides qué datos anota en su cuaderno. Puedes cambiarlo siempre que quieras desde «Configurar cookies», al pie de la página.</p>' +
        BUHO +
        '<div class="ck-cuerpo ck-opciones">' +
          '<div class="ck-opcion">' +
            '<div class="ck-opcion-txt">' +
              '<h3 class="ck-opcion-title" id="ckImpTitulo">Imprescindibles</h3>' +
              '<p class="ck-opcion-desc" id="ckImpDesc">Recuerdan tu elección sobre las cookies y si prefieres el modo día o noche. Sin ellas, el búho te preguntaría lo mismo cada vez y terminarías odiándonos por no recordar lo más básico.</p>' +
            '</div>' +
            '<div class="ck-opcion-ctrl">' +
              '<span class="ck-siempre">Siempre activas</span>' +
              '<button class="ck-toggle" type="button" role="switch" aria-checked="true" disabled aria-labelledby="ckImpTitulo" aria-describedby="ckImpDesc"><span class="ck-knob"></span></button>' +
            '</div>' +
          '</div>' +
          '<div class="ck-opcion">' +
            '<div class="ck-opcion-txt">' +
              '<h3 class="ck-opcion-title" id="ckAnaTitulo">Analítica</h3>' +
              '<p class="ck-opcion-desc" id="ckAnaDesc">Google Analytics cuenta las visitas: qué páginas se leen, de qué país y desde dónde se llega. Son datos estadísticos, en realidad no sabemos quién eres y mejor que siga siendo así... ser anónimo es the new trend</p>' +
            '</div>' +
            '<div class="ck-opcion-ctrl">' +
              '<button class="ck-toggle" type="button" role="switch" aria-checked="false" id="ckAnalitica" aria-labelledby="ckAnaTitulo" aria-describedby="ckAnaDesc"><span class="ck-knob"></span></button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="ck-acts ck-acts-1">' +
          '<button class="btn primary ck-btn" type="button" data-ck="guardar"><i class="bg"></i>Guardar mi elección</button>' +
        '</div>' +
      '</section>' +
      '<button class="ck-close" type="button" data-ck="cerrar" aria-label="Cerrar">' + X_SVG + '</button>' +
    '</div>';

  var overlay, modal, toggleAnalitica, focoPrevio;
  // abierto desde «Configurar cookies» del pie (con una elección ya guardada): la X y Esc
  // cierran sin cambiar nada; en la primera visita cuentan como «Mejor no»
  var desdePie = false;

  function cerrarSinElegir() {
    if (desdePie) cerrar();
    else guardarEleccion(false);
  }

  function montar() {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'ck-overlay';
    overlay.hidden = true;
    overlay.innerHTML = HTML;
    document.body.appendChild(overlay);
    modal = overlay.querySelector('.ck-modal');
    toggleAnalitica = overlay.querySelector('#ckAnalitica');

    overlay.addEventListener('click', function (e) {
      var b = e.target.closest('[data-ck]');
      if (!b) return;
      var accion = b.getAttribute('data-ck');
      if (accion === 'si') guardarEleccion(true);
      else if (accion === 'no') guardarEleccion(false);
      else if (accion === 'cerrar') cerrarSinElegir();
      else if (accion === 'guardar') guardarEleccion(toggleAnalitica.getAttribute('aria-checked') === 'true');
      else if (accion === 'capa2') irACapa(2);
      else if (accion === 'capa1') irACapa(1);
    });
    toggleAnalitica.addEventListener('click', function () {
      toggleAnalitica.setAttribute('aria-checked', toggleAnalitica.getAttribute('aria-checked') === 'true' ? 'false' : 'true');
    });
    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); cerrarSinElegir(); return; }
      if (e.key === 'Tab') atraparFoco(e);
    });
  }

  function enfocables() {
    var capa = modal.querySelector('.ck-capa-' + modal.dataset.capa);
    return [].slice.call(capa.querySelectorAll('a[href], button:not([disabled])')).concat(modal.querySelector('.ck-close'));
  }

  // el foco no sale del banner mientras está abierto
  function atraparFoco(e) {
    var f = enfocables();
    var primero = f[0], ultimo = f[f.length - 1];
    if (!modal.contains(document.activeElement)) {
      e.preventDefault(); (e.shiftKey ? ultimo : primero).focus();
    } else if (e.shiftKey && (document.activeElement === primero || document.activeElement === modal)) {
      e.preventDefault(); ultimo.focus();
    } else if (!e.shiftKey && document.activeElement === ultimo) {
      e.preventDefault(); primero.focus();
    }
  }

  function irACapa(n) {
    modal.dataset.capa = String(n);
    modal.setAttribute('aria-labelledby', 'ckTitulo' + n);
    modal.setAttribute('aria-describedby', 'ckTexto' + n);
    if (n === 2) {
      var actual = leerEleccion();
      toggleAnalitica.setAttribute('aria-checked', actual && actual.analitica ? 'true' : 'false');
    }
    overlay.scrollTop = 0;
    modal.focus({ preventScroll: true });
  }

  function abrir(capa, pie) {
    montar();
    desdePie = !!pie && !!leerEleccion();
    if (overlay.hidden) focoPrevio = document.activeElement;
    overlay.hidden = false;
    document.documentElement.classList.add('ck-abierto');
    irACapa(capa);
  }

  function cerrar() {
    if (!overlay || overlay.hidden) return;
    overlay.hidden = true;
    document.documentElement.classList.remove('ck-abierto');
    if (focoPrevio && typeof focoPrevio.focus === 'function' && document.contains(focoPrevio)) focoPrevio.focus();
  }

  // ── Arranque ──
  function iniciar() {
    document.querySelectorAll('[data-consent-open]').forEach(function (b) {
      b.addEventListener('click', function (e) { e.preventDefault(); abrir(2, true); });
    });
    var eleccion = leerEleccion();
    if (!eleccion) abrir(1);
    else if (eleccion.analitica) cargarAnalytics();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
