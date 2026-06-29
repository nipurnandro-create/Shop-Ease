import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Mail, MapPin, Phone } from 'lucide-react';
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 text-gray-600 dark:text-slate-400 mt-auto transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="flex flex-col items-start gap-4">
            <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
              <span>ShopEase</span>
            </Link>
            <p className="text-sm text-left leading-relaxed">
              Your one-stop destination for premium electronics, fashion, furniture, and beauty. Experience shopping redefined with local persistence, fast deliveries, and secure checkout.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Shop Catalog
            </h3>
            <ul className="space-y-2.5 text-sm text-left">
              <li>
                <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  My Shopping Cart
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support & Legal
            </h3>
            <ul className="space-y-2.5 text-sm text-left">
              <li>
                <Link to="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact-support" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start gap-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-1">
              Connect With Us
            </h3>

            <div className="flex flex-col gap-2.5 text-sm text-left">
              <div className="flex items-center gap-2">
                <Mail className="w-4.5 h-4.5 text-indigo-500" />
                <span>support@shopease.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4.5 h-4.5 text-indigo-500" />
                <span>+1 (555) 019-2834</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4.5 h-4.5 text-indigo-500" />
                <span>100 Innovation Way, CA</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"
                className="p-2 bg-gray-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-all">
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"
                className="p-2 bg-gray-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-all">
                <FaTwitter className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"
                className="p-2 bg-gray-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-all">
                <FaInstagram className="w-4 h-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"
                className="p-2 bg-gray-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-full transition-all">
                <FaGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-gray-200 dark:border-slate-800/80 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span>&copy; {new Date().getFullYear()} ShopEase Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:underline">Terms of Service</Link>
            <Link to="/contact-support" className="hover:underline">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}