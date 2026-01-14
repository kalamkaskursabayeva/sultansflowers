"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguageContext } from "@/contexts/language-context"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { getTranslation } from "@/lib/i18n"
import { LanguageSwitcher } from "./language-switcher"
import { Button } from "./ui/button"

export function Header() {
  const { language, isClient } = useLanguageContext()
  const { user, isAuthenticated, logout } = useAuth()
  const { getCartCount } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  if (!isClient) return null

  const navLinks = [
    { href: "#catalog", label: getTranslation(language, "catalog") },
    { href: "#about", label: getTranslation(language, "about") },
    { href: "#delivery", label: getTranslation(language, "delivery") },
    { href: "#faq", label: getTranslation(language, "faq") },
    { href: "#contact", label: getTranslation(language, "contact") },
  ]

  const getDashboardLink = () => {
    if (!user) return "/auth"
    switch (user.role) {
      case "admin":
        return "/admin"
      case "worker":
        return "/employee"
      case "user":
        return "/client/profile"
      default:
        return "/dashboard"
    }
  }

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image src="/logo.png" alt="Green Flowers" width={48} height={48} className="h-12 w-auto" />
            <span className="font-bold text-[#568a56] text-lg hidden sm:block">Green Flowers</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-[#568a56] transition-colors font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Иконка корзины */}
            <Link href="/cart" className="relative p-2 hover:bg-green-50 rounded-lg transition-colors">
              <svg className="w-6 h-6 text-[#568a56]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>

            <LanguageSwitcher />

            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-2">
                <Link href={getDashboardLink()}>
                  <Button variant="outline" size="sm" className="border-[#568a56] text-[#568a56] bg-transparent">
                    {user?.name?.split(" ")[0] || "Кабинет"}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={logout} className="text-gray-500 hover:text-red-500">
                  Выйти
                </Button>
              </div>
            ) : (
              <Link href="/auth" className="hidden md:block">
                <Button size="sm" className="bg-[#568a56] hover:bg-[#457245] text-white">
                  Войти
                </Button>
              </Link>
            )}
            {/* </CHANGE> */}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg className="w-6 h-6 text-[#568a56]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-green-100">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-foreground hover:text-[#568a56] hover:bg-green-50 rounded-lg transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-green-100 mt-2 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link
                      href={getDashboardLink()}
                      className="block px-4 py-3 text-[#568a56] hover:bg-green-50 rounded-lg font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Личный кабинет
                    </Link>
                    <button
                      onClick={() => {
                        logout()
                        setMobileMenuOpen(false)
                      }}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium"
                    >
                      Выйти
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth"
                    className="block px-4 py-3 text-[#568a56] hover:bg-green-50 rounded-lg font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Войти / Регистрация
                  </Link>
                )}
              </div>
              {/* </CHANGE> */}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
