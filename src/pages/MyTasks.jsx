import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskCard from "../components/TaskCard";

import {
  getTasks,
  deleteTask as deleteTaskApi,
  toggleTask as toggleTaskApi,
  updateTask as updateTaskApi,
} from "../api/tasks";
import CreateTaskModal from "../components/CreateTaskModal";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const fetchTasks = async () => {
    try {
      const res = await getTasks(page, search, filter);
      console.log(res.data);

      setTasks(res.data.tasks);
      setTotalPages(res.data.totalPages);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, [page, search, filter]);

  const handleSubmitTask = async (taskData) => {
    try {
      const res = await updateTaskApi(editingTask._id, taskData);

      fetchTasks();

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id ? res.data.task : task,
        ),
      );

      setOpen(false);
      setEditingTask(null);
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      fetchTasks();
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTask = async (id) => {
    try {
      const res = await toggleTaskApi(id);
      fetchTasks();
      if (res.data.task.status === "Done") {
        setTasks((prev) => prev.filter((task) => task._id !== id));
      } else {
        setTasks((prev) =>
          prev.map((task) => (task._id === id ? res.data.task : task)),
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen bg-bg text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-8 flex flex-col flex-1 overflow-y-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Tasks</h1>

            <p className="text-white/40 mt-2">
              Manage all active and pending tasks.
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            {/* Search */}
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
        w-full lg:w-80
        px-4 py-3
        rounded-xl
        bg-white/5
        border border-white/10
        outline-none
        focus:border-primary
      "
            />

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white/5 p-2 rounded-xl">
              {["All", "High", "Medium", "Low"].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilter(type);
                    setPage(1);
                  }}
                  className={`
            px-4 py-2
            rounded-lg
            text-sm
            cursor-pointer
            transition-all

            ${
              filter === type
                ? "bg-primary text-white"
                : "text-white/50 hover:text-white"
            }
          `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Task Count */}
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {tasks.length} Tasks Found
            </span>
          </div>

          {/* Task Grid */}
          <div className="flex-1">
            {tasks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {tasks.map((task) => (
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
            ) : (
              <div className="h-64 flex flex-col justify-center items-center border border-dashed border-white/10 rounded-3xl">
                <h3 className="text-lg font-semibold">No Tasks Found</h3>

                <p className="text-white/40 mt-2">
                  Try changing filters or search keywords.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10 pt-6 border-t border-white/10">
            <button
              disabled={page === 1 || totalPages <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="
    px-5 py-2.5
    rounded-xl
    bg-white/10
    hover:bg-white/15
    disabled:opacity-40
    disabled:cursor-not-allowed
  "
            >
              Previous
            </button>

            <div className="px-4 py-2 rounded-xl bg-white/5">
              Page {tasks.length ? page : 0} of {totalPages}
            </div>

            <button
              disabled={page === totalPages || totalPages <= 1}
              onClick={() => setPage((prev) => prev + 1)}
              className="
    px-5 py-2.5
    rounded-xl
    bg-primary
    hover:bg-primary/80
    disabled:opacity-40
    disabled:cursor-not-allowed
  "
            >
              Next
            </button>
          </div>
        </main>
      </div>
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
