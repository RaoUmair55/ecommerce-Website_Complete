import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { items, removeFromCart, updateQuantity } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">Your Cart</h1>
      {items.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="mb-3">Your cart is empty.</h4>
          <Link to="/shop" className="btn btn-gradient">Go to Shop</Link>
        </div>
      ) : (
        <>
          <div className="table-responsive mb-4">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item._id || item.id}>
                    <td>
                      <img src={item.images ? item.images[0] : item.img} alt={item.name || item.title} className="rounded me-2" style={{width: 60}} />
                      {item.name || item.title}
                    </td>
                    <td>${item.price}</td>
                    <td style={{maxWidth: 80}}>
                      <input
                        type="number"
                        className="form-control w-75 mx-auto"
                        min={1}
                        value={item.quantity}
                        onChange={e => updateQuantity(item._id || item.id, Math.max(1, Number(e.target.value)))}
                      />
                    </td>
                    <td>${item.price * item.quantity}</td>
                    <td><button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item._id || item.id)}>Remove</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <span className="fw-bold fs-5">Total: ${total}</span>
            <Link to="/checkout" className="btn btn-gradient btn-lg">Proceed to Checkout</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 