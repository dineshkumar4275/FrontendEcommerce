/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
  swcMinify: true,
  reactStrictMode: true,
  
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Disable modularize imports for lucide-react to avoid issues
  modularizeImports: {
    // Remove or comment out lucide-react from here
    // 'lucide-react': {
    //   transform: 'lucide-react/dist/esm/icons/{{member}}',
    // },
  },
  
  transpilePackages: ['lucide-react'],
};

module.exports = nextConfig;