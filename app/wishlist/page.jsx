'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import { setCredentials, logout } from '../../src/store/slices/authSlice';
import apiClient from '../../src/lib/apiClient';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      console.log('Checking authentication...', { 
        hasToken: !!storedToken, 
        hasUser: !!storedUser 
      });
      
      if (!storedToken || !storedUser) {
        console.log('No token/user found, redirecting to login');
        localStorage.setItem('redirectAfterLogin', '/wishlist');
        setCheckingAuth(false);
        router.push('/login');
        return;
      }

      try {
        const userData = JSON.parse(storedUser);
        dispatch(setCredentials({ user: userData, token: storedToken }));
        await fetchWishlist(storedToken);
      } catch (error) {
        console.error('Auth check error:', error);
        handleAuthError();
      } finally {
        setCheckingAuth(false);
      }
    };

    checkAuthAndFetch();
  }, []);

  const fetchWishlist = async (token) => {
    try {
      setLoading(true);
      console.log('Fetching wishlist with token...');
      
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      const response = await apiClient.get('/wishlist');
      
      console.log('Wishlist API Response:', response.data);
      
      if (response.data.success) {
        const items = response.data.data || [];
        console.log('Wishlist items:', items);
        
        // Log each item's image URL for debugging
        items.forEach((item, index) => {
          console.log(`Item ${index}:`, {
            name: item.name,
            image_url: item.image_url,
            hasImage: !!item.image_url
          });
        });
        
        setWishlist(items);
      } else {
        setWishlist([]);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        toast.error('Failed to load wishlist');
        setWishlist([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('redirectAfterLogin');
    delete apiClient.defaults.headers.common['Authorization'];
    dispatch(logout());
    localStorage.setItem('redirectAfterLogin', '/wishlist');
    router.push('/login');
  };

  const handleRemove = async (productId) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      handleAuthError();
      return;
    }
    
    console.log('Removing product from wishlist:', productId);
    
    try {
      const response = await apiClient.delete(`/wishlist/${productId}`);
      console.log('Remove response:', response.data);
      
      if (response.data.success) {
        setWishlist(prev => prev.filter(item => item.product_id !== productId));
        toast.success('Removed from wishlist');
      } else {
        toast.error(response.data.message || 'Failed to remove');
      }
    } catch (error) {
      console.error('Remove error:', error);
      if (error.response?.status === 401) {
        handleAuthError();
      } else {
        toast.error(error.response?.data?.message || 'Failed to remove from wishlist');
      }
    }
  };

  // Function to get image URL with fallback
  const getImageUrl = (item) => {
    if (item.image_url) {
      return item.image_url;
    }
    // Check for other possible image fields
    if (item.images && item.images.length > 0) {
      return item.images[0];
    }
    if (item.image) {
      return item.image;
    }
    // Return placeholder if no image
    return 'https://via.placeholder.com/200x200?text=No+Image';
  };

  if (checkingAuth || loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading wishlist...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50/30 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
            My Wishlist ({wishlist.length})
          </h1>
          
          {wishlist.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
              <div className="text-7xl mb-4">❤️</div>
              <p className="text-gray-500 text-lg mb-4">Your wishlist is empty</p>
              <p className="text-gray-400 mb-6">Save your favorite items here</p>
              <Link 
                href="/products" 
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {wishlist.map((item, index) => {
                const imageUrl = getImageUrl(item);
                console.log(`Rendering item ${index}:`, { name: item.name, imageUrl });
                
                return (
                  <div 
                    key={item.id || index} 
                    className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-purple-200 transition-all group"
                  >
                    <Link href={`/products/${item.product_id}`}>
                      <div className="p-4">
                        <div className="h-40 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg overflow-hidden">
                          {imageUrl ? (
                            <img 
                              src={imageUrl}
                              alt={item.name}
                              className="max-h-full max-w-full object-contain group-hover:scale-105 transition duration-300"
                              onError={(e) => {
                                console.log(`Image failed to load for ${item.name}:`, imageUrl);
                                e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="text-gray-400 flex flex-col items-center">
                              <svg className="w-12 h-12 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span className="text-xs">No Image</span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-gray-800 mt-3 line-clamp-2 text-sm hover:text-purple-600 transition">
                          {item.name}
                        </h3>
                        <p className="text-purple-600 font-bold mt-2">
                          ₹{typeof item.price === 'number' ? item.price.toLocaleString() : parseInt(item.price)?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </Link>
                    <div className="px-4 pb-4">
                      <button 
                        onClick={() => handleRemove(item.product_id)} 
                        className="w-full text-red-500 text-sm py-2 hover:bg-red-50 rounded-lg transition font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}