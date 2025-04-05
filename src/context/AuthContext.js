"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = localStorage.getItem("user")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)
      setIsAdmin(userData.role === "admin")
    }
    setLoading(false)
  }, [])

  const login = (userData, isAdminUser = false) => {
    const user = { ...userData, role: isAdminUser ? "admin" : "user" }
    localStorage.setItem("user", JSON.stringify(user))
    setCurrentUser(user)
    setIsAdmin(isAdminUser)
    return user
  }

  const logout = () => {
    localStorage.removeItem("user")
    setCurrentUser(null)
    setIsAdmin(false)
  }

  const value = {
    currentUser,
    isAdmin,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

