import axios from 'axios';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/products${query ? `?${query}` : ''}`);
  return data.products;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_LINK}/api/products/${id}`);
  return data;
}; 