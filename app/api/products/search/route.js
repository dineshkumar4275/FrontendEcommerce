// app/api/products/search/route.js
import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

// Handle GET requests
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const limit = searchParams.get('limit') || '50';

    // Build query string
    const params = new URLSearchParams();
    if (q) params.append('q', q);
    if (category && category !== 'all') params.append('category', category);
    if (minPrice) params.append('minPrice', minPrice);
    if (maxPrice) params.append('maxPrice', maxPrice);
    params.append('limit', limit);

    const url = `${BACKEND_API_URL}/products/search?${params.toString()}`;
    console.log('🔄 Proxying to:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { success: false, message: 'Search failed', data: [] },
      { status: 500 }
    );
  }
}

// Handle OPTIONS requests (for CORS preflight)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// Handle POST requests (if needed)
export async function POST(request) {
  return NextResponse.json(
    { success: false, message: 'Method not allowed for search' },
    { status: 405 }
  );
}

// Handle PUT requests (if needed)
export async function PUT(request) {
  return NextResponse.json(
    { success: false, message: 'Method not allowed for search' },
    { status: 405 }
  );
}

// Handle DELETE requests (if needed)
export async function DELETE(request) {
  return NextResponse.json(
    { success: false, message: 'Method not allowed for search' },
    { status: 405 }
  );
}