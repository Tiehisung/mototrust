// App.tsx - Main application component
import React, { useState, useEffect } from "react";
import Hero from "./Hero";
import About from "./About";
import Squad from "./Squad";
import Fixtures from "./Fixtures";
import Contact from "./Contact";
import Newsletter from "./Newsletter";
import Footer from "./Footer";
import Navbar from "@/components/Navbar";

const HomeComponent: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white text-gray-900">
      <Navbar isScrolled={isScrolled} scrollToSection={scrollToSection} />
      <Hero />
      <About />
      <Squad />
      <Fixtures />
      <Contact />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomeComponent;
