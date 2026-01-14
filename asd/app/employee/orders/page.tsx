"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getCityName, getStatusLabel, getStatusColor, type OrderStatus } from "@/lib/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { api } from "@/lib/api-client"

interface OrderItem {
  product_id: number
  product_name: string
  quantity: number
  unit_price: number
}

interface Order {
  id: number
  user_id: number
  user_name: string
  user_email: string
  user_phone: string
  delivery_city: string
  delivery_address: string | null
  delivery_date: string
  status: OrderStatus
  notes: string | null
  total_amount: number
  created_at: string
  items: OrderItem[]
}

export default function EmployeeOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return
      
      try {
        setLoading(true)
        const data = await api.getAllOrders(user.id)
        setOrders(data.orders || [])
      } catch (error) {
        console.error("Failed to fetch orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [user])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().includes(search) ||
      order.user_name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = async (orderId: number, newStatus: OrderStatus) => {
    if (!user?.id) return
    
    try {
      await api.updateOrderStatus(user.id, orderId, newStatus)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch (error) {
      console.error("Failed to update order status:", error)
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Заказы клиентов" requiredRole="worker">
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-500">Загрузка заказов...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Заказы клиентов" requiredRole="worker">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск по номеру или клиенту..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          <option value="all">Все статусы</option>
          <option value="pending">Ожидает</option>
          <option value="confirmed">Подтверждён</option>
          <option value="in_transit">В пути</option>
          <option value="delivered">Доставлен</option>
          <option value="cancelled">Отменён</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Заказы не найдены
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">#{order.id}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-gray-700">{order.user_name}</p>
                  <p className="text-sm text-gray-500">{order.user_phone}</p>
                  <p className="text-sm text-gray-500">Город: {order.delivery_city}</p>
                  {order.delivery_date && (
                    <p className="text-sm font-medium text-[#568a56]">
                      Доставка: {new Date(order.delivery_date).toLocaleDateString('ru-RU')}
                    </p>
                  )}
                  {order.notes && <p className="text-sm text-blue-600 mt-1">Примечание: {order.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#568a56]">{order.total_amount.toLocaleString()} KZT</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Товары:</p>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.product_name} x {item.quantity} шт.
                      </span>
                      <span className="text-gray-900">{(item.unit_price * item.quantity).toLocaleString()} KZT</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "confirmed")}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Подтвердить
                  </Button>
                )}
                {order.status === "confirmed" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "in_transit")}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Отправить
                  </Button>
                )}
                {order.status === "in_transit" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "delivered")}
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Доставлен
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
