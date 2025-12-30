"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { SystemAdminSidebar } from "./sidebar"
import { DashboardOverview } from "./components/dashboard-overview"
import { UsersList } from "./components/users-list"
import { FacilitiesList } from "./components/facilities-list"
import { useState } from "react"

type SystemAdminPage = "overview" | "users" | "facilities" | "reports" | "audit" | "support"

export default function SystemAdminDashboard() {
  const [currentPage, setCurrentPage] = useState<SystemAdminPage>("overview")

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UsersList />
      case "facilities":
        return <FacilitiesList />
      case "reports":
        return <div className="text-center py-12">Reports & Analytics Page (Coming Soon)</div>
      case "audit":
        return <div className="text-center py-12">Audit Logs Page (Coming Soon)</div>
      case "support":
        return <div className="text-center py-12">Support & Issues Page (Coming Soon)</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout
      title="System Admin Dashboard"
      sidebar={<SystemAdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
