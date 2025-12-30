"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const mockReferrals = [
  {
    id: "REF001",
    patientName: "John Doe",
    from: "Emergency",
    to: "ICU",
    priority: "Emergency",
    status: "Approved",
    date: "2024-01-15",
  },
  {
    id: "REF002",
    patientName: "Jane Smith",
    from: "OPD",
    to: "Surgery",
    priority: "Urgent",
    status: "Pending",
    date: "2024-01-14",
  },
  {
    id: "REF003",
    patientName: "Robert Johnson",
    from: "Emergency",
    to: "Cardiology",
    priority: "Routine",
    status: "Completed",
    date: "2024-01-13",
  },
  {
    id: "REF004",
    patientName: "Maria Garcia",
    from: "Pediatrics",
    to: "Surgery",
    priority: "Urgent",
    status: "Approved",
    date: "2024-01-12",
  },
  {
    id: "REF005",
    patientName: "David Lee",
    from: "ICU",
    to: "Cardiology",
    priority: "Routine",
    status: "Rejected",
    date: "2024-01-11",
  },
]

export function ReferralsOverview() {
  const getPriorityColor = (priority: string) => {
    if (priority === "Emergency") return "bg-red-100 text-red-800"
    if (priority === "Urgent") return "bg-orange-100 text-orange-800"
    return "bg-blue-100 text-blue-800"
  }

  const getStatusColor = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-800"
    if (status === "Pending") return "bg-yellow-100 text-yellow-800"
    if (status === "Completed") return "bg-blue-100 text-blue-800"
    if (status === "Rejected") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Referrals Overview</h2>
        <p className="text-sm text-muted-foreground">Monitor all incoming and outgoing referrals</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Referrals</CardTitle>
          <CardDescription>Read-only view of referral requests</CardDescription>
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
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Referral ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">From</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                </tr>
              </thead>
              <tbody>
                {mockReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{referral.id}</td>
                    <td className="py-3 px-4 text-sm">{referral.patientName}</td>
                    <td className="py-3 px-4 text-sm">{referral.from}</td>
                    <td className="py-3 px-4 text-sm">{referral.to}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getPriorityColor(referral.priority)} text-xs`}>{referral.priority}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(referral.status)} text-xs`}>{referral.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{referral.date}</td>
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
