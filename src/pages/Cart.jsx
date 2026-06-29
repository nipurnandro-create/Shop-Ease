import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, CreditCard, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { AnimatePresence, motion } from 'framer-motion';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const subtotalInr = cartTotal * 85;
  const couponDiscount = appliedCoupon ? subtotalInr * (appliedCoupon.discountPercent / 100) : 0;
  const discountedSubtotal = subtotalInr - couponDiscount;
  const shippingFee = discountedSubtotal >= 5000 || discountedSubtotal === 0 ? 0 : 199;
  const taxRate = 0.08;
  const taxAmount = discountedSubtotal * taxRate;
  const grandTotal = discountedSubtotal + shippingFee + taxAmount;

  const handleCheckout = () => {
    addToast('Order placed successfully! Thank you for shopping with ShopEase.', 'success');
    clearCart();
    navigate('/');
  };

  const handleApplyCoupon = () => {
    const normalizedCode = couponCode.trim().toUpperCase();

    if (!normalizedCode) {
      addToast('Please enter a coupon code.', 'error');
      return;
    }

    if (normalizedCode === 'SAVE20') {
      setAppliedCoupon({ code: normalizedCode, discountPercent: 20 });
      addToast('Coupon applied: SAVE20 gives 20% off.', 'success');
      return;
    }

    if (normalizedCode === 'WELCOME10') {
      setAppliedCoupon({ code: normalizedCode, discountPercent: 10 });
      addToast('Coupon applied: WELCOME10 gives 10% off.', 'success');
      return;
    }

    addToast('Coupon not found. Try SAVE20 or WELCOME10.', 'error');
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    addToast('Coupon removed.', 'success');
  };

  if (cart.length === 0) {
    return (
      <main className="flex-grow max-w-2xl mx-auto flex flex-col items-center justify-center px-4 py-20 text-center">
        <div className="p-6 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 stroke-[1.5]" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-gray-500 dark:text-slate-400 text-sm max-w-sm mb-8 leading-relaxed">
          Looks like you haven't added anything to your cart yet. Explore our awesome products to get started!
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </Link>
      </main>
    );
  }

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-8 text-left flex items-center gap-3">
        <ShoppingBag className="w-8 h-8 text-indigo-600 dark:text-indigo-400 stroke-[2.5]" />
        <span>Your Shopping Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">
          <div className="flex flex-col gap-4">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="flex flex-col sm:flex-row items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-sm"
                >
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800/80 flex items-center justify-center p-2">
                    <Link to={`/product/${item.id}`} className="w-full h-full block">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-contain hover:scale-105 transition-transform"
                      />
                    </Link>
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <Link to={`/product/${item.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      <h3 className="text-sm font-bold text-gray-800 dark:text-slate-100 line-clamp-1">
                        {item.title}
                      </h3>
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-slate-400 uppercase tracking-wider block mt-0.5 mb-1.5 font-medium">
                      {item.category}
                    </span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400">
                      ₹{(item.price * 85).toFixed(0)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 rounded-xl">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label="Decrease quantity"
                        className="p-2 text-gray-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-sm font-bold w-8 text-center text-gray-800 dark:text-white select-none">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label="Increase quantity"
                        className="p-2 text-gray-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        addToast(`${item.title} removed from cart.`, 'success');
                      }}
                      aria-label="Remove item"
                      className="p-2 text-gray-400 hover:text-rose-500 dark:text-slate-500 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-xl transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline mt-6 ml-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="w-full">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sticky top-20 shadow-sm transition-colors duration-200">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 pb-4 border-b border-gray-100 dark:border-slate-800/80 text-left">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-4">
                <label htmlFor="coupon" className="text-sm font-semibold text-gray-800 dark:text-slate-100 block mb-2">
                  Coupon code
                </label>
                <div className="flex gap-2">
                  <input
                    id="coupon"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="SAVE20"
                    className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-gray-700 dark:text-slate-200 outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Apply
                  </button>
                </div>
                <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">
                  Try <span className="font-semibold text-indigo-600 dark:text-indigo-400">SAVE20</span> or <span className="font-semibold text-indigo-600 dark:text-indigo-400">WELCOME10</span>
                </p>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300">
                  <span>Coupon applied: {appliedCoupon.code}</span>
                  <button onClick={handleRemoveCoupon} className="font-semibold underline">
                    Remove
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">₹{subtotalInr.toFixed(0)}</span>
              </div>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-400">
                  <span>Coupon Discount</span>
                  <span className="font-semibold">-₹{couponDiscount.toFixed(0)}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400">
                <span>Estimated Shipping</span>
                {shippingFee === 0 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Free
                  </span>
                ) : (
                  <span className="font-semibold text-gray-800 dark:text-slate-200">₹{shippingFee.toFixed(0)}</span>
                )}
              </div>

              {shippingFee > 0 && (
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 text-[11px] p-3 rounded-xl border border-indigo-100/30 text-indigo-700 dark:text-indigo-300 leading-normal text-left font-medium">
                  💡 Add <strong>₹{(5000 - discountedSubtotal).toFixed(0)}</strong> more to get <strong>FREE shipping</strong>!
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-slate-400">
                <span>Sales Tax (8%)</span>
                <span className="font-semibold text-gray-800 dark:text-slate-200">₹{taxAmount.toFixed(0)}</span>
              </div>

              <div className="border-t border-gray-100 dark:border-slate-800/85 pt-4 flex items-center justify-between font-black text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>₹{grandTotal.toFixed(0)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 transition-all cursor-pointer text-sm sm:text-base"
            >
              <CreditCard className="w-4.5 h-4.5" />
              <span>Checkout Order</span>
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}