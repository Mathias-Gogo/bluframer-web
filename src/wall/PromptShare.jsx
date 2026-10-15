import { useState } from "react";
import { renderPromptCard } from "./storyCard";
import { shareImage, saveImage } from "./share";
import { WALL_URL } from "./api";

// "Post the prompt as your story": the picture goes out with the real link in the caption.
// Where the phone can't share a picture (laptops), the card is saved to post by hand.
export default function PromptShare({ kind }) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");

  const go = async () => {
    setBusy(true); setNote("");
    try {
      const { blob } = await renderPromptCard(kind);
      const text = `${kind === "fame" ? "How has Asha helped you?" : "What has a client done to you?"} Tell it anonymously on Asha's wall: ${WALL_URL}`;
      const result = await shareImage({ blob, text, name: `asha-wall-${kind}-prompt.png` });
      if (result === "unsupported") { saveImage(blob, `asha-wall-${kind}-prompt.png`); setNote("Saved. Post it to your story and paste the link in the caption."); }
    } catch { setNote("Couldn't draw the card. Try again."); }
    finally { setBusy(false); }
  };

  return (
    <>
      <button type="button" className="wl-btn wl-btn--line" onClick={go} disabled={busy}>{busy ? "Drawing…" : "Share this prompt as a story"}</button>
      {note && <p className="wl-note" role="status">{note}</p>}
    </>
  );
}
