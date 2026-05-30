// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//     products: [],
//     featuredProducts: [],
//     productDetails: null,
//     loading: false,
//     error: null,
//     categories: [],
//     totalPages: 1,
//     currentPage: 1,
// }

// const productSlice = createSlice({
//     name: 'products',
//     initialState,
//     reducers: {
//         setProducts: (state, action) => {
//             state.products = action.payload.products || action.payload
//             state.totalPages = action.payload.totalPages || 1
//             state.currentPage = action.payload.currentPage || 1
//             state.loading = false
//         },
//         setFeaturedProducts: (state, action) => {
//             state.featuredProducts = action.payload
//         },
//         setProductDetails: (state, action) => {
//             state.productDetails = action.payload
//             state.loading = false
//         },
//         setLoading: (state, action) => {
//             state.loading = action.payload
//         },
//         setError: (state, action) => {
//             state.error = action.payload
//             state.loading = false
//         },
//         setCategories: (state, action) => {
//             state.categories = action.payload
//         },
//     },
// })

// export const { setProducts, setFeaturedProducts, setProductDetails, setLoading, setError, setCategories } = productSlice.actions
// export default productSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  selectedProduct: null,
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalProducts: 0,
  categories: [],
  trendingProducts: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.totalProducts = action.payload.totalProducts;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    fetchProductByIdStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductByIdSuccess: (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    },
    fetchProductByIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    fetchCategoriesSuccess: (state, action) => {
      state.categories = action.payload;
    },
    
    fetchTrendingSuccess: (state, action) => {
      state.trendingProducts = action.payload;
    },
    
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductByIdStart,
  fetchProductByIdSuccess,
  fetchProductByIdFailure,
  fetchCategoriesSuccess,
  fetchTrendingSuccess,
  clearSelectedProduct,
  clearError,
} = productSlice.actions;

export default productSlice.reducer;