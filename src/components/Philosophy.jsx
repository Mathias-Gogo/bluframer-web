import { useEffect, useRef, useState } from "react";
import { philosophy } from "../content";
import "./Philosophy.css";

export default function Philosophy() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.3 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section id="philosophy" className="ph" ref={ref} data-in={inView} aria-label="Our philosophy">
      <h2 className="ph__title">{philosophy.heading}</h2>
    </section>
  );
}