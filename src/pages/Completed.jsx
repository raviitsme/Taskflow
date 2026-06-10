import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import TaskCard from "../components/TaskCard";
import { getTasks, deleteTask as deleteTaskApi, toggleTask as toggleTaskApi } from "../api/tasks";

export default function Completed() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await getTasks(1, "", "All", "DONE");
      setTasks(res.data?.tasks || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleTask = async (id) => {
    try {
      await toggleTaskApi(id);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-full bg-bg text-white">
      <div className="flex flex-col">
        <Topbar />

        <div className="fixed top-0 right-1/4 h-125 w-125 rounded-full bg-primary/5 blur-[150px] pointer-events-none" />
        <div className="fixed bottom-20 left-10 h-100 w-100 rounded-full bg-accent/5 blur-[130px] pointer-events-none" />

        <main className="relative z-10 flex-1 min-h-0 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">

          {/* Header */}
          <div className="border-b border-white/5 pb-6">
            <h1 className="text-3xl font-bold">Completed Tasks</h1>
            <p className="text-white/40 text-sm mt-1">
              All finished work lives here.
            </p>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center text-white/40 py-10">
              No completed tasks yet 🚀
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {tasks.map((task) => (
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