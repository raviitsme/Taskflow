import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect } from "react";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          rounded-3xl
          border
          border-white/10
          bg-card
          p-6
          shadow-[0_20px_80px_rgba(0,0,0,0.5)]
          animate-[modalIn_.3s_ease]
        "
      >
        {/* Glow */}
        <div className="absolute inset-0 rounded-3xl bg-primary/5 pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between pb-4 border-b border-white/10">
          <h2 className="font-headings text-2xl text-white">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="
              rounded-xl
              hover:rotate-90
              p-2
              text-white/60
              transition-all
              duration-200
              cursor-pointer
              hover:bg-white/10
              hover:text-white
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="relative mt-6">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}