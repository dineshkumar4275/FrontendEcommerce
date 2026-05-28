import React, { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

export const Toast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
    error: <XCircleIcon className="h-6 w-6 text-red-500" />,
    info: <InformationCircleIcon className="h-6 w-6 text-blue-500" />,
  };

  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className={`fixed bottom-132 right-4 z-50 animate-slide-up`}>
      <div className={`rounded-lg border p-4 shadow-lg ${backgrounds[type]} min-w-[300px]`}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">{icons[type]}</div>
          <div className="flex-1">
            <p className="text-sm text-gray-800">{message}</p>
          </div>
          <button onClick={onClose} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};