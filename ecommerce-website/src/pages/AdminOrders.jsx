import React, { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../api/orders';

const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const token = localStorage.getItem('token');

  const getOrders = async () => {
    try {
      const data = await fetchAllOrders(token);
      setOrders(data);
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line
  }, []);

  const handleStatusChange = async (orderId, status) => {
    setUpdating(orderId);
    try {
      await updateOrderStatus(orderId, status, token);
      await getOrders();
    } catch (err) {
      // Optionally show error
    } finally {
      setUpdating(null);
    }
  };

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">All Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Items</th>
                <th>Shipping</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user?.name} <br/> <small>{order.user?.email}</small></td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <ul className="list-unstyled mb-0">
                      {order.orderItems.map(item => (
                        <li key={item.product}>
                          {item.name} x {item.qty} (${item.price} each)
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    {order.shippingAddress.fullName}<br/>
                    {order.shippingAddress.address}, {order.shippingAddress.city}<br/>
                    {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>
                    <select
                      className="form-select"
                      value={order.status}
                      disabled={updating === order._id}
                      onChange={e => handleStatusChange(order._id, e.target.value)}
                    >
                      {statusOptions.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders; 