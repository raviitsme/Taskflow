import {
  LayoutDashboard,
  CheckSquare,
  ClipboardCheck,
  User,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "My Tasks",
    icon: CheckSquare,
  },
  {
    title: "Completed",
    icon: ClipboardCheck,
  },
  {
    title: "Profile",
    icon: User,
  },
];

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("Dashboard");

  const isOpen = expanded || mobileOpen;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-50 p-2 rounded-lg bg-surface text-white"
      >
        <Menu size={24} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        onMouseEnter={() => window.innerWidth >= 768 && setExpanded(true)}
        onMouseLeave={() => window.innerWidth >= 768 && setExpanded(false)}
        className={`
          fixed md:relative
          top-0 left-0
          z-50
          h-screen
          bg-surface
          border-r
          flex flex-col
          font-mono
          transition-all duration-300 ease-in-out

          ${
            mobileOpen
              ? "translate-x-0 w-64"
              : "-translate-x-full md:translate-x-0"
          }

          ${expanded ? "md:w-64" : "md:w-24"}
        `}
      >
        {/* Close button */}
        <div className="md:hidden flex justify-end p-4">
          <button
            onClick={() => setMobileOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b">
          <h1 className="text-2xl text-white">
            {isOpen ? (
              <>
                Task<span className="text-primary">Flow</span>
              </>
            ) : (
              <>
                T<span className="text-primary">F</span>
              </>
            )}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2 flex flex-col justify-center">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.title;

              return (
                <li key={item.title}>
                  <button
                    onClick={() => setActive(item.title)}
                    className={`
                      w-full
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-lg
                      transition-all
                      cursor-pointer

                      ${
                        isActive
                          ? "bg-primary/20 text-primary"
                          : "text-gray-300 hover:bg-primary/10 hover:text-primary"
                      }
                    `}
                  >
                    <Icon size={20} className="min-w-5" />

                    <span
                      className={`
                        overflow-hidden
                        whitespace-nowrap
                        transition-all duration-300
                        ${
                          isOpen
                            ? "opacity-100 max-w-37.5"
                            : "opacity-0 max-w-0"
                        }
                      `}
                    >
                      {item.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t">
          <button
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              text-red-400
              hover:bg-red-500/10
              transition-all
              cursor-pointer
            "
          >
            <LogOut size={20} className="min-w-5" />

            <span
              className={`
                overflow-hidden
                whitespace-nowrap
                transition-all duration-300
                ${
                  isOpen
                    ? "opacity-100 max-w-37.5"
                    : "opacity-0 max-w-0"
                }
              `}
            >
              Logout
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}