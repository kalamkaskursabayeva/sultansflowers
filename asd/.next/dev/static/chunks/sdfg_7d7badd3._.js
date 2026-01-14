(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sdfg/contexts/language-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageProvider",
    ()=>LanguageProvider,
    "useLanguageContext",
    ()=>useLanguageContext
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
const LanguageContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function LanguageProvider({ children }) {
    _s();
    const [language, setLanguageState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("en");
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "LanguageProvider.useEffect": ()=>{
            setIsClient(true);
            // Load language from localStorage or browser language
            const stored = localStorage.getItem("language");
            const browserLang = navigator.language.split("-")[0];
            const initialLang = stored || ([
                "en",
                "ru",
                "kk"
            ].includes(browserLang) ? browserLang : "en");
            setLanguageState(initialLang);
        }
    }["LanguageProvider.useEffect"], []);
    const setLanguage = (lang)=>{
        setLanguageState(lang);
        localStorage.setItem("language", lang);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LanguageContext.Provider, {
        value: {
            language,
            setLanguage,
            isClient
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/sdfg/contexts/language-context.tsx",
        lineNumber: 34,
        columnNumber: 10
    }, this);
}
_s(LanguageProvider, "URDChq9j8h9AdshWo88mWE4k3XI=");
_c = LanguageProvider;
function useLanguageContext() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(LanguageContext);
    if (!context) {
        throw new Error("useLanguageContext must be used within LanguageProvider");
    }
    return context;
}
_s1(useLanguageContext, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "LanguageProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/lib/api-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// API client для связи фронтенда с бэкендом
__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "api",
    ()=>api,
    "clearCart",
    ()=>clearCart,
    "createOrder",
    ()=>createOrder,
    "getAllOrders",
    ()=>getAllOrders,
    "getCart",
    ()=>getCart,
    "getProduct",
    ()=>getProduct,
    "getProducts",
    ()=>getProducts,
    "getUserOrders",
    ()=>getUserOrders,
    "login",
    ()=>login,
    "register",
    ()=>register,
    "removeFromCart",
    ()=>removeFromCart,
    "updateCartItem",
    ()=>updateCartItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://localhost:5000/api";
class ApiClient {
    baseURL;
    constructor(){
        this.baseURL = API_URL;
    }
    buildQuery(params) {
        const safe = {};
        if (params) {
            Object.entries(params).forEach(([k, v])=>{
                if (v !== undefined && v !== null) safe[k] = String(v);
            });
        }
        return new URLSearchParams(safe).toString();
    }
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                ...options.headers
            },
            ...options
        };
        try {
            const response = await fetch(url, config);
            const contentType = response.headers.get("content-type") || "";
            console.log(`[API] ${endpoint} - Status: ${response.status}, Content-Type: ${contentType}`);
            // Если ответ JSON — парсим как раньше
            if (contentType.includes("application/json")) {
                const data = await response.json().catch(()=>({
                        error: `HTTP ${response.status}: ${response.statusText}`
                    }));
                if (!response.ok) {
                    return {
                        success: false,
                        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
                        ...data
                    };
                }
                return data;
            }
            // Если это CSV — возвращаем текст (чтобы frontend мог создать Blob из строки)
            if (contentType.includes("text/csv") || contentType.includes("text/plain")) {
                const text = await response.text();
                console.log(`[API] ${endpoint} - CSV text length: ${text.length}`);
                if (!response.ok) {
                    return {
                        success: false,
                        error: `HTTP ${response.status}: ${response.statusText}`
                    };
                }
                return text;
            }
            // Если это бинарный файл (xlsx) — возвращаем Blob
            if (contentType.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") || contentType.includes("application/octet-stream")) {
                const blob = await response.blob();
                if (!response.ok) {
                    return {
                        success: false,
                        error: `HTTP ${response.status}: ${response.statusText}`
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
                        error: data.error || `HTTP ${response.status}: ${response.statusText}`,
                        ...data
                    };
                }
                return data;
            } catch (e) {
                const text = await response.text();
                if (!response.ok) {
                    return {
                        success: false,
                        error: `HTTP ${response.status}: ${response.statusText}`
                    };
                }
                return text;
            }
        } catch (error) {
            console.error("API Request Error:", error);
            // Возвращаем ошибку вместо выброса
            return {
                success: false,
                error: error instanceof Error ? error.message : "Unknown error"
            };
        }
    }
    async register(userData) {
        return this.request("/users/register", {
            method: "POST",
            body: JSON.stringify(userData)
        });
    }
    async login(email, password) {
        return this.request("/users/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            })
        });
    }
    // ============ USERS (Admin) ============
    async getAllUsers(adminId) {
        return this.request(`/users/admin/users?adminId=${adminId}`);
    }
    async updateUserRole(adminId, userId, newRole) {
        return this.request(`/users/admin/users/${userId}/role`, {
            method: "PUT",
            body: JSON.stringify({
                adminId,
                newRole
            })
        });
    }
    async deleteUser(adminId, userId) {
        return this.request(`/users/admin/users/${userId}?adminId=${adminId}`, {
            method: "DELETE"
        });
    }
    async updateUser(adminId, userId, userData) {
        return this.request(`/users/admin/users/${userId}`, {
            method: "PUT",
            body: JSON.stringify({
                adminId,
                ...userData
            })
        });
    }
    async changeUserPassword(adminId, userId, newPassword) {
        return this.request(`/users/admin/users/${userId}/password`, {
            method: "PUT",
            body: JSON.stringify({
                adminId,
                newPassword
            })
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
            body: JSON.stringify({
                userId,
                ...productData
            })
        });
    }
    async updateProduct(userId, productId, productData) {
        return this.request(`/products/${productId}`, {
            method: "PUT",
            body: JSON.stringify({
                userId,
                ...productData
            })
        });
    }
    async deleteProduct(adminId, productId) {
        return this.request(`/products/${productId}?adminId=${adminId}`, {
            method: "DELETE"
        });
    }
    // ============ ORDERS ============
    async createOrder(orderData) {
        return this.request("/orders", {
            method: "POST",
            body: JSON.stringify(orderData)
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
            body: JSON.stringify({
                userId
            })
        });
    }
    async updateOrderStatus(userId, orderId, status) {
        return this.request(`/orders/${orderId}/status`, {
            method: "PUT",
            body: JSON.stringify({
                userId,
                status
            })
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
        const params = new URLSearchParams({
            adminId,
            ...filters
        });
        return this.request(`/logs?${params.toString()}`);
    }
    async getLogsStats(adminId) {
        return this.request(`/logs/stats?adminId=${adminId}`);
    }
    async cleanOldLogs(adminId, days = 90) {
        return this.request("/logs/clean", {
            method: "DELETE",
            body: JSON.stringify({
                adminId,
                days
            })
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
            body: JSON.stringify({
                userId,
                ...flowerData
            })
        });
    }
    async updateFlower(userId, flowerId, flowerData) {
        return this.request(`/flowers/${flowerId}`, {
            method: "PUT",
            body: JSON.stringify({
                userId,
                ...flowerData
            })
        });
    }
    async deleteFlower(adminId, flowerId) {
        return this.request(`/flowers/${flowerId}?adminId=${adminId}`, {
            method: "DELETE"
        });
    }
    // ============ USER PROFILE ============
    async updateProfile(userId, profileData) {
        return this.request(`/users/profile/${userId}`, {
            method: "PUT",
            body: JSON.stringify(profileData)
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
            body: JSON.stringify({
                userId,
                product_id,
                quantity
            })
        });
    }
    async updateCartItem(itemId, userId, quantity) {
        return this.request(`/cart/${itemId}`, {
            method: "PUT",
            body: JSON.stringify({
                userId,
                quantity
            })
        });
    }
    async removeFromCart(itemId, userId) {
        return this.request(`/cart/${itemId}?userId=${userId}`, {
            method: "DELETE"
        });
    }
    async clearCart(userId) {
        return this.request(`/cart/user/${userId}/clear`, {
            method: "DELETE"
        });
    }
    // ============ INVENTORY (Поставки товаров) ============
    async getInventoryBatches(params) {
        const query = this.buildQuery(params);
        return this.request(`/inventory/batches${query ? "?" + query : ""}`);
    }
    async getInventoryBatch(id) {
        return this.request(`/inventory/batches/${id}`);
    }
    async createInventoryBatch(data) {
        return this.request("/inventory/batches", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    async updateInventoryBatch(id, data) {
        return this.request(`/inventory/batches/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    }
    async deleteInventoryBatch(id, userId) {
        return this.request(`/inventory/batches/${id}?userId=${userId}`, {
            method: "DELETE"
        });
    }
    async getInventoryPriceComparison(params) {
        const query = this.buildQuery(params);
        return this.request(`/inventory/analytics/price-comparison${query ? "?" + query : ""}`);
    }
    async getInventoryByCategory(params) {
        const query = this.buildQuery(params);
        return this.request(`/inventory/analytics/by-category${query ? "?" + query : ""}`);
    }
    async exportInventoryCSV(params) {
        const query = this.buildQuery(params);
        return this.request(`/inventory/export/csv${query ? "?" + query : ""}`);
    }
    async exportInventoryJSON(params) {
        const query = this.buildQuery(params);
        return this.request(`/inventory/export/json${query ? "?" + query : ""}`);
    }
    // ============ SHIFTS (Смены продавцов) ============
    async getCurrentShift(userId) {
        return this.request(`/shifts/current/${userId}`);
    }
    async getShifts(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/shifts${query ? "?" + query : ""}`);
    }
    async getShift(id) {
        return this.request(`/shifts/${id}`);
    }
    async openShift(data) {
        return this.request("/shifts/open", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    async closeShift(data) {
        return this.request("/shifts/close", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    async addShiftSale(data) {
        return this.request("/shifts/sale", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    async updateShiftSale(saleId, data) {
        return this.request(`/shifts/sales/${saleId}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    }
    async deleteShiftSale(saleId) {
        return this.request(`/shifts/sales/${saleId}`, {
            method: "DELETE"
        });
    }
    async getSellerActiveOrders(sellerId) {
        return this.request(`/shifts/seller/${sellerId}/active-orders`);
    }
    async getShiftAnalyticsBySeller(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/shifts/analytics/by-seller${query ? "?" + query : ""}`);
    }
    async getShiftAnalyticsByDay(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/shifts/analytics/by-day${query ? "?" + query : ""}`);
    }
    async exportShiftsCSV(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/shifts/export/csv${query ? "?" + query : ""}`);
    }
    // ============ CALENDAR (Календарь и аналитика) ============
    async getCalendarEvents(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/calendar/events${query ? "?" + query : ""}`);
    }
    async getCalendarMonthEvents(year, month) {
        return this.request(`/calendar/events/month/${year}/${month}`);
    }
    async createCalendarEvent(data) {
        return this.request("/calendar/events", {
            method: "POST",
            body: JSON.stringify(data)
        });
    }
    async updateCalendarEvent(id, data) {
        return this.request(`/calendar/events/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    }
    async markEventAsRead(id) {
        return this.request(`/calendar/events/${id}/read`, {
            method: "POST"
        });
    }
    async deleteCalendarEvent(id, userId) {
        return this.request(`/calendar/events/${id}?userId=${userId}`, {
            method: "DELETE"
        });
    }
    async getAnalyticsThresholds() {
        return this.request("/calendar/thresholds");
    }
    async updateAnalyticsThreshold(type, data) {
        return this.request(`/calendar/thresholds/${type}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    }
    async getAnalyticsSummary(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/calendar/summary${query ? "?" + query : ""}`);
    }
    async getTopProducts(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/calendar/top-products${query ? "?" + query : ""}`);
    }
    async getAvailableOrders() {
        return this.request("/shifts/available-orders");
    }
    async acceptOrder(orderId, sellerId) {
        return this.request(`/shifts/accept-order/${orderId}/${sellerId}`, {
            method: "POST"
        });
    }
    async exportShiftsExcel(shiftId) {
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
            link.download = `Shift_${shiftId}_${new Date().toISOString().split("T")[0]}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(downloadUrl);
            return {
                success: true
            };
        } catch (error) {
            console.error("Export Error:", error);
            throw error;
        }
    }
    async generateCalendarEvents(userId) {
        return this.request("/calendar/generate-events", {
            method: "POST",
            body: JSON.stringify({
                userId
            })
        });
    }
}
const api = new ApiClient();
const register = (userData)=>api.register(userData);
const login = (email, password)=>api.login(email, password);
const getProducts = ()=>api.getProducts();
const getProduct = (id)=>api.getProduct(id);
const createOrder = (orderData)=>api.createOrder(orderData);
const getUserOrders = (userId)=>api.getUserOrders(userId);
const getAllOrders = (userId)=>api.getAllOrders(userId);
const getCart = (userId)=>api.getCart(userId);
const addToCart = (userId, product_id, quantity)=>api.addToCart(userId, product_id, quantity);
const updateCartItem = (itemId, userId, quantity)=>api.updateCartItem(itemId, userId, quantity);
const removeFromCart = (itemId, userId)=>api.removeFromCart(itemId, userId);
const clearCart = (userId)=>api.clearCart(userId);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/contexts/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    // Check for saved session on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            const savedUser = localStorage.getItem("greenflowers_user");
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch  {
                    localStorage.removeItem("greenflowers_user");
                }
            }
            setIsLoading(false);
        }
    }["AuthProvider.useEffect"], []);
    const login = async (email, password)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].login(email, password);
            if (response.success && response.user) {
                setUser(response.user);
                localStorage.setItem("greenflowers_user", JSON.stringify(response.user));
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: "Ошибка входа"
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Неверный email или пароль"
            };
        }
    };
    const register = async (data)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].register({
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                city: data.city,
                company_name: undefined
            });
            if (response.success && response.user) {
                setUser(response.user);
                localStorage.setItem("greenflowers_user", JSON.stringify(response.user));
                return {
                    success: true
                };
            }
            return {
                success: false,
                error: "Ошибка регистрации"
            };
        } catch (error) {
            return {
                success: false,
                error: error.message || "Пользователь с таким email уже существует"
            };
        }
    };
    const logout = ()=>{
        setUser(null);
        localStorage.removeItem("greenflowers_user");
    };
    const updateUser = (userData)=>{
        setUser(userData);
        localStorage.setItem("greenflowers_user", JSON.stringify(userData));
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            isLoading,
            login,
            register,
            logout,
            updateUser,
            isAuthenticated: !!user
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/sdfg/contexts/auth-context.tsx",
        lineNumber: 107,
        columnNumber: 5
    }, this);
}
_s(AuthProvider, "YajQB7LURzRD+QP5gw0+K2TZIWA=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/contexts/cart-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CartProvider",
    ()=>CartProvider,
    "useCart",
    ()=>useCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/api-client.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const CartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function CartProvider({ children }) {
    _s();
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [userId, setUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Загрузка userId из localStorage
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            const savedUser = localStorage.getItem('greenflowers_user');
            if (savedUser) {
                try {
                    const user = JSON.parse(savedUser);
                    setUserId(user.id);
                } catch (error) {
                    console.error('Error loading user:', error);
                }
            }
        }
    }["CartProvider.useEffect"], []);
    // Загрузка корзины при монтировании
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CartProvider.useEffect": ()=>{
            if (userId) {
                loadCart();
            }
        }
    }["CartProvider.useEffect"], [
        userId
    ]);
    const loadCart = async ()=>{
        if (!userId) return;
        setLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCart(userId);
            if (response.success) {
                setCart(response.cart || []);
            }
        } catch (error) {
            console.error('Error loading cart:', error);
        } finally{
            setLoading(false);
        }
    };
    const addToCart = async (product, quantity)=>{
        if (!userId) {
            // Если нет пользователя, сохраняем в localStorage временно
            const tempCart = JSON.parse(localStorage.getItem('temp_cart') || '[]');
            tempCart.push({
                product,
                quantity
            });
            localStorage.setItem('temp_cart', JSON.stringify(tempCart));
            alert('Войдите в аккаунт чтобы сохранить корзину');
            return;
        }
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].addToCart(userId, product.id, quantity);
            if (response.success) {
                await loadCart();
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Ошибка при добавлении в корзину');
        }
    };
    const removeFromCart = async (itemId)=>{
        if (!userId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].removeFromCart(itemId, userId);
            if (response.success) {
                await loadCart();
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    };
    const updateQuantity = async (itemId, quantity)=>{
        if (!userId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].updateCartItem(itemId, userId, quantity);
            if (response.success) {
                await loadCart();
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };
    const clearCart = async ()=>{
        if (!userId) return;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].clearCart(userId);
            if (response.success) {
                setCart([]);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };
    const getCartTotal = ()=>{
        return cart.reduce((total, item)=>{
            const pricePerBox = Number(item.price_per_box || Number(item.price_per_unit || 0) * 50);
            return total + pricePerBox * item.quantity;
        }, 0);
    };
    const getCartCount = ()=>{
        return cart.reduce((count, item)=>count + item.quantity, 0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CartContext.Provider, {
        value: {
            cart,
            loading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount,
            loadCart
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/sdfg/contexts/cart-context.tsx",
        lineNumber: 148,
        columnNumber: 5
    }, this);
}
_s(CartProvider, "fSnJyKU0FG8+QjPtmwqqR6TsVuA=");
_c = CartProvider;
function useCart() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
_s1(useCart, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "CartProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/sdfg/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/sdfg/node_modules/@vercel/analytics/dist/next/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Analytics",
    ()=>Analytics2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
// src/nextjs/index.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
// src/nextjs/utils.ts
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/navigation.js [app-client] (ecmascript)");
"use client";
;
;
// package.json
var name = "@vercel/analytics";
var version = "1.6.1";
// src/queue.ts
var initQueue = ()=>{
    if (window.va) return;
    window.va = function a(...params) {
        (window.vaq = window.vaq || []).push(params);
    };
};
// src/utils.ts
function isBrowser() {
    return typeof window !== "undefined";
}
function detectEnvironment() {
    try {
        const env = ("TURBOPACK compile-time value", "development");
        if ("TURBOPACK compile-time truthy", 1) {
            return "development";
        }
    } catch (e) {}
    return "production";
}
function setMode(mode = "auto") {
    if (mode === "auto") {
        window.vam = detectEnvironment();
        return;
    }
    window.vam = mode;
}
function getMode() {
    const mode = isBrowser() ? window.vam : detectEnvironment();
    return mode || "production";
}
function isDevelopment() {
    return getMode() === "development";
}
function computeRoute(pathname, pathParams) {
    if (!pathname || !pathParams) {
        return pathname;
    }
    let result = pathname;
    try {
        const entries = Object.entries(pathParams);
        for (const [key, value] of entries){
            if (!Array.isArray(value)) {
                const matcher = turnValueToRegExp(value);
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[${key}]`);
                }
            }
        }
        for (const [key, value] of entries){
            if (Array.isArray(value)) {
                const matcher = turnValueToRegExp(value.join("/"));
                if (matcher.test(result)) {
                    result = result.replace(matcher, `/[...${key}]`);
                }
            }
        }
        return result;
    } catch (e) {
        return pathname;
    }
}
function turnValueToRegExp(value) {
    return new RegExp(`/${escapeRegExp(value)}(?=[/?#]|$)`);
}
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function getScriptSrc(props) {
    if (props.scriptSrc) {
        return props.scriptSrc;
    }
    if (isDevelopment()) {
        return "https://va.vercel-scripts.com/v1/script.debug.js";
    }
    if (props.basePath) {
        return `${props.basePath}/insights/script.js`;
    }
    return "/_vercel/insights/script.js";
}
// src/generic.ts
function inject(props = {
    debug: true
}) {
    var _a;
    if (!isBrowser()) return;
    setMode(props.mode);
    initQueue();
    if (props.beforeSend) {
        (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
    }
    const src = getScriptSrc(props);
    if (document.head.querySelector(`script[src*="${src}"]`)) return;
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.dataset.sdkn = name + (props.framework ? `/${props.framework}` : "");
    script.dataset.sdkv = version;
    if (props.disableAutoTrack) {
        script.dataset.disableAutoTrack = "1";
    }
    if (props.endpoint) {
        script.dataset.endpoint = props.endpoint;
    } else if (props.basePath) {
        script.dataset.endpoint = `${props.basePath}/insights`;
    }
    if (props.dsn) {
        script.dataset.dsn = props.dsn;
    }
    script.onerror = ()=>{
        const errorMessage = isDevelopment() ? "Please check if any ad blockers are enabled and try again." : "Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.";
        console.log(`[Vercel Web Analytics] Failed to load script from ${src}. ${errorMessage}`);
    };
    if (isDevelopment() && props.debug === false) {
        script.dataset.debug = "false";
    }
    document.head.appendChild(script);
}
function pageview({ route, path }) {
    var _a;
    (_a = window.va) == null ? void 0 : _a.call(window, "pageview", {
        route,
        path
    });
}
// src/react/utils.ts
function getBasePath() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === "undefined" || typeof __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env === "undefined") {
        return void 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.REACT_APP_VERCEL_OBSERVABILITY_BASEPATH;
}
// src/react/index.tsx
function Analytics(props) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            var _a;
            if (props.beforeSend) {
                (_a = window.va) == null ? void 0 : _a.call(window, "beforeSend", props.beforeSend);
            }
        }
    }["Analytics.useEffect"], [
        props.beforeSend
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            inject({
                framework: props.framework || "react",
                basePath: props.basePath ?? getBasePath(),
                ...props.route !== void 0 && {
                    disableAutoTrack: true
                },
                ...props
            });
        }
    }["Analytics.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Analytics.useEffect": ()=>{
            if (props.route && props.path) {
                pageview({
                    route: props.route,
                    path: props.path
                });
            }
        }
    }["Analytics.useEffect"], [
        props.route,
        props.path
    ]);
    return null;
}
;
var useRoute = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const path = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (!params) {
        return {
            route: null,
            path
        };
    }
    const finalParams = Object.keys(params).length ? params : Object.fromEntries(searchParams.entries());
    return {
        route: computeRoute(path, finalParams),
        path
    };
};
function getBasePath2() {
    if (typeof __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] === "undefined" || typeof __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env === "undefined") {
        return void 0;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH;
}
// src/nextjs/index.tsx
function AnalyticsComponent(props) {
    const { route, path } = useRoute();
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(Analytics, {
        path,
        route,
        ...props,
        basePath: getBasePath2(),
        framework: "next"
    });
}
function Analytics2(props) {
    return /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null
    }, /* @__PURE__ */ __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createElement(AnalyticsComponent, {
        ...props
    }));
}
;
 //# sourceMappingURL=index.mjs.map
}),
"[project]/sdfg/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/sdfg/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=sdfg_7d7badd3._.js.map