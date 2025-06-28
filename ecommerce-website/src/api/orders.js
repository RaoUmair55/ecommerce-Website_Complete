import axios from 'axios';

export const createOrder = async (order, token) => {
  const { data } = await axios.post(
    'http://localhost:5000/api/orders',
    order,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const fetchMyOrders = async (token) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_LINK}/api/orders/my`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const fetchAllOrders = async (token) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_BACKEND_LINK}/api/orders`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const updateOrderStatus = async (id, status, token) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_BACKEND_LINK}/api/orders/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}; 