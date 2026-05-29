// app/products/[id]/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '../../../src/components/layout/Header';
import { Footer } from '../../../src/components/layout/Footer';
import { getProductById } from '../../../src/services/productService';
import { useCart } from '../../../src/hooks/useCart';
import { addToWishlistAsync, removeFromWishlistAsync, toggleWishlistLocal, fetchWishlist } from '../../../src/store/slices/wishlistSlice';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  ArrowPathIcon,
  StarIcon,
  CheckIcon,
  PlusIcon,
  MinusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  PlayIcon,
  ShareIcon,
  ScaleIcon,
  ClockIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const imageContainerRef = useRef(null);
  const rotationInterval = useRef(null);
  
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const productId = params.id;
  
  const { addToCart } = useCart();
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
  const wishlistItems = wishlistState.items || [];
  const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));
  const isInWishlist = wishlistIds.has(parseInt(productId));

  // Create image array with all available images
  const productImages = [
    product?.image_url,
    product?.image_url_2,
    product?.image_url_3,
    product?.image_url_4,
    product?.image_url_5,
  ].filter(img => img && img.trim() !== '');
  
  const hasMultipleImages = productImages.length > 1;
  const hasVideo = product?.video_url;
  const mainImage = productImages[selectedImage] || product?.image_url;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'shipping', label: 'Shipping' },
  ];

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    if (token || isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [productId, dispatch, token, isAuthenticated]);

  // Set default selections when product loads
  useEffect(() => {
    if (product) {
      // Set default size if sizes exist and hasSizes is true
      if (product.hasSizes && product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      // Set default color if colors exist and hasColors is true
      if (product.hasColors && product.colors && product.colors.length > 0) {
        const firstColor = typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0];
        setSelectedColor(firstColor);
      }
    }
  }, [product]);

  // Auto-rotate images when not dragging
  useEffect(() => {
    if (hasMultipleImages && !isDragging && !isRotating && !showZoom) {
      setIsRotating(true);
      rotationInterval.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % productImages.length);
      }, 2500);
    } else if (!isDragging && rotationInterval.current) {
      clearInterval(rotationInterval.current);
      setIsRotating(false);
    }
    
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, [isDragging, hasMultipleImages, productImages.length, showZoom]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      
      if (data) {
        setProduct(data);
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error:', error);
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Handle color change - changes product image
  const handleColorChange = (color) => {
    const colorName = typeof color === 'object' ? color.name : color;
    setSelectedColor(colorName);
    
    // Try to find image for this color
    const colorLower = colorName.toLowerCase();
    const matchingIndex = productImages.findIndex((img, idx) => {
      if (idx === 0) return false;
      return img?.toLowerCase().includes(colorLower);
    });
    
    if (matchingIndex !== -1) {
      setSelectedImage(matchingIndex);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Amazon-style zoom handlers
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !showZoom) return;
    
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    let x = ((e.clientX - left) / width) * 100;
    let y = ((e.clientY - top) / height) * 100;
    
    x = Math.min(Math.max(x, 0), 100);
    y = Math.min(Math.max(y, 0), 100);
    
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => {
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleAddToCart = async () => {
    if (!token && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
      router.push('/login');
      return;
    }
    
    if (product.stock <= 0) return;
    
    setAdding(true);
    
    try {
      const productWithOptions = {
        ...product,
        quantity: quantity,
        selectedSize: selectedSize,
        selectedColor: selectedColor
      };
      
      addToCart(productWithOptions);
    } catch (error) {
      console.error('Add to cart error:', error);
    } finally {
      setAdding(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!token && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
      router.push('/login');
      return;
    }
    
    dispatch(toggleWishlistLocal(parseInt(productId)));
    
    try {
      if (isInWishlist) {
        await dispatch(removeFromWishlistAsync(parseInt(productId))).unwrap();
      } else {
        await dispatch(addToWishlistAsync(parseInt(productId))).unwrap();
      }
    } catch (error) {
      dispatch(toggleWishlistLocal(parseInt(productId)));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: product.name,
      text: product.description,
      url: window.location.href,
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowShareMenu(false);
  };

  // Drag handlers for 360 rotation
  const handleDragStart = (e) => {
    if (!hasMultipleImages || showZoom) return;
    setIsDragging(true);
    setDragStart(e.clientX);
    if (rotationInterval.current) {
      clearInterval(rotationInterval.current);
      setIsRotating(false);
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging || !hasMultipleImages || showZoom) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
      } else {
        setSelectedImage((prev) => (prev + 1) % productImages.length);
      }
      setDragStart(e.clientX);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 4.5);
    const hasHalfStar = (rating || 4.5) - fullStars >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarSolidIcon className="h-5 w-5 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-5 w-5 text-gray-300" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
      }
    }
    return stars;
  };

  const discountPercent = product?.compare_price && product?.compare_price > product?.price
    ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
    : 0;

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
          <div className="container mx-auto px-4 py-20">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
          <div className="container mx-auto px-4 py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
            <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
            <button
              onClick={() => router.push('/products')}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition"
            >
              Browse Products
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <a href="/" className="hover:text-purple-600 transition">Home</a>
              <span>/</span>
              <a href="/products" className="hover:text-purple-600 transition">Products</a>
              <span>/</span>
              <span className="text-purple-600 font-medium line-clamp-1">{product.name}</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images Section */}
            <div>
              <div 
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div 
                  ref={imageContainerRef}
                  className="relative h-96 md:h-[500px] overflow-hidden cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleDragStart}
                  onMouseMoveCapture={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {/* Zoomed Image Overlay */}
                  {showZoom && (
                    <div 
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage: `url(${mainImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '200% 200%',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}

                  <img 
                    src={mainImage || 'https://via.placeholder.com/500x500?text=No+Image'} 
                    alt={product.name}
                    className="w-full h-full object-contain p-8 transition-all duration-300"
                    style={{ opacity: showZoom ? 0 : 1 }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/500x500?text=No+Image';
                    }}
                    draggable={false}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discountPercent > 0 && (
                      <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg">
                        -{discountPercent}% OFF
                      </span>
                    )}
                    {product.is_featured && (
                      <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg">
                        NEW ARRIVAL
                      </span>
                    )}
                  </div>

                  {/* Navigation Buttons */}
                  {hasMultipleImages && !showZoom && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all hover:scale-110"
                      >
                        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition-all hover:scale-110"
                      >
                        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {hasMultipleImages && (
                <div className="flex gap-3 mt-4 justify-center overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === idx 
                          ? 'border-purple-500 shadow-lg scale-105' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} - ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div>
              {product.brand && (
                <div className="mb-2">
                  <span className="text-sm text-purple-600 font-semibold">{product.brand}</span>
                </div>
              )}
              
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              {/* Rating Section */}
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm font-semibold text-amber-600">{product.rating || 4.5}</span>
                <button className="text-sm text-blue-600 hover:underline">
                  128 ratings
                </button>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckIcon className="w-4 h-4" />
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold text-purple-600">
                    ₹{product.price?.toLocaleString()}
                  </span>
                  {product.compare_price && (
                    <span className="text-lg text-gray-400 line-through">
                      ₹{product.compare_price?.toLocaleString()}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes • Free delivery</p>
              </div>

              {/* 🎯 SIZE SELECTOR - Only shows if product has sizes and hasSizes is true */}
              {product.hasSizes && product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700">Select Size</label>
                    <button className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                      <ScaleIcon className="w-3 h-3" />
                      Size Chart
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeChange(size)}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
                          selectedSize === size
                            ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 ring-offset-2'
                            : 'bg-gray-100 text-gray-700 hover:bg-purple-100 border border-gray-200'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {selectedSize && (
                    <p className="text-xs text-gray-500 mt-2">Selected: {selectedSize}</p>
                  )}
                </div>
              )}

              {/* 🎯 COLOR SELECTOR - Only shows if product has colors and hasColors is true */}
              {product.hasColors && product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Select Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => {
                      const colorName = typeof color === 'object' ? color.name : color;
                      const colorCode = typeof color === 'object' ? color.code : 
                        { 'Red': '#ef4444', 'Blue': '#3b82f6', 'Green': '#22c55e', 'Black': '#1f2937', 'White': '#ffffff', 'Purple': '#9333ea', 'Pink': '#ec4899', 'Yellow': '#eab308', 'Orange': '#f97316', 'Gray': '#6b7280', 'Navy': '#1e3a8a' }[colorName] || '#cccccc';
                      
                      return (
                        <button
                          key={colorName}
                          onClick={() => handleColorChange(color)}
                          className={`relative w-12 h-12 rounded-full transition-all ${
                            selectedColor === colorName
                              ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: colorCode }}
                          title={colorName}
                        >
                          {selectedColor === colorName && (
                            <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selectedColor && (
                    <p className="text-xs text-gray-500 mt-2">Selected: {selectedColor}</p>
                  )}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock - quantity} items left
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {adding ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-5 h-5" />
                      {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </>
                  )}
                </button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  className={`p-3.5 rounded-xl border-2 transition-all ${
                    isInWishlist
                      ? 'border-red-500 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}
                >
                  {isInWishlist ? (
                    <HeartSolidIcon className="h-5 w-5" />
                  ) : (
                    <HeartIcon className="h-5 w-5 text-gray-600" />
                  )}
                </motion.button>

                {/* Share Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3.5 rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-md transition-all"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {showShareMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                        <button
                          onClick={handleShare}
                          className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                          <ShareIcon className="w-4 h-4" />
                          Copy Link
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <TruckIcon className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-gray-800">Delivery Information</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Estimated Delivery</p>
                    <p className="font-medium text-gray-800">3-5 business days</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Free Shipping</p>
                    <p className="font-medium text-green-600">On orders above ₹500</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Return Policy</p>
                    <p className="font-medium text-gray-800">7 days easy returns</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Cash on Delivery</p>
                    <p className="font-medium text-gray-800">Available</p>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="mt-6 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                  <span className="text-gray-600">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <ArrowPathIcon className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-600">Easy Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-600">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="mt-12">
            <div className="border-b border-gray-200">
              <div className="flex flex-wrap gap-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-500 hover:text-purple-600'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="py-6">
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description || 'No description available for this product.'}
                  </p>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {product.brand && (
                      <div className="flex py-2 border-b border-gray-100">
                        <span className="w-32 text-gray-500">Brand</span>
                        <span className="text-gray-800 font-medium">{product.brand}</span>
                      </div>
                    )}
                    <div className="flex py-2 border-b border-gray-100">
                      <span className="w-32 text-gray-500">Category</span>
                      <span className="text-gray-800 font-medium capitalize">{product.category}</span>
                    </div>
                    {product.sizes && product.sizes.length > 0 && product.hasSizes && (
                      <div className="flex py-2 border-b border-gray-100">
                        <span className="w-32 text-gray-500">Available Sizes</span>
                        <span className="text-gray-800 font-medium">{product.sizes.join(', ')}</span>
                      </div>
                    )}
                    {product.colors && product.colors.length > 0 && product.hasColors && (
                      <div className="flex py-2 border-b border-gray-100">
                        <span className="w-32 text-gray-500">Available Colors</span>
                        <span className="text-gray-800 font-medium">
                          {product.colors.map(c => typeof c === 'object' ? c.name : c).join(', ')}
                        </span>
                      </div>
                    )}
                    <div className="flex py-2 border-b border-gray-100">
                      <span className="w-32 text-gray-500">Stock</span>
                      <span className="text-gray-800 font-medium">{product.stock} units</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 transition">
                      Write a Review
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">{renderStars(5)}</div>
                        <span className="text-sm font-medium text-gray-800">Great product!</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">by John Doe • Verified Purchase</p>
                      <p className="text-sm text-gray-600">Excellent quality and fast delivery. Highly recommended!</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'shipping' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Information</h3>
                  <div className="space-y-3 text-gray-600">
                    <p>✓ Free shipping on all orders above ₹500</p>
                    <p>✓ Estimated delivery time: 3-5 business days</p>
                    <p>✓ Cash on Delivery available</p>
                    <p>✓ Easy returns within 7 days of delivery</p>
                    <p>✓ Track your order with real-time updates</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setShowVideo(false)}
          >
            <div className="relative max-w-4xl w-full mx-4">
              <button
                onClick={() => setShowVideo(false)}
                className="absolute -top-12 right-0 p-2 text-white hover:bg-white/20 rounded-full transition"
              >
                <XMarkIcon className="w-8 h-8" />
              </button>
              <video
                src={product.video_url}
                controls
                autoPlay
                className="w-full rounded-2xl"
                poster={mainImage}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}