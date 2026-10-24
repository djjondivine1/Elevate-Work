// Render Elevate Waveform Lab: feed slides, stories and PDFs.
//   node build/render.js [--only <slug>] [--fmt feed|story|pdf]
const path = require("path");
const fs = require("fs");
const { chromium } = require("playwright");
const { lessons, caption } = require("../content/lessons");
const { SLIDES, pdfLesson, pdfRoundup } = require("./templates");

const ROOT = path.resolve(__dirname, "..");
const TMP = path.join(ROOT, "build", "tmp");
const OUT = path.join(ROOT, "output");
const args = process.argv.slice(2);
const only = args.includes("--only") ? args[args.indexOf("--only") + 1] : null;
const fmtOnly = args.includes("--fmt") ? args[args.indexOf("--fmt") + 1] : null;

(async () => {
  fs.mkdirSync(TMP, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  const problems = [];
  const sizes = { feed: [1080, 1350], story: [1080, 1920] };

  for (const l of lessons) {
    if (only && l.slug !== only && String(l.n) !== only) continue;
    const dir = path.join(OUT, `${String(l.n).padStart(2, "0")}-${l.slug}`);
    fs.mkdirSync(dir, { recursive: true });
    for (const fmt of ["feed", "story"]) {
      if (fmtOnly && fmtOnly !== fmt) continue;
      const [w, h] = sizes[fmt];
      fs.mkdirSync(path.join(dir, fmt), { recursive: true });
      await page.setViewportSize({ width: w, height: h });
      for (const [name, fn] of SLIDES) {
        const html = fn(l, fmt);
        const f = path.join(TMP, `${l.slug}-${fmt}-${name}.html`);
        fs.writeFileSync(f, html);
        await page.goto("file://" + f);
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });
        const chk = await page.evaluate(() => {
          const col = document.querySelector(".col");
          const out = {};
          if (col) out.colOverflow = col.scrollHeight - col.clientHeight;
          out.lnOver = [...document.querySelectorAll(".hl")].map((h) => h.scrollWidth > h.clientWidth + 2).some(Boolean);
          out.fonts = [...document.fonts].filter((x) => x.status !== "loaded" && x.status !== "unloaded").length;
          return out;
        });
        if (chk.colOverflow > 2 || chk.lnOver) problems.push(`${l.slug} ${fmt} ${name}: ${JSON.stringify(chk)}`);
        await page.screenshot({ path: path.join(dir, fmt, `${name}.png`), clip: { x: 0, y: 0, width: w, height: h } });
      }
    }
    if (!fmtOnly || fmtOnly === "pdf") {
      const idx = lessons.indexOf(l);
      const html = l.roundup ? pdfRoundup(l) : pdfLesson(l, lessons[idx + 1] && !lessons[idx + 1].roundup ? lessons[idx + 1] : null);
      const f = path.join(TMP, `${l.slug}-pdf.html`);
      fs.writeFileSync(f, html);
      await page.setViewportSize({ width: 816, height: 1056 });
      await page.goto("file://" + f);
      await page.waitForFunction(() => window.__ready === true, null, { timeout: 20000 });
      const over = await page.evaluate(() => [...document.querySelectorAll(".page")].map((pg, i) => {
        const wrap = pg.querySelector(".wrap");
        return wrap ? { page: i + 1, bottom: wrap.offsetTop + wrap.scrollHeight } : null;
      }).filter((x) => x && x.bottom > 940));
      if (over.length) problems.push(`${l.slug} pdf: ${JSON.stringify(over)}`);
      await page.emulateMedia({ media: "print" });
      await page.pdf({ path: path.join(dir, `${String(l.n).padStart(2, "0")}-${l.slug}.pdf`), width: "816px", height: "1056px", printBackground: true, preferCSSPageSize: true });
    }
    fs.writeFileSync(path.join(dir, "caption.txt"), caption(l) + "\n");
    console.log("done", l.slug);
  }
  await browser.close();
  if (problems.length) { console.log("\nLAYOUT WARNINGS:\n" + problems.join("\n")); } else console.log("\nno layout warnings");
})();
