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

const LEVEL = new Set(["phrase","cuemap","loops","camelot","gridfix","meters","fxjob","echoout","blendlen","halftime","arc","floor","recover","cycle","usb"]);

function draw(type, opts = {}) {
  if (LEVEL.has(type)) return require("./waves_level").drawLevel(type, opts);
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


  // ---- Mix Lab diagrams ----
  const fxLog = (f) => X0 + ((Math.log10(f) - 1.30103) / 3) * W; // 20 Hz .. 20 kHz on a log axis
  const pill = (x, y, label, size) => {
    const wd = label.length * (size * 0.72) + 26, ht = size + 14;
    return `<rect x="${f(x - wd / 2)}" y="${f(y - ht / 2)}" width="${f(wd)}" height="${f(ht)}" rx="8" fill="#C9954B"/>` +
      `<text x="${f(x)}" y="${f(y + size * 0.36)}" text-anchor="middle" font-family="Montserrat" font-weight="800" font-size="${size}" letter-spacing="2" fill="#121214">${label}</text>`;
  };

  if (type === "cut") {
    const r = rng(31), cutX = X0 + W * 0.56;
    const rowA = mini ? mid : h * 0.30, rowB = mini ? mid : h * 0.64, hh = mini ? h * 0.30 : h * 0.14;
    const step = mini ? 15 : 16, bw = mini ? 6 : 8;
    const A1 = [], B1 = [];
    for (let x = X0 + 6, k = 0; x < X1; x += step, k++) {
      const beat = k % 8 === 0, a = hh * (beat ? 1 : 0.26 + r() * 0.5);
      if (x < cutX - 5) A1.push({ x, a, wd: bw, color: "gold", op: beat ? 1 : 0.85 });
      else if (x > cutX + 5) B1.push({ x, a, wd: bw, color: "ink", op: beat ? 1 : 0.85 });
    }
    if (annot) {
      body += `<line x1="${f(cutX + 6)}" y1="${f(rowA)}" x2="${X1}" y2="${f(rowA)}" stroke="${th.base}" stroke-width="2" stroke-dasharray="3 7"/>`;
      body += `<line x1="${X0}" y1="${f(rowB)}" x2="${f(cutX - 6)}" y2="${f(rowB)}" stroke="${th.base}" stroke-width="2" stroke-dasharray="3 7"/>`;
    }
    body += bars(id, A1, rowA, th, 3) + bars(id, B1, rowB, th, 3);
    body += `<line x1="${f(cutX)}" y1="${annot ? 22 : 4}" x2="${f(cutX)}" y2="${annot ? h * 0.82 : h - 4}" stroke="#F6DDA6" stroke-width="${mini ? 3 : 3.5}" stroke-dasharray="${mini ? "0" : "9 7"}" stroke-linecap="round"/>`;
    if (annot) {
      body += pill(cutX, 16, "CUT", fs - 3);
      body += text(X0, rowA - hh - 8, "TRACK A: PLAYING", th, { anchor: "start", size: fs - 2 });
      body += text(X1, rowB - hh - 8, "TRACK B: NEXT", th, { anchor: "end", size: fs - 2 });
      body += text(X0 + W / 2, h * 0.93, "SAME BEAT. NO BLEND. NO OVERLAP.", th, { size: fs - 2, fill: th.ink });
    }
  }

  if (type === "spectrum") {
    const baseY = mini ? h * 0.9 : h * 0.70, AH = mini ? h * 0.72 : h * 0.50;
    const bandsAll = [[60, 0.30, "BASS", false], [300, 0.26, "LOW MID", false], [1000, 0.30, "MID", true], [3000, 0.24, "HIGH MID", true], [10000, 0.28, "AIR", false]];
    const bands = mini ? bandsAll.filter((b) => b[3]) : bandsAll;
    if (annot) {
      const a = fxLog(500), b = fxLog(4000);
      body += `<rect x="${f(a)}" y="${f(h * 0.10)}" width="${f(b - a)}" height="${f(baseY - h * 0.10)}" rx="10" fill="#C9954B" opacity="0.10"/>`;
      body += text((a + b) / 2, baseY - AH - 8, "VOCAL ZONE", th, { size: fs - 3, fill: th.ink });
      body += `<line x1="${X0}" y1="${f(baseY)}" x2="${X1}" y2="${f(baseY)}" stroke="${th.base}" stroke-width="1.5"/>`;
    }
    bands.forEach(([c, s0, name, hot]) => {
      const pts = [];
      for (let i = 0; i <= 160; i++) {
        const lf = 1.30103 + (i / 160) * 3;
        pts.push([X0 + (i / 160) * W, baseY - AH * Math.exp(-(((lf - Math.log10(c)) / s0) ** 2))]);
      }
      const d = polyline(pts);
      if (hot) {
        body += `<path d="${d} L${f(X1)} ${f(baseY)} L${f(X0)} ${f(baseY)} Z" fill="url(#g${id})" opacity="0.32"/>`;
        body += trace(id, d, th, sw * 0.8);
      } else {
        body += `<path d="${d}" fill="none" stroke="${th.ghost}" stroke-width="${sw * 0.55}" stroke-linejoin="round"/>`;
      }
      if (annot && !hot) body += text(fxLog(c), baseY - AH - 8, name, th, { size: fs - 4, fill: th.dim });
    });
    if (annot) [[20, "20"], [100, "100"], [500, "500"], [1000, "1K"], [5000, "5K"], [20000, "20K"]].forEach(([fr, lb]) => {
      body += text(Math.min(Math.max(fxLog(fr), X0 + 6), X1 - 10), baseY + fs + 8, lb, th, { size: fs - 3 });
    });
    if (annot) body += text(X0 + W / 2, h * 0.98, "FREQUENCY (HZ)", th, { size: fs - 4 });
  }

  if (type === "resonance") {
    const fc = 1000, top = h * (annot ? 0.20 : 0.10), plotH = h * (annot ? 0.62 : 0.80);
    const mag = (fr, Q) => { const x = fr / fc; return 1 / Math.sqrt((1 - x * x) ** 2 + (x / Q) ** 2); };
    const yDb = (db) => top + ((20 - db) / 74) * plotH;
    const mk = (Q) => { const pts = []; for (let i = 0; i <= 220; i++) { const lf = 1.30103 + (i / 220) * 3; const db = Math.max(-54, 20 * Math.log10(mag(Math.pow(10, lf), Q))); pts.push([X0 + (i / 220) * W, yDb(db)]); } return polyline(pts); };
    if (annot) {
      body += `<line x1="${f(fxLog(fc))}" y1="${f(top - 6)}" x2="${f(fxLog(fc))}" y2="${f(top + plotH)}" stroke="${th.ink}" stroke-width="2" stroke-dasharray="8 7" opacity="0.5"/>`;
      body += `<line x1="${X0}" y1="${f(yDb(0))}" x2="${X1}" y2="${f(yDb(0))}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
      body += text(fxLog(fc), top + plotH + fs + 8, "CUTOFF", th, { size: fs - 3, fill: th.ink });
      const lg = (x, c, lab) => `<rect x="${x}" y="${f(h * 0.045)}" width="30" height="5" rx="2.5" fill="${c}"/>` + text(x + 40, h * 0.045 + 12, lab, th, { anchor: "start", size: fs - 3 });
      body += lg(X0, th.ghost, "LOW Q") + lg(X0 + 170, th.ink, "MEDIUM Q") + lg(X0 + 390, `url(#g${id})`, "HIGH Q: SHARP PEAK");
    }
    body += `<path d="${mk(0.707)}" fill="none" stroke="${th.ghost}" stroke-width="${sw * 0.7}" stroke-linejoin="round" ${annot ? 'stroke-dasharray="3 7" stroke-linecap="round"' : ""}/>`;
    if (!mini) body += `<path d="${mk(2.2)}" fill="none" stroke="${th.ink}" stroke-width="${sw * 0.7}" stroke-linejoin="round"/>`;
    body += trace(id, mk(7), th, sw * 0.9);
  }

  if (type === "eqfilter") {
    const top = h * (annot ? 0.28 : 0.12), plotH = h * (annot ? 0.48 : 0.74);
    const lp = (fr) => 1 / Math.sqrt(1 + Math.pow(fr / 4000, 4));
    const hp = (fr) => { const x = fr / 250; return (x * x) / Math.sqrt(1 + Math.pow(x, 4)); };
    const mk = (fn, k) => { const pts = []; for (let i = 0; i <= 200; i++) { const lf = 1.30103 + (i / 200) * 3; pts.push([X0 + (i / 200) * W, top + (1 - fn(Math.pow(10, lf)) * k) * plotH]); } return polyline(pts); };
    if (annot) body += `<line x1="${X0}" y1="${f(top + plotH)}" x2="${X1}" y2="${f(top + plotH)}" stroke="${th.base}" stroke-width="1.5"/>`;
    const dl = mk(lp, 0.9);
    body += `<path d="${dl}" fill="none" stroke="${th.ink}" stroke-width="${sw * 0.8}" stroke-dasharray="${annot ? "12 8" : "0"}" stroke-linecap="round" stroke-linejoin="round"/>`;
    const dh = mk(hp, 1.0);
    body += `<path d="${dh} L${f(X1)} ${f(top + plotH)} L${f(X0)} ${f(top + plotH)} Z" fill="url(#g${id})" opacity="0.18"/>` + trace(id, dh, th, sw * 0.9);
    if (annot) {
      const ly = h * 0.09, mx = X0 + W * 0.52;
      body += `<rect x="${f(X0)}" y="${f(ly - 3)}" width="30" height="6" rx="3" fill="url(#g${id})"/>` + text(X0 + 40, ly + 6, "INCOMING: HIGH-PASS", th, { anchor: "start", size: fs - 3, fill: th.ink });
      body += `<line x1="${f(mx)}" y1="${f(ly)}" x2="${f(mx + 30)}" y2="${f(ly)}" stroke="${th.ink}" stroke-width="5" stroke-dasharray="6 4"/>` + text(mx + 40, ly + 6, "OUTGOING: LOW-PASS", th, { anchor: "start", size: fs - 3, fill: th.ink });
      [[60, "LOWS"], [1000, "MIDS"], [10000, "HIGHS"]].forEach(([fr, lb]) => { body += text(fxLog(fr), top + plotH + fs + 10, lb, th, { size: fs - 2, fill: th.ink }); });
    }
  }

  if (type === "eqcurve") {
    // spectrum bars behind a gold EQ curve with three adjustable bands
    const r = rng(77), n = mini ? 40 : 84, baseY = h * 0.80, topY = h * 0.14;
    const items = [];
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1), shape = 0.95 * Math.exp(-t * 2.4) + 0.22 + 0.18 * Math.exp(-(((t - 0.55) / 0.12) ** 2));
      const a = (baseY - topY) * 0.5 * Math.min(1, shape) * (0.55 + r() * 0.45);
      items.push({ x: X0 + t * W, a, wd: W / n * 0.62, color: "dim", op: 0.55 });
    }
    const mid0 = (baseY + topY) / 2;
    // bars hang from the baseline: draw as rects anchored at baseY
    body += items.map((b) => `<rect x="${f(b.x - b.wd / 2)}" y="${f(baseY - b.a * 2)}" width="${f(b.wd)}" height="${f(b.a * 2)}" rx="3" fill="${th.dim}" opacity="0.38"/>`).join("");
    body += `<line x1="${X0}" y1="${f(baseY)}" x2="${X1}" y2="${f(baseY)}" stroke="${th.base}" stroke-width="1.5"/>`;
    const nodes = [[0.13, 0.55, "LOW"], [0.50, -0.55, "MID"], [0.86, 0.40, "HIGH"]];
    const gain = (t) => nodes.reduce((a, [c, g]) => a + g * Math.exp(-(((t - c) / 0.14) ** 2)), 0);
    const pts = [];
    for (let i = 0; i <= 200; i++) { const t = i / 200; pts.push([X0 + t * W, mid0 - gain(t) * (baseY - topY) * 0.46]); }
    if (annot) body += `<line x1="${X0}" y1="${f(mid0)}" x2="${X1}" y2="${f(mid0)}" stroke="${th.base}" stroke-width="1.5" stroke-dasharray="3 7"/>`;
    body += trace(id, polyline(pts), th, sw * 1.1);
    nodes.forEach(([c, g, nm]) => {
      const x = X0 + c * W, y = mid0 - g * (baseY - topY) * 0.46;
      body += `<circle cx="${f(x)}" cy="${f(y)}" r="${mini ? 7 : 12}" fill="#121214" stroke="url(#g${id})" stroke-width="4"/>`;
      if (annot) body += text(x, baseY + fs + 8, nm, th, { size: fs - 2, fill: th.ink });
    });
  }

  if (type === "remix") {
    const r = rng(41), hh = mini ? h * 0.30 : h * 0.26, step = mini ? 13 : 14, bw = mini ? 6 : 7;
    const mY = annot ? h * 0.50 : mid, half = W * 0.43, midX = X0 + W / 2;
    const L = [], R = [];
    for (let x = X0 + 4, k = 0; x < X0 + half; x += step, k++) L.push({ x, a: hh * (0.16 + r() * 0.12), wd: bw, color: "dim", op: 0.8 });
    const nR = Math.floor(half / step);
    for (let k = 0; k < nR; k++) {
      const x = X1 - half + 4 + k * step, t = k / nR;
      let env = t < 0.42 ? 0.25 + t * 1.3 : t < 0.55 ? 0.18 : 0.75 + (k % 4 === 0 ? 0.25 : 0);
      R.push({ x, a: hh * Math.min(1, env) * (0.78 + r() * 0.22), wd: bw, color: "gold" });
    }
    body += bars(id, L, mY, th, 3) + bars(id, R, mY, th, 3);
    for (let i = 0; i < 3; i++) body += `<path d="M${f(midX - 22 + i * 17)} ${f(mY - 15)} L${f(midX - 9 + i * 17)} ${f(mY)} L${f(midX - 22 + i * 17)} ${f(mY + 15)}" fill="none" stroke="#D9A95C" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`;
    if (annot) {
      body += text(X0, mY - hh - 12, "OLD SONG", th, { anchor: "start", size: fs - 1, fill: th.ink });
      body += text(X1, mY - hh - 12, "MODERN REMIX", th, { anchor: "end", size: fs - 1, fill: th.ink });
      body += text(X0, mY + hh + fs + 10, "FLAT. LOW ENERGY.", th, { anchor: "start", size: fs - 3 });
      body += text(X1, mY + hh + fs + 10, "PUNCHY. BIG DROP.", th, { anchor: "end", size: fs - 3 });
    }
  }

  return wrap(id, w, h, th, body);
}

module.exports = { draw, THEMES, text, trace, wrap, polyline, rng, f };
