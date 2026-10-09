import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import { menuLinks } from "../images";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [origin, setOrigin] = useState({ x: "50%", y: "40px" });
  const menuBtnRef = useRef(null);
  const leftRef = useRef(null);
  const demoRef = useRef(null);

  // Logo, Menu and Book Demo each pick light or dark colours from the section
  // behind them. Any section can opt in with data-nav-theme="dark".
  useEffect(() => {
    const root = document.documentElement;
    const themeBehind = (el) => {
      if (!el) return "light";
      const r = el.getBoundingClientRect();
      const stack = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      const behind = stack.find((n) => !n.closest(".nav, .menu"));
      return behind?.closest("[data-nav-theme]")?.dataset.navTheme === "dark" ? "dark" : "light";
    };
    const apply = () => {
      const next = {
        navL: themeBehind(leftRef.current),
        navC: themeBehind(menuBtnRef.current),
        navR: themeBehind(demoRef.current),
      };
      Object.entries(next).forEach(([k, v]) => {
        if (root.dataset[k] !== v) root.dataset[k] = v;
      });
    };
    let raf = 0;
    const onChange = () => {
      if (!raf) raf = requestAnimationFrame(() => { raf = 0; apply(); });
    };
    apply();
    window.addEventListener("scroll", onChange, { passive: true });
    window.addEventListener("resize", onChange);
    window.addEventListener("navtheme", onChange);
    return () => {
      window.removeEventListener("scroll", onChange);
      window.removeEventListener("resize", onChange);
      window.removeEventListener("navtheme", onChange);
      cancelAnimationFrame(raf);
      ["navL", "navC", "navR"].forEach((k) => delete root.dataset[k]);
    };
  }, []);

  const toggle = () => {
    // the overlay opens (and closes) from the centre of the Menu button
    if (!open && menuBtnRef.current) {
      const r = menuBtnRef.current.getBoundingClientRect();
      setOrigin({ x: `${r.left + r.width / 2}px`, y: `${r.top + r.height / 2}px` });
    }
    setOpen((o) => !o);
  };

  // Esc closes the menu, and the page behind it stops scrolling while it's open
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="nav" data-open={open}>
        <div className="nav__left" ref={leftRef}>
          <Logo />
        </div>

        <button
          ref={menuBtnRef}
          type="button"
          className="pill pill--menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={toggle}
        >
          <span className="pill__label">{open ? "Close" : "Menu"}</span>
          <span className="burger" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </button>

        <div className="nav__right">
          <a className="pill pill--demo" href="https://app.asha.com.ng" ref={demoRef}>
            Try out Asha
          </a>
        </div>
      </header>

      <div
        id="site-menu"
        className={`menu ${open ? "is-open" : ""}`}
        style={{ "--ox": origin.x, "--oy": origin.y }}
        aria-label="Site menu"
      >
        <ul className="menu__list">
          {menuLinks.map((link, i) => (
            <li key={link.label} className="menu__item" style={{ "--i": i }}>
              <a
                className="menu__link"
                href={link.href}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="menu__preview" aria-hidden="true">
          {menuLinks.map((link, i) => (
            <img
              key={link.label}
              src={link.img}
              alt=""
              className={i === active ? "is-active" : ""}
            />
          ))}
        </div>

        <a className="menu__demo" href="#demo" onClick={() => setOpen(false)}>
          Book Demo
        </a>
      </div>
    </>
  );
}