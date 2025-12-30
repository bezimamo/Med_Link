"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2, Search } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Facility {
  id: string
  name: string
  level: string
  location: string
  services: number
  status: string
}

const facilityData: Facility[] = [
  {
    id: "H001",
    name: "Regional Medical Center",
    level: "Tertiary",
    location: "Capital City",
    services: 15,
    status: "Active",
  },
  {
    id: "H002",
    name: "District Hospital A",
    level: "Secondary",
    location: "District A",
    services: 10,
    status: "Active",
  },
  {
    id: "H003",
    name: "District Hospital B",
    level: "Secondary",
    location: "District B",
    services: 10,
    status: "Active",
  },
  {
    id: "H004",
    name: "Health Center X",
    level: "Primary",
    location: "Sub-district",
    services: 3,
    status: "Active",
  },
  {
    id: "H005",
    name: "Specialist Clinic",
    level: "Specialized",
    location: "Capital City",
    services: 5,
    status: "Inactive",
  },
  {
    id: "H006",
    name: "Emergency Response Center",
    level: "Specialized",
    location: "Capital City",
    services: 8,
    status: "Active",
  },
]

export function FacilitiesList() {
  const [facilities, setFacilities] = useState<Facility[]>(facilityData)
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    level: "Primary",
    location: "",
    services: "1",
  })

  const filteredFacilities = facilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddFacility = () => {
    if (formData.name && formData.location) {
      const newFacility: Facility = {
        id: `H${Date.now()}`,
        name: formData.name,
        level: formData.level,
        location: formData.location,
        services: Number.parseInt(formData.services),
        status: "Active",
      }
      setFacilities([...facilities, newFacility])
      setFormData({ name: "", level: "Primary", location: "", services: "1" })
      setIsOpen(false)
    }
  }

  const handleDeleteFacility = (id: string) => {
    setFacilities(facilities.filter((f) => f.id !== id))
  }

  const getLevelColor = (level: string) => {
    if (level === "Tertiary") return "bg-blue-100 text-blue-800"
    if (level === "Secondary") return "bg-purple-100 text-purple-800"
    if (level === "Primary") return "bg-green-100 text-green-800"
    if (level === "Specialized") return "bg-orange-100 text-orange-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Facility Management</h2>
          <p className="text-sm text-muted-foreground">Manage all hospitals and healthcare facilities</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Facility
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Facility</DialogTitle>
              <DialogDescription>Add a new healthcare facility to the system</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="facility-name">Facility Name</Label>
                <Input
                  id="facility-name"
                  placeholder="Enter facility name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="facility-level">Facility Level</Label>
                <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                  <SelectTrigger id="facility-level">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary">Primary Health Center</SelectItem>
                    <SelectItem value="Secondary">Secondary Hospital</SelectItem>
                    <SelectItem value="Tertiary">Tertiary Hospital</SelectItem>
                    <SelectItem value="Specialized">Specialized Clinic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="facility-location">Location</Label>
                <Input
                  id="facility-location"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="facility-services">Number of Services</Label>
                <Input
                  id="facility-services"
                  type="number"
                  placeholder="Enter number of services"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                />
              </div>
              <Button onClick={handleAddFacility} className="w-full bg-blue-600 hover:bg-blue-700">
                Create Facility
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Facilities</CardTitle>
          <CardDescription>Healthcare facilities in the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by facility name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Facility Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Level</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Location</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Services</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFacilities.map((facility) => (
                  <tr key={facility.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{facility.name}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getLevelColor(facility.level)} text-xs`}>{facility.level}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{facility.location}</td>
                    <td className="py-3 px-4 text-sm">{facility.services}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(facility.status)} text-xs`}>{facility.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteFacility(facility.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
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
