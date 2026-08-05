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
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
  StarIcon,
  HeartIcon,
  ShoppingBagIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useApp } from '../../src/hooks/useApp';
import { useCart } from '../../src/hooks/useCart';
import { useWishlist } from '../../src/hooks/useWishlist';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { SEO } from '../../src/components/SEO';
import toast from 'react-hot-toast';

export default function ProductsClient({ 
  products: initialProducts, 
  categories: initialCategories,
  breadcrumbs,
  error 
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useApp();
  const { addToCart } = useCart();
  const { wishlistIds, toggleWishlist } = useWishlist();
  
  // State
  const [products, setProducts] = useState(initialProducts || []);
  const [categories] = useState(initialCategories || []);
  const [loading, setLoading] = useState(false);
  
  const searchTermParam = searchParams?.get('q') || '';
  const categoryParam = searchParams?.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState(searchTermParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cartLoading, setCartLoading] = useState({});
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter and sort products
  useEffect(() => {
    let result = [...products];

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(p => 
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term) ||
        p.category?.toLowerCase().includes(term)
      );
    }

    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    if (priceRange.min) {
      result = result.filter(p => p.price >= Number(priceRange.min));
    }
    if (priceRange.max) {
      result = result.filter(p => p.price <= Number(priceRange.max));
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name_asc':
        result.sort((a, b) => a.name?.localeCompare(b.name));
        break;
      case 'name_desc':
        result.sort((a, b) => b.name?.localeCompare(a.name));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = async (product) => {
    setCartLoading(prev => ({ ...prev, [product.id]: true }));
    try {
      await addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: 1
      });
      toast.success(t('added_to_cart') || 'Added to cart!');
    } catch (error) {
      toast.error(t('add_to_cart_failed') || 'Failed to add to cart');
    } finally {
      setCartLoading(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleWishlistToggle = async (productId) => {
    try {
      await toggleWishlist(productId);
    } catch (error) {
      toast.error(t('wishlist_error') || 'Failed to update wishlist');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />);
      } else {
        stars.push(<StarIcon key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const sortOptions = [
    { value: 'newest', label: t('newest_first') || 'Newest First' },
    { value: 'price_low', label: t('price_low_to_high') || 'Price: Low to High' },
    { value: 'price_high', label: t('price_high_to_low') || 'Price: High to Low' },
    { value: 'name_asc', label: t('name_a_to_z') || 'Name: A to Z' },
    { value: 'name_desc', label: t('name_z_to_a') || 'Name: Z to A' },
  ];

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
    setShowFilters(false);
  };

  const hasActiveFilters = searchTerm || selectedCategory || priceRange.min || priceRange.max || sortBy !== 'newest';

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">😕</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('products_error') || 'Failed to load products'}
            </h2>
            <p className="text-gray-500">{error}</p>
            <button
              onClick={() => router.refresh()}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
            >
              {t('retry') || 'Retry'}
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <SEO
        title={t('products_page_title') || 'Products - Shop Premium Products'}
        description={t('products_page_description') || 'Browse our premium collection of products.'}
        canonicalUrl="https://www.sombu.in/products"
        breadcrumbs={breadcrumbs}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header - Old UI Style */}
          <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {t('products') || 'Products'}
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                {t('products_count') || `${filteredProducts.length} products`}
              </p>
            </div>
            
            {/* Sort Dropdown - Old UI Style */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="text-sm text-gray-600">
                  {sortOptions.find(s => s.value === sortBy)?.label || t('sort_by') || 'Sort By'}
                </span>
                <ChevronDownIcon className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showSortDropdown && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 z-20 overflow-hidden">
                    {sortOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition ${
                          sortBy === option.value 
                            ? 'bg-purple-50 text-purple-600' 
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Search Bar - Old UI Style */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder={t('search_products') || 'Search for products...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>

          {/* Products Grid - Old UI Style */}
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
                  <div className="aspect-square bg-gray-200"></div>
                  <div className="p-3 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('no_products_found') || 'No products found'}
              </h2>
              <p className="text-gray-500">
                {t('no_products_message') || 'Try adjusting your filters or search terms.'}
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                {t('clear_filters') || 'Clear Filters'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square relative overflow-hidden bg-gray-100">
                      <Image
                        src={product.image_url || '/placeholder.jpg'}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Wishlist Button - Old UI */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleWishlistToggle(product.id);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:shadow-lg transition"
                      >
                        {wishlistIds.has(product.id) ? (
                          <HeartSolidIcon className="w-5 h-5 text-red-500" />
                        ) : (
                          <HeartIcon className="w-5 h-5 text-gray-500 hover:text-red-500 transition" />
                        )}
                      </button>
                      {/* Discount Badge - Old UI */}
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                          {Math.round(((product.compare_price - product.price) / product.compare_price) * 100)}% OFF
                        </span>
                      )}
                    </div>
                  </Link>

                  <div className="p-3">
                    {/* Product Name - Old UI */}
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-medium text-gray-800 hover:text-purple-600 transition text-sm line-clamp-2">
                        {product.name}
                      </h3>
                    </Link>
                    
                    {/* Rating - Old UI */}
                    <div className="flex items-center gap-0.5 mt-1">
                      {renderStars(product.rating)}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.review_count || 0})
                      </span>
                    </div>

                    {/* Price - Old UI */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-purple-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.compare_price && product.compare_price > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          {formatPrice(product.compare_price)}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button - Old UI */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={cartLoading[product.id] || product.stock === 0}
                      className="w-full mt-3 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {cartLoading[product.id] ? (
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      ) : (
                        <>
                          <ShoppingBagIcon className="w-4 h-4" />
                          {product.stock === 0 ? (t('out_of_stock') || 'Out of Stock') : (t('add_to_cart') || 'Add to Cart')}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}