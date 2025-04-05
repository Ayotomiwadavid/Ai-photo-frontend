"use client"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import UserSidebar from "./UserSidebar"

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!currentUser) {
    return <Navigate to="/" />
  }

  return (
    <div className="flex">
      <UserSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default ProtectedRoute

