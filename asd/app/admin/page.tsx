"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { mockUsers } from "@/lib/auth";
import Link from "next/link";
import {
  Package,
  Clock,
  Calendar,
  TrendingUp,
  Users,
  ShoppingCart,
  FileText,
  Flower2,
  Truck,
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-001",
    client: "Иван Петров",
    city: "Алматы",
    total: 450000,
    status: "pending",
    date: "2024-12-01",
  },
  {
    id: "ORD-002",
    client: "ТОО Цветочный Рай",
    city: "Астана",
    total: 1200000,
    status: "processing",
    date: "2024-12-02",
  },
  {
    id: "ORD-003",
    client: "Мария Иванова",
    city: "Шымкент",
    total: 320000,
    status: "delivered",
    date: "2024-11-28",
  },
];

const mockPreorders = [
  {
    id: "PRE-001",
    client: "ТОО Праздник",
    holiday: "8 Марта",
    total: 5000000,
    status: "confirmed",
    deliveryDate: "2025-03-01",
  },
  {
    id: "PRE-002",
    client: "Цветы 24",
    holiday: "14 Февраля",
    total: 2500000,
    status: "pending",
    deliveryDate: "2025-02-10",
  },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalPreorders: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    // Calculate stats
    setStats({
      totalUsers: mockUsers.filter((u) => u.role === "user").length,
      totalOrders: mockOrders.length,
      totalPreorders: mockPreorders.length,
      pendingOrders: mockOrders.filter((o) => o.status === "pending").length,
    });
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
            Ожидает
          </span>
        );
      case "processing":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
            В обработке
          </span>
        );
      case "delivered":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
            Доставлен
          </span>
        );
      case "confirmed":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            Подтверждён
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <DashboardLayout title="Панель администратора" requiredRole="admin">
      {/* Quick Actions - New Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/admin/inventory" className="block">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Поставки товаров</h3>
                <p className="text-blue-100 text-sm">
                  Еженедельный учет и анализ
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/shifts" className="block">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Смены продавцов</h3>
                <p className="text-green-100 text-sm">Учет рабочего времени</p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/calendar" className="block">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Календарь аналитики</h3>
                <p className="text-purple-100 text-sm">
                  Важные события и уведомления
                </p>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/admin/trucks" className="block">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Анализ фур</h3>
                <p className="text-orange-100 text-sm">Управление поставками</p>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Клиентов</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.totalUsers}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-[#568a56]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Заказов</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.totalOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Предзаказов</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {stats.totalPreorders}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Ожидают обработки</p>
              <p className="text-3xl font-bold text-yellow-600 mt-1">
                {stats.pendingOrders}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Последние заказы
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{order.id}</p>
                  <p className="text-sm text-gray-500">
                    {order.client} — {order.city}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {order.total.toLocaleString()} KZT
                  </p>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Праздничные предзаказы
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {mockPreorders.map((preorder) => (
              <div
                key={preorder.id}
                className="p-4 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-900">{preorder.id}</p>
                  <p className="text-sm text-gray-500">{preorder.client}</p>
                  <p className="text-xs text-purple-600 mt-1">
                    {preorder.holiday}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">
                    {preorder.total.toLocaleString()} KZT
                  </p>
                  <p className="text-xs text-gray-500">
                    Доставка: {preorder.deliveryDate}
                  </p>
                  {getStatusBadge(preorder.status)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
