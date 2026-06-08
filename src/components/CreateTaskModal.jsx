import { useEffect, useState } from "react";
import { X, Plus, Calendar, AlertCircle } from "lucide-react";

export default function CreateTaskModal({
  isOpen,
  onClose,
  onCreate,
  editingTask,
}) {
  const initialFormState = {
    title: "",
    description: "",
    priority: "Medium",
    status: "In Progress",
    dueDate: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");

  // Reset form states cleanly whenever the modal opens or closes
  useEffect(() => {
    if (!isOpen) {
      setForm(initialFormState);
      setError("");
    }
  }, [isOpen]);

  useEffect(() => {
    if(editingTask) {
      setForm({
        title : editingTask.title || "",
        description : editingTask.description || "",
        priority : editingTask.priority || "Medium",
        status : editingTask.status || "In Progress",
        dueDate : editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
      });
    } else {
      setForm(initialFormState);
    }
  }, [editingTask, isOpen])

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.title.trim() ||
      !form.description.trim() ||
      !form.priority ||
      !form.dueDate
    ) {
      setError("Fill all fields!");
      return;
    }

    setError("");
    onCreate(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Backdrop Overlay blur */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* 2. Modal Glass Box Panel */}
      <div
        className="
          relative w-full max-w-md transform overflow-hidden 
          rounded-4xl border border-white/10 
          bg-linear-to-b from-card to-card/90 
          p-7 text-white shadow-2xl backdrop-blur-xl 
          transition-all ease-out
          animate-in fade-in zoom-in-95 duration-200
        "
      >
        {/* Header Section */}
        <div className="flex items-center justify-between border-b border-white/6 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-bold tracking-tight bg-linear-to-r from-white to-white/70 bg-clip-text text-transparent">
              {editingTask ? "Edit Task" : "Create New Task"}
            </h2>
            <p className="text-xs text-white/40 mt-0.5">
              {editingTask ? "Update task details..." : "Add a new task"}
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-white/5 bg-white/2 p-2 text-white/40 transition hover:bg-white/10 hover:text-white cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form Controls */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Input: Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-white/40">
              Task Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Optimize database indexing on transactional tables"
              value={form.title}
              className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition focus:border-primary/40 focus:bg-white/5"
              onChange={(e) => {
                setForm({ ...form, title: e.target.value })
                setError("");
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold tracking-wide uppercase text-white/40">
              Description
            </label>

            <textarea
              rows={4}
              required
              value={form.description}
              placeholder="Describe the task..."
              className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-white placeholder-white/20 outline-none resize-none"
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* Grid Layout for Meta Selectors */}
          <div className="grid grid-cols-2 gap-4">
            {/* Selector: Priority */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-white/40 flex items-center gap-1">
                <AlertCircle size={12} /> Priority
              </label>
              <div className="relative">
                <select
                  value={form.priority}
                  className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-white outline-none transition appearance-none cursor-pointer focus:border-primary/40 focus:bg-white/5"
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                >
                  <option value="Low" className="bg-card text-white">
                    Low
                  </option>
                  <option value="Medium" className="bg-card text-white">
                    Medium
                  </option>
                  <option value="High" className="bg-card text-white">
                    High
                  </option>
                </select>
                {/* Custom indicator chevron drop arrow */}
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Input: Due Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold tracking-wide uppercase text-white/40 flex items-center gap-1">
                <Calendar size={12} /> Due Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={form.dueDate}
                  /* scheme-dark keeps calendar popup panels dark mode natively */
                  className="w-full rounded-xl border border-white/5 bg-white/3 px-4 py-3 text-sm text-white outline-none transition cursor-pointer scheme-dark focus:border-primary/40 focus:bg-white/5"
                  onChange={(e) =>
                    setForm({ ...form, dueDate: e.target.value })
                  }
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500 my-1.5">{error}</p>}
          </div>

          {/* Bottom Call to Action Button Layout */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 rounded-xl border border-white/5 bg-white/2 py-3 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="
                flex-1 inline-flex items-center justify-center gap-2 
                rounded-xl bg-primary py-3 text-sm font-medium text-white 
                transition shadow-lg shadow-primary/10
                hover:bg-accent hover:scale-[1.01] active:scale-[0.99]
                disabled:opacity-40 disabled:pointer-events-none cursor-pointer
              "
              disabled={!form.title.trim()}
            >
              <Plus size={16} className="stroke-[2.5]" />
              {editingTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
