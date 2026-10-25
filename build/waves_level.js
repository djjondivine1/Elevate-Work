// Level Up Lab diagrams (intermediate DJ lessons). Pure SVG, same look as waves.js.
// drawLevel(type, {w, h, theme, mini}) -> svg string
const { THEMES, text, trace, wrap, polyline, rng, f } = require("./waves");

let uid = 1000;
const RED = "#C8493F";

function drawLevel(type, opts = {}) {
  const w = opts.w || 900, h = opts.h || 300;
  const th = THEMES[opts.theme || "dark"];
  const mini = !!opts.mini, annot = !mini;
  const id = ++uid;
  const pad = mini ? 6 : 28, X0 = pad, X1 = w - pad, W = X1 - X0;
  const sw = mini ? 3.2 : Math.max(4, h / 55);
  const fs = mini ? 0 : Math.max(17, Math.round(h * 0.066));
  const G = `url(#g${id})`;
  const rect = (x, y, ww, hh, fill, rx = 3, op = 1, extra = "") => `<rect x="${f(x)}" y="${f(y)}" width="${f(ww)}" height="${f(hh)}" rx="${f(rx)}" fill="${fill}" opacity="${op}" ${extra}/>`;
  const line = (x1, y1, x2, y2, stroke, wd = 2, dash = "") => `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" stroke="${stroke}" stroke-width="${wd}" ${dash ? `stroke-dasharray="${dash}"` : ""} stroke-linecap="round"/>`;
  const circ = (x, y, r, fill, stroke = "none", wd = 0) => `<circle cx="${f(x)}" cy="${f(y)}" r="${f(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${wd}"/>`;
  const T = (x, y, s, o = {}) => (annot ? text(x, y, s, th, o) : "");
  let body = "";

  if (type === "phrase") {
    const base = h * (annot ? 0.62 : 0.5), n = 32, step = W / n, tall = h * (annot ? 0.46 : 0.62);
    for (let i = 0; i < n; i++) {
      const x = X0 + (i + 0.5) * step, major = i % 8 === 0, mid = i % 4 === 0;
      const hh = major ? tall : mid ? tall * 0.55 : tall * 0.32;
      body += rect(x - step * 0.2, base - hh, step * 0.4, hh, major ? G : mid ? th.ink : th.dim, 3, major ? 1 : mid ? 0.8 : 0.5);
    }
    if (annot) {
      [0, 8, 16, 24].forEach((b) => {
        const x = X0 + (b + 0.5) * step;
        body += text(x, base + fs + 10, String(b + 1), th, { size: fs, fill: th.ink });
        if (b > 0) body += line(X0 + b * step, base - tall - 4, X0 + b * step, base + 4, th.faint, 2);
      });
      body += text(X0 + step * 0.5, base - tall - 14, "BAR 1: START HERE", th, { anchor: "start", size: fs - 2, fill: th.ink });
      body += `<path d="M${f(X0)} ${f(base + fs + 36)} V${f(base + fs + 42)} H${f(X1)} V${f(base + fs + 36)}" fill="none" stroke="${th.dim}" stroke-width="2" stroke-linecap="round"/>` + text(X0 + W / 2, base + fs + 42 + fs + 6, "32 BARS = ONE FULL PHRASE", th, { size: fs - 2 });
    }
  }

  if (type === "cuemap") {
    const base = h * (annot ? 0.60 : 0.5), n = mini ? 56 : 72, r = rng(9);
    const marks = [[0.06, "START"], [0.22, "MIX IN"], [0.38, "VOCAL"], [0.54, "DROP"], [0.70, "BREAK"], [0.88, "MIX OUT"]];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), env = t < 0.2 ? 0.28 : t < 0.5 ? 0.5 : t < 0.52 ? 0.45 : t < 0.68 ? 0.95 : t < 0.8 ? 0.3 : t < 0.9 ? 0.7 : 0.35;
      const a = h * (annot ? 0.20 : 0.34) * env * (0.7 + r() * 0.3);
      body += rect(X0 + t * W - W / n * 0.28, base - a, W / n * 0.56, a * 2, th.dim, 2, 0.5);
    }
    marks.forEach(([t, nm], i) => {
      const x = X0 + t * W, gold = i % 2 === 0;
      body += line(x, base - h * 0.38, x, base + h * 0.30, gold ? th.g2 : th.ink, annot ? 3 : 4);
      body += circ(x, base - h * 0.38, annot ? 13 : 9, gold ? G : th.ink);
      if (annot) {
        body += text(x, base - h * 0.38 + 5, String(i + 1), th, { size: 14, fill: "#121214", weight: 800, ls: 0 });
        body += text(x, base + h * 0.30 + fs + 6, nm, th, { size: fs - 4, fill: th.ink, ls: 1 });
      }
    });
  }

  if (type === "loops") {
    const r1 = h * (annot ? 0.30 : 0.30), r2 = h * (annot ? 0.72 : 0.7), bh = h * (annot ? 0.16 : 0.2);
    const n = 40, step = W / n;
    for (let i = 0; i < n; i++) {
      const x = X0 + (i + 0.5) * step, t = i / n;
      if (t < 0.62) body += rect(x - step * 0.22, r1 - bh * (0.6 + 0.4 * ((i * 7) % 5) / 4), step * 0.44, bh * 2 * (0.6 + 0.4 * ((i * 7) % 5) / 4), th.dim, 2, 0.55);
      if (t >= 0.38) body += rect(x - step * 0.22, r2 - bh * (0.5 + 0.5 * ((i * 3) % 4) / 3), step * 0.44, bh * 2 * (0.5 + 0.5 * ((i * 3) % 4) / 3), t < 0.55 ? th.ghost : G, 2, t < 0.55 ? 0.7 : 1);
    }
    const lx = X0 + 0.38 * W, lw = 0.24 * W;
    body += `<rect x="${f(lx)}" y="${f(r1 - bh - 10)}" width="${f(lw)}" height="${f(bh * 2 + 20)}" rx="10" fill="none" stroke="${G}" stroke-width="${annot ? 4 : 5}" stroke-dasharray="${annot ? "10 7" : "9 6"}"/>`;
    if (annot) {
      body += text(lx + lw / 2, r1 - bh - 22, "LOOP HOLDS THE OUTRO", th, { size: fs - 3, fill: th.ink });
      body += text(X0, r1 - bh - 22, "OUTGOING", th, { anchor: "start", size: fs - 3 });
      body += text(X1, r2 + bh + fs + 12, "INCOMING TRACK TAKES OVER", th, { anchor: "end", size: fs - 3, fill: th.ink });
    }
  }

  if (type === "camelot") {
    const cx = annot ? X0 + W * 0.27 : X0 + W / 2, cy = h * 0.5, R = h * (annot ? 0.46 : 0.46), r2 = R * 0.66, r3 = R * 0.30;
    const sector = (a0, a1, ri, ro) => {
      const p = (a, r) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
      const [x1, y1] = p(a0, ro), [x2, y2] = p(a1, ro), [x3, y3] = p(a1, ri), [x4, y4] = p(a0, ri);
      return `M${f(x1)} ${f(y1)} A${f(ro)} ${f(ro)} 0 0 1 ${f(x2)} ${f(y2)} L${f(x3)} ${f(y3)} A${f(ri)} ${f(ri)} 0 0 0 ${f(x4)} ${f(y4)} Z`;
    };
    const num = (i) => (i === 0 ? 12 : i);
    const home = 8, safe = [7, 9];
    for (let i = 0; i < 12; i++) {
      const a0 = (-90 + i * 30 - 15 + 1.2) * Math.PI / 180, a1 = (-90 + i * 30 + 15 - 1.2) * Math.PI / 180, n = num(i);
      const isHome = n === home, isSafe = safe.includes(n);
      [["A", r3, r2], ["B", r2 + 3, R]].forEach(([ab, ri, ro]) => {
        const homeSeg = ab === "A" && isHome, safeSeg = (ab === "A" && isSafe) || (ab === "B" && n === home), lift = ab === "A" && n === 10;
        const fill = homeSeg ? G : safeSeg ? th.g2 : th.faint;
        const op = homeSeg ? 1 : safeSeg ? 0.55 : 1;
        body += `<path d="${sector(a0, a1, ri, ro)}" fill="${fill}" opacity="${op}" ${lift ? `stroke="${th.ink}" stroke-width="3" stroke-dasharray="6 5"` : `stroke="${th.base}" stroke-width="1"`}/>`;
        if (annot) {
          const am = (a0 + a1) / 2, rm = (ri + ro) / 2;
          body += text(cx + rm * Math.cos(am), cy + rm * Math.sin(am) + 5, `${n}${ab}`, th, { size: Math.max(8, Math.round(R * 0.125)), fill: homeSeg ? "#121214" : th.ink, ls: 0, weight: 800 });
        }
      });
    }
    if (annot) {
      const lx = X0 + W * 0.58;
      const row = (y, key, a, b) => circ(lx, y - 6, 9, key) + text(lx + 24, y, a, th, { anchor: "start", size: fs - 1, fill: th.ink }) + text(lx + 24, y + fs, b, th, { anchor: "start", size: fs - 5, weight: 600, ls: 0.6 });
      body += row(h * 0.28, G, "8A: YOU ARE HERE", "Your current track.");
      body += row(h * 0.50, th.g2, "7A, 9A, 8B: SAFE", "One step either way, or flip A to B.");
      body += `<circle cx="${f(lx)}" cy="${f(h * 0.72 - 6)}" r="9" fill="none" stroke="${th.ink}" stroke-width="3" stroke-dasharray="4 3"/>` + text(lx + 24, h * 0.72, "10A: ENERGY LIFT", th, { anchor: "start", size: fs - 1, fill: th.ink }) + text(lx + 24, h * 0.72 + fs, "Move +2 over drums only.", th, { anchor: "start", size: fs - 5, weight: 600, ls: 0.6 });
    }
  }

  if (type === "gridfix") {
    const rows = [[h * (annot ? 0.30 : 0.28), false], [h * (annot ? 0.74 : 0.72), true]];
    const step = W / 12, bh = h * (annot ? 0.11 : 0.14);
    rows.forEach(([y, ok]) => {
      for (let k = 0; k < 12; k++) {
        const x = X0 + step * (k + 0.5);
        body += rect(x - 6, y - bh, 12, bh * 2, ok ? th.ink : th.dim, 3, ok ? 0.8 : 0.6);
        const gx = ok ? x : x - step * 0.34;
        body += line(gx, y - bh - 12, gx, y + bh + 12, ok ? th.g2 : th.ghost, ok ? 4 : 3, ok ? "" : "6 6");
      }
      if (annot) body += text(X0, y - bh - 20, ok ? "FIXED: GRID ON THE BEAT" : "AUTO GRID: A LITTLE OFF", th, { anchor: "start", size: fs - 3, fill: ok ? th.ink : th.dim });
    });
  }

  if (type === "meters") {
    const segs = 24, rowsY = [h * (annot ? 0.30 : 0.30), h * (annot ? 0.74 : 0.72)], sh = h * (annot ? 0.15 : 0.2), gap = 5, sw2 = (W - gap * (segs - 1)) / segs;
    [[24, "TOO HOT: STUCK IN THE RED"], [18, "JUST RIGHT: HEADROOM LEFT"]].forEach(([lit, lab], r) => {
      const y = rowsY[r];
      for (let i = 0; i < segs; i++) {
        const x = X0 + i * (sw2 + gap), on = i < lit, danger = i >= 21;
        const fill = !on ? th.faint : danger ? RED : r === 1 ? G : th.dim;
        body += rect(x, y - sh / 2, sw2, sh, fill, 4, on ? 1 : 0.9);
      }
      if (annot) body += text(X0, y - sh / 2 - 14, lab, th, { anchor: "start", size: fs - 3, fill: r === 0 ? th.dim : th.ink });
    });
    if (annot) body += text(X1, rowsY[0] + sh / 2 + fs + 8, "CLIP", th, { anchor: "end", size: fs - 6, fill: RED });
  }

  if (type === "fxjob") {
    const rows = [h * (annot ? 0.30 : 0.30), h * (annot ? 0.74 : 0.72)], bh = h * (annot ? 0.12 : 0.15), n = 60, step = W / n;
    rows.forEach((y, r) => {
      for (let i = 0; i < n; i++) body += rect(X0 + (i + 0.5) * step - step * 0.2, y - bh * (0.5 + 0.5 * ((i * 5) % 6) / 5), step * 0.4, bh * 2 * (0.5 + 0.5 * ((i * 5) % 6) / 5), th.dim, 2, 0.4);
      if (r === 0) [[0.02, 0.30], [0.22, 0.52], [0.46, 0.74], [0.66, 0.98]].forEach(([a, b]) => { body += rect(X0 + a * W, y - bh - 8, (b - a) * W, bh * 2 + 16, G, 8, 0.55); });
      else body += rect(X0 + 0.62 * W, y - bh - 8, 0.10 * W, bh * 2 + 16, G, 8, 1);
      if (annot) body += text(X0, y - bh - 22, r === 0 ? "EFFECT ON EVERYTHING" : "ONE EFFECT. ONE JOB.", th, { anchor: "start", size: fs - 3, fill: r === 0 ? th.dim : th.ink });
    });
    if (annot) {
      body += line(X0 + 0.62 * W, rows[1] - bh - 12, X0 + 0.62 * W, rows[1] + bh + 28, th.ink, 2, "5 5");
      body += text(X0 + 0.62 * W - 10, rows[1] + bh + 30, "PHRASE CHANGE", th, { anchor: "end", size: fs - 5, fill: th.ink });
    }
  }

  if (type === "echoout") {
    const base = h * (annot ? 0.56 : 0.5), A = h * (annot ? 0.26 : 0.34), n = 26, step = W * 0.46 / n;
    for (let i = 0; i < n; i++) body += rect(X0 + (i + 0.5) * step - step * 0.22, base - A * (0.55 + 0.45 * ((i * 5) % 4) / 3), step * 0.44, A * 2 * (0.55 + 0.45 * ((i * 5) % 4) / 3), th.dim, 2, 0.6);
    const ex = X0 + W * 0.50;
    for (let k = 0; k < 6; k++) body += rect(ex + k * W * 0.058 - 7, base - A * Math.pow(0.66, k), 14, A * 2 * Math.pow(0.66, k), G, 5, 1 - k * 0.08);
    const m = 22, st2 = W * 0.34 / m;
    for (let i = 0; i < m; i++) body += rect(X0 + W * 0.66 + (i + 0.5) * st2 - st2 * 0.22, base - A * (0.4 + 0.6 * Math.min(1, i / 6)) * (0.8 + 0.2 * ((i * 3) % 4) / 3), st2 * 0.44, A * 2 * (0.4 + 0.6 * Math.min(1, i / 6)) * (0.8 + 0.2 * ((i * 3) % 4) / 3), th.ink, 2, 0.8);
    body += `<path d="M${f(X0 + W * 0.44)} ${f(h * 0.08)} L${f(X0 + W * 0.50)} ${f(h * (annot ? 0.20 : 0.16))} L${f(X0 + W * 0.52)} ${f(h * (annot ? 0.20 : 0.16))}" fill="none" stroke="${th.ink}" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round" opacity="0.0"/>`;
    if (annot) {
      body += line(X0 + W * 0.48, base - A - 18, X0 + W * 0.48, base + A + 18, th.ink, 2, "5 5");
      body += text(X0 + W * 0.48, base - A - 28, "ECHO ON + FADER DOWN", th, { size: fs - 4, fill: th.ink });
      body += text(X0 + W * 0.24, base + A + fs + 14, "OUTGOING", th, { size: fs - 4 });
      body += text(X0 + W * 0.62, base + A + fs + 14, "ECHO TAIL FADES", th, { size: fs - 4, fill: th.ink });
      body += text(X0 + W * 0.83, base + A + fs + 14, "NEW TRACK", th, { size: fs - 4 });
    }
  }

  if (type === "blendlen") {
    const half = W / 2 - (annot ? 14 : 8), top = h * (annot ? 0.22 : 0.12), ph = h * (annot ? 0.52 : 0.76);
    const s = (t, k) => 1 / (1 + Math.exp(-k * (t - 0.5)));
    [[X0, 7, "LONG BLEND", 0.0], [X0 + W / 2 + (annot ? 14 : 8), 26, "SHORT BLEND", 1.0]].forEach(([x0, k, lab], i) => {
      const a = [], b = [];
      for (let j = 0; j <= 100; j++) { const t = j / 100, e = (s(t, k) - s(0, k)) / (s(1, k) - s(0, k)); a.push([x0 + t * half, top + e * ph]); b.push([x0 + t * half, top + (1 - e) * ph]); }
      if (annot) {
        body += `<rect x="${f(x0)}" y="${f(top - 8)}" width="${f(half)}" height="${f(ph + 16)}" rx="12" fill="${th.faint}"/>`;
        body += line(x0, top + ph, x0 + half, top + ph, th.base, 1.5);
        body += text(x0 + half / 2, top + ph + fs + 14, lab, th, { size: fs - 2, fill: th.ink });
      }
      body += `<path d="${polyline(a)}" fill="none" stroke="${th.ghost}" stroke-width="${sw * 0.8}" stroke-linecap="round"/>`;
      body += trace(id, polyline(b), th, sw * 0.9);
    });
    if (annot) { body += text(X0 + 8, h * 0.10, "OUTGOING", th, { anchor: "start", size: fs - 6 }); body += text(X1 - 8, h * 0.10, "INCOMING", th, { anchor: "end", size: fs - 6, fill: th.ink }); }
  }

  if (type === "halftime") {
    const ys = [h * (annot ? 0.30 : 0.30), h * (annot ? 0.72 : 0.7)], bh = h * (annot ? 0.10 : 0.13), n = 8;
    const sA = W / n;
    for (let k = 0; k < n; k++) body += line(X0 + sA * (k + 0.5), ys[0] - 4, X0 + sA * (k + 0.5), ys[1] + 4, th.faint, 2, "4 6");
    for (let k = 0; k < n; k++) body += rect(X0 + sA * (k + 0.5) - 9, ys[0] - bh, 18, bh * 2, G, 4);
    for (let k = 0; k < n * 2; k++) body += rect(X0 + (sA / 2) * (k + 0.5) - 6, ys[1] - bh * (k % 2 ? 0.7 : 1), 12, bh * (k % 2 ? 1.4 : 2), k % 2 ? th.dim : th.ink, 3, k % 2 ? 0.7 : 0.95);
    if (annot) {
      body += text(X0, ys[0] - bh - 16, "HALF-TIME FEEL: 70", th, { anchor: "start", size: fs - 3, fill: th.ink });
      body += text(X0, ys[1] - bh - 16, "DOUBLE-TIME FEEL: 140", th, { anchor: "start", size: fs - 3, fill: th.ink });
      body += text(X1, ys[1] + bh + fs + 12, "ONE BEAT LINES UP WITH TWO", th, { anchor: "end", size: fs - 4 });
    }
  }

  if (type === "arc") {
    const base = h * (annot ? 0.74 : 0.82), top = h * (annot ? 0.16 : 0.14);
    const pts = [[0, 0.10], [0.10, 0.16], [0.24, 0.34], [0.38, 0.62], [0.50, 0.50], [0.62, 0.92], [0.78, 0.86], [0.90, 0.46], [1, 0.14]];
    const cr = []; for (let i = 0; i <= 160; i++) { const t = i / 160; let k = 0; while (k < pts.length - 2 && t > pts[k + 1][0]) k++; const [t0, v0] = pts[k], [t1, v1] = pts[k + 1]; const u = (t - t0) / (t1 - t0), e = u * u * (3 - 2 * u); cr.push([X0 + t * W, base - (v0 + (v1 - v0) * e) * (base - top)]); }
    body += `<path d="${polyline(cr)} L${f(X1)} ${f(base)} L${f(X0)} ${f(base)} Z" fill="${G}" opacity="0.16"/>` + trace(id, polyline(cr), th, sw);
    body += circ(X0 + 0.62 * W, base - 0.92 * (base - top), mini ? 8 : 12, "#121214", G, 4);
    if (annot) {
      body += line(X0, base, X1, base, th.base, 1.5);
      [[0.10, "OPEN"], [0.32, "BUILD"], [0.62, "PEAK"], [0.92, "CLOSE"]].forEach(([t, lb]) => { body += text(X0 + t * W, base + fs + 10, lb, th, { size: fs - 2, fill: th.ink }); });
      body += text(X0 + 0.50 * W, base - 0.50 * (base - top) + 30, "BREATHER", th, { size: fs - 6 });
      body += text(X0 + 6, top - 4, "ENERGY", th, { anchor: "start", size: fs - 4 });
    }
  }

  if (type === "floor") {
    const cols = mini ? 22 : 18, rows = mini ? 4 : 5, cw = W / cols, rh = (h * (annot ? 0.56 : 0.7)) / rows, y0 = h * (annot ? 0.22 : 0.15);
    const r = rng(5);
    for (let c = 0; c < cols; c++) for (let rr = 0; rr < rows; rr++) {
      const t = c / (cols - 1), p = t < 0.42 ? 0.10 : t < 0.5 ? 0.45 : 0.88, on = r() < p;
      body += circ(X0 + cw * (c + 0.5), y0 + rh * (rr + 0.5), Math.min(cw, rh) * 0.28, on ? G : th.dim, "none", 0).replace("/>", ` opacity="${on ? 1 : 0.35}"/>`);
    }
    for (let i = 0; i < 3; i++) body += `<path d="M${f(X0 + W * 0.455 + i * 15)} ${f(h * (annot ? 0.50 : 0.50) - 14)} l12 14 l-12 14" fill="none" stroke="${th.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" opacity="0.8"/>`;
    if (annot) {
      body += text(X0, h * 0.14, "HEAD DOWN: QUIET FLOOR", th, { anchor: "start", size: fs - 3 });
      body += text(X1, h * 0.14, "EYES UP: FULL FLOOR", th, { anchor: "end", size: fs - 3, fill: th.ink });
    }
  }

  if (type === "recover") {
    const ys = [h * (annot ? 0.28 : 0.3), h * (annot ? 0.62 : 0.66)], bh = h * (annot ? 0.10 : 0.13), n = 14;
    const sA = W * 0.72 / n;
    for (let k = 0; k < n; k++) {
      body += rect(X0 + sA * (k + 0.5) - 6, ys[0] - bh, 12, bh * 2, th.ink, 3, 0.85);
      const x = X0 + (sA * 1.0 + k * 0.5) * 0 + sA * (k + 0.5) * (1 + 0.03 * k) - 6;
      body += rect(Math.min(x, X0 + W * 0.72), ys[1] - bh, 12, bh * 2, G, 3, 1 - k * 0.02);
    }
    const ex = X0 + W * 0.76;
    body += line(ex, h * 0.10, ex, h * 0.86, th.ink, 3, "6 6");
    body += `<path d="M${f(ex + 20)} ${f(ys[1])} H${f(X1 - 60)}" stroke="${th.g2}" stroke-width="6" stroke-linecap="round"/><path d="M${f(X1 - 76)} ${f(ys[1] - 16)} L${f(X1 - 50)} ${f(ys[1])} L${f(X1 - 76)} ${f(ys[1] + 16)}" fill="none" stroke="${th.g2}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (annot) {
      body += text(X0, ys[0] - bh - 16, "TRACK A: STEADY", th, { anchor: "start", size: fs - 3 });
      body += text(X0, ys[1] - bh - 16, "TRACK B: DRIFTING", th, { anchor: "start", size: fs - 3, fill: th.ink });
      body += text(ex + 18, h * 0.16, "2 NUDGES, THEN EXIT", th, { anchor: "start", size: fs - 5, fill: th.ink });
      body += text(X1 - 20, ys[1] + bh + fs + 14, "CLEAN EXIT", th, { anchor: "end", size: fs - 3, fill: th.ink });
    }
  }

  if (type === "cycle") {
    const cx = annot ? X0 + W * 0.30 : X0 + W / 2, cy = h * 0.5, R = h * (annot ? 0.27 : 0.30);
    const nodes = [["RECORD", 0], ["WAIT", 90], ["REVIEW", 180], ["REDO", 270]];
    body += `<circle cx="${f(cx)}" cy="${f(cy)}" r="${f(R)}" fill="none" stroke="${th.base}" stroke-width="${annot ? 3 : 4}" stroke-dasharray="3 9" stroke-linecap="round"/>`;
    nodes.forEach(([nm, deg], i) => {
      const a = (deg - 90) * Math.PI / 180, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      body += circ(x, y, mini ? 16 : 26, i === 0 ? G : "#121214", i === 0 ? "none" : G, 5);
      if (annot) {
        body += text(x, y + 7, String(i + 1), th, { size: 20, fill: i === 0 ? "#121214" : "#F4EEE2", weight: 800, ls: 0 });
        const lx = deg === 90 ? x + 44 : deg === 270 ? x - 44 : x;
        const ly = deg === 0 ? y - 38 : deg === 180 ? y + 54 : y + 7;
        body += text(lx, ly, nm, th, { anchor: deg === 90 ? "start" : deg === 270 ? "end" : "middle", size: fs - 1, fill: th.ink });
      }
      const a2 = (deg - 90 + 45) * Math.PI / 180, ax = cx + R * Math.cos(a2), ay = cy + R * Math.sin(a2), tx = -Math.sin(a2), ty = Math.cos(a2);
      body += `<path d="M${f(ax - tx * 10 - ty * 10)} ${f(ay - ty * 10 + tx * 10)} L${f(ax + tx * 12)} ${f(ay + ty * 12)} L${f(ax - tx * 10 + ty * 10)} ${f(ay - ty * 10 - tx * 10)}" fill="none" stroke="${th.g2}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    });
    if (annot) {
      body += text(cx, cy + 7, "REPEAT", th, { size: fs, fill: th.ink });
      const lx = X0 + W * 0.62;
      [["RECORD", "Every practice session."], ["WAIT", "A day, so your ears reset."], ["REVIEW", "Note the weakest timecode."], ["REDO", "Fix that one transition."]].forEach(([a, b], i) => {
        const y = h * 0.20 + i * h * 0.21;
        body += circ(lx, y - 6, 11, i === 0 ? G : "none", i === 0 ? "none" : th.g2, 3) + text(lx + 26, y, a, th, { anchor: "start", size: fs - 2, fill: th.ink }) + text(lx + 26, y + fs - 1, b, th, { anchor: "start", size: fs - 6, weight: 600, ls: 0.5 });
      });
    }
  }

  if (type === "usb") {
    const sx = annot ? X0 + 6 : X0 + W * 0.06, sy = h * 0.5, sl = annot ? W * 0.30 : W * 0.40, sh = h * (annot ? 0.34 : 0.42);
    body += rect(sx + 52, sy - sh / 2, sl, sh, G, 16, 1);
    body += rect(sx, sy - sh * 0.32, 66, sh * 0.64, th.dim, 6, 0.9);
    body += rect(sx + 12, sy - sh * 0.16, 14, sh * 0.32, "#121214", 3, 0.7) + rect(sx + 36, sy - sh * 0.16, 14, sh * 0.32, "#121214", 3, 0.7);
    body += rect(sx + 52 + sl * 0.62, sy - sh * 0.26, sl * 0.28, sh * 0.52, "#121214", 8, 0.25);
    if (annot) body += text(sx + 52 + sl * 0.40, sy + 8, "USB", th, { size: fs, fill: "#121214", ls: 3 });
    const items = [["FAT32 OR EXFAT", "Format the stick right."], ["FOLDERS INTACT", "Don't move or rename them."], ["ANALYZED + CUED", "Waveforms and cues load."], ["SPARE STICK", "Plus a fallback crate."]];
    const lx = annot ? X0 + W * 0.50 : X0 + W * 0.66;
    if (annot) items.forEach(([a, b], i) => {
      const y = h * 0.20 + i * h * 0.21;
      body += `<path d="M${f(lx)} ${f(y - 8)} l8 9 l16 -18" fill="none" stroke="url(#g${id})" stroke-width="${annot ? 5 : 6}" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (annot) body += text(lx + 38, y, a, th, { anchor: "start", size: fs - 1, fill: th.ink }) + text(lx + 38, y + fs - 1, b, th, { anchor: "start", size: fs - 6, weight: 600, ls: 0.5 });
    });
  }

  return wrap(id, w, h, th, body);
}

module.exports = { drawLevel };
