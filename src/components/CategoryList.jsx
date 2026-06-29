import React from 'react';
import { Laptop, Shirt, Sofa, Sparkles } from 'lucide-react';

const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: Laptop },
  { id: 'fashion', name: 'Fashion', icon: Shirt },
  { id: 'furniture', name: 'Furniture', icon: Sofa },
  { id: 'beauty', name: 'Beauty', icon: Sparkles },
];

export { CATEGORIES };

export default function CategoryList({ activeCategory, onSelectCategory }) {
  const isActive = (categoryId) => categoryId === activeCategory;

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectCategory(null)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            !activeCategory
              ? 'bg-indigo-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          All
        </button>

        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                isActive(cat.id)
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
