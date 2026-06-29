import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowLeft } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/ProductCard';

export default function Wishlist() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <main className="flex-grow max-w-2xl mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="p-6 bg-rose-50 dark:bg-rose-950/20 text-rose-500 rounded-full mb-6">
          <Heart className="w-16 h-16 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
          Keep track of items you love! Tap the heart button on any product to save it here for later.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Discover Products</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white text-left flex items-center gap-3">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <span>Saved Wishlist</span>
        </h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}