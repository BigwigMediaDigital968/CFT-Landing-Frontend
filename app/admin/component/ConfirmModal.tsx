export default function ConfirmModal({ open, onClose, onConfirm, text }: any) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[var(--cft-bg-card)] p-6 rounded-xl">
        <p className="mb-4">{text}</p>

        <div className="flex gap-3 justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 px-4 py-2 rounded cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
