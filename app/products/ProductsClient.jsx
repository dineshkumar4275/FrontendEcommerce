// 'use client';

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
// import { Header } from '../../src/components/layout/Header';
// import { Footer } from '../../src/components/layout/Footer';
// import { SEO } from '../../src/components/SEO';
// import { getProducts, searchProducts, getCategories } from '../../src/services/productService';
// import { fetchWishlist } from '../../src/store/slices/wishlistSlice';
// import { useCart } from '../../src/hooks/useCart';

// // Product Skeleton Component
// const ProductSkeleton = () => (
//   <div className="animate-pulse">
//     <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
//       <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48" />
//       <div className="p-3 space-y-2">
//         <div className="h-3 w-16 bg-gray-200 rounded-full" />
//         <div className="h-4 w-full bg-gray-200 rounded-lg" />
//         <div className="h-4 w-3/4 bg-gray-200 rounded-lg" />
//         <div className="h-5 w-20 bg-gray-200 rounded-full mt-2" />
//       </div>
//     </div>
//   </div>
// );

// // Product Card Component
// const ProductCard = ({ product, isInWishlist }) => {
//   const [imageError, setImageError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
//   const productImages = [
//     product.image_url,
//     product.image_url_2,
//     product.image_url_3,
//     product.image_url_4,
//     product.image_url_5,
//   ].filter(img => img && img.trim() !== '');
  
//   const hasMultipleImages = productImages.length > 1;
//   const mainImage = productImages[currentImageIndex] || product.image_url || 'https://via.placeholder.com/500x500?text=No+Image';

//   useEffect(() => {
//     let interval;
//     if (isHovered && hasMultipleImages) {
//       interval = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//       }, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isHovered, hasMultipleImages, productImages.length]);

//   const nextImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//   };

//   const prevImage = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.3 }}
//       className="group"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => {
//         setIsHovered(false);
//         setCurrentImageIndex(0);
//       }}
//     >
//       <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
//         <Link href={`/products/${product.id}`}>
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 overflow-hidden cursor-pointer">
//             {/* Coming Soon Overlay */}
//             <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
//               <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full text-black font-bold text-sm shadow-lg animate-pulse">
//                 🚀 Coming Soon
//               </div>
//               <span className="text-white/60 text-xs mt-2">Not available for purchase</span>
//             </div>

//             {/* Image Counter Badge */}
//             {hasMultipleImages && (
//               <div className="absolute top-2 right-12 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
//                 {currentImageIndex + 1}/{productImages.length}
//               </div>
//             )}

//             {/* Navigation Arrows */}
//             {hasMultipleImages && isHovered && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
//                 >
//                   <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
//                 >
//                   <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </>
//             )}

//             {/* Quick View Overlay */}
//             <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
//               <span className="bg-yellow-400/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2">
//                 🚀 Coming Soon
//               </span>
//             </div>

//             {/* Product Image */}
//             {!imageError ? (
//               <img
//                 src={mainImage}
//                 alt={product.name}
//                 className="w-full h-full object-contain p-4 transition-transform duration-500"
//                 style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
//                 onError={() => setImageError(true)}
//               />
//             ) : (
//               <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
//                 <svg className="w-12 h-12 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//                 <span className="text-xs">No Image</span>
//               </div>
//             )}

//             {/* Thumbnail Indicators */}
//             {hasMultipleImages && (
//               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
//                 {productImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       setCurrentImageIndex(idx);
//                     }}
//                     className={`h-1.5 rounded-full transition-all duration-300 ${
//                       currentImageIndex === idx 
//                         ? 'w-5 bg-white' 
//                         : 'w-1.5 bg-white/50 hover:bg-white/70'
//                     }`}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         </Link>

//         <div className="p-3">
//           {product.category && (
//             <span className="inline-block px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-medium mb-2">
//               {product.category}
//             </span>
//           )}
//           <Link href={`/products/${product.id}`}>
//             <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[40px] hover:text-purple-600 transition">
//               {product.name}
//             </h3>
//           </Link>
          
//           {product.rating && (
//             <div className="flex items-center gap-1 mt-1">
//               <div className="flex text-yellow-400 text-xs">
//                 {'★'.repeat(Math.floor(product.rating))}
//                 {'☆'.repeat(5 - Math.floor(product.rating))}
//               </div>
//               <span className="text-xs text-gray-400">({product.reviews || 0})</span>
//             </div>
//           )}

//           <div className="mt-2">
//             <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               ₹{product.price?.toLocaleString()}
//             </span>
//             {product.compare_price && (
//               <span className="text-xs text-gray-400 line-through ml-2">
//                 ₹{product.compare_price?.toLocaleString()}
//               </span>
//             )}
//           </div>
//         </div>
        
//         <div className="px-3 pb-3">
//           <button
//             disabled={true}
//             className="w-full py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed bg-gray-200 text-gray-400"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//             </svg>
//             🚀 Coming Soon
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default function ProductsClient({ products: initialProducts, categories: initialCategories, breadcrumbs, error }) {
//   const [products, setProducts] = useState(initialProducts || []);
//   const [loading, setLoading] = useState(!initialProducts || initialProducts.length === 0);
//   const [searching, setSearching] = useState(false);
//   const [categories] = useState(initialCategories || []);
  
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [minPrice, setMinPrice] = useState('');
//   const [maxPrice, setMaxPrice] = useState('');
//   const [sortBy, setSortBy] = useState('newest');
//   const [searchQuery, setSearchQuery] = useState('');

//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { isAuthenticated, token } = useSelector((state) => state.auth || {});
//   const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
//   const wishlistItems = wishlistState.items || [];
//   const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));
//   const { addToCart } = useCart();

//   useEffect(() => {
//     if (token || isAuthenticated) {
//       dispatch(fetchWishlist());
//     }
//   }, [dispatch, token, isAuthenticated]);

//   // If there's an error or no products, try fetching again on client side
//   useEffect(() => {
//     if (error || (initialProducts && initialProducts.length === 0)) {
//       const fetchProducts = async () => {
//         try {
//           setLoading(true);
//           const data = await getProducts();
//           setProducts(data || []);
//         } catch (err) {
//           console.error('Client-side fetch failed:', err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProducts();
//     }
//   }, [error, initialProducts]);

//   const hasActiveFilters = searchQuery || selectedCategory || minPrice || maxPrice;

//   return (
//     <>
//       <SEO
//         title="Premium Products Collection"
//         description="Shop our premium collection of products at the best prices. Free shipping on all orders."
//         canonicalUrl="https://www.sombustore.in/products"
//         breadcrumbs={breadcrumbs}
//         image="/images/og-products.jpg"
//       />

//       <Header 
//         categories={categories.map(c => typeof c === 'string' ? c : c.name)}
//         selectedCategory={selectedCategory}
//         setSelectedCategory={setSelectedCategory}
//         minPrice={minPrice}
//         setMinPrice={setMinPrice}
//         maxPrice={maxPrice}
//         setMaxPrice={setMaxPrice}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//         onSearch={setSearchQuery}
//       />
      
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
//         <div className="container mx-auto px-4 py-8">
//           {/* Coming Soon Banner */}
//           <div className="mb-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-2xl p-6 text-center shadow-lg">
//             <div className="flex items-center justify-center gap-3">
//               <span className="text-3xl">🚀</span>
//               <div>
//                 <h2 className="text-2xl font-bold text-white">Coming Soon!</h2>
//                 <p className="text-white/80 text-sm">Our store is launching with exclusive products. Stay tuned!</p>
//               </div>
//               <span className="text-3xl">✨</span>
//             </div>
//           </div>

//           <div className="mb-8">
//             <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
//               Our Products
//             </h1>
//             <p className="text-gray-500 mt-1">🚀 Discover amazing products coming soon</p>
//           </div>

//           {hasActiveFilters && (
//             <div className="flex flex-wrap gap-2 mb-4">
//               {searchQuery && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
//                   🔍 "{searchQuery}"
//                   <button onClick={() => setSearchQuery('')} className="hover:text-purple-900 ml-1">×</button>
//                 </span>
//               )}
//               {selectedCategory && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
//                   📁 {selectedCategory}
//                   <button onClick={() => setSelectedCategory('')} className="hover:text-purple-900 ml-1">×</button>
//                 </span>
//               )}
//               {(minPrice || maxPrice) && (
//                 <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
//                   💰 ₹{minPrice || 0} - ₹{maxPrice || '∞'}
//                   <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="hover:text-purple-900 ml-1">×</button>
//                 </span>
//               )}
//               <button 
//                 onClick={() => {
//                   setSearchQuery('');
//                   setSelectedCategory('');
//                   setMinPrice('');
//                   setMaxPrice('');
//                   setSortBy('newest');
//                 }} 
//                 className="text-sm text-red-500 hover:text-red-600 font-medium"
//               >
//                 Clear all
//               </button>
//             </div>
//           )}

//           <div className="flex justify-between items-center mb-4">
//             <div className="text-gray-500 text-sm">
//               Showing <span className="font-semibold text-purple-600">{products.length}</span> products
//               {searchQuery && <span className="ml-2">for "{searchQuery}"</span>}
//             </div>
//           </div>

//           {loading ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {Array.from({ length: 12 }).map((_, i) => (
//                 <ProductSkeleton key={i} />
//               ))}
//             </div>
//           ) : products.length === 0 ? (
//             <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
//               <div className="text-6xl mb-4">🚀</div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h3>
//               <p className="text-gray-500">
//                 {hasActiveFilters 
//                   ? "No products match your filters, but exciting items are on the way!"
//                   : "We're preparing amazing products for you. Check back soon!"}
//               </p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {products.map((product) => (
//                 <ProductCard
//                   key={product.id}
//                   product={product}
//                   isInWishlist={wishlistIds.has(product.id)}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }
// app/products/ProductsClient.jsx
'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { SEO } from '../../src/components/SEO';
import { getProducts, searchProducts, getCategories } from '../../src/services/productService';
import { fetchWishlist } from '../../src/store/slices/wishlistSlice';
import { useCart } from '../../src/hooks/useCart';
import { useApp } from '../../src/hooks/useApp';

// Product Skeleton Component
const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-full bg-gray-200 rounded-lg" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-5 w-20 bg-gray-200 rounded-full mt-2" />
      </div>
    </div>
  </div>
);

// Product Card Component
const ProductCard = ({ product, isInWishlist }) => {
  const { t } = useApp();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const productImages = [
    product.image_url,
    product.image_url_2,
    product.image_url_3,
    product.image_url_4,
    product.image_url_5,
  ].filter(img => img && img.trim() !== '');
  
  const hasMultipleImages = productImages.length > 1;
  const mainImage = productImages[currentImageIndex] || product.image_url || 'https://via.placeholder.com/500x500?text=No+Image';

  useEffect(() => {
    let interval;
    if (isHovered && hasMultipleImages) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isHovered, hasMultipleImages, productImages.length]);

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImageIndex(0);
      }}
    >
      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
        <Link href={`/products/${product.id}`}>
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 overflow-hidden cursor-pointer">
            {/* Coming Soon Overlay */}
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-full text-black font-bold text-sm shadow-lg animate-pulse">
                🚀 {t('coming_soon')}
              </div>
              <span className="text-white/60 text-xs mt-2">{t('not_available')}</span>
            </div>

            {/* Image Counter Badge */}
            {hasMultipleImages && (
              <div className="absolute top-2 right-12 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
                {currentImageIndex + 1}/{productImages.length}
              </div>
            )}

            {/* Navigation Arrows */}
            {hasMultipleImages && isHovered && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                >
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Quick View Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="bg-yellow-400/95 backdrop-blur-sm text-black px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2">
                🚀 {t('coming_soon')}
              </span>
            </div>

            {/* Product Image */}
            {!imageError ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-500"
                style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
                <svg className="w-12 h-12 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs">{t('no_image')}</span>
              </div>
            )}

            {/* Thumbnail Indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {productImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setCurrentImageIndex(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentImageIndex === idx 
                        ? 'w-5 bg-white' 
                        : 'w-1.5 bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </Link>

        <div className="p-3">
          {product.category && (
            <span className="inline-block px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-xs font-medium mb-2">
              {product.category}
            </span>
          )}
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 min-h-[40px] hover:text-purple-600 transition">
              {product.name}
            </h3>
          </Link>
          
          {product.rating && (
            <div className="flex items-center gap-1 mt-1">
              <div className="flex text-yellow-400 text-xs">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </div>
              <span className="text-xs text-gray-400">({product.reviews || 0})</span>
            </div>
          )}

          <div className="mt-2">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{product.price?.toLocaleString()}
            </span>
            {product.compare_price && (
              <span className="text-xs text-gray-400 line-through ml-2">
                ₹{product.compare_price?.toLocaleString()}
              </span>
            )}
          </div>
        </div>
        
        <div className="px-3 pb-3">
          <button
            disabled={true}
            className="w-full py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-not-allowed bg-gray-200 text-gray-400"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            🚀 {t('coming_soon')}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default function ProductsClient({ products: initialProducts, categories: initialCategories, breadcrumbs, error }) {
  const { t } = useApp();
  const [products, setProducts] = useState(initialProducts || []);
  const [loading, setLoading] = useState(!initialProducts || initialProducts.length === 0);
  const [searching, setSearching] = useState(false);
  const [categories] = useState(initialCategories || []);
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, token } = useSelector((state) => state.auth || {});
  const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
  const wishlistItems = wishlistState.items || [];
  const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));
  const { addToCart } = useCart();

  useEffect(() => {
    if (token || isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, isAuthenticated]);

  // If there's an error or no products, try fetching again on client side
  useEffect(() => {
    if (error || (initialProducts && initialProducts.length === 0)) {
      const fetchProducts = async () => {
        try {
          setLoading(true);
          const data = await getProducts();
          setProducts(data || []);
        } catch (err) {
          console.error('Client-side fetch failed:', err);
        } finally {
          setLoading(false);
        }
      };
      fetchProducts();
    }
  }, [error, initialProducts]);

  const hasActiveFilters = searchQuery || selectedCategory || minPrice || maxPrice;

  return (
    <>
      <SEO
        title={t('products_page_title')}
        description={t('products_page_description')}
        canonicalUrl="https://www.sombustore.in/products"
        breadcrumbs={breadcrumbs}
        image="/images/og-products.jpg"
      />

      <Header 
        categories={categories.map(c => typeof c === 'string' ? c : c.name)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onSearch={setSearchQuery}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* 🚀 Coming Soon Banner */}
          <div className="mb-8 bg-gradient-to-r from-yellow-500 via-orange-500 to-pink-500 rounded-2xl p-6 text-center shadow-lg">
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl">🚀</span>
              <div>
                <h2 className="text-2xl font-bold text-white">{t('coming_soon')}</h2>
                <p className="text-white/80 text-sm">{t('store_launching_soon')}</p>
              </div>
              <span className="text-3xl">✨</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {t('our_products')}
            </h1>
            <p className="text-gray-500 mt-1">🚀 {t('discover_amazing_products')}</p>
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mb-4">
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
                  🔍 "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-purple-900 ml-1">×</button>
                </span>
              )}
              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
                  📁 {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="hover:text-purple-900 ml-1">×</button>
                </span>
              )}
              {(minPrice || maxPrice) && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm">
                  💰 ₹{minPrice || 0} - ₹{maxPrice || '∞'}
                  <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="hover:text-purple-900 ml-1">×</button>
                </span>
              )}
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                  setMinPrice('');
                  setMaxPrice('');
                  setSortBy('newest');
                }} 
                className="text-sm text-red-500 hover:text-red-600 font-medium"
              >
                {t('clear_all')}
              </button>
            </div>
          )}

          <div className="flex justify-between items-center mb-4">
            <div className="text-gray-500 text-sm">
              {t('showing')} <span className="font-semibold text-purple-600">{products.length}</span> {t('products')}
              {searchQuery && <span className="ml-2">{t('for')} "{searchQuery}"</span>}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('coming_soon')}</h3>
              <p className="text-gray-500">
                {hasActiveFilters 
                  ? t('no_products_match_filters')
                  : t('preparing_amazing_products')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isInWishlist={wishlistIds.has(product.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}