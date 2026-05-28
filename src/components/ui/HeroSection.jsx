'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './Button';

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome to ShopHub
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Discover amazing products at unbeatable prices. Free shipping on orders over ₹999!
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/products">
              <Button variant="primary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Shop Now
              </Button>
            </Link>
            <Link href="/products?category=sale">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                Sale Items
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900"></div>
    </section>
  );
};