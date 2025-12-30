"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const stats = [
  { label: "Pending Approvals", value: "23", change: "Requires action", color: "bg-orange-100 text-orange-800" },
  { label: "Approved This Week", value: "45", change: "+12 from last week", color: "bg-green-100 text-green-800" },
  { label: "Rejected", value: "8", change: "Needs review", color: "bg-red-100 text-red-800" },
  { label: "Completed Referrals", value: "156", change: "This month", color: "bg-blue-100 text-blue-800" },
]

const referralTrends = [
  { week: "Week 1", received: 45, approved: 35, rejected: 5 },
  { week: "Week 2", received: 52, approved: 42, rejected: 4 },
  { week: "Week 3", received: 38, approved: 32, rejected: 3 },
  { week: "Week 4", received: 61, approved: 50, rejected: 7 },
]

const turnaroundMetrics = [
  { name: "Emergency", avgTime: "2 hours" },
  { name: "Urgent", avgTime: "8 hours" },
  { name: "Routine", avgTime: "24 hours" },
]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="border-l-4 border-l-purple-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Approval Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Approval Trends</CardTitle>
          <CardDescription>Referrals received and approved</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={referralTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="received" fill="#9333ea" radius={[8, 8, 0, 0]} />
              <Bar dataKey="approved" fill="#10b981" radius={[8, 8, 0, 0]} />
              <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Turnaround Time & Key Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Average Turnaround Time</CardTitle>
            <CardDescription>By priority level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {turnaroundMetrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <span className="font-medium">{metric.name}</span>
                <Badge variant="outline">{metric.avgTime}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Overview</CardTitle>
            <CardDescription>Your approval metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-900">Approval Rate</p>
              <p className="text-2xl font-bold text-green-600">85%</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm font-medium text-blue-900">Avg Response Time</p>
              <p className="text-2xl font-bold text-blue-600">6.5 hrs</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
