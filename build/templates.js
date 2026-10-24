// HTML templates for Elevate Waveform Lab: feed slides (1080x1350), stories (1080x1920) and PDF pages.
// Brand: Onyx #121214, Ivory #F4EEE2, Elevate Gold #C9954B + gold gradient. Fonts: Downey / Downey Outline + Montserrat.
const { draw } = require("./waves");
const { cheat, HANDLE } = require("../content/lessons");

const A = "../../assets"; // HTML files live in build/tmp/
const MAN = require("../assets/jon/manifest.json");
const K = { smirk: 1.12, point: 1.25 }; // optical size tweaks per expression
let THEME = "onyx", TOTAL = 5, CUR_IDX = null; // set per slide by slidesFor()
const ivory = () => THEME === "ivory";

// Gear pictures that replace the old people scenes. Photos come from Jon's own DDJ-REV7 / DDJ-FLX4 product shots.
const GEAR = {
  eqwave: { type: "eqwave", h: 440, hs: 600, label: "EQ WAVEFORM" },
  "eqknobs-rev7": { type: "strip", img: "rev7-eq-knobs.jpg", h: 400, hs: 540, label: "EQ KNOBS" },
  "eqknobs-flx4": { type: "knobs2", img: "flx4-eq-knobs.jpg", h: 520, hs: 700, label: "EQ KNOBS" },
  "equip-rev7": { type: "mosaic", left: "rev7-jog.jpg", rt: "rev7-pads.jpg", rb: "rev7-meter-faders.jpg", h: 520, hs: 700, label: "DJ EQUIPMENT" },
  "equip-flx4": { type: "mosaic", left: "flx4-eq-knobs.jpg", rt: "flx4-pads.jpg", rb: "flx4-faders.jpg", h: 520, hs: 700, label: "DJ EQUIPMENT" },
  "rev7-full": { type: "product", img: "ddj-rev7.png", h: 500, hs: 660, label: "DDJ-REV7" },
  "flx4-full": { type: "product", img: "ddj-flx4.png", h: 500, hs: 660, label: "DDJ-FLX4" },
  both: { type: "both", h: 500, hs: 660, label: "DDJ-REV7 + DDJ-FLX4" },
};

function gearPanel(key, fmt) {
  const g = GEAR[key], story = fmt === "story", H = story ? g.hs : g.h;
  const chip = g.label ? `<div class="chip">${esc(g.label)}</div>` : "";
  const G = (f) => `${A}/gear/${f}`;
  let cls = "dark", inner = "";
  if (g.type === "product") { cls = "light"; inner = `<img class="prod" src="${G(g.img)}">`; }
  else if (g.type === "both") { cls = "light"; inner = `<div class="duo"><img src="${G("ddj-rev7.png")}"><img src="${G("ddj-flx4.png")}"></div>`; }
  else if (g.type === "strip") { inner = `<img class="strip" src="${G(g.img)}">`; }
  else if (g.type === "mosaic") { inner = `<div class="mos"><img class="m1" src="${G(g.left)}"><div class="m2"><img src="${G(g.rt)}"><img src="${G(g.rb)}"></div></div>`; }
  else if (g.type === "knobs2") {
    const rows = [["HI", "Air and sparkle"], ["MID", "Where vocals live"], ["LOW", "Bass and kick"]];
    inner = `<div class="k2"><img style="height:${H}px;width:auto" src="${G(g.img)}"><div class="k2t">${rows.map(([a, b], i) => `<div class="${i === 1 ? "hot" : ""}"><b>${a}</b><span>${b}</span></div>`).join("")}</div></div>`;
  } else if (g.type === "eqwave") { inner = `<div class="eqw">${draw("eqcurve", { w: 900, h: H - 40 })}</div>`; }
  return `<div class="gear ${cls}" style="height:${H}px">${inner}${chip}</div>`;
}

// Jon sticker placed on a side with the frame-cut edge pushed off canvas. head = target head width in px.
function jon(mood, side, head, o = {}) {
  const m = MAN[mood] || MAN.smile;
  const w = Math.round((head / m.headfrac) * (K[mood] || 1));
  const flip = m.cut === "none" ? side === "left" : (m.cut === "left" && side === "right") || (m.cut === "right" && side === "left");
  const off = o.off == null ? -28 : o.off;
  const file = ivory() && m.file_gold ? m.file_gold : m.file;
  return `<img class="jon" src="${A}/jon/${file}" style="width:${w}px;${side}:${off}px;bottom:-10px;${flip ? "transform:scaleX(-1);" : ""}">`;
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
:root{--onyx:#121214;--ivory:#F4EEE2;--gold:#C9954B;--gold2:#D9A95C;--gold-grad:linear-gradient(135deg,#F6DDA6 0%,#D9A95C 55%,#B07F37 100%);--fg:#F4EEE2;--acc:#D9A95C;--bodyc:rgba(244,238,226,.92);--cardbg:rgba(244,238,226,.075);--cardmute:rgba(244,238,226,.74);--dot:rgba(244,238,226,.28)}
html,body{background:#000}
.slide{position:relative;width:1080px;overflow:hidden;color:var(--fg);font-family:Montserrat,sans-serif;
  background:radial-gradient(900px 720px at 88% 6%,rgba(201,149,75,.20),transparent 62%),radial-gradient(820px 720px at 4% 102%,rgba(201,149,75,.11),transparent 60%),var(--onyx)}
.slide.feed{height:1350px;--top:128px;--bot:130px;--pilltop:42px;--foot:40px}
.slide.story{height:1920px;--top:318px;--bot:330px;--pilltop:236px;--foot:262px}
.pill{position:absolute;top:var(--pilltop);left:50%;transform:translateX(-50%);z-index:5;border:2px solid var(--fg);border-radius:13px;padding:10px 28px;font:600 24px/1 Montserrat;letter-spacing:.4px;color:var(--fg);background:var(--pillbg,rgba(18,18,20,.55))}
.col{position:absolute;left:60px;right:60px;top:var(--top);bottom:var(--bot);display:flex;flex-direction:column;z-index:3}
.tag{align-self:flex-start;background:var(--gold);color:var(--onyx);transform:skewX(-14deg);padding:9px 24px;margin-bottom:22px}
.tag span{display:block;transform:skewX(14deg);font:800 24px/1 Montserrat;letter-spacing:2.4px;text-transform:uppercase}
.hl{align-self:stretch;width:100%;font-family:DowneyOutline;font-weight:900;text-transform:uppercase;color:var(--fg);line-height:1.04;text-align:left}
.hl.c{text-align:center}
.hl .ln{display:block;white-space:nowrap}
.hl .ac{color:var(--acc)}
.body{font:500 39px/1.38 Montserrat;color:var(--bodyc)}
.story .body{font-size:41px}
.rule{width:96px;height:6px;border-radius:3px;background:var(--gold-grad);margin:26px 0}
.foot{position:absolute;left:60px;right:60px;bottom:var(--foot);display:flex;align-items:center;justify-content:space-between;z-index:6}
.foot .mk{height:50px;width:auto;display:block}
.dots{display:flex;gap:11px;align-items:center}
.dots i{display:block;width:13px;height:13px;border-radius:50%;background:var(--dot)}
.dots i.on{width:44px;border-radius:8px;background:var(--gold-grad)}
.swipe{font:800 22px/1 Montserrat;letter-spacing:2px;color:var(--fg)}
.jon{position:absolute;z-index:4;filter:drop-shadow(0 16px 34px rgba(0,0,0,.55))}
.card{background:linear-gradient(180deg,#1c1c1f,#151517);border:1.5px solid rgba(201,149,75,.38);border-radius:26px;padding:20px 22px 12px;position:relative}
.card .lab{font:800 20px/1 Montserrat;letter-spacing:2.6px;color:var(--gold2);text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:12px}
.card .lab:before{content:"";width:12px;height:12px;border-radius:50%;background:var(--gold-grad);display:block}
.rows{display:flex;flex-direction:column;gap:14px}
.row{display:flex;align-items:center;gap:22px;background:var(--cardbg);border-radius:20px;padding:18px 26px 18px 22px}
.row .num{font-family:DowneyOutline;font-weight:900;font-size:84px;line-height:1;color:var(--acc);min-width:112px}
.row .rh{font:800 29px/1.15 Montserrat;letter-spacing:.4px;text-transform:uppercase;margin-bottom:6px}
.row .rb{font:500 25px/1.3 Montserrat;color:var(--cardmute)}
.story .row{padding:24px 28px 24px 22px}.story .row .rh{font-size:32px}.story .row .rb{font-size:27px}
.call{background:var(--gold);color:var(--onyx);border-radius:20px;padding:24px 32px 26px}
.call b{display:block;font:800 20px/1 Montserrat;letter-spacing:2.6px}
.call p{font:italic 700 37px/1.24 Montserrat;margin-top:10px}
.steps{display:flex;flex-direction:column;gap:30px}
.step{display:flex;gap:20px;align-items:flex-start}
.step .dot{flex:none;width:54px;height:54px;border-radius:50%;border:3px solid var(--fg);display:grid;place-items:center;font:800 25px/1 Montserrat}
.step .st{font:600 34px/1.3 Montserrat;padding-top:4px}
.story .step .st{font-size:37px}
.btn{display:inline-block;background:var(--gold);color:var(--onyx);padding:20px 44px;border-radius:14px;font:800 32px/1 Montserrat;letter-spacing:3px;text-transform:uppercase}
.artbox{border-radius:28px;overflow:hidden;border:2px solid rgba(201,149,75,.5);box-shadow:0 20px 50px rgba(0,0,0,.5);position:relative}
.artbox img{display:block;width:100%;height:100%;object-fit:cover;filter:saturate(.95) contrast(1.03)}
.artbox:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(18,18,20,.45))}
.tile{background:linear-gradient(180deg,#1c1c1f,#151517);color:#F4EEE2;border-radius:20px;padding:12px 14px 14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;border:1.5px solid rgba(201,149,75,.22)}
.tile .tn{font:800 22px/1.15 Montserrat;letter-spacing:.3px;text-align:center}
.tile .ti{font:800 18px/1 Montserrat;letter-spacing:2px;color:var(--gold2)}
.slide.ivory{--fg:#121214;--acc:#A7722F;--bodyc:rgba(18,18,20,.88);--cardbg:rgba(255,255,255,.78);--cardmute:rgba(18,18,20,.72);--dot:rgba(18,18,20,.22);--pillbg:rgba(244,238,226,.65);
  background:radial-gradient(900px 720px at 88% 6%,rgba(201,149,75,.34),transparent 62%),radial-gradient(820px 720px at 4% 102%,rgba(201,149,75,.22),transparent 60%),#F4EEE2}
.ivory .jon{filter:drop-shadow(0 14px 26px rgba(70,45,10,.32))}
.ivory .row{box-shadow:inset 0 0 0 1.5px rgba(18,18,20,.07),0 6px 18px rgba(70,45,10,.07)}
.ivory .call{background:#121214;color:#F4EEE2}.ivory .call b{color:#D9A95C}
.gear{position:relative;border-radius:28px;overflow:hidden;border:2px solid rgba(201,149,75,.6);box-shadow:0 22px 50px rgba(0,0,0,.35)}
.ivory .gear{box-shadow:0 22px 44px rgba(70,45,10,.28)}
.gear.dark{background:#0e0e10}
.gear.light{background:radial-gradient(700px 330px at 50% 45%,#ffffff,#E6DCC7 80%)}
.gear .chip{position:absolute;left:22px;top:20px;background:var(--gold);color:var(--onyx);font:800 20px/1 Montserrat;letter-spacing:2.2px;padding:9px 18px;border-radius:8px;z-index:3}
.gear .prod{position:absolute;left:50%;top:54%;transform:translate(-50%,-50%);width:90%;max-height:78%;object-fit:contain;filter:drop-shadow(0 22px 22px rgba(0,0,0,.4))}
.gear .duo{position:absolute;inset:0}
.gear .duo img{position:absolute;height:auto;filter:drop-shadow(0 16px 16px rgba(0,0,0,.42))}.gear .duo img:first-child{width:76%;left:3%;top:64px}.gear .duo img:last-child{width:56%;right:3%;bottom:12px}
.gear .strip{position:absolute;left:0;top:50%;transform:translateY(-50%);width:100%}
.gear .mos{position:absolute;inset:0;display:grid;grid-template-columns:1.05fr 1fr}
.gear .mos .m1{width:100%;height:100%;object-fit:cover}
.gear .mos .m2{display:grid;grid-template-rows:auto 1fr;gap:0;border-left:2px solid rgba(201,149,75,.5)}
.gear .mos .m2 img{width:100%;display:block;object-fit:cover}
.gear .mos .m2 img:last-child{height:100%;min-height:0;object-position:top}
.gear .k2{position:absolute;inset:0;display:flex;align-items:stretch}.gear .k2t{flex:1}
.gear .k2 img{display:block;max-width:none}
.gear .k2t{display:flex;flex-direction:column;justify-content:center;gap:18px;padding:0 30px 0 36px}
.gear .k2t div{display:flex;flex-direction:column;gap:2px;border-bottom:2px solid rgba(244,238,226,.14);padding-bottom:14px;color:#F4EEE2}
.gear .k2t b{font-family:DowneyOutline;font-weight:900;font-size:58px;line-height:1}
.gear .k2t span{font:600 25px/1.2 Montserrat;color:rgba(244,238,226,.8)}
.gear .k2t .hot{border-color:var(--gold)}.gear .k2t .hot b{color:#D9A95C}.gear .k2t .hot span{color:#F6DDA6}
.gear .eqw{position:absolute;inset:48px 24px 0}
.scards{display:flex;flex-direction:column;gap:14px;flex:1;margin-top:8px}
.scard{flex:1;display:flex;gap:20px;align-items:center;background:var(--cardbg);border-radius:22px;padding:14px 26px 14px 20px}
.ivory .scard{box-shadow:inset 0 0 0 1.5px rgba(18,18,20,.07),0 6px 18px rgba(70,45,10,.07)}
.scard .sn{font-family:DowneyOutline;font-weight:900;font-size:72px;line-height:1;color:var(--acc);min-width:100px}
.scard .sname{font:800 34px/1.05 Montserrat;letter-spacing:.5px;text-transform:uppercase}
.scard .stag{font:600 23px/1.25 Montserrat;color:var(--cardmute);margin:5px 0 8px}
.scard .chips{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:9px}
.scard .chips i{font:800 16px/1 Montserrat;letter-spacing:1.4px;font-style:normal;padding:6px 12px;border-radius:999px;background:var(--gold);color:var(--onyx)}
.scard ul{list-style:none}
.scard li{font:500 23px/1.3 Montserrat;padding-left:22px;position:relative}
.scard li:before{content:"";position:absolute;left:0;top:10px;width:9px;height:9px;border-radius:2px;background:var(--acc)}
.story .scard .sname{font-size:38px}.story .scard .stag{font-size:26px}.story .scard li{font-size:26px}.story .scard .chips i{font-size:18px}
.tbl{width:100%;border-collapse:separate;border-spacing:0 8px;margin-top:6px}
.tbl th{font:800 17px/1 Montserrat;letter-spacing:2.2px;text-transform:uppercase;color:var(--acc);text-align:left;padding:0 16px 4px}
.tbl td{background:var(--cardbg);font:600 22px/1.2 Montserrat;padding:12px 16px;color:var(--fg)}
.tbl td:first-child{border-radius:14px 0 0 14px;font-weight:800;white-space:nowrap}.tbl td:last-child{white-space:nowrap}.tbl td:last-child{border-radius:0 14px 14px 0}
.ivory .tbl td{box-shadow:inset 0 1.5px 0 rgba(18,18,20,.06),inset 0 -1.5px 0 rgba(18,18,20,.06)}
.story .tbl td{font-size:24px;padding:13px 14px}.story .tbl th{font-size:19px}
.note{font:500 21px/1.3 Montserrat;color:var(--cardmute);margin-top:6px}
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

const dots = (i) => { const cur = CUR_IDX == null ? i : CUR_IDX; return `<div class="dots">${Array.from({ length: TOTAL }, (_, k) => `<i class="${k === cur ? "on" : ""}"></i>`).join("")}</div>`; };
const L = (n) => `${A}/logos/web/${n}.png`;

function foot(i, o = {}) {
  if (o.dotsLeft) return `<div class="foot" style="justify-content:flex-start">${dots(i)}</div>`;
  const left = o.noMark ? `<span style="width:150px"></span>` : `<img class="mk" src="${L("mark-gold")}">`;
  const right = o.swipe ? `<span class="swipe">SWIPE &raquo;</span>` : `<span style="width:150px"></span>`;
  return `<div class="foot">${left}${dots(i)}${right}</div>`;
}

function shell(fmt, inner) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>${FONT_CSS}${BASE_CSS}</style></head>
<body><div class="slide ${fmt}${ivory() ? " ivory" : ""}">${inner}</div><script>${FIT_JS}</script></body></html>`;
}

const pill = () => `<div class="pill">${HANDLE}</div>`;

// ---------- slide builders ----------
function slideHook(l, fmt) {
  const story = fmt === "story";
  const wt = l.wave === "grid" ? "complex" : l.wave;
  const waveH = story ? 360 : 300;
  const wave = draw(wt, { w: 1080, h: waveH, mini: true, theme: ivory() ? "light" : "dark" });
  const col = `<div class="col" style="align-items:center">
    ${headline(l.hook.lines, { center: true, poster: true, accentFrom: l.hook.accentFrom, max: story ? 150 : 140, min: 70 })}
  </div>`;
  const waveTop = story ? 880 : 640;
  return shell(fmt, `${pill()}${col}
    <div style="position:absolute;left:0;top:${waveTop}px;width:1080px;z-index:2;opacity:.95">${wave}</div>
    ${jon(l.mood.hook, "right", story ? 275 : 240)}
    <div style="position:absolute;left:60px;bottom:${story ? 330 : 120}px;width:470px;z-index:5;display:flex;flex-direction:column;align-items:flex-start">
      <div class="rule" style="margin:0 0 18px"></div>
      <div style="font:700 33px/1.3 Montserrat;color:var(--fg)">${esc(l.hook.sub).replace(", explained", ",<br>explained")}</div>
      <div class="tag" style="margin:22px 0 0"><span>SWIPE &raquo;</span></div>
    </div>
    ${foot(0)}`);
}

function slidePain(l, fmt) {
  const story = fmt === "story";
  const hl = headline(l.pain.head, { max: story ? 118 : 112, min: 60 });
  if (l.layout === "art") {
    const panel = l.gear ? gearPanel(l.gear, fmt) : `<div class="artbox" style="height:${story ? 700 : 520}px"><img src="${A}/art/${l.art}.jpg"></div>`;
    return shell(fmt, `${pill()}<div class="col">
      <div class="tag"><span>THE PROBLEM</span></div>
      ${hl}
      <div style="margin:${story ? 40 : 28}px 0 ${story ? 36 : 24}px">${panel}</div>
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
    <div style="font:600 36px/1.35 Montserrat;margin-top:${story ? 34 : 24}px;max-width:820px">Join Elevate DJ Academy.<br><span style="color:var(--acc)">It's free.</span></div>
    <div style="margin-top:${story ? 36 : 26}px"><span class="btn">LINK IN BIO</span></div>
  </div>
  ${jon(l.mood.cta, "right", story ? 270 : 255)}
  <div style="position:absolute;left:60px;bottom:${story ? 330 : 150}px;z-index:6;width:430px">
    <img src="${L(ivory() ? "secondary-onyx" : "secondary-ivory")}" style="width:${story ? 380 : 400}px;display:block">
    <div style="font:700 28px/1 Montserrat;margin-top:20px;letter-spacing:.4px">${HANDLE}</div>
  </div>
  ${foot(4, { dotsLeft: true })}`);
}

function slideStores(l, fmt, gi) {
  const story = fmt === "story", g = l.groups[gi];
  const cards = g.items.map((st) => `<div class="scard"><div class="sn">${String(st.n).padStart(2, "0")}</div><div style="min-width:0"><div class="sname">${esc(st.name)}</div><div class="stag">${esc(st.tag)}</div><div class="chips">${st.genres.map((x) => `<i>${esc(x)}</i>`).join("")}</div><ul>${st.pts.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div></div>`).join("");
  return shell(fmt, `${pill()}<div class="col"><div class="tag"><span>${esc(g.tag)}</span></div>${headline(g.head, { max: story ? 104 : 92, min: 56 })}<div class="scards" style="${story ? "gap:20px;margin-top:20px" : ""}">${cards}</div></div>${foot(0)}`);
}

function slideCompare(l, fmt) {
  const story = fmt === "story";
  const rows = l.compare.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
  return shell(fmt, `${pill()}<div class="col"><div class="tag"><span>QUICK COMPARISON</span></div>${headline(l.compare.head, { max: story ? 108 : 96, min: 56 })}
    <table class="tbl" style="margin-top:${story ? 30 : 14}px"><thead><tr>${l.compare.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>
    <div class="note">${esc(l.compare.note)}</div></div>${foot(5)}`);
}

const STD_SLIDES = [["01-hook", slideHook], ["02-pain", slidePain], ["03-struggles", slideSpot], ["04-solution", slideFix], ["05-cta", slideCta]];
const STORE_SLIDES = [["01-hook", slideHook], ["02-pain", slidePain], ["03-stores-1", (l, f) => slideStores(l, f, 0)], ["04-stores-2", (l, f) => slideStores(l, f, 1)],
  ["05-stores-3", (l, f) => slideStores(l, f, 2)], ["06-compare", slideCompare], ["07-fix", slideFix], ["08-cta", slideCta]];

// Slide list for a lesson. Sets the theme, slide count and progress dot before each slide is built.
function slidesFor(l) {
  const list = l.kind === "stores" ? STORE_SLIDES : STD_SLIDES;
  return list.map(([name, fn], idx) => [name, (lesson, fmt) => { THEME = lesson.theme || "onyx"; TOTAL = list.length; CUR_IDX = idx; return fn(lesson, fmt); }]);
}

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
.sgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:14px}
.sc{background:#fff;border:1.5px solid rgba(18,18,20,.12);border-radius:14px;padding:9px 11px 8px}
.sc .scn{font-family:DowneyOutline;font-weight:900;font-size:22px;line-height:1;color:#B07F37}
.sc .scname{font:800 12.5px/1.15 Montserrat;letter-spacing:.3px;text-transform:uppercase;margin:3px 0 2px}
.sc .sctag{font:600 10.2px/1.3 Montserrat;color:rgba(18,18,20,.7);min-height:27px}
.sc .scch{margin:3px 0 4px}
.sc .scch i{display:inline-block;font:800 7.6px/1 Montserrat;letter-spacing:1px;font-style:normal;padding:3px 6px;margin:0 3px 3px 0;border-radius:999px;background:#C9954B;color:#121214}
.ul.s li{font-size:10.2px;line-height:1.32;margin-bottom:2px;padding-left:13px}
.ul.s li:before{top:4.5px;width:6px;height:6px}
.ptbl{width:100%;border-collapse:collapse;margin-top:12px}
.ptbl th{font:800 9.5px/1 Montserrat;letter-spacing:1.8px;text-transform:uppercase;color:#9C6B2C;text-align:left;padding:0 8px 6px;border-bottom:2px solid #121214}
.ptbl td{font:600 11.5px/1.25 Montserrat;padding:6px 8px;border-bottom:1.5px solid rgba(18,18,20,.14)}
.ptbl td:first-child{font-weight:800}
.tips{display:grid;grid-template-columns:1fr 1fr;gap:4px 22px;margin-top:6px}
.tips .chk{font-size:11.5px;margin-bottom:3px}

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
  const series = l.series || "Waveform Lab";
  const lab = l.roundup ? "Cheat Sheet" : "Lesson " + String(l.sn || l.n).padStart(2, "0") + " of " + (l.stotal || 11);
  return `<div class="top"><img src="${L("secondary-ivory")}"><div class="ml">${series} &middot; ${lab}</div></div>`;
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

function pdfStores(l) {
  const all = l.groups.flatMap((g) => g.items);
  const cards = all.map((st) => `<div class="sc"><div class="scn">${String(st.n).padStart(2, "0")}</div><div class="scname">${esc(st.name)}</div><div class="sctag">${esc(st.tag)}</div><div class="scch">${st.genres.slice(0, 4).map((x) => `<i>${esc(x)}</i>`).join("")}</div><ul class="ul s">${st.pts.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("");
  const page1 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>Quick Guide</span></span>
    <div class="ptitle" data-max="54" data-min="34" id="pt1">${esc(l.name)}</div>
    <div class="psub">Nine places DJs buy music, and what each one is best for.</div>
    <div class="sgrid">${cards}</div>
  </div>${pdfFoot()}</div>`;
  const rows = l.compare.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("");
  const tips = l.pdf.tips.map((t) => `<div class="chk"><i></i><span>${esc(t)}</span></div>`).join("");
  const page2 = `<div class="page">${pdfTop(l)}<div class="wrap">
    <span class="ptag"><span>Compare &amp; Plan</span></span>
    <div class="ptitle" data-max="46" data-min="28" id="pt2">Pick your sources</div>
    <table class="ptbl"><thead><tr>${l.compare.cols.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>
    <div class="ans" style="margin-top:6px">${esc(l.compare.note)}</div>
    <div style="margin-top:16px"><div class="h3">Build a clean crate</div><div class="tips">${tips}</div></div>
    <div class="rem" style="margin-top:14px;padding:14px 22px"><div class="rh2">REMEMBER</div><div class="rt" style="font-size:18px">${esc(l.pdf.remember)}</div></div>
    <div class="notes" style="margin-top:12px"><div class="h3">My go-to stores</div>${'<div class="nl"></div>'.repeat(3)}</div>
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

module.exports = { slidesFor, pdfLesson, pdfRoundup, pdfStores };
