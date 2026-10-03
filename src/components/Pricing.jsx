import { useEffect, useRef, useState } from "react";
import { plans, pricingHeading } from "../content";
import "./Pricing.css";

export default function Pricing() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    const [open, setOpen] = useState(null); // plan whose video is open

    // cards drop in once when the section arrives
    useEffect(() => {
        const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.25 });
        io.observe(ref.current);
        return () => io.disconnect();
    }, []);

    // modal: Esc closes, page behind doesn't scroll
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && setOpen(null);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [open]);

    return (
        <section id="pricing" className="pr" data-nav-theme="dark" ref={ref} data-in={inView} aria-label="Pricing">
            <h2 className="pr__title">{pricingHeading}</h2>

            <div className="pr__row">
                {plans.map((p, i) => (
                    <article key={p.name} className={`pr__card ${p.tag ? "is-lifted" : ""}`} style={{ "--n": i }}>
                        {p.tag && <span className="pr__tape">{p.tag}</span>}
                        <h3 className="pr__name">{p.name}</h3>
                        <p className="pr__note">{p.note}</p>
                        <p className="pr__price">
                            {p.price}
                            {p.per && <small>{p.per}</small>}
                        </p>

                        <dl className="pr__rows">
                            {p.rows.map(([k, v, muted]) => (
                                <div key={k} className={muted ? "is-muted" : ""}>
                                    <dt>{k}</dt>
                                    <dd>{v}</dd>
                                </div>
                            ))}
                        </dl>

                        <button type="button" className="pr__cta">{p.cta}</button>
                        <button type="button" className="pr__more" onClick={() => setOpen(p)}>
                            Learn more
                        </button>
                    </article>
                ))}
            </div>

            {open && (
                <div className="pr__modal" role="dialog" aria-modal="true" aria-label={`${open.name} plan video`} onClick={() => setOpen(null)}>
                    <div className="pr__video" onClick={(e) => e.stopPropagation()}>
                        <button type="button" className="pr__close" aria-label="Close video" onClick={() => setOpen(null)} autoFocus>
                            ✕
                        </button>
                        <iframe
                            src={`https://www.youtube.com/embed/${open.video}?autoplay=1&rel=0`}
                            title={`What to expect on ${open.name}`}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </section>
    );
}