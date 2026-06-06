import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage"
import Dashboard from "./pages/Dashboard"
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default App
