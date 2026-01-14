(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sdfg/components/dashboard-layout.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DashboardLayout",
    ()=>DashboardLayout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/contexts/auth-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function DashboardLayout({ children, requiredRole, title }) {
    _s();
    const { user, isLoading, isAuthenticated, logout } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardLayout.useEffect": ()=>{
            if (!isLoading) {
                if (!isAuthenticated) {
                    router.push("/auth");
                    return;
                }
                if (requiredRole && user) {
                    const roles = Array.isArray(requiredRole) ? requiredRole : [
                        requiredRole
                    ];
                    if (!roles.includes(user.role)) {
                        router.push("/dashboard");
                    }
                }
            }
        }
    }["DashboardLayout.useEffect"], [
        isLoading,
        isAuthenticated,
        user,
        requiredRole,
        router
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen flex items-center justify-center bg-gray-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "animate-spin w-8 h-8 border-4 border-[#568a56] border-t-transparent rounded-full"
            }, void 0, false, {
                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
            lineNumber: 40,
            columnNumber: 7
        }, this);
    }
    if (!user) return null;
    const getNavItems = ()=>{
        const items = [];
        if (user.role === "admin") {
            items.push({
                href: "/admin",
                label: "Обзор",
                icon: "home"
            }, {
                href: "/admin/users",
                label: "Пользователи",
                icon: "users"
            }, {
                href: "/admin/employees",
                label: "Сотрудники",
                icon: "briefcase"
            }, {
                href: "/admin/flowers",
                label: "Цветы",
                icon: "flower"
            }, {
                href: "/admin/orders",
                label: "Заказы",
                icon: "shopping-cart"
            }, {
                href: "/admin/inventory",
                label: "Поставки",
                icon: "package"
            }, {
                href: "/admin/shifts",
                label: "Смены",
                icon: "clock"
            }, {
                href: "/admin/calendar",
                label: "Календарь",
                icon: "calendar"
            });
        } else if (user.role === "worker") {
            items.push({
                href: "/employee",
                label: "Обзор",
                icon: "home"
            }, {
                href: "/employee/flowers",
                label: "Цветы",
                icon: "flower"
            }, {
                href: "/employee/orders",
                label: "Заказы",
                icon: "shopping-cart"
            }, {
                href: "/admin/inventory",
                label: "Поставки",
                icon: "package"
            }, {
                href: "/admin/shifts",
                label: "Смены",
                icon: "clock"
            }, {
                href: "/admin/calendar",
                label: "Календарь",
                icon: "calendar"
            });
        } else {
            items.push({
                href: "/client",
                label: "Обзор",
                icon: "home"
            }, {
                href: "/catalog",
                label: "Цветы",
                icon: "flower"
            }, {
                href: "/client/orders",
                label: "Заказы",
                icon: "shopping-cart"
            }, {
                href: "/client/profile",
                label: "Профиль",
                icon: "user"
            });
        }
        return items;
    };
    const navItems = getNavItems();
    const getIcon = (icon)=>{
        switch(icon){
            case "home":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 89,
                    columnNumber: 11
                }, this);
            case "users":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m9 5.197v1"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 101,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 100,
                    columnNumber: 11
                }, this);
            case "briefcase":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 112,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 111,
                    columnNumber: 11
                }, this);
            case "package":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 123,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this);
            case "shopping-cart":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 134,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 133,
                    columnNumber: 11
                }, this);
            case "clock":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 145,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 144,
                    columnNumber: 11
                }, this);
            case "plus":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 4v16m8-8H4"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 156,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 155,
                    columnNumber: 11
                }, this);
            case "flower":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 162,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this);
            case "user":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 168,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 167,
                    columnNumber: 11
                }, this);
            case "calendar":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                    className: "w-5 h-5",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                        d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 174,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 173,
                    columnNumber: 11
                }, this);
            default:
                return null;
        }
    };
    const getRoleBadge = ()=>{
        switch(user.role){
            case "admin":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded-full",
                    children: "Админ"
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 185,
                    columnNumber: 16
                }, this);
            case "employee":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full",
                    children: "Работник"
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 187,
                    columnNumber: 16
                }, this);
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full",
                    children: "Клиент"
                }, void 0, false, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 189,
                    columnNumber: 16
                }, this);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 flex",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-64 bg-white border-r border-gray-200 hidden lg:block",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "h-full flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-gray-200",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.png",
                                        alt: "Green Flowers",
                                        width: 40,
                                        height: 40,
                                        className: "h-10 w-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                        lineNumber: 201,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-bold text-[#568a56]",
                                        children: "Green Flowers"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-b border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-medium text-gray-900 truncate",
                                    children: user.name
                                }, void 0, false, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 208,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 truncate",
                                    children: user.email
                                }, void 0, false, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 209,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2",
                                    children: getRoleBadge()
                                }, void 0, false, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 210,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                            lineNumber: 207,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "flex-1 p-4 space-y-1",
                            children: navItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: item.href,
                                    className: "flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-green-50 hover:text-[#568a56] rounded-lg transition-colors",
                                    children: [
                                        getIcon(item.icon),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium",
                                            children: item.label
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, item.href, true, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 216,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-4 border-t border-gray-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors mb-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M10 19l-7-7m0 0l7-7m-7 7h18"
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                                lineNumber: 234,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "На сайт"
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                            lineNumber: 236,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: logout,
                                    className: "flex items-center gap-3 px-3 py-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "w-5 h-5",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: 2,
                                                d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                                lineNumber: 243,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                            lineNumber: 242,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Выйти"
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                            lineNumber: 250,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                    lineNumber: 238,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                            lineNumber: 228,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                    lineNumber: 197,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex flex-col min-h-screen",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-xl font-bold text-gray-900",
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                lineNumber: 260,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-500 hidden sm:block",
                                        children: user.email
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                        lineNumber: 262,
                                        columnNumber: 13
                                    }, this),
                                    getRoleBadge()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                                lineNumber: 261,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "flex-1 p-6",
                        children: children
                    }, void 0, false, {
                        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sdfg/components/dashboard-layout.tsx",
                lineNumber: 257,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sdfg/components/dashboard-layout.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_s(DashboardLayout, "Ad3ZD1KLNPSeAs03rpuxSQZTOoQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardLayout;
var _c;
__turbopack_context__.k.register(_c, "DashboardLayout");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/lib/auth.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auth types and mock data for authentication system
__turbopack_context__.s([
    "hasPermission",
    ()=>hasPermission,
    "kazakhstanCities",
    ()=>kazakhstanCities,
    "mockPasswords",
    ()=>mockPasswords,
    "mockUsers",
    ()=>mockUsers,
    "rolePermissions",
    ()=>rolePermissions
]);
const mockUsers = [
    {
        id: "admin-1",
        email: "admin@greenflowers.kz",
        name: "Администратор",
        phone: "+7 708 235 4533",
        role: "admin",
        createdAt: new Date("2024-01-01")
    },
    {
        id: "employee-1",
        email: "worker@greenflowers.kz",
        name: "Работник Склада",
        phone: "+7 777 111 2222",
        role: "employee",
        createdAt: new Date("2024-03-01")
    },
    {
        id: "client-1",
        email: "client@test.kz",
        name: "Иван Петров",
        phone: "+7 777 333 4444",
        role: "user",
        city: "Алматы",
        createdAt: new Date("2024-06-01")
    }
];
const mockPasswords = {
    "admin@greenflowers.kz": "admin123",
    "worker@greenflowers.kz": "worker123",
    "client@test.kz": "client123"
};
const kazakhstanCities = [
    {
        id: "almaty",
        name: {
            ru: "Алматы",
            en: "Almaty",
            kk: "Алматы"
        }
    },
    {
        id: "astana",
        name: {
            ru: "Астана",
            en: "Astana",
            kk: "Астана"
        }
    },
    {
        id: "shymkent",
        name: {
            ru: "Шымкент",
            en: "Shymkent",
            kk: "Шымкент"
        }
    },
    {
        id: "karaganda",
        name: {
            ru: "Караганда",
            en: "Karaganda",
            kk: "Қарағанды"
        }
    },
    {
        id: "aktobe",
        name: {
            ru: "Актобе",
            en: "Aktobe",
            kk: "Ақтөбе"
        }
    },
    {
        id: "taraz",
        name: {
            ru: "Тараз",
            en: "Taraz",
            kk: "Тараз"
        }
    },
    {
        id: "pavlodar",
        name: {
            ru: "Павлодар",
            en: "Pavlodar",
            kk: "Павлодар"
        }
    },
    {
        id: "ust-kamenogorsk",
        name: {
            ru: "Усть-Каменогорск",
            en: "Ust-Kamenogorsk",
            kk: "Өскемен"
        }
    },
    {
        id: "semey",
        name: {
            ru: "Семей",
            en: "Semey",
            kk: "Семей"
        }
    },
    {
        id: "atyrau",
        name: {
            ru: "Атырау",
            en: "Atyrau",
            kk: "Атырау"
        }
    },
    {
        id: "kostanay",
        name: {
            ru: "Костанай",
            en: "Kostanay",
            kk: "Қостанай"
        }
    },
    {
        id: "petropavlovsk",
        name: {
            ru: "Петропавловск",
            en: "Petropavlovsk",
            kk: "Петропавл"
        }
    },
    {
        id: "oral",
        name: {
            ru: "Уральск",
            en: "Oral",
            kk: "Орал"
        }
    },
    {
        id: "aktau",
        name: {
            ru: "Актау",
            en: "Aktau",
            kk: "Ақтау"
        }
    },
    {
        id: "kyzylorda",
        name: {
            ru: "Кызылорда",
            en: "Kyzylorda",
            kk: "Қызылорда"
        }
    },
    {
        id: "turkestan",
        name: {
            ru: "Туркестан",
            en: "Turkestan",
            kk: "Түркістан"
        }
    }
];
const rolePermissions = {
    client: {
        canViewCatalog: true,
        canCreateOrder: true,
        canViewOwnOrders: true,
        canCreatePreorder: true,
        canManageProducts: false,
        canManageOrders: false,
        canManageUsers: false,
        canViewAllOrders: false,
        canManageEmployees: false
    },
    employee: {
        canViewCatalog: true,
        canCreateOrder: true,
        canViewOwnOrders: true,
        canCreatePreorder: true,
        canManageProducts: true,
        canManageOrders: true,
        canManageUsers: false,
        canViewAllOrders: true,
        canManageEmployees: false
    },
    admin: {
        canViewCatalog: true,
        canCreateOrder: true,
        canViewOwnOrders: true,
        canCreatePreorder: true,
        canManageProducts: true,
        canManageOrders: true,
        canManageUsers: true,
        canViewAllOrders: true,
        canManageEmployees: true
    }
};
function hasPermission(role, permission) {
    return rolePermissions[role]?.[permission] ?? false;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/lib/orders.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCityName",
    ()=>getCityName,
    "getStatusColor",
    ()=>getStatusColor,
    "getStatusLabel",
    ()=>getStatusLabel,
    "holidayTypes",
    ()=>holidayTypes,
    "mockOrders",
    ()=>mockOrders,
    "mockPreorders",
    ()=>mockPreorders
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/auth.ts [app-client] (ecmascript)");
;
const holidayTypes = [
    {
        id: "valentine",
        name: {
            ru: "14 Февраля (День Святого Валентина)",
            en: "Valentine's Day",
            kk: "14 Ақпан"
        }
    },
    {
        id: "march8",
        name: {
            ru: "8 Марта (Международный женский день)",
            en: "International Women's Day",
            kk: "8 Наурыз"
        }
    },
    {
        id: "nauryz",
        name: {
            ru: "Наурыз (21-23 марта)",
            en: "Nauryz",
            kk: "Наурыз"
        }
    },
    {
        id: "mothersday",
        name: {
            ru: "День Матери",
            en: "Mother's Day",
            kk: "Аналар күні"
        }
    },
    {
        id: "september1",
        name: {
            ru: "1 Сентября (День Знаний)",
            en: "Knowledge Day",
            kk: "1 Қыркүйек"
        }
    },
    {
        id: "teachersday",
        name: {
            ru: "День Учителя",
            en: "Teacher's Day",
            kk: "Мұғалімдер күні"
        }
    },
    {
        id: "newyear",
        name: {
            ru: "Новый Год",
            en: "New Year",
            kk: "Жаңа Жыл"
        }
    },
    {
        id: "other",
        name: {
            ru: "Другой праздник",
            en: "Other Holiday",
            kk: "Басқа мереке"
        }
    }
];
const mockOrders = [
    {
        id: "ORD-001",
        clientId: "client-1",
        clientName: "Иван Петров",
        clientPhone: "+7 777 333 4444",
        cityId: "almaty",
        items: [
            {
                productId: 1,
                productName: "Розы красные Premium",
                quantity: 5,
                pricePerBox: 21250,
                total: 106250
            },
            {
                productId: 8,
                productName: "Гипсофила Million Star",
                quantity: 2,
                pricePerBox: 15000,
                total: 30000
            }
        ],
        total: 136250,
        status: "pending",
        deliveryDate: "2024-12-15",
        createdAt: new Date("2024-12-01"),
        notes: "Доставка до 10:00"
    },
    {
        id: "ORD-002",
        clientId: "client-2",
        clientName: "ТОО Цветочный Рай",
        clientPhone: "+7 777 555 6666",
        cityId: "astana",
        items: [
            {
                productId: 4,
                productName: "Хризантемы жёлтые Santini",
                quantity: 10,
                pricePerBox: 22500,
                total: 225000
            }
        ],
        total: 225000,
        status: "processing",
        deliveryDate: "2024-12-12",
        createdAt: new Date("2024-12-02")
    },
    {
        id: "ORD-003",
        clientId: "client-3",
        clientName: "Мария Иванова",
        clientPhone: "+7 777 777 8888",
        cityId: "shymkent",
        items: [
            {
                productId: 6,
                productName: "Гвоздики красные Premium",
                quantity: 3,
                pricePerBox: 15000,
                total: 45000
            }
        ],
        total: 45000,
        status: "delivered",
        deliveryDate: "2024-11-28",
        createdAt: new Date("2024-11-25")
    }
];
const mockPreorders = [
    {
        id: "PRE-001",
        clientId: "client-4",
        clientName: "ТОО Праздник",
        clientPhone: "+7 777 111 2222",
        cityId: "almaty",
        items: [
            {
                productId: 14,
                productName: "8 Марта микс",
                quantity: 50,
                pricePerBox: 75000,
                total: 3750000
            },
            {
                productId: 12,
                productName: "Тюльпаны весенняя коллекция",
                quantity: 20,
                pricePerBox: 35000,
                total: 700000
            }
        ],
        total: 4450000,
        status: "confirmed",
        holidayType: "march8",
        deliveryDate: "2025-03-01",
        createdAt: new Date("2024-11-15"),
        notes: "Крупный заказ на 8 Марта"
    },
    {
        id: "PRE-002",
        clientId: "client-5",
        clientName: "Цветы 24",
        clientPhone: "+7 777 999 0000",
        cityId: "astana",
        items: [
            {
                productId: 13,
                productName: "Валентинов микс красный",
                quantity: 30,
                pricePerBox: 90000,
                total: 2700000
            }
        ],
        total: 2700000,
        status: "pending",
        holidayType: "valentine",
        deliveryDate: "2025-02-10",
        createdAt: new Date("2024-12-01")
    }
];
function getCityName(cityId, lang = "ru") {
    const city = __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$auth$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["kazakhstanCities"].find((c)=>c.id === cityId);
    return city?.name[lang] || cityId;
}
function getStatusLabel(status, lang = "ru") {
    const labels = {
        pending: {
            ru: "Ожидает",
            en: "Pending",
            kk: "Күтуде"
        },
        confirmed: {
            ru: "Подтверждён",
            en: "Confirmed",
            kk: "Расталды"
        },
        in_transit: {
            ru: "В пути",
            en: "In Transit",
            kk: "Жолда"
        },
        delivered: {
            ru: "Доставлен",
            en: "Delivered",
            kk: "Жеткізілді"
        },
        cancelled: {
            ru: "Отменён",
            en: "Cancelled",
            kk: "Бас тартылды"
        }
    };
    return labels[status]?.[lang] || status;
}
function getStatusColor(status) {
    switch(status){
        case "pending":
            return "bg-yellow-100 text-yellow-700";
        case "confirmed":
            return "bg-blue-100 text-blue-700";
        case "in_transit":
            return "bg-indigo-100 text-indigo-700";
        case "delivered":
            return "bg-green-100 text-green-700";
        case "cancelled":
            return "bg-red-100 text-red-700";
        default:
            return "bg-gray-100 text-gray-700";
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/sdfg/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
_c = Button;
;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/sdfg/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sdfg/app/admin/orders/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminOrdersPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/components/dashboard-layout.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/orders.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/lib/api-client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sdfg/contexts/auth-context.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
function AdminOrdersPage() {
    _s();
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [search, setSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminOrdersPage.useEffect": ()=>{
            const fetchOrders = {
                "AdminOrdersPage.useEffect.fetchOrders": async ()=>{
                    if (!user?.id) return;
                    try {
                        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getAllOrders(user.id);
                        if (response.success) {
                            setOrders(response.orders);
                        }
                    } catch (error) {
                        console.error('Error fetching orders:', error);
                    } finally{
                        setLoading(false);
                    }
                }
            }["AdminOrdersPage.useEffect.fetchOrders"];
            fetchOrders();
        }
    }["AdminOrdersPage.useEffect"], [
        user
    ]);
    const filteredOrders = orders.filter((order)=>{
        const matchesSearch = order.id.toString().toLowerCase().includes(search.toLowerCase()) || order.user_name && order.user_name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = filterStatus === "all" || order.status === filterStatus;
        return matchesSearch && matchesStatus;
    });
    const updateOrderStatus = async (orderId, newStatus)=>{
        if (!user?.id) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$api$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].updateOrderStatus(user.id, orderId, newStatus);
            setOrders(orders.map((o)=>o.id === orderId ? {
                    ...o,
                    status: newStatus
                } : o));
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Ошибка при обновлении статуса заказа');
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$dashboard$2d$layout$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DashboardLayout"], {
        title: "Управление заказами",
        requiredRole: "admin",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                        placeholder: "Поиск по номеру или клиенту...",
                        value: search,
                        onChange: (e)=>setSearch(e.target.value),
                        className: "max-w-xs"
                    }, void 0, false, {
                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: filterStatus,
                        onChange: (e)=>setFilterStatus(e.target.value),
                        className: "px-3 py-2 border border-input rounded-md bg-background",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "all",
                                children: "Все статусы"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 68,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "pending",
                                children: "Ожидает"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 69,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "confirmed",
                                children: "Подтверждён"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "processing",
                                children: "В обработке"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "shipped",
                                children: "Отправлен"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "delivered",
                                children: "Доставлен"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 73,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "cancelled",
                                children: "Отменён"
                            }, void 0, false, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                        lineNumber: 63,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: filteredOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500",
                    children: "Заказы не найдены"
                }, void 0, false, {
                    fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                    lineNumber: 80,
                    columnNumber: 11
                }, this) : filteredOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-xl border border-gray-200 p-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-3 mb-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-lg font-bold text-gray-900",
                                                        children: [
                                                            "Заказ #",
                                                            order.id
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-1 text-xs rounded-full ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusColor"])(order.status)}`,
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$lib$2f$orders$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStatusLabel"])(order.status)
                                                    }, void 0, false, {
                                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                        lineNumber: 90,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 88,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-700",
                                                children: order.customer_name || order.user_name || 'Клиент'
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 94,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: order.customer_phone || order.user_phone || 'Нет телефона'
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 95,
                                                columnNumber: 19
                                            }, this),
                                            order.customer_email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: order.customer_email
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 96,
                                                columnNumber: 44
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "Город: ",
                                                    order.delivery_city
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 97,
                                                columnNumber: 19
                                            }, this),
                                            order.delivery_address && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "Адрес: ",
                                                    order.delivery_address
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 98,
                                                columnNumber: 46
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "Дата доставки: ",
                                                    order.delivery_date ? new Date(order.delivery_date).toLocaleDateString('ru-RU') : 'Не указана'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 99,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "Способ оплаты: ",
                                                    order.payment_method?.replace('_', ' ') || 'Не указан'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 100,
                                                columnNumber: 19
                                            }, this),
                                            order.notes && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-blue-600 mt-1",
                                                children: [
                                                    "Примечание: ",
                                                    order.notes
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 101,
                                                columnNumber: 35
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 87,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-right",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-2xl font-bold text-[#568a56]",
                                                children: [
                                                    Number(order.total_amount || 0).toLocaleString(),
                                                    " ₸"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-gray-500",
                                                children: [
                                                    "Создан: ",
                                                    new Date(order.created_at).toLocaleDateString("ru-RU")
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-t border-gray-100 pt-4 mb-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm font-medium text-gray-700 mb-2",
                                        children: "Товары:"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 112,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1",
                                        children: order.items && order.items.length > 0 ? order.items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-sm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: [
                                                            item.product_name || `Товар #${item.product_id}`,
                                                            " × ",
                                                            item.quantity,
                                                            " шт."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                        lineNumber: 117,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-900",
                                                        children: [
                                                            (Number(item.unit_price) * Number(item.quantity)).toLocaleString(),
                                                            " ₸"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                        lineNumber: 120,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, idx, true, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 116,
                                                columnNumber: 23
                                            }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-400",
                                            children: "Нет товаров"
                                        }, void 0, false, {
                                            fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                            lineNumber: 124,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 113,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-2",
                                children: [
                                    order.status === "pending" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                onClick: ()=>updateOrderStatus(order.id, "confirmed"),
                                                className: "bg-blue-500 hover:bg-blue-600",
                                                children: "Подтвердить"
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 132,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                size: "sm",
                                                variant: "outline",
                                                onClick: ()=>updateOrderStatus(order.id, "cancelled"),
                                                className: "text-red-500 border-red-500",
                                                children: "Отменить"
                                            }, void 0, false, {
                                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    order.status === "confirmed" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        onClick: ()=>updateOrderStatus(order.id, "processing"),
                                        className: "bg-purple-500 hover:bg-purple-600",
                                        children: "Начать обработку"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 150,
                                        columnNumber: 19
                                    }, this),
                                    order.status === "processing" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        onClick: ()=>updateOrderStatus(order.id, "shipped"),
                                        className: "bg-indigo-500 hover:bg-indigo-600",
                                        children: "Отправить"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 19
                                    }, this),
                                    order.status === "shipped" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        size: "sm",
                                        onClick: ()=>updateOrderStatus(order.id, "delivered"),
                                        className: "bg-green-500 hover:bg-green-600",
                                        children: "Доставлен"
                                    }, void 0, false, {
                                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                        lineNumber: 168,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                        lineNumber: 85,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/sdfg/app/admin/orders/page.tsx",
                lineNumber: 78,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sdfg/app/admin/orders/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(AdminOrdersPage, "+hk6WkEW7K6N3C0Uuuow637I1FI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sdfg$2f$contexts$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = AdminOrdersPage;
var _c;
__turbopack_context__.k.register(_c, "AdminOrdersPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sdfg_285e304f._.js.map