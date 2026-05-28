// app/admin/products/[id]/edit/page.jsx
'use client';

import { useState, useEffect ,useRef} from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/useToast';
import apiClient from '@/lib/apiClient';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhotoIcon, 
  TrashIcon, 
  PlusIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

// Image Uploader Component for Edit Page
const ImageUploader = ({ images, onChange, maxImages = 5 }) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);
  const { showToast } = useToast();

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        if (newImages.length < maxImages) {
          const reader = new FileReader();
          reader.onloadend = () => {
            newImages.push({
              url: reader.result,
              file: file,
              name: file.name,
              type: 'file'
            });
            onChange(newImages);
            showToast(`${file.name} added`, 'success');
          };
          reader.readAsDataURL(file);
        } else {
          showToast(`Maximum ${maxImages} images allowed`, 'error');
          break;
        }
      } else {
        showToast('Please upload valid image files', 'error');
      }
    }
  };

  const handleUrlAdd = () => {
    const url = prompt('Enter image URL:', 'https://');
    if (url && url.trim()) {
      const newImages = [...images];
      if (newImages.length < maxImages) {
        newImages.push({
          url: url.trim(),
          type: 'url'
        });
        onChange(newImages);
        showToast('Image URL added', 'success');
      } else {
        showToast(`Maximum ${maxImages} images allowed`, 'error');
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    showToast('Image removed', 'success');
  };

  const moveImage = (index, direction) => {
    const newImages = [...images];
    if (direction === 'up' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    } else if (direction === 'down' && index < images.length - 1) {
      [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    }
    onChange(newImages);
    showToast(`Image moved ${direction}`, 'success');
  };

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      const newImages = [...images];
      const [draggedItem] = newImages.splice(draggedIndex, 1);
      newImages.splice(dropIndex, 0, draggedItem);
      onChange(newImages);
      showToast('Images reordered', 'success');
    }
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Images
            <span className="text-xs text-gray-500 ml-2">(Max {maxImages} images)</span>
          </label>
          <p className="text-xs text-gray-400 mt-1">First image will be the main product image</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-1"
          >
            <PlusIcon className="w-4 h-4" />
            Upload
          </button>
          <button
            type="button"
            onClick={handleUrlAdd}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Add URL
          </button>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileUpload}
        className="hidden"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <AnimatePresence>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              className="relative group cursor-move"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-all bg-gray-50">
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                  }}
                />
                
                <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">
                  {index + 1}
                </div>

                {index === 0 && (
                  <div className="absolute top-2 right-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-0.5 rounded-full">
                    Main
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>

                <div className="absolute bottom-2 left-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'up')}
                      className="bg-black/60 text-white p-1 rounded hover:bg-black/80"
                    >
                      <ArrowUpIcon className="w-3 h-3" />
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, 'down')}
                      className="bg-black/60 text-white p-1 rounded hover:bg-black/80"
                    >
                      <ArrowDownIcon className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {image.type === 'url' && (
                  <div className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    URL
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-all flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-purple-50"
          >
            <PhotoIcon className="w-8 h-8 text-gray-400" />
            <span className="text-xs text-gray-500">Add Image</span>
            <span className="text-[10px] text-gray-400">({images.length}/{maxImages})</span>
          </button>
        )}
      </div>
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, name, value, onChange, type = "text", required = false, placeholder = "", rows = 3 }) => {
  const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent";

  if (type === "textarea") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          className={baseClasses}
        />
      </div>
    );
  }

  if (type === "number") {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          step="0.01"
          min="0"
          className={baseClasses}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={baseClasses}
      />
    </div>
  );
};

// Main Edit Product Page
export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compare_price: '',
    stock: '',
    category: '',
    brand: '',
    model: '',
    warranty: '1 Year',
    weight: '',
    dimensions: '',
    material: '',
    features: '',
    is_featured: false,
    meta_title: '',
    meta_description: '',
  });

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      if (response.data.success) {
        const product = response.data.data;
        
        // Set form data
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price || '',
          compare_price: product.compare_price || '',
          stock: product.stock || '',
          category: product.category || '',
          brand: product.brand || '',
          model: product.model || '',
          warranty: product.warranty || '1 Year',
          weight: product.weight || '',
          dimensions: product.dimensions || '',
          material: product.material || '',
          features: product.features || '',
          is_featured: product.is_featured || false,
          meta_title: product.meta_title || '',
          meta_description: product.meta_description || '',
        });
        
        // Load images into array
        const imageUrls = [];
        for (let i = 1; i <= 5; i++) {
          const url = product[`image_url${i === 1 ? '' : `_${i}`}`];
          if (url && url.trim()) {
            imageUrls.push({ url, type: 'url' });
          }
        }
        setImages(imageUrls);
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to load product', 'error');
      router.push('/admin/products');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
      };

      // Add images to product data
      images.forEach((image, index) => {
        const fieldName = `image_url${index === 0 ? '' : `_${index + 1}`}`;
        productData[fieldName] = image.url;
      });

      // Clear remaining image fields
      for (let i = images.length + 1; i <= 5; i++) {
        const fieldName = `image_url${i === 1 ? '' : `_${i}`}`;
        productData[fieldName] = '';
      }

      const response = await apiClient.put(`/products/${id}`, productData);
      if (response.data.success) {
        showToast('Product updated successfully!', 'success');
        router.push('/admin/products');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to update product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const categories = [
    'Electronics', 'Clothing', 'Books', 'Home & Living', 
    'Sports', 'Toys', 'Beauty', 'Jewelry', 'Automotive', 'Other'
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Edit Product</h1>
          <p className="text-gray-500 text-sm mt-1">Update product information with up to 5 images</p>
        </div>
        <Link href="/admin/products">
          <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
            Back to Products
          </button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Basic Information</h2>
          <div className="space-y-4">
            <FormInput
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <FormInput
                label="Brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="Enter brand name"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Pricing & Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput
              label="Price (₹)"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="0.00"
            />
            <FormInput
              label="Compare Price (MRP)"
              name="compare_price"
              type="number"
              value={formData.compare_price}
              onChange={handleChange}
              placeholder="0.00"
            />
            <FormInput
              label="Stock Quantity"
              name="stock"
              type="number"
              value={formData.stock}
              onChange={handleChange}
              required
              placeholder="0"
            />
          </div>
        </div>

        {/* Product Images - 5 Image Uploader */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Product Images (Up to 5)</h2>
          <ImageUploader
            images={images}
            onChange={setImages}
            maxImages={5}
          />
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Description</h2>
          <FormInput
            type="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Detailed product description..."
          />
        </div>

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="Model" name="model" value={formData.model} onChange={handleChange} placeholder="Product model number" />
            <FormInput label="Warranty" name="warranty" value={formData.warranty} onChange={handleChange} placeholder="e.g., 1 Year" />
            <FormInput label="Weight" name="weight" value={formData.weight} onChange={handleChange} placeholder="e.g., 500g, 2kg" />
            <FormInput label="Dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} placeholder="e.g., 10x20x5 cm" />
            <FormInput label="Material" name="material" value={formData.material} onChange={handleChange} placeholder="e.g., Cotton, Plastic, Metal" />
            <div className="md:col-span-2">
              <FormInput type="textarea" label="Features" name="features" value={formData.features} onChange={handleChange} rows="2" placeholder="Premium quality, Durable, Lightweight, etc." />
            </div>
          </div>
        </div>

        {/* SEO & Featured */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">SEO & Featured</h2>
          <div className="space-y-4">
            <FormInput label="Meta Title" name="meta_title" value={formData.meta_title} onChange={handleChange} placeholder="SEO friendly title (60 characters max)" />
            <FormInput type="textarea" label="Meta Description" name="meta_description" value={formData.meta_description} onChange={handleChange} rows="2" placeholder="Brief description for search engines" />
            <div className="flex items-center">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-sm text-gray-700">Feature this product (display on homepage)</label>
            </div>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-3 pt-4">
          <Link
            href="/admin/products"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Product'}
          </button>
        </div>
      </form>
    </div>
  );
}