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
    'http://localhost:5000/api/orders/my',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const fetchAllOrders = async (token) => {
  const { data } = await axios.get(
    'http://localhost:5000/api/orders',
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
};

export const updateOrderStatus = async (id, status, token) => {
  const { data } = await axios.put(
    `http://localhost:5000/api/orders/${id}`,
    { status },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return data;
}; 