import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { fetchProductById } from '../api/products';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const getProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id, refresh]);

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `http://localhost:5000/api/products/${id}/reviews`,
        { rating: Number(review.rating), comment: review.comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast('Review submitted!');
      setReview({ rating: 5, comment: '' });
      setRefresh(r => !r);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="container py-5 text-center"><h2>Loading...</h2></div>;
  if (!product) return <div className="container py-5 text-center"><h2>Product not found.</h2></div>;

  // Calculate average rating
  const avgRating = product.reviews && product.reviews.length > 0
    ? (product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;
  const hasReviewed = user && product.reviews && product.reviews.some(r => r.name === user.name);

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-md-6">
          {/* Image gallery */}
          {product.images && product.images.length > 1 ? (
            <div className="d-flex flex-wrap gap-2">
              {product.images.map((img, idx) => (
                <img key={idx} src={img} className="img-fluid rounded shadow" alt={product.name} style={{ maxWidth: '180px', maxHeight: '180px', objectFit: 'cover' }} />
              ))}
            </div>
          ) : (
            <img src={product.images && product.images[0]} className="img-fluid rounded shadow" alt={product.name} />
          )}
        </div>
        <div className="col-md-6">
          <h1 className="display-6 fw-bold mb-3">{product.name}</h1>
          <p className="lead text-muted mb-3">{product.description}</p>
          <div className="mb-3">
            <span className="fw-bold text-primary fs-4">${product.price}</span>
          </div>
          <button className="btn btn-gradient btn-lg mb-3" onClick={() => { addToCart(product); showToast('Added to cart!'); }}>Add to Cart</button>
          <div>
            <span className="badge bg-success me-2">In Stock</span>
            <span className="badge bg-info">Free Shipping</span>
          </div>
          {/* Reviews & Rating */}
          <div className="mt-4">
            <h4>Reviews {avgRating && (<span className="ms-2">⭐ {avgRating} / 5</span>)} ({product.reviews?.length || 0})</h4>
            {product.reviews && product.reviews.length > 0 ? (
              <ul className="list-group mb-3">
                {product.reviews.map((r, idx) => (
                  <li className="list-group-item" key={idx}>
                    <strong>{r.name}</strong> <span className="text-warning">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    <br />
                    <span className="text-muted small">{r.comment}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="mb-3">No reviews yet.</div>
            )}
            {/* Add Review Form */}
            {user && !hasReviewed && (
              <form onSubmit={handleReviewSubmit} className="border rounded p-3">
                <div className="mb-2">
                  <label className="form-label">Rating</label>
                  <select className="form-select" name="rating" value={review.rating} onChange={handleReviewChange} required>
                    {[5,4,3,2,1].map(val => (
                      <option key={val} value={val}>{val}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-2">
                  <label className="form-label">Comment</label>
                  <textarea className="form-control" name="comment" value={review.comment} onChange={handleReviewChange} required rows={2} />
                </div>
                <button type="submit" className="btn btn-primary" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
              </form>
            )}
            {user && hasReviewed && <div className="alert alert-info mt-2">You have already reviewed this product.</div>}
            {!user && <div className="alert alert-warning mt-2">Login to add a review.</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 