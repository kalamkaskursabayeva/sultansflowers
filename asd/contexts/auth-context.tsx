"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { api } from "@/lib/api-client"

export type UserRole = "user" | "worker" | "admin"

export interface User {
  id: number
  email: string
  name: string
  phone: string
  role: UserRole
  city?: string
  company_name?: string
  is_active?: boolean
  created_at?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: User) => void
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
  city: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("greenflowers_user")
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch {
        localStorage.removeItem("greenflowers_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.login(email, password)
      
      if (response.success && response.user) {
        setUser(response.user)
        localStorage.setItem("greenflowers_user", JSON.stringify(response.user))
        return { success: true }
      }
      
      return { success: false, error: "Ошибка входа" }
    } catch (error: any) {
      return { success: false, error: error.message || "Неверный email или пароль" }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const response = await api.register({
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        city: data.city,
        company_name: undefined,
      })

      if (response.success && response.user) {
        setUser(response.user)
        localStorage.setItem("greenflowers_user", JSON.stringify(response.user))
        return { success: true }
      }

      return { success: false, error: "Ошибка регистрации" }
    } catch (error: any) {
      return { success: false, error: error.message || "Пользователь с таким email уже существует" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("greenflowers_user")
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    localStorage.setItem("greenflowers_user", JSON.stringify(userData))
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
