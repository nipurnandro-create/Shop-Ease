import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function Plicy() {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-950/40 p-3 text-indigo-600 dark:text-indigo-400">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Privacy Policy</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Your privacy matters to us</h1>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 dark:text-slate-300 leading-relaxed">
          <p>ShopEase collects only the information needed to provide a secure shopping experience, process orders, and improve our services.</p>
          <p>We use your data to personalize product recommendations, manage your cart and wishlist, and communicate important updates related to your orders.</p>
          <p>We do not sell your personal information. Your data may be shared only with trusted service providers that help us operate the platform securely and efficiently.</p>
          <p>By using ShopEase, you agree that we may store cookies and usage data to improve performance and remember your preferences.</p>
        </div>
      </section>
    </main>
  );
}
