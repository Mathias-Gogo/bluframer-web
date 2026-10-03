import { steps, gridPhotos } from "../content";
import "./Story.css";

// `step` is the active step (0 to 3). The bar fill itself comes from --sp,
// which Journey.jsx updates on every scroll frame.
export default function Story({ step, onJump }) {
  return (
    <div className="story">
      <p className="story__kicker">Bluframer helps to</p>

      <div className="story__grid">
        <div className="story__copy">
          {steps.map((s, i) => (
            <div
              key={s.title}
              className={`story__step ${i === step ? "is-active" : ""}`}
              aria-hidden={i !== step}
            >
              <h2 className="story__title">{s.title}</h2>
              <p className="story__text">{s.text}</p>
            </div>
          ))}
        </div>

        <div className="story__media">
          {steps.map((s, i) => (
            <img
              key={s.title}
              className={`story__img ${i <= step ? "is-in" : ""}`}
              style={{ zIndex: i + 1 }}
              src={s.src}
              alt={i === step ? `Sample photo: ${s.title}` : ""}
            />
          ))}

          <Scenes step={step} />

          <div className="story__bars" role="group" aria-label="Steps">
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                className="bar"
                style={{ "--i": i }}
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-current={i === step ? "step" : undefined}
                onClick={() => onJump(i)}
              >
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Lock = ({ open }) => (
  <svg viewBox="0 0 48 48" width="100%" height="100%" aria-hidden="true">
    <path d={open ? "M15 22v-7a9 9 0 0 1 17-4" : "M15 22v-7a9 9 0 0 1 18 0v7"} fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <rect x="9" y="22" width="30" height="21" rx="5" fill="currentColor" />
  </svg>
);

// Each scene is driven by --lp (0 to 1 inside its own step), so it scrubs with the scroll.
function Scenes({ step }) {
  const on = (i) => `scene ${i === step ? "is-on" : ""}`;
  return (
    <div className="scenes" aria-hidden="true">
      <div className={on(0)} style={{ "--i": 0 }}>
        <div className="veil" />
        <div className="scan" />
        <div className="done">
          <svg viewBox="0 0 52 52" aria-hidden="true">
            <circle className="c" cx="26" cy="26" r="22" pathLength="1" />
            <path className="t" d="M15 27l8 8 14-17" pathLength="1" />
          </svg>
          <span>Upload complete</span>
        </div>
      </div>

      <div className={on(1)} style={{ "--i": 1 }}>
        <span className="chip chip--tl">View only</span>
        <span className="chip chip--br chip--off"><i className="ico"><Lock /></i>Download</span>
        <i className="ring" />
        <svg className="cursor" viewBox="0 0 24 24" width="30" height="30">
          <path d="M4 3l15 8-6.5 2L9.5 20z" fill="#30302d" stroke="#f7f7f3" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
        <div className="modal">
          <i className="ico"><Lock /></i>
          <b>Right-click is disabled</b>
          <span>Downloads stay off until the creator approves this work.</span>
        </div>
      </div>

      <div className={on(2)} style={{ "--i": 2 }}>
        <div className="mark">
          {Array.from({ length: 24 }, (_, n) => <span key={n}>Draft · yours</span>)}
        </div>
        <span className="chip chip--mid link"><b>framer.asha.com.ng/s/link</b></span>
        <div className="avatars">
          {[0, 1, 2].map((a) => <i key={a} style={{ "--a": a }} />)}
        </div>
      </div>

      <div className={on(3)} style={{ "--i": 3 }}>
        <span className="chip chip--bl approve">
          <span className="a1">Approve</span><span className="a2">Approved</span>
        </span>
        <span className="chip chip--br dl">Download</span>
        <div className="portfolio">
          <p>Your portfolio</p>
          <div>{gridPhotos.map((src) => <img key={src} src={src} alt="" />)}</div>
        </div>
      </div>
    </div>
  );
}
