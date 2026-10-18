/* Hero figure: one quantum trajectory of a large spin S whose z component is weakly and
   continuously measured (measurement strength GAMMA), optionally while it precesses about
   the x axis, H = OMEGA * S_x (a toggle in the caption; off by default).  The state obeys the stochastic Schroedinger equation
       d|psi> = [ -iH dt - (GAMMA/2)(S_z - <S_z>)^2 dt + sqrt(GAMMA)(S_z - <S_z>) dW ] |psi>,
   which is integrated as: unitary step (RK4) followed by the Kraus update
       |psi> -> exp( sqrt(GAMMA) S_z dY - GAMMA S_z^2 dt ) |psi>,
   with the record dY drawn from its exact Born-rule distribution.  Shown: the Husimi Q function |<theta,phi|psi>|^2 on the
   Bloch sphere (see-through: far side desaturated), the mean spin <S> and its recent path (amber),
   and the distribution of S_z. */
(function () {
  "use strict";
  var canvas = document.getElementById("bloch");
  if (!canvas) return;

  /* CORE-START */
  var S = 25, D = 2 * S + 1;          // spin length and Hilbert-space dimension
  var GAMMA = 1.0;                    // measurement strength
  var OMEGA = 0.0;                    // precession rate about x (0 = pure monitoring)
  var DT = 0.0025;                    // integration step

  // index i  <->  m = S - i   (i = 0 is m = +S)
  var mval = new Float64Array(D), cc = new Float64Array(D - 1), logFact = new Float64Array(2 * S + 2);
  var i, k;
  for (i = 0; i < D; i++) mval[i] = S - i;
  for (i = 0; i < D - 1; i++) { var mlo = S - i - 1; cc[i] = Math.sqrt(S * (S + 1) - mlo * (mlo + 1)); }
  for (k = 1; k < logFact.length; k++) logFact[k] = logFact[k - 1] + Math.log(k);

  var pr = new Float64Array(D), pim = new Float64Array(D);       // psi (real, imag)
  var tr = new Float64Array(D), ti = new Float64Array(D);
  var k1r = new Float64Array(D), k1i = new Float64Array(D), k2r = new Float64Array(D), k2i = new Float64Array(D);
  var k3r = new Float64Array(D), k3i = new Float64Array(D), k4r = new Float64Array(D), k4i = new Float64Array(D);

  // d psi / dt = -i OMEGA S_x psi, with (S_x psi)_i = (cc[i] psi_{i+1} + cc[i-1] psi_{i-1}) / 2
  function deriv(r, im, dr, di) {
    for (var j = 0; j < D; j++) {
      var ar = 0, ai = 0;
      if (j < D - 1) { ar += cc[j] * r[j + 1]; ai += cc[j] * im[j + 1]; }
      if (j > 0)     { ar += cc[j - 1] * r[j - 1]; ai += cc[j - 1] * im[j - 1]; }
      dr[j] = 0.5 * OMEGA * ai;
      di[j] = -0.5 * OMEGA * ar;
    }
  }
  function rk4(dt) {
    var j, h = 0.5 * dt;
    deriv(pr, pim, k1r, k1i);
    for (j = 0; j < D; j++) { tr[j] = pr[j] + h * k1r[j]; ti[j] = pim[j] + h * k1i[j]; }
    deriv(tr, ti, k2r, k2i);
    for (j = 0; j < D; j++) { tr[j] = pr[j] + h * k2r[j]; ti[j] = pim[j] + h * k2i[j]; }
    deriv(tr, ti, k3r, k3i);
    for (j = 0; j < D; j++) { tr[j] = pr[j] + dt * k3r[j]; ti[j] = pim[j] + dt * k3i[j]; }
    deriv(tr, ti, k4r, k4i);
    var c = dt / 6;
    for (j = 0; j < D; j++) {
      pr[j]  += c * (k1r[j] + 2 * k2r[j] + 2 * k3r[j] + k4r[j]);
      pim[j] += c * (k1i[j] + 2 * k2i[j] + 2 * k3i[j] + k4i[j]);
    }
  }

  function gauss() {
    var a = 1 - Math.random(), b = Math.random();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b);
  }

  function normalize() {
    var s = 0, j;
    for (j = 0; j < D; j++) s += pr[j] * pr[j] + pim[j] * pim[j];
    s = 1 / Math.sqrt(s);
    for (j = 0; j < D; j++) { pr[j] *= s; pim[j] *= s; }
  }

  function stepOnce() {
    rk4(DT);
    // Draw the measurement record exactly: pick an S_z value m with Born probability |psi_m|^2,
    // then dY = 2 sqrt(GAMMA) m dt + dW.  (Exact for any dt, unlike a single Gaussian about <S_z>.)
    var j, x = Math.random(), cum = 0, pick = D - 1;
    for (j = 0; j < D; j++) {
      cum += pr[j] * pr[j] + pim[j] * pim[j];
      if (x < cum) { pick = j; break; }
    }
    var dY = 2 * Math.sqrt(GAMMA) * mval[pick] * DT + Math.sqrt(DT) * gauss();
    var sg = Math.sqrt(GAMMA);
    for (j = 0; j < D; j++) {
      var f = Math.exp(sg * mval[j] * dY - GAMMA * mval[j] * mval[j] * DT);
      pr[j] *= f; pim[j] *= f;
    }
    normalize();
  }

  // log of the real amplitude b_i(theta) of the spin-coherent state in the S_z basis
  function logB(i, theta) {
    var m = mval[i];
    return 0.5 * (logFact[2 * S] - logFact[S + m] - logFact[S - m]) +
           (S + m) * Math.log(Math.max(Math.cos(theta / 2), 1e-300)) +
           (S - m) * Math.log(Math.max(Math.sin(theta / 2), 1e-300));
  }

  // |theta,phi> = sum_m sqrt(C(2S,S+m)) cos^(S+m) sin^(S-m) e^{i (S-m) phi} |m>
  function setCoherent(theta, phi) {
    for (var j = 0; j < D; j++) {
      var b = Math.exp(logB(j, theta));
      pr[j] = b * Math.cos(j * phi);
      pim[j] = b * Math.sin(j * phi);
    }
    normalize();
  }

  // <S>: S_x + i S_y = S_+ ;  <S_+> = sum_i conj(psi_i) cc[i] psi_{i+1}
  var spin = { x: 0, y: 0, z: 0 };
  function spinVector() {
    var sz = 0, re = 0, im = 0, j;
    for (j = 0; j < D; j++) sz += mval[j] * (pr[j] * pr[j] + pim[j] * pim[j]);
    for (j = 0; j < D - 1; j++) {
      re += cc[j] * (pr[j] * pr[j + 1] + pim[j] * pim[j + 1]);
      im += cc[j] * (pr[j] * pim[j + 1] - pim[j] * pr[j + 1]);
    }
    spin.x = re; spin.y = im; spin.z = sz;
    return spin;
  }

  function szVariance() {
    var m1 = 0, m2 = 0, p;
    for (var j = 0; j < D; j++) { p = pr[j] * pr[j] + pim[j] * pim[j]; m1 += mval[j] * p; m2 += mval[j] * mval[j] * p; }
    return m2 - m1 * m1;
  }

  // Husimi Q at one direction (used by the tests; the renderer uses a precomputed basis)
  function husimiAt(theta, phi) {
    var re = 0, im = 0;
    for (var j = 0; j < D; j++) {
      var b = Math.exp(logB(j, theta)), c = Math.cos(j * phi), s = -Math.sin(j * phi);
      re += b * c * pr[j] - b * s * pim[j];
      im += b * c * pim[j] + b * s * pr[j];
    }
    return re * re + im * im;
  }
  /* CORE-END */

  /* ---- view ---- */
  var N = 140;                         // canvas is N x N pixels covering [-EXT, EXT]^2
  var EXT = 1.1;
  var TAU = 25 * Math.PI / 180;        // camera elevation: tilts the north pole toward the viewer
  var SIN_T = Math.sin(TAU), COS_T = Math.cos(TAU);
  var ctx = canvas.getContext("2d");
  canvas.width = N; canvas.height = N;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Pixels on the disk, and for each the conj. coherent-state amplitudes of the front and back points.
  var pix = [], npx = 0, basisF, basisB;
  function buildBasis() {
    var list = [];
    for (var y = 0; y < N; y++) for (var x = 0; x < N; x++) {
      var u = (x + 0.5) / N * 2 * EXT - EXT, v = EXT - (y + 0.5) / N * 2 * EXT;
      if (u * u + v * v < 1) list.push(y * N + x);
    }
    npx = list.length; pix = Int32Array.from(list);
    basisF = new Float32Array(npx * D * 2); basisB = new Float32Array(npx * D * 2);
    for (var p = 0; p < npx; p++) {
      var yy = Math.floor(pix[p] / N), xx = pix[p] % N;
      var uu = (xx + 0.5) / N * 2 * EXT - EXT, vv = EXT - (yy + 0.5) / N * 2 * EXT;
      var w = Math.sqrt(1 - uu * uu - vv * vv);
      for (var side = 0; side < 2; side++) {
        var sg = side === 0 ? 1 : -1;                       // +1 near side, -1 far side
        var nx = uu, ny = vv * SIN_T - sg * w * COS_T, nz = vv * COS_T + sg * w * SIN_T;
        var theta = Math.acos(Math.max(-1, Math.min(1, nz))), phi = Math.atan2(ny, nx);
        var arr = side === 0 ? basisF : basisB, base = p * D * 2;
        for (var j = 0; j < D; j++) {
          var b = Math.exp(logB(j, theta));
          arr[base + 2 * j] = b * Math.cos(j * phi);
          arr[base + 2 * j + 1] = -b * Math.sin(j * phi);
        }
      }
    }
  }

  function hex(name) {
    var h = getComputedStyle(document.documentElement).getPropertyValue(name).trim().replace("#", "");
    if (h.length === 3) h = h.split("").map(function (c) { return c + c; }).join("");
    var n = parseInt(h, 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }

  var img = ctx.createImageData(N, N);
  var GAIN = 4;
  function qAt(basis, base) {
    var re = 0, im = 0;
    for (var j = 0; j < D; j++) {
      var br = basis[base + 2 * j], bi = basis[base + 2 * j + 1];
      re += br * pr[j] - bi * pim[j];
      im += br * pim[j] + bi * pr[j];
    }
    return re * re + im * im;
  }
  function renderSphere() {
    var acc = hex("--accent"), mu = hex("--muted"), d = img.data;
    var far = [(acc[0] + mu[0]) / 2, (acc[1] + mu[1]) / 2, (acc[2] + mu[2]) / 2];   // far side: same hue, desaturated
    d.fill(0);
    for (var p = 0; p < npx; p++) {
      var base = p * D * 2;
      var af = Math.min(1, Math.sqrt(GAIN * qAt(basisF, base)));
      var ab = 0.7 * Math.min(1, Math.sqrt(GAIN * qAt(basisB, base)));
      var a = af + ab * (1 - af);
      if (a <= 0.003) continue;
      var wf = af / a, wb = 1 - wf, o = pix[p] * 4;
      d[o]     = wf * acc[0] + wb * far[0];
      d[o + 1] = wf * acc[1] + wb * far[1];
      d[o + 2] = wf * acc[2] + wb * far[2];
      d[o + 3] = Math.round(255 * a);
    }
    ctx.putImageData(img, 0, 0);
  }

  /* ---- overlay: outline, graticule, mean-spin marker and trail ---- */
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.getElementById("bloch-svg");
  var dot, trail, trailPts = [];
  function el(tag, attrs, parent) {
    var e = document.createElementNS(NS, tag);
    for (var a in attrs) e.setAttribute(a, attrs[a]);
    (parent || svg).appendChild(e); return e;
  }
  function buildOverlay() {
    svg.setAttribute("viewBox", [-EXT, -EXT, 2 * EXT, 2 * EXT].join(" "));
    // latitude circles at z = 0, +-0.5: ellipses in this projection
    [0, 0.5, -0.5].forEach(function (z) {
      var rho = Math.sqrt(1 - z * z);
      el("ellipse", { "class": z === 0 ? "grat eq" : "grat", cx: 0, cy: -z * COS_T, rx: rho, ry: rho * SIN_T });
    });
    el("line", { "class": "grat", x1: 0, y1: COS_T, x2: 0, y2: -COS_T });          // z axis
    el("circle", { "class": "outline", cx: 0, cy: 0, r: 1 });
    el("circle", { "class": "pole", cx: 0, cy: -COS_T, r: 0.018 });
    el("circle", { "class": "pole", cx: 0, cy: COS_T, r: 0.018 });
    var t = el("text", { "class": "axis-label", transform: "translate(0.05 " + (-COS_T - 0.03) + ") scale(0.01)" }); t.textContent = "z";
    trail = el("polyline", { "class": "trail", points: "" });
    dot = el("circle", { "class": "mean-dot", cx: 0, cy: 0, r: 0.034 });
  }
  function updateOverlay() {
    var s = spinVector();
    var u = s.x / S, v = (s.y * SIN_T + s.z * COS_T) / S;
    dot.setAttribute("cx", u.toFixed(4)); dot.setAttribute("cy", (-v).toFixed(4));
    trailPts.push(u.toFixed(3) + "," + (-v).toFixed(3));
    if (trailPts.length > 110) trailPts.shift();
    trail.setAttribute("points", trailPts.join(" "));
  }

  /* ---- S_z distribution strip ---- */
  var strip = document.getElementById("bloch-pm"), sctx = strip.getContext("2d"), sw = 0, sh = 0;
  function sizeStrip() {
    var dpr = window.devicePixelRatio || 1;
    sw = strip.clientWidth; sh = strip.clientHeight;
    strip.width = Math.max(1, Math.round(sw * dpr)); strip.height = Math.max(1, Math.round(sh * dpr));
    sctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  function renderStrip() {
    if (!sw) return;
    var acc = hex("--accent"), amb = hex("--measure"), mut = getComputedStyle(document.documentElement).getPropertyValue("--muted").trim();
    sctx.clearRect(0, 0, sw, sh);
    var scale = sh / (2 * EXT), pitch = (COS_T / S) * scale, thick = Math.max(1, pitch * 0.7), x0 = 14, wmax = sw - x0 - 2;
    sctx.fillStyle = "rgb(" + acc[0] + "," + acc[1] + "," + acc[2] + ")";
    var sz = 0;
    for (var j = 0; j < D; j++) {
      var p = pr[j] * pr[j] + pim[j] * pim[j]; sz += mval[j] * p;
      var yc = sh / 2 - (mval[j] / S) * COS_T * scale;
      sctx.fillRect(x0, yc - thick / 2, Math.max(0.5, Math.sqrt(p) * wmax), thick);
    }
    var ym = sh / 2 - (sz / S) * COS_T * scale;
    sctx.fillStyle = "rgb(" + amb[0] + "," + amb[1] + "," + amb[2] + ")";
    sctx.fillRect(x0 - 8, ym - 1, 8, 2);
    sctx.fillStyle = mut; sctx.font = "10px 'IBM Plex Sans', system-ui, sans-serif";
    sctx.textBaseline = "middle"; sctx.fillText("+S", 0, sh / 2 - COS_T * scale - 9);
    sctx.fillText("\u2212S", 0, sh / 2 + COS_T * scale + 9);
  }

  /* ---- readout ---- */
  var readout = document.getElementById("bloch-readout"), lastRead = 0;
  function fmt(x) { return (x < 0 ? "\u2212" : "+") + Math.abs(x).toFixed(2); }
  function updateReadout(t, force) {
    if (!readout || (!force && t - lastRead < 200)) return;
    lastRead = t;
    var s = spinVector(), len = Math.sqrt(s.x * s.x + s.y * s.y + s.z * s.z) / S;
    readout.innerHTML = "\u27E8<i>S</i><sub>z</sub>\u27E9/<i>S</i> = " + fmt(s.z / S) + "\u2003|\u27E8<b><i>S</i></b>\u27E9|/<i>S</i> = " + len.toFixed(2);
  }

  /* ---- run ---- */
  var FIELD_ON = 6.0, fieldOn = false;
  var RATE = 0.11;                                   // simulated time units per real second (slow enough to watch the blob smear into a ring)
  var sphereEl = canvas.parentNode, stripEl = strip.parentNode;
  var phase = "run", phaseT = 0, runStart = 0;       // run -> hold (collapsed) -> fade -> run
  var fadeTimer = 0;

  function newTrajectory() {
    var theta = (55 + 70 * Math.random()) * Math.PI / 180;         // polar angle 55-125 deg
    var phi = -Math.PI / 2 + (Math.random() - 0.5) * 1.2;           // blob starts on the near side
    setCoherent(theta, phi);
    trailPts = [];
  }
  function draw(t, force) { renderSphere(); updateOverlay(); renderStrip(); updateReadout(t || 0, force); }
  function advance(n) { for (var q = 0; q < n; q++) stepOnce(); }
  function setOpacity(o) { sphereEl.style.opacity = o; stripEl.style.opacity = o; }

  var btn = document.getElementById("bloch-new"), fbtn = document.getElementById("bloch-field");
  function setField(on) {
    fieldOn = on; OMEGA = on ? FIELD_ON : 0;
    if (fbtn) { fbtn.setAttribute("aria-pressed", String(on)); fbtn.textContent = "Transverse field: " + (on ? "on" : "off"); }
  }

  buildBasis();
  buildOverlay();
  sizeStrip();
  if (window.ResizeObserver) new ResizeObserver(function () { sizeStrip(); renderStrip(); }).observe(strip);
  newTrajectory();

  if (reduce) {
    advance(160);                                    // a still snapshot, part-way through the collapse
    draw(0, true);
    if (btn) btn.addEventListener("click", function () { newTrajectory(); advance(160); draw(0, true); });
    if (fbtn) fbtn.addEventListener("click", function () { setField(!fieldOn); newTrajectory(); advance(160); draw(0, true); });
    return;
  }

  // Start a fresh trajectory right now: no fade, no pause; the dynamics begin on the next frame.
  function startTrajectory() {
    clearTimeout(fadeTimer);
    setOpacity(1);
    newTrajectory();
    phase = "run";
    runStart = performance.now();
    draw(0, true);
  }
  // After a trajectory has collapsed and rested for a moment, cross-fade to a new one.
  function restartSoon() {
    setOpacity(0);
    phase = "fade";
    fadeTimer = setTimeout(startTrajectory, 220);
  }
  if (btn) btn.addEventListener("click", startTrajectory);
  if (fbtn) fbtn.addEventListener("click", function () { setField(!fieldOn); phase = "run"; runStart = performance.now(); });

  var running = false, last = 0, simAcc = 0, lastDraw = 0;
  function frame(t) {
    if (!running) return;
    if (!last) last = t;
    simAcc += Math.min(t - last, 100) / 1000 * RATE; last = t;
    var n = 0;
    while (simAcc >= DT && n < 40) { stepOnce(); simAcc -= DT; n++; }
    if (t - lastDraw >= 33) { lastDraw = t; draw(t); }
    // with no field the spin collapses to a state of definite S_z: let it sit, then start afresh
    if (!fieldOn) {
      if (phase === "run" && (szVariance() < 0.3 || t - runStart > 25000)) { phase = "hold"; phaseT = t; }
      else if (phase === "hold" && t - phaseT > 3000) restartSoon();
    }
    requestAnimationFrame(frame);
  }
  function start() { if (!running) { running = true; last = 0; simAcc = 0; runStart = performance.now(); requestAnimationFrame(frame); } }
  function stop() { running = false; }
  draw(0, true);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { e[0].isIntersecting ? start() : stop(); }).observe(canvas);
  } else { start(); }
})();
