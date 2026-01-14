"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      const userStr = localStorage.getItem("greenflowers_user")
      if (userStr) {
        const user = JSON.parse(userStr)
        const dashboardRoutes: Record<string, string> = {
          admin: "/admin/dashboard",
          worker: "/employee/dashboard",
          user: "/client/dashboard",
        }
        router.push(dashboardRoutes[user.role] || "/client/dashboard")
      } else {
        router.push("/client/dashboard")
      }
    } else {
      setError(result.error || "Неверный email или пароль")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your Green Flowers account</p>

          {error && <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg mb-6">{error}</div>}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-accent transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/auth/sign-up" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
