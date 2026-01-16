"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { useAuth } from "@/contexts/auth-context"
import { getStatusLabel, getStatusColor } from "@/lib/orders"
import Link from "next/link"

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { user } = useAuth()
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params
      setOrderId(id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (!orderId || !user?.id) return

    const fetchOrder = async () => {
      try {
        const response = await fetch(`https://sultansflowers-production.up.railway.app/orders/${orderId}`)
        const data = await response.json()
        
        if (data.success) {
          // Проверяем, что заказ принадлежит текущему пользователю
          if (data.order.user_id === user.id) {
            setOrder(data.order)
          } else {
            router.push('/client/orders')
          }
        }
      } catch (error) {
        console.error('Error fetching order:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [orderId, user, router])

  if (loading) {
    return (
      <DashboardLayout title="Детали заказа" requiredRole="user">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-[#568a56] border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!order) {
    return (
      <DashboardLayout title="Детали заказа" requiredRole="user">
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Заказ не найден</p>
          <Link href="/client/orders" className="text-[#568a56] hover:underline">
            Вернуться к заказам
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  const getStatusSteps = () => {
    const statuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered']
    const currentIndex = statuses.indexOf(order.status)
    
    return [
      { label: 'Ожидает обработки', status: 'pending', completed: currentIndex >= 0 },
      { label: 'Подтвержден', status: 'confirmed', completed: currentIndex >= 1 },
      { label: 'В обработке', status: 'processing', completed: currentIndex >= 2 },
      { label: 'Отправлен', status: 'shipped', completed: currentIndex >= 3 },
      { label: 'Доставлен', status: 'delivered', completed: currentIndex >= 4 },
    ]
  }

  const statusSteps = getStatusSteps()

  return (
    <DashboardLayout title="Детали заказа" requiredRole="user">
      <div className="mb-6">
        <Link href="/client/orders" className="text-[#568a56] hover:underline flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Назад к заказам
        </Link>
      </div>

      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Заказ #{order.id}</h1>
              <p className="text-sm text-gray-500">
                Создан: {new Date(order.created_at).toLocaleDateString('ru-RU', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            <div className="text-right">
              <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                {getStatusLabel(order.status)}
              </div>
            </div>
          </div>
        </div>

        {/* Status Timeline */}
        {order.status !== 'cancelled' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Статус заказа</h2>
            <div className="relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
              <div 
                className="absolute top-5 left-0 h-0.5 bg-[#568a56] transition-all duration-500"
                style={{ width: `${(statusSteps.filter(s => s.completed).length - 1) * 25}%` }}
              />
              
              <div className="relative flex justify-between">
                {statusSteps.map((step, index) => (
                  <div key={step.status} className="flex flex-col items-center" style={{ width: '20%' }}>
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                        step.completed 
                          ? 'bg-[#568a56] border-[#568a56] text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                      }`}
                    >
                      {step.completed ? (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="text-sm font-medium">{index + 1}</span>
                      )}
                    </div>
                    <p className={`mt-2 text-xs text-center ${step.completed ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Delivery Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Информация о доставке</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Имя получателя</p>
                <p className="font-medium text-gray-900">{order.customer_name || 'Не указано'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Телефон WhatsApp</p>
                <p className="font-medium text-gray-900">{order.customer_phone || 'Не указан'}</p>
              </div>
              {order.customer_email && (
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{order.customer_email}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Город доставки</p>
                <p className="font-medium text-gray-900">{order.delivery_city}</p>
              </div>
              {order.delivery_address && (
                <div>
                  <p className="text-sm text-gray-500">Адрес доставки</p>
                  <p className="font-medium text-gray-900">{order.delivery_address}</p>
                </div>
              )}
              {order.delivery_date && (
                <div>
                  <p className="text-sm text-gray-500">Желаемая дата доставки</p>
                  <p className="font-medium text-gray-900">
                    {new Date(order.delivery_date).toLocaleDateString('ru-RU', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Оплата</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Способ оплаты</p>
                <p className="font-medium text-gray-900 capitalize">
                  {order.payment_method?.replace('_', ' ') || 'Не указан'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Статус оплаты</p>
                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                  order.payment_status === 'paid' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.payment_status === 'paid' ? 'Оплачено' : 'Ожидает оплаты'}
                </span>
              </div>
              {order.notes && (
                <div>
                  <p className="text-sm text-gray-500">Примечание к заказу</p>
                  <p className="font-medium text-gray-900">{order.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Товары в заказе</h2>
          <div className="space-y-3">
            {order.items && order.items.length > 0 ? (
              order.items.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.product_name || `Товар #${item.product_id}`}</p>
                    <p className="text-sm text-gray-500">Количество: {item.quantity} шт.</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">{Number(item.unit_price).toLocaleString()} ₸</p>
                    <p className="text-sm text-gray-500">
                      Итого: {(Number(item.quantity) * Number(item.unit_price)).toLocaleString()} ₸
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Нет товаров</p>
            )}
          </div>

          <div className="mt-6 pt-4 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">Итого к оплате:</span>
              <span className="text-2xl font-bold text-[#568a56]">
                {Number(order.total_amount || 0).toLocaleString()} ₸
              </span>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">Нужна помощь?</h3>
              <p className="text-blue-800 text-sm">
                Если у вас есть вопросы по заказу, свяжитесь с нами в WhatsApp: 
                <a href={`https://wa.me/${order.customer_phone?.replace(/[^0-9]/g, '')}`} className="font-medium underline ml-1">
                  {order.customer_phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
