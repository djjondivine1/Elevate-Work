// Waveform diagrams as inline SVG. Pure math, no images. Used on carousel slides, stories and PDFs.
// draw(type, {w, h, theme: "dark"|"light", mini}) -> svg string

let uid = 0;

const THEMES = {
  dark: {
    g1: "#F6DDA6", g2: "#D9A95C", g3: "#B07F37",
    ink: "#F4EEE2", dim: "rgba(244,238,226,0.62)", faint: "rgba(244,238,226,0.10)", base: "rgba(244,238,226,0.22)",
    ghost: "rgba(244,238,226,0.38)", glow: 0.55,
  },
  light: {
    g1: "#C99A4E", g2: "#A7722F", g3: "#7E5420",
    ink: "#121214", dim: "rgba(18,18,20,0.66)", faint: "rgba(18,18,20,0.08)", base: "rgba(18,18,20,0.25)",
    ghost: "rgba(18,18,20,0.38)", glow: 0.0,
  },
};

// small deterministic RNG so noise looks the same on every render
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const f = (n) => (Math.round(n * 10) / 10).toString();
const polyline = (pts) => pts.map((p, i) => (i ? "L" : "M") + f(p[0]) + " " + f(p[1])).join(" ");

function wrap(id, w, h, th, body, defsExtra = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block;overflow:visible">
<defs>
<linearGradient id="g${id}" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="${th.g1}"/><stop offset="0.55" stop-color="${th.g2}"/><stop offset="1" stop-color="${th.g3}"/>
</linearGradient>
<filter id="b${id}" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="6"/></filter>
${defsExtra}
</defs>
${body}
</svg>`;
}

function text(x, y, s, th, o = {}) {
  const size = o.size || 15;
  const anchor = o.anchor || "middle";
  const fill = o.fill || th.dim;
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="Montserrat" font-weight="${o.weight || 700}" font-size="${size}" letter-spacing="${o.ls == null ? 1.5 : o.ls}" fill="${fill}">${s}</text>`;
}

function bracket(x1, x2, y, label, th, size) {
  const t = 7;
  return `<path d="M${f(x1)} ${f(y - t)} V${f(y)} H${f(x2)} V${f(y - t)}" fill="none" stroke="${th.dim}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` +
    text((x1 + x2) / 2, y + size + 8, label, th, { size });
}

// main glowing line
function trace(id, d, th, sw) {
  const glow = th.glow > 0 ? `<path d="${d}" fill="none" stroke="${th.g2}" stroke-width="${sw * 2.6}" stroke-linejoin="round" stroke-linecap="round" opacity="${th.glow}" filter="url(#b${id})"/>` : "";
  return glow + `<path d="${d}" fill="none" stroke="url(#g${id})" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"/>`;
}

function gridlines(w, h, th, cols = 8) {
  let s = "";
  const mid = h / 2;
  s += `<line x1="0" y1="${f(mid)}" x2="${w}" y2="${f(mid)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
  for (let i = 1; i < cols; i++) {
    const x = (w / cols) * i;
    s += `<line x1="${f(x)}" y1="0" x2="${f(x)}" y2="${h}" stroke="${th.faint}" stroke-width="1"/>`;
  }
  return s;
}

function bars(id, items, mid, th, rx) {
  // items: [{x, a (half height), wd, color}]
  return items.map((b) => {
    const fill = b.color === "ink" ? th.ink : b.color === "dim" ? th.dim : `url(#g${id})`;
    const op = b.op == null ? 1 : b.op;
    return `<rect x="${f(b.x - b.wd / 2)}" y="${f(mid - b.a)}" width="${f(b.wd)}" height="${f(b.a * 2)}" rx="${f(Math.min(rx, b.wd / 2))}" fill="${fill}" opacity="${op}"/>`;
  }).join("");
}

function draw(type, opts = {}) {
  const w = opts.w || 900, h = opts.h || 300;
  const th = THEMES[opts.theme || "dark"];
  const mini = !!opts.mini;
  const id = ++uid;
  const mid = h / 2;
  const pad = mini ? 6 : 28;
  const sw = mini ? 3.2 : Math.max(4, h / 55);
  const fs = mini ? 0 : Math.max(18, Math.round(h * 0.068));
  const annot = !mini;
  // vertical room: leave space under the wave for bracket labels in annotated mode
  const bars4 = type === "beat" || type === "snare";
  const A = mini ? h * 0.36 : (type === "clipped" ? h * 0.23 : bars4 ? h * 0.27 : h * 0.30);
  const midY = annot ? (bars4 ? h * 0.53 : h * 0.46) : mid;
  const X0 = pad, X1 = w - pad, W = X1 - X0;
  let body = "";
  const grid = mini ? "" : gridlines(w, h, th).replace(new RegExp(`y1="${f(mid)}" x2="${w}" y2="${f(mid)}"`), `y1="${f(midY)}" x2="${w}" y2="${f(midY)}"`);
  const yOf = (v) => midY - v * A;

  if (type === "sine") {
    const cyc = 2;
    const pts = [];
    for (let i = 0; i <= 480; i++) { const t = i / 480; pts.push([X0 + t * W, yOf(Math.sin(2 * Math.PI * cyc * t))]); }
    body += grid + trace(id, polyline(pts), th, sw);
    if (annot) body += bracket(X0, X0 + W / cyc, midY + A + 22, "1 CYCLE", th, fs);
  }

  if (type === "square") {
    const cyc = 2.5, pts = [];
    const T = W / cyc;
    let x = X0, hi = true;
    pts.push([x, yOf(0)]);
    pts.push([x, yOf(1)]);
    x += T / 2; pts.push([x, yOf(1)]);
    for (let i = 0; i < 4; i++) { hi = !hi; pts.push([x, yOf(hi ? 1 : -1)]); x += T / 2; pts.push([Math.min(x, X1), yOf(hi ? 1 : -1)]); if (x >= X1) break; }
    body += grid + trace(id, polyline(pts), th, sw);
    if (annot) {
      body += text(X0 + 4, yOf(1) - 12, "HIGH", th, { anchor: "start", size: fs - 2 });
      body += text(X1, yOf(-1) + fs + 6, "LOW", th, { anchor: "end", size: fs - 2 });
      body += text(X0 + T / 2 + 10, midY - 8, "INSTANT JUMP", th, { anchor: "start", size: fs - 2 });
      body += bracket(X0, X0 + T, midY + A + 28, "1 CYCLE", th, fs);
    }
  }

  if (type === "triangle") {
    const cyc = 2, pts = [];
    for (let i = 0; i <= 4 * cyc; i++) { const t = i / (4 * cyc); pts.push([X0 + t * W, yOf(i % 4 === 1 ? 1 : i % 4 === 3 ? -1 : 0)]); }
    body += grid + trace(id, polyline(pts), th, sw);
    if (annot) {
      body += text(X0 + 2, yOf(0.8), "RISE", th, { anchor: "start", size: fs - 2 });
      body += text(X0 + W * 0.125 + 78, yOf(0.5), "FALL", th, { anchor: "start", size: fs - 2 });
      body += bracket(X0, X0 + W / cyc, midY + A + 22, "1 CYCLE", th, fs);
    }
  }

  if (type === "saw") {
    const cyc = 3, pts = [], T = W / cyc;
    for (let c = 0; c < cyc; c++) {
      const xs = X0 + c * T;
      pts.push([xs, yOf(c === 0 ? 0 : -1)]);
      pts.push([xs + T, yOf(1)]);
      pts.push([xs + T, yOf(-1)]);
    }
    pts[0] = [X0, yOf(-1)];
    pts.pop();
    pts.push([X1, yOf(1)]);
    body += grid + trace(id, polyline(pts), th, sw);
    if (annot) {
      body += text(X0 + T * 0.38, yOf(-0.1) - 16, "RAMP", th, { size: fs - 2 });
      body += text(X0 + T + 18, midY + fs * 0.4, "DROP", th, { size: fs - 2, anchor: "start" });
      body += bracket(X0, X0 + T, midY + A + 22, "1 CYCLE", th, fs);
    }
  }

  if (type === "pulse") {
    const cyc = 3, duty = 0.25, T = W / cyc, pts = [];
    let x = X0;
    pts.push([x, yOf(-1)]);
    for (let c = 0; c < cyc; c++) {
      pts.push([x, yOf(1)]); pts.push([x + T * duty, yOf(1)]);
      pts.push([x + T * duty, yOf(-1)]); pts.push([x + T, yOf(-1)]);
      x += T;
    }
    body += grid + trace(id, polyline(pts), th, sw);
    if (annot) {
      body += text(X0 + T * duty + 16, midY - 4, "25% HIGH", th, { anchor: "start", size: fs - 2 });
      body += bracket(X0 + T, X0 + 2 * T, midY + A + 22, "1 CYCLE", th, fs);
    }
  }

  if (type === "noise") {
    const r = rng(7);
    const rows = mini ? 1 : 2;
    const wH = annot ? h * 0.14 : A;
    const topMid = annot ? h * 0.28 : midY;
    const botMid = annot ? h * 0.72 : midY;
    // white: independent random samples
    const n = mini ? 90 : 260;
    const wp = [], pk = [];
    let lp = 0;
    const ro = rng(11);
    for (let i = 0; i <= n; i++) {
      const x = X0 + (i / n) * W;
      wp.push([x, topMid + (r() * 2 - 1) * wH]);
      // pink: smoothed random walk plus slow component, more low-frequency weight
      lp = lp * 0.82 + (ro() * 2 - 1) * 0.5;
      pk.push([x, botMid + Math.max(-1, Math.min(1, lp * 1.3 + Math.sin(i / 17) * 0.25)) * wH]);
    }
    if (mini) {
      body += trace(id, polyline(wp), th, sw * 0.6);
    } else {
      body += `<line x1="0" y1="${f(topMid)}" x2="${w}" y2="${f(topMid)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
      body += `<line x1="0" y1="${f(botMid)}" x2="${w}" y2="${f(botMid)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
      body += trace(id, polyline(wp), th, sw * 0.55);
      body += `<path d="${polyline(pk)}" fill="none" stroke="${th.ink}" stroke-width="${sw * 0.7}" stroke-linejoin="round" stroke-linecap="round" opacity="0.92"/>`;
      body += text(X0, topMid - wH - 8, "WHITE: BRIGHT, HISSY", th, { anchor: "start", size: fs - 1 });
      body += text(X0, botMid - wH - 8, "PINK: FULLER, SMOOTHER", th, { anchor: "start", size: fs - 1 });
    }
  }

  if (type === "complex") {
    const r = rng(23), pts = [], n = 900;
    const comps = [[1, 0.55, 0], [2, 0.38, 1.1], [3, 0.30, 0.4], [5, 0.22, 2.0], [7, 0.15, 0.8], [11, 0.09, 1.6]];
    const noise = [];
    for (let i = 0; i <= n; i++) noise.push((r() - 0.5) * 0.28);
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      let v = 0;
      comps.forEach(([k, a, p]) => { v += a * Math.sin(2 * Math.PI * k * 1.6 * t + p); });
      const env = 0.55 + 0.45 * Math.sin(Math.PI * t * 1.1 + 0.4) ** 2;
      v = (v + noise[i]) * env;
      pts.push([X0 + t * W, yOf(Math.max(-1.25, Math.min(1.25, v)))]);
    }
    body += grid + trace(id, polyline(pts), th, sw * 0.8);
    if (annot) body += text(X0 + W / 2, midY + A + 34, "MANY WAVES ADDED TOGETHER", th, { size: fs });
  }

  if (type === "clipped") {
    const cyc = 2, n = 700, ghost = [], clip = [];
    const amp = 1.45;
    for (let i = 0; i <= n; i++) {
      const t = i / n, v = Math.sin(2 * Math.PI * cyc * t) * amp;
      const x = X0 + t * W;
      ghost.push([x, yOf(v)]);
      clip.push([x, yOf(Math.max(-1, Math.min(1, v)))]);
    }
    body += grid;
    if (annot) {
      body += `<line x1="${X0}" y1="${f(yOf(1))}" x2="${X1}" y2="${f(yOf(1))}" stroke="${th.ink}" stroke-width="2" stroke-dasharray="10 8" opacity="0.55"/>`;
      body += `<line x1="${X0}" y1="${f(yOf(-1))}" x2="${X1}" y2="${f(yOf(-1))}" stroke="${th.ink}" stroke-width="2" stroke-dasharray="10 8" opacity="0.55"/>`;
      body += `<path d="${polyline(ghost)}" fill="none" stroke="${th.ghost}" stroke-width="2.5" stroke-dasharray="4 7" stroke-linecap="round"/>`;
      body += text(X1, yOf(1) - 10, "MAX LEVEL (CEILING)", th, { anchor: "end", size: fs - 2, fill: th.ink });
      body += text(X0 + W * 0.125, yOf(1.45) - 10, "WHAT YOU WANTED", th, { size: fs - 3 });
      body += text(X0 + W * 0.375, yOf(1) + fs + 8, "FLAT TOP = CLIPPED", th, { size: fs - 2, fill: th.ink });
    } else {
      body += `<line x1="${X0}" y1="${f(yOf(1))}" x2="${X1}" y2="${f(yOf(1))}" stroke="${th.ink}" stroke-width="1.5" stroke-dasharray="6 5" opacity="0.5"/>`;
    }
    body += trace(id, polyline(clip), th, sw);
  }

  // ---- bar-style DJ waveforms ----
  const rx = 4;
  if (type === "beat") {
    const bw = mini ? 6 : 14;
    const items = [], r = rng(5);
    const beats = 4, span = W;
    const gx = (b) => X0 + (b + 0.5) / beats * span;
    // texture: little bars between beats
    const nTex = mini ? 22 : 56;
    for (let i = 0; i < nTex; i++) {
      const x = X0 + (i + 0.5) / nTex * span;
      const nearBeat = [0, 1, 2, 3].some((b) => Math.abs(x - gx(b)) < span / beats * 0.12);
      if (nearBeat) continue;
      items.push({ x, a: A * (0.12 + r() * 0.2), wd: mini ? 3 : 6, color: "dim", op: 0.7 });
    }
    for (let b = 0; b < beats; b++) {
      items.push({ x: gx(b), a: A * (b % 4 === 0 ? 1.0 : 0.88), wd: bw, color: "gold" });
      // decay bars after each kick
      for (let k = 1; k <= (mini ? 1 : 3); k++) items.push({ x: gx(b) + k * (mini ? 9 : 22), a: A * (0.6 - k * 0.14), wd: mini ? 4 : 8, color: "gold", op: 0.75 });
    }
    if (annot) {
      for (let b = 0; b < beats; b++) {
        const x = gx(b);
        body += `<line x1="${f(x)}" y1="${f(midY - A - 14)}" x2="${f(x)}" y2="${f(midY + A + 14)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="4 6"/>`;
      }
    }
    body += mini ? "" : `<line x1="0" y1="${f(midY)}" x2="${w}" y2="${f(midY)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
    body += bars(id, items, midY, th, rx);
    if (annot) {
      for (let b = 0; b < beats; b++) body += text(gx(b), midY + A + fs + 12, String(b + 1), th, { size: fs + 6, fill: th.ink, weight: 800 });
      body += text(X0, midY - A - 22, "GRID LINES SIT ON THE PEAKS", th, { anchor: "start", size: fs - 2 });
    }
  }

  if (type === "kick") {
    const pts = [], n = 900;
    const hits = mini ? 1 : 2;
    const span = W / hits;
    for (let h2 = 0; h2 < hits; h2++) {
      for (let i = 0; i <= n / hits; i++) {
        const t = i / (n / hits);
        const env = Math.exp(-t * 5.2) * (t < 0.012 ? t / 0.012 : 1);
        const freq = 9 + 26 * Math.exp(-t * 9);
        const v = env * Math.sin(2 * Math.PI * freq * t * 0.75);
        pts.push([X0 + h2 * span + t * span, yOf(v * 1.05)]);
      }
    }
    body += grid + trace(id, polyline(pts), th, sw * 0.85);
    if (annot) {
      body += text(X0 + 82, yOf(1.0) - 8, "BIG PEAK ON THE BEAT", th, { anchor: "start", size: fs - 2, fill: th.ink });
      body += text(X0 + span * 0.55, midY - 22, "FAST FADE", th, { size: fs - 2 });
      body += text(X0 + span + 130, yOf(0.7), "NEXT KICK", th, { anchor: "start", size: fs - 2 });
      body += text(X0 + W / 2, midY + A + 34, "LOW FREQUENCY HIT: ROUGHLY 40 TO 100 HZ", th, { size: fs - 1 });
    }
  }

  if (type === "snare") {
    const items = [], r = rng(9);
    const beats = 4, span = W;
    const gx = (b) => X0 + (b + 0.30) / beats * span;
    const bw = mini ? 6 : 15;
    // hats: 8th notes, off-beat accents
    const nH = beats * 4;
    for (let i = 0; i < nH; i++) {
      const x = X0 + (i + 0.5) / nH * span;
      items.push({ x, a: A * (i % 2 ? 0.36 : 0.2) + (mini ? 0 : r() * 2), wd: mini ? 3 : 7, color: "dim", op: i % 2 ? 0.95 : 0.6 });
    }
    for (let b = 0; b < beats; b++) {
      items.push({ x: gx(b), a: A * 1.0, wd: bw, color: "gold" });
      if (b % 2 === 1) items.push({ x: gx(b) + (mini ? 11 : 28), a: A * 0.68, wd: bw * 0.85, color: "ink" });
    }
    body += mini ? "" : `<line x1="0" y1="${f(midY)}" x2="${w}" y2="${f(midY)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
    body += bars(id, items, midY, th, rx);
    if (annot) {
      for (let b = 0; b < beats; b++) body += text(gx(b) + (b % 2 === 1 ? 14 : 0), midY + A + fs + 12, String(b + 1), th, { size: fs + 4, fill: th.ink, weight: 800 });
      const ly = midY - A - 20;
      const dot = (x, c, s) => `<rect x="${x}" y="${f(ly - 12)}" width="14" height="14" rx="4" fill="${c}"/>` + text(x + 22, ly, s, th, { anchor: "start", size: fs - 2 });
      body += dot(X0, `url(#g${id})`, "KICK") + dot(X0 + 150, th.ink, "SNARE") + dot(X0 + 320, th.dim, "HI-HAT");
    }
  }

  return wrap(id, w, h, th, body);
}

module.exports = { draw, THEMES };
