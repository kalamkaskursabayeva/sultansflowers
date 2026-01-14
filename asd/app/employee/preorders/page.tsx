"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { mockPreorders } from "@/lib/mock-data"

export default function EmployeePreordersPage() {
  const [preorders, setPreorders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPreorders(mockPreorders)
    setLoading(false)
  }, [])

  const handleStatusUpdate = (preorderId: string, newStatus: string) => {
    setPreorders(preorders.map((po) => (po.id === preorderId ? { ...po, status: newStatus } : po)))
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/employee/dashboard" className="text-primary hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Pre-orders</h1>
          <div></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-12">
        {preorders.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">No pre-orders yet.</div>
        ) : (
          <div className="space-y-4">
            {preorders.map((po) => (
              <div key={po.id} className="bg-card border border-border rounded-lg p-6">
                <div className="grid md:grid-cols-5 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Product</p>
                    <p className="font-semibold text-foreground">{po.products?.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Quantity</p>
                    <p className="font-semibold text-foreground">{po.quantity}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="font-semibold text-foreground capitalize">{po.order_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status</p>
                    <select
                      value={po.status}
                      onChange={(e) => handleStatusUpdate(po.id, e.target.value)}
                      className="px-3 py-1 border border-border rounded text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Created</p>
                    <p className="font-medium text-sm">{new Date(po.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
