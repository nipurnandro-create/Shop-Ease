import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Sparkles, ShieldCheck, Truck } from 'lucide-react';

export default function About() {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-950/40 p-3 text-indigo-600 dark:text-indigo-400">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">About ShopEase</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Your trusted online shopping destination</h1>
          </div>
        </div>

        <p className="text-gray-600 dark:text-slate-300 max-w-3xl leading-relaxed mb-8">
          ShopEase brings together premium products, thoughtful recommendations, and a smooth shopping experience in one place. From everyday essentials to curated favorites, we make it easy to discover, compare, and buy with confidence.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Sparkles className="w-5 h-5" />
              <h2 className="font-semibold">Curated picks</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">Handpicked deals and trending items for every lifestyle.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
              <h2 className="font-semibold">Secure shopping</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">Safe checkout, transparent pricing, and reliable support.</p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
              <Truck className="w-5 h-5" />
              <h2 className="font-semibold">Fast delivery</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">Quick dispatch and delivery options tailored for convenience.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link to="/" className="inline-flex items-center rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            Explore products
          </Link>
        </div>
      </section>
    </main>
  );
}
