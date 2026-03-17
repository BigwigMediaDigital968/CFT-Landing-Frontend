"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const slides = [
  { src: "/S1.jpg" },
  { src: "/S2.jpg" },
  { src: "/S3.jpg" },
  { src: "/S4.png" },
];

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (isAnimating) return;
      setDirection(dir);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setIsAnimating(false);
      }, 350);
    },
    [isAnimating],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "right");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "left");
  }, [current, goTo]);

  // Autoslide every 3 seconds
  useEffect(() => {
    timerRef.current = setTimeout(next, 3000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  const resetTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Desktop: show 2 consecutive slides
  const desktopSlides = [
    slides[current],
    slides[(current + 1) % slides.length],
  ];

  // Animation classes per card index
  const animClass = (idx: number) => {
    if (!isAnimating) return "opacity-100 translate-x-0";
    if (direction === "right")
      return idx === 0 ? "opacity-0 -translate-x-4" : "opacity-0 translate-x-4";
    return idx === 0 ? "opacity-0 translate-x-4" : "opacity-0 -translate-x-4";
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
      style={{ background: "#0b0b0f" }}
    >
      {/* BG accent */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[300px] rounded-full blur-3xl pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, #ff7a18, transparent 70%)",
          opacity: 0.08,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
            style={{
              borderColor: "#ff7a18",
              color: "#ff7a18",
              background: "rgba(255,122,24,0.08)",
            }}
          >
            Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            See{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Us In Action
            </span>
          </h2>
        </div>

        {/* Slider Container */}
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* ── Desktop: 2 cards ── */}
          <div className="hidden md:grid grid-cols-2 gap-6 mb-6">
            {desktopSlides.map((slide, idx) => (
              <div
                key={`${current}-${idx}`}
                className={`relative rounded-2xl overflow-hidden aspect-video border ${animClass(idx)}`}
                style={{
                  borderColor: "#2a2a35",
                  background: "#111116",
                  transition: "opacity 350ms ease, transform 350ms ease",
                }}
              >
                <Image
                  src={slide.src}
                  alt={`Slide ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />
                {/* Subtle bottom gradient for polish */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* ── Mobile: 1 card ── */}
          <div className="md:hidden mb-6">
            <div
              className={`relative rounded-2xl overflow-hidden border ${
                isAnimating ? "opacity-0 scale-[0.98]" : "opacity-100 scale-100"
              }`}
              style={{
                borderColor: "#2a2a35",
                background: "#111116",
                aspectRatio: "16/9",
                transition: "opacity 350ms ease, transform 350ms ease",
              }}
            >
              <Image
                src={slides[current].src}
                alt={`Slide ${current + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center justify-center gap-6">
            {/* Prev */}
            <button
              onClick={() => {
                resetTimer();
                prev();
              }}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-[#2a2a35] bg-[#111116] hover:border-[#ff7a18] hover:bg-[#1a1a22] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all duration-200 cursor-pointer active:scale-90"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => {
                    resetTimer();
                    goTo(i, i > current ? "right" : "left");
                  }}
                  className="rounded-full transition-all duration-300 cursor-pointer"
                  style={
                    i === current
                      ? {
                          width: "24px",
                          height: "10px",
                          background:
                            "linear-gradient(90deg, #ff7a18, #ffb347)",
                        }
                      : { width: "10px", height: "10px", background: "#2a2a35" }
                  }
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => {
                resetTimer();
                next();
              }}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-[#2a2a35] bg-[#111116] hover:border-[#ff7a18] hover:bg-[#1a1a22] flex items-center justify-center text-[#a1a1aa] hover:text-white transition-all duration-200 cursor-pointer active:scale-90"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
