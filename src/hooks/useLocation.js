// hooks/useLocation.js

import { useState, useEffect } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    detectLocation();
  }, []);

  const detectLocation = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/location/detect`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setLocation(data.data);
        localStorage.setItem('userLocation', JSON.stringify(data.data));
      } else {
        setError('Location detection failed');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshLocation = () => {
    detectLocation();
  };

  return { location, loading, error, refreshLocation };
};

export default useLocation;