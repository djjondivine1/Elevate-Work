# Elevate Work

## Carousels, stories and PDFs for the free academy

Three series, rebuilt in Elevate's branding and Jon's coach voice:
**Waveform Lab** (11 lessons plus a cheat sheet) **Mix Lab** (6 mixing lessons) and **Level Up Lab** (15 intermediate lessons, 19-33).
Nine lessons use the ivory theme and nine use onyx, so the feed alternates. Every picture is Jon or DJ gear
(DDJ-REV7, DDJ-FLX4, EQ waveforms, EQ knobs); no family or meeting photos.
Every lesson ships as:

| Format | Size | Where |
|---|---|---|
| IG carousel, 5 slides (Hook, Pain, Struggles, Solution, CTA); lesson 18 has 8 | 1080 x 1350 PNG | `output/<lesson>/feed/` |
| IG story set, same 5 slides, kept inside the story safe zones | 1080 x 1920 PNG | `output/<lesson>/story/` |
| Academy PDF (Letter, 2 pages: lesson sheet + practice and check) | 8.5 x 11 in | `output/<lesson>/<lesson>.pdf` |
| Caption (hook, promise, action, CTA, hashtags) | text | `output/<lesson>/caption.txt` |

Quick look: `output/_overview/` has one contact sheet per lesson, `all-hooks.jpg`, `all-stories-hooks.jpg` and the
`set-ivory` / `set-onyx` sheets (rebuild with `python3 tools/overview.py`).

Ivory lessons: 01, 04, 05, 08, 09, 12, 13, 16, 18. Onyx lessons: 02, 03, 06, 07, 10, 11, 14, 15, 17.
Set `theme: "ivory"` on a lesson in `content/lessons.js` to flip it.

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
| 13 | Quick cut transition (Mix Lab 1 of 6) |
| 14 | Midrange vocal separation (Mix Lab 2 of 6) |
| 15 | Resonance control (Mix Lab 3 of 6) |
| 16 | EQ and filter combo (Mix Lab 4 of 6) |
| 17 | Old song to modern remix (Mix Lab 5 of 6) |
| 18 | DJ download stores and pools (Mix Lab 6 of 6, ivory, 8 slides) |
| 19 | Phrase counting (Level Up Lab 1 of 15) |
| 20 | Hot cue map (2 of 15) |
| 21 | Loops as a safety net (3 of 15) |
| 22 | Camelot wheel moves (4 of 15) |
| 23 | Fix the beatgrid (5 of 15) |
| 24 | Gain staging (6 of 15) |
| 25 | One effect, one job (7 of 15) |
| 26 | Echo-out (8 of 15) |
| 27 | Long or short blend (9 of 15) |
| 28 | Half-time and double-time (10 of 15) |
| 29 | Set energy arc (11 of 15) |
| 30 | Read the room (12 of 15) |
| 31 | Train wreck recovery (13 of 15) |
| 32 | Record, wait, review (14 of 15) |
| 33 | USB export checklist (15 of 15) |

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

- `content/lessons.js`: lesson copy for lessons 1-18. `content/levelup.js`: Level Up Lab lessons 19-33 (appended to the same list). Edit text here, re-render.
- `reports/Intermediate DJ lesson topics.md` and `research_notes/`: the research behind Level Up Lab.
- `build/waves_level.js`: diagrams for the Level Up Lab lessons.
- `build/waves.js`: waveform diagrams (pure SVG math, no images).
- `build/templates.js`: slide, story and PDF layouts.
- `build/render.js`: renderer.
- `assets/fonts`, `assets/logos` (+ `web/` trimmed versions): from the Elevate Logo Kit (Drive).
- `assets/jon`: Jon's headshots plus the white-outline sticker cutouts.
- `assets/jon/emotions`: Jon's expressions (skeptical, sad, smirk, pointing, shocked) as plain cutouts and sticker versions.
  `assets/jon/manifest.json` lists every sticker (which frame edge is cut, head size) so the templates place each one correctly.
- `assets/gear`: the DDJ-REV7 and DDJ-FLX4 photos (full and transparent cutouts) plus logo-free close-ups of the EQ knobs, pads, jogs and faders.
  Each lesson picks a panel with `gear: "<key>"` (see `GEAR` in `build/templates.js`).
- `tools/`: contact-sheet helpers and the Drive decode helper.

### Jon's expressions

Each lesson picks an expression per slide in `content/lessons.js` (`mood: { hook, pain, fix, cta }`).
Available: `serious`, `smile`, `skeptical`, `sad`, `smirk`, `point`, `shocked`. The concerned faces sit on the
problem slide, pointing sits on "do this tonight", and smiling sits on the CTA.

The full `Jon Divine Emotions` folder (13+ transparent PNGs on Jon's Mac) isn't reachable from the cloud session, so
these were cut from the six published thumbnails (`tools/make_emotions.py`). To use the originals, copy them into
`assets/jon/emotions/` and add them to `assets/jon/manifest.json` (file, `cut` edge, `headfrac`), then set the new
name as a lesson's `mood`.

### Adding more gear pictures

Drop a photo in `assets/gear/`, add an entry to `GEAR` in `build/templates.js`, then set `gear: "<key>"` on a lesson.

### Notes on what was and wasn't available

- The `Elevate Carousel` folder on Jon's Mac (comic cast index, template engine, extra headshots) was not reachable
  from the cloud session, so these templates were rebuilt to match Jon's published carousels. Re-render is one command.
- Only the 12 most recent reels of the source account were readable (Instagram is blocked from the
  environment; the reel covers carry the lessons). More lessons need links or screenshots.
