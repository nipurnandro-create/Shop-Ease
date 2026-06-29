import React from 'react';
import { FileText } from 'lucide-react';

export default function TermsOfService() {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-950/40 p-3 text-indigo-600 dark:text-indigo-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Terms of Service</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">Using ShopEase responsibly</h1>
          </div>
        </div>

        <div className="space-y-4 text-gray-600 dark:text-slate-300 leading-relaxed">
          <p>These terms govern your use of ShopEase and all related services, including browsing products, placing orders, and managing your account.</p>
          <p>You agree to use the platform lawfully and to provide accurate account and payment information when placing an order.</p>
          <p>ShopEase reserves the right to update prices, availability, and promotions at any time. Product images and descriptions are for reference and may vary slightly.</p>
          <p>By continuing to use the site, you agree to our policies for payments, delivery, returns, and customer support.</p>
        </div>
      </section>
    </main>
  );
}
