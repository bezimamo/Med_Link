"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { LiaisonSidebar } from "./sidebar"
import { DashboardOverview } from "./components/dashboard-overview"
import { IncomingReferrals } from "./components/incoming-referrals"
import { OutgoingReferrals } from "./components/outgoing-referrals"
import { ApprovalForm } from "./components/approval-form"
import { useState } from "react"

type LiaisonPage = "overview" | "incoming" | "outgoing" | "approve" | "follow-up" | "support"

export default function LiaisonDashboard() {
  const [currentPage, setCurrentPage] = useState<LiaisonPage>("overview")
  const [selectedReferral, setSelectedReferral] = useState<string | null>(null)

  const renderContent = () => {
    switch (currentPage) {
      case "overview":
        return <DashboardOverview />
      case "incoming":
        return (
          <IncomingReferrals
            onSelectReferral={(id) => {
              setSelectedReferral(id)
              setCurrentPage("approve")
            }}
          />
        )
      case "outgoing":
        return <OutgoingReferrals />
      case "approve":
        return <ApprovalForm referralId={selectedReferral} onBack={() => setCurrentPage("incoming")} />
      case "follow-up":
        return <div className="text-center py-12">Follow-up & Feedback (Coming Soon)</div>
      case "support":
        return <div className="text-center py-12">Support (Coming Soon)</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <DashboardLayout
      title="Liaison Officer Dashboard"
      sidebar={<LiaisonSidebar currentPage={currentPage} onPageChange={setCurrentPage} />}
    >
      {renderContent()}
    </DashboardLayout>
  )
}
