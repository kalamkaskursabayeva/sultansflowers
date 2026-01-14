"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { kazakhstanCities } from "@/lib/auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

interface User {
  id: number
  email: string
  name: string
  phone: string
  role: "user" | "worker" | "admin"
  city?: string
  company_name?: string
  is_active: boolean
  created_at: string
}

export default function AdminUsersPage() {
  const { user } = useAuth()
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [newPassword, setNewPassword] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    company_name: "",
    role: "user" as "user" | "worker" | "admin",
    is_active: true,
  })

  useEffect(() => {
    fetchUsers()
  }, [user])

  const fetchUsers = async () => {
    if (!user?.id) return
    try {
      const response = await api.getAllUsers(user.id)
      if (response.success) {
        setUsers(response.users)
      }
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (editUser: User) => {
    setEditingUser(editUser)
    setFormData({
      name: editUser.name,
      email: editUser.email,
      phone: editUser.phone,
      city: editUser.city || "",
      company_name: editUser.company_name || "",
      role: editUser.role,
      is_active: editUser.is_active,
    })
    setShowModal(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.id || !editingUser) return

    try {
      const response = await api.updateUser(user.id, editingUser.id, formData)
      if (response.success) {
        await fetchUsers()
        setShowModal(false)
        setEditingUser(null)
      }
    } catch (error) {
      console.error('Error updating user:', error)
      alert('Ошибка при обновлении пользователя')
    }
  }

  const handleChangePassword = async () => {
    if (!user?.id || !editingUser || !newPassword) return

    try {
      const response = await api.changeUserPassword(user.id, editingUser.id, newPassword)
      if (response.success) {
        alert(response.message)
        setShowPasswordModal(false)
        setEditingUser(null)
        setNewPassword("")
      }
    } catch (error) {
      console.error('Error changing password:', error)
      alert('Ошибка при изменении пароля')
    }
  }

  const handleDelete = async (userId: number) => {
    if (!user?.id) return
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return

    try {
      const response = await api.deleteUser(user.id, userId)
      if (response.success) {
        await fetchUsers()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Ошибка при удалении пользователя')
    }
  }

  const handleRoleChange = async (userId: number, newRole: "user" | "worker" | "admin") => {
    if (!user?.id) return

    try {
      const response = await api.updateUserRole(user.id, userId, newRole)
      if (response.success) {
        await fetchUsers()
      }
    } catch (error) {
      console.error('Error changing role:', error)
      alert('Ошибка при изменении роли')
    }
  }

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search),
  )

  const getCityName = (cityId?: string) => {
    if (!cityId) return "—"
    const city = kazakhstanCities.find((c) => c.id === cityId)
    return city?.name.ru || cityId
  }

  const getRoleLabel = (role: string) => {
    const labels = { user: "Клиент", worker: "Работник", admin: "Администратор" }
    return labels[role] || role
  }

  return (
    <DashboardLayout title="Управление пользователями" requiredRole="admin">
      <div className="mb-6">
        <Input
          placeholder="Поиск по имени, email или телефону..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-4">Загрузка пользователей...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Пользователь</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Контакты</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    Пользователи не найдены
                  </td>
                </tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{u.name}</p>
                        <p className="text-sm text-gray-500">{u.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-gray-700">{u.phone}</p>
                        <p className="text-sm text-gray-500">{getCityName(u.city)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                        disabled={u.id === user?.id}
                      >
                        <option value="user">Клиент</option>
                        <option value="worker">Работник</option>
                        <option value="admin">Администратор</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${u.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {u.is_active ? 'Активен' : 'Неактивен'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(u)}
                        >
                          Изменить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingUser(u)
                            setShowPasswordModal(true)
                          }}
                        >
                          Пароль
                        </Button>
                        {u.id !== user?.id && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(u.id)}
                          >
                            Удалить
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Редактировать пользователя</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">Город</Label>
                  <select
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="">Выберите город</option>
                    {kazakhstanCities.map((city) => (
                      <option key={city.id} value={city.id}>{city.name.ru}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="company">Компания</Label>
                  <Input
                    id="company"
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Роль</Label>
                  <select
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="user">Клиент</option>
                    <option value="worker">Работник</option>
                    <option value="admin">Администратор</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <Label htmlFor="is_active">Активен</Label>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">Сохранить</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowModal(false)
                    setEditingUser(null)
                  }}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Изменить пароль</h2>
            <p className="text-gray-600 mb-4">Пользователь: {editingUser?.email}</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="newPassword">Новый пароль</Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Минимум 6 символов"
                />
              </div>
              <div className="flex gap-3">
                <Button onClick={handleChangePassword} className="flex-1" disabled={newPassword.length < 6}>
                  Изменить пароль
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowPasswordModal(false)
                    setEditingUser(null)
                    setNewPassword("")
                  }}
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}
