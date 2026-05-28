// import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   cartSidebarOpen: false,
// }

// const uiSlice = createSlice({
//   name: 'ui',
//   initialState,
//   reducers: {
//     toggleCartSidebar: (state) => {
//       state.cartSidebarOpen = !state.cartSidebarOpen
//     },
//   },
// })

// export const { toggleCartSidebar } = uiSlice.actions
// export default uiSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  sidebarOpen: false,
  cartSidebarOpen: false,
  notification: null,
  loading: false,
  modal: {
    isOpen: false,
    type: null,
    data: null,
  },
  toast: {
    show: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.theme);
        document.documentElement.classList.toggle('dark', state.theme === 'dark');
      }
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.toggle('dark', action.payload === 'dark');
      }
    },
    
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    
    toggleCartSidebar: (state) => {
      state.cartSidebarOpen = !state.cartSidebarOpen;
    },
    setCartSidebarOpen: (state, action) => {
      state.cartSidebarOpen = action.payload;
    },
    
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    hideNotification: (state) => {
      state.notification = null;
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    showModal: (state, action) => {
      state.modal = {
        isOpen: true,
        type: action.payload.type,
        data: action.payload.data,
      };
    },
    hideModal: (state) => {
      state.modal = {
        isOpen: false,
        type: null,
        data: null,
      };
    },
    
    showToast: (state, action) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideToast: (state) => {
      state.toast = {
        show: false,
        message: '',
        type: 'info',
      };
    },
  },
});

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarOpen,
  toggleCartSidebar,
  setCartSidebarOpen,
  showNotification,
  hideNotification,
  setLoading,
  showModal,
  hideModal,
  showToast,
  hideToast,
} = uiSlice.actions;

export default uiSlice.reducer;