"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { HospitalAdminSidebar } from "./sidebar"
import { DashboardOverview } from "./components/dashboard-overview"
import { UsersList } from "./components/users-list"
import { DepartmentsList } from "./components/departments-list"
import { ReferralsOverview } from "./components/referrals-overview"
import { useState } from "react"

type HospitalAdminPage = "overview" | "users" | "departments" | "referrals" | "reports" | "audit" | "support"

export default function HospitalAdminDashboard() {
  const [currentPage, setCurrentPage] = useState<HospitalAdminPage>("overview")

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview />
      case "users":
        return <UsersList />
      case "departments":
        return <DepartmentsList />
      case "referrals":
        return <ReferralsOverview />
      case "reports":
        return <div className="text-center py-12">Reports & Analytics Page (Coming Soon)</div>
      case "audit":
        return <div className="text-center py-12">Audit Logs Page (Coming Soon)</div>
      case "support":
        return <div className="text-center py-12">Support Page (Coming Soon)</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout
      title="Hospital Admin Dashboard"
      sidebar={<HospitalAdminSidebar currentPage={currentPage} onPageChange={setCurrentPage} />}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
