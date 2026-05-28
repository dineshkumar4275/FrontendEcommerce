// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   cartItems: [],
//   shippingAddress: {},
// }

// // Load cart from localStorage on client side
// if (typeof window !== 'undefined') {
//   const cartItems = localStorage.getItem('cartItems')
//   if (cartItems) initialState.cartItems = JSON.parse(cartItems)
// }

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload
//       const existItem = state.cartItems.find(x => x.id === item.id)
      
//       if (existItem) {
//         state.cartItems = state.cartItems.map(x =>
//           x.id === existItem.id ? { ...item, quantity: x.quantity + 1 } : x
//         )
//       } else {
//         state.cartItems = [...state.cartItems, { ...item, quantity: 1 }]
//       }
      
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter(x => x.id !== action.payload)
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
//       }
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload
//       state.cartItems = state.cartItems.map(item =>
//         item.id === id ? { ...item, quantity } : item
//       )
//       if (typeof window !== 'undefined') {
//         localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
//       }
//     },
//     clearCart: (state) => {
//       state.cartItems = []
//       if (typeof window !== 'undefined') {
//         localStorage.removeItem('cartItems')
//       }
//     },
//   },
// })

// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
// export default cartSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  coupon: null,
  discount: 0,
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalQuantity, totalAmount };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
    
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        const { totalQuantity, totalAmount } = calculateTotals(state.items);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
      }
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.coupon = null;
      state.discount = 0;
    },
    
    applyCoupon: (state, action) => {
      state.coupon = action.payload.code;
      state.discount = action.payload.discount;
      state.totalAmount = state.totalAmount - action.payload.discount;
    },
    
    removeCoupon: (state) => {
      const { totalAmount } = calculateTotals(state.items);
      state.coupon = null;
      state.discount = 0;
      state.totalAmount = totalAmount;
    },
    
    syncCart: (state, action) => {
      state.items = action.payload.items;
      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  syncCart,
} = cartSlice.actions;

export default cartSlice.reducer;