import { useEffect, useRef, useState } from "react";
import { philosophy } from "../content";
import "./Philosophy.css";

export default function Philosophy() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="philosophy" className="ph" ref={ref} data-in={inView} aria-label="Our philosophy">
      <h2 className="ph__title">{philosophy.heading}</h2>

      <div className="ph__print">
        <div className="ph__frame">
          {playing ? (
            <iframe
              src={`https://www.youtube.com/embed/${philosophy.video}?autoplay=1&rel=0`}
              title="Our philosophy"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <button type="button" className="ph__poster" onClick={() => setPlaying(true)} aria-label="Play the Bluframer philosophy video">
              <img src={philosophy.poster} alt="" />
              <span className="ph__play" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}