import React from 'react';

const NotFound = () => (
  <div className="container py-5 text-center">
    <h1 className="display-1 fw-bold mb-3 text-danger">404</h1>
    <h2 className="mb-4">Page Not Found</h2>
    <p className="lead mb-4">Sorry, the page you are looking for does not exist.</p>
    <a href="/" className="btn btn-gradient btn-lg">Go Home</a>
  </div>
);

export default NotFound; 