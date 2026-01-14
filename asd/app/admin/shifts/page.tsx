"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Play,
  Square,
  Clock,
  DollarSign,
  Users,
  Calendar,
  ChevronLeft,
  Download,
  Eye,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface Shift {
  id: number;
  user_id: number;
  user_name: string;
  user_email?: string;
  shift_date: string;
  started_at: string;
  ended_at?: string;
  status: "open" | "closed";
  opening_cash: number;
  closing_cash?: number;
  total_sales: number;
  total_discounts: number;
  total_orders: number;
  notes?: string;
  sales_count?: number;
  current_sales?: number;
  current_discounts?: number;
}

interface ShiftSale {
  id: number;
  order_id?: number;
  order_number?: number;
  sale_amount: number;
  discount_amount: number;
  payment_method?: string;
  sale_time: string;
  notes?: string;
}

interface ShiftSaleWithOrder extends ShiftSale {
  sale_id: number;
  order_id?: number;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  delivery_city?: string;
  delivery_date?: string;
  items?: any[];
}

export default function ShiftsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [currentShift, setCurrentShift] = useState<Shift | null>(null);
  const [currentShiftSales, setCurrentShiftSales] = useState<
    ShiftSaleWithOrder[]
  >([]);
  const [availableOrders, setAvailableOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<
    "current" | "history" | "analytics" | "details"
  >("current");
  const [selectedShift, setSelectedShift] = useState<{
    shift: Shift;
    sales: ShiftSale[];
  } | null>(null);

  // Диалоги
  const [isOpenShiftOpen, setIsOpenShiftOpen] = useState(false);
  const [isCloseShiftOpen, setIsCloseShiftOpen] = useState(false);
  const [isEditSaleOpen, setIsEditSaleOpen] = useState(false);
  const [editingSale, setEditingSale] = useState<ShiftSaleWithOrder | null>(
    null
  );

  // Формы
  const [openingCash, setOpeningCash] = useState("");
  const [closingCash, setClosingCash] = useState("");
  const [shiftNotes, setShiftNotes] = useState("");
  const [editSaleAmount, setEditSaleAmount] = useState("");
  const [editDiscountAmount, setEditDiscountAmount] = useState("");

  // Аналитика
  const [sellerAnalytics, setSellerAnalytics] = useState<any[]>([]);
  const [dayAnalytics, setDayAnalytics] = useState<any[]>([]);

  // Фильтры
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    endDate: new Date().toISOString().split("T")[0],
  });

  useEffect(() => {
    if (!user || !["admin", "worker"].includes(user.role)) {
      router.push("/auth/login");
      return;
    }
    loadCurrentShift();
    loadShifts();

    // Обновляем смену каждые 5 секунд если она открыта
    const interval = setInterval(() => {
      loadCurrentShift();
    }, 5000);

    return () => clearInterval(interval);
  }, [user]);

  const loadCurrentShift = async () => {
    try {
      const response = await api.getCurrentShift(user!.id);
      if (response.success && response.shift) {
        setCurrentShift(response.shift);
        // Загружаем заказы для текущей смены
        try {
          const ordersResponse = await api.getSellerActiveOrders(user!.id);
          if (ordersResponse.success) {
            setCurrentShiftSales(ordersResponse.sales || []);
          }
        } catch (err) {
          console.error("Error loading seller active orders:", err);
          setCurrentShiftSales([]);
        }
        // Загружаем доступные заказы для принятия
        try {
          const availableResponse = await api.getAvailableOrders();
          if (availableResponse.success) {
            setAvailableOrders(availableResponse.orders || []);
          }
        } catch (err) {
          console.error("Error loading available orders:", err);
          setAvailableOrders([]);
        }
      } else {
        setCurrentShift(null);
        setCurrentShiftSales([]);
        setAvailableOrders([]);
      }
    } catch (error) {
      console.error("Error loading current shift:", error);
      setCurrentShift(null);
      setCurrentShiftSales([]);
      setAvailableOrders([]);
    }
  };

  const handleAcceptOrder = async (orderId: number) => {
    if (!currentShift || !user) return;

    try {
      const response = await api.acceptOrder(orderId, user.id);
      if (response.success) {
        alert("Заказ успешно принят!");
        loadCurrentShift();
      } else {
        alert(response.error || "Ошибка при принятии заказа");
      }
    } catch (error: any) {
      console.error("Error accepting order:", error);
      alert(error.message || "Ошибка при принятии заказа");
    }
  };

  const loadShifts = async () => {
    try {
      setLoading(true);
      const response = await api.getShifts({
        userId: user?.id,
        startDate: dateFilter.startDate,
        endDate: dateFilter.endDate,
      });
      if (response.success) {
        setShifts(response.shifts);
      }
    } catch (error) {
      console.error("Error loading shifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadShiftDetails = async (id: number) => {
    try {
      const response = await api.getShift(id);
      if (response.success) {
        setSelectedShift({ shift: response.shift, sales: response.sales });
        setViewMode("details");
      }
    } catch (error) {
      console.error("Error loading shift details:", error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const [sellerData, dayData] = await Promise.all([
        api.getShiftAnalyticsBySeller(dateFilter),
        api.getShiftAnalyticsByDay(dateFilter),
      ]);

      if (sellerData.success) setSellerAnalytics(sellerData.data);
      if (dayData.success) setDayAnalytics(dayData.data);
      setViewMode("analytics");
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const handleOpenShift = async () => {
    try {
      const response = await api.openShift({
        userId: user!.id,
        openingCash: parseFloat(openingCash) || 0,
        notes: shiftNotes,
      });

      if (response.success) {
        setCurrentShift(response.shift);
        setIsOpenShiftOpen(false);
        setOpeningCash("");
        setShiftNotes("");
        loadShifts();
        alert("Смена открыта!");
      }
    } catch (error: any) {
      console.error("Error opening shift:", error);
      alert(error.message || "Ошибка при открытии смены");
    }
  };

  const handleCloseShift = async () => {
    if (!currentShift) return;

    try {
      const response = await api.closeShift({
        userId: user!.id,
        shiftId: currentShift.id,
        closingCash: parseFloat(closingCash) || 0,
        notes: shiftNotes,
      });

      if (response.success) {
        setCurrentShift(null);
        setIsCloseShiftOpen(false);
        setClosingCash("");
        setShiftNotes("");
        loadShifts();

        // Показываем итоги
        alert(
          `Смена закрыта!\n\nПродажи: ${response.summary.totalSales.toLocaleString()} тг\nСкидки: ${response.summary.totalDiscounts.toLocaleString()} тг\nЗаказов: ${
            response.summary.totalOrders
          }`
        );
      }
    } catch (error: any) {
      console.error("Error closing shift:", error);
      alert(error.message || "Ошибка при закрытии смены");
    }
  };

  const handleEditSale = (sale: ShiftSaleWithOrder) => {
    setEditingSale(sale);
    setEditSaleAmount(sale.sale_amount.toString());
    setEditDiscountAmount((sale.discount_amount || 0).toString());
    setIsEditSaleOpen(true);
  };

  const handleSaveEditSale = async () => {
    if (!editingSale) return;

    try {
      const response = await api.updateShiftSale(editingSale.sale_id, {
        saleAmount: parseFloat(editSaleAmount),
        discountAmount: parseFloat(editDiscountAmount) || 0,
      });

      if (response.success) {
        loadCurrentShift();
        setIsEditSaleOpen(false);
        alert("Продажа обновлена");
      }
    } catch (error: any) {
      console.error("Error updating sale:", error);
      alert(error.message || "Ошибка при обновлении продажи");
    }
  };

  const handleDeleteSale = async (saleId: number) => {
    if (!confirm("Удалить эту продажу?")) return;

    try {
      const response = await api.deleteShiftSale(saleId);
      if (response.success) {
        loadCurrentShift();
        alert("Продажа удалена");
      }
    } catch (error: any) {
      console.error("Error deleting sale:", error);
      alert(error.message || "Ошибка при удалении продажи");
    }
  };

  const handleExportCSV = async () => {
    try {
      const response = await api.exportShiftsCSV(dateFilter);
      if (response) {
        // Если response это объект JSON (error или success message), это не CSV
        if (typeof response === "object") {
          alert(response.message || "Нет данных для экспорта");
          return;
        }
        const blob = new Blob([response], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `shifts_${dateFilter.startDate}_${dateFilter.endDate}.csv`;
        link.click();
      }
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const handleExportShiftExcel = async (shiftId: number) => {
    try {
      await api.exportShiftsExcel(shiftId);
    } catch (error: any) {
      console.error("Export error:", error);
      alert("Ошибка при экспорте: " + (error.message || "Неизвестная ошибка"));
    }
  };

  const formatDuration = (start: string, end?: string) => {
    const startTime = new Date(start);
    const endTime = end ? new Date(end) : new Date();
    const diff = Math.floor(
      (endTime.getTime() - startTime.getTime()) / 1000 / 60
    );
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}ч ${minutes}м`;
  };

  const getStatusBadge = (status: string) => {
    if (status === "open") {
      return (
        <Badge className="bg-green-100 text-green-800 animate-pulse">
          Открыта
        </Badge>
      );
    }
    return <Badge className="bg-gray-100 text-gray-800">Закрыта</Badge>;
  };

  if (loading && !currentShift) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-[#568a56] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                <ChevronLeft className="h-6 w-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Управление сменами
                </h1>
                <p className="text-gray-600">Учет рабочего времени и продаж</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setViewMode("current")}>
                <Clock className="h-4 w-4 mr-2" />
                Текущая смена
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  loadShifts();
                  setViewMode("history");
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                История
              </Button>
              <Button variant="outline" onClick={loadAnalytics}>
                <BarChart3 className="h-4 w-4 mr-2" />
                Аналитика
              </Button>
              <Button onClick={handleExportCSV}>
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Текущая смена */}
        {viewMode === "current" && (
          <div className="space-y-6">
            {currentShift ? (
              <>
                {/* Карточка активной смены */}
                <Card className="border-2 border-green-500">
                  <CardHeader className="bg-green-50">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <CardTitle>Смена активна</CardTitle>
                      </div>
                      <Badge className="bg-green-100 text-green-800 text-lg px-4 py-1">
                        {formatDuration(currentShift.started_at)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-4 gap-6 mb-6">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-gray-900">
                          {(currentShift.current_sales || 0).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Продажи (тг)
                        </div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-orange-600">
                          {(
                            currentShift.current_discounts || 0
                          ).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Скидки (тг)</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-blue-600">
                          {currentShift.sales_count || 0}
                        </div>
                        <div className="text-sm text-gray-600">Заказов</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-3xl font-bold text-green-600">
                          {Number(currentShift.opening_cash).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Касса на начало
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Начало:{" "}
                        {new Date(currentShift.started_at).toLocaleString(
                          "ru-RU"
                        )}
                      </div>
                      <Button
                        onClick={() => setIsCloseShiftOpen(true)}
                        className="bg-red-600 hover:bg-red-700"
                        size="lg"
                      >
                        <Square className="h-5 w-5 mr-2" />
                        Закрыть смену
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Инструкция */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">💡 Как это работает:</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>
                        • Все заказы, оформленные во время смены, автоматически
                        учитываются
                      </li>
                      <li>
                        • При закрытии смены вы увидите полную статистику продаж
                      </li>
                      <li>
                        • Если продажи выше/ниже нормы, система автоматически
                        создаст событие в календаре
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Таблица заказов текущей смены */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Заказы текущей смены ({currentShiftSales.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentShiftSales.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Время</TableHead>
                              <TableHead>Клиент</TableHead>
                              <TableHead>Город</TableHead>
                              <TableHead>Товары</TableHead>
                              <TableHead>Сумма</TableHead>
                              <TableHead>Скидка</TableHead>
                              <TableHead>Итого</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {currentShiftSales.map((sale) => (
                              <TableRow key={sale.sale_id}>
                                <TableCell>
                                  {new Date(sale.sale_time).toLocaleTimeString(
                                    "ru-RU",
                                    { hour: "2-digit", minute: "2-digit" }
                                  )}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {sale.customer_name || "-"}
                                </TableCell>
                                <TableCell>
                                  {sale.delivery_city || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {sale.items
                                    ?.map(
                                      (item) =>
                                        `${item.product_name} (${item.quantity})`
                                    )
                                    .join(", ") || "-"}
                                </TableCell>
                                <TableCell>
                                  {Number(sale.sale_amount).toLocaleString()} тг
                                </TableCell>
                                <TableCell className="text-orange-600">
                                  {Number(
                                    sale.discount_amount || 0
                                  ).toLocaleString()}{" "}
                                  тг
                                </TableCell>
                                <TableCell className="font-medium">
                                  {Number(
                                    sale.sale_amount -
                                      (sale.discount_amount || 0)
                                  ).toLocaleString()}{" "}
                                  тг
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => handleEditSale(sale)}
                                      title="Редактировать"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleDeleteSale(sale.sale_id)
                                      }
                                      className="text-red-600 hover:text-red-700"
                                      title="Удалить"
                                    >
                                      <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Заказов пока нет. Новые заказы автоматически появятся
                        здесь
                      </p>
                    )}
                  </CardContent>
                </Card>

                {/* Доступные заказы для принятия */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Доступные заказы для принятия ({availableOrders.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {availableOrders.length > 0 ? (
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>№ Заказа</TableHead>
                              <TableHead>Клиент</TableHead>
                              <TableHead>Телефон</TableHead>
                              <TableHead>Город</TableHead>
                              <TableHead>Товары</TableHead>
                              <TableHead>Сумма</TableHead>
                              <TableHead>Создан</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {availableOrders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                  #{order.order_number || order.id}
                                </TableCell>
                                <TableCell>
                                  {order.customer_name || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {order.customer_phone || "-"}
                                </TableCell>
                                <TableCell>
                                  {order.delivery_city || "-"}
                                </TableCell>
                                <TableCell className="text-sm">
                                  {order.items
                                    ?.map(
                                      (item: any) =>
                                        `${item.product_name} (${item.quantity})`
                                    )
                                    .join(", ") || "-"}
                                </TableCell>
                                <TableCell className="font-medium">
                                  {Number(order.total_amount).toLocaleString()}{" "}
                                  тг
                                </TableCell>
                                <TableCell className="text-sm">
                                  {new Date(
                                    order.created_at
                                  ).toLocaleTimeString("ru-RU", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </TableCell>
                                <TableCell>
                                  <Button
                                    size="sm"
                                    onClick={() => handleAcceptOrder(order.id)}
                                    className="bg-[#568a56] hover:bg-[#467046]"
                                  >
                                    Принять
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Доступных заказов нет
                      </p>
                    )}
                  </CardContent>
                </Card>
              </>
            ) : (
              /* Нет активной смены */
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h2 className="text-xl font-medium text-gray-900 mb-2">
                    Нет активной смены
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Откройте смену, чтобы начать отслеживать продажи
                  </p>
                  <Button
                    onClick={() => setIsOpenShiftOpen(true)}
                    className="bg-[#568a56] hover:bg-[#467046]"
                    size="lg"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    Открыть смену
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* История смен */}
        {viewMode === "history" && (
          <div className="space-y-4">
            {/* Фильтры */}
            <Card>
              <CardContent className="py-4">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">С:</span>
                    <Input
                      type="date"
                      value={dateFilter.startDate}
                      onChange={(e) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          startDate: e.target.value,
                        }))
                      }
                      className="w-40"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">По:</span>
                    <Input
                      type="date"
                      value={dateFilter.endDate}
                      onChange={(e) =>
                        setDateFilter((prev) => ({
                          ...prev,
                          endDate: e.target.value,
                        }))
                      }
                      className="w-40"
                    />
                  </div>
                  <Button onClick={loadShifts}>Применить</Button>
                </div>
              </CardContent>
            </Card>

            {/* Статистика */}
            <div className="grid grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{shifts.length}</div>
                  <div className="text-sm text-gray-600">Всего смен</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {shifts
                      .reduce((sum, s) => sum + Number(s.total_sales || 0), 0)
                      .toLocaleString()}{" "}
                    тг
                  </div>
                  <div className="text-sm text-gray-600">Общие продажи</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {shifts
                      .reduce(
                        (sum, s) => sum + Number(s.total_discounts || 0),
                        0
                      )
                      .toLocaleString()}{" "}
                    тг
                  </div>
                  <div className="text-sm text-gray-600">Общие скидки</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {shifts.reduce((sum, s) => sum + (s.total_orders || 0), 0)}
                  </div>
                  <div className="text-sm text-gray-600">Всего заказов</div>
                </CardContent>
              </Card>
            </div>

            {/* Таблица смен */}
            <Card>
              <CardHeader>
                <CardTitle>История смен</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Продавец</TableHead>
                      <TableHead>Начало</TableHead>
                      <TableHead>Окончание</TableHead>
                      <TableHead>Длительность</TableHead>
                      <TableHead>Продажи</TableHead>
                      <TableHead>Скидки</TableHead>
                      <TableHead>Заказы</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shifts.map((shift) => (
                      <TableRow key={shift.id}>
                        <TableCell>
                          {new Date(shift.shift_date).toLocaleDateString(
                            "ru-RU"
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {shift.user_name}
                        </TableCell>
                        <TableCell>
                          {new Date(shift.started_at).toLocaleTimeString(
                            "ru-RU",
                            { hour: "2-digit", minute: "2-digit" }
                          )}
                        </TableCell>
                        <TableCell>
                          {shift.ended_at
                            ? new Date(shift.ended_at).toLocaleTimeString(
                                "ru-RU",
                                { hour: "2-digit", minute: "2-digit" }
                              )
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {formatDuration(shift.started_at, shift.ended_at)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {Number(shift.total_sales || 0).toLocaleString()} тг
                        </TableCell>
                        <TableCell>
                          {Number(shift.total_discounts || 0).toLocaleString()}{" "}
                          тг
                        </TableCell>
                        <TableCell>{shift.total_orders || 0}</TableCell>
                        <TableCell>{getStatusBadge(shift.status)}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => loadShiftDetails(shift.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Детали смены */}
        {viewMode === "details" && selectedShift && (
          <div className="space-y-4">
            <Button variant="outline" onClick={() => setViewMode("history")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Назад к истории
            </Button>

            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Смена от{" "}
                    {new Date(
                      selectedShift.shift.shift_date
                    ).toLocaleDateString("ru-RU")}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        handleExportShiftExcel(selectedShift.shift.id)
                      }
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Экспорт Excel
                    </Button>
                    {getStatusBadge(selectedShift.shift.status)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-4 mb-6">
                  <div>
                    <div className="text-sm text-gray-600">Продавец</div>
                    <div className="font-medium">
                      {selectedShift.shift.user_name}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Длительность</div>
                    <div className="font-medium">
                      {formatDuration(
                        selectedShift.shift.started_at,
                        selectedShift.shift.ended_at
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Продажи</div>
                    <div className="font-medium text-green-600">
                      {Number(selectedShift.shift.total_sales).toLocaleString()}{" "}
                      тг
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Скидки</div>
                    <div className="font-medium text-orange-600">
                      {Number(
                        selectedShift.shift.total_discounts
                      ).toLocaleString()}{" "}
                      тг
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Заказов</div>
                    <div className="font-medium">
                      {selectedShift.shift.total_orders}
                    </div>
                  </div>
                </div>

                {selectedShift.shift.notes && (
                  <div className="p-3 bg-gray-50 rounded mb-4">
                    <div className="text-sm text-gray-600">Примечания:</div>
                    <div>{selectedShift.shift.notes}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Продажи за смену ({selectedShift.sales.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedShift.sales.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Время</TableHead>
                        <TableHead>Заказ</TableHead>
                        <TableHead>Сумма</TableHead>
                        <TableHead>Скидка</TableHead>
                        <TableHead>Способ оплаты</TableHead>
                        <TableHead>Примечание</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedShift.sales.map((sale) => (
                        <TableRow key={sale.id}>
                          <TableCell>
                            {new Date(sale.sale_time).toLocaleTimeString(
                              "ru-RU",
                              { hour: "2-digit", minute: "2-digit" }
                            )}
                          </TableCell>
                          <TableCell>
                            #{sale.order_number || sale.order_id || "-"}
                          </TableCell>
                          <TableCell className="font-medium">
                            {Number(sale.sale_amount).toLocaleString()} тг
                          </TableCell>
                          <TableCell>
                            {Number(sale.discount_amount || 0).toLocaleString()}{" "}
                            тг
                          </TableCell>
                          <TableCell>{sale.payment_method || "-"}</TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {sale.notes || "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    Нет продаж за эту смену
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Аналитика */}
        {viewMode === "analytics" && (
          <div className="space-y-6">
            <Button variant="outline" onClick={() => setViewMode("history")}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>

            <div className="grid grid-cols-2 gap-6">
              {/* По продавцам */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Статистика по продавцам
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {sellerAnalytics.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Продавец</TableHead>
                          <TableHead>Смен</TableHead>
                          <TableHead>Продажи</TableHead>
                          <TableHead>Ср. за смену</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sellerAnalytics.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.user_name}
                            </TableCell>
                            <TableCell>{item.shifts_count}</TableCell>
                            <TableCell>
                              {Number(item.total_sales).toLocaleString()} тг
                            </TableCell>
                            <TableCell>
                              {Number(
                                item.avg_sales_per_shift
                              ).toLocaleString()}{" "}
                              тг
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-gray-500">Нет данных</p>
                  )}
                </CardContent>
              </Card>

              {/* По дням */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Статистика по дням
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {dayAnalytics.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {dayAnalytics.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded"
                        >
                          <div>
                            <div className="font-medium">
                              {new Date(item.shift_date).toLocaleDateString(
                                "ru-RU",
                                {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "short",
                                }
                              )}
                            </div>
                            <div className="text-sm text-gray-600">
                              {item.shifts_count} смен, {item.total_orders}{" "}
                              заказов
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              {Number(item.total_sales).toLocaleString()} тг
                            </div>
                            <div className="text-sm text-orange-600">
                              -{Number(item.total_discounts).toLocaleString()}{" "}
                              тг
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Нет данных</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Диалог открытия смены */}
      <Dialog open={isOpenShiftOpen} onOpenChange={setIsOpenShiftOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Открыть смену</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">
                Сумма в кассе на начало смены (тг)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={openingCash}
                onChange={(e) => setOpeningCash(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Примечания (опционально)
              </label>
              <Input
                placeholder="Любые заметки о начале смены"
                value={shiftNotes}
                onChange={(e) => setShiftNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpenShiftOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={handleOpenShift}
              className="bg-[#568a56] hover:bg-[#467046]"
            >
              <Play className="h-4 w-4 mr-2" />
              Открыть смену
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог закрытия смены */}
      <Dialog open={isCloseShiftOpen} onOpenChange={setIsCloseShiftOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Закрыть смену</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {currentShift && (
              <div className="p-4 bg-gray-50 rounded">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Продажи:</span>
                    <span className="font-medium ml-2">
                      {(currentShift.current_sales || 0).toLocaleString()} тг
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Скидки:</span>
                    <span className="font-medium ml-2">
                      {(currentShift.current_discounts || 0).toLocaleString()}{" "}
                      тг
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Заказов:</span>
                    <span className="font-medium ml-2">
                      {currentShift.sales_count || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Длительность:</span>
                    <span className="font-medium ml-2">
                      {formatDuration(currentShift.started_at)}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium">
                Сумма в кассе на конец смены (тг)
              </label>
              <Input
                type="number"
                placeholder="0"
                value={closingCash}
                onChange={(e) => setClosingCash(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">
                Примечания (опционально)
              </label>
              <Input
                placeholder="Любые заметки о конце смены"
                value={shiftNotes}
                onChange={(e) => setShiftNotes(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCloseShiftOpen(false)}
            >
              Отмена
            </Button>
            <Button
              onClick={handleCloseShift}
              className="bg-red-600 hover:bg-red-700"
            >
              <Square className="h-4 w-4 mr-2" />
              Закрыть смену
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог редактирования продажи */}
      <Dialog open={isEditSaleOpen} onOpenChange={setIsEditSaleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать продажу</DialogTitle>
          </DialogHeader>
          {editingSale && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Клиент</div>
                <div className="font-medium">
                  {editingSale.customer_name || "-"}
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <div className="text-sm text-gray-600">Товары</div>
                <div className="text-sm">
                  {editingSale.items
                    ?.map((item) => `${item.product_name} (${item.quantity})`)
                    .join(", ") || "-"}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Сумма (тг)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={editSaleAmount}
                  onChange={(e) => setEditSaleAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Скидка (тг)</label>
                <Input
                  type="number"
                  placeholder="0"
                  value={editDiscountAmount}
                  onChange={(e) => setEditDiscountAmount(e.target.value)}
                />
              </div>
              <div className="p-3 bg-blue-50 rounded">
                <div className="text-sm text-gray-600">Итого к оплате</div>
                <div className="text-xl font-bold text-blue-600">
                  {Number(
                    parseFloat(editSaleAmount) -
                      parseFloat(editDiscountAmount) || 0
                  ).toLocaleString()}{" "}
                  тг
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditSaleOpen(false)}>
              Отмена
            </Button>
            <Button
              onClick={handleSaveEditSale}
              className="bg-[#568a56] hover:bg-[#467046]"
            >
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
