"use client";

import Image from "next/image";

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.link/rahultradedost"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      {/* Glow Effect */}
      <div
        className="absolute inset-0 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-300"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
        }}
      />

      {/* Button */}
      <div
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #25D366, #128C7E)",
        }}
      >
        <Image
          src="/whatsapp.png"
          alt="WhatsApp"
          width={28}
          height={28}
          className="object-contain"
        />
      </div>
    </a>
  );
}
