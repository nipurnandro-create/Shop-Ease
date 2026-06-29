import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      stars.push(<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />);
    } else if (i === fullStars + 1 && hasHalfStar) {
      stars.push(
        <div key={i} className="relative">
          <Star className="w-4 h-4 text-gray-300 dark:text-slate-700" />
          <div className="absolute top-0 left-0 overflow-hidden w-1/2">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      );
    } else {
      stars.push(<Star key={i} className="w-4 h-4 text-gray-300 dark:text-slate-750" />);
    }
  }

  return (
    <div className="flex items-center gap-0.5" title={`${rating} out of 5 stars`}>
      {stars}
      <span className="text-xs text-gray-500 dark:text-slate-400 ml-1.5 font-medium">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function ProductCard({ product }) {
  const { cart, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const isWishlisted = isInWishlist(product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    addToast(`${product.title} added to cart!`, 'success');
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
    addToast(
      isWishlisted
        ? `${product.title} removed from wishlist!`
        : `${product.title} added to wishlist!`,
      'success'
    );
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1">

      <div className="relative pt-[100%] bg-gray-50 dark:bg-slate-800 overflow-hidden">
        <Link to={`/product/${product.id}`} className="absolute inset-0 block">
          <img
            src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/300'}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <button
          onClick={handleToggleWishlist}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-sm border transition-all duration-200 cursor-pointer ${
            isWishlisted
              ? 'bg-rose-50 border-rose-100 text-rose-500 scale-110'
              : 'bg-white/80 border-white/40 text-gray-500 hover:text-rose-500 hover:bg-white dark:bg-slate-900/80 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        <span className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 text-[10px] font-semibold uppercase tracking-wider text-gray-600 dark:text-slate-400 shadow-sm border border-gray-100 dark:border-slate-800">
          {product.category}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 text-left mb-1.5 h-10 leading-snug">
            {product.title}
          </h3>
        </Link>

        <div className="mb-3">
          <StarRating rating={product.rating} />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-2 border-t border-gray-50 dark:border-slate-800/50">
          <span className="text-lg font-black text-gray-900 dark:text-white">
            ₹{(product.price * 85).toFixed(0)}
          </span>

          {isInCart ? (
            <Link
              to="/cart"
              className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Go to cart</span>
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-semibold text-xs px-3.5 py-2.5 rounded-xl shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all duration-200 cursor-pointer"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>

    </div>
  );
}