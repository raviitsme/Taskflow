import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import {
  Mail,
  Calendar,
  Shield,
  CheckCircle2,
  Clock3,
  ListTodo,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import { getTasks } from "../api/tasks";
import EditProfileModal from "../components/EditProfileModal";

export default function Profile() {
  const { user, fetchUser } = useUser();
  const [tasks, setTasks] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

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

        <main className="flex-1 min-h-0 p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Profile</h1>
            <p className="text-white/40 mt-1 text-sm sm:text-base">
              Manage your account and track productivity.
            </p>
          </div>

          {/* Hero Card */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-primary flex items-center justify-center text-3xl sm:text-4xl font-bold shrink-0">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <h2 className="text-2xl sm:text-4xl font-bold">
                    {user?.name}
                  </h2>
                  <p className="text-white/50 text-sm sm:text-lg mt-1">
                    {user?.email}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mt-4 text-white/70 text-sm">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Mail size={15} />
                      <span className="truncate">{user?.email}</span>
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Shield size={15} />
                      Role: Member
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <Calendar size={15} />
                      Joined:{" "}
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString()
                        : "N/A"}
                    </div>

                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <CheckCircle2 size={15} />
                      Completion: {completionRate}%
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpenEdit(true)}
                className="w-full cursor-pointer sm:w-auto px-6 py-3 rounded-xl bg-primary hover:bg-primary/80 transition text-sm sm:text-base"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <ListTodo className="text-primary" size={20} />
                <span className="text-white/50 text-sm">Total Tasks</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold">{totalTasks}</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle2 className="text-emerald-400" size={20} />
                <span className="text-white/50 text-sm">Completed Tasks</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold text-emerald-400">
                {completedTasks}
              </h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Clock3 className="text-amber-400" size={20} />
                <span className="text-white/50 text-sm">Pending Tasks</span>
              </div>
              <h3 className="text-4xl sm:text-5xl font-bold text-amber-400">
                {pendingTasks}
              </h3>
            </div>
          </div>

          {/* Productivity */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7">
            <h3 className="text-xl sm:text-2xl font-semibold mb-5">
              Productivity Overview
            </h3>

            <div className="h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <p className="mt-4 text-white/50 text-sm">
              {completionRate}% of your tasks have been completed.
            </p>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Account Settings
              </h3>

              <div className="space-y-4 text-white/60 text-sm sm:text-base">
                <div>
                  <p className="text-xs sm:text-sm text-white/40 mb-0.5">
                    Name
                  </p>
                  <p className="text-white">{user?.name}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-white/40 mb-0.5">
                    Email
                  </p>
                  <p className="text-white break-all">{user?.email}</p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-white/40 mb-0.5">
                    Account Type
                  </p>
                  <p className="text-white">Standard User</p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-7">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4">
                Activity Summary
              </h3>

              <div className="space-y-3">
                {recentTasks.length > 0 ? (
                  recentTasks.map((task) => (
                    <div
                      key={task._id}
                      className="flex justify-between items-center border-b border-white/5 pb-3 gap-3"
                    >
                      <span className="truncate text-sm">{task.title}</span>

                      <span
                        className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                          task.status === "Done"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                        }`}
                      >
                        {task.status}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-white/40 text-sm">No recent activity.</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
      <EditProfileModal isOpen={openEdit} onClose={() => setOpenEdit(false)} />
    </div>
  );
}
