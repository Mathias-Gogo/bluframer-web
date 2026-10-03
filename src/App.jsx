import Navbar from "./components/Navbar";
import Journey from "./components/Journey";
import Audience from "./components/Audience";
import Pricing from "./components/Pricing";
import Philosophy from "./components/Philosophy";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Journey />
        <Audience />
        <Pricing />
        <Philosophy />
      </main>
      <Footer />
    </>
  );
}