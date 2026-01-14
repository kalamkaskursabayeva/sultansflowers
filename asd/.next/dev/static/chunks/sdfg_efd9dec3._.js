(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sdfg/lib/trucks-api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "trucksApiClient",
    ()=>trucksApiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE_URL = ("TURBOPACK compile-time value", "http://localhost:5000/api") || "http://localhost:5000/api";
class TrucksApiClient {
    async getTrucks(page = 1, limit = 10, filters) {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            sortBy: filters?.sortBy || "arrival_date",
            order: filters?.order || "DESC"
        });
        if (filters?.identifier) params.append("identifier", filters.identifier);
        if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
        if (filters?.dateTo) params.append("dateTo", filters.dateTo);
        if (filters?.status) params.append("status", filters.status);
        const response = await fetch(`${API_BASE_URL}/trucks?${params}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch trucks");
        return response.json();
    }
    async getTruck(id) {
        const response = await fetch(`${API_BASE_URL}/trucks/${id}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch truck");
        return response.json();
    }
    async createTruck(truck) {
        const response = await fetch(`${API_BASE_URL}/trucks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(truck),
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to create truck");
        return response.json();
    }
    async updateTruck(id, truck) {
        const response = await fetch(`${API_BASE_URL}/trucks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(truck),
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to update truck");
        return response.json();
    }
    async deleteTruck(id) {
        const response = await fetch(`${API_BASE_URL}/trucks/${id}`, {
            method: "DELETE",
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to delete truck");
        return response.json();
    }
    async getAnalyticsSummary() {
        const response = await fetch(`${API_BASE_URL}/trucks/analytics/summary`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch analytics");
        return response.json();
    }
    async getAnalyticsByDate(dateFrom, dateTo) {
        const params = new URLSearchParams();
        if (dateFrom) params.append("dateFrom", dateFrom);
        if (dateTo) params.append("dateTo", dateTo);
        const response = await fetch(`${API_BASE_URL}/trucks/analytics/by-date?${params}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to fetch analytics by date");
        return response.json();
    }
    async exportToExcel(filters) {
        const params = new URLSearchParams();
        if (filters?.identifier) params.append("identifier", filters.identifier);
        if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
        if (filters?.dateTo) params.append("dateTo", filters.dateTo);
        if (filters?.status) params.append("status", filters.status);
        const response = await fetch(`${API_BASE_URL}/trucks/export/excel?${params}`, {
            credentials: "include"
        });
        if (!response.ok) throw new Error("Failed to export");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `trucks-${new Date().toISOString().split("T")[0]}.xlsx`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
}
const trucksApiClient = new TrucksApiClient();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/app/admin/trucks/page.tsx [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const e = new Error("Could not parse module '[project]/sdfg/app/admin/trucks/page.tsx'\n\nExpression expected");
e.code = 'MODULE_UNPARSABLE';
throw e;
}),
]);

//# sourceMappingURL=sdfg_efd9dec3._.js.map