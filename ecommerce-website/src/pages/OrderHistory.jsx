import React, { useEffect, useState } from 'react';
import { fetchMyOrders } from '../api/orders';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await fetchMyOrders(token);
        setOrders(data);
      } catch (err) {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered align-middle">
            <thead>
              <tr>
                <th>Order ID</th>
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
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;