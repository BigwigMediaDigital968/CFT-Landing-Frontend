"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_URL;

// ── Types ────────────────────────────────────────────────────────────────────
type ModalState = {
  open: boolean;
  type: "confirm" | "success";
  title?: string;
  text: string;
  confirmLabel?: string;
  confirmStyle?: "danger" | "warning" | "primary";
  onConfirm?: () => void;
};

const DEFAULT_MODAL: ModalState = {
  open: false,
  type: "confirm",
  text: "",
};

// ── Confirm Modal ─────────────────────────────────────────────────────────────
function ConfirmModal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!state.open || state.type !== "confirm") return null;

  const btnColors = {
    danger: "background: linear-gradient(90deg,#ef4444,#f97316)",
    warning: "background: linear-gradient(90deg,#f59e0b,#fbbf24)",
    primary: "background: linear-gradient(90deg,#ff7a18,#ffb347)",
  };
  const style = state.confirmStyle ?? "danger";
  const iconMap = { danger: "🗑️", warning: "⚠️", primary: "✅" };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#111116", border: "1px solid #2a2a35" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent line */}
        <div
          className="h-1 w-full"
          style={{
            background:
              style === "danger"
                ? "linear-gradient(90deg,#ef4444,#f97316)"
                : style === "warning"
                  ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                  : "linear-gradient(90deg,#ff7a18,#ffb347)",
          }}
        />

        <div className="p-6 flex flex-col items-center text-center gap-4">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              background:
                style === "danger"
                  ? "rgba(239,68,68,0.12)"
                  : style === "warning"
                    ? "rgba(245,158,11,0.12)"
                    : "rgba(255,122,24,0.12)",
              border: `1px solid ${
                style === "danger"
                  ? "#ef4444"
                  : style === "warning"
                    ? "#f59e0b"
                    : "#ff7a18"
              }`,
            }}
          >
            {iconMap[style]}
          </div>

          <div>
            {state.title && (
              <h3 className="text-lg font-bold text-white mb-1">
                {state.title}
              </h3>
            )}
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {state.text}
            </p>
          </div>

          <div className="w-full h-px" style={{ background: "#2a2a35" }} />

          <div className="flex gap-3 w-full">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white border border-[#2a2a35] hover:border-[#a1a1aa] transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                state.onConfirm?.();
                onClose();
              }}
              className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: btnColors[style].replace("background: ", ""),
              }}
            >
              {state.confirmLabel ?? "Confirm"}
            </button>
          </div>
        </div>

        {/* Close X */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center text-[#a1a1aa] hover:text-white text-xs transition-colors"
          style={{ background: "#1a1a22" }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ── Success Modal ─────────────────────────────────────────────────────────────
function SuccessModal({
  state,
  onClose,
}: {
  state: ModalState;
  onClose: () => void;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Auto-close after 2.5 s
  useEffect(() => {
    if (!state.open) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [state.open, onClose]);

  if (!state.open || state.type !== "success") return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        style={{ background: "#111116", border: "1px solid #2a2a35" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-1 w-full"
          style={{ background: "linear-gradient(90deg,#22c55e,#4ade80)" }}
        />

        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
            style={{
              background: "rgba(34,197,94,0.12)",
              border: "1px solid #22c55e",
            }}
          >
            ✅
          </div>

          <div>
            {state.title && (
              <h3 className="text-lg font-bold text-white mb-1">
                {state.title}
              </h3>
            )}
            <p className="text-[#a1a1aa] text-sm leading-relaxed">
              {state.text}
            </p>
          </div>

          <div className="w-full h-px" style={{ background: "#2a2a35" }} />

          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-full text-sm font-bold text-white transition-all hover:scale-[1.02]"
            style={{ background: "linear-gradient(90deg,#22c55e,#4ade80)" }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main LeadTable ────────────────────────────────────────────────────────────
export default function LeadTable() {
  const [leads, setLeads] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [modal, setModal] = useState<ModalState>(DEFAULT_MODAL);

  const closeModal = () => setModal(DEFAULT_MODAL);

  const showConfirm = (opts: Omit<ModalState, "open" | "type">) =>
    setModal({ open: true, type: "confirm", ...opts });

  const showSuccess = (title: string, text: string) =>
    setModal({ open: true, type: "success", title, text });

  // Fetch leads
  const fetchLeads = async () => {
    try {
      const res = await axios.get(`${API}/api/leads`);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Search filter
  const filtered = leads.filter((lead) =>
    `${lead.fullName} ${lead.email} ${lead.phone}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  // Update status
  const handleStatusChange = (id: string, status: string) => {
    showConfirm({
      title: "Update Lead Status",
      text: `Change status to "${status}"? This will update the lead's follow-up stage.`,
      confirmLabel: "Update",
      confirmStyle: "warning",
      onConfirm: async () => {
        try {
          await axios.patch(`${API}/api/leads/status/${id}`, { status });
          await fetchLeads();
          showSuccess(
            "Status Updated",
            `Lead status has been changed to "${status}".`,
          );
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Update account status
  const handleAccountStatusChange = (id: string, accountStatus: string) => {
    showConfirm({
      title: "Update Account Status",
      text: `Set account status to "${accountStatus}"?`,
      confirmLabel: "Update",
      confirmStyle: "primary",
      onConfirm: async () => {
        try {
          await axios.patch(`${API}/api/leads/account-status/${id}`, {
            accountStatus,
          });
          await fetchLeads();
          showSuccess(
            "Account Updated",
            `Account status set to "${accountStatus}".`,
          );
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Delete single
  const handleDelete = (id: string, name: string) => {
    showConfirm({
      title: "Delete Lead",
      text: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      confirmLabel: "Delete",
      confirmStyle: "danger",
      onConfirm: async () => {
        try {
          await axios.delete(`${API}/api/leads/${id}`);
          await fetchLeads();
          showSuccess(
            "Lead Deleted",
            `"${name}" has been permanently removed.`,
          );
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Toggle select
  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  // Toggle all
  const toggleAll = () =>
    setSelected(
      selected.length === filtered.length ? [] : filtered.map((l) => l._id),
    );

  // Bulk delete
  const handleBulkDelete = () => {
    showConfirm({
      title: "Bulk Delete",
      text: `You're about to delete ${selected.length} lead${selected.length > 1 ? "s" : ""}. This cannot be undone.`,
      confirmLabel: `Delete ${selected.length}`,
      confirmStyle: "danger",
      onConfirm: async () => {
        try {
          await axios.post(`${API}/api/leads/bulk-delete`, { ids: selected });
          const count = selected.length;
          setSelected([]);
          await fetchLeads();
          showSuccess(
            "Bulk Delete Done",
            `${count} lead${count > 1 ? "s" : ""} have been removed successfully.`,
          );
        } catch (err) {
          console.error(err);
        }
      },
    });
  };

  // Status badge colour
  const statusColor: Record<string, string> = {
    pending: "rgba(245,158,11,0.15)",
    contacted: "rgba(59,130,246,0.15)",
    closed: "rgba(34,197,94,0.15)",
  };
  const statusText: Record<string, string> = {
    pending: "#f59e0b",
    contacted: "#3b82f6",
    closed: "#22c55e",
  };

  return (
    <>
      <ConfirmModal state={modal} onClose={closeModal} />
      <SuccessModal state={modal} onClose={closeModal} />

      <div className="bg-[var(--cft-bg-card)] p-4 rounded-xl border border-[var(--cft-border)]">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center justify-between">
          <input
            placeholder="Search by name / email / phone"
            className="w-full sm:w-72 px-3 py-2 rounded-lg text-sm bg-[var(--cft-bg-light)] border border-[var(--cft-border)] outline-none focus:border-[#ff7a18] transition-colors placeholder-[#4a4a5a] cursor-pointer"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {selected.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{ background: "linear-gradient(90deg,#ef4444,#f97316)" }}
            >
              🗑️ Delete Selected ({selected.length})
            </button>
          )}
        </div>

        {/* Table wrapper */}
        <div className="overflow-x-auto rounded-lg border border-[var(--cft-border)]">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,122,24,0.05)" }}>
                <th className="px-3 py-3">
                  <input
                    type="checkbox"
                    checked={
                      filtered.length > 0 && selected.length === filtered.length
                    }
                    onChange={toggleAll}
                    className="accent-[#ff7a18]"
                  />
                </th>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Status",
                  "Account Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left text-xs font-semibold tracking-wider uppercase"
                    style={{ color: "#a1a1aa" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-10 text-[#a1a1aa] text-sm"
                  >
                    No leads found.
                  </td>
                </tr>
              ) : (
                filtered.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-t border-[var(--cft-border)] transition-colors hover:bg-[rgba(255,122,24,0.03)]"
                    style={
                      selected.includes(lead._id)
                        ? { background: "rgba(255,122,24,0.06)" }
                        : {}
                    }
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selected.includes(lead._id)}
                        onChange={() => toggleSelect(lead._id)}
                        className="accent-[#ff7a18]"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-3 py-3 font-medium text-white whitespace-nowrap">
                      {lead.fullName}
                    </td>

                    {/* Email */}
                    <td className="px-3 py-3 text-[#a1a1aa]">{lead.email}</td>

                    {/* Phone */}
                    <td className="px-3 py-3 text-[#a1a1aa] whitespace-nowrap">
                      {lead.countryCode ? `${lead.countryCode} ` : ""}
                      {lead.phone}
                    </td>

                    {/* Status */}
                    <td className="px-3 py-3">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        className="px-2 py-1 rounded-full text-xs font-semibold border-0 outline-none cursor-pointer"
                        style={{
                          background:
                            statusColor[lead.status] ?? "rgba(161,161,170,0.1)",
                          color: statusText[lead.status] ?? "#a1a1aa",
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    {/* Account Status */}
                    <td className="px-3 py-3">
                      <select
                        value={lead.accountStatus}
                        onChange={(e) =>
                          handleAccountStatusChange(lead._id, e.target.value)
                        }
                        className="px-2 py-1 rounded-lg text-xs bg-[var(--cft-bg-light)] border border-[var(--cft-border)] outline-none cursor-pointer text-white"
                      >
                        <option>In Process</option>
                        <option>Demo Shared</option>
                        <option>ID Created</option>
                        <option>Not Interested</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-3">
                      <button
                        onClick={() => handleDelete(lead._id, lead.fullName)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.05] active:scale-[0.97] cursor-pointer"
                        style={{
                          background: "rgba(239,68,68,0.1)",
                          color: "#ef4444",
                          border: "1px solid rgba(239,68,68,0.2)",
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        {filtered.length > 0 && (
          <p className="text-xs text-[#a1a1aa] mt-3 text-right">
            Showing {filtered.length} of {leads.length} leads
            {selected.length > 0 && ` · ${selected.length} selected`}
          </p>
        )}
      </div>
    </>
  );
}
