"use client"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import AdminSidebar from "./AdminSidebar"

const AdminRoute = () => {
  const { currentUser, isAdmin, loading } = useAuth()

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!currentUser || !isAdmin) {
    return <Navigate to="/admin/login" />
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  )
}

export default AdminRoute

