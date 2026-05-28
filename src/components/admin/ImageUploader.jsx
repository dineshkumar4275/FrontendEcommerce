// components/admin/ImageUploader.jsx
'use client';

import { useState, useRef } from 'react';
import { XMarkIcon, PhotoIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

export const ImageUploader = ({ 
  images = [], 
  onChange, 
  maxImages = 5,
  label = "Product Images",
  required = false 
}) => {
  const [draggedIndex, setDraggedIndex] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [...images];
    
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (newImages.length < maxImages) {
            newImages.push({
              url: reader.result,
              file: file,
              name: file.name
            });
            onChange(newImages);
          } else {
            toast.error(`Maximum ${maxImages} images allowed`);
          }
        };
        reader.readAsDataURL(file);
      } else {
        toast.error('Please upload valid image files');
      }
    });
  };

  const handleImageUrlAdd = (url) => {
    if (!url) return;
    const newImages = [...images];
    if (newImages.length < maxImages) {
      newImages.push({
        url: url,
        isUrl: true
      });
      onChange(newImages);
    } else {
      toast.error(`Maximum ${maxImages} images allowed`);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onChange(newImages);
  };

  const reorderImages = (from, to) => {
    const newImages = [...images];
    const [moved] = newImages.splice(from, 1);
    newImages.splice(to, 0, moved);
    onChange(newImages);
    setDraggedIndex(null);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
        <span className="text-xs text-gray-500 ml-2">(Max {maxImages} images)</span>
      </label>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {/* Existing Images */}
        <AnimatePresence>
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              draggable
              onDragStart={() => setDraggedIndex(index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => draggedIndex !== null && reorderImages(draggedIndex, index)}
              className="relative group"
            >
              <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-purple-500 transition-all bg-gray-50">
                <img
                  src={image.url}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Number Badge */}
                <div className="absolute top-1 left-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded">
                  {index + 1}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>

                {/* Main Image Badge */}
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-purple-600 text-white text-xs px-1.5 py-0.5 rounded">
                    Main
                  </div>
                )}

                {/* Drag Handle */}
                <div className="absolute bottom-1 right-1 bg-black/50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-all cursor-grab">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M7 2a2 2 0 10-4 0 2 2 0 004 0zm0 8a2 2 0 10-4 0 2 2 0 004 0zm0 8a2 2 0 10-4 0 2 2 0 004 0zm10-8a2 2 0 10-4 0 2 2 0 004 0zm0-8a2 2 0 10-4 0 2 2 0 004 0zm0 8a2 2 0 10-4 0 2 2 0 004 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Add Image Button */}
        {images.length < maxImages && (
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full aspect-square rounded-lg border-2 border-dashed border-gray-300 hover:border-purple-500 transition-all flex flex-col items-center justify-center gap-2 bg-gray-50 hover:bg-purple-50"
            >
              <PlusIcon className="w-8 h-8 text-gray-400" />
              <span className="text-xs text-gray-500">Upload Image</span>
            </button>
          </div>
        )}
      </div>

      {/* Image URL Input (Optional) */}
      <div className="mt-3">
        <label className="block text-xs text-gray-500 mb-1">Or add image URL</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            className="flex-1 px-3 py-1.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            id="imageUrlInput"
          />
          <button
            type="button"
            onClick={() => {
              const input = document.getElementById('imageUrlInput');
              if (input.value) {
                handleImageUrlAdd(input.value);
                input.value = '';
              }
            }}
            className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
          >
            Add URL
          </button>
        </div>
      </div>

      {/* Image Count Info */}
      <p className="text-xs text-gray-400">
        {images.length} of {maxImages} images added. Drag to reorder. First image is main product image.
      </p>
    </div>
  );
};