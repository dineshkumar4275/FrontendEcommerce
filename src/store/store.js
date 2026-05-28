// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';
import authReducer from './slices/authSlice';
import wishlistReducer from './slices/wishlistSlice';
import cartReducer from './slices/cartSlice';

// Enable Immer's MapSet plugin
enableMapSet();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['wishlist/fetchWishlist/fulfilled'],
        ignoredActionPaths: ['payload.timestamp', 'meta.arg'],
        ignoredPaths: ['wishlist.wishlistIds'],
      },
    }),
});