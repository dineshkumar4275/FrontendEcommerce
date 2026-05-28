


// app/page.jsx
'use client';

import { Header } from '../src/components/layout/Header';
import { Footer } from '../src/components/layout/Footer';
import { FeaturedProducts } from '../src/components/products/FeaturedProducts';
import Link from 'next/link';
import { ArrowRightIcon, SparklesIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black pt-20">
        
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-purple-950 to-black">

          {/* Glow Background */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-600 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          </div>

          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/60 backdrop-blur-md border border-slate-700 mb-6 animate-fade-down">
              <SparklesIcon className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-slate-300">Limited Time Offer</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-up">
              <span className="text-slate-200">Discover Your</span>
              <span className="block bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mt-2">
                Perfect Style
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto animate-fade-up animation-delay-200">
              Shop from 10,000+ premium products with exclusive offers and lightning-fast delivery
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4 animate-fade-up animation-delay-400">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:scale-105 transition-all duration-300"
              >
                <ShoppingBagIcon className="w-5 h-5" />
                Shop Now
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-3 bg-slate-800/60 backdrop-blur-md border border-slate-700 text-slate-200 rounded-full font-semibold hover:bg-slate-700 transition-all duration-300"
              >
                View Collections
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-16 pt-8 border-t border-slate-800 animate-fade-up animation-delay-600">
              <div>
                <div className="text-2xl font-bold text-slate-200">10k+</div>
                <div className="text-sm text-slate-500">Happy Customers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">500+</div>
                <div className="text-sm text-slate-500">Brands</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">24/7</div>
                <div className="text-sm text-slate-500">Support</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-200">Free</div>
                <div className="text-sm text-slate-500">Delivery*</div>
              </div>
            </div>

          </div>

          {/* 🌊 Vertical Waves */}
          <div className="relative mt-16 overflow-hidden h-32">

            {/* Back Wave */}
            <svg
              className="absolute top-0 left-0 w-full h-40 animate-wave-down-slow opacity-40"
              viewBox="0 0 1440 120"
            >
              <path
                fill="#020617"
                d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,120 L0,120 Z"
              />
            </svg>

            {/* Front Wave */}
            <svg
              className="absolute top-0 left-0 w-full h-40 animate-wave-down-fast"
              viewBox="0 0 1440 120"
            >
              <path
                fill="#020617"
                d="M0,70 C300,100 600,20 900,60 C1200,100 1440,40 1440,40 L1440,120 L0,120 Z"
              />
            </svg>

          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

              {[ 
                { icon: TruckIcon, title: "Free Shipping", desc: "On orders above ₹500" },
                { icon: ShieldCheckIcon, title: "Secure Payment", desc: "100% Secure" },
                { icon: ClockIcon, title: "24/7 Support", desc: "Dedicated team" },
                { icon: ArrowRightIcon, title: "Easy Returns", desc: "7 days return" }
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <item.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-slate-200">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* Products */}
        <div className="container mx-auto px-4 py-8 bg-slate-950">
          <FeaturedProducts 
            title="✨ Featured Products" 
            limit={8}
            showViewAll={true}
          />
        </div>

      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-fade-up { animation: fade-up 0.6s ease-out forwards; }
        .animate-fade-down { animation: fade-down 0.6s ease-out forwards; }

        .animation-delay-200 { animation-delay: 0.2s; opacity: 0; }
        .animation-delay-400 { animation-delay: 0.4s; opacity: 0; }
        .animation-delay-600 { animation-delay: 0.6s; opacity: 0; }

        /* 🌊 Vertical Wave Animation */
        @keyframes waveDown {
          0% { transform: translateY(-40px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(-40px); }
        }

        .animate-wave-down-fast {
          animation: waveDown 4s ease-in-out infinite;
        }

        .animate-wave-down-slow {
          animation: waveDown 7s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </>
  );
}