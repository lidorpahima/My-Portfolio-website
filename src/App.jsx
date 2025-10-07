import React, { useEffect, useState } from "react";
import "./assets/css/index.css";
import Experience from "./pages/Experience/Experience";
import Contact from "./pages/Contact/Contact";
import Projects from "./pages/Projects/Projects";
import Header from "./pages/Header/Header";
import Hero from "./pages/Hero/Hero";
import Skills from "./pages/Skills/Skills";
import Education from "./pages/Education/Education";

import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./components/ui/ScrollToTop";

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false); // Toggle state
  const location = useLocation();

  // Manual pageview for SPA route changes (Vercel Analytics)
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && typeof window.va === "function") {
        window.va("pageview");
      }
    } catch (_) {
      // no-op
    }
  }, [location.pathname, location.search]);

  return (
    <>
      <Header />
      {/* Conditional Rendering */}
      {isOnePage ? (
        // One-Page Mode: Render all components together
        <>
          <Hero />
          <Skills />
          <Experience />
          <Education />
          <Contact />
        </>
      ) : (
        // Router Mode: Use routes for navigation
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </>
      )}
    </>
  );
}
