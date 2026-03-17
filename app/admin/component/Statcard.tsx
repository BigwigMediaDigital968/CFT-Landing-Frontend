type StatCardProps = {
  title: string;
  value: string;
  icon?: string;
  color?: string;
  loading?: boolean;
};

export default function StatCard({
  title,
  value,
  icon,
  color = "#ff7a18",
  loading = false,
}: StatCardProps) {
  return (
    <div
      className="relative rounded-xl p-5 border overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      style={{
        background: "#111116",
        borderColor: "#2a2a35",
        boxShadow: loading ? "none" : `0 0 0 0 ${color}`,
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
      />

      {/* Glow blob */}
      <div
        className="absolute -top-6 -right-6 w-20 h-20 rounded-full opacity-10 blur-2xl pointer-events-none"
        style={{ background: color }}
      />

      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-2">
            {title}
          </p>

          {loading ? (
            <div
              className="h-8 w-16 rounded-md animate-pulse"
              style={{ background: "#1a1a22" }}
            />
          ) : (
            <p className="text-3xl font-extrabold text-white">{value}</p>
          )}
        </div>

        {icon && (
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
            style={{
              background: `${color}18`,
              border: `1px solid ${color}33`,
            }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Bottom color strip */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-full opacity-20"
        style={{ background: color }}
      />
    </div>
  );
}
