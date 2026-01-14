"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useLanguageContext } from "@/contexts/language-context"
import { kazakhstanCities } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const { login, register } = useAuth()
  const { language } = useLanguageContext()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      if (mode === "login") {
        const result = await login(email, password)
        if (result.success) {
          router.push("/account")
        } else {
          setError(result.error || "Ошибка входа")
        }
      } else {
        if (!name || !phone || !city) {
          setError("Заполните все поля")
          setLoading(false)
          return
        }
        const result = await register({ email, password, name, phone, city })
        if (result.success) {
          router.push("/account")
        } else {
          setError(result.error || "Ошибка регистрации")
        }
      }
    } catch (err) {
      setError("Произошла ошибка")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-8">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-center gap-3 mb-8">
            <Image src="/logo.png" alt="Green Flowers" width={48} height={48} className="h-12 w-auto" />
            <span className="font-bold text-[#568a56] text-xl">Green Flowers</span>
          </Link>

          {/* Tabs */}
          <div className="flex mb-6 bg-green-50 rounded-xl p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === "login" ? "bg-white text-[#568a56] shadow-sm" : "text-gray-600 hover:text-[#568a56]"
              }`}
            >
              Вход
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${
                mode === "register" ? "bg-white text-[#568a56] shadow-sm" : "text-gray-600 hover:text-[#568a56]"
              }`}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <Label htmlFor="name">Имя / Название компании</Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Петров или ТОО Цветы"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+7 777 123 4567"
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">Город доставки</Label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-[#568a56]"
                    required
                  >
                    <option value="">Выберите город</option>
                    {kazakhstanCities.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name.ru}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.kz"
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{error}</div>
            )}

            <Button type="submit" disabled={loading} className="w-full bg-[#568a56] hover:bg-[#457245] text-white py-3">
              {loading ? "Загрузка..." : mode === "login" ? "Войти" : "Зарегистрироваться"}
            </Button>
          </form>

          {mode === "login" && (
            <div className="mt-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600">
              <p className="font-medium mb-2">Демо доступ:</p>
              <p>Клиент: client@test.kz / client123</p>
              <p>Работник: worker@greenflowers.kz / worker123</p>
              <p>Админ: admin@greenflowers.kz / admin123</p>
            </div>
          )}
        </div>

        <p className="text-center text-gray-500 text-sm mt-4">
          <Link href="/" className="text-[#568a56] hover:underline">
            ← Вернуться на главную
          </Link>
        </p>
      </div>
    </div>
  )
}
