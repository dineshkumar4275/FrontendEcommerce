// src/services/storageService.js
// Amazon-style storage management

// ============ CART (localStorage - persists forever) ============
export const cartStorage = {
  getItems: () => {
    const cart = localStorage.getItem('amazon_cart');
    return cart ? JSON.parse(cart) : [];
  },
  
  saveItems: (items) => {
    localStorage.setItem('amazon_cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
  },
  
  addItem: (item) => {
    const items = cartStorage.getItems();
    const existing = items.find(i => i.id === item.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push(item);
    }
    cartStorage.saveItems(items);
  },
  
  removeItem: (id) => {
    const items = cartStorage.getItems().filter(i => i.id !== id);
    cartStorage.saveItems(items);
  },
  
  updateQuantity: (id, quantity) => {
    const items = cartStorage.getItems();
    const item = items.find(i => i.id === id);
    if (item) item.quantity = quantity;
    cartStorage.saveItems(items);
  },
  
  clearCart: () => {
    localStorage.removeItem('amazon_cart');
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

// ============ ORDERS (localStorage - order history) ============
export const ordersStorage = {
  getAll: () => {
    const orders = localStorage.getItem('amazon_orders');
    return orders ? JSON.parse(orders) : [];
  },
  
  saveOrder: (order) => {
    const orders = ordersStorage.getAll();
    orders.unshift(order); // Newest first
    localStorage.setItem('amazon_orders', JSON.stringify(orders));
    
    // Also save last order ID for tracking
    sessionStorage.setItem('amazon_last_order_id', order.id);
    
    return order;
  },
  
  getOrder: (id) => {
    const orders = ordersStorage.getAll();
    return orders.find(o => o.id === id || o.order_number === id);
  },
  
  updateOrderStatus: (id, status) => {
    const orders = ordersStorage.getAll();
    const order = orders.find(o => o.id === id || o.order_number === id);
    if (order) {
      order.status = status;
      order.updated_at = new Date().toISOString();
      localStorage.setItem('amazon_orders', JSON.stringify(orders));
    }
  }
};

// ============ CHECKOUT (sessionStorage - temporary, clears on browser close) ============
export const checkoutStorage = {
  saveCheckoutData: (data) => {
    sessionStorage.setItem('amazon_checkout', JSON.stringify(data));
  },
  
  getCheckoutData: () => {
    const data = sessionStorage.getItem('amazon_checkout');
    return data ? JSON.parse(data) : null;
  },
  
  clearCheckoutData: () => {
    sessionStorage.removeItem('amazon_checkout');
  },
  
  savePaymentIntent: (paymentData) => {
    sessionStorage.setItem('amazon_payment_intent', JSON.stringify(paymentData));
  },
  
  getPaymentIntent: () => {
    const data = sessionStorage.getItem('amazon_payment_intent');
    return data ? JSON.parse(data) : null;
  }
};

// ============ USER PREFERENCES (localStorage) ============
export const preferencesStorage = {
  getRecentlyViewed: () => {
    const viewed = localStorage.getItem('amazon_recently_viewed');
    return viewed ? JSON.parse(viewed) : [];
  },
  
  addRecentlyViewed: (product) => {
    let viewed = preferencesStorage.getRecentlyViewed();
    viewed = viewed.filter(p => p.id !== product.id);
    viewed.unshift(product);
    if (viewed.length > 20) viewed.pop();
    localStorage.setItem('amazon_recently_viewed', JSON.stringify(viewed));
  },
  
  getWishlist: () => {
    const wishlist = localStorage.getItem('amazon_wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
  },
  
  saveWishlist: (wishlist) => {
    localStorage.setItem('amazon_wishlist', JSON.stringify(wishlist));
  },
  
  addToWishlist: (product) => {
    const wishlist = preferencesStorage.getWishlist();
    if (!wishlist.find(p => p.id === product.id)) {
      wishlist.push(product);
      preferencesStorage.saveWishlist(wishlist);
    }
  },
  
  removeFromWishlist: (productId) => {
    const wishlist = preferencesStorage.getWishlist().filter(p => p.id !== productId);
    preferencesStorage.saveWishlist(wishlist);
  }
};

// ============ SHIPPING ADDRESSES (localStorage) ============
export const addressStorage = {
  getAddresses: () => {
    const addresses = localStorage.getItem('amazon_addresses');
    return addresses ? JSON.parse(addresses) : [];
  },
  
  saveAddress: (address) => {
    const addresses = addressStorage.getAddresses();
    if (address.isDefault) {
      addresses.forEach(a => a.isDefault = false);
    }
    addresses.push({ ...address, id: Date.now() });
    localStorage.setItem('amazon_addresses', JSON.stringify(addresses));
  },
  
  getDefaultAddress: () => {
    return addressStorage.getAddresses().find(a => a.isDefault) || null;
  }
};