"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useEffect } from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
  title: string
}

export function DashboardLayout({ children, sidebar, title }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-blue-600">Med_Link</span>
          </div>
          <p className="text-xs text-muted-foreground capitalize">{user.role.replace("-", " ")}</p>
        </div>
        {sidebar}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border bg-card w-64">
          <div className="mb-4 p-3 rounded-lg bg-muted">
            <p className="text-xs font-medium text-foreground">{user.email}</p>
            <p className="text-xs text-muted-foreground capitalize">{user.role.replace("-", " ")}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 border-b border-border bg-card p-6">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
