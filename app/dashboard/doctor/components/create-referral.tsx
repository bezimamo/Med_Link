"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

export function CreateReferral() {
  const [formData, setFormData] = useState({
    patientId: "",
    receivingHospital: "",
    department: "",
    priority: "routine",
    clinicalNotes: "",
    attachments: [] as string[],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    setTimeout(() => {
      alert("Referral submitted successfully! It will be reviewed by the liaison officer.")
      setIsSubmitting(false)
      setFormData({
        patientId: "",
        receivingHospital: "",
        department: "",
        priority: "routine",
        clinicalNotes: "",
        attachments: [],
      })
    }, 1000)
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold">Create Referral</h2>
        <p className="text-sm text-muted-foreground">Submit a patient referral to another facility</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">New Referral Form</CardTitle>
          <CardDescription>Fill in the details and clinical information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Patient Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Patient ID / Name</label>
                  <Input
                    placeholder="Select or search patient"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Referral Details */}
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-sm">Referral Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Receiving Hospital</label>
                  <Input
                    placeholder="Select receiving facility"
                    value={formData.receivingHospital}
                    onChange={(e) => setFormData({ ...formData, receivingHospital: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Department / Service</label>
                  <Input
                    placeholder="Select department"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-input rounded-md bg-background"
                  >
                    <option value="routine">Routine</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Clinical Information */}
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-sm">Clinical Information</h3>
              <div>
                <label className="text-sm font-medium">Clinical Notes & History</label>
                <Textarea
                  placeholder="Provide clinical details, diagnosis, treatment history, lab results..."
                  value={formData.clinicalNotes}
                  onChange={(e) => setFormData({ ...formData, clinicalNotes: e.target.value })}
                  className="h-32"
                  required
                />
              </div>
            </div>

            {/* Attachments */}
            <div className="space-y-3 border-t pt-4">
              <h3 className="font-semibold text-sm">Attachments (Optional)</h3>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Attach medical documents</p>
                <Button type="button" variant="outline" className="text-xs bg-transparent">
                  Upload Files
                </Button>
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 border-t pt-4">
              <Button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Referral"}
              </Button>
              <Button type="button" variant="outline" className="flex-1 bg-transparent">
                Save as Draft
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
