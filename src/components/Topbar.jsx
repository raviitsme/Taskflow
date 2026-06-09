import { Bell, User } from "lucide-react";
import { useUser } from "../../context/UserContext";

export default function Topbar() {
  const { user } = useUser();

  return (
    <header className="w-full h-16 px-4 md:px-6 pl-16 md:pl-6 flex items-center justify-end border-b bg-surface">
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition">
          <Bell size={20} className="text-white" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
          <User size={18} />

          <span className="text-sm hidden sm:block">
            {user?.name || "Loading..."}
          </span>
        </div>
      </div>
    </header>
  );
}