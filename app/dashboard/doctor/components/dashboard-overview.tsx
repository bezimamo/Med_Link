"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Plus } from "lucide-react"

const stats = [
  { label: "Total Patients", value: "48", change: "+5 this month" },
  { label: "Active Referrals", value: "12", change: "Awaiting response" },
  { label: "Approved Referrals", value: "34", change: "This month" },
  { label: "Rejected Referrals", value: "3", change: "Needs follow-up" },
]

const referralTrends = [
  { week: "Week 1", sent: 8, approved: 6, rejected: 1 },
  { week: "Week 2", sent: 10, approved: 8, rejected: 1 },
  { week: "Week 3", sent: 12, approved: 10, rejected: 1 },
  { week: "Week 4", sent: 9, approved: 7, rejected: 2 },
]

const recentReferrals = [
  { id: "REF001", patientName: "John Doe", status: "Approved", date: "2024-01-15", hospital: "Regional Center" },
  { id: "REF002", patientName: "Jane Smith", status: "Pending", date: "2024-01-14", hospital: "District Hospital" },
  { id: "REF003", patientName: "Robert Brown", status: "Approved", date: "2024-01-13", hospital: "Specialist Clinic" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 border-cyan-200 dark:border-cyan-800"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Action */}
      <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Create a New Referral</CardTitle>
          <CardDescription className="text-cyan-100">
            Refer a patient to a higher-level facility for specialized care
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 gap-2">
            <Plus className="w-4 h-4" />
            New Referral
          </Button>
        </CardContent>
      </Card>

      {/* Referral Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Referral Activity</CardTitle>
          <CardDescription>Last 4 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={referralTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sent" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Referrals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Referrals</CardTitle>
          <CardDescription>Your most recent referral submissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReferrals.map((ref) => (
              <div
                key={ref.id}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50"
              >
                <div>
                  <p className="font-medium text-sm">{ref.patientName}</p>
                  <p className="text-xs text-muted-foreground">{ref.hospital}</p>
                </div>
                <div className="text-right">
                  <Badge
                    className={
                      ref.status === "Approved"
                        ? "bg-green-100 text-green-800"
                        : ref.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : ""
                    }
                  >
                    {ref.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{ref.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
