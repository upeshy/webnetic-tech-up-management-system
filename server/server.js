// server/server.js

/**

* Smart School ERP Backend Server
* Main Entry File
  */

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load Environment Variables
dotenv.config();

// Initialize Express App
const app = express();

// =========================
// Middleware
// =========================

// Enable CORS
app.use(cors());

// Parse JSON Data
app.use(express.json());

// Parse URL Encoded Data
app.use(express.urlencoded({ extended: true }));

// Static Upload Folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// =========================
// Import Routes
// =========================

const authRoutes = require("./routes/auth");
const studentRoutes = require("./routes/students");
const teacherRoutes = require("./routes/teachers");
const attendanceRoutes = require("./routes/attendance");
const feesRoutes = require("./routes/fees");
const examRoutes = require("./routes/exams");
const dashboardRoutes = require("./routes/dashboard");

// =========================
// API Routes
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/fees", feesRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/dashboard", dashboardRoutes);

// =========================
// Default Route
// =========================

app.get("/", (req, res) => {
res.status(200).json({
success: true,
message: "🚀 Smart School ERP Backend Running Successfully"
});
});

// =========================
// Handle Invalid Routes
// =========================

app.use((req, res) => {
res.status(404).json({
success: false,
message: "❌ API Route Not Found"
});
});

// =========================
// MongoDB Connection
// =========================

mongoose
.connect(process.env.MONGODB_URI)
.then(() => {
console.log("✅ MongoDB Connected Successfully");

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

})
.catch((error) => {
console.log("❌ MongoDB Connection Failed");
console.log(error.message);
});
