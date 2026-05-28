// src/components/products/FeaturedProducts.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getProducts } from '../../services/productService';
import { useCart } from '../../hooks/useCart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlist, addToWishlistAsync, removeFromWishlistAsync } from '../../store/slices/wishlistSlice';

// Featured Product Card Component
const FeaturedProductCard = ({ product, onWishlistToggle, isInWishlist, onAddToCart }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const discount = product.compare_price && product.compare_price > product.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  // Collect all images (up to 5)
  const productImages = [
    product.image_url,
    product.image_url_2,
    product.image_url_3,
    product.image_url_4,
    product.image_url_5,
  ].filter(img => img && img.trim() !== '');
  
  const hasMultipleImages = productImages.length > 1;
  const mainImage = productImages[currentImageIndex] || product.image_url || 'https://via.placeholder.com/500x500?text=No+Image';

  // Auto-rotate images on hover
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

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.stock <= 0) return;
    
    setIsAdding(true);
    await onAddToCart(product);
    setIsAdding(false);
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
            {/* Stock Badge */}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                <span className="bg-gradient-to-r from-red-500 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  Sold Out
                </span>
              </div>
            )}

            {/* Discount Badge */}
            {discount > 0 && product.stock > 0 && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-xs font-bold shadow-lg">
                  -{discount}%
                </span>
              </div>
            )}

            {/* Low Stock Badge */}
            {product.stock > 0 && product.stock < 10 && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  Only {product.stock} left
                </span>
              </div>
            )}

            {/* Featured Badge */}
            {product.is_featured && (
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                  ⭐ Featured
                </span>
              </div>
            )}

            {/* Image Counter Badge */}
            {hasMultipleImages && (
              <div className="absolute top-2 right-12 z-10 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-[10px] font-medium">
                {currentImageIndex + 1}/{productImages.length}
              </div>
            )}

            {/* Wishlist Button */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onWishlistToggle(product.id, e);
              }}
              className={`absolute top-2 right-2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                isInWishlist
                  ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30 scale-110'
                  : 'bg-white/90 backdrop-blur-sm text-gray-500 shadow-md hover:shadow-lg'
              } ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}
            >
              {isInWishlist ? (
                <svg className="w-4 h-4 fill-current" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )}
            </button>

            {/* LEFT CHEVRON BUTTON */}
            {hasMultipleImages && isHovered && (
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* RIGHT CHEVRON BUTTON */}
            {hasMultipleImages && isHovered && (
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Quick View Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-4 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2">
                👁️ Quick View
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
                <span className="text-xs">No Image</span>
              </div>
            )}

            {/* Thumbnail Indicators */}
            {hasMultipleImages && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
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
          <div className="mt-1">
            <span className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
            </span>
          </div>
        </div>
        
        <div className="px-3 pb-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isAdding}
            className={`w-full py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
              product.stock > 0
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 active:scale-95'
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
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// Featured Products Skeleton
const FeaturedSkeleton = () => (
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

// Main Featured Products Component - WITH PROPER GRID
export const FeaturedProducts = ({ 
  title = "✨ Featured Products", 
  limit = 10,
  showViewAll = true,
  className = ""
}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const dispatch = useDispatch();
  const { addToCart } = useCart();
  const { isAuthenticated, token } = useSelector((state) => state.auth || {});
  const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
  const wishlistItems = wishlistState.items || [];
  const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));

  useEffect(() => {
    loadFeaturedProducts();
    if (token || isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, isAuthenticated]);

  const loadFeaturedProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getProducts();
      // Get featured products or first N products
      const featured = allProducts.filter(p => p.is_featured).slice(0, limit);
      const productsToShow = featured.length > 0 ? featured : allProducts.slice(0, limit);
      setProducts(productsToShow);
    } catch (error) {
      console.error('Error loading featured products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleWishlistToggle = async (productId, e) => {
    e?.preventDefault();
    e?.stopPropagation();
    
    if (!token && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', '/');
      return;
    }
    
    try {
      if (wishlistIds.has(productId)) {
        await dispatch(removeFromWishlistAsync(productId)).unwrap();
      } else {
        await dispatch(addToWishlistAsync(productId)).unwrap();
      }
    } catch (error) {
      console.error('Wishlist error:', error);
    }
  };

  const handleAddToCart = async (product) => {
    if (product.stock <= 0) return;
    addToCart(product);
  };

  const isInWishlist = (productId) => wishlistIds.has(productId);

  if (loading) {
    return (
      <div className={className}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {title}
          </h2>
          {showViewAll && <div className="w-20 h-5 bg-gray-200 rounded animate-pulse" />}
        </div>
        {/* GRID LAYOUT - 5 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: limit }).map((_, i) => (
            <FeaturedSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {title}
        </h2>
        {showViewAll && (
          <Link href="/products" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
            View All →
          </Link>
        )}
      </div>
      
      {/* ✅ GRID LAYOUT - Responsive 5 columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <FeaturedProductCard
            key={product.id}
            product={product}
            onWishlistToggle={handleWishlistToggle}
            isInWishlist={isInWishlist(product.id)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};