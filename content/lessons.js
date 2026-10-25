// Waveform Lab: Elevate DJ Academy lesson content.
// Original copy written for Elevate (Jon's coach voice). Every lesson follows the 5-slide arc:
// Hook, Pain point, Struggles (what you're missing), Primary solution, CTA.
//
// layout: "sticker" = Jon cutout on the pain slide, "art" = framed character art on the pain slide.
// gear: picture panel on the pain slide (see GEAR in build/templates.js): Jon's DDJ-REV7 / DDJ-FLX4 photos, EQ knobs, EQ waveform.
// theme: "ivory" for the light version (default is onyx).
// mood: which Jon expression sticker (assets/jon/manifest.json) is used on the hook, pain (sticker layout), fix and CTA slides.

const lessons = [
  {
    n: 1, theme: "ivory", mood: { hook: "serious", pain: "skeptical", fix: "smile", cta: "smirk" }, slug: "sine-wave", name: "Sine Wave", wave: "sine", layout: "sticker",
    hook: { lines: ["THE PUREST", "SOUND", "THERE IS"], accentFrom: 1, sub: "Sine wave, explained in 5 swipes" },
    pain: {
      head: ["YOU'VE HEARD IT.", "YOU CAN'T SEE IT."],
      body: "A sine wave is one single frequency. No harmonics. No edge. Most DJs never learn what it looks like, so they can't tell a clean low end from a messy one.",
    },
    spot: {
      head: ["HOW TO SPOT", "A SINE WAVE"], label: "SINE WAVE",
      items: [
        ["One smooth curve", "Rises and falls evenly. No corners. No jumps."],
        ["One frequency only", "No overtones stacked on top. That's why it sounds so clean."],
        ["Lives in the low end", "Sub bass and clean 808 tails are close to pure sine."],
      ],
    },
    fix: {
      head: ["HEAR THE", "CLEANEST LOW END"],
      callout: "Learn what clean low end sounds like on your own system.",
      steps: [
        "Play a sub-heavy track or a test tone on your gig system.",
        "Listen for where the low end gets clean, and where it gets lost.",
        "Keep it quiet. A loud pure tone can damage speakers.",
      ],
    },
    pdf: {
      what: "A sine wave is the smoothest repeating wave there is. It rises and falls in one clean curve and contains a single frequency, with no harmonics added on top.",
      feel: "Pure, smooth and clean. Think of a test tone or a deep sub-bass note.",
      use: [
        "Sub bass and clean 808 tails are close to pure sine waves.",
        "Test tones and sine sweeps are used to check how a system handles low end.",
        "It's the building block: every other sound is a stack of sine waves.",
      ],
      check: [
        ["How many frequencies does a pure sine wave contain?", "One."],
        ["Which part of a track is closest to a sine wave?", "Clean sub bass."],
        ["Why keep a test tone quiet?", "A loud pure tone can damage speakers."],
      ],
      remember: "One frequency. One smooth curve. The cleanest sound you can hear.",
    },
  },
  {
    n: 2, mood: { hook: "shocked", pain: "sad", fix: "point", cta: "smile" }, slug: "square-wave", name: "Square Wave", wave: "square", layout: "art", gear: "eqwave",
    hook: { lines: ["WHY IT", "SOUNDS", "SO BUZZY"], accentFrom: 2, sub: "Square wave, explained in 5 swipes" },
    pain: {
      head: ["THE EDGE THAT", "CUTS THROUGH"],
      body: "A square wave snaps between two levels with no slope in between. That hard edge adds extra harmonics, and that's the buzz you hear.",
    },
    spot: {
      head: ["HOW TO SPOT", "A SQUARE WAVE"], label: "SQUARE WAVE",
      items: [
        ["Two levels only", "Up, down, up, down. No curve in between."],
        ["Flat tops and bottoms", "Instant jumps from one level to the other."],
        ["Odd harmonics", "A hollow, buzzy tone. Think retro game sounds."],
      ],
    },
    fix: {
      head: ["SPOT THE BOXY", "HARSH STUFF"],
      callout: "Spot boxy, flat-topped waveforms. They're loud and harsh.",
      steps: [
        "Look at a track's waveform for flat, boxy peaks.",
        "Compare a clean track to a harsh one by ear.",
        "If your own recordings look boxy, turn down the source.",
      ],
    },
    pdf: {
      what: "A square wave jumps straight between a high level and a low level, with no slope in between. It spends equal time up and down.",
      feel: "Buzzy, hollow and bold. The classic retro game sound.",
      use: [
        "Gritty synth leads and arps use square-style waves.",
        "Heavily clipped audio starts to look like a square wave.",
        "Its sharp edges add lots of odd harmonics, so it cuts through a mix.",
      ],
      check: [
        ["What shape are the tops and bottoms?", "Flat."],
        ["Which harmonics does a square wave contain?", "Odd harmonics only."],
        ["What does clipped audio start to look like?", "A square wave."],
      ],
      remember: "Two levels. Hard edges. Buzzy and bold.",
    },
  },
  {
    n: 3, mood: { hook: "smirk", pain: "sad", fix: "smile", cta: "smirk" }, slug: "triangle-wave", name: "Triangle Wave", wave: "triangle", layout: "sticker",
    hook: { lines: ["SOFTER", "THAN A", "SQUARE WAVE"], accentFrom: 2, sub: "Triangle wave, explained in 5 swipes" },
    pain: {
      head: ["STRAIGHT LINES.", "SOFT SOUND."],
      body: "A triangle wave rises and falls in straight lines. Its harmonics fade out fast, so it sounds smooth and mellow instead of harsh.",
    },
    spot: {
      head: ["HOW TO SPOT", "A TRIANGLE WAVE"], label: "TRIANGLE WAVE",
      items: [
        ["Straight up, straight down", "A zigzag with sharp points but no flat tops."],
        ["Weak overtones", "The harmonics drop off quickly, so it sounds soft."],
        ["Between sine and square", "Brighter than a sine. Gentler than a square."],
      ],
    },
    fix: {
      head: ["USE IT WHEN YOU", "WANT SOFT"],
      callout: "Reach for it when you want body without bite.",
      steps: [
        "Play a triangle and a square wave at the same volume.",
        "Notice how much softer the triangle feels.",
        "Pick the softer shape for pads and background layers.",
      ],
    },
    pdf: {
      what: "A triangle wave rises and falls in straight lines. It has odd harmonics like a square wave, but they fade out much faster, so it sounds softer.",
      feel: "Smooth, hollow and gentle. Brighter than a sine, softer than a square.",
      use: [
        "Soft synth pads and flute-like tones.",
        "A common shape for LFOs that move a filter or volume smoothly.",
        "A good choice when you want body without harshness.",
      ],
      check: [
        ["How does it compare to a square wave?", "Softer. Its harmonics fade faster."],
        ["What shape is the rise and fall?", "Straight lines."],
        ["What is an LFO?", "A slow wave that moves another control, like a filter."],
      ],
      remember: "Straight lines. Soft edges. Between sine and square.",
    },
  },
  {
    n: 4, theme: "ivory", mood: { hook: "shocked", pain: "sad", fix: "point", cta: "smile" }, slug: "sawtooth-wave", name: "Sawtooth Wave", wave: "saw", layout: "art", gear: "equip-flx4",
    hook: { lines: ["THE WAVE", "BEHIND BIG", "EDM SOUNDS"], accentFrom: 2, sub: "Sawtooth wave, explained in 5 swipes" },
    pain: {
      head: ["BRIGHT. THICK.", "EVERYWHERE."],
      body: "A sawtooth ramps up, then drops sharply. It carries every harmonic, even and odd. That's why it sounds so full and so bright.",
    },
    spot: {
      head: ["HOW TO SPOT", "A SAWTOOTH"], label: "SAWTOOTH WAVE",
      items: [
        ["Ramp and drop", "Rises in a line, then falls straight down. Like saw teeth."],
        ["All the harmonics", "The richest of the basic shapes."],
        ["Built for leads and bass", "Big synths, stabs and thick bass lines start here."],
      ],
    },
    fix: {
      head: ["GIVE BRIGHT", "SOUNDS ROOM"],
      callout: "Bright, thick sounds need space. Don't stack two on one beat.",
      steps: [
        "When a lead or bass sounds thick and bright, think saw.",
        "Don't stack two bright sounds on the same beat.",
        "Open a filter slowly to bring a saw in.",
      ],
    },
    pdf: {
      what: "A sawtooth wave rises in a straight line, then drops sharply back to the start. It contains every harmonic, both even and odd.",
      feel: "Bright, thick and buzzy. The classic big synth sound.",
      use: [
        "Supersaw leads and big EDM stabs.",
        "Thick bass lines.",
        "A great source for filter sweeps, because there's so much for the filter to shape.",
      ],
      check: [
        ["Which harmonics does a saw wave contain?", "All of them, even and odd."],
        ["What does a saw wave look like?", "A ramp that drops sharply."],
        ["Why are saw sounds good for filter sweeps?", "They have lots of harmonics for the filter to shape."],
      ],
      remember: "Ramp up, drop down. Every harmonic. Big and bright.",
    },
  },
  {
    n: 5, theme: "ivory", mood: { hook: "skeptical", pain: "sad", fix: "smirk", cta: "smile" }, slug: "pulse-wave", name: "Pulse Wave", wave: "pulse", layout: "sticker",
    hook: { lines: ["ONE KNOB.", "A WHOLE NEW", "SOUND"], accentFrom: 1, sub: "Pulse wave, explained in 5 swipes" },
    pain: {
      head: ["SQUARE'S MORE", "FLEXIBLE COUSIN"],
      body: "A pulse wave is a square wave with an adjustable width. That width is called the duty cycle. Change it and the tone changes.",
    },
    spot: {
      head: ["HOW TO SPOT", "A PULSE WAVE"], label: "PULSE WAVE (25% DUTY)",
      items: [
        ["Duty cycle", "The share of each cycle the wave stays high."],
        ["50% is a square wave", "Narrower pulses sound thinner and more nasal."],
        ["Pulse width modulation", "Sweep the width and the sound moves."],
      ],
    },
    fix: {
      head: ["SWEEP THE WIDTH.", "HEAR THE TONE."],
      callout: "Sweep the pulse width slowly and listen to the tone change.",
      steps: [
        "Open any synth with a pulse width control.",
        "Sweep it slowly from 50% down to 10%.",
        "Hear the tone go from full to thin.",
      ],
    },
    pdf: {
      what: "A pulse wave is a square wave with an adjustable width. The width, called the duty cycle, is the share of each cycle the wave spends high.",
      feel: "Full at 50%. Thinner and more nasal as the pulse gets narrower.",
      use: [
        "Classic synth bass and lead sounds.",
        "Pulse width modulation gives a moving, chorus-like tone.",
        "Chiptune and retro game music.",
      ],
      check: [
        ["What is a 50% pulse wave?", "A square wave."],
        ["What does a narrower pulse sound like?", "Thinner and more nasal."],
        ["What does duty cycle measure?", "How long the wave stays high in each cycle."],
      ],
      remember: "Change the width, change the tone.",
    },
  },
  {
    n: 6, mood: { hook: "smirk", pain: "sad", fix: "point", cta: "smile" }, slug: "white-and-pink-noise", name: "White & Pink Noise", wave: "noise", layout: "art", gear: "eqknobs-rev7",
    hook: { lines: ["TWO KINDS", "OF STATIC.", "ONE JOB EACH."], accentFrom: 2, sub: "White & pink noise, explained in 5 swipes" },
    pain: {
      head: ["NOISE ISN'T", "A MISTAKE"],
      body: "White noise has equal energy at every frequency, so it sounds bright and hissy. Pink noise has equal energy per octave, so it sounds fuller and more natural.",
    },
    spot: {
      head: ["WHITE VS", "PINK NOISE"], label: "WHITE VS PINK NOISE",
      items: [
        ["White noise is bright", "A flat spectrum. Used for risers, sweeps and impacts."],
        ["Pink noise is balanced", "Rolls off 3 dB per octave. Warmer, closer to how we hear."],
        ["Different jobs", "White for transitions. Pink for testing a room or speakers."],
      ],
    },
    fix: {
      head: ["USE THE RIGHT", "NOISE"],
      callout: "White builds tension. Pink checks the room. Keep both quiet.",
      steps: [
        "Layer white noise under a riser to build into a drop.",
        "Play pink noise low to hear your room and speakers.",
        "Keep both quiet. Noise should support the music.",
      ],
    },
    pdf: {
      what: "White noise has the same energy at every frequency. Pink noise has the same energy in every octave, so it has more low end and less high end than white noise.",
      feel: "White: bright and hissy, like static. Pink: softer and more natural, like steady rain.",
      use: [
        "White noise sweeps and risers build tension into a drop.",
        "Pink noise is used to check speaker and room balance.",
        "Noise layered with a snare adds crack and air.",
      ],
      check: [
        ["Which noise is brighter?", "White noise."],
        ["What makes pink noise pink?", "Equal energy per octave, so it rolls off toward the highs."],
        ["Which one do you use to check a room?", "Pink noise, at a low volume."],
      ],
      remember: "White builds tension. Pink checks the room.",
    },
  },
  {
    n: 7, mood: { hook: "skeptical", pain: "sad", fix: "smirk", cta: "smile" }, slug: "complex-waveform", name: "Complex Waveform", wave: "complex", layout: "sticker",
    hook: { lines: ["REAL MUSIC", "NEVER LOOKS", "CLEAN"], accentFrom: 2, sub: "Complex waveforms, explained in 5 swipes" },
    pain: {
      head: ["YOUR TRACK ISN'T", "A SINE WAVE"],
      body: "Real songs are lots of sounds stacked together: drums, bass, vocals, synths. Add them up and you get a complex waveform. Messy on purpose.",
    },
    spot: {
      head: ["HOW TO READ", "A REAL TRACK"], label: "COMPLEX WAVEFORM",
      items: [
        ["Many waves, one shape", "Every instrument adds its own pattern."],
        ["Harmonics and overtones", "They give every sound its own character."],
        ["Read the shape, not the detail", "Look for big peaks, thin gaps and changes."],
      ],
    },
    fix: {
      head: ["READ THE BIG", "PICTURE"],
      callout: "Stop hunting for clean shapes. Read where the energy changes.",
      steps: [
        "Zoom out on a track. Find the loud and quiet sections.",
        "Mark the breakdowns, builds and drops.",
        "Plan your mix-in around those moments.",
      ],
    },
    pdf: {
      what: "A complex waveform is many sound waves added together. Real music, voices and instruments are all complex waveforms made of a fundamental note plus harmonics and overtones.",
      feel: "Rich and real. Every instrument has its own character.",
      use: [
        "Every full track you play.",
        "Vocals and live instruments.",
        "Reading the big shape shows you breakdowns, builds and drops.",
      ],
      check: [
        ["What is a complex waveform?", "Many waves added together."],
        ["What gives each instrument its own character?", "Its mix of harmonics and overtones."],
        ["What should you read on a track's waveform?", "The big shape: loud, quiet and changes."],
      ],
      remember: "Don't look for clean shapes. Read the energy.",
    },
  },
  {
    n: 8, theme: "ivory", mood: { hook: "shocked", pain: "sad", fix: "point", cta: "smile" }, slug: "clipped-waveform", name: "Clipped Waveform", wave: "clipped", layout: "art", gear: "equip-rev7",
    hook: { lines: ["FLAT TOPS", "MEAN BAD", "SOUND"], accentFrom: 1, sub: "Clipped waveforms, explained in 5 swipes" },
    pain: {
      head: ["WHEN THE PEAKS", "GET CHOPPED OFF"],
      body: "Clipping happens when a signal is pushed past the maximum level. The peaks get cut flat, and that adds harsh distortion you can't cleanly undo.",
    },
    spot: {
      head: ["SPOT CLIPPING", "ON SIGHT"], label: "CLIPPED WAVEFORM",
      items: [
        ["Flat tops and bottoms", "The peaks hit a ceiling and stop."],
        ["Harsh, fizzy sound", "Distortion adds harmonics that weren't in the music."],
        ["Red means stop", "Hot meters and constant red lights are the warning."],
      ],
    },
    fix: {
      head: ["LEAVE", "HEADROOM"],
      callout: "Keep every meter out of the red. Fix loudness at the amp.",
      steps: [
        "Set each channel gain so peaks stay out of the red.",
        "Keep the master meter out of the red too.",
        "Need more volume? Turn up the system, not the signal.",
      ],
    },
    pdf: {
      what: "Clipping happens when a signal is pushed past the maximum level a system can handle. The peaks get cut flat, which adds harsh distortion.",
      feel: "Harsh, fizzy and crunchy. Loud, but tiring to listen to.",
      use: [
        "Master meters sitting in the red.",
        "Over-gained tracks and channels.",
        "Big EQ boosts that push a channel over the limit.",
      ],
      check: [
        ["What does a clipped waveform look like?", "Flat tops and bottoms."],
        ["Can you fix clipping cleanly afterwards?", "Not cleanly. Prevent it at the source."],
        ["How do you avoid it?", "Leave headroom. Keep meters out of the red."],
      ],
      remember: "Leave headroom. Loud should still be clean.",
    },
  },
  {
    n: 9, theme: "ivory", mood: { hook: "serious", pain: "skeptical", fix: "smile", cta: "smirk" }, slug: "beat-waveform", name: "Beat Waveform", wave: "beat", layout: "sticker",
    hook: { lines: ["SEE THE BEAT", "BEFORE YOU", "HEAR IT"], accentFrom: 1, sub: "Beat waveform reading, explained in 5 swipes" },
    pain: {
      head: ["YOUR EARS ARE BUSY.", "YOUR EYES AREN'T."],
      body: "Most DJs only listen for the beat. The waveform shows you where every beat lands. Use your eyes and ears together and your mixes get tighter.",
    },
    spot: {
      head: ["HOW TO READ", "THE BEAT"], label: "BEAT WAVEFORM (1 BAR)",
      items: [
        ["Spikes in a row", "Evenly spaced peaks mark the beats."],
        ["Count in fours", "Four beats make a bar. Most dance tracks phrase in 8, 16 or 32 bars."],
        ["Thin means breakdown", "Tall, dense means the drop is on."],
      ],
    },
    fix: {
      head: ["CHECK THE GRID", "EVERY MIX"],
      callout: "Zoom in. Put the grid on the peaks. Then mix.",
      steps: [
        "Zoom in until you can see each beat.",
        "Make sure the grid lines sit on the peaks.",
        "Line the next track's peaks up with the same grid.",
      ],
    },
    pdf: {
      what: "A beat waveform shows where the drum hits land. In most dance music, tall peaks repeat at an even spacing. Each peak is a beat, and four beats make a bar.",
      feel: "Steady and predictable. That's exactly what makes it mixable.",
      use: [
        "Setting and checking your beat grid.",
        "Spotting breakdowns, builds and drops before they arrive.",
        "Lining up two tracks by eye as well as by ear.",
      ],
      check: [
        ["How many beats are in a bar?", "Four, in most dance music."],
        ["What does a thin, quiet section usually mean?", "A breakdown."],
        ["Where should the grid lines sit?", "On the beat peaks."],
      ],
      remember: "See the beat. Check the grid. Then mix.",
    },
  },
  {
    n: 10, mood: { hook: "smirk", pain: "sad", fix: "point", cta: "smile" }, slug: "kick-drum-waveform", name: "Kick Drum Waveform", wave: "kick", layout: "art", gear: "rev7-full",
    hook: { lines: ["FIND THE", "KICK. FIND", "THE MIX."], accentFrom: 1, sub: "Kick drum waveform, explained in 5 swipes" },
    pain: {
      head: ["THE KICK RUNS", "THE DANCE FLOOR"],
      body: "A kick is a short, heavy thump. It starts with a big peak, then fades fast. It carries the most low-end energy in the track.",
    },
    spot: {
      head: ["HOW TO SPOT", "THE KICK"], label: "KICK DRUM WAVEFORM",
      items: [
        ["Tall peak, fast fade", "A big hit on the beat, then it decays."],
        ["Deep low end", "Most kick energy sits roughly between 40 and 100 Hz."],
        ["Steady in house and techno", "One kick on every beat. Four on the floor."],
      ],
    },
    fix: {
      head: ["ONE KICK", "AT A TIME"],
      callout: "Cut the low end on the incoming track. Swap bass on the bar line.",
      steps: [
        "Cut the low EQ on the track you're bringing in.",
        "Line the kicks up on the grid.",
        "Swap the bass on a bar line, never mid-bar.",
      ],
    },
    pdf: {
      what: "A kick drum is a short, heavy, low-frequency hit. On a waveform it shows as a tall peak at the start of the beat that dies away quickly.",
      feel: "Deep and punchy. You feel it in your chest.",
      use: [
        "Four on the floor: one kick on every beat in house and techno.",
        "Matching kick to kick when you beatmatch.",
        "Bass swaps: cutting one kick's low end as the next one comes in.",
      ],
      check: [
        ["What does a kick look like?", "A tall peak that fades fast."],
        ["Where does most kick energy sit?", "Roughly 40 to 100 Hz."],
        ["What do you cut when bringing a new track in?", "The low EQ."],
      ],
      remember: "Two kicks at once means mud. One kick at a time.",
    },
  },
  {
    n: 11, mood: { hook: "skeptical", pain: "sad", fix: "smirk", cta: "smile" }, slug: "snare-and-hi-hat-waveform", name: "Snare & Hi-Hat Waveform", wave: "snare", layout: "sticker",
    hook: { lines: ["THE SNARE", "TELLS YOU", "WHERE YOU ARE"], accentFrom: 2, sub: "Snare & hi-hat waveforms, explained in 5 swipes" },
    pain: {
      head: ["SMALL SPIKES.", "BIG CLUES."],
      body: "Between the kicks sit the snare and the hi-hat. They're thinner and brighter, and they tell you exactly where you are in the groove.",
    },
    spot: {
      head: ["HOW TO SPOT", "SNARE & HATS"], label: "KICK  /  SNARE  /  HI-HAT",
      items: [
        ["Snare: the backbeat", "A sharp spike on beats 2 and 4 in most dance music."],
        ["Hi-hat: fast ticks", "Small, frequent spikes, often on the off-beat."],
        ["Fills are a signal", "A snare roll or hat build warns you a drop is coming."],
      ],
    },
    fix: {
      head: ["USE THE SMALL", "STUFF AS A MAP"],
      callout: "Find 2 and 4 by the snare. Count to the next fill.",
      steps: [
        "Find beats 2 and 4 by spotting the snare.",
        "Count the bars to the next fill or hat build.",
        "Land your transition when the phrase restarts.",
      ],
    },
    pdf: {
      what: "The snare is a short, sharp hit with a lot of mid and high energy, usually landing on beats 2 and 4. The hi-hat is a thin, bright tick that repeats quickly.",
      feel: "Snare: crack. Hat: tick and shimmer.",
      use: [
        "Finding beats 2 and 4 to know where you are in the bar.",
        "Hearing off-beat hats to feel the groove.",
        "Spotting snare rolls and hat builds before a drop.",
      ],
      check: [
        ["Which beats does the snare usually hit?", "2 and 4."],
        ["What does a hi-hat look like?", "Small, fast, frequent spikes."],
        ["What does a snare roll usually signal?", "A drop or phrase change is coming."],
      ],
      remember: "The kick is the pulse. Snare and hat are the map.",
    },
  },
  {
    n: 12, theme: "ivory", mood: { hook: "shocked", pain: "sad", fix: "point", cta: "smile" }, slug: "waveform-cheat-sheet", name: "Waveform Cheat Sheet", wave: "grid", layout: "art", gear: "both", roundup: true,
    hook: { lines: ["11 WAVEFORMS", "EVERY DJ", "SHOULD KNOW"], accentFrom: 1, sub: "Save this one. Study it." },
    pain: {
      head: ["KNOWLEDGE YOU", "CAN SEE"],
      body: "Waveforms show you the sound, the beat and the danger zones before you hear them. Learn these 11 shapes and you'll read tracks faster.",
    },
    spot: {
      head: ["THE 11", "WAVEFORMS"], label: "THE 11 WAVEFORMS",
      items: [],
    },
    fix: {
      head: ["LEARN ONE", "A DAY"],
      callout: "Learn one waveform a day. Spot it in a real track.",
      steps: [
        "Pick one waveform a day for the next 11 days.",
        "Find it in a real track you play.",
        "Share what you found inside the academy.",
      ],
    },
    pdf: {
      what: "Waveforms are a picture of sound. Learn these 11 shapes and you'll read tracks faster, mix cleaner and avoid clipping.",
      feel: "",
      use: [],
      check: [],
      remember: "One waveform a day. Eleven days. Then you read every track faster.",
    },
  },
  // ---------------- Mix Lab (series 2) ----------------
  {
    n: 13, theme: "ivory", mood: { hook: "smirk", pain: "sad", fix: "point", cta: "smile" }, series: "Mix Lab", sn: 1, stotal: 6,
    slug: "quick-cut-transition", name: "Quick Cut Transition", wave: "cut", layout: "sticker",
    hook: { lines: ["CUT IT CLEAN.", "NO BLEND.", "NO FEAR."], accentFrom: 1, sub: "Quick cut transition, explained in 5 swipes" },
    pain: {
      head: ["NOT EVERY MIX", "NEEDS A BLEND"],
      body: "A long blend can kill the punch of a drop. A quick cut switches tracks instantly, on the beat, with no overlap and no effects. Done right, it sounds sharp and on purpose.",
    },
    spot: {
      head: ["HOW A QUICK", "CUT WORKS"], label: "QUICK CUT ON THE SAME BEAT",
      items: [
        ["Cut on the beat", "Track A stops and Track B starts on the same beat."],
        ["Match the tempo", "The same BPM on both tracks keeps the grid locked."],
        ["Cue the exact spot", "Set a cue on the first beat of the new section."],
      ],
    },
    fix: {
      head: ["CUT ON A", "PHRASE LINE"],
      callout: "Cut on the first beat of a new phrase and the crowd will feel it land.",
      steps: [
        "Find your cut point in Track A, like the end of a build-up.",
        "Cue Track B on its first beat and match the BPM.",
        "Start Track B on the beat and pull Track A out at the same moment.",
      ],
    },
    pdf: {
      what: "A quick cut switches from one track to the next instantly, on a chosen beat. There is no blend, no overlap and no effect, just a clean, sudden change.",
      feel: "Sharp, sudden and high energy. It feels like a hit.",
      use: [
        "Drop to drop, when one big moment hands over to the next.",
        "Build-up to drop, landing the new track right on the first beat.",
        "Edits and short sets where you want to keep the energy up.",
      ],
      check: [
        ["What does a quick cut skip?", "The blend. There is no overlap or effect."],
        ["What must match for a quick cut to sound clean?", "The beat and the tempo."],
        ["What helps you hit the exact spot?", "A cue point on the first beat of the new section."],
      ],
      remember: "Match the beat. Cue the spot. Cut with confidence.",
    },
  },
  {
    n: 14, mood: { hook: "skeptical", pain: "sad", fix: "smile", cta: "smirk" }, series: "Mix Lab", sn: 2, stotal: 6,
    slug: "midrange-vocal-separation", name: "Midrange Vocal Separation", wave: "spectrum", layout: "art", gear: "eqknobs-flx4",
    hook: { lines: ["MAKE ROOM", "FOR THE", "VOCALS"], accentFrom: 1, sub: "Midrange vocal separation, explained in 5 swipes" },
    pain: {
      head: ["WHY CAN'T YOU", "HEAR THE VOCAL?"],
      body: "Vocals, guitars, synths and snares all fight for the same midrange. When two tracks pile up there, the vocal gets buried and the mix sounds muddy.",
    },
    spot: {
      head: ["WHERE VOCALS", "LIVE"], label: "THE MIDRANGE (ROUGHLY 200 HZ TO 4 KHZ)",
      items: [
        ["Low mids add body", "Roughly 200 to 500 Hz. Too much sounds boxy or muddy."],
        ["Mids carry the vocal", "Roughly 500 Hz to 2 kHz. This is where the words live."],
        ["Upper mids add clarity", "Roughly 2 to 4 kHz. A small boost brings presence."],
      ],
    },
    fix: {
      head: ["CARVE SPACE", "FOR THE VOCAL"],
      callout: "Cut the competing mids on the other track before you boost the vocal.",
      steps: [
        "Find the vocal range, about 500 Hz to 4 kHz.",
        "Turn the mid knob down a little on the other track.",
        "Still hidden? Add a touch of mids to the vocal. Small moves only.",
      ],
    },
    pdf: {
      what: "The midrange is the part of the spectrum, roughly 200 Hz to 4 kHz, where vocals, guitars, synths and snares all live. Vocal separation means making room there so the voice stays clear.",
      feel: "Clear and forward when it's right. Boxy, muddy or buried when it isn't.",
      use: [
        "Mixing an acapella over an instrumental.",
        "Blending two full tracks without the vocals clashing.",
        "Fixing a vocal that disappears when the drums come in.",
      ],
      check: [
        ["Roughly where does the midrange sit?", "About 200 Hz to 4 kHz."],
        ["What do you cut first when vocals clash?", "The competing mids on the other track."],
        ["What does too much low-mid sound like?", "Boxy or muddy."],
      ],
      remember: "Make room first. Boost second.",
    },
  },
  {
    n: 15, mood: { hook: "shocked", pain: "sad", fix: "smirk", cta: "smile" }, series: "Mix Lab", sn: 3, stotal: 6,
    slug: "resonance-control", name: "Resonance Control", wave: "resonance", layout: "sticker",
    hook: { lines: ["THE KNOB THAT", "MAKES FILTERS", "SING"], accentFrom: 1, sub: "Resonance, explained in 5 swipes" },
    pain: {
      head: ["YOUR FILTER SWEEP", "SOUNDS FLAT"],
      body: "A plain filter sweep just takes sound away. Resonance boosts the frequencies right at the cutoff, so the sweep gets a clear peak you can hear and feel.",
    },
    spot: {
      head: ["HOW RESONANCE", "SHAPES A FILTER"], label: "LOW-PASS FILTER WITH RESONANCE",
      items: [
        ["Low resonance", "A smooth, natural sweep. Great for blending."],
        ["Medium resonance", "Clear and punchy. The sweet spot for most mixes."],
        ["High resonance", "A sharp peak. Big energy, but it can get harsh."],
      ],
    },
    fix: {
      head: ["USE IT IN", "SMALL DOSES"],
      callout: "Raise resonance slowly while you sweep the cutoff to build tension.",
      steps: [
        "Start with low resonance and sweep the cutoff slowly.",
        "Raise the resonance a little as you build toward the drop.",
        "Bring it back down as the drop lands so it doesn't get harsh.",
      ],
    },
    pdf: {
      what: "Resonance, sometimes called Q, boosts the frequencies right around a filter's cutoff point. The higher the resonance, the sharper the peak and the more obvious the filter effect.",
      feel: "Low: smooth and natural. High: sharp, whistling and dramatic.",
      use: [
        "Filter sweeps that build into a drop.",
        "Isolating one part of a track, like a vocal or a snare, with a band-pass filter.",
        "Creating unusual textures and effects.",
      ],
      check: [
        ["What does resonance boost?", "The frequencies around the cutoff point."],
        ["What happens when resonance is very high?", "A sharp peak that can sound harsh."],
        ["When do you raise it?", "Slowly, during a build."],
      ],
      remember: "Sweep the cutoff. Nudge the resonance. Keep it musical.",
    },
  },
  {
    n: 16, theme: "ivory", mood: { hook: "serious", pain: "skeptical", fix: "point", cta: "smile" }, series: "Mix Lab", sn: 4, stotal: 6,
    slug: "eq-and-filter-combo", name: "EQ and Filter Combo", wave: "eqfilter", layout: "art", gear: "flx4-full",
    hook: { lines: ["EQ + FILTER:", "THE CLEAN", "MIX COMBO"], accentFrom: 1, sub: "EQ and filter together, explained in 5 swipes" },
    pain: {
      head: ["TWO TRACKS.", "ONE CROWDED MIX."],
      body: "When two full tracks play together, their lows and highs pile up and the mix turns messy. EQ shapes each range. A filter removes everything above or below a point. Together they keep it clean.",
    },
    spot: {
      head: ["EQ VS", "FILTER"], label: "HIGH-PASS IN, LOW-PASS OUT",
      items: [
        ["EQ shapes the sound", "Boost or cut low, mid and high to balance a track."],
        ["Filters remove the extremes", "A low-pass keeps the lows. A high-pass keeps the highs."],
        ["Use both together", "Filter to clear space, then EQ to fine-tune."],
      ],
    },
    fix: {
      head: ["FILTER OUT.", "FILTER IN."],
      callout: "Close a low-pass on the old track while a high-pass opens on the new one.",
      steps: [
        "Close the low-pass slowly on the outgoing track.",
        "Open the high-pass slowly on the incoming track.",
        "Fine-tune with EQ, then swap the bass on the bar line.",
      ],
    },
    pdf: {
      what: "EQ raises or lowers the level of low, mid and high frequencies. A filter cuts everything above or below a chosen point. Used together, they let you clear space for each track in a mix.",
      feel: "Clean and controlled, with no frequency fights.",
      use: [
        "Smooth transitions: low-pass on the outgoing track, high-pass on the incoming one.",
        "Keeping one kick and one bassline in the mix at a time.",
        "Taming harsh hi-hats with a gentle low-pass or a high EQ cut.",
      ],
      check: [
        ["What does a low-pass filter keep?", "The low frequencies."],
        ["Which filter goes on the incoming track?", "A high-pass, opened slowly."],
        ["What does EQ do?", "Raises or lowers specific frequency ranges."],
      ],
      remember: "Filter to clear space. EQ to fine-tune.",
    },
  },
  {
    n: 17, mood: { hook: "smile", pain: "skeptical", fix: "point", cta: "smirk" }, series: "Mix Lab", sn: 5, stotal: 6,
    slug: "old-song-to-modern-remix", name: "Old Song to Modern Remix", wave: "remix", layout: "sticker",
    hook: { lines: ["OLD SONG.", "NEW LIFE.", "ONE REMIX."], accentFrom: 1, sub: "Old song to modern remix, explained in 5 swipes" },
    pain: {
      head: ["GREAT SONG.", "QUIET FLOOR."],
      body: "Classic songs have the melody and the memories, but they often sound smaller than today's tracks. Played as they are, they can drop the energy in your set.",
    },
    spot: {
      head: ["WHAT MAKES A", "GOOD REMIX"], label: "ORIGINAL VS MODERN REMIX",
      items: [
        ["Keep the emotion", "The vocal and melody are why people love the song."],
        ["Add modern drums and bass", "Punchy drums and a strong low end bring the energy."],
        ["Build the arrangement", "An intro, build-up, drop and breakdown give DJs something to play."],
      ],
    },
    fix: {
      head: ["REMIX IT", "IN 3 MOVES"],
      callout: "Keep the vocal, rebuild the groove, and give it a clear intro and drop.",
      steps: [
        "Pick a song with a strong vocal and a high-quality audio file.",
        "Split it into stems, then rebuild the drums and bass.",
        "Add an intro, a build and a drop so you can mix it.",
      ],
    },
    pdf: {
      what: "A modern remix keeps the heart of a classic song, usually the vocal and melody, and rebuilds the rest with modern drums, bass and effects so it works on today's dance floor.",
      feel: "Familiar and fresh at the same time.",
      use: [
        "Edits and remixes that get an instant reaction.",
        "Bridging old and new for a mixed-age crowd, like a wedding.",
        "Posting a remix online usually needs permission from the rights holders.",
      ],
      check: [
        ["What should you keep from the original?", "The vocal and the emotion."],
        ["What do you split the song into to remix it?", "Stems: vocals, drums and music."],
        ["Which arrangement parts help DJs mix it?", "An intro, build-up, breakdown and drop."],
      ],
      remember: "Keep the heart. Rebuild the groove.",
    },
  },
  {
    n: 18, theme: "ivory", mood: { hook: "serious", pain: "skeptical", fix: "smile", cta: "smirk" }, series: "Mix Lab", sn: 6, stotal: 6,
    slug: "dj-download-stores", name: "DJ Download Stores", wave: "beat", layout: "sticker", kind: "stores",
    hook: { lines: ["WHERE SMART", "DJS BUY", "THEIR MUSIC"], accentFrom: 1, sub: "9 DJ download stores and pools, compared" },
    pain: {
      head: ["STOP GRABBING", "RANDOM FILES"],
      body: "Low-quality files and missing edits can wreck a set in the middle of the night. Working DJs buy from stores and pools built for DJs, with clean edits, solid quality and proper tags.",
    },
    groups: [
      {
        tag: "STORES 1 TO 3", head: ["CLUB + HOUSE", "STORES"],
        items: [
          { n: 1, name: "Beatport", tag: "The big electronic music store for DJs and producers.", genres: ["TECHNO", "HOUSE", "EDM", "MELODIC", "DRUM & BASS"],
            pts: ["High-quality files, usually 320 kbps or WAV", "Extended mixes, remixes and edits", "Built for club and festival DJs"] },
          { n: 2, name: "Traxsource", tag: "A house music store with exclusive releases.", genres: ["HOUSE", "DEEP HOUSE", "AFRO HOUSE", "SOULFUL", "TECH HOUSE"],
            pts: ["High-quality tracks and exclusive edits", "Classic and underground house", "Strong deep, Afro and soulful focus"] },
          { n: 3, name: "Juno Download", tag: "A massive music store for all genres.", genres: ["AFRO HOUSE", "HOUSE", "TECHNO", "TRANCE", "EDM"],
            pts: ["WAV and FLAC files available", "Latest and classic releases", "Buy per track or per album"] },
        ],
      },
      {
        tag: "STORES 4 TO 6", head: ["OPEN-FORMAT", "POOLS"],
        items: [
          { n: 4, name: "DJ City", tag: "A subscription pool for DJs across every genre.", genres: ["AFRO BEAT", "HIP-HOP", "R&B", "POP", "EDM"],
            pts: ["Clean versions and radio edits", "Intro and outro edits, remixes, acapellas", "Updated regularly, great for mobile DJs"] },
          { n: 5, name: "ZipDJ", tag: "A multi-genre pool for working DJs.", genres: ["AFRO HOUSE", "AFROBEAT", "EDM", "POP", "LATIN"],
            pts: ["Huge Afrobeat selection", "Intros, outros, remixes and acapellas", "Updated daily"] },
          { n: 6, name: "BPM Supreme", tag: "A premium open-format pool.", genres: ["AFROBEATS", "HIP-HOP", "R&B", "EDM", "DANCE"],
            pts: ["Clean, dirty and extended versions", "Exclusive remixes and edits", "Solid metadata for club, mobile and radio DJs"] },
        ],
      },
      {
        tag: "STORES 7 TO 9", head: ["INDIE + EXTRA", "SOURCES"],
        items: [
          { n: 7, name: "SoundCloud", tag: "Remixes, bootlegs and emerging artists.", genres: ["EDITS", "BOOTLEGS", "REMIXES", "AFRO EDITS"],
            pts: ["Some free downloads, when artists allow them", "Fresh remixes and new artists", "Handy for edits and transitions"] },
          { n: 8, name: "Bandcamp", tag: "Independent artists, paid directly.", genres: ["AFROBEAT", "DEEP AFRO", "MINIMAL", "EXPERIMENTAL"],
            pts: ["Your money goes straight to the artist", "WAV and FLAC files", "Great for music nobody else plays"] },
          { n: 9, name: "Promo Only", tag: "A pro pool for current, mainstream music.", genres: ["AFRO", "HIP-HOP", "R&B", "DANCE", "AFROBEATS"],
            pts: ["Clean versions and radio edits", "Latest chart releases", "Made for mobile, club and radio DJs"] },
        ],
      },
    ],
    compare: {
      head: ["WHICH STORE", "FOR WHICH DJ?"],
      cols: ["Store", "Best for", "Main sound", "Quality"],
      rows: [
        ["Beatport", "Club and festival", "Electronic, techno, house", "320 kbps / WAV"],
        ["Traxsource", "House DJs", "Afro house, deep house", "320 kbps / WAV"],
        ["Juno Download", "All genres", "Afro house, techno", "WAV / AIFF"],
        ["DJ City", "Open-format DJs", "All-round", "320 kbps / WAV"],
        ["ZipDJ", "All-round DJs", "Afro house, pop, EDM", "320 kbps / WAV"],
        ["BPM Supreme", "Open-format DJs", "Hip-hop, pop, R&B", "320 kbps / WAV"],
        ["SoundCloud", "Remixes and edits", "All genres", "Varies"],
        ["Bandcamp", "Independent music", "Afro house, minimal", "WAV / FLAC"],
        ["Promo Only", "Mobile and radio", "Mainstream, pop", "320 kbps / WAV"],
      ],
      note: "Formats and plans change. Check each store before you buy.",
    },
    fix: {
      head: ["BUILD A", "CLEAN CRATE"],
      callout: "Buy legal, buy high quality, and organize as you go.",
      steps: [
        "Buy from official, legal stores and pools.",
        "Download the best quality you can: 320 kbps or WAV.",
        "Tag every track and build playlists by genre, mood and event.",
        "Back up your library every month.",
      ],
    },
    pdf: {
      tips: [
        "Buy from official, legal sources only.",
        "Keep your software and drives safe from risky downloads.",
        "Download 320 kbps MP3 or WAV, the best you can.",
        "Use WAV for club and festival systems.",
        "Tag artist, title, key and BPM on every track.",
        "Fix missing edits and metadata as you go.",
        "Build playlists by genre, mood and event type.",
        "Back up monthly, to a drive and the cloud.",
        "Check for new releases on a schedule.",
        "Follow copyright and license rules.",
      ],
      remember: "Buy legal. Buy quality. Keep it organized.",
    },
  },
];

// One-line takeaways used on the roundup grid and the cheat sheet PDF.
const cheat = [
  { key: "sine", name: "Sine", line: "One frequency. The cleanest sound." },
  { key: "square", name: "Square", line: "Two levels. Hard edges. Buzzy." },
  { key: "triangle", name: "Triangle", line: "Straight lines. Soft and mellow." },
  { key: "saw", name: "Sawtooth", line: "Ramp and drop. Bright and thick." },
  { key: "pulse", name: "Pulse", line: "Square with adjustable width." },
  { key: "noise", name: "White & Pink Noise", line: "White is bright. Pink is balanced." },
  { key: "complex", name: "Complex", line: "Real music. Many waves stacked." },
  { key: "clipped", name: "Clipped", line: "Flat tops. Harsh. Avoid it." },
  { key: "beat", name: "Beat", line: "Even peaks. Four beats per bar." },
  { key: "kick", name: "Kick", line: "Tall peak, fast fade. Low end." },
  { key: "snare", name: "Snare & Hi-Hat", line: "Snare on 2 and 4. Hats tick." },
];

const HANDLE = "@elevatedjacademy";
const HASHTAGS = "#elevatedjacademy #djtips #learntodj #djeducation #djlife #djcommunity #mixing";

function caption(l) {
  const first = l.hook.lines.join(" ").replace(/\.+$/, "");
  if (l.roundup) {
    return [
      `${first}. Save this one.`,
      "",
      l.pain.body,
      "",
      `Do this: ${l.fix.callout}`,
      "",
      "Want the full lesson on each one? Join Elevate DJ Academy. It's free. Link in bio.",
      "",
      `${HANDLE}`,
      HASHTAGS,
    ].join("\n");
  }
  if (l.kind === "stores") {
    const names = l.groups.flatMap((g) => g.items).sort((x, y) => x.n - y.n).map((x) => x.name).join(" / ");
    return [
      `${first}. ${l.hook.sub}.`,
      "",
      names,
      "",
      l.pain.body,
      "",
      `Do this: ${l.fix.callout}`,
      "",
      "Want more lessons like this? Join Elevate DJ Academy. It's free. Link in bio.",
      "",
      `${HANDLE}`,
      "#elevatedjacademy #djtips #djmusic #djpool #beatport #djlife #djcommunity",
    ].join("\n");
  }
  return [
    `${first}. ${l.name}, explained.`,
    "",
    l.pain.body,
    "",
    `Do this tonight: ${l.fix.callout}`,
    "",
    "Want more lessons like this? Join Elevate DJ Academy. It's free. Link in bio.",
    "",
    `${HANDLE}`,
    HASHTAGS,
  ].join("\n");
}

lessons.push(...require("./levelup"));

module.exports = { lessons, cheat, HANDLE, caption };
