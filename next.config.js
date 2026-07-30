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
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  
  swcMinify: true,
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Optimize bundle
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{member}}',
    },
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  
  // Increase memory limit
  experimental: {
    optimizeCss: true,
  },
  
  // Reduce build time
  poweredByHeader: false,
};

module.exports = nextConfig;