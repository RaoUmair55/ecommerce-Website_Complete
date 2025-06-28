import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setSubmitted(true);
      showToast('Password reset instructions sent to your email!');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to process request', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-gradient text-white text-center py-4">
              <h3 className="mb-0">Forgot Password</h3>
            </div>
            <div className="card-body p-4">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label">Enter your email address</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                    <div className="form-text">
                      We'll send you instructions to reset your password.
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      className="btn btn-gradient btn-lg"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center">
                  <div className="mb-4">
                    <i className="bi bi-envelope-check text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h5>Check Your Email</h5>
                  <p className="text-muted">
                    We've sent password reset instructions to your email address.
                  </p>
                </div>
              )}
            </div>
            <div className="card-footer text-center py-3">
              <div className="small">
                Remember your password?{' '}
                <Link to="/login" className="text-decoration-none">Back to Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword; 