// app/api/products/[id]/route.js
import { NextResponse } from 'next/server';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-ecommerce-brown.vercel.app/api';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const response = await fetch(`${BACKEND_API_URL}/products/${id}`);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { success: false, data: null },
      { status: 500 }
    );
  }
}