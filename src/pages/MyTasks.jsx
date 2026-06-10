import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import TaskCard from "../components/TaskCard";
import CreateTaskModal from "../components/CreateTaskModal";

import {
  getTasks,
  deleteTask as deleteTaskApi,
  toggleTask as toggleTaskApi,
  updateTask as updateTaskApi,
} from "../api/tasks";

export default function MyTasks() {
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

const fetchTasks = async () => {
  try {
    console.log("Fetching with:", { page, search, priorityFilter, statusFilter });
    const res = await getTasks(page, search, priorityFilter, statusFilter);
    console.log("Response:", res.data);
    setTasks(res.data.tasks);
    setTotalPages(res.data.totalPages);
  } catch (e) {
    console.error(e);
  }
};

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchTasks();
    }, 300); // slight debounce for search

    return () => clearTimeout(timeout);
  }, [page, search, priorityFilter, statusFilter]);

  const handleSubmitTask = async (taskData) => {
    try {
      const res = await updateTaskApi(editingTask._id, taskData);

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id ? res.data.task : task,
        ),
      );

      setOpen(false);
      setEditingTask(null);

      fetchTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      fetchTasks();
    } catch (e) {
      console.error(e);
    }
  };

  const toggleTask = async (id) => {
    try {
      await toggleTaskApi(id);

      fetchTasks();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex h-screen bg-bg text-white">
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">My Tasks</h1>

            <p className="text-white/40 mt-2">
              Manage all your tasks from one place.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-8">
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="
                w-full xl:w-96
                px-4 py-3
                rounded-xl
                bg-white/5
                border border-white/10
                outline-none
                focus:border-primary
              "
            />

            <div className="flex flex-wrap gap-3">
              {/* Priority Filter */}
              <select
                value={priorityFilter}
                onChange={(e) => {
                  setPriorityFilter(e.target.value);
                  setPage(1);
                }}
                className="
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  outline-none
                "
              >
                <option className="text-black" value="All">
                  All Priorities
                </option>
                <option className="text-black" value="High">
                  High
                </option>
                <option className="text-black" value="Medium">
                  Medium
                </option>
                <option className="text-black" value="Low">
                  Low
                </option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  border border-white/10
                  outline-none
                "
              >
                <option className="text-black" value="All">
                  All Status
                </option>
                <option className="text-black" value="IN_PROGRESS">
                  In Progress
                </option>
                <option className="text-black" value="DONE">
                  Done
                </option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
              {tasks.length} Tasks Found
            </span>
          </div>

          {/* Tasks */}
          {tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
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
            <div className="h-72 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl">
              <h3 className="text-xl font-semibold">No Tasks Found</h3>

              <p className="text-white/40 mt-2">
                Try changing filters or search keywords.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={page === 1}
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
