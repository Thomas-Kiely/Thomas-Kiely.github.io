/* Site behaviour: theme toggle, publication filter, math rendering. */
(function () {
  "use strict";
  var root = document.documentElement;

  /* ---- theme toggle ---- */
  var btn = document.getElementById("theme-toggle");
  function isDark() {
    var t = root.getAttribute("data-theme");
    if (t) return t === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  if (btn) {
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---- publication filter ---- */
  var chips = document.querySelectorAll(".chip");
  if (chips.length) {
    var items = document.querySelectorAll(".pubs .pub");
    var groups = document.querySelectorAll(".pub-group");
    var empty = document.getElementById("pub-empty");

    var apply = function (tag) {
      chips.forEach(function (c) {
        c.setAttribute("aria-pressed", String(c.dataset.filter === tag));
      });
      items.forEach(function (li) {
        var tags = (li.dataset.tags || "").split(/\s+/);
        li.hidden = !(tag === "all" || tags.indexOf(tag) !== -1);
      });
      var anyVisible = false;
      groups.forEach(function (g) {
        var visible = g.querySelector(".pub:not([hidden])");
        g.hidden = !visible;
        if (visible) anyVisible = true;
      });
      if (empty) empty.hidden = anyVisible;
    };

    chips.forEach(function (c) {
      c.addEventListener("click", function () {
        var tag = c.dataset.filter;
        apply(tag);
        history.replaceState(null, "", tag === "all" ? location.pathname : "#" + tag);
      });
    });

    // Deep links such as /publications/#transport (used by the research list).
    var start = location.hash.replace("#", "");
    var known = Array.prototype.some.call(chips, function (c) { return c.dataset.filter === start; });
    if (start && known) apply(start);
  }

  /* ---- math (KaTeX) ----
     Works on ordinary pages and on pages written in Markdown. kramdown (Jekyll's Markdown engine) turns
     $$ ... $$ into \( ... \) / \[ ... \] (or, in older versions, <script type="math/tex"> tags), so all of
     those forms are recognised, as are plain $ ... $ and $$ ... $$. */
  var MACROS = {
    "\\ket": "\\left|#1\\right\\rangle",
    "\\bra": "\\left\\langle#1\\right|",
    "\\braket": "\\left\\langle#1\\right\\rangle",
    "\\expval": "\\left\\langle#1\\right\\rangle",
    "\\abs": "\\left|#1\\right|",
    "\\norm": "\\left\\|#1\\right\\|",
    "\\Tr": "\\operatorname{Tr}",
    "\\tr": "\\operatorname{tr}",
    "\\dd": "\\mathrm{d}"
  };

  function renderMath() {
    if (!window.katex) return;
    // 1. <script type="math/tex"> placeholders (older kramdown output)
    document.querySelectorAll('script[type^="math/tex"]').forEach(function (node) {
      var display = node.type.indexOf("display") !== -1;
      var holder = document.createElement(display ? "div" : "span");
      try {
        window.katex.render(node.textContent, holder, { displayMode: display, throwOnError: false, macros: MACROS });
        node.parentNode.replaceChild(holder, node);
      } catch (e) { /* leave the source visible */ }
    });
    // 2. delimiters in the page text
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
          { left: "$", right: "$", display: false }
        ],
        macros: MACROS,
        throwOnError: false
      });
    }
  }
  renderMath();
})();
