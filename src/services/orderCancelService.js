// src/services/orderCancelService.js
'use client';

const STORAGE_KEYS = {
  ORDERS: 'orders',
  USER_ORDERS: 'user_orders',
  CANCELLED_ORDERS: 'cancelled_orders'
};

class OrderCancelService {
  constructor() {
    this.listeners = [];
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(cb => cb !== callback);
  }

  notifyListeners(orders) {
    this.listeners.forEach(callback => callback(orders));
  }

  getOrders() {
    const orders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    return orders ? JSON.parse(orders) : [];
  }

  saveOrders(orders) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    localStorage.setItem(STORAGE_KEYS.USER_ORDERS, JSON.stringify(orders));
    this.notifyListeners(orders);
  }

  // Non-cancellable product categories
  getNonCancellableCategories() {
    return ['digital', 'ebook', 'course', 'giftcard', 'personalized', 'custom', 'hygiene'];
  }

  // Check if product is cancellable
  isProductCancellable(product) {
    const category = product?.category?.toLowerCase();
    const nonCancellable = this.getNonCancellableCategories();
    return !nonCancellable.includes(category);
  }

  // Get cancellation time window (in minutes)
  getCancellationWindowMinutes() {
    return 30; // 30 minutes after order placement
  }

  // Check if order is within cancellation time window
  isWithinCancellationWindow(order) {
    if (!order?.created_at) return false;
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const diffMinutes = (now - orderDate) / (1000 * 60);
    return diffMinutes <= this.getCancellationWindowMinutes();
  }

  // Main canCancel function with advanced logic
  canCancelOrder(order) {
    if (!order) return false;

    // 1. Check if already delivered
    if (order.status === 'delivered') {
      return false;
    }

    // 2. Check if already shipped or out for delivery
    if (order.status === 'shipped' || order.status === 'out_for_delivery') {
      return false;
    }

    // 3. Check if already cancelled
    if (order.status === 'cancelled') {
      return false;
    }

    // 4. Check non-cancellable products
    const items = order.items || order.products || [];
    const hasNonCancellableItem = items.some(item => 
      !this.isProductCancellable(item)
    );
    
    if (hasNonCancellableItem) {
      return false;
    }

    // 5. Check status - only pending or confirmed can be cancelled
    const cancellableStatuses = ['pending', 'confirmed'];
    if (!cancellableStatuses.includes(order.status?.toLowerCase())) {
      return false;
    }

    return true;
  }

  // Get cancellation reason (why can't cancel)
  getCancellationRestrictionReason(order) {
    if (!order) return 'Order not found';

    if (order.status === 'delivered') {
      return 'Order already delivered. You can request a return instead.';
    }

    if (order.status === 'shipped' || order.status === 'out_for_delivery') {
      return 'Order has been shipped. Cancellation is not allowed. You can request a return after delivery.';
    }

    if (order.status === 'cancelled') {
      return 'Order is already cancelled.';
    }

    const items = order.items || order.products || [];
    const nonCancellableItems = items.filter(item => !this.isProductCancellable(item));
    
    if (nonCancellableItems.length > 0) {
      return `Cannot cancel: ${nonCancellableItems.map(i => i.name).join(', ')} ${nonCancellableItems.length === 1 ? 'is' : 'are'} non-cancellable items.`;
    }

    if (!this.isWithinCancellationWindow(order)) {
      return `Cancellation window of ${this.getCancellationWindowMinutes()} minutes has passed.`;
    }

    const cancellableStatuses = ['pending', 'confirmed'];
    if (!cancellableStatuses.includes(order.status?.toLowerCase())) {
      return `Order cannot be cancelled at current status: ${order.status}.`;
    }

    return 'Order cannot be cancelled';
  }

  // Get cancellation time remaining (in minutes)
  getCancellationTimeRemaining(order) {
    if (!order?.created_at) return 0;
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const elapsedMinutes = (now - orderDate) / (1000 * 60);
    const remaining = Math.max(0, this.getCancellationWindowMinutes() - elapsedMinutes);
    return Math.floor(remaining);
  }

  // Check if order can be returned
  canReturnOrder(order) {
    if (!order) return false;
    
    // Can return only delivered orders
    if (order.status !== 'delivered') return false;
    
    // Check return window (e.g., 7 days)
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const diffDays = (now - orderDate) / (1000 * 60 * 60 * 24);
    
    return diffDays <= 7; // 7 days return window
  }

  // Get return window remaining days
  getReturnDaysRemaining(order) {
    if (!order?.created_at) return 0;
    const orderDate = new Date(order.created_at);
    const now = new Date();
    const elapsedDays = (now - orderDate) / (1000 * 60 * 60 * 24);
    const remaining = Math.max(0, 7 - elapsedDays);
    return Math.floor(remaining);
  }

  // Cancel order with reason
  async cancelOrder(orderId, reason = '', comments = '') {
    try {
      const orders = this.getOrders();
      const orderIndex = orders.findIndex(o => 
        o.id === orderId || o.order_number === orderId || o.orderNumber === orderId
      );

      if (orderIndex === -1) {
        return { success: false, message: 'Order not found' };
      }

      const order = orders[orderIndex];

      if (!this.canCancelOrder(order)) {
        return { 
          success: false, 
          message: this.getCancellationRestrictionReason(order)
        };
      }

      // Create cancellation record
      const cancellationRecord = {
        orderId: order.id,
        cancelledAt: new Date().toISOString(),
        reason: reason,
        comments: comments,
        previousStatus: order.status,
        refundStatus: order.payment_method === 'online' ? 'pending' : 'not_applicable',
        cancellationMethod: 'user_requested'
      };

      // Update order
      const updatedOrder = {
        ...order,
        status: 'cancelled',
        cancelled_at: new Date().toISOString(),
        cancellation_reason: reason,
        cancellation_comments: comments,
        cancellation_record: cancellationRecord
      };

      orders[orderIndex] = updatedOrder;
      this.saveOrders(orders);

      // Save to cancelled orders history
      const cancelledOrders = JSON.parse(localStorage.getItem(STORAGE_KEYS.CANCELLED_ORDERS) || '[]');
      cancelledOrders.unshift(cancellationRecord);
      localStorage.setItem(STORAGE_KEYS.CANCELLED_ORDERS, JSON.stringify(cancelledOrders));

      window.dispatchEvent(new CustomEvent('orderCancelled', { detail: { orderId } }));

      return { 
        success: true, 
        message: 'Order cancelled successfully',
        order: updatedOrder,
        cancellation: cancellationRecord
      };
    } catch (error) {
      console.error('Cancel order error:', error);
      return { success: false, message: 'Failed to cancel order' };
    }
  }

  // Get cancellation reasons for UI
  getCancellationReasons() {
    return [
      { id: 1, reason: 'Changed my mind', default: true },
      { id: 2, reason: 'Found better price elsewhere' },
      { id: 3, reason: 'Order placed by mistake' },
      { id: 4, reason: 'Shipping address is wrong' },
      { id: 5, reason: 'Delivery time is too long' },
      { id: 6, reason: 'Item is out of stock' },
      { id: 7, reason: 'Payment issue' },
      { id: 8, reason: 'Other reasons' },
    ];
  }

  getCancelledOrders() {
    const cancelled = localStorage.getItem(STORAGE_KEYS.CANCELLED_ORDERS);
    return cancelled ? JSON.parse(cancelled) : [];
  }

  getOrderById(orderId) {
    const orders = this.getOrders();
    return orders.find(o => 
      o.id === orderId || o.order_number === orderId || o.orderNumber === orderId
    );
  }

  getCancellationStatus(orderId) {
    const order = this.getOrderById(orderId);
    if (!order) return null;
    
    return {
      isCancelled: order.status === 'cancelled',
      canCancel: this.canCancelOrder(order),
      cancellationReason: this.getCancellationRestrictionReason(order),
      cancelledAt: order.cancelled_at || null,
      reason: order.cancellation_reason || null,
      timeRemaining: this.getCancellationTimeRemaining(order)
    };
  }
}

const orderCancelService = new OrderCancelService();
export default orderCancelService;