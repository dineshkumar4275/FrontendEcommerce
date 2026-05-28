// components/ProductSkeleton.jsx
'use client';

export const ProductSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-48" />
      <div className="p-3 space-y-2">
        <div className="h-3 w-16 bg-gray-200 rounded-full" />
        <div className="h-4 w-full bg-gray-200 rounded-lg" />
        <div className="h-4 w-3/4 bg-gray-200 rounded-lg" />
        <div className="h-5 w-20 bg-gray-200 rounded-full mt-2" />
      </div>
    </div>
  </div>
);