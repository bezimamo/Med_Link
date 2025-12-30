"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, Users, Plus, CheckCircle2, BarChart3, User, HelpCircle } from "lucide-react"

type DoctorPage =
  | "overview"
  | "patients"
  | "create-referral"
  | "my-referrals"
  | "status"
  | "reports"
  | "profile"
  | "support"

interface DoctorSidebarProps {
  currentPage: DoctorPage
  onPageChange: (page: DoctorPage) => void
}

export function DoctorSidebar({ currentPage, onPageChange }: DoctorSidebarProps) {
  const menuItems = [
    { id: "overview" as DoctorPage, label: "Dashboard", icon: LayoutGrid },
    { id: "patients" as DoctorPage, label: "Patients", icon: Users },
    { id: "create-referral" as DoctorPage, label: "Create Referral", icon: Plus },
    { id: "my-referrals" as DoctorPage, label: "My Referrals", icon: CheckCircle2 },
    { id: "status" as DoctorPage, label: "Referral Status", icon: BarChart3 },
    { id: "reports" as DoctorPage, label: "Reports", icon: BarChart3 },
    { id: "profile" as DoctorPage, label: "Profile", icon: User },
    { id: "support" as DoctorPage, label: "Support", icon: HelpCircle },
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
