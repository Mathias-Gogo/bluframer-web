import { menuLinks } from "../images";
import "./Footer.css";

// Both inboxes, stored encoded and only joined when someone taps Contact,
// so the addresses never appear in the page's HTML for scrapers to collect.
const INBOXES = ["ZW5laWthcmVhd2FqaW1hdGhpYXNAZ21haWwuY29t", "ZmluaWFrZW5lQGdtYWlsLmNvbQ=="];

function openMail() {
    const to = INBOXES.map((x) => atob(x)).join(",");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent("Hello Asha")}`;
}

export default function Footer() {
    return (
        <footer id="contact" className="ft" data-nav-theme="dark">
            <div className="ft__top">
                <div className="ft__note">
                    <h2>Want to reach out to the team?</h2>
                    <button type="button" className="ft__contact" onClick={openMail}>
                        Contact
                    </button>
                </div>

                <nav className="ft__links" aria-label="Explore">
                    {menuLinks.map((l) => (
                        <a key={l.label} href={l.href}>{l.label}</a>
                    ))}
                </nav>
            </div>

            <p className="ft__legal">© {new Date().getFullYear()} Asha Creative Technologies</p>
            <p className="ft__mark" aria-hidden="true">asha.com.ng</p>

        </footer>
    );
}