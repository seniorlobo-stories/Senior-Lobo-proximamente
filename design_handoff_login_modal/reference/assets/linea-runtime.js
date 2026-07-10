/* =========================================================================
   Línea runtime — injects the hand-drawn SVG filters and (optionally) the
   .bg stroke layer. Include ONCE per page:  <script src="linea-runtime.js">

   Two jobs:
   1. Inject the <defs> of displacement filters (#rough, #torn-line, #torn-2,
      #torn-3, #torn-paper, #torn-paper-2, #torn-paper-3) the CSS references.
   2. Auto-insert <i class="bg"> as the first child of every host element that
      needs a hand-drawn stroke (skips elements that already have one and any
      element marked data-no-bg). React components emit their own .bg, so this
      only matters for plain-HTML pages.
   ========================================================================= */
(function () {
  var SVG_NS = 'http://www.w3.org/2000/svg';

  var FILTERS = [
    { id: 'rough',        bf: '0.018 0.022', oct: 2, seed: 3,  scale: 1.6, pad: 6  },
    { id: 'torn-2',       bf: '0.026 0.03',  oct: 3, seed: 7,  scale: 2.4, pad: 8  },
    { id: 'torn-3',       bf: '0.034 0.038', oct: 3, seed: 11, scale: 3.2, pad: 10 },
    { id: 'torn-line',    bf: '0.012 0.05',  oct: 2, seed: 5,  scale: 2.2, pad: 4, padY: 30, h: 160 },
    { id: 'torn-paper',   bf: '0.03 0.034',  oct: 4, seed: 6,  scale: 9,   paper: true, flood: 0.20 },
    { id: 'torn-paper-2', bf: '0.028 0.036', oct: 4, seed: 14, scale: 9.5, paper: true, flood: 0.20 },
    { id: 'torn-paper-3', bf: '0.032 0.03',  oct: 4, seed: 21, scale: 8.5, paper: true, flood: 0.22 }
  ];

  function el(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function injectFilters() {
    if (document.getElementById('__linea_filters')) return;
    var svg = el('svg', { width: '0', height: '0', 'aria-hidden': 'true', id: '__linea_filters' });
    svg.setAttribute('style', 'position:absolute');
    var defs = el('defs', {});

    FILTERS.forEach(function (f) {
      var px = (f.pad || 8), py = (f.padY || px), h = (f.h || (100 + py * 2));
      var filter = el('filter', {
        id: f.id,
        x: '-' + px + '%', y: '-' + py + '%',
        width: (100 + px * 2) + '%', height: h + '%'
      });
      filter.appendChild(el('feTurbulence', {
        type: 'fractalNoise', baseFrequency: f.bf, numOctaves: f.oct, seed: f.seed, result: 'n'
      }));
      filter.appendChild(el('feDisplacementMap', {
        in: 'SourceGraphic', in2: 'n', scale: f.scale,
        xChannelSelector: 'R', yChannelSelector: 'G', result: 'p'
      }));
      if (f.paper) {
        // hard offset drop shadow (blur 0) — stacked-paper, never soft glow
        filter.appendChild(el('feDropShadow', {
          in: 'p', dx: '3', dy: '4', stdDeviation: '0',
          'flood-color': '#3b2f17', 'flood-opacity': String(f.flood)
        }));
      }
      defs.appendChild(filter);
    });

    svg.appendChild(defs);
    (document.body || document.documentElement).insertBefore(svg, (document.body || document.documentElement).firstChild);
  }

  // hosts that need an auto .bg layer when written as plain HTML
  var HOST_SEL = [
    '.chip', '.btn', '.field .input-wrap', '.tab', '.page', '.ptab',
    '.card', '.list li', '.badge', '.modal', '.toast', '.toast .ic', '.alert', '.empty',
    '.tooltip', '.surface-sw', '.elev-sheet', '.radius-sw', '.thead', '.kbd', '.note',
    '.code', '.box', '.dot', '.switch', '.dn-switch', '.dn-knob', '.slider .track',
    '.progress .track', '.list .ico', '.avatar', '.step .node',
    '.navbar', '.navbar .mark', '.navbar .nlink', '.iconbtn', '.navbar .nav-avatar',
    '.sec-head h2'
  ].join(',');

  function injectBg(root) {
    (root || document).querySelectorAll(HOST_SEL).forEach(function (host) {
      if (host.hasAttribute('data-no-bg')) return;
      if (host.firstElementChild && host.firstElementChild.classList.contains('bg')) return;
      var i = document.createElement('i');
      i.className = 'bg';
      host.insertBefore(i, host.firstChild);
    });
  }

  function boot() {
    injectFilters();
    injectBg(document);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // expose for dynamically-added markup
  window.LineaRuntime = { injectFilters: injectFilters, injectBg: injectBg };
})();
