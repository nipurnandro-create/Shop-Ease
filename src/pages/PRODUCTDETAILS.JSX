import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, ShieldCheck, Truck, RotateCcw, MessageSquare } from 'lucide-react';
import { fetchProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { StarRating } from '../components/ProductCard';
import ErrorMessage from '../components/ErrorMessage';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');

  const loadProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(id);
      setProduct(data);
      setActiveImage(data.images?.[0] || data.thumbnail);
    } catch (err) {
      setError(err.message || 'Failed to retrieve product details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 animate-pulse w-full">
        <div className="h-6 w-20 bg-gray-200 dark:bg-slate-800 rounded-full mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <div className="bg-gray-200 dark:bg-slate-800 rounded-3xl aspect-square w-full" />
            <div className="flex gap-4">
              <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-20 w-20" />
              <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-20 w-20" />
              <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-20 w-20" />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-4 w-1/4 bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-10 w-3/4 bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-6 w-1/3 bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-6 w-1/4 bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-24 w-full bg-gray-200 dark:bg-slate-800 rounded" />
            <div className="h-12 w-1/2 bg-gray-200 dark:bg-slate-800 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to products</span>
        </Link>
        <ErrorMessage message={error} onRetry={loadProduct} />
      </div>
    );
  }

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product);
    addToast(`${product.title} added to cart!`, 'success');
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    addToast(
      isWishlisted
        ? `${product.title} removed from wishlist!`
        : `${product.title} added to wishlist!`,
      'success'
    );
  };

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to catalog</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <div className="bg-gray-50 dark:bg-slate-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-slate-800 flex items-center justify-center p-4 aspect-square">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain hover:scale-[1.03] transition-transform duration-300"
            />
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex flex-wrap gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800 border p-1 transition-all cursor-pointer ${
                    activeImage === img
                      ? 'border-indigo-500 ring-2 ring-indigo-500/10'
                      : 'border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-700'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase rounded-full tracking-wider border border-indigo-100/30">
              {product.category}
            </span>
            {product.brand && (
              <span className="text-sm font-semibold text-gray-500 dark:text-slate-400">
                by {product.brand}
              </span>
            )}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3 tracking-tight">
            {product.title}
          </h1>

          <div className="mb-6 flex items-center gap-4">
            <StarRating rating={product.rating} />
            <span className="text-xs text-gray-400 dark:text-slate-500">|</span>
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              {product.reviews?.length || 0} customer reviews
            </span>
          </div>

          <div className="mb-6 py-4 px-6 bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-gray-100 dark:border-slate-800/60 inline-block self-start">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-gray-900 dark:text-white">₹{(product.price * 85).toFixed(0)}</span>
              {product.discountPercentage && (
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  ({product.discountPercentage}% OFF)
                </span>
              )}
            </div>
            {product.stock > 0 ? (
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1 block">
                In Stock ({product.stock} left)
              </span>
            ) : (
              <span className="text-xs font-semibold text-rose-500 mt-1 block">Out of Stock</span>
            )}
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-800 dark:text-slate-200 uppercase tracking-wider mb-2">
              Description
            </h3>
            <p className="text-gray-600 dark:text-slate-350 leading-relaxed text-sm">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 p-4 border border-gray-100 dark:border-slate-800 rounded-2xl mb-8">
            {product.warrantyInformation && (
              <div>
                <span className="text-xs text-gray-400 dark:text-slate-500 block">Warranty</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div>
                <span className="text-xs text-gray-400 dark:text-slate-500 block">Shipping</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{product.shippingInformation}</span>
              </div>
            )}
            {product.returnPolicy && (
              <div>
                <span className="text-xs text-gray-400 dark:text-slate-500 block">Returns</span>
                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">{product.returnPolicy}</span>
              </div>
            )}
            {product.sku && (
              <div>
                <span className="text-xs text-gray-400 dark:text-slate-500 block">SKU</span>
                <span className="text-sm font-mono text-gray-700 dark:text-slate-300">{product.sku}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-all duration-200 active:scale-98 cursor-pointer ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed opacity-50 shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/10 hover:shadow-indigo-600/20'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Shopping Cart</span>
            </button>

            <button
              onClick={handleToggleWishlist}
              className={`px-5 py-4 rounded-2xl border flex items-center justify-center gap-2 font-semibold transition-all active:scale-98 cursor-pointer ${
                isWishlisted
                  ? 'bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 font-bold'
                  : 'border-gray-200 dark:border-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800'
              }`}
            >
              <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current text-rose-500' : ''}`} />
              <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
            </button>
          </div>

          <div className="border-t border-gray-100 dark:border-slate-800/80 pt-6 flex flex-wrap gap-y-3 justify-between text-xs text-gray-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Secure Transaction</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-indigo-500" />
              <span>Free Delivery Available</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-500" />
              <span>Easy 30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>

      {product.reviews && product.reviews.length > 0 && (
        <section className="mt-16 text-left border-t border-gray-100 dark:border-slate-800/60 pt-12">
          <div className="flex items-center gap-2 mb-8">
            <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">Customer Reviews</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800/80 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-bold text-gray-800 dark:text-slate-200 text-sm">{review.reviewerName}</span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-gray-600 dark:text-slate-400 text-sm italic leading-relaxed">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}