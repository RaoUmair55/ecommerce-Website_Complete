import React from 'react';
import { BsFacebook, BsTwitter, BsInstagram } from 'react-icons/bs';

const Footer = () => (
  <footer className="bg-light border-top py-4 mt-auto">
    <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
      <div className="mb-2 mb-md-0">
        <span className="fw-bold brand-gradient">E-Shop</span> &copy; {new Date().getFullYear()}
      </div>
      <div className="d-flex gap-3">
        <a href="/about" className="text-decoration-none text-dark">About</a>
        <a href="/contact" className="text-decoration-none text-dark">Contact</a>
        <a href="/shop" className="text-decoration-none text-dark">Shop</a>
      </div>
      <div className="d-flex gap-3">
        <a href="#" className="text-dark fs-5"><BsFacebook /></a>
        <a href="#" className="text-dark fs-5"><BsTwitter /></a>
        <a href="#" className="text-dark fs-5"><BsInstagram /></a>
      </div>
    </div>
  </footer>
);

export default Footer; 