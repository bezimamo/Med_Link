"use client"

import { Button } from "@/components/ui/button"
import { Users, Building2, BarChart3, Notebook as LogBook, HelpCircle, LayoutGrid } from "lucide-react"

type SystemAdminPage = "overview" | "users" | "facilities" | "reports" | "audit" | "support"

interface SystemAdminSidebarProps {
  currentPage: SystemAdminPage
  onPageChange: (page: SystemAdminPage) => void
}

export function SystemAdminSidebar({ currentPage, onPageChange }: SystemAdminSidebarProps) {
  const menuItems = [
    { id: "overview" as SystemAdminPage, label: "Dashboard", icon: LayoutGrid },
    { id: "users" as SystemAdminPage, label: "User Management", icon: Users },
    { id: "facilities" as SystemAdminPage, label: "Facility Management", icon: Building2 },
    { id: "reports" as SystemAdminPage, label: "Reports", icon: BarChart3 },
    { id: "audit" as SystemAdminPage, label: "Audit Logs", icon: LogBook },
    { id: "support" as SystemAdminPage, label: "Support", icon: HelpCircle },
  ]

  return (
    <nav className="p-4 space-y-2">
      {menuItems.map((item) => (
        <Button
          key={item.id}
          variant={currentPage === item.id ? "default" : "ghost"}
          className="w-full justify-start gap-3"
          onClick={() => onPageChange(item.id)}
        >
          <item.icon className="w-4 h-4" />
          {item.label}
        </Button>
      ))}
    </nav>
  )
}
