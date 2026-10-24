// HTML templates for Elevate Waveform Lab: feed slides (1080x1350), stories (1080x1920) and PDF pages.
// Brand: Onyx #121214, Ivory #F4EEE2, Elevate Gold #C9954B + gold gradient. Fonts: Downey / Downey Outline + Montserrat.
const { draw } = require("./waves");
const { cheat, HANDLE } = require("../content/lessons");

const A = "../../assets"; // HTML files live in build/tmp/
const MAN = require("../assets/jon/manifest.json");
const K = { smirk: 1.12, point: 1.25 }; // optical size tweaks per expression

// Jon sticker placed on a side with the frame-cut edge pushed off canvas. head = target head width in px.
function jon(mood, side, head, o = {}) {
  const m = MAN[mood] || MAN.smile;
  const w = Math.round((head / m.headfrac) * (K[mood] || 1));
  const flip = m.cut === "none" ? side === "left" : (m.cut === "left" && side === "right") || (m.cut === "right" && side === "left");
  const off = o.off == null ? -28 : o.off;
  return `<img class="jon" src="${A}/jon/${m.file}" style="width:${w}px;${side}:${off}px;bottom:-10px;${flip ? "transform:scaleX(-1);" : ""}">`;
}

const FONT_CSS = `
@font-face{font-family:"Downey";src:url("${A}/fonts/Downey-Black.ttf");font-weight:900}
@font-face{font-family:"Downey";src:url("${A}/fonts/Downey-Bold.ttf");font-weight:700}
@font-face{font-family:"DowneyOutline";src:url("${A}/fonts/DowneyOutline-Black.ttf");font-weight:900}
@font-face{font-family:"DowneyOutline";src:url("${A}/fonts/DowneyOutline-Light.ttf");font-weight:300}
${[400, 500, 600, 700, 800, 900].map((w) => `@font-face{font-family:"Montserrat";src:url("${A}/fonts/montserrat-latin-${w}-normal.woff2");font-weight:${w};font-style:normal}`).join("\n")}
@font-face{font-family:"Montserrat";src:url("${A}/fonts/montserrat-latin-500-italic.woff2");font-weight:500;font-style:italic}
@font-face{font-family:"Montserrat";src:url("${A}/fonts/montserrat-latin-700-italic.woff2");font-weight:700;font-style:italic}
`;

const BASE_CSS = `
*{box-sizing:border-box;margin:0;padding:0}
:root{--onyx:#121214;--ivory:#F4EEE2;--gold:#C9954B;--gold2:#D9A95C;--gold-grad:linear-gradient(135deg,#F6DDA6 0%,#D9A95C 55%,#B07F37 100%)}
html,body{background:#000}
.slide{position:relative;width:1080px;overflow:hidden;color:var(--ivory);font-family:Montserrat,sans-serif;
  background:radial-gradient(900px 720px at 88% 6%,rgba(201,149,75,.20),transparent 62%),radial-gradient(820px 720px at 4% 102%,rgba(201,149,75,.11),transparent 60%),var(--onyx)}
.slide.feed{height:1350px;--top:128px;--bot:130px;--pilltop:42px;--foot:40px}
.slide.story{height:1920px;--top:318px;--bot:330px;--pilltop:236px;--foot:262px}
.pill{position:absolute;top:var(--pilltop);left:50%;transform:translateX(-50%);z-index:5;border:2px solid rgba(244,238,226,.8);border-radius:13px;padding:10px 28px;font:600 24px/1 Montserrat;letter-spacing:.4px;color:var(--ivory);background:rgba(18,18,20,.55)}
.col{position:absolute;left:60px;right:60px;top:var(--top);bottom:var(--bot);display:flex;flex-direction:column;z-index:3}
.tag{align-self:flex-start;background:var(--gold);color:var(--onyx);transform:skewX(-14deg);padding:9px 24px;margin-bottom:22px}
.tag span{display:block;transform:skewX(14deg);font:800 24px/1 Montserrat;letter-spacing:2.4px;text-transform:uppercase}
.hl{align-self:stretch;width:100%;font-family:DowneyOutline;font-weight:900;text-transform:uppercase;color:var(--ivory);line-height:1.04;text-align:left}
.hl.c{text-align:center}
.hl .ln{display:block;white-space:nowrap}
.hl .ac{color:var(--gold2)}
.body{font:500 39px/1.38 Montserrat;color:rgba(244,238,226,.92)}
.story .body{font-size:41px}
.rule{width:96px;height:6px;border-radius:3px;background:var(--gold-grad);margin:26px 0}
.foot{position:absolute;left:60px;right:60px;bottom:var(--foot);display:flex;align-items:center;justify-content:space-between;z-index:6}
.foot .mk{height:50px;width:auto;display:block}
.dots{display:flex;gap:11px;align-items:center}
.dots i{display:block;width:13px;height:13px;border-radius:50%;background:rgba(244,238,226,.28)}
.dots i.on{width:44px;border-radius:8px;background:var(--gold-grad)}
.swipe{font:800 22px/1 Montserrat;letter-spacing:2px;color:var(--ivory)}
.jon{position:absolute;z-index:4;filter:drop-shadow(0 16px 34px rgba(0,0,0,.55))}
.card{background:linear-gradient(180deg,#1c1c1f,#151517);border:1.5px solid rgba(201,149,75,.38);border-radius:26px;padding:20px 22px 12px;position:relative}
.card .lab{font:800 20px/1 Montserrat;letter-spacing:2.6px;color:var(--gold2);text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:12px}
.card .lab:before{content:"";width:12px;height:12px;border-radius:50%;background:var(--gold-grad);display:block}
.rows{display:flex;flex-direction:column;gap:14px}
.row{display:flex;align-items:center;gap:22px;background:rgba(244,238,226,.075);border-radius:20px;padding:18px 26px 18px 22px}
.row .num{font-family:DowneyOutline;font-weight:900;font-size:84px;line-height:1;color:var(--gold2);min-width:112px}
.row .rh{font:800 29px/1.15 Montserrat;letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px}
.row .rb{font:500 25px/1.3 Montserrat;color:rgba(244,238,226,.74)}
.story .row{padding:24px 28px 24px 22px}.story .row .rh{font-size:32px}.story .row .rb{font-size:27px}
.call{background:var(--gold);color:var(--onyx);border-radius:20px;padding:24px 32px 26px}
.call b{display:block;font:800 20px/1 Montserrat;letter-spacing:2.6px}
.call p{font:italic 700 37px/1.24 Montserrat;margin-top:10px}
.steps{display:flex;flex-direction:column;gap:30px}
.step{display:flex;gap:20px;align-items:flex-start}
.step .dot{flex:none;width:54px;height:54px;border-radius:50%;border:3px solid var(--ivory);display:grid;place-items:center;font:800 25px/1 Montserrat}
.step .st{font:600 34px/1.3 Montserrat;padding-top:4px}
.story .step .st{font-size:37px}
.btn{display:inline-block;background:var(--gold);color:var(--onyx);padding:20px 44px;border-radius:14px;font:800 32px/1 Montserrat;letter-spacing:3px;text-transform:uppercase}
.artbox{border-radius:28px;overflow:hidden;border:2px solid rgba(201,149,75,.5);box-shadow:0 20px 50px rgba(0,0,0,.5);position:relative}
.artbox img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.95) contrast(1.03)}
.artbox:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(18,18,20,.45))}
.tile{background:rgba(244,238,226,.07);border-radius:20px;padding:12px 14px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:1.5px solid rgba(201,149,75,.22)}
.tile .tn{font:800 22px/1.15 Montserrat;letter-spacing:.3px;text-align:center}
.tile .ti{font:800 18px/1 Montserrat;letter-spacing:2px;color:var(--gold2)}
`;

// shrink each .ln so the whole headline fits its container, using one size per headline for a tidy look
const FIT_JS = `
async function fit(){
  await document.fonts.ready;
  document.querySelectorAll('.hl').forEach(h=>{
    const max=parseFloat(h.dataset.max||110), min=parseFloat(h.dataset.min||56);
    const poster=h.dataset.poster==='1';
    const lns=[...h.querySelectorAll('.ln')];
    const avail=h.clientWidth;
    const fitOne=(l,cap)=>{let s=cap; l.style.fontSize=s+'px'; while(l.scrollWidth>avail+1 && s>min){s-=2; l.style.fontSize=s+'px';} return s;};
    if(poster){
      const sizes=lns.map(l=>fitOne(l,max));
      const lo=Math.min(...sizes);
      lns.forEach((l,i)=>{l.style.fontSize=Math.min(sizes[i], lo*1.28)+'px';});
    } else {
      let s=max;
      for(let i=0;i<400;i++){
        let over=false;
        lns.forEach(l=>{l.style.fontSize=s+'px'; if(l.scrollWidth>avail+1) over=true;});
        if(!over||s<=min) break;
        s-=2;
      }
    }
  });
  window.__ready=true;
}
fit();
`;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headline(lines, o = {}) {
  const accentFrom = o.accentFrom == null ? 99 : o.accentFrom;
  const cls = "hl" + (o.center ? " c" : "");
  return `<div class="${cls}" data-poster="${o.poster ? 1 : 0}" data-max="${o.max || 110}" data-min="${o.min || 56}">${lines.map((l, i) => `<span class="ln${i >= accentFrom ? " ac" : ""}">${esc(l)}</span>`).join("")}</div>`;
}

const dots = (i) => `<div class="dots">${[0, 1, 2, 3, 4].map((k) => `<i class="${k === i ? "on" : ""}"></i>`).join("")}</div>`;
const L = (n) => `${A}/logos/web/${n}.png`;

function foot(i, o = {}) {
  if (o.dotsLeft) return `<div class="foot" style="justify-content:flex-start">${dots(i)}</div>`;
  const left = o.noMark ? `<span style="width:150px"></span>` : `<img class="mk" src="${L("mark-gold")}">`;
  const right = o.swipe ? `<span class="swipe">SWIPE &raquo;</span>` : `<span style="width:150px"></span>`;
  return `<div class="foot">${left}${dots(i)}${right}</div>`;
}

function shell(fmt, inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}${BASE_CSS}</style></head>
<body><div class="slide ${fmt}">${inner}</div><script>${FIT_JS}</script></body></html>`;
}

const pill = () => `<div class="pill">${HANDLE}</div>`;

// ---------- slide builders ----------
function slideHook(l, fmt) {
  const story = fmt === "story";
  const wt = l.wave === "grid" ? "complex" : l.wave;
  const waveH = story ? 360 : 300;
  const wave = draw(wt, { w: 1080, h: waveH, mini: true });
  const col = `<div class="col" style="align-items:center">
    ${headline(l.hook.lines, { center: true, poster: true, accentFrom: l.hook.accentFrom, max: story ? 150 : 140, min: 70 })}
  </div>`;
  const waveTop = story ? 880 : 640;
  return shell(fmt, `${pill()}${col}
    <div style="position:absolute;left:0;top:${waveTop}px;width:1080px;z-index:2;opacity:.95">${wave}</div>
    ${jon(l.mood.hook, "right", story ? 275 : 240)}
    <div style="position:absolute;left:60px;bottom:${story ? 330 : 120}px;width:470px;z-index:5;display:flex;flex-direction:column;align-items:flex-start">
      <div class="rule" style="margin:0 0 18px"></div>
      <div style="font:700 33px/1.3 Montserrat;color:var(--ivory)">${esc(l.hook.sub).replace(", explained", ",<br>explained")}</div>
      <div class="tag" style="margin:22px 0 0"><span>SWIPE &raquo;</span></div>
    </div>
    ${foot(0)}`);
}

function slidePain(l, fmt) {
  const story = fmt === "story";
  const hl = headline(l.pain.head, { max: story ? 118 : 112, min: 60 });
  if (l.layout === "art") {
    const artH = story ? 700 : 520;
    return shell(fmt, `${pill()}<div class="col">
      <div class="tag"><span>THE PROBLEM</span></div>
      ${hl}
      <div class="artbox" style="height:${artH}px;margin:${story ? 40 : 28}px 0 ${story ? 36 : 24}px"><img src="${A}/art/${l.art}.jpg"></div>
      <div class="body">${esc(l.pain.body)}</div>
    </div>${foot(1)}`);
  }
  return shell(fmt, `${pill()}<div class="col">
      <div class="tag"><span>THE PROBLEM</span></div>
      ${hl}
      <div class="rule"></div>
      <div class="body" style="width:${story ? 520 : 540}px;margin-left:auto;margin-top:${story ? 20 : 0}px;${story ? "font-size:45px;" : ""}">${esc(l.pain.body)}</div>
    </div>
    ${jon(l.mood.pain, "left", story ? 300 : 215)}
    ${foot(1, { noMark: true })}`);
}

function slideSpot(l, fmt) {
  const story = fmt === "story";
  const hl = headline(l.spot.head, { max: story ? 112 : 104, min: 60 });
  if (l.wave === "grid") return slideGrid(l, fmt, hl);
  const cardW = 876, cardH = story ? 420 : 300;
  const svg = draw(l.wave, { w: cardW, h: cardH - 44 });
  const rows = l.spot.items.map(([h, b], i) => `<div class="row"><div class="num">0${i + 1}</div><div><div class="rh">${esc(h)}</div><div class="rb">${esc(b)}</div></div></div>`).join("");
  return shell(fmt, `${pill()}<div class="col">
    <div class="tag"><span>WHAT YOU'RE MISSING</span></div>
    ${hl}
    <div class="card" style="margin:${story ? 34 : 24}px 0 ${story ? 28 : 20}px"><div class="lab">${esc(l.spot.label)}</div>${svg}</div>
    <div class="rows">${rows}</div>
  </div>${foot(2)}`);
}

function slideGrid(l, fmt, hl) {
  const story = fmt === "story";
  const tiles = cheat.map((c, i) => `<div class="tile"><div class="ti">${String(i + 1).padStart(2, "0")}</div>${draw(c.key, { w: 250, h: story ? 130 : 96, mini: true })}<div class="tn">${esc(c.name)}</div></div>`).join("");
  const last = `<div class="tile" style="border-color:rgba(201,149,75,.5)"><img src="${L("mark-gold")}" style="height:${story ? 90 : 64}px"><div class="tn" style="color:var(--gold2)">Waveform Lab</div></div>`;
  return shell(fmt, `${pill()}<div class="col">
    <div class="tag"><span>THE CHEAT SHEET</span></div>
    ${hl}
    <div style="display:grid;grid-template-columns:repeat(3,1fr);grid-auto-rows:1fr;gap:14px;flex:1;margin-top:${story ? 30 : 20}px">${tiles}${last}</div>
  </div>${foot(2)}`);
}

function slideFix(l, fmt) {
  const story = fmt === "story";
  const hl = headline(l.fix.head, { max: story ? 112 : 104, min: 60 });
  const steps = l.fix.steps.map((s, i) => `<div class="step"><div class="dot">${i + 1}</div><div class="st">${esc(s)}</div></div>`).join("");
  return shell(fmt, `${pill()}<div class="col">
    <div class="tag"><span>THE FIX</span></div>
    ${hl}
    <div class="call" style="margin:${story ? 34 : 24}px 0 ${story ? 36 : 26}px"><b>DO THIS:</b><p>${esc(l.fix.callout)}</p></div>
    <div class="steps" style="width:${story ? 600 : 570}px">${steps}</div>
  </div>
  ${jon(l.mood.fix, "right", story ? 245 : 190)}
  ${foot(3)}`);
}

function slideCta(l, fmt) {
  const story = fmt === "story";
  const lines = l.roundup ? ["WANT EVERY", "LESSON IN", "THE SERIES?"] : ["WANT MORE", "LESSONS LIKE", "THIS?"];
  return shell(fmt, `${pill()}<div class="col" style="align-items:center;text-align:center">
    ${headline(lines, { center: true, accentFrom: 2, max: story ? 128 : 120, min: 70 })}
    <div style="font:600 36px/1.35 Montserrat;margin-top:${story ? 34 : 24}px;max-width:820px">Join Elevate DJ Academy.<br><span style="color:var(--gold2)">It's free.</span></div>
    <div style="margin-top:${story ? 36 : 26}px"><span class="btn">LINK IN BIO</span></div>
  </div>
  ${jon(l.mood.cta, "right", story ? 270 : 255)}
  <div style="position:absolute;left:60px;bottom:${story ? 330 : 150}px;z-index:6;width:430px">
    <img src="${L("secondary-ivory")}" style="width:${story ? 380 : 400}px;display:block">
    <div style="font:700 28px/1 Montserrat;margin-top:20px;letter-spacing:.4px">${HANDLE}</div>
  </div>
  ${foot(4, { dotsLeft: true })}`);
}

const SLIDES = [
  ["01-hook", slideHook],
  ["02-pain", slidePain],
  ["03-struggles", slideSpot],
  ["04-solution", slideFix],
  ["05-cta", slideCta],
];

// ---------- PDF ----------
const PDF_CSS = `
@page{size:816px 1056px;margin:0}
.page{position:relative;width:816px;height:1056px;overflow:hidden;background:#F4EEE2;color:#121214;font-family:Montserrat,sans-serif;page-break-after:always}
.page:last-child{page-break-after:auto}
.top{height:84px;background:#121214;display:flex;align-items:center;justify-content:space-between;padding:0 44px}
.top img{height:40px;display:block}
.top .ml{font:800 11px/1 Montserrat;letter-spacing:2.6px;color:#D9A95C;text-transform:uppercase}
.wrap{padding:30px 44px 0}
.ptag{display:inline-block;background:#C9954B;color:#121214;transform:skewX(-14deg);padding:7px 18px}
.ptag span{display:block;transform:skewX(14deg);font:800 12px/1 Montserrat;letter-spacing:2.2px;text-transform:uppercase}
.ptitle{font-family:DowneyOutline;font-weight:900;text-transform:uppercase;color:#121214;line-height:1.02;margin:16px 0 4px;white-space:nowrap}
.psub{font:600 15px/1.3 Montserrat;color:rgba(18,18,20,.66);letter-spacing:.3px}
.h3{font:800 12px/1 Montserrat;letter-spacing:2.4px;text-transform:uppercase;color:#9C6B2C;margin:0 0 8px}
.p{font:500 14.5px/1.5 Montserrat;color:#121214}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:26px;margin-top:22px}
.dcard{background:#121214;border-radius:20px;padding:14px 18px 6px;margin-top:20px;position:relative;overflow:hidden}
.dcard .lab{font:800 11px/1 Montserrat;letter-spacing:2.4px;color:#D9A95C;text-transform:uppercase;margin-bottom:4px}
.feat{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:18px}
.fc{background:#fff;border:1.5px solid rgba(18,18,20,.12);border-radius:16px;padding:12px 14px 14px}
.fc .n{font-family:DowneyOutline;font-weight:900;font-size:34px;line-height:1;color:#B07F37}
.fc .t{font:800 12.5px/1.2 Montserrat;letter-spacing:.3px;text-transform:uppercase;margin:6px 0 5px}
.fc .d{font:500 12.5px/1.4 Montserrat;color:rgba(18,18,20,.74)}
.ul{list-style:none}
.ul li{font:500 13.5px/1.45 Montserrat;padding-left:20px;position:relative;margin-bottom:6px}
.ul li:before{content:"";position:absolute;left:0;top:7px;width:8px;height:8px;border-radius:2px;background:#C9954B}
.drill{background:#C9954B;border-radius:18px;padding:16px 20px 16px;margin-top:20px}
.drill .dh{font:800 11px/1 Montserrat;letter-spacing:2.4px}
.drill .dq{font:italic 700 17px/1.25 Montserrat;margin:6px 0 10px}
.chk{display:flex;gap:10px;align-items:flex-start;font:600 13px/1.35 Montserrat;margin-bottom:6px}
.chk i{flex:none;width:15px;height:15px;border:2px solid #121214;border-radius:4px;margin-top:1px}
.pfoot{position:absolute;left:0;right:0;bottom:0;height:92px;background:#121214;color:#F4EEE2;display:flex;align-items:center;padding:0 44px;gap:18px}
.pfoot img.mk{height:42px}
.pfoot .t1{font:800 13px/1.2 Montserrat;letter-spacing:.4px}
.pfoot .t2{font:500 11.5px/1.3 Montserrat;color:rgba(244,238,226,.72);margin-top:3px}
.pfoot .jon{position:absolute;right:30px;bottom:0;height:128px;filter:none}
.qa{background:#fff;border:1.5px solid rgba(18,18,20,.12);border-radius:16px;padding:14px 18px 12px;margin-bottom:14px}
.qa .q{font:700 14.5px/1.3 Montserrat}
.qa .ln2{border-bottom:1.5px solid rgba(18,18,20,.28);height:30px}
.rem{background:#121214;color:#F4EEE2;border-radius:20px;padding:20px 24px;margin-top:20px}
.rem .rh2{font:800 11px/1 Montserrat;letter-spacing:2.4px;color:#D9A95C}
.rem .rt{font:italic 700 21px/1.3 Montserrat;margin-top:8px}
.notes{margin-top:20px}
.notes .nl{border-bottom:1.5px solid rgba(18,18,20,.22);height:30px}
.ans{font:500 10.5px/1.5 Montserrat;color:rgba(18,18,20,.55);margin-top:14px}
.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:20px}
.gt{background:#121214;color:#F4EEE2;border-radius:16px;padding:10px 12px 12px;text-align:center}
.gt .gn{font:800 10px/1 Montserrat;letter-spacing:2px;color:#D9A95C;text-align:left}
.gt .gname{font:800 13px/1.15 Montserrat;margin:2px 0 3px}
.gt .gl{font:500 10.8px/1.35 Montserrat;color:rgba(244,238,226,.78)}
.plan{display:grid;grid-template-columns:1fr 1fr;gap:10px 22px;margin-top:16px}
.pd{display:flex;gap:10px;align-items:flex-start;background:#fff;border:1.5px solid rgba(18,18,20,.12);border-radius:12px;padding:9px 12px}
.pd i{flex:none;width:15px;height:15px;border:2px solid #121214;border-radius:4px;margin-top:2px}
.pd .d1{font:800 10px/1 Montserrat;letter-spacing:1.8px;color:#9C6B2C}
.pd .d2{font:700 13px/1.25 Montserrat;margin-top:3px}
.pd .d3{font:500 11px/1.3 Montserrat;color:rgba(18,18,20,.66)}
`;

function pdfTop(l) {
  return `<div class="top"><img src="${L("secondary-ivory")}"><div class="ml">Waveform Lab &middot; ${l.roundup ? "Cheat Sheet" : "Lesson " + String(l.n).padStart(2, "0") + " of 11"}</div></div>`;
}
function pdfFoot() {
  return `<div class="pfoot"><img class="mk" src="${L("mark-gold")}"><div><div class="t1">${HANDLE} &middot; Elevate DJ Academy</div><div class="t2">Join the free academy. Link in bio.</div></div><img class="jon" src="${A}/jon/jon-smile-sticker.png"></div>`;
}

function pdfLesson(l, next) {
  const p = l.pdf;
  const diag = draw(l.wave, { w: 724, h: 176, theme: "dark" });
  const feats = l.spot.items.map(([h, b], i) => `<div class="fc"><div class="n">0${i + 1}</div><div class="t">${esc(h)}</div><div class="d">${esc(b)}</div></div>`).join("");
  const use = p.use.map((u) => `<li>${esc(u)}</li>`).join("");
  const steps = l.fix.steps.map((s) => `<div class="chk"><i></i><span>${esc(s)}</span></div>`).join("");
  const page1 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>Quick Guide</span></span>
    <div class="ptitle" data-max="54" data-min="34" id="pt1">${esc(l.name)}</div>
    <div class="psub">What it is, how to spot it and what to do with it.</div>
    <div class="cols"><div><div class="h3">What it is</div><div class="p">${esc(p.what)}</div></div>
      <div><div class="h3">How it sounds</div><div class="p">${esc(p.feel)}</div></div></div>
    <div class="dcard"><div class="lab">${esc(l.spot.label)}</div>${diag}</div>
    <div class="feat">${feats}</div>
    <div class="drill"><div class="dh">DO THIS TONIGHT</div><div class="dq">${esc(l.fix.callout)}</div>${steps}</div>
  </div>${pdfFoot()}</div>`;
  const qa = p.check.map(([q], i) => `<div class="qa"><div class="q">${i + 1}. ${esc(q)}</div><div class="ln2"></div></div>`).join("");
  const ans = p.check.map(([, a], i) => `${i + 1}) ${esc(a)}`).join("&nbsp;&nbsp;&nbsp;&nbsp;");
  const page2 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>Practice &amp; Check</span></span>
    <div class="ptitle" data-max="46" data-min="28" id="pt2">${esc(l.name)}: your turn</div>
    <div style="margin-top:18px"><div class="h3">Where you'll meet it as a DJ</div><ul class="ul">${use}</ul></div>
    <div style="margin-top:16px"><div class="h3">Quick check</div>${qa}
      <div class="ans"><b>Answer key:</b> ${ans}</div></div>
    <div class="rem"><div class="rh2">REMEMBER</div><div class="rt">${esc(p.remember)}</div></div>
    <div class="notes"><div class="h3">Your notes</div>${'<div class="nl"></div>'.repeat(3)}</div>
    ${next ? `<div class="p" style="margin-top:14px"><b style="color:#9C6B2C;letter-spacing:2px;font-size:11px">UP NEXT</b>&nbsp;&nbsp;${esc(next.name)}</div>` : ""}
  </div>${pdfFoot()}</div>`;
  return pdfShell(page1 + page2);
}

function pdfRoundup(l) {
  const tiles = cheat.map((c, i) => `<div class="gt"><div class="gn">${String(i + 1).padStart(2, "0")}</div>${draw(c.key, { w: 200, h: 62, mini: true })}<div class="gname">${esc(c.name)}</div><div class="gl">${esc(c.line)}</div></div>`).join("");
  const page1 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>Cheat Sheet</span></span>
    <div class="ptitle" data-max="58" data-min="34" id="pt1">The 11 Waveforms</div>
    <div class="psub">Every DJ should know these. Print it, pin it above your desk and learn one a day.</div>
    <div class="grid3">${tiles}<div class="gt" style="display:flex;flex-direction:column;align-items:center;justify-content:center"><img src="${L("mark-gold")}" style="height:52px"><div class="gname" style="color:#D9A95C;margin-top:8px">Waveform Lab</div><div class="gl">Full lesson on each one inside the academy.</div></div></div>
    <div class="rem" style="margin-top:14px;padding:14px 22px"><div class="rh2">REMEMBER</div><div class="rt" style="font-size:18px">${esc(l.pdf.remember)}</div></div>
  </div>${pdfFoot()}</div>`;
  const days = cheat.map((c, i) => `<div class="pd"><i></i><div><div class="d1">DAY ${i + 1}</div><div class="d2">${esc(c.name)}</div><div class="d3">Find it in a real track you play.</div></div></div>`).join("");
  const page2 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>11-Day Plan</span></span>
    <div class="ptitle" data-max="46" data-min="30" id="pt2">One waveform a day</div>
    <div class="psub">Tick it off when you've spotted it in a real track.</div>
    <div class="plan">${days}</div>
    <div class="notes"><div class="h3">What I noticed</div>${'<div class="nl"></div>'.repeat(5)}</div>
  </div>${pdfFoot()}</div>`;
  return pdfShell(page1 + page2);
}

const PDF_FIT = `
async function fit(){
  await document.fonts.ready;
  document.querySelectorAll('.ptitle').forEach(h=>{
    const max=parseFloat(h.dataset.max), min=parseFloat(h.dataset.min); let s=max;
    const avail=h.parentElement.clientWidth-88;
    h.style.fontSize=s+'px';
    while(h.scrollWidth>avail && s>min){ s-=1; h.style.fontSize=s+'px'; }
  });
  window.__ready=true;
}
fit();`;

function pdfShell(pages) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}${PDF_CSS}*{box-sizing:border-box;margin:0;padding:0}html,body{background:#F4EEE2}</style></head><body>${pages}<script>${PDF_FIT}</script></body></html>`;
}

module.exports = { SLIDES, pdfLesson, pdfRoundup };
