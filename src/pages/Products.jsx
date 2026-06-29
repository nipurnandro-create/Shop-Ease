import React, { useEffect, useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import FilterPanel from '../components/FilterPanel';
import SortDropdown from '../components/SortDropdown';
import SkeletonLoader from '../components/SkeletonLoader';
import ErrorMessage from '../components/ErrorMessage';
import CategoryList from '../components/CategoryList';
import { fetchProducts } from '../services/api';
import { useSearch } from '../context/SearchContext';

const CATEGORY_MAP = {
  electronics: ['smartphones', 'laptops', 'mobile-accessories'],
  fashion: ['mens-shirts', 'mens-shoes', 'womens-dresses', 'womens-shoes', 'womens-bags', 'womens-jewellery'],
  furniture: ['furniture', 'home-decoration'],
  beauty: ['beauty', 'fragrances'],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const { searchQuery, setSearchQuery } = useSearch();
  const location = useLocation();
  const navigate = useNavigate();

  const loadProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchFromUrl = params.get('search') || '';
    const categoryFromUrl = params.get('category');
    setSearchQuery(searchFromUrl);
    setActiveCategory(categoryFromUrl && CATEGORY_MAP[categoryFromUrl] ? categoryFromUrl : null);
  }, [location.search, setSearchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const currentSearch = params.get('search') || '';
    const currentCategory = params.get('category') || '';
    const nextSearch = searchQuery.trim();
    const nextCategory = activeCategory || '';

    if (currentSearch === nextSearch && currentCategory === nextCategory) {
      return;
    }

    if (nextSearch) {
      params.set('search', nextSearch);
    } else {
      params.delete('search');
    }

    if (nextCategory) {
      params.set('category', nextCategory);
    } else {
      params.delete('category');
    }

    const nextUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(nextUrl, { replace: true });
  }, [activeCategory, location.pathname, location.search, navigate, searchQuery]);

  const syncCategoryFromUrl = (categoryValue) => {
    const params = new URLSearchParams(location.search);
    if (categoryValue) {
      params.set('category', categoryValue);
    } else {
      params.delete('category');
    }

    const nextSearch = params.toString();
    navigate(`${location.pathname}${nextSearch ? `?${nextSearch}` : ''}`, { replace: true });
  };

  const handleCategorySelect = (categoryValue) => {
    setActiveCategory(categoryValue);
    syncCategoryFromUrl(categoryValue);
  };

  const handleResetFilters = () => {
    setActiveCategory(null);
    setPriceRange({ min: '', max: '' });
    setMinRating(0);
    setSortBy('featured');
    syncCategoryFromUrl(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter((p) => {
        const searchableText = [
          p.title,
          p.description,
          p.category,
          p.subcategory,
          p.brand,
          p.tags,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        return searchableText.includes(query);
      });
    }

    if (activeCategory) {
      const allowedSubcategories = CATEGORY_MAP[activeCategory] || [];
      result = result.filter((p) => allowedSubcategories.includes(p.category));
    }

    const minPrice = priceRange.min === '' ? null : Number(priceRange.min);
    const maxPrice = priceRange.max === '' ? null : Number(priceRange.max);

    if (minPrice !== null) {
      result = result.filter((p) => p.price >= minPrice);
    }
    if (maxPrice !== null) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    if (minRating > 0) {
      result = result.filter((p) => p.rating >= minRating);
    }

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'name-asc') result.sort((a, b) => a.title.localeCompare(b.title));

    return result;
  }, [products, searchQuery, activeCategory, priceRange, minRating, sortBy]);

  return (
    <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6 rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-500">Products</p>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white">Browse our full catalog</h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            <Search className="w-4 h-4" />
            <span>{searchQuery ? `Showing results for “${searchQuery}”` : 'Search across everything'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 flex-shrink-0">
          <FilterPanel
            priceRange={priceRange}
            onPriceChange={setPriceRange}
            minRating={minRating}
            onRatingChange={setMinRating}
            onReset={handleResetFilters}
          />
        </aside>

        <div className="flex-1">
          <CategoryList activeCategory={activeCategory} onSelectCategory={handleCategorySelect} />

          <div className="mb-6 flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800/50">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400">
              <Filter className="w-4 h-4" />
              <span>
                Showing <strong className="text-gray-900 dark:text-white">{filteredAndSortedProducts.length}</strong> products
              </span>
            </div>
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {loading ? (
            <SkeletonLoader count={8} />
          ) : error ? (
            <ErrorMessage message={error} onRetry={loadProducts} />
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 py-20 text-center dark:border-slate-800 dark:bg-slate-900/50">
              <p className="text-lg font-semibold text-gray-700 dark:text-slate-200">No products match your filters</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">Try adjusting your search or reset the filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
