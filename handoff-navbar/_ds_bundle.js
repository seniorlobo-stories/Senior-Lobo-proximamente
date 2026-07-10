/* @ds-bundle: {"format":4,"namespace":"SeOrLoboDesignSystem_981966","components":[{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"AvatarGroup","sourcePath":"components/display/Avatar.jsx"},{"name":"BookChapterPlate","sourcePath":"components/display/BookPage.jsx"},{"name":"BookEpigraph","sourcePath":"components/display/BookPage.jsx"},{"name":"BookDivider","sourcePath":"components/display/BookPage.jsx"},{"name":"BookFigure","sourcePath":"components/display/BookPage.jsx"},{"name":"BookParagraph","sourcePath":"components/display/BookPage.jsx"},{"name":"BookPage","sourcePath":"components/display/BookPage.jsx"},{"name":"Card","sourcePath":"components/display/Card.jsx"},{"name":"ListItem","sourcePath":"components/display/List.jsx"},{"name":"List","sourcePath":"components/display/List.jsx"},{"name":"Alert","sourcePath":"components/feedback/Alert.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"Spinner","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"ToastStack","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"DayNightSwitch","sourcePath":"components/forms/DayNightSwitch.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"RadioGroup","sourcePath":"components/forms/Radio.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"Navbar","sourcePath":"components/navigation/Navbar.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Stepper","sourcePath":"components/navigation/Stepper.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"assets/linea-runtime.js":"021a987ef914","components/display/Avatar.jsx":"ee9a6dbc8d97","components/display/BookPage.jsx":"af30b704ad21","components/display/Card.jsx":"40065c96a8ca","components/display/List.jsx":"80332f89ab26","components/feedback/Alert.jsx":"043893097593","components/feedback/Badge.jsx":"16af96cd693c","components/feedback/Dialog.jsx":"8d688201014f","components/feedback/ProgressBar.jsx":"309ef5a008e9","components/feedback/Toast.jsx":"a7def653e4c4","components/feedback/Tooltip.jsx":"11349f306982","components/forms/Button.jsx":"9861eaaf8c37","components/forms/Checkbox.jsx":"47b9fcba1d10","components/forms/DayNightSwitch.jsx":"fde50430ce6a","components/forms/IconButton.jsx":"4f9f76975015","components/forms/Radio.jsx":"0c604f185261","components/forms/Switch.jsx":"87a1c6d5075f","components/forms/TextField.jsx":"df463c1cc964","components/navigation/Breadcrumbs.jsx":"f81ff1af41b2","components/navigation/Navbar.jsx":"e81a432aa110","components/navigation/Pagination.jsx":"546523d563a4","components/navigation/Stepper.jsx":"6b2c37540da6","components/navigation/Tabs.jsx":"e1f403dc15aa","ui_kits/senorlobo/App.jsx":"ef0de0848fe1","ui_kits/senorlobo/Biblioteca.jsx":"1dec6301d5ea","ui_kits/senorlobo/Catalogo.jsx":"391cc7e49799","ui_kits/senorlobo/Libro.jsx":"e2ffdfa65ba0","ui_kits/senorlobo/Personalizar.jsx":"e7198e3e55ec","ui_kits/senorlobo/data.jsx":"b0489b883446"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.SeOrLoboDesignSystem_981966 = window.SeOrLoboDesignSystem_981966 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/linea-runtime.js
try { (() => {
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
  var FILTERS = [{
    id: 'rough',
    bf: '0.018 0.022',
    oct: 2,
    seed: 3,
    scale: 1.6,
    pad: 6
  }, {
    id: 'torn-2',
    bf: '0.026 0.03',
    oct: 3,
    seed: 7,
    scale: 2.4,
    pad: 8
  }, {
    id: 'torn-3',
    bf: '0.034 0.038',
    oct: 3,
    seed: 11,
    scale: 3.2,
    pad: 10
  }, {
    id: 'torn-line',
    bf: '0.012 0.05',
    oct: 2,
    seed: 5,
    scale: 2.2,
    pad: 4,
    padY: 30,
    h: 160
  }, {
    id: 'torn-paper',
    bf: '0.03 0.034',
    oct: 4,
    seed: 6,
    scale: 9,
    paper: true,
    flood: 0.20
  }, {
    id: 'torn-paper-2',
    bf: '0.028 0.036',
    oct: 4,
    seed: 14,
    scale: 9.5,
    paper: true,
    flood: 0.20
  }, {
    id: 'torn-paper-3',
    bf: '0.032 0.03',
    oct: 4,
    seed: 21,
    scale: 8.5,
    paper: true,
    flood: 0.22
  }];
  function el(name, attrs) {
    var n = document.createElementNS(SVG_NS, name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function injectFilters() {
    if (document.getElementById('__linea_filters')) return;
    var svg = el('svg', {
      width: '0',
      height: '0',
      'aria-hidden': 'true',
      id: '__linea_filters'
    });
    svg.setAttribute('style', 'position:absolute');
    var defs = el('defs', {});
    FILTERS.forEach(function (f) {
      var px = f.pad || 8,
        py = f.padY || px,
        h = f.h || 100 + py * 2;
      var filter = el('filter', {
        id: f.id,
        x: '-' + px + '%',
        y: '-' + py + '%',
        width: 100 + px * 2 + '%',
        height: h + '%'
      });
      filter.appendChild(el('feTurbulence', {
        type: 'fractalNoise',
        baseFrequency: f.bf,
        numOctaves: f.oct,
        seed: f.seed,
        result: 'n'
      }));
      filter.appendChild(el('feDisplacementMap', {
        in: 'SourceGraphic',
        in2: 'n',
        scale: f.scale,
        xChannelSelector: 'R',
        yChannelSelector: 'G',
        result: 'p'
      }));
      if (f.paper) {
        // hard offset drop shadow (blur 0) — stacked-paper, never soft glow
        filter.appendChild(el('feDropShadow', {
          in: 'p',
          dx: '3',
          dy: '4',
          stdDeviation: '0',
          'flood-color': '#3b2f17',
          'flood-opacity': String(f.flood)
        }));
      }
      defs.appendChild(filter);
    });
    svg.appendChild(defs);
    (document.body || document.documentElement).insertBefore(svg, (document.body || document.documentElement).firstChild);
  }

  // hosts that need an auto .bg layer when written as plain HTML
  var HOST_SEL = ['.chip', '.btn', '.field .input-wrap', '.tab', '.page', '.ptab', '.card', '.list li', '.badge', '.modal', '.toast', '.toast .ic', '.alert', '.empty', '.tooltip', '.surface-sw', '.elev-sheet', '.radius-sw', '.thead', '.kbd', '.note', '.code', '.box', '.dot', '.switch', '.dn-switch', '.dn-knob', '.slider .track', '.progress .track', '.list .ico', '.avatar', '.step .node', '.navbar', '.navbar .mark', '.navbar .nlink', '.iconbtn', '.navbar .nav-avatar', '.sec-head h2'].join(',');
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
  window.LineaRuntime = {
    injectFilters: injectFilters,
    injectBg: injectBg
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/linea-runtime.js", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Avatar — circular monogram/initials chip with optional status dot. */
function Avatar({
  children,
  status,
  away = false,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'avatar' + (away ? ' away' : '') + (className ? ' ' + className : '')
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), children, status ? /*#__PURE__*/React.createElement("span", {
    className: "status"
  }) : null);
}

/** AvatarGroup — overlapping stack of Avatars. */
function AvatarGroup({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "avatars"
  }, rest), children);
}
Object.assign(__ds_scope, { Avatar, AvatarGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/BookPage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** BookChapterPlate — centred "Capítulo I" eyebrow + chapter title. */
function BookChapterPlate({
  chapter,
  title
}) {
  if (!chapter && !title) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "chapter-plate"
  }, chapter ? /*#__PURE__*/React.createElement("p", {
    className: "chapter-no"
  }, /*#__PURE__*/React.createElement("b", {
    className: "dia"
  }), chapter, /*#__PURE__*/React.createElement("b", {
    className: "dia"
  })) : null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "chapter-title"
  }, title) : null);
}

/** BookEpigraph — centred italic lead-in shown above the prose. */
function BookEpigraph({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: "book-epigraph"
  }, rest), children);
}

/** BookDivider — diamond ornament rule between prose blocks. */
function BookDivider(props) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "nb-divider"
  }, props), /*#__PURE__*/React.createElement("span", {
    className: "ln"
  }), /*#__PURE__*/React.createElement("span", {
    className: "cl"
  }, /*#__PURE__*/React.createElement("b", null), /*#__PURE__*/React.createElement("b", null), /*#__PURE__*/React.createElement("b", null)), /*#__PURE__*/React.createElement("span", {
    className: "ln"
  }));
}

/**
 * BookFigure — reserved illustration slot that floats to the side of the prose,
 * so paragraphs wrap around it like a book plate. Pass `src` for a real image,
 * or omit it for the striped placeholder (label via `slot`).
 */
function BookFigure({
  src,
  alt = '',
  slot = 'ilustración',
  caption,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("figure", _extends({
    className: "book-fig"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "plate"
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt
  }) : /*#__PURE__*/React.createElement("span", {
    className: "slot"
  }, slot)), caption ? /*#__PURE__*/React.createElement("figcaption", null, caption) : null);
}

/**
 * BookParagraph — one justified storybook paragraph. Set `lead` on the first
 * one for the drop cap. Use <span className="hl"> for highlights and
 * <span className="sl"> for small-caps inline.
 */
function BookParagraph({
  lead = false,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("p", _extends({
    className: 'book-para' + (lead ? ' lead-cap' : '') + (className ? ' ' + className : '')
  }, rest), children);
}

/**
 * BookPage — storybook "page" wrapper for any text-with-paragraphs content.
 * Provide a `chapter`/`title` plate, an optional `figure` slot, and the prose
 * as children (BookParagraph + BookDivider), or compose freely.
 */
function BookPage({
  chapter,
  title,
  figure,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'book-page' + (className ? ' ' + className : '')
  }, rest), /*#__PURE__*/React.createElement(BookChapterPlate, {
    chapter: chapter,
    title: title
  }), figure, children);
}
Object.assign(__ds_scope, { BookChapterPlate, BookEpigraph, BookDivider, BookFigure, BookParagraph, BookPage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/BookPage.jsx", error: String((e && e.message) || e) }); }

// components/display/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — torn-paper content card with an optional image placeholder, title,
 * body and a "more" affordance. Compose freely via children, or use the
 * title/body/more shortcuts.
 */
function Card({
  media,
  title,
  children,
  more,
  onMore,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'card ' + className
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), media === undefined ? null : media || /*#__PURE__*/React.createElement("div", {
    className: "ph"
  }, /*#__PURE__*/React.createElement("span", null, "image placeholder")), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, title ? /*#__PURE__*/React.createElement("h3", null, title) : null, children ? /*#__PURE__*/React.createElement("p", null, children) : null, more ? /*#__PURE__*/React.createElement("span", {
    className: "more",
    onClick: onMore
  }, more, /*#__PURE__*/React.createElement("svg", {
    className: "chev",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  }))) : null));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Card.jsx", error: String((e && e.message) || e) }); }

// components/display/List.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** ListItem — a row with a leading icon tile, title+meta and a trailing chevron. */
function ListItem({
  icon,
  title,
  meta,
  trailing,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("li", rest, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), icon ? /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), icon) : null, /*#__PURE__*/React.createElement("span", {
    className: "txt"
  }, /*#__PURE__*/React.createElement("b", null, title), meta ? /*#__PURE__*/React.createElement("small", null, meta) : null), trailing !== undefined ? trailing : /*#__PURE__*/React.createElement("svg", {
    className: "chev",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M9 6l6 6-6 6"
  })));
}

/** List — <ul> container for ListItems. */
function List({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("ul", _extends({
    className: "list"
  }, rest), children);
}
Object.assign(__ds_scope, { ListItem, List });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/List.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Alert.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Alert — inline banner for warnings/errors. */
function Alert({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "alert",
    role: "alert"
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M12 3l9 16H3z M12 10v4M12 17v.01"
  })), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Alert });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Alert.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. variant: 'line' (outlined), 'fill' (accent),
 * 'status' (leading amber dot), 'count' (trailing number bubble).
 */
function Badge({
  variant = 'line',
  children,
  count,
  ...rest
}) {
  const cls = ['badge', variant === 'fill' ? 'fill' : '', variant === 'count' ? 'count' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), variant === 'status' ? /*#__PURE__*/React.createElement("span", {
    className: "dot-c"
  }) : null, children, variant === 'count' && count != null ? /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, count) : null);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Spinner — rotating hand-drawn ring for loading states. */
function Spinner({
  size = 40,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: "spinner",
    viewBox: "0 0 44 44",
    style: {
      width: size,
      height: size
    }
  }, rest), /*#__PURE__*/React.createElement("circle", {
    cx: "22",
    cy: "22",
    r: "18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M22 4a18 18 0 0 1 18 18"
  }));
}

/** ProgressBar — linear progress 0–100 with a torn fill + percent label. */
function ProgressBar({
  value = 0,
  showLabel = true,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "progress"
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "track"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "fill",
    style: {
      width: pct + '%'
    }
  })), showLabel ? /*#__PURE__*/React.createElement("span", {
    className: "pct"
  }, Math.round(pct), "%") : null);
}
Object.assign(__ds_scope, { Spinner, ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const ICONS = {
  success: /*#__PURE__*/React.createElement("path", {
    d: "M5 12l4 5 10-11"
  }),
  info: /*#__PURE__*/React.createElement("path", {
    d: "M12 8v.01M11 12h1v5h1"
  }),
  warn: /*#__PURE__*/React.createElement("path", {
    d: "M12 3l9 16H3z M12 10v4M12 17v.01"
  })
};

/**
 * Toast — transient feedback row. tone: 'success' | 'info' | 'warn'.
 * Render several inside a <div className="toasts"> stack.
 */
function Toast({
  tone = 'info',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: 'toast ' + tone,
    role: "status"
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: 'ic' + (tone === 'warn' ? ' warn-i' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("svg", {
    className: "icon s",
    viewBox: "0 0 24 24"
  }, ICONS[tone])), children);
}

/** ToastStack — vertical container for Toasts. */
function ToastStack({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "toasts"
  }, rest), children);
}
Object.assign(__ds_scope, { Toast, ToastStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Tooltip — a small hand-drawn bubble with a pointer. Presentational. */
function Tooltip({
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "tooltip",
    role: "tooltip"
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), children);
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the tactile line-art button. Renders an <i class="bg"> stroke layer
 * behind crisp label/icon content. Variants: primary (filled accent), ghost
 * (outlined), pressed (inset), disabled (dashed).
 */
function Button({
  variant = 'primary',
  children,
  icon = null,
  disabled = false,
  type = 'button',
  className = '',
  ...rest
}) {
  const cls = ['btn', variant === 'disabled' || disabled ? 'disabled' : variant, className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled || variant === 'disabled'
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), icon ? /*#__PURE__*/React.createElement("span", {
    className: "btn-icon",
    "aria-hidden": "true"
  }, icon) : null, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Dialog — a torn-paper modal card. Renders a title, body and an actions row
 * (Cancel + Confirm by default). Purely presentational — wire your own overlay
 * / open state around it.
 */
function Dialog({
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  actions,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "modal",
    role: "dialog",
    "aria-modal": "true"
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), title ? /*#__PURE__*/React.createElement("h3", null, title) : null, children ? /*#__PURE__*/React.createElement("p", null, children) : null, /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, actions || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    onClick: onCancel
  }, cancelLabel), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    onClick: onConfirm
  }, confirmLabel))));
}
Object.assign(__ds_scope, { Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Checkbox — line-art check option with a hand-drawn box and tick. The whole
 * row (box + label) is the click target.
 */
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  children,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [on, setOn] = React.useState(defaultChecked);
  const active = isControlled ? checked : on;
  function toggle() {
    if (!isControlled) setOn(v => !v);
    onChange && onChange(!active);
  }
  return /*#__PURE__*/React.createElement("label", _extends({
    className: 'opt' + (active ? ' on' : ''),
    role: "checkbox",
    "aria-checked": active,
    tabIndex: 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "box"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("svg", {
    className: "check",
    viewBox: "0 0 24 24"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M5 12l4 5 10-11"
  }))), children);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/DayNightSwitch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SunGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4.4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M12 2.2v2.6M12 19.2v2.6M2.2 12h2.6M19.2 12h2.6M5 5l1.9 1.9M17.1 17.1L19 19M19 5l-1.9 1.9M6.9 17.1L5 19"
}));
const MoonGlyph = /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "none",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, /*#__PURE__*/React.createElement("path", {
  d: "M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5z"
}));

/**
 * DayNightSwitch — the signature theme toggle. The knob is the active luminary
 * (sun by day, moon by night) and slides between ends; night darkens the track
 * and reveals stars. When `syncTheme` is true it also flips
 * document.documentElement[data-theme] so the whole page recolors, and persists
 * the choice to localStorage under `storageKey`.
 */
function DayNightSwitch({
  mode,
  defaultMode = 'dia',
  onChange,
  syncTheme = true,
  persist = true,
  storageKey = 'linea-theme',
  ...rest
}) {
  const isControlled = mode !== undefined;
  const [internal, setInternal] = React.useState(() => {
    if (persist && typeof localStorage !== 'undefined') {
      try {
        return localStorage.getItem(storageKey) || defaultMode;
      } catch (e) {}
    }
    return defaultMode;
  });
  const current = isControlled ? mode : internal;
  React.useEffect(() => {
    if (syncTheme && typeof document !== 'undefined') {
      document.documentElement.dataset.theme = current;
    }
    if (persist && typeof localStorage !== 'undefined') {
      try {
        localStorage.setItem(storageKey, current);
      } catch (e) {}
    }
  }, [current, syncTheme, persist, storageKey]);
  function toggle() {
    const next = current === 'dia' ? 'noche' : 'dia';
    if (!isControlled) setInternal(next);
    onChange && onChange(next);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "dn-switch",
    "data-mode": current,
    role: "switch",
    "aria-checked": current === 'noche',
    "aria-label": "Modo d\xEDa o noche",
    tabIndex: 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "glyph sun"
  }, SunGlyph), /*#__PURE__*/React.createElement("span", {
    className: "glyph moon"
  }, MoonGlyph), /*#__PURE__*/React.createElement("span", {
    className: "stars"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "dn-knob"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "face sun"
  }, SunGlyph), /*#__PURE__*/React.createElement("span", {
    className: "face moon"
  }, MoonGlyph)));
}
Object.assign(__ds_scope, { DayNightSwitch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/DayNightSwitch.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — square tactile button for a single glyph (toolbar / nav action).
 * Pass an inline <svg> as children. Optional `badge` shows a count bubble.
 */
function IconButton({
  children,
  badge,
  'aria-label': ariaLabel,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "iconbtn",
    role: "button",
    tabIndex: 0,
    "aria-label": ariaLabel
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), children, badge != null ? /*#__PURE__*/React.createElement("span", {
    className: "ncount"
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Radio — single option within a RadioGroup. The dot fills when selected.
 * Usually rendered by RadioGroup rather than directly.
 */
function Radio({
  selected = false,
  onSelect,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", _extends({
    className: 'opt' + (selected ? ' on' : ''),
    role: "radio",
    "aria-checked": selected,
    tabIndex: 0,
    onClick: () => onSelect && onSelect(),
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onSelect && onSelect();
      }
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  })), children);
}

/**
 * RadioGroup — manages a set of options. `options` is [{value,label}];
 * controlled via `value` + `onChange`.
 */
function RadioGroup({
  options = [],
  value,
  defaultValue,
  onChange,
  ...rest
}) {
  const isControlled = value !== undefined;
  const [val, setVal] = React.useState(defaultValue);
  const current = isControlled ? value : val;
  function pick(v) {
    if (!isControlled) setVal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "row",
    role: "radiogroup",
    style: {
      gap: 22
    }
  }, rest), options.map(o => /*#__PURE__*/React.createElement(Radio, {
    key: o.value,
    selected: current === o.value,
    onSelect: () => pick(o.value)
  }, o.label)));
}
Object.assign(__ds_scope, { Radio, RadioGroup });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Switch — compact on/off toggle. Controlled via `checked` + `onChange`,
 * or uncontrolled with `defaultChecked`.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [on, setOn] = React.useState(defaultChecked);
  const active = isControlled ? checked : on;
  function toggle() {
    if (!isControlled) setOn(v => !v);
    onChange && onChange(!active);
  }
  return /*#__PURE__*/React.createElement("span", _extends({
    className: 'switch' + (active ? ' on' : ''),
    role: "switch",
    "aria-checked": active,
    tabIndex: 0,
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    }
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "knob"
  }));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * TextField — labeled input with a hand-drawn stroke, optional helper text and
 * focus/error states. `state` forces 'focus' or 'error' styling; otherwise the
 * field reacts to real focus.
 */
function TextField({
  label,
  helper,
  state,
  type = 'text',
  value,
  defaultValue,
  placeholder,
  onChange,
  inputProps = {},
  ...rest
}) {
  const [focused, setFocused] = React.useState(false);
  const cls = ['field', state === 'error' ? 'error' : '', state === 'focus' || focused ? 'focus' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), label ? /*#__PURE__*/React.createElement("label", null, label) : null, /*#__PURE__*/React.createElement("span", {
    className: "input-wrap"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("input", _extends({
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    onChange: onChange,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false)
  }, inputProps))), helper ? /*#__PURE__*/React.createElement("span", {
    className: "helper"
  }, helper) : null);
}
Object.assign(__ds_scope, { TextField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Chev = /*#__PURE__*/React.createElement("svg", {
  className: "chev",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 6l6 6-6 6"
}));

/**
 * Breadcrumbs — path trail. `items` is [{label, href?}]; the last item renders
 * as the current (non-link) crumb.
 */
function Breadcrumbs({
  items = [],
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: "crumbs",
    "aria-label": "Breadcrumb"
  }, rest), items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, last ? /*#__PURE__*/React.createElement("span", {
      className: "cur",
      "aria-current": "page"
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href || '#'
    }, it.label), !last ? Chev : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Navbar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Navbar — the Señor Lobo brand header. A torn-paper band carrying the owl
 * logo, a slab wordmark with an italic tagline, forest-green links (torn amber
 * underline on hover/active) and right-aligned actions (e.g. the día/noche
 * switch). In data-theme="noche" the green shifts to amber.
 */
function Navbar({
  brand,
  brandTagline,
  brandLogo,
  links = [],
  actions,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    className: "navbar brandbar"
  }, rest), /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("a", {
    className: "brand",
    href: "#"
  }, brandLogo ? /*#__PURE__*/React.createElement("span", {
    className: "mark"
  }, /*#__PURE__*/React.createElement("img", {
    src: brandLogo,
    alt: ""
  })) : null, /*#__PURE__*/React.createElement("span", {
    className: "word"
  }, brand, brandTagline ? /*#__PURE__*/React.createElement("span", {
    className: "tagline"
  }, brandTagline) : null)), /*#__PURE__*/React.createElement("div", {
    className: "nlinks"
  }, links.map((l, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: l.href || '#',
    className: 'nlink' + (l.active ? ' active' : '')
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nacts"
  }, actions));
}
Object.assign(__ds_scope, { Navbar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Navbar.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const Prev = /*#__PURE__*/React.createElement("svg", {
  className: "chev",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M15 6l-6 6 6 6"
}));
const Next = /*#__PURE__*/React.createElement("svg", {
  className: "chev",
  viewBox: "0 0 24 24"
}, /*#__PURE__*/React.createElement("path", {
  d: "M9 6l6 6-6 6"
}));

/**
 * Pagination — tactile raised page tabs with prev/next. `pages` is an array of
 * page numbers and/or the string '…'. Controlled via `current` + `onChange`.
 */
function Pagination({
  pages = [],
  current,
  onChange,
  ...rest
}) {
  const go = p => onChange && onChange(p);
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "pager-tactile"
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "ptab",
    role: "button",
    "aria-label": "Anterior",
    onClick: () => go(current - 1)
  }, Prev), pages.map((p, i) => p === '…' ? /*#__PURE__*/React.createElement("span", {
    key: 'd' + i,
    className: "ptab dots"
  }, "\u2026") : /*#__PURE__*/React.createElement("span", {
    key: p,
    className: 'ptab' + (p === current ? ' cur' : ''),
    role: "button",
    "aria-current": p === current ? 'page' : undefined,
    onClick: () => go(p)
  }, p)), /*#__PURE__*/React.createElement("span", {
    className: "ptab",
    role: "button",
    "aria-label": "Siguiente",
    onClick: () => go(current + 1)
  }, Next));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Stepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Stepper — horizontal multi-step progress. `steps` is [{label}]; `current` is
 * the active 0-based index. Steps before it render done (with a tick), the
 * active one current, the rest upcoming.
 */
function Stepper({
  steps = [],
  current = 0,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "stepper"
  }, rest), steps.map((s, i) => {
    const state = i < current ? 'done' : i === current ? 'current' : '';
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: i
    }, i > 0 ? /*#__PURE__*/React.createElement("div", {
      className: 'step-bar' + (i <= current ? ' done' : '')
    }) : null, /*#__PURE__*/React.createElement("div", {
      className: 'step ' + state
    }, /*#__PURE__*/React.createElement("span", {
      className: "node"
    }, /*#__PURE__*/React.createElement("i", {
      className: "bg"
    }), i < current ? /*#__PURE__*/React.createElement("svg", {
      className: "check",
      viewBox: "0 0 24 24"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M5 12l4 5 10-11"
    })) : i + 1), /*#__PURE__*/React.createElement("span", {
      className: "lbl"
    }, s.label)));
  }));
}
Object.assign(__ds_scope, { Stepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Stepper.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tabs — slab-serif tab strip. `tabs` is string[] or [{value,label}].
 * Controlled via `value` + `onChange`, else uncontrolled by index.
 */
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  ...rest
}) {
  const items = tabs.map((t, i) => typeof t === 'string' ? {
    value: i,
    label: t
  } : t);
  const isControlled = value !== undefined;
  const [val, setVal] = React.useState(defaultValue ?? items[0]?.value);
  const current = isControlled ? value : val;
  function pick(v) {
    if (!isControlled) setVal(v);
    onChange && onChange(v);
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "tabs",
    role: "tablist"
  }, rest), items.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.value,
    role: "tab",
    "aria-selected": current === t.value,
    className: 'tab' + (current === t.value ? ' active' : ''),
    onClick: () => pick(t.value)
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), t.label)));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/App.jsx
try { (() => {
/* App — Señor Lobo product shell: app bar, día/noche, view router, library state. */
const SL_NS = window.SeOrLoboDesignSystem_981966;
const NEW_CFG = () => ({
  nombre: '',
  edad: '',
  pronombre: 'Él',
  rasgos: [],
  familia: [],
  antagonista: {}
});
const SEED_BOOKS = [{
  story: STORIES[1],
  cfg: {
    ...NEW_CFG(),
    nombre: 'Olivia',
    edad: '7',
    rasgos: ['Soñador/a']
  },
  estado: 'Enviado'
}, {
  story: STORIES[3],
  cfg: {
    ...NEW_CFG(),
    nombre: 'Hugo',
    edad: '9',
    rasgos: ['Aventurero/a']
  },
  estado: 'En producción'
}];

// ---- Día / Noche switch (themes the whole screen, persists) ---------------
function DayNight() {
  const [mode, setMode] = React.useState(() => {
    try {
      return localStorage.getItem('sl-theme') || 'dia';
    } catch (e) {
      return 'dia';
    }
  });
  React.useEffect(() => {
    document.documentElement.dataset.theme = mode;
    try {
      localStorage.setItem('sl-theme', mode);
    } catch (e) {}
  }, [mode]);
  const toggle = () => setMode(m => m === 'dia' ? 'noche' : 'dia');
  return /*#__PURE__*/React.createElement("span", {
    className: "dn-switch",
    "data-mode": mode,
    role: "switch",
    "aria-checked": mode === 'noche',
    tabIndex: 0,
    "aria-label": "Modo d\xEDa o noche",
    onClick: toggle,
    onKeyDown: e => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggle();
      }
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "glyph sun"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun"
  })), /*#__PURE__*/React.createElement("span", {
    className: "glyph moon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon"
  })), /*#__PURE__*/React.createElement("span", {
    className: "stars"
  }, /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null), /*#__PURE__*/React.createElement("i", null)), /*#__PURE__*/React.createElement("span", {
    className: "dn-knob"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "face sun"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sun"
  })), /*#__PURE__*/React.createElement("span", {
    className: "face moon"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "moon"
  }))));
}
function AppBar({
  view,
  go
}) {
  const links = [{
    id: 'catalogo',
    label: 'Catálogo'
  }, {
    id: 'comofunciona',
    label: 'Cómo funciona'
  }, {
    id: 'biblioteca',
    label: 'Biblioteca'
  }];
  return /*#__PURE__*/React.createElement("nav", {
    className: "navbar appbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand",
    onClick: () => go('catalogo'),
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/React.createElement("img", {
    className: "appbar-logo",
    src: "../../assets/senorlobo-dia.svg",
    alt: ""
  }), /*#__PURE__*/React.createElement("span", {
    className: "word"
  }, "SE\xD1OR LOBO")), /*#__PURE__*/React.createElement("div", {
    className: "nlinks"
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l.id,
    className: 'nlink' + (view === l.id || l.id === 'catalogo' && (view === 'personalizar' || view === 'libro') ? ' active' : ''),
    onClick: e => {
      e.preventDefault();
      go(l.id === 'comofunciona' ? 'catalogo' : l.id);
    }
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), l.label))), /*#__PURE__*/React.createElement("div", {
    className: "nacts"
  }, /*#__PURE__*/React.createElement(DayNight, null), /*#__PURE__*/React.createElement("span", {
    className: "iconbtn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  })), /*#__PURE__*/React.createElement("span", {
    className: "iconbtn"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "bell"
  }), /*#__PURE__*/React.createElement("span", {
    className: "ncount"
  }, "2")), /*#__PURE__*/React.createElement("span", {
    className: "nav-avatar"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), "MR")));
}
function App() {
  const [view, setView] = React.useState('catalogo');
  const [story, setStory] = React.useState(STORIES[0]);
  const [cfg, setCfg] = React.useState(NEW_CFG());
  const [books, setBooks] = React.useState(SEED_BOOKS);
  const [toast, setToast] = React.useState(null);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);
  React.useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(t);
  }, [toast]);
  const pick = s => {
    setStory(s);
    setCfg(NEW_CFG());
    setView('personalizar');
  };
  const save = () => {
    setBooks(b => [{
      story,
      cfg,
      estado: 'En producción'
    }, ...b]);
    setToast(`«${story.titulo}» de ${cfg.nombre || 'tu peque'} añadido al pedido`);
    setView('biblioteca');
  };
  const openBook = b => {
    setStory(b.story);
    setCfg(b.cfg);
    setView('libro');
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "app",
    "data-comment-anchor": "fd76e356fe-div-94-5"
  }, /*#__PURE__*/React.createElement(AppBar, {
    view: view,
    go: setView
  }), view === 'catalogo' && /*#__PURE__*/React.createElement(Catalogo, {
    onPick: pick
  }), view === 'personalizar' && /*#__PURE__*/React.createElement(Personalizar, {
    story: story,
    cfg: cfg,
    setCfg: setCfg,
    onBack: () => setView('catalogo'),
    onPreview: () => setView('libro')
  }), view === 'libro' && /*#__PURE__*/React.createElement(Libro, {
    story: story,
    cfg: cfg,
    onBack: () => setView('personalizar'),
    onSave: save
  }), view === 'biblioteca' && /*#__PURE__*/React.createElement(Biblioteca, {
    books: books,
    onNew: () => setView('catalogo'),
    onOpen: openBook
  }), toast ? /*#__PURE__*/React.createElement("div", {
    className: "toast-float"
  }, /*#__PURE__*/React.createElement("div", {
    className: "toast success"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: "s"
  })), toast)) : null);
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/Biblioteca.jsx
try { (() => {
/* Biblioteca — the family's shelf of created & ordered books. */
const {
  Badge: SL_Badge3
} = window.SeOrLoboDesignSystem_981966;
function Biblioteca({
  books,
  onNew,
  onOpen
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lib-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wiz-titles"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiz-eyebrow"
  }, "Tu estanter\xEDa"), /*#__PURE__*/React.createElement("h1", {
    className: "wiz-h1"
  }, "Biblioteca")), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: onNew
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }), "Nuevo cuento")), books.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "empty lib-empty"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "book",
    size: "l"
  }), /*#__PURE__*/React.createElement("h3", null, "A\xFAn no hay cuentos"), /*#__PURE__*/React.createElement("p", null, "Cuando crees tu primer cuento personalizado, aparecer\xE1 aqu\xED en tu estanter\xEDa."), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: onNew
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), "Crear el primero")) : /*#__PURE__*/React.createElement("div", {
    className: "lib-grid"
  }, books.map((b, i) => /*#__PURE__*/React.createElement("article", {
    key: i,
    className: "lib-card chip",
    onClick: () => onOpen(b)
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "lib-cover"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lib-cover-ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: b.story.icon,
    size: "m"
  })), /*#__PURE__*/React.createElement("span", {
    className: "lib-cover-name"
  }, b.cfg.nombre), /*#__PURE__*/React.createElement("span", {
    className: "lib-cover-title"
  }, b.story.titulo)), /*#__PURE__*/React.createElement("div", {
    className: "lib-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lib-row"
  }, /*#__PURE__*/React.createElement("b", {
    className: "lib-title"
  }, b.story.titulo), /*#__PURE__*/React.createElement(SL_Badge3, {
    variant: b.estado === 'Enviado' ? 'fill' : 'status'
  }, b.estado)), /*#__PURE__*/React.createElement("span", {
    className: "lib-meta"
  }, "Protagonista \xB7 ", b.cfg.nombre, " \xB7 ", b.story.paginas, " p\xE1gs"))))));
}
Object.assign(window, {
  Biblioteca
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/Biblioteca.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/Catalogo.jsx
try { (() => {
/* Catálogo — home screen: brand hero + grid of personalizable story templates. */
const {
  Badge: SL_Badge
} = window.SeOrLoboDesignSystem_981966;
function StoryCard({
  story,
  onPick
}) {
  return /*#__PURE__*/React.createElement("article", {
    className: "story-card chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "sc-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: story.icon,
    size: "m"
  })), /*#__PURE__*/React.createElement("span", {
    className: "sc-eyebrow"
  }, story.eyebrow)), /*#__PURE__*/React.createElement("h3", {
    className: "sc-title"
  }, story.titulo), /*#__PURE__*/React.createElement("p", {
    className: "sc-synop"
  }, story.sinopsis.replace('{NOMBRE}', 'tu peque')), /*#__PURE__*/React.createElement("div", {
    className: "sc-temas"
  }, story.temas.map(t => /*#__PURE__*/React.createElement(SL_Badge, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "sc-foot"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sc-meta"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock",
    size: "s"
  }), story.paginas, " p\xE1gs \xB7 ", story.edad), /*#__PURE__*/React.createElement("button", {
    className: "btn primary sc-cta",
    onClick: () => onPick(story)
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "feather",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }), "Personalizar")));
}
function Catalogo({
  onPick
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "screen"
  }, /*#__PURE__*/React.createElement("section", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-copy"
  }, /*#__PURE__*/React.createElement("span", {
    className: "hero-eyebrow"
  }, "Cuentos personalizados \xB7 6 a 12 a\xF1os"), /*#__PURE__*/React.createElement("h1", {
    className: "hero-h1"
  }, "El protagonista de la historia", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "es tu peque.")), /*#__PURE__*/React.createElement("p", {
    className: "hero-sub"
  }, "Elige un cuento, pon a tu hijo o hija como h\xE9roe, suma a la familia como personajes y a\xF1ade un antagonista a medida. Lo imprimimos en tapa dura y llega a casa con su nombre en la portada."), /*#__PURE__*/React.createElement("div", {
    className: "hero-acts"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: () => onPick(STORIES[0])
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "feather",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }), "Crear un cuento"), /*#__PURE__*/React.createElement("button", {
    className: "btn ghost"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), "Ver c\xF3mo funciona")), /*#__PURE__*/React.createElement("div", {
    className: "hero-trust"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "+40.000"), " cuentos enviados"), /*#__PURE__*/React.createElement("span", {
    className: "dotsep"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "4,9 / 5"), " de las familias"))), /*#__PURE__*/React.createElement("div", {
    className: "hero-art"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-art-card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "hero-logo",
    src: "../../assets/senorlobo-dia.svg",
    alt: "Se\xF1or Lobo"
  }), /*#__PURE__*/React.createElement("span", {
    className: "hero-art-cap"
  }, "SE\xD1OR LOBO \xB7 EDICI\xD3N ILUSTRADA")))), /*#__PURE__*/React.createElement("section", {
    className: "catalog"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sec-row"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "sl-h2"
  }, "Nuestros cuentos"), /*#__PURE__*/React.createElement("span", {
    className: "sec-rule"
  }), /*#__PURE__*/React.createElement("span", {
    className: "sec-count"
  }, "04 t\xEDtulos")), /*#__PURE__*/React.createElement("div", {
    className: "story-grid"
  }, STORIES.map(s => /*#__PURE__*/React.createElement(StoryCard, {
    key: s.id,
    story: s,
    onPick: onPick
  })))));
}
Object.assign(window, {
  Catalogo
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/Catalogo.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/Libro.jsx
try { (() => {
/* Libro — personalized storybook preview: an open spread with paged prose. */
function buildPages(cfg, story) {
  const n = cfg.nombre || 'nuestro héroe';
  const fam = cfg.familia[0];
  const companero = fam ? `${fam.nombre}` : 'su mejor amigo';
  const vil = cfg.antagonista.nombre || 'una sombra antigua';
  const rasgo = (cfg.rasgos[0] || 'valiente').toLowerCase();
  const intros = {
    bosque: `Al filo de la aldea empezaba el Bosque de los Susurros, y todo el mundo decía que de noche los árboles aprendían tu nombre.`,
    estrellas: `Aquella noche el cielo estaba tan vacío que ${n} no podía dormir. Una a una, las estrellas se habían caído sobre los tejados del pueblo.`,
    castillo: `Nadie recordaba quién había levantado el Castillo de Cristal, pero todos sabían que sus puertas solo se abrían para quien resolviera sus tres acertijos.`,
    mares: `El mar olía a aventura la mañana en que ${n} encontró un mapa viejo dentro de una botella varada en la arena.`
  };
  return [{
    cap: 'Capítulo uno',
    head: 'Donde todo comienza',
    body: `${intros[story.id]}\n\nNuestro protagonista, ${n}, tenía ${cfg.edad || 'pocos'} años y un corazón ${rasgo}. Esa misma tarde, ${companero} llamó a la puerta con una noticia que lo cambiaría todo.`
  }, {
    cap: 'Capítulo dos',
    head: 'La llamada de la aventura',
    body: `—No podemos quedarnos aquí —dijo ${companero}, sin aliento.\n\n${n} apretó los puños. Sabía que el camino sería largo, pero algo en su interior susurraba que era ${rasgo} de nacimiento. Y los niños ${rasgo}s, pensó, no le tienen miedo a lo desconocido.`
  }, {
    cap: 'Capítulo tres',
    head: 'La sombra que acecha',
    body: `Fue entonces cuando apareció ${vil}. El aire se volvió frío y todos contuvieron la respiración.\n\n—Te estaba esperando, ${n} —dijo con una voz que parecía venir de muy lejos.\n\nPero ${n} no retrocedió ni un paso.`
  }, {
    cap: 'Capítulo final',
    head: 'El regreso a casa',
    body: `Cuando el sol volvió a salir, el pueblo entero salió a recibir a ${n}. ${fam ? fam.nombre + ' fue quien primero le abrazó.' : 'Toda la familia salió a abrazarle.'}\n\nY aunque la aventura había terminado, ${n} sabía que esa noche, al cerrar los ojos, el bosque, las estrellas y el mar volverían a susurrar su nombre.`
  }];
}
function Libro({
  story,
  cfg,
  onBack,
  onSave
}) {
  const pages = React.useMemo(() => buildPages(cfg, story), [cfg, story]);
  const [spread, setSpread] = React.useState(0);
  const total = pages.length;
  const page = pages[spread];
  return /*#__PURE__*/React.createElement("div", {
    className: "screen libro"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wiz-head"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowL",
    size: "s"
  }), "Volver a editar"), /*#__PURE__*/React.createElement("div", {
    className: "wiz-titles"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiz-eyebrow"
  }, "Vista previa \xB7 borrador"), /*#__PURE__*/React.createElement("h1", {
    className: "wiz-h1"
  }, story.titulo)), /*#__PURE__*/React.createElement("div", {
    className: "libro-acts"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "share",
    size: "s"
  }), "Compartir"), /*#__PURE__*/React.createElement("button", {
    className: "btn primary",
    onClick: onSave
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "cart",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }), "A\xF1adir al pedido"))), /*#__PURE__*/React.createElement("div", {
    className: "book"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "spread"
  }, /*#__PURE__*/React.createElement("div", {
    className: "page page-l"
  }, spread === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "title-page"
  }, /*#__PURE__*/React.createElement("span", {
    className: "tp-ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: story.icon,
    size: "l"
  })), /*#__PURE__*/React.createElement("span", {
    className: "tp-eyebrow"
  }, "Un cuento de Se\xF1or Lobo para"), /*#__PURE__*/React.createElement("h2", {
    className: "tp-name"
  }, cfg.nombre || 'tu peque'), /*#__PURE__*/React.createElement("span", {
    className: "tp-title"
  }, story.titulo)) : /*#__PURE__*/React.createElement("div", {
    className: "page-illo"
  }, /*#__PURE__*/React.createElement("span", null, "ilustraci\xF3n \xB7 p\xE1g ", spread * 2))), /*#__PURE__*/React.createElement("div", {
    className: "page page-r"
  }, /*#__PURE__*/React.createElement("span", {
    className: "page-cap"
  }, page.cap), /*#__PURE__*/React.createElement("h3", {
    className: "page-head"
  }, page.head), page.body.split('\n\n').map((para, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    className: 'page-para' + (i === 0 && spread !== 0 ? ' drop' : '')
  }, para)))), /*#__PURE__*/React.createElement("div", {
    className: "book-nav"
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: () => setSpread(Math.max(0, spread - 1)),
    "aria-label": "Anterior"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevL"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pager-tactile"
  }, pages.map((_, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: 'ptab' + (i === spread ? ' cur' : ''),
    onClick: () => setSpread(i)
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), i + 1))), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: () => setSpread(Math.min(total - 1, spread + 1)),
    "aria-label": "Siguiente"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "chevR"
  })))));
}
Object.assign(window, {
  Libro
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/Libro.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/Personalizar.jsx
try { (() => {
/* Personalizar — the configurator wizard: protagonista → familia → antagonista → resumen. */
const {
  TextField: SL_TextField,
  Stepper: SL_Stepper,
  Badge: SL_Badge2
} = window.SeOrLoboDesignSystem_981966;
const WIZ_STEPS = [{
  label: 'Protagonista'
}, {
  label: 'Familia'
}, {
  label: 'Antagonista'
}, {
  label: 'Resumen'
}];
function ChoiceChip({
  active,
  onClick,
  children
}) {
  return /*#__PURE__*/React.createElement("button", {
    className: 'choice' + (active ? ' on' : ''),
    onClick: onClick,
    type: "button"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), children);
}

// ---- Step 1 : Protagonista ------------------------------------------------
function StepProtagonista({
  cfg,
  set
}) {
  const toggleRasgo = r => {
    const has = cfg.rasgos.includes(r);
    if (has) set({
      rasgos: cfg.rasgos.filter(x => x !== r)
    });else if (cfg.rasgos.length < 3) set({
      rasgos: [...cfg.rasgos, r]
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "step-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "field-grid"
  }, /*#__PURE__*/React.createElement(SL_TextField, {
    label: "Nombre del protagonista",
    placeholder: "p. ej. Mateo",
    value: cfg.nombre,
    onChange: e => set({
      nombre: e.target.value
    }),
    helper: "Aparecer\xE1 en la portada y en cada p\xE1gina"
  }), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Edad"), /*#__PURE__*/React.createElement("div", {
    className: "choice-row"
  }, ['6', '7', '8', '9', '10', '11', '12'].map(a => /*#__PURE__*/React.createElement(ChoiceChip, {
    key: a,
    active: cfg.edad === a,
    onClick: () => set({
      edad: a
    })
  }, a))), /*#__PURE__*/React.createElement("span", {
    className: "helper"
  }, "Ajustamos el vocabulario a su edad"))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "C\xF3mo le nombramos"), /*#__PURE__*/React.createElement("div", {
    className: "choice-row"
  }, ['Él', 'Ella', 'Le'].map(p => /*#__PURE__*/React.createElement(ChoiceChip, {
    key: p,
    active: cfg.pronombre === p,
    onClick: () => set({
      pronombre: p
    })
  }, p)))), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Rasgos de car\xE1cter \xB7 elige hasta 3"), /*#__PURE__*/React.createElement("div", {
    className: "choice-wrap"
  }, RASGOS.map(r => /*#__PURE__*/React.createElement(ChoiceChip, {
    key: r,
    active: cfg.rasgos.includes(r),
    onClick: () => toggleRasgo(r)
  }, r)))));
}

// ---- Step 2 : Familia -----------------------------------------------------
function StepFamilia({
  cfg,
  set
}) {
  const [rel, setRel] = React.useState(RELACIONES[0]);
  const [nombre, setNombre] = React.useState('');
  const add = () => {
    if (!nombre.trim()) return;
    set({
      familia: [...cfg.familia, {
        rel: rel.rel,
        icon: rel.icon,
        nombre: nombre.trim()
      }]
    });
    setNombre('');
  };
  const remove = i => set({
    familia: cfg.familia.filter((_, k) => k !== i)
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "step-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "step-lede"
  }, "Suma a quienes acompa\xF1an a ", cfg.nombre || 'tu peque', " en la aventura. Aparecer\xE1n como personajes secundarios."), /*#__PURE__*/React.createElement("div", {
    className: "add-member chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("div", {
    className: "field"
  }, /*#__PURE__*/React.createElement("label", null, "Qui\xE9n es"), /*#__PURE__*/React.createElement("div", {
    className: "choice-wrap"
  }, RELACIONES.map(r => /*#__PURE__*/React.createElement(ChoiceChip, {
    key: r.rel,
    active: rel.rel === r.rel,
    onClick: () => setRel(r)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.icon,
    size: "s"
  }), r.rel)))), /*#__PURE__*/React.createElement("div", {
    className: "add-row"
  }, /*#__PURE__*/React.createElement(SL_TextField, {
    label: "Su nombre",
    placeholder: "p. ej. Luc\xEDa",
    value: nombre,
    onChange: e => setNombre(e.target.value),
    inputProps: {
      onKeyDown: e => e.key === 'Enter' && add()
    }
  }), /*#__PURE__*/React.createElement("button", {
    className: "btn primary add-btn",
    onClick: add
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }), "A\xF1adir"))), cfg.familia.length === 0 ? /*#__PURE__*/React.createElement("p", {
    className: "empty-note"
  }, "A\xFAn no has a\xF1adido a nadie. Puedes seguir sin personajes secundarios.") : /*#__PURE__*/React.createElement("ul", {
    className: "member-list"
  }, cfg.familia.map((m, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    className: "member chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "member-ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: m.icon,
    size: "s"
  })), /*#__PURE__*/React.createElement("span", {
    className: "member-txt"
  }, /*#__PURE__*/React.createElement("b", null, m.nombre), /*#__PURE__*/React.createElement("small", null, m.rel)), /*#__PURE__*/React.createElement("button", {
    className: "member-del",
    onClick: () => remove(i),
    "aria-label": "Quitar"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash",
    size: "s"
  }))))));
}

// ---- Step 3 : Antagonista -------------------------------------------------
function StepAntagonista({
  cfg,
  set
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "step-body"
  }, /*#__PURE__*/React.createElement("p", {
    className: "step-lede"
  }, "Toda buena historia necesita un giro. Elige qui\xE9n pondr\xE1 a prueba a ", cfg.nombre || 'tu peque', "."), /*#__PURE__*/React.createElement("div", {
    className: "villain-grid"
  }, ANTAGONISTAS.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    type: "button",
    className: 'villain chip' + (cfg.antagonista.id === a.id ? ' on' : ''),
    onClick: () => set({
      antagonista: {
        id: a.id,
        nombre: a.nombre,
        icon: a.icon
      }
    })
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "villain-ico"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: a.icon,
    size: "m"
  })), /*#__PURE__*/React.createElement("span", {
    className: "villain-txt"
  }, /*#__PURE__*/React.createElement("b", null, a.nombre), /*#__PURE__*/React.createElement("small", null, a.rasgo)), cfg.antagonista.id === a.id ? /*#__PURE__*/React.createElement("span", {
    className: "villain-check"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: "s"
  })) : null))));
}

// ---- Step 4 : Resumen -----------------------------------------------------
function StepResumen({
  cfg,
  story
}) {
  const ded = `Para ${cfg.nombre || 'ti'}: que nunca dejes de ser ${(cfg.rasgos[0] || 'valiente').toLowerCase()}. Con cariño, de toda tu familia.`;
  return /*#__PURE__*/React.createElement("div", {
    className: "step-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "resumen"
  }, /*#__PURE__*/React.createElement("div", {
    className: "resumen-card chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "resumen-eyebrow"
  }, story.eyebrow), /*#__PURE__*/React.createElement("h3", {
    className: "resumen-title"
  }, story.titulo), /*#__PURE__*/React.createElement("dl", {
    className: "resumen-list"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Protagonista"), /*#__PURE__*/React.createElement("dd", null, cfg.nombre || '—', cfg.edad ? `, ${cfg.edad} años` : '')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Car\xE1cter"), /*#__PURE__*/React.createElement("dd", null, cfg.rasgos.length ? cfg.rasgos.join(' · ') : '—')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Acompa\xF1antes"), /*#__PURE__*/React.createElement("dd", null, cfg.familia.length ? cfg.familia.map(m => `${m.nombre} (${m.rel})`).join(', ') : 'Ninguno')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("dt", null, "Antagonista"), /*#__PURE__*/React.createElement("dd", null, cfg.antagonista.nombre || '—')))), /*#__PURE__*/React.createElement("div", {
    className: "dedicatoria chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("span", {
    className: "resumen-eyebrow"
  }, "Dedicatoria"), /*#__PURE__*/React.createElement("p", {
    className: "ded-text"
  }, ded), /*#__PURE__*/React.createElement(SL_Badge2, {
    variant: "status"
  }, "Tapa dura \xB7 21 \xD7 21 cm"))));
}
function Personalizar({
  story,
  cfg,
  setCfg,
  onBack,
  onPreview
}) {
  const [step, setStep] = React.useState(0);
  const set = patch => setCfg({
    ...cfg,
    ...patch
  });
  const next = () => step < 3 ? setStep(step + 1) : onPreview();
  const prev = () => step > 0 ? setStep(step - 1) : onBack();
  const canNext = step !== 0 || cfg.nombre.trim() && cfg.edad;
  return /*#__PURE__*/React.createElement("div", {
    className: "screen wiz"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wiz-head"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back-link",
    onClick: onBack
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrowL",
    size: "s"
  }), "Cat\xE1logo"), /*#__PURE__*/React.createElement("div", {
    className: "wiz-titles"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wiz-eyebrow"
  }, "Personalizando \xB7 ", story.eyebrow), /*#__PURE__*/React.createElement("h1", {
    className: "wiz-h1"
  }, story.titulo))), /*#__PURE__*/React.createElement("div", {
    className: "wiz-stepper"
  }, /*#__PURE__*/React.createElement(SL_Stepper, {
    steps: WIZ_STEPS,
    current: step
  })), /*#__PURE__*/React.createElement("div", {
    className: "wiz-panel chip"
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), /*#__PURE__*/React.createElement("h2", {
    className: "wiz-step-title"
  }, ['¿Quién es el héroe?', 'La familia de la historia', 'El antagonista', 'Todo listo'][step]), step === 0 && /*#__PURE__*/React.createElement(StepProtagonista, {
    cfg: cfg,
    set: set
  }), step === 1 && /*#__PURE__*/React.createElement(StepFamilia, {
    cfg: cfg,
    set: set
  }), step === 2 && /*#__PURE__*/React.createElement(StepAntagonista, {
    cfg: cfg,
    set: set
  }), step === 3 && /*#__PURE__*/React.createElement(StepResumen, {
    cfg: cfg,
    story: story
  })), /*#__PURE__*/React.createElement("div", {
    className: "wiz-foot"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn ghost",
    onClick: prev
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), step === 0 ? 'Cancelar' : 'Atrás'), /*#__PURE__*/React.createElement("span", {
    className: "wiz-progress"
  }, "Paso ", step + 1, " de 4"), /*#__PURE__*/React.createElement("button", {
    className: 'btn ' + (canNext ? 'primary' : 'disabled'),
    onClick: () => canNext && next()
  }, /*#__PURE__*/React.createElement("i", {
    className: "bg"
  }), step === 3 ? 'Vista previa del cuento' : 'Continuar', step !== 3 ? /*#__PURE__*/React.createElement(Icon, {
    name: "arrowR",
    size: "s",
    style: {
      stroke: 'currentColor'
    }
  }) : null)));
}
Object.assign(window, {
  Personalizar
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/Personalizar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/senorlobo/data.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* =========================================================================
   Señor Lobo — UI kit shared data + iconography helper.
   Stroked SVG icons in the Línea vocabulary (1.8 stroke, round joins, #rough).
   Exposes everything on window for the Babel sibling scripts.
   ========================================================================= */

// ---- Icon set (hand-stroked paths, drawn through the #rough filter) -------
const ICON_PATHS = {
  book: '<path d="M4 5.5C4 4.7 4.6 4 5.5 4H11v15H5.5C4.6 19 4 18.4 4 17.6zM20 5.5C20 4.7 19.4 4 18.5 4H13v15h5.5c.9 0 1.5-.6 1.5-1.4z"/>',
  star: '<path d="M12 2l2.6 6.3L21 9l-5 4.3L17.5 20 12 16.3 6.5 20 8 13.3 3 9l6.4-.7z"/>',
  sparkle: '<path d="M12 3l1.6 4.8L18 9l-4.4 1.2L12 15l-1.6-4.8L6 9l4.4-1.2z"/><path d="M18.5 14.5l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M5 20a7 7 0 0 1 14 0"/>',
  users: '<circle cx="9" cy="8" r="3.4"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 5.2a3.4 3.4 0 0 1 0 6.6M17.5 19a5.5 5.5 0 0 0-3-4.9"/>',
  heart: '<path d="M12 20S4 14.5 4 9.2A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 8 2.2C20 14.5 12 20 12 20z"/>',
  shield: '<path d="M12 3l7 3v5c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  mask: '<path d="M3 7c3-1 5-1 9-1s6 0 9 1c0 5-2 9-5 9-1.6 0-2.4-1-4-1s-2.4 1-4 1C5 16 3 12 3 7z"/><path d="M8 10.5h.01M16 10.5h.01"/>',
  feather: '<path d="M20 4C11 4 5 10 5 19l3-3c1-6 5-9 12-9z"/><path d="M5 19l6-6M14 9h3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="M16 16l5 5"/>',
  bell: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 8-3 8h18s-3-1-3-8M13.7 21a2 2 0 0 1-3.4 0"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  check: '<path d="M5 12l4 5 10-11"/>',
  chevR: '<path d="M9 6l6 6-6 6"/>',
  chevL: '<path d="M15 6l-6 6 6 6"/>',
  arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  arrowL: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  trash: '<path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13"/>',
  crown: '<path d="M4 18h16M4 18l-1-9 5 4 4-7 4 7 5-4-1 9"/>',
  paw: '<circle cx="7.5" cy="10" r="1.8"/><circle cx="16.5" cy="10" r="1.8"/><circle cx="10" cy="6.5" r="1.7"/><circle cx="14" cy="6.5" r="1.7"/><path d="M12 12c-2.4 0-4.3 1.8-4.3 4 0 1.6 1.4 2.4 4.3 2.4S16.3 17.6 16.3 16c0-2.2-1.9-4-4.3-4z"/>',
  moon: '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.4 6.4 0 0 0 10.5 10.5z"/>',
  tree: '<path d="M12 3l5 7h-3l4 6H6l4-6H7z"/><path d="M12 16v5"/>',
  castle: '<path d="M4 21V9l3-2 3 2 2-1 2 1 3-2 3 2v12z"/><path d="M4 9V5l2 1V4h2v2l2-1 2 1V4h2v2l2-1v4M10 21v-4h4v4"/>',
  anchor: '<circle cx="12" cy="5" r="2"/><path d="M12 7v13M5 13a7 7 0 0 0 14 0M4 13h2M18 13h2"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zM9 4v14M15 6v14"/>',
  edit: '<path d="M4 20h4L18 10l-4-4L4 16zM14 6l4 4"/>',
  share: '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
  download: '<path d="M12 4v10M8 11l4 4 4-4M5 19h14"/>',
  cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="17" cy="20" r="1.4"/><path d="M3 4h2l2.2 11h10L20 7H6"/>',
  clock: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/>',
  sun: '<circle cx="12" cy="12" r="4.4"/><path d="M12 2.2v2.6M12 19.2v2.6M2.2 12h2.6M19.2 12h2.6M5 5l1.9 1.9M17.1 17.1L19 19M19 5l-1.9 1.9M6.9 17.1L5 19"/>'
};
function Icon({
  name,
  size = 'm',
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    className: 'icon ' + size,
    viewBox: "0 0 24 24",
    style: style
  }, rest, {
    dangerouslySetInnerHTML: {
      __html: ICON_PATHS[name] || ''
    }
  }));
}

// ---- Story catalogue ------------------------------------------------------
const STORIES = [{
  id: 'bosque',
  titulo: 'El Bosque de los Susurros',
  eyebrow: 'Aventura',
  icon: 'tree',
  edad: '6–9 años',
  paginas: 28,
  sinopsis: 'Un bosque que solo habla con quien se atreve a escuchar. Una noche, los árboles llaman a {NOMBRE} por su nombre.',
  temas: ['Valentía', 'Naturaleza', 'Amistad']
}, {
  id: 'estrellas',
  titulo: 'La Noche de las Estrellas Perdidas',
  eyebrow: 'Cuento de buenas noches',
  icon: 'moon',
  edad: '6–10 años',
  paginas: 24,
  sinopsis: 'Las estrellas se han caído del cielo y solo {NOMBRE} sabe cómo devolverlas, una a una, antes del amanecer.',
  temas: ['Calma', 'Imaginación', 'Familia']
}, {
  id: 'castillo',
  titulo: 'El Castillo de Cristal',
  eyebrow: 'Fantasía',
  icon: 'castle',
  edad: '8–12 años',
  paginas: 36,
  sinopsis: 'Tras las murallas de cristal duerme un secreto. {NOMBRE} tendrá que resolver tres acertijos para despertarlo.',
  temas: ['Ingenio', 'Magia', 'Coraje']
}, {
  id: 'mares',
  titulo: 'Capitán de los Siete Mares',
  eyebrow: 'Piratas',
  icon: 'anchor',
  edad: '7–11 años',
  paginas: 32,
  sinopsis: 'Con un mapa viejo y una tripulación de familia, {NOMBRE} zarpa en busca de la isla que nadie ha sabido encontrar.',
  temas: ['Liderazgo', 'Mar', 'Tesoros']
}];

// ---- Personalization vocabulary ------------------------------------------
const RASGOS = ['Valiente', 'Curioso/a', 'Soñador/a', 'Bromista', 'Bondadoso/a', 'Aventurero/a'];
const RELACIONES = [{
  rel: 'Mamá',
  icon: 'heart'
}, {
  rel: 'Papá',
  icon: 'heart'
}, {
  rel: 'Hermano/a',
  icon: 'users'
}, {
  rel: 'Abuelo/a',
  icon: 'user'
}, {
  rel: 'Mejor amigo/a',
  icon: 'star'
}, {
  rel: 'Mascota',
  icon: 'paw'
}];
const ANTAGONISTAS = [{
  id: 'lobo',
  nombre: 'El Lobo Gruñón',
  icon: 'mask',
  rasgo: 'Refunfuña pero esconde un buen corazón'
}, {
  id: 'bruja',
  nombre: 'La Bruja de las Sombras',
  icon: 'sparkle',
  rasgo: 'Roba los colores de los sueños'
}, {
  id: 'dragon',
  nombre: 'El Dragón Dormilón',
  icon: 'shield',
  rasgo: 'Tan dormido que nadie puede pasar'
}, {
  id: 'rey',
  nombre: 'El Rey de Hielo',
  icon: 'crown',
  rasgo: 'Congela todo lo que toca, hasta las risas'
}];
Object.assign(window, {
  Icon,
  ICON_PATHS,
  STORIES,
  RASGOS,
  RELACIONES,
  ANTAGONISTAS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/senorlobo/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.AvatarGroup = __ds_scope.AvatarGroup;

__ds_ns.BookChapterPlate = __ds_scope.BookChapterPlate;

__ds_ns.BookEpigraph = __ds_scope.BookEpigraph;

__ds_ns.BookDivider = __ds_scope.BookDivider;

__ds_ns.BookFigure = __ds_scope.BookFigure;

__ds_ns.BookParagraph = __ds_scope.BookParagraph;

__ds_ns.BookPage = __ds_scope.BookPage;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ListItem = __ds_scope.ListItem;

__ds_ns.List = __ds_scope.List;

__ds_ns.Alert = __ds_scope.Alert;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.Spinner = __ds_scope.Spinner;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.ToastStack = __ds_scope.ToastStack;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.DayNightSwitch = __ds_scope.DayNightSwitch;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.RadioGroup = __ds_scope.RadioGroup;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.Navbar = __ds_scope.Navbar;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Stepper = __ds_scope.Stepper;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
