"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (document.cookie.includes("admin-auth=true")) {
      router.replace("/admin");
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      if (form.email === "admin@gmail.com" && form.password === "123456") {
        document.cookie = "admin-auth=true; path=/";
        router.push("/admin");
      } else {
        alert("Invalid Credentials ❌");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--cft-bg-dark)] px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-[var(--cft-bg-card)] border border-[var(--cft-border)] rounded-2xl p-8 shadow-lg">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-gradient-orange">
          Admin Login
        </h1>
        <p className="text-center text-[var(--cft-text-secondary)] mb-6">
          Access your dashboard
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm text-[var(--cft-text-secondary)]">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full mt-1 p-3 rounded-lg bg-[var(--cft-bg-light)] border border-[var(--cft-border)] focus:outline-none focus:ring-2 focus:ring-[var(--cft-primary)]"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-[var(--cft-text-secondary)]">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="w-full mt-1 p-3 rounded-lg bg-[var(--cft-bg-light)] border border-[var(--cft-border)] focus:outline-none focus:ring-2 focus:ring-[var(--cft-primary)]"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold cursor-pointer text-black bg-[var(--cft-primary)] hover:bg-[var(--cft-primary-hover)] transition-350"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Hint (for testing) */}
        {/* <p className="text-xs text-center text-[var(--cft-text-secondary)] mt-4">
          Demo: admin@gmail.com / 123456
        </p> */}
      </div>
    </div>
  );
}
