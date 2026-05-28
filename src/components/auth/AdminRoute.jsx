// 'use client'

// import { useEffect } from 'react'
// import { useSelector } from 'react-redux'
// import { useRouter } from 'next/navigation'

// export default function AdminRoute({ children }) {
//   const { userInfo } = useSelector((state) => state.auth)
//   const router = useRouter()

//   useEffect(() => {
//     if (!userInfo) {
//       router.push('/login')
//     } else if (userInfo.role !== 'admin') {
//       router.push('/')
//     }
//   }, [userInfo, router])

//   if (!userInfo || userInfo.role !== 'admin') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Redirecting...</p>
//         </div>
//       </div>
//     )
//   }

//   return children
// }
// src/components/Auth/AdminRoute.jsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function AdminRoute({ children }) {
  const router = useRouter();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push('/admin/login');
    } else if (user?.role !== 'admin') {
      router.push('/');
    }
  }, [token, user, router]);

  if (!token || user?.role !== 'admin') {
    return null;
  }

  return <>{children}</>;
}