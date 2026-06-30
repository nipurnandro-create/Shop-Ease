import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import { SearchProvider } from './context/SearchContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Plicy from './pages/Plicy';
import TermsOfService from './pages/TermsOfService';
import ContactSupport from './pages/ContactSupport';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';

function App() {
  useEffect(() => {
    const smoothScrollTo = (targetY, duration = 1400) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 1) return;

      let startTime = null;
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    };

    const handleAnchorClick = (event) => {
      const clicked = event.target.closest ? event.target.closest('a[href^="#"]') : null;
      if (!clicked) return;

      const hash = clicked.getAttribute('href');
      if (!hash || hash === '#') return;

      const targetId = hash.slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      event.preventDefault();
      const targetY = target.getBoundingClientRect().top + window.scrollY - 88;
      smoothScrollTo(targetY, 1200);
    };

    const handleWheel = (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (Math.abs(event.deltaY) < 20) return;

      event.preventDefault();
      const currentY = window.scrollY;
      const nextY = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, currentY + event.deltaY * 2.2));
      smoothScrollTo(nextY, 1000);
    };

    const handleKeyDown = (event) => {
      const activeTag = document.activeElement?.tagName?.toLowerCase();
      const isEditable = ['input', 'textarea', 'select'].includes(activeTag);
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];

      if (isEditable || !scrollKeys.includes(event.key) || event.ctrlKey || event.metaKey || event.altKey) {
        return;
      }

      event.preventDefault();
      const currentY = window.scrollY;
      let nextY = currentY;

      if (event.key === 'ArrowDown' || event.key === ' ' || event.key === 'PageDown') {
        nextY = currentY + window.innerHeight * 0.8;
      } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        nextY = currentY - window.innerHeight * 0.8;
      } else if (event.key === 'Home') {
        nextY = 0;
      } else if (event.key === 'End') {
        nextY = document.documentElement.scrollHeight - window.innerHeight;
      }

      smoothScrollTo(Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, nextY)), 900);
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <WishlistProvider>
          <ToastProvider>
            <Router>
              <SearchProvider>
                <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-gray-900 dark:text-slate-100 flex flex-col transition-colors duration-200">
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/privacy-policy" element={<Plicy />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/contact-support" element={<ContactSupport />} />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </div>
              </SearchProvider>
            </Router>
          </ToastProvider>
        </WishlistProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;