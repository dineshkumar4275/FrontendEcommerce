'use client';

import { useState, useRef } from 'react';
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

// Image Uploader Component with both Upload and URL options
const ImageUploader = ({ images, onChange, maxImages = 5 }) => {
  const fileInputRef = useRef(null);
  const [urlInput, setUrlInput] = useState('');
  const { showToast } = useToast();

  // Compress image before upload
  const compressImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Max dimension 1000px
          const maxSize = 1000;
          if (width > maxSize) {
            height = (height * maxSize) / width;
            width = maxSize;
          }
          if (height > maxSize) {
            width = (width * maxSize) / height;
            height = maxSize;
          }
          
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }, 'image/jpeg', 0.7);
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];
    
    for (const file of files) {
      if (file.type.startsWith('image/')) {
        if (newImages.length < maxImages) {
          try {
            let processedFile = file;
            if (file.size > 500 * 1024) { // > 500KB
              processedFile = await compressImage(file);
              showToast(`${file.name} compressed`, 'info');
            }
            
            const reader = new FileReader();
            reader.onloadend = () => {
              newImages.push({ url: reader.result, file: processedFile, name: processedFile.name, type: 'file' });
              onChange(newImages);
              showToast(`${processedFile.name} added`, 'success');
            };
            reader.readAsDataURL(processedFile);
          } catch (error) {
            showToast(`Error processing ${file.name}`, 'error');
          }
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
    if (urlInput && urlInput.trim()) {
      const newImages = [...images];
      if (newImages.length < maxImages) {
        // Validate image URL
        const isValidUrl = urlInput.match(/^https?:\/\/.+\/.+\.(jpg|jpeg|png|gif|webp|svg|JPG|JPEG|PNG|GIF|WEBP|SVG)(\?.*)?$/i);
        if (isValidUrl) {
          newImages.push({ url: urlInput.trim(), type: 'url' });
          onChange(newImages);
          showToast('Image URL added', 'success');
          setUrlInput('');
        } else {
          showToast('Please enter a valid image URL (jpg, png, gif, webp)', 'error');
        }
      } else {
        showToast(`Maximum ${maxImages} images allowed`, 'error');
      }
    } else {
      showToast('Please enter an image URL', 'error');
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
    showToast('Image removed', 'success');
  };

  const makeMainImage = (index) => {
    if (index === 0) return;
    const newImages = [...images];
    const [selected] = newImages.splice(index, 1);
    newImages.unshift(selected);
    onChange(newImages);
    showToast('Main image updated', 'success');
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Images
          <span className="text-xs text-gray-500 ml-2">(Max {maxImages} images)</span>
          <span className="text-red-500 ml-1">*</span>
        </label>
        <p className="text-xs text-gray-400 mt-1">First image will be the main product image. Supports JPG, PNG, GIF, WEBP.</p>
      </div>

      {/* Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-500 transition bg-gray-50">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileUpload}
          className="hidden"
        />
        <PhotoIcon className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          <PlusIcon className="w-4 h-4 inline mr-1" />
          Upload from Computer
        </button>
        <p className="text-xs text-gray-400 mt-2">or</p>
      </div>

      {/* URL Section */}
      <div className="flex gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleUrlAdd()}
          placeholder="Paste image URL (https://example.com/product-image.jpg)"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
        />
        <button
          type="button"
          onClick={handleUrlAdd}
          className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
        >
          Add URL
        </button>
      </div>

      {/* Image Gallery */}
      {images.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Image Gallery ({images.length}/{maxImages})</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition bg-gray-50">
                  <img
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150?text=Invalid+URL';
                    }}
                  />
                  
                  {/* Main Image Badge */}
                  {index === 0 && (
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs px-2 py-0.5 rounded-full shadow-md">
                      Main
                    </div>
                  )}

                  {/* Image Number */}
                  <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {index + 1}
                  </div>

                  {/* Type Badge */}
                  {image.type === 'url' && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                      URL
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2">
                    {index !== 0 && (
                      <button
                        type="button"
                        onClick={() => makeMainImage(index)}
                        className="p-1.5 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                        title="Set as main image"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      title="Remove image"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {images.length === 0 && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
          <PhotoIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">No images added yet</p>
          <p className="text-xs text-gray-300">Upload images or add URLs above</p>
        </div>
      )}
    </div>
  );
};

// Form Input Component
const FormInput = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) => (
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

// Color preset with image URLs
const colorPresets = [
  { name: "Red", code: "#FF0000", image: "https://i.pinimg.com/736x/6c/30/12/6c3012b08746c193716fd585726ef1c3.jpg" },
  { name: "Blue", code: "#0000FF", image: "https://i.pinimg.com/736x/75/0a/99/750a9916c76c6792ec6afcc53459ef97.jpg" },
  { name: "Black", code: "#000000", image: "https://i.pinimg.com/736x/01/3c/82/013c82c925dfc78df41e80c70096c5f7.jpg" },
  { name: "White", code: "#FFFFFF", image: "" },
  { name: "Green", code: "#00FF00", image: "" },
  { name: "Purple", code: "#800080", image: "" },
  { name: "Gold", code: "#FFD700", image: "" },
  { name: "Silver", code: "#C0C0C0", image: "" },
  { name: "Pink", code: "#FFC0CB", image: "" },
  { name: "Orange", code: "#FFA500", image: "" },
  { name: "Brown", code: "#8B4513", image: "" },
  { name: "Gray", code: "#808080", image: "" }
];

const sizePresets = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL", "5XL", "6", "7", "8", "9", "10", "11", "12", "13", "28", "30", "32", "34", "36", "38", "40", "42", "44"];

// Main New Product Page
export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [enableColors, setEnableColors] = useState(false);
  const [enableSizes, setEnableSizes] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', compare_price: '', stock: '', category: '', brand: '', colors: [], sizes: []
  });

  const handleChange = (e) => { 
    const { name, value } = e.target; 
    setFormData(prev => ({ ...prev, [name]: value })); 
  };

  // ✅ FIXED: Add color with image URL
  const addColor = () => {
    const colorName = document.getElementById('colorName')?.value;
    const colorCode = document.getElementById('colorCode')?.value;
    const colorImage = document.getElementById('colorImage')?.value;
    
    if (colorName && colorCode) {
      const exists = formData.colors.some(c => c.name === colorName);
      if (!exists) {
        const newColor = { name: colorName, code: colorCode };
        if (colorImage && colorImage.trim()) {
          newColor.image = colorImage.trim();
        }
        setFormData(prev => ({ ...prev, colors: [...prev.colors, newColor] }));
        showToast(`${colorName} added`, 'success');
        document.getElementById('colorName').value = '';
        document.getElementById('colorImage').value = '';
      } else {
        showToast(`${colorName} already exists`, 'error');
      }
    } else {
      showToast('Please enter color name and select color', 'error');
    }
  };

  // ✅ FIXED: Add preset color with image
  const addPresetColor = (color) => {
    const exists = formData.colors.some(c => c.name === color.name);
    if (!exists) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, { name: color.name, code: color.code, image: color.image || '' }] }));
      showToast(`${color.name} added`, 'success');
    } else {
      showToast(`${color.name} already exists`, 'error');
    }
  };

  const removeColor = (index) => {
    setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));
    showToast('Color removed', 'success');
  };

  const updateColorImage = (index, imageUrl) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], image: imageUrl };
    setFormData(prev => ({ ...prev, colors: updatedColors }));
    showToast('Color image updated', 'success');
  };

  const addSize = () => {
    const sizeName = document.getElementById('sizeName')?.value;
    if (sizeName) {
      const exists = formData.sizes.includes(sizeName);
      if (!exists) {
        setFormData(prev => ({ ...prev, sizes: [...prev.sizes, sizeName] }));
        showToast(`${sizeName} added`, 'success');
        document.getElementById('sizeName').value = '';
      } else {
        showToast(`${sizeName} already exists`, 'error');
      }
    } else {
      showToast('Please enter a size', 'error');
    }
  };

  const removeSize = (index) => {
    setFormData(prev => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }));
    showToast('Size removed', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name) { showToast('Please enter product name', 'error'); return; }
    if (!formData.price) { showToast('Please enter product price', 'error'); return; }
    if (!formData.stock) { showToast('Please enter stock quantity', 'error'); return; }
    if (images.length === 0) { showToast('Please add at least one product image', 'error'); return; }
    
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
      
      // Add images to product data (supports both uploaded and URL images)
      images.forEach((image, index) => {
        const fieldName = `image_url${index === 0 ? '' : `_${index + 1}`}`;
        productData[fieldName] = image.url;
      });
      
      // Clear remaining image fields
      for (let i = images.length + 1; i <= 5; i++) {
        const fieldName = `image_url${i === 1 ? '' : `_${i}`}`;
        productData[fieldName] = '';
      }
      
      await createProduct(productData);
      showToast('Product created successfully!', 'success');
      router.push('/admin/products');
    } catch (error) { 
      console.error('Error:', error);
      showToast(error.response?.data?.message || 'Failed to create product', 'error'); 
    } finally { 
      setSubmitting(false); 
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Add New Product</h1>
          <p className="text-gray-500 text-sm mt-1">Create a new product with color images and sizes</p>
        </div>
        <Link href="/admin/products" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition">
          Back to Products
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Basic Information</h2>
          <div className="space-y-4">
            <FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                  <option value="">Select Category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mobile Phones">Mobile Phones</option>
                  <option value="Men's Clothing">Men's Clothing</option>
                  <option value="Women's Clothing">Women's Clothing</option>
                  <option value="Kids Clothing">Kids Clothing</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Watches">Watches</option>
                  <option value="Jewelry">Jewelry</option>
                  <option value="Home & Living">Home & Living</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Toys">Toys</option>
                  <option value="Beauty">Beauty</option>
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

        {/* Product Variants Toggles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4 border-b pb-2">Product Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <SwatchIcon className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="font-medium text-gray-700">Enable Colors</span>
                  <p className="text-xs text-gray-400">Show color options for this product</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={enableColors} onChange={(e) => { setEnableColors(e.target.checked); if (!e.target.checked) setFormData(prev => ({ ...prev, colors: [] })); }} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" />
                <div>
                  <span className="font-medium text-gray-700">Enable Sizes</span>
                  <p className="text-xs text-gray-400">Show size options for this product</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={enableSizes} onChange={(e) => { setEnableSizes(e.target.checked); if (!e.target.checked) setFormData(prev => ({ ...prev, sizes: [] })); }} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Colors Section - FIXED with Image URL */}
        {enableColors && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <SwatchIcon className="w-5 h-5 text-purple-600" />
              Colors with Images
              <span className="text-xs text-gray-400 font-normal ml-2">(Add images to change product image when color is selected)</span>
            </h2>
            
            {/* Color Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Color Presets (with images)</label>
              <div className="flex flex-wrap gap-2">
                {colorPresets.map((color, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => addPresetColor(color)}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color.code }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Selected Colors with Image Preview */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Selected Colors ({formData.colors.length})</label>
              <div className="space-y-2">
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                    <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: color.code }} />
                    <span className="text-sm font-medium w-20">{color.name}</span>
                    {color.image ? (
                      <div className="flex-1 flex items-center gap-2">
                        <img src={color.image} alt={color.name} className="w-8 h-8 rounded object-cover" />
                        <span className="text-xs text-gray-500 truncate max-w-xs">{color.image.substring(0, 40)}...</span>
                      </div>
                    ) : (
                      <div className="flex-1 text-xs text-yellow-600">⚠️ No image URL set - product image won't change</div>
                    )}
                    <button type="button" onClick={() => {
                      const newImageUrl = prompt('Enter image URL for this color:', color.image || 'https://');
                      if (newImageUrl && newImageUrl.trim()) {
                        const updatedColors = [...formData.colors];
                        updatedColors[index] = { ...updatedColors[index], image: newImageUrl.trim() };
                        setFormData(prev => ({ ...prev, colors: updatedColors }));
                        showToast('Color image updated', 'success');
                      }
                    }} className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded hover:bg-purple-200">Edit Image</button>
                    <button type="button" onClick={() => removeColor(index)} className="text-red-500"><TrashIcon className="w-4 h-4" /></button>
                  </div>
                ))}
                {formData.colors.length === 0 && (
                  <p className="text-gray-500 text-sm">No colors selected. Click on color presets above to add.</p>
                )}
              </div>
            </div>

            {/* Add Custom Color with Image URL */}
            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Add Custom Color</label>
              <div className="flex flex-wrap gap-2">
                <input
                  type="text"
                  id="colorName"
                  placeholder="Color name (e.g., Navy Blue)"
                  className="flex-1 min-w-[150px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <input
                  type="color"
                  id="colorCode"
                  className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                  defaultValue="#000000"
                />
                <input
                  type="text"
                  id="colorImage"
                  placeholder="Image URL (https://example.com/color-image.jpg)"
                  className="flex-2 min-w-[250px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
                <button
                  type="button"
                  onClick={addColor}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Add Color
                </button>
              </div>
              <p className="text-xs text-blue-600 mt-2">💡 Tip: Add image URLs so the main product image changes when users select this color</p>
            </div>
          </div>
        )}

        {/* Sizes Section */}
        {enableSizes && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2">
              <ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" />
              Sizes
              <span className="text-xs text-gray-400 font-normal ml-2">(Select sizes for this product)</span>
            </h2>
            
            {/* Size Presets */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quick Size Presets</label>
              <div className="flex flex-wrap gap-2">
                {sizePresets.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      if (!formData.sizes.includes(size)) {
                        setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] }));
                        showToast(`${size} added`, 'success');
                      } else {
                        showToast(`${size} already added`, 'error');
                      }
                    }}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-purple-100 transition"
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
                placeholder="Custom size (e.g., 2XL, 42, One Size)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <button
                type="button"
                onClick={addSize}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
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
          <Link
            href="/admin/products"
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {submitting ? (
              <>
                <svg className="animate-spin inline w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Creating...
              </>
            ) : (
              'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}