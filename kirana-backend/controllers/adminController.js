import Order from "../models/Order.js";
import User from "../models/User.js";
import Product from "../models/Product.js";

// @desc    Get dashboard analytics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    // Calculate total revenue from orders (including pending/processing for overview)
    const revenueData = await Order.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
    ]);

    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalRevenue : 0;

    // Daily Sales for chart
    const dailySales = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { "_id": 1 } },
      { $limit: 7 }
    ]);

    res.json({
      totalOrders,
      totalUsers,
      totalProducts,
      totalRevenue,
      dailySales
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard stats error", error: error.message });
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private/Admin
export const getAdminOrders = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    // Fetch orders, sorted by newest
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .limit(50); // Pagination could be added later

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Orders fetch error", error: error.message });
  }
};

// @desc    Get top selling products
// @route   GET /api/admin/top-products
// @access  Private/Admin
export const getTopProducts = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const topProducts = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" }
        }
      },
      { $sort: { totalSold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $project: {
          _id: 1,
          totalSold: 1,
          name: "$productDetails.name",
          image: "$productDetails.image",
          price: "$productDetails.price"
        }
      }
    ]);

    res.json(topProducts);
  } catch (error) {
    res.status(500).json({ message: "Top products error", error: error.message });
  }
};

// @desc    Get orders grouped by city
// @route   GET /api/admin/orders-by-city
// @access  Private/Admin
export const getOrdersByCity = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Admin only" });

    const cityStats = await Order.aggregate([
      { $match: { "deliveryAddress.city": { $exists: true, $ne: null } } },
      {
        $group: {
          _id: "$deliveryAddress.city",
          orderCount: { $sum: 1 }
        }
      },
      { $sort: { orderCount: -1 } }
    ]);

    res.json(cityStats);
  } catch (error) {
    res.status(500).json({ message: "City stats error", error: error.message });
  }
};
