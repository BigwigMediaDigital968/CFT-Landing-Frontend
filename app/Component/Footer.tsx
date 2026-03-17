export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-14 pb-8 border-t"
      style={{ background: "#0b0b0f", borderColor: "#2a2a35" }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[1px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #ff7a18, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #ff7a18, #ffb347)",
                }}
              >
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
                <span className="text-white font-bold text-sm">
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
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              A future-focused team of innovators, analysts, and strategists
              helping you build your digital asset portfolio — easily, securely,
              and intelligently.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {["Home", "About Us", "Services", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[#a1a1aa] text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#ff7a18] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 tracking-wide">
              Get In Touch
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { icon: "🌐", text: "closefriendstraders.info" },
                { icon: "📧", text: "support@closefriendstraders.info" },
                { icon: "📱", text: "Connect via WhatsApp" },
              ].map((item) => (
                <li
                  key={item.text}
                  className="flex items-center gap-2 text-[#a1a1aa] text-sm"
                >
                  <span>{item.icon}</span>
                  {item.text}
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {[
                {
                  label: "Twitter",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.745l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
                {
                  label: "Telegram",
                  path: "M11.944 0A12 12 0 1 0 23.945 12 12 12 0 0 0 11.944 0zm3.828 8.53-1.602 7.528c-.12.565-.44.7-.893.435l-2.457-1.813-1.187 1.14c-.13.13-.24.24-.495.24l.177-2.513 4.576-4.13c.2-.177-.044-.277-.306-.1l-5.658 3.56-2.438-.76c-.53-.165-.54-.53.11-.785l9.527-3.671c.44-.16.83.105.646.869z",
                },
                {
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg border border-[#2a2a35] hover:border-[#ff7a18] bg-[#111116] hover:bg-[#1a1a22] flex items-center justify-center transition-all duration-200 group"
                >
                  <svg
                    className="w-3.5 h-3.5 text-[#a1a1aa] group-hover:text-[#ff7a18] transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-6" style={{ background: "#2a2a35" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#a1a1aa] text-xs text-center sm:text-left">
            © 2026 Close Friend Traders. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[#a1a1aa] text-xs">
            <span>Made with</span>
            <span className="text-[#ff7a18]">♥</span>
            <span>in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
