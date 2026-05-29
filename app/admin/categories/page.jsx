// // app/admin/categories/page.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { 
//   PlusIcon, 
//   PencilIcon, 
//   TrashIcon,
//   TagIcon,
//   FolderIcon
// } from '@heroicons/react/24/outline';
// import apiClient from '@/lib/apiClient';
// import toast from 'react-hot-toast';

// export default function CategoriesPage() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [editingCategory, setEditingCategory] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     status: 'active'
//   });

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       setLoading(true);
//       // Try API first
//       try {
//         const response = await apiClient.get('/categories');
//         if (response.data.success) {
//           setCategories(response.data.data);
//           return;
//         }
//       } catch (error) {
//         console.log('API not available, using localStorage');
//       }
      
//       // Fallback to localStorage
//       const saved = localStorage.getItem('categories');
//       if (saved) {
//         setCategories(JSON.parse(saved));
//       } else {
//         // Default categories
//         const defaultCategories = [
//           { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', status: 'active', productCount: 0 },
//           { id: 2, name: 'Clothing', description: 'Fashion and apparel', status: 'active', productCount: 0 },
//           { id: 3, name: 'Books', description: 'Books and magazines', status: 'active', productCount: 0 },
//           { id: 4, name: 'Home & Living', description: 'Home decor and furniture', status: 'active', productCount: 0 },
//           { id: 5, name: 'Sports', description: 'Sports equipment and gear', status: 'active', productCount: 0 },
//         ];
//         setCategories(defaultCategories);
//         localStorage.setItem('categories', JSON.stringify(defaultCategories));
//       }
//     } catch (error) {
//       console.error('Error fetching categories:', error);
//       toast.error('Failed to load categories');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const saveCategories = (updatedCategories) => {
//     localStorage.setItem('categories', JSON.stringify(updatedCategories));
//     setCategories(updatedCategories);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.name) {
//       toast.error('Please enter category name');
//       return;
//     }

//     if (editingCategory) {
//       // Update category
//       const updated = categories.map(cat =>
//         cat.id === editingCategory.id
//           ? { ...cat, ...formData, updated_at: new Date().toISOString() }
//           : cat
//       );
//       saveCategories(updated);
//       toast.success('Category updated successfully');
//     } else {
//       // Add new category
//       const newCategory = {
//         id: Date.now(),
//         ...formData,
//         productCount: 0,
//         created_at: new Date().toISOString()
//       };
//       saveCategories([...categories, newCategory]);
//       toast.success('Category added successfully');
//     }
    
//     setShowModal(false);
//     setEditingCategory(null);
//     setFormData({ name: '', description: '', status: 'active' });
//   };

//   const handleDelete = (id, name) => {
//     if (confirm(`Are you sure you want to delete "${name}"?`)) {
//       const updated = categories.filter(cat => cat.id !== id);
//       saveCategories(updated);
//       toast.success('Category deleted successfully');
//     }
//   };

//   const handleEdit = (category) => {
//     setEditingCategory(category);
//     setFormData({
//       name: category.name,
//       description: category.description || '',
//       status: category.status || 'active'
//     });
//     setShowModal(true);
//   };

//   const updateProductCount = () => {
//     // Get products from localStorage
//     const products = JSON.parse(localStorage.getItem('products') || '[]');
//     const updatedCategories = categories.map(cat => ({
//       ...cat,
//       productCount: products.filter(p => p.category === cat.name).length
//     }));
//     saveCategories(updatedCategories);
//   };

//   useEffect(() => {
//     updateProductCount();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-800">Categories Management</h1>
//           <p className="text-gray-500 text-sm mt-1">Manage product categories</p>
//         </div>
//         <button
//           onClick={() => {
//             setEditingCategory(null);
//             setFormData({ name: '', description: '', status: 'active' });
//             setShowModal(true);
//           }}
//           className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center gap-2"
//         >
//           <PlusIcon className="w-5 h-5" />
//           Add Category
//         </button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Categories</p>
//               <p className="text-2xl font-bold text-gray-800">{categories.length}</p>
//             </div>
//             <FolderIcon className="h-8 w-8 text-purple-500" />
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Active Categories</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {categories.filter(c => c.status === 'active').length}
//               </p>
//             </div>
//             <TagIcon className="h-8 w-8 text-green-500" />
//           </div>
//         </div>
//         <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
//           <div className="flex items-center justify-between">
//             <div>
//               <p className="text-gray-500 text-sm">Total Products</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {categories.reduce((sum, c) => sum + (c.productCount || 0), 0)}
//               </p>
//             </div>
//             <ShoppingBagIcon className="h-8 w-8 text-blue-500" />
//           </div>
//         </div>
//       </div>

//       {/* Categories Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {categories.map((category, index) => (
//           <motion.div
//             key={category.id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.05 }}
//             className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
//           >
//             <div className="p-5">
//               <div className="flex justify-between items-start mb-3">
//                 <div className="flex items-center gap-2">
//                   <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
//                     <TagIcon className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-800">{category.name}</h3>
//                     <p className="text-xs text-gray-500">{category.productCount || 0} products</p>
//                   </div>
//                 </div>
//                 <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                   category.status === 'active' 
//                     ? 'bg-green-100 text-green-700' 
//                     : 'bg-red-100 text-red-700'
//                 }`}>
//                   {category.status}
//                 </span>
//               </div>
              
//               {category.description && (
//                 <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description}</p>
//               )}
              
//               <div className="flex gap-2 pt-3 border-t border-gray-100">
//                 <button
//                   onClick={() => handleEdit(category)}
//                   className="flex-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
//                 >
//                   <PencilIcon className="w-4 h-4" />
//                   Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(category.id, category.name)}
//                   className="flex-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
//                 >
//                   <TrashIcon className="w-4 h-4" />
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         ))}
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-xl max-w-md w-full p-6">
//             <h2 className="text-xl font-bold mb-4">
//               {editingCategory ? 'Edit Category' : 'Add New Category'}
//             </h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-1">Category Name *</label>
//                 <input
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter category name"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Description</label>
//                 <textarea
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   rows="3"
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                   placeholder="Enter category description"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium mb-1">Status</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                   className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 >
//                   <option value="active">Active</option>
//                   <option value="inactive">Inactive</option>
//                 </select>
//               </div>
//               <div className="flex gap-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowModal(false);
//                     setEditingCategory(null);
//                   }}
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg"
//                 >
//                   {editingCategory ? 'Update Category' : 'Add Category'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon,
  TagIcon,
  FolderIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import apiClient from '@/lib/apiClient';
import toast from 'react-hot-toast';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: 'active'
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      try {
        const response = await apiClient.get('/categories');
        if (response.data.success) {
          setCategories(response.data.data);
          return;
        }
      } catch (error) {
        console.log('API not available, using localStorage');
      }
      
      const saved = localStorage.getItem('categories');
      if (saved) {
        setCategories(JSON.parse(saved));
      } else {
        const defaultCategories = [
          { id: 1, name: 'Electronics', description: 'Electronic devices and gadgets', status: 'active', productCount: 0 },
          { id: 2, name: 'Clothing', description: 'Fashion and apparel', status: 'active', productCount: 0 },
          { id: 3, name: 'Books', description: 'Books and magazines', status: 'active', productCount: 0 },
          { id: 4, name: 'Home & Living', description: 'Home decor and furniture', status: 'active', productCount: 0 },
          { id: 5, name: 'Sports', description: 'Sports equipment and gear', status: 'active', productCount: 0 },
        ];
        setCategories(defaultCategories);
        localStorage.setItem('categories', JSON.stringify(defaultCategories));
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const saveCategories = (updatedCategories) => {
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    setCategories(updatedCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error('Please enter category name');
      return;
    }

    if (editingCategory) {
      const updated = categories.map(cat =>
        cat.id === editingCategory.id
          ? { ...cat, ...formData, updated_at: new Date().toISOString() }
          : cat
      );
      saveCategories(updated);
      toast.success('Category updated successfully');
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        created_at: new Date().toISOString()
      };
      saveCategories([...categories, newCategory]);
      toast.success('Category added successfully');
    }
    
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', status: 'active' });
  };

  const handleDelete = (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      const updated = categories.filter(cat => cat.id !== id);
      saveCategories(updated);
      toast.success('Category deleted successfully');
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      status: category.status || 'active'
    });
    setShowModal(true);
  };

  const updateProductCount = () => {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const updatedCategories = categories.map(cat => ({
      ...cat,
      productCount: products.filter(p => p.category === cat.name).length
    }));
    saveCategories(updatedCategories);
  };

  useEffect(() => {
    updateProductCount();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Categories Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', description: '', status: 'active' });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2 text-sm"
        >
          <PlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Stats - Mobile responsive */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Total</p>
              <p className="text-lg sm:text-2xl font-bold text-gray-800">{categories.length}</p>
            </div>
            <FolderIcon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Active</p>
              <p className="text-lg sm:text-2xl font-bold text-green-600">
                {categories.filter(c => c.status === 'active').length}
              </p>
            </div>
            <TagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-3 sm:p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs">Products</p>
              <p className="text-lg sm:text-2xl font-bold text-blue-600">
                {categories.reduce((sum, c) => sum + (c.productCount || 0), 0)}
              </p>
            </div>
            <ShoppingBagIcon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Categories Grid - Mobile responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
          >
            <div className="p-4 sm:p-5">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{category.name}</h3>
                    <p className="text-xs text-gray-500">{category.productCount || 0} products</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  category.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {category.status}
                </span>
              </div>
              
              {category.description && (
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{category.description}</p>
              )}
              
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(category)}
                  className="flex-1 px-3 py-1.5 text-blue-600 hover:bg-blue-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                >
                  <PencilIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(category.id, category.name)}
                  className="flex-1 px-3 py-1.5 text-red-600 hover:bg-red-50 rounded-lg text-sm transition flex items-center justify-center gap-1"
                >
                  <TrashIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="text-xs sm:text-sm">Delete</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal - Mobile Responsive */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-lg sm:text-xl font-bold">
                  {editingCategory ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Enter category description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingCategory(null);
                    }}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg text-sm font-medium"
                  >
                    {editingCategory ? 'Update' : 'Add'} Category
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}