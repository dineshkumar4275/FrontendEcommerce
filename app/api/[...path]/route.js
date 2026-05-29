// app/api/[...path]/route.js
import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

export async function GET(request, { params }) {
  const { path } = params;
  const pathString = path.join('/');
  
  const { searchParams } = new URL(request.url);
  const queryString = searchParams.toString();
  
  const url = `${BACKEND_API_URL}/${pathString}${queryString ? `?${queryString}` : ''}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    return NextResponse.json(data);
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
  
  try {
    const response = await fetch(`${BACKEND_API_URL}/${pathString}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
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
  
  try {
    const response = await fetch(`${BACKEND_API_URL}/${pathString}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return NextResponse.json(data);
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
  
  try {
    const response = await fetch(`${BACKEND_API_URL}/${pathString}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}