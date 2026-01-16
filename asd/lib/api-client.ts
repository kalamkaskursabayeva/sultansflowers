// API client для связи фронтенда с бэкендом
const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://sultansflowers-production.up.railway.app/";

class ApiClient {
  baseURL: string;

  constructor() {
    this.baseURL = API_URL;
  }

  buildQuery(params?: Record<string, any>) {
    const safe: Record<string, string> = {};
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null) safe[k] = String(v);
      });
    }
    return new URLSearchParams(safe).toString();
  }

  async request(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      const contentType = response.headers.get("content-type") || "";
      console.log(
        `[API] ${endpoint} - Status: ${response.status}, Content-Type: ${contentType}`
      );

      // Если ответ JSON — парсим как раньше
      if (contentType.includes("application/json")) {
        const data = await response.json().catch(() => ({
          error: `HTTP ${response.status}: ${response.statusText}`,
        }));
        if (!response.ok) {
          return {
            success: false,
            error:
              data.error || `HTTP ${response.status}: ${response.statusText}`,
            ...data,
          };
        }
        return data;
      }

      // Если это CSV — возвращаем текст (чтобы frontend мог создать Blob из строки)
      if (
        contentType.includes("text/csv") ||
        contentType.includes("text/plain")
      ) {
        const text = await response.text();
        console.log(`[API] ${endpoint} - CSV text length: ${text.length}`);
        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        return text;
      }

      // Если это бинарный файл (xlsx) — возвращаем Blob
      if (
        contentType.includes(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        contentType.includes("application/octet-stream")
      ) {
        const blob = await response.blob();
        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        return blob;
      }

      // По умолчанию пытаемся распарсить как JSON, иначе вернуть текст
      try {
        const data = await response.json();
        if (!response.ok) {
          return {
            success: false,
            error:
              data.error || `HTTP ${response.status}: ${response.statusText}`,
            ...data,
          };
        }
        return data;
      } catch (e) {
        const text = await response.text();
        if (!response.ok) {
          return {
            success: false,
            error: `HTTP ${response.status}: ${response.statusText}`,
          };
        }
        return text;
      }
    } catch (error) {
      console.error("API Request Error:", error);
      // Возвращаем ошибку вместо выброса
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  } // ============ AUTH ============
  async register(userData) {
    return this.request("/users/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async login(email, password) {
    return this.request("/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // ============ USERS (Admin) ============
  async getAllUsers(adminId) {
    return this.request(`/users/admin/users?adminId=${adminId}`);
  }

  async updateUserRole(adminId, userId, newRole) {
    return this.request(`/users/admin/users/${userId}/role`, {
      method: "PUT",
      body: JSON.stringify({ adminId, newRole }),
    });
  }

  async deleteUser(adminId, userId) {
    return this.request(`/users/admin/users/${userId}?adminId=${adminId}`, {
      method: "DELETE",
    });
  }

  async updateUser(adminId, userId, userData) {
    return this.request(`/users/admin/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ adminId, ...userData }),
    });
  }

  async changeUserPassword(adminId, userId, newPassword) {
    return this.request(`/users/admin/users/${userId}/password`, {
      method: "PUT",
      body: JSON.stringify({ adminId, newPassword }),
    });
  }

  // ============ PRODUCTS ============
  async getProducts() {
    return this.request("/products");
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(userId, productData) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify({ userId, ...productData }),
    });
  }

  async updateProduct(userId, productId, productData) {
    return this.request(`/products/${productId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, ...productData }),
    });
  }

  async deleteProduct(adminId, productId) {
    return this.request(`/products/${productId}?adminId=${adminId}`, {
      method: "DELETE",
    });
  }

  // ============ ORDERS ============
  async createOrder(orderData) {
    return this.request("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  }

  async getUserOrders(userId) {
    return this.request(`/orders/user/${userId}`);
  }

  async getAllOrders(userId) {
    return this.request(`/orders/all?userId=${userId}`);
  }

  async confirmOrder(userId, orderId) {
    return this.request(`/orders/${orderId}/confirm`, {
      method: "PUT",
      body: JSON.stringify({ userId }),
    });
  }

  async updateOrderStatus(userId, orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: "PUT",
      body: JSON.stringify({ userId, status }),
    });
  }

  // ============ PREORDERS ============
  async getUserPreorders(userId) {
    return this.request(`/preorders/user/${userId}`);
  }

  async getAllPreorders(userId) {
    return this.request(`/preorders/all?userId=${userId}`);
  }

  // ============ LOGS (Admin) ============
  async getLogs(adminId, filters = {}) {
    const params = new URLSearchParams({ adminId, ...filters });
    return this.request(`/logs?${params.toString()}`);
  }

  async getLogsStats(adminId) {
    return this.request(`/logs/stats?adminId=${adminId}`);
  }

  async cleanOldLogs(adminId, days = 90) {
    return this.request("/logs/clean", {
      method: "DELETE",
      body: JSON.stringify({ adminId, days }),
    });
  }

  // ============ FLOWERS (Admin & Worker) ============
  async getFlowers() {
    return this.request("/flowers");
  }

  async getFlower(id) {
    return this.request(`/flowers/${id}`);
  }

  async createFlower(userId, flowerData) {
    return this.request("/flowers", {
      method: "POST",
      body: JSON.stringify({ userId, ...flowerData }),
    });
  }

  async updateFlower(userId, flowerId, flowerData) {
    return this.request(`/flowers/${flowerId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, ...flowerData }),
    });
  }

  async deleteFlower(adminId, flowerId) {
    return this.request(`/flowers/${flowerId}?adminId=${adminId}`, {
      method: "DELETE",
    });
  }

  // ============ USER PROFILE ============
  async updateProfile(userId, profileData) {
    return this.request(`/users/profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  }

  async getProfileStats(userId) {
    return this.request(`/users/profile/${userId}/stats`);
  }

  // ============ CART ============
  async getCart(userId) {
    return this.request(`/cart/user/${userId}`);
  }

  async addToCart(userId, product_id, quantity) {
    return this.request("/cart", {
      method: "POST",
      body: JSON.stringify({ userId, product_id, quantity }),
    });
  }

  async updateCartItem(itemId, userId, quantity) {
    return this.request(`/cart/${itemId}`, {
      method: "PUT",
      body: JSON.stringify({ userId, quantity }),
    });
  }

  async removeFromCart(itemId, userId) {
    return this.request(`/cart/${itemId}?userId=${userId}`, {
      method: "DELETE",
    });
  }

  async clearCart(userId) {
    return this.request(`/cart/user/${userId}/clear`, {
      method: "DELETE",
    });
  }

  // ============ INVENTORY (Поставки товаров) ============
  async getInventoryBatches(params?: {
    userId?: number;
    startDate?: string;
    endDate?: string;
    status?: string;
  }) {
    const query = this.buildQuery(params as any);
    return this.request(`/inventory/batches${query ? "?" + query : ""}`);
  }

  async getInventoryBatch(id: number) {
    return this.request(`/inventory/batches/${id}`);
  }

  async createInventoryBatch(data: {
    userId: number;
    batchDate: string;
    supplierName?: string;
    notes?: string;
    items: any[];
  }) {
    return this.request("/inventory/batches", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateInventoryBatch(id: number, data: any) {
    return this.request(`/inventory/batches/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteInventoryBatch(id: number, userId: number) {
    return this.request(`/inventory/batches/${id}?userId=${userId}`, {
      method: "DELETE",
    });
  }

  async getInventoryPriceComparison(params?: {
    productName?: string;
    startDate?: string;
    endDate?: string;
  }) {
    const query = this.buildQuery(params as any);
    return this.request(
      `/inventory/analytics/price-comparison${query ? "?" + query : ""}`
    );
  }

  async getInventoryByCategory(params?: {
    startDate?: string;
    endDate?: string;
  }) {
    const query = this.buildQuery(params as any);
    return this.request(
      `/inventory/analytics/by-category${query ? "?" + query : ""}`
    );
  }

  async exportInventoryCSV(params?: {
    batchId?: number;
    startDate?: string;
    endDate?: string;
  }) {
    const query = this.buildQuery(params as any);
    return this.request(`/inventory/export/csv${query ? "?" + query : ""}`);
  }

  async exportInventoryJSON(params?: {
    batchId?: number;
    startDate?: string;
    endDate?: string;
  }) {
    const query = this.buildQuery(params as any);
    return this.request(`/inventory/export/json${query ? "?" + query : ""}`);
  }

  // ============ SHIFTS (Смены продавцов) ============
  async getCurrentShift(userId: number) {
    return this.request(`/shifts/current/${userId}`);
  }

  async getShifts(params?: {
    userId?: number;
    startDate?: string;
    endDate?: string;
    sellerId?: number;
    status?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/shifts${query ? "?" + query : ""}`);
  }

  async getShift(id: number) {
    return this.request(`/shifts/${id}`);
  }

  async openShift(data: {
    userId: number;
    openingCash?: number;
    notes?: string;
  }) {
    return this.request("/shifts/open", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async closeShift(data: {
    userId: number;
    shiftId: number;
    closingCash: number;
    notes?: string;
  }) {
    return this.request("/shifts/close", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async addShiftSale(data: {
    shiftId: number;
    orderId?: number;
    saleAmount: number;
    discountAmount?: number;
    paymentMethod?: string;
    notes?: string;
  }) {
    return this.request("/shifts/sale", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateShiftSale(
    saleId: number,
    data: {
      saleAmount?: number;
      discountAmount?: number;
      paymentMethod?: string;
      notes?: string;
    }
  ) {
    return this.request(`/shifts/sales/${saleId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async deleteShiftSale(saleId: number) {
    return this.request(`/shifts/sales/${saleId}`, {
      method: "DELETE",
    });
  }

  async getSellerActiveOrders(sellerId: number) {
    return this.request(`/shifts/seller/${sellerId}/active-orders`);
  }

  async getShiftAnalyticsBySeller(params?: {
    startDate?: string;
    endDate?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(
      `/shifts/analytics/by-seller${query ? "?" + query : ""}`
    );
  }

  async getShiftAnalyticsByDay(params?: {
    startDate?: string;
    endDate?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/shifts/analytics/by-day${query ? "?" + query : ""}`);
  }

  async exportShiftsCSV(params?: {
    startDate?: string;
    endDate?: string;
    sellerId?: number;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/shifts/export/csv${query ? "?" + query : ""}`);
  }

  // ============ CALENDAR (Календарь и аналитика) ============
  async getCalendarEvents(params?: {
    startDate?: string;
    endDate?: string;
    eventType?: string;
    priority?: string;
    isRead?: string;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/calendar/events${query ? "?" + query : ""}`);
  }

  async getCalendarMonthEvents(year: number, month: number) {
    return this.request(`/calendar/events/month/${year}/${month}`);
  }

  async createCalendarEvent(data: {
    userId: number;
    eventDate: string;
    eventType?: string;
    title: string;
    description?: string;
    priority?: string;
  }) {
    return this.request("/calendar/events", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async updateCalendarEvent(
    id: number,
    data: {
      title?: string;
      description?: string;
      priority?: string;
      isRead?: boolean;
    }
  ) {
    return this.request(`/calendar/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async markEventAsRead(id: number) {
    return this.request(`/calendar/events/${id}/read`, {
      method: "POST",
    });
  }

  async deleteCalendarEvent(id: number, userId: number) {
    return this.request(`/calendar/events/${id}?userId=${userId}`, {
      method: "DELETE",
    });
  }

  async getAnalyticsThresholds() {
    return this.request("/calendar/thresholds");
  }

  async updateAnalyticsThreshold(
    type: string,
    data: { userId: number; value?: number; isActive?: boolean }
  ) {
    return this.request(`/calendar/thresholds/${type}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async getAnalyticsSummary(params?: { startDate?: string; endDate?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/calendar/summary${query ? "?" + query : ""}`);
  }

  async getTopProducts(params?: {
    startDate?: string;
    endDate?: string;
    limit?: number;
  }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request(`/calendar/top-products${query ? "?" + query : ""}`);
  }

  async getAvailableOrders() {
    return this.request("/shifts/available-orders");
  }

  async acceptOrder(orderId: number, sellerId: number) {
    return this.request(`/shifts/accept-order/${orderId}/${sellerId}`, {
      method: "POST",
    });
  }

  async exportShiftsExcel(shiftId: number) {
    const url = `${this.baseURL}/shifts/export/excel/${shiftId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Export failed");
      }
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `Shift_${shiftId}_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
      return { success: true };
    } catch (error) {
      console.error("Export Error:", error);
      throw error;
    }
  }

  async generateCalendarEvents(userId: number) {
    return this.request("/calendar/generate-events", {
      method: "POST",
      body: JSON.stringify({ userId }),
    });
  }
}

export const api = new ApiClient();

// Named exports
export const register = (userData) => api.register(userData);
export const login = (email, password) => api.login(email, password);
export const getProducts = () => api.getProducts();
export const getProduct = (id) => api.getProduct(id);
export const createOrder = (orderData) => api.createOrder(orderData);
export const getUserOrders = (userId) => api.getUserOrders(userId);
export const getAllOrders = (userId) => api.getAllOrders(userId);
export const getCart = (userId) => api.getCart(userId);
export const addToCart = (userId, product_id, quantity) =>
  api.addToCart(userId, product_id, quantity);
export const updateCartItem = (itemId, userId, quantity) =>
  api.updateCartItem(itemId, userId, quantity);
export const removeFromCart = (itemId, userId) =>
  api.removeFromCart(itemId, userId);
export const clearCart = (userId) => api.clearCart(userId);
