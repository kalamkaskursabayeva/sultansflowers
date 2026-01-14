"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { api } from '@/lib/api-client'

interface CartItem {
  id: number
  product_id: number
  quantity: number
  name?: string
  price_per_unit?: number
  price_per_box?: number
  color?: string
  variety?: string
  stem_length?: string
  packaging_type?: string
  image_url?: string
  min_order_quantity?: number
}

interface CartContextType {
  cart: CartItem[]
  loading: boolean
  addToCart: (product: any, quantity: number) => Promise<void>
  removeFromCart: (itemId: number) => Promise<void>
  updateQuantity: (itemId: number, quantity: number) => Promise<void>
  clearCart: () => Promise<void>
  getCartTotal: () => number
  getCartCount: () => number
  loadCart: () => Promise<void>
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<number | null>(null)

  // Загрузка userId из localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('greenflowers_user')
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser)
        setUserId(user.id)
      } catch (error) {
        console.error('Error loading user:', error)
      }
    }
  }, [])

  // Загрузка корзины при монтировании
  useEffect(() => {
    if (userId) {
      loadCart()
    }
  }, [userId])

  const loadCart = async () => {
    if (!userId) return
    
    setLoading(true)
    try {
      const response = await api.getCart(userId)
      if (response.success) {
        setCart(response.cart || [])
      }
    } catch (error) {
      console.error('Error loading cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (product: any, quantity: number) => {
    if (!userId) {
      // Если нет пользователя, сохраняем в localStorage временно
      const tempCart = JSON.parse(localStorage.getItem('temp_cart') || '[]')
      tempCart.push({ product, quantity })
      localStorage.setItem('temp_cart', JSON.stringify(tempCart))
      alert('Войдите в аккаунт чтобы сохранить корзину')
      return
    }

    try {
      const response = await api.addToCart(userId, product.id, quantity)
      if (response.success) {
        await loadCart()
      }
    } catch (error) {
      console.error('Error adding to cart:', error)
      alert('Ошибка при добавлении в корзину')
    }
  }

  const removeFromCart = async (itemId: number) => {
    if (!userId) return
    
    try {
      const response = await api.removeFromCart(itemId, userId)
      if (response.success) {
        await loadCart()
      }
    } catch (error) {
      console.error('Error removing from cart:', error)
    }
  }

  const updateQuantity = async (itemId: number, quantity: number) => {
    if (!userId) return
    
    try {
      const response = await api.updateCartItem(itemId, userId, quantity)
      if (response.success) {
        await loadCart()
      }
    } catch (error) {
      console.error('Error updating cart:', error)
    }
  }

  const clearCart = async () => {
    if (!userId) return
    
    try {
      const response = await api.clearCart(userId)
      if (response.success) {
        setCart([])
      }
    } catch (error) {
      console.error('Error clearing cart:', error)
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const pricePerBox = Number(item.price_per_box || Number(item.price_per_unit || 0) * 50)
      return total + (pricePerBox * item.quantity)
    }, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
