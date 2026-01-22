"use client"

import { useState, useEffect } from "react"
import { apiClient } from "@/lib/api-client1"
import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, UserPlus, Save, Send, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Patient {
  _id: string
  fullName: string
  phone: string
  sex: "Male" | "Female"
  dateOfBirth: string
  nationalId?: string
  address?: string
}

export function CreateReferral() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [searchType, setSearchType] = useState<"phone" | "nationalId" | "fullName">("phone")
  const [searching, setSearching] = useState(false)
  const [foundPatient, setFoundPatient] = useState<Patient | null>(null)
  const [showPatientForm, setShowPatientForm] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSavingDraft, setIsSavingDraft] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // Patient form data
  const [patientData, setPatientData] = useState({
    fullName: "",
    sex: "Male" as "Male" | "Female",
    dateOfBirth: "",
    phone: "",
    nationalId: "",
    address: "",
  })

  // Referral form data
  const [referralData, setReferralData] = useState({
    toHospital: "",
    urgency: "ROUTINE" as "ROUTINE" | "URGENT" | "EMERGENCY",
    reasonForReferral: "",
    clinicalNotes: "",
    requiredSpecialty: "",
    requiredBedType: "",
  })

  const [hospitals, setHospitals] = useState<Array<{ _id: string; name: string }>>([])

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await apiClient.getHospitals()
        const hospitalData = response.data || response
        const hospitalsList = Array.isArray(hospitalData) ? hospitalData : []
        setHospitals(hospitalsList)
      } catch (err) {
        console.error("Error fetching hospitals:", err)
      }
    }
    fetchHospitals()
  }, [])

  const handleSearchPatient = async () => {
    if (!searchQuery.trim()) {
      setError("Please enter a search query")
      return
    }

    setSearching(true)
    setError("")
    setFoundPatient(null)

    try {
      const searchParams: any = {}
      if (searchType === "phone") {
        searchParams.phone = searchQuery
      } else if (searchType === "nationalId") {
        searchParams.nationalId = searchQuery
      } else {
        searchParams.fullName = searchQuery
      }

      const response = await apiClient.searchPatients(searchParams)
      const patients = response.data || response

      if (Array.isArray(patients) && patients.length > 0) {
        const patient = patients[0]
        setFoundPatient(patient)
        setPatientData({
          fullName: patient.fullName,
          sex: patient.sex,
          dateOfBirth: patient.dateOfBirth ? new Date(patient.dateOfBirth).toISOString().split("T")[0] : "",
          phone: patient.phone,
          nationalId: patient.nationalId || "",
          address: patient.address || "",
        })
        setShowPatientForm(false)
      } else {
        setFoundPatient(null)
        setShowPatientForm(true)
        // Pre-fill with search query if searching by phone
        if (searchType === "phone") {
          setPatientData((prev) => ({ ...prev, phone: searchQuery }))
        }
      }
    } catch (err: any) {
      console.error("Error searching patient:", err)
      setError("Failed to search patient. You can register a new patient below.")
      setShowPatientForm(true)
    } finally {
      setSearching(false)
    }
  }

  const handleRegisterPatient = async () => {
    if (!patientData.fullName || !patientData.phone || !patientData.dateOfBirth) {
      setError("Please fill in all required patient fields (Name, Phone, Date of Birth)")
      return
    }

    try {
      setError("")
      const newPatient = await apiClient.findOrCreatePatient({
        fullName: patientData.fullName,
        sex: patientData.sex,
        dateOfBirth: patientData.dateOfBirth,
        phone: patientData.phone,
        nationalId: patientData.nationalId || undefined,
        address: patientData.address || undefined,
      })

      const patient = newPatient.data || newPatient
      setFoundPatient(patient)
      setShowPatientForm(false)
      setSuccess("Patient registered successfully")
    } catch (err: any) {
      setError(err.message || "Failed to register patient")
    }
  }

  const handleSaveDraft = async () => {
    if (!user?.hospitalId) {
      setError("Hospital ID not found. Please log in again.")
      return
    }

    if (!patientData.fullName || !patientData.phone || !referralData.reasonForReferral) {
      setError("Please fill in all required fields")
      return
    }

    setIsSavingDraft(true)
    setError("")
    setSuccess("")

    try {
      const referralPayload: any = {
        fromHospital: user.hospitalId,
        doctorName: user.name || user.email,
        patientName: patientData.fullName,
        patientPhone: patientData.phone,
        urgency: referralData.urgency,
        reasonForReferral: referralData.reasonForReferral,
        clinicalNotes: referralData.clinicalNotes || undefined,
        requiredSpecialty: referralData.requiredSpecialty || undefined,
        requiredBedType: referralData.requiredBedType || undefined,
      }

      if (foundPatient?._id) {
        referralPayload.patientId = foundPatient._id
      } else {
        referralPayload.patient = {
          fullName: patientData.fullName,
          sex: patientData.sex,
          dateOfBirth: patientData.dateOfBirth,
          phone: patientData.phone,
          nationalId: patientData.nationalId || undefined,
          address: patientData.address || undefined,
        }
      }

      if (referralData.toHospital) {
        referralPayload.toHospital = referralData.toHospital
      }

      await apiClient.createReferral(referralPayload)
      setSuccess("Referral saved as draft successfully!")
      
      // Reset form
      setTimeout(() => {
        setFoundPatient(null)
        setShowPatientForm(false)
        setPatientData({
          fullName: "",
          sex: "Male",
          dateOfBirth: "",
          phone: "",
          nationalId: "",
          address: "",
        })
        setReferralData({
          toHospital: "",
          urgency: "ROUTINE",
          reasonForReferral: "",
          clinicalNotes: "",
          requiredSpecialty: "",
          requiredBedType: "",
        })
        setSearchQuery("")
        setSuccess("")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to save draft")
    } finally {
      setIsSavingDraft(false)
    }
  }

  const handleSubmitReferral = async () => {
    if (!user?.hospitalId) {
      setError("Hospital ID not found. Please log in again.")
      return
    }

    if (!patientData.fullName || !patientData.phone || !referralData.reasonForReferral || !referralData.toHospital) {
      setError("Please fill in all required fields including target hospital")
      return
    }

    setIsSubmitting(true)
    setError("")
    setSuccess("")

    try {
      // Ensure we have a patient (either found or need to create one)
      let patientId = foundPatient?._id
      
      // If no patient found, we need to create/register the patient first
      if (!patientId) {
        if (!patientData.fullName || !patientData.phone || !patientData.dateOfBirth) {
          setError("Please register the patient first or search for an existing patient")
          setIsSubmitting(false)
          return
        }
        
        try {
          const newPatient = await apiClient.findOrCreatePatient({
            fullName: patientData.fullName,
            sex: patientData.sex,
            dateOfBirth: patientData.dateOfBirth,
            phone: patientData.phone,
            nationalId: patientData.nationalId || undefined,
            address: patientData.address || undefined,
          })
          patientId = newPatient._id || newPatient.data?._id
          if (!patientId) {
            throw new Error("Failed to create patient. No patient ID returned.")
          }
        } catch (patientErr: any) {
          console.error("Error creating patient:", patientErr)
          setError(patientErr.message || "Failed to register patient. Please try again.")
          setIsSubmitting(false)
          return
        }
      }

      // Create referral WITHOUT toHospital first (will be saved as DRAFT)
      const referralPayload: any = {
        fromHospital: user.hospitalId,
        doctorName: user.name || user.email,
        patientId: patientId, // Always use patientId if we have it
        patientName: patientData.fullName,
        patientPhone: patientData.phone,
        urgency: referralData.urgency,
        reasonForReferral: referralData.reasonForReferral,
        clinicalNotes: referralData.clinicalNotes || undefined,
        requiredSpecialty: referralData.requiredSpecialty || undefined,
        requiredBedType: referralData.requiredBedType || undefined,
      }

      // Add createdBy if user.id is available
      if (user?.id) {
        referralPayload.createdBy = user.id
      }

      console.log("[CreateReferral] Creating referral with payload:", referralPayload)

      // Create referral as DRAFT first
      const referral = await apiClient.createReferral(referralPayload)
      const referralId = referral._id || referral.data?._id

      if (!referralId) {
        console.error("[CreateReferral] Referral response:", referral)
        throw new Error("Failed to create referral. No referral ID returned.")
      }

      console.log("[CreateReferral] Referral created with ID:", referralId)

      // Now send the referral to the liaison officer with the target hospital
      await apiClient.sendReferral(referralId, referralData.toHospital)

      setSuccess("Referral submitted successfully!")
      
      // Reset form
      setTimeout(() => {
        setFoundPatient(null)
        setShowPatientForm(false)
        setPatientData({
          fullName: "",
          sex: "Male",
          dateOfBirth: "",
          phone: "",
          nationalId: "",
          address: "",
        })
        setReferralData({
          toHospital: "",
          urgency: "ROUTINE",
          reasonForReferral: "",
          clinicalNotes: "",
          requiredSpecialty: "",
          requiredBedType: "",
        })
        setSearchQuery("")
        setSuccess("")
      }, 2000)
    } catch (err: any) {
      console.error("Error submitting referral:", err)
      setError(err.message || "Failed to submit referral")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Create Referral</h2>
        <p className="text-muted-foreground">Register a patient and create a referral</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="bg-green-50 border-green-200 text-green-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      {/* Patient Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
          <CardDescription>Search for existing patient or register a new one</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Select value={searchType} onValueChange={(value: any) => setSearchType(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="nationalId">National ID</SelectItem>
                <SelectItem value="fullName">Name</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder={`Search by ${searchType === "phone" ? "phone number" : searchType === "nationalId" ? "national ID" : "name"}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchPatient()}
            />
            <Button onClick={handleSearchPatient} disabled={searching}>
              <Search className="w-4 h-4 mr-2" />
              {searching ? "Searching..." : "Search"}
            </Button>
          </div>

          {foundPatient && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                ✓ Patient found: {foundPatient.fullName} ({foundPatient.phone})
              </p>
            </div>
          )}

          {/* Patient Registration Form */}
          {showPatientForm && (
            <div className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold">Register New Patient</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={patientData.fullName}
                    onChange={(e) => setPatientData({ ...patientData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sex">Gender *</Label>
                  <Select
                    value={patientData.sex}
                    onValueChange={(value: "Male" | "Female") => setPatientData({ ...patientData, sex: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={patientData.dateOfBirth}
                    onChange={(e) => setPatientData({ ...patientData, dateOfBirth: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nationalId">National ID (Optional)</Label>
                  <Input
                    id="nationalId"
                    value={patientData.nationalId}
                    onChange={(e) => setPatientData({ ...patientData, nationalId: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input
                    id="address"
                    value={patientData.address}
                    onChange={(e) => setPatientData({ ...patientData, address: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleRegisterPatient} variant="outline">
                <UserPlus className="w-4 h-4 mr-2" />
                Register Patient
              </Button>
            </div>
          )}

          {/* Manual Patient Entry (if not found and not showing form) */}
          {!foundPatient && !showPatientForm && (
            <Button
              variant="outline"
              onClick={() => setShowPatientForm(true)}
              className="w-full"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Register New Patient
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Referral Details Section */}
      <Card>
        <CardHeader>
          <CardTitle>Referral Details</CardTitle>
          <CardDescription>Provide referral information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="toHospital">Target Hospital *</Label>
              <Select
                value={referralData.toHospital}
                onValueChange={(value) => setReferralData({ ...referralData, toHospital: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select target hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital._id} value={hospital._id}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency">Urgency Level *</Label>
              <Select
                value={referralData.urgency}
                onValueChange={(value: any) => setReferralData({ ...referralData, urgency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ROUTINE">Routine</SelectItem>
                  <SelectItem value="URGENT">Urgent</SelectItem>
                  <SelectItem value="EMERGENCY">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonForReferral">Reason for Referral *</Label>
            <Textarea
              id="reasonForReferral"
              placeholder="Describe the reason for referral..."
              value={referralData.reasonForReferral}
              onChange={(e) => setReferralData({ ...referralData, reasonForReferral: e.target.value })}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="clinicalNotes">Clinical Notes (Optional)</Label>
            <Textarea
              id="clinicalNotes"
              placeholder="Add any additional clinical notes..."
              value={referralData.clinicalNotes}
              onChange={(e) => setReferralData({ ...referralData, clinicalNotes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="requiredSpecialty">Required Specialty (Optional)</Label>
              <Input
                id="requiredSpecialty"
                placeholder="e.g., Cardiology, Neurology"
                value={referralData.requiredSpecialty}
                onChange={(e) => setReferralData({ ...referralData, requiredSpecialty: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requiredBedType">Required Bed Type (Optional)</Label>
              <Input
                id="requiredBedType"
                placeholder="e.g., ICU, General Ward"
                value={referralData.requiredBedType}
                onChange={(e) => setReferralData({ ...referralData, requiredBedType: e.target.value })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={handleSaveDraft}
          disabled={isSavingDraft || isSubmitting}
          variant="outline"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSavingDraft ? "Saving..." : "Save as Draft"}
        </Button>
        <Button
          onClick={handleSubmitReferral}
          disabled={isSubmitting || isSavingDraft}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "Submitting..." : "Submit to Liaison Officer"}
        </Button>
      </div>
    </div>
  )
}
