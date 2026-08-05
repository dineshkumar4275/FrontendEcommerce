// import { Metadata } from 'next';
// import ProductsClient from './ProductsClient';
// import { getProducts, getCategories } from '../../src/services/productService';

// export const metadata = {
//   title: 'Products - Shop Premium Products |sombustore',
//   description: 'Browse our premium collection of products. Shop from 10,000+ items with free shipping.',
//   keywords: 'products, shop online, buy products, premium products',
//   alternates: { canonical: 'https://www.sombustore.in/products' },
//   openGraph: {
//     title: 'Products - Shop Premium Products |sombustore',
//     description: 'Browse our premium collection of products.',
//     url: 'https://www.sombustore.in/products',
//     siteName: 'sombustore',
//     images: [{ url: '/images/og-products.jpg', width: 1200, height: 630 }],
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Products - Shop Premium Products |sombustore',
//     description: 'Browse our premium collection of products.',
//     images: ['/images/og-products.jpg'],
//   },
//   robots: { index: true, follow: true },
// };

// export default async function ProductsPage() {
//   let products = [];
//   let categories = [];
//   let error = null;
  
//   try {
//     const [productsData, categoriesData] = await Promise.all([
//       getProducts(),
//       getCategories(),
//     ]);
//     products = productsData || [];
//     categories = categoriesData || [];
//   } catch (err) {
//     console.error('Failed to fetch products:', err);
//     error = err.message;
//     // Use mock data or empty array to prevent build failure
//     products = [];
//     categories = [];
//   }

//   const breadcrumbs = [
//     { name: 'Home', url: 'https://www.sombustore.in' },
//     { name: 'Products', url: 'https://www.sombustore.in/products' },
//   ];

//   return (
//     <ProductsClient 
//       products={products} 
//       categories={categories}
//       breadcrumbs={breadcrumbs}
//       error={error}
//     />
//   );
// }
// app/products/page.js
import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductsClient from './ProductsClient';
import { getProducts, getCategories } from '../../src/services/productService';

export const metadata = {
  title: 'Products - Shop Premium Products | Sombu Store',
  description: 'Browse our premium collection of products. Shop from 10,000+ items with free shipping.',
  keywords: 'products, shop online, buy products, premium products',
  alternates: { canonical: 'https://www.sombu.in/products' },
  openGraph: {
    title: 'Products - Shop Premium Products | Sombu Store',
    description: 'Browse our premium collection of products.',
    url: 'https://www.sombu.in/products',
    siteName: 'Sombu Store',
    images: [{ url: '/images/og-products.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - Shop Premium Products | Sombu Store',
    description: 'Browse our premium collection of products.',
    images: ['/images/og-products.jpg'],
  },
  robots: { index: true, follow: true },
};

export default async function ProductsPage() {
  let products = [];
  let categories = [];
  let error = null;
  
  try {
    const [productsData, categoriesData] = await Promise.all([
      getProducts(),
      getCategories(),
    ]);
    products = productsData || [];
    categories = categoriesData || [];
  } catch (err) {
    console.error('Failed to fetch products:', err);
    error = err.message;
    products = [];
    categories = [];
  }

  const breadcrumbs = [
    { name: 'Home', url: 'https://www.sombu.in' },
    { name: 'Products', url: 'https://www.sombu.in/products' },
  ];

  return (
    // ✅ Wrap ProductsClient in Suspense
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ProductsClient 
        products={products} 
        categories={categories}
        breadcrumbs={breadcrumbs}
        error={error}
      />
    </Suspense>
  );
}