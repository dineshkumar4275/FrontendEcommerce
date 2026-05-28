import React from 'react';

export const Card = ({ children, className = '', variant = 'default' }) => {
  const variants = {
    default: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg hover:shadow-xl transition-shadow',
    outline: 'border-2 border-gray-200 bg-transparent',
  };

  return (
    <div className={`rounded-lg overflow-hidden ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-b border-gray-200 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 py-4 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${className}`}>
    {children}
  </div>
);