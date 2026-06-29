import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, ShoppingBag, Menu, X, MoonStar, SunMedium } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useWishlist } from '../context/WishlistContext';
import { useSearch } from '../context/SearchContext';
import { useDebounce } from '../hooks/useDebounce';

export default function Header() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const [draftSearch, setDraftSearch] = useState(searchQuery);
  const debouncedSearch = useDebounce(draftSearch, 250);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setDraftSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    setSearchQuery(debouncedSearch);
  }, [debouncedSearch, setSearchQuery]);

  const handleSearchChange = (e) => {
    setDraftSearch(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedValue = draftSearch.trim();
    setDraftSearch(trimmedValue);
    setSearchQuery(trimmedValue);
    navigate(trimmedValue ? `/products?search=${encodeURIComponent(trimmedValue)}` : '/products');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">

          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tight text-indigo-600 dark:text-indigo-400">
              <ShoppingBag className="w-6 h-6 stroke-[2.5]" />
              <span>ShopEase</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-2 flex-1 justify-center">
            <Link
              to="/"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${location.pathname === '/' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${location.pathname === '/products' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800'}`}
            >
              Products
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search products by name..."
                value={draftSearch}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-gray-400" />
            </div>
          </form>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* NEW THEME TOGGLE BUTTON - Desktop */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
            </button>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full relative transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full relative transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Right Actions */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              to="/cart"
              aria-label="Shopping cart"
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-lg bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              {theme === 'light' ? <MoonStar className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-200 px-4 pt-2 pb-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={draftSearch}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 text-sm focus:outline-none"
            />
            <Search className="absolute left-3.5 top-2.5 h-4.5 w-4.5 text-gray-400" />
          </form>

          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${location.pathname === '/' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              Home
            </Link>

            <Link
              to="/products"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg font-medium transition-colors ${location.pathname === '/products' ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-300' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800'}`}
            >
              Products
            </Link>

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 px-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 font-medium transition-colors"
            >
              About
            </Link>

            <Link
              to="/wishlist"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300 font-semibold transition-colors"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>Wishlist</span>
              </div>
              {wishlist.length > 0 && (
                <span className="bg-rose-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {wishlist.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}