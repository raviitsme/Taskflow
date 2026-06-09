import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import {
  User,
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { getTasks } from "../api/tasks";

export default function Profile() {
  const { user } = useUser();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.status === "Done").length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div className="flex flex-col min-h-full bg-bg text-white">
      <div className="flex flex-col">
        <Topbar />

        <main className="flex-1 min-h-0 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>

            <p className="text-white/40 mt-2">
              Manage your account and track productivity.
            </p>
          </div>
          {/* Hero Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="h-28 w-28 rounded-full bg-primary flex items-center justify-center text-4xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h2 className="text-4xl font-bold">{user?.name}</h2>

                  <p className="text-white/50 text-lg mt-1">{user?.email}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mt-5 text-white/70">
                    <div className="flex items-center gap-2">
                      <Mail size={18} />
                      {user?.email}
                    </div>

                    <div className="flex items-center gap-2">
                      <Shield size={18} />
                      Role: Member
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      Joined:
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={18} />
                      Completion: {completionRate}%
                    </div>
                  </div>
                </div>
              </div>

              <button
                className="
                px-6 py-3
                rounded-xl
                bg-primary
                hover:bg-primary/80
                transition
              "
              >
                Edit Profile
              </button>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <ListTodo className="text-primary" />
                <span className="text-white/50">Total Tasks</span>
              </div>

              <h3 className="text-5xl font-bold">{totalTasks}</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="text-emerald-400" />
                <span className="text-white/50">Completed Tasks</span>
              </div>

              <h3 className="text-5xl font-bold text-emerald-400">
                {completedTasks}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock3 className="text-amber-400" />
                <span className="text-white/50">Pending Tasks</span>
              </div>

              <h3 className="text-5xl font-bold text-amber-400">
                {pendingTasks}
              </h3>
            </div>
          </div>
          {/* Productivity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
            <h3 className="text-2xl font-semibold mb-6">
              Productivity Overview
            </h3>

            <div className="h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{
                  width: `${completionRate}%`,
                }}
              />
            </div>

            <p className="mt-5 text-white/50">
              {completionRate}% of your tasks have been completed.
            </p>
          </div>
          {/* Bottom Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h3 className="text-2xl font-semibold mb-5">Account Settings</h3>

              <div className="space-y-4 text-white/60">
                <div>
                  <p>Name</p>
                  <p className="text-white">{user?.name}</p>
                </div>

                <div>
                  <p>Email</p>
                  <p className="text-white">{user?.email}</p>
                </div>

                <div>
                  <p>Account Type</p>
                  <p className="text-white">Standard User</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <h3 className="text-2xl font-semibold mb-5">Activity Summary</h3>

              <div className="space-y-4">
                {recentTasks.length > 0 ? (
                  recentTasks.map((task) => (
                    <div
                      key={task._id}
                      className="
                        flex
                        justify-between
                        items-center
                        border-b
                        border-white/5
                        pb-3
                      "
                    >
                      <span className="truncate">{task.title}</span>

                      <span
                        className={`
                        text-xs px-2 py-1 rounded-full

                        ${
                          task.status === "Done"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }
                      `}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/40">No recent activity.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
