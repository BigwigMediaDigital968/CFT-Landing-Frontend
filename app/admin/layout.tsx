import Sidebar from "./component/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[var(--cft-bg-dark)]">
      <Sidebar />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
