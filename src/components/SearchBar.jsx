import React from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Search products by name or category..."
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm transition-all"
      />
      <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
    </form>
  );
}