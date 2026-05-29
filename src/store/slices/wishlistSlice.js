import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getWishlist, addToWishlist, removeFromWishlist } from '../../services/wishlistService';
import toast from 'react-hot-toast';

// Async thunks
export const fetchWishlist = createAsyncThunk(
  'wishlist/fetchWishlist',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return [];
      }
      const response = await getWishlist();
      const data = response.data?.data || response.data || [];
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Fetch wishlist error:', error);
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch wishlist');
    }
  }
);

export const addToWishlistAsync = createAsyncThunk(
  'wishlist/addToWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        throw new Error('Please login first');
      }
      
      console.log('Adding to wishlist - productId:', productId);
      
      const response = await addToWishlist(productId);
      
      toast.success('Added to wishlist!', { 
        icon: '❤️',
        duration: 2000,
      });
      
      await dispatch(fetchWishlist());
      
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to add to wishlist';
      console.error('Add to wishlist error:', message);
      toast.error(message, { icon: '💔' });
      return rejectWithValue(message);
    }
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  'wishlist/removeFromWishlist',
  async (productId, { rejectWithValue, dispatch }) => {
    try {
      if (!productId) {
        throw new Error('Product ID is required');
      }
      
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login first');
        throw new Error('Please login first');
      }
      
      console.log('Removing from wishlist - productId:', productId);
      
      const response = await removeFromWishlist(productId);
      
      toast.success('Removed from wishlist!', { 
        icon: '💔',
        duration: 2000,
      });
      
      await dispatch(fetchWishlist());
      
      return { productId, ...response.data };
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to remove from wishlist';
      console.error('Remove from wishlist error:', message);
      toast.error(message, { icon: '❌' });
      return rejectWithValue(message);
    }
  }
);

const initialState = {
  items: [],
  wishlist: [],        // ✅ ADD THIS - alias for items
  wishlistIds: new Set(), // ✅ ADD THIS - Set of product IDs
  loading: false,
  error: null,
  totalCount: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
      state.wishlist = [];
      state.wishlistIds = new Set();
      state.error = null;
      state.totalCount = 0;
    },
    // Optimistic update for UI
    addToWishlistLocal: (state, action) => {
      const product = action.payload;
      const productId = product.id || product._id || product.productId;
      
      const exists = state.wishlistIds.has(String(productId));
      
      if (!exists) {
        state.wishlistIds.add(String(productId));
        const newItem = { 
          product_id: productId,
          productId: productId,
          id: productId,
          name: product.name || '',
          price: product.price || 0,
          image_url: product.image_url || product.image,
        };
        state.items.unshift(newItem);
        state.wishlist = state.items;
        state.totalCount = state.items.length;
      }
    },
    removeFromWishlistLocal: (state, action) => {
      const productId = action.payload;
      state.wishlistIds.delete(String(productId));
      state.items = state.items.filter(item => {
        const itemId = item.product_id || item.productId || item.id || item._id;
        return String(itemId) !== String(productId);
      });
      state.wishlist = state.items;
      state.totalCount = state.items.length;
    },
    toggleWishlistLocal: (state, action) => {
      const productId = action.payload;
      const exists = state.wishlistIds.has(String(productId));
      
      if (exists) {
        state.wishlistIds.delete(String(productId));
        state.items = state.items.filter(item => {
          const itemId = item.product_id || item.productId || item.id || item._id;
          return String(itemId) !== String(productId);
        });
      } else {
        state.wishlistIds.add(String(productId));
        state.items.unshift({ 
          product_id: productId, 
          productId: productId,
          id: productId,
        });
      }
      state.wishlist = state.items;
      state.totalCount = state.items.length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch wishlist
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload || [];
        state.wishlist = state.items;  // ✅ UPDATE wishlist
        state.wishlistIds = new Set((action.payload || []).map(item => 
          String(item.product_id || item.productId || item.id || item._id)
        ));  // ✅ UPDATE wishlistIds
        state.totalCount = (action.payload || []).length;
        state.error = null;
        console.log('Wishlist loaded:', state.totalCount, 'items'); // Debug log
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
        state.wishlist = [];
        state.wishlistIds = new Set();
        state.totalCount = 0;
      })
      // Add to wishlist
      .addCase(addToWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlistAsync.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addToWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove from wishlist
      .addCase(removeFromWishlistAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        state.loading = false;
        const productId = action.payload?.productId;
        if (productId) {
          state.wishlistIds.delete(String(productId));
          state.items = state.items.filter(item => {
            const itemId = item.product_id || item.productId || item.id || item._id;
            return String(itemId) !== String(productId);
          });
          state.wishlist = state.items;
          state.totalCount = state.items.length;
        }
      })
      .addCase(removeFromWishlistAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectIsInWishlist = (state, productId) => {
  if (!state.wishlist?.wishlistIds) return false;
  return state.wishlist.wishlistIds.has(String(productId));
};

export const selectWishlistCount = (state) => state.wishlist?.totalCount || 0;

export const { 
  clearWishlist, 
  toggleWishlistLocal, 
  addToWishlistLocal, 
  removeFromWishlistLocal 
} = wishlistSlice.actions;

export default wishlistSlice.reducer;