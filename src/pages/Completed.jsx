import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import TaskCard from "../components/TaskCard";

import { getTasks, deleteTask as deleteTaskApi, toggleTask as toggleTaskApi } from "../api/tasks";

export default function Completed() {
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await getTasks();
      console.log(res);
      setTasks(res.data?.tasks || res.data?.data?.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // completed only
  const completedTasks = tasks.filter((task) => task.status === "Done");

  // delete
  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // toggle (uncomplete / redo)
  const toggleTask = async (id) => {
    try {
      const res = await toggleTaskApi(id);
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data.task : t))
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg text-white font-sans">
      
      {/* Sidebar */}

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Topbar />

        {/* background blobs (same as dashboard feel) */}
        <div className="fixed top-0 right-1/4 h-125 w-125 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 left-10 h-100 w-100 rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

        <main className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">

          {/* Header */}
          <div className="border-b border-white/5 pb-6">
            <h1 className="text-3xl font-bold">Completed Tasks</h1>
            <p className="text-white/40 text-sm mt-1">
              All finished work lives here.
            </p>
          </div>

          {/* empty state */}
          {completedTasks.length === 0 ? (
            <div className="text-center text-white/40 py-10">
              No completed tasks yet 🚀
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {completedTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={() => deleteTask(task._id)}
                  onToggle={() => toggleTask(task._id)}
                />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}