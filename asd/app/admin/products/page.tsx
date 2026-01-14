"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api-client"
import { useAuth } from "@/contexts/auth-context"

export default function AdminProductsPage() {
  const { user } = useAuth()
  const [productList, setProductList] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editPrice, setEditPrice] = useState("")
  const [editStock, setEditStock] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts()
        if (response.success) {
          setProductList(response.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const filteredProducts = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase()),
  )

  const handleSaveEdit = async (id: number) => {
    if (!user?.id) return
    try {
      const product = productList.find(p => p.id === id)
      if (!product) return

      await api.updateProduct(user.id, id, {
        ...product,
        price_per_box: parseFloat(editPrice) || product.price_per_box,
        stock_quantity: parseInt(editStock) || product.stock_quantity,
      })

      setProductList(
        productList.map((p) =>
          p.id === id
            ? {
                ...p,
                price_per_box: parseFloat(editPrice) || p.price_per_box,
                stock_quantity: parseInt(editStock) || p.stock_quantity,
              }
            : p,
        ),
      )
      setEditingId(null)
    } catch (error) {
      console.error('Error updating product:', error)
      alert('Ошибка при обновлении товара')
    }
  }

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      roses: "Розы",
      chrysanthemums: "Хризантемы",
      carnations: "Гвоздики",
      gypsophila: "Гипсофила",
      lilies: "Лилии",
      gerberas: "Герберы",
      seasonal: "Сезонные",
      holiday: "Праздничные",
    }
    return categories[category] || category
  }

  return (
    <DashboardLayout title="Управление товарами" requiredRole="admin">
      <div className="mb-6">
        <Input
          placeholder="Поиск по названию или категории..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-500 mt-4">Загрузка товаров...</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Товар</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Категория</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Упаковка</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">В наличии</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Цена/коробка</th>
                <th className="text-right px-6 py-3 text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.variety || product.color}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    {getCategoryName(product.category)}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-700">{product.packaging_type}</td>
                <td className="px-6 py-4">
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editStock}
                      onChange={(e) => setEditStock(e.target.value)}
                      className="w-20"
                    />
                  ) : (
                    <span className="text-gray-700">{product.stock_quantity} шт.</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === product.id ? (
                    <Input
                      type="number"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      className="w-28"
                    />
                  ) : (
                    <span className="font-medium text-gray-900">{product.price_per_box?.toLocaleString()} KZT</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  {editingId === product.id ? (
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => handleSaveEdit(product.id)} className="bg-[#568a56]">
                        Сохранить
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        Отмена
                      </Button>
                    </div>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingId(product.id)
                        setEditPrice(product.price_per_box?.toString() || '')
                        setEditStock(product.stock_quantity?.toString() || '')
                      }}
                    >
                      Изменить
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </DashboardLayout>
  )
}
