// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import { useParams, useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { motion } from 'framer-motion';
// import {
//   ShoppingCartIcon,
//   HeartIcon,
//   TruckIcon,
//   ShieldCheckIcon,
//   ArrowPathIcon,
//   StarIcon,
//   CheckIcon,
//   PlusIcon,
//   MinusIcon,
//   ChevronLeftIcon,
//   ChevronRightIcon,
//   ShareIcon,
//   ScaleIcon,
//   ClockIcon,
// } from '@heroicons/react/24/outline';
// import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// // Import from correct paths - adjust these based on your actual project structure
// // If these components don't exist yet, you'll need to create them or remove the imports
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';
// import { getProductById } from '@/services/productService';
// import { useCart } from '@/hooks/useCart';
// import {
//   addToWishlistAsync,
//   removeFromWishlistAsync,
//   toggleWishlistLocal,
//   fetchWishlist,
// } from '@/store/slices/wishlistSlice';

// const normalizeProduct = (product) => {
//   if (!product) return null;

//   let colors = [];
//   let sizes = [];
//   let hasColors = false;
//   let hasSizes = false;

//   // Normalize colors - handle array, JSON string, null, invalid JSON
//   if (product.colors !== undefined && product.colors !== null) {
//     if (Array.isArray(product.colors)) {
//       colors = product.colors;
//       hasColors = colors.length > 0;
//     } else if (typeof product.colors === 'string') {
//       try {
//         const parsed = JSON.parse(product.colors);
//         if (Array.isArray(parsed)) {
//           colors = parsed;
//           hasColors = colors.length > 0;
//         }
//       } catch (e) {
//         console.warn('Failed to parse colors JSON:', e);
//         colors = [];
//         hasColors = false;
//       }
//     }
//   }

//   // Normalize sizes - handle array, JSON string, null, invalid JSON
//   if (product.sizes !== undefined && product.sizes !== null) {
//     if (Array.isArray(product.sizes)) {
//       sizes = product.sizes;
//       hasSizes = sizes.length > 0;
//     } else if (typeof product.sizes === 'string') {
//       try {
//         const parsed = JSON.parse(product.sizes);
//         if (Array.isArray(parsed)) {
//           sizes = parsed;
//           hasSizes = sizes.length > 0;
//         }
//       } catch (e) {
//         console.warn('Failed to parse sizes JSON:', e);
//         sizes = [];
//         hasSizes = false;
//       }
//     }
//   }

//   // Handle snake_case from backend (has_colors / hasColors)
//   const backendHasColors = product.has_colors !== undefined ? product.has_colors : product.hasColors;
//   const backendHasSizes = product.has_sizes !== undefined ? product.has_sizes : product.hasSizes;

//   return {
//     ...product,
//     colors,
//     sizes,
//     hasColors: hasColors || backendHasColors || false,
//     hasSizes: hasSizes || backendHasSizes || false,
//   };
// };

// export default function ProductDetailPage() {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [quantity, setQuantity] = useState(1);
//   const [adding, setAdding] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState(0);
//   const [isRotating, setIsRotating] = useState(false);
//   const [selectedSize, setSelectedSize] = useState('');
//   const [selectedColor, setSelectedColor] = useState('');
//   const [selectedColorObj, setSelectedColorObj] = useState(null);
//   const [activeTab, setActiveTab] = useState('description');
//   const [showShareMenu, setShowShareMenu] = useState(false);
//   const [colorImages, setColorImages] = useState({});

//   const imageContainerRef = useRef(null);
//   const rotationInterval = useRef(null);

//   const params = useParams();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const productId = params.id;

//   const { addToCart } = useCart();
//   const { isAuthenticated, token } = useSelector((state) => state.auth);
//   const wishlistState = useSelector((state) => state.wishlist || { items: [], loading: false });
//   const wishlistItems = wishlistState.items || [];
//   const wishlistIds = new Set(wishlistItems.map(item => item.product_id || item.id));
//   const isInWishlist = wishlistIds.has(parseInt(productId));

//   // Build image array from all available image fields
//   const productImages = [
//     product?.image_url,
//     product?.image_url_2,
//     product?.image_url_3,
//     product?.image_url_4,
//     product?.image_url_5,
//   ].filter(img => img && img.trim() !== '');

//   const hasMultipleImages = productImages.length > 1;
  
//   // Get current main image based on selected color
//   const getCurrentMainImage = () => {
//     if (selectedColorObj && selectedColorObj.image) {
//       return selectedColorObj.image;
//     }
//     if (colorImages[selectedColor]) {
//       return colorImages[selectedColor];
//     }
//     return productImages[selectedImage] || product?.image_url;
//   };
  
//   const mainImage = getCurrentMainImage();

//   const tabs = [
//     { id: 'description', label: 'Description' },
//     { id: 'specifications', label: 'Specifications' },
//     { id: 'reviews', label: 'Reviews' },
//     { id: 'shipping', label: 'Shipping' },
//   ];

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     }
//     if (token || isAuthenticated) {
//       dispatch(fetchWishlist());
//     }
//   }, [productId, dispatch, token, isAuthenticated]);

//   // Initialize color images mapping and set default selected color
//   useEffect(() => {
//     if (product && product.hasColors && product.colors && product.colors.length > 0) {
//       const imagesMap = {};
//       let firstColorName = '';
//       let firstColorObj = null;
      
//       product.colors.forEach((color, index) => {
//         const colorName = typeof color === 'object' ? color.name : color;
//         const colorImage = typeof color === 'object' ? color.image : null;
//         const colorCode = typeof color === 'object' ? color.code : null;
        
//         if (index === 0) {
//           firstColorName = colorName;
//           firstColorObj = typeof color === 'object' ? color : { name: colorName, code: null, image: null };
//         }
        
//         if (colorImage) {
//           imagesMap[colorName] = colorImage;
//         } else {
//           // If no color-specific image, use the first product image as fallback
//           imagesMap[colorName] = productImages[0] || product?.image_url;
//         }
//       });
      
//       setColorImages(imagesMap);
//       setSelectedColor(firstColorName);
//       setSelectedColorObj(firstColorObj);
      
//       // If the first color has an image, update selected image index
//       if (firstColorObj && firstColorObj.image) {
//         setSelectedImage(-1); // Use -1 to indicate we're using color image
//       }
//     }
//   }, [product]);

//   // Auto-rotate images (only when not using color-specific images)
//   useEffect(() => {
//     const shouldAutoRotate = hasMultipleImages && !isDragging && !isRotating && !showZoom && !selectedColorObj?.image;
//     if (shouldAutoRotate) {
//       setIsRotating(true);
//       rotationInterval.current = setInterval(() => {
//         setSelectedImage((prev) => (prev + 1) % productImages.length);
//       }, 2500);
//     } else if (!isDragging && rotationInterval.current) {
//       clearInterval(rotationInterval.current);
//       setIsRotating(false);
//     }
//     return () => {
//       if (rotationInterval.current) clearInterval(rotationInterval.current);
//     };
//   }, [isDragging, hasMultipleImages, productImages.length, showZoom, selectedColorObj?.image]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const data = await getProductById(productId);
//       if (data) {
//         const normalized = normalizeProduct(data);
//         setProduct(normalized);
//       } else {
//         router.push('/products');
//       }
//     } catch (error) {
//       console.error('Error fetching product:', error);
//       router.push('/products');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleColorChange = (colorName, colorObj = null) => {
//     setSelectedColor(colorName);
//     setSelectedColorObj(colorObj);
    
//     // Change image based on selected color
//     if (colorObj && colorObj.image) {
//       setSelectedImage(-1); // Use -1 to indicate using color image
//     } else if (colorImages[colorName]) {
//       setSelectedImage(-1);
//     } else {
//       setSelectedImage(0);
//     }
//   };

//   const handleSizeChange = (size) => setSelectedSize(size);

//   const handleMouseMove = (e) => {
//     if (!imageContainerRef.current || !showZoom) return;
//     const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
//     let x = ((e.clientX - left) / width) * 100;
//     let y = ((e.clientY - top) / height) * 100;
//     x = Math.min(Math.max(x, 0), 100);
//     y = Math.min(Math.max(y, 0), 100);
//     setZoomPosition({ x, y });
//   };

//   const handleMouseEnter = () => setShowZoom(true);
//   const handleMouseLeave = () => setShowZoom(false);

//   const handleAddToCart = async () => {
//     if (!token && !isAuthenticated) {
//       localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
//       router.push('/login');
//       return;
//     }
//     if (product.stock <= 0) return;
//     setAdding(true);
//     try {
//       addToCart({
//         ...product,
//         quantity,
//         selectedSize,
//         selectedColor,
//         selectedColorImage: selectedColorObj?.image || null,
//       });
//     } finally {
//       setAdding(false);
//     }
//   };

//   const handleWishlistToggle = async () => {
//     if (!token && !isAuthenticated) {
//       localStorage.setItem('redirectAfterLogin', `/products/${productId}`);
//       router.push('/login');
//       return;
//     }
//     dispatch(toggleWishlistLocal(parseInt(productId)));
//     try {
//       if (isInWishlist) {
//         await dispatch(removeFromWishlistAsync(parseInt(productId))).unwrap();
//       } else {
//         await dispatch(addToWishlistAsync(parseInt(productId))).unwrap();
//       }
//     } catch {
//       dispatch(toggleWishlistLocal(parseInt(productId)));
//     }
//   };

//   const handleShare = async () => {
//     if (navigator.share) {
//       await navigator.share({ title: product.name, url: window.location.href });
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//     }
//     setShowShareMenu(false);
//   };

//   const handleDragStart = (e) => {
//     if (!hasMultipleImages || showZoom || selectedColorObj?.image) return;
//     setIsDragging(true);
//     setDragStart(e.clientX);
//     if (rotationInterval.current) clearInterval(rotationInterval.current);
//   };

//   const handleDragMove = (e) => {
//     if (!isDragging || !hasMultipleImages || showZoom || selectedColorObj?.image) return;
//     const diff = e.clientX - dragStart;
//     if (Math.abs(diff) > 20) {
//       if (diff > 0) {
//         setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
//       } else {
//         setSelectedImage((prev) => (prev + 1) % productImages.length);
//       }
//       setDragStart(e.clientX);
//     }
//   };

//   const handleDragEnd = () => setIsDragging(false);

//   const getColorCode = (colorName) => {
//     const colorMap = {
//       Red: '#ef4444',
//       Blue: '#3b82f6',
//       Black: '#1f2937',
//       White: '#ffffff',
//       Gold: '#fbbf24',
//       Silver: '#9ca3af',
//       Green: '#22c55e',
//       Purple: '#9333ea',
//       Pink: '#ec4899',
//       Yellow: '#eab308',
//       Orange: '#f97316',
//       Brown: '#78350f',
//       Gray: '#6b7280',
//     };
//     return colorMap[colorName] || '#cccccc';
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating || 4.5);
//     const hasHalfStar = (rating || 4.5) - fullStars >= 0.5;
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<StarSolidIcon key={i} className="h-5 w-5 text-yellow-400" />);
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <div key={i} className="relative">
//             <StarSolidIcon className="h-5 w-5 text-yellow-400" />
//             <div className="absolute inset-0 overflow-hidden w-1/2">
//               <StarIcon className="h-5 w-5 text-gray-300" />
//             </div>
//           </div>
//         );
//       } else {
//         stars.push(<StarIcon key={i} className="h-5 w-5 text-gray-300" />);
//       }
//     }
//     return stars;
//   };

//   const discountPercent = product?.compare_price && product?.compare_price > product?.price
//     ? Math.round(((product.compare_price - product.price) / product.compare_price) * 100)
//     : 0;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 flex justify-center items-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 text-center py-20">
//         <div className="text-6xl mb-4">🔍</div>
//         <h2 className="text-2xl font-bold">Product Not Found</h2>
//         <button
//           onClick={() => router.push('/products')}
//           className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
//         >
//           Browse Products
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
//       <div className="container mx-auto px-4 py-8">
//         {/* Breadcrumb */}
//         <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
//           <a href="/" className="hover:text-purple-600">Home</a>
//           <span>/</span>
//           <a href="/products" className="hover:text-purple-600">Products</a>
//           <span>/</span>
//           <span className="text-purple-600 font-medium">{product.name}</span>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Product Images Gallery with Zoom */}
//           <div>
//             <div
//               className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden shadow-lg"
//               onMouseEnter={handleMouseEnter}
//               onMouseLeave={handleMouseLeave}
//             >
//               <div
//                 ref={imageContainerRef}
//                 className="relative h-96 md:h-[500px] overflow-hidden cursor-zoom-in"
//                 onMouseMove={handleMouseMove}
//                 onMouseDown={handleDragStart}
//                 onMouseMoveCapture={handleDragMove}
//                 onMouseUp={handleDragEnd}
//                 onMouseLeave={handleDragEnd}
//               >
//                 {/* Zoom overlay */}
//                 {showZoom && (
//                   <div
//                     className="absolute inset-0 z-10 pointer-events-none"
//                     style={{
//                       backgroundImage: `url(${mainImage})`,
//                       backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                       backgroundSize: '200% 200%',
//                       backgroundRepeat: 'no-repeat',
//                     }}
//                   />
//                 )}
//                 <img
//                   src={mainImage || 'https://via.placeholder.com/500x500?text=No+Image'}
//                   alt={product.name}
//                   className="w-full h-full object-contain p-8 transition-all duration-300"
//                   style={{ opacity: showZoom ? 0 : 1 }}
//                   draggable={false}
//                   key={mainImage}
//                 />
//                 {/* Badges */}
//                 <div className="absolute top-4 left-4 flex flex-col gap-2">
//                   {discountPercent > 0 && (
//                     <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-bold shadow-lg">
//                       -{discountPercent}% OFF
//                     </span>
//                   )}
//                   {product.is_featured && (
//                     <span className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg">
//                       NEW ARRIVAL
//                     </span>
//                   )}
//                 </div>
//                 {/* Navigation arrows - only show when not using color image and multiple images exist */}
//                 {hasMultipleImages && !showZoom && !selectedColorObj?.image && (
//                   <>
//                     <button
//                       onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
//                       className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
//                     >
//                       <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
//                     </button>
//                     <button
//                       onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
//                       className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
//                     >
//                       <ChevronRightIcon className="w-6 h-6 text-gray-700" />
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//             {/* Thumbnail Gallery - only show when not using color image */}
//             {hasMultipleImages && !selectedColorObj?.image && (
//               <div className="flex gap-3 mt-4 justify-center overflow-x-auto pb-2">
//                 {productImages.map((img, idx) => (
//                   <button
//                     key={idx}
//                     onClick={() => setSelectedImage(idx)}
//                     className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
//                       selectedImage === idx
//                         ? 'border-purple-500 shadow-lg scale-105'
//                         : 'border-gray-200 hover:border-gray-400'
//                     }`}
//                   >
//                     <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
//                   </button>
//                 ))}
//               </div>
//             )}
//             {/* Show color image indicator when using color-specific image */}
//             {selectedColorObj?.image && (
//               <div className="text-center mt-4 text-sm text-purple-600">
//                 Showing {selectedColor} variant
//               </div>
//             )}
//           </div>

//           {/* Product Info */}
//           <div>
//             {product.brand && (
//               <div className="mb-2">
//                 <span className="text-sm text-purple-600 font-semibold">{product.brand}</span>
//               </div>
//             )}
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

//             {/* Rating */}
//             <div className="flex items-center flex-wrap gap-3 mb-4">
//               <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
//               <span className="text-sm font-semibold text-amber-600">{product.rating || 4.5}</span>
//               <span className="text-sm text-blue-600">{product.review_count || 128} ratings</span>
//               <div className="h-4 w-px bg-gray-300" />
//               <span className="text-sm text-green-600 flex items-center gap-1">
//                 <CheckIcon className="w-4 h-4" />
//                 {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
//               </span>
//             </div>

//             {/* Price */}
//             <div className="mb-6 p-4 bg-gray-50 rounded-xl">
//               <div className="flex items-baseline gap-3 flex-wrap">
//                 <span className="text-3xl md:text-4xl font-bold text-purple-600">
//                   ₹{product.price?.toLocaleString()}
//                 </span>
//                 {product.compare_price && (
//                   <span className="text-lg text-gray-400 line-through">
//                     ₹{product.compare_price?.toLocaleString()}
//                   </span>
//                 )}
//                 {discountPercent > 0 && (
//                   <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded">
//                     Save {discountPercent}%
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-gray-500 mt-2">Inclusive of all taxes • Free delivery</p>
//             </div>

//             {/* Size Selector - renders when sizes.length > 0 */}
//             {product.hasSizes && product.sizes && product.sizes.length > 0 && (
//               <div className="mb-6">
//                 <div className="flex justify-between items-center mb-3">
//                   <label className="text-sm font-semibold text-gray-700">Select Size</label>
//                   <button className="text-xs text-purple-600 hover:underline flex items-center gap-1">
//                     <ScaleIcon className="w-3 h-3" /> Size Chart
//                   </button>
//                 </div>
//                 <div className="flex gap-2 flex-wrap">
//                   {product.sizes.map((size) => (
//                     <button
//                       key={size}
//                       onClick={() => handleSizeChange(size)}
//                       className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
//                         selectedSize === size
//                           ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-300 ring-offset-2'
//                           : 'bg-gray-100 text-gray-700 hover:bg-purple-100 border border-gray-200'
//                       }`}
//                     >
//                       {size}
//                     </button>
//                   ))}
//                 </div>
//                 {selectedSize && <p className="text-xs text-gray-500 mt-2">Selected: {selectedSize}</p>}
//               </div>
//             )}

//             {/* Color Selector with image switching support */}
//             {product.hasColors && product.colors && product.colors.length > 0 && (
//               <div className="mb-6">
//                 <label className="text-sm font-semibold text-gray-700 mb-3 block">Select Color</label>
//                 <div className="flex gap-3 flex-wrap">
//                   {product.colors.map((color) => {
//                     const colorName = typeof color === 'object' ? color.name : color;
//                     const colorCode = typeof color === 'object' ? color.code : getColorCode(colorName);
//                     const isSelected = selectedColor === colorName;
                    
//                     return (
//                       <button
//                         key={colorName}
//                         onClick={() => handleColorChange(colorName, typeof color === 'object' ? color : null)}
//                         className={`relative w-12 h-12 rounded-full transition-all ${
//                           isSelected
//                             ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
//                             : 'hover:scale-105'
//                         }`}
//                         style={{ backgroundColor: colorCode }}
//                         title={colorName}
//                       >
//                         {isSelected && (
//                           <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow" />
//                         )}
//                       </button>
//                     );
//                   })}
//                 </div>
//                 {selectedColor && (
//                   <p className="text-xs text-gray-500 mt-2">
//                     Selected: {selectedColor}
//                     {selectedColorObj?.image && (
//                       <span className="text-purple-600 ml-2">✓ Color image loaded</span>
//                     )}
//                   </p>
//                 )}
//               </div>
//             )}

//             {/* Quantity Selector */}
//             <div className="mb-6">
//               <label className="block text-sm font-semibold text-gray-700 mb-3">Quantity</label>
//               <div className="flex items-center gap-4">
//                 <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
//                   <button
//                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                     className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition"
//                   >
//                     <MinusIcon className="w-4 h-4" />
//                   </button>
//                   <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
//                   <button
//                     onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                     className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition"
//                   >
//                     <PlusIcon className="w-4 h-4" />
//                   </button>
//                 </div>
//                 <span className="text-sm text-gray-500">{product.stock - quantity} items left</span>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex gap-4">
//               <button
//                 onClick={handleAddToCart}
//                 disabled={adding || product.stock === 0}
//                 className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition"
//               >
//                 {adding ? (
//                   <>
//                     <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
//                       />
//                     </svg>
//                     Adding...
//                   </>
//                 ) : (
//                   <>
//                     <ShoppingCartIcon className="w-5 h-5" />
//                     {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
//                   </>
//                 )}
//               </button>
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={handleWishlistToggle}
//                 className={`p-3.5 rounded-xl border-2 transition-all ${
//                   isInWishlist
//                     ? 'border-red-500 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md'
//                     : 'border-gray-200 hover:border-purple-300'
//                 }`}
//               >
//                 {isInWishlist ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5 text-gray-600" />}
//               </motion.button>
//               <div className="relative">
//                 <button
//                   onClick={() => setShowShareMenu(!showShareMenu)}
//                   className="p-3.5 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition"
//                 >
//                   <ShareIcon className="h-5 w-5 text-gray-600" />
//                 </button>
//                 {showShareMenu && (
//                   <>
//                     <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-50">
//                       <button
//                         onClick={handleShare}
//                         className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
//                       >
//                         <ShareIcon className="w-4 h-4" /> Copy Link
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* Delivery Info */}
//             <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
//               <div className="flex items-center gap-3 mb-3">
//                 <TruckIcon className="h-5 w-5 text-purple-600" />
//                 <span className="font-semibold text-gray-800">Delivery Information</span>
//               </div>
//               <div className="grid grid-cols-2 gap-3 text-sm">
//                 <div>
//                   <p className="text-gray-500">Estimated Delivery</p>
//                   <p className="font-medium text-gray-800">3-5 business days</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Free Shipping</p>
//                   <p className="font-medium text-green-600">On orders above ₹500</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Return Policy</p>
//                   <p className="font-medium text-gray-800">7 days easy returns</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500">Cash on Delivery</p>
//                   <p className="font-medium text-gray-800">Available</p>
//                 </div>
//               </div>
//             </div>

//             {/* Features */}
//             <div className="mt-6 flex gap-4 text-sm">
//               <div className="flex items-center gap-2">
//                 <ShieldCheckIcon className="w-4 h-4 text-green-600" />
//                 <span className="text-gray-600">Secure Payment</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <ArrowPathIcon className="w-4 h-4 text-blue-600" />
//                 <span className="text-gray-600">Easy Returns</span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <ClockIcon className="w-4 h-4 text-orange-600" />
//                 <span className="text-gray-600">24/7 Support</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Product Tabs */}
//         <div className="mt-12">
//           <div className="border-b border-gray-200 flex flex-wrap gap-6">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`px-4 py-3 text-sm font-semibold transition-all ${
//                   activeTab === tab.id
//                     ? 'text-purple-600 border-b-2 border-purple-600'
//                     : 'text-gray-500 hover:text-purple-600'
//                 }`}
//               >
//                 {tab.label}
//               </button>
//             ))}
//           </div>
//           <div className="py-6">
//             {/* Description Tab */}
//             {activeTab === 'description' && (
//               <div className="prose max-w-none">
//                 <p className="text-gray-600">{product.description || 'No description available.'}</p>
//                 {product.features && typeof product.features === 'string' && (
//                   <div className="mt-4">
//                     <h3 className="font-semibold text-gray-800 mb-2">Key Features</h3>
//                     <ul className="list-disc list-inside text-gray-600">
//                       {product.features.split(',').map((feature, idx) => (
//                         <li key={idx}>{feature.trim()}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Specifications Tab */}
//             {activeTab === 'specifications' && (
//               <div className="grid md:grid-cols-2 gap-4">
//                 {product.brand && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Brand</span>
//                     <span className="text-gray-800 font-medium">{product.brand}</span>
//                   </div>
//                 )}
//                 <div className="flex py-2 border-b">
//                   <span className="w-32 text-gray-500">Category</span>
//                   <span className="text-gray-800 font-medium capitalize">{product.category}</span>
//                 </div>
//                 {product.sub_category && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Sub Category</span>
//                     <span className="text-gray-800 font-medium capitalize">{product.sub_category}</span>
//                   </div>
//                 )}
//                 {product.model && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Model</span>
//                     <span className="text-gray-800 font-medium">{product.model}</span>
//                   </div>
//                 )}
//                 {product.material && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Material</span>
//                     <span className="text-gray-800 font-medium">{product.material}</span>
//                   </div>
//                 )}
//                 {product.weight && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Weight</span>
//                     <span className="text-gray-800 font-medium">{product.weight}</span>
//                   </div>
//                 )}
//                 {product.dimensions && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Dimensions</span>
//                     <span className="text-gray-800 font-medium">{product.dimensions}</span>
//                   </div>
//                 )}
//                 {product.warranty && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Warranty</span>
//                     <span className="text-gray-800 font-medium">{product.warranty}</span>
//                   </div>
//                 )}
//                 {product.hasSizes && product.sizes && product.sizes.length > 0 && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Sizes</span>
//                     <span className="text-gray-800 font-medium">{product.sizes.join(', ')}</span>
//                   </div>
//                 )}
//                 {product.hasColors && product.colors && product.colors.length > 0 && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">Colors</span>
//                     <span className="text-gray-800 font-medium">
//                       {product.colors.map(c => (typeof c === 'object' ? c.name : c)).join(', ')}
//                     </span>
//                   </div>
//                 )}
//                 <div className="flex py-2 border-b">
//                   <span className="w-32 text-gray-500">Stock</span>
//                   <span className="text-gray-800 font-medium">{product.stock} units</span>
//                 </div>
//                 {product.sku && (
//                   <div className="flex py-2 border-b">
//                     <span className="w-32 text-gray-500">SKU</span>
//                     <span className="text-gray-800 font-medium">{product.sku}</span>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Reviews Tab */}
//             {activeTab === 'reviews' && (
//               <div>
//                 <div className="flex items-center gap-4 mb-6">
//                   <div className="text-center">
//                     <div className="text-4xl font-bold text-gray-800">{product.rating || 4.5}</div>
//                     <div className="flex items-center gap-1 mt-1">{renderStars(product.rating)}</div>
//                     <div className="text-sm text-gray-500 mt-1">{product.review_count || 128} reviews</div>
//                   </div>
//                   <div className="flex-1">
//                     <div className="space-y-2">
//                       {[5, 4, 3, 2, 1].map((star) => (
//                         <div key={star} className="flex items-center gap-2">
//                           <span className="text-sm w-8">{star}★</span>
//                           <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
//                             <div
//                               className="h-full bg-yellow-400 rounded-full"
//                               style={{ width: `${star === 5 ? 70 : star === 4 ? 20 : star === 3 ? 5 : star === 2 ? 3 : 2}%` }}
//                             />
//                           </div>
//                           <span className="text-sm text-gray-500 w-12">
//                             {star === 5 ? '70%' : star === 4 ? '20%' : star === 3 ? '5%' : star === 2 ? '3%' : '2%'}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="space-y-4">
//                   {[1, 2, 3].map((review) => (
//                     <div key={review} className="border-b pb-4">
//                       <div className="flex items-center gap-2 mb-2">
//                         <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
//                           <span className="text-purple-600 font-semibold text-sm">U</span>
//                         </div>
//                         <div>
//                           <div className="font-medium text-gray-800">User{review}</div>
//                           <div className="flex items-center gap-1">
//                             {renderStars(4 + (review % 2))}
//                             <span className="text-xs text-gray-400 ml-2">2 days ago</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-gray-600 text-sm">Great product! Exactly as described. Fast shipping and good quality.</p>
//                     </div>
//                   ))}
//                 </div>
//                 <button className="mt-6 px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
//                   Write a Review
//                 </button>
//               </div>
//             )}

//             {/* Shipping Tab */}
//             {activeTab === 'shipping' && (
//               <div className="space-y-4">
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Shipping Information</h3>
//                   <p className="text-gray-600">Free standard shipping on all orders above ₹500. Delivery typically takes 3-5 business days.</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Return Policy</h3>
//                   <p className="text-gray-600">Easy returns within 7 days of delivery. Items must be unused and in original packaging.</p>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-2">Cash on Delivery</h3>
//                   <p className="text-gray-600">COD available for orders up to ₹10,000. Small convenience fee may apply.</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
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
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

// REAL IMPORTS - Fix these paths based on your project structure
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getProductById } from '@/services/productService';
import { useCart } from '@/hooks/useCart';
import {
  addToWishlistAsync,
  removeFromWishlistAsync,
  toggleWishlistLocal,
  fetchWishlist,
} from '@/store/slices/wishlistSlice';

const normalizeProduct = (product) => {
  if (!product) return null;

  let colors = [];
  let sizes = [];
  let hasColors = false;
  let hasSizes = false;

  // Normalize colors - handle array, JSON string, null, invalid JSON
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

  // Normalize sizes - handle array, JSON string, null, invalid JSON
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

  // Handle snake_case from backend
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

  // Build image array from all available image fields
  const productImages = [
    product?.image_url,
    product?.image_url_2,
    product?.image_url_3,
    product?.image_url_4,
    product?.image_url_5,
  ].filter(img => img && img.trim() !== '');

  const hasMultipleImages = productImages.length > 1;
  
  // CRITICAL FIX: Get current main image based on selected color
  const getCurrentMainImage = () => {
    // Priority 1: If color has specific image, use it
    if (selectedColorObj && selectedColorObj.image) {
      console.log('Using color image:', selectedColorObj.image);
      return selectedColorObj.image;
    }
    
    // Priority 2: Try to find color-specific image from product images
    if (selectedColor) {
      const colorLower = selectedColor.toLowerCase();
      const matchingImage = productImages.find(img => 
        img && img.toLowerCase().includes(colorLower)
      );
      if (matchingImage) {
        console.log('Found matching image for color:', selectedColor, matchingImage);
        return matchingImage;
      }
    }
    
    // Priority 3: Use selected gallery image
    if (productImages[selectedImage]) {
      return productImages[selectedImage];
    }
    
    // Priority 4: Fallback to main product image
    return product?.image_url;
  };
  
  const mainImage = getCurrentMainImage();

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

  // Initialize color selection and image mapping
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
      
      // If the first color has an image, use it
      if (firstColorObj && firstColorObj.image) {
        setSelectedImage(-1);
      }
    }
  }, [product]);

  // Auto-rotate images
  useEffect(() => {
    const shouldAutoRotate = hasMultipleImages && !isDragging && !isRotating && !showZoom && !selectedColorObj?.image;
    if (shouldAutoRotate) {
      setIsRotating(true);
      rotationInterval.current = setInterval(() => {
        setSelectedImage((prev) => (prev + 1) % productImages.length);
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
        
        // Debug: Log color data to console
        console.log('Product loaded:', {
          name: normalized.name,
          hasColors: normalized.hasColors,
          colors: normalized.colors,
          image_url: normalized.image_url,
          image_url_2: normalized.image_url_2
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

  // CRITICAL FIX: Handle color selection and change image
  const handleColorChange = (colorName, colorObj = null) => {
    console.log('Color selected:', colorName, colorObj);
    
    setSelectedColor(colorName);
    setSelectedColorObj(colorObj);
    
    // Change image based on selected color
    if (colorObj && colorObj.image) {
      // If color has specific image URL, use it
      console.log('Using color-specific image:', colorObj.image);
      setSelectedImage(-1); // Use -1 to indicate using color image
    } else {
      // Try to find image that matches color name in the URL
      const colorLower = colorName.toLowerCase();
      const matchingIndex = productImages.findIndex((img, idx) => {
        if (!img) return false;
        return img.toLowerCase().includes(colorLower);
      });
      
      if (matchingIndex !== -1) {
        console.log('Found matching image at index:', matchingIndex);
        setSelectedImage(matchingIndex);
      } else {
        // Fallback to first image
        console.log('No matching image found, using first image');
        setSelectedImage(0);
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
        setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
      } else {
        setSelectedImage((prev) => (prev + 1) % productImages.length);
      }
      setDragStart(e.clientX);
    }
  };

  const handleDragEnd = () => setIsDragging(false);

  const getColorCode = (colorName) => {
    const colorMap = {
      Red: '#ef4444',
      Blue: '#3b82f6',
      Black: '#1f2937',
      White: '#ffffff',
      Gold: '#fbbf24',
      Silver: '#9ca3af',
      Green: '#22c55e',
      Purple: '#9333ea',
      Pink: '#ec4899',
      Yellow: '#eab308',
      Orange: '#f97316',
      Brown: '#78350f',
      Gray: '#6b7280',
    };
    return colorMap[colorName] || '#cccccc';
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
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20 text-center py-20">
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
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-purple-600">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-purple-600">Products</a>
            <span>/</span>
            <span className="text-purple-600 font-medium">{product.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images Gallery with Zoom */}
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
                  {/* Zoom overlay */}
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
                    draggable={false}
                    key={mainImage}
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
                  {/* Navigation arrows */}
                  {hasMultipleImages && !showZoom && !selectedColorObj?.image && (
                    <>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
                      >
                        <ChevronLeftIcon className="w-6 h-6 text-gray-700" />
                      </button>
                      <button
                        onClick={() => setSelectedImage((prev) => (prev + 1) % productImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white shadow-md transition"
                      >
                        <ChevronRightIcon className="w-6 h-6 text-gray-700" />
                      </button>
                    </>
                  )}
                </div>
              </div>
              {/* Thumbnail Gallery */}
              {hasMultipleImages && !selectedColorObj?.image && (
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
                      <img src={img} alt={`${product.name} - ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              {/* Color image indicator */}
              {selectedColorObj?.image && (
                <div className="text-center mt-4 text-sm text-purple-600">
                  Showing {selectedColor} variant
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {product.brand && (
                <div className="mb-2">
                  <span className="text-sm text-purple-600 font-semibold">{product.brand}</span>
                </div>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1">{renderStars(product.rating)}</div>
                <span className="text-sm font-semibold text-amber-600">{product.rating || 4.5}</span>
                <span className="text-sm text-blue-600">{product.review_count || 128} ratings</span>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckIcon className="w-4 h-4" />
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Price */}
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

              {/* Size Selector */}
              {product.hasSizes && product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold text-gray-700">Select Size</label>
                    <button className="text-xs text-purple-600 hover:underline flex items-center gap-1">
                      <ScaleIcon className="w-3 h-3" /> Size Chart
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
                  {selectedSize && <p className="text-xs text-gray-500 mt-2">Selected: {selectedSize}</p>}
                </div>
              )}

              {/* Color Selector - THIS WILL NOW CHANGE THE IMAGE */}
              {product.hasColors && product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="text-sm font-semibold text-gray-700 mb-3 block">Select Color</label>
                  <div className="flex gap-3 flex-wrap">
                    {product.colors.map((color) => {
                      const colorName = typeof color === 'object' ? color.name : color;
                      const colorCode = typeof color === 'object' ? color.code : getColorCode(colorName);
                      const isSelected = selectedColor === colorName;
                      
                      return (
                        <button
                          key={colorName}
                          onClick={() => handleColorChange(colorName, typeof color === 'object' ? color : null)}
                          className={`relative w-12 h-12 rounded-full transition-all ${
                            isSelected
                              ? 'ring-2 ring-purple-600 ring-offset-2 scale-110'
                              : 'hover:scale-105'
                          }`}
                          style={{ backgroundColor: colorCode }}
                          title={colorName}
                        >
                          {isSelected && (
                            <CheckIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 text-white drop-shadow" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {selectedColor && (
                    <p className="text-xs text-gray-500 mt-2">
                      Selected: {selectedColor}
                      {selectedColorObj?.image && (
                        <span className="text-purple-600 ml-2">✓ Color variant image loaded</span>
                      )}
                    </p>
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
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition"
                    >
                      <MinusIcon className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white transition"
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">{product.stock - quantity} items left</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || product.stock === 0}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3.5 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 transition"
                >
                  {adding ? (
                    <>
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
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
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  {isInWishlist ? <HeartSolidIcon className="h-5 w-5" /> : <HeartIcon className="h-5 w-5 text-gray-600" />}
                </motion.button>
                <div className="relative">
                  <button
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className="p-3.5 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition"
                  >
                    <ShareIcon className="h-5 w-5 text-gray-600" />
                  </button>
                  {showShareMenu && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setShowShareMenu(false)} />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border z-50">
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

              {/* Features */}
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

          {/* Product Tabs */}
          <div className="mt-12">
            <div className="border-b border-gray-200 flex flex-wrap gap-6">
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
            <div className="py-6">
              {/* Description Tab */}
              {activeTab === 'description' && (
                <div className="prose max-w-none">
                  <p className="text-gray-600">{product.description || 'No description available.'}</p>
                </div>
              )}

              {/* Specifications Tab */}
              {activeTab === 'specifications' && (
                <div className="grid md:grid-cols-2 gap-4">
                  {product.brand && (
                    <div className="flex py-2 border-b">
                      <span className="w-32 text-gray-500">Brand</span>
                      <span className="text-gray-800 font-medium">{product.brand}</span>
                    </div>
                  )}
                  <div className="flex py-2 border-b">
                    <span className="w-32 text-gray-500">Category</span>
                    <span className="text-gray-800 font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex py-2 border-b">
                    <span className="w-32 text-gray-500">Stock</span>
                    <span className="text-gray-800 font-medium">{product.stock} units</span>
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-800">{product.rating || 4.5}</div>
                      <div className="flex items-center gap-1 mt-1">{renderStars(product.rating)}</div>
                      <div className="text-sm text-gray-500 mt-1">{product.review_count || 128} reviews</div>
                    </div>
                  </div>
                  <button className="mt-6 px-6 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition">
                    Write a Review
                  </button>
                </div>
              )}

              {/* Shipping Tab */}
              {activeTab === 'shipping' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Shipping Information</h3>
                    <p className="text-gray-600">Free standard shipping on all orders above ₹500. Delivery typically takes 3-5 business days.</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Return Policy</h3>
                    <p className="text-gray-600">Easy returns within 7 days of delivery. Items must be unused and in original packaging.</p>
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