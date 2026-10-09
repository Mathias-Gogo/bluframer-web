import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Hero from "./Hero";
import Story from "./Story";
import { steps } from "../content";
import { A, B, TOTAL, applyFrame, clamp, measureGeometry } from "../choreography";
import "./Journey.css";

/*
  One tall scroll track with one pinned screen inside it.
  What happens in each phase (A, B, T) lives in ../choreography.js,
  along with the numbers that make each phase longer or shorter.
*/

export default function Journey() {
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const geoRef = useRef(null);
  const stepRef = useRef(0);
  const lastRef = useRef({ p: -1, sp: -1 });
  const widthRef = useRef(0);
  const reduceRef = useRef(false);
  const [step, setStep] = useState(0);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return null;
    const scrollable = track.offsetHeight - stage.offsetHeight;
    return { track, stage, unit: scrollable / TOTAL, scrollable };
  }, []);

  const update = useCallback((force = false) => {
    const m = measure();
    if (!m) return;
    const rect = m.track.getBoundingClientRect();
    const y = clamp(-rect.top, 0, m.scrollable);
    const screens = y / m.unit;

    const p = clamp(screens / A); // 0 to 1 across phase A (hero hands over to story)
    const sp = clamp((screens - A) / B) * steps.length; // 0 to 4 across phase B (the story)
    const idx = Math.min(steps.length - 1, Math.floor(sp));

    // Off-screen (above or below the track) p and sp are clamped, so nothing changes:
    // don't touch the DOM at all. This keeps scrolling the rest of the page cheap.
    const last = lastRef.current;
    if (!force && Math.abs(p - last.p) < 0.0005 && Math.abs(sp - last.sp) < 0.0005) return;
    last.p = p;
    last.sp = sp;

    const f = applyFrame(m.stage, geoRef.current, p, reduceRef.current);
    m.stage.style.setProperty("--sp", sp.toFixed(4));

    if (idx !== stepRef.current) {
      stepRef.current = idx;
      setStep(idx);
    }

    // Tell the navbar whether this stage is dark right now (the navbar reads
    // data-nav-theme from whatever section is behind each control).
    const theme = f.wash > 0.5 ? "dark" : "light";
    if (m.stage.dataset.navTheme !== theme) {
      m.stage.dataset.navTheme = theme;
      window.dispatchEvent(new Event("navtheme"));
    }
  }, [measure]);

  const remeasure = useCallback(() => {
    const stage = stageRef.current;
    if (stage) geoRef.current = measureGeometry(stage);
    update(true);
  }, [update]);

  useLayoutEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    remeasure();
    // fonts change text heights, which moves the story's photo frame a little
    document.fonts?.ready.then(remeasure);
  }, [remeasure]);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          update();
        });
      }
    };
    widthRef.current = window.innerWidth;
    const onResize = () => {
      // phones fire "resize" whenever the address bar slides in or out (height only);
      // re-measuring on every one of those is what made scrolling stutter
      if (window.innerWidth === widthRef.current) return;
      widthRef.current = window.innerWidth;
      cancelAnimationFrame(raf);
      raf = 0;
      remeasure();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, [update, remeasure]);

  // clicking a status bar scrolls to the start of that step
  const jump = useCallback(
    (i) => {
      const m = measure();
      if (!m) return;
      const trackTop = m.track.getBoundingClientRect().top + window.scrollY;
      const screens = A + (i / steps.length) * B + 0.01;
      window.scrollTo({
        top: trackTop + screens * m.unit,
        behavior: reduceRef.current ? "auto" : "smooth",
      });
    },
    [measure]
  );

  return (
    <section
      id="work"
      className="journey"
      ref={trackRef}
      style={{ height: `${(1 + TOTAL) * 100}svh` }}
      aria-label="Asha introduction"
    >
      <div className="journey__stage" ref={stageRef} data-landed="false" data-moving="false">
        <div className="journey__wash" aria-hidden="true" />
        <Hero />
        <div className="journey__story">
          <Story step={step} onJump={jump} />
        </div>
      </div>
    </section>
  );
}