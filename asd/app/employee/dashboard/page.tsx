"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { api } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

export default function EmployeeDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ 
    orders: 0, 
    products: 0, 
    flowers: 0,
    pending: 0,
    processing: 0,
    completed: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.id) return
      try {
        const [ordersRes, productsRes, flowersRes] = await Promise.all([
          api.getAllOrders(user.id),
          api.getProducts(),
          api.getFlowers(),
        ])

        const orders = ordersRes.orders || []
        const pendingCount = orders.filter((o: any) => o.status === "pending").length
        const processingCount = orders.filter((o: any) => o.status === "processing").length
        const completedCount = orders.filter((o: any) => o.status === "completed").length

        setStats({
          orders: orders.length,
          products: productsRes.products?.length || 0,
          flowers: flowersRes.products?.length || 0,
          pending: pendingCount,
          processing: processingCount,
          completed: completedCount,
        })
      } catch (error) {
        console.error("Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [user])

  return (
    <DashboardLayout title="Панель работника" requiredRole="worker">
      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-4">Загрузка статистики...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Всего заказов</h3>
              <p className="text-4xl font-bold text-[#568a56]">{stats.orders}</p>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Ожидают:</span>
                  <span className="font-medium text-yellow-600">{stats.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">В работе:</span>
                  <span className="font-medium text-blue-600">{stats.processing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Выполнено:</span>
                  <span className="font-medium text-green-600">{stats.completed}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Цветы</h3>
              <p className="text-4xl font-bold text-[#568a56]">{stats.flowers}</p>
              <p className="text-sm text-gray-500 mt-2">Позиций в каталоге</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-gray-500 text-sm font-medium mb-2">Товары</h3>
              <p className="text-4xl font-bold text-[#568a56]">{stats.products}</p>
              <p className="text-sm text-gray-500 mt-2">Всего продуктов</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link href="/employee/flowers" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-5xl mb-4">🌸</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#568a56]">
                  Управление цветами
                </h2>
                <p className="text-gray-600">Добавление, редактирование и удаление цветов из каталога</p>
              </div>
            </Link>

            <Link href="/employee/products" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-5xl mb-4">📦</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#568a56]">
                  Управление товарами
                </h2>
                <p className="text-gray-600">Добавление и редактирование товаров</p>
              </div>
            </Link>

            <Link href="/employee/orders" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-5xl mb-4">📋</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#568a56]">
                  Просмотр заказов
                </h2>
                <p className="text-gray-600">Обработка и отслеживание заказов клиентов</p>
              </div>
            </Link>

            <Link href="/employee/preorders" className="block">
              <div className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-lg transition-all cursor-pointer group">
                <div className="text-5xl mb-4">🎁</div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#568a56]">
                  Предзаказы
                </h2>
                <p className="text-gray-600">Управление предзаказами и праздничными акциями</p>
              </div>
            </Link>
          </div>
        </>
      )}
    </DashboardLayout>
  )
}
