import { CheckCircle2, Clock, Calendar, Trash2 } from "lucide-react";

export default function TaskCard({ task, onToggle, onDelete }) {
  const priorityThemes = {
    High: {
      text: "text-rose-400 border-rose-500/20 bg-rose-500/10",
      indicator: "bg-rose-500",
    },
    Medium: {
      text: "text-amber-400 border-amber-500/20 bg-amber-500/10",
      indicator: "bg-amber-500",
    },
    Low: {
      text: "text-emerald-400 border-emerald-500/20 bg-emerald-500/10",
      indicator: "bg-emerald-500",
    },
  };

  const theme = priorityThemes[task.priority] || priorityThemes.Low;
  const isDone = task.status === "Done";

  return (
    <div
      className="
        group relative w-full overflow-hidden
        rounded-2xl border border-white/5
        bg-linear-to-b from-white/5 to-transparent
        p-5 backdrop-blur-md
        transition-all duration-300 ease-out
        hover:-translate-y-1
        hover:border-white/10
        hover:bg-white/[0.07]
        hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)]
      "
    >
      {/* Left Accent Bar */}
      <div
        className={`
          absolute left-0 top-0 h-full w-1
          transition-all duration-300
          opacity-50 group-hover:opacity-100
          ${theme.indicator}
        `}
      />

      {/* Header: Title + Actions */}
      <div className="flex items-start justify-between gap-3 pl-2">

        {/* Title */}
        <h3
          className={`
            font-medium text-base leading-snug
            transition-colors duration-300
            ${
              isDone
                ? "text-white/40 line-through"
                : "text-white/90 group-hover:text-white"
            }
          `}
        >
          {task.title}
        </h3>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* Toggle */}
          <button
            onClick={onToggle}
            className="text-white/40 cursor-pointer hover:text-white transition"
          >
            <CheckCircle2 size={16} />
          </button>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="text-white/40 cursor-pointer hover:text-red-400 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mt-4 text-xs">

        <span
          className={`
            flex items-center gap-1.5
            ${isDone ? "text-emerald-400" : "text-white/40"}
          `}
        >
          {isDone ? (
            <CheckCircle2 size={14} />
          ) : (
            <Clock size={14} />
          )}
          {task.status}
        </span>

        {/* Due Date */}
        <span className="flex items-center gap-1.5 text-white/40">
          <Calendar size={13} />
          <span className="font-mono">{task.dueDate}</span>
        </span>
      </div>

      {/* Priority */}
      <div className="mt-3">
        <span
          className={`
            inline-flex items-center rounded-md px-2 py-0.5
            text-[11px] font-semibold uppercase tracking-wide
            border ${theme.text}
          `}
        >
          {task.priority}
        </span>
      </div>
    </div>
  );
}