import Order from "../models/Order.js";
import { sendOrderNotification } from "../utilities/notificationService.js";

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, paymentMethod, deliveryAddress } = req.body;

    if (items && items.length === 0) {
      return res.status(400).json({ message: "No order items" });
    }

    const order = new Order({
      user: req.user._id,
      items,
      totalAmount,
      paymentMethod,
      deliveryAddress
    });

    const createdOrder = await order.save();

    // Trigger notification
    await sendOrderNotification(createdOrder);

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "shopkeeper") {
      return res.status(403).json({ message: "Authorized personnel only" });
    }

    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin/Shopkeeper
export const updateOrderStatus = async (req, res) => {
  try {
    if (req.user.role !== "admin" && req.user.role !== "shopkeeper") {
      return res.status(403).json({ message: "Authorized personnel only" });
    }

    const order = await Order.findById(req.params.id);

    if (order) {
      order.orderStatus = req.body.status || order.orderStatus;

      // Optionally handle payment status updates here as well if provided
      if (req.body.paymentStatus) {
        order.paymentStatus = req.body.paymentStatus;
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
