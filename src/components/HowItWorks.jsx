import { useEffect, useRef, useState } from "react";
import { howHeading, howSteps } from "../content";
import "./HowItWorks.css";

export default function HowItWorks() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  // cards drop in once when the section arrives
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="how" className="hw" data-nav-theme="dark" ref={ref} data-in={inView} aria-label="How it works">
      <h2 className="hw__title">{howHeading}</h2>

      <ol className="hw__row">
        {howSteps.map((s, i) => (
          <li key={s.title} className="hw__card" style={{ "--n": i }}>
            <span className="hw__tape">Step {i + 1}</span>
            <span className="hw__num" aria-hidden="true">{i + 1}</span>
            <h3 className="hw__name">{s.title}</h3>
            <p className="hw__text">{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
