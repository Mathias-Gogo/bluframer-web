import { useEffect, useState } from "react";
import { renderStoryCard } from "./storyCard";
import { WALL_LINK, WALL_URL } from "./api";

// Shown after a story is sent. The card is drawn once and used for the preview, "Save", and the phone share sheet.
export default function ShareSheet({ kind, body, handle, shotTitle, shotUrl, extraShots }) {
  const [card, setCard] = useState(null);
  const [failed, setFailed] = useState(false);
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    renderStoryCard({ kind, body, handle, shotTitle, shotUrl, extraShots })
      .then((c) => alive && setCard(c))
      .catch(() => alive && setFailed(true));
    return () => { alive = false; };
  }, [kind, body, handle, shotTitle, shotUrl, extraShots]);

  const text = kind === "fame"
    ? `I just added my story to Asha's Wall of Fame. What has Asha done for you? ${WALL_URL}`
    : `I just added my story to Asha's Wall of Shame. What has a client done to you? ${WALL_URL}`;

  const download = () => {
    if (!card) return;
    const a = document.createElement("a");
    a.href = card.url; a.download = "asha-wall.png"; a.click();
  };

  // Instagram and Snapchat have no web link that attaches an image, so on a phone we hand the card to the
  // share sheet (they appear there); anywhere else the card is saved for posting by hand.
  const shareCard = async (appName) => {
    if (!card) return;
    const file = new File([card.blob], "asha-wall.png", { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text, url: WALL_URL }); setNote(""); }
      catch (e) { if (e?.name !== "AbortError") setNote("Couldn't open the share sheet. Use Save card as image instead."); }
    } else {
      download();
      setNote(`Saved your card. Open ${appName} and add it to your story.`);
    }
  };

  const copy = async () => {
    try { await navigator.clipboard.writeText(WALL_URL); }
    catch { const t = document.createElement("textarea"); t.value = WALL_URL; document.body.append(t); t.select(); document.execCommand("copy"); t.remove(); }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section className="wl-share" aria-labelledby="wl-sent">
      <h1 id="wl-sent" className="wl-title">Sent. A person will read it first.</h1>
      <p className="wl-sub">Your story card is ready. Post it and ask others to send theirs.</p>

      <div className="wl-share__card">
        {card ? <img src={card.url} alt="Your story card, ready to post" /> : <div className="wl-share__wait">{failed ? "Couldn't draw the card." : "Drawing your card…"}</div>}
      </div>

      <div className="wl-share__row">
        <a className="wl-btn wl-btn--line" href={`https://wa.me/?text=${encodeURIComponent(text)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <button type="button" className="wl-btn wl-btn--line" onClick={() => shareCard("Instagram")} disabled={!card}>Instagram Story</button>
        <a className="wl-btn wl-btn--line" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(WALL_URL)}`} target="_blank" rel="noopener noreferrer">Facebook</a>
        <button type="button" className="wl-btn wl-btn--line" onClick={() => shareCard("Snapchat")} disabled={!card}>Snapchat</button>
      </div>
      <button type="button" className="wl-btn wl-btn--solid wl-btn--wide" onClick={copy}>{copied ? "Link copied" : `Copy link: ${WALL_LINK}`}</button>
      <button type="button" className="wl-btn wl-btn--line wl-btn--wide" onClick={download} disabled={!card}>Save card as image</button>

      <p className="wl-note" role="status">{note || "Instagram and Snapchat open from your phone's share sheet with the card attached."}</p>
      <p className="wl-note"><a href={`/wall/${kind}`}>Read the wall</a></p>
    </section>
  );
}
