"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToLeadForm = () => {
    setMenuOpen(false);
    const el = document.getElementById("leadform");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0b0b0f]/95 backdrop-blur-md border-b border-[#2a2a35] shadow-lg shadow-black/40"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="w-36 h-18 relative">
            <Image
              src="/logo-cft.png"
              alt="Close Friends Traders"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollToLeadForm}
              className="relative overflow-hidden px-5 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95"
              style={{ background: "linear-gradient(90deg, #ff7a18, #ffb347)" }}
            >
              <span className="relative z-10">Start Now →</span>
              <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Mobile hamburger */}
            {/* <button
              className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </button> */}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          menuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "#0b0b0f",
          borderTop: menuOpen ? "1px solid #2a2a35" : "none",
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          {["Home", "About", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-[#a1a1aa] hover:text-white transition-colors text-sm font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button
            onClick={scrollToLeadForm}
            className="mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white cursor-pointer"
            style={{ background: "linear-gradient(90deg, #ff7a18, #ffb347)" }}
          >
            Start Now →
          </button>
        </div>
      </div> */}
    </nav>
  );
}
