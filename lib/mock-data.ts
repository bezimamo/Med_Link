export interface User {
  id: string
  email: string
  role: "system-admin" | "hospital-admin" | "liaison" | "doctor"
  name: string
  facility?: string
}

export interface Patient {
  id: string
  name: string
  age: number
  gender: "Male" | "Female"
  contact: string
  conditions: string[]
}

export interface Referral {
  id: string
  patientId: string
  patientName: string
  fromFacility: string
  toFacility: string
  priority: "Routine" | "Urgent" | "Emergency"
  status: "Pending" | "Approved" | "Rejected" | "Completed"
  date: string
  clinicalNotes: string
}

export interface Hospital {
  id: string
  name: string
  level: string
  location: string
  services: number
}

export const mockUsers: Record<string, User> = {
  "system-admin@moh.gov": {
    id: "sa-001",
    email: "system-admin@moh.gov",
    role: "system-admin",
    name: "Dr. Minister of Health",
    facility: "Ministry of Health",
  },
  "admin@hospital.com": {
    id: "ha-001",
    email: "admin@hospital.com",
    role: "hospital-admin",
    name: "Mr. Hospital Admin",
    facility: "Regional Medical Center",
  },
  "liaison@hospital.com": {
    id: "lo-001",
    email: "liaison@hospital.com",
    role: "liaison",
    name: "Ms. Liaison Officer",
    facility: "Regional Medical Center",
  },
  "doctor@hospital.com": {
    id: "doc-001",
    email: "doctor@hospital.com",
    role: "doctor",
    name: "Dr. James Wilson",
    facility: "Regional Medical Center",
  },
}

export const mockPatients: Patient[] = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1234567890",
    conditions: ["Diabetes", "Hypertension"],
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "+1234567891",
    conditions: ["Asthma"],
  },
  {
    id: "P003",
    name: "Robert Brown",
    age: 58,
    gender: "Male",
    contact: "+1234567892",
    conditions: ["Heart Disease", "Diabetes"],
  },
  {
    id: "P004",
    name: "Maria Garcia",
    age: 28,
    gender: "Female",
    contact: "+1234567893",
    conditions: ["Pregnancy Related"],
  },
  {
    id: "P005",
    name: "David Lee",
    age: 72,
    gender: "Male",
    contact: "+1234567894",
    conditions: ["Hypertension", "Kidney Disease"],
  },
]

export const mockReferrals: Referral[] = [
  {
    id: "REF001",
    patientId: "P001",
    patientName: "John Doe",
    fromFacility: "Health Center A",
    toFacility: "Regional Medical Center",
    priority: "Emergency",
    status: "Approved",
    date: "2024-01-15",
    clinicalNotes: "Acute cardiac symptoms, requires cardiology evaluation",
  },
  {
    id: "REF002",
    patientId: "P002",
    patientName: "Jane Smith",
    fromFacility: "Clinic B",
    toFacility: "District Hospital",
    priority: "Urgent",
    status: "Pending",
    date: "2024-01-14",
    clinicalNotes: "Post-operative complications, needs surgical review",
  },
  {
    id: "REF003",
    patientId: "P003",
    patientName: "Robert Brown",
    fromFacility: "Health Center C",
    toFacility: "Specialist Clinic",
    priority: "Routine",
    status: "Completed",
    date: "2024-01-13",
    clinicalNotes: "Follow-up consultation for chronic disease management",
  },
  {
    id: "REF004",
    patientId: "P004",
    patientName: "Maria Garcia",
    fromFacility: "Clinic D",
    toFacility: "Maternity Hospital",
    priority: "Urgent",
    status: "Approved",
    date: "2024-01-12",
    clinicalNotes: "Obstetric complication, requires specialist care",
  },
]

export const mockHospitals: Hospital[] = [
  {
    id: "H001",
    name: "Regional Medical Center",
    level: "Tertiary",
    location: "Capital City",
    services: 15,
  },
  {
    id: "H002",
    name: "District Hospital A",
    level: "Secondary",
    location: "District A",
    services: 10,
  },
  {
    id: "H003",
    name: "District Hospital B",
    level: "Secondary",
    location: "District B",
    services: 10,
  },
  {
    id: "H004",
    name: "Health Center X",
    level: "Primary",
    location: "Sub-district",
    services: 3,
  },
  {
    id: "H005",
    name: "Specialist Clinic",
    level: "Specialized",
    location: "Capital City",
    services: 5,
  },
]

export function getMockUserByEmail(email: string): User | undefined {
  return mockUsers[email]
}

export function getMockPatientById(patientId: string): Patient | undefined {
  return mockPatients.find((p) => p.id === patientId)
}

export function getMockReferralsByFacility(facility: string): Referral[] {
  return mockReferrals.filter((ref) => ref.toFacility === facility || ref.fromFacility === facility)
}
