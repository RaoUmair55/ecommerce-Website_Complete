const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  getDashboardStats
} = require('../controllers/orderController');

const router = express.Router();

// Create order
router.post('/', protect, createOrder);
// Get logged-in user's orders
router.get('/my', protect, getMyOrders);
// Get all orders (admin)
router.get('/', protect, admin, getAllOrders);
// Get single order by ID
router.get('/:id', protect, getOrderById);
// Update order status (admin)
router.put('/:id', protect, admin, updateOrderStatus);
// Admin dashboard stats
router.get('/admin/stats', protect, admin, getDashboardStats);

module.exports = router; 