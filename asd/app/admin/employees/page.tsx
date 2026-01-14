"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

export default function AdminEmployeesPage() {
  const { user } = useAuth()
  const [employees, setEmployees] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", password: "" })
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!user?.id) return
      try {
        const response = await api.getAllUsers(user.id)
        if (response.success) {
          setEmployees(response.users.filter((u: any) => u.role === 'worker'))
        }
      } catch (error) {
        console.error('Error fetching employees:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchEmployees()
  }, [user])

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!user?.id) return

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone,
        role: 'worker'
      }

      const response = await api.register(userData)
      
      if (response.success) {
        // Refresh employee list
        const updatedList = await api.getAllUsers(user.id)
        if (updatedList.success) {
          setEmployees(updatedList.users.filter((u: any) => u.role === 'worker'))
        }
        setFormData({ name: "", email: "", phone: "", password: "" })
        setShowForm(false)
      } else {
        setError(response.error || 'Ошибка при добавлении сотрудника')
      }
    } catch (error) {
      console.error('Error adding employee:', error)
      setError('Ошибка при добавлении сотрудника')
    }
  }

  const handleDeleteEmployee = async (id: number) => {
    if (!user?.id) return
    
    if (!confirm('Вы уверены, что хотите удалить сотрудника?')) return

    try {
      await api.deleteUser(user.id, id)
      setEmployees(employees.filter((e) => e.id !== id))
    } catch (error) {
      console.error('Error deleting employee:', error)
      alert('Ошибка при удалении сотрудника')
    }
  }

  if (loading) {
    return (
      <DashboardLayout title="Управление сотрудниками" requiredRole="admin">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Управление сотрудниками" requiredRole="admin">
      <div className="mb-6">
        <Button onClick={() => setShowForm(!showForm)} className="bg-[#568a56] hover:bg-[#457245]">
          + Добавить сотрудника
        </Button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Новый сотрудник</h2>
          <form onSubmit={handleAddEmployee} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">ФИО</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                minLength={6}
              />
            </div>
            {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
            <div className="col-span-2 flex gap-3">
              <Button type="submit" className="bg-[#568a56] hover:bg-[#457245]">
                Добавить
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                Отмена
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Сотрудник</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Телефон</th>
              <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Дата добавления</th>
              <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employees.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Сотрудники не добавлены
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.email}</p>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{emp.phone}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {emp.created_at ? new Date(emp.created_at).toLocaleDateString("ru-RU") : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteEmployee(emp.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Удалить
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  )
}
