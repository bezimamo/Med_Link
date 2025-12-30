"use client"

import { Button } from "@/components/ui/button"
import { LayoutGrid, ClipboardList, Send, Activity, HelpCircle } from "lucide-react"

type LiaisonPage = "overview" | "incoming" | "outgoing" | "approve" | "follow-up" | "support"

interface LiaisonSidebarProps {
  currentPage: LiaisonPage
  onPageChange: (page: LiaisonPage) => void
}

export function LiaisonSidebar({ currentPage, onPageChange }: LiaisonSidebarProps) {
  const menuItems = [
    { id: "overview" as LiaisonPage, label: "Dashboard", icon: LayoutGrid },
    { id: "incoming" as LiaisonPage, label: "Incoming Referrals", icon: ClipboardList },
    { id: "outgoing" as LiaisonPage, label: "Outgoing Referrals", icon: Send },
    { id: "follow-up" as LiaisonPage, label: "Follow-up & Feedback", icon: Activity },
    { id: "support" as LiaisonPage, label: "Support", icon: HelpCircle },
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
