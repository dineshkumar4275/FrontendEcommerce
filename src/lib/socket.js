// lib/socket.js
import io from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect(userId, userType = 'customer') {
    // Create auth token
    const token = btoa(`${userId}:${userType}`);
    
    this.socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    this.socket.on('connect', () => {
      console.log('✅ Socket connected:', this.socket.id);
    });

    this.socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  getSocket() {
    return this.socket;
  }

  trackOrder(orderId) {
    if (this.socket) {
      this.socket.emit('track-order', orderId);
      console.log(`Tracking order: ${orderId}`);
    }
  }

  untrackOrder(orderId) {
    if (this.socket) {
      this.socket.emit('untrack-order', orderId);
    }
  }

  onOrderUpdate(callback) {
    if (this.socket) {
      this.socket.on('order-status-update', callback);
    }
  }

  onDriverLocation(callback) {
    if (this.socket) {
      this.socket.on('driver-location', callback);
    }
  }

  onOrderAccepted(callback) {
    if (this.socket) {
      this.socket.on('order-accepted', callback);
    }
  }

  onOrderDelivered(callback) {
    if (this.socket) {
      this.socket.on('order-delivered', callback);
    }
  }
}

export default new SocketService();