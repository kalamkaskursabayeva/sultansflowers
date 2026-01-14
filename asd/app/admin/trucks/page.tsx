"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard-layout";
import { trucksApiClient, Truck, AnalyticsSummary } from "@/lib/trucks-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, Download } from "lucide-react";

export default function TrucksPage() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Filters
  const [identifier, setIdentifier] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [status, setStatus] = useState("");

  // Modal state
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    identifier: "",
    arrival_date: "",
    status: "pending",
    notes: "",
    metrics: [] as any[],
  });

  // Load trucks and analytics
  useEffect(() => {
    loadTrucks();
    loadAnalytics();
  }, [page, identifier, dateFrom, dateTo, status]);

  const loadTrucks = async () => {
    try {
      setLoading(true);
      const response = await trucksApiClient.getTrucks(page, 10, {
        identifier,
        dateFrom,
        dateTo,
        status,
        sortBy: "arrival_date",
        order: "DESC",
      });
      setTrucks(response.data);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      console.error("Error loading trucks:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await trucksApiClient.getAnalyticsSummary();
      setAnalytics(response.data);
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const handleOpenForm = (truck?: Truck) => {
    if (truck) {
      setEditingId(truck.id);
      setFormData({
        identifier: truck.identifier,
        arrival_date: truck.arrival_date,
        status: truck.status,
        notes: truck.notes || "",
        metrics: truck.metrics || [],
      });
    } else {
      setEditingId(null);
      setFormData({
        identifier: "",
        arrival_date: "",
        status: "pending",
        notes: "",
        metrics: [],
      });
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("📋 Form data being submitted:", formData);
      if (editingId) {
        await trucksApiClient.updateTruck(editingId, formData);
        alert("Фура обновлена");
      } else {
        console.log("📤 Calling createTruck with data:", formData);
        await trucksApiClient.createTruck(formData);
        alert("✅ Фура добавлена");
      }
      setShowForm(false);
      setPage(1);
      loadTrucks();
      loadAnalytics();
    } catch (error) {
      console.error("❌ Error submitting:", error);
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      alert("Ошибка при сохранении: " + errorMessage);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту фуру?")) return;
    try {
      await trucksApiClient.deleteTruck(id);
      alert("Фура удалена");
      loadTrucks();
      loadAnalytics();
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Ошибка при удалении");
    }
  };

  const handleAddMetric = () => {
    setFormData({
      ...formData,
      metrics: [...formData.metrics, { name: "", value: "", unit: "" }],
    });
  };

  const handleMetricChange = (index: number, field: string, value: string) => {
    const updated = [...formData.metrics];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, metrics: updated });
  };

  const handleRemoveMetric = (index: number) => {
    setFormData({
      ...formData,
      metrics: formData.metrics.filter((_, i) => i !== index),
    });
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pending: "Ожидание",
      in_transit: "В пути",
      delivered: "Доставлена",
      delayed: "Задержана",
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      in_transit: "bg-blue-100 text-blue-700",
      delivered: "bg-green-100 text-green-700",
      delayed: "bg-red-100 text-red-700",
    };
    return colors[status] || "bg-gray-100 text-gray-700";
  };

  return (
    <DashboardLayout title="Анализ фур" requiredRole="admin">
      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Всего фур</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {analytics.total_trucks}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Доставлено</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {analytics.delivered}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">В пути</p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {analytics.in_transit}
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
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Задержано</p>
                <p className="text-3xl font-bold text-red-600 mt-1">
                  {analytics.delayed}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
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
      )}

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          <Input
            placeholder="Поиск по ID фуры..."
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="max-w-xs"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="max-w-xs"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-input rounded-md bg-background"
          >
            <option value="">Все статусы</option>
            <option value="pending">Ожидание</option>
            <option value="in_transit">В пути</option>
            <option value="delivered">Доставлена</option>
            <option value="delayed">Задержана</option>
          </select>
          <Button
            onClick={() => {
              setIdentifier("");
              setDateFrom("");
              setDateTo("");
              setStatus("");
              setPage(1);
            }}
            variant="outline"
          >
            Очистить
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => handleOpenForm()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Добавить фуру
          </Button>
          <Button
            onClick={() =>
              trucksApiClient.exportToExcel({
                identifier,
                dateFrom,
                dateTo,
                status,
              })
            }
            variant="outline"
          >
            <Download className="w-4 h-4 mr-2" />
            Экспорт в Excel
          </Button>
        </div>
      </div>

      {/* Trucks List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Загрузка...
          </div>
        ) : trucks.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
            Фуры не найдены
          </div>
        ) : (
          trucks.map((truck) => (
            <div
              key={truck.id}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">
                      Фура #{truck.identifier}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${getStatusColor(
                        truck.status
                      )}`}
                    >
                      {getStatusLabel(truck.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Дата прибытия:{" "}
                    {new Date(truck.arrival_date).toLocaleDateString("ru-RU")}
                  </p>
                  {truck.notes && (
                    <p className="text-sm text-blue-600 mt-1">
                      Примечание: {truck.notes}
                    </p>
                  )}
                  {truck.created_by_name && (
                    <p className="text-sm text-gray-500">
                      Создано: {truck.created_by_name}
                    </p>
                  )}
                </div>
              </div>

              {/* Metrics */}
              {truck.metrics && truck.metrics.length > 0 && (
                <div className="border-t border-gray-100 pt-4 mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Показатели:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                    {truck.metrics.map((metric, idx) => (
                      <div key={idx} className="text-sm">
                        <span className="text-gray-600">
                          {metric.name}: <strong>{metric.value}</strong>{" "}
                          {metric.unit || ""}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-gray-100">
                <Button
                  size="sm"
                  onClick={() => handleOpenForm(truck)}
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleDelete(truck.id)}
                  variant="outline"
                  className="text-red-600 border-red-600"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Удалить
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            variant="outline"
          >
            ◀ Назад
          </Button>
          <span className="px-4 py-2 text-sm">
            Страница {page} из {totalPages}
          </span>
          <Button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            variant="outline"
          >
            Далее ▶
          </Button>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">
                {editingId ? "Редактировать фуру" : "Новая фура"}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ID фуры *
                </label>
                <Input
                  type="text"
                  required
                  value={formData.identifier}
                  onChange={(e) =>
                    setFormData({ ...formData, identifier: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Дата прибытия *
                </label>
                <Input
                  type="date"
                  required
                  value={formData.arrival_date}
                  onChange={(e) =>
                    setFormData({ ...formData, arrival_date: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Статус *
                </label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="pending">Ожидание</option>
                  <option value="in_transit">В пути</option>
                  <option value="delivered">Доставлена</option>
                  <option value="delayed">Задержана</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Примечания
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-input rounded-md min-h-24 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Показатели доставки
                </label>
                <div className="space-y-3 mb-3">
                  {formData.metrics.map((metric, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                        <Input
                          type="text"
                          placeholder="Название (кол-во, ассортимент...)"
                          value={metric.name}
                          onChange={(e) =>
                            handleMetricChange(index, "name", e.target.value)
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Значение"
                          value={metric.value}
                          onChange={(e) =>
                            handleMetricChange(index, "value", e.target.value)
                          }
                        />
                        <Input
                          type="text"
                          placeholder="Единица (шт, кг...)"
                          value={metric.unit}
                          onChange={(e) =>
                            handleMetricChange(index, "unit", e.target.value)
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleRemoveMetric(index)}
                        variant="outline"
                        className="text-red-600 border-red-600"
                      >
                        Удалить показатель
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  type="button"
                  onClick={handleAddMetric}
                  variant="outline"
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить показатель
                </Button>
              </div>

              <div className="flex gap-2 justify-end pt-4 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                >
                  Отмена
                </Button>
                <Button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingId ? "Сохранить" : "Создать"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
