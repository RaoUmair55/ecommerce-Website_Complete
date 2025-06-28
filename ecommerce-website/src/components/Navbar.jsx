import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { BsShop, BsStars, BsGrid, BsCart, BsPerson, BsBoxArrowRight, BsClipboardCheck, BsCreditCard2Back, BsGear, BsList, BsBoxArrowInRight, BsPersonPlus } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = useCart();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!token);
    setIsAdmin(user?.isAdmin || false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg glass-navbar fixed-top py-3 animated-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-2" to="/">
          <span className="brand-icon me-2"><BsShop size={32} /></span>
          <span className="brand-gradient">E-Shop</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-3 gap-2">
            <li className="nav-item">
              <Link className="nav-link nav-anim" to="/shop"><BsShop className="me-1" /> Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-anim" to="/fashion"><BsStars className="me-1" /> Fashion</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-anim" to="/categories"><BsGrid className="me-1" /> Categories</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-anim" to="/cart"><BsCart className="me-1" /> Cart</Link>
            </li>
            {isLoggedIn ? (
              <>
                {/* User Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle nav-anim" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <BsPerson className="me-1" /> Account
                  </a>
                  <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                    <li><Link className="dropdown-item" to="/profile"><BsPerson className="me-1" /> Profile</Link></li>
                    <li><Link className="dropdown-item" to="/orders"><BsClipboardCheck className="me-1" /> My Orders</Link></li>
                    <li><Link className="dropdown-item" to="/checkout"><BsCreditCard2Back className="me-1" /> Checkout</Link></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><button className="dropdown-item text-danger" onClick={handleLogout}><BsBoxArrowRight className="me-1" /> Logout</button></li>
                  </ul>
                </li>
                {/* Admin Dropdown */}
                {isAdmin && (
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle nav-anim" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <BsGear className="me-1" /> Admin
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="adminDropdown">
                      <li><Link className="dropdown-item" to="/admin"><BsGear className="me-1" /> Dashboard</Link></li>
                      <li><Link className="dropdown-item" to="/admin/orders"><BsList className="me-1" /> Orders</Link></li>
                      <li><Link className="dropdown-item" to="/dashboard"><BsGear className="me-1" /> Dashboard Stats</Link></li>
                    </ul>
                  </li>
                )}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link nav-anim" to="/login"><BsBoxArrowInRight className="me-1" /> Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link nav-anim" to="/register"><BsPersonPlus className="me-1" /> Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 