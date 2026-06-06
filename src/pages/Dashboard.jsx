import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { Plus, ListFilter, KanbanSquare } from "lucide-react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([
    {
      id: "task-1",
      title: "Design Premium SaaS Landing Page Component Layers",
      priority: "High",
      status: "In Progress",
      dueDate: "June 06, 2026",
    },
    {
      id: "task-2",
      title: "Fix sticky floating navigation context layout bug",
      priority: "Medium",
      status: "Done",
      dueDate: "June 05, 2026",
    },
    {
      id: "task-3",
      title: "Write end-to-end API system telemetry documentation",
      priority: "Low",
      status: "In Progress",
      dueDate: "June 08, 2026",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");

  // Add Task
  const addTask = (newFormValues) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...newFormValues,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // Toggle Task
  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Done" ? "In Progress" : "Done",
            }
          : task
      )
    );
  };

  // Filter Engine
  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return task.status !== "Done";
    if (filter === "Done") return task.status === "Done";
    if (filter === "High") return task.priority === "High";
    return true;
  });

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white font-sans antialiased">

      {/* Sidebar */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        <Topbar />

        {/* FIXED BACKGROUND BLOBS */}
        <div className="fixed top-0 right-1/4 h-125 w-125 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 left-10 h-100 w-100 rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

        {/* MAIN SCROLL AREA */}
        <main className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl w-full mx-auto space-y-10">

          {/* HEADER */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Workspace Board
              </h1>
              <p className="text-sm text-white/40 mt-1">
                Monitor tasks, prioritize execution, and manage workflow.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary rounded-xl hover:opacity-90 transition"
            >
              <Plus size={16} />
              Create Task
            </button>

          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            <StatsCard
              title="Total Tasks"
              value={tasks.length}
              color="text-primary"
            />
            <StatsCard
              title="Pending"
              value={tasks.filter((t) => t.status !== "Done").length}
              color="text-amber-400"
            />
            <StatsCard
              title="Completed"
              value={tasks.filter((t) => t.status === "Done").length}
              color="text-emerald-400"
            />
            <StatsCard
              title="High Priority"
              value={tasks.filter((t) => t.status === "High").length}
              color="text-rose-400"
            />
          </div>

          {/* FILTERS */}
          <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl w-fit">

            {["All", "Pending", "Done", "High"].map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-3 py-1 rounded-lg text-xs transition ${
                  filter === type
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* TASKS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={() => deleteTask(task.id)}
                onToggle={() => toggleTask(task.id)}
              />
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredTasks.length === 0 && (
            <div className="text-center text-white/40 py-10">
              No tasks found for "{filter}"
            </div>
          )}

        </main>
      </div>

      {/* MODAL */}
      <CreateTaskModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onCreate={addTask}
      />
    </div>
  );
}