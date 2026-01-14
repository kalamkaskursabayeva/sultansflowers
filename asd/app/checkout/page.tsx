"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { useRouter } from "next/navigation"
import { mockDeliveryZones } from "@/lib/mock-data"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import * as api from "@/lib/api-client"

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [cities, setCities] = useState<any[]>([])
  const [selectedCity, setSelectedCity] = useState("")
  const [address, setAddress] = useState("")
  const [deliveryDate, setDeliveryDate] = useState("")
  const [whatsappPhone, setWhatsappPhone] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("kaspi_qr")
  const [notes, setNotes] = useState("")
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setCities(mockDeliveryZones.filter((z) => z.is_active))
    setLoading(false)
  }, [])

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Prepare order items from cart
      const items = cart.map(item => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: Number(item.price_per_box || Number(item.price_per_unit || 0) * 50)
      }))

      const orderData = {
        user_id: user?.id || null,
        customer_name: customerName,
        customer_phone: whatsappPhone,
        customer_email: user?.email || null,
        total_amount: getCartTotal(),
        delivery_city: selectedCity,
        delivery_address: address,
        delivery_date: deliveryDate,
        delivery_time: null,
        payment_method: paymentMethod,
        payment_status: 'pending',
        notes: notes,
        status: 'pending',
        items: items
      }

      const result = await api.createOrder(orderData)
      
      if (result.success) {
        await clearCart()
        router.push(`/order-confirmation/${result.order.id}`)
      } else {
        alert('Ошибка при создании заказа')
        setSubmitting(false)
      }
    } catch (error) {
      console.error('Order submission error:', error)
      alert('Ошибка при отправке заказа')
      setSubmitting(false)
    }
  }

  if (loading)
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-[#568a56] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-gray-600 mt-4">Загрузка...</p>
        </div>
      </div>
    )
  
  if (cart.length === 0)
    return (
      <div>
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <p className="text-gray-600 mb-4">Корзина пуста</p>
          <a href="/catalog" className="text-[#568a56] hover:underline">Перейти в каталог</a>
        </div>
      </div>
    )

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-foreground mb-8">Оформление заказа</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Delivery Info */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Delivery Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Delivery City *</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.city_name}>
                          {city.city_name} (+${city.delivery_fee || 0})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Delivery Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2 border border-border rounded-lg"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Desired Delivery Date *</label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Введите ваше имя"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">WhatsApp Номер *</label>
                    <input
                      type="tel"
                      value={whatsappPhone}
                      onChange={(e) => setWhatsappPhone(e.target.value)}
                      placeholder="+7 (___) ___-__-__"
                      required
                      className="w-full px-4 py-2 border border-border rounded-lg"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Например: +7 777 123 4567</p>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: "kaspi_qr", label: "Kaspi QR" },
                    { value: "kaspi_manual", label: "Kaspi Manual Transfer" },
                    { value: "kaspi_red", label: "Kaspi Red (Installments)" },
                    { value: "cash_on_delivery", label: "Cash on Delivery" },
                  ].map((method) => (
                    <label key={method.value} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        value={method.value}
                        checked={paymentMethod === method.value}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="text-foreground">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-semibold text-foreground mb-4">Additional Notes (optional)</h2>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg"
                  rows={3}
                  placeholder="Any special instructions or requests..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-accent transition-colors disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-20">
              <h2 className="font-semibold text-foreground mb-4">Итого по заказу</h2>
              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                {cart.map((item) => {
                  const pricePerBox = Number(item.price_per_box || Number(item.price_per_unit || 0) * 50)
                  return (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.name} x {item.quantity}
                      </span>
                      <span className="font-medium">{(pricePerBox * item.quantity).toLocaleString()} ₸</span>
                    </div>
                  )
                })}
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Итого</span>
                <span className="font-bold text-lg text-[#568a56]">{getCartTotal().toLocaleString()} ₸</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
