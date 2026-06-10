import { useEffect, useState } from "react";

import Topbar from "../components/Topbar";
import StatsCard from "../components/StatsCard";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";
import { Plus, ListFilter, KanbanSquare } from "lucide-react";
import {
  createTask,
  getTasks,
  toggleTask as toggleTaskApi,
  updateTask as updateTaskApi,
  deleteTask as deleteTaskApi,
} from "../api/tasks";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // const [tasks, setTasks] = useState([
  //   {
  //     id: "task-1",
  //     title: "Design Premium SaaS Landing Page Component Layers",
  //     priority: "High",
  //     status: "In Progress",
  //     dueDate: "June 06, 2026",
  //   },
  //   {
  //     id: "task-2",
  //     title: "Fix sticky floating navigation context layout bug",
  //     priority: "Medium",
  //     status: "Done",
  //     dueDate: "June 05, 2026",
  //   },
  //   {
  //     id: "task-3",
  //     title: "Write end-to-end API system telemetry documentation",
  //     priority: "Low",
  //     status: "In Progress",
  //     dueDate: "June 08, 2026",
  //   },
  // ]);

  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const pendingTasks = tasks.filter((task) => task.status !== "Done");

  const completedTasks = tasks.filter((task) => task.status === "Done");

  // Get tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks();

      setTasks(res.data.tasks);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleSubmitTask = async (taskData) => {
    try {
      if (editingTask) {
        const res = await updateTaskApi(editingTask._id, taskData);

        setTasks((prev) =>
          prev.map((task) =>
            task._id === editingTask._id ? res.data.task : task,
          ),
        );
      } else {
        const res = await createTask(taskData);

        setTasks((prev) => [res.data.task, ...prev]);
      }

      setOpen(false);
      setEditingTask(null);
    } catch (e) {
      console.error(e);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Task
  const toggleTask = async (id) => {
    try {
      const res = await toggleTaskApi(id);

      setTasks((prev) =>
        prev.map((task) => (task._id === id ? res.data.task : task)),
      );
    } catch (e) {
      console.error(e);
    }
  };

  // Filter Engine
  const processedTasks = [...tasks].filter((task) => {
    if (filter === "All") return true;
    if (filter === "Pending") return task.status !== "Done";
    if (filter === "Done") return task.status === "Done";
    if (filter === "High") return task.priority === "High";
    return true;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white antialiased">
      {/* Sidebar */}

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
              className="flex items-center cursor-pointer gap-2 px-4 py-2.5 bg-primary rounded-xl hover:bg-accent/5 transitionall duration-200"
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
              value={tasks.filter((t) => t.priority === "High").length}
              color="text-rose-400"
            />
          </div>

          {/* FILTERS */}
          <div className="flex justify-between">
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl w-fit">
              {["All", "Pending", "Done", "High"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1 rounded-lg cursor-pointer text-xs transition ${
                    filter === type
                      ? "bg-white/10 text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="bg-primary font-semibold hover:bg-accent/5 transition-all duration-200 text-white rounded-2xl">
              <button
                onClick={() => navigate("/tasks")}
                className="text-sm cursor-pointer py-3 px-5"
              >
                View All →
              </button>
            </div>
          </div>

          {/* TASKS */}
          {/* {activePage === "Dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {recentTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={() => deleteTask(task._id)}
                  onToggle={() => toggleTask(task._id)}
                  onEdit={() => {
                    setEditingTask(task);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          )}
          
          {activePage === "My Tasks" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {pendingTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={() => deleteTask(task._id)}
                  onToggle={() => toggleTask(task._id)}
                  onEdit={() => {
                    setEditingTask(task);
                    setOpen(true);
                  }}
                />
              ))}
            </div>
          )} */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {processedTasks.slice(0, 3).map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onDelete={() => deleteTask(task._id)}
                onToggle={() => toggleTask(task._id)}
                onEdit={() => {
                  setEditingTask(task);
                  setOpen(true);
                }}
              />
            ))}
          </div>

          {/* EMPTY STATE */}
          {processedTasks.length === 0 && (
            <div className="text-center text-white/40 py-10">
              No tasks found for "{filter}"
            </div>
          )}
        </main>
      </div>

      {/* MODAL */}
      <CreateTaskModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditingTask(null);
        }}
        onCreate={handleSubmitTask}
        editingTask={editingTask}
      />
    </div>
  );
}
