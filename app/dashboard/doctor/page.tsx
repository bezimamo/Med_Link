"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DoctorSidebar } from "./sidebar"
import { DashboardOverview } from "./components/dashboard-overview"
import { PatientsList } from "./components/patients-list"
import { CreateReferral } from "./components/create-referral"
import { MyReferrals } from "./components/my-referrals"
import { ReferralStatus } from "./components/referral-status"
import { useState } from "react"

type DoctorPage =
  | "overview"
  | "patients"
  | "create-referral"
  | "my-referrals"
  | "status"
  | "reports"
  | "profile"
  | "support"

export default function DoctorDashboard() {
  const [currentPage, setCurrentPage] = useState<DoctorPage>("overview")

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview />
      case "patients":
        return <PatientsList />
      case "create-referral":
        return <CreateReferral />
      case "my-referrals":
        return <MyReferrals />
      case "status":
        return <ReferralStatus />
      case "reports":
        return <div className="text-center py-12">Reports Page (Coming Soon)</div>
      case "profile":
        return <div className="text-center py-12">Profile Settings (Coming Soon)</div>
      case "support":
        return <div className="text-center py-12">Support (Coming Soon)</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout
      title="Doctor Dashboard"
      sidebar={<DoctorSidebar currentPage={currentPage} onPageChange={setCurrentPage} />}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
