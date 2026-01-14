"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import type { UserRole } from "@/lib/auth"

interface DashboardLayoutProps {
  children: React.ReactNode
  requiredRole?: UserRole | UserRole[]
  title: string
}

export function DashboardLayout({ children, requiredRole, title }: DashboardLayoutProps) {
  const { user, isLoading, isAuthenticated, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/auth")
        return
      }

      if (requiredRole && user) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
        if (!roles.includes(user.role)) {
          router.push("/dashboard")
        }
      }
    }
  }, [isLoading, isAuthenticated, user, requiredRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (!user) return null

  const getNavItems = () => {
    const items: { href: string; label: string; icon: string }[] = []

    if (user.role === "admin") {
      items.push(
        { href: "/admin", label: "Обзор", icon: "home" },
        { href: "/admin/users", label: "Пользователи", icon: "users" },
        { href: "/admin/employees", label: "Сотрудники", icon: "briefcase" },
        { href: "/admin/flowers", label: "Цветы", icon: "flower" },
        { href: "/admin/orders", label: "Заказы", icon: "shopping-cart" },
        { href: "/admin/inventory", label: "Поставки", icon: "package" },
        { href: "/admin/shifts", label: "Смены", icon: "clock" },
        { href: "/admin/calendar", label: "Календарь", icon: "calendar" },
      )
    } else if (user.role === "worker") {
      items.push(
        { href: "/employee", label: "Обзор", icon: "home" },
        { href: "/employee/flowers", label: "Цветы", icon: "flower" },
        { href: "/employee/orders", label: "Заказы", icon: "shopping-cart" },
        { href: "/admin/inventory", label: "Поставки", icon: "package" },
        { href: "/admin/shifts", label: "Смены", icon: "clock" },
        { href: "/admin/calendar", label: "Календарь", icon: "calendar" },
      )
    } else {
      items.push(
        { href: "/client", label: "Обзор", icon: "home" },
        { href: "/catalog", label: "Цветы", icon: "flower" },
        { href: "/client/orders", label: "Заказы", icon: "shopping-cart" },
        { href: "/client/profile", label: "Профиль", icon: "user" },
      )
    }

    return items
  }

  const navItems = getNavItems()

  const getIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        )
      case "users":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1"
            />
          </svg>
        )
      case "briefcase":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        )
      case "package":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        )
      case "shopping-cart":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        )
      case "clock":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "plus":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )
      case "flower":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      case "user":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      case "calendar":
        return (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getRoleBadge = () => {
    switch (user.role) {
      case "admin":
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full">Админ</span>
      case "employee":
        return <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full">Работник</span>
      default:
        return <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">Клиент</span>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Green Flowers" width={40} height={40} className="h-10 w-auto" />
              <span className="font-bold text-[#568a56]">Green Flowers</span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-4 border-b border-gray-200">
            <p className="font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-sm text-gray-500 truncate">{user.email}</p>
            <div className="mt-2">{getRoleBadge()}</div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 hover:text-[#568a56] rounded-lg transition-colors"
              >
                {getIcon(item.icon)}
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>На сайт</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Выйти</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500 hidden sm:block">{user.email}</span>
            {getRoleBadge()}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
