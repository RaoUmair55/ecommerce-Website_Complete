import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../api/orders';

const Checkout = () => {
  const { items, clearCart } = useCart();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [shipping, setShipping] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [loading, setLoading] = useState(false);

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShipping(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (items.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const orderItems = items.map(item => ({
        product: item._id || item.id,
        name: item.name || item.title,
        qty: item.quantity,
        price: item.price,
        image: item.images ? item.images[0] : item.img
      }));
      await createOrder({
        orderItems,
        shippingAddress: shipping,
        totalPrice
      }, token);
      clearCart();
      showToast('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      showToast(err.response?.data?.message || 'Order failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Checkout</h2>
      <form onSubmit={handleSubmit} className="row g-4">
        <div className="col-md-6">
          <h4>Shipping Information</h4>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="fullName" value={shipping.fullName} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input type="text" className="form-control" name="address" value={shipping.address} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input type="text" className="form-control" name="city" value={shipping.city} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Postal Code</label>
            <input type="text" className="form-control" name="postalCode" value={shipping.postalCode} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input type="text" className="form-control" name="country" value={shipping.country} onChange={handleChange} required />
          </div>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          {items.length === 0 ? (
            <div>Your cart is empty.</div>
          ) : (
            <ul className="list-group mb-3">
              {items.map(item => (
                <li className="list-group-item d-flex justify-content-between align-items-center" key={item._id || item.id}>
                  <span>{item.name || item.title} x {item.quantity}</span>
                  <span>${item.price * item.quantity}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                <span>Total</span>
                <span>${totalPrice}</span>
              </li>
            </ul>
          )}
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>{loading ? 'Placing Order...' : 'Place Order'}</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout; 