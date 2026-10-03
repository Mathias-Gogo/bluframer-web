import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { audience } from "../content";
import { clamp } from "../choreography";
import "./Audience.css";

// One quiet drop when the section arrives, then the stack just reorders as you scroll.
const N = audience.length;
const LEN = 4; // track length in screens

const Words = ({ text }) =>
  text.split(" ").map((w, i) => (
    <Fragment key={i}>
      <span className="w"><span style={{ "--i": i }}>{w}</span></span>{" "}
    </Fragment>
  ));

const Detail = ({ i }) => {
  if (i === 0) return <span className="aud__tag">Final file · awaiting your approval</span>;
  if (i === 1) return <span className="aud__tag aud__tag--off">🔒 Download</span>;
  return (
    <span className="aud__tags">
      <span className="aud__tag">Acme · Locked</span>
      <span className="aud__tag">Northwind · Open</span>
      <span className="aud__tag">Lumen · Locked</span>
    </span>
  );
};

export default function Audience() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const scrollable = track.offsetHeight - window.innerHeight;
    const p = clamp(-rect.top / scrollable);
    setActive(Math.min(N - 1, Math.floor(p * N)));
    if (rect.top < window.innerHeight * 0.5) setInView(true);
  }, []);

  useEffect(() => {
    let raf = 0;
    const on = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); });
    };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const jump = (i) => {
    const track = trackRef.current;
    const top = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (i / N + 0.01) * scrollable, behavior: "smooth" });
  };

  return (
    <section id="audience" className="aud" ref={trackRef} style={{ height: `${LEN * 100}svh` }} aria-label="Who Bluframer is for">
      <div className="aud__stage" data-in={inView}>
        <p className="aud__kicker">We build Bluframer for</p>

        <div className="aud__grid">
          <div className="aud__copy">
            {audience.map((a, i) => (
              <div key={a.title} className={`aud__step ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
                <h2 className="aud__title"><Words text={a.title} /></h2>
                <p className="aud__who">{a.who}</p>
                <p className="aud__text">{a.text}</p>
              </div>
            ))}
            <div className="aud__dots" role="group" aria-label="Audience">
              {audience.map((a, i) => (
                <button key={a.title} type="button" className={i === active ? "is-active" : ""} aria-label={a.title} aria-current={i === active} onClick={() => jump(i)} />
              ))}
            </div>
          </div>

          <div className="aud__stack">
            {audience.map((a, i) => (
              <div
                key={a.title}
                className="aud__card"
                data-o={(i - active + N) % N}
                style={{ "--n": i, "--t": `${a.tilt}deg` }}
                onClick={() => jump(i)}
              >
                <div className="aud__print">
                  <img src={a.src} alt={i === active ? a.title : ""} draggable={false} />
                  <Detail i={i} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
