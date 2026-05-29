// app/api/[...path]/route.js
import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

export async function GET(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  
  const url = `${BACKEND_API_URL}/${pathString}${queryString ? `?${queryString}` : ''}`;
  
  console.log('🔄 GET Proxy:', url);
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  const body = await request.json();
  
  const url = `${BACKEND_API_URL}/${pathString}`;
  
  console.log('🔄 POST Proxy:', url);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  const body = await request.json();
  
  const url = `${BACKEND_API_URL}/${pathString}`;
  
  console.log('🔄 PUT Proxy:', url);
  
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  
  const url = `${BACKEND_API_URL}/${pathString}`;
  
  console.log('🔄 DELETE Proxy:', url);
  
  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });
    
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// Handle OPTIONS preflight requests
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