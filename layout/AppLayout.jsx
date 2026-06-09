import { Outlet } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";


export default function AppLayout() {
  return (
    <div className="h-screen flex overflow-hidden bg-bg text-white">
      <Sidebar />

      <div className="flex-1 min-w-0 overflow-y-auto"> {/* ← added overflow-y-auto */}
        <Outlet />
      </div>
    </div>
  );
}