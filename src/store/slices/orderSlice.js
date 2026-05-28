// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     orders: [],
//     currentOrder: null,
//     loading: false,
//     error: null,
//     trackingInfo: null,
// }

// const orderSlice = createSlice({
//     name: 'orders',
//     initialState,
//     reducers: {
//         setOrders: (state, action) => {
//             state.orders = action.payload
//             state.loading = false
//         },
//         setCurrentOrder: (state, action) => {
//             state.currentOrder = action.payload
//             state.loading = false
//         },
//         setTrackingInfo: (state, action) => {
//             state.trackingInfo = action.payload
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload
//         },
//         setError: (state, action) => {
//             state.error = action.payload
//             state.loading = false
//         },
//         clearCurrentOrder: (state) => {
//             state.currentOrder = null
//         },
//     },
// })

// export const { setOrders, setCurrentOrder, setTrackingInfo, setLoading, setError, clearCurrentOrder } = orderSlice.actions
// export default orderSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  orderStatus: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    fetchOrderByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedOrder = action.payload;
    },
    fetchOrderByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    createOrderStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.unshift(action.payload);
      state.selectedOrder = action.payload;
    },
    createOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.orders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
      if (state.selectedOrder?.id === orderId) {
        state.selectedOrder.status = status;
      }
    },
    
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  fetchOrderByIdStart,
  fetchOrderByIdSuccess,
  fetchOrderByIdFailure,
  createOrderStart,
  createOrderSuccess,
  createOrderFailure,
  updateOrderStatus,
  clearSelectedOrder,
  clearError,
} = orderSlice.actions;

export default orderSlice.reducer;