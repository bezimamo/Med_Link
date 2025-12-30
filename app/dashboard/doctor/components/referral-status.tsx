"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const mockStatusReferrals = [
  {
    id: "REF001",
    patientName: "John Doe",
    status: "Approved",
    statusDate: "2024-01-15",
    qrCode: "QR001",
    notes: "Patient approved for admission. QR code generated.",
  },
  {
    id: "REF002",
    patientName: "Jane Smith",
    status: "Pending Review",
    statusDate: "2024-01-14",
    qrCode: null,
    notes: "Referral under review by receiving facility.",
  },
  {
    id: "REF003",
    patientName: "Robert Brown",
    status: "Completed",
    statusDate: "2024-01-13",
    qrCode: "QR003",
    notes: "Patient completed referral. Follow-up recommended.",
  },
  {
    id: "REF004",
    patientName: "Maria Garcia",
    status: "Rejected",
    statusDate: "2024-01-12",
    qrCode: null,
    notes: "Referral rejected. Reason: Capacity exceeded. Please try again later.",
  },
]

export function ReferralStatus() {
  const getStatusColor = (status: string) => {
    if (status === "Approved") return "bg-green-100 text-green-800"
    if (status === "Pending Review") return "bg-yellow-100 text-yellow-800"
    if (status === "Completed") return "bg-blue-100 text-blue-800"
    if (status === "Rejected") return "bg-red-100 text-red-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Referral Status</h2>
        <p className="text-sm text-muted-foreground">Track the status and outcomes of your referrals</p>
      </div>

      <div className="space-y-3">
        {mockStatusReferrals.map((referral) => (
          <Card key={referral.id}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold">{referral.patientName}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{referral.id}</p>
                </div>
                <Badge className={getStatusColor(referral.status)}>{referral.status}</Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-3">{referral.notes}</p>

              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">Updated: {referral.statusDate}</p>
                {referral.qrCode && (
                  <Button variant="outline" size="sm">
                    View QR Code
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
