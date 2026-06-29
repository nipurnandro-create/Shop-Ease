import React from 'react';
import { SlidersHorizontal, Star } from 'lucide-react';

export default function FilterPanel({ priceRange, onPriceChange, minRating, onRatingChange, onReset }) {
  const handleMinChange = (e) => {
    const rawValue = e.target.value;
    const nextMin = rawValue === '' ? '' : Math.max(0, Number(rawValue));
    const nextRange = { ...priceRange, min: nextMin };

    if (nextMin !== '' && priceRange.max !== '' && Number(nextMin) > Number(priceRange.max)) {
      nextRange.max = nextMin;
    }

    onPriceChange(nextRange);
  };

  const handleMaxChange = (e) => {
    const rawValue = e.target.value;
    const nextMax = rawValue === '' ? '' : Math.max(0, Number(rawValue));
    const nextRange = { ...priceRange, max: nextMax };

    if (nextMax !== '' && priceRange.min !== '' && Number(nextMax) < Number(priceRange.min)) {
      nextRange.min = nextMax;
    }

    onPriceChange(nextRange);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl p-6 sticky top-20 shadow-sm transition-colors duration-200">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-slate-800/80">
        <div className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
          <SlidersHorizontal className="w-4 h-4 text-indigo-500" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-800 dark:text-slate-200 mb-3 text-left">
          Price Range (₹)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min="0"
            placeholder="Min"
            value={priceRange.min}
            onChange={handleMinChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          <span className="text-gray-400 font-light">-</span>
          <input
            type="number"
            min="0"
            placeholder="Max"
            value={priceRange.max}
            onChange={handleMaxChange}
            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-800 dark:text-slate-200 mb-3 text-left">
          Minimum Rating
        </label>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((stars) => (
            <button
              key={stars}
              onClick={() => onRatingChange(minRating === stars ? 0 : stars)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-sm transition-all cursor-pointer ${
                minRating === stars
                  ? 'border-amber-400 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-bold'
                  : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-0.5 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < stars ? 'fill-current' : 'text-gray-300 dark:text-slate-700'}`}
                  />
                ))}
              </div>
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}