'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Loader } from '@/components/ui/Loader';

export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        // Redirect to login with return URL
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      } else if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
        // Redirect to home if user doesn't have required role
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, user, router, pathname, allowedRoles]);

  if (loading) {
    return <Loader fullScreen message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return null;
  }

  return <>{children}</>;
};