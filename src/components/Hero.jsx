import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero({ onCtaClick }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-indigo-200/70 bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 text-white py-12 px-6 shadow-xl shadow-indigo-500/10 dark:border-slate-800 dark:from-slate-900 dark:via-indigo-950 dark:to-fuchsia-950 sm:px-12 md:py-20 md:px-16 dark:shadow-slate-950/50 mb-8 mt-4 mx-4">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-52 h-52 bg-pink-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl flex flex-col items-start gap-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Summer Collection 2026</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight m-0 text-left">
          Discover a New Way to <span>Shop Online</span>
        </h1>

        <p className="text-white/90 text-sm sm:text-base md:text-lg max-w-xl text-left font-light leading-relaxed">
          Explore curated top-tier products in electronics, fashion, furniture, and beauty. Premium quality, lightning-fast delivery, and returns made simple.
        </p>

        <button
          onClick={onCtaClick}
          className="mt-4 inline-flex items-center gap-2 bg-white text-gray-900 font-bold px-6 py-3 rounded-full hover:bg-gray-100 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg transition-all duration-200 group text-sm sm:text-base cursor-pointer"
        >
          <span>Shop Collection</span>
          <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}