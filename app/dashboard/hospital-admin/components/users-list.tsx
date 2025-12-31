"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { useState, useEffect } from "react"
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
import { useAuth } from "@/lib/auth-context"
import { userApi } from "@/lib/api-client"

interface User {
  _id?: string
  id?: string
  fullName: string
  email: string
  role: string
  hospitalId?: string
  department?: string
  status?: string
  isActive?: boolean
}

export function UsersList() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "DOCTOR",
    department: "General",
  })

  useEffect(() => {
    const fetchUsers = async () => {
      if (!user?.token) {
        console.log("[UsersList] Missing token")
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        // ✅ FIXED: Only pass token, not hospitalId
        const response = await userApi.getUsers(user.token)
        console.log("[UsersList] API response:", response)

        if (response.success && response.data) {
          // Filter to show only DOCTOR and LIAISON_OFFICER users
          const filteredUsers = Array.isArray(response.data)
             ? response.data
            : []
            console.log("[DEBUG] Raw response data:", response.data)
console.log("[DEBUG] Number of users:", response.data?.length || 0)

if (Array.isArray(response.data)) {
  response.data.forEach((u, i) => {
    console.log(`User ${i}:`, {
      id: u._id,
      name: u.fullName,
      email: u.email,
      role: u.role,
      hospitalId: u.hospitalId,
      isActive: u.isActive
    })
  })
}
          
          const formattedUsers = filteredUsers.map((u: any) => ({
            _id: u._id,
            id: u._id,
            fullName: u.fullName,
            email: u.email,
            role: u.role === "DOCTOR" ? "Doctor" : 
                  u.role === "LIAISON_OFFICER" ? "Liaison Officer" : u.role,
            department: u.department || "General",
            status: u.isActive ? "Active" : "Inactive",
            isActive: u.isActive
          }))
          
          setUsers(formattedUsers)
          setError("")
        } else {
          setError(response.error || "Failed to fetch users")
          setUsers([])
        }
      } catch (err) {
        console.error("[UsersList] Error fetching users:", err)
        setError("Failed to fetch users")
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [user?.token]) // Only depend on token

  const handleAddUser = async () => {
    if (!formData.fullName || !formData.email || !formData.password || !user?.token) {
      setError("Please fill in all fields")
      return
    }

    try {
      setIsSubmitting(true)
      setError("")

      const createData = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role, // "DOCTOR" or "LIAISON_OFFICER"
        
      }

      console.log("[UsersList] Creating user:", createData)
      const response = await userApi.createUser(createData, user.token)

      if (response.success && response.data) {
        const newUser: User = {
          _id: response.data._id,
          id: response.data._id,
          fullName: response.data.fullName,
          email: response.data.email,
          role: response.data.role === "DOCTOR" ? "Doctor" : "Liaison Officer",
          department: response.data.department || "General",
          status: response.data.isActive ? "Active" : "Inactive",
        }
        setUsers([...users, newUser])
        setFormData({ fullName: "", email: "", password: "", role: "DOCTOR", department: "General" })
        setIsOpen(false)
      } else {
        setError(response.error || "Failed to create user")
      }
    } catch (err) {
      console.error("[UsersList] Error creating user:", err)
      setError("Failed to create user")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    if (!user?.token) return

    try {
      setError("")
      const response = await userApi.deleteUser(userId, user.token)

      if (response.success) {
        setUsers(users.filter((u) => u._id !== userId))
      } else {
        setError(response.error || "Failed to delete user")
      }
    } catch (err) {
      console.error("[UsersList] Error deleting user:", err)
      setError("Failed to delete user")
    }
  }

  const handleUpdateUser = async (userId: string, updates: Partial<User>) => {
    if (!user?.token) return

    try {
      setError("")
      const response = await userApi.updateUser(userId, updates, user.token)

      if (response.success && response.data) {
        setUsers(users.map(u => 
          u._id === userId 
            ? { 
                ...u, 
                ...updates,
                status: updates.isActive !== undefined 
                  ? updates.isActive ? "Active" : "Inactive" 
                  : u.status 
              }
            : u
        ))
      } else {
        setError(response.error || "Failed to update user")
      }
    } catch (err) {
      console.error("[UsersList] Error updating user:", err)
      setError("Failed to update user")
    }
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
              {error && <div className="p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">{error}</div>}
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter full name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DOCTOR">Doctor</SelectItem>
                    <SelectItem value="LIAISON_OFFICER">Liaison Officer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleAddUser}
                className="w-full bg-green-600 hover:bg-green-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating..." : "Add User"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hospital Staff</CardTitle>
          <CardDescription>All doctors and liaison officers in your facility</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading users...</p>
            </div>
          ) : error && !users.length ? (
            <div className="text-center py-8">
              <p className="text-red-600">{error}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No users found. Add your first user to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((userItem) => (
                    <tr key={userItem._id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{userItem.fullName}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{userItem.email}</td>
                      <td className="py-3 px-4">
                        <Badge className={`${getRoleColor(userItem.role)} text-xs`}>{userItem.role}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={`${getStatusColor(userItem.status || "Active")} text-xs`}>
                          {userItem.status || "Active"}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => {
                              // Toggle active status
                              const newStatus = !userItem.isActive
                              handleUpdateUser(userItem._id!, { isActive: newStatus })
                            }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                            onClick={() => {
                              if (userItem._id) {
                                handleDeleteUser(userItem._id)
                              }
                            }}
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}