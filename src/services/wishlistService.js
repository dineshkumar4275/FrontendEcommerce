// // // frontend/services/wishlistService.js
// // import apiClient from '../lib/apiClient';

// // // Get user's wishlist
// // export const getWishlist = async () => {
// //   try {
// //     const response = await apiClient.get('/wishlist');
// //     return response.data;
// //   } catch (error) {
// //     console.error('Get wishlist error:', error);
// //     throw error;
// //   }
// // };

// // // Add to wishlist
// // export const addToWishlist = async (productId) => {
// //   try {
// //     const response = await apiClient.post('/wishlist', { productId });
// //     return response.data;
// //   } catch (error) {
// //     console.error('Add to wishlist error:', error);
// //     throw error;
// //   }
// // };

// // // Remove from wishlist
// // export const removeFromWishlist = async (productId) => {
// //   try {
// //     const response = await apiClient.delete(`/wishlist/${productId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Remove from wishlist error:', error);
// //     throw error;
// //   }
// // };

// // // Check if product is in wishlist
// // export const checkWishlist = async (productId) => {
// //   try {
// //     const response = await apiClient.get(`/wishlist/check/${productId}`);
// //     return response.data;
// //   } catch (error) {
// //     console.error('Check wishlist error:', error);
// //     throw error;
// //   }
// // };

// import apiClient from '../lib/apiClient';

// // Get user's wishlist
// export const getWishlist = async () => {
//   try {
//     const response = await apiClient.get('/wishlist');
//     return response;
//   } catch (error) {
//     console.error('Get wishlist error:', error);
//     throw error;
//   }
// };

// // Add to wishlist - FIXED: Ensure productId is sent correctly
// export const addToWishlist = async (productId) => {
//   try {
//     if (!productId) {
//       throw new Error('Product ID is required');
//     }
    
//     console.log('Sending add to wishlist request with productId:', productId);
    
//     // Try both formats that backend might expect
//     const response = await apiClient.post('/wishlist', { 
//       productId: productId,
//       product_id: productId 
//     });
    
//     console.log('Add to wishlist response:', response.data);
//     return response;
//   } catch (error) {
//     console.error('Add to wishlist error:', error);
//     throw error;
//   }
// };

// // Remove from wishlist
// export const removeFromWishlist = async (productId) => {
//   try {
//     if (!productId) {
//       throw new Error('Product ID is required');
//     }
    
//     console.log('Sending remove from wishlist request for productId:', productId);
//     const response = await apiClient.delete(`/wishlist/${productId}`);
//     return response;
//   } catch (error) {
//     console.error('Remove from wishlist error:', error);
//     throw error;
//   }
// };

// // Check if product is in wishlist
// export const checkWishlist = async (productId) => {
//   try {
//     const response = await apiClient.get(`/wishlist/check/${productId}`);
//     return response;
//   } catch (error) {
//     console.error('Check wishlist error:', error);
//     throw error;
//   }
// };
// services/wishlistService.js
import apiClient from '../lib/apiClient';

// Get user's wishlist
export const getWishlist = async () => {
  try {
    // 确保 token 存在
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, redirecting to login');
      throw new Error('Please login to view wishlist');
    }
    
    console.log('Fetching wishlist with token:', token.substring(0, 30) + '...');
    
    const response = await apiClient.get('/wishlist');
    
    console.log('Wishlist response:', response.data);
    
    if (response.data.success) {
      return { success: true, data: response.data.data || [] };
    } else {
      return { success: false, message: response.data.message };
    }
  } catch (error) {
    console.error('Get wishlist error:', error);
    throw error;
  }
};

// Add to wishlist
export const addToWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to add to wishlist');
    }
    
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    console.log('Adding to wishlist - Product ID:', productId);
    console.log('Using token:', token.substring(0, 30) + '...');
    
    const response = await apiClient.post('/wishlist', { 
      productId: productId
    });
    
    console.log('Add to wishlist response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Add to wishlist error:', error);
    throw error;
  }
};

// Remove from wishlist
export const removeFromWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Please login to remove from wishlist');
    }
    
    if (!productId) {
      throw new Error('Product ID is required');
    }
    
    console.log('Removing from wishlist - Product ID:', productId);
    
    const response = await apiClient.delete(`/wishlist/${productId}`);
    
    console.log('Remove response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    throw error;
  }
};

// Check if product is in wishlist
export const checkWishlist = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return { success: true, inWishlist: false };
    }
    
    const response = await apiClient.get(`/wishlist/check/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Check wishlist error:', error);
    return { success: true, inWishlist: false };
  }
};