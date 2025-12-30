"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

interface IncomingReferralsProps {
  onSelectReferral: (id: string) => void
}

const mockIncomingReferrals = [
  {
    id: "IN001",
    patientName: "John Doe",
    age: 45,
    from: "Health Center A",
    priority: "Emergency",
    status: "Pending",
    date: "2024-01-15 10:30",
    condition: "Acute cardiac symptoms",
  },
  {
    id: "IN002",
    patientName: "Jane Smith",
    age: 32,
    from: "Clinic B",
    priority: "Urgent",
    status: "Pending",
    date: "2024-01-15 09:15",
    condition: "Post-operative complications",
  },
  {
    id: "IN003",
    patientName: "Robert Brown",
    age: 58,
    from: "Health Center C",
    priority: "Routine",
    status: "Approved",
    date: "2024-01-14 14:45",
    condition: "Follow-up consultation",
  },
  {
    id: "IN004",
    patientName: "Maria Garcia",
    age: 28,
    from: "Clinic D",
    priority: "Urgent",
    status: "Pending",
    date: "2024-01-14 11:20",
    condition: "Obstetric complication",
  },
]

export function IncomingReferrals({ onSelectReferral }: IncomingReferralsProps) {
  const getPriorityColor = (priority: string) => {
    if (priority === "Emergency") return "bg-red-100 text-red-800"
    if (priority === "Urgent") return "bg-orange-100 text-orange-800"
    return "bg-blue-100 text-blue-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Incoming Referrals</h2>
        <p className="text-sm text-muted-foreground">Review and approve referral requests from other facilities</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Referral Queue</CardTitle>
          <CardDescription>Referrals awaiting your review and approval</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by patient name or referral ID" className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockIncomingReferrals.map((referral) => (
              <div
                key={referral.id}
                className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{referral.patientName}</h3>
                      <Badge className={getPriorityColor(referral.priority)}>{referral.priority}</Badge>
                      <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ref ID: <span className="font-mono">{referral.id}</span>
                    </p>
                  </div>
                  <Button onClick={() => onSelectReferral(referral.id)} variant="outline" size="sm" className="gap-2">
                    <Eye className="w-4 h-4" />
                    Review
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">From Facility</p>
                    <p className="font-medium">{referral.from}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Condition</p>
                    <p className="font-medium">{referral.condition}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Age</p>
                    <p className="font-medium">{referral.age} years</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Received</p>
                    <p className="font-medium text-xs">{referral.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
