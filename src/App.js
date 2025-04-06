import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminDashboard from "../app/admin/Dashboard"
import AdminLogin from "../app/admin/Login"
// import UserDashboard from "./app/user/dashboard/page
import UserUpload from "../app/user/Upload"
import UserAnalytics from "../app/user/analytics/Analytics"
import UserResponses from "../app/user/Responses"
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
          {/* <Route path="dashboard" element={<UserDashboard />} /> */}
          <Route path="upload" element={<UserUpload />} />
          <Route path="analytics" element={<UserAnalytics />} />
          <Route path="responses" element={<UserResponses />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="login" element={<AdminLogin />} />
          <Route path="dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Catch-all for 404 */}
        <Route path="*" element={<div className="text-center mt-20 text-2xl">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App
