import React from 'react';

export default function SkeletonLoader({ count = 8 }) {
  const items = Array.from({ length: count });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
      {items.map((_, index) => (
        <div
          key={index}
          className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-4 flex flex-col h-[350px] animate-pulse"
        >
          <div className="bg-gray-200 dark:bg-slate-800 rounded-xl pt-[85%] mb-4 w-full" />
          <div className="bg-gray-200 dark:bg-slate-800 rounded-full h-4 w-1/3 mb-2" />
          <div className="bg-gray-200 dark:bg-slate-800 rounded h-5 w-5/6 mb-2" />
          <div className="bg-gray-200 dark:bg-slate-800 rounded h-5 w-2/3 mb-4" />
          <div className="bg-gray-200 dark:bg-slate-800 rounded h-4 w-1/2 mb-auto" />
          <div className="flex items-center justify-between mt-4 pt-2 border-t border-gray-100 dark:border-slate-800/50">
            <div className="bg-gray-200 dark:bg-slate-800 rounded h-6 w-1/4" />
            <div className="bg-gray-200 dark:bg-slate-800 rounded-xl h-9 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}