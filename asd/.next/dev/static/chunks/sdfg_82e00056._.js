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
        const query = new URLSearchParams(params).toString();
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
        const query = new URLSearchParams(params).toString();
        return this.request(`/inventory/analytics/price-comparison${query ? "?" + query : ""}`);
    }
    async getInventoryByCategory(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/inventory/analytics/by-category${query ? "?" + query : ""}`);
    }
    async exportInventoryCSV(params) {
        const query = new URLSearchParams(params).toString();
        return this.request(`/inventory/export/csv${query ? "?" + query : ""}`);
    }
    async exportInventoryJSON(params) {
        const query = new URLSearchParams(params).toString();
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
]);

//# sourceMappingURL=sdfg_82e00056._.js.map