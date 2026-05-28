// import { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import { ShoppingCartIcon, HeartIcon, StarIcon } from '@heroicons/react/outline';
// import { StarIcon as StarSolidIcon } from '@heroicons/react/solid';
// import toast from 'react-hot-toast';
// import { addToCart } from '../../store/slices/cartSlice';
// import Image from 'next/image';

// const ProductDetails = ({ product }) => {
//     const [quantity, setQuantity] = useState(1);
//     const [selectedImage, setSelectedImage] = useState(0);
//     const [activeTab, setActiveTab] = useState('description');
//     const dispatch = useDispatch();

//     const handleAddToCart = () => {
//         dispatch(addToCart({ ...product, quantity }));
//         toast.success(`${quantity} × ${product.name} added to cart!`);
//     };

//     const renderStars = (rating) => {
//         return (
//             <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                     <span key={i}>
//                         {i < Math.floor(rating) ? (
//                             <StarSolidIcon className="w-5 h-5 text-yellow-400" />
//                         ) : (
//                             <StarIcon className="w-5 h-5 text-gray-300" />
//                         )}
//                     </span>
//                 ))}
//                 <span className="ml-2 text-gray-600">({rating})</span>
//             </div>
//         );
//     };

//     const productImages = product.images || [product.image_url];

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//                 {/* Product Images */}
//                 <motion.div
//                     initial={{ opacity: 0, x: -50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <div className="bg-gray-100 rounded-2xl overflow-hidden mb-4 h-96">
//                         <img
//                             src={productImages[selectedImage] || 'https://via.placeholder.com/500x500'}
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                         />
//                     </div>
//                     {productImages.length > 1 && (
//                         <div className="flex space-x-4">
//                             {productImages.map((img, idx) => (
//                                 <button
//                                     key={idx}
//                                     onClick={() => setSelectedImage(idx)}
//                                     className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
//                                         selectedImage === idx ? 'border-blue-600' : 'border-transparent'
//                                     }`}
//                                 >
//                                     <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
//                                 </button>
//                             ))}
//                         </div>
//                     )}
//                 </motion.div>

//                 {/* Product Info */}
//                 <motion.div
//                     initial={{ opacity: 0, x: 50 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5 }}
//                 >
//                     <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
                    
//                     {product.rating && (
//                         <div className="flex items-center mb-4">
//                             {renderStars(product.rating)}
//                             <span className="text-gray-500 ml-2">({product.num_reviews} reviews)</span>
//                         </div>
//                     )}

//                     <div className="mb-4">
//                         <span className="text-3xl font-bold text-blue-600">₹{product.price.toLocaleString()}</span>
//                         {product.original_price && (
//                             <span className="text-lg text-gray-400 line-through ml-2">
//                                 ₹{product.original_price.toLocaleString()}
//                             </span>
//                         )}
//                     </div>

//                     <div className="mb-6">
//                         <p className="text-gray-600">{product.description}</p>
//                     </div>

//                     {/* Stock Status */}
//                     <div className="mb-6">
//                         {product.stock > 0 ? (
//                             <span className="text-green-600 font-semibold">✓ In Stock ({product.stock} available)</span>
//                         ) : (
//                             <span className="text-red-600 font-semibold">✗ Out of Stock</span>
//                         )}
//                     </div>

//                     {/* Quantity Selector */}
//                     {product.stock > 0 && (
//                         <div className="mb-6">
//                             <label className="block text-gray-700 mb-2">Quantity:</label>
//                             <div className="flex items-center space-x-3">
//                                 <button
//                                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                                     className="w-10 h-10 border rounded-lg hover:bg-gray-100"
//                                 >
//                                     -
//                                 </button>
//                                 <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
//                                 <button
//                                     onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
//                                     className="w-10 h-10 border rounded-lg hover:bg-gray-100"
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* Action Buttons */}
//                     <div className="flex space-x-4 mb-8">
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             onClick={handleAddToCart}
//                             disabled={product.stock === 0}
//                             className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             Add to Cart
//                         </motion.button>
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-6 py-3 border-2 border-gray-300 rounded-xl hover:border-red-500 transition"
//                         >
//                             <HeartIcon className="w-6 h-6" />
//                         </motion.button>
//                     </div>

//                     {/* Product Tabs */}
//                     <div className="border-t pt-6">
//                         <div className="flex space-x-4 mb-4">
//                             {['description', 'specifications', 'reviews'].map((tab) => (
//                                 <button
//                                     key={tab}
//                                     onClick={() => setActiveTab(tab)}
//                                     className={`px-4 py-2 font-semibold capitalize ${
//                                         activeTab === tab
//                                             ? 'text-blue-600 border-b-2 border-blue-600'
//                                             : 'text-gray-500'
//                                     }`}
//                                 >
//                                     {tab}
//                                 </button>
//                             ))}
//                         </div>
//                         <div className="text-gray-600">
//                             {activeTab === 'description' && product.description}
//                             {activeTab === 'specifications' && (
//                                 <ul className="list-disc list-inside space-y-2">
//                                     <li>Brand: {product.brand || 'N/A'}</li>
//                                     <li>Category: {product.category}</li>
//                                     <li>SKU: {product.sku || 'N/A'}</li>
//                                 </ul>
//                             )}
//                             {activeTab === 'reviews' && (
//                                 <p>No reviews yet. Be the first to review!</p>
//                             )}
//                         </div>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetails;

'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { StarIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon, HeartIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/utils/formatters';
import { useCart } from '@/hooks/useCart';


export const ProductDetails = ({ product, relatedProducts }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const images = product?.images || [product?.image];
  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const colors = ['Red', 'Blue', 'Green', 'Black', 'White'];

  const handleAddToCart = async () => {
    if (product.hasSize && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    if (product.hasColor && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    setIsAdding(true);
    try {
      await addItem({
        ...product,
        quantity,
        selectedSize,
        selectedColor,
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
        {halfStar && (
          <div className="relative">
            <StarIcon className="h-5 w-5 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <StarIcon className="h-5 w-5 text-yellow-400 fill-current" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
      </div>
    );
  };

  const features = [
    { icon: TruckIcon, text: 'Free Shipping on orders over ₹999' },
    { icon: ShieldCheckIcon, text: '1 Year Warranty' },
    { icon: ArrowPathIcon, text: '30 Days Return Policy' },
  ];

  if (!product) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="relative h-96 lg:h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          
          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-blue-600' : 'border-transparent'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${idx + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            {renderStars(product.rating || 4.5)}
            <span className="text-gray-600">({product.reviews || 128} reviews)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-blue-600">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="ml-2 text-lg text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="ml-2 text-green-600">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Size Selection */}
          {product.hasSize && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Size
              </label>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg border-2 font-semibold transition-colors ${
                      selectedSize === size
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Selection */}
          {product.hasColor && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Color
              </label>
              <div className="flex gap-3">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                      selectedColor === color
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-300 hover:border-blue-600'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="w-12 text-center text-lg font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
              <span className="text-gray-600 ml-2">({product.stock || 100} available)</span>
            </div>
          </div>

          {/* Stock Status */}
          {product.stock > 0 ? (
            <div className="mb-6">
              <span className="text-green-600 text-sm">✓ In Stock</span>
            </div>
          ) : (
            <div className="mb-6">
              <span className="text-red-600 text-sm">✗ Out of Stock</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Button
              onClick={handleAddToCart}
              variant="primary"
              size="lg"
              isLoading={isAdding}
              disabled={product.stock <= 0 || isAdding}
              className="flex-1"
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="lg">
              <HeartIcon className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4">Why buy from us?</h3>
            <div className="space-y-3">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div key={idx} className="flex items-center gap-3 text-gray-600">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} showQuickView={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};