import React from 'react';
import { Headphones, Mail, Phone } from 'lucide-react';

export default function ContactSupport() {
  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <section className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 p-8 sm:p-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="rounded-full bg-indigo-100 dark:bg-indigo-950/40 p-3 text-indigo-600 dark:text-indigo-400">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Contact Support</p>
            <h1 className="text-3xl font-black text-gray-900 dark:text-white">We are here to help</h1>
          </div>
        </div>

        <p className="text-gray-600 dark:text-slate-300 leading-relaxed mb-6">
          Need help with an order, delivery, return, or account question? Our support team is available to assist you quickly and clearly.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
              <Mail className="w-5 h-5" />
              <h2 className="font-semibold">Email support</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">support@shopease.com</p>
          </div>
          <div className="rounded-2xl border border-gray-200 dark:border-slate-800 p-5">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
              <Phone className="w-5 h-5" />
              <h2 className="font-semibold">Call us</h2>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-300">+1 (555) 019-2834</p>
          </div>
        </div>
      </section>
    </main>
  );
}
