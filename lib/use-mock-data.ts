"use client"

import { useAuth } from "@/lib/auth-context"
import { mockReferrals, mockPatients, mockHospitals, getMockPatientById } from "@/lib/mock-data"

export function useMockData() {
  const { user } = useAuth()

  return {
    getReferralsForRole: () => {
      if (!user) return []

      switch (user.role) {
        case "system-admin":
          return mockReferrals // System admin sees all referrals

        case "hospital-admin":
          // Hospital admin sees only referrals for their facility
          return mockReferrals.filter((ref) => ref.toFacility === user.facility || ref.fromFacility === user.facility)

        case "liaison":
          // Liaison sees incoming and outgoing referrals for their facility
          return mockReferrals.filter((ref) => ref.toFacility === user.facility || ref.fromFacility === user.facility)

        case "doctor":
          // Doctor sees only their own referrals
          return mockReferrals // In real app, filtered by user

        default:
          return []
      }
    },

    getPatientsForRole: () => {
      // In real app, would filter by doctor assignment
      return mockPatients
    },

    getHospitals: () => mockHospitals,

    getPatientById: (patientId: string) => getMockPatientById(patientId),
  }
}
