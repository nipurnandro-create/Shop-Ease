import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="flex-grow max-w-md mx-auto flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="p-5 bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-6 shadow-inner animate-bounce">
        <AlertCircle className="w-16 h-16 stroke-[1.5]" />
      </div>

      <h1 className="text-6xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
        404
      </h1>

      <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-3">
        Page Not Found
      </h2>

      <p className="text-gray-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back on track!
      </p>

      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </main>
  );
}