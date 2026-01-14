"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { mockUsers, mockEmployees, mockOrders } from "@/lib/mock-data"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEmployees: 0,
    totalRevenue: 0,
    totalOrders: 0,
    completedOrders: 0,
    pendingOrders: 0,
  })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Calculate stats from mock data
    const totalRevenue = mockOrders.reduce((sum, order) => sum + (order.total_amount || 0), 0)
    const completedOrders = mockOrders.filter((o) => o.status === "delivered").length
    const pendingOrders = mockOrders.filter((o) => o.status === "pending").length

    setStats({
      totalUsers: mockUsers.length,
      totalEmployees: mockEmployees.filter((e) => e.role === "employee").length,
      totalRevenue,
      totalOrders: mockOrders.length,
      completedOrders,
      pendingOrders,
    })
    setLoading(false)
  }, [])

  const handleLogout = () => {
    router.push("/")
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-accent transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Users</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Employees</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalEmployees}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-4xl font-bold text-primary">${stats.totalRevenue.toFixed(0)}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Total Orders</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalOrders}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Completed</h3>
            <p className="text-4xl font-bold text-primary">{stats.completedOrders}</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-muted-foreground text-sm font-medium mb-2">Pending</h3>
            <p className="text-4xl font-bold text-destructive">{stats.pendingOrders}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/admin/users" className="block">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-4">👥</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Manage Users</h2>
              <p className="text-muted-foreground">View and manage customer accounts</p>
            </div>
          </Link>

          <Link href="/admin/employees" className="block">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-4">👔</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Manage Employees</h2>
              <p className="text-muted-foreground">Add, edit, and manage team members</p>
            </div>
          </Link>

          <Link href="/admin/orders" className="block">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-4">📊</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Order Analytics</h2>
              <p className="text-muted-foreground">View sales and order statistics</p>
            </div>
          </Link>

          <Link href="/admin/settings" className="block">
            <div className="bg-card border border-border rounded-lg p-8 hover:shadow-lg transition-all cursor-pointer">
              <div className="text-4xl mb-4">⚙️</div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Settings</h2>
              <p className="text-muted-foreground">Configure platform settings</p>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}
