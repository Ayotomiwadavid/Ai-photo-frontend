"use client"
import { Link, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import {
  HomeIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  PhotoIcon,
  ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline"

const UserSidebar = () => {
  const { logout, currentUser } = useAuth()
  const location = useLocation()

  const isActive = (path) =>
    location.pathname === path
      ? "bg-purple-700 text-white"
      : "text-gray-300 hover:bg-purple-700 hover:text-white"

  return (
    <div className="bg-purple-800 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-purple-700">
        <h2 className="text-2xl font-bold">AI Photo Studio</h2>
        <p className="text-sm text-purple-300 mt-1">Welcome, {currentUser?.name || "User"}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/user/dashboard" className={`flex items-center p-2 rounded-md ${isActive("/user/dashboard")}`}>
              <HomeIcon className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/user/upload" className={`flex items-center p-2 rounded-md ${isActive("/user/upload")}`}>
              <ArrowUpTrayIcon className="w-5 h-5 mr-3" />
              Upload Photos
            </Link>
          </li>
          <li>
            <Link to="/user/responses" className={`flex items-center p-2 rounded-md ${isActive("/user/responses")}`}>
              <PhotoIcon className="w-5 h-5 mr-3" />
              My Responses
            </Link>
          </li>
          <li>
            <Link to="/user/analytics" className={`flex items-center p-2 rounded-md ${isActive("/user/analytics")}`}>
              <ChartBarIcon className="w-5 h-5 mr-3" />
              Analytics
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-purple-700">
        <button
          onClick={logout}
          className="flex items-center p-2 w-full text-left rounded-md text-gray-300 hover:bg-purple-700 hover:text-white"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserSidebar
