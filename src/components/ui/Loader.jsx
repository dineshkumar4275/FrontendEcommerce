import React from 'react';

export const Loader = ({ size = 'md', fullScreen = false, message = 'Loading...' }) => {
  const sizes = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`animate-spin rounded-full border-b-2 border-blue-600 ${sizes[size]}`}></div>
      {message && <p className="text-gray-600 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export const Skeleton = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
);