// Waveform Lab: Elevate DJ Academy lesson content.
// Original copy written for Elevate (Jon's coach voice). Every lesson follows the 5-slide arc:
// Hook, Pain point, Struggles (what you're missing), Primary solution, CTA.
//
// layout: "sticker" = Jon cutout on the pain slide, "art" = framed character art on the pain slide.
// art: file in assets/art/ (Jon's published character art).

const lessons = [
  {
    n: 1, slug: "sine-wave", name: "Sine Wave", wave: "sine", layout: "sticker",
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
    n: 2, slug: "square-wave", name: "Square Wave", wave: "square", layout: "art", art: "color-overwhelmed",
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
    n: 3, slug: "triangle-wave", name: "Triangle Wave", wave: "triangle", layout: "sticker",
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
    n: 4, slug: "sawtooth-wave", name: "Sawtooth Wave", wave: "saw", layout: "art", art: "bw-load-in",
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
    n: 5, slug: "pulse-wave", name: "Pulse Wave", wave: "pulse", layout: "sticker",
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
    n: 6, slug: "white-and-pink-noise", name: "White & Pink Noise", wave: "noise", layout: "art", art: "bw-stressed-callout",
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
    n: 7, slug: "complex-waveform", name: "Complex Waveform", wave: "complex", layout: "sticker",
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
    n: 8, slug: "clipped-waveform", name: "Clipped Waveform", wave: "clipped", layout: "art", art: "color-dj-first-dance",
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
    n: 9, slug: "beat-waveform", name: "Beat Waveform", wave: "beat", layout: "sticker",
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
    n: 10, slug: "kick-drum-waveform", name: "Kick Drum Waveform", wave: "kick", layout: "art", art: "color-dj-crowd",
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
    n: 11, slug: "snare-and-hi-hat-waveform", name: "Snare & Hi-Hat Waveform", wave: "snare", layout: "sticker",
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
    n: 12, slug: "waveform-cheat-sheet", name: "Waveform Cheat Sheet", wave: "grid", layout: "art", art: "bw-summit", roundup: true,
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
  const first = l.hook.lines.join(" ");
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

module.exports = { lessons, cheat, HANDLE, caption };
