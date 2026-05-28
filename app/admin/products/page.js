// app/admin/products/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  PencilIcon, 
  TrashIcon, 
  EyeIcon, 
  PlusIcon,
  PhotoIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { getProducts, deleteProduct } from '@/services/productService';
import { useToast } from '@/hooks/useToast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const { showToast } = useToast();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error:', error);
      showToast('Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Get unique categories from products
      const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(p => 
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  };

  const handleDelete = async (id, productName) => {
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
      try {
        await deleteProduct(id);
        showToast(`${productName} deleted successfully`, 'success');
        fetchProducts();
      } catch (error) {
        showToast('Failed to delete product', 'error');
      }
    }
  };

  const getImageCount = (product) => {
    let count = 0;
    for (let i = 1; i <= 5; i++) {
      const img = product[`image_url${i === 1 ? '' : `_${i}`}`];
      if (img && img.trim()) count++;
    }
    return count;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            {searchTerm || selectedCategory ? 'Try adjusting your filters' : 'Get started by adding your first product'}
          </p>
          {(searchTerm || selectedCategory) && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              Clear Filters
            </button>
          )}
          {!searchTerm && !selectedCategory && (
            <Link
              href="/admin/products/new"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition"
            >
              Add Product
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all overflow-hidden group"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <PhotoIcon className="w-12 h-12" />
                  </div>
                )}
                
                {/* Image Count Badge */}
                {getImageCount(product) > 0 && (
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                    📷 {getImageCount(product)}/5
                  </div>
                )}
                
                {/* Featured Badge */}
                {product.is_featured && (
                  <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    ⭐ Featured
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.category || 'Uncategorized'}</p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-purple-600">₹{Number(product.price).toLocaleString()}</span>
                  {product.compare_price && (
                    <span className="text-xs text-gray-400 line-through">₹{Number(product.compare_price).toLocaleString()}</span>
                  )}
                </div>
                <div className="mt-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.stock > 0 ? `Stock: ${product.stock}` : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="border-t border-gray-100 p-3 flex gap-2">
                <Link
                  href={`/products/${product.id}`}
                  target="_blank"
                  className="flex-1 px-3 py-1.5 text-center text-gray-600 hover:bg-gray-100 rounded-lg text-sm transition flex items-center justify-center gap-1"
                >
                  <EyeIcon className="w-4 h-4" />
                  View
                </Link>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="flex-1 px-3 py-1.5 text-center text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                >
                  <PencilIcon className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(product.id, product.name)}
                  className="flex-1 px-3 py-1.5 text-center text-red-600 hover:bg-red-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                >
                  <TrashIcon className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}