// src/components/Location/LocationBanner.jsx
'use client';

import React, { useState, useEffect } from 'react';
import { MapPinIcon } from '@heroicons/react/24/solid';

const LocationBanner = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const saved = localStorage.getItem('userLocation');
      if (saved) {
        setLocation(JSON.parse(saved));
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/location/detect`);
      const data = await response.json();
      
      if (data.success && data.data) {
        setLocation(data.data);
        localStorage.setItem('userLocation', JSON.stringify(data.data));
      }
    } catch (error) {
      console.error('Location fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <MapPinIcon className="w-4 h-4 animate-pulse" />
        <span className="text-sm">Detecting...</span>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex items-center gap-2 text-white/60">
        <MapPinIcon className="w-4 h-4" />
        <span className="text-sm">Select location</span>
      </div>
    );
  }

  const street = location.street || location.city || 'Your Location';

  return (
    <div className="flex items-center gap-2 text-white/80 hover:text-white transition cursor-pointer group">
      <MapPinIcon className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
      <div>
        <div className="text-[10px] text-white/50 leading-none">Delivering to</div>
        <div className="text-sm font-semibold truncate max-w-[120px]">{street}</div>
      </div>
    </div>
  );
};

export default LocationBanner;