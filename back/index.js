const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const Logger = require("./logger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Initialize logger
const logger = new Logger(pool);

// Test database connection
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Database connected successfully at", res.rows[0].now);
  }
});

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://26.161.253.187:3000",
      "http://26.161.253.187:3001",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
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

// Serve test HTML page
app.get("/test", (req, res) => {
  res.sendFile(__dirname + "/test-registration.html");
});

// API routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Test database query
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

// Import routes
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
  // Fallback: create a simple error route
  trucksRoutes = express.Router();
  trucksRoutes.get("*", (req, res) => {
    res.status(500).json({
      success: false,
      error: "Trucks route not available: " + error.message,
    });
  });
}

// Use routes
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

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global error:", err);
  res.status(500).json({ success: false, error: err.message });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Start server
app.listen(PORT, () => {
  console.log(`🌸 Server is running on http://localhost:${PORT}`);
});
