import React, { useEffect, useState } from 'react'
import './Home.css'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { Link } from 'react-router-dom'
import { fetchProducts } from '../api/products'

const carouselImages = [
  {
    src: 'https://images.unsplash.com/photo-1749740582935-23ab42cc887e?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Latest Fashion Trends',
    desc: 'Upgrade your wardrobe with our new arrivals.'
  },
  {
    src: 'https://images.unsplash.com/photo-1734603549513-6e1c688629cf?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Home Essentials',
    desc: 'Everything you need for a cozy home.'
  },
  {
    src: 'https://images.unsplash.com/photo-1661767547783-0971b0ee9314?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Tech Gadgets',
    desc: 'Discover the latest in tech and electronics.'
  }
];

const Home = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeatured = async () => {
      try {
        const data = await fetchProducts();
        setFeaturedProducts(data.filter(product => product.featured));
      } catch (err) {
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getFeatured();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section d-flex align-items-center justify-content-center text-center mb-5">
        <div className="container py-5">
          <h1 className="display-2 fw-bold mb-3 hero-title">Discover Amazing Products</h1>
          <p className="lead mb-4">Shop the latest trends and enjoy exclusive deals!</p>
          <a href="#shop" className="btn btn-lg btn-gradient shadow">Shop Now</a>
        </div>
      </section>

      {/* Carousel Section */}
      <div className="container mb-5">
        <div id="mainCarousel" className="carousel slide rounded shadow overflow-hidden" data-bs-ride="carousel">
          <div className="carousel-inner">
            {carouselImages.map((img, idx) => (
              <div className={`carousel-item${idx === 0 ? ' active' : ''}`} key={img.src}>
                <img src={img.src} className="d-block w-100 carousel-img" alt={img.caption} />
                <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-3 animate__animated animate__fadeInUp">
                  <h5>{img.caption}</h5>
                  <p>{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Featured Products Section */}
      <section className="container mb-5">
        <h2 className="text-center mb-4 fw-bold display-6">Featured Products</h2>
        {loading ? (
          <div className="text-center py-5">Loading...</div>
        ) : (
          <div className="row g-4">
            {featuredProducts.map((product) => (
              <div className="col-12 col-sm-6 col-lg-3" key={product._id}>
                <div className="card product-card h-100 shadow-sm border-0 animate__animated animate__fadeInUp">
                  <div className="product-img-wrap overflow-hidden rounded-top">
                    <Link to={`/product/${product._id}`}><img src={product.images && product.images[0]} className="card-img-top product-img text-black" alt={product.name} /></Link>
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
        )}
      </section>
    </>
  )
}

export default Home 