import App from "./App";
import Send from "./wall/Send";
import Wall from "./wall/Wall";
import Stats from "./wall/Stats";

// The marketing page plus the Wall pages, picked by address. No router library needed for four pages.
export default function Root() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";
  if (path === "/wall") return <Send />;
  if (path === "/wall/shame") return <Wall kind="shame" />;
  if (path === "/wall/fame") return <Wall kind="fame" />;
  if (path === "/stats") return <Stats />;
  return <App />;
}
