"use client";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Icon mark */}
            <div className="relative w-9 h-9 flex items-center justify-center rounded-lg bg-gradient-to-br from-[#ff7a18] to-[#ffb347] shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50 transition-all duration-300">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 17L9 11L13 15L21 7"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 7H21V11"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-wide">
                Close Friends
              </span>
              <span
                className="text-xs font-semibold tracking-widest uppercase"
                style={{
                  background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Traders
              </span>
            </div>
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
            <button
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
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
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
      </div>
    </nav>
  );
}
