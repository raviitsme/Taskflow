import { Routes, Route } from "react-router-dom";

import LandingPage from "./LandingPage";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
import Completed from "./pages/Completed";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "../layout/AppLayout";


function App() {
  return (
    <div className="font-mono">
      <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;