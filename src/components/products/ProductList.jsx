// // 'use client'

// // import { useState, useEffect } from 'react'
// // import { motion, AnimatePresence } from 'framer-motion'
// // import ProductCard from './ProductCard'
// // import ProductFilters from './ProductFilters'
// // import ProductSearch from './ProductSearch'

// // export default function ProductList({ products, loading }) {
// //     const [filteredProducts, setFilteredProducts] = useState(products)
// //     const [filters, setFilters] = useState({
// //         category: '',
// //         minPrice: '',
// //         maxPrice: '',
// //         sortBy: 'newest',
// //     })
// //     const [searchTerm, setSearchTerm] = useState('')

// //     useEffect(() => {
// //         let result = [...products]

// //         // Apply search
// //         if (searchTerm) {
// //             result = result.filter(product =>
// //                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //                 product.description.toLowerCase().includes(searchTerm.toLowerCase())
// //             )
// //         }

// //         // Apply category filter
// //         if (filters.category) {
// //             result = result.filter(product => product.category === filters.category)
// //         }

// //         // Apply price filter
// //         if (filters.minPrice) {
// //             result = result.filter(product => product.price >= parseFloat(filters.minPrice))
// //         }
// //         if (filters.maxPrice) {
// //             result = result.filter(product => product.price <= parseFloat(filters.maxPrice))
// //         }

// //         // Apply sorting
// //         switch (filters.sortBy) {
// //             case 'priceLow':
// //                 result.sort((a, b) => a.price - b.price)
// //                 break
// //             case 'priceHigh':
// //                 result.sort((a, b) => b.price - a.price)
// //                 break
// //             case 'rating':
// //                 result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
// //                 break
// //             case 'newest':
// //             default:
// //                 result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
// //                 break
// //         }

// //         setFilteredProducts(result)
// //     }, [products, filters, searchTerm])

// //     if (loading) {
// //         return (
// //             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// //                 {[...Array(8)].map((_, i) => (
// //                     <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
// //                         <div className="h-64 bg-gray-200"></div>
// //                         <div className="p-4">
// //                             <div className="h-4 bg-gray-200 rounded mb-2"></div>
// //                             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
// //                             <div className="h-8 bg-gray-200 rounded mt-4"></div>
// //                         </div>
// //                     </div>
// //                 ))}
// //             </div>
// //         )
// //     }

// //     return (
// //         <div className="flex flex-col lg:flex-row gap-8">
// //             {/* Filters Sidebar */}
// //             <div className="lg:w-1/4">
// //                 <ProductFilters filters={filters} setFilters={setFilters} />
// //             </div>

// //             {/* Products Grid */}
// //             <div className="lg:w-3/4">
// //                 <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                
// //                 <AnimatePresence>
// //                     {filteredProducts.length === 0 ? (
// //                         <motion.div
// //                             initial={{ opacity: 0 }}
// //                             animate={{ opacity: 1 }}
// //                             className="text-center py-12"
// //                         >
// //                             <p className="text-gray-500 text-lg">No products found</p>
// //                             <p className="text-gray-400">Try adjusting your filters</p>
// //                         </motion.div>
// //                     ) : (
// //                         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// //                             {filteredProducts.map((product, index) => (
// //                                 <ProductCard key={product.id} product={product} index={index} />
// //                             ))}
// //                         </div>
// //                     )}
// //                 </AnimatePresence>
// //             </div>
// //         </div>
// //     )
// // }

// 'use client';

// import React, { useState, useEffect } from 'react';
// import { ProductCard } from './ProductCard';
// import { ProductFilters } from './ProductFilters';
// import { ProductSearch } from './ProductSearch';
// import { Loader, Skeleton } from '@/components/ui/Loader';
// import { useProducts } from '@/hooks/useProducts';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// export const ProductList = () => {
//   const [view, setView] = useState('grid'); // grid or list
//   const [currentPage, setCurrentPage] = useState(1);
//   const [filters, setFilters] = useState({
//     category: '',
//     priceRange: [0, 10000],
//     rating: 0,
//     sortBy: 'newest',
//     inStock: false,
//   });
//   const [searchQuery, setSearchQuery] = useState('');

//   const { products, loading, totalPages, totalProducts, fetchProducts } = useProducts();

//   useEffect(() => {
//     fetchProducts({
//       page: currentPage,
//       limit: 12,
//       ...filters,
//       search: searchQuery,
//     });
//   }, [currentPage, filters, searchQuery]);

//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     setCurrentPage(1);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     setCurrentPage(1);
//   };

//   const SkeletonLoader = () => (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//       {[...Array(8)].map((_, i) => (
//         <div key={i} className="bg-white rounded-lg shadow-md p-4">
//           <Skeleton className="h-64 w-full rounded-lg" />
//           <Skeleton className="h-6 w-3/4 mt-4" />
//           <Skeleton className="h-4 w-1/2 mt-2" />
//           <Skeleton className="h-8 w-full mt-4" />
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-4">Our Products</h1>
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//           <ProductSearch onSearch={handleSearch} />
//           <div className="flex items-center gap-4">
//             {/* View Toggle */}
//             <div className="flex gap-2 border rounded-lg p-1">
//               <button
//                 onClick={() => setView('grid')}
//                 className={`p-2 rounded ${view === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
//                 </svg>
//               </button>
//               <button
//                 onClick={() => setView('list')}
//                 className={`p-2 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//             </div>
            
//             {/* Sort By */}
//             <select
//               value={filters.sortBy}
//               onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
//               className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="newest">Newest First</option>
//               <option value="price_low">Price: Low to High</option>
//               <option value="price_high">Price: High to Low</option>
//               <option value="popular">Most Popular</option>
//               <option value="rating">Top Rated</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Filters Sidebar */}
//         <aside className="lg:w-80">
//           <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
//         </aside>

//         {/* Products Grid */}
//         <main className="flex-1">
//           {/* Results Count */}
//           <div className="mb-4 text-gray-600">
//             Showing {products.length} of {totalProducts} products
//           </div>

//           {loading ? (
//             <SkeletonLoader />
//           ) : products.length === 0 ? (
//             <div className="text-center py-12">
//               <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
//               </svg>
//               <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
//               <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
//               <button
//                 onClick={() => {
//                   setFilters({
//                     category: '',
//                     priceRange: [0, 10000],
//                     rating: 0,
//                     sortBy: 'newest',
//                     inStock: false,
//                   });
//                   setSearchQuery('');
//                 }}
//                 className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Clear all filters
//               </button>
//             </div>
//           ) : view === 'grid' ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {products.map((product) => (
//                 <ProductCard key={product.id} product={product} variant="list" />
//               ))}
//             </div>
//           )}

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="flex justify-center gap-2 mt-8">
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronLeftIcon className="h-5 w-5" />
//               </button>
              
//               {[...Array(totalPages)].map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setCurrentPage(i + 1)}
//                   className={`px-4 py-2 border rounded-lg transition-colors ${
//                     currentPage === i + 1
//                       ? 'bg-blue-600 text-white border-blue-600'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   {i + 1}
//                 </button>
//               ))}
              
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="p-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//               >
//                 <ChevronRightIcon className="h-5 w-5" />
//               </button>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

'use client';

import React, { useState, useEffect } from 'react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { ProductSearch } from './ProductSearch';
import { Loader, Skeleton } from '@/components/ui/Loader';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const ProductList = ({ products: initialProducts = [], loading: initialLoading = false }) => {
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(initialLoading);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 10000],
    rating: 0,
    sortBy: 'newest',
    inStock: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [totalProducts, setTotalProducts] = useState((initialProducts || []).length);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setProducts(initialProducts || []);
    setTotalProducts((initialProducts || []).length);
    setLoading(initialLoading);
  }, [initialProducts, initialLoading]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md p-4">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4 mt-4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
          <Skeleton className="h-8 w-full mt-4" />
        </div>
      ))}
    </div>
  );

  // Safely check if products array exists
  const hasProducts = products && products.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <ProductSearch onSearch={handleSearch} />
          <div className="flex items-center gap-4">
            {/* View Toggle */}
            <div className="flex gap-2 border rounded-lg p-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100'}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            {/* Sort By */}
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-80">
          <ProductFilters filters={filters} onFilterChange={handleFilterChange} />
        </aside>

        {/* Products Grid */}
        <main className="flex-1">
          {/* Results Count - Fixed undefined error */}
          <div className="mb-4 text-gray-600">
            Showing {hasProducts ? products.length : 0} of {totalProducts || 0} products
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : !hasProducts ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
              <p className="mt-2 text-gray-500">Try adjusting your filters or search criteria.</p>
              <button
                onClick={() => {
                  setFilters({
                    category: '',
                    priceRange: [0, 10000],
                    rating: 0,
                    sortBy: 'newest',
                    inStock: false,
                  });
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};