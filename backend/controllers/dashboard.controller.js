import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Auth from "../models/auth.model.js";

export const getDashboardStats = async (req, res) => {
  try {
    // Using Promise.all for better performance (parallel execution)
    const [
      totalOrders,
      totalCustomers,
      totalSalesResult,
      totalProductsInStock,
      recentOrders,
      recentCustomers,
    ] = await Promise.all([
      Order.countDocuments(),
      Auth.countDocuments({ isAdmin: false }),
      Order.aggregate([
        { $match: { isPaid: true } },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalPrice" },
          },
        },
      ]),

      Product.aggregate([
        {
          $group: {
            _id: null,
            totalStock: { $sum: "$countInStock" },
          },
        },
      ]),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("user", "username email")
        .select("_id totalPrice createdAt isPaid isDelivered"),

      Auth.find({ isAdmin: false })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("username email createdAt"),
    ]);

    const totalSales = totalSalesResult[0]?.totalSales || 0;
    const productsInStock = totalProductsInStock[0]?.totalStock || 0;

    res.status(200).json({
      success: true,
      stats: {
        totalOrders,
        totalCustomers,
        totalSales,
        productsInStock,
      },
      recentActivity: {
        orders: recentOrders,
        customers: recentCustomers,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};