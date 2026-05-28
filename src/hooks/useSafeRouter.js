// src/hooks/useSafeRouter.js
'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useSafeRouter = () => {
  const router = useNextRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const safePush = (url) => {
    if (isReady) {
      router.push(url);
    } else {
      setTimeout(() => router.push(url), 100);
    }
  };

  const safeReplace = (url) => {
    if (isReady) {
      router.replace(url);
    } else {
      setTimeout(() => router.replace(url), 100);
    }
  };

  return {
    ...router,
    push: safePush,
    replace: safeReplace,
    isReady,
  };
};