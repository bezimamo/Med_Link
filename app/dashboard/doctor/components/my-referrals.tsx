"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const mockMyReferrals = [
  {
    id: "REF001",
    patientName: "John Doe",
    receivingHospital: "Regional Medical Center",
    status: "Approved",
    priority: "Routine",
    submitDate: "2024-01-15",
    approvalDate: "2024-01-15",
  },
  {
    id: "REF002",
    patientName: "Jane Smith",
    receivingHospital: "District Hospital",
    status: "Pending",
    priority: "Urgent",
    submitDate: "2024-01-14",
    approvalDate: null,
  },
  {
    id: "REF003",
    patientName: "Robert Brown",
    receivingHospital: "Specialist Clinic",
    status: "Approved",
    priority: "Routine",
    submitDate: "2024-01-13",
    approvalDate: "2024-01-13",
  },
  {
    id: "REF004",
    patientName: "Maria Garcia",
    receivingHospital: "Regional Medical Center",
    status: "Rejected",
    priority: "Emergency",
    submitDate: "2024-01-12",
    approvalDate: "2024-01-12",
  },
]

export function MyReferrals() {
  const getStatusColor = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-800"
    if (status === "Pending") return "bg-yellow-100 text-yellow-800"
    if (status === "Rejected") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  const getPriorityColor = (priority: string) => {
    if (priority === "Emergency") return "bg-red-100 text-red-800"
    if (priority === "Urgent") return "bg-orange-100 text-orange-800"
    return "bg-blue-100 text-blue-800"
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">My Referrals</h2>
        <p className="text-sm text-muted-foreground">Track all your referral submissions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Referral History</CardTitle>
          <CardDescription>All referrals submitted by you</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by patient name or referral ID" className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ref ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To Hospital</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {mockMyReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{referral.id}</td>
                    <td className="py-3 px-4 text-sm">{referral.patientName}</td>
                    <td className="py-3 px-4 text-sm">{referral.receivingHospital}</td>
                    <td className="py-3 px-4">
                      <Badge className={getPriorityColor(referral.priority)}>{referral.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{referral.submitDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
