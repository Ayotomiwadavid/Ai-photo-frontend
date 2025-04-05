"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { HomeIcon, PhotographIcon, UserGroupIcon, LogoutIcon } from "@heroicons/react/outline"

const AdminSidebar = () => {
  const { logout } = useAuth()
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white"
  }

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <p className="text-sm text-gray-400 mt-1">AI Photo Studio</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin/dashboard" className={`flex items-center p-2 rounded-md ${isActive("/admin/dashboard")}`}>
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard?tab=pending"
              className={`flex items-center p-2 rounded-md ${isActive("/admin/dashboard?tab=pending")}`}
            >
              <PhotographIcon className="w-5 h-5 mr-3" />
              Pending Requests
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard?tab=completed"
              className={`flex items-center p-2 rounded-md ${isActive("/admin/dashboard?tab=completed")}`}
            >
              <PhotographIcon className="w-5 h-5 mr-3" />
              Completed Requests
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dashboard?tab=users"
              className={`flex items-center p-2 rounded-md ${isActive("/admin/dashboard?tab=users")}`}
            >
              <UserGroupIcon className="w-5 h-5 mr-3" />
              Manage Users
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center p-2 w-full text-left rounded-md text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <LogoutIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar

