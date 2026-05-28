// 'use client'

// import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { ChevronDownIcon, XIcon } from '@heroicons/react/outline'

// export default function ProductFilters({ filters, setFilters }) {
//     const [openSections, setOpenSections] = useState({
//         category: true,
//         price: true,
//         sort: true,
//     })

//     const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys']

//     const toggleSection = (section) => {
//         setOpenSections({
//             ...openSections,
//             [section]: !openSections[section],
//         })
//     }

//     const clearFilters = () => {
//         setFilters({
//             category: '',
//             minPrice: '',
//             maxPrice: '',
//             sortBy: 'newest',
//         })
//     }

//     const handleFilterChange = (key, value) => {
//         setFilters({
//             ...filters,
//             [key]: value,
//         })
//     }

//     const hasActiveFilters = filters.category || filters.minPrice || filters.maxPrice || filters.sortBy !== 'newest'

//     return (
//         <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
//             <div className="flex justify-between items-center mb-4">
//                 <h3 className="text-xl font-bold text-gray-800">Filters</h3>
//                 {hasActiveFilters && (
//                     <button
//                         onClick={clearFilters}
//                         className="text-sm text-red-600 hover:text-red-700 flex items-center space-x-1"
//                     >
//                         <XIcon className="w-4 h-4" />
//                         <span>Clear all</span>
//                     </button>
//                 )}
//             </div>

//             {/* Category Filter */}
//             <div className="mb-6">
//                 <button
//                     onClick={() => toggleSection('category')}
//                     className="flex justify-between items-center w-full py-2"
//                 >
//                     <span className="font-semibold text-gray-700">Category</span>
//                     <ChevronDownIcon className={`w-5 h-5 transition-transform ${openSections.category ? 'rotate-180' : ''}`} />
//                 </button>
//                 <AnimatePresence>
//                     {openSections.category && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="mt-2 space-y-2 overflow-hidden"
//                         >
//                             {categories.map((category) => (
//                                 <label key={category} className="flex items-center space-x-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="category"
//                                         checked={filters.category === category}
//                                         onChange={() => handleFilterChange('category', category)}
//                                         className="text-blue-600 focus:ring-blue-500"
//                                     />
//                                     <span className="text-gray-600">{category}</span>
//                                 </label>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Price Filter */}
//             <div className="mb-6">
//                 <button
//                     onClick={() => toggleSection('price')}
//                     className="flex justify-between items-center w-full py-2"
//                 >
//                     <span className="font-semibold text-gray-700">Price Range</span>
//                     <ChevronDownIcon className={`w-5 h-5 transition-transform ${openSections.price ? 'rotate-180' : ''}`} />
//                 </button>
//                 <AnimatePresence>
//                     {openSections.price && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="mt-2 space-y-3 overflow-hidden"
//                         >
//                             <div>
//                                 <label className="block text-sm text-gray-600 mb-1">Min Price</label>
//                                 <input
//                                     type="number"
//                                     value={filters.minPrice}
//                                     onChange={(e) => handleFilterChange('minPrice', e.target.value)}
//                                     placeholder="₹0"
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-600 mb-1">Max Price</label>
//                                 <input
//                                     type="number"
//                                     value={filters.maxPrice}
//                                     onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
//                                     placeholder="₹100000"
//                                     className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                                 />
//                             </div>
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>

//             {/* Sort Filter */}
//             <div className="mb-6">
//                 <button
//                     onClick={() => toggleSection('sort')}
//                     className="flex justify-between items-center w-full py-2"
//                 >
//                     <span className="font-semibold text-gray-700">Sort By</span>
//                     <ChevronDownIcon className={`w-5 h-5 transition-transform ${openSections.sort ? 'rotate-180' : ''}`} />
//                 </button>
//                 <AnimatePresence>
//                     {openSections.sort && (
//                         <motion.div
//                             initial={{ height: 0, opacity: 0 }}
//                             animate={{ height: 'auto', opacity: 1 }}
//                             exit={{ height: 0, opacity: 0 }}
//                             className="mt-2 space-y-2 overflow-hidden"
//                         >
//                             {[
//                                 { value: 'newest', label: 'Newest First' },
//                                 { value: 'priceLow', label: 'Price: Low to High' },
//                                 { value: 'priceHigh', label: 'Price: High to Low' },
//                                 { value: 'rating', label: 'Top Rated' },
//                             ].map((option) => (
//                                 <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
//                                     <input
//                                         type="radio"
//                                         name="sortBy"
//                                         checked={filters.sortBy === option.value}
//                                         onChange={() => handleFilterChange('sortBy', option.value)}
//                                         className="text-blue-600 focus:ring-blue-500"
//                                     />
//                                     <span className="text-gray-600">{option.label}</span>
//                                 </label>
//                             ))}
//                         </motion.div>
//                     )}
//                 </AnimatePresence>
//             </div>
//         </div>
//     )
// }

'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const ProductFilters = ({ filters, onFilterChange }) => {
  const [openSections, setOpenSections] = useState({
    categories: true,
    price: true,
    rating: true,
  });

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 45 },
    { id: 'clothing', name: 'Clothing', count: 89 },
    { id: 'books', name: 'Books', count: 67 },
    { id: 'home', name: 'Home & Living', count: 34 },
    { id: 'sports', name: 'Sports', count: 23 },
    { id: 'toys', name: 'Toys', count: 56 },
  ];

  const priceRanges = [
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 - ₹2,500', min: 1000, max: 2500 },
    { label: '₹2,500 - ₹5,000', min: 2500, max: 5000 },
    { label: '₹5,000 - ₹10,000', min: 5000, max: 10000 },
    { label: 'Above ₹10,000', min: 10000, max: Infinity },
  ];

  const ratings = [4, 3, 2, 1];

  const toggleSection = (section) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (categoryId) => {
    onFilterChange({
      ...filters,
      category: filters.category === categoryId ? '' : categoryId,
    });
  };

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({
      ...filters,
      priceRange: [min, max],
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...filters,
      rating: filters.rating === rating ? 0 : rating,
    });
  };

  const handleStockChange = (e) => {
    onFilterChange({
      ...filters,
      inStock: e.target.checked,
    });
  };

  const clearFilters = () => {
    onFilterChange({
      category: '',
      priceRange: [0, 10000],
      rating: 0,
      sortBy: 'newest',
      inStock: false,
    });
  };

  const activeFiltersCount = [
    filters.category ? 1 : 0,
    filters.priceRange[0] > 0 || filters.priceRange[1] < 10000 ? 1 : 0,
    filters.rating ? 1 : 0,
    filters.inStock ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Filters</h3>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('categories')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-medium">Categories</span>
          {openSections.categories ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        
        {openSections.categories && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={filters.category === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category.name}</span>
                </div>
                <span className="text-xs text-gray-500">({category.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-medium">Price Range</span>
          {openSections.price ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        
        {openSections.price && (
          <div className="space-y-2">
            {priceRanges.map((range, idx) => (
              <label key={idx} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange[0] === range.min && filters.priceRange[1] === range.max}
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection('rating')}
          className="flex justify-between items-center w-full mb-3"
        >
          <span className="font-medium">Customer Rating</span>
          {openSections.rating ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
        
        {openSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-2"
                />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${
                        i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-700 ml-1">& up</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={handleStockChange}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
          />
          <span className="text-sm text-gray-700">In Stock Only</span>
        </label>
      </div>

      {/* Active Filters */}
      {activeFiltersCount > 0 && (
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                Category: {categories.find(c => c.id === filters.category)?.name}
                <button onClick={() => handleCategoryChange('')}>
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.rating > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                {filters.rating}+ Stars
                <button onClick={() => handleRatingChange(0)}>
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
            {filters.inStock && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                In Stock
                <button onClick={() => handleStockChange({ target: { checked: false } })}>
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// StarIcon component for rating display
const StarIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);