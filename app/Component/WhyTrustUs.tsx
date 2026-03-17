"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const features = [
  {
    img: "/register.png",
    title: "Register in Under 5 Sec",
    desc: "Beginner-friendly registration straight under 5 seconds.",
  },
  {
    img: "/support.png",
    title: "24×7 Customer Support",
    desc: "Markets don't sleep. Neither do we. Expert help, 24x7.",
  },
  {
    img: "/500x.png",
    title: "500x Margin",
    desc: "Entry-Level Capital. Pro-Level Power.",
  },
  {
    img: "/zero.png",
    title: "0% Commission",
    desc: "Keep everything you earn. No cuts, we promise.",
  },
  {
    img: "/withdrawl.png",
    title: "Quick Withdrawals",
    desc: "Seamless withdrawals. Because your time matters.",
  },
  {
    img: "/security.png",
    title: "No Hidden Charges",
    desc: "What you see is what you get. Every rupee accounted for.",
  },
  {
    img: "/Tax.png",
    title: "0% Tax on Profits",
    desc: "0% Tax on Profits. 100% Returns to You.",
  },
  {
    img: "/HappyTraders.png",
    title: "5M+ Happy Traders",
    desc: "Home to a global network of 5 million+ traders.",
  },
];

export default function WhyTrustUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToLeadForm = () => {
    const el = document.getElementById("leadform");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: "#0b0b0f" }}
    >
      {/* Background glow accents */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(255,122,24,0.06), transparent 70%)",
        }}
      />
      <div
        className="absolute top-0 left-0 w-[300px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.05), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Why 50,000+ Traders{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Trust Us
            </span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-14">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className={`group relative rounded-2xl border p-6 flex flex-col items-center text-center cursor-default
                transition-all duration-700 hover:border-[#ff7a18]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-orange-500/10
                ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{
                background: "linear-gradient(145deg, #111116, #0f0f14)",
                borderColor: "#2a2a35",
                transitionDelay: visible ? `${i * 60}ms` : "0ms",
              }}
            >
              {/* Top accent line on hover */}
              <div
                className="absolute top-0 left-4 right-4 h-px rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, #ff7a18, transparent)",
                }}
              />

              {/* Icon */}
              <div
                className="w-16 h-16 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "rgba(255,122,24,0.08)",
                  border: "1px solid rgba(255,122,24,0.15)",
                }}
              >
                <Image
                  src={feature.img}
                  alt={feature.title}
                  width={40}
                  height={40}
                  className="object-contain"
                  style={{
                    filter: "drop-shadow(0 0 6px rgba(255,122,24,0.4))",
                  }}
                />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-sm sm:text-base leading-snug mb-2">
                {feature.title}
              </h3>

              {/* Desc */}
              <p className="text-[#a1a1aa] text-xs sm:text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div
          className={`flex justify-center transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={scrollToLeadForm}
            className="group relative overflow-hidden px-10 py-4 rounded-full text-white font-bold text-base cursor-pointer
              transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/40 active:scale-95"
            style={{ background: "linear-gradient(90deg, #ff7a18, #ffb347)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Trading Now
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
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
