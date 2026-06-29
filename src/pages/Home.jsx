import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryList from '../components/CategoryList';

export default function Home() {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate('/products');
  };

  const handleCategorySelect = (category) => {
    navigate(category ? `/products?category=${category}` : '/products');
  };

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto pb-16">
      <section className="mx-4 mt-4 overflow-hidden rounded-3xl border border-indigo-100 bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/10 dark:border-slate-800 dark:from-slate-900 dark:via-indigo-950 dark:to-fuchsia-950">
        <div className="flex items-center gap-6 whitespace-nowrap py-3 pr-6 motion-reduce:animate-none" style={{ animation: 'marquee 24s linear infinite' }}>
          <span className="ml-6 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">Limited Offer</span>
          <span className="text-sm font-medium">Save up to 30% on selected essentials</span>
          <span className="text-sm font-medium">• Use code SAVE20 for 20% off</span>
          <span className="text-sm font-medium">• Free shipping above ₹5000</span>
          <span className="text-sm font-medium">• New arrivals every week</span>
          <span className="ml-6 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-100">Limited Offer</span>
          <span className="text-sm font-medium">Save up to 30% on selected essentials</span>
          <span className="text-sm font-medium">• Use code SAVE20 for 20% off</span>
          <span className="text-sm font-medium">• Free shipping above ₹5000</span>
          <span className="text-sm font-medium">• New arrivals every week</span>
          <span className="text-sm font-medium">• Shop now before the deal ends</span>
        </div>
      </section>

      <Hero onCtaClick={handleCtaClick} />

      <CategoryList onSelectCategory={handleCategorySelect} />

      <section className="mx-4 mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-3">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">Fresh picks</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">Shop a curated selection of top products</h2>
          <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
            Explore the latest essentials across electronics, fashion, home, and beauty — all in one place.
          </p>
          <Link to="/products" className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Browse products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-fuchsia-50 p-8 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-fuchsia-950/40">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-3">
            <ShoppingBag className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">Quick access</span>
          </div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3">Everything you need, just a tap away</h3>
          <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-300">
            <li>• Fast product search with instant results</li>
            <li>• Smart filters, sorting, and category browsing</li>
            <li>• Smooth cart and wishlist flow</li>
          </ul>
        </div>
      </section>
    </main>
  );
}