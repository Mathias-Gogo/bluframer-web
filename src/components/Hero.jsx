import { Fragment } from "react";
import { board } from "../content";
import "./Hero.css";

const TAPE = { dark: "var(--dark)", mid: "var(--mid)", light: "var(--light)" };

// Splits a line into words so each one can rise into place on load.
function Words({ text, start = 0 }) {
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="word">
        <span style={{ "--i": start + i }}>{word}</span>
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero() {
  return (
    <div className="hero">
      {board.map((c) => (
        <div
          key={c.n}
          className={`card ${c.lead ? "card--lead" : ""} ${c.m ? "" : "card--desk"}`}
          style={{
            "--x": c.x,
            "--y": c.y,
            "--w": c.w,
            "--ratio": c.ratio,
            "--r": `${c.r}deg`,
            "--ox": c.ox,
            "--oy": c.oy,
            "--z": c.z,
            "--n": c.n,
            "--tape": TAPE[c.tape],
            ...(c.m && {
              "--mx": c.m.x,
              "--my": c.m.y,
              "--mw": c.m.w,
              "--mratio": c.m.ratio,
              "--mr": `${c.m.r}deg`,
              "--mox": c.m.ox,
              "--moy": c.m.oy,
              "--mz": c.m.z,
            }),
          }}
        >
          <div className="card__inner">
            <img src={c.src} alt="" draggable={false} />
          </div>
        </div>
      ))}

      <div className="hero__copy">
        <h1 className="hero__title">
          <span className="hero__line">
            <Words text="Secure your" />
          </span>
          <span className="hero__line">
            <Words text="creativity" start={2} />
          </span>
        </h1>
      </div>

      <div className="hero__cue" aria-hidden="true">
        Scroll
        <svg viewBox="0 0 16 16" width="14" height="14">
          <path d="M8 2v11M3.5 8.5 8 13l4.5-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}