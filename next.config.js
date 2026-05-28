// /** @type {import('next').NextConfig} */

// const nextConfig = {
//   reactStrictMode: true,
  
//   // ✅ Add this to fix the error
//   turbopack: {
//     // Empty config - accepts defaults
//   },
  
//   images: {
//     // Update deprecated domains to remotePatterns
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'localhost',
//       },
//       {
//         protocol: 'https',
//         hostname: 'res.cloudinary.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com',
//       },
//       {
//         protocol: 'https',
//         hostname: 'via.placeholder.com',
//       },
//     ],
//     formats: ['image/avif', 'image/webp'],
//   },
  
//   compiler: {
//     removeConsole: process.env.NODE_ENV === 'production',
//   },
  
//   experimental: {
//     optimizeCss: true,
//     scrollRestoration: true,
//   },
// };

// module.exports = nextConfig;
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Add turbopack config for Next.js 16
  turbopack: {},
  
  // Disable strict mode if needed
  // reactStrictMode: false,
};

module.exports = nextConfig;