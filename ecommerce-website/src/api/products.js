import axios from 'axios';

export const fetchProducts = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const { data } = await axios.get(`http://localhost:5000/api/products${query ? `?${query}` : ''}`);
  return data.products;
};

export const fetchProductById = async (id) => {
  const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  return data;
}; 