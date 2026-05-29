// app/admin/products/new/page.jsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  PhotoIcon, 
  TrashIcon, 
  PlusIcon,
  SwatchIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { createProduct } from '@/services/productService';
import { useToast } from '@/hooks/useToast';

const ImageUploader = ({ images, onChange, maxImages = 5 }) => {
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
          };
          reader.readAsDataURL(file);
        } else {
          showToast(`Maximum ${maxImages} images allowed`, 'error');
          break;
        }
      }
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Images
            <span className="text-xs text-gray-500 ml-2">(Max {maxImages} images)</span>
            <span className="text-red-500 ml-1">*</span>
          </label>
        </div>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <PlusIcon className="w-4 h-4 inline mr-1" />
          Upload Images
        </button>
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
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
              <img
                src={image.url}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {index === 0 && (
                <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                  Main
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
              >
                <TrashIcon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );
};

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  
  // ✅ Toggle switches - Default based on category
  const [enableColors, setEnableColors] = useState(true);
  const [enableSizes, setEnableSizes] = useState(false); // Default OFF for electronics
  
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    compare_price: '',
    stock: '',
    category: '',
    brand: '',
    colors: [],
    sizes: []
  });

  // 🎯 Auto-set toggles based on category
  useEffect(() => {
    const category = selectedCategory.toLowerCase();
    
    // Clothing categories - has sizes
    if (category.includes('clothing') || category.includes('shirt') || category.includes('dress') || category.includes('jeans')) {
      setEnableSizes(true);
      setEnableColors(true);
    } 
    // Footwear - has sizes
    else if (category.includes('shoe') || category.includes('footwear')) {
      setEnableSizes(true);
      setEnableColors(true);
    }
    // Electronics - no sizes
    else if (category.includes('electronic') || category.includes('phone') || category.includes('laptop')) {
      setEnableSizes(false);
      setEnableColors(true);
    }
    // Default
    else {
      setEnableSizes(false);
      setEnableColors(true);
    }
  }, [selectedCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') {
      setSelectedCategory(value);
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const addColor = () => {
    const colorName = document.getElementById('colorName')?.value;
    const colorCode = document.getElementById('colorCode')?.value;
    
    if (colorName && colorCode) {
      // Check if color already exists
      const exists = formData.colors.some(c => c.name === colorName);
      if (!exists) {
        setFormData(prev => ({ 
          ...prev, 
          colors: [...prev.colors, { name: colorName, code: colorCode }] 
        }));
        showToast(`${colorName} added`, 'success');
      } else {
        showToast(`${colorName} already exists`, 'error');
      }
      document.getElementById('colorName').value = '';
    } else {
      showToast('Please enter color name', 'error');
    }
  };

  const removeColor = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      colors: prev.colors.filter((_, i) => i !== index) 
    }));
  };

  const addSize = () => {
    const sizeName = document.getElementById('sizeName')?.value;
    
    if (sizeName) {
      const exists = formData.sizes.includes(sizeName);
      if (!exists) {
        setFormData(prev => ({ ...prev, sizes: [...prev.sizes, sizeName] }));
        showToast(`${sizeName} added`, 'success');
      } else {
        showToast(`${sizeName} already exists`, 'error');
      }
      document.getElementById('sizeName').value = '';
    } else {
      showToast('Please enter size', 'error');
    }
  };

  const removeSize = (index) => {
    setFormData(prev => ({ 
      ...prev, 
      sizes: prev.sizes.filter((_, i) => i !== index) 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) {
      showToast('Please enter product name', 'error');
      return;
    }
    
    if (!formData.price) {
      showToast('Please enter product price', 'error');
      return;
    }
    
    if (!formData.stock) {
      showToast('Please enter stock quantity', 'error');
      return;
    }

    if (images.length === 0) {
      showToast('Please add at least one product image', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null,
        hasColors: enableColors && formData.colors.length > 0,
        hasSizes: enableSizes && formData.sizes.length > 0,
        colors: enableColors ? formData.colors : [],
        sizes: enableSizes ? formData.sizes : []
      };

      images.forEach((image, index) => {
        productData[`image_url${index === 0 ? '' : `_${index + 1}`}`] = image.url;
      });

      await createProduct(productData);
      showToast('Product created successfully!', 'success');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to create product', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const colorPresets = [
    { name: "Red", code: "#FF0000" },
    { name: "Blue", code: "#0000FF" },
    { name: "Black", code: "#000000" },
    { name: "White", code: "#FFFFFF" },
    { name: "Green", code: "#00FF00" },
    { name: "Purple", code: "#800080" }
  ];

  return (
    <div className="max-w-5xl mx-auto pb-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-500 text-sm mt-1">Create a new product with colors and sizes</p>
        </div>
        <Link href="/admin/products" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          Back to Products
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mobile Phones">Mobile Phones</option>
                  <option value="Men's Clothing">Men's Clothing</option>
                  <option value="Women's Clothing">Women's Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>
              <FormInput label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand name" />
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Pricing & Stock</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormInput label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="0.00" />
            <FormInput label="Compare Price (MRP)" name="compare_price" type="number" value={formData.compare_price} onChange={handleChange} placeholder="0.00" />
            <FormInput label="Stock Quantity" name="stock" type="number" value={formData.stock} onChange={handleChange} required placeholder="0" />
          </div>
        </div>

        {/* 🎯 PRODUCT VARIANTS - Toggle Switches */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Product Variants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <SwatchIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Enable Colors</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Show color options for this product</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableColors}
                  onChange={(e) => {
                    setEnableColors(e.target.checked);
                    if (!e.target.checked) {
                      setFormData(prev => ({ ...prev, colors: [] }));
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>

            {/* Size Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center gap-2">
                  <ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" />
                  <span className="font-medium text-gray-700">Enable Sizes</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Show size options for this product</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableSizes}
                  onChange={(e) => {
                    setEnableSizes(e.target.checked);
                    if (!e.target.checked) {
                      setFormData(prev => ({ ...prev, sizes: [] }));
                    }
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* 🎯 COLORS SECTION - Only shows if enabled */}
        {enableColors && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <SwatchIcon className="w-5 h-5 text-purple-600" />
              Colors
            </h2>
            
            {/* Color Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Color Presets</label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const exists = formData.colors.some(c => c.name === color.name);
                      if (!exists) {
                        setFormData(prev => ({ 
                          ...prev, 
                          colors: [...prev.colors, { name: color.name, code: color.code }] 
                        }));
                        showToast(`${color.name} added`, 'success');
                      } else {
                        showToast(`${color.name} already added`, 'error');
                      }
                    }}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Selected Colors */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Colors ({formData.colors.length})</label>
              <div className="flex flex-wrap gap-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.code }} />
                    <span className="text-sm">{color.name}</span>
                    <button type="button" onClick={() => removeColor(index)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {formData.colors.length === 0 && (
                  <p className="text-gray-500 text-sm">No colors selected. Click on color presets above to add.</p>
                )}
              </div>
            </div>

            {/* Add Custom Color */}
            <div className="flex gap-2">
              <input
                type="text"
                id="colorName"
                placeholder="Color name (e.g., Navy Blue)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="color"
                id="colorCode"
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                defaultValue="#000000"
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {/* 🎯 SIZES SECTION - Only shows if enabled */}
        {enableSizes && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" />
              Sizes
            </h2>
            
            {/* Size Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Size Presets</label>
              <div className="flex flex-wrap gap-2">
                {["XS", "S", "M", "L", "XL", "XXL", "3XL", "6", "7", "8", "9", "10", "11", "12"].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      const exists = formData.sizes.includes(size);
                      if (!exists) {
                        setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
                        showToast(`${size} added`, 'success');
                      } else {
                        showToast(`${size} already added`, 'error');
                      }
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-purple-100"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Sizes */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Sizes ({formData.sizes.length})</label>
              <div className="flex flex-wrap gap-2">
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
                    <span className="text-sm">{size}</span>
                    <button type="button" onClick={() => removeSize(index)} className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                {formData.sizes.length === 0 && (
                  <p className="text-gray-500 text-sm">No sizes selected. Click on size presets above to add.</p>
                )}
              </div>
            </div>

            {/* Add Custom Size */}
            <div className="flex gap-2">
              <input
                type="text"
                id="sizeName"
                placeholder="Size (e.g., 2XL, 42, One Size)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="button"
                onClick={addSize}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Add Size
              </button>
            </div>
          </div>
        )}

        {/* Product Images */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Product Images</h2>
          <ImageUploader images={images} onChange={setImages} maxImages={5} />
        </div>

        {/* Description */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Description</h2>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Detailed product description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-4">
          <Link href="/admin/products" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50"
          >
            {submitting ? 'Creating...' : 'Create Product'}
          </button>
        </div>
      </form>
    </div>
  );
}