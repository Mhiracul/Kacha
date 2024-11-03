import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Services from "./Pages/Services";
import Pricing from "./Pages/Pricing";
import Contact from "./Pages/Contact";
import FAQ from "./Pages/FAQ";
import Cart from "./Pages/Cart";
import AboutM from "./Pages/AboutM";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing-plan" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<AboutM />} />
      </Routes>
    </Router>
  );
}

export default App;
