"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const path = usePathname();

  const menu = [
    { name: "Dashboard", href: "/admin" },
    { name: "Lead Management", href: "/admin/leads" },
  ];

  return (
    <aside className="w-64 bg-[var(--cft-bg-card)] border-r border-[var(--cft-border)] p-5 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gradient-orange mb-8 text-center">
          CFT Admin
        </h2>

        <nav className="space-y-3">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition-350 ${
                path === item.href
                  ? "bg-[var(--cft-primary)] text-black"
                  : "text-[var(--cft-text-secondary)] hover:bg-[var(--cft-bg-light)]"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <button
        onClick={() => {
          // ❌ Remove cookie
          document.cookie =
            "admin-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00";

          window.location.href = "/login";
        }}
        className="mt-10 px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 transition-350 cursor-pointer"
      >
        Logout
      </button>
    </aside>
  );
}
