// components/ProductGrid.jsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from './ProductSkeleton';

export const ProductGrid = ({
  products = [],
  loading = false,
  onAddToCart,
  onWishlistToggle,
  wishlistIds = new Set(),
  layout = 'grid',
  columns = {
    mobile: 2,
    tablet: 3,
    desktop: 4,
    large: 5
  },
  showHeader = true,
  title = "Our Products",
  subtitle = "Discover amazing products at great prices",
  emptyMessage = "No products found",
  emptySubMessage = "No products available at the moment",
  className = ""
}) => {
  const [viewLayout, setViewLayout] = useState(layout);

  const getGridCols = () => {
    if (viewLayout === 'list') return 'grid-cols-1';
    return `grid-cols-${columns.mobile} sm:grid-cols-${columns.tablet} md:grid-cols-${columns.desktop} lg:grid-cols-${columns.large}`;
  };

  return (
    <div className={className}>
      {/* Header */}
      {showHeader && (
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-gray-500 mt-1">{subtitle}</p>
        </div>
      )}

      {/* Layout Toggle */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-500 text-sm">
          Showing <span className="font-semibold text-purple-600">{products.length}</span> products
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setViewLayout('grid')}
            className={`p-2 rounded-lg transition ${viewLayout === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
          </button>
          <button
            onClick={() => setViewLayout('list')}
            className={`p-2 rounded-lg transition ${viewLayout === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className={`grid ${getGridCols()} gap-4`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{emptyMessage}</h3>
          <p className="text-gray-500 mb-6">{emptySubMessage}</p>
        </div>
      ) : (
        <div className={`grid ${getGridCols()} gap-4`}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onWishlistToggle={onWishlistToggle}
              isInWishlist={wishlistIds.has(product.id)}
              layout={viewLayout}
            />
          ))}
        </div>
      )}
    </div>
  );
};