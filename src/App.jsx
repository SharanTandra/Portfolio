import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import ParticleField from "./components/ParticleField";
import PageTransition from "./components/PageTransition";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
import Portfolio from "./pages/Portfolio";

function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      
      {/* Persistent 3D Background */}
      <ParticleField />

      {/* Navigation */}
      <Navbar />

      {/* Page Content */}
      <div className="page-content">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </AnimatePresence>
      </div>
    </>
  );
}
export default App;