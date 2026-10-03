import { contactEmails } from "../content";
import { menuLinks } from "../images";
import "./Footer.css";

export default function Footer() {
  return (
    <footer id="contact" className="ft" data-nav-theme="dark">
      <div className="ft__cols">
        <nav aria-label="Explore">
          <h3>Explore</h3>
          <ul>
            {menuLinks.map((l) => (
              <li key={l.label}><a href={l.href}>{l.label}</a></li>
            ))}
            <li><a href="#demo">Book a demo</a></li>
          </ul>
        </nav>
        <div>
          <h3>Contact</h3>
          <ul>
            {contactEmails.map((m) => (
              <li key={m}><a href={`mailto:${m}`}>{m}</a></li>
            ))}
          </ul>
        </div>
      </div>

      <p className="ft__mark" aria-hidden="true">bluframer</p>
      <p className="ft__legal">© {new Date().getFullYear()} Bluframer</p>
    </footer>
  );
}