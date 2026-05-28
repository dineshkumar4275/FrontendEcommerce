// components/auth/LoginSkeleton.js
'use client';

export function LoginSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto animate-pulse">
            <span className="text-4xl opacity-0">🛍️</span>
          </div>
          <div className="h-8 bg-gray-200 rounded-lg mt-4 mx-auto w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-lg mt-2 mx-auto w-64 animate-pulse"></div>
        </div>
        <div className="space-y-6">
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="h-12 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}