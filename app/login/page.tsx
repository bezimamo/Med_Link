"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type UserRole = "system-admin" | "hospital-admin" | "liaison" | "doctor"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("doctor")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication - in production, this would call a backend API
    try {
      const userData = {
        email,
        role,
        id: `user-${Date.now()}`,
      }

      console.log("[v0] Login attempt with role:", role)
      sessionStorage.setItem("user", JSON.stringify(userData))
      const stored = sessionStorage.getItem("user")
      console.log("[v0] Verified stored user:", stored)

      // Redirect based on role
      const dashboardRoutes: Record<UserRole, string> = {
        "system-admin": "/dashboard/system-admin",
        "hospital-admin": "/dashboard/hospital-admin",
        liaison: "/dashboard/liaison",
        doctor: "/dashboard/doctor",
      }

      console.log("[v0] Redirecting to:", dashboardRoutes[role])
      router.push(dashboardRoutes[role])
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-blue-600">Med_Link</span>
          </div>
          <CardTitle className="text-2xl">Referral System</CardTitle>
          <CardDescription>Sign in to your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@hospital.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground"
              >
                <option value="doctor">Doctor</option>
                <option value="liaison">Liaison Officer</option>
                <option value="hospital-admin">Hospital Admin</option>
                <option value="system-admin">System Admin</option>
              </select>
            </div>

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t">
            <p className="text-xs text-muted-foreground text-center mb-3">
              Demo Credentials - Use any email/password combination
            </p>
            <div className="space-y-2 text-xs">
              <p>
                <strong>System Admin:</strong> select "System Admin" role
              </p>
              <p>
                <strong>Hospital Admin:</strong> select "Hospital Admin" role
              </p>
              <p>
                <strong>Liaison Officer:</strong> select "Liaison Officer" role
              </p>
              <p>
                <strong>Doctor:</strong> select "Doctor" role
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
