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
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Download,
  Upload,
  Trash2,
  Eye,
  Package,
  Calendar,
  TrendingUp,
  TrendingDown,
  ChevronLeft,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";

interface InventoryItem {
  productName: string;
  category: string;
  color: string;
  variety: string;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  stemLength: string;
  packagingType: string;
  plantationCountry: string;
  notes?: string;
}

interface InventoryBatch {
  id: number;
  batch_date: string;
  supplier_name: string;
  total_items: number;
  total_cost: number;
  status: string;
  created_by_name: string;
  items_count: number;
  created_at: string;
}

export default function InventoryPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [batches, setBatches] = useState<InventoryBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const [viewMode, setViewMode] = useState<"list" | "details" | "analytics">(
    "list"
  );

  // Форма создания партии
  const [newBatch, setNewBatch] = useState({
    batchDate: new Date().toISOString().split("T")[0],
    supplierName: "",
    notes: "",
    items: [] as InventoryItem[],
  });

  // Новый товар в форме
  const [newItem, setNewItem] = useState<InventoryItem>({
    productName: "",
    category: "",
    color: "",
    variety: "",
    quantity: 0,
    purchasePrice: 0,
    sellingPrice: 0,
    stemLength: "",
    packagingType: "",
    plantationCountry: "Китай",
    notes: "",
  });

  // Аналитика
  const [analytics, setAnalytics] = useState<any>(null);
  const [priceComparison, setPriceComparison] = useState<any[]>([]);

  useEffect(() => {
    if (!user || !["admin", "worker"].includes(user.role)) {
      router.push("/auth/login");
      return;
    }
    loadBatches();
  }, [user]);

  const loadBatches = async () => {
    try {
      setLoading(true);
      const response = await api.getInventoryBatches({ userId: user?.id });
      if (response.success) {
        setBatches(response.batches);
      }
    } catch (error) {
      console.error("Error loading batches:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadBatchDetails = async (id: number) => {
    try {
      const response = await api.getInventoryBatch(id);
      if (response.success) {
        setSelectedBatch(response);
        setViewMode("details");
      }
    } catch (error) {
      console.error("Error loading batch details:", error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const [categoryData, priceData] = await Promise.all([
        api.getInventoryByCategory({}),
        api.getInventoryPriceComparison({}),
      ]);

      if (categoryData.success) {
        setAnalytics(categoryData.data);
      }
      if (priceData.success) {
        setPriceComparison(priceData.data);
      }
      setViewMode("analytics");
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const addItemToForm = () => {
    if (
      !newItem.productName ||
      newItem.quantity <= 0 ||
      newItem.purchasePrice <= 0
    ) {
      alert(
        "Заполните обязательные поля: название, количество и закупочную цену"
      );
      return;
    }

    setNewBatch((prev) => ({
      ...prev,
      items: [...prev.items, { ...newItem }],
    }));

    // Сброс формы товара
    setNewItem({
      productName: "",
      category: "",
      color: "",
      variety: "",
      quantity: 0,
      purchasePrice: 0,
      sellingPrice: 0,
      stemLength: "",
      packagingType: "",
      plantationCountry: "Китай",
      notes: "",
    });
  };

  const removeItemFromForm = (index: number) => {
    setNewBatch((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleCreateBatch = async () => {
    if (newBatch.items.length === 0) {
      alert("Добавьте хотя бы один товар в партию");
      return;
    }

    try {
      const response = await api.createInventoryBatch({
        userId: user!.id,
        batchDate: newBatch.batchDate,
        supplierName: newBatch.supplierName,
        notes: newBatch.notes,
        items: newBatch.items,
      });

      if (response.success) {
        alert(
          `Партия создана! Всего ${response.totalItems} единиц на сумму ${response.totalCost} тг`
        );
        setIsCreateOpen(false);
        setNewBatch({
          batchDate: new Date().toISOString().split("T")[0],
          supplierName: "",
          notes: "",
          items: [],
        });
        loadBatches();
      }
    } catch (error) {
      console.error("Error creating batch:", error);
      alert("Ошибка при создании партии");
    }
  };

  const handleExportCSV = async (batchId?: number) => {
    try {
      const response = await api.exportInventoryCSV({ batchId });
      console.log("Export response type:", typeof response);
      console.log(
        "Export response:",
        response?.substring ? response.substring(0, 100) : response
      );

      if (response) {
        // Если response это объект JSON (error или success message), это не CSV
        if (typeof response === "object") {
          console.error(
            "Export returned object instead of CSV text:",
            response
          );
          alert(response.message || "Нет данных для экспорта");
          return;
        }
        // Создаем blob и скачиваем (response это текст CSV)
        const blob = new Blob([response], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `inventory_${batchId || "all"}_${
          new Date().toISOString().split("T")[0]
        }.csv`;
        link.click();
      }
    } catch (error) {
      console.error("Export error:", error);
      alert("Ошибка при экспорте");
    }
  };

  const handleStatusChange = async (batchId: number, newStatus: string) => {
    try {
      const response = await api.updateInventoryBatch(batchId, {
        userId: user!.id,
        status: newStatus,
      });

      if (response.success) {
        loadBatches();
        if (selectedBatch?.batch?.id === batchId) {
          loadBatchDetails(batchId);
        }
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: "bg-gray-100 text-gray-800",
      received: "bg-green-100 text-green-800",
      processed: "bg-blue-100 text-blue-800",
    };
    const labels = {
      draft: "Черновик",
      received: "Получено",
      processed: "Обработано",
    };
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  if (loading) {
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
                  Управление поставками
                </h1>
                <p className="text-gray-600">Еженедельный учет товаров</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setViewMode("list")}>
                <Package className="h-4 w-4 mr-2" />
                Партии
              </Button>
              <Button variant="outline" onClick={loadAnalytics}>
                <TrendingUp className="h-4 w-4 mr-2" />
                Аналитика
              </Button>
              <Button onClick={() => handleExportCSV()}>
                <Download className="h-4 w-4 mr-2" />
                Экспорт всего
              </Button>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#568a56] hover:bg-[#467046]">
                    <Plus className="h-4 w-4 mr-2" />
                    Новая партия
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Создание партии поставки</DialogTitle>
                  </DialogHeader>

                  {/* Основная информация */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="text-sm font-medium">
                        Дата поставки
                      </label>
                      <Input
                        type="date"
                        value={newBatch.batchDate}
                        onChange={(e) =>
                          setNewBatch((prev) => ({
                            ...prev,
                            batchDate: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Поставщик</label>
                      <Input
                        placeholder="Название поставщика"
                        value={newBatch.supplierName}
                        onChange={(e) =>
                          setNewBatch((prev) => ({
                            ...prev,
                            supplierName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Примечания</label>
                      <Input
                        placeholder="Примечания к партии"
                        value={newBatch.notes}
                        onChange={(e) =>
                          setNewBatch((prev) => ({
                            ...prev,
                            notes: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  {/* Форма добавления товара */}
                  <Card className="mb-4">
                    <CardHeader className="py-3">
                      <CardTitle className="text-sm">Добавить товар</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-3 mb-3">
                        <Input
                          placeholder="Название *"
                          value={newItem.productName}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              productName: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Категория"
                          value={newItem.category}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Цвет"
                          value={newItem.color}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              color: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Сорт"
                          value={newItem.variety}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              variety: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div className="grid grid-cols-5 gap-3 mb-3">
                        <Input
                          type="number"
                          placeholder="Кол-во *"
                          value={newItem.quantity || ""}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              quantity: Number(e.target.value),
                            }))
                          }
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Закуп. цена *"
                          value={newItem.purchasePrice || ""}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              purchasePrice: Number(e.target.value),
                            }))
                          }
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Продаж. цена"
                          value={newItem.sellingPrice || ""}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              sellingPrice: Number(e.target.value),
                            }))
                          }
                        />
                        <Input
                          placeholder="Длина стебля"
                          value={newItem.stemLength}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              stemLength: e.target.value,
                            }))
                          }
                        />
                        <Input
                          placeholder="Страна"
                          value={newItem.plantationCountry}
                          onChange={(e) =>
                            setNewItem((prev) => ({
                              ...prev,
                              plantationCountry: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <Button onClick={addItemToForm} className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить в партию
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Список добавленных товаров */}
                  {newBatch.items.length > 0 && (
                    <div className="border rounded-lg overflow-hidden mb-4">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Название</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Кол-во</TableHead>
                            <TableHead>Закуп. цена</TableHead>
                            <TableHead>Сумма</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {newBatch.items.map((item, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-medium">
                                {item.productName}
                              </TableCell>
                              <TableCell>{item.category}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.purchasePrice} тг</TableCell>
                              <TableCell>
                                {(
                                  item.quantity * item.purchasePrice
                                ).toLocaleString()}{" "}
                                тг
                              </TableCell>
                              <TableCell>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItemFromForm(index)}
                                >
                                  <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      <div className="p-3 bg-gray-50 border-t">
                        <div className="flex justify-between font-medium">
                          <span>
                            Итого:{" "}
                            {newBatch.items.reduce(
                              (sum, i) => sum + i.quantity,
                              0
                            )}{" "}
                            единиц
                          </span>
                          <span>
                            Сумма:{" "}
                            {newBatch.items
                              .reduce(
                                (sum, i) => sum + i.quantity * i.purchasePrice,
                                0
                              )
                              .toLocaleString()}{" "}
                            тг
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateOpen(false)}
                    >
                      Отмена
                    </Button>
                    <Button
                      onClick={handleCreateBatch}
                      className="bg-[#568a56] hover:bg-[#467046]"
                    >
                      Создать партию
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {viewMode === "list" && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">{batches.length}</div>
                  <div className="text-sm text-gray-600">Всего партий</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {batches
                      .reduce((sum, b) => sum + b.total_items, 0)
                      .toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Единиц товара</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {batches
                      .reduce((sum, b) => sum + Number(b.total_cost), 0)
                      .toLocaleString()}{" "}
                    тг
                  </div>
                  <div className="text-sm text-gray-600">Общая сумма</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-2xl font-bold">
                    {batches.filter((b) => b.status === "draft").length}
                  </div>
                  <div className="text-sm text-gray-600">Черновиков</div>
                </CardContent>
              </Card>
            </div>

            {/* Batches Table */}
            <Card>
              <CardHeader>
                <CardTitle>Партии поставок</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Дата</TableHead>
                      <TableHead>Поставщик</TableHead>
                      <TableHead>Товаров</TableHead>
                      <TableHead>Единиц</TableHead>
                      <TableHead>Сумма</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Создал</TableHead>
                      <TableHead>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batches.map((batch) => (
                      <TableRow key={batch.id}>
                        <TableCell>
                          {new Date(batch.batch_date).toLocaleDateString(
                            "ru-RU"
                          )}
                        </TableCell>
                        <TableCell>{batch.supplier_name || "-"}</TableCell>
                        <TableCell>{batch.items_count}</TableCell>
                        <TableCell>{batch.total_items}</TableCell>
                        <TableCell>
                          {Number(batch.total_cost).toLocaleString()} тг
                        </TableCell>
                        <TableCell>{getStatusBadge(batch.status)}</TableCell>
                        <TableCell>{batch.created_by_name}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => loadBatchDetails(batch.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleExportCSV(batch.id)}
                            >
                              <FileSpreadsheet className="h-4 w-4" />
                            </Button>
                            {batch.status === "draft" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleStatusChange(batch.id, "received")
                                }
                                className="text-green-600"
                              >
                                ✓
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </>
        )}

        {viewMode === "details" && selectedBatch && (
          <div>
            <Button
              variant="outline"
              onClick={() => setViewMode("list")}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>

            <Card className="mb-4">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    Партия от{" "}
                    {new Date(
                      selectedBatch.batch.batch_date
                    ).toLocaleDateString("ru-RU")}
                  </CardTitle>
                  {getStatusBadge(selectedBatch.batch.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Поставщик</div>
                    <div className="font-medium">
                      {selectedBatch.batch.supplier_name || "-"}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Всего единиц</div>
                    <div className="font-medium">
                      {selectedBatch.batch.total_items}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Общая сумма</div>
                    <div className="font-medium">
                      {Number(selectedBatch.batch.total_cost).toLocaleString()}{" "}
                      тг
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Создал</div>
                    <div className="font-medium">
                      {selectedBatch.batch.created_by_name}
                    </div>
                  </div>
                </div>

                {selectedBatch.batch.status === "draft" && (
                  <div className="flex gap-2">
                    <Button
                      onClick={() =>
                        handleStatusChange(selectedBatch.batch.id, "received")
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Подтвердить получение
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  Товары в партии ({selectedBatch.items.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Название</TableHead>
                      <TableHead>Категория</TableHead>
                      <TableHead>Цвет</TableHead>
                      <TableHead>Сорт</TableHead>
                      <TableHead>Кол-во</TableHead>
                      <TableHead>Закуп. цена</TableHead>
                      <TableHead>Продаж. цена</TableHead>
                      <TableHead>Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedBatch.items.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.product_name}
                        </TableCell>
                        <TableCell>{item.category || "-"}</TableCell>
                        <TableCell>{item.color || "-"}</TableCell>
                        <TableCell>{item.variety || "-"}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {Number(item.purchase_price).toFixed(2)} тг
                        </TableCell>
                        <TableCell>
                          {item.selling_price
                            ? Number(item.selling_price).toFixed(2) + " тг"
                            : "-"}
                        </TableCell>
                        <TableCell>
                          {(
                            item.quantity * Number(item.purchase_price)
                          ).toLocaleString()}{" "}
                          тг
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {viewMode === "analytics" && (
          <div>
            <Button
              variant="outline"
              onClick={() => setViewMode("list")}
              className="mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Назад к списку
            </Button>

            <div className="grid grid-cols-2 gap-6">
              {/* По категориям */}
              <Card>
                <CardHeader>
                  <CardTitle>Аналитика по категориям</CardTitle>
                </CardHeader>
                <CardContent>
                  {analytics && analytics.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Категория</TableHead>
                          <TableHead>Товаров</TableHead>
                          <TableHead>Единиц</TableHead>
                          <TableHead>Сумма</TableHead>
                          <TableHead>Ср. цена</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {analytics.map((item: any, index: number) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              {item.category || "Без категории"}
                            </TableCell>
                            <TableCell>{item.products_count}</TableCell>
                            <TableCell>
                              {Number(item.total_quantity).toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {Number(item.total_cost).toLocaleString()} тг
                            </TableCell>
                            <TableCell>
                              {Number(item.avg_purchase_price).toFixed(2)} тг
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-gray-500">Нет данных для анализа</p>
                  )}
                </CardContent>
              </Card>

              {/* Изменения цен */}
              <Card>
                <CardHeader>
                  <CardTitle>Изменения цен</CardTitle>
                </CardHeader>
                <CardContent>
                  {priceComparison && priceComparison.length > 0 ? (
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {priceComparison
                        .filter((p) => p.price_change)
                        .map((item: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-2 bg-gray-50 rounded"
                          >
                            <div>
                              <div className="font-medium">
                                {item.product_name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {new Date(item.batch_date).toLocaleDateString(
                                  "ru-RU"
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">
                                {Number(item.purchase_price).toFixed(2)} тг
                              </span>
                              {Number(item.price_change) > 0 ? (
                                <Badge className="bg-red-100 text-red-800">
                                  <TrendingUp className="h-3 w-3 mr-1" />+
                                  {item.price_change}%
                                </Badge>
                              ) : (
                                <Badge className="bg-green-100 text-green-800">
                                  <TrendingDown className="h-3 w-3 mr-1" />
                                  {item.price_change}%
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Нет данных об изменениях цен
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
