// app/products/[id]/page.jsx - Complete updated code
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
  ShoppingCartIcon, HeartIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon,
  StarIcon, CheckIcon, PlusIcon, MinusIcon, ChevronLeftIcon, ChevronRightIcon,
  XMarkIcon, PlayIcon, ShareIcon, ScaleIcon, ClockIcon, MagnifyingGlassIcon
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
    if (productId) fetchProduct();
    if (token || isAuthenticated) dispatch(fetchWishlist());
  }, [productId, dispatch, token, isAuthenticated]);

  useEffect(() => {
    if (product) {
      if (product.hasSizes && product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
      if (product.hasColors && product.colors && product.colors.length > 0) {
        const firstColor = typeof product.colors[0] === 'object' ? product.colors[0].name : product.colors[0];
        setSelectedColor(firstColor);
      }
    }
  }, [product]);

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
    return () => { if (rotationInterval.current) clearInterval(rotationInterval.current); };
  }, [isDragging, hasMultipleImages, productImages.length, showZoom]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProductById(productId);
      if (data) setProduct(data);
      else router.push('/products');
    } catch (error) { router.push('/products'); } finally { setLoading(false); }
  };

  const handleColorChange = (colorName) => {
    setSelectedColor(colorName);
    const colorLower = colorName.toLowerCase();
    const matchingIndex = productImages.findIndex((img, idx) => {
      if (idx === 0) return false;
      return img?.toLowerCase().includes(colorLower);
    });
    if (matchingIndex !== -1) setSelectedImage(matchingIndex);
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
      addToCart({ ...product, quantity, selectedSize, selectedColor });
    } finally { setAdding(false); }
  };

  const handleWishlistToggle = async () => {
    if (!token && !isAuthenticated) {
      localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
      router.push('/login');
      return;
    }
    dispatch(toggleWishlistLocal(parseInt(productId)));
    try {
      if (isInWishlist) await dispatch(removeFromWishlistAsync(parseInt(productId))).unwrap();
      else await dispatch(addToWishlistAsync(parseInt(productId))).unwrap();
    } catch { dispatch(toggleWishlistLocal(parseInt(productId))); }
  };

  const handleShare = async () => {
    if (navigator.share) await navigator.share({ title: product.name, url: window.location.href });
    else navigator.clipboard.writeText(window.location.href);
    setShowShareMenu(false);
  };

  const handleDragStart = (e) => { if (!hasMultipleImages || showZoom) return; setIsDragging(true); setDragStart(e.clientX); if (rotationInterval.current) clearInterval(rotationInterval.current); };
  const handleDragMove = (e) => { if (!isDragging || !hasMultipleImages || showZoom) return; const diff = e.clientX - dragStart; if (Math.abs(diff) > 20) { if (diff > 0) setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length); else setSelectedImage((prev) => (prev + 1) % productImages.length); setDragStart(e.clientX); } };
  const handleDragEnd = () => setIsDragging(false);

  const renderStars = (rating) => {
    const stars = []; const fullStars = Math.floor(rating || 4.5); const hasHalfStar = (rating || 4.5) - fullStars >= 0.5;
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push(<StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />);
      else if (i === fullStars + 1 && hasHalfStar) stars.push(<div key={i} className="relative"><StarSolidIcon className="h-5 w-5 text-yellow-400" /><div className="absolute inset-0 overflow-hidden w-1/2"><StarIcon className="h-5 w-5 text-gray-300" /></div></div>);
      else stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
    }
    return stars;
  };

  const discountPercent = product?.compare_price && product?.compare_price > product?.price ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100) : 0;

  if (loading) return (<><Header /><div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div><Footer /></>);
  if (!product) return (<><Header /><div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 text-center py-20"><div className="text-6xl mb-4">🔍</div><h2 className="text-2xl font-bold">Product Not Found</h2><button onClick={() => router.push('/products')} className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg">Browse Products</button></div><Footer /></>);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-purple-600">Home</a><span>/</span>
            <a href="/products" className="hover:text-purple-600">Products</a><span>/</span>
            <span className="text-purple-600 font-medium">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                <div ref={imageContainerRef} className="relative h-96 md:h-[500px] overflow-hidden cursor-zoom-in" onMouseMove={handleMouseMove} onMouseDown={handleDragStart} onMouseMoveCapture={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd}>
                  {showZoom && <div className="absolute inset-0 z-10 pointer-events-none" style={{ backgroundImage: `url(${mainImage})`, backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`, backgroundSize: '200% 200%', backgroundRepeat: 'no-repeat' }} />}
                  <img src={mainImage || 'https://via.placeholder.com/500x500?text=No+Image'} alt={product.name} className="w-full h-full object-contain p-8 transition-all duration-300" style={{ opacity: showZoom ? 0 : 1 }} draggable={false} />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {discountPercent > 0 && <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg">-{discountPercent}% OFF</span>}
                    {product.is_featured && <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg">NEW ARRIVAL</span>}
                  </div>
                  {hasMultipleImages && !showZoom && (<>
                    <button onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md"><ChevronLeftIcon className="w-6 h-6 text-gray-700" /></button>
                    <button onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md"><ChevronRightIcon className="w-6 h-6 text-gray-700" /></button>
                  </>)}
                </div>
              </div>
              {hasMultipleImages && (
                <div className="flex gap-3 mt-4 justify-center overflow-x-auto pb-2">
                  {productImages.map((img, idx) => (
                    <button key={idx} onClick={() => setSelectedImage(idx)} className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${selectedImage === idx ? 'border-purple-500 shadow-lg scale-105' : 'border-gray-200 hover:border-gray-400'}`}>
                      <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.brand && <div className="mb-2"><span className="text-sm text-purple-600 font-semibold">{product.brand}</span></div>}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-amber-600">{product.rating || 4.5}</span>
                <span className="text-sm text-blue-600">128 ratings</span>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-sm text-green-600 flex items-center gap-1"><CheckIcon className="w-4 h-4" />{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </div>

              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-3xl md:text-4xl font-bold text-purple-600">₹{product.price?.toLocaleString()}</span>
                  {product.compare_price && <span className="text-lg text-gray-400 line-through">₹{product.compare_price?.toLocaleString()}</span>}
                  {discountPercent > 0 && <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">Save {discountPercent}%</span>}
                </div>
                <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes • Free delivery</p>
              </div>

              {/* 🎯 SIZE SELECTOR */}
              {product.hasSizes && product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700">Select Size</label>
                    <button className="text-xs text-purple-600 hover:underline flex items-center gap-1"><ScaleIcon className="w-3 h-3" /> Size Chart</button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size) => (
                      <button key={size} onClick={() => handleSizeChange(size)} className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${selectedSize === size ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 ring-offset-2' : 'bg-gray-100 text-gray-700 hover:bg-purple-100 border border-gray-200'}`}>{size}</button>
                    ))}
                  </div>
                  {selectedSize && <p className="text-xs text-gray-500 mt-2">Selected: {selectedSize}</p>}
                </div>
              )}

              {/* 🎯 COLOR SELECTOR - FIXED: Shows colors when hasColors is true */}
              {(product.hasColors === true || (product.colors && product.colors.length > 0)) && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Select Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors && product.colors.length > 0 ? (
                      product.colors.map((color) => {
                        const colorName = typeof color === 'object' ? color.name : color;
                        const colorCode = typeof color === 'object' ? color.code : 
                          { 'Red': '#ef4444', 'Blue': '#3b82f6', 'Black': '#1f2937', 'White': '#ffffff', 'Gold': '#fbbf24', 'Silver': '#9ca3af', 'Green': '#22c55e', 'Purple': '#9333ea' }[colorName] || '#cccccc';
                        return (
                          <button key={colorName} onClick={() => handleColorChange(colorName)} className={`relative w-12 h-12 rounded-full transition-all ${selectedColor === colorName ? 'ring-2 ring-purple-600 ring-offset-2 scale-110' : 'hover:scale-105'}`} style={{ backgroundColor: colorCode }} title={colorName}>
                            {selectedColor === colorName && <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow" />}
                          </button>
                        );
                      })
                    ) : (
                      // Fallback default colors
                      ['Red', 'Blue', 'Black', 'Gold', 'Silver'].map((colorName) => (
                        <button key={colorName} onClick={() => handleColorChange(colorName)} className={`relative w-12 h-12 rounded-full transition-all ${selectedColor === colorName ? 'ring-2 ring-purple-600 ring-offset-2 scale-110' : 'hover:scale-105'}`} style={{ backgroundColor: colorName === 'Red' ? '#ef4444' : colorName === 'Blue' ? '#3b82f6' : colorName === 'Black' ? '#1f2937' : colorName === 'Gold' ? '#fbbf24' : '#9ca3af' }} title={colorName}>
                          {selectedColor === colorName && <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow" />}
                        </button>
                      ))
                    )}
                  </div>
                  {selectedColor && <p className="text-xs text-gray-500 mt-2">Selected: {selectedColor}</p>}
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white"><MinusIcon className="w-4 h-4" /></button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white"><PlusIcon className="w-4 h-4" /></button>
                  </div>
                  <span className="text-sm text-gray-500">{product.stock - quantity} items left</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button onClick={handleAddToCart} disabled={adding || product.stock === 0} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2">
                  {adding ? <><svg className="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Adding...</> : <><ShoppingCartIcon className="w-5 h-5" />{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</>}
                </button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleWishlistToggle} className={`p-3.5 rounded-xl border-2 transition-all ${isInWishlist ? 'border-red-500 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md' : 'border-gray-200 hover:border-purple-300'}`}>
                  {isInWishlist ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5 text-gray-600" />}
                </motion.button>
                <div className="relative">
                  <button onClick={() => setShowShareMenu(!showShareMenu)} className="p-3.5 rounded-xl border-2 border-gray-200 hover:border-purple-300"><ShareIcon className="h-5 w-5 text-gray-600" /></button>
                  {showShareMenu && <><div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} /><div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-50"><button onClick={handleShare} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"><ShareIcon className="w-4 h-4" />Copy Link</button></div></>}
                </div>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <div className="flex items-center gap-3 mb-3"><TruckIcon className="h-5 w-5 text-purple-600" /><span className="font-semibold text-gray-800">Delivery Information</span></div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><p className="text-gray-500">Estimated Delivery</p><p className="font-medium text-gray-800">3-5 business days</p></div>
                  <div><p className="text-gray-500">Free Shipping</p><p className="font-medium text-green-600">On orders above ₹500</p></div>
                  <div><p className="text-gray-500">Return Policy</p><p className="font-medium text-gray-800">7 days easy returns</p></div>
                  <div><p className="text-gray-500">Cash on Delivery</p><p className="font-medium text-gray-800">Available</p></div>
                </div>
              </div>

              <div className="mt-6 flex gap-4 text-sm">
                <div className="flex items-center gap-2"><ShieldCheckIcon className="w-4 h-4 text-green-600" /><span className="text-gray-600">Secure Payment</span></div>
                <div className="flex items-center gap-2"><ArrowPathIcon className="w-4 h-4 text-blue-600" /><span className="text-gray-600">Easy Returns</span></div>
                <div className="flex items-center gap-2"><ClockIcon className="w-4 h-4 text-orange-600" /><span className="text-gray-600">24/7 Support</span></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200 flex flex-wrap gap-6">
              {tabs.map((tab) => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-3 text-sm font-semibold transition-all ${activeTab === tab.id ? 'text-purple-600 border-b-2 border-purple-600' : 'text-gray-500 hover:text-purple-600'}`}>{tab.label}</button>)}
            </div>
            <div className="py-6">
              {activeTab === 'description' && <p className="text-gray-600">{product.description || 'No description available.'}</p>}
              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {product.brand && <div className="flex py-2 border-b"><span className="w-32 text-gray-500">Brand</span><span className="text-gray-800 font-medium">{product.brand}</span></div>}
                  <div className="flex py-2 border-b"><span className="w-32 text-gray-500">Category</span><span className="text-gray-800 font-medium capitalize">{product.category}</span></div>
                  {product.sizes?.length > 0 && product.hasSizes && <div className="flex py-2 border-b"><span className="w-32 text-gray-500">Sizes</span><span className="text-gray-800 font-medium">{product.sizes.join(', ')}</span></div>}
                  {product.colors?.length > 0 && product.hasColors && <div className="flex py-2 border-b"><span className="w-32 text-gray-500">Colors</span><span className="text-gray-800 font-medium">{product.colors.map(c => typeof c === 'object' ? c.name : c).join(', ')}</span></div>}
                  <div className="flex py-2 border-b"><span className="w-32 text-gray-500">Stock</span><span className="text-gray-800 font-medium">{product.stock} units</span></div>
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