import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center max-w-md mx-auto my-12 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 rounded-3xl shadow-sm">
      <div className="p-4 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 rounded-2xl mb-4 shadow-inner">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <h3 className="text-lg font-bold text-rose-800 dark:text-rose-300 mb-2">
        Something went wrong
      </h3>

      <p className="text-sm text-rose-700/80 dark:text-rose-450/80 mb-6 leading-relaxed">
        {message || "We couldn't connect to our servers. Please check your internet connection and try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl shadow-md shadow-rose-600/10 hover:shadow-rose-600/20 transition-all duration-200 cursor-pointer text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
}