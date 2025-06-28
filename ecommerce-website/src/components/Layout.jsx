import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, UserIcon, Bars3Icon } from '@heroicons/react/24/outline';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-2xl font-bold text-accent"
              >
                FUTURE
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
                Home
              </Link>
              <Link to="/shop" className="text-gray-700 hover:text-accent transition-colors">
                Shop
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-accent transition-colors">
                Contact
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <Link to="/cart" className="text-gray-700 hover:text-accent transition-colors">
                <ShoppingCartIcon className="h-6 w-6" />
              </Link>
              <Link to="/account" className="text-gray-700 hover:text-accent transition-colors">
                <UserIcon className="h-6 w-6" />
              </Link>
              <button
                className="md:hidden text-gray-700 hover:text-accent transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/" className="text-gray-700 hover:text-accent transition-colors">
                  Home
                </Link>
                <Link to="/shop" className="text-gray-700 hover:text-accent transition-colors">
                  Shop
                </Link>
                <Link to="/about" className="text-gray-700 hover:text-accent transition-colors">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:text-accent transition-colors">
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">FUTURE</h3>
              <p className="text-gray-400">
                Your one-stop shop for futuristic products and experiences.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/shop" className="text-gray-400 hover:text-white transition-colors">Shop</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                <li><Link to="/shipping" className="text-gray-400 hover:text-white transition-colors">Shipping</Link></li>
                <li><Link to="/returns" className="text-gray-400 hover:text-white transition-colors">Returns</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to our newsletter for updates and exclusive offers.</p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded-l-lg w-full focus:outline-none"
                />
                <button className="bg-accent px-4 py-2 rounded-r-lg hover:bg-accent/90 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FUTURE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 