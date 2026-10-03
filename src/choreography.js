/*
  The hero-to-story transition, as plain functions (no React in here).

  The page scrolls through three phases:

    A  the hero hands over to the story:
         - one "lead" photo travels from the left of the board to the right,
           lands exactly on the story's photo frame, then merges into it
         - the other photos drift apart, blur and fade
         - the headline fades and the background turns dark
    B  the story plays: text, photo and status bars move step by step
    T  a short pause on the last step, then the page moves on

  Phase lengths are in "screens" of scrolling. Make any of them bigger to slow it down.
*/
export const A = 1.3;
export const B = 4.8;
export const T = 0.3;
export const TOTAL = A + B + T;

export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

/*
  p = how far through phase A we are (0 to 1). Returns every animated value:

    hl     headline + scroll cue fading out         (0 to 1)
    fly    other photos drifting apart and blurring (0 to 1)
    wash   background going from light to dark      (0 to 1)
    tr     the lead photo's trip across the screen  (0 to 1)
    m      the merge: frame, tape and shadow melt away (0 to 1)
    landed the merge is done, so the story's own photo takes over
*/
export function frame(p, reduce = false) {
  if (reduce) {
    // reduced motion: no travelling, just a clean switch
    const b = p > 0.3 ? 1 : 0;
    return { hl: b, fly: b, wash: b, tr: b, m: b, moving: p > 0, landed: b === 1 };
  }
  return {
    hl: clamp(p / 0.22),
    fly: easeInOut(clamp((p - 0.04) / 0.66)),
    wash: easeInOut(clamp((p - 0.15) / 0.55)),
    tr: clamp((p - 0.06) / 0.64),
    m: easeInOut(clamp((p - 0.66) / 0.3)),
    moving: p > 0,
    landed: p >= 0.985,
  };
}

// Where the lead photo is at trip progress `tr`. S = start box, T = end box (px).
// It lifts a little on the way (the arc) so it feels thrown, not slid.
export function travelRect(S, T, tr, stageHeight) {
  const e = easeInOut(tr);
  const arc = Math.sin(Math.PI * e) * stageHeight * 0.07;
  return {
    left: S.l + (T.l - S.l) * e,
    top: S.t + (T.t - S.t) * e - arc,
    width: S.w + (T.w - S.w) * e,
    height: S.h + (T.h - S.h) * e,
  };
}

// Reads the start box (the lead photo on the board) and the end box (the
// story's photo frame). Call on mount, on resize, and when fonts finish loading.
export function measureGeometry(stage) {
  const lead = stage.querySelector(".card--lead");
  const media = stage.querySelector(".story__media");
  if (!lead || !media) return null;

  // clear anything we set last frame so we read the board's real layout
  lead.style.left = lead.style.top = lead.style.width = lead.style.height = "";

  const st = stage.getBoundingClientRect();
  const mr = media.getBoundingClientRect();
  return {
    lead,
    S: { l: lead.offsetLeft, t: lead.offsetTop, w: lead.offsetWidth, h: lead.offsetHeight },
    T: { l: mr.left - st.left, t: mr.top - st.top, w: mr.width, h: mr.height },
  };
}

// Writes one frame of the transition onto the pinned stage. CSS does the rest.
export function applyFrame(stage, geo, p, reduce = false) {
  const f = frame(p, reduce);

  const set = (name, v) => stage.style.setProperty(name, v.toFixed(4));
  set("--hl", f.hl);
  set("--fly", f.fly);
  set("--wash", f.wash);
  set("--tr", f.tr);
  set("--m", f.m);

  const flag = (key, v) => {
    const s = String(v);
    if (stage.dataset[key] !== s) stage.dataset[key] = s;
  };
  flag("moving", f.moving);
  flag("landed", f.landed);

  if (geo) {
    const { lead, S, T: end } = geo;
    if (f.tr <= 0) {
      lead.style.left = lead.style.top = lead.style.width = lead.style.height = "";
    } else {
      const r = travelRect(S, end, f.tr, stage.offsetHeight);
      lead.style.left = `${r.left}px`;
      lead.style.top = `${r.top}px`;
      lead.style.width = `${r.width}px`;
      lead.style.height = `${r.height}px`;
    }
  }
  return f;
}
