"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useLanguage } from "@/hooks/use-language"
import { useCart } from "@/contexts/cart-context"
import { getTranslation } from "@/lib/i18n"
import { api } from "@/lib/api-client"

export default function CatalogPage() {
  const { language, isClient } = useLanguage()
  const { addToCart } = useCart()
  const [products, setProducts] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts()
        if (response.success) {
          setProducts(response.products)
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setQuantity(product.min_order_quantity || 1)
  }

  const filteredProducts = useMemo(() => {
    let result = products

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory)
    }

    const sorted = [...result]
    if (sortBy === "price-low") {
      sorted.sort((a, b) => (a.price_per_unit || 0) - (b.price_per_unit || 0))
    } else if (sortBy === "price-high") {
      sorted.sort((a, b) => (b.price_per_unit || 0) - (a.price_per_unit || 0))
    } else if (sortBy === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name))
    }

    return sorted
  }, [products, selectedCategory, sortBy])

  const categories = [
    { key: "roses", label: getTranslation(language, "roses") },
    { key: "chrysanthemums", label: getTranslation(language, "chrysanthemums") },
    { key: "carnations", label: getTranslation(language, "carnations") },
    { key: "seasonal", label: getTranslation(language, "seasonal") },
    { key: "holiday", label: getTranslation(language, "holiday") },
  ]

  if (!isClient) return null

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">{getTranslation(language, "catalog")}</h1>

        <div className="flex gap-8 mb-8">
          {/* Filters */}
          <div className="w-48">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h3 className="font-semibold text-foreground mb-4">{getTranslation(language, "filterByCategory")}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                    selectedCategory === "" ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                      selectedCategory === cat.key ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <h3 className="font-semibold text-foreground mb-4 mt-6">{getTranslation(language, "sortBy")}</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg bg-background"
              >
                <option value="name">{getTranslation(language, "name")}</option>
                <option value="price-low">{getTranslation(language, "price")} - Low to High</option>
                <option value="price-high">{getTranslation(language, "price")} - High to Low</option>
              </select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-12 h-12 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
                <p className="text-muted-foreground mt-4">Загрузка товаров...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">{getTranslation(language, "noResults")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product)}
                    className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
                  >
                    <div className="h-48 bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="text-6xl">🌸</div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.color} • {product.variety || product.stem_length}
                      </p>
                      <div className="flex justify-between items-end mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">{getTranslation(language, "pricePerUnit")}</p>
                          <p className="text-xl font-bold text-primary">{Number(product.price_per_unit || 0).toFixed(2)} KZT</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{getTranslation(language, "inStock")}</p>
                          <p className="text-sm font-semibold">{product.stock_quantity || 0}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="h-64 bg-gradient-to-br from-pink-100 to-green-100 flex items-center justify-center">
                {selectedProduct.image_url ? (
                  <img src={selectedProduct.image_url} alt={selectedProduct.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-9xl">🌸</div>
                )}
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-[#568a56] mb-4">{selectedProduct.name}</h2>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Характеристики</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-gray-500">Цвет</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.color}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Сорт</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.variety || 'Premium'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Длина стебля</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.stem_length || '60cm'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Упаковка</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.packaging_type || 'Box of 50'}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Цена</h3>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">За стебель</p>
                      <p className="text-2xl font-bold text-[#568a56]">{Number(selectedProduct.price_per_unit || 0).toFixed(2)} <span className="text-sm">KZT</span></p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">За коробку</p>
                      <p className="text-2xl font-bold text-[#568a56]">
                        {Number(selectedProduct.price_per_box || Number(selectedProduct.price_per_unit || 0) * 50).toLocaleString()} <span className="text-sm">KZT</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {selectedProduct.description && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600">{selectedProduct.description}</p>
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Количество коробок</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(selectedProduct.min_order_quantity || 1, parseInt(e.target.value) || 1))}
                  min={selectedProduct.min_order_quantity || 1}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-center text-xl font-semibold focus:border-[#568a56] focus:outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Мин. заказ: {selectedProduct.min_order_quantity || 1} коробок</p>
              </div>

              {addedToCart && (
                <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center">
                  ✓ Товар добавлен в корзину!
                </div>
              )}

              <button
                onClick={() => {
                  addToCart(selectedProduct, quantity)
                  setAddedToCart(true)
                  setTimeout(() => {
                    setAddedToCart(false)
                    setSelectedProduct(null)
                  }, 1500)
                }}
                className="w-full bg-[#568a56] hover:bg-[#457245] text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Добавить в корзину
              </button>

              <button
                onClick={() => setSelectedProduct(null)}
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold transition-colors"
              >
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      <WhatsAppButton variant="floating" />
    </div>
  )
}
