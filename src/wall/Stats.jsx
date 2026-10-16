import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { wallApi } from "./api";
import "./wall.css";

const TILES = [
  ["creatives", "Creatives on Asha"],
  ["projectsProtected", "Projects protected"],
  ["photosLocked", "Photos and designs locked"],
  ["released", "Released after approval"],
];
const fmt = (n) => (typeof n === "number" ? n.toLocaleString("en-NG") : "—");

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    document.title = "Live stats | Asha";
    let alive = true;
    const load = () => wallApi("/stats").then((d) => { if (alive) { setStats(d); setFailed(false); } }).catch(() => alive && setFailed(true));
    load();
    const t = setInterval(load, 30000);
    return () => { alive = false; clearInterval(t); };
  }, []);

  const post = async () => {
    if (!stats) return;
    const text = `On Asha right now: ${fmt(stats.creatives)} creatives, ${fmt(stats.photosLocked)} photos and designs locked, ${fmt(stats.released)} released after approval. asha.com.ng/stats`;
    if (navigator.share) { try { await navigator.share({ text, url: "https://asha.com.ng/stats" }); } catch { /* cancelled */ } }
    else window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  };

  return (
    <>
      <Navbar />
      <main className="wl wl--stats">
        <p className="wl-live"><span aria-hidden="true" /> LIVE <small>Updated every 30 seconds</small></p>
        <h1 className="wl-title">How creatives are protected, live.</h1>
        <p className="wl-sub">Real numbers from Asha. Nothing here is a client name or a file.</p>
        <ul className="wl-tiles">
          {TILES.map(([key, label]) => (
            <li key={key} className="wl-tile">
              <span>{label}</span>
              <strong aria-live="polite">{fmt(stats?.[key])}</strong>
            </li>
          ))}
        </ul>
        {failed && <p className="wl-note" role="alert">Couldn't reach the numbers just now. Trying again.</p>}
        <div className="wl-banner" data-nav-theme="dark">
          <p>LOCKED BY <strong>asha.com.ng</strong></p>
          <button type="button" className="wl-btn wl-btn--light" onClick={post} disabled={!stats}>Post these numbers</button>
        </div>
      </main>
      <Footer />
    </>
  );
}
