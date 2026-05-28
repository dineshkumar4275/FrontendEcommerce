// components/FilterBar.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';

export const FilterBar = ({
  categories = [],
  selectedCategory = '',
  setSelectedCategory,
  minPrice = '',
  setMinPrice,
  maxPrice = '',
  setMaxPrice,
  sortBy = 'newest',
  setSortBy,
  onApplyFilters,
  onClearFilters,
  className = ''
}) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localMinPrice, setLocalMinPrice] = useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState(maxPrice);
  const [localCategory, setLocalCategory] = useState(selectedCategory);
  const [localSortBy, setLocalSortBy] = useState(sortBy);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'name_asc', label: 'Name: A to Z' },
    { value: 'popular', label: 'Most Popular' },
  ];

  const handleApplyFilters = () => {
    if (setMinPrice) setMinPrice(localMinPrice);
    if (setMaxPrice) setMaxPrice(localMaxPrice);
    if (setSelectedCategory) setSelectedCategory(localCategory);
    if (setSortBy) setSortBy(localSortBy);
    if (onApplyFilters) onApplyFilters();
    setIsMobileFilterOpen(false);
  };

  const handleClearFilters = () => {
    setLocalMinPrice('');
    setLocalMaxPrice('');
    setLocalCategory('');
    setLocalSortBy('newest');
    if (setMinPrice) setMinPrice('');
    if (setMaxPrice) setMaxPrice('');
    if (setSelectedCategory) setSelectedCategory('');
    if (setSortBy) setSortBy('newest');
    if (onClearFilters) onClearFilters();
    setIsMobileFilterOpen(false);
  };

  const hasActiveFilters = localCategory || localMinPrice || localMaxPrice || localSortBy !== 'newest';

  return (
    <>
      {/* Desktop Filter Bar */}
      <div className={`hidden md:block bg-white rounded-xl shadow-sm p-4 mb-6 ${className}`}>
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex-1 min-w-[150px]">
            <select
              value={localCategory}
              onChange={(e) => setLocalCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-sm"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id || cat} value={cat.name || cat}>
                  {cat.name || cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={localMinPrice}
              onChange={(e) => setLocalMinPrice(e.target.value)}
              className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              placeholder="Max Price"
              value={localMaxPrice}
              onChange={(e) => setLocalMaxPrice(e.target.value)}
              className="w-28 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Sort By */}
          <div className="w-48">
            <select
              value={localSortBy}
              onChange={(e) => setLocalSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-sm"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleApplyFilters}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition"
          >
            Apply
          </button>

          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="px-4 py-2 text-red-500 hover:text-red-600 font-medium transition"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl flex items-center justify-between hover:border-purple-300 transition"
        >
          <div className="flex items-center gap-2">
            <FunnelIcon className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700">Filters & Sort</span>
          </div>
          {hasActiveFilters && (
            <span className="px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded-full">
              Active
            </span>
          )}
        </button>
      </div>

      {/* Mobile Filter Modal */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => setIsMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>

              {/* Filter Options */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Categories
                  </label>
                  <select
                    value={localCategory}
                    onChange={(e) => setLocalCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id || cat} value={cat.name || cat}>
                        {cat.name || cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={localMinPrice}
                      onChange={(e) => setLocalMinPrice(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={localMaxPrice}
                      onChange={(e) => setLocalMaxPrice(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <div className="space-y-2">
                    {sortOptions.map((option) => (
                      <label key={option.value} className="flex items-center gap-3 py-2 cursor-pointer">
                        <input
                          type="radio"
                          name="sortBy"
                          value={option.value}
                          checked={localSortBy === option.value}
                          onChange={(e) => setLocalSortBy(e.target.value)}
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-gray-100 space-y-2">
                <button
                  onClick={handleApplyFilters}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold"
                >
                  Apply Filters
                </button>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="w-full py-2 text-red-500 font-medium"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Active Filters Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-4">
          {localCategory && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
              📁 {localCategory}
              <button onClick={() => setLocalCategory('')} className="hover:text-purple-900 ml-1">×</button>
            </span>
          )}
          {(localMinPrice || localMaxPrice) && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
              💰 ₹{localMinPrice || 0} - ₹{localMaxPrice || '∞'}
              <button onClick={() => { setLocalMinPrice(''); setLocalMaxPrice(''); }} className="hover:text-purple-900 ml-1">×</button>
            </span>
          )}
          {localSortBy !== 'newest' && (
            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
              📊 {sortOptions.find(opt => opt.value === localSortBy)?.label}
              <button onClick={() => setLocalSortBy('newest')} className="hover:text-purple-900 ml-1">×</button>
            </span>
          )}
        </div>
      )}
    </>
  );
};