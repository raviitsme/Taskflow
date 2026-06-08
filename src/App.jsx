import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage"
import Dashboard from "./pages/Dashboard"
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import MyTasks from "./pages/MyTasks";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <MyTasks/>
        </ProtectedRoute>
      }></Route>
    </Routes>
  )
}

export default App
