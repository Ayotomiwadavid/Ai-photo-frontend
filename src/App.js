import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminDashboard from "./pages/admin/Dashboard"
import AdminLogin from "./pages/admin/Login"
import UserDashboard from "./pages/user/Dashboard.js"
import UserUpload from "./pages/user/Upload"
import UserAnalytics from "./pages/user/Analytics"
import UserResponses from "./pages/user/Responses"
import Login from "./pages/Login"
import Register from "./pages/Register"
import ProtectedRoute from "./components/ProtectedRoute"
import AdminRoute from "./components/AdminRoute"
import "./index.css"

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User routes */}
        <Route path="/user" element={<ProtectedRoute />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="upload" element={<UserUpload />} />
          <Route path="analytics" element={<UserAnalytics />} />
          <Route path="responses" element={<UserResponses />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App

