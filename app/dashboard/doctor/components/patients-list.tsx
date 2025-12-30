"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Eye } from "lucide-react"

const mockPatients = [
  {
    id: "P001",
    name: "John Doe",
    age: 45,
    gender: "Male",
    contact: "+1234567890",
    lastVisit: "2024-01-10",
    status: "Active",
    conditions: ["Diabetes", "Hypertension"],
  },
  {
    id: "P002",
    name: "Jane Smith",
    age: 32,
    gender: "Female",
    contact: "+1234567891",
    lastVisit: "2024-01-12",
    status: "Active",
    conditions: ["Asthma"],
  },
  {
    id: "P003",
    name: "Robert Brown",
    age: 58,
    gender: "Male",
    contact: "+1234567892",
    lastVisit: "2024-01-08",
    status: "Inactive",
    conditions: ["Heart Disease", "Diabetes"],
  },
]

export function PatientsList() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Patient Management</h2>
          <p className="text-sm text-muted-foreground">View and manage your patients</p>
        </div>
        <Button className="bg-cyan-600 hover:bg-cyan-700 gap-2">
          <Plus className="w-4 h-4" />
          Register Patient
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Patients</CardTitle>
          <CardDescription>All registered patients</CardDescription>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name or ID" className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Age / Gender</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Conditions</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Last Visit</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockPatients.map((patient) => (
                  <tr key={patient.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{patient.name}</td>
                    <td className="py-3 px-4 text-sm">
                      {patient.age} / {patient.gender}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex gap-1 flex-wrap">
                        {patient.conditions.map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{patient.lastVisit}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          patient.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
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
