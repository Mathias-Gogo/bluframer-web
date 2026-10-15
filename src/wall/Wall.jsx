import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { wallApi, APP_URL, WALL_LINK, WALL_URL } from "./api";
import "./wall.css";

const INTRO = {
  shame: "What clients did to us before Asha existed. Read yours in someone else's words, then add your own.",
  fame: "The ones Asha helped. The files stayed locked, the balance cleared, then the work was released.",
};
const PROMPT = { shame: "What has a client done to you?", fame: "What has Asha done for you?" };
const TILT = [-1.2, 0.8, -0.6, 1.4, -0.9, 0.5];

function Entry({ e, i }) {
  return (
    <article className="wl-entry" style={{ "--r": `${TILT[i % TILT.length]}deg` }}>
      <span className="wl-tape" aria-hidden="true" />
      <p className="wl-entry__body">{e.body}</p>
      {e.shots.map((src, k) => (
        <figure className="wl-print" key={src} style={{ "--r": `${TILT[(i + k + 2) % TILT.length]}deg` }}>
          {e.shotTitle && k === 0 && <figcaption>{e.shotTitle}</figcaption>}
          <img src={src} alt={e.shotTitle ? `Screenshot: ${e.shotTitle}` : "Screenshot sent with this story"} loading="lazy" />
        </figure>
      ))}
      <p className="wl-entry__who">
        {e.handle ? <a href={`${APP_URL}/${e.handle}`} target="_blank" rel="noopener noreferrer">@{e.handle}</a> : "Anonymous creative"}
      </p>
    </article>
  );
}

export default function Wall({ kind }) {
  const [state, setState] = useState({ status: "loading", entries: [] });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = `Wall of ${kind === "fame" ? "Fame" : "Shame"} | Asha`;
    let alive = true;
    wallApi(`/entries?kind=${kind}`)
      .then((d) => alive && setState({ status: "ready", entries: d.entries }))
      .catch(() => alive && setState({ status: "error", entries: [] }));
    return () => { alive = false; };
  }, [kind]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(WALL_URL); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked */ }
  };

  return (
    <>
      <Navbar />
      <main className="wl wl--wall">
        <header className="wl-head">
          <h1 className="wl-title">The Wall.</h1>
          <p className="wl-sub">{INTRO[kind]}</p>
          <nav className="wl-tabs" aria-label="Which wall">
            <a className="wl-tab" href="/wall/shame" aria-current={kind === "shame" ? "page" : undefined}>Wall of Shame</a>
            <a className="wl-tab" href="/wall/fame" aria-current={kind === "fame" ? "page" : undefined}>Wall of Fame</a>
          </nav>
        </header>

        <section className="wl-add" aria-label="Add yours">
          <span className="wl-tape" aria-hidden="true" />
          <p className="wl-add__eyebrow">Add yours</p>
          <h2>{PROMPT[kind]}</h2>
          <p>Type it or upload screenshots. Anonymous by default, or add your @handle so people can find your work.</p>
          <div className="wl-panel__row">
            <a className="wl-btn wl-btn--solid" href="/wall">{WALL_LINK}</a>
            <button type="button" className="wl-btn wl-btn--line" onClick={copy}>{copied ? "Copied" : "Copy link"}</button>
          </div>
        </section>

        {state.status === "loading" && <p className="wl-note" role="status">Loading the wall…</p>}
        {state.status === "error" && <p className="wl-note" role="alert">Couldn't load the wall. Refresh to try again.</p>}
        {state.status === "ready" && !state.entries.length && <p className="wl-note">Nothing here yet. Be the first to add yours.</p>}
        {state.entries.length > 0 && <div className="wl-grid">{state.entries.map((e, i) => <Entry key={e.id} e={e} i={i} />)}</div>}
      </main>
      <Footer />
    </>
  );
}
