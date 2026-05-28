import { useEffect, useState } from 'react';
import socketService from '../services/socket';

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastOrder, setLastOrder] = useState(null);
  
  useEffect(() => {
    socketService.connect();
    
    socketService.onNewOrder((order) => {
      setLastOrder(order);
    });
    
    const interval = setInterval(() => {
      setIsConnected(socketService.isConnected);
    }, 1000);
    
    return () => {
      clearInterval(interval);
      socketService.disconnect();
    };
  }, []);
  
  return { socketService, isConnected, lastOrder };
};