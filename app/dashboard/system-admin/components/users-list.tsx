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

type UserRole = "system-admin" | "hospital-admin" | "liaison" | "doctor"

const systemAdminUsers = [
  {
    id: "sa-001",
    name: "Dr. Minister of Health",
    email: "system-admin@moh.gov",
    role: "System Admin",
    facility: "Ministry of Health",
    status: "Active",
  },
  {
    id: "ha-001",
    name: "Mr. Hospital Admin",
    email: "admin@hospital.com",
    role: "Hospital Admin",
    facility: "Regional Medical Center",
    status: "Active",
  },
  {
    id: "ha-002",
    name: "Ms. Hospital Admin 2",
    email: "admin2@hospital.com",
    role: "Hospital Admin",
    facility: "District Hospital A",
    status: "Active",
  },
  {
    id: "ha-003",
    name: "Dr. Admin 3",
    email: "admin3@hospital.com",
    role: "Hospital Admin",
    facility: "District Hospital B",
    status: "Inactive",
  },
  {
    id: "lo-001",
    name: "Ms. Liaison Officer",
    email: "liaison@hospital.com",
    role: "Liaison Officer",
    facility: "Regional Medical Center",
    status: "Active",
  },
  {
    id: "doc-001",
    name: "Dr. James Wilson",
    email: "doctor@hospital.com",
    role: "Doctor",
    facility: "Regional Medical Center",
    status: "Active",
  },
]

export function UsersList() {
  const [users, setUsers] = useState(systemAdminUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "hospital-admin" as UserRole,
    facility: "",
  })

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.facility.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddUser = () => {
    if (formData.name && formData.email && formData.facility) {
      const newUser = {
        id: `u-${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role:
          formData.role === "system-admin"
            ? "System Admin"
            : formData.role === "hospital-admin"
              ? "Hospital Admin"
              : formData.role === "liaison"
                ? "Liaison Officer"
                : "Doctor",
        facility: formData.facility,
        status: "Active",
      }
      setUsers([...users, newUser])
      setFormData({ name: "", email: "", role: "hospital-admin", facility: "" })
      setIsOpen(false)
    }
  }

  const handleDeleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const getRoleColor = (role: string) => {
    if (role === "System Admin") return "bg-red-100 text-red-800"
    if (role === "Hospital Admin") return "bg-blue-100 text-blue-800"
    if (role === "Liaison Officer") return "bg-purple-100 text-purple-800"
    if (role === "Doctor") return "bg-green-100 text-green-800"
    return "bg-gray-100 text-gray-800"
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">User Management</h2>
          <p className="text-sm text-muted-foreground">Manage all system users and their roles</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>Add a new user to the system with the appropriate role</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                >
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hospital-admin">Hospital Admin</SelectItem>
                    <SelectItem value="liaison">Liaison Officer</SelectItem>
                    <SelectItem value="doctor">Doctor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="facility">Facility</Label>
                <Input
                  id="facility"
                  placeholder="Enter facility name"
                  value={formData.facility}
                  onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
                />
              </div>
              <Button onClick={handleAddUser} className="w-full bg-blue-600 hover:bg-blue-700">
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Users</CardTitle>
          <CardDescription>All users across the healthcare system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or facility..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Facility</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm font-medium">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getRoleColor(user.role)} text-xs`}>{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.facility}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getStatusColor(user.status)} text-xs`}>{user.status}</Badge>
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
                          onClick={() => handleDeleteUser(user.id)}
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
