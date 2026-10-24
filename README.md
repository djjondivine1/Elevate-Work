# Elevate Work

## Waveform Lab: carousels, stories and PDFs for the free academy

Eleven waveform lessons plus a cheat sheet, rebuilt in Elevate's branding and Jon's coach voice.
Every lesson ships as:

| Format | Size | Where |
|---|---|---|
| IG carousel, 5 slides (Hook, Pain, Struggles, Solution, CTA) | 1080 x 1350 PNG | `output/<lesson>/feed/` |
| IG story set, same 5 slides, kept inside the story safe zones | 1080 x 1920 PNG | `output/<lesson>/story/` |
| Academy PDF (Letter, 2 pages: lesson sheet + practice and check) | 8.5 x 11 in | `output/<lesson>/<lesson>.pdf` |
| Caption (hook, promise, action, CTA, hashtags) | text | `output/<lesson>/caption.txt` |

Quick look: `output/_overview/` has one contact sheet per lesson and `all-hooks.jpg`.

| # | Lesson |
|---|---|
| 01 | Sine wave |
| 02 | Square wave |
| 03 | Triangle wave |
| 04 | Sawtooth wave |
| 05 | Pulse wave |
| 06 | White and pink noise |
| 07 | Complex waveform |
| 08 | Clipped waveform |
| 09 | Beat waveform |
| 10 | Kick drum waveform |
| 11 | Snare and hi-hat waveform |
| 12 | Waveform cheat sheet (roundup, plus an 11-day plan PDF) |

### Brand rules applied

- Onyx `#121214`, Ivory `#F4EEE2`, Elevate Gold `#C9954B` plus the gold gradient.
- Fonts from the Elevate Logo Kit: Downey and Downey Outline (headlines), Montserrat (body).
- Logos from the Logo Kit: mark, primary and secondary lockups. Slide 5 carries the wordmark and `@elevatedjacademy`.
- Handle is `@elevatedjacademy` on every slide and caption.
- All copy is drawn by the templates. No image model renders words.
- Jon is the only real person. The character scenes are Jon's own published AI art.

### How it was made

The lessons are original copy. They cover the same topics as a public waveform explainer series
(the topic list is general audio knowledge), but the wording, layouts, art and branding are Elevate's.

Rebuild everything:

```bash
node build/render.js                 # all lessons, feed + story + pdf
node build/render.js --only 8        # one lesson (number or slug)
node build/render.js --fmt pdf       # one format: feed | story | pdf
```

Needs Node with `playwright` (Chromium). Output goes to `output/`. Layout warnings print at the end
(text overflow, PDF content running into the footer).

### Where things live

- `content/lessons.js`: all lesson copy. Edit text here, re-render.
- `build/waves.js`: waveform diagrams (pure SVG math, no images).
- `build/templates.js`: slide, story and PDF layouts.
- `build/render.js`: renderer.
- `assets/fonts`, `assets/logos` (+ `web/` trimmed versions): from the Elevate Logo Kit (Drive).
- `assets/jon`: Jon's headshots plus the white-outline sticker cutouts.
- `assets/jon/emotions`: Jon's expressions (skeptical, sad, smirk, pointing, shocked) as plain cutouts and sticker versions.
  `assets/jon/manifest.json` lists every sticker (which frame edge is cut, head size) so the templates place each one correctly.
- `assets/art`: Jon's character scenes, cropped from his published carousels.
- `tools/`: contact-sheet helpers and the Drive decode helper.

### Jon's expressions

Each lesson picks an expression per slide in `content/lessons.js` (`mood: { hook, pain, fix, cta }`).
Available: `serious`, `smile`, `skeptical`, `sad`, `smirk`, `point`, `shocked`. The concerned faces sit on the
problem slide, pointing sits on "do this tonight", and smiling sits on the CTA.

The full `Jon Divine Emotions` folder (13+ transparent PNGs on Jon's Mac) isn't reachable from the cloud session, so
these were cut from the six published thumbnails (`tools/make_emotions.py`). To use the originals, copy them into
`assets/jon/emotions/` and add them to `assets/jon/manifest.json` (file, `cut` edge, `headfrac`), then set the new
name as a lesson's `mood`.

### Adding more of Jon's art

Drop new character images in `assets/art/` (landscape, about 4:3), then set `layout: "art"` and
`art: "<file-name-without-extension>"` on a lesson in `content/lessons.js`. For another pose of Jon,
add a sticker cutout to `assets/jon/` and reference it in `build/templates.js`.

### Notes on what was and wasn't available

- The `Elevate Carousel` folder on Jon's Mac (comic cast index, template engine, extra headshots) was not reachable
  from the cloud session, so these templates were rebuilt to match Jon's published carousels. Re-render is one command.
- Only the 12 most recent reels of the source account were readable (Instagram is blocked from the
  environment; the reel covers carry the lessons). More lessons need links or screenshots.
