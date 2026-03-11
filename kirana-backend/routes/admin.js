import express from "express";
import { getDashboardStats, getAdminOrders, getTopProducts, getOrdersByCity } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Base PATH: /api/admin
router.get("/dashboard", protect, getDashboardStats);
router.get("/orders", protect, getAdminOrders);
router.get("/top-products", protect, getTopProducts);
router.get("/orders-by-city", protect, getOrdersByCity);

export default router;
