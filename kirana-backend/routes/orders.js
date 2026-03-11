import express from "express";
import { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderStatus } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, addOrderItems)
  .get(protect, getOrders);

router.route("/my-orders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/track/:id").get(getOrderById);

router.route("/:id/status").put(protect, updateOrderStatus);

export default router;
