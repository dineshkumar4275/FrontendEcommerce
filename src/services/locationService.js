// src/services/locationService.js
'use client';

export class LocationService {
  constructor() {
    this.watchId = null;
    this.currentPosition = null;
    this.listeners = [];
  }

  /**
   * ✅ Fast location detection - Uses cached or IP-based first
   */
  static async getCurrentPosition(options = {}) {
    return new Promise((resolve) => {
      // ✅ Check if we have cached location
      const cached = localStorage.getItem('userLocation');
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          // Use cached if less than 5 minutes old
          if (parsed.timestamp && Date.now() - parsed.timestamp < 5 * 60 * 1000) {
            console.log('📍 Using cached location');
            resolve(parsed);
            return;
          }
        } catch (e) {
          console.log('Cache read error:', e);
        }
      }

      // ✅ Try IP-based location first (fast)
      LocationService.getLocationFromIP()
        .then(ipLocation => {
          if (ipLocation) {
            console.log('📍 Location from IP (fast fallback)');
            resolve(ipLocation);
          }
        })
        .catch(() => {
          console.log('IP location failed, trying GPS');
        });

      // ✅ Then try GPS (may take longer)
      if (navigator.geolocation) {
        const geoOptions = {
          enableHighAccuracy: options.enableHighAccuracy || false, // false for faster response
          timeout: options.timeout || 5000, // 5 seconds
          maximumAge: options.maximumAge || 60000, // 1 minute
        };

        navigator.geolocation.getCurrentPosition(
          // Success
          (position) => {
            const location = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy,
              timestamp: Date.now(),
              source: 'gps',
            };
            localStorage.setItem('userLocation', JSON.stringify(location));
            console.log('📍 GPS location acquired:', location);
            resolve(location);
          },
          // Error
          (error) => {
            console.log('GPS error:', error.message);
            // If GPS fails and we already have IP location, resolve with that
            // Otherwise try fallback
            LocationService.getLocationFromIP()
              .then(ipLocation => {
                if (ipLocation) {
                  resolve(ipLocation);
                } else {
                  resolve(LocationService.getDefaultLocation());
                }
              })
              .catch(() => {
                resolve(LocationService.getDefaultLocation());
              });
          },
          geoOptions
        );
      } else {
        // No GPS support, use IP
        LocationService.getLocationFromIP()
          .then(ipLocation => {
            resolve(ipLocation || LocationService.getDefaultLocation());
          })
          .catch(() => {
            resolve(LocationService.getDefaultLocation());
          });
      }
    });
  }

  /**
   * ✅ Fast IP-based location (no permission needed)
   */
  static async getLocationFromIP() {
    try {
      // Try multiple IP services for redundancy
      const services = [
        'https://ipapi.co/json/',
        'https://ip-api.com/json/',
        'https://freegeoip.app/json/'
      ];

      for (const url of services) {
        try {
          const response = await fetch(url, {
            signal: AbortSignal.timeout(3000), // 3 second timeout
          });
          
          if (!response.ok) continue;
          
          const data = await response.json();
          
          if (data.latitude || data.lat) {
            const location = {
              latitude: data.latitude || data.lat,
              longitude: data.longitude || data.lon,
              city: data.city || data.region_name || '',
              region: data.region || data.region_code || '',
              country: data.country_name || data.country || '',
              countryCode: data.country_code || data.countryCode || '',
              postal: data.postal || data.zip || '',
              timezone: data.timezone || '',
              isp: data.org || data.isp || '',
              source: 'ip',
              timestamp: Date.now(),
              accuracy: 10000, // IP accuracy is ~10km
            };
            
            localStorage.setItem('userLocation', JSON.stringify(location));
            return location;
          }
        } catch (e) {
          console.log(`IP service failed: ${url}`, e.message);
        }
      }
      return null;
    } catch (error) {
      console.error('IP location error:', error);
      return null;
    }
  }

  /**
   * ✅ Default location (India)
   */
  static getDefaultLocation() {
    return {
      latitude: 20.5937,
      longitude: 78.9629,
      city: 'New Delhi',
      region: 'Delhi',
      country: 'India',
      countryCode: 'IN',
      source: 'default',
      timestamp: Date.now(),
      accuracy: 1000000,
    };
  }

  /**
   * ✅ Watch position with reduced accuracy for speed
   */
  static watchPosition(callback, options = {}) {
    if (!navigator.geolocation) {
      console.warn('Geolocation not supported');
      return null;
    }

    const watchOptions = {
      enableHighAccuracy: options.enableHighAccuracy || false,
      timeout: options.timeout || 10000,
      maximumAge: options.maximumAge || 30000,
    };

    return navigator.geolocation.watchPosition(
      (position) => {
        const location = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now(),
          source: 'gps',
        };
        localStorage.setItem('userLocation', JSON.stringify(location));
        if (callback) callback(location);
      },
      (error) => {
        console.warn('Watch position error:', error.message);
        // Return cached or default location
        const cached = localStorage.getItem('userLocation');
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (callback) callback(parsed);
          } catch (e) {}
        }
      },
      watchOptions
    );
  }

  /**
   * ✅ Stop watching
   */
  static clearWatch(watchId) {
    if (watchId && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchId);
    }
  }
}

export default LocationService;