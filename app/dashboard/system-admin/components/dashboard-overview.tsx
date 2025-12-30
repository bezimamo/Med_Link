"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const stats = [
  { label: "Total Facilities", value: "324", change: "+12 this month" },
  { label: "Total Users", value: "2,847", change: "+156 this month" },
  { label: "Active Referrals", value: "1,245", change: "+89 today" },
  { label: "Completed Referrals", value: "8,932", change: "+234 this month" },
]

const referralTrends = [
  { month: "Jan", referrals: 400, completed: 240 },
  { month: "Feb", referrals: 450, completed: 280 },
  { month: "Mar", referrals: 520, completed: 340 },
  { month: "Apr", referrals: 610, completed: 420 },
  { month: "May", referrals: 680, completed: 520 },
  { month: "Jun", referrals: 750, completed: 600 },
]

const facilityUtilization = [
  { name: "General Hospital A", value: 280 },
  { name: "Regional Center B", value: 240 },
  { name: "Specialist Clinic C", value: 180 },
  { name: "Emergency Center D", value: 220 },
  { name: "Others", value: 150 },
]

const referralStatus = [
  { name: "Approved", value: 4500, fill: "#10b981" },
  { name: "Pending", value: 1245, fill: "#f59e0b" },
  { name: "Rejected", value: 800, fill: "#ef4444" },
  { name: "Completed", value: 8932, fill: "#3b82f6" },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6"]

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950 dark:to-teal-950 border-blue-200 dark:border-blue-800"
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Trends */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Referral Trends</CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={referralTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="referrals" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Referral Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Referral Status Distribution</CardTitle>
            <CardDescription>Current status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={referralStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {referralStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Facility Utilization */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Facilities by Referral Volume</CardTitle>
          <CardDescription>Current month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={facilityUtilization}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
