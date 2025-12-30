"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export type UserRole = "system-admin" | "hospital-admin" | "liaison" | "doctor"

interface User {
  id: string
  email: string
  role: UserRole
  name?: string
  facility?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user")
    console.log("[v0] Auth check - stored user:", storedUser)
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        console.log("[v0] Setting user from storage:", parsedUser)
        setUser(parsedUser)
      } catch (error) {
        console.error("Failed to parse user data:", error)
        sessionStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    console.log("[v0] Logging out user")
    sessionStorage.removeItem("user")
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ user, isLoading, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
