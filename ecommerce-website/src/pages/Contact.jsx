import React from 'react';

const Contact = () => (
  <div className="container py-5">
    <h1 className="display-5 fw-bold mb-4 text-center">Contact Us</h1>
    <form className="row g-4 justify-content-center">
      <div className="col-md-6">
        <label className="form-label">Name</label>
        <input type="text" className="form-control" placeholder="Your Name" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Email</label>
        <input type="email" className="form-control" placeholder="Your Email" />
      </div>
      <div className="col-12">
        <label className="form-label">Message</label>
        <textarea className="form-control" rows={5} placeholder="Type your message..."></textarea>
      </div>
      <div className="col-12 text-end">
        <button className="btn btn-gradient btn-lg">Send Message</button>
      </div>
    </form>
  </div>
);

export default Contact; 