"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { getCityName, getStatusLabel, getStatusColor, type Order, type OrderStatus } from "@/lib/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

export default function AdminOrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) return
      try {
        const response = await api.getAllOrders(user.id)
        if (response.success) {
          setOrders(response.orders)
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [user])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toString().toLowerCase().includes(search.toLowerCase()) ||
      (order.user_name && order.user_name.toLowerCase().includes(search.toLowerCase()))
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = async (orderId: number, newStatus: string) => {
    if (!user?.id) return
    try {
      await api.updateOrderStatus(user.id, orderId, newStatus)
      setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
    } catch (error) {
      console.error('Error updating order status:', error)
      alert('Ошибка при обновлении статуса заказа')
    }
  }

  return (
    <DashboardLayout title="Управление заказами" requiredRole="admin">
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
          <option value="processing">В обработке</option>
          <option value="shipped">Отправлен</option>
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
                    <h3 className="text-lg font-bold text-gray-900">Заказ #{order.id}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <p className="text-gray-700">{order.customer_name || order.user_name || 'Клиент'}</p>
                  <p className="text-sm text-gray-500">{order.customer_phone || order.user_phone || 'Нет телефона'}</p>
                  {order.customer_email && <p className="text-sm text-gray-500">{order.customer_email}</p>}
                  <p className="text-sm text-gray-500">Город: {order.delivery_city}</p>
                  {order.delivery_address && <p className="text-sm text-gray-500">Адрес: {order.delivery_address}</p>}
                  <p className="text-sm text-gray-500">Дата доставки: {order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('ru-RU') : 'Не указана'}</p>
                  <p className="text-sm text-gray-500">Способ оплаты: {order.payment_method?.replace('_', ' ') || 'Не указан'}</p>
                  {order.notes && <p className="text-sm text-blue-600 mt-1">Примечание: {order.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#568a56]">{Number(order.total_amount || 0).toLocaleString()} ₸</p>
                  <p className="text-sm text-gray-500">
                    Создан: {new Date(order.created_at).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Товары:</p>
                <div className="space-y-1">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.product_name || `Товар #${item.product_id}`} × {item.quantity} шт.
                        </span>
                        <span className="text-gray-900">{(Number(item.unit_price) * Number(item.quantity)).toLocaleString()} ₸</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Нет товаров</p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {order.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "confirmed")}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Подтвердить
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateOrderStatus(order.id, "cancelled")}
                      className="text-red-500 border-red-500"
                    >
                      Отменить
                    </Button>
                  </>
                )}
                {order.status === "confirmed" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "processing")}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Начать обработку
                  </Button>
                )}
                {order.status === "processing" && (
                  <Button
                    size="sm"
                    onClick={() => updateOrderStatus(order.id, "shipped")}
                    className="bg-indigo-500 hover:bg-indigo-600"
                  >
                    Отправить
                  </Button>
                )}
                {order.status === "shipped" && (
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
