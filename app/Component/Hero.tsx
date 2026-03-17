"use client";

import { useEffect, useRef } from "react";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = [
      headingRef.current,
      subRef.current,
      ctaRef.current,
      statsRef.current,
    ];
    elements.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      setTimeout(
        () => {
          if (!el) return;
          el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        200 + i * 180,
      );
    });
  }, []);

  const scrollToLeadForm = () => {
    const el = document.getElementById("leadform");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-5">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {/* Dark overlay base */}
        <div className="absolute inset-0 bg-[#0b0b0f]" />

        {/* Radial orange glow from bottom-left */}
        <div
          className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl"
          style={{
            background: "radial-gradient(circle, #ff7a18, transparent 70%)",
          }}
        />

        {/* Top-right blue glow */}
        <div
          className="absolute -top-20 right-0 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
          style={{
            background: "radial-gradient(circle, #3b82f6, transparent 70%)",
          }}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,122,24,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,122,24,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Diagonal orange strip */}
        <div
          className="absolute top-0 right-0 w-[45%] h-full opacity-5 clip-diagonal"
          style={{
            background:
              "linear-gradient(135deg, transparent 40%, #ff7a18 100%)",
            clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        {/* Floating orbs */}
        <div className="absolute top-1/3 right-[15%] w-3 h-3 rounded-full bg-[#ff7a18] animate-ping opacity-40" />
        <div
          className="absolute top-2/3 right-[30%] w-2 h-2 rounded-full bg-[#ffb347] opacity-50"
          style={{ animation: "float 4s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/4 left-[20%] w-2 h-2 rounded-full bg-[#3b82f6] opacity-40"
          style={{ animation: "float 6s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Candlestick chart decoration */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 items-end opacity-15">
        {[60, 90, 50, 120, 80, 140, 100, 160, 110, 180].map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-0.5"
            style={{ transform: `rotate(90deg)` }}
          >
            <div
              className="w-0.5 bg-[#ff7a18]"
              style={{ height: `${h * 0.3}px` }}
            />
            <div
              className="h-2 rounded-sm"
              style={{
                width: `${h}px`,
                background:
                  i % 3 === 0 ? "#ff7a18" : i % 2 === 0 ? "#22c55e" : "#ef4444",
              }}
            />
            <div
              className="w-0.5 bg-[#ff7a18]"
              style={{ height: `${h * 0.2}px` }}
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-8 animate-fade-in"
            style={{
              borderColor: "#ff7a18",
              color: "#ff7a18",
              background: "rgba(255,122,24,0.08)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a18] animate-pulse" />
            Trusted by 1000+ Traders
          </div>

          {/* Heading */}
          <h1
            ref={headingRef}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-white mb-6"
          >
            Empowering{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
              }}
            >
              The Future
            </span>
            <br />
            Of Smart Crypto{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontStyle: "italic",
              }}
            >
              Trading
            </span>
          </h1>

          {/* Description */}
          <p
            ref={subRef}
            className="text-[#a1a1aa] text-base sm:text-lg leading-relaxed mb-10 max-w-xl"
          >
            We are a future-focused team of innovators, analysts, and
            strategists helping you build your digital asset portfolio — easily,
            securely, and intelligently.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-14">
            <button
              onClick={scrollToLeadForm}
              className="group relative overflow-hidden px-8 py-4 rounded-full text-white font-bold text-base cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95"
              style={{ background: "linear-gradient(90deg, #ff7a18, #ffb347)" }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started Free
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            <button
              onClick={scrollToLeadForm}
              className="group px-8 py-4 rounded-full text-white font-semibold text-base border border-[#2a2a35] hover:border-[#ff7a18] bg-[#111116] hover:bg-[#1a1a22] cursor-pointer transition-all duration-300 flex items-center gap-2"
            >
              <svg
                className="w-4 h-4 text-[#ff7a18]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Learn More
            </button>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="flex flex-wrap gap-8">
            {[
              { value: "1000+", label: "Active Traders" },
              { value: "₹50Cr+", label: "Volume Traded" },
              { value: "95%", label: "Client Satisfaction" },
              { value: "4+", label: "Years Experience" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span
                  className="text-2xl font-black"
                  style={{
                    background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-[#a1a1aa] text-xs tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b0b0f] to-transparent z-10" />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
        }
      `}</style>
    </section>
  );
}
