import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';

const Electronics = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.filter(product => product.category === 'Electronics'));
      } catch (err) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;

  return (
    <section className="container mb-5">
      <h2 className="text-center mb-4 fw-bold display-6">Featured Fashion</h2>
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-lg-3" key={product._id}>
            <div className="card product-card h-100 shadow-sm border-0 animate__animated animate__fadeInUp">
              <div className="product-img-wrap overflow-hidden rounded-top">
                <Link to={`/product/${product._id}`}><img src={product.images && product.images[0]} className="card-img-top product-img" alt={product.name} /></Link>
              </div>
              <div className="card-body text-center">
                <Link to={`/product/${product._id}`} className="card-title-link text-decoration-none"><h5 className="card-title fw-bold mb-2 text-black">{product.name}</h5></Link>
                <p className="card-text text-muted small mb-2">{product.description}</p>
                <div className="fw-bold mb-3 text-primary fs-5">${product.price}</div>
                <button className="btn btn-gradient w-100" onClick={() => { addToCart(product); showToast('Added to cart!'); }}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Electronics;