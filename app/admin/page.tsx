"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "./component/Statcard";

const API = process.env.NEXT_PUBLIC_API_URL;

type Stats = {
  total: number;
  verified: number;
  demoShared: number;
  rejected: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API}/api/leads/stats`);
        setStats(res.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Leads",
      value: stats?.total,
      icon: "👥",
      color: "#ff7a18",
    },
    {
      title: "Verified Leads",
      value: stats?.verified,
      icon: "✅",
      color: "#22c55e",
    },
    {
      title: "Demo Shared",
      value: stats?.demoShared,
      icon: "📊",
      color: "#3b82f6",
    },
    {
      title: "Rejected Leads",
      value: stats?.rejected,
      icon: "❌",
      color: "#ef4444",
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {/* Live indicator */}
        <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: "#22c55e" }}
          />
          Live Data
        </div>
      </div>

      {error && (
        <div
          className="mb-4 px-4 py-3 rounded-lg text-sm text-red-400 border border-red-500/20"
          style={{ background: "rgba(239,68,68,0.08)" }}
        >
          ⚠️ Failed to load stats. Please refresh the page.
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={loading ? "..." : error ? "—" : String(card.value ?? 0)}
            icon={card.icon}
            color={card.color}
            loading={loading}
          />
        ))}
      </div>
    </div>
  );
}
