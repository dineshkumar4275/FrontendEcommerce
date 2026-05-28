// // // components/admin/ProductForm.jsx
// // 'use client';

// // import { useState } from 'react';
// // import { FormInput } from './FormInput';
// // import { ImageUploader } from './ImageUploader';

// // export const ProductForm = ({ 
// //   initialData = {}, 
// //   onSubmit, 
// //   onCancel, 
// //   isEditing = false,
// //   isLoading = false 
// // }) => {
// //   const [formData, setFormData] = useState({
// //     name: initialData.name || '',
// //     description: initialData.description || '',
// //     price: initialData.price || '',
// //     compare_price: initialData.compare_price || '',
// //     stock: initialData.stock || '',
// //     category: initialData.category || '',
// //     brand: initialData.brand || '',
// //     model: initialData.model || '',
// //     warranty: initialData.warranty || '1 Year',
// //     weight: initialData.weight || '',
// //     dimensions: initialData.dimensions || '',
// //     material: initialData.material || '',
// //     features: initialData.features || '',
// //     is_featured: initialData.is_featured || false,
// //     meta_title: initialData.meta_title || '',
// //     meta_description: initialData.meta_description || '',
// //   });

// //   const [images, setImages] = useState(() => {
// //     const imageUrls = [];
// //     for (let i = 1; i <= 5; i++) {
// //       const url = initialData[`image_url_${i}`] || initialData[`image_url${i === 1 ? '' : `_${i}`}`];
// //       if (url) {
// //         imageUrls.push({ url, isUrl: true });
// //       }
// //     }
// //     return imageUrls;
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
// //     setFormData(prev => ({
// //       ...prev,
// //       [name]: type === 'checkbox' ? checked : value
// //     }));
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Prepare product data with 5 images
// //     const productData = {
// //       ...formData,
// //       price: parseFloat(formData.price),
// //       stock: parseInt(formData.stock),
// //       compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
// //     };

// //     // Add 5 image URLs
// //     images.forEach((image, index) => {
// //       const fieldName = `image_url${index === 0 ? '' : `_${index + 1}`}`;
// //       productData[fieldName] = image.url;
// //     });

// //     // Clear remaining image fields
// //     for (let i = images.length + 1; i <= 5; i++) {
// //       const fieldName = `image_url${i === 1 ? '' : `_${i}`}`;
// //       productData[fieldName] = '';
// //     }

// //     onSubmit(productData);
// //   };

// //   const categories = [
// //     'Electronics', 'Clothing', 'Books', 'Home & Living', 
// //     'Sports', 'Toys', 'Beauty', 'Jewelry', 'Automotive', 'Other'
// //   ];

// //   return (
// //     <form onSubmit={handleSubmit} className="space-y-6">
// //       {/* Basic Information */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-lg font-bold mb-4">Basic Information</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <FormInput
// //             label="Product Name"
// //             name="name"
// //             value={formData.name}
// //             onChange={handleChange}
// //             required
// //             className="md:col-span-2"
// //           />
// //           <FormInput
// //             label="Category"
// //             name="category"
// //             value={formData.category}
// //             onChange={handleChange}
// //             required
// //             type="select"
// //           />
// //           <div>
// //             <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
// //             <select
// //               name="category"
// //               value={formData.category}
// //               onChange={handleChange}
// //               required
// //               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
// //             >
// //               <option value="">Select Category</option>
// //               {categories.map(cat => (
// //                 <option key={cat} value={cat}>{cat}</option>
// //               ))}
// //             </select>
// //           </div>
// //           <FormInput
// //             label="Price (₹)"
// //             name="price"
// //             type="number"
// //             value={formData.price}
// //             onChange={handleChange}
// //             required
// //           />
// //           <FormInput
// //             label="Compare Price (MRP)"
// //             name="compare_price"
// //             type="number"
// //             value={formData.compare_price}
// //             onChange={handleChange}
// //             placeholder="Original price for discount display"
// //           />
// //           <FormInput
// //             label="Stock Quantity"
// //             name="stock"
// //             type="number"
// //             value={formData.stock}
// //             onChange={handleChange}
// //             required
// //           />
// //           <FormInput
// //             label="Brand"
// //             name="brand"
// //             value={formData.brand}
// //             onChange={handleChange}
// //           />
// //           <FormInput
// //             label="Model"
// //             name="model"
// //             value={formData.model}
// //             onChange={handleChange}
// //           />
// //           <FormInput
// //             type="checkbox"
// //             label="Featured Product"
// //             name="is_featured"
// //             value={formData.is_featured}
// //             onChange={handleChange}
// //           />
// //         </div>
// //       </div>

// //       {/* Product Images - 5 Images */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <ImageUploader
// //           images={images}
// //           onChange={setImages}
// //           maxImages={5}
// //           label="Product Images (Up to 5 images)"
// //         />
// //       </div>

// //       {/* Description */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-lg font-bold mb-4">Description</h2>
// //         <FormInput
// //           type="textarea"
// //           name="description"
// //           value={formData.description}
// //           onChange={handleChange}
// //           rows={6}
// //           placeholder="Detailed product description..."
// //         />
// //       </div>

// //       {/* Specifications */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-lg font-bold mb-4">Specifications</h2>
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <FormInput
// //             label="Warranty"
// //             name="warranty"
// //             value={formData.warranty}
// //             onChange={handleChange}
// //             placeholder="e.g., 1 Year, 2 Years"
// //           />
// //           <FormInput
// //             label="Weight"
// //             name="weight"
// //             value={formData.weight}
// //             onChange={handleChange}
// //             placeholder="e.g., 500g, 2kg"
// //           />
// //           <FormInput
// //             label="Dimensions"
// //             name="dimensions"
// //             value={formData.dimensions}
// //             onChange={handleChange}
// //             placeholder="e.g., 10x20x5 cm"
// //           />
// //           <FormInput
// //             label="Material"
// //             name="material"
// //             value={formData.material}
// //             onChange={handleChange}
// //             placeholder="e.g., Cotton, Plastic, Metal"
// //           />
// //           <div className="md:col-span-2">
// //             <FormInput
// //               label="Features (comma separated)"
// //               name="features"
// //               type="textarea"
// //               rows="3"
// //               value={formData.features}
// //               onChange={handleChange}
// //               placeholder="Premium quality, Durable, Lightweight, etc."
// //             />
// //           </div>
// //         </div>
// //       </div>

// //       {/* SEO Information */}
// //       <div className="bg-white rounded-lg shadow p-6">
// //         <h2 className="text-lg font-bold mb-4">SEO Information</h2>
// //         <div className="space-y-3">
// //           <FormInput
// //             label="Meta Title"
// //             name="meta_title"
// //             value={formData.meta_title}
// //             onChange={handleChange}
// //             placeholder="SEO friendly title (60 characters)"
// //           />
// //           <FormInput
// //             label="Meta Description"
// //             name="meta_description"
// //             type="textarea"
// //             rows="2"
// //             value={formData.meta_description}
// //             onChange={handleChange}
// //             placeholder="Brief description for search engines (160 characters)"
// //           />
// //         </div>
// //       </div>

// //       {/* Submit Buttons */}
// //       <div className="flex justify-end gap-3">
// //         <button
// //           type="button"
// //           onClick={onCancel}
// //           className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
// //         >
// //           Cancel
// //         </button>
// //         <button
// //           type="submit"
// //           disabled={isLoading}
// //           className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
// //         >
// //           {isLoading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
// //         </button>
// //       </div>
// //     </form>
// //   );
// // };
// // src/components/admin/ProductForm.jsx
// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { PhotoIcon } from '@heroicons/react/24/outline';
// import toast from 'react-hot-toast';

// export function ProductForm({ initialData, onSubmit, isEditing = false }) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: initialData?.name || '',
//     description: initialData?.description || '',
//     price: initialData?.price || '',
//     compare_at_price: initialData?.compare_at_price || '',
//     category: initialData?.category || '',
//     stock: initialData?.stock || 0,
//     image_url: initialData?.image_url || '',
//     is_active: initialData?.is_active ?? true
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       await onSubmit(formData);
//       toast.success(isEditing ? 'Product updated successfully' : 'Product created successfully');
//       router.push('/admin/products');
//     } catch (error) {
//       toast.error(error.message || 'Failed to save product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//             <input
//               type="text"
//               value={formData.category}
//               onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
//             <input
//               type="number"
//               step="0.01"
//               value={formData.price}
//               onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Compare at Price (₹)</label>
//             <input
//               type="number"
//               step="0.01"
//               value={formData.compare_at_price}
//               onChange={(e) => setFormData({ ...formData, compare_at_price: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
//             <input
//               type="number"
//               value={formData.stock}
//               onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
//             <div className="relative">
//               <PhotoIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               <input
//                 type="url"
//                 value={formData.image_url}
//                 onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
//                 className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 placeholder="https://example.com/image.jpg"
//               />
//             </div>
//           </div>

//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               rows="4"
//               value={formData.description}
//               onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//             />
//           </div>

//           <div className="md:col-span-2">
//             <label className="flex items-center gap-2">
//               <input
//                 type="checkbox"
//                 checked={formData.is_active}
//                 onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
//                 className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
//               />
//               <span className="text-sm text-gray-700">Product Active</span>
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="flex gap-3 justify-end">
//         <button
//           type="button"
//           onClick={() => router.push('/admin/products')}
//           className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           disabled={loading}
//           className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
//         >
//           {loading ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
//         </button>
//       </div>
//     </form>
//   );
// }
// src/services/api/dashboardService.js
import apiClient from '@/lib/apiClient';

export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0
    };
  }
};

export const getRecentOrders = async (limit = 10) => {
  try {
    const response = await apiClient.get(`/orders/recent?limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching recent orders:', error);
    return [];
  }
};