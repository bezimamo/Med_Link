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

const mockUsers = [
  {
    id: 1,
    name: "Dr. James Wilson",
    email: "james.wilson@hospital.com",
    role: "Doctor",
    department: "Emergency",
    status: "Active",
  },
  {
    id: 2,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@hospital.com",
    role: "Doctor",
    department: "Surgery",
    status: "Active",
  },
  {
    id: 3,
    name: "Mark Chen",
    email: "mark.chen@hospital.com",
    role: "Liaison Officer",
    department: "Admin",
    status: "Active",
  },
  {
    id: 4,
    name: "Lisa Anderson",
    email: "lisa.anderson@hospital.com",
    role: "Liaison Officer",
    department: "Admin",
    status: "Inactive",
  },
  {
    id: 5,
    name: "Dr. Michael Brown",
    email: "michael.brown@hospital.com",
    role: "Doctor",
    department: "ICU",
    status: "Active",
  },
]

export function UsersList() {
  const [users, setUsers] = useState(mockUsers)
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "Doctor",
    department: "General",
  })

  const handleAddUser = () => {
    if (formData.name && formData.email && formData.department) {
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        department: formData.department,
        status: "Active",
      }
      setUsers([...users, newUser])
      setFormData({ name: "", email: "", role: "Doctor", department: "General" })
      setIsOpen(false)
    }
  }

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const getRoleColor = (role: string) => {
    if (role === "Doctor") return "bg-blue-100 text-blue-800"
    if (role === "Liaison Officer") return "bg-purple-100 text-purple-800"
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
          <p className="text-sm text-muted-foreground">Manage doctors and liaison officers</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700 gap-2">
              <Plus className="w-4 h-4" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>Create a new doctor or liaison officer in your hospital</DialogDescription>
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
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Doctor">Doctor</SelectItem>
                    <SelectItem value="Liaison Officer">Liaison Officer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input
                  id="department"
                  placeholder="Enter department"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                />
              </div>
              <Button onClick={handleAddUser} className="w-full bg-green-600 hover:bg-green-700">
                Add User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hospital Staff</CardTitle>
          <CardDescription>All users in your facility</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Department</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">{user.name}</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge className={`${getRoleColor(user.role)} text-xs`}>{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm">{user.department}</td>
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
