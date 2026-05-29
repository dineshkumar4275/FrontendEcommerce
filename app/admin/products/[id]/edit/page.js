// app/admin/products/[id]/edit/page.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/useToast';
import apiClient from '@/lib/apiClient';
import { 
  PhotoIcon, 
  TrashIcon, 
  PlusIcon,
  SwatchIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';

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
            newImages.push({ url: reader.result, file: file, name: file.name, type: 'file' });
            onChange(newImages);
            showToast(`${file.name} added`, 'success');
          };
          reader.readAsDataURL(file);
        } else {
          showToast(`Maximum ${maxImages} images allowed`, 'error');
          break;
        }
      }
    }
  };

  const handleUrlAdd = () => {
    const url = prompt('Enter image URL:', 'https://');
    if (url && url.trim()) {
      const newImages = [...images];
      if (newImages.length < maxImages) {
        newImages.push({ url: url.trim(), type: 'url' });
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

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div><label className="block text-sm font-medium text-gray-700">Product Images<span className="text-xs text-gray-500 ml-2">(Max {maxImages} images)</span></label></div>
        <div className="flex gap-2">
          <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-1"><PlusIcon className="w-4 h-4" />Upload</button>
          <button type="button" onClick={handleUrlAdd} className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">Add URL</button>
        </div>
      </div>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gray-50">
              <img src={image.url} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
              {index === 0 && <div className="absolute top-2 right-2 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">Main</div>}
              <button type="button" onClick={() => removeImage(index)} className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"><TrashIcon className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FormInput = ({ label, name, value, onChange, type = "text", required = false, placeholder = "" }) => (
  <div><label className="block text-sm font-medium text-gray-700 mb-1">{label} {required && <span className="text-red-500">*</span>}</label>
  <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>
);

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [enableColors, setEnableColors] = useState(true);
  const [enableSizes, setEnableSizes] = useState(false);
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', compare_price: '', stock: '', category: '', brand: '',
    colors: [], sizes: []
  });

  useEffect(() => { if (id) fetchProduct(); }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get(`/products/${id}`);
      if (response.data.success) {
        const product = response.data.data;
        setFormData({
          name: product.name || '', description: product.description || '', price: product.price || '',
          compare_price: product.compare_price || '', stock: product.stock || '', category: product.category || '',
          brand: product.brand || '', colors: product.colors || [], sizes: product.sizes || []
        });
        setEnableColors(product.hasColors || (product.colors?.length > 0));
        setEnableSizes(product.hasSizes || (product.sizes?.length > 0));
        const imageUrls = [];
        for (let i = 1; i <= 5; i++) {
          const url = product[`image_url${i === 1 ? '' : `_${i}`}`];
          if (url && url.trim()) imageUrls.push({ url, type: 'url' });
        }
        setImages(imageUrls);
      }
    } catch (error) {
      showToast('Failed to load product', 'error');
      router.push('/admin/products');
    } finally { setLoading(false); }
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };

  const addColor = () => {
    const colorName = document.getElementById('editColorName')?.value;
    const colorCode = document.getElementById('editColorCode')?.value;
    if (colorName && colorCode) {
      setFormData(prev => ({ ...prev, colors: [...prev.colors, { name: colorName, code: colorCode }] }));
      showToast(`${colorName} added`, 'success');
      document.getElementById('editColorName').value = '';
    }
  };

  const removeColor = (index) => setFormData(prev => ({ ...prev, colors: prev.colors.filter((_, i) => i !== index) }));

  const addSize = () => {
    const sizeName = document.getElementById('editSizeName')?.value;
    if (sizeName) { setFormData(prev => ({ ...prev, sizes: [...prev.sizes, sizeName] })); showToast(`${sizeName} added`, 'success'); document.getElementById('editSizeName').value = ''; }
  };

  const removeSize = (index) => setFormData(prev => ({ ...prev, sizes: prev.sizes.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const productData = { ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock), compare_price: formData.compare_price ? parseFloat(formData.compare_price) : null, hasColors: enableColors && formData.colors.length > 0, hasSizes: enableSizes && formData.sizes.length > 0, colors: enableColors ? formData.colors : [], sizes: enableSizes ? formData.sizes : [] };
      images.forEach((image, index) => { productData[`image_url${index === 0 ? '' : `_${index + 1}`}`] = image.url; });
      for (let i = images.length + 1; i <= 5; i++) productData[`image_url${i === 1 ? '' : `_${i}`}`] = '';
      await apiClient.put(`/products/${id}`, productData);
      showToast('Product updated successfully!', 'success');
      router.push('/admin/products');
    } catch (error) { showToast('Failed to update product', 'error'); } finally { setSubmitting(false); }
  };

  const colorPresets = [{ name: "Red", code: "#FF0000" }, { name: "Blue", code: "#0000FF" }, { name: "Black", code: "#000000" }, { name: "White", code: "#FFFFFF" }, { name: "Green", code: "#00FF00" }, { name: "Purple", code: "#800080" }];
  const sizePresets = ["XS","S","M","L","XL","XXL","3XL","6","7","8","9","10","11","12"];

  if (loading) return <div className="flex justify-center items-center h-96"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold">Edit Product</h1><p className="text-gray-500 text-sm mt-1">Update product with colors and sizes</p></div><Link href="/admin/products"><button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Back to Products</button></Link></div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2">Basic Information</h2><div className="space-y-4"><FormInput label="Product Name" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter product name" /><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label className="block text-sm font-medium text-gray-700 mb-1">Category *</label><select name="category" value={formData.category} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"><option value="">Select Category</option><option value="Electronics">Electronics</option><option value="Mobile Phones">Mobile Phones</option><option value="Men's Clothing">Men's Clothing</option><option value="Women's Clothing">Women's Clothing</option><option value="Footwear">Footwear</option></select></div><FormInput label="Brand" name="brand" value={formData.brand} onChange={handleChange} placeholder="Enter brand name" /></div></div></div>

        <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2">Pricing & Stock</h2><div className="grid grid-cols-1 md:grid-cols-3 gap-4"><FormInput label="Price (₹)" name="price" type="number" value={formData.price} onChange={handleChange} required placeholder="0.00" /><FormInput label="Compare Price (MRP)" name="compare_price" type="number" value={formData.compare_price} onChange={handleChange} placeholder="0.00" /><FormInput label="Stock Quantity" name="stock" type="number" value={formData.stock} onChange={handleChange} required placeholder="0" /></div></div>

        <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2">Product Variants</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-6"><div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><SwatchIcon className="w-5 h-5 text-purple-600" /><span className="font-medium text-gray-700">Enable Colors</span></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={enableColors} onChange={(e) => setEnableColors(e.target.checked)} className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div><div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"><div className="flex items-center gap-2"><ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" /><span className="font-medium text-gray-700">Enable Sizes</span></div><label className="relative inline-flex items-center cursor-pointer"><input type="checkbox" checked={enableSizes} onChange={(e) => setEnableSizes(e.target.checked)} className="sr-only peer" /><div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-purple-600 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div></label></div></div></div>

        {enableColors && (<div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2"><SwatchIcon className="w-5 h-5 text-purple-600" /> Colors</h2><div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">Quick Color Presets</label><div className="flex flex-wrap gap-2">{colorPresets.map((color, idx) => (<button key={idx} type="button" onClick={() => { if (!formData.colors.some(c => c.name === color.name)) setFormData(prev => ({ ...prev, colors: [...prev.colors, { name: color.name, code: color.code }] })); }} className="w-8 h-8 rounded-full border-2 border-gray-300 hover:scale-110" style={{ backgroundColor: color.code }} title={color.name} />))}</div></div><div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">Selected Colors ({formData.colors.length})</label><div className="flex flex-wrap gap-2">{formData.colors.map((color, index) => (<div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"><div className="w-4 h-4 rounded-full border" style={{ backgroundColor: color.code }} /><span className="text-sm">{color.name}</span><button type="button" onClick={() => removeColor(index)} className="text-red-500"><TrashIcon className="w-3.5 h-3.5" /></button></div>))}</div></div><div className="flex gap-2"><input type="text" id="editColorName" placeholder="Color name" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" /><input type="color" id="editColorCode" className="w-12 h-10 border border-gray-300 rounded cursor-pointer" defaultValue="#000000" /><button type="button" onClick={addColor} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add</button></div></div>)}

        {enableSizes && (<div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2 flex items-center gap-2"><ArrowsRightLeftIcon className="w-5 h-5 text-purple-600" /> Sizes</h2><div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">Quick Size Presets</label><div className="flex flex-wrap gap-2">{sizePresets.map((size) => (<button key={size} type="button" onClick={() => { if (!formData.sizes.includes(size)) setFormData(prev => ({ ...prev, sizes: [...prev.sizes, size] })); }} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-purple-100">{size}</button>))}</div></div><div className="mb-4"><label className="block text-sm font-medium text-gray-700 mb-2">Selected Sizes ({formData.sizes.length})</label><div className="flex flex-wrap gap-2">{formData.sizes.map((size, index) => (<div key={index} className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1"><span className="text-sm">{size}</span><button type="button" onClick={() => removeSize(index)} className="text-red-500"><TrashIcon className="w-3.5 h-3.5" /></button></div>))}</div></div><div className="flex gap-2"><input type="text" id="editSizeName" placeholder="Size (e.g., 2XL, 42)" className="flex-1 px-3 py-2 border border-gray-300 rounded-lg" /><button type="button" onClick={addSize} className="px-4 py-2 bg-purple-600 text-white rounded-lg">Add Size</button></div></div>)}

        <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2">Product Images</h2><ImageUploader images={images} onChange={setImages} maxImages={5} /></div>

        <div className="bg-white rounded-lg shadow-md p-6"><h2 className="text-lg font-bold mb-4 border-b pb-2">Description</h2><textarea name="description" value={formData.description} onChange={handleChange} rows="5" placeholder="Detailed product description..." className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" /></div>

        <div className="flex justify-end gap-4"><Link href="/admin/products" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link><button type="submit" disabled={submitting} className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg disabled:opacity-50">{submitting ? 'Updating...' : 'Update Product'}</button></div>
      </form>
    </div>
  );
}