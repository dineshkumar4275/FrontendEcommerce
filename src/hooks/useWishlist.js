// frontend/src/hooks/useWishlist.js
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchWishlist,
  addToWishlistAsync, 
  removeFromWishlistAsync,
  clearWishlist
} from '../store/slices/wishlistSlice';
import toast from 'react-hot-toast';

export const useWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, wishlistIds, loading, error } = useSelector((state) => state.wishlist);

  // Get wishlist count
  const wishlistCount = wishlist?.length || 0;

  // Get wishlist
  const getWishlist = useCallback(async () => {
    try {
      await dispatch(fetchWishlist()).unwrap();
    } catch (error) {
      console.error('Get wishlist error:', error);
      toast.error('Failed to load wishlist');
    }
  }, [dispatch]);

  // Add to wishlist
  const addToWishlist = useCallback(async (productId) => {
    try {
      await dispatch(addToWishlistAsync(productId)).unwrap();
      toast.success('Added to wishlist');
      return true;
    } catch (error) {
      console.error('Add to wishlist error:', error);
      toast.error(error.message || 'Failed to add to wishlist');
      return false;
    }
  }, [dispatch]);

  // Remove from wishlist
  const removeFromWishlist = useCallback(async (productId) => {
    try {
      await dispatch(removeFromWishlistAsync(productId)).unwrap();
      toast.success('Removed from wishlist');
      return true;
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      toast.error(error.message || 'Failed to remove from wishlist');
      return false;
    }
  }, [dispatch]);

  // Check if product is in wishlist
  const isInWishlist = useCallback((productId) => {
    return wishlistIds?.has(productId) || false;
  }, [wishlistIds]);

  // Toggle wishlist
  const toggleWishlist = useCallback(async (productId) => {
    if (isInWishlist(productId)) {
      return await removeFromWishlist(productId);
    } else {
      return await addToWishlist(productId);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return {
    wishlist,
    wishlistIds,
    wishlistCount,  // ✅ Add this for count
    loading,
    error,
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };
};