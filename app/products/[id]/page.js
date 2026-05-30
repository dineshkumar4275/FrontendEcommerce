'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
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
  ShareIcon,
  ScaleIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// Import your existing components
import { Header } from '../../../src/components/layout/Header';
import { Footer } from '../../../src/components/layout/Footer';
import { getProductById } from '../../../src/services/productService';
import { useCart } from '../../../src/hooks/useCart';
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
  toggleWishlistLocal,
  fetchWishlist,
} from '../../../src/store/slices/wishlistSlice';

// Helper function to normalize product data
const normalizeProduct = (product) => {
  if (!product) return null;

  let colors = [];
  let sizes = [];
  let hasColors = false;
  let hasSizes = false;

  // Normalize colors
  if (product.colors !== undefined && product.colors !== null) {
    if (Array.isArray(product.colors)) {
      colors = product.colors;
      hasColors = colors.length > 0;
    } else if (typeof product.colors === 'string') {
      try {
        const parsed = JSON.parse(product.colors);
        if (Array.isArray(parsed)) {
          colors = parsed;
          hasColors = colors.length > 0;
        }
      } catch (e) {
        console.warn('Failed to parse colors JSON:', e);
        colors = [];
        hasColors = false;
      }
    }
  }

  // Normalize sizes
  if (product.sizes !== undefined && product.sizes !== null) {
    if (Array.isArray(product.sizes)) {
      sizes = product.sizes;
      hasSizes = sizes.length > 0;
    } else if (typeof product.sizes === 'string') {
      try {
        const parsed = JSON.parse(product.sizes);
        if (Array.isArray(parsed)) {
          sizes = parsed;
          hasSizes = sizes.length > 0;
        }
      } catch (e) {
        console.warn('Failed to parse sizes JSON:', e);
        sizes = [];
        hasSizes = false;
      }
    }
  }

  const backendHasColors = product.has_colors !== undefined ? product.has_colors : product.hasColors;
  const backendHasSizes = product.has_sizes !== undefined ? product.has_sizes : product.hasSizes;

  return {
    ...product,
    colors,
    sizes,
    hasColors: hasColors || backendHasColors || false,
    hasSizes: hasSizes || backendHasSizes || false,
  };
};

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
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorObj, setSelectedColorObj] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [shippingDate, setShippingDate] = useState('');

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

  // Calculate shipping date (3-5 business days from now)
  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    setShippingDate(date.toLocaleDateString('en-US', options));
  }, []);

  // Build image array from all available image fields
  const productImages = [
    product?.image_url,
    product?.image_url_2,
    product?.image_url_3,
    product?.image_url_4,
    product?.image_url_5,
  ].filter(img => img && img && img.trim() !== '');

  const hasMultipleImages = productImages.length > 1;

  const tabs = [
    { id: 'description', label: 'Product Details' },
    { id: 'specifications', label: 'Specifications' },
    { id: 'reviews', label: 'Customer Reviews' },
    { id: 'shipping', label: 'Shipping Info' },
  ];

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
    if (token || isAuthenticated) {
      dispatch(fetchWishlist());
    }
  }, [productId, dispatch, token, isAuthenticated]);

  // Initialize color selection and set current image
  useEffect(() => {
    if (product && product.hasColors && product.colors && product.colors.length > 0) {
      let firstColorName = '';
      let firstColorObj = null;
      
      product.colors.forEach((color, index) => {
        const colorName = typeof color === 'object' ? color.name : color;
        const colorObj = typeof color === 'object' ? color : { name: colorName, code: null, image: null };
        
        if (index === 0) {
          firstColorName = colorName;
          firstColorObj = colorObj;
        }
      });
      
      setSelectedColor(firstColorName);
      setSelectedColorObj(firstColorObj);
      
      if (firstColorObj && firstColorObj.image) {
        setCurrentImage(firstColorObj.image);
        setSelectedImage(-1);
      } else {
        setCurrentImage(productImages[0] || product?.image_url);
      }
    } else if (product) {
      setCurrentImage(productImages[0] || product?.image_url);
    }
  }, [product]);

  // Auto-rotate images
  useEffect(() => {
    const shouldAutoRotate = hasMultipleImages && !isDragging && !isRotating && !showZoom && !selectedColorObj?.image;
    if (shouldAutoRotate) {
      setIsRotating(true);
      rotationInterval.current = setInterval(() => {
        setSelectedImage((prev) => {
          const next = (prev + 1) % productImages.length;
          setCurrentImage(productImages[next]);
          return next;
        });
      }, 2500);
    } else if (!isDragging && rotationInterval.current) {
      clearInterval(rotationInterval.current);
      setIsRotating(false);
    }
    return () => {
      if (rotationInterval.current) clearInterval(rotationInterval.current);
    };
  }, [isDragging, hasMultipleImages, productImages.length, showZoom, selectedColorObj?.image]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      if (data) {
        const normalized = normalizeProduct(data);
        setProduct(normalized);
        console.log('Product loaded:', { 
          name: normalized.name, 
          colors: normalized.colors,
          hasColors: normalized.hasColors 
        });
      } else {
        router.push('/products');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      router.push('/products');
    } finally {
      setLoading(false);
    }
  };

  // Color change handler - changes image immediately
  const handleColorChange = (colorName, colorObj = null) => {
    console.log('Color selected:', colorName, colorObj);
    
    setSelectedColor(colorName);
    setSelectedColorObj(colorObj);
    
    if (colorObj && colorObj.image) {
      console.log('Changing to color image:', colorObj.image);
      setCurrentImage(colorObj.image);
      setSelectedImage(-1);
    } else {
      const colorLower = colorName.toLowerCase();
      const matchingImage = productImages.find(img => 
        img && img.toLowerCase().includes(colorLower)
      );
      if (matchingImage) {
        setCurrentImage(matchingImage);
      } else {
        setCurrentImage(productImages[0] || product?.image_url);
      }
    }
  };

  const handleSizeChange = (size) => setSelectedSize(size);

  const handleMouseMove = (e) => {
    if (!imageContainerRef.current || !showZoom) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    let x = ((e.clientX - left) / width) * 100;
    let y = ((e.clientY - top) / height) * 100;
    x = Math.min(Math.max(x, 0), 100);
    y = Math.min(Math.max(y, 0), 100);
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setShowZoom(true);
  const handleMouseLeave = () => setShowZoom(false);

  const handleAddToCart = async () => {
    if (!token && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
      router.push('/login');
      return;
    }
    if (product.stock <= 0) return;
    setAdding(true);
    try {
      addToCart({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
        selectedColorImage: selectedColorObj?.image || null,
      });
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
    } catch {
      dispatch(toggleWishlistLocal(parseInt(productId)));
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: product.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
    setShowShareMenu(false);
  };

  const handleDragStart = (e) => {
    if (!hasMultipleImages || showZoom || selectedColorObj?.image) return;
    setIsDragging(true);
    setDragStart(e.clientX);
    if (rotationInterval.current) clearInterval(rotationInterval.current);
  };

  const handleDragMove = (e) => {
    if (!isDragging || !hasMultipleImages || showZoom || selectedColorObj?.image) return;
    const diff = e.clientX - dragStart;
    if (Math.abs(diff) > 20) {
      if (diff > 0) {
        const newIndex = (selectedImage - 1 + productImages.length) % productImages.length;
        setSelectedImage(newIndex);
        setCurrentImage(productImages[newIndex]);
      } else {
        const newIndex = (selectedImage + 1) % productImages.length;
        setSelectedImage(newIndex);
        setCurrentImage(productImages[newIndex]);
      }
      setDragStart(e.clientX);
    }
  };

  const handleDragEnd = () => setIsDragging(false);

  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setCurrentImage(productImages[index]);
    setSelectedColorObj(null);
  };

  const getColorCode = (colorName) => {
    const colorMap = {
      'Black/Green': '#1a3a1a',
      'Black/Blue': '#1a2a4a',
      'Black/Red': '#4a1a1a',
      'Black/Gold': '#4a3a1a',
      'Silver/Black': '#c0c0c0',
      'Green': '#228B22',
      'Blue': '#4169E1',
      'Red': '#DC143C',
      'Black': '#1a1a1a',
      'White': '#ffffff',
      'Gold': '#FFD700',
      'Silver': '#C0C0C0',
    };
    return colorMap[colorName] || '#cccccc';
  };

  const renderStars = (rating) => {
    const stars = [];
    const numRating = typeof rating === 'number' ? rating : parseFloat(rating) || 4.5;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating - fullStars >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<StarSolidIcon key={i} className="h-4 w-4 text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <StarSolidIcon className="h-4 w-4 text-yellow-400" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-4 w-4 text-gray-300" />
            </div>
          </div>
        );
      } else {
        stars.push(<StarIcon key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  // ✅ FIXED: Convert price to number safely
  const productPrice = typeof product?.price === 'number' 
    ? product.price 
    : parseFloat(product?.price) || 0;
  
  const comparePriceValue = product?.compare_price 
    ? (typeof product.compare_price === 'number' ? product.compare_price : parseFloat(product.compare_price) || 0)
    : 0;
  
  const shippingCharge = 27.55;
  const totalPrice = (productPrice + shippingCharge).toFixed(2);
  const displayPrice = productPrice.toFixed(2);
  const displayComparePrice = comparePriceValue > 0 ? comparePriceValue.toFixed(2) : null;

  const discountPercent = comparePriceValue > productPrice
    ? Math.round(((comparePriceValue - productPrice) / comparePriceValue) * 100)
    : 0;

  if (loading) {
    return (
      <>
        <Header categories={[]} />
        <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header categories={[]} />
        <div className="min-h-screen bg-gray-50 pt-20 text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold">Product Not Found</h2>
          <button
            onClick={() => router.push('/products')}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Browse Products
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header categories={[]} />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-purple-600">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-purple-600">Products</a>
            <span>/</span>
            <a href="/products?category=watches" className="hover:text-purple-600">Watches</a>
            <span>/</span>
            <span className="text-purple-600 font-medium">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Images Section - Left Column */}
            <div>
              {/* Main Image with Zoom */}
              <div
                className="relative bg-white rounded-xl overflow-hidden shadow-md border border-gray-200"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  ref={imageContainerRef}
                  className="relative h-96 md:h-[450px] overflow-hidden cursor-zoom-in"
                  onMouseMove={handleMouseMove}
                  onMouseDown={handleDragStart}
                  onMouseMoveCapture={handleDragMove}
                  onMouseUp={handleDragEnd}
                  onMouseLeave={handleDragEnd}
                >
                  {showZoom && (
                    <div
                      className="absolute inset-0 z-10 pointer-events-none"
                      style={{
                        backgroundImage: `url(${currentImage})`,
                        backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        backgroundSize: '200% 200%',
                        backgroundRepeat: 'no-repeat',
                      }}
                    />
                  )}
                  <img
                    src={currentImage || 'https://via.placeholder.com/500x500?text=No+Image'}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 transition-all duration-300"
                    style={{ opacity: showZoom ? 0 : 1 }}
                    draggable={false}
                    key={currentImage}
                  />
                  {/* Discount Badge */}
                  {discountPercent > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-lg bg-red-500 text-white text-sm font-bold shadow-lg">
                        -{discountPercent}% OFF
                      </span>
                    </div>
                  )}
                  {/* Navigation arrows */}
                  {hasMultipleImages && !showZoom && !selectedColorObj?.image && (
                    <>
                      <button
                        onClick={() => {
                          const newIndex = (selectedImage - 1 + productImages.length) % productImages.length;
                          setSelectedImage(newIndex);
                          setCurrentImage(productImages[newIndex]);
                        }}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
                      >
                        <ChevronLeftIcon className="w-5 h-5 text-gray-700" />
                      </button>
                      <button
                        onClick={() => {
                          const newIndex = (selectedImage + 1) % productImages.length;
                          setSelectedImage(newIndex);
                          setCurrentImage(productImages[newIndex]);
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
                      >
                        <ChevronRightIcon className="w-5 h-5 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              {hasMultipleImages && !selectedColorObj?.image && (
                <div className="flex gap-3 mt-4 justify-start overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleThumbnailClick(idx)}
                      className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                        selectedImage === idx
                          ? 'border-purple-500 shadow-md scale-105'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {selectedColorObj?.image && (
                <div className="text-center mt-3 text-sm text-purple-600">
                  Showing {selectedColor} variant
                </div>
              )}
            </div>

            {/* Product Info - Right Column */}
            <div className="space-y-4">
              {/* Brand */}
              {product.brand && (
                <div>
                  <span className="text-sm text-purple-600 font-semibold">{product.brand}</span>
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center flex-wrap gap-3">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-amber-600">{product.rating || 4.5}</span>
                <span className="text-sm text-blue-600 hover:underline cursor-pointer">{product.review_count || 128} ratings</span>
                <span className="text-sm text-green-600">50+ bought in past month</span>
              </div>

              {/* Price Section - FIXED */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  {discountPercent > 0 && displayComparePrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${displayComparePrice}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-bold text-gray-900">
                    ${displayPrice}
                  </span>
                  {discountPercent > 0 && (
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-green-600 font-semibold">Low Price Guarantee</p>
              </div>

              {/* Shipping & Import Charges - FIXED */}
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">${shippingCharge.toFixed(2)} Shipping & Import Charges to India</span>
                  <span className="text-xs text-gray-500">Details</span>
                </div>
                <div className="text-sm text-gray-500">
                  Total: ${totalPrice}
                </div>
                <div className="text-sm text-gray-500">
                  Available at a lower price from other sellers that may not offer free shipping.
                </div>
              </div>

              {/* Color Selector */}
              {product.hasColors && product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Color: <span className="text-purple-600">{selectedColor}</span></label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => {
                      const colorName = typeof color === 'object' ? color.name : color;
                      const colorCode = typeof color === 'object' ? color.code : getColorCode(colorName);
                      const isSelected = selectedColor === colorName;
                      
                      return (
                        <button
                          key={colorName}
                          onClick={() => handleColorChange(colorName, typeof color === 'object' ? color : null)}
                          className={`relative transition-all ${
                            isSelected
                              ? 'ring-2 ring-purple-600 ring-offset-2 scale-105'
                              : 'hover:scale-105'
                          }`}
                          title={colorName}
                        >
                          <div 
                            className="w-8 h-8 rounded-full border-2 border-gray-300"
                            style={{ backgroundColor: colorCode }}
                          />
                          {isSelected && (
                            <CheckIcon className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white rounded-full p-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="space-y-2">
                <div className="text-sm text-gray-700">
                  <span className="font-semibold">Stainless Steel Band, 100-meter water resistance</span>
                </div>
                <div className="text-sm text-gray-700">
                  Resin Case and Resin Bezel, Triple-fold Clasp
                </div>
                <div className="text-sm text-gray-700">
                  Timer Bezel, Resin Glass, Date, day display
                </div>
                <div className="text-sm text-gray-700">
                  Analog: 3 hands (hour, minute, second), Approx. battery life: 3 years on SR6265W
                </div>
              </div>

              {/* Delivery Date */}
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-4 h-4 text-gray-500" />
                <span className="font-semibold">Delivery:</span>
                <span className="text-green-700 font-semibold">{shippingDate}</span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-700 font-semibold">In Stock</span>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white transition"
                  >
                    <MinusIcon className="w-3 h-3" />
                  </button>
                  <span className="w-10 text-center font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-white transition"
                  >
                    <PlusIcon className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2.5 rounded-lg font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {adding ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCartIcon className="w-4 h-4" />
                      Add to Cart
                    </>
                  )}
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-lg font-semibold transition"
                >
                  Buy Now
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  className={`p-2.5 rounded-lg border-2 transition-all ${
                    isInWishlist
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-300 hover:border-purple-300'
                  }`}
                >
                  {isInWishlist ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5 text-gray-600" />}
                </motion.button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-2.5 rounded-lg border-2 border-gray-300 hover:border-purple-300 transition"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {showShareMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border z-50">
                        <button
                          onClick={handleShare}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                        >
                          <ShareIcon className="w-4 h-4" /> Copy Link
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Shipping/Seller Info */}
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="text-gray-900">Amazon.com</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Returns:</span>
                  <span className="text-green-700">30-day refund/replacement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment:</span>
                  <span className="text-gray-900">Secure transaction</span>
                </div>
              </div>

              {/* Add to List Link */}
              <button className="text-blue-600 hover:underline text-sm flex items-center gap-1">
                <HeartIcon className="w-4 h-4" />
                Add to List
              </button>
            </div>
          </div>

          {/* Product Tabs Section */}
          <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200 flex flex-wrap gap-6 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 py-3 text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {/* Product Details Tab */}
              {activeTab === 'description' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Top Highlights</h3>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      <li>Stainless Steel Band, 100-meter water resistance</li>
                      <li>Resin Case and Resin Bezel, Triple-fold Clasp</li>
                      <li>Timer Bezel, Resin Glass, Date, day display</li>
                      <li>Analog: 3 hands (hour, minute, second), Approx. battery life: 3 years on SR6265W</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">About this item</h3>
                    <p className="text-gray-600">{product.description || 'Casio MRW200H Series offers reliable timekeeping with 100m water resistance, making it perfect for daily wear and water activities.'}</p>
                  </div>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Brand</span>
                    <span className="text-gray-800 font-medium">{product.brand || 'Casio'}</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Model</span>
                    <span className="text-gray-800 font-medium">{product.model || 'MRW200H'}</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Water Resistance</span>
                    <span className="text-gray-800 font-medium">100 meters (330 feet)</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Band Material</span>
                    <span className="text-gray-800 font-medium">Stainless Steel / Resin</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Case Material</span>
                    <span className="text-gray-800 font-medium">Resin</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Display Type</span>
                    <span className="text-gray-800 font-medium">Analog</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Battery Life</span>
                    <span className="text-gray-800 font-medium">3 years</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-40 text-gray-500">Warranty</span>
                    <span className="text-gray-800 font-medium">{product.warranty || '1 Year Manufacturer Warranty'}</span>
                  </div>
                </div>
              )}

              {/* Customer Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800">{product.rating || 4.5}</div>
                      <div className="flex items-center gap-1 mt-1">{renderStars(product.rating)}</div>
                      <div className="text-sm text-gray-500 mt-1">{product.review_count || 128} global ratings</div>
                    </div>
                    <div className="flex-1">
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((star) => {
                          const percentages = {5: 72, 4: 18, 3: 5, 2: 3, 1: 2};
                          return (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm w-8">{star}★</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-yellow-400 rounded-full"
                                  style={{ width: `${percentages[star]}%` }}
                                />
                              </div>
                              <span className="text-sm text-gray-500 w-12">{percentages[star]}%</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  <button className="mt-4 px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                    Write a Review
                  </button>
                </div>
              )}

              {/* Shipping Info Tab */}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Delivery Information</h3>
                    <p className="text-gray-600">Free standard shipping on orders above $25. Delivery typically takes 3-5 business days.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Returns Policy</h3>
                    <p className="text-gray-600">Easy returns within 30 days of delivery. Items must be unused and in original packaging.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">International Shipping</h3>
                    <p className="text-gray-600">We ship worldwide. Shipping charges and import duties calculated at checkout.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}