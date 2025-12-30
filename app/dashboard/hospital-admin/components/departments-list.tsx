"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2 } from "lucide-react"
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

interface Department {
  id: number
  name: string
  shortCode: string
  services: number
  status: string
}

const mockDepartments: Department[] = [
  { id: 1, name: "Emergency", shortCode: "EM", services: 8, status: "Open" },
  { id: 2, name: "ICU", shortCode: "ICU", services: 5, status: "Open" },
  { id: 3, name: "Surgery", shortCode: "SUR", services: 6, status: "Open" },
  { id: 4, name: "Pediatrics", shortCode: "PED", services: 4, status: "Open" },
  { id: 5, name: "Cardiology", shortCode: "CAR", services: 3, status: "Closed" },
]

export function DepartmentsList() {
  const [departments, setDepartments] = useState(mockDepartments)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    shortCode: "",
    services: "1",
    status: "Open",
  })

  const handleAddDepartment = () => {
    if (formData.name && formData.shortCode) {
      const newDepartment: Department = {
        id: Math.max(...departments.map((d) => d.id)) + 1,
        name: formData.name,
        shortCode: formData.shortCode.toUpperCase(),
        services: Number.parseInt(formData.services),
        status: formData.status,
      }
      setDepartments([...departments, newDepartment])
      setFormData({ name: "", shortCode: "", services: "1", status: "Open" })
      setIsOpen(false)
    }
  }

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter((dept) => dept.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Departments & Services</h2>
          <p className="text-sm text-muted-foreground">Manage hospital departments and available services</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Plus className="w-4 h-4" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Department</DialogTitle>
              <DialogDescription>Create a new department and configure its services</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="dept-name">Department Name</Label>
                <Input
                  id="dept-name"
                  placeholder="e.g., Emergency, Cardiology"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dept-code">Department Code</Label>
                <Input
                  id="dept-code"
                  placeholder="e.g., EM, CAR"
                  maxLength={3}
                  value={formData.shortCode}
                  onChange={(e) => setFormData({ ...formData, shortCode: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dept-services">Number of Services</Label>
                <Input
                  id="dept-services"
                  type="number"
                  placeholder="Enter number of services"
                  value={formData.services}
                  onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="dept-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger id="dept-status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAddDepartment} className="w-full bg-green-600 hover:bg-green-700">
                Add Department
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hospital Departments</CardTitle>
          <CardDescription>Configure departments and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Code</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Services</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{dept.name}</td>
                    <td className="py-3 px-4 text-sm">
                      <Badge variant="outline">{dept.shortCode}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{dept.services} services</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={dept.status === "Open" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                      >
                        {dept.status}
                      </Badge>
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
                          onClick={() => handleDeleteDepartment(dept.id)}
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
