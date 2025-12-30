"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const mockOutgoingReferrals = [
  {
    id: "OUT001",
    patientName: "Alice Johnson",
    to: "Regional Medical Center",
    priority: "Routine",
    status: "Completed",
    sentDate: "2024-01-10",
    completedDate: "2024-01-12",
  },
  {
    id: "OUT002",
    patientName: "David Wilson",
    to: "Specialist Cardiology Center",
    priority: "Urgent",
    status: "In Transit",
    sentDate: "2024-01-13",
    completedDate: null,
  },
  {
    id: "OUT003",
    patientName: "Emma Davis",
    to: "Trauma Center",
    priority: "Emergency",
    status: "Approved",
    sentDate: "2024-01-15",
    completedDate: null,
  },
]

export function OutgoingReferrals() {
  const getStatusColor = (status: string) => {
    if (status === "Completed") return "bg-green-100 text-green-800"
    if (status === "In Transit") return "bg-blue-100 text-blue-800"
    if (status === "Approved") return "bg-purple-100 text-purple-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Outgoing Referrals</h2>
        <p className="text-sm text-muted-foreground">Track referrals sent to other facilities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Sent Referrals</CardTitle>
          <CardDescription>Referrals initiated from your facility</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search referrals" className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Ref ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">To Facility</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Priority</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Sent Date</th>
                </tr>
              </thead>
              <tbody>
                {mockOutgoingReferrals.map((referral) => (
                  <tr key={referral.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-mono text-muted-foreground">{referral.id}</td>
                    <td className="py-3 px-4 text-sm">{referral.patientName}</td>
                    <td className="py-3 px-4 text-sm">{referral.to}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge
                        variant="outline"
                        className={
                          referral.priority === "Emergency"
                            ? "bg-red-100 text-red-800"
                            : referral.priority === "Urgent"
                              ? "bg-orange-100 text-orange-800"
                              : ""
                        }
                      >
                        {referral.priority}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{referral.sentDate}</td>
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
