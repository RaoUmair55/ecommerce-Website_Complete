import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';

const categoryOptions = [
  'All Categories',
  'Fashion',
  'Electronics',
  'Clothing',
  'Books',
  'Home',
  'Beauty',
  'Sports',
  'Other'
];

const Shop = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');

  const getProducts = async () => {
    setLoading(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (category && category !== 'All Categories') params.category = category;
      const data = await fetchProducts(params);
      setProducts(data);
    } catch (err) {
      showToast('Failed to fetch products', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, [search, category]);

  return (
    <div className="container py-5">
      <h1 className="display-5 fw-bold mb-4 text-center">Shop Products</h1>
      <div className="mb-4 d-flex justify-content-between align-items-center flex-wrap gap-2">
        <input
          className="form-control w-auto flex-grow-1"
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="form-select w-auto"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {categoryOptions.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
      {loading ? (
        <div className="text-center py-5">Loading...</div>
      ) : (
        <div className="row g-4">
          {products.map(product => (
            <div className="col-12 col-sm-6 col-lg-3" key={product._id}>
              <div className="card product-card h-100 shadow-sm border-0">
                <div className="product-img-wrap overflow-hidden rounded-top">
                  <Link to={`/product/${product._id}`}><img src={product.images && product.images[0]} className="card-img-top product-img" alt={product.name} /></Link>
                </div>
                <div className="card-body text-center">
                  <Link to={`/product/${product._id}`} className="card-title-link"><h5 className="card-title fw-bold mb-2">{product.name}</h5></Link>
                  <p className="card-text text-muted small mb-2">{product.description}</p>
                  <div className="fw-bold mb-3 text-primary fs-5">${product.price}</div>
                  <button className="btn btn-gradient w-100" onClick={() => { addToCart(product); showToast('Added to cart!'); }}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop; 