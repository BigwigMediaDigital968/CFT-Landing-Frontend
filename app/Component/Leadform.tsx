"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";

type FormState = "idle" | "loading" | "success" | "error";

const API = process.env.NEXT_PUBLIC_API_URL;

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
];

// ── Modal Component ──────────────────────────────────────────────────────────
function Modal({
  type,
  onClose,
  onAnother,
}: {
  type: "success" | "error";
  onClose: () => void;
  onAnother?: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#111116", border: "1px solid #2a2a35" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div
          className="h-1 w-full"
          style={{
            background: isSuccess
              ? "linear-gradient(90deg, #ff7a18, #ffb347)"
              : "linear-gradient(90deg, #ef4444, #f97316)",
          }}
        />

        <div className="p-8 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
            style={{
              background: isSuccess
                ? "rgba(255,122,24,0.12)"
                : "rgba(239,68,68,0.12)",
              border: `1px solid ${isSuccess ? "#ff7a18" : "#ef4444"}`,
            }}
          >
            {isSuccess ? "✅" : "❌"}
          </div>

          <div>
            <h3 className="text-2xl font-extrabold text-white mb-2">
              {isSuccess ? "You're In!" : "Oops! Something Went Wrong"}
            </h3>
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {isSuccess
                ? "Our expert team will contact you within 24 hours. Get ready to start trading smarter! 🚀"
                : "We couldn't submit your request. Please check your connection and try again. If the issue persists, contact us directly."}
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px" style={{ background: "#2a2a35" }} />

          <div className="flex flex-col sm:flex-row gap-3 w-full">
            {isSuccess && onAnother && (
              <button
                onClick={onAnother}
                className="flex-1 py-3 rounded-full text-sm font-semibold text-white border border-[#2a2a35] hover:border-[#ff7a18] transition-colors cursor-pointer"
              >
                Submit Another
              </button>
            )}
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer"
              style={{
                background: isSuccess
                  ? "linear-gradient(90deg, #ff7a18, #ffb347)"
                  : "linear-gradient(90deg, #ef4444, #f97316)",
              }}
            >
              {isSuccess ? "Awesome, Got it!" : "Try Again"}
            </button>
          </div>

          {isSuccess && (
            <p className="text-[#a1a1aa] text-xs">
              🔒 Your data is safe and never shared with third parties.
            </p>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#a1a1aa] hover:text-white transition-colors"
          style={{ background: "#1a1a22" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function LeadForm() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    city: "",
    profession: "",
    message: "",
  });

  const [status, setStatus] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [showModal, setShowModal] = useState<"success" | "error" | null>(null);
  const [ccOpen, setCcOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const ccRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Close country-code dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ccRef.current && !ccRef.current.contains(e.target as Node)) {
        setCcOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const validate = () => {
    const errs: Partial<typeof form> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Valid email required";
    if (!form.phone.match(/^\d{6,15}$/))
      errs.phone = "Enter a valid mobile number";
    if (!form.city.trim()) errs.city = "City is required";
    return errs;
  };

  //   const sendWhatsAppAlert = (data: typeof form) => {
  //     const adminNumber = "916386256070"; // 👉 Replace with your WhatsApp number

  //     const text = `🚀 *New Lead Received!*

  // 👤 *Name:* ${data.fullName}
  // 📱 *Phone:* ${data.countryCode}${data.phone}
  // ✉️ *Email:* ${data.email}
  // 📍 *City:* ${data.city}
  // 💼 *Profession:* ${data.profession || "N/A"}
  // 💬 *Message:* ${data.message || "N/A"}

  // ⏰ Submitted at: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`;

  //     const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
  //     window.open(url, "_blank");
  //   };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      await axios.post(`${API}/api/leads`, form);

      // ✅ Send WhatsApp alert with submitted data
      // sendWhatsAppAlert(form);

      setStatus("success");
      setShowModal("success");

      setForm({
        fullName: "",
        email: "",
        phone: "",
        countryCode: "+91",
        city: "",
        profession: "",
        message: "",
      });
    } catch (error: any) {
      if (error.response?.data?.message === "Phone already exists") {
        setErrors({ phone: "This number is already registered" });
        setStatus("idle");
      } else {
        setStatus("error");
        setShowModal("error");
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name as keyof typeof form]) {
      setErrors((err) => ({ ...err, [e.target.name]: undefined }));
    }
    if (status === "error") setStatus("idle");
  };

  const handleCloseModal = () => {
    setShowModal(null);
    if (status !== "error") setStatus("idle");
  };

  const handleAnother = () => {
    setShowModal(null);
    setStatus("idle");
  };

  const selectedCC =
    COUNTRY_CODES.find((c) => c.code === form.countryCode) ?? COUNTRY_CODES[0];

  const fields = [
    {
      name: "fullName",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      icon: "👤",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "you@example.com",
      icon: "✉️",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Your city",
      icon: "📍",
    },
    {
      name: "profession",
      label: "Profession (optional)",
      type: "text",
      placeholder: "Your profession",
      icon: "💼",
    },
  ];

  return (
    <>
      {/* ── Modals ── */}
      {showModal === "success" && (
        <Modal
          type="success"
          onClose={handleCloseModal}
          onAnother={handleAnother}
        />
      )}
      {showModal === "error" && (
        <Modal type="error" onClose={handleCloseModal} />
      )}

      <section
        ref={sectionRef}
        className="relative pt-10 overflow-hidden"
        style={{ background: "#0b0b0f" }}
      >
        {/* Background glows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, #ff7a18, transparent 70%)",
          }}
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div
            className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-semibold tracking-widest uppercase mb-4"
              style={{
                borderColor: "#ff7a18",
                color: "#ff7a18",
                background: "rgba(255,122,24,0.08)",
              }}
            >
              Connect With Us
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Start Your{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Trading Journey
              </span>
            </h2>
            <p className="text-[#a1a1aa] text-base max-w-lg mx-auto">
              Fill in your details and our expert team will reach out to help
              you get started.
            </p>
          </div>

          {/* Card */}
          <div
            className={`relative rounded-2xl border overflow-hidden transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ background: "#111116", borderColor: "#2a2a35" }}
          >
            {/* Top accent line */}
            <div
              className="h-0.5 w-full"
              style={{
                background: "linear-gradient(90deg, #ff7a18, #ffb347, #ff7a18)",
              }}
            />

            <div className="grid md:grid-cols-2 gap-0">
              {/* Left panel */}
              <div
                className="p-8 md:p-10 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, #111116 60%, #1a1a22)",
                }}
              >
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Why Join Us?
                  </h3>
                  <p className="text-[#a1a1aa] text-sm mb-8 leading-relaxed">
                    Join hundreds of smart traders who trust Close Friends
                    Traders for expert guidance and consistent results.
                  </p>

                  {[
                    {
                      icon: "📈",
                      title: "Expert Analysis",
                      desc: "Daily market insights & signals",
                    },
                    {
                      icon: "🔐",
                      title: "Secure & Transparent",
                      desc: "100% verified trading strategies",
                    },
                    {
                      icon: "💬",
                      title: "Dedicated Support",
                      desc: "Personal mentor assigned to you",
                    },
                    {
                      icon: "🏆",
                      title: "Proven Results",
                      desc: "95% client satisfaction rate",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 mb-5"
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                        style={{
                          background: "rgba(255,122,24,0.12)",
                          border: "1px solid rgba(255,122,24,0.2)",
                        }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">
                          {item.title}
                        </div>
                        <div className="text-[#a1a1aa] text-xs mt-0.5">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div className="mt-6 flex items-center gap-4">
                  <div className="flex -space-x-2">
                    {["🧑", "👩", "👨", "🧑"].map((emoji, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                        style={{
                          borderColor: "#0b0b0f",
                          background: "#1a1a22",
                        }}
                      >
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-[#a1a1aa] text-xs">
                    1000+ traders joined
                  </span>
                </div>
              </div>

              {/* Right panel — Form */}
              <div
                id="leadform"
                className="p-8 md:p-10"
                style={{ borderLeft: "1px solid #2a2a35" }}
              >
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {fields.map((field) => (
                      <div key={field.name}>
                        <label className="block text-xs font-semibold text-[#a1a1aa] mb-1.5 tracking-wide">
                          {field.label}{" "}
                          {!field.label.includes("optional") && (
                            <span className="text-[#ff7a18]">*</span>
                          )}
                        </label>
                        <input
                          type={field.type}
                          name={field.name}
                          value={form[field.name as keyof typeof form]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className={`w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 border ${
                            errors[field.name as keyof typeof form]
                              ? "border-red-500 bg-red-500/5"
                              : "border-[#2a2a35] bg-[#0b0b0f] focus:border-[#ff7a18] hover:border-[#3a3a45]"
                          }`}
                        />
                        {errors[field.name as keyof typeof form] && (
                          <p className="text-red-400 text-xs mt-1">
                            {errors[field.name as keyof typeof form]}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* ── Phone with Country Code ── */}
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-[#a1a1aa] mb-1.5 tracking-wide">
                      Mobile Number <span className="text-[#ff7a18]">*</span>
                    </label>
                    <div className="flex gap-2">
                      {/* Country code dropdown */}
                      <div className="relative" ref={ccRef}>
                        <button
                          type="button"
                          onClick={() => setCcOpen((v) => !v)}
                          className="h-full px-3 py-3 rounded-lg text-sm text-white flex items-center gap-1.5 border transition-all duration-200 whitespace-nowrap"
                          style={{
                            background: "#0b0b0f",
                            borderColor: errors.phone
                              ? "#ef4444"
                              : ccOpen
                                ? "#ff7a18"
                                : "#2a2a35",
                            minWidth: "90px",
                          }}
                        >
                          <span>{selectedCC.flag}</span>
                          <span className="text-[#a1a1aa]">
                            {selectedCC.code}
                          </span>
                          <svg
                            className={`w-3 h-3 text-[#a1a1aa] transition-transform ${ccOpen ? "rotate-180" : ""}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {ccOpen && (
                          <div
                            className="absolute z-20 mt-1 w-48 rounded-lg overflow-hidden shadow-2xl border"
                            style={{
                              background: "#111116",
                              borderColor: "#2a2a35",
                            }}
                          >
                            {COUNTRY_CODES.map((cc) => (
                              <button
                                key={cc.code}
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({
                                    ...f,
                                    countryCode: cc.code,
                                  }));
                                  setCcOpen(false);
                                }}
                                className="w-full px-4 py-2.5 text-left text-sm flex items-center gap-2 transition-colors hover:bg-[#1a1a22]"
                                style={{
                                  color:
                                    form.countryCode === cc.code
                                      ? "#ff7a18"
                                      : "#e4e4e7",
                                }}
                              >
                                <span>{cc.flag}</span>
                                <span className="flex-1">{cc.name}</span>
                                <span className="text-[#a1a1aa] text-xs">
                                  {cc.code}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Phone input */}
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                        className={`flex-1 px-4 py-3 rounded-lg text-sm text-white placeholder-[#4a4a5a] outline-none transition-all duration-200 border ${
                          errors.phone
                            ? "border-red-500 bg-red-500/5"
                            : "border-[#2a2a35] bg-[#0b0b0f] focus:border-[#ff7a18] hover:border-[#3a3a45]"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label className="block text-xs font-semibold text-[#a1a1aa] mb-1.5 tracking-wide">
                      Message{" "}
                      <span className="text-[#a1a1aa] font-normal">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us about your trading experience or goals..."
                      className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#4a4a5a] outline-none border border-[#2a2a35] bg-[#0b0b0f] focus:border-[#ff7a18] hover:border-[#3a3a45] transition-all duration-200 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full py-3.5 rounded-full text-white font-bold text-sm cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    style={{
                      background: "linear-gradient(90deg, #ff7a18, #ffb347)",
                    }}
                  >
                    {status === "loading" ? (
                      <>
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      <>
                        Get Started Now
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
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-[#a1a1aa] text-xs mt-3">
                    🔒 Your data is safe and never shared with third parties.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
