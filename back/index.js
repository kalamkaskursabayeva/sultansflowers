const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Logger = require("./logger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection pool через DATABASE_URL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // обязательно для Railway
  },
});

// Инициализация логгера
const logger = new Logger(pool);

// Тест подключения к базе
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Database connected successfully at", res.rows[0].now);
  }
});

// Middleware
const allowedOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (allowedOrigins.length === 0) {
  allowedOrigins.push(
    "https://zestful-happiness-production-9f5b.up.railway.app",
    "http://localhost:3000"
  );
}

app.use(
  cors({
    origin: [
      "https://zestful-happiness-production-9f5b.up.railway.app"
    ],
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Тестовый маршрут
app.get("/", (req, res) => {
  res.json({
    message: "Green Flowers API Server",
    status: "running",
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      dbTest: "/api/db-test",
      register: "POST /api/users/register",
      login: "POST /api/users/login",
      products: "/api/products",
      testPage: "/test",
    },
  });
});

// Тестовая страница
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test-registration.html");
});

// API маршруты
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Тест запроса к базе
app.get("/api/db-test", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT current_database(), current_user, version()"
    );
    res.json({
      success: true,
      database: result.rows[0].current_database,
      user: result.rows[0].current_user,
      version: result.rows[0].version,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Импорт маршрутов
const usersRoutes = require("./routes/users")(pool, logger);
const productsRoutes = require("./routes/products")(pool, logger);
const ordersRoutes = require("./routes/orders")(pool, logger);
const logsRoutes = require("./routes/logs")(pool, logger);
const flowersRoutes = require("./routes/flowers")(pool, logger);
const preordersRoutes = require("./routes/preorders")(pool);
const cartRoutes = require("./routes/cart")(pool);
const inventoryRoutes = require("./routes/inventory")(pool, logger);
const shiftsRoutes = require("./routes/shifts")(pool, logger);
const calendarRoutes = require("./routes/calendar")(pool, logger);

let trucksRoutes;
try {
  trucksRoutes = require("./routes/trucks")(pool, logger);
  console.log("✅ Trucks route loaded successfully");
} catch (error) {
  console.error("❌ Error loading trucks route:", error.message);
  trucksRoutes = express.Router();
  trucksRoutes.get("*", (req, res) => {
    res.status(500).json({
      success: false,
      error: "Trucks route not available: " + error.message,
    });
  });
}

// Используем маршруты
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/logs", logsRoutes);
app.use("/api/flowers", flowersRoutes);
app.use("/api/preorders", preordersRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/shifts", shiftsRoutes);
app.use("/api/calendar", calendarRoutes);
app.use("/api/trucks", trucksRoutes);

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ success: false, error: err.message });
});

// Обработка uncaught exceptions и unhandled rejections
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Старт сервера
app.listen(PORT, () => {
  console.log(`🌸 Server is running on http://localhost:${PORT}`);
});
