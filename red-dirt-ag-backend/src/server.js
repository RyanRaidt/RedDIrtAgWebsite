// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Test API endpoint
app.get("/", (req, res) => {
  res.send("Red Dirt Ag Backend is Running!");
});

// API Routes
import quoteRoutes from "./routes/quoteRoutes.js";
import productRoutes from "./routes/productRoutes.js";

app.use("/api/quotes", quoteRoutes);
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
