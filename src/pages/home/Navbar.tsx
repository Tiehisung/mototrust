// components/Navbar.tsx
import React from "react";

interface NavbarProps {
  isScrolled: boolean;
  scrollToSection: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled, scrollToSection }) => {
  const navItems = ["Home", "About", "Squad", "Fixtures", "Contact"];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-gray-200"
          : "bg-white py-5 border-b border-gray-100"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection("home")}
        >
          <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
            <span className="font-bold text-xl text-white">B</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-800">
            Bunyeni<span className="text-emerald-600">FC</span>
          </span>
        </div>
        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-gray-600 hover:text-emerald-600 transition-colors font-medium"
            >
              {item}
            </button>
          ))}
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
          Join Us
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
