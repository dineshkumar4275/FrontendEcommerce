// contexts/OrderContext.jsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);
  const [activeDrivers, setActiveDrivers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    const savedDrivers = localStorage.getItem('drivers');
    const savedNotifications = localStorage.getItem('notifications');

    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedDrivers) setActiveDrivers(JSON.parse(savedDrivers));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('drivers', JSON.stringify(activeDrivers));
  }, [activeDrivers]);

  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Create new order (called when user places order)
  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      order_number: `ORD${Date.now()}`,
      user_name: orderData.userName || 'Customer',
      user_phone: orderData.userPhone || '9876543210',
      user_address: orderData.address,
      items: orderData.items,
      total_amount: orderData.totalAmount,
      status: 'pending',
      driver_id: null,
      driver_name: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    setOrders(prev => [newOrder, ...prev]);
    
    // Add notification for admin
    addNotification({
      type: 'NEW_ORDER',
      orderId: newOrder.id,
      message: `New order #${newOrder.order_number} for ₹${newOrder.total_amount}`,
      timestamp: new Date().toISOString(),
      read: false
    });

    toast.success('Order placed successfully!');
    
    // Play notification sound
    playNotificationSound();
    
    return newOrder;
  };

  // Assign driver to order
  const assignDriver = (orderId, driverId) => {
    const driver = activeDrivers.find(d => d.id === driverId);
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            driver_id: driverId, 
            driver_name: driver?.name,
            status: 'accepted',
            updated_at: new Date().toISOString()
          }
        : order
    ));

    // Add notification for driver
    addNotification({
      type: 'ORDER_ASSIGNED',
      orderId: orderId,
      driverId: driverId,
      message: `You have been assigned order #${orderId}`,
      timestamp: new Date().toISOString(),
      read: false
    });

    toast.success(`Driver ${driver?.name} assigned to order`);
  };

  // Update order status
  const updateOrderStatus = (orderId, status, driverId = null) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status, updated_at: new Date().toISOString() }
        : order
    ));

    const order = orders.find(o => o.id === orderId);
    
    // Add notification
    addNotification({
      type: 'ORDER_STATUS_UPDATED',
      orderId: orderId,
      message: `Order #${orderId} status changed to ${status}`,
      timestamp: new Date().toISOString(),
      read: false
    });

    toast.success(`Order status updated to ${status}`);
  };

  // Add driver
  const addDriver = (driverData) => {
    const newDriver = {
      id: Date.now(),
      name: driverData.name,
      phone: driverData.phone,
      vehicle_number: driverData.vehicleNumber,
      is_available: true,
      current_latitude: null,
      current_longitude: null,
      created_at: new Date().toISOString()
    };

    setActiveDrivers(prev => [...prev, newDriver]);
    toast.success('Driver added successfully');
    return newDriver;
  };

  // Add notification
  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Auto-mark as read after 5 seconds
    setTimeout(() => {
      markNotificationAsRead(notification);
    }, 5000);
  };

  const markNotificationAsRead = (notification) => {
    setNotifications(prev => prev.map(n => 
      n.timestamp === notification.timestamp && n.orderId === notification.orderId
        ? { ...n, read: true }
        : n
    ));
  };

  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'pending');
  };

  const getDriverOrders = (driverId) => {
    return orders.filter(order => 
      order.driver_id === driverId && order.status !== 'delivered'
    );
  };

  const playNotificationSound = () => {
    const audio = new Audio('/notification.mp3');
    audio.play().catch(e => console.log('Audio play failed:', e));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      activeDrivers,
      notifications,
      createOrder,
      assignDriver,
      updateOrderStatus,
      addDriver,
      getPendingOrders,
      getDriverOrders,
      markNotificationAsRead
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within OrderProvider');
  }
  return context;
}