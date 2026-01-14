"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import {
  mockPreorders,
  holidayTypes,
  getCityName,
  getStatusLabel,
  getStatusColor,
  type Preorder,
  type PreorderStatus,
} from "@/lib/orders"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AdminPreordersPage() {
  const [preorders, setPreorders] = useState<Preorder[]>(mockPreorders)
  const [search, setSearch] = useState("")
  const [filterHoliday, setFilterHoliday] = useState<string>("all")

  const filteredPreorders = preorders.filter((preorder) => {
    const matchesSearch =
      preorder.id.toLowerCase().includes(search.toLowerCase()) ||
      preorder.clientName.toLowerCase().includes(search.toLowerCase())
    const matchesHoliday = filterHoliday === "all" || preorder.holidayType === filterHoliday
    return matchesSearch && matchesHoliday
  })

  const updatePreorderStatus = (preorderId: string, newStatus: PreorderStatus) => {
    setPreorders(preorders.map((p) => (p.id === preorderId ? { ...p, status: newStatus } : p)))
  }

  const getHolidayName = (holidayId?: string) => {
    if (!holidayId) return "—"
    const holiday = holidayTypes.find((h) => h.id === holidayId)
    return holiday?.name.ru || holidayId
  }

  return (
    <DashboardLayout title="Праздничные предзаказы" requiredRole="admin">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder="Поиск по номеру или клиенту..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <select
          value={filterHoliday}
          onChange={(e) => setFilterHoliday(e.target.value)}
          className="px-3 py-2 border border-input rounded-md bg-background"
        >
          <option value="all">Все праздники</option>
          {holidayTypes.map((h) => (
            <option key={h.id} value={h.id}>
              {h.name.ru}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredPreorders.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Предзаказы не найдены
          </div>
        ) : (
          filteredPreorders.map((preorder) => (
            <div key={preorder.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{preorder.id}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(preorder.status)}`}>
                      {getStatusLabel(preorder.status)}
                    </span>
                    {preorder.holidayType && (
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                        {getHolidayName(preorder.holidayType)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700">{preorder.clientName}</p>
                  <p className="text-sm text-gray-500">{preorder.clientPhone}</p>
                  <p className="text-sm text-gray-500">Город: {getCityName(preorder.cityId)}</p>
                  <p className="text-sm font-medium text-[#568a56]">Дата доставки: {preorder.deliveryDate}</p>
                  {preorder.notes && <p className="text-sm text-blue-600 mt-1">Примечание: {preorder.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-[#568a56]">{preorder.total.toLocaleString()} KZT</p>
                  <p className="text-sm text-gray-500">
                    Создан: {new Date(preorder.createdAt).toLocaleDateString("ru-RU")}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Товары:</p>
                <div className="space-y-1">
                  {preorder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        {item.productName} x {item.quantity} кор.
                      </span>
                      <span className="text-gray-900">{item.total.toLocaleString()} KZT</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {preorder.status === "pending" && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => updatePreorderStatus(preorder.id, "confirmed")}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Подтвердить
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updatePreorderStatus(preorder.id, "cancelled")}
                      className="text-red-500 border-red-500"
                    >
                      Отменить
                    </Button>
                  </>
                )}
                {preorder.status === "confirmed" && (
                  <span className="text-sm text-green-600">Предзаказ подтверждён, ожидает доставки</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  )
}
