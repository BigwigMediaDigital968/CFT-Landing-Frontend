import Image from "next/image";

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
            <div className="w-36 h-18 relative">
              <Image
                src="/logo-cft.png"
                alt="Close Friends Traders"
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <p className="text-[#a1a1aa] text-sm leading-relaxed max-w-xs">
              A future-focused team of innovators, analysts, and strategists
              helping you build your digital asset portfolio easily, securely,
              and intelligently.
            </p>
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
