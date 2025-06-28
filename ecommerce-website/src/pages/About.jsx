import React from 'react';

const About = () => (
  <div className="container py-5">
    <div className="row align-items-center mb-5">
      <div className="col-md-6 mb-4 mb-md-0">
        <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80" alt="About E-Shop" className="img-fluid rounded shadow" />
      </div>
      <div className="col-md-6">
        <h1 className="display-5 fw-bold mb-3">About E-Shop</h1>
        <p className="lead mb-4">
          Welcome to <span className="brand-gradient fw-bold">E-Shop</span>! We are passionate about bringing you the latest trends in fashion, tech, and home essentials. Our mission is to provide a seamless and enjoyable shopping experience, with top-quality products and unbeatable customer service.
        </p>
        <ul className="list-unstyled mb-4">
          <li className="mb-2"><span className="badge bg-success me-2">✓</span> Fast & Free Shipping</li>
          <li className="mb-2"><span className="badge bg-success me-2">✓</span> 24/7 Customer Support</li>
          <li className="mb-2"><span className="badge bg-success me-2">✓</span> 100% Satisfaction Guarantee</li>
        </ul>
        <p className="text-muted">Thank you for choosing us as your go-to online store!</p>
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-lg-10">
        <div className="card shadow-sm border-0 p-4 text-center">
          <h2 className="fw-bold mb-3">Our Values</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-3 rounded bg-light h-100">
                <h5 className="fw-bold mb-2">Innovation</h5>
                <p className="mb-0">We bring you the latest and greatest products from around the world.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded bg-light h-100">
                <h5 className="fw-bold mb-2">Quality</h5>
                <p className="mb-0">Every item is handpicked for quality and value.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-3 rounded bg-light h-100">
                <h5 className="fw-bold mb-2">Care</h5>
                <p className="mb-0">We care about your experience and are here to help, always.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default About; 