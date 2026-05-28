// app/cancelled-orders/page.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '../../src/components/layout/Header';
import { Footer } from '../../src/components/layout/Footer';
import orderCancelService from '../../src/services/orderCancelService';

export default function CancelledOrdersPage() {
  const [cancelledOrders, setCancelledOrders] = useState([]);

  useEffect(() => {
    loadCancelledOrders();
  }, []);

  const loadCancelledOrders = () => {
    const cancelled = orderCancelService.getCancelledOrders();
    setCancelledOrders(cancelled);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8 pt-24">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Cancelled Orders</h1>
          
          {cancelledOrders.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <p className="text-gray-500">No cancelled orders</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cancelledOrders.map((record) => (
                <div key={record.orderId} className="bg-white rounded-xl p-6 shadow-sm">
                  <p className="font-semibold">Order #{record.orderId}</p>
                  <p className="text-sm text-gray-500">Cancelled on: {new Date(record.cancelledAt).toLocaleString()}</p>
                  <p className="text-sm mt-2">Reason: {record.reason}</p>
                  <p className="text-sm text-red-600">Refund Status: {record.refundStatus}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}