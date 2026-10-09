import { logoOnDark, logoOnLight } from "../images";
import "./Logo.css";

// Both logos are stacked in the same spot. The navbar fades between them
// depending on whether the page behind it is light or dark.
export default function Logo() {
  return (
    <a className="logo" href="/" aria-label="Asha home">
      <img className="logo__img logo__img--on-light" src={logoOnLight} alt="" />
      <img className="logo__img logo__img--on-dark" src={logoOnDark} alt="" />
    </a>
  );
}
