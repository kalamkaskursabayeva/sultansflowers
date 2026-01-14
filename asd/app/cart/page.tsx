"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Link from "next/link"

export default function CartPage() {
  const { cart, loading, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const { user } = useAuth()

  if (loading) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-4">Загрузка корзины...</p>
        </div>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
          <p className="text-gray-600 mb-6">Добавьте товары из каталога</p>
          <Link href="/catalog">
            <button className="bg-[#568a56] hover:bg-[#457245] text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Перейти в каталог
            </button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => {
                const pricePerBox = Number(item.price_per_box || Number(item.price_per_unit || 0) * 50)
                
                return (
                  <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 flex gap-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-4xl">🌸</span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.color} • {item.variety || item.stem_length}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-[#568a56] flex items-center justify-center text-gray-600 hover:text-[#568a56] transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg border-2 border-gray-300 hover:border-[#568a56] flex items-center justify-center text-gray-600 hover:text-[#568a56] transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm text-gray-500">коробок</span>
                      </div>
                    </div>

                    <div className="text-right flex flex-col justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 ml-auto transition-colors"
                        title="Удалить"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      <div>
                        <p className="text-sm text-gray-500">Цена за коробку</p>
                        <p className="text-lg font-semibold text-gray-900">{pricePerBox.toLocaleString()} ₸</p>
                        <p className="text-xl font-bold text-[#568a56] mt-2">
                          {(pricePerBox * item.quantity).toLocaleString()} ₸
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Итого</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Товары ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</span>
                  <span>{getCartTotal().toLocaleString()} ₸</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>К оплате:</span>
                  <span className="text-[#568a56]">{getCartTotal().toLocaleString()} ₸</span>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full bg-[#568a56] hover:bg-[#457245] text-white py-4 rounded-lg font-semibold text-lg transition-colors">
                  Оформить заказ
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
