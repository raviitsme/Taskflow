import { Bell, Search, User } from "lucide-react";

export default function Topbar() {
  return (
    <header className="w-full h-16 px-4 md:px-6 pl-16 md:pl-6 flex items-center justify-between border-b bg-surface">
      {/* Search */}
      <div className="flex items-center gap-2 w-full max-w-md bg-white/5 px-3 py-2 rounded-lg">
        <Search size={18} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search tasks..."
          className="bg-transparent w-full outline-none text-sm text-white placeholder:text-gray-400"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4 ml-4">
        {/* Notification */}
        <button className="relative p-2 rounded-lg hover:bg-white/10 transition">
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg hover:bg-white/10 transition cursor-pointer">
          <User size={18} className="text-white" />
          <span className="text-sm text-white hidden sm:block">User</span>
        </div>
      </div>
    </header>
  );
}
