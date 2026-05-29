// // components/ProductCard.jsx (Fixed - Heart icon always visible on mobile)
// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';

// const ProductCard = ({ product, onWishlistToggle, isInWishlist, onAddToCart }) => {
//   const [imageError, setImageError] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [isAdding, setIsAdding] = useState(false);
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
  
//   const discount = product.compare_price && product.compare_price > product.price
//     ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
//     : 0;

//   // Detect mobile device
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Collect all images
//   const productImages = [
//     product.image_url,
//     product.image_url_2,
//     product.image_url_3,
//     product.image_url_4,
//     product.image_url_5,
//   ].filter(img => img && img.trim() !== '');
  
//   const hasMultipleImages = productImages.length > 1;
//   const mainImage = productImages[currentImageIndex] || product.image_url || 'https://via.placeholder.com/500x500?text=No+Image';

//   // Auto-rotate images on hover (only for desktop)
//   useEffect(() => {
//     let interval;
//     if (isHovered && hasMultipleImages && !isDragging && !isMobile) {
//       interval = setInterval(() => {
//         setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//       }, 2000);
//     }
//     return () => clearInterval(interval);
//   }, [isHovered, hasMultipleImages, isDragging, isMobile, productImages.length]);

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

//   const handleDragStart = (e) => {
//     if (!hasMultipleImages) return;
//     setIsDragging(true);
//     setDragStart(e.clientX);
//   };

//   const handleDragMove = (e) => {
//     if (!isDragging || !hasMultipleImages) return;
//     const diff = e.clientX - dragStart;
//     if (Math.abs(diff) > 30) {
//       if (diff > 0) {
//         setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
//       } else {
//         setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
//       }
//       setDragStart(e.clientX);
//     }
//   };

//   const handleDragEnd = () => {
//     setIsDragging(false);
//   };

//   const handleAddToCart = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     if (product.stock <= 0) return;
    
//     setIsAdding(true);
//     await onAddToCart(product);
//     setIsAdding(false);
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
//         setIsDragging(false);
//       }}
//     >
//       <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:border-purple-200 hover:shadow-xl transition-all duration-300">
//         <Link href={`/products/${product.id}`}>
//           <div 
//             className="relative bg-gradient-to-br from-gray-50 to-gray-100 h-48 overflow-hidden cursor-pointer"
//             onMouseDown={handleDragStart}
//             onMouseMove={handleDragMove}
//             onMouseUp={handleDragEnd}
//             onMouseLeave={handleDragEnd}
//           >
//             {/* Stock Badge */}
//             {product.stock === 0 && (
//               <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
//                 <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
//                   Sold Out
//                 </span>
//               </div>
//             )}

//             {/* Discount Badge */}
//             {discount > 0 && product.stock > 0 && (
//               <div className="absolute top-2 left-2 z-10">
//                 <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold shadow-lg">
//                   -{discount}%
//                 </span>
//               </div>
//             )}

//             {/* Low Stock Badge */}
//             {product.stock > 0 && product.stock < 10 && (
//               <div className="absolute top-2 left-2 z-10">
//                 <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
//                   <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
//                   Only {product.stock} left
//                 </span>
//               </div>
//             )}

//             {/* Image Counter Badge */}
//             {hasMultipleImages && (
//               <div className="absolute top-2 right-12 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
//                 {currentImageIndex + 1}/{productImages.length}
//               </div>
//             )}

//             {/* ❤️ HEART BUTTON - FIXED FOR MOBILE ❤️ */}
//             {/* On mobile: ALWAYS VISIBLE. On desktop: Shows on hover */}
//             <button
//               onClick={(e) => {
//                 e.preventDefault();
//                 e.stopPropagation();
//                 onWishlistToggle(product.id, e);
//               }}
//               className={`
//                 absolute top-2 right-2 z-10 
//                 w-9 h-9 rounded-full 
//                 flex items-center justify-center 
//                 transition-all duration-300 
//                 ${isInWishlist
//                   ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 scale-110'
//                   : 'bg-white/90 backdrop-blur-sm text-gray-500 shadow-md hover:shadow-lg'
//                 }
//                 /* 🔥 KEY FIX: Always visible on mobile, show on hover for desktop */
//                 ${isMobile 
//                   ? 'opacity-100 translate-y-0' 
//                   : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
//                 }
//               `}
//             >
//               {isInWishlist ? (
//                 <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//                 </svg>
//               ) : (
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               )}
//             </button>

//             {/* Image Navigation Chevrons */}
//             {hasMultipleImages && (isHovered || isMobile) && (
//               <>
//                 <button
//                   onClick={prevImage}
//                   className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300"
//                   style={{ opacity: isMobile ? 0.7 : 0, ...(isHovered && !isMobile ? { opacity: 1 } : {}) }}
//                 >
//                   <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={nextImage}
//                   className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300"
//                   style={{ opacity: isMobile ? 0.7 : 0, ...(isHovered && !isMobile ? { opacity: 1 } : {}) }}
//                 >
//                   <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                   </svg>
//                 </button>
//               </>
//             )}

//             {/* Product Image */}
//             {!imageError ? (
//               <img
//                 src={mainImage}
//                 alt={product.name}
//                 className="w-full h-full object-contain p-4 transition-transform duration-500"
//                 style={{ transform: isHovered && !isMobile ? 'scale(1.05)' : 'scale(1)' }}
//                 onError={() => setImageError(true)}
//                 draggable={false}
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
//             {hasMultipleImages && (isHovered || isMobile) && (
//               <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
//                 {productImages.map((_, idx) => (
//                   <button
//                     key={idx}
//                     onClick={(e) => {
//                       e.preventDefault();
//                       e.stopPropagation();
//                       setCurrentImageIndex(idx);
//                     }}
//                     className={`h-1 rounded-full transition-all duration-300 ${
//                       currentImageIndex === idx 
//                         ? 'w-4 bg-white' 
//                         : 'w-1.5 bg-white/50'
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
//           <div className="mt-1">
//             <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
//               {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
//             </span>
//           </div>
//         </div>
        
//         <div className="px-3 pb-3">
//           <button
//             onClick={handleAddToCart}
//             disabled={product.stock <= 0 || isAdding}
//             className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
//               product.stock > 0
//                 ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-95'
//                 : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//             }`}
//           >
//             {isAdding ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
//                 </svg>
//                 Adding...
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
//                 </svg>
//                 Add to Cart
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default ProductCard;
// components/ProductCard.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartIcon, ShoppingCartIcon, ChevronLeftIcon, ChevronRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onWishlistToggle, isInWishlist, onAddToCart, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeout = useRef(null);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set default selections when product changes
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]?.value || product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsHovered(false);
      setCurrentImageIndex(0);
    }, 100);
  };

  // Get all product images
  const productImages = [
    product.image_url,
    product.image_url_2,
    product.image_url_3,
    product.image_url_4,
    product.image_url_5,
  ].filter(img => img && img.trim() !== '');

  const images = productImages.length > 0 ? productImages : [product.image_url];
  const hasMultipleImages = images.length > 1;
  const currentImage = images[currentImageIndex] || product.image_url;

  // 🎯 Handle color change - changes product image dynamically
  const handleColorChange = (color, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedColor(color.value || color);
    
    // If color has associated image, change to that image
    if (color.image) {
      const colorImageIndex = images.findIndex(img => img === color.image);
      if (colorImageIndex !== -1) {
        setCurrentImageIndex(colorImageIndex);
      }
    }
  };

  // 🎯 Handle size change
  const handleSizeChange = (size, e) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) {
      toast.error('Out of stock');
      return;
    }

    // Check if color is required and selected
    if (product.hasColors && product.colors?.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    // Check if size is required and selected
    if (product.hasSizes && product.sizes?.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setIsAdding(true);
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.compare_price,
      image: currentImage,
      quantity: 1,
      color: selectedColor,
      size: selectedSize,
      maxStock: product.stock
    };

    await onAddToCart(cartItem);
    setIsAdding(false);
  };

  const handleWishlistClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await onWishlistToggle(product.id, e);
  };

  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  // Check if product has variants
  const hasVariants = (product.hasColors || product.hasSizes) || 
                      (product.colors?.length > 0) || 
                      (product.sizes?.length > 0);

  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const isWishlisted = isInWishlist?.(product.id) || false;
  
  // Show hover options only on desktop
  const showHoverOptions = isHovered && !isMobile;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Image Container */}
      <div className="relative bg-gray-100 overflow-hidden">
        <Link href={`/products/${product.id}`} className="block">
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
                -{discount}%
              </span>
            </div>
          )}

          {/* Stock Badge */}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                Out of Stock
              </span>
            </div>
          )}

          {/* Low Stock Badge */}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="absolute top-2 left-2 z-10">
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                Only {product.stock} left
              </span>
            </div>
          )}

          {/* Image Counter */}
          {hasMultipleImages && showHoverOptions && (
            <div className="absolute top-2 right-2 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}

          {/* Main Image */}
          <div className="aspect-square overflow-hidden bg-gray-100">
            {!imageError ? (
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-contain p-4 transition-transform duration-500"
                style={{ transform: showHoverOptions ? 'scale(1.05)' : 'scale(1)' }}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Image Navigation Arrows */}
          {hasMultipleImages && showHoverOptions && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeftIcon className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRightIcon className="w-4 h-4 text-gray-700" />
              </button>
            </>
          )}

          {/* Quick View Overlay */}
          {showHoverOptions && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="w-full bg-white text-gray-800 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition">
                <EyeIcon className="w-4 h-4" />
                Quick View
              </button>
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all z-20"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-4 h-4 text-red-500" />
            ) : (
              <HeartIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </Link>

        {/* 🎯 COLOR OPTIONS - Shows on Hover (Like Amazon) */}
        {colors.length > 0 && showHoverOptions && (
          <div className="absolute bottom-16 left-0 right-0 px-3 py-2 bg-white/95 backdrop-blur-sm border-t border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-gray-500">COLORS</span>
              <span className="text-[9px] text-gray-400">{colors.length} options</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {colors.map((color, idx) => {
                const colorValue = typeof color === 'string' ? color : color.value;
                const colorName = typeof color === 'string' ? color : color.name;
                const colorCode = typeof color === 'string' ? color : color.code;
                
                return (
                  <button
                    key={idx}
                    onClick={(e) => handleColorChange(color, e)}
                    className={`w-6 h-6 rounded-full border-2 transition-all ${
                      selectedColor === colorValue || selectedColor === colorName
                        ? 'border-purple-500 shadow-md scale-110'
                        : 'border-gray-300 hover:scale-110'
                    }`}
                    style={{ 
                      backgroundColor: colorCode || colorValue,
                      background: colorCode || colorValue
                    }}
                    title={colorName || colorValue}
                  />
                );
              })}
            </div>
          </div>
        )}

        {/* 🎯 SIZE OPTIONS - Shows on Hover (Like Amazon) */}
        {sizes.length > 0 && showHoverOptions && (
          <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-white/95 backdrop-blur-sm border-t border-gray-100">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-medium text-gray-500">SIZE</span>
              <span className="text-[9px] text-gray-400">{sizes.length} options</span>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={(e) => handleSizeChange(size, e)}
                  className={`px-2 py-0.5 rounded text-xs font-medium transition-all ${
                    selectedSize === size
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3">
        {/* Category */}
        {product.category && (
          <p className="text-xs text-purple-600 mb-1">{product.category}</p>
        )}

        {/* Product Name */}
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 min-h-[40px] hover:text-purple-600 transition">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <div className="flex text-yellow-400 text-xs">
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </div>
            <span className="text-xs text-gray-400">({product.reviews || 0})</span>
          </div>
        )}

        {/* Price */}
        <div className="mt-2 flex items-center gap-2 flex-wrap">
          <span className="text-lg font-bold text-purple-600">
            ₹{product.price?.toLocaleString()}
          </span>
          {product.compare_price && (
            <span className="text-xs text-gray-400 line-through">
              ₹{product.compare_price?.toLocaleString()}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isAdding}
          className={`w-full mt-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
            product.stock > 0
              ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isAdding ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCartIcon className="w-4 h-4" />
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;