"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ChevronLeft, Download } from "lucide-react"

interface ApprovalFormProps {
  referralId: string | null
  onBack: () => void
}

export function ApprovalForm({ referralId, onBack }: ApprovalFormProps) {
  const [notes, setNotes] = useState("")
  const [isApproving, setIsApproving] = useState(false)

  // Mock referral data
  const referralData = {
    id: "IN001",
    patientName: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1234567890",
    from: "Health Center A",
    condition: "Acute cardiac symptoms",
    priority: "Emergency",
    clinicalNotes: "Patient presenting with chest pain, shortness of breath for 2 hours...",
    attachedDocuments: ["ECG Report", "Blood Test Results"],
    receivingDepartment: "Cardiology",
    urgency: "Immediate admission required",
  }

  const handleApprove = async () => {
    setIsApproving(true)
    // Simulate API call
    setTimeout(() => {
      alert("Referral approved and facility notified!")
      setIsApproving(false)
      onBack()
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <Button variant="ghost" className="gap-2" onClick={onBack}>
        <ChevronLeft className="w-4 h-4" />
        Back to Referrals
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Info */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Patient Name</p>
                <p className="font-medium">{referralData.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Age / Gender</p>
                <p className="font-medium">
                  {referralData.age} / {referralData.gender}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact</p>
                <p className="font-medium">{referralData.contact}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">From Facility</p>
                <p className="font-medium">{referralData.from}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-xs text-muted-foreground mb-2">Chief Complaint</p>
              <p className="font-medium text-sm">{referralData.condition}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Clinical Notes</p>
              <p className="text-sm bg-muted p-3 rounded-md">{referralData.clinicalNotes}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Attached Documents</p>
              <div className="space-y-2">
                {referralData.attachedDocuments.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded hover:bg-muted/80">
                    <span className="text-sm">{doc}</span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Approval Card */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Approval Action</CardTitle>
            <CardDescription>Review and approve this referral</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Priority</p>
              <Badge className="bg-red-100 text-red-800 w-full justify-center py-2">{referralData.priority}</Badge>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Receiving Department</p>
              <p className="font-medium text-sm">{referralData.receivingDepartment}</p>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Urgency Status</p>
              <p className="text-sm bg-orange-50 p-2 rounded border border-orange-200 text-orange-900">
                {referralData.urgency}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-muted-foreground">Approval Notes (Optional)</label>
              <Textarea
                placeholder="Add notes about this approval..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="h-24"
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={handleApprove} disabled={isApproving}>
                {isApproving ? "Approving..." : "Approve"}
              </Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
